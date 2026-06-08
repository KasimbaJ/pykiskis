# Class Scores Table — consolidated test gradebook

> STATUS: **DONE & DEPLOYED** (after the exam, as planned). The Teacher
> Dashboard now has an "Overview / Test Scores" toggle; the Test Scores view is a
> class-wide table (students × tests) with per-student Average and CSV export.
> Implemented via `progressTestsByChapter()` (src/data/basics/index.ts),
> `ClassScoresTable.tsx`, and a toggle in `DashboardPage.tsx`. No API/DB change.
>
> Self-contained handoff (kept for reference).

## Goal

One table on the Teacher Dashboard showing **every student's progress-test and
final-test scores together** (rows = students, columns = Progress Test 1–4 +
Final Test), with a per-student average and a CSV/print export. Today scores are
only visible one student at a time in `StudentDetail`.

## Key insight — the data is already there

`GET /api/students` already returns each student with
`basics.testScores` (a map of `lessonId → best score 0–10`). The whole class's
scores are **already fetched** by the dashboard. So this is a **pure new
read-only view** — **no API change, no DB change, no change to how tests are
taken, scored, saved, or gated.**

## Timing & risk (read first)

- The feature is **additive, read-only, and teacher-only**. It does not touch the
  exam-taking flow, scoring, saving, unlock gating, or any student-facing screen.
- **But shipping it requires a deploy to production**, and deploying anything the
  day of a high-stakes exam is an unnecessary risk. The consolidated table is
  also most useful *after* students have taken the final test.
- **Recommendation: implement and deploy AFTER the exam.** The exam does not
  depend on this feature in any way. Freeze production until the exam is done.

## Current state (for a fresh session)

- `src/pages/DashboardPage.tsx` — teacher-gated; shows `StudentTable` (list) or
  `StudentDetail` (drill-down). Data via `useDashboardStore` → `/api/students`.
- `src/components/dashboard/StudentTable.tsx` — the all-students list (one row
  per student; already reads `student.basics.testScores`).
- `src/components/dashboard/StudentDetail.tsx` — per-student; already derives
  `PROGRESS_TESTS_BY_CHAPTER` (progress-test lessons grouped by chapter) and
  renders each student's scores. **Reuse this column logic.**
- `src/types/index.ts` — `StudentProgress.basics.testScores: Record<string, number>`.
- Test lesson key shape: `introduction.progress-test-1.test` … `introduction.final-test.test`.

## Implementation steps

### 1. Extract the test-columns helper (pure refactor)
`StudentDetail.tsx` already computes `PROGRESS_TESTS_BY_CHAPTER` from the course
data. Move that into a shared export (e.g. `src/data/basics/index.ts`):
```ts
export function progressTestsByChapter(): {
  chapterId: number; chapterTitle: string; tests: { key: string; label: string }[]
}[]
```
Refactor `StudentDetail` to import it (no behavior change — verify the per-student
view looks identical). This keeps columns derived from course data, so future
chapters' tests appear automatically.

### 2. New component `src/components/dashboard/ClassScoresTable.tsx`
- Props: `{ students: StudentProgress[] }`.
- Columns from `progressTestsByChapter()` flattened to `{ key, label }[]` (group
  headers per chapter if multiple chapters have tests).
- One row per student: `student.studentName`, then a cell per test column showing
  `student.basics?.testScores[key]` as `X/10`, or `—` if not taken; then an
  **Average** column (mean of taken scores, 1 dp).
- Make the **first column (names) sticky** and wrap in `overflow-x-auto` for many
  columns.
- Optional: a class-average footer row (mean per test column).
- **CSV export button:** build a CSV string (header = Student + test labels +
  Average; one line per student) and trigger a download via a `Blob` +
  `URL.createObjectURL` + a temporary `<a download>`. No new dependency. Filename
  like `pykiskis-scores-YYYY-MM-DD.csv`. (The on-screen table is also
  print-friendly via the browser's Print.)

### 3. Wire into `DashboardPage.tsx`
On the list view (not the drill-down), add a small **view toggle**: "Overview"
(existing `StudentTable`) vs "Test Scores" (new `ClassScoresTable`). Keep the
`StudentDetail` drill-down unchanged. (Simplest alternative: render
`ClassScoresTable` below `StudentTable` with a heading — but a toggle keeps it
uncluttered. Default to the toggle.)

### 4. Verify
- `npm run lint` && `npm run build` clean.
- Browser-verify with the teacher account: the table lists all students × all
  tests with correct scores and "—" for not-taken; Average is right; CSV
  downloads and opens correctly; per-student drill-down still works.

### 5. Ship
Commit, `git push origin master`, `gh run watch <id>`.

## Done when
- The teacher can see one table of all students × all tests (PT1–4 + Final),
  with averages, and export it to CSV.
- Per-student detail is unchanged; no student-facing behavior changed.
- lint + build green; deployed (AFTER the exam).

## Risk notes
- Additive + read-only + teacher-only → cannot affect the exam or student flows.
- The only shared edit is extracting the columns helper — a pure refactor caught
  by `tsc` and the unchanged `StudentDetail` render.
- No API/DB/schema change. No new dependencies.
