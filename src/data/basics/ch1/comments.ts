import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 2: Comments — 6 lesson screens.
//
// Teaches the learner what comments are, why they exist, and how to write
// them in Python using the `#` symbol.  Ends with two quizzes and a recap.
// ─────────────────────────────────────────────────────────────────────────────

export const commentsModule: Module = {
  slug: 'comments',
  title: 'Comments',
  summary: 'Add notes to your code that Python ignores.',
  lessons: [
    // ── 1. Introduction to Comments ──────────────────────────────────────────
    {
      slug: 'introduction-to-comments',
      title: 'Introduction to Comments',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'As you start writing more code, you might want to add short explanations inside your program—not for the computer, but for yourself or anyone else reading it later.',
        },
        { kind: 'paragraph', text: 'Suppose you write this line in your code:' },
        { kind: 'runnable', code: 'print(34.0)' },
        { kind: 'paragraph', text: 'This will simply print the number **34.0**.' },
        {
          kind: 'paragraph',
          text: "Now let's say you want to explain what this number means. Maybe it's the temperature or the result of a calculation. You might try writing it like this:",
        },
        { kind: 'runnable', code: 'print(34.0) this shows the temperature' },
        {
          kind: 'paragraph',
          text: "But Python won't understand that extra text, and it will give you an error.",
        },
        {
          kind: 'paragraph',
          text: 'So how do you include extra information in your code without breaking it?',
        },
        {
          kind: 'paragraph',
          text: "That's where comments come in. Comments let you add helpful notes right inside your code, and Python will simply ignore them when running the program.",
        },
        {
          kind: 'paragraph',
          text: "You don't need to worry about how to write them just yet.",
        },
        {
          kind: 'paragraph',
          text: 'Click **Next Lesson** to learn how to add comments properly in Python.',
        },
      ],
    },

    // ── 2. Python Comments ───────────────────────────────────────────────────
    {
      slug: 'python-comments',
      title: 'Python Comments',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In Python, we use the `#` symbol to write comments in our code.',
        },
        { kind: 'paragraph', text: 'On the last page, we saw that writing something like this:' },
        { kind: 'runnable', code: 'print(34.0) this shows the temperature' },
        {
          kind: 'paragraph',
          text: "will give you an error. That's because Python tries to read everything on the line, and it doesn't know what to do with the extra text.",
        },
        {
          kind: 'paragraph',
          text: 'But sometimes, you do want to write a quick note to explain what a line of code is doing. To do that without causing an error, you can use a comment.',
        },
        { kind: 'paragraph', text: 'Just add a `#` before the explanation, like this:' },
        { kind: 'runnable', code: 'print(34.0)  # This shows the temperature' },
        {
          kind: 'paragraph',
          text: "Now Python will run the first part (`print(34.0)`) and completely ignore anything after the `#`. In fact, Python skips any line that starts with `#`—it doesn't run it, and it won't appear in the output at all.",
        },
        {
          kind: 'paragraph',
          text: "Next, you'll look at more examples of comments.",
        },
        { kind: 'paragraph', text: 'Click **Next Lesson** to continue.' },
      ],
    },

    // ── 3. Understanding Python Comments ─────────────────────────────────────
    {
      slug: 'understanding-python-comments',
      title: 'Understanding Python Comments',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "Let's look at another example:" },
        {
          kind: 'runnable',
          code:
            '# Print a number\n' +
            'print(6)\n' +
            'print(8)   # Print another number\n' +
            '# Print third number\n' +
            'print(88.3)',
        },
        { kind: 'paragraph', text: 'This code has three comments:' },
        {
          kind: 'code',
          code: '# Print a number\n# Print another number\n# Print third number',
        },
        {
          kind: 'paragraph',
          text: 'Python skips all of them when running the program. Only the `print()` lines are executed.',
        },
        { kind: 'paragraph', text: 'So this is the same as:' },
        { kind: 'runnable', code: 'print(6)\nprint(8)\nprint(88.3)' },
        { kind: 'paragraph', text: 'The output will be:' },
        {
          kind: 'figure',
          code: 'print(6)\nprint(8)\nprint(88.3)',
          output: '6\n8\n88.3',
          caption: 'Output of the program',
        },
        {
          kind: 'paragraph',
          text: 'The comments help explain the code, but do not affect what the program does.',
        },
        {
          kind: 'note',
          text: "You'll find comments throughout this course, which we'll use to explain the code examples.",
        },
        {
          kind: 'paragraph',
          text: "Next, you'll check your understanding with two short quizzes on identifying comments and understanding their effect.",
        },
        { kind: 'paragraph', text: 'Click **Next Lesson** to continue.' },
      ],
    },

    // ── 4. Quiz: Identify the comment ────────────────────────────────────────
    {
      slug: 'quiz-identify-the-comment',
      title: 'Identify the Comment',
      type: 'quiz',
      question: 'Identify the comment from the given lines of code.\n\n`# print Hello World`\n`print("Hello World")`',
      options: [
        { id: 'a', text: '`print("Hello World")`' },
        { id: 'b', text: '`# print Hello World`' },
        { id: 'c', text: '`#`' },
        { id: 'd', text: '`# print Hello World`\n`print("Hello World")`' },
      ],
      correctOptionId: 'b',
      explanation:
        'A comment in Python is any line that starts with `#`. The line `# print Hello World` begins with `#`, so Python treats it as a comment and ignores it.',
    },

    // ── 5. Quiz: Output with comment ─────────────────────────────────────────
    {
      slug: 'quiz-output-with-comment',
      title: 'Output with Comment',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n`# print("Hello World")`\n`print(5)`',
      options: [
        { id: 'a', text: '`# print("Hello World")`' },
        { id: 'b', text: '`Hello World`' },
        { id: 'c', text: '`Hello World`\n`5`' },
        { id: 'd', text: '`5`' },
      ],
      correctOptionId: 'd',
      explanation:
        'Python ignores any line that starts with `#`, so `# print("Hello World")` is skipped. Only `print(5)` runs, producing the output `5`.',
    },

    // ── 6. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Comments — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Comments!',
      summary:
        "You learned how to use the `#` symbol to add notes to your code that Python ignores. " +
        "Next up: variables — how to store and reuse values in your programs.",
      nextModuleTitle: 'Variables',
    },
  ],
}
