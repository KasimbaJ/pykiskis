import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 4: Logical Operators — 13 lesson screens.
//
// and / or / not, combining conditions inside if statements, a truth-table
// figure, a note on precedence, a visualize block evaluating a combined
// condition, three quizzes, and an "in range" exercise.
// ─────────────────────────────────────────────────────────────────────────────

export const logicalOperatorsModule: Module = {
  slug: 'logical-operators',
  title: 'Logical Operators',
  summary: 'Combine conditions with and, or, and not.',
  lessons: [
    // ── 1. Combining Conditions ───────────────────────────────────────────────
    {
      slug: 'introduction-to-logical-operators',
      title: 'Combining Conditions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'So far each `if` has tested a single condition. But real decisions often depend on **more than one** thing at once: "if you are over 18 **and** have a ticket…".',
        },
        {
          kind: 'paragraph',
          text: 'Python gives you three **logical operators** to combine or flip booleans:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`and` — True only when **both** sides are True',
            '`or` — True when **at least one** side is True',
            '`not` — **flips** a boolean: True becomes False, False becomes True',
          ],
        },
        {
          kind: 'paragraph',
          text: 'Each one takes booleans (or comparisons that produce booleans) and gives back a single boolean. Let us look at them one at a time.',
        },
      ],
    },

    // ── 2. The and Operator ───────────────────────────────────────────────────
    {
      slug: 'the-and-operator',
      title: 'The and Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `and` operator is `True` only when **both** conditions are `True`. If either side is `False`, the whole result is `False`.',
        },
        {
          kind: 'runnable',
          code:
            'print(True and True)    # True\n' +
            'print(True and False)   # False\n' +
            'print(5 > 3 and 2 > 1)  # True  — both comparisons are True',
        },
        {
          kind: 'paragraph',
          text: 'Think of `and` like a strict checklist: every item must be ticked for the answer to be `True`.',
        },
      ],
    },

    // ── 3. The or Operator ────────────────────────────────────────────────────
    {
      slug: 'the-or-operator',
      title: 'The or Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `or` operator is `True` when **at least one** condition is `True`. It is only `False` when **both** sides are `False`.',
        },
        {
          kind: 'runnable',
          code:
            'print(True or False)    # True\n' +
            'print(False or False)   # False\n' +
            'print(5 > 10 or 2 > 1)  # True  — the second comparison is True',
        },
        {
          kind: 'note',
          text: 'Everyday English sometimes uses "or" to mean "one or the other, but not both". In Python, `or` is `True` even when **both** sides are True.',
        },
      ],
    },

    // ── 4. The not Operator ───────────────────────────────────────────────────
    {
      slug: 'the-not-operator',
      title: 'The not Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `not` operator takes a single boolean and **flips** it. `not True` is `False`, and `not False` is `True`.',
        },
        {
          kind: 'runnable',
          code:
            'print(not True)     # False\n' +
            'print(not False)    # True\n\n' +
            'is_raining = False\n' +
            'print(not is_raining)  # True — it is NOT raining',
        },
        {
          kind: 'paragraph',
          text: '`not` is handy for asking the opposite question — for example, "is the user **not** logged in?".',
        },
      ],
    },

    // ── 5. Combining Conditions in an if ──────────────────────────────────────
    {
      slug: 'combining-in-an-if',
      title: 'Using Them in an if',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Logical operators are most useful inside an `if` condition, where they let one decision depend on several facts.',
        },
        {
          kind: 'runnable',
          code:
            'age = 20\n' +
            'has_id = True\n\n' +
            'if age >= 18 and has_id:\n' +
            '    print("Entry allowed")\n' +
            'else:\n' +
            '    print("Entry denied")',
        },
        {
          kind: 'paragraph',
          text: 'Both parts are `True` (`age >= 18` and `has_id`), so the `and` is `True` and the program prints `Entry allowed`. If either were `False`, it would print `Entry denied`.',
        },
      ],
    },

    // ── 6. Truth Tables ───────────────────────────────────────────────────────
    {
      slug: 'truth-tables',
      title: 'Truth Tables',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A **truth table** lists every combination of inputs and the result. Here are `and` and `or` side by side:',
        },
        {
          kind: 'figure',
          code:
            'A      B      A and B   A or B\n' +
            '=====  =====  ========  ======\n' +
            'True   True   True      True\n' +
            'True   False  False     True\n' +
            'False  True   False     True\n' +
            'False  False  False     False',
          output: '',
          caption: '`and` is True only on the top row; `or` is False only on the bottom row.',
        },
        {
          kind: 'paragraph',
          text: 'And `not` simply flips its single input: `not True` is `False`, `not False` is `True`.',
        },
      ],
    },

    // ── 7. Order of Evaluation ────────────────────────────────────────────────
    {
      slug: 'order-of-evaluation',
      title: 'Order of Evaluation',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'When a condition mixes comparisons and logical operators, Python evaluates the **comparisons first**, then applies the logical operator to the resulting booleans.',
        },
        {
          kind: 'runnable',
          code:
            'age = 16\n\n' +
            '# age >= 13 and age <= 19 are checked first, then combined with and\n' +
            'print(age >= 13 and age <= 19)  # True — 16 is a teenager',
        },
        {
          kind: 'note',
          text: 'If a combined condition ever gets confusing, add **parentheses** to make the grouping clear and explicit, e.g. `(age >= 13) and (age <= 19)`. It never hurts readability.',
        },
      ],
    },

    // ── 8. Visualizing a Combined Condition ───────────────────────────────────
    {
      slug: 'visualizing-a-combined-condition',
      title: 'Visualizing and',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Step through the example and watch how each comparison is worked out before `and` combines them into the final boolean stored in `result`.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize, then step through and watch result get its value.',
          code:
            'a = 5\n' +
            'b = 12\n' +
            'result = a > 0 and b < 10\n' +
            'print(result)',
        },
        {
          kind: 'paragraph',
          text: 'Here `a > 0` is `True`, but `b < 10` is `False` (12 is not less than 10). `True and False` is `False`, so `result` is `False` and the program prints `False`.',
        },
      ],
    },

    // ── 9. Quiz: and ──────────────────────────────────────────────────────────
    {
      slug: 'quiz-and-output',
      title: 'Evaluating and',
      type: 'quiz',
      question: 'What is the output of this code?\n\n`print(True and False)`',
      options: [
        { id: 'a', text: '`True`' },
        { id: 'b', text: '`False`' },
        { id: 'c', text: '`None`' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'b',
      explanation: '`and` is `True` only when **both** sides are True. Since one side is `False`, the result is `False`.',
    },

    // ── 10. Quiz: or ──────────────────────────────────────────────────────────
    {
      slug: 'quiz-or-output',
      title: 'Evaluating or',
      type: 'quiz',
      question: 'What is the output of this code?\n\n`print(5 > 2 or 1 > 9)`',
      options: [
        { id: 'a', text: '`True`' },
        { id: 'b', text: '`False`' },
        { id: 'c', text: 'An error' },
        { id: 'd', text: '`5`' },
      ],
      correctOptionId: 'a',
      explanation: '`5 > 2` is `True`. `or` is `True` when at least one side is True, so the result is `True` even though `1 > 9` is False.',
    },

    // ── 11. Quiz: Which Operator? ─────────────────────────────────────────────
    {
      slug: 'quiz-which-operator',
      title: 'Choosing the Operator',
      type: 'quiz',
      question: 'Which operator returns `True` only when **both** conditions are `True`?',
      options: [
        { id: 'a', text: '`or`' },
        { id: 'b', text: '`not`' },
        { id: 'c', text: '`and`' },
        { id: 'd', text: '`==`' },
      ],
      correctOptionId: 'c',
      explanation: '`and` requires both sides to be True. `or` needs only one; `not` flips a single value; `==` checks equality.',
    },

    // ── 12. Exercise: In Range ────────────────────────────────────────────────
    {
      slug: 'in-range-exercise',
      title: 'In Range',
      type: 'exercise',
      problemDescription:
        'Check whether a number falls within a range.\n\n' +
        '- A variable `n` is already created.\n' +
        '- Print `In range` if `n` is between 1 and 10 **inclusive** (1 and 10 both count).\n' +
        '- Otherwise print `Out of range`.\n\n' +
        'Combine two comparisons with `and`.',
      starterCode:
        'n = 7\n\n' +
        '# Print "In range" if n is between 1 and 10 inclusive, otherwise "Out of range"\n' +
        'if ___:\n' +
        '    print("In range")\n' +
        'else:\n' +
        '    print("Out of range")\n',
      expectedOutput: 'In range',
      validationMode: 'exact',
      solution:
        'n = 7\n' +
        'if n >= 1 and n <= 10:\n' +
        '    print("In range")\n' +
        'else:\n' +
        '    print("Out of range")',
    },

    // ── 13. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Logical Operators — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Logical Operators!',
      summary:
        'You can now combine conditions: `and` needs both sides True, `or` needs at least ' +
        'one, and `not` flips a boolean. You also saw how comparisons are evaluated before ' +
        'logical operators, and how parentheses keep complex conditions clear. ' +
        'Next up: the **While Loop** — repeating code while a condition stays True.',
      nextModuleTitle: 'While Loop',
    },
  ],
}
