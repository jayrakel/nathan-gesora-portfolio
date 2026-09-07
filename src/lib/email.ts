import { Resend } from 'resend';

import type { ContactFormPayload } from './types';

interface SendResult {
  ok: boolean;
  error?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendContactEmail(
  payload: Pick<ContactFormPayload, 'name' | 'email' | 'message'>
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TARGET_EMAIL;
  const fromAddress = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toAddress || !fromAddress) {
    console.error(
      'email.ts: missing RESEND_API_KEY, CONTACT_TARGET_EMAIL, or CONTACT_FROM_EMAIL'
    );

    return {
      ok: false,
      error: 'server_misconfigured',
    };
  }

  try {
    const resend = new Resend(apiKey);

    const safeName = escapeHtml(payload.name);
    const safeEmail = escapeHtml(payload.email);
    const safeMessage = escapeHtml(payload.message);

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: payload.email,
      subject: `Portfolio Contact from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        '',
        'Message:',
        payload.message,
      ].join('\n'),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr />
        <p style="white-space: pre-wrap;">${safeMessage}</p>
      `,
    });

    if (error) {
      console.error('email.ts: Resend API error', error);

      return {
        ok: false,
        error: 'provider_error',
      };
    }

    return { ok: true };
  } catch (error) {
    console.error('email.ts: unexpected send failure', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return {
      ok: false,
      error: 'network_error',
    };
  }
}
