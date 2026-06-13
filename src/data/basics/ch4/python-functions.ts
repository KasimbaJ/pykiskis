import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 4 · Module 1: Python Functions — 13 lesson screens.
//
// Defining functions with def, calling them, parameters/arguments, return
// values, return vs print, a visualize block stepping into a call, quizzes,
// and an exercise. All deterministic (no input) — straightforward to qa-verify.
// ─────────────────────────────────────────────────────────────────────────────

export const pythonFunctionsModule: Module = {
  slug: 'python-functions',
  title: 'Python Functions',
  summary: 'Define your own reusable blocks of code with def and return.',
  lessons: [
    // ── 1. Why Functions? ─────────────────────────────────────────────────────
    {
      slug: 'why-functions',
      title: 'Why Functions?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You have already used functions like `print()`, `input()`, and `int()`. A **function** is a named block of code you can run whenever you need it, just by calling its name.',
        },
        {
          kind: 'paragraph',
          text: 'In this chapter you will write your **own** functions. They help you:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**Reuse** code — write it once, call it as many times as you like',
            '**Organise** a program into clear, named steps',
            'Avoid repeating yourself, which means fewer mistakes',
          ],
        },
        {
          kind: 'note',
          text: 'If you ever find yourself copying and pasting the same few lines, that is a strong hint a function would help.',
        },
      ],
    },

    // ── 2. Defining a Function ────────────────────────────────────────────────
    {
      slug: 'defining-a-function',
      title: 'Defining a Function',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You create a function with the `def` keyword, a name, parentheses `()`, and a colon `:`. The indented lines below make up the function **body**.',
        },
        {
          kind: 'runnable',
          code:
            'def greet():\n' +
            '    print("Hello!")\n' +
            '    print("Welcome to Python.")\n\n' +
            'greet()',
        },
        {
          kind: 'paragraph',
          text: 'Defining `greet` does not run it — the body only runs when you **call** it by writing its name followed by `()`. That last line, `greet()`, is what produces the output.',
        },
        {
          kind: 'note',
          text: 'The header ends with a colon and the body is indented 4 spaces — exactly like `if` statements and loops.',
        },
      ],
    },

    // ── 3. Calling It Again and Again ─────────────────────────────────────────
    {
      slug: 'calling-repeatedly',
      title: 'Calling It Again',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The whole point of a function is reuse. Once defined, you can call it as many times as you want.',
        },
        {
          kind: 'runnable',
          code:
            'def greet():\n' +
            '    print("Hello!")\n\n' +
            'greet()\n' +
            'greet()\n' +
            'greet()',
        },
        {
          kind: 'paragraph',
          text: 'Three calls, three greetings — without repeating the `print` line. Change the function once and every call gets the update.',
        },
      ],
    },

    // ── 4. Parameters and Arguments ───────────────────────────────────────────
    {
      slug: 'parameters-and-arguments',
      title: 'Parameters and Arguments',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Functions become far more useful when you can pass them information. A name inside the parentheses of the definition is a **parameter** — a placeholder for a value.',
        },
        {
          kind: 'runnable',
          code:
            'def greet(name):\n' +
            '    print("Hello,", name)\n\n' +
            'greet("Ada")\n' +
            'greet("Bob")',
        },
        {
          kind: 'paragraph',
          text: 'The value you pass in when calling — `"Ada"` or `"Bob"` — is an **argument**. Inside the function, the parameter `name` holds whatever argument was given, so each call greets a different person.',
        },
      ],
    },

    // ── 5. Multiple Parameters ────────────────────────────────────────────────
    {
      slug: 'multiple-parameters',
      title: 'Multiple Parameters',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A function can take several parameters, separated by commas. The arguments are matched to them in order.',
        },
        {
          kind: 'runnable',
          code:
            'def add(a, b):\n' +
            '    print(a + b)\n\n' +
            'add(3, 4)\n' +
            'add(10, 20)',
        },
        {
          kind: 'paragraph',
          text: 'In `add(3, 4)`, `a` becomes 3 and `b` becomes 4, so it prints `7`. The second call prints `30`. Order matters — the first argument fills the first parameter.',
        },
      ],
    },

    // ── 6. Returning a Value ──────────────────────────────────────────────────
    {
      slug: 'returning-a-value',
      title: 'Returning a Value',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Printing inside a function is fine for messages, but often you want a function to **calculate** something and hand the result back. That is what `return` does.',
        },
        {
          kind: 'runnable',
          code:
            'def add(a, b):\n' +
            '    return a + b\n\n' +
            'result = add(3, 4)\n' +
            'print(result)',
        },
        {
          kind: 'paragraph',
          text: '`return a + b` sends the value `7` back to wherever the function was called. We store it in `result` and then print it. `return` also ends the function immediately.',
        },
      ],
    },

    // ── 7. Using Returned Values ──────────────────────────────────────────────
    {
      slug: 'using-returned-values',
      title: 'Using Returned Values',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A returned value is just a value — you can use it directly in expressions, not only store it in a variable.',
        },
        {
          kind: 'runnable',
          code:
            'def square(n):\n' +
            '    return n * n\n\n' +
            'print(square(5))\n' +
            'print(square(2) + square(3))',
        },
        {
          kind: 'paragraph',
          text: '`square(5)` becomes `25`. In the second line, `square(2)` is `4` and `square(3)` is `9`, so `4 + 9` prints `13`. A function call that returns a value can go anywhere a value can.',
        },
      ],
    },

    // ── 8. return vs print ────────────────────────────────────────────────────
    {
      slug: 'return-vs-print',
      title: 'return vs print',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'This trips up many beginners: `print` and `return` are **not** the same. `print` shows a value on screen; `return` hands a value back so the rest of the program can use it.',
        },
        {
          kind: 'runnable',
          code:
            'def double_print(n):\n' +
            '    print(n * 2)\n\n' +
            'def double_return(n):\n' +
            '    return n * 2\n\n' +
            'double_print(5)         # shows 10, but gives nothing back\n' +
            'x = double_return(5)    # gives 10 back, stored in x\n' +
            'print(x + 1)            # we can keep using it',
        },
        {
          kind: 'paragraph',
          text: 'Both display `10` at first, but only `double_return` produces a value we can keep working with — that is why `print(x + 1)` can show `11`. If a function only prints, you cannot reuse its result.',
        },
        {
          kind: 'note',
          text: 'Rule of thumb: use `return` when the caller needs the value; use `print` only when you just want to display something.',
        },
      ],
    },

    // ── 9. Visualizing a Call ─────────────────────────────────────────────────
    {
      slug: 'visualizing-a-call',
      title: 'Visualizing a Call',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Step through the example and watch the program jump **into** the function when it is called, work out the result, and jump back with the returned value.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize, then step through and watch the call into square() and back.',
          code:
            'def square(n):\n' +
            '    result = n * n\n' +
            '    return result\n\n' +
            'answer = square(4)\n' +
            'print(answer)',
        },
        {
          kind: 'paragraph',
          text: 'When `square(4)` is called, `n` becomes 4, `result` becomes 16, and `return result` sends 16 back into `answer`. Then `print(answer)` shows `16`.',
        },
      ],
    },

    // ── 10. Quiz: Call Output ─────────────────────────────────────────────────
    {
      slug: 'quiz-call-output',
      title: 'What Does It Print?',
      type: 'quiz',
      question:
        'What does this code print?\n\n' +
        '`def greet(name):`\n' +
        '`    print("Hi " + name)`\n' +
        '`greet("Sam")`',
      options: [
        { id: 'a', text: '`Hi name`' },
        { id: 'b', text: '`Hi Sam`' },
        { id: 'c', text: '`greet("Sam")`' },
        { id: 'd', text: 'Nothing' },
      ],
      correctOptionId: 'b',
      explanation: 'The argument `"Sam"` fills the parameter `name`, so `"Hi " + name` becomes `"Hi Sam"`.',
    },

    // ── 11. Quiz: What return Does ────────────────────────────────────────────
    {
      slug: 'quiz-return-meaning',
      title: 'The Job of return',
      type: 'quiz',
      question: 'What does the `return` keyword do?',
      options: [
        { id: 'a', text: 'Prints a value to the screen.' },
        { id: 'b', text: 'Sends a value back to wherever the function was called.' },
        { id: 'c', text: 'Repeats the function from the top.' },
        { id: 'd', text: 'Defines a new function.' },
      ],
      correctOptionId: 'b',
      explanation: '`return` hands a value back to the caller (and ends the function). To *display* a value you use `print` instead.',
    },

    // ── 12. Exercise: Area Function ───────────────────────────────────────────
    {
      slug: 'area-function-exercise',
      title: 'Your Turn: Area Function',
      type: 'exercise',
      problemDescription:
        'Write and use a function.\n\n' +
        '- Define a function `area(width, height)` that **returns** `width * height`.\n' +
        '- Then print the result of `area(4, 5)`.\n\n' +
        'The expected output is `20`.',
      starterCode:
        '# Define area(width, height) that returns width * height\n\n\n' +
        '# Then print area(4, 5)\n',
      expectedOutput: '20',
      validationMode: 'exact',
      solution:
        'def area(width, height):\n' +
        '    return width * height\n\n' +
        'print(area(4, 5))',
    },

    // ── 13. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Python Functions — Complete',
      type: 'recap',
      congratsTitle: 'You can write your own functions!',
      summary:
        'You learned to define functions with `def`, call them, pass information through ' +
        'parameters and arguments, and hand results back with `return` — plus the key ' +
        'difference between `return` and `print`. Next up: where the variables inside a ' +
        'function live — Local Variables.',
      nextModuleTitle: 'Local Variables',
    },
  ],
}
