# Chapter 2 — Decision Making & Loops — Content Authoring Plan

> STATUS: **Done.** All 12 items authored, qa-verified (real Python), and merged
> (PRs #14, #16–#24). Chapter 2 is live: 7 content modules + applied examples +
> Recap + 3 progress tests + Final Test (15 questions, 5 per bank, /10).
> Mirrors Chapter 1 in structure, depth, and conventions.

## Goal

Author Chapter 2 ("Decision Making & Loops") to the same quality/shape as
Chapter 1: multi-screen theory lessons + quizzes + exercises + `visualize`
blocks where stepping helps, plus progress tests and a final test.

## Decisions (locked with the teacher)

- **Mirror Ch1 test structure:** progress tests after content modules **2, 4, 6**
  (each a **25-question bank** → 10 random per attempt) + a **Final Test** after
  the Recap (draws **5 from each of the 3 banks = 15**, graded /10).
- **"Your First Python Projects" belongs to Chapter 3**, not here. Chapter 2
  ends at the Recap.

## Structure & file layout (mirror Chapter 1)

Create `src/data/basics/ch2/` with one file per module, and rewrite
`src/data/basics/ch2-decision-making-loops.ts` to import + order them (mirror
`src/data/basics/ch1-introduction.ts` and `src/data/basics/ch1/*`).
`src/data/basics/index.ts` already lists `ch2`, so modules appear as they land.

**Final module order** (place each new module here as it's authored):
1. `python-booleans`           (content)
2. `if-else-statement`         (content)
3. `progress-test-1`           (bank: Booleans + if/else)
4. `logical-operators`         (content)
5. `while-loop`                (content)
6. `progress-test-2`           (bank: Logical + while)
7. `for-loop`                  (content)
8. `break-and-continue`        (content)
9. `progress-test-3`           (bank: for + break/continue)
10. `control-flow-examples`    (content; applied — mostly worked examples + exercises)
11. `recap`                    (recap module)
12. `final-test`               (15 questions, 5 per bank, /10)

Progress tests + banks live in `src/data/basics/ch2/progress-tests.ts`
(mirror `ch1/progress-tests.ts`: export `test1Bank`…`test3Bank`,
`progressTest1Module`…`3`, `finalTestModule` with
`questionBanks: [test1Bank, test2Bank, test3Bank]`, `presentCount: 15`).

## Authoring conventions (match Chapter 1 exactly — read these as templates)

- Study `src/data/basics/ch1/variables.ts`, `arithmetic-operators.ts`,
  `get-started.ts`, `recap.ts`, and `ch1/progress-tests.ts` for the exact lesson
  shapes (`theory` blocks, `quiz`, `exercise`, `recap`, progress-test questions).
- Block kinds: `paragraph`/`heading`/`note`/`list`/`code`/`runnable`/`figure`/`visualize`.
  Use `visualize` where watching state change teaches (loops counters,
  if/elif branch selection) — Ch2 is the **best showcase yet** for the visualizer.
- Markdown-lite: `` `code` `` and `**bold**`. Keep snippets short, beginner-level.
- Each content module: ~6–14 lesson screens mixing theory + a quiz or two + at
  least one exercise; end content modules naturally (the Recap is its own module).
- **English content** (Ch2 is not translated yet; plain strings are fine —
  `LocalizedString` accepts them).

## CRITICAL — verify all executable content

Every `predict-output` question, `runnable`, `figure` (with output), and
`exercise` solution must produce the stated output in **real Python**. The
remote routine may not have Python, so:
- The routine runs `npm run lint` + `npm run build` (must pass) and notes in the
  PR that **`qa-verify` was NOT run (no Python in the environment)**.
- **At review, a human runs `npx tsx qa-verify.ts`** on the branch (Python
  available locally) and fixes any output mismatches before merge. Do NOT merge a
  content module until qa-verify is green.
- Watch-outs (from Ch1 QA): `==` is equality not `=`; integer vs float results
  (`/` always float); `\n` is the newline escape; check `range()`/loop bounds and
  off-by-one; never accept a wrong answer key.

## Per-module specs (objectives + suggested screens)

**1. python-booleans** — `True`/`False`, the `bool` type; comparison operators
`== != > < >= <=` producing booleans; `bool()` of values + truthiness (0, "",
non-empty). Screens: intro → booleans as values → comparisons (figure table +
runnables) → truthiness → a `visualize` (a comparison producing a bool) →
quiz(es) → exercise (print whether `a > b`). Watch: `==` vs `=`, capitalised
`True`/`False`.

**2. if-else-statement** — `if`, `if/else`, `if/elif/else`, the colon + 4-space
indentation, simple nesting. Screens: intro → `if` syntax (note on `:` and
indent) → runnable → `if/else` → `if/elif/else` → nested `if` → `visualize`
(step an if/elif chain, show which branch runs) → quizzes → exercises (even/odd;
grade band). Watch: colon, indentation, `==` in conditions.

**3. progress-test-1** — 25-question bank: Booleans + if/else. Mix mcq /
predict-output / fill-in-blank. `progressTest1Module` draws 10.

**4. logical-operators** — `and`, `or`, `not`; combining conditions; truth
tables; precedence with comparisons. Screens: intro → `and` → `or` → `not` →
combining in an `if` → truth-table figure → `visualize` → quizzes → exercise
(e.g. "in range" check). 

**5. while-loop** — `while` syntax, the condition, updating the counter,
infinite-loop caution, accumulators. Screens: intro → `while` + counter
(runnable) → **`visualize`** (step the counter — ideal) → infinite-loop `note` →
running total → quizzes → exercises (countdown; sum 1..n). Watch: update the
loop variable or it never ends.

**6. progress-test-2** — 25-question bank: Logical Operators + while.

**7. for-loop** — `for` with `range()`; `range(start, stop, step)`; iterating a
string; accumulator pattern. Screens: intro → `for` + `range` (runnable) →
`range` variants → for-over-string → **`visualize`** (loop building a total) →
quizzes → exercises (times table; count vowels). Watch: `range(n)` is `0..n-1`.

**8. break-and-continue** — `break` (exit), `continue` (skip), in `for` & `while`.
Screens: intro → `break` → `continue` → combined → `visualize` → quizzes →
exercise (stop at first match; skip multiples).

**9. progress-test-3** — 25-question bank: for + break/continue.

**10. control-flow-examples** — applied, mostly worked examples + exercises
(mirror Ch1 `introduction-examples`): FizzBuzz-style, number classification,
multiplication table, sum of evens, simple input-driven loop. Each as a
`runnable`/worked example or an `exercise`.

**11. recap** — recap module (mirror `ch1/recap.ts`): a few `theory` recap
screens summarising booleans, conditionals, and loops + a `recap`-type
completion lesson pointing to the Final Test.

**12. final-test** — `finalTestModule`, `presentCount: 15`,
`questionBanks: [test1Bank, test2Bank, test3Bank]`, after the Recap.

## Per-run procedure
1. `npm ci`. Read this plan + the Ch1 template files.
2. Pick the **first unchecked** checklist item below.
3. Author it (new file under `src/data/basics/ch2/`; wire it into
   `ch2-decision-making-loops.ts` at the correct position).
4. `npm run lint` + `npm run build` clean. State in the PR that qa-verify needs a
   human run (no Python here).
5. Tick the item; open a **draft PR** (never push to `master`). PR body: what was
   authored, lint/build result, and "⚠ run `npx tsx qa-verify.ts` before merge".

## Checklist (one item per run, in order)
- [x] python-booleans
- [x] if-else-statement
- [x] progress-test-1 (bank)
- [x] logical-operators
- [x] while-loop
- [x] progress-test-2 (bank)
- [x] for-loop
- [x] break-and-continue
- [x] progress-test-3 (bank)
- [x] control-flow-examples
- [x] recap
- [x] final-test

When all are checked, set STATUS to **Done** and update `plans/README.md`.

## Done when
- Chapter 2 has all 8 content/recap modules + 3 progress tests + a final test,
  in order, in the Ch1 style; lint + build + **qa-verify** green; each landed via
  a reviewed draft PR.
