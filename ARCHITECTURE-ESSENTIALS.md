# ARCHITECTURE-ESSENTIALS.md

Quick reference only. Full rationale/detail → `ARCHITECTURE.md`.

## Stack
Next.js 14 (App Router, TS) · Tailwind · local TS data files (no CMS) · no database · Resend for contact email · Vercel hosting · Vercel Analytics · Playwright smoke tests only.

## Rendering
- `/` and `/projects/[slug]` → fully static (SSG).
- `/api/contact` → only dynamic route in the app.
- No ISR, no revalidation — nothing changes without a redeploy.

## Data = the schema
No DB → `src/lib/types.ts` is the source of truth. Core types: `Profile`, `Project`, `SkillGroup`, `ExperienceEntry`, `EducationEntry`, `ServiceOffering`, `ContactFormPayload`.

Key `Project` fields to never skip: `role` (`built | rebuilt | deployed-operated | contributed`), `confidential` (gates `githubUrl`/`demoUrl`), `images[].alt` (required).

## Contact Form
Client validation (fast UX) → `POST /api/contact` → Zod re-validation + honeypot + per-IP rate limit (server-side, never trust client) → Resend send with `reply_to` = submitter → structured log on failure → `mailto:` fallback always visible in UI, never removed.

## Confidentiality Rule (do not skip)
SACCO + Agrifusion are client projects → `confidential: true` → no repo link, no demo link, no client name, redacted screenshots, until explicitly cleared.

**Confidentiality validation:** automated build-time test (`tests/e2e/smoke.spec.ts`) guarantees no `githubUrl`/`demoUrl` on a confidential project; manual review remains required — permanently, not as a TODO — for whether screenshots/client details are actually shareable. The test can't read an image or judge sensitivity.

## Rejected on purpose
CMS · database · auth · blog · i18n · theme toggle · GraphQL/tRPC · Storybook · separate CI pipeline (Vercel's build-on-push is the CI gate) · ISR.

## Non-negotiable NFRs
Lighthouse ≥95 all categories · LCP <2s · `next/image` + explicit dimensions everywhere · `next/font` only · no animation library, CSS transitions only.

## Known v1 gaps (deferred, not missed)
No-JS contact fallback beyond `mailto:` · no visual regression testing.