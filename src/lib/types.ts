// Source of truth for all content shapes. No database — this file IS the schema.
// See ARCHITECTURE.md §4 for rationale.

export interface Profile {
  name: string;
  title: string;
  statement: string; // 1-2 sentence hero copy
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cvPath: string; // path under /public/cv
}

export type ProjectRole = 'built' | 'rebuilt' | 'deployed-operated' | 'contributed';

export interface ProjectImage {
  src: string;
  alt: string; // required — no empty/decorative alt strings
  width: number;
  height: number;
}

export interface Project {
  slug: string; // kebab-case, unique — see tests/e2e/smoke.spec.ts
  name: string;
  summary: string; // 1 sentence, used on the card
  problem: string;
  solution: string;
  role: ProjectRole; // never fudge this — see PRD.md §5, CLAUDE.md rule 4
  techStack: string[];
  keyFeatures: string[];
  images: ProjectImage[];
  githubUrl?: string; // omit entirely if confidential
  demoUrl?: string; // omit entirely if confidential
  confidential: boolean; // true => no githubUrl/demoUrl/client name, redacted screenshots
  featured: boolean;
  hasDetailPage: boolean;
  order: number; // manual display order
}

export interface SkillGroup {
  category: string; // e.g. "Backend", "Frontend", "Infra"
  items: string[];
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  startDate: string; // 'YYYY-MM'
  endDate: string | 'present';
  summary: string;
  highlights: string[];
}

export interface EducationEntry {
  institution: string;
  credential: string;
  startDate: string;
  endDate: string;
}

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
  honeypot: string; // must be empty — bot trap, never shown to real users
}
