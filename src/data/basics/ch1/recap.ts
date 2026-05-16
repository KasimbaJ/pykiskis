import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 10: Recap — final wrap-up module of Chapter 1.
//
// Four theory screens that celebrate completion, recap what was learned,
// and point the learner toward the next chapter.
// ─────────────────────────────────────────────────────────────────────────────

export const recapModule: Module = {
  slug: 'recap',
  title: 'Recap',
  summary: 'Wrap up Chapter 1 and look forward.',
  lessons: [
    // ── 1. Congratulations ───────────────────────────────────────────────────
    {
      slug: 'congratulations',
      title: 'Congratulations',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Congratulations!' },
        {
          kind: 'paragraph',
          text:
            'You have completed the foundational concepts of Python. These are the ' +
            'building blocks of Python programming and will help you approach upcoming ' +
            'topics with confidence.',
        },
        { kind: 'paragraph', text: "Let's recap what you learned so far." },
      ],
    },

    // ── 2. Recap (I) ─────────────────────────────────────────────────────────
    {
      slug: 'recap-i',
      title: 'Recap (I)',
      type: 'theory',
      blocks: [
        { kind: 'heading', level: 3, text: 'Data Types' },
        { kind: 'paragraph', text: 'We started by learning different types of data:' },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**String:** `"Hello"`, `\'123a\'`',
            '**Floating-point Numbers:** `124.3`, `12.0`',
            '**Integers:** `23`, `42`',
          ],
        },
        { kind: 'heading', level: 3, text: 'Variables' },
        {
          kind: 'paragraph',
          text: 'To store and use these data later in the program, you can store them in variables.',
        },
        {
          kind: 'runnable',
          code: 'x = 5\ny = x\n\nprint(f"y = x = {x}")',
        },
        { kind: 'heading', level: 3, text: 'Operators' },
        {
          kind: 'paragraph',
          text:
            'In programming, you often need to perform calculations on values and ' +
            'variables, not just print them. To handle mathematical calculations, we use operators.',
        },
        {
          kind: 'runnable',
          code:
            'x = 7\ny = 3\n\nremainder = x % y\npower = x ** y\n\n' +
            'print(f"Remainder: {remainder}")\nprint(f"Power: {power}")',
        },
        { kind: 'paragraph', text: 'More on what you learned on the next page.' },
      ],
    },

    // ── 3. Recap (II) ────────────────────────────────────────────────────────
    {
      slug: 'recap-ii',
      title: 'Recap (II)',
      type: 'theory',
      blocks: [
        { kind: 'heading', level: 3, text: 'Take input' },
        {
          kind: 'paragraph',
          text:
            'You can take input from the user and use this value during program execution ' +
            'by using the `input()` function.',
        },
        {
          kind: 'runnable',
          code:
            'first_name = input("Enter your first name: ")\n' +
            'last_name = input("Enter your last name: ")\n\n' +
            'print(f"Hey {first_name} {last_name}!")',
          inputValues: ['Ada', 'Lovelace'],
        },
        { kind: 'heading', level: 3, text: 'Data conversion' },
        {
          kind: 'paragraph',
          text:
            'The data you are trying to use may not always be in the required format. In such ' +
            'situations, you need to perform data conversions.',
        },
        {
          kind: 'runnable',
          code:
            '# Convert strings to integers\n' +
            'x = int(input("Enter the first number: "))\n' +
            'y = int(input("Enter the second number: "))\n\n' +
            'remainder = x % y\n' +
            'power = x ** y\n\n' +
            'print(f"Remainder: {remainder}")\n' +
            'print(f"Power: {power}")',
          inputValues: ['10', '3'],
        },
        {
          kind: 'paragraph',
          text: "With these foundational concepts in place, you're ready to move ahead to the next lesson.",
        },
      ],
    },

    // ── 4. Moving Forward ────────────────────────────────────────────────────
    {
      slug: 'moving-forward',
      title: 'Moving Forward',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Feeling confident about this chapter? Great! Click the "Next Lesson" button to ' +
            'continue to the next chapter: **Control Flow and Loops**. This chapter introduces ' +
            'the core logic of programming.',
        },
        {
          kind: 'paragraph',
          text:
            'Alternatively, you can take the **Practice: Python Basics** course to reinforce your ' +
            'learning before moving on to the next chapter.',
        },
        { kind: 'heading', level: 3, text: 'Practice: Python Basics' },
        {
          kind: 'paragraph',
          text: 'This companion course provides additional practice problems to build your confidence.',
        },
        {
          kind: 'paragraph',
          text:
            "Each chapter of the **Practice: Python Basics** course corresponds with a chapter " +
            "in this course, allowing you to apply what you've learned.",
        },
      ],
    },
  ],
}
