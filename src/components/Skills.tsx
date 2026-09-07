import { skillGroups } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="section bg-background">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-eyebrow">02. Technical Skills</h2>

          <h3 className="section-title">Tools & Technologies</h3>

          <p className="section-description">
            A practical technology stack covering application development,
            data, infrastructure, and the engineering foundations behind
            reliable software systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="card card-hover p-6 md:p-8"
            >
              <h4 className="mb-6 text-xl font-bold text-foreground">
                {group.category}
              </h4>

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="cursor-default rounded-md border border-border bg-surface-muted px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
