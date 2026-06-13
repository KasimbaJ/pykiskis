import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 · Recap — wrap-up of the Data Types chapter.
// Three theory screens summarising the collection types, pointing to the Final
// Test. English-only (Chapter 5 not translated yet; plain strings are fine).
// ─────────────────────────────────────────────────────────────────────────────

export const recapModule: Module = {
  slug: 'recap',
  title: 'Recap',
  summary: 'Wrap up Chapter 5 and get ready for the Final Test.',
  lessons: [
    // ── 1. Congratulations ───────────────────────────────────────────────────
    {
      slug: 'congratulations',
      title: 'Congratulations',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Congratulations on finishing Chapter 5!',
        },
        {
          kind: 'paragraph',
          text: 'You now have a whole toolbox of ways to organise data. Choosing the right one for the job is a real programming skill — let us recap them.',
        },
      ],
    },

    // ── 2. Recap (I): Ordered Collections ────────────────────────────────────
    {
      slug: 'recap-i',
      title: 'Recap (I)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: 'Lists and Tuples',
        },
        {
          kind: 'paragraph',
          text: '**Lists** `[ ]` are ordered and changeable — index them, change items, and grow them with `append`. **Tuples** `( )` are ordered but **fixed** — great for data that should not change, and handy for unpacking and returning several values.',
        },
        {
          kind: 'heading',
          level: 3,
          text: 'Strings',
        },
        {
          kind: 'paragraph',
          text: 'A **string** is a sequence of characters. You can index and slice it, loop over its letters, and use methods like `.upper()`, `.split()`, and `.replace()`.',
        },
        {
          kind: 'runnable',
          code:
            'nums = [1, 2, 3]\n' +
            'nums.append(4)\n' +
            'print(nums)\n' +
            'print("python"[0:3])',
        },
      ],
    },

    // ── 3. Recap (II): Dictionaries, Sets, range, then the Final Test ────────
    {
      slug: 'recap-ii',
      title: 'Recap (II)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: 'Dictionaries and Sets',
        },
        {
          kind: 'paragraph',
          text: '**Dictionaries** `{key: value}` look values up by name — add, update, and read by key. **Sets** `{ }` hold only unique items and are perfect for membership tests and removing duplicates.',
        },
        {
          kind: 'heading',
          level: 3,
          text: 'Conversion and range()',
        },
        {
          kind: 'paragraph',
          text: 'You can convert between types with `list()`, `tuple()`, `set()`, `str()`, and `int()` — for example, a list to a set to drop duplicates. And `range()` generates sequences of numbers, which `list()` makes visible.',
        },
        {
          kind: 'paragraph',
          text: 'Next is the **Final Test** — 15 questions across every data type, graded out of 10. No time limit, and you can retake it to improve your score. Good luck!',
        },
      ],
    },
  ],
}
