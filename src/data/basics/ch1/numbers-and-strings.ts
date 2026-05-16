import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 2: Numbers and Strings — 12 lesson screens.
//
// Introduces the two most common data types in Python — strings (text inside
// quotes) and numbers (integers and floating-point).  Mixes theory pages with
// runnable demos, two quizzes, and two coding exercises.
// ─────────────────────────────────────────────────────────────────────────────

export const numbersAndStringsModule: Module = {
  slug: 'numbers-and-strings',
  title: 'Numbers and Strings',
  summary: 'Meet the two most common types of data in Python.',
  lessons: [
    // ── 1. Introduction to Data Types ────────────────────────────────────────
    {
      slug: 'introduction-to-data-types',
      title: 'Introduction to Data Types',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Hey! Remember this from the last lesson?' },
        { kind: 'runnable', code: 'print("welcome")' },
        {
          kind: 'paragraph',
          text: 'Anything inside quotation marks `" "` is treated as text. In programming, text is called **string**.',
        },
        {
          kind: 'paragraph',
          text: "In this lesson, you'll learn about two of the most commonly used types of data:",
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**Strings** — used for text (like the `"welcome"` above)',
            '**Numbers** — used for doing math and calculations',
          ],
        },
        {
          kind: 'note',
          text: "**Note:** You don't need to be a math genius. We're just talking about basic things — adding, subtracting, multiplying. So don't overthink the numbers. You've got this!",
        },
        { kind: 'paragraph', text: "Next, let's explore strings in more detail." },
        { kind: 'paragraph', text: 'Click **Next Lesson** to continue.' },
      ],
    },

    // ── 2. Strings ───────────────────────────────────────────────────────────
    {
      slug: 'strings',
      title: 'Strings',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'So now you know — anything inside quotes is a string in Python. Like this:' },
        { kind: 'code', code: '"This is a string."' },
        { kind: 'paragraph', text: 'But guess what? You can also use single quotes:' },
        { kind: 'code', code: "'This is also a string.'" },
        { kind: 'paragraph', text: 'To show them on the screen, just wrap them inside the `print()` function, like this:' },
        {
          kind: 'runnable',
          code: 'print("This is a string.")\nprint(\'This is also a string.\')',
        },
        { kind: 'paragraph', text: 'Go ahead — click the **Run Code** button to see the output.' },
        {
          kind: 'paragraph',
          text: 'You can use single or double quotes — just try to be consistent so your code stays nice and tidy.',
        },
        { kind: 'paragraph', text: "But what if you don't use quotes at all?" },
        { kind: 'paragraph', text: "Let's find out in the next lesson." },
        { kind: 'paragraph', text: 'Click **Next Lesson** to continue.' },
      ],
    },

    // ── 3. Be Careful When Using Strings ─────────────────────────────────────
    {
      slug: 'be-careful-when-using-strings',
      title: 'Be Careful When Using Strings',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'If you do not wrap text inside quotation marks, it is not recognized as a string. For example:',
        },
        { kind: 'runnable', code: 'print(Hey there)' },
        {
          kind: 'figure',
          code: 'print(Hey there)',
          output:
            'ERROR! File "<string>", line 1\n    print(Hey there)\n              ^^^^^\nSyntaxError: invalid syntax. Perhaps you forgot a comma?',
          caption: 'Output when quotes are missing',
        },
        { kind: 'paragraph', text: 'If you execute this program, you will get an error.' },
        { kind: 'paragraph', text: 'Here is another example:' },
        { kind: 'runnable', code: 'print("Hey)' },
        {
          kind: 'figure',
          code: 'print("Hey)',
          output:
            'ERROR! File "<string>", line 1\n    print("Hey)\n          ^\nSyntaxError: unterminated string literal (detected at line 1)',
          caption: 'Output when a closing quote is missing',
        },
        {
          kind: 'paragraph',
          text: 'You will get an error here because the closing quotation mark is missing at the end of `"Hey`.',
        },
        {
          kind: 'paragraph',
          text: "These kinds of errors are super common when you're starting out, so don't worry — you'll get the hang of it!",
        },
        {
          kind: 'paragraph',
          text: "Ready to move on? Next, you'll look at how even tiny things — like a capital letter or an extra space — can make a big difference.",
        },
        { kind: 'paragraph', text: 'Click **Next Lesson** to continue!' },
      ],
    },

    // ── 4. Strings are Fixed Values ──────────────────────────────────────────
    {
      slug: 'strings-are-fixed-values',
      title: 'Strings are Fixed Values',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Remember the very first Python code you wrote?' },
        { kind: 'runnable', code: 'print("welcome")' },
        { kind: 'paragraph', text: "We asked you to type it exactly like that — and here's why." },
        {
          kind: 'paragraph',
          text: 'In Python, strings are **case sensitive**. That means uppercase and lowercase letters are treated as completely different.',
        },
        { kind: 'paragraph', text: 'For example:' },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`"welcome"` is not the same as `"WELCOME"`',
            '`"welcome"` is not the same as `"Welcome"`',
            '`"welcome"` is not the same as `"WelCome"`',
          ],
        },
        {
          kind: 'paragraph',
          text: 'The letters have to match exactly — same spelling, same case.',
        },
        { kind: 'paragraph', text: 'Similarly, spaces matter too.' },
        { kind: 'paragraph', text: 'Even a small space can change the string completely.' },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`"welcome"` is not the same as `"wel come"` (there\'s a space in the middle)',
            '`"welcome"` is not the same as `" welcome"` (space at the beginning)',
            '`"welcome"` is not the same as `"welcome "` (space at the end)',
          ],
        },
        {
          kind: 'paragraph',
          text: 'To us, it might look similar — but Python sees it as something totally different.',
        },
        { kind: 'paragraph', text: 'So always double-check your spelling, your casing, and your spacing.' },
        { kind: 'paragraph', text: "Next, let's learn about numbers in Python." },
      ],
    },

    // ── 5. Numbers ───────────────────────────────────────────────────────────
    {
      slug: 'numbers',
      title: 'Numbers',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'The two common types of numbers in Python are:' },
        { kind: 'heading', level: 3, text: '1. Integers' },
        {
          kind: 'paragraph',
          text: 'Integers are numbers without decimal points. They can be positive, negative, or zero. Examples include **5**, **-11**, **0** and **12**.',
        },
        { kind: 'heading', level: 3, text: '2. Floating-Point Numbers' },
        {
          kind: 'paragraph',
          text: 'Floating-point numbers contain decimal points. Like integers, they can also be positive, negative, or zero. Examples include **2.5**, **6.76**, **0.0**, and **-9.45**.',
        },
        {
          kind: 'paragraph',
          text: "You'll learn how to print these numbers — but first, take a quick quiz on floating-point numbers.",
        },
      ],
    },

    // ── 6. Quiz: Not a floating-point number ─────────────────────────────────
    {
      slug: 'quiz-not-a-floating-point',
      title: 'Identify the Non-Float',
      type: 'quiz',
      question: 'Which of the following is **not a floating-point** number in Python?',
      options: [
        { id: 'a', text: '`3.14`' },
        { id: 'b', text: '`-2.0`' },
        { id: 'c', text: '`5`' },
        { id: 'd', text: '`0.001`' },
      ],
      correctOptionId: 'c',
      explanation:
        'Floating-point numbers contain a decimal point. `5` has no decimal — it is an integer. `3.14`, `-2.0`, and `0.001` all contain decimal points, so they are floating-point numbers.',
    },

    // ── 7. Print Numbers ─────────────────────────────────────────────────────
    {
      slug: 'print-numbers',
      title: 'Print Numbers',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: "In Python, you don't need to use quotation marks to print numbers. Unlike strings, numbers can be printed directly.",
        },
        { kind: 'paragraph', text: 'For example, to print the number **5**:' },
        { kind: 'runnable', code: 'print(5)' },
        {
          kind: 'paragraph',
          text: 'Click the **Run Code** button, and you should see **5** printed on the Output screen.',
        },
        {
          kind: 'paragraph',
          text: 'You can also print floating-point numbers (numbers with decimals) the same way:',
        },
        { kind: 'runnable', code: 'print(343.44)' },
        {
          kind: 'paragraph',
          text: 'Click the **Run Code** button, and you should see **343.44** printed on the Output screen.',
        },
        {
          kind: 'paragraph',
          text: "No quotes needed — Python understands that you're working with numbers, not text.",
        },
        { kind: 'paragraph', text: 'But what happens if you print numbers with quotation marks?' },
        { kind: 'paragraph', text: "Let's find out next!" },
      ],
    },

    // ── 8. Quiz: Not a string ────────────────────────────────────────────────
    {
      slug: 'quiz-not-a-string',
      title: 'Identify the Non-String',
      type: 'quiz',
      question: 'Which of the following is **not a string** in Python?',
      options: [
        { id: 'a', text: "`'123'`" },
        { id: 'b', text: '`"Hello, World!"`' },
        { id: 'c', text: '`Python`' },
        { id: 'd', text: '`"52"`' },
      ],
      correctOptionId: 'c',
      explanation:
        'A string in Python must be wrapped in quotation marks (single or double). `Python` has no quotes, so Python does not recognise it as a string — it would raise an error if you tried to use it as one.',
    },

    // ── 9. Print Number (exercise) ───────────────────────────────────────────
    {
      slug: 'print-number',
      title: 'Print Number',
      type: 'exercise',
      problemDescription: 'Write a program to print the number **65.6**.',
      remember: [
        'Use the `print()` function to show the number.',
        'Put `65.6` inside the `print()` function.',
        "Don't use quotation marks — we're printing a number, not text.",
      ],
      starterCode: '# Write your code below\n',
      expectedOutput: '65.6',
      validationMode: 'exact',
      solution: 'print(65.6)',
    },

    // ── 10. Print Numbers and Strings ────────────────────────────────────────
    {
      slug: 'print-numbers-and-strings',
      title: 'Print Numbers and Strings',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "You've already used `print()` a few times — great job so far!" },
        { kind: 'paragraph', text: "Let's look at one more example — just to help you get more comfortable using `print()`:" },
        { kind: 'runnable', code: 'print(11)\nprint("How are you?")' },
        {
          kind: 'figure',
          code: 'print(11)\nprint("How are you?")',
          output: '11\nHow are you?',
          caption: 'Print on two separate lines',
        },
        { kind: 'paragraph', text: 'Each time you use `print()`, Python moves to a new line automatically.' },
        { kind: 'paragraph', text: 'That\'s why **11** appears on the first line, and `"How are you?"` on the second.' },
        {
          kind: 'note',
          text: "**Note:** You'll learn more ways to use `print()` later (in the Output section). For now, don't worry — we've got you covered. This course is designed to guide you step by step without overwhelming you. Just keep going — you're doing great!",
        },
        {
          kind: 'paragraph',
          text: "Next up, you'll do a quick practice using the same idea — printing a string and a number.",
        },
      ],
    },

    // ── 11. Print Numbers and Strings (exercise) ─────────────────────────────
    {
      slug: 'print-numbers-and-strings-exercise',
      title: 'Print Numbers and Strings',
      type: 'exercise',
      problemDescription: 'Write a program to print a string and an integer.\n\n' +
        '- Print `Python` on the first line.\n' +
        '- Print **75** on the next line.',
      remember: [
        'Use the `print()` function twice — once for each line.',
        'Put quotes around `Python` (it\'s a string).',
        'Don\'t use quotes for `75` (it\'s a number).',
        'Each `print()` will automatically go to a new line — no need to add anything extra.',
        "If your answer isn't working, double-check and match the spelling and capitalization exactly.",
      ],
      starterCode: '# Write your code below\n',
      expectedOutput: 'Python\n75',
      validationMode: 'exact',
      solution: 'print("Python")\nprint(75)',
    },

    // ── 12. Recap — module completion ────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Numbers and Strings — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Numbers and Strings!',
      summary:
        "You can now tell strings and numbers apart, print them, and watch out for missing quotes and case mismatches. " +
        'Next up: a quick **Progress Test** to check what you have learned so far.',
      nextModuleTitle: 'Progress Test 1',
    },
  ],
}
