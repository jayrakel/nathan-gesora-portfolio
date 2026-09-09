import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/lib/types';

const roleLabels: Record<Project['role'], string> = {
  built: 'Built',
  rebuilt: 'Rebuilt',
  'deployed-operated': 'Deployed & Operated',
  contributed: 'Contributed',
};

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const hasImages = project.images.length > 0;

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      {/* Project visual */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-surface-muted">
        {hasImages ? (
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-surface-muted"
          >
            <div className="px-8 text-center">
              <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary/60">
                {project.techStack[0] ?? 'Software Project'}
              </span>

              <div className="mx-auto mt-3 h-px w-16 bg-border" />
            </div>
          </div>
        )}
      </div>

      {/* Project content */}
      <div className="flex flex-grow flex-col p-6 md:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h4 className="text-2xl font-bold tracking-tight text-foreground">
            {project.name}
          </h4>

          <span className="shrink-0 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-primary">
            {roleLabels[project.role]}
          </span>
        </div>

        <p className="mb-6 line-clamp-3 flex-grow text-base leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Technology list */}
        <ul className="mb-8 flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((technology) => (
            <li
              key={technology}
              className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs font-medium text-foreground"
            >
              {technology}
            </li>
          ))}

          {project.techStack.length > 5 && (
            <li className="rounded border border-border bg-surface-muted px-2 py-1 font-mono text-xs font-medium text-muted">
              +{project.techStack.length - 5}
            </li>
          )}
        </ul>

        {/* Project actions */}
        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border/50 pt-4">
          {project.hasDetailPage && (
            <Link
              href={`/projects/${project.slug}`}
              className="group/link inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary/80"
            >
              Read Case Study

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}

          {!project.hasDetailPage && project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-primary transition-colors hover:text-primary/80"
            >
              Live Demo
            </a>
          )}

          {!project.hasDetailPage && project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          )}

          {project.confidential &&
            !project.githubUrl &&
            !project.demoUrl && (
              <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>

                Private Repository
              </span>
            )}
        </div>
      </div>
    </article>
  );
}

