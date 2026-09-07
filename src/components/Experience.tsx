import { experience } from '@/data/experience';

export default function Experience() {
  return (
    <section id="experience" className="section bg-background">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-eyebrow">04. Professional Experience</h2>

          <h3 className="section-title">Where I&apos;ve Worked</h3>

          <p className="section-description">
            My professional background building and operating production
            software systems.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-12">
          {experience.map((job) => (
            <article
              key={`${job.organization}-${job.role}`}
              className="relative border-l border-border/50 pl-6 md:pl-8"
            >
              {/* Timeline dot */}
              <div
                aria-hidden="true"
                className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-primary ring-4 ring-background"
              />

              <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h4 className="text-xl font-bold text-foreground">
                    {job.role}
                  </h4>

                  <p className="text-lg font-medium text-primary">
                    {job.organization}
                  </p>
                </div>

                <div className="w-fit shrink-0 rounded-full border border-border bg-surface-muted px-3 py-1 font-mono text-sm font-medium uppercase tracking-wider text-muted">
                  {job.startDate} &mdash; {job.endDate}
                </div>
              </div>

              <p className="mb-6 mt-4 text-base leading-relaxed text-muted">
                {job.summary}
              </p>

              <ul className="space-y-3">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


