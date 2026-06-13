import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 6 · Module 3: Miscellaneous — 12 lesson screens.
//
// Four small but important concepts (from the reference outline): assignment
// operators (+= -= *= /=), the None value, truthy/falsy, and the pass statement.
// All deterministic.
// ─────────────────────────────────────────────────────────────────────────────

export const miscellaneousModule: Module = {
  slug: 'miscellaneous',
  title: 'Miscellaneous',
  summary: 'Four handy concepts: assignment operators, None, truthiness, and pass.',
  lessons: [
    // ── 1. Four Small Concepts ────────────────────────────────────────────────
    {
      slug: 'four-small-concepts',
      title: 'Four Small Concepts',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Before the final project, here are four small but useful concepts that round out the basics:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**Assignment operators** — shortcuts like `+=`',
            '**None** — a special "nothing here" value',
            '**Truthy and Falsy** — how any value behaves in a condition',
            'The **pass** statement — a do-nothing placeholder',
          ],
        },
        {
          kind: 'paragraph',
          text: "Let's start with assignment operators.",
        },
      ],
    },

    // ── 2. Assignment Operators ───────────────────────────────────────────────
    {
      slug: 'assignment-operators',
      title: 'Assignment Operators',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You often want to update a variable based on its current value, like adding to a total. `+=` is a shortcut: `x += 5` means exactly `x = x + 5`.',
        },
        {
          kind: 'runnable',
          code:
            'x = 10\n\n' +
            'x += 5     # same as x = x + 5\n' +
            'print(x)\n\n' +
            'x -= 3     # same as x = x - 3\n' +
            'print(x)',
        },
        {
          kind: 'paragraph',
          text: '`x` starts at 10, becomes 15 after `+= 5`, then 12 after `-= 3`. These shortcuts are tidy and very common, especially with accumulators.',
        },
      ],
    },

    // ── 3. More Assignment Operators ──────────────────────────────────────────
    {
      slug: 'more-assignment-operators',
      title: 'More Assignment Operators',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'There is one for each arithmetic operator: `*=`, `/=`, and more, all following the same pattern.',
        },
        {
          kind: 'runnable',
          code:
            'score = 4\n\n' +
            'score *= 3     # same as score = score * 3\n' +
            'print(score)\n\n' +
            'score /= 2     # same as score = score / 2\n' +
            'print(score)',
        },
        {
          kind: 'paragraph',
          text: '`score` becomes 12 after `*= 3`, then `6.0` after `/= 2`. Remember `/` always gives a float, so `/=` does too.',
        },
      ],
    },

    // ── 4. The None Value ─────────────────────────────────────────────────────
    {
      slug: 'the-none-value',
      title: 'The None Value',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`None` is a special value that means "nothing" or "no value yet". It is not `0`, and not an empty string — it is its own thing, used when there is genuinely no value to give.',
        },
        {
          kind: 'runnable',
          code:
            'result = None\n' +
            'print(result)',
        },
        {
          kind: 'paragraph',
          text: 'This prints `None`. You might start a variable at `None` to show it has not been given a real value yet.',
        },
      ],
    },

    // ── 5. Functions Return None ──────────────────────────────────────────────
    {
      slug: 'functions-return-none',
      title: 'Functions Return None',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Here is where `None` shows up most: a function with **no `return`** automatically gives back `None`.',
        },
        {
          kind: 'runnable',
          code:
            'def greet():\n' +
            '    print("Hi")\n\n' +
            'x = greet()\n' +
            'print(x)',
        },
        {
          kind: 'paragraph',
          text: 'Calling `greet()` prints `Hi`, but it has no `return`, so `x` is `None` — which is why the second print shows `None`. This is a classic clue that you meant to `return` a value but only printed it.',
        },
      ],
    },

    // ── 6. Truthy and Falsy ───────────────────────────────────────────────────
    {
      slug: 'truthy-and-falsy',
      title: 'Truthy and Falsy',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Back in Chapter 2 you met truthiness. Every value counts as either **truthy** (acts like True) or **falsy** (acts like False). `bool()` reveals which.',
        },
        {
          kind: 'runnable',
          code:
            'print(bool(0))\n' +
            'print(bool(5))\n' +
            'print(bool(""))\n' +
            'print(bool("hello"))',
        },
        {
          kind: 'paragraph',
          text: 'So `0` and `""` are falsy (False), while `5` and `"hello"` are truthy (True). The main falsy values are `0`, `0.0`, `""`, empty collections, `None`, and `False` itself.',
        },
      ],
    },

    // ── 7. Truthiness in Conditions ───────────────────────────────────────────
    {
      slug: 'truthiness-in-conditions',
      title: 'Truthiness in Conditions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'This matters because you can put a value straight into an `if`, without comparing it to anything. An empty string is falsy, so it takes the `else` branch.',
        },
        {
          kind: 'runnable',
          code:
            'name = ""\n\n' +
            'if name:\n' +
            '    print("Got a name")\n' +
            'else:\n' +
            '    print("Name is empty")',
        },
        {
          kind: 'paragraph',
          text: 'Because `name` is an empty string (falsy), this prints `Name is empty`. Writing `if name:` is a neat way to ask "is there actually something here?".',
        },
      ],
    },

    // ── 8. The pass Statement ─────────────────────────────────────────────────
    {
      slug: 'the-pass-statement',
      title: 'The pass Statement',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Python does not allow an empty body — an `if`, loop, or function must contain at least one line. When you want a body that does **nothing** (perhaps a placeholder for later), use `pass`.',
        },
        {
          kind: 'runnable',
          code:
            'def todo():\n' +
            '    pass     # I will write this later\n\n' +
            'todo()\n' +
            'print("No error — pass does nothing.")',
        },
        {
          kind: 'paragraph',
          text: '`pass` is a placeholder that satisfies Python\'s need for a body while doing absolutely nothing. It is handy while sketching out the shape of a program before filling in the details.',
        },
      ],
    },

    // ── 9. Quiz: += ───────────────────────────────────────────────────────────
    {
      slug: 'quiz-plus-equals',
      title: 'Updating a Variable',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`x = 5`\n' +
        '`x += 10`\n' +
        '`print(x)`',
      options: [
        { id: 'a', text: '`5`' },
        { id: 'b', text: '`10`' },
        { id: 'c', text: '`15`' },
        { id: 'd', text: '`510`' },
      ],
      correctOptionId: 'c',
      explanation: '`x += 10` means `x = x + 10`, so `x` becomes `5 + 10 = 15`.',
    },

    // ── 10. Quiz: None ────────────────────────────────────────────────────────
    {
      slug: 'quiz-none',
      title: 'No Return',
      type: 'quiz',
      question: 'What does a function with no `return` statement give back?',
      options: [
        { id: 'a', text: '`0`' },
        { id: 'b', text: 'An empty string' },
        { id: 'c', text: '`None`' },
        { id: 'd', text: 'It raises an error' },
      ],
      correctOptionId: 'c',
      explanation: 'A function without a `return` automatically returns `None`.',
    },

    // ── 11. Exercise: Build a Total ───────────────────────────────────────────
    {
      slug: 'build-a-total-exercise',
      title: 'Your Turn: Use +=',
      type: 'exercise',
      problemDescription:
        'Use an assignment operator.\n\n' +
        '- A variable `total = 100` is already created.\n' +
        '- Use `+=` to add `50` to it.\n' +
        '- Print `total`.\n\n' +
        'The expected output is `150`.',
      starterCode:
        'total = 100\n\n' +
        '# Use += to add 50, then print total\n',
      expectedOutput: '150',
      validationMode: 'exact',
      solution:
        'total = 100\n' +
        'total += 50\n' +
        'print(total)',
    },

    // ── 12. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Miscellaneous — Complete',
      type: 'recap',
      congratsTitle: 'Loose ends tied up!',
      summary:
        'You learned the assignment-operator shortcuts (`+=`, `-=`, `*=`, `/=`), the `None` ' +
        '"no value" (which functions return when they have no `return`), truthy vs falsy values ' +
        'and how they behave in an `if`, and the `pass` placeholder. Next is a short Progress ' +
        'Test, then your final project.',
      nextModuleTitle: 'Progress Test',
    },
  ],
}
