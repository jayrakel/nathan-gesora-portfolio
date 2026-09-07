# ARCHITECTURE.md — Portfolio Site

Full reference. For a fast scan, see `ARCHITECTURE-ESSENTIALS.md`.

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14, App Router, TypeScript | Matches existing stack familiarity (EduWave, JayTechWave site both Next.js); App Router gives static generation + one small dynamic API route in the same project |
| Styling | Tailwind CSS | Fast iteration, no CSS-in-JS runtime cost, small bundle |
| Content | Local typed TS data files (`src/data/*.ts`) | See PRD §9 — no CMS |
| Fonts | `next/font` (self-hosted, no external request) | Avoids CLS + third-party network dependency |
| Email (contact form) | Resend (or equivalent transactional API) | Simple API-key send, delivery status webhook available, no SMTP server to run |
| Hosting | Vercel | Zero-config Next.js deploys, matches JayTechWave Solutions site pattern, free tier covers this traffic profile |
| Analytics | Vercel Analytics | Privacy-friendly (no cookie), no consent banner needed, no PII stored |
| Testing | Playwright, smoke tests only | High content-to-logic ratio; unit tests would mostly test static data, low value |
| CI | None separate — Vercel's git-push build **is** the CI gate (build fails → deploy blocked) | A GitHub Actions pipeline duplicating what Vercel already does is the textbook over-engineering case for a project this size |

## 2. Rendering Strategy
- Landing page (`/`): fully static (SSG at build time). No user-specific data, no need for ISR.
- Project detail pages (`/projects/[slug]`): `generateStaticParams` over the project data array → static at build time. New project added = new data entry + rebuild, not a runtime lookup.
- Contact API route (`/api/contact`): the **only** dynamic/server code in the app. Runs as a serverless function on submit.
- No ISR, no revalidation windows — nothing here changes without a code change, so there's no "stale content" problem ISR would solve. Adding ISR would be solving a problem that doesn't exist.

## 3. Folder Structure
```
portfolio/
├── PRD.md
├── ARCHITECTURE.md
├── ARCHITECTURE-ESSENTIALS.md
├── CLAUDE.md
├── AGENTS.md
├── README.md
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── public/
│   ├── images/projects/        # project screenshots, named {slug}-{n}.webp
│   └── cv/                     # nathan-gesora-cv.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx           # root layout, fonts, metadata
│   │   ├── page.tsx              # landing page — composes section components
│   │   ├── globals.css
│   │   ├── projects/[slug]/page.tsx
│   │   └── api/contact/route.ts  # POST handler, only server logic in the app
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Services.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   ├── profile.ts            # name, title, statement, links
│   │   ├── projects.ts           # Project[]
│   │   ├── skills.ts              # SkillGroup[]
│   │   ├── experience.ts          # ExperienceEntry[]
│   │   ├── education.ts           # EducationEntry[]
│   │   └── services.ts            # ServiceOffering[]
│   └── lib/
│       ├── types.ts               # all shared TS interfaces
│       ├── email.ts               # Resend client wrapper
│       └── rateLimit.ts           # in-memory token bucket for /api/contact
└── tests/e2e/smoke.spec.ts
```

## 4. Data Models

All in `src/lib/types.ts`. This **is** the schema — there is no separate database schema because there is no database (PRD §9).

```typescript
export interface Profile {
  name: string;
  title: string;
  statement: string;              // 1-2 sentence hero copy
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cvPath: string;                 // path under /public/cv
}

export type ProjectRole = 'built' | 'rebuilt' | 'deployed-operated' | 'contributed';

export interface Project {
  slug: string;                   // URL segment, kebab-case, unique — enforced by test
  name: string;
  summary: string;                // 1 sentence, used on card
  problem: string;
  solution: string;
  role: ProjectRole;               // PRD §5 hard rule — never omit or fudge this
  techStack: string[];
  keyFeatures: string[];
  images: ProjectImage[];
  githubUrl?: string;              // omit entirely if confidential
  demoUrl?: string;                // omit entirely if confidential
  confidential: boolean;           // true => no githubUrl/demoUrl/client name, screenshots must be redacted
  featured: boolean;               // controls landing-page inclusion vs. detail-page-only
  hasDetailPage: boolean;          // thin projects render as card-only, no /projects/[slug] route
  order: number;                   // manual display order, avoids date-sorting edge cases (see §8)
}

export interface ProjectImage {
  src: string;
  alt: string;                     // required — no empty alt strings, no decorative excuse
  width: number;
  height: number;
}

export interface SkillGroup {
  category: string;                // e.g. "Backend", "Frontend", "Infra"
  items: string[];
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  startDate: string;               // ISO 'YYYY-MM'
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
  honeypot: string;                // must be empty — bot trap, not shown to real users
}
```

Validation of `ContactFormPayload` happens with a schema validator (Zod) inside `route.ts`, not by trusting client-side validation — the API route is public and will get direct POSTs.

## 5. Contact Form Flow
1. Client-side: required-field + email-format validation (fast feedback), honeypot field hidden via CSS (not `display:none` — some spam bots skip those; use off-screen positioning).
2. Submit → `POST /api/contact`.
3. Server: re-validate with Zod (never trust client validation alone), check honeypot, check `rateLimit.ts` (per-IP token bucket, e.g. 3 req/hour) → reject with 429 if exceeded.
4. Send via Resend to Nathan's inbox; `reply_to` set to submitter's email so replying is a direct reply, not copy-paste.
5. On provider success → return 200 → UI shows success state.
6. On provider failure → log structured error (Vercel function logs — this is the "logging not a DB" mitigation from PRD §10) → return 500 → UI shows error state **with the `mailto:` fallback link surfaced**, not hidden behind a retry button.
7. No message content is persisted anywhere outside the email itself and transient function logs.

## 6. SEO / Metadata
- `generateMetadata` per route — landing page has full OpenGraph + Twitter card; project detail pages get project-specific title/description/OG image (first project screenshot).
- One canonical `sitemap.xml` and `robots.txt` generated via Next.js file conventions, not hand-maintained.
- Structured data: `Person` JSON-LD on landing page (name, jobTitle, sameAs: [github, linkedin]) — helps recruiter search snippets, low effort.

## 7. Performance Budget
- Hero: no video, no Lottie, no particle background. A static/optimized image or pure CSS.
- All project images: `next/image`, WebP, explicit width/height (required in the data model — prevents CLS).
- No client-side charting/animation libraries. If motion is wanted, CSS transitions only — Framer Motion is not justified for a handful of fade-ins.
- Total JS on landing page target: <150KB gzipped (excluding Next.js runtime baseline).

## 8. Edge Cases (explicit — do not silently drop these)
| Edge case | Handling |
|---|---|
| Two projects need the same `slug` | Build-time test (`tests/e2e` or a simple script) asserts uniqueness — fails the build, not a runtime 404 surprise |
| Project has no screenshots yet | `images: []` allowed; `ProjectCard` renders a stack-tag-based placeholder, never a broken `<img>` |
| Confidential project accidentally given a `githubUrl` | Automated: `tests/e2e/smoke.spec.ts` asserts `confidential === true → githubUrl/demoUrl undefined`, fails the build if violated. **Not automated, and can't be:** whether a screenshot or description actually contains shareable client detail — that stays a manual review step before a project's `confidential` flag is ever flipped to `false` (see §9) |
| Contact form spam via direct API POST (bypassing the UI) | Honeypot + rate limit + Zod validation all run server-side regardless of client |
| CV file missing/renamed | Build script checks `profile.cvPath` resolves to an existing file under `public/cv` — fails build rather than shipping a 404 download link |
| Very long `summary`/`problem`/`solution` text breaking card layout | Tailwind `line-clamp` on card summary; detail page has no clamp (full text is fine there) |
| User has JS disabled | All content renders (SSG); contact form's `<form>` has a real `action`/fallback... **actually not implemented in v1** — see §9 Known Gaps, this is intentionally deferred, not silently missed |
| Mobile nav with 6+ section links | Collapse to a single "Menu" toggle under a breakpoint, not horizontal scroll |

## 9. Known Gaps / Deferred (v1 honesty, not scope creep later)
- No-JS contact form fallback (FR requires `mailto:` link as the resilience path instead of a full progressive-enhancement form — cheaper, acceptable for this traffic profile).
- No visual regression testing — Playwright smoke test checks the page renders and key sections exist, not pixel diffing.

**Confidentiality validation is two-layer, not one — don't conflate them:**
- *Automated (v1, in `tests/e2e/smoke.spec.ts`):* build-time test guarantees a `confidential: true` project can never carry a `githubUrl` or `demoUrl`. This is a mechanical check on the data file and it is complete — there is no "automate this more" left to do.
- *Manual, and permanently manual:* whether a screenshot, project name, or description text actually contains client-confidential information. No test can read an image or infer what a client considers sensitive — that judgment call happens when someone decides to flip a project's `confidential` flag to `false`, not before. Treat that decision as a checklist item in `CLAUDE.md`, not a task to eventually automate.

## 10. Deployment
- Vercel project linked to GitHub repo, main branch = production.
- Environment variables (`RESEND_API_KEY`, contact-form target email) set in Vercel dashboard, mirrored in `.env.example` with placeholder values only — **never commit real keys**.
- Preview deployments on every PR (Vercel default) — used as the review artifact, no separate staging environment needed.

## 11. Explicitly Rejected Options (and why, for future-you)
- **Headless CMS**: content velocity too low to justify auth + admin UI + new external dependency.
- **Database for contact messages**: write-once, read-once data; a DB here is state with no query need — pure operational cost.
- **Multi-page architecture** (separate routes for About/Skills/Experience): fragments the 30-second skim into clicks; single-scroll page converts better for this audience.
- **GraphQL/tRPC layer**: one API route, one shape. A query layer here has nothing to abstract.
- **Storybook**: component count and reuse surface too small to justify a second build pipeline for docs.