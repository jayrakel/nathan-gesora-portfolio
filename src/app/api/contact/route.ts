import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { sendContactEmail } from '@/lib/email';
import { isRateLimited } from '@/lib/rateLimit';

// Server-side validation is mandatory because this is a public API endpoint.
// Requests can be sent directly without using the portfolio UI.
const payloadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),

  // Honeypot must remain empty when present.
  // The frontend sends this field from the hidden form input.
  _gotcha: z.string().max(0).optional(),
});

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim() || 'unknown';
  }

  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    // 1. Identify requester
    const ip = getClientIp(req);

    // 2. Rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'rate_limited' },
        { status: 429 }
      );
    }

    // 3. Parse request body
    const json = await req.json().catch(() => null);

    if (!json || typeof json !== 'object') {
      return NextResponse.json(
        { error: 'invalid_payload' },
        { status: 400 }
      );
    }

    // 4. Server-side validation
    const parsed = payloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'invalid_payload' },
        { status: 400 }
      );
    }

    // 5. Honeypot check
    // A legitimate frontend submission leaves this field empty.
    if (parsed.data._gotcha) {
      // Return the same generic response as a successful submission
      // so automated bots do not learn that they were detected.
      return NextResponse.json(
        { ok: true },
        { status: 200 }
      );
    }

    // 6. Send email
    const { name, email, message } = parsed.data;

    const result = await sendContactEmail({
      name,
      email,
      message,
    });

    if (!result.ok) {
      console.error('Contact email delivery failed', {
        event: 'contact_email_delivery_failed',
        ip,
        email,
      });

      return NextResponse.json(
        { error: 'send_failed' },
        { status: 500 }
      );
    }

    // 7. Success
    return NextResponse.json(
      { ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error', {
      event: 'contact_api_error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { error: 'internal_server_error' },
      { status: 500 }
    );
  }
}
