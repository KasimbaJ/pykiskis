import type { Module } from '../../../types/basics'

export const pythonBooleansModule: Module = {
  slug: 'python-booleans',
  title: 'Python Booleans',
  summary: 'Learn about True and False, comparisons, and truthiness.',
  lessons: [
    // ── 1. Introduction ──────────────────────────────────────────────────────
    {
      slug: 'booleans-introduction',
      title: 'Python Booleans',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'So far you have worked with numbers and strings. Python has a third core type: the **boolean**.',
        },
        {
          kind: 'paragraph',
          text: 'A **boolean** can only ever be one of two values:',
        },
        {
          kind: 'list',
          ordered: false,
          items: ['`True`', '`False`'],
        },
        {
          kind: 'paragraph',
          text: "Booleans are the result of asking Python a yes/no question — like \"is 5 greater than 3?\" or \"are these two values equal?\" You use them every time you want your program to make a decision.",
        },
        {
          kind: 'paragraph',
          text: 'In this module you will learn to:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Use `True` and `False` as values',
            'Compare numbers and strings with comparison operators',
            'Understand which values Python treats as truthy or falsy',
          ],
        },
      ],
    },

    // ── 2. Booleans as Values ────────────────────────────────────────────────
    {
      slug: 'booleans-as-values',
      title: 'Booleans as Values',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In Python, `True` and `False` are written with a **capital first letter**. They are the only two boolean values.',
        },
        {
          kind: 'runnable',
          code: 'print(True)\nprint(False)',
        },
        {
          kind: 'paragraph',
          text: 'You can store a boolean in a variable, just like a number or a string.',
        },
        {
          kind: 'runnable',
          code: 'is_raining = True\nprint(is_raining)',
        },
        {
          kind: 'note',
          text: '**Watch out:** `true` and `false` (all lowercase) are NOT valid in Python. Always capitalise — `True` and `False`.',
        },
      ],
    },

    // ── 3. Comparison Operators ──────────────────────────────────────────────
    {
      slug: 'comparison-operators',
      title: 'Comparison Operators',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Python has six **comparison operators**. Each one compares two values and produces a boolean result.',
        },
        {
          kind: 'figure',
          code:
            'print(5 == 5)   # equal to\n' +
            'print(5 != 5)   # not equal to\n' +
            'print(5 > 3)    # greater than\n' +
            'print(5 < 3)    # less than\n' +
            'print(5 >= 5)   # greater than or equal to\n' +
            'print(5 <= 3)   # less than or equal to',
          output: 'True\nFalse\nTrue\nFalse\nTrue\nFalse',
          caption: 'All six comparison operators — each returns True or False',
        },
        {
          kind: 'paragraph',
          text: 'Every comparison expression evaluates to either `True` or `False`.',
        },
        {
          kind: 'note',
          text: '**`==` vs `=`:** Use `==` to **compare** two values. Use `=` to **assign** a value to a variable. Mixing them up is one of the most common beginner mistakes.',
        },
      ],
    },

    // ── 4. Comparisons in Action ─────────────────────────────────────────────
    {
      slug: 'comparisons-in-action',
      title: 'Comparisons in Action',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: "Let's try comparisons in a runnable example. Feel free to change the values of `x` and `y` to see how the results change.",
        },
        {
          kind: 'runnable',
          code:
            'x = 10\n' +
            'y = 3\n\n' +
            'print(x > y)    # Is x greater than y?\n' +
            'print(x == y)   # Are they equal?\n' +
            'print(x != y)   # Are they not equal?',
        },
        {
          kind: 'paragraph',
          text: 'You can also compare strings. Two strings are equal only when they contain exactly the same characters.',
        },
        {
          kind: 'runnable',
          code:
            'print("apple" == "apple")   # True\n' +
            'print("apple" == "banana")  # False\n' +
            'print("apple" != "banana")  # True',
        },
      ],
    },

    // ── 5. Visualizing a Comparison ──────────────────────────────────────────
    {
      slug: 'visualizing-a-comparison',
      title: 'Visualizing a Comparison',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Step through the program below to see exactly how a comparison produces a boolean value that gets stored in a variable.',
        },
        {
          kind: 'visualize',
          caption: 'Watch `result` get assigned the boolean produced by `a > b`.',
          code:
            'a = 10\n' +
            'b = 5\n' +
            'result = a > b\n' +
            'print(result)',
        },
        {
          kind: 'paragraph',
          text: 'After the line `result = a > b`, the variable `result` holds `True`. Printing it outputs `True`.',
        },
      ],
    },

    // ── 6. Quiz: predict comparison output ──────────────────────────────────
    {
      slug: 'quiz-predict-comparison',
      title: 'Predict the Output',
      type: 'quiz',
      question:
        "What is the output of the following code?\n\n`x = 8`\n`y = 8`\n\n`print(x == y)`\n`print(x > y)`",
      options: [
        { id: 'a', text: '`True`\n`True`' },
        { id: 'b', text: '`True`\n`False`' },
        { id: 'c', text: '`False`\n`True`' },
        { id: 'd', text: '`False`\n`False`' },
      ],
      correctOptionId: 'b',
      explanation:
        '`x == y` is `True` because both variables hold `8`. `x > y` is `False` because `8` is not **strictly** greater than `8`.',
    },

    // ── 7. Quiz: == vs = ─────────────────────────────────────────────────────
    {
      slug: 'quiz-equals-vs-assignment',
      title: '== vs =',
      type: 'quiz',
      question: 'Which line **compares** two values in Python?',
      options: [
        { id: 'a', text: '`x = 5`' },
        { id: 'b', text: '`x == 5`' },
        { id: 'c', text: '`x := 5`' },
        { id: 'd', text: '`x => 5`' },
      ],
      correctOptionId: 'b',
      explanation:
        '`x == 5` is a comparison — it returns `True` or `False`. `x = 5` is an assignment — it stores `5` in the variable `x`.',
    },

    // ── 8. Truthiness ────────────────────────────────────────────────────────
    {
      slug: 'truthiness',
      title: 'Truthiness',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Every Python value is either **truthy** or **falsy**. You can check a value\'s boolean equivalent with the built-in `bool()` function.',
        },
        {
          kind: 'paragraph',
          text: 'The following values are **falsy** — they behave like `False`:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`0` — the integer zero',
            '`""` — the empty string',
            '`None` — Python\'s "nothing" value',
          ],
        },
        {
          kind: 'paragraph',
          text: 'Everything else is **truthy** — it behaves like `True`:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Any non-zero number: `1`, `-5`, `3.14`',
            'Any non-empty string: `"hello"`, `"0"`',
          ],
        },
        {
          kind: 'runnable',
          code:
            'print(bool(0))      # False\n' +
            'print(bool(""))     # False\n' +
            'print(bool(1))      # True\n' +
            'print(bool("hi"))   # True',
        },
        {
          kind: 'note',
          text: 'You will use truthiness most when writing `if` statements — coming up in the next module!',
        },
      ],
    },

    // ── 9. Quiz: bool() ──────────────────────────────────────────────────────
    {
      slug: 'quiz-bool-function',
      title: 'The bool() Function',
      type: 'quiz',
      question: "What does `print(bool(0))` output?",
      options: [
        { id: 'a', text: '`True`' },
        { id: 'b', text: '`False`' },
        { id: 'c', text: '`0`' },
        { id: 'd', text: '`None`' },
      ],
      correctOptionId: 'b',
      explanation: '`0` is falsy in Python, so `bool(0)` returns `False`.',
    },

    // ── 10. Exercise: compare two numbers ────────────────────────────────────
    {
      slug: 'exercise-compare-numbers',
      title: 'Compare Numbers',
      type: 'exercise',
      problemDescription:
        'Write a program to compare two numbers.\n\n' +
        '- Create a variable named `a` and assign **15** to it.\n' +
        '- Create a variable named `b` and assign **10** to it.\n' +
        '- Print whether `a` is greater than `b`.',
      starterCode:
        '# Replace ___ with your code\n\n' +
        '# Create variable a\n' +
        'a = ___\n\n' +
        '# Create variable b\n' +
        'b = ___\n\n' +
        '# Print whether a is greater than b\n' +
        'print(___)\n',
      expectedOutput: 'True',
      validationMode: 'exact',
      solution: 'a = 15\nb = 10\nprint(a > b)',
    },

    // ── 11. Recap ────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Python Booleans — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Python Booleans!',
      summary:
        'You now know that booleans are `True` or `False`, ' +
        'how comparison operators produce boolean results, ' +
        'and how Python decides if any value is truthy or falsy. ' +
        'Next up: **If/Else Statements** — using booleans to control which code runs.',
      nextModuleTitle: 'If/Else Statements',
    },
  ],
}
