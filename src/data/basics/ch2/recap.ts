import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 11: Recap — wrap-up module of Chapter 2.
//
// Four theory screens celebrating completion, recapping booleans, conditionals,
// logical operators, and loops, and pointing the learner toward the Final Test.
// (Chapter 2 content is English-only for now; plain strings are fine.)
// ─────────────────────────────────────────────────────────────────────────────

export const recapModule: Module = {
  slug: 'recap',
  title: 'Recap',
  summary: 'Wrap up Chapter 2 and get ready for the Final Test.',
  lessons: [
    // ── 1. Congratulations ───────────────────────────────────────────────────
    {
      slug: 'congratulations',
      title: 'Congratulations',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Congratulations on finishing Chapter 2!',
        },
        {
          kind: 'paragraph',
          text: 'You can now make your programs **make decisions** and **repeat work** — the core logic behind almost every program ever written. Let us recap what you learned.',
        },
      ],
    },

    // ── 2. Recap (I): Booleans & Conditionals ─────────────────────────────────
    {
      slug: 'recap-i',
      title: 'Recap (I)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: 'Booleans',
        },
        {
          kind: 'paragraph',
          text: 'A **boolean** is either `True` or `False`. Comparison operators (`==`, `!=`, `>`, `<`, `>=`, `<=`) produce booleans by comparing two values.',
        },
        {
          kind: 'heading',
          level: 3,
          text: 'Conditionals',
        },
        {
          kind: 'paragraph',
          text: 'An `if` statement runs code only when its condition is `True`. `else` provides a fallback, and `elif` chooses between many options. Each header ends in a colon `:`, and the body is indented 4 spaces.',
        },
        {
          kind: 'runnable',
          code:
            'age = 20\n\n' +
            'if age >= 18:\n' +
            '    print("Adult")\n' +
            'else:\n' +
            '    print("Minor")',
        },
      ],
    },

    // ── 3. Recap (II): Logical Operators & Loops ──────────────────────────────
    {
      slug: 'recap-ii',
      title: 'Recap (II)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: 'Logical Operators',
        },
        {
          kind: 'paragraph',
          text: '`and` is `True` only when both sides are; `or` when at least one is; and `not` flips a boolean. They let one decision depend on several conditions.',
        },
        {
          kind: 'heading',
          level: 3,
          text: 'Loops',
        },
        {
          kind: 'paragraph',
          text: 'A `while` loop repeats while a condition stays `True` (be sure to update the loop variable, or it runs forever). A `for` loop with `range()` repeats a known number of times. `break` exits a loop early; `continue` skips to the next iteration.',
        },
        {
          kind: 'runnable',
          code:
            'total = 0\n' +
            'for i in range(1, 6):\n' +
            '    total = total + i\n\n' +
            'print(total)',
        },
      ],
    },

    // ── 4. The Final Test ─────────────────────────────────────────────────────
    {
      slug: 'the-final-test',
      title: 'The Final Test',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Feeling confident? The **Final Test** is next. It draws 15 questions from everything in this chapter — booleans, if/else, logical operators, and loops — and is graded out of 10.',
        },
        {
          kind: 'paragraph',
          text: 'There is no time limit, and you can retake it as many times as you like to improve your score. Good luck!',
        },
      ],
    },
  ],
}
