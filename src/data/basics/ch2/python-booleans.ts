import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 1: Python Booleans — 11 lesson screens.
//
// Introduces True/False, the bool type, all six comparison operators, and
// truthiness via bool().  Includes a visualize block stepping through a
// comparison assignment.
// ─────────────────────────────────────────────────────────────────────────────

export const pythonBooleansModule: Module = {
  slug: 'python-booleans',
  title: 'Python Booleans',
  summary: 'Learn about True/False values and comparison operators.',
  lessons: [
    // ── 1. Introduction to Booleans ──────────────────────────────────────────
    {
      slug: 'introduction-to-booleans',
      title: 'Introduction to Booleans',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In the previous chapter you worked with numbers and strings. In this chapter you will learn how to make your programs make decisions — and that starts with a new type of data.',
        },
        {
          kind: 'paragraph',
          text: 'A **Boolean** is a value that is either `True` or `False`. It answers a yes/no question: "Is the temperature above 30°C?" — yes (`True`) or no (`False`).',
        },
        {
          kind: 'paragraph',
          text: 'In Python, the boolean type is called `bool`, and it has exactly two possible values:',
        },
        {
          kind: 'list',
          ordered: false,
          items: ['`True`', '`False`'],
        },
        {
          kind: 'note',
          text: '**Important:** `True` and `False` must be capitalised exactly as shown. `true` and `false` (lowercase) are NOT valid in Python and will cause an error.',
        },
        {
          kind: 'paragraph',
          text: "In this lesson you'll learn to:",
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Create boolean variables',
            'Use comparison operators to produce booleans',
            'Understand truthiness — how Python treats other values as True or False',
          ],
        },
      ],
    },

    // ── 2. True and False as Values ──────────────────────────────────────────
    {
      slug: 'true-and-false-as-values',
      title: 'True and False',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You can store `True` or `False` in a variable, just like a number or a string.',
        },
        {
          kind: 'runnable',
          code:
            'is_sunny = True\n' +
            'has_clouds = False\n\n' +
            'print(is_sunny)        # True\n' +
            'print(has_clouds)      # False\n' +
            'print(type(is_sunny))  # <class \'bool\'>',
        },
        {
          kind: 'paragraph',
          text: "Here's what each line does:",
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`is_sunny = True` — creates a variable and stores the boolean `True`.',
            '`has_clouds = False` — stores the boolean `False`.',
            '`type(is_sunny)` — shows the data type. Booleans belong to the `bool` type.',
          ],
        },
        {
          kind: 'note',
          text: '**Remember:** Write `True` and `False` with a capital first letter. `true` and `false` are not Python keywords.',
        },
      ],
    },

    // ── 3. Comparison Operators ───────────────────────────────────────────────
    {
      slug: 'comparison-operators',
      title: 'Comparison Operators',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The most common way to produce a boolean is by **comparing** two values. Python uses six comparison operators:',
        },
        {
          kind: 'figure',
          code:
            'Operator  Meaning                  Example     Result\n' +
            '========  =======================  ==========  ======\n' +
            '==        Equal to                 5 == 5      True\n' +
            '!=        Not equal to             5 != 3      True\n' +
            '>         Greater than             5 > 3       True\n' +
            '<         Less than                3 < 5       True\n' +
            '>=        Greater than or equal    5 >= 5      True\n' +
            '<=        Less than or equal       3 <= 5      True',
          output: '',
          caption: 'The six comparison operators — each returns True or False.',
        },
        {
          kind: 'paragraph',
          text: 'Every comparison produces a boolean result. Try the examples below:',
        },
        {
          kind: 'runnable',
          code:
            'a = 10\n' +
            'b = 3\n\n' +
            'print(a > b)   # True  — 10 is greater than 3\n' +
            'print(a < b)   # False — 10 is not less than 3\n' +
            'print(a >= 10) # True  — 10 is equal to 10',
        },
      ],
    },

    // ── 4. The Equality Operator ──────────────────────────────────────────────
    {
      slug: 'equality-operator',
      title: 'The Equality Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: "The `==` operator checks whether two values are **equal**. It looks like two equals signs side by side. Here's an example:",
        },
        {
          kind: 'runnable',
          code:
            'score = 85\n\n' +
            'print(score == 100)  # False — 85 is not equal to 100\n' +
            'print(score == 85)   # True  — 85 equals 85\n' +
            'print(score != 100)  # True  — 85 is not equal to 100',
        },
        {
          kind: 'note',
          text: '**Common mistake:** Do not confuse `==` (comparison) with `=` (assignment). Writing `score = 100` stores 100 in `score`. Writing `score == 100` asks "is score equal to 100?" and gives back `True` or `False`.',
        },
        {
          kind: 'paragraph',
          text: 'You can also compare strings:',
        },
        {
          kind: 'runnable',
          code:
            'name = "Alice"\n\n' +
            'print(name == "Alice")  # True\n' +
            'print(name == "alice")  # False — Python is case-sensitive',
        },
      ],
    },

    // ── 5. Truthiness ─────────────────────────────────────────────────────────
    {
      slug: 'truthiness',
      title: 'Truthiness',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Every Python value has a boolean interpretation — it is either **truthy** or **falsy**. You can check this using the `bool()` function.',
        },
        {
          kind: 'runnable',
          code:
            '# Falsy values — treated as False\n' +
            'print(bool(0))    # False\n' +
            'print(bool(""))   # False\n\n' +
            '# Truthy values — treated as True\n' +
            'print(bool(1))    # True\n' +
            'print(bool(-5))   # True\n' +
            'print(bool("hi")) # True',
        },
        {
          kind: 'paragraph',
          text: 'The main **falsy** values to remember:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`0` — the integer zero',
            '`0.0` — the float zero',
            '`""` — the empty string',
            '`False` — the boolean itself',
          ],
        },
        {
          kind: 'paragraph',
          text: 'Everything else is **truthy**: non-zero numbers, non-empty strings, and `True`.',
        },
        {
          kind: 'note',
          text: "You won't need `bool()` very often in your own code. Python uses truthiness automatically inside `if` conditions — which you'll see in the very next lesson.",
        },
      ],
    },

    // ── 6. Visualizing a Comparison ───────────────────────────────────────────
    {
      slug: 'visualizing-a-comparison',
      title: 'Visualizing a Comparison',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Step through the example below and watch how `result` gets the value `True` when the comparison on the right-hand side is evaluated.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize, then step through one line at a time.',
          code:
            'a = 7\n' +
            'b = 3\n' +
            'result = a > b\n' +
            'print(result)',
        },
        {
          kind: 'paragraph',
          text: 'After stepping through: `a` is `7`, `b` is `3`. The expression `a > b` evaluates to `True` (because 7 is greater than 3), and that boolean is stored in `result`. Then `print(result)` shows `True`.',
        },
      ],
    },

    // ── 7. Quiz: What is the output? ──────────────────────────────────────────
    {
      slug: 'quiz-comparison-output',
      title: 'Comparison Output',
      type: 'quiz',
      question: "What is the output of the following code?\n\n`print(10 >= 10)`",
      options: [
        { id: 'a', text: '`True`' },
        { id: 'b', text: '`False`' },
        { id: 'c', text: '`10`' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'a',
      explanation:
        'The `>=` operator returns `True` when the left value is greater than **or equal to** the right value. Since `10 == 10`, the result is `True`.',
    },

    // ── 8. Quiz: Capitalisation ───────────────────────────────────────────────
    {
      slug: 'quiz-capitalisation',
      title: 'True or true?',
      type: 'quiz',
      question: "Which of the following is the correct boolean value in Python?",
      options: [
        { id: 'a', text: '`true`' },
        { id: 'b', text: '`True`' },
        { id: 'c', text: '`TRUE`' },
        { id: 'd', text: '`"True"`' },
      ],
      correctOptionId: 'b',
      explanation:
        "`True` (capital T, lowercase rue) is the correct Python boolean. `true` and `TRUE` are not keywords and cause a `NameError`. `\"True\"` is a string, not a boolean.",
    },

    // ── 9. Quiz: == vs = ──────────────────────────────────────────────────────
    {
      slug: 'quiz-equality-vs-assignment',
      title: 'Equality vs Assignment',
      type: 'quiz',
      question:
        "What is the output of this code?\n\n`x = 5`\n`print(x == 5)`",
      options: [
        { id: 'a', text: '`5`' },
        { id: 'b', text: '`True`' },
        { id: 'c', text: '`False`' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'b',
      explanation:
        "`x = 5` assigns the value `5` to `x`. Then `x == 5` is a comparison that asks \"is x equal to 5?\" — the answer is `True`.",
    },

    // ── 10. Exercise: Compare Two Numbers ────────────────────────────────────
    {
      slug: 'compare-two-numbers-exercise',
      title: 'Compare Two Numbers',
      type: 'exercise',
      problemDescription:
        'Write a program that compares two numbers.\n\n' +
        '- Two variables `a` and `b` are already created.\n' +
        '- Print the result of `a > b`.',
      starterCode:
        'a = 15\n' +
        'b = 9\n\n' +
        '# Print whether a is greater than b\n' +
        'print(___)\n',
      expectedOutput: 'True',
      validationMode: 'exact',
      solution: 'a = 15\nb = 9\nprint(a > b)',
    },

    // ── Exercise: Is the Number Even? ─────────────────────────────────────────
    {
      slug: 'is-number-even-exercise',
      title: 'Is the Number Even?',
      type: 'exercise',
      problemDescription:
        'A whole number is **even** when dividing it by 2 leaves no remainder.\n\n' +
        '- An integer is already read into `number`.\n' +
        '- Print `True` if the number is even and `False` if it is odd.\n\n' +
        'The remainder operator `%` gives the leftover after division, so ' +
        '`number % 2 == 0` is `True` for even numbers.',
      remember: [
        '`%` is the remainder (modulo) operator.',
        'A comparison like `number % 2 == 0` produces a boolean.',
      ],
      starterCode:
        'number = int(input("Enter a number: "))\n\n' +
        '# Print True if number is even, False if odd\n' +
        'print(___)\n',
      expectedOutput: 'True',
      validationMode: 'exact',
      solution:
        'number = int(input("Enter a number: "))\nprint(number % 2 == 0)',
      inputValues: ['16'],
    },

    // ── Exercise: Compare Two Strings ─────────────────────────────────────────
    {
      slug: 'compare-two-strings-exercise',
      title: 'Compare Two Strings',
      type: 'exercise',
      problemDescription:
        'Strings can be compared with `==`, and the comparison is **case-sensitive** — ' +
        '`"Sun"` and `"sun"` are not equal.\n\n' +
        '- Two strings are read into `var1` and `var2`.\n' +
        '- Print whether they are equal (`True` or `False`).',
      remember: [
        'String comparison is case-sensitive.',
        '`==` returns a boolean, not the string itself.',
      ],
      starterCode:
        'var1 = input("First string: ")\n' +
        'var2 = input("Second string: ")\n\n' +
        '# Print whether the two strings are equal\n' +
        'print(___)\n',
      expectedOutput: 'False',
      validationMode: 'exact',
      solution:
        'var1 = input("First string: ")\n' +
        'var2 = input("Second string: ")\n' +
        'print(var1 == var2)',
      inputValues: ['Programiz', 'programiz'],
    },

    // ── Quiz: Even Check Output ───────────────────────────────────────────────
    {
      slug: 'quiz-even-remainder',
      title: 'Even Check Output',
      type: 'quiz',
      question: 'What is the output of the following code?\n\n`print(8 % 2 == 0)`',
      options: [
        { id: 'a', text: '`True`' },
        { id: 'b', text: '`False`' },
        { id: 'c', text: '`0`' },
        { id: 'd', text: '`2`' },
      ],
      correctOptionId: 'a',
      explanation:
        '`8 % 2` is `0` because 8 divides evenly by 2, and `0 == 0` is `True`. This `% 2 == 0` pattern is the standard way to test whether a number is even.',
    },

    // ── 11. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Python Booleans — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Python Booleans!',
      summary:
        'You now know the two boolean values (`True` and `False`), how comparison operators ' +
        'produce booleans, the difference between `==` and `=`, and how Python evaluates ' +
        'truthiness with `bool()`. Next up: **If/Else Statements** — where booleans do real work.',
      nextModuleTitle: 'If/Else Statement',
    },
  ],
}
