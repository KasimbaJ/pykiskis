# Chapter 7 — Projects (FEATURED) — Authoring Plan

> STATUS: **Approved; building project 1.** `ch7-projects.ts` (slug `projects-2`,
> `featured: true`) is an empty stub reading "Coming soon". This plan fills it.
> Project lineup confirmed by the teacher: To-Do List Manager, Contact Book,
> Hangman, Word Frequency Counter. (Tic-Tac-Toe considered and deferred.)
>
> TEACHER DECISIONS (2026-06-19):
> - **Cadence:** build **To-Do List Manager first**, open its PR, then **pause for
>   format sign-off** before authoring projects 2–4.
> - **Hangman:** graded steps + the qa-verified "complete game" use a **fixed word
>   + exact inputs** (deterministic); random word selection shown only in an
>   ungraded runnable demo, with prose noting the real app is live + random.

## Goal

Fill Chapter 7 with **capstone projects that exercise all of Basics (Ch1–6)** —
the key step-up from Chapter 3, which used only Ch1–2 skills. Ch7 projects must
actively use **functions (Ch4)** and **data types + structure (Ch5–6: lists,
dicts, sets, strings, nested loops)**. Same guided, build-it-step-by-step format
the teacher approved for Ch3 (Number Guessing Game as the reference).

> NOTE: The current stub description mentions rock-paper-scissors — that already
> shipped in Ch3 (`projects-1`). Rewrite the Ch7 description when wiring (see end).

## Model mapping (no new types — identical to Ch3)

- **Each project = one `Module`** in `ch7`.
- **Each build-step = one `Lesson`** — mostly `theory` with a `runnable` showing
  the code-so-far; a few graded `exercise` lessons; a `recap` to close.
- Modules are flat lesson lists (no sub-grouping).
- **No progress tests** in project modules (keeps them out of the Teacher
  Dashboard gradebook, which keys off `progress-test` lessons).

## Interactive-code rules (carried over — see plans/chapter-3-projects-plan.md & [[ch3-projects-interactive-code-rules]])

- Runnables/exercises may use `input()`; provide **`inputValues`** so qa-verify
  can run them. Mock input does **not** echo the prompt; prose describes the
  interaction. In the real app `input()` is live (SharedArrayBuffer).
- qa-verify only checks runnables **don't error** (output not compared), so
  `random` is fine in a runnable. But any **looping input** demo must terminate:
  use a **fixed value + exact inputs**, or a **cap** (e.g. `attempts < N`) with
  `N+1` inputValues.
- Graded `exercise` solutions must be **deterministic** — no `random`, no
  unfixed `input`; prefer a fixed starter data structure and a checked
  `expectedOutput`. The richest graded exercises here are **pure-data**
  transforms (mask a hangman word, count words in a fixed string) — no input at
  all, fully deterministic.

## Project 1 — To-Do List Manager (module `todo-list-manager`)
Skills: **lists** + **functions** + menu `while` loop + input + f-strings.
Lessons (in order):
1. `meet-your-project` (theory) — what you'll build + what you'll learn.
2. `what-you-need` (theory) — lists, functions, while, input.
3. `project-plan` (theory) — menu: add / view / remove / quit (figure/pseudocode).
4. `an-empty-list` (theory+runnable) — `tasks = []`, print it.
5. `add-a-task` (theory+runnable) — `tasks.append(input(...))` (fixed inputValues).
6. `view-tasks` (theory+runnable) — numbered list via `enumerate` / `range(len())`.
7. `exercise` — graded, deterministic: given a starter list, append a value and
   print the numbered list (fixed data, checked output).
8. `a-menu-loop` (theory+runnable) — `while True` + `if/elif` on choice, `break`
   on quit (bounded inputValues ending in the quit choice).
9. `remove-a-task` (theory+runnable) — remove by number with an out-of-range guard.
10. `wrap-in-functions` (theory+runnable) — refactor add/view into functions.
11. `the-complete-app` (theory+runnable) — full menu app (bounded inputValues
    ending in quit).
12. `add-more-features` (theory) — mark done, priorities, save to a file.
13. `recap` (recap).

## Project 2 — Contact Book (module `contact-book`)
Skills: **dictionaries** + **functions** + menu loop.
Lessons:
1. `meet-your-project` — phone directory you can add to and search.
2. `what-you-need` — dicts, functions, while.
3. `project-plan` — add / look-up / list-all / delete / quit.
4. `a-dictionary-of-contacts` (theory+runnable) — `contacts = {}`.
5. `add-a-contact` (theory+runnable) — `contacts[name] = number` (inputValues).
6. `look-up-a-contact` (theory+runnable) — `in` check + `.get()`; missing-key message.
7. `exercise` — graded, deterministic: build a fixed dict, look up a key, print
   the result (and a "not found" branch).
8. `list-all-contacts` (theory+runnable) — `for name, number in contacts.items()`.
9. `the-menu-loop` (theory+runnable) — bounded.
10. `delete-a-contact` (theory+runnable) — `pop`/`del` with a guard.
11. `wrap-in-functions` (theory+runnable).
12. `the-complete-app` (theory+runnable).
13. `add-more-features` (theory) — edit, search-by-partial-name, persistence.
14. `recap`.

## Project 3 — Hangman (module `hangman`)
Skills: **strings** + **lists** + **`random`** + **functions** + while/for.
Lessons:
1. `meet-your-project` — guess the hidden word before you run out of lives.
2. `what-you-need` — strings, lists, random, while, functions.
3. `project-plan` — pick word → show blanks → guess → reveal/lose-a-life → win/lose.
4. `pick-a-word` (theory+runnable) — `random.choice([...])` (runnable; output unchecked).
5. `show-the-blanks` (theory+runnable) — build `"_ " * len(word)` / a list of `"_"`.
6. `guess-a-letter` (theory+runnable) — read a letter, test `letter in word`
   (inputValues; fixed word).
7. `reveal-letters` (theory+runnable) — loop building the masked display from the
   word + a set/list of guessed letters.
8. `exercise` — graded, **pure-data, deterministic**: given `word` and a list of
   guessed letters, print the masked display (e.g. `p y _ h o n`). No input/random.
9. `track-wrong-guesses` (theory+runnable) — a `lives` counter.
10. `the-game-loop` (theory+runnable) — `while lives > 0 and not solved`; **fixed
    word + exact winning letters** (bounded inputValues).
11. `win-or-lose` (theory+runnable) — end messages.
12. `the-complete-game` (theory+runnable) — full game with a **fixed word + capped
    guesses** for qa; prose notes the real app picks a random word and is live.
13. `add-more-features` (theory) — ASCII-art stages, word categories, scoring.
14. `recap`.

## Project 4 — Word Frequency Counter (module `word-frequency-counter`)
Skills: **strings** (`.lower()`, `.split()`, punctuation) + **dicts** + **sets** +
for loops + **functions**. Showcases Ch5 data types working together.
Lessons:
1. `meet-your-project` — feed in text, get a word-count report.
2. `what-you-need` — strings, dicts, sets, for, functions.
3. `project-plan` — split → normalize → count → report.
4. `text-to-words` (theory+runnable) — `text.split()`.
5. `normalize-the-text` (theory+runnable) — `.lower()`, strip basic punctuation.
6. `count-with-a-dict` (theory+runnable) — `counts[w] = counts.get(w, 0) + 1`.
7. `exercise` — graded, deterministic: count words in a fixed string and print a
   specific word's count (checked output).
8. `unique-words-with-a-set` (theory+runnable) — `set(words)`, `len(...)`.
9. `find-the-most-common` (theory+runnable) — `max(counts, key=counts.get)` /
   sorted `.items()`.
10. `wrap-in-functions` (theory+runnable).
11. `the-complete-app` (theory+runnable) — read text (inputValues) → full report.
12. `add-more-features` (theory) — ignore stop-words, read from a file.
13. `recap`.

## Per-project procedure (one project per PR)
1. Author `src/data/basics/ch7/<project-slug>.ts`; wire into `ch7-projects.ts`
   (import + add to `modules`). Build first as the reference, get format sign-off,
   then the rest.
2. `npx tsx qa-verify.ts` (real Python — must pass) + `npm run lint` + `npm run build`.
3. Branch → PR → squash-merge (`--subject` explicit).

## Wiring cleanup (do with the first project)
Replace the stub body of `ch7-projects.ts`: drop the "rock-paper-scissors …
Coming soon" description (RPS is already in Ch3) and write a Ch7-appropriate
subtitle/description (e.g. "Bigger projects that bring together everything from
Chapters 1–6 — lists, dictionaries, functions, and more."). Keep `id: 7`,
`slug: 'projects-2'`, `color: 'amber'`, `featured: true`.

## Done when
All four projects authored in the guided step-by-step style, qa-verified,
lint/build clean, merged, and Chapter 7 no longer reads "Coming soon".
