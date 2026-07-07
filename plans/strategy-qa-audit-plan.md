# Pykiškis — Full QA Audit & Strategic Roadmap

> STATUS: **Proposed — awaiting teacher priorities.** Audit performed 2026-07-07
> against master `e7d3d23`. Every finding below was verified in code (not
> assumed). Phases are ordered by risk-reduction first, growth second,
> monetisation last — each phase is independently shippable.

## Where the product stands

61 modules / ~509 lessons across Ch1–7, all qa-verified through real Python.
Teacher dashboard with classes, assignments, gradebook + CSV, soft-delete.
EN/LT toggle (UI chrome + Ch1 theory). CI (lint+build+test) on PRs, 29 unit
tests, error logging, stale-chunk recovery. Zero infra cost (Pages + D1 free
tiers). This is a genuinely strong single-school product; the findings below
are about **assessment integrity, production hardening, and the path from
one classroom to many**.

---

## AUDIT FINDINGS

### A. Security & integrity (verified in `functions/`)

| # | Finding | Severity | Evidence |
|---|---------|----------|----------|
| A1 | **Client-authoritative grading** — any signed-in student can `POST /api/basics-progress` with `bestScore: 10` for any progress-test lesson. Grading happens in the browser; the server stores whatever it is sent (only MAX-guards across retakes). For termly compliance tests this is forgeable by any student who opens DevTools. | **HIGH** | `basics-progress.ts` onRequestPost |
| A2 | **Clerk DEV instance in production** — `_auth.ts` hardcodes `nice-redbird-5.clerk.accounts.dev`. Dev instances have relaxed security posture, shared-key semantics, usage caps, and are not meant for real users. Domain is also hardcoded rather than env-driven. | **HIGH** | `_auth.ts:2` |
| A3 | **No rate limiting on any endpoint** — incl. unauthenticated `POST /api/client-error` (log flooding; size-capped but unlimited requests) and the Clerk-REST-backed teacher check. | MED | all of `functions/api/*` |
| A4 | **JWKS fetched on every request** — `verifyClerkToken` fetches Clerk's JWKS per call: latency on every API hit and a hard dependency (Clerk blip = total auth outage). | MED | `_auth.ts:53` |
| A5 | **Teacher check = Clerk REST call per request** — `verifyTeacher` hits `api.clerk.com` on every teacher endpoint call. Slow + subject to Clerk rate limits. Fix: put `role` in the session-token custom claims and read it from the (already verified) JWT. | MED | `_auth.ts:34` |
| A6 | **Conditional `iss`/`alg` checks** — `if (payload.iss && …)` / `if (header.alg && …)` pass when the field is absent. Signature verification still protects, but these should be strict requires. `azp` unvalidated. | LOW | `_auth.ts:51,83` |
| A7 | No CSP / X-Frame-Options / Referrer-Policy headers (only COOP/COEP for Pyodide). CSP needs care with Pyodide/CodeMirror but a report-only rollout is feasible. | LOW-MED | `public/_headers` |
| A8 | D1 backups: relying on implicit D1 Time Travel (30d). No exported backup, no restore drill. | MED | — |
| ✔ | SQL injection: **none** — every query parameterized (`?` + `.bind`), verified across all 9 functions. Identity always from verified `payload.sub`, never the body → no IDOR. Teacher endpoints all gated. | — | verified |

### B. UI / UX / Accessibility (verified in `src/`)

| # | Finding | Severity |
|---|---------|----------|
| B1 | **Accessibility is thin**: 3 `aria-label`s in the whole app; no `role`, skip-links, focus management, or `prefers-reduced-motion` handling found. Quiz/test option keyboard operability and contrast unaudited. WCAG 2.1 AA matters doubly for schools (procurement + special-needs students — the original reason for the LT toggle). | HIGH (for audience) |
| B2 | **No 404 route** — no `path: '*'` catch-all; unknown URLs render router fallback rather than a branded page. | LOW |
| B3 | Suspense fallback is a blank grey div → white-flash feel on slow school networks. Branded splash/skeletons would polish perceived performance. | LOW |
| B4 | Mobile audit not done (students on laptops, but homework happens on phones). | MED |
| B5 | `(unnamed)` student fallback is dev-speak in a teacher-facing table. | LOW |

### C. Copy & metadata

| # | Finding | Severity |
|---|---------|----------|
| C1 | **`index.html` meta/OG copy is pre-pivot**: "100 levels … to machine learning" — the product is now a 7-chapter course. No `og:image`. `og:url` pinned to pages.dev. First impression when anyone shares the link is wrong. | MED |
| C2 | Mixed British/American spellings in lesson prose (`colour`×10, `capitalis-`×4, `practise`×6 alongside American forms). Pick one (suggest British — already dominant) and standardise. | LOW |
| C3 | No privacy policy / terms pages at all. Required before any second school, and good practice now (Clerk sets cookies; students are minors; GDPR). | HIGH (for growth), MED (today) |

### D. LMS best-practice gaps (vs. mainstream LMS expectations)

| # | Gap | Why it matters |
|---|-----|----------------|
| D1 | **Server-authoritative assessment** (= fix A1): server draws the questions, grades submitted answers against the banks (already in repo, importable server-side), stores score + an attempt log (timestamp, per-question results). | Integrity of the n+2 termly tests; unlocks D2/D5. |
| D2 | **Student "My Results" page** — students can't review their own test history/best scores. | Self-monitoring is core LMS UX. |
| D3 | **Certificates of completion** (printable, per chapter + course). | Strong motivator for school-age learners; cheap to build. |
| D4 | **Review mode / spaced practice** — re-drill questions a student got wrong (needs the attempt log from D1). | Highest-leverage learning feature available. |
| D5 | **Teacher item analytics** — per-question success rates, most-missed questions per class (also needs the attempt log). | Turns the gradebook into a teaching instrument. |
| D6 | **Class join codes** (student self-enrolment) — already noted as a future add in the classes plan. | Removes teacher admin toil. |
| D7 | Assignment reminders/notifications (in-app first; email later). | Completion rates. |
| D8 | i18n completion: LT for Ch2–7 prose + full wiring (titles/quiz/exercise fields). | The original accessibility mission, half-done. |

### E. Scaling & architecture

| # | Finding | Severity |
|---|---------|----------|
| E1 | **Single-tenant by design**: every `teacher` sees **all** students; classes are cosmetic filters. Fine for one school; the blocker for any second school. Fix = Clerk Organizations (school = org), org-scoped queries. | HIGH (for growth) |
| E2 | `GET /api/students` loads *every* student × *every* lesson_progress row on each dashboard open. Fine at ~30 students; painful at 3,000. Needs per-class queries + D1 indexes when multi-school lands. | MED (deferred) |
| E3 | All 509 lessons ship in one 240 KB `basics` chunk (906 KB total JS). Acceptable today; split per-chapter when Ch8+ or media arrive. | LOW |
| E4 | **Deploy is not gated on CI** — `deploy.yml` (push→deploy) and `ci.yml` run in parallel; a failing test doesn't stop a deploy. Gate deploy on the checks. | MED |
| E5 | qa-verify/trace-test run only on my machine (`py` launcher). Parametrize the Python binary and run them in CI (actions/setup-python) → content correctness enforced on every PR. | MED |
| E6 | No usage analytics at all. Privacy-first option: Cloudflare Web Analytics (cookieless, GDPR-friendly) — enough to see what's used without touching student data. | LOW-MED |
| E7 | No PWA/offline story. School networks are flaky; Pyodide is heavy. A service worker + precache would make revisits instant. | LOW-MED |

### F. Growth & monetisation options (strategy, not code)

The realistic ladder, given a teacher-built product with real classroom proof:

1. **Now – free, own school.** Harden (Phases 1–2), gather testimonials, screenshot real gradebook wins. Zero cost stays zero.
2. **Pilot 2–3 friendly schools (free).** Requires multi-tenancy (E1), production Clerk (A2), privacy policy (C3), custom domain. Lithuanian CS-teacher networks / eTwinning / EU digital-education grants are natural channels — grant funding may beat revenue early.
3. **B2B school licensing (the recommended model).** Annual per-classroom or per-school seat pricing (e.g. tiered: ≤30 / ≤150 / unlimited students). Stripe Checkout + webhook → entitlement flag on the org; Functions gate on it. B2B avoids charging minors/parents (GDPR + ethics simpler), matches school budgets, and one sale = many seats.
4. **Not recommended:** ads (children), selling parent subscriptions (heavy support, thin margins), paid certificates (feels extractive in K-12).

Monetisation is deliberately **Phase 5**: it depends on multi-tenancy, production auth, legal pages, and at least one external pilot school. Building billing earlier would be effort spent ahead of demand.

---

## PHASED IMPLEMENTATION PLAN

Each phase ends deployed + verified. Estimates assume the current cadence
(direct authoring, PR-per-unit, CI green).

### Phase 0 — Quick wins (1 session)
- [ ] `index.html`: rewrite title/description/OG for the course; add `og:image` (simple branded card in `public/`).
- [ ] Add `path: '*'` NotFound route (branded, links home).
- [ ] Friendlier `(unnamed)` → e.g. "New student (no name yet)".
- [ ] Spelling standardisation pass (British) across lesson prose; add a wordlist check to qa-verify.
- [ ] `_auth.ts`: make `iss`/`alg` checks strict; cache JWKS (module-level + `cf` cache, ~1 h TTL).
- [ ] Gate deploy on CI (single workflow: checks job → deploy job `needs: checks`).
- [ ] Run qa-verify + trace-test in CI (setup-python; parametrize the `py` launcher via env).
**Done when:** all merged, CI enforces content checks, link previews show current product.

### Phase 1 — Production & assessment hardening (1–2 weeks)
- [ ] **Clerk production instance**: create prod app, move keys to env (`CLERK_DOMAIN` secret/var, no hardcode), custom domain (e.g. pykiskis.lt) for app + Clerk.
- [ ] **Server-authoritative test grading (fix A1)**: new `POST /api/test-attempt` — server draws N questions (seeded), client submits answers, server grades against the banks (imported from `src/data/basics`), writes `test_attempts` table (user, lesson, score, per-question results, timestamp) and derives `best_score`. Client `bestScore` writes for progress-test lessons rejected. Keep old path for non-test lessons.
- [ ] Role claim in Clerk session token → `verifyTeacher` reads the JWT claim (no REST call); keep REST as fallback.
- [ ] Basic rate limiting: per-IP counter (KV or Durable-Object-free sliding window via cache) on `client-error` + write endpoints.
- [ ] Security headers: add `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`; CSP in report-only, then enforce.
- [ ] D1: scheduled export (wrangler cron or documented manual) + one restore drill; verify Time Travel.
- [ ] Privacy policy + Terms pages (`/privacy`, `/terms`), footer links, brief cookie note (Clerk).
**Done when:** real students authenticate against a production Clerk on a custom domain; test scores cannot be forged; a restore has been rehearsed.

### Phase 2 — UX & accessibility (2–3 weeks, parallelisable with 1)
- [ ] WCAG 2.1 AA pass: keyboard operability of quiz/test/exercise flows, visible focus states, aria on interactive components, contrast check of the palette, `prefers-reduced-motion`, skip-to-content.
- [ ] Mobile audit of the 5 core flows (lesson, quiz, test, runnable, dashboard) at 375 px.
- [ ] Branded Suspense splash + dashboard/table skeletons.
- [ ] **Student "My Results" page** (D2): per-test best score + attempt history (needs Phase 1 attempt log; degrade gracefully without).
- [ ] **Certificates** (D3): printable chapter/course completion certificate (HTML→print CSS; student name + date + teacher sign-off line).
- [ ] Copy pass: empty states, error states, confirmation dialogs — one voice, JSON-ready for i18n.
**Done when:** keyboard-only user can complete a lesson and a test; axe-core CI check green on core pages; students can see results and print certificates.

### Phase 3 — LMS depth (3–4 weeks)
- [ ] **Review mode** (D4): "Practice my mistakes" — draws from the student's wrong answers in `test_attempts`; spaced re-asks (simple Leitner boxes, no new infra).
- [ ] **Teacher item analytics** (D5): per-question success rate per class; most-missed list per test; misconception hints (which wrong option was most chosen).
- [ ] **Class join codes** (D6): teacher generates code, student enters it once — replaces manual member management.
- [ ] Assignment reminders (D7): in-app banner (existing MyAssignments panel) with due-soon states; email later via Clerk if wanted.
- [ ] **i18n completion** (D8): full wiring of non-theory fields (careful session, browser-verified), then LT translation of Ch2–7 prose module-by-module (same PR cadence as authoring; teacher reviews language).
- [ ] Badges: extend streaks with completion badges (chapter done, perfect test, 7-day streak) — data already exists.
**Done when:** a student can re-drill mistakes; the teacher can see which questions the class failed; students join classes with a code; the whole course is bilingual.

### Phase 4 — Scale readiness (4–6 weeks, only when a 2nd school is real)
- [ ] **Multi-tenancy (E1)**: Clerk Organizations — school = org; teachers scoped to their org; all D1 tables gain `org_id`; every teacher query filtered; migration assigns current data to org #1.
- [ ] Query efficiency (E2): per-class dashboard queries, D1 indexes (`lesson_progress(user_id)`, `class_members(class_id)`), pagination.
- [ ] Bundle: per-chapter dynamic content imports (E3) when content grows again.
- [ ] PWA (E7): manifest + service worker precache of app shell + Pyodide.
- [ ] Cloudflare Web Analytics (E6) — cookieless.
- [ ] Onboarding flow: new-school setup wizard (create org → invite teacher → join codes).
**Done when:** two orgs coexist with zero data bleed (tested), dashboard is fast at 1,000 students, app works offline-ish after first visit.

### Phase 5 — Monetisation (after a successful external pilot)
- [ ] Pricing: annual per-school tiers (suggest: Starter ≤30 students / Standard ≤150 / District custom; generous free tier for pilot partners).
- [ ] Stripe: Checkout + customer portal + webhook → `org_entitlements` in D1; Functions gate org features on entitlement; 60-day trial default.
- [ ] Public marketing site (static pages, SEO, sitemap): course tour, teacher features, pricing, testimonials from the pilot; keep app behind auth.
- [ ] Sales motion: Lithuanian CS-teacher communities, eTwinning, education fairs; grant applications in parallel (EU digital education funds often fit better than revenue at this stage).
**Done when:** a school can self-serve from landing page → trial org → paid, with zero manual steps.

---

## Suggested sequence & first move

Phase 0 is a single session and pure win. Phase 1 is the one I'd treat as
**non-optional before the next school year** — A1 (score forgery) and A2 (dev
Clerk) are the two findings that affect the product's core promise of trustworthy
assessment. Phases 2–3 are where daily classroom value compounds. Phases 4–5
only when an external school is actually interested — build ahead of demand, not
ahead of interest.
