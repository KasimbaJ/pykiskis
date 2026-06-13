# Chapter 6 — Completing Basics — Authoring Plan

> STATUS: **In progress.** Final Basics chapter. Build module-by-module
> (qa-verified), mirroring the Ch1/2 lesson + test structure.

## Goal
Fill `ch6-completing-basics.ts` (slug `completing-basics`, empty stub) in the
Ch1/2 style. From the teacher's reference outline + steer (2026-06-13):
**Using Modules, Nested Loops, Miscellaneous**, a **different capstone** (the
reference's RPS is already a ch3 project), a Recap, and tests.

## Module order
1. `using-modules`  — `import`, the `math` module (sqrt/floor/ceil/pi), `random`
   recap (randint/choice), `from ... import`.
2. `nested-loops`   — a loop inside a loop, iteration order, printing rows on one
   line with `print(..., end="")`, a grid/pattern.
3. `miscellaneous`  — **Assignment operators** (`+= -= *= /=`), **None** (functions
   with no return), **Truthy/Falsy** (`bool()`, `if name:`), **pass** statement.
   (Confirmed by the teacher's reference screenshot.)
4. `progress-test-1` — 25-Q bank (modules + nested loops + misc) → draws 10.
5. `math-quiz-game`  — **CAPSTONE** (different from RPS): imports `random`, asks a
   fixed number of random arithmetic questions in a loop, checks answers, tracks
   score, reports a grade. Build-it-step-by-step like the ch3 projects. Bounded
   `for` loop → safe inputValues; random means output varies but is not checked.
6. `recap`          — recap module.
7. `final-test`     — draws 15 from the bank, /10.

Tests in `src/data/basics/ch6/progress-tests.ts` (one bank; progress draws 10,
final draws 15).

## Conventions / watch-outs (same as Ch1–5 + ch3 interactive rules)
- math functions are deterministic (e.g. `math.sqrt(16)` → `4.0`); `random` only
  in runnables (output not checked, must not error).
- Nested-loop demos deterministic; `print(x, end="")` introduced with explanation.
- Capstone quiz: bounded `for` loop with exactly enough `inputValues`; answers are
  random so a graded exercise (if any) must stay deterministic (fixed values).
- See [[ch3-projects-interactive-code-rules]].

## Per-module procedure
1. Author `src/data/basics/ch6/<slug>.ts`; wire into `ch6-completing-basics.ts`.
2. `npx tsx qa-verify.ts` + lint + build (all pass).
3. Branch → PR → squash-merge (`--subject`). Ship in units.

## Then
Basics track (Ch1–6) complete. Remaining backlog: i18n full wiring, ch6 capstone
polish, optional extra projects, error monitoring — revisit with teacher.
