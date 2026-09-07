import { profile } from '@/data/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-10 md:py-16">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-lg font-bold text-foreground">
            {profile.name}
          </span>

          <p className="text-sm text-muted">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        <nav
          aria-label="Footer links"
          className="flex items-center gap-6"
        >
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-sm font-medium text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            GitHub
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-sm font-medium text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            LinkedIn
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="rounded-sm text-sm font-medium text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}

