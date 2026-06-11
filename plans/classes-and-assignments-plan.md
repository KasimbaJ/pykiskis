# Classes + Assignments — Implementation Plan

> STATUS: **COMPLETE — all 3 phases SHIPPED.**
> Defaults locked: join-table membership, all-teachers-see-all (owner recorded),
> teacher-assigns. Live: classes API + class selector + Manage Classes UI +
> per-class filtering; assignments API + an **Assignments** tab per class
> (assign a test + due date; per-student completion, average, not-done list,
> overdue flag); and the student-facing **My assignments** panel on the home
> page (`/api/my-assignments` + deep links, due dates, done/overdue status).
> Assignments target **tests** in v1 (schema/types also allow lesson/level —
> a clean future add along with a student join-code).

## Goal

Turn the Teacher Dashboard from a single global roster into a real classroom tool:
1. **Classes** — group students into classes; filter the roster + Test Scores by class.
2. **Assignments** — assign a specific lesson/test/level to a class with a due
   date; track completion across the class; show students their assigned work.

Backward-compatible: with no classes defined, the dashboard behaves exactly as
today (an "All students" view). Everything is additive — no change to lessons,
grading, gating, or existing progress.

## Current state (grounding)

- **D1 tables:** `students(user_id,name,streaks…)`, `level_progress`, `lesson_progress(user_id,lesson_id,…,best_score)`. Schemas in `schema*.sql`.
- **API (Cloudflare Pages Functions, `functions/api/`):** `students.ts` (GET all students, teacher-gated via Clerk `role:teacher`), `progress.ts`, `basics-progress.ts`, `student-register.ts`.
- **Dashboard:** `DashboardPage` → `StudentTable` (Overview) / `ClassScoresTable` (Test Scores) / `StudentDetail`. Currently shows **all** students globally.
- **Content keys:** basics lessons use composite keys (`introduction.final-test.test`); phase levels use numeric ids. `progressTestsByChapter()` already enumerates test lessons.
- **Completion data already exists** in `lesson_progress` / `level_progress` — so assignment "done/not done" is a *derived join*, not new tracking.

## Decisions to confirm (OPEN)

1. **Student → class membership:** one class per student (simplest) vs. **many**
   (a student can be in multiple classes). Recommend a **join table** (supports
   many) but typical use is one — costs nothing extra and is future-proof.
2. **Multi-teacher visibility:** for now all `role:teacher` users see all
   students (single school). With classes, do we (a) keep all-teachers-see-all
   (classes owned by `teacher_user_id` just for "my classes" grouping), or
   (b) scope a teacher to only their own classes? Recommend **(a)** now, with
   `teacher_user_id` stored so we can tighten to (b) later. Confirm.
3. **How students join a class:** **teacher assigns** from the roster
   (recommended, simplest, full control) vs. a student **join code**. Recommend
   teacher-assign for v1; join-code is a clean future add.

## Data model (new tables — additive migration `schema-classes.sql`)

```sql
CREATE TABLE IF NOT EXISTS classes (
  id              TEXT PRIMARY KEY,          -- uuid
  name            TEXT NOT NULL,
  teacher_user_id TEXT NOT NULL,             -- Clerk id of creator
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS class_members (
  class_id TEXT NOT NULL,
  user_id  TEXT NOT NULL,                    -- student
  PRIMARY KEY (class_id, user_id)
);
CREATE TABLE IF NOT EXISTS assignments (
  id              TEXT PRIMARY KEY,          -- uuid
  class_id        TEXT NOT NULL,
  content_type    TEXT NOT NULL,             -- 'lesson' | 'test' | 'level'
  content_key     TEXT NOT NULL,             -- lesson_id, test lesson key, or level id (string)
  title           TEXT NOT NULL,             -- display label (e.g. "Final Test")
  due_date        TEXT,                      -- ISO date, nullable
  teacher_user_id TEXT NOT NULL,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_class_members_user ON class_members(user_id);
CREATE INDEX IF NOT EXISTS idx_assignments_class ON assignments(class_id);
```
Apply with `npx wrangler d1 execute pykiskis-db --file=schema-classes.sql --remote`.

## API surface (new Pages Functions; reuse `verifyClerkToken` + role check)

- `GET /api/classes` — teacher: classes (+ member counts). `functions/api/classes.ts`
- `POST /api/classes` — create `{ name }`.
- `POST /api/classes/[id]/members` — `{ add: [userId], remove: [userId] }`. `functions/api/classes/[id]/members.ts`
- `GET /api/assignments?classId=…` — teacher: assignments for a class.
- `POST /api/assignments` — create `{ classId, contentType, contentKey, title, dueDate? }`.
- `GET /api/my-assignments` — **student** (own token): the assignments for the
  classes they belong to, each annotated with their completion/score from
  `lesson_progress`/`level_progress`.
- Extend `GET /api/students` to accept optional `?classId=` (or filter
  client-side from a memberships fetch — simpler; decide during Phase 1).

All write endpoints **teacher-gated**; `my-assignments` returns only the
caller's own data.

## UI

**Teacher (DashboardPage):**
- A **class selector** (All · Class A · Class B …) above the Overview/Test Scores
  toggle; selecting one filters `StudentTable` + `ClassScoresTable` to that
  class's members. "All" = today's behaviour.
- A **"Manage classes"** affordance: create a class, add/remove students from the
  roster (checkbox-select → assign to class).
- An **Assignments** area (per class): create an assignment (pick content via a
  picker built from course data + `progressTestsByChapter()`, set a due date) and
  a completion view — for each student, done/not-done (+ score for tests),
  with overdue highlighting.

**Student:**
- An **"Assignments / To-do"** panel on the Basics home (or a small badge) listing
  assigned items with due dates and ✓ when complete (derived from their progress).
  Deep-links straight to the assigned lesson/test.

## Phases (each shippable, verified, additive)

**Phase 1 — Classes.** `schema-classes.sql` (classes + class_members) → classes
API (list/create/membership) → dashboard class selector + "Manage classes" UI +
filter roster/scores by class. Deliverable: group students, view the dashboard
per class. (No assignments yet.)

**Phase 2 — Assignments (teacher).** `assignments` table → assignments API →
teacher create + per-class completion view (derived from progress). Content
picker from course data.

**Phase 3 — Student view.** `GET /api/my-assignments` → student "Assignments"
panel with due dates + status + deep links.

## Verification (per phase)
- `npm run lint`, `npm run build` clean.
- Apply the migration to D1 (`--remote`); confirm tables exist.
- Browser-verify on the **teacher account** (now that `coderwannabe` is a
  teacher): create a class, assign students, filter the dashboard, create an
  assignment, and (Phase 3) view it as a student. Confirm "All students" view is
  unchanged when no class is selected.
- Commit, push, watch deploy.

## Risk notes
- **Additive & backward-compatible:** no classes → dashboard works as today; no
  change to lessons/grading/gating/progress. New tables + endpoints only.
- **Auth is the careful part:** teacher-gate all writes; `my-assignments` must
  return only the caller's data. Mirror the existing `verifyClerkToken` + role
  pattern in `students.ts`.
- **Completion is derived** from existing progress tables — no duplicate
  truth, nothing to keep in sync.
- New Pages Functions dynamic routes (`classes/[id]/members.ts`) — confirm the
  file-based routing resolves on Cloudflare Pages during Phase 1.

## Done when
- A teacher can create classes, assign students, and filter the dashboard by class.
- A teacher can assign a lesson/test to a class with a due date and see who's done it.
- A student sees their assigned work with due dates and completion.
- All additive; "All students" view and every existing feature unchanged.
