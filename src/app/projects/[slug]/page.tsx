import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import type { Project } from '@/lib/types';

const roleLabels: Record<Project['role'], string> = {
  built: 'Built from scratch',
  rebuilt: 'Architected & Rebuilt',
  'deployed-operated': 'Deployed & Operated',
  contributed: 'Contributed',
};

export function generateStaticParams() {
  return projects
    .filter((project) => project.hasDetailPage)
    .map((project) => ({
      slug: project.slug,
    }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find(
    (item) => item.slug === params.slug && item.hasDetailPage
  );

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} — Nathan Michira Gesora`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find(
    (item) => item.slug === params.slug && item.hasDetailPage
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 py-4 backdrop-blur-md">
          <div className="container">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>

              Back to Projects
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="border-b border-border/50 bg-surface-muted/30 py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  {roleLabels[project.role]}
                </span>

                {project.confidential && (
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-amber-600">
                    Confidential
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {project.name}
              </h1>

              <p className="max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
                {project.summary}
              </p>

              {!project.confidential &&
                (project.githubUrl || project.demoUrl) && (
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>

                        View Source
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>

                        Live Demo
                      </a>
                    )}
                  </div>
                )}
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="section">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="flex flex-col gap-12 lg:col-span-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    The Problem
                  </h2>

                  <p className="whitespace-pre-wrap text-lg leading-relaxed text-muted">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    The Solution
                  </h2>

                  <p className="whitespace-pre-wrap text-lg leading-relaxed text-muted">
                    {project.solution}
                  </p>
                </div>

                {project.images.length > 0 && (
                  <div>
                    <h2 className="mb-6 text-2xl font-bold text-foreground">
                      Gallery
                    </h2>

                    <div className="flex flex-col gap-8">
                      {project.images.map((image) => (
                        <figure
                          key={image.src}
                          className="overflow-hidden rounded-lg border border-border/50 bg-surface-muted/30"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className="h-auto w-full object-cover"
                          />
                        </figure>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-10 lg:border-l lg:border-border/50 lg:pl-10">
                <div>
                  <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-primary">
                    Tech Stack
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {project.techStack.map((technology) => (
                      <li
                        key={technology}
                        className="flex items-center gap-3 text-sm text-muted"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                          aria-hidden="true"
                        />

                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-primary">
                    Key Features
                  </h3>

                  <ul className="flex flex-col gap-4">
                    {project.keyFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

