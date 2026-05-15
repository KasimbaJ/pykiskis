import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 1: Get Started — first 7 lesson screens of Chapter 1.
//
// Walks the learner from "what is Python" through writing and running their
// first program, then ends with a chapter-orientation recap.
// ─────────────────────────────────────────────────────────────────────────────

export const getStartedModule: Module = {
  slug: 'get-started',
  title: 'Get Started',
  summary: 'Run your first Python program.',
  lessons: [
    // ── 1. Introduction to Python ────────────────────────────────────────────
    {
      slug: 'introduction-to-python',
      title: 'Introduction to Python',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Welcome to the Python course!' },
        {
          kind: 'paragraph',
          text: "You're about to start learning Python — one of the most popular and widely used programming languages in the world.",
        },
        { kind: 'heading', level: 3, text: 'Why Python?' },
        { kind: 'paragraph', text: "It's not just easy to learn — it's also incredibly powerful." },
        {
          kind: 'paragraph',
          text: 'People use it to build websites, create apps, analyze data, automate tasks, and even work on AI.',
        },
        {
          kind: 'paragraph',
          text: "Whether you're aiming for a career in tech or just curious about coding, Python is a great place to start.",
        },
        { kind: 'paragraph', text: "On this page, you don't need to write any code yet." },
        {
          kind: 'paragraph',
          text: "You'll be writing your own Python code very soon.",
        },
        {
          kind: 'paragraph',
          text: "And don't worry — you can't break anything. Just follow along, explore, and have fun with it.",
        },
        {
          kind: 'paragraph',
          text: 'This course will guide you step by step in a friendly and easy way — no pressure, and no prior experience needed.',
        },
        {
          kind: 'paragraph',
          text: "When you're ready, click **Next Lesson** and we'll run your very first Python code together.",
        },
      ],
    },

    // ── 2. Run Your First Python Program ─────────────────────────────────────
    {
      slug: 'run-your-first-python-program',
      title: 'Run Your First Python Program',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "You're about to run your very first Python program." },
        { kind: 'paragraph', text: 'Here is a simple program that prints `Hello, World!`.' },
        { kind: 'runnable', code: 'print("Hello, World!")' },
        { kind: 'paragraph', text: 'All you have to do is click the **Run Code** button above.' },
        { kind: 'paragraph', text: "You'll see `Hello, World!` appear in the Output section." },
        { kind: 'paragraph', text: "Awesome — you've just run your very first Python program." },
        {
          kind: 'paragraph',
          text: "Don't worry if it doesn't make complete sense yet. We'll walk through how this code works step-by-step on the next page.",
        },
        { kind: 'paragraph', text: 'Go ahead and click **Next Lesson** to keep going.' },
      ],
    },

    // ── 3. Working of the Program ────────────────────────────────────────────
    {
      slug: 'working-of-the-program',
      title: 'Working of the Program',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "Let's take a closer look at the program you just ran." },
        {
          kind: 'paragraph',
          text: 'In Python, we use the function `print()` whenever we want to display something on the screen.',
        },
        { kind: 'paragraph', text: 'The `print()` function shows whatever is inside it.' },
        { kind: 'paragraph', text: 'For example, this program you ran earlier:' },
        {
          kind: 'figure',
          code: 'print("Hello, World!")',
          output: 'Hello, World!',
          caption: 'Print Hello World',
        },
        {
          kind: 'paragraph',
          text: 'When you run the code, the output will show the text without the quotation marks.',
        },
        {
          kind: 'paragraph',
          text: 'The quotation marks `" "` around the text tell Python that this is plain text and should be shown exactly as written.',
        },
        {
          kind: 'paragraph',
          text: "Without those quotes, Python would get confused, wouldn't recognize the text, and would show an error.",
        },
        { kind: 'paragraph', text: "Next, you'll do a quick quiz to help you remember what you've learned." },
        { kind: 'paragraph', text: "After that, you'll get to write your very first Python code yourself." },
        { kind: 'paragraph', text: 'Click **Next Lesson** to keep going.' },
      ],
    },

    // ── 4. Quiz: Valid way to display ────────────────────────────────────────
    {
      slug: 'quiz-valid-print',
      title: 'Valid Way to Display Text',
      type: 'quiz',
      question:
        'Which of the following is the valid way to display `Welcome to Pykiskis` on the screen?',
      options: [
        { id: 'a', text: '`print(Welcome to Pykiskis)`' },
        { id: 'b', text: '`print"Welcome to Pykiskis"`' },
        { id: 'c', text: '`print("Welcome to Pykiskis")`' },
        { id: 'd', text: '`Print("Welcome to Pykiskis")`' },
      ],
      correctOptionId: 'c',
      explanation:
        '`print()` must be lowercase, the parentheses must wrap the text, and the text itself must be inside quotation marks. `print("Welcome to Pykiskis")` satisfies all three rules.',
    },

    // ── 5. Your First Python Program (exercise) ──────────────────────────────
    {
      slug: 'your-first-python-program',
      title: 'Your First Python Program',
      type: 'exercise',
      problemDescription:
        'Write a program that displays the word `welcome` on the screen.\n\n' +
        "On the right, you'll see a code editor where you can write your program.",
      remember: [
        'Use the `print()` function to display the text.',
        'Put the word `welcome` inside quotation marks `" "` — this tells Python it\'s text.',
        'Be careful with capitalization — `welcome` is different from **Welcome**, **WELCOME**, or **WelCome**. You need to match `welcome` exactly.',
      ],
      starterCode: '# Display the word "welcome" on the screen\n',
      expectedOutput: 'welcome',
      validationMode: 'exact',
      solution: 'print("welcome")',
    },

    // ── 6. Course Overview ───────────────────────────────────────────────────
    {
      slug: 'course-overview',
      title: 'Course Overview',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Congratulations on writing your first Python program!' },
        {
          kind: 'paragraph',
          text: "You'll learn and write lots more code throughout this course. Here's what to expect:",
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**Learn Python Concepts** — short, friendly lessons that explain each idea.',
            '**Write Python Code** — try out examples in the browser as you read.',
            '**Solve Practical Exercises** — apply what you learned in small problems.',
          ],
        },
        {
          kind: 'paragraph',
          text: "By the end, you'll write hundreds of programs and create projects, including the rock-paper-scissors game, and become ready to work on real-world projects.",
        },
        { kind: 'paragraph', text: 'Click **Next Lesson** to continue your learning journey!' },
      ],
    },

    // ── 7. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Get Started — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Get Started!',
      summary:
        'This is your first step in your journey to becoming a Python expert. ' +
        "Next up: you'll meet the two kinds of data Python uses most — numbers and strings.",
      nextModuleTitle: 'Numbers and Strings',
    },
  ],
}
