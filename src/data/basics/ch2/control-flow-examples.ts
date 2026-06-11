import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 10: Control Flow Examples — 10 lesson screens.
//
// Applied module (mirrors Chapter 1's introduction-examples): worked examples
// that combine conditionals and loops — even/odd classifier, multiplication
// table, sum with a condition, FizzBuzz, countdown with break — plus a quiz and
// two exercises (grade classifier, count multiples).
// ─────────────────────────────────────────────────────────────────────────────

export const controlFlowExamplesModule: Module = {
  slug: 'control-flow-examples',
  title: 'Control Flow Examples',
  summary: 'Put conditionals and loops together on real problems.',
  lessons: [
    // ── 1. Putting It Together ────────────────────────────────────────────────
    {
      slug: 'putting-it-together',
      title: 'Putting It Together',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You now have all the building blocks of control flow: booleans, `if` / `elif` / `else`, logical operators, and `while` / `for` loops with `break` and `continue`.',
        },
        {
          kind: 'paragraph',
          text: 'The real power comes from **combining** them — putting an `if` inside a loop so a decision is made on every iteration. This module walks through worked examples that do exactly that, then asks you to write a couple yourself.',
        },
      ],
    },

    // ── 2. Even or Odd in a Loop ──────────────────────────────────────────────
    {
      slug: 'even-or-odd-in-a-loop',
      title: 'Even or Odd in a Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Place an `if` inside a `for` loop to make a decision for each number. This labels every number from 1 to 5 as even or odd.',
        },
        {
          kind: 'runnable',
          code:
            'for n in range(1, 6):\n' +
            '    if n % 2 == 0:\n' +
            '        print(n, "is even")\n' +
            '    else:\n' +
            '        print(n, "is odd")',
        },
        {
          kind: 'paragraph',
          text: 'On each pass the loop checks `n % 2 == 0`. Passing several values to `print()` separated by commas puts a space between them, giving lines like `2 is even`.',
        },
      ],
    },

    // ── 3. A Multiplication Table ─────────────────────────────────────────────
    {
      slug: 'a-multiplication-table',
      title: 'A Multiplication Table',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A loop and a little arithmetic can print a full multiplication table. The loop variable `i` supplies each multiplier.',
        },
        {
          kind: 'runnable',
          code:
            'n = 4\n' +
            'for i in range(1, 6):\n' +
            '    print(n, "x", i, "=", n * i)',
        },
        {
          kind: 'paragraph',
          text: 'Each iteration prints one row — `4 x 1 = 4`, `4 x 2 = 8`, and so on up to `4 x 5 = 20`.',
        },
      ],
    },

    // ── 4. Summing With a Condition ───────────────────────────────────────────
    {
      slug: 'summing-with-a-condition',
      title: 'Summing With a Condition',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Combine an accumulator with an `if` to add up only the values that pass a test — here, the odd numbers from 1 to 10.',
        },
        {
          kind: 'runnable',
          code:
            'total = 0\n' +
            'for i in range(1, 11):\n' +
            '    if i % 2 == 1:\n' +
            '        total = total + i\n' +
            'print(total)',
        },
        {
          kind: 'paragraph',
          text: 'Only odd numbers (`i % 2 == 1`) are added: `1 + 3 + 5 + 7 + 9 = 25`. The even numbers are simply ignored.',
        },
      ],
    },

    // ── 5. FizzBuzz ───────────────────────────────────────────────────────────
    {
      slug: 'fizzbuzz',
      title: 'FizzBuzz',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'FizzBuzz is a classic exercise: count from 1, but print `Fizz` for multiples of 3, `Buzz` for multiples of 5, and `FizzBuzz` for multiples of both. The order of the checks matters — test "both" first.',
        },
        {
          kind: 'runnable',
          code:
            'for i in range(1, 16):\n' +
            '    if i % 15 == 0:\n' +
            '        print("FizzBuzz")\n' +
            '    elif i % 3 == 0:\n' +
            '        print("Fizz")\n' +
            '    elif i % 5 == 0:\n' +
            '        print("Buzz")\n' +
            '    else:\n' +
            '        print(i)',
        },
        {
          kind: 'note',
          text: 'The `i % 15 == 0` check comes first because a number divisible by both 3 and 5 is divisible by 15. If you tested `% 3` first, you would print `Fizz` and never reach `FizzBuzz`.',
        },
      ],
    },

    // ── 6. Stopping a Loop Early ──────────────────────────────────────────────
    {
      slug: 'stopping-a-loop-early',
      title: 'Stopping a Loop Early',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'An `if` with a `break` lets a loop quit the moment a condition is met — here, a countdown that aborts early.',
        },
        {
          kind: 'runnable',
          code:
            'n = 10\n' +
            'while n > 0:\n' +
            '    print(n)\n' +
            '    if n == 7:\n' +
            '        print("Stopping early!")\n' +
            '        break\n' +
            '    n = n - 1',
        },
        {
          kind: 'paragraph',
          text: 'The countdown prints `10`, `9`, `8`, `7`, and when `n` hits 7 it prints `Stopping early!` and `break` ends the loop — it never reaches 6.',
        },
      ],
    },

    // ── 7. Quiz: Trace the Loop ───────────────────────────────────────────────
    {
      slug: 'quiz-trace-the-loop',
      title: 'Trace the Loop',
      type: 'quiz',
      question:
        'What does this code print?\n\n' +
        '`for i in range(1, 4):`\n' +
        '`    if i == 2:`\n' +
        '`        print("two")`\n' +
        '`    else:`\n' +
        '`        print(i)`',
      options: [
        { id: 'a', text: '`1` `two` `3`' },
        { id: 'b', text: '`1` `2` `3`' },
        { id: 'c', text: '`two` `two` `two`' },
        { id: 'd', text: '`1` `3`' },
      ],
      correctOptionId: 'a',
      explanation: 'When `i` is 2 the `if` runs and prints `two`; otherwise the `else` prints the number. So the output is `1`, `two`, `3`.',
    },

    // ── 8. Exercise: Grade Classifier ─────────────────────────────────────────
    {
      slug: 'grade-classifier-exercise',
      title: 'Grade Classifier',
      type: 'exercise',
      problemDescription:
        'Turn a score into a letter grade.\n\n' +
        '- A variable `score` is already created.\n' +
        '- Print the grade using this scale: `A` for 90+, `B` for 80+, `C` for 70+, `D` for 60+, otherwise `F`.\n' +
        '- Use an `if` / `elif` / `else` chain. For `score = 72` the answer is `C`.',
      starterCode:
        'score = 72\n\n' +
        '# Print A (>=90), B (>=80), C (>=70), D (>=60), otherwise F\n',
      expectedOutput: 'C',
      validationMode: 'exact',
      solution:
        'score = 72\n' +
        'if score >= 90:\n' +
        '    print("A")\n' +
        'elif score >= 80:\n' +
        '    print("B")\n' +
        'elif score >= 70:\n' +
        '    print("C")\n' +
        'elif score >= 60:\n' +
        '    print("D")\n' +
        'else:\n' +
        '    print("F")',
    },

    // ── 9. Exercise: Count the Multiples ──────────────────────────────────────
    {
      slug: 'count-multiples-exercise',
      title: 'Count the Multiples',
      type: 'exercise',
      problemDescription:
        'Count multiples of 4.\n\n' +
        '- Loop through the numbers 1 to 30.\n' +
        '- Count how many are multiples of 4 (`i % 4 == 0`).\n' +
        '- Print the count. The answer is `7` (4, 8, 12, 16, 20, 24, 28).',
      starterCode:
        'count = 0\n\n' +
        '# Count how many numbers from 1 to 30 are multiples of 4\n' +
        'for i in range(1, 31):\n' +
        '    if ___:\n' +
        '        count = count + 1\n\n' +
        'print(count)\n',
      expectedOutput: '7',
      validationMode: 'exact',
      solution:
        'count = 0\n' +
        'for i in range(1, 31):\n' +
        '    if i % 4 == 0:\n' +
        '        count = count + 1\n' +
        'print(count)',
    },

    // ── 10. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Control Flow Examples — Complete',
      type: 'recap',
      congratsTitle: 'Great work combining conditionals and loops!',
      summary:
        'You worked through real problems that mix `if` decisions with loops — classifying ' +
        'numbers, building a multiplication table, summing with a condition, FizzBuzz, and ' +
        'stopping a loop early. These patterns appear everywhere in programming. Next is the ' +
        'Chapter 2 **Recap** before the Final Test.',
      nextModuleTitle: 'Recap',
    },
  ],
}
