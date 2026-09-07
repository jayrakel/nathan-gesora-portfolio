import { services } from '@/data/services';

export default function Services() {
  return (
    <section id="services" className="section bg-background">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-eyebrow">06. Services</h2>

          <h3 className="section-title">What I Can Help With</h3>

          <p className="section-description">
            Practical software development and technical services focused on
            building reliable systems and taking them from development to
            deployment and ongoing operation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="card card-hover flex h-full flex-col p-6 md:p-8"
            >
              <div
                aria-hidden="true"
                className="mb-6 flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/5 font-mono text-sm font-bold text-primary"
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              <h4 className="mb-3 text-xl font-bold tracking-tight text-foreground">
                {service.title}
              </h4>

              <p className="text-base leading-relaxed text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

