# Chapter 5 — Data Types — Authoring Plan

> STATUS: **In progress.** Largest chapter. Build module-by-module (qa-verified),
> mirroring the Ch1/2 multi-bank test structure.

## Goal
Fill `ch5-data-types.ts` (slug `data-types`, empty stub) in the Ch1/2 style.
From the teacher's reference outline: **Lists, Tuples, Strings, Dictionaries,
Sets, Conversion, range()** + Recap, plus progress tests and a Final Test.

Introduces Python's collection types. Builds on Ch1–4 (variables, loops, functions).

## Module order
1. `lists`            — create, index, modify, append/remove, len, iterate.
2. `tuples`           — immutable sequences, packing/unpacking, when to use.
3. `progress-test-1`  — bank: Lists + Tuples (25 → 10).
4. `strings`          — indexing, slicing, methods (.upper/.lower/.split), len, loop over.
5. `dictionaries`     — key/value, access, add/update, keys()/values(), iterate.
6. `progress-test-2`  — bank: Strings + Dictionaries.
7. `sets`             — unique items, add, membership, set ops (union/intersection).
8. `conversion`       — list()/tuple()/set()/str(), str.split/join, between collections.
9. `range-function`   — range as a sequence, list(range(...)), start/stop/step recap.
10. `progress-test-3` — bank: Sets + Conversion + range.
11. `recap`           — recap module.
12. `final-test`      — draws 15, 5 per bank (test1/2/3).

Tests live in `src/data/basics/ch5/progress-tests.ts` (test1Bank..test3Bank,
progressTest1Module..3, finalTestModule with questionBanks:[1,2,3], presentCount 15).

## Conventions (same as Ch1–4)
- Block kinds incl. `visualize` (great for list mutation / aliasing — the
  visualizer draws arrows once mutable objects appear).
- Deterministic runnables (no input needed) → easy to qa-verify; figures with
  output must match real Python exactly.
- Watch-outs: list indices 0-based; negative indices; slicing stop-exclusive;
  dict KeyError on missing key; sets are unordered (avoid asserting set print
  order in predict-output/figures — use membership or len instead).

## Per-module procedure
1. Author `src/data/basics/ch5/<slug>.ts`; wire into `ch5-data-types.ts`.
2. `npx tsx qa-verify.ts` + lint + build (all pass).
3. Branch → PR → squash-merge (`--subject`). One module (or small group) per PR.

## Then
ch6 Completing Basics (Using Modules, Nested Loops, Miscellaneous, Rock-Paper-
Scissors project — decide reuse/vary vs the ch3 RPS).
