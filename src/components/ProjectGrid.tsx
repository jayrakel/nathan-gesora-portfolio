import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  const featured = [...projects]
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <section
      id="projects"
      className="section bg-surface-muted/30"
    >
      <div className="container">
        <div className="section-heading">
          <h2 className="section-eyebrow">03. Featured Work</h2>

          <h3 className="section-title">Selected Projects</h3>

          <p className="section-description">
            A selection of business systems, applications, and platforms
            I&apos;ve built and deployed across different areas of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
