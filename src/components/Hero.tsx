import Link from 'next/link';

import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"
      />

      <div className="container relative z-10">
        <div className="max-w-4xl">
          <p className="section-eyebrow">
            IT Administrator • Full-Stack Software Developer
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {profile.name}.
            <span className="block text-muted">
              {profile.title}.
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl md:text-2xl">
            {profile.statement}
          </p>

          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#projects"
              className="btn btn-primary h-12 px-8 text-base"
            >
              View Projects
            </Link>

            <a
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline h-12 px-8 text-base"
            >
              Download CV
            </a>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:gap-4">
            <span>{profile.location}</span>

            <span
              aria-hidden="true"
              className="hidden text-border sm:inline"
            >
              /
            </span>

            <Link
              href="#contact"
              className="font-medium text-primary hover:text-foreground"
            >
              Available for opportunities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}