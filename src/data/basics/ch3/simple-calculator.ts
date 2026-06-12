import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 3 · Project 2: Simple Calculator — 11 lesson screens.
//
// Reads two numbers and an operator, computes +, -, *, /, ** with an if/elif
// ladder, guards against divide-by-zero, formats output with f-strings, and
// loops to calculate again.  Ch1–2 skills only (no functions/lists).  Runnables
// use inputValues; the looping version ends on a "n" sentinel so it terminates.
// ─────────────────────────────────────────────────────────────────────────────

export const simpleCalculatorModule: Module = {
  slug: 'simple-calculator',
  title: 'Simple Calculator',
  summary: 'Build a calculator that handles +, -, *, /, ** and errors.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In this project you will build a **Simple Calculator** in Python. It will reinforce your core skills while showing how a real program is assembled from small pieces.',
        },
        {
          kind: 'paragraph',
          text: 'By the end, your calculator will be able to:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Add, subtract, multiply, divide, and raise to a power',
            'Handle a bad operation and divide-by-zero safely',
            'Run multiple calculations without restarting the program',
          ],
        },
        {
          kind: 'note',
          text: 'As always, we will build it one small step at a time — exactly how real developers work.',
        },
      ],
    },

    // ── 2. What You Need ──────────────────────────────────────────────────────
    {
      slug: 'what-you-need',
      title: 'What You Need',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Make sure you are comfortable with these Chapter 1–2 skills first:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Reading input with `input()` and converting it with `float()`',
            'Arithmetic operators: `+`, `-`, `*`, `/`, `**`',
            'Writing `if` / `elif` / `else` statements',
            'Repeating actions with a `while` loop',
          ],
        },
      ],
    },

    // ── 3. Taking User Input ──────────────────────────────────────────────────
    {
      slug: 'taking-user-input',
      title: 'Taking User Input',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A calculator needs two numbers. We read them with `input()` and wrap each in `float()` so they can hold decimals as well as whole numbers.',
        },
        {
          kind: 'runnable',
          code:
            'a = float(input("Enter the first number: "))\n' +
            'b = float(input("Enter the second number: "))\n\n' +
            'print("You entered:", a, "and", b)',
          inputValues: ['12', '3'],
        },
        {
          kind: 'note',
          text: 'We use `float()` rather than `int()` so the calculator works with numbers like `2.5`. That is why `12` shows as `12.0`.',
        },
      ],
    },

    // ── 4. Your First Calculation ─────────────────────────────────────────────
    {
      slug: 'your-first-calculation',
      title: 'Your First Calculation',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'With two numbers stored, doing maths is easy. Let us add them.',
        },
        {
          kind: 'runnable',
          code:
            'a = float(input("Enter the first number: "))\n' +
            'b = float(input("Enter the second number: "))\n\n' +
            'print(a + b)',
          inputValues: ['12', '3'],
        },
        {
          kind: 'paragraph',
          text: 'That prints `15.0`. But a calculator that can only add is not very useful — we want the user to choose the operation.',
        },
      ],
    },

    // ── 5. Getting the Operator ───────────────────────────────────────────────
    {
      slug: 'getting-the-operator',
      title: 'Getting the Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Let us also ask the user which operation to perform. This one stays a string (no `float()`), because `+` or `*` is a symbol, not a number.',
        },
        {
          kind: 'runnable',
          code:
            'a = float(input("Enter the first number: "))\n' +
            'b = float(input("Enter the second number: "))\n' +
            'op = input("Enter an operation (+, -, *, /, **): ")\n\n' +
            'print("You chose:", op)',
          inputValues: ['12', '3', '+'],
        },
        {
          kind: 'paragraph',
          text: 'Now we have everything we need: two numbers and an operator. Next we decide what to do with them.',
        },
      ],
    },

    // ── 6. The if/elif Ladder ─────────────────────────────────────────────────
    {
      slug: 'the-if-elif-ladder',
      title: 'The if/elif Ladder',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'An `if` / `elif` ladder checks the operator and runs the matching calculation. Each branch handles one operation.',
        },
        {
          kind: 'runnable',
          code:
            'a = float(input("Enter the first number: "))\n' +
            'b = float(input("Enter the second number: "))\n' +
            'op = input("Enter an operation (+, -, *, /, **): ")\n\n' +
            'if op == "+":\n' +
            '    print(a + b)\n' +
            'elif op == "-":\n' +
            '    print(a - b)\n' +
            'elif op == "*":\n' +
            '    print(a * b)\n' +
            'elif op == "/":\n' +
            '    print(a / b)\n' +
            'elif op == "**":\n' +
            '    print(a ** b)\n' +
            'else:\n' +
            '    print("Unknown operation")',
          inputValues: ['12', '3', '*'],
        },
        {
          kind: 'paragraph',
          text: 'With `12`, `3`, and `*` it prints `36.0`. The `else` catches anything that is not one of the five operators, so a typo gives a friendly message instead of a crash.',
        },
      ],
    },

    // ── 7. Handling a Critical Error ──────────────────────────────────────────
    {
      slug: 'handling-a-critical-error',
      title: 'Handling a Critical Error',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'There is one calculation Python refuses to do: dividing by zero. If we do not handle it, the program crashes. Let us check for it **before** dividing.',
        },
        {
          kind: 'runnable',
          code:
            'a = float(input("Enter the first number: "))\n' +
            'b = float(input("Enter the second number: "))\n' +
            'op = input("Enter an operation (+, -, *, /, **): ")\n\n' +
            'if op == "/" and b == 0:\n' +
            '    print("Error: cannot divide by zero!")\n' +
            'elif op == "+":\n' +
            '    print(a + b)\n' +
            'elif op == "-":\n' +
            '    print(a - b)\n' +
            'elif op == "*":\n' +
            '    print(a * b)\n' +
            'elif op == "/":\n' +
            '    print(a / b)\n' +
            'elif op == "**":\n' +
            '    print(a ** b)\n' +
            'else:\n' +
            '    print("Unknown operation")',
          inputValues: ['10', '0', '/'],
        },
        {
          kind: 'paragraph',
          text: 'Now dividing 10 by 0 prints `Error: cannot divide by zero!` instead of crashing. Anticipating bad input like this is a big part of writing robust programs.',
        },
      ],
    },

    // ── 8. Exercise: Add or Subtract ──────────────────────────────────────────
    {
      slug: 'add-or-subtract-exercise',
      title: 'Your Turn: Add or Subtract',
      type: 'exercise',
      problemDescription:
        'Write a mini-calculator with two operations.\n\n' +
        '- Read two numbers with `float(input())` and an operator with `input()`.\n' +
        '- If the operator is `+`, print their sum. Otherwise, print their difference (`a - b`).\n\n' +
        'When the test runs your code it enters `8`, `5`, and `+` — so the expected output is `13.0`.',
      starterCode:
        'a = float(input("First number: "))\n' +
        'b = float(input("Second number: "))\n' +
        'op = input("Operator: ")\n\n' +
        '# If op is "+", print a + b, otherwise print a - b\n',
      expectedOutput: '13.0',
      validationMode: 'exact',
      inputValues: ['8', '5', '+'],
      solution:
        'a = float(input("First number: "))\n' +
        'b = float(input("Second number: "))\n' +
        'op = input("Operator: ")\n' +
        'if op == "+":\n' +
        '    print(a + b)\n' +
        'else:\n' +
        '    print(a - b)',
    },

    // ── 9. Formatting the Output ──────────────────────────────────────────────
    {
      slug: 'formatting-the-output',
      title: 'Formatting the Output',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A bare `15.0` is a bit plain. An **f-string** lets us show the whole calculation, which is much friendlier.',
        },
        {
          kind: 'runnable',
          code:
            'a = float(input("Enter the first number: "))\n' +
            'b = float(input("Enter the second number: "))\n' +
            'op = input("Enter an operation (+, -, *, /, **): ")\n\n' +
            'if op == "+":\n' +
            '    print(f"{a} + {b} = {a + b}")\n' +
            'elif op == "-":\n' +
            '    print(f"{a} - {b} = {a - b}")\n' +
            'else:\n' +
            '    print("Try + or - for this demo")',
          inputValues: ['12', '3', '+'],
        },
        {
          kind: 'paragraph',
          text: 'Now the output reads `12.0 + 3.0 = 15.0` — clear and complete. We will use this style in the finished program.',
        },
      ],
    },

    // ── 10. Calculating Again — The Complete Program ──────────────────────────
    {
      slug: 'calculating-again',
      title: 'The Complete Calculator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Finally, let us let the user run as many calculations as they like. A `while` loop keeps going until they answer `n` to "Calculate again?". This is the complete program — every piece you built, together.',
        },
        {
          kind: 'runnable',
          code:
            'again = "y"\n\n' +
            'while again == "y":\n' +
            '    a = float(input("Enter the first number: "))\n' +
            '    b = float(input("Enter the second number: "))\n' +
            '    op = input("Enter an operation (+, -, *, /, **): ")\n\n' +
            '    if op == "/" and b == 0:\n' +
            '        print("Error: cannot divide by zero!")\n' +
            '    elif op == "+":\n' +
            '        print(f"{a} + {b} = {a + b}")\n' +
            '    elif op == "-":\n' +
            '        print(f"{a} - {b} = {a - b}")\n' +
            '    elif op == "*":\n' +
            '        print(f"{a} * {b} = {a * b}")\n' +
            '    elif op == "/":\n' +
            '        print(f"{a} / {b} = {a / b}")\n' +
            '    elif op == "**":\n' +
            '        print(f"{a} ** {b} = {a ** b}")\n' +
            '    else:\n' +
            '        print("Unknown operation")\n\n' +
            '    again = input("Calculate again? (y/n): ")\n\n' +
            'print("Thanks for using the calculator!")',
          inputValues: ['12', '3', '+', 'n'],
        },
        {
          kind: 'paragraph',
          text: 'Run it and do a few calculations in a row — type `y` to keep going or `n` to stop. You have built a complete, reusable calculator!',
        },
      ],
    },

    // ── 11. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Simple Calculator — Complete',
      type: 'recap',
      congratsTitle: 'You built a Simple Calculator! 🧮',
      summary:
        'Your calculator reads two numbers and an operator, runs the right calculation with ' +
        'an if/elif ladder, guards against divide-by-zero, formats its output with f-strings, ' +
        'and loops so the user can keep calculating. That is a complete little tool — built ' +
        'step by step. Next up: the Student Grade Calculator.',
      nextModuleTitle: 'Student Grade Calculator',
    },
  ],
}
