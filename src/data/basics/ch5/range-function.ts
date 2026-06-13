import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 · Module 9: range() Function — 9 lesson screens.
//
// A closer look at range as a sequence: range(stop), range(start, stop),
// range(start, stop, step), counting down with a negative step, and turning a
// range into a list. list(range(...)) prints in order, so all checks are
// deterministic.
// ─────────────────────────────────────────────────────────────────────────────

export const rangeFunctionModule: Module = {
  slug: 'range-function',
  title: 'range() Function',
  summary: 'Generate sequences of numbers with range().',
  lessons: [
    // ── 1. range Revisited ────────────────────────────────────────────────────
    {
      slug: 'range-revisited',
      title: 'range Revisited',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You met `range()` driving `for` loops back in Chapter 2. Now that you know about lists, it is worth seeing what `range()` really produces: a **sequence of numbers**.',
        },
        {
          kind: 'paragraph',
          text: 'You can loop over a range, or wrap it in `list()` to see all its numbers at once. That makes it easy to picture exactly which numbers a range covers.',
        },
      ],
    },

    // ── 2. range With One Number ──────────────────────────────────────────────
    {
      slug: 'range-with-one-number',
      title: 'range With One Number',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`range(n)` counts from `0` up to **but not including** `n`. Wrap it in `list()` to reveal the numbers.',
        },
        {
          kind: 'runnable',
          code:
            'print(list(range(5)))',
        },
        {
          kind: 'paragraph',
          text: 'This prints `[0, 1, 2, 3, 4]` — five numbers starting at 0, stopping before 5. That is exactly the sequence a `for i in range(5)` loop would walk through.',
        },
      ],
    },

    // ── 3. Start and Stop ─────────────────────────────────────────────────────
    {
      slug: 'range-start-and-stop',
      title: 'Start and Stop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'With two numbers, `range(start, stop)` begins at `start` and still stops **before** `stop`.',
        },
        {
          kind: 'runnable',
          code:
            'print(list(range(2, 7)))',
        },
        {
          kind: 'paragraph',
          text: 'This gives `[2, 3, 4, 5, 6]` — it includes 2 but not 7. Remember: the stop value is never included.',
        },
      ],
    },

    // ── 4. Adding a Step ──────────────────────────────────────────────────────
    {
      slug: 'range-adding-a-step',
      title: 'Adding a Step',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A third number sets the **step** — how far to jump each time.',
        },
        {
          kind: 'runnable',
          code:
            'print(list(range(0, 10, 2)))',
        },
        {
          kind: 'paragraph',
          text: 'A step of 2 gives every second number: `[0, 2, 4, 6, 8]`. It still stops before 10. A step of 3 would give `[0, 3, 6, 9]`.',
        },
      ],
    },

    // ── 5. Counting Down ──────────────────────────────────────────────────────
    {
      slug: 'range-counting-down',
      title: 'Counting Down',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A **negative** step makes the range count downwards. Start high, stop low.',
        },
        {
          kind: 'runnable',
          code:
            'print(list(range(5, 0, -1)))',
        },
        {
          kind: 'paragraph',
          text: 'This produces `[5, 4, 3, 2, 1]`. The step of `-1` walks backwards, and (as always) the stop value `0` is not included.',
        },
      ],
    },

    // ── 6. Quiz: range to List ────────────────────────────────────────────────
    {
      slug: 'quiz-range-list',
      title: 'What Does range Produce?',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`print(list(range(1, 4)))`',
      options: [
        { id: 'a', text: '`[1, 2, 3, 4]`' },
        { id: 'b', text: '`[1, 2, 3]`' },
        { id: 'c', text: '`[0, 1, 2, 3]`' },
        { id: 'd', text: '`[1, 4]`' },
      ],
      correctOptionId: 'b',
      explanation: '`range(1, 4)` starts at 1 and stops before 4, giving `[1, 2, 3]`.',
    },

    // ── 7. Quiz: Bounds ───────────────────────────────────────────────────────
    {
      slug: 'quiz-range-bounds',
      title: 'Which Numbers?',
      type: 'quiz',
      question: 'Which numbers does `range(2, 8)` produce?',
      options: [
        { id: 'a', text: '`2, 3, 4, 5, 6, 7, 8`' },
        { id: 'b', text: '`2, 3, 4, 5, 6, 7`' },
        { id: 'c', text: '`3, 4, 5, 6, 7, 8`' },
        { id: 'd', text: '`2, 8`' },
      ],
      correctOptionId: 'b',
      explanation: '`range(2, 8)` includes the start (2) and stops before the stop (8): `2, 3, 4, 5, 6, 7`.',
    },

    // ── 8. Exercise: Even Numbers ─────────────────────────────────────────────
    {
      slug: 'even-numbers-exercise',
      title: 'Your Turn: Even Numbers',
      type: 'exercise',
      problemDescription:
        'Build a list of even numbers with `range()`.\n\n' +
        '- Use `range()` with a step to produce the even numbers from 0 to 8.\n' +
        '- Wrap it in `list()` and print it.\n\n' +
        'The expected output is `[0, 2, 4, 6, 8]`.',
      starterCode:
        '# Print the even numbers from 0 to 8 as a list\n',
      expectedOutput: '[0, 2, 4, 6, 8]',
      validationMode: 'exact',
      solution:
        'print(list(range(0, 9, 2)))',
    },

    // ── 9. Recap ──────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'range() Function — Complete',
      type: 'recap',
      congratsTitle: 'You have mastered range()!',
      summary:
        '`range(stop)` counts from 0; `range(start, stop)` chooses where to begin; a third ' +
        'number sets the step, and a negative step counts down. Wrapping a range in `list()` ' +
        'shows exactly which numbers it covers. Next is a short Progress Test on sets, ' +
        'conversion, and range.',
      nextModuleTitle: 'Progress Test',
    },
  ],
}
