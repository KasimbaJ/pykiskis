# Translate Chapter 1 theory content to Lithuanian — one module per run

> STATUS: **In progress — `output` done.**
> For the daily routine. Produces a draft PR per module for the teacher to review
> Lithuanian accuracy. Small, reviewable PRs.

## Goal

Add Lithuanian (`lt`) translations to Chapter 1 **theory** prose, so toggling the
header EN/LT switch shows the lesson text in Lithuanian. Do **one module per
run** (small PRs). The teacher reviews/refines the Lithuanian in each PR.

## Background (already in place)

- `LocalizedString = string | Partial<Record<'en'|'lt', string>>` and
  `localize()` exist in `src/i18n.ts`. A plain string = English-only; an
  `{ en, lt }` object = translated.
- Theory `ContentBlock` prose fields are already widened + rendered through
  `localize()`: `ParagraphBlock.text`, `HeadingBlock.text`, `NoteBlock.text`,
  `ListBlock.items[]`, and the `caption` of `runnable`/`figure`/`visualize`
  blocks. **These are the only fields to translate in this plan.**

## Per-run procedure

1. `npm ci`.
2. Read the checklist below; pick the **first unchecked module**.
3. In that module's file under `src/data/basics/ch1/`, for **theory lessons
   only**, convert each prose field from `'English'` to
   `{ en: 'English', lt: 'Lithuanian' }`. Translate ONLY:
   - `paragraph`/`heading`/`note` `text`, `list` `items`, and
     `runnable`/`figure`/`visualize` `caption`.
4. **Do NOT translate or touch:** any `code`, `expectedOutput`, figure `output`,
   `acceptedAnswers`, `inputValues`, `slug`, lesson/module `title`, quiz/
   exercise/progress-test fields (their types are not localized yet — adding
   `{en,lt}` there will fail the build). Translate prose only.
5. **Preserve markdown exactly:** keep inline `` `code` `` spans and `**bold**`
   markers; translate the surrounding words, never code identifiers, function
   names, or Python keywords. Keep `\n` and punctuation.
6. Verify: `npm run lint` and `npm run build` pass clean.
7. Tick the module in the checklist below; open a **draft PR** (never push to
   `master`). PR body: which module, that only theory prose changed, lint/build
   result, and a note asking the teacher to review the Lithuanian.

## Module checklist (one per run, in order)

- [x] get-started
- [x] numbers-and-strings
- [x] comments
- [x] variables
- [x] output
- [ ] arithmetic-operators
- [ ] data-conversion
- [ ] get-user-input
- [ ] introduction-examples
- [ ] recap

When all are checked, set STATUS to **Done** and update `plans/README.md`.
(Quiz / exercise / progress-test / title translations come after the wiring in
`i18n-complete-wiring-plan.md` lands — not part of this plan.)

## Done when
- Every Chapter 1 theory module's prose has `lt` translations; lint + build green;
  each landed via a reviewed draft PR.
