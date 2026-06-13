import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 · Module 2: Tuples — 11 lesson screens.
//
// Immutable sequences: create, index, immutability (shown as a non-executed
// code block so qa-verify never runs the TypeError), why tuples, unpacking, and
// functions returning multiple values as a tuple. Deterministic throughout.
// ─────────────────────────────────────────────────────────────────────────────

export const tuplesModule: Module = {
  slug: 'tuples',
  title: 'Tuples',
  summary: "Fixed collections that can't be changed after creation.",
  lessons: [
    // ── 1. What Is a Tuple? ───────────────────────────────────────────────────
    {
      slug: 'what-is-a-tuple',
      title: 'What Is a Tuple?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A **tuple** is like a list — an ordered collection of items — with one key difference: once created, it **cannot be changed**.',
        },
        {
          kind: 'paragraph',
          text: 'That makes tuples perfect for data that should stay fixed: a point\'s `(x, y)` coordinates, a date\'s `(day, month, year)`, or a colour\'s `(red, green, blue)` values.',
        },
        {
          kind: 'note',
          text: 'Lists use square brackets `[ ]` and can change. Tuples use round brackets `( )` and cannot. That is the main thing to remember.',
        },
      ],
    },

    // ── 2. Creating a Tuple ───────────────────────────────────────────────────
    {
      slug: 'creating-a-tuple',
      title: 'Creating a Tuple',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Write the items inside round brackets, separated by commas.',
        },
        {
          kind: 'runnable',
          code:
            'point = (3, 5)\n' +
            'print(point)',
        },
        {
          kind: 'paragraph',
          text: 'Printing it shows `(3, 5)` with its round brackets — the sign that it is a tuple rather than a list.',
        },
      ],
    },

    // ── 3. Accessing Items ────────────────────────────────────────────────────
    {
      slug: 'accessing-items',
      title: 'Accessing Items',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You read items from a tuple exactly like a list: with an index in square brackets, counting from 0.',
        },
        {
          kind: 'runnable',
          code:
            'point = (3, 5)\n\n' +
            'print(point[0])\n' +
            'print(point[1])',
        },
        {
          kind: 'paragraph',
          text: 'This prints `3` then `5`. Reading is identical to lists — it is only *changing* that tuples forbid.',
        },
      ],
    },

    // ── 4. Tuples Cannot Change ───────────────────────────────────────────────
    {
      slug: 'tuples-are-immutable',
      title: 'Tuples Cannot Change',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Trying to change an item in a tuple is an error. This is **immutability** — the tuple is locked once created.',
        },
        {
          kind: 'code',
          code:
            'point = (3, 5)\n' +
            'point[0] = 10   # TypeError: a tuple cannot be changed',
        },
        {
          kind: 'note',
          text: 'Running that raises a **TypeError**. If you need to change the data, use a list. If the data should stay fixed, a tuple protects it from accidental edits.',
        },
      ],
    },

    // ── 5. Why Use Tuples? ────────────────────────────────────────────────────
    {
      slug: 'why-use-tuples',
      title: 'Why Use Tuples?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'If a list can do more, why use a tuple at all? Two good reasons:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**Safety** — values that should never change (like a fixed coordinate) cannot be edited by mistake.',
            '**Clarity** — a tuple signals to anyone reading your code "this group of values belongs together and stays put".',
          ],
        },
        {
          kind: 'paragraph',
          text: 'A good rule: reach for a list when the collection will grow or change, and a tuple when it should stay exactly as it is.',
        },
      ],
    },

    // ── 6. Unpacking a Tuple ──────────────────────────────────────────────────
    {
      slug: 'tuple-unpacking',
      title: 'Unpacking a Tuple',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You can pull a tuple\'s items straight into separate variables in one line. This is called **unpacking**.',
        },
        {
          kind: 'runnable',
          code:
            'point = (3, 5)\n\n' +
            'x, y = point\n' +
            'print(x)\n' +
            'print(y)',
        },
        {
          kind: 'paragraph',
          text: 'The first item goes into `x` and the second into `y`, printing `3` then `5`. The number of variables must match the number of items.',
        },
      ],
    },

    // ── 7. Returning Multiple Values ──────────────────────────────────────────
    {
      slug: 'returning-multiple-values',
      title: 'Returning Multiple Values',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Tuples and unpacking let a function hand back more than one value at once — just `return` them separated by commas.',
        },
        {
          kind: 'runnable',
          code:
            'def min_max(a, b):\n' +
            '    if a < b:\n' +
            '        return a, b\n' +
            '    else:\n' +
            '        return b, a\n\n' +
            'low, high = min_max(8, 3)\n' +
            'print(low)\n' +
            'print(high)',
        },
        {
          kind: 'paragraph',
          text: '`min_max(8, 3)` returns the pair `(3, 8)`, which is unpacked into `low` and `high`. So it prints `3` then `8`. This is a very common, tidy Python pattern.',
        },
      ],
    },

    // ── 8. Quiz: Tuple Index ──────────────────────────────────────────────────
    {
      slug: 'quiz-tuple-index',
      title: 'Reading a Tuple',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`t = (1, 2, 3)`\n' +
        '`print(t[2])`',
      options: [
        { id: 'a', text: '`1`' },
        { id: 'b', text: '`2`' },
        { id: 'c', text: '`3`' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'c',
      explanation: 'Reading a tuple works like a list: index 2 is the third item, `3`.',
    },

    // ── 9. Quiz: Which Can Change? ────────────────────────────────────────────
    {
      slug: 'quiz-which-can-change',
      title: 'List or Tuple?',
      type: 'quiz',
      question: 'Which of these can NOT be changed after it is created?',
      options: [
        { id: 'a', text: 'A list' },
        { id: 'b', text: 'A tuple' },
        { id: 'c', text: 'Both can be changed' },
        { id: 'd', text: 'Neither can be changed' },
      ],
      correctOptionId: 'b',
      explanation: 'A tuple is immutable — fixed once created. A list is mutable and can be changed.',
    },

    // ── 10. Exercise: Unpack and Add ──────────────────────────────────────────
    {
      slug: 'unpack-and-add-exercise',
      title: 'Your Turn: Unpack a Point',
      type: 'exercise',
      problemDescription:
        'Unpack a tuple and use its values.\n\n' +
        '- A tuple `point = (4, 9)` is already created.\n' +
        '- Unpack it into `x` and `y`.\n' +
        '- Print `x + y`.\n\n' +
        'The expected output is `13`.',
      starterCode:
        'point = (4, 9)\n\n' +
        '# Unpack point into x and y, then print x + y\n',
      expectedOutput: '13',
      validationMode: 'exact',
      solution:
        'point = (4, 9)\n' +
        'x, y = point\n' +
        'print(x + y)',
    },

    // ── 11. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Tuples — Complete',
      type: 'recap',
      congratsTitle: 'You understand tuples!',
      summary:
        'A tuple is an ordered, **unchangeable** collection written with round brackets. You ' +
        'read items by index just like a list, but you cannot edit them. You also learned to ' +
        'unpack a tuple into separate variables and to return several values from a function. ' +
        'Next is a short Progress Test on lists and tuples.',
      nextModuleTitle: 'Progress Test',
    },
  ],
}
