# Chapter 4 — Functions — Authoring Plan

> STATUS: **In progress.** Building module-by-module (qa-verified each), mirroring
> the Chapter 1/2 lesson + test structure.

## Goal

Fill `ch4-functions.ts` (slug `functions`, empty stub) in the Chapter 1/2 style.
From the teacher's reference outline: **Python Functions, Local Variables, Think
Functions, Recap** — plus assessments to match the other chapters.

Introduces `def`, parameters/arguments, `return`, and scope. This is the first
chapter where students define their own functions (Ch1–3 deliberately did not).

## Module order (each = one Module; build-steps = Lessons)
1. `python-functions`   — `def`, calling, parameters/arguments, `return`, return vs print, a `visualize` of a call.
2. `local-variables`    — scope: local vs global, why locals don't leak, parameters as locals.
3. `progress-test-1`    — 25-Q bank (functions + scope) → draws 10.
4. `think-functions`    — applied: spotting repetition, refactoring into functions, worked examples + exercises.
5. `recap`              — recap module.
6. `final-test`         — draws 15 from the bank, /10.

(Single bank is fine here — smaller chapter than Ch1/2. Data Types (ch5) is the
big multi-topic chapter and will use multiple banks like Ch1/2.)

## Conventions (same as Ch1–3)
- Block kinds: paragraph/heading/note/list/code/runnable/figure/visualize. Use
  `visualize` to step into a function call (locals + return).
- Function runnables are deterministic (no input needed) → easy to qa-verify.
- Graded `exercise` solutions must produce the stated `expectedOutput` in real Python.

## Per-module procedure
1. Author `src/data/basics/ch4/<slug>.ts`; wire into `ch4-functions.ts`.
2. `npx tsx qa-verify.ts` + `npm run lint` + `npm run build` (all pass).
3. Branch → PR → squash-merge (`--subject` explicit). One module per PR.

## Then
ch5 Data Types (Lists, Tuples, Strings, Dictionaries, Sets, Conversion, range(),
Recap — mirror Ch1/2 with multiple progress-test banks + Final Test), then
ch6 Completing Basics (Using Modules, Nested Loops, Miscellaneous, Rock-Paper-
Scissors project — decide reuse/vary vs the ch3 RPS).
