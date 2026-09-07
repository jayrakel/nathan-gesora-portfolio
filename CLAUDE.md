# CLAUDE.md — Agent Instructions for This Repo

Canonical instructions for any coding agent working in this project. `AGENTS.md` points here — do not fork instructions between the two files.

## Read First
1. `PRD.md` — what this is and isn't (esp. §3 Non-Goals, §6 Confidentiality Constraint).
2. `ARCHITECTURE-ESSENTIALS.md` — fast orientation.
3. `ARCHITECTURE.md` — full detail when you need it.

## Project Summary
Static Next.js 14 (App Router, TypeScript) developer portfolio. No CMS, no database. All content lives in typed data files under `src/data/`. The only server-side logic is `src/app/api/contact/route.ts`.

## Hard Rules (violating these breaks explicit product decisions, not just style)
1. **Never add a database.** Contact messages are email-only, never persisted (ARCHITECTURE.md §5). If a task seems to need persistence, stop and flag it — it's likely scope creep, not a real requirement.
2. **Never add a CMS/admin UI/auth.** Content changes go through data files + a PR.
3. **Never give a `confidential: true` project a `githubUrl` or `demoUrl`.** This is enforced automatically — `tests/e2e/smoke.spec.ts` fails the build if you do. What's *not* automated, and never will be: whether a screenshot or description actually contains shareable client detail. Before flipping any project's `confidential` flag to `false`, manually confirm the client has cleared it — the test can't judge that, only a person can. SACCO and Agrifusion are confidential by default.
4. **Never fudge `Project.role`.** `deployed-operated` ≠ `built`. InfixEdu is `deployed-operated`. Getting this wrong is a credibility risk, not a style nit — see PRD §5.
5. **Every `ProjectImage` needs a real `alt`.** No `alt=""`, no `alt="image"`.
6. **No animation libraries** (Framer Motion, GSAP, Lottie, particle backgrounds). CSS transitions only. See ARCHITECTURE.md §7/§11.
7. **Landing page stays single-scroll.** Don't split sections into separate routes without an explicit product decision to revisit PRD §9.
8. **All new external calls from `/api/contact` must be server-side.** Never expose `RESEND_API_KEY` (or equivalent) to the client.

## Common Tasks

**Add a new project:**
1. Add an entry to `src/data/projects.ts` matching the `Project` interface in `src/lib/types.ts`.
2. Decide `role`, `confidential`, `featured`, `hasDetailPage` deliberately — don't default-copy another entry's values.
3. Add images to `public/images/projects/{slug}-{n}.webp` with real `alt` text, or leave `images: []` (renders a placeholder, doesn't break).
4. If `hasDetailPage: true`, confirm it appears in `generateStaticParams` in `src/app/projects/[slug]/page.tsx` (it should pick up automatically from the data array — verify, don't assume).

**Edit skills/experience/education/services:** edit the corresponding file in `src/data/` directly. No schema migration, no build step beyond the normal one.

**Touch the contact form:** re-read ARCHITECTURE.md §5 in full first. Validation is duplicated client + server on purpose — don't remove the server-side Zod check because "the client already validates."

## Commands
```bash
npm run dev       # local dev server
npm run build      # production build — also the CI gate (Vercel runs this on push)
npm run lint        # eslint + typescript
npm run test:e2e     # Playwright smoke tests
```

## Before Opening a PR
- `npm run build` passes.
- No new `confidential` project has a public link.
- No new dependency added without checking it against ARCHITECTURE.md §11 (Explicitly Rejected Options) — if it's on that list, the answer is no unless the PRD is updated first, not just this code.