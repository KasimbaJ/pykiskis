import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 4 · Module 4: Think Functions — 9 lesson screens.
//
// Applied module: spotting repetition, refactoring it into a function, functions
// calling functions, a helper used inside a loop, composing a small program from
// functions, a quiz, and an exercise. All deterministic.
// ─────────────────────────────────────────────────────────────────────────────

export const thinkFunctionsModule: Module = {
  slug: 'think-functions',
  title: 'Think Functions',
  summary: 'Spot repetition and reshape code into clean functions.',
  lessons: [
    // ── 1. Thinking in Functions ──────────────────────────────────────────────
    {
      slug: 'thinking-in-functions',
      title: 'Thinking in Functions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Knowing how to write a function is one thing; knowing **when** to write one is the real skill. Good developers constantly ask: "Am I repeating myself? Could this be a named step?"',
        },
        {
          kind: 'paragraph',
          text: 'In this module you will practise turning messy, repetitive code into clean functions — and combining small functions to do bigger jobs.',
        },
      ],
    },

    // ── 2. Spotting Repetition ────────────────────────────────────────────────
    {
      slug: 'spotting-repetition',
      title: 'Spotting Repetition',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Look at this code that prints two banners. Notice how the banner lines are copied and pasted:',
        },
        {
          kind: 'runnable',
          code:
            'print("------------")\n' +
            'print("Welcome!")\n' +
            'print("------------")\n\n' +
            'print("------------")\n' +
            'print("Goodbye!")\n' +
            'print("------------")',
        },
        {
          kind: 'paragraph',
          text: 'The same three-line pattern appears twice, with only the middle message changing. That repetition is a red flag — and a perfect candidate for a function.',
        },
      ],
    },

    // ── 3. Refactoring Into a Function ────────────────────────────────────────
    {
      slug: 'refactoring-into-a-function',
      title: 'Refactoring Into a Function',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'We move the repeated pattern into a function, with the part that changes (the message) as a parameter. This is called **refactoring** — improving the shape of code without changing what it does.',
        },
        {
          kind: 'runnable',
          code:
            'def banner(message):\n' +
            '    print("------------")\n' +
            '    print(message)\n' +
            '    print("------------")\n\n' +
            'banner("Welcome!")\n' +
            'banner("Goodbye!")',
        },
        {
          kind: 'paragraph',
          text: 'Same output, far less code — and if you ever want to change the banner style, you change it in **one** place. That is the power of naming a repeated step.',
        },
      ],
    },

    // ── 4. Functions Using Functions ──────────────────────────────────────────
    {
      slug: 'functions-using-functions',
      title: 'Functions Using Functions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Functions can call other functions. This lets you build bigger ideas out of small, well-named pieces.',
        },
        {
          kind: 'runnable',
          code:
            'def square(n):\n' +
            '    return n * n\n\n' +
            'def sum_of_squares(a, b):\n' +
            '    return square(a) + square(b)\n\n' +
            'print(sum_of_squares(2, 3))',
        },
        {
          kind: 'paragraph',
          text: '`sum_of_squares` does not repeat the squaring logic — it reuses `square`. The result is `square(2) + square(3)`, which is `4 + 9 = 13`.',
        },
      ],
    },

    // ── 5. A Helper Inside a Loop ─────────────────────────────────────────────
    {
      slug: 'a-helper-inside-a-loop',
      title: 'A Helper Inside a Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A small "helper" function is especially handy inside a loop, where it runs once per iteration.',
        },
        {
          kind: 'runnable',
          code:
            'def label(n):\n' +
            '    return "Item " + str(n)\n\n' +
            'for i in range(1, 4):\n' +
            '    print(label(i))',
        },
        {
          kind: 'paragraph',
          text: 'The loop calls `label` for each number 1, 2, 3, printing `Item 1`, `Item 2`, `Item 3`. The function keeps the loop body short and the intent clear.',
        },
      ],
    },

    // ── 6. Composing a Program ────────────────────────────────────────────────
    {
      slug: 'composing-a-program',
      title: 'Composing a Program',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Whole programs are built this way: a handful of small functions, each doing one job, combined to do something useful.',
        },
        {
          kind: 'runnable',
          code:
            'def add(a, b):\n' +
            '    return a + b\n\n' +
            'def average(a, b):\n' +
            '    return add(a, b) / 2\n\n' +
            'print("Sum:", add(8, 12))\n' +
            'print("Average:", average(8, 12))',
        },
        {
          kind: 'paragraph',
          text: '`average` reuses `add` instead of repeating the addition. The program reads almost like plain English: the sum is 20, and the average is 10.0.',
        },
      ],
    },

    // ── 7. Quiz: Composed Calls ───────────────────────────────────────────────
    {
      slug: 'quiz-composed-calls',
      title: 'Functions in Functions',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`def triple(n):`\n' +
        '`    return n * 3`\n' +
        '`print(triple(triple(1)))`',
      options: [
        { id: 'a', text: '`3`' },
        { id: 'b', text: '`6`' },
        { id: 'c', text: '`9`' },
        { id: 'd', text: '`1`' },
      ],
      correctOptionId: 'c',
      explanation: 'The inner `triple(1)` is `3`, and `triple(3)` is `9`. The inner call is worked out first, then its result is passed to the outer call.',
    },

    // ── 8. Exercise: Double Twice ─────────────────────────────────────────────
    {
      slug: 'double-twice-exercise',
      title: 'Your Turn: Double Twice',
      type: 'exercise',
      problemDescription:
        'Reuse your own function.\n\n' +
        '- Define `double(n)` that returns `n * 2`.\n' +
        '- Print the result of doubling 5 **twice** by calling `double(double(5))`.\n\n' +
        'The expected output is `20`.',
      starterCode:
        '# Define double(n) that returns n * 2\n\n\n' +
        '# Then print double(double(5))\n',
      expectedOutput: '20',
      validationMode: 'exact',
      solution:
        'def double(n):\n' +
        '    return n * 2\n\n' +
        'print(double(double(5)))',
    },

    // ── 9. Recap ──────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Think Functions — Complete',
      type: 'recap',
      congratsTitle: 'You can think in functions!',
      summary:
        'You learned to spot repeated code and refactor it into a function, to have functions ' +
        'call other functions, to use a helper inside a loop, and to compose a small program ' +
        'from simple pieces. This is how real programs stay readable as they grow. Next is the ' +
        'Chapter 4 Recap, then the Final Test.',
      nextModuleTitle: 'Recap',
    },
  ],
}
