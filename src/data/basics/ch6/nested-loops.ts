import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 6 · Module 2: Nested Loops — 10 lesson screens.
//
// A loop inside a loop: iteration order, printing a row on one line with
// print(..., end=""), a multiplication grid, and a star pattern. All
// deterministic. Introduces the print end= parameter with explanation.
// ─────────────────────────────────────────────────────────────────────────────

export const nestedLoopsModule: Module = {
  slug: 'nested-loops',
  title: 'Nested Loops',
  summary: 'Put one loop inside another to work through grids and patterns.',
  lessons: [
    // ── 1. Loops Within Loops ─────────────────────────────────────────────────
    {
      slug: 'loops-within-loops',
      title: 'Loops Within Loops',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Just as you can put an `if` inside a loop, you can put a **loop inside a loop**. The inner loop runs all the way through for **each** step of the outer loop.',
        },
        {
          kind: 'paragraph',
          text: 'Nested loops are how you work through anything two-dimensional: rows and columns of a grid, a multiplication table, or a pattern of shapes.',
        },
      ],
    },

    // ── 2. A Simple Nested Loop ───────────────────────────────────────────────
    {
      slug: 'a-simple-nested-loop',
      title: 'A Simple Nested Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Indent one `for` loop inside another. The inner loop is part of the outer loop\'s body, so it repeats every time the outer loop goes round.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(1, 3):\n' +
            '    for j in range(1, 3):\n' +
            '        print(i, j)',
        },
        {
          kind: 'paragraph',
          text: 'This prints every pairing: `1 1`, `1 2`, `2 1`, `2 2`. For each value of `i`, the inner loop runs through all the values of `j`.',
        },
      ],
    },

    // ── 3. How Nested Loops Run ───────────────────────────────────────────────
    {
      slug: 'how-nested-loops-run',
      title: 'How Nested Loops Run',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The key idea: the **inner loop finishes completely** before the outer loop moves on. This labelled example makes the order obvious.',
        },
        {
          kind: 'runnable',
          code:
            'for outer in range(1, 4):\n' +
            '    print("Outer:", outer)\n' +
            '    for inner in range(1, 3):\n' +
            '        print("  Inner:", inner)',
        },
        {
          kind: 'paragraph',
          text: 'Each time `Outer` changes, the inner loop runs from start to finish again. So the inner loop\'s body here runs 3 × 2 = 6 times in total.',
        },
      ],
    },

    // ── 3b. Visualizing Nested Loops ──────────────────────────────────────────
    {
      slug: 'visualizing-nested-loops',
      title: 'Visualizing Nested Loops',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Stepping through is the best way to feel how nested loops work. Watch `i` (outer) hold steady while `j` (inner) runs through all its values, then `i` moves on and `j` starts over.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize and watch i stay fixed while j cycles, then i advances.',
          code:
            'for i in range(1, 3):\n' +
            '    for j in range(1, 3):\n' +
            '        print(i, j)',
        },
        {
          kind: 'paragraph',
          text: 'Notice the order: `1 1`, `1 2`, then `i` becomes 2 and `j` restarts, giving `2 1`, `2 2`. The inner loop completes fully for every single value of the outer loop.',
        },
      ],
    },

    // ── 4. Printing on One Line ───────────────────────────────────────────────
    {
      slug: 'printing-on-one-line',
      title: 'Printing on One Line',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'By default, `print()` moves to a new line each time. To keep printing on the **same** line, add `end=" "` — it tells print what to put at the end instead of a new line.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(1, 6):\n' +
            '    print(i, end=" ")\n' +
            'print()',
        },
        {
          kind: 'paragraph',
          text: 'This prints `1 2 3 4 5` all on one line, separated by spaces. The empty `print()` at the end adds a final new line. This trick is essential for drawing grids row by row.',
        },
      ],
    },

    // ── 5. A Multiplication Grid ──────────────────────────────────────────────
    {
      slug: 'a-multiplication-grid',
      title: 'A Multiplication Grid',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Combine nesting with `end=" "`: the inner loop prints one row, and the `print()` after it starts the next row.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(1, 4):\n' +
            '    for j in range(1, 4):\n' +
            '        print(i * j, end=" ")\n' +
            '    print()',
        },
        {
          kind: 'paragraph',
          text: 'The inner loop prints `i * j` across a row; the outer `print()` ends each row. The result is a neat 3×3 multiplication grid: `1 2 3`, then `2 4 6`, then `3 6 9`.',
        },
      ],
    },

    // ── 6. A Star Pattern ─────────────────────────────────────────────────────
    {
      slug: 'a-star-pattern',
      title: 'A Star Pattern',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Nested loops can draw shapes. Here the inner loop prints a row of stars, and the number of stars grows with the outer loop.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(1, 5):\n' +
            '    for j in range(i):\n' +
            '        print("*", end="")\n' +
            '    print()',
        },
        {
          kind: 'paragraph',
          text: 'Row 1 prints one star, row 2 two stars, and so on, making a triangle. The inner loop runs `i` times, so each row is one star longer than the last.',
        },
      ],
    },

    // ── 7. Quiz: All the Pairs ────────────────────────────────────────────────
    {
      slug: 'quiz-pairs',
      title: 'All the Pairs',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`for i in range(2):`\n' +
        '`    for j in range(2):`\n' +
        '`        print(i, j)`',
      options: [
        { id: 'a', text: '`0 0` / `0 1` / `1 0` / `1 1` (four lines)' },
        { id: 'b', text: '`0 1` / `0 1` (two lines)' },
        { id: 'c', text: '`0 0` / `1 1` (two lines)' },
        { id: 'd', text: '`0 1 2 3` (one line)' },
      ],
      correctOptionId: 'a',
      explanation: 'For each `i` (0, 1), the inner loop runs `j` through (0, 1), giving four pairs: `0 0`, `0 1`, `1 0`, `1 1`.',
    },

    // ── 8. Quiz: Iteration Order ──────────────────────────────────────────────
    {
      slug: 'quiz-iteration-order',
      title: 'How Many Times?',
      type: 'quiz',
      question: 'In a nested loop, how often does the inner loop run for each single pass of the outer loop?',
      options: [
        { id: 'a', text: 'Just once.' },
        { id: 'b', text: 'It runs completely — all of its iterations.' },
        { id: 'c', text: 'It does not run until the outer loop finishes.' },
        { id: 'd', text: 'Only on the first outer pass.' },
      ],
      correctOptionId: 'b',
      explanation: 'The inner loop runs from start to finish on every single pass of the outer loop.',
    },

    // ── 9. Exercise: Draw a Grid ──────────────────────────────────────────────
    {
      slug: 'draw-a-grid-exercise',
      title: 'Your Turn: Draw a Grid',
      type: 'exercise',
      problemDescription:
        'Use nested loops to draw a 3×3 grid of `#` characters.\n\n' +
        '- The outer loop handles the 3 rows.\n' +
        '- The inner loop prints 3 `#` on a line using `print("#", end="")`.\n' +
        '- An empty `print()` after the inner loop ends each row.\n\n' +
        'The expected output is three rows of `###`.',
      starterCode:
        '# Print a 3x3 grid of # using nested loops\n' +
        'for i in range(3):\n' +
        '    for j in range(3):\n' +
        '        ___\n' +
        '    print()\n',
      expectedOutput: '###\n###\n###',
      validationMode: 'exact',
      solution:
        'for i in range(3):\n' +
        '    for j in range(3):\n' +
        '        print("#", end="")\n' +
        '    print()',
    },

    // ── 10. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Nested Loops — Complete',
      type: 'recap',
      congratsTitle: 'You can nest loops!',
      summary:
        'A loop inside a loop runs the inner loop completely for each pass of the outer one — ' +
        'ideal for grids and patterns. You also met `print(..., end=" ")` for keeping output ' +
        'on one line, then an empty `print()` to end the row. Next up: a Miscellaneous module ' +
        'tying up a few useful loose ends.',
      nextModuleTitle: 'Miscellaneous',
    },
  ],
}
