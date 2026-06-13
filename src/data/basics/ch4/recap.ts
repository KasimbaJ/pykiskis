import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 4 · Module 5: Recap — wrap-up of the Functions chapter.
// Three theory screens summarising functions and scope, pointing to the Final
// Test. English-only (Chapter 4 is not translated yet; plain strings are fine).
// ─────────────────────────────────────────────────────────────────────────────

export const recapModule: Module = {
  slug: 'recap',
  title: 'Recap',
  summary: 'Wrap up Chapter 4 and get ready for the Final Test.',
  lessons: [
    // ── 1. Congratulations ───────────────────────────────────────────────────
    {
      slug: 'congratulations',
      title: 'Congratulations',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Congratulations on finishing Chapter 4!',
        },
        {
          kind: 'paragraph',
          text: 'You can now write your own **functions** — reusable, named blocks of code — which is one of the biggest steps in becoming a programmer. Let us recap.',
        },
      ],
    },

    // ── 2. Recap (I): Functions ──────────────────────────────────────────────
    {
      slug: 'recap-i',
      title: 'Recap (I)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: 'Defining and Calling',
        },
        {
          kind: 'paragraph',
          text: 'You define a function with `def`, a name, parentheses, and a colon, then call it by name with `()`. Define once, call as often as you like.',
        },
        {
          kind: 'heading',
          level: 3,
          text: 'Parameters and Return',
        },
        {
          kind: 'paragraph',
          text: 'Parameters let you pass information in; the arguments fill them when you call. `return` hands a value back to the caller — different from `print`, which only displays. A returned value can be stored or used in any expression.',
        },
        {
          kind: 'runnable',
          code:
            'def area(width, height):\n' +
            '    return width * height\n\n' +
            'print(area(4, 5))',
        },
      ],
    },

    // ── 3. Recap (II): Scope, then the Final Test ────────────────────────────
    {
      slug: 'recap-ii',
      title: 'Recap (II)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: 'Scope',
        },
        {
          kind: 'paragraph',
          text: 'Variables created inside a function are **local** — they exist only while the function runs and cannot be used outside it. Functions can read global variables, but assigning inside makes a new local. To use a value after a function ends, `return` it.',
        },
        {
          kind: 'paragraph',
          text: 'You also practised **thinking in functions**: spotting repetition, refactoring it into a function, and composing small functions into bigger programs.',
        },
        {
          kind: 'paragraph',
          text: 'Next is the **Final Test** — 15 questions on functions and scope, graded out of 10. No time limit, and you can retake it to improve your score. Good luck!',
        },
      ],
    },
  ],
}
