# Language Toggle (i18n) — Implementation Plan

> STATUS: **Phase 1 SHIPPED.** Decisions locked: EN + LT, default EN, UI +
> content, routine drafts translations per module for approval, lightweight
> custom approach (no new dep). Phase 1 (foundation + theory-content wiring +
> header toggle) is built, browser-verified, and deployed.
>
> REMAINING:
> - **Complete the wiring** (widen + resolve the non-theory surfaces): lesson/
>   module/chapter titles, QuizView, ExerciseView, ProgressTestView, RecapView
>   (and, later, the 100-level path). Code task — best done in a careful session
>   (tsc-guided), then it unlocks translating those fields. See
>   `i18n-complete-wiring-plan.md`.
> - **Translate content** progressively, one module per run via the daily
>   routine. Theory prose is already wired/translatable now. See
>   `i18n-translate-ch1-plan.md`.

## The timing question (answered)

**Adopt the architecture now; translate progressively. Do not wait until the
site is "complete."** There are already ~1,600 learner-facing strings (≈999 in
Chapter 1 basics content, ≈601 in the 100-level path) plus ~31 component files of
UI text — and only 1 of 7 chapters is built. Retrofitting i18n after the course
is finished means reworking all of it. The fix: adopt a **backward-compatible**
content model now (plain English strings keep working, untouched), then layer in
translations over time and author new chapters translation-ready from the start.

The *mechanism* is a moderate, low-risk, additive change. The *translation of
content* is a large but progressive effort that does not block the mechanism.

## Decisions to confirm (OPEN — do not guess)

1. **Languages.** Assumed **English (`en`) + Lithuanian (`lt`)** given the school
   context. Confirm (add more later — the model supports N languages).
2. **Default language.** Content is currently English. Options: default English
   with a toggle, or default **Lithuanian** (school's native) with English
   fallback, or detect from browser locale then remember. Recommend: remember
   the user's choice; first-visit default = Lithuanian for this school.
3. **Scope.** UI chrome **and** lesson content (recommended — the real
   comprehension win), vs UI only (low value). Assume both.
4. **Who translates content.** Teacher / professional / machine-draft +
   teacher review / drafted module-by-module by the daily routine + agents into
   PRs for review. Recommend **machine-draft + teacher review, progressive**;
   the routine is well-suited to drafting one module per run.
5. **Don't translate code.** Python snippets, variable names, `expectedOutput`,
   and accepted answers stay language-neutral — only prose (text/titles/
   prompts/captions/explanations/hints) is translated. (Watch-out, important.)

## Architecture — two layers

### A. Lesson/level content: a non-breaking `LocalizedString`
The crux. Make translation additive so existing content compiles unchanged.

```ts
export type Lang = 'en' | 'lt'
export type LocalizedString = string | Partial<Record<Lang, string>>

// Resolve to a display string: chosen lang → default (en) → any available.
export function localize(v: LocalizedString, lang: Lang): string {
  if (typeof v === 'string') return v
  return v[lang] ?? v.en ?? Object.values(v)[0] ?? ''
}
```

- A **plain string** = "not yet translated / same in all languages" → keeps
  working. A **`{ en, lt }` object** = translated. So **no big-bang refactor**:
  existing Chapter-1 content stays valid; you add `lt` where translated.
- Change the text-bearing fields in `src/types/basics.ts` and `src/types/index.ts`
  from `string` to `LocalizedString` (e.g. `ContentBlock` text, lesson `title`,
  question `prompt`/`explanation`/`hint`, `RecapLesson` summary, `Level` title/
  task/explanation/concept/hints). TypeScript accepts plain strings everywhere,
  so this compiles without touching content.
- **Render layer resolves**: the central render points call `localize(field, lang)`:
  - `ContentBlockRenderer` (paragraph/heading/note/list/code/figure/visualize/runnable captions) — the main one.
  - `renderInline` call sites (resolve before passing in).
  - Lesson/module/chapter titles, `ProgressTestView` prompts/options/explanations,
    `ExerciseView`/`QuizView` text, `RecapView`, the level pages.
  - **Leave code-bearing fields alone** (snippet `code`, `expectedOutput`,
    `acceptedAnswers`, `inputValues`).

### B. UI chrome strings (~31 components)
Buttons, labels, headers, empty states. Two options:
- **Lightweight custom** `t(key)` backed by per-language dicts + the language
  store (no new dependency; fits the app's size and existing Zustand usage). Recommended to start.
- **react-i18next** (industry standard; interpolation/pluralization/tooling) if
  you want the ecosystem — heavier, a new dependency. Sub-decision.

### C. Language store + toggle
- `useLangStore` (Zustand + `persist`), mirroring `useThemeStore`:
  `{ lang: Lang; setLang(l) }`, saved to localStorage. (Later: sync to D1
  per-user settings so it follows the student across devices.)
- A **toggle in `Header`** next to the theme toggle — a compact `EN | LT` switch
  or a globe dropdown.
- Initial value from the store; first-visit default per decision #2.

## Phases

**Phase 1 — Mechanism (no content translated yet).**
`Lang`/`LocalizedString`/`localize()` + `useLangStore` + header toggle; widen the
text-field types; wire `localize()` into the central renderers. All content stays
English plain strings → the app looks identical, but the plumbing is ready.
Verify: toggle present; switching language doesn't break anything (everything
still shows English because nothing's translated yet); code/outputs unaffected;
lint + build green.

**Phase 2 — UI chrome translation.**
Extract the ~31 components' UI strings to a `t()` dictionary; add Lithuanian.
Verify: toggling switches all chrome (buttons, headers, dashboard, etc.).

**Phase 3 — Content translation (progressive).**
Translate Chapter-1 prose into `{ en, lt }`, one module at a time (machine draft
+ teacher review). Prove the flow on one module first. New chapters authored
bilingually. The daily routine can draft a module per run into PRs for review.

**Phase 4 — Polish.**
Per-user language persisted to D1; verify `qa-verify` still passes (code is
language-neutral, so predict-output checks are unaffected); locale-aware number/
date formatting if ever needed.

## Effort & risk

- **Phase 1:** moderate, **low-risk, fully additive** — `LocalizedString` is
  backward-compatible, so nothing breaks and content is untouched. Main work is
  wiring `localize()` into the handful of shared renderers.
- **Content translation:** large but **progressive and non-blocking**; can be
  spread across sessions / the routine.
- **Risk:** low, provided (a) the model stays backward-compatible (no big-bang),
  and (b) **code/expected-output is never translated**. The render-site wiring is
  the only place to be thorough — concentrated in a few components.
- **No production risk to current users:** until content is translated, the app
  behaves exactly as today; the toggle just swaps UI chrome (Phase 2+).

## Done when
- A header language toggle switches UI (and translated content) between EN/LT.
- Untranslated content falls back gracefully to English.
- Python code, expected outputs, and answer keys are unaffected by language.
- lint + build green; deployed.
