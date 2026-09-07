# PRD — Nathan Michira Gesora Developer Portfolio

## 1. Problem
No canonical, provable-work asset exists to send to employers/clients. CV lists skills; it doesn't demonstrate shipped, production-oriented systems.

## 2. Goal
A statically-generated site that converts a 30-second skim into a callback/reply. Primary conversion action: contact form submission or CV download.

## 3. Non-Goals (explicit, revisit only with new requirement)
- No CMS / admin panel — content changes are infrequent (new project every few months), a PR is cheap enough.
- No database — nothing here is transactional or user-generated except contact messages, which are fire-and-forget email, not queryable records.
- No blog — do not build a content type nobody has committed to maintaining. Add later as its own initiative if it starts happening organically.
- No auth, no user accounts.
- No i18n — single audience, single language (English).
- No dark/light theme toggle for v1 — pick one theme, ship it. Toggle is a UI-state feature with zero conversion value.

## 4. Audiences
| Persona | Intent | What they need in <30s |
|---|---|---|
| Technical recruiter | Screening for a role | Title, stack tags, 1-2 flagship projects, CV |
| Engineering hiring manager | Evaluating depth | Problem→solution framing per project, role, real tech decisions |
| Prospective client (SME) | "Can this person build my business system?" | Proof of business-system delivery (SACCO, school, e-commerce), how to reach him |

## 5. Content Inventory (real, from existing work — do not invent projects)
1. **SACCO Management System** — Spring Boot 3.5/Java 17, PostgreSQL 16, Redis 7, React. Financial platform: loan lifecycle, arrears calculation, disbursements, historical data migration. Client work → **case-study framing, no public repo/live demo** (financial client data).
2. **EduWave** — school management system rewrite, Spring Boot + Next.js monorepo, multi-tenant (`school_id` scoping), modules: auth/students/staff/fees/attendance/exams/library. Public repo (`github.com/jayrakel/sms`) → can link.
3. **JayTechWave Solutions Website** — own company site, Next.js, deployed on Vercel, admin panel, AI-assisted content route. Can link live + repo if not client-confidential.
4. **Agrifusion Co.** — agriculture e-commerce platform, client project. Case-study framing pending confirmation of what's shareable.
5. **InfixEdu deployment** — Laravel school management system deployed to DigitalOcean (Nginx, PHP version resolution, installer flow). Frame as **DevOps/deployment competency**, not "built the app" (it's an existing product he deployed and operated) — do not misrepresent authorship.
6. *(Optional, adds breadth)* **Auralis Studio** — C++/JUCE audio engine + Electron UI, gRPC IPC. Different domain (systems/audio), signals range beyond CRUD business apps. Include only if it's far enough along to show, not vaporware.

**Hard rule**: every project entry must state accurately whether Nathan built it, rebuilt it, or deployed/operated it. Do not blur "deployed InfixEdu" into "built a school management system" — that's EduWave, a different project, and misrepresenting it is a credibility risk the first technical interviewer will catch.

## 6. Confidentiality Constraint (edge case that will break trust if missed)
SACCO and Agrifusion are client-owned systems, likely under NDA or informal confidentiality. **Default assumption: no public GitHub link, no live demo link, no client name if not explicitly cleared.** Screenshots must be genericized/redacted (no real member names, balances, or client branding) unless Nathan confirms otherwise. This is a TODO gate before those two project pages go live — flagged in data files as `confidential: true`.

## 7. Functional Requirements
- FR1: Landing page renders hero, about, skills, featured projects, experience, education, services, contact — single scroll page (see §9 on why not separate routes for v1).
- FR2: Each project has an optional dedicated detail route (`/projects/[slug]`) for the ones with enough content to warrant it (SACCO, EduWave). Thin projects stay as cards only.
- FR3: Contact form submits to a server route, sends email via a transactional provider, shows success/error state, does not require a database.
- FR4: CV is a static PDF served from `/public/cv`, linked from hero and contact.
- FR5: All project/skill/experience/education/service content lives in typed data files under `src/data/`, not hardcoded in components.
- FR6: Site is fully static/SSG — no per-request server rendering needed except the contact API route.

## 8. Non-Functional Requirements
- Lighthouse: Performance ≥95, Accessibility ≥95, SEO ≥95 (mobile).
- LCP < 2.0s on 4G — no unoptimized hero images, no heavy animation libraries.
- Fully keyboard-navigable, semantic headings, alt text on every project image (required field in data model, not optional).
- No layout shift from font loading (use `next/font`).
- Works with JS disabled for content (progressive enhancement) except the contact form, which degrades to a `mailto:` link.

## 9. Key Product Decisions & Why
| Decision | Why | Rejected alternative |
|---|---|---|
| Single-page scroll, not multi-route site | Recruiters skim; forcing navigation loses the 30-second read | Full multi-page site (over-engineered for content volume) |
| Data-as-TypeScript-files, not headless CMS | 6 projects, updated a few times a year — a CMS adds an admin UI, auth, and a new deploy dependency for near-zero benefit | Sanity/Contentful |
| No database for contact form | Messages are read once, replied to, done — a DB row that's read once and never queried again is pure liability (backup, GDPR, migrations) for no gain | Postgres + Prisma persistence |
| Vercel deploy | Matches existing JayTechWave Solutions deployment pattern, zero new ops surface | Self-hosted / Docker |

## 10. Hard Questions (resolved into the decisions above and into ARCHITECTURE.md)
- **What breaks first?** The contact form, silently — email delivery failing with no persistence means a lost lead with no trace. Mitigated in ARCHITECTURE.md via provider delivery-status check + logging (not a DB, just structured logs) and a visible `mailto:` fallback link that's never removed.
- **What edge case is easy to miss?** Client confidentiality on SACCO/Agrifusion (§6) — the single biggest way this portfolio damages trust instead of building it.
- **What's over-engineered if we're not careful?** CMS, database, auth, theming, blog, i18n, microservices, GitHub Actions CI for a static site Vercel already builds on push. All explicitly rejected in §3/§9.
- **What's under-specified?** Real GitHub/LinkedIn/email/domain — placeholders (`TODO:`) are used throughout data files and must be filled before launch.

## 11. Success Metric
Not vanity traffic. Track (via Vercel Analytics, no cookie banner needed): contact form submissions + CV downloads per month. Target: site directly produces at least one qualified conversation per month within 3 months of launch.
