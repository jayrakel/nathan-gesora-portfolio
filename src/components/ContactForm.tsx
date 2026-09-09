'use client';

import { useRef, useState } from 'react';

import { profile } from '@/data/profile';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

type FormErrors = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  function validateForm(formData: FormData) {
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const newErrors: FormErrors = {
      name: '',
      email: '',
      message: '',
    };

    let isValid = true;

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!validateForm(formData)) {
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: String(formData.get('name') ?? '').trim(),
          email: String(formData.get('email') ?? '').trim(),
          message: String(formData.get('message') ?? '').trim(),
          _gotcha: String(formData.get('_gotcha') ?? ''),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('sent');
      setErrors({
        name: '',
        email: '',
        message: '',
      });

      formRef.current?.reset();
    } catch {
      setStatus('error');
      setErrorMessage('Unable to send your message right now.');
    }
  }

  return (
    <section
      id="contact"
      className="section border-y border-border/50 bg-surface-muted/30"
    >
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact information */}
          <div>
            <div className="section-heading !mb-6">
              <h2 className="section-eyebrow">07. Contact</h2>

              <h3 className="section-title">Get In Touch</h3>

              <p className="section-description max-w-md">
                I&apos;m currently open to new opportunities. Whether you have
                a question, a project in mind, or just want to say hello, feel
                free to get in touch.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>

                <a
                  href={`mailto:${profile.email}`}
                  className="font-medium transition-colors hover:text-primary"
                >
                  {profile.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>

                <span className="font-medium">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="card p-6 md:p-8">
            {status === 'sent' ? (
              <div
                role="status"
                className="flex h-full flex-col items-center justify-center space-y-4 py-12 text-center"
              >
                <div
                  aria-hidden="true"
                  className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <h4 className="text-2xl font-bold text-foreground">
                  Message Sent!
                </h4>

                <p className="text-muted">
                  Thanks for reaching out. I&apos;ll get back to you as soon
                  as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn btn-outline mt-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                {/* Honeypot field */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto h-[1px] w-[1px] overflow-hidden"
                >
                  <label htmlFor="_gotcha">Leave this field blank</label>

                  <input
                    type="text"
                    name="_gotcha"
                    id="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    disabled={status === 'sending'}
                    autoComplete="name"
                    className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.name ? 'border-red-500' : 'border-border'
                      }`}
                    placeholder="Jane Doe"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? 'name-error' : undefined
                    }
                  />

                  {errors.name && (
                    <span
                      id="name-error"
                      className="text-xs font-medium text-red-500"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    disabled={status === 'sending'}
                    autoComplete="email"
                    className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.email ? 'border-red-500' : 'border-border'
                      }`}
                    placeholder="jane@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'email-error' : undefined
                    }
                  />

                  {errors.email && (
                    <span
                      id="email-error"
                      className="text-xs font-medium text-red-500"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-foreground"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    disabled={status === 'sending'}
                    className={`w-full resize-y rounded-md border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.message ? 'border-red-500' : 'border-border'
                      }`}
                    placeholder="How can I help you?"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                  />

                  {errors.message && (
                    <span
                      id="message-error"
                      className="text-xs font-medium text-red-500"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary mt-2 flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      <svg
                        className="-ml-1 mr-2 h-4 w-4 animate-spin text-primary-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>

                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Error */}
                {status === 'error' && (
                  <div
                    role="alert"
                    className="mt-4 rounded-md border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600"
                  >
                    <p className="mb-1 font-semibold">{errorMessage}</p>

                    <p>
                      Please try again later or email me directly at{' '}
                      <a
                        href={`mailto:${profile.email}`}
                        className="font-bold underline transition-colors hover:text-red-500"
                      >
                        {profile.email}
                      </a>
                      .
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}