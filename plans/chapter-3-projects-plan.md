# Chapter 3 — Projects (FEATURED) — Authoring Plan

> STATUS: **Done & deployed.** All 5 projects authored, qa-verified (real
> Python), lint/build clean, and merged (PRs #26–#30): Number Guessing Game,
> Simple Calculator, Student Grade Calculator, Rock-Paper-Scissors, Mad Libs.
> Format approved by the teacher (Number Guessing Game as the reference).

## Goal

Fill Chapter 3 (`ch3-projects.ts`, slug `projects-1`, currently an empty stub)
with **guided, build-it-step-by-step projects** that apply Chapters 1–2 skills
(print, variables, data types, if/else, while/for loops). Modeled on the
teacher's reference course. Three projects:

1. **Number Guessing Game** (reference — build first)
2. **Simple Calculator**
3. **Student Grade Calculator**

## Model mapping (no new types)

- **Each project = one `Module`** in `ch3`.
- **Each build-step = one `Lesson`** (mostly `theory` with a `runnable` showing
  the code-so-far; a few graded `exercise` lessons; a `recap` to close).
- The reference's internal "Ch 1–5" groupings become an ordered sequence of
  lessons within the module (Pykiškis modules are flat lesson lists).
- No progress tests in project modules (so they're correctly omitted from the
  Teacher Dashboard's test gradebook, which keys off `progress-test` lessons).

## Interactive-code rules (important — learned from qa-verify.ts)

- Runnables/exercises may use `input()`. Provide **`inputValues`** so they run.
  The mock input **does not echo the prompt** (unlike the reference terminal
  screenshots), so in-lesson demo output won't show "Enter a number: 12" — the
  prose describes the interaction. In the real app, `input()` is **interactive**
  (SharedArrayBuffer), so students type live regardless of `inputValues`.
- qa-verify only checks that **runnables don't error** (output not compared), so
  `random` is fine in a runnable. But an **unbounded** guess loop will exhaust
  `inputValues` → `int('')` → ValueError. So any looping input demo must either
  (a) use a **fixed secret** with exact winning inputs, or (b) have a **guess
  cap** (`attempts < N`) and be given `N+1` inputValues so it always terminates.
- Graded `exercise` lessons must be **deterministic** — avoid `random` in a
  solution whose `expectedOutput` is checked; use a fixed value + `inputValues`.

## Project 1 — Number Guessing Game (module `number-guessing-game`)

Lessons (in order):
1. `meet-your-project` (theory) — what you'll build + what you'll learn.
2. `what-you-need` (theory) — prerequisites (print, variables, types, if/else, while).
3. `game-overview` (theory) — plan the logic in plain steps (figure/pseudocode).
4. `a-first-guess` (theory + runnable) — fixed `secret = 7`, one `int(input())`, `==`.
5. `check-the-guess` (theory + runnable) — `if/elif/else` too low / too high / correct.
6. `quiz` or `exercise` — graded: print too-low/high/correct for a fixed secret (`inputValues`).
7. `let-them-guess-again` (theory + runnable) — `while guess != secret` (fixed secret, exact inputs).
8. `intro-to-randomization` (theory + runnable) — `import random`, `random.randint(1, 10)` demo.
9. `a-random-secret` (theory + runnable) — complete game: random secret + **guess cap** (6 inputValues).
10. `what-youve-built` (theory) — recap of the finished program.
11. `add-more-features` (theory) — ideas to extend (ranges, attempt count, play-again).
12. `recap` (recap) — congrats + share.

## Project 2 — Simple Calculator (module `simple-calculator`)
Add two numbers → full operator set (+ − * / **) → operator input → if/elif ladder
→ divide-by-zero handling → loop to calculate again → formatting/polish → recap.
(Deterministic: fixed/`inputValues` demos; no random.)

## Project 3 — Student Grade Calculator (module `student-grade-calculator`)
Read a subject count → loop to read N scores (accumulate total) → average →
grade band (if/elif) → report → input validation → polish → recap.

## Per-project procedure
1. Author `src/data/basics/ch3/<project-slug>.ts`; wire into `ch3-projects.ts`.
2. `npx tsx qa-verify.ts` (real Python — must pass) + `npm run lint` + `npm run build`.
3. Branch → PR → squash-merge (`--subject` explicit). One project per PR.

## Done when
All three projects are authored in the guided step-by-step style, qa-verified,
lint/build clean, merged, and Chapter 3 no longer reads "Coming soon".
