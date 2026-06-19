import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 2: If/Else Statement — 13 lesson screens.
//
// Builds on booleans: if / if-else / if-elif-else, the colon and 4-space
// indentation, comparisons inside conditions, simple nesting, and a visualize
// block stepping through branch selection.  Two exercises (even/odd, classify
// a number) and three quizzes.
// ─────────────────────────────────────────────────────────────────────────────

export const ifElseStatementModule: Module = {
  slug: 'if-else-statement',
  title: 'If/Else Statement',
  summary: 'Make decisions in code with if, elif, and else.',
  lessons: [
    // ── 1. Making Decisions ───────────────────────────────────────────────────
    {
      slug: 'introduction-to-if-statements',
      title: 'Making Decisions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In the last module you learned that a comparison produces a boolean — `True` or `False`. Now you will use those booleans to make your program **choose** what to do.',
        },
        {
          kind: 'paragraph',
          text: 'An **if statement** runs a block of code only when a condition is `True`. If the condition is `False`, that block is skipped.',
        },
        {
          kind: 'paragraph',
          text: 'Think of everyday decisions: "**If** it is raining, take an umbrella." The action (take an umbrella) only happens when the condition (it is raining) is true.',
        },
        {
          kind: 'paragraph',
          text: 'In this module you will learn to:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Run code conditionally with `if`',
            'Provide a fallback with `else`',
            'Choose between many options with `elif`',
            'Nest decisions inside one another',
          ],
        },
      ],
    },

    // ── 2. The if Statement ───────────────────────────────────────────────────
    {
      slug: 'the-if-statement',
      title: 'The if Statement',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'An `if` statement has two parts: a **header line** ending in a colon `:`, and an **indented body** that runs when the condition is `True`.',
        },
        {
          kind: 'figure',
          code:
            'if  condition :      <-- header: the keyword if, a condition, then a colon\n' +
            '    do_something()   <-- body: indented 4 spaces, runs only when True',
          output: '',
          caption: 'The anatomy of an if statement: a colon ends the header, the body is indented.',
        },
        {
          kind: 'runnable',
          code:
            'age = 20\n\n' +
            'if age >= 18:\n' +
            '    print("You are an adult")\n\n' +
            'print("Done")',
        },
        {
          kind: 'paragraph',
          text: 'Because `age >= 18` is `True`, the indented line runs. The last line `print("Done")` is **not** indented, so it always runs — it is outside the `if`.',
        },
        {
          kind: 'note',
          text: '**Two rules to remember:** (1) the header line must end with a colon `:`. (2) the body must be **indented** — Python uses 4 spaces. Forgetting either one causes an error.',
        },
      ],
    },

    // ── 3. The else Clause ────────────────────────────────────────────────────
    {
      slug: 'if-else',
      title: 'The else Clause',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Often you want to do one thing when the condition is `True` and **something else** when it is `False`. Add an `else` clause for the fallback.',
        },
        {
          kind: 'runnable',
          code:
            'temperature = 15\n\n' +
            'if temperature > 25:\n' +
            '    print("It is warm")\n' +
            'else:\n' +
            '    print("It is cool")',
        },
        {
          kind: 'paragraph',
          text: 'Here `temperature > 25` is `False` (15 is not greater than 25), so Python skips the `if` body and runs the `else` body instead, printing `It is cool`.',
        },
        {
          kind: 'note',
          text: 'Exactly **one** of the two branches runs — never both, never neither. The `else` line also ends with a colon and has its own indented body.',
        },
      ],
    },

    // ── 4. elif: Choosing Between Many ────────────────────────────────────────
    {
      slug: 'if-elif-else',
      title: 'elif: Many Choices',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'When there are more than two possibilities, use `elif` (short for "else if"). Python checks each condition in order and runs the **first** one that is `True`.',
        },
        {
          kind: 'runnable',
          code:
            'score = 75\n\n' +
            'if score >= 90:\n' +
            '    print("Grade: A")\n' +
            'elif score >= 80:\n' +
            '    print("Grade: B")\n' +
            'elif score >= 70:\n' +
            '    print("Grade: C")\n' +
            'else:\n' +
            '    print("Grade: F")',
        },
        {
          kind: 'paragraph',
          text: 'With `score = 75`: `>= 90` is False, `>= 80` is False, `>= 70` is True — so it prints `Grade: C` and stops. The remaining branches are skipped.',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'You can have as many `elif` branches as you need.',
            '`else` is optional — it catches everything the conditions missed.',
            'Order matters: Python stops at the first `True` condition.',
          ],
        },
      ],
    },

    // ── 5. Comparisons Inside Conditions ──────────────────────────────────────
    {
      slug: 'comparisons-in-conditions',
      title: 'Comparisons in Conditions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The condition after `if` can be any expression that produces a boolean — including the comparison operators from the last module. Equality `==` is especially common.',
        },
        {
          kind: 'runnable',
          code:
            'colour = "red"\n\n' +
            'if colour == "red":\n' +
            '    print("Stop")\n' +
            'else:\n' +
            '    print("Go")',
        },
        {
          kind: 'note',
          text: '**Watch out:** inside a condition use `==` (equality), not `=` (assignment). `if colour = "red":` is a mistake and causes a syntax error. Ask yourself: "am I *checking* equality?" — then use `==`.',
        },
      ],
    },

    // ── 6. Nested if Statements ───────────────────────────────────────────────
    {
      slug: 'nested-if-statements',
      title: 'Nested if Statements',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You can place an `if` statement **inside** another one. The inner decision is only reached when the outer condition is `True`. Each level adds another 4 spaces of indentation.',
        },
        {
          kind: 'runnable',
          code:
            'age = 20\n' +
            'has_ticket = True\n\n' +
            'if age >= 18:\n' +
            '    if has_ticket:\n' +
            '        print("Welcome to the show")\n' +
            '    else:\n' +
            '        print("Please buy a ticket")\n' +
            'else:\n' +
            '    print("You must be 18 or older")',
        },
        {
          kind: 'paragraph',
          text: 'Both conditions are `True` here, so Python reaches the innermost line and prints `Welcome to the show`. Notice how the indentation shows which `if` each line belongs to.',
        },
      ],
    },

    // ── 7. Visualizing Branch Selection ───────────────────────────────────────
    {
      slug: 'visualizing-branch-selection',
      title: 'Visualizing the Branches',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Step through the example below and watch which branch Python chooses. Notice how it tests each condition in order and skips the rest once one is `True`.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize, then step through one line at a time and watch grade get its value.',
          code:
            'score = 82\n' +
            'if score >= 90:\n' +
            '    grade = "A"\n' +
            'elif score >= 80:\n' +
            '    grade = "B"\n' +
            'else:\n' +
            '    grade = "C"\n' +
            'print(grade)',
        },
        {
          kind: 'paragraph',
          text: 'With `score = 82`: the first condition `82 >= 90` is False (skipped), the second `82 >= 80` is True — so `grade` becomes `"B"` and the `else` is never reached. The program prints `B`.',
        },
      ],
    },

    // ── 8. Quiz: Which Branch Runs? ───────────────────────────────────────────
    {
      slug: 'quiz-which-branch-runs',
      title: 'Which Branch Runs?',
      type: 'quiz',
      question:
        'What is the output of this code?\n\n' +
        '`x = 5`\n' +
        '`if x > 10:`\n' +
        '`    print("big")`\n' +
        '`elif x > 3:`\n' +
        '`    print("medium")`\n' +
        '`else:`\n' +
        '`    print("small")`',
      options: [
        { id: 'a', text: '`big`' },
        { id: 'b', text: '`medium`' },
        { id: 'c', text: '`small`' },
        { id: 'd', text: 'All three' },
      ],
      correctOptionId: 'b',
      explanation:
        '`x > 10` is False (5 is not greater than 10), so Python checks the next condition. `x > 3` is True (5 is greater than 3), so it prints `medium` and skips the `else`.',
    },

    // ── 9. Quiz: The Colon ────────────────────────────────────────────────────
    {
      slug: 'quiz-the-colon',
      title: 'Ending the Header',
      type: 'quiz',
      question: 'Which character must end the header line of an `if` statement?',
      options: [
        { id: 'a', text: 'A semicolon `;`' },
        { id: 'b', text: 'A colon `:`' },
        { id: 'c', text: 'A full stop `.`' },
        { id: 'd', text: 'Nothing' },
      ],
      correctOptionId: 'b',
      explanation:
        'Every `if`, `elif`, and `else` header must end with a colon `:`. The colon tells Python that an indented block of code follows.',
    },

    // ── 10. Quiz: == vs = in a Condition ──────────────────────────────────────
    {
      slug: 'quiz-equals-in-conditions',
      title: 'Checking Equality',
      type: 'quiz',
      question: 'Which line correctly checks whether `age` is equal to 18?',
      options: [
        { id: 'a', text: '`if age = 18:`' },
        { id: 'b', text: '`if age == 18:`' },
        { id: 'c', text: '`if age =< 18:`' },
        { id: 'd', text: '`if = age 18:`' },
      ],
      correctOptionId: 'b',
      explanation:
        'Use `==` to *check* equality. A single `=` is for *assignment* and causes a syntax error inside an `if` condition.',
    },

    // ── 11. Exercise: Even or Odd ─────────────────────────────────────────────
    {
      slug: 'even-or-odd-exercise',
      title: 'Even or Odd',
      type: 'exercise',
      problemDescription:
        'Decide whether a number is even or odd.\n\n' +
        '- A variable `n` is already created.\n' +
        '- A number is **even** when the remainder of `n % 2` is `0`.\n' +
        '- Print `Even` if `n` is even, otherwise print `Odd`.',
      starterCode:
        'n = 8\n\n' +
        '# Print "Even" if n is divisible by 2, otherwise "Odd"\n' +
        'if ___:\n' +
        '    print("Even")\n' +
        'else:\n' +
        '    print("Odd")\n',
      expectedOutput: 'Even',
      validationMode: 'exact',
      solution:
        'n = 8\n' +
        'if n % 2 == 0:\n' +
        '    print("Even")\n' +
        'else:\n' +
        '    print("Odd")',
    },

    // ── 12. Exercise: Classify a Number ───────────────────────────────────────
    {
      slug: 'classify-a-number-exercise',
      title: 'Classify a Number',
      type: 'exercise',
      problemDescription:
        'Classify a number as positive, negative, or zero.\n\n' +
        '- A variable `n` is already created.\n' +
        '- Print `Positive` if `n` is greater than 0.\n' +
        '- Print `Negative` if `n` is less than 0.\n' +
        '- Otherwise print `Zero`.\n\n' +
        'Use an `if` / `elif` / `else` chain.',
      starterCode:
        'n = -4\n\n' +
        '# Print "Positive", "Negative", or "Zero"\n',
      expectedOutput: 'Negative',
      validationMode: 'exact',
      solution:
        'n = -4\n' +
        'if n > 0:\n' +
        '    print("Positive")\n' +
        'elif n < 0:\n' +
        '    print("Negative")\n' +
        'else:\n' +
        '    print("Zero")',
    },

    // ── Exercise: Can Vote? ───────────────────────────────────────────────────
    {
      slug: 'can-vote-exercise',
      title: 'Can Vote?',
      type: 'exercise',
      problemDescription:
        'Decide whether a person is old enough to vote.\n\n' +
        '- An age is already read into `age`.\n' +
        '- If `age` is **18 or above**, print `The person can vote.`\n' +
        '- Otherwise, print `The person cannot vote.`',
      remember: [
        'Use `>=` so that exactly 18 counts as old enough.',
        'The `else` branch runs whenever the `if` condition is `False`.',
      ],
      starterCode:
        'age = int(input("Enter your age: "))\n\n' +
        '# Print whether the person can vote\n',
      expectedOutput: 'The person cannot vote.',
      validationMode: 'exact',
      solution:
        'age = int(input("Enter your age: "))\n' +
        'if age >= 18:\n' +
        '    print("The person can vote.")\n' +
        'else:\n' +
        '    print("The person cannot vote.")',
      inputValues: ['17'],
    },

    // ── Exercise: Display a Warning ───────────────────────────────────────────
    {
      slug: 'traffic-light-warning-exercise',
      title: 'Display a Warning',
      type: 'exercise',
      problemDescription:
        'Show a warning when a traffic light is red.\n\n' +
        '- The light colour is already read into `light`.\n' +
        '- If `light` is `"red"`, print `The red light is on.` and `Stop the vehicle.` ' +
        'on two separate lines.\n' +
        '- **Always** print `Have a good day!` at the end, whatever the colour.',
      remember: [
        'An `if` block can contain more than one statement.',
        'A statement after the `if` block (not indented) always runs.',
      ],
      starterCode:
        'light = input("Traffic light colour: ")\n\n' +
        '# Warn if the light is red, then always wish a good day\n',
      expectedOutput: 'The red light is on.\nStop the vehicle.\nHave a good day!',
      validationMode: 'exact',
      solution:
        'light = input("Traffic light colour: ")\n' +
        'if light == "red":\n' +
        '    print("The red light is on.")\n' +
        '    print("Stop the vehicle.")\n' +
        'print("Have a good day!")',
      inputValues: ['red'],
    },

    // ── Quiz: Which elif Branch? ──────────────────────────────────────────────
    {
      slug: 'quiz-elif-howdy',
      title: 'Which Branch Runs?',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n' +
        '`x = 10`\n`if x < 0:`\n`    print("Hello")`\n`elif x > 100:`\n`    print("Hi")`\n`else:`\n`    print("Howdy")`',
      options: [
        { id: 'a', text: '`Hello`' },
        { id: 'b', text: '`Hi`' },
        { id: 'c', text: '`Howdy`' },
        { id: 'd', text: '`Hello` then `Hi`' },
      ],
      correctOptionId: 'c',
      explanation:
        '`x < 0` is `False` (10 is not negative) and `x > 100` is also `False`, so neither the `if` nor the `elif` runs. When no condition is `True`, the `else` block runs — printing `Howdy`. An `if`/`elif`/`else` always runs exactly one block.',
    },

    // ── 13. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'If/Else Statement — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing If/Else Statements!',
      summary:
        'You can now make your programs decide what to do: `if` runs code when a condition ' +
        'is `True`, `else` provides a fallback, and `elif` chooses between many options. ' +
        'You also learned the colon-and-indentation rule and how to nest decisions. ' +
        'Next is a short **Progress Test** covering booleans and if/else.',
      nextModuleTitle: 'Progress Test',
    },
  ],
}
