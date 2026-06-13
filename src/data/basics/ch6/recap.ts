import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 6 · Recap — wrap-up of Completing Basics AND the whole Basics track.
// Three theory screens. English-only (not translated yet; plain strings fine).
// ─────────────────────────────────────────────────────────────────────────────

export const recapModule: Module = {
  slug: 'recap',
  title: 'Recap',
  summary: 'Wrap up Chapter 6 — and the whole Basics course.',
  lessons: [
    // ── 1. Congratulations ───────────────────────────────────────────────────
    {
      slug: 'congratulations',
      title: 'Congratulations',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Congratulations — you have reached the end of the Python Basics course! 🎉',
        },
        {
          kind: 'paragraph',
          text: 'This chapter rounded out your toolkit, and you have now covered every core idea a beginning programmer needs. Let us look back at how far you have come.',
        },
      ],
    },

    // ── 2. Recap (I): This Chapter ───────────────────────────────────────────
    {
      slug: 'recap-i',
      title: 'Recap (I)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: 'Completing the Basics',
        },
        {
          kind: 'paragraph',
          text: 'You learned to borrow ready-made tools with `import` (the `math` and `random` modules), to nest loops for grids and patterns, and a handful of finishing touches: assignment operators (`+=`), the `None` value, truthy/falsy, and the `pass` placeholder.',
        },
        {
          kind: 'runnable',
          code:
            'import math\n\n' +
            'total = 0\n' +
            'for i in range(1, 4):\n' +
            '    total += i\n\n' +
            'print(total)\n' +
            'print(math.sqrt(total + 3))',
        },
      ],
    },

    // ── 3. Recap (II): The Whole Journey, then the Final Test ────────────────
    {
      slug: 'recap-ii',
      title: 'Recap (II)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: 'Everything You Have Learned',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**Chapter 1** — printing, variables, data types, operators, input',
            '**Chapter 2** — booleans, if/else, logical operators, while and for loops',
            '**Projects** — five guided programs built from scratch',
            '**Chapter 4** — your own functions and scope',
            '**Chapter 5** — lists, tuples, strings, dictionaries, sets',
            '**Chapter 6** — modules, nested loops, and finishing touches',
          ],
        },
        {
          kind: 'paragraph',
          text: 'That is a genuinely solid foundation. You can read code, write your own programs, break problems into steps, and keep learning with confidence.',
        },
        {
          kind: 'paragraph',
          text: 'One last step: the **Final Test** — 15 questions completing the basics, graded out of 10. No time limit, and you can retake it to improve your score. Well done, and good luck!',
        },
      ],
    },
  ],
}
