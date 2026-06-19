import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 7: For Loop — 13 lesson screens.
//
// for with range(), range(start, stop), range(start, stop, step), looping over
// a string, the accumulator pattern (visualize), a for-vs-while comparison,
// three quizzes, and two exercises (multiplication table, sum of evens).
// ─────────────────────────────────────────────────────────────────────────────

export const forLoopModule: Module = {
  slug: 'for-loop',
  title: 'For Loop',
  summary: 'Repeat a known number of times with for and range().',
  lessons: [
    // ── 1. A Loop That Counts For You ─────────────────────────────────────────
    {
      slug: 'introduction-to-for-loops',
      title: 'A Loop That Counts',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A `while` loop is perfect when you do not know in advance how many times to repeat. But when you **do** know — "do this 10 times", "go through each letter" — the `for` loop is cleaner and safer.',
        },
        {
          kind: 'paragraph',
          text: 'A `for` loop goes through a **sequence** of values one at a time, running its body once for each value. There is no counter to update by hand, so you can never forget it — no infinite loops.',
        },
        {
          kind: 'paragraph',
          text: 'The most common way to drive a `for` loop is with the `range()` function, which generates a sequence of numbers for you.',
        },
      ],
    },

    // ── 2. for and range ──────────────────────────────────────────────────────
    {
      slug: 'for-and-range',
      title: 'for and range()',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`range(n)` produces the numbers from `0` up to **but not including** `n`. A `for` loop walks through them, putting each one into the loop variable in turn.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(5):\n' +
            '    print(i)',
        },
        {
          kind: 'paragraph',
          text: 'This prints `0`, `1`, `2`, `3`, `4` — five numbers, starting at 0. Read it as: "for each value `i` in the range 0 to 4, print `i`".',
        },
        {
          kind: 'note',
          text: '**Watch out:** `range(5)` stops **before** 5, so it gives `0, 1, 2, 3, 4` — five values, but the last one is 4, not 5.',
        },
      ],
    },

    // ── 3. range with a Start and Stop ────────────────────────────────────────
    {
      slug: 'range-start-and-stop',
      title: 'Choosing Where to Start',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'With two numbers, `range(start, stop)` begins at `start` and stops **before** `stop`.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(2, 6):\n' +
            '    print(i)',
        },
        {
          kind: 'paragraph',
          text: 'This prints `2`, `3`, `4`, `5`. It starts at 2 and stops before 6, so 6 itself is never reached.',
        },
      ],
    },

    // ── 4. range with a Step ──────────────────────────────────────────────────
    {
      slug: 'range-with-a-step',
      title: 'Counting in Steps',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'With three numbers, `range(start, stop, step)` jumps by `step` each time instead of 1.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(0, 10, 2):\n' +
            '    print(i)',
        },
        {
          kind: 'paragraph',
          text: 'This counts in twos: `0`, `2`, `4`, `6`, `8`. The step of 2 skips every odd number, and it still stops before 10.',
        },
      ],
    },

    // ── 5. Looping Over a String ──────────────────────────────────────────────
    {
      slug: 'looping-over-a-string',
      title: 'Looping Over a String',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A `for` loop is not limited to numbers — it can walk through the characters of a **string**, one letter at a time.',
        },
        {
          kind: 'runnable',
          code:
            'for letter in "cat":\n' +
            '    print(letter)',
        },
        {
          kind: 'paragraph',
          text: 'This prints `c`, `a`, `t` — each character on its own line. The loop variable `letter` holds one character per iteration.',
        },
      ],
    },

    // ── 6. Building a Total with for ──────────────────────────────────────────
    {
      slug: 'building-a-total-with-for',
      title: 'Building a Total',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The accumulator pattern works with `for` loops too. Step through the example and watch `total` grow as the loop adds each number from the range.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize, then step through and watch total build up to 10.',
          code:
            'total = 0\n' +
            'for i in range(1, 5):\n' +
            '    total = total + i\n' +
            'print(total)',
        },
        {
          kind: 'paragraph',
          text: '`range(1, 5)` gives `1, 2, 3, 4`. The loop adds each onto `total`, ending at `1 + 2 + 3 + 4 = 10`, which is printed after the loop finishes.',
        },
      ],
    },

    // ── 7. for vs while ───────────────────────────────────────────────────────
    {
      slug: 'for-versus-while',
      title: 'for vs while',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Both loops repeat code, but they suit different jobs:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Use a **`for`** loop when you know how many times to repeat, or want to go through each item in a sequence (a range of numbers, the letters of a string).',
            'Use a **`while`** loop when you do not know the count in advance — you just keep going until some condition changes.',
          ],
        },
        {
          kind: 'note',
          text: 'Because `for` handles the counting for you, it is the safer default for "repeat N times" — there is no loop variable to forget, so no accidental infinite loops.',
        },
      ],
    },

    // ── 8. Quiz: range Output ─────────────────────────────────────────────────
    {
      slug: 'quiz-range-output',
      title: 'What Does range Print?',
      type: 'quiz',
      question:
        'What does this code print?\n\n' +
        '`for i in range(3):`\n' +
        '`    print(i)`',
      options: [
        { id: 'a', text: '`1` `2` `3`' },
        { id: 'b', text: '`0` `1` `2`' },
        { id: 'c', text: '`0` `1` `2` `3`' },
        { id: 'd', text: '`1` `2`' },
      ],
      correctOptionId: 'b',
      explanation: '`range(3)` starts at 0 and stops before 3, giving `0`, `1`, `2` — three values.',
    },

    // ── 9. Quiz: How Many Iterations? ─────────────────────────────────────────
    {
      slug: 'quiz-how-many-iterations',
      title: 'How Many Times?',
      type: 'quiz',
      question: 'How many times does the body of `for i in range(2, 6):` run?',
      options: [
        { id: 'a', text: '6 times' },
        { id: 'b', text: '3 times' },
        { id: 'c', text: '4 times' },
        { id: 'd', text: '5 times' },
      ],
      correctOptionId: 'c',
      explanation: '`range(2, 6)` produces `2, 3, 4, 5` — four values — so the body runs 4 times.',
    },

    // ── 10. Quiz: Looping Over a String ───────────────────────────────────────
    {
      slug: 'quiz-string-loop',
      title: 'Looping a String',
      type: 'quiz',
      question:
        'What does this code print?\n\n' +
        '`for c in "hi":`\n' +
        '`    print(c)`',
      options: [
        { id: 'a', text: '`hi`' },
        { id: 'b', text: '`h` then `i` on separate lines' },
        { id: 'c', text: '`hi` twice' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'b',
      explanation: 'The loop takes one character per iteration, so it prints `h`, then `i`, each on its own line.',
    },

    // ── 11. Exercise: Multiplication Table ────────────────────────────────────
    {
      slug: 'multiplication-table-exercise',
      title: 'Multiplication Table',
      type: 'exercise',
      problemDescription:
        'Print a multiplication table.\n\n' +
        '- A variable `n` is already created.\n' +
        '- Print the first five multiples of `n`: `n*1`, `n*2`, `n*3`, `n*4`, `n*5` — one per line.\n' +
        '- For `n = 3` the output is `3`, `6`, `9`, `12`, `15`.',
      starterCode:
        'n = 3\n\n' +
        '# Print n*1, n*2, ..., n*5 (one per line)\n' +
        'for i in range(1, 6):\n' +
        '    print(___)\n',
      expectedOutput: '3\n6\n9\n12\n15',
      validationMode: 'exact',
      solution:
        'n = 3\n' +
        'for i in range(1, 6):\n' +
        '    print(n * i)',
    },

    // ── 12. Exercise: Sum of Evens ────────────────────────────────────────────
    {
      slug: 'sum-of-evens-exercise',
      title: 'Sum of Evens',
      type: 'exercise',
      problemDescription:
        'Add up the even numbers from 1 to 10.\n\n' +
        '- Loop through the numbers 1 to 10.\n' +
        '- Add a number to `total` only when it is even (`number % 2 == 0`).\n' +
        '- Print the final total. The answer is `30` (2 + 4 + 6 + 8 + 10).',
      starterCode:
        'total = 0\n\n' +
        '# Add up the even numbers from 1 to 10, then print the total\n' +
        'for i in range(1, 11):\n' +
        '    if ___:\n' +
        '        total = total + i\n\n' +
        'print(total)\n',
      expectedOutput: '30',
      validationMode: 'exact',
      solution:
        'total = 0\n' +
        'for i in range(1, 11):\n' +
        '    if i % 2 == 0:\n' +
        '        total = total + i\n' +
        'print(total)',
    },

    // ── Exercise: Sum of Natural Numbers ──────────────────────────────────────
    {
      slug: 'sum-natural-numbers-exercise',
      title: 'Sum of Natural Numbers',
      type: 'exercise',
      problemDescription:
        'Add up every whole number from 1 up to `n`.\n\n' +
        '- An integer is read into `n`.\n' +
        '- Use `range(1, n + 1)` so the loop includes `n` itself.\n' +
        '- Add each number to `total`, then print it as `Total = 15` (for `n = 5`).',
      remember: [
        '`range(1, n + 1)` counts 1, 2, … up to and including `n`.',
        'Print the total **after** the loop, not inside it.',
      ],
      starterCode:
        'n = int(input("Enter an integer: "))\n' +
        'total = 0\n\n' +
        '# Add 1 + 2 + ... + n into total, then print "Total = ..."\n' +
        'for i in range(1, n + 1):\n' +
        '    ___\n\n' +
        'print(f"Total = {total}")\n',
      expectedOutput: 'Total = 15',
      validationMode: 'exact',
      solution:
        'n = int(input("Enter an integer: "))\n' +
        'total = 0\n' +
        'for i in range(1, n + 1):\n' +
        '    total = total + i\n' +
        'print(f"Total = {total}")',
      inputValues: ['5'],
    },

    // ── Exercise: Factorial ───────────────────────────────────────────────────
    {
      slug: 'factorial-exercise',
      title: 'Factorial of a Number',
      type: 'exercise',
      problemDescription:
        'The factorial of `n` is `1 * 2 * 3 * ... * n`.\n\n' +
        '- An integer is read into `n`.\n' +
        '- Multiply the numbers from 1 to `n` together into `factorial`.\n' +
        '- Print the result. For `n = 4` the answer is `24` (1 × 2 × 3 × 4).',
      remember: [
        'Start `factorial` at `1`, not `0` — multiplying by 0 ruins the result.',
        'This is just like the sum exercise, but with `*` instead of `+`.',
      ],
      starterCode:
        'n = int(input("Enter an integer: "))\n' +
        'factorial = 1\n\n' +
        '# Multiply 1 * 2 * ... * n into factorial, then print it\n' +
        'for i in range(1, n + 1):\n' +
        '    ___\n\n' +
        'print(factorial)\n',
      expectedOutput: '24',
      validationMode: 'exact',
      solution:
        'n = int(input("Enter an integer: "))\n' +
        'factorial = 1\n' +
        'for i in range(1, n + 1):\n' +
        '    factorial = factorial * i\n' +
        'print(factorial)',
      inputValues: ['4'],
    },

    // ── Quiz: Divisible by 3 ──────────────────────────────────────────────────
    {
      slug: 'quiz-divisible-by-three',
      title: 'Filtering in a Loop',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n' +
        '`for number in range(1, 10):`\n`    if number % 3 == 0:`\n`        print(number)`',
      options: [
        { id: 'a', text: '`1 2 3 4 5 6 7 8 9` (each on its own line)' },
        { id: 'b', text: '`3 6 9` (each on its own line)' },
        { id: 'c', text: '`1 3 5 7 9` (each on its own line)' },
        { id: 'd', text: '`2 4 6 8` (each on its own line)' },
      ],
      correctOptionId: 'b',
      explanation:
        '`range(1, 10)` produces 1 through 9. The `if number % 3 == 0` test is only `True` for the multiples of 3, so just `3`, `6`, and `9` are printed.',
    },

    // ── 12b. Exercise: Print Odd Numbers ─────────────────────────────────────
    {
      slug: 'print-odd-numbers-exercise',
      title: 'Your Turn: Print Odd Numbers',
      type: 'exercise',
      problemDescription:
        'Print the odd numbers up to n.\n\n' +
        '- Read a positive integer `n` with `int(input())`.\n' +
        '- Loop from 1 to `n` **inclusive** and print each number that is odd ' +
        '(`i % 2 == 1`), one per line.\n\n' +
        'The test enters `8` — so the expected output is `1`, `3`, `5`, `7`.',
      starterCode:
        'n = int(input("Enter n: "))\n\n' +
        '# Print each odd number from 1 to n (inclusive)\n' +
        'for i in range(1, n + 1):\n' +
        '    ___\n',
      expectedOutput: '1\n3\n5\n7',
      validationMode: 'exact',
      inputValues: ['8'],
      solution:
        'n = int(input("Enter n: "))\n' +
        'for i in range(1, n + 1):\n' +
        '    if i % 2 == 1:\n' +
        '        print(i)',
    },

    // ── 13. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'For Loop — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing the For Loop!',
      summary:
        'You can now repeat a known number of times with `for` and `range()`: `range(n)` ' +
        'counts from 0, `range(start, stop)` chooses where to begin, and a third number sets ' +
        'the step. You also looped over the characters of a string and reused the accumulator ' +
        'pattern. Next up: **Break and Continue** — changing how a loop flows.',
      nextModuleTitle: 'Break and Continue',
    },
  ],
}
