import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 6 · Module 1: Using Modules — 11 lesson screens.
//
// import, the math module (sqrt/floor/ceil/pi), the random module (randint/
// choice), and `from ... import`. math functions are deterministic; random is
// shown in runnables only (output not checked, must not error).
// ─────────────────────────────────────────────────────────────────────────────

export const usingModulesModule: Module = {
  slug: 'using-modules',
  title: 'Using Modules',
  summary: 'Borrow ready-made tools with import — math, random, and more.',
  lessons: [
    // ── 1. What Is a Module? ──────────────────────────────────────────────────
    {
      slug: 'what-is-a-module',
      title: 'What Is a Module?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You do not have to write everything from scratch. Python ships with **modules** — ready-made collections of useful functions, grouped by topic.',
        },
        {
          kind: 'paragraph',
          text: 'You already used one: `random`, in the Number Guessing Game. To use a module, you `import` it once at the top of your program, then call its functions with a dot, like `random.randint(...)`.',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`math` — square roots, rounding, constants like pi',
            '`random` — random numbers and choices',
            '…and many more that come with Python',
          ],
        },
      ],
    },

    // ── 2. Importing a Module ─────────────────────────────────────────────────
    {
      slug: 'importing-a-module',
      title: 'Importing a Module',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Write `import` followed by the module name. After that, every function inside is available as `module.function()`.',
        },
        {
          kind: 'runnable',
          code:
            'import math\n\n' +
            'print(math.sqrt(16))',
        },
        {
          kind: 'paragraph',
          text: '`math.sqrt(16)` gives `4.0` — the square root of 16. The `math.` part tells Python to look inside the math module for `sqrt`.',
        },
        {
          kind: 'note',
          text: 'You only need to `import` a module once, at the top of your file. After that you can use it as many times as you like.',
        },
      ],
    },

    // ── 3. The math Module ────────────────────────────────────────────────────
    {
      slug: 'the-math-module',
      title: 'The math Module',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `math` module is full of handy tools. `floor` rounds down, `ceil` rounds up, and `sqrt` takes a square root.',
        },
        {
          kind: 'runnable',
          code:
            'import math\n\n' +
            'print(math.sqrt(25))\n' +
            'print(math.floor(3.7))\n' +
            'print(math.ceil(3.2))',
        },
        {
          kind: 'paragraph',
          text: 'This prints `5.0`, then `3` (3.7 rounded down), then `4` (3.2 rounded up). These are far easier than writing the maths yourself.',
        },
      ],
    },

    // ── 4. Constants Like pi ──────────────────────────────────────────────────
    {
      slug: 'constants-like-pi',
      title: 'Constants Like pi',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Modules can hold **values** too, not just functions. `math.pi` is the constant pi, useful for circle calculations.',
        },
        {
          kind: 'runnable',
          code:
            'import math\n\n' +
            'radius = 5\n' +
            'area = math.pi * radius * radius\n' +
            'print(round(area, 2))',
        },
        {
          kind: 'paragraph',
          text: 'Using `math.pi` (about 3.14159), the area of a circle with radius 5 is about `78.54`. The built-in `round(value, 2)` keeps two decimal places.',
        },
      ],
    },

    // ── 5. The random Module ──────────────────────────────────────────────────
    {
      slug: 'the-random-module',
      title: 'The random Module',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `random` module brings unpredictability. `random.randint(a, b)` gives a whole number between `a` and `b` (both included).',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'dice = random.randint(1, 6)\n' +
            'print("You rolled a", dice)',
        },
        {
          kind: 'paragraph',
          text: 'Run it a few times — you get a different dice roll on most runs. This is the same function that picked the secret number in your guessing game.',
        },
      ],
    },

    // ── 6. Random Choices ─────────────────────────────────────────────────────
    {
      slug: 'random-choices',
      title: 'Random Choices',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`random.choice()` picks one random item from a list — perfect for choosing from a set of options.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'options = ["heads", "tails"]\n' +
            'print(random.choice(options))',
        },
        {
          kind: 'paragraph',
          text: 'Each run flips the coin again, printing `heads` or `tails`. `random.choice` works with any list — colours, names, prizes, anything.',
        },
      ],
    },

    // ── 7. from ... import ────────────────────────────────────────────────────
    {
      slug: 'from-import',
      title: 'from ... import',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'If you only need one function from a module, you can import it by name with `from ... import`. Then you use it **without** the module prefix.',
        },
        {
          kind: 'runnable',
          code:
            'from math import sqrt\n\n' +
            'print(sqrt(49))',
        },
        {
          kind: 'paragraph',
          text: 'Here `sqrt` is imported directly, so we call it as `sqrt(49)` (giving `7.0`) instead of `math.sqrt(49)`. Both styles work — use whichever reads more clearly.',
        },
      ],
    },

    // ── 8. Quiz: Square Root ──────────────────────────────────────────────────
    {
      slug: 'quiz-sqrt',
      title: 'Using the math Module',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`import math`\n' +
        '`print(math.sqrt(9))`',
      options: [
        { id: 'a', text: '`3`' },
        { id: 'b', text: '`3.0`' },
        { id: 'c', text: '`9`' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'b',
      explanation: '`math.sqrt` returns a float, so the square root of 9 is `3.0`.',
    },

    // ── 9. Quiz: import ───────────────────────────────────────────────────────
    {
      slug: 'quiz-import',
      title: 'Borrowing a Tool',
      type: 'quiz',
      question: 'What must you do before using a module like `math` or `random`?',
      options: [
        { id: 'a', text: 'Nothing — they are always available.' },
        { id: 'b', text: '`import` the module first.' },
        { id: 'c', text: 'Define it with `def`.' },
        { id: 'd', text: 'Install it from the internet each time.' },
      ],
      correctOptionId: 'b',
      explanation: 'You `import` a module once (usually at the top) before using its functions.',
    },

    // ── 10. Exercise: Round Up ────────────────────────────────────────────────
    {
      slug: 'round-up-exercise',
      title: 'Your Turn: Round Up',
      type: 'exercise',
      problemDescription:
        'Use the math module.\n\n' +
        '- `import math`.\n' +
        '- Use `math.ceil()` to round `4.1` **up** and print the result.\n\n' +
        'The expected output is `5`.',
      starterCode:
        '# import math, then print math.ceil(4.1)\n',
      expectedOutput: '5',
      validationMode: 'exact',
      solution:
        'import math\n' +
        'print(math.ceil(4.1))',
    },

    // ── 11. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Using Modules — Complete',
      type: 'recap',
      congratsTitle: 'You can use Python modules!',
      summary:
        'Modules give you ready-made tools. You `import` a module, then call its functions ' +
        'with a dot (`math.sqrt`, `random.randint`, `random.choice`) or use values like ' +
        '`math.pi`. `from math import sqrt` pulls in a single function directly. Next up: ' +
        'Nested Loops.',
      nextModuleTitle: 'Nested Loops',
    },
  ],
}
