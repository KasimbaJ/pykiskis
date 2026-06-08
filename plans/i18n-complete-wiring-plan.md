# Complete i18n wiring for the remaining basics surfaces

> STATUS: **Proposed — for a careful (human-reviewed) session, NOT the daily
> routine.** This is a broad type change across many components; do it with
> browser verification, not unattended. Do not mark Pending.

## Goal

Extend the Phase-1 i18n mechanism (already shipped: `LocalizedString`,
`localize()`, `useLangStore`, header toggle, theory-content wiring) to the rest
of the Basics surfaces so the EN/LT toggle switches everything, not just theory
prose.

## Scope — widen types + resolve via `localize(field, lang)`

In `src/types/basics.ts`, widen these prose fields to `LocalizedString` and
resolve them at their render sites (tsc will list every site):

- **Titles:** `Chapter.title/subtitle/description`, `Module.title/summary`,
  `LessonBase.title`. Render sites: `LessonPage`, `ChapterPage`,
  `BasicsHomePage`, `CourseOutlineDrawer`, `RecapView`, and the dashboard
  `StudentDetail`/`progressTestsByChapter` labels (careful: the dashboard uses
  module titles as column labels — resolve with a default lang there).
- **Quiz:** `QuizLesson.question/explanation`, `QuizOption.text` → `QuizView`.
- **Exercise:** `ExerciseLesson.problemDescription`, `remember[]` →
  `ExerciseView`. (NOT `starterCode`/`expectedOutput`/`solution`/`inputValues`.)
- **Progress test:** `ProgressTestLesson.intro`, and question `prompt`/
  `explanation`/`hint`, `QuizOption.text` in MCQ → `ProgressTestView`. (NOT
  `code`/`expectedOutput`/`acceptedAnswers`.)
- **Recap:** `RecapLesson.congratsTitle/summary/nextModuleTitle` → `RecapView`.

Leave the 100-level path (`src/types/index.ts` `Level`, `src/data/levels/*`) for
a later pass — it's the secondary track.

## Watch-outs
- Never translate code, expected output, or answer keys.
- The dashboard renders module titles as `testScores` column labels and in keys —
  resolve titles with `localize(title, 'en')` (or the teacher's lang) for stable
  display; keys are slugs (unaffected).
- `progressTestsByChapter()` returns `label: m.title` (now LocalizedString) —
  resolve in the dashboard components.

## Verify
- `npm run lint`, `npm run build`, `npx tsx qa-verify.ts` all clean.
- Browser-verify with the teacher account: toggle EN/LT and confirm titles,
  quiz, exercise, progress-test, and recap text switch; code/outputs unchanged.

## Done when
- The EN/LT toggle switches all Basics surfaces; only prose changes; everything
  else (code, outputs, answers, gating, scores) is unaffected.

## After this lands
- `i18n-translate-ch1-plan.md` can expand to translate quiz/exercise/test/recap
  text too (their types will then accept `lt`).
