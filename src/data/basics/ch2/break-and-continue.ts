import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 8: Break and Continue — 12 lesson screens.
//
// break (exit a loop early) and continue (skip to the next iteration), in both
// for and while loops, a visualize block, three quizzes, and two exercises
// (stop at the first match with break, skip multiples with continue).
// ─────────────────────────────────────────────────────────────────────────────

export const breakAndContinueModule: Module = {
  slug: 'break-and-continue',
  title: 'Break and Continue',
  summary: 'Exit a loop early or skip an iteration.',
  lessons: [
    // ── 1. Controlling the Flow ───────────────────────────────────────────────
    {
      slug: 'introduction-to-break-and-continue',
      title: 'Controlling the Flow',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Sometimes you want to change how a loop runs from **inside** the loop — to stop early once you have found what you need, or to skip over certain values.',
        },
        {
          kind: 'paragraph',
          text: 'Python gives you two keywords for this, used inside `for` and `while` loops:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`break` — **exit** the loop immediately, no matter how many iterations are left.',
            '`continue` — **skip** the rest of this iteration and jump straight to the next one.',
          ],
        },
      ],
    },

    // ── 2. break: Exit Early ──────────────────────────────────────────────────
    {
      slug: 'break-exit-early',
      title: 'break: Exit Early',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'When Python reaches a `break`, the loop ends at once and the program continues after it. The remaining iterations never happen.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(1, 10):\n' +
            '    if i == 5:\n' +
            '        break\n' +
            '    print(i)',
        },
        {
          kind: 'paragraph',
          text: 'The loop would normally count to 9, but when `i` reaches 5 the `break` stops it. Only `1`, `2`, `3`, `4` are printed — `break` runs before the `print`.',
        },
      ],
    },

    // ── 3. break in a while Loop ──────────────────────────────────────────────
    {
      slug: 'break-in-a-while-loop',
      title: 'break in a while Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`break` is especially useful with `while`. A loop can deliberately use `while True` (which would otherwise run forever) and rely on `break` to stop at the right moment.',
        },
        {
          kind: 'runnable',
          code:
            'n = 1\n' +
            'while True:\n' +
            '    print(n)\n' +
            '    if n == 3:\n' +
            '        break\n' +
            '    n = n + 1',
        },
        {
          kind: 'paragraph',
          text: 'This prints `1`, `2`, `3`. The condition `while True` never becomes False on its own — the `break` is what ends the loop, once `n` reaches 3.',
        },
      ],
    },

    // ── 4. continue: Skip an Iteration ────────────────────────────────────────
    {
      slug: 'continue-skip-an-iteration',
      title: 'continue: Skip Ahead',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Where `break` ends the whole loop, `continue` only skips the **current** iteration. The loop keeps going with the next value.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(1, 6):\n' +
            '    if i == 3:\n' +
            '        continue\n' +
            '    print(i)',
        },
        {
          kind: 'paragraph',
          text: 'When `i` is 3, the `continue` skips the `print` for that one pass — so the output is `1`, `2`, `4`, `5`. The 3 is missing, but the loop carries on.',
        },
      ],
    },

    // ── 5. Skipping with a Condition ──────────────────────────────────────────
    {
      slug: 'skipping-with-a-condition',
      title: 'Skipping the Even Numbers',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`continue` shines when paired with a condition — for example, skipping every value that fails a test.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(1, 7):\n' +
            '    if i % 2 == 0:\n' +
            '        continue\n' +
            '    print(i)',
        },
        {
          kind: 'paragraph',
          text: 'Each even number triggers the `continue`, so only the odd numbers `1`, `3`, `5` are printed.',
        },
      ],
    },

    // ── 6. Visualizing break ──────────────────────────────────────────────────
    {
      slug: 'visualizing-break',
      title: 'Visualizing break',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Step through the loop and watch exactly where `break` ends it. Notice the loop never reaches the values after the one that triggers the break.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize, then step through and watch the loop stop at i = 4.',
          code:
            'for i in range(1, 6):\n' +
            '    if i == 4:\n' +
            '        break\n' +
            '    print(i)',
        },
        {
          kind: 'paragraph',
          text: 'The loop prints `1`, `2`, `3`, then `i` becomes 4, the `break` fires, and the loop ends — `4` and `5` are never printed.',
        },
      ],
    },

    // ── 7. Quiz: break Output ─────────────────────────────────────────────────
    {
      slug: 'quiz-break-output',
      title: 'Where Does break Stop?',
      type: 'quiz',
      question:
        'What does this code print?\n\n' +
        '`for i in range(1, 8):`\n' +
        '`    if i == 4:`\n' +
        '`        break`\n' +
        '`    print(i)`',
      options: [
        { id: 'a', text: '`1` `2` `3`' },
        { id: 'b', text: '`1` `2` `3` `4`' },
        { id: 'c', text: '`1` `2` `3` `4` `5` `6` `7`' },
        { id: 'd', text: 'Nothing' },
      ],
      correctOptionId: 'a',
      explanation: 'When `i` reaches 4, `break` ends the loop **before** the `print`. So only `1`, `2`, `3` are printed.',
    },

    // ── 8. Quiz: continue Output ──────────────────────────────────────────────
    {
      slug: 'quiz-continue-output',
      title: 'What Does continue Skip?',
      type: 'quiz',
      question:
        'What does this code print?\n\n' +
        '`for i in range(1, 5):`\n' +
        '`    if i == 2:`\n' +
        '`        continue`\n' +
        '`    print(i)`',
      options: [
        { id: 'a', text: '`1` `2` `3` `4`' },
        { id: 'b', text: '`1` `3` `4`' },
        { id: 'c', text: '`2`' },
        { id: 'd', text: '`1`' },
      ],
      correctOptionId: 'b',
      explanation: 'When `i` is 2, `continue` skips just that `print`. The loop carries on, so it prints `1`, `3`, `4`.',
    },

    // ── 9. Quiz: break vs continue ────────────────────────────────────────────
    {
      slug: 'quiz-break-vs-continue',
      title: 'break or continue?',
      type: 'quiz',
      question: 'Which keyword **exits the loop entirely**, ending it at once?',
      options: [
        { id: 'a', text: '`continue`' },
        { id: 'b', text: '`break`' },
        { id: 'c', text: '`skip`' },
        { id: 'd', text: '`stop`' },
      ],
      correctOptionId: 'b',
      explanation: '`break` ends the whole loop. `continue` only skips the current iteration and keeps looping.',
    },

    // ── 10. Exercise: First Match ─────────────────────────────────────────────
    {
      slug: 'first-match-exercise',
      title: 'First Multiple',
      type: 'exercise',
      problemDescription:
        'Find the first multiple of 7.\n\n' +
        '- Loop through the numbers 1 to 20.\n' +
        '- Print the **first** number that is a multiple of 7 (`n % 7 == 0`), then stop the loop.\n' +
        '- The answer is `7`.',
      starterCode:
        '# Print the first multiple of 7 between 1 and 20, then stop\n' +
        'for n in range(1, 21):\n' +
        '    if n % 7 == 0:\n' +
        '        print(n)\n' +
        '        ___  # stop the loop\n',
      expectedOutput: '7',
      validationMode: 'exact',
      solution:
        'for n in range(1, 21):\n' +
        '    if n % 7 == 0:\n' +
        '        print(n)\n' +
        '        break',
    },

    // ── 11. Exercise: Skip Multiples ──────────────────────────────────────────
    {
      slug: 'skip-multiples-exercise',
      title: 'Skip the Multiples',
      type: 'exercise',
      problemDescription:
        'Print 1 to 10, skipping multiples of 3.\n\n' +
        '- Loop through the numbers 1 to 10.\n' +
        '- Skip any number that is a multiple of 3 (`i % 3 == 0`) using `continue`.\n' +
        '- Print all the others. The output is `1`, `2`, `4`, `5`, `7`, `8`, `10`.',
      starterCode:
        '# Print 1 to 10 but skip every multiple of 3\n' +
        'for i in range(1, 11):\n' +
        '    if i % 3 == 0:\n' +
        '        ___  # skip this number\n' +
        '    print(i)\n',
      expectedOutput: '1\n2\n4\n5\n7\n8\n10',
      validationMode: 'exact',
      solution:
        'for i in range(1, 11):\n' +
        '    if i % 3 == 0:\n' +
        '        continue\n' +
        '    print(i)',
    },

    // ── 12. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Break and Continue — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Break and Continue!',
      summary:
        'You can now steer a loop from the inside: `break` exits the loop completely, and ' +
        '`continue` skips the rest of the current iteration and moves on. Both work in `for` ' +
        'and `while` loops. Next is a short **Progress Test** on for loops, break, and continue.',
      nextModuleTitle: 'Progress Test 3',
    },
  ],
}
