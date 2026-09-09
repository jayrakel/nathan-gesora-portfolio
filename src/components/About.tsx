import { profile } from '@/data/profile';

export default function About() {
  return (
    <section
      id="about"
      className="section border-y border-border/50 bg-surface-muted/30"
    >
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="section-eyebrow">01. About Me</h2>
            <h3 className="section-title">Background & Specialization</h3>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m an IT Administrator and Full-Stack Software Developer
                focused on building practical digital systems for real-world
                business needs. My work spans enterprise application
                development, databases, REST APIs, system integration, and
                software deployment.
              </p>

              <p>
                I work primarily with Java and Spring Boot on the backend,
                alongside React and Next.js for modern web applications. I
                place strong emphasis on clean architecture, reliable data
                models, maintainable code, and software that can evolve as
                business requirements change.
              </p>

              <p>
                My experience also extends to IT infrastructure and system
                administration. I work with Windows and Linux environments,
                Docker, databases, networking, deployment infrastructure, and
                technical support, allowing me to take software from
                development through deployment and ongoing operation.
              </p>

              <p>
                {profile.location} · Open to software development,
                infrastructure, and technology opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}