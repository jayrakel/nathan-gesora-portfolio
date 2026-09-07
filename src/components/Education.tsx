import { education } from '@/data/education';

function formatYear(date: string) {
  return new Date(`${date}T00:00:00`).getFullYear();
}

export default function Education() {
  return (
    <section
      id="education"
      className="section border-y border-border/50 bg-surface-muted/30"
    >
      <div className="container">
        <div className="section-heading">
          <h2 className="section-eyebrow">05. Education</h2>

          <h3 className="section-title">Academic Background</h3>

          <p className="section-description">
            Formal training and qualifications in Information Communication
            Technology.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {education.map((entry) => (
            <article
              key={`${entry.institution}-${entry.credential}`}
              className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div>
                <h4 className="text-xl font-bold text-foreground">
                  {entry.credential}
                </h4>

                <p className="mt-1 text-lg font-medium text-primary">
                  {entry.institution}
                </p>
              </div>

              <div className="w-fit shrink-0 rounded-full border border-border bg-surface-muted px-3 py-1 font-mono text-sm font-medium uppercase tracking-wider text-muted">
                {formatYear(entry.startDate)} &mdash;{' '}
                {formatYear(entry.endDate)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

