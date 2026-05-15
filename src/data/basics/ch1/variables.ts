import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 4: Variables — 22 lesson screens (longest module in Chapter 1).
//
// Teaches how to create, print, reassign, and copy variables in Python,
// plus naming conventions and common mistakes.
// ─────────────────────────────────────────────────────────────────────────────

export const variablesModule: Module = {
  slug: 'variables',
  title: 'Variables',
  summary: 'Store and reuse values in your programs.',
  lessons: [
    // ── 1. Variables Introduction ────────────────────────────────────────────
    {
      slug: 'variables-introduction',
      title: 'Variables Introduction',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'In our previous lessons, you learned about numbers and strings and how to print them.' },
        {
          kind: 'paragraph',
          text: "As you begin working on more complex programs, you'll need to store and use this data, not just print it. That's where variables come in.",
        },
        { kind: 'paragraph', text: 'A **variable** is a container used for storing data.' },
        { kind: 'paragraph', text: "In this lesson, you'll learn to:" },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Create variables',
            'Print variables',
            'Change the values assigned to variables',
          ],
        },
        { kind: 'paragraph', text: "Let's start with creating variables." },
      ],
    },

    // ── 2. Create Variables ──────────────────────────────────────────────────
    {
      slug: 'create-variables',
      title: 'Create Variables',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'We create variables by assigning data to them. For example,' },
        { kind: 'code', code: 'greeting = "Merry Christmas"' },
        { kind: 'paragraph', text: 'Here,' },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`greeting` is a **variable**.',
            '`greeting` is assigned the string value `"Merry Christmas"`.',
            'The `=` sign is used to assign values to variables.',
          ],
        },
        {
          kind: 'figure',
          code: 'greeting = "Merry Christmas"',
          output: 'Variable: greeting\nValue:    "Merry Christmas"',
          caption: 'Assign Value to Variable',
        },
        { kind: 'paragraph', text: "Next, let's see if you can correctly identify variables." },
      ],
    },

    // ── 3. Quiz: What's the variable ─────────────────────────────────────────
    {
      slug: 'quiz-whats-the-variable',
      title: "What's the Variable",
      type: 'quiz',
      question: "What's the variable in the following code?\n\n`jack = \"name\"`",
      options: [
        { id: 'a', text: '`jack`' },
        { id: 'b', text: '`"name"`' },
        { id: 'c', text: '`name`' },
        { id: 'd', text: '`=`' },
      ],
      correctOptionId: 'a',
      explanation:
        'The variable is whatever appears on the LEFT side of the `=` sign. Here, `jack` is the variable and `"name"` is the value assigned to it.',
    },

    // ── 4. Printing Variables (demo) ─────────────────────────────────────────
    {
      slug: 'printing-variables-demo',
      title: 'Printing Variables',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Like numbers and strings, you can use `print()` to display variables.' },
        {
          kind: 'runnable',
          code:
            '# Create a variable\n' +
            'greeting = "Merry Christmas"\n\n' +
            '# Display the variable\n' +
            'print(greeting)',
        },
        { kind: 'paragraph', text: 'Here,' },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`greeting = "Merry Christmas"` — Creates a variable named `greeting` and assigns it the string `"Merry Christmas"`.',
            '`print(greeting)` — Prints the value stored in the `greeting` variable.',
          ],
        },
        {
          kind: 'note',
          text: '**Remember:** Line 1 and Line 4 are comments. They are ignored by Python.',
        },
        {
          kind: 'paragraph',
          text: 'Wondering why `print(greeting)` displays `Merry Christmas` instead of `greeting`? The next example will clarify this.',
        },
      ],
    },

    // ── 5. Printing Variables (vs string) ────────────────────────────────────
    {
      slug: 'printing-variables-string-vs-variable',
      title: 'Printing Variables',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "Let's look at another example of printing variables." },
        {
          kind: 'runnable',
          code:
            'greeting = "Merry Christmas"\n\n' +
            'print("greeting")    # Output: greeting\n' +
            'print(greeting)      # Output: Merry Christmas',
        },
        { kind: 'paragraph', text: "Let's analyze each `print()` separately." },
        { kind: 'heading', level: 3, text: 'print("greeting")' },
        { kind: 'paragraph', text: 'Here, `"greeting"` is a string. Therefore, the text `greeting` is displayed as it is.' },
        { kind: 'heading', level: 3, text: 'print(greeting)' },
        { kind: 'paragraph', text: 'Here, `greeting` is not wrapped inside quotation marks. Hence, `greeting` is recognized as a variable.' },
        { kind: 'paragraph', text: 'In this case, the value stored in the `greeting` variable is printed.' },
      ],
    },

    // ── 6. A Common Mistake ──────────────────────────────────────────────────
    {
      slug: 'a-common-mistake',
      title: 'A Common Mistake',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Consider the following program:' },
        { kind: 'runnable', code: 'print(age)' },
        { kind: 'paragraph', text: 'Here, `age` is not wrapped inside quotation marks. Therefore, it is treated as a variable.' },
        {
          kind: 'paragraph',
          text: "However, the `age` variable doesn't exist in the program because we haven't defined what this variable is storing. That's why the above program results in an error.",
        },
        {
          kind: 'paragraph',
          text: 'To fix this error, you can add a line of code at the beginning to define the `age` variable.',
        },
      ],
    },

    // ── 7. Quiz: name + Jackie ───────────────────────────────────────────────
    {
      slug: 'quiz-name-and-jackie',
      title: 'Print Name and Jackie',
      type: 'quiz',
      question:
        "What's the output of the following code?\n\n`name = \"Jack\"`\n\n`print(name)`\n`print(\"Jackie\")`",
      options: [
        { id: 'a', text: '`Jackie`' },
        { id: 'b', text: '`Jack`\n`Jackie`' },
        { id: 'c', text: '`name`\n`Jackie`' },
        { id: 'd', text: '`Jackie`\n`Jack`' },
      ],
      correctOptionId: 'b',
      explanation:
        '`print(name)` prints the value stored in the `name` variable (`Jack`), then `print("Jackie")` prints the literal string `Jackie`. Each `print()` goes to a new line.',
    },

    // ── 8. Quiz: print(age) undefined ────────────────────────────────────────
    {
      slug: 'quiz-print-age-undefined',
      title: 'Print Undefined Variable',
      type: 'quiz',
      question:
        "What's the output of the following code?\n\n`name = \"Jack\"`\n\n`print(age)`",
      options: [
        { id: 'a', text: '`age`' },
        { id: 'b', text: '`Jack`' },
        { id: 'c', text: '`name`' },
        { id: 'd', text: 'The code results in an error.' },
      ],
      correctOptionId: 'd',
      explanation:
        'The variable `age` is never defined — only `name` is. Trying to print an undefined variable raises a `NameError`, so the code results in an error.',
    },

    // ── 9. Print Variables (exercise) ────────────────────────────────────────
    {
      slug: 'print-variables-exercise',
      title: 'Print Variables',
      type: 'exercise',
      problemDescription: 'Write a program to print a variable.\n\n' +
        '- Create a variable named `salary` and assign **4950.5** to it.\n' +
        '- Print the variable.',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Create the salary variable\n' +
        'salary = ___\n\n' +
        '# Print the variable\n' +
        'print(___)\n',
      expectedOutput: '4950.5',
      validationMode: 'exact',
      solution: 'salary = 4950.5\nprint(salary)',
    },

    // ── 10. Change Values Stored in Variables ────────────────────────────────
    {
      slug: 'change-values-stored-in-variables',
      title: 'Change Values Stored in Variables',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The value of a variable can change as the program runs, which is why it is called a **variable**. For example,',
        },
        {
          kind: 'runnable',
          code:
            'age = 25\n' +
            'print(age)\n\n' +
            'age = 100\n' +
            'print(age)',
        },
        { kind: 'paragraph', text: 'Here,' },
        {
          kind: 'list',
          ordered: false,
          items: [
            'The initial value of `age` is **25**. So, the first `print(age)` prints `25`.',
            'Its value is then changed to **100**. So, the second `print(age)` prints `100`.',
          ],
        },
        {
          kind: 'figure',
          code: 'age = 25\nprint(age)\nage = 100\nprint(age)',
          output: '25\n100',
          caption: 'Change Values Stored in Variable',
        },
      ],
    },

    // ── 11. Visualizing Changing Variables ───────────────────────────────────
    {
      slug: 'visualizing-changing-variables',
      title: 'Visualizing Changing Variables',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To help you understand how a Python program works, run the example below and watch how the value stored in `age` changes from one line to the next.',
        },
        {
          kind: 'runnable',
          code:
            'age = 25\n' +
            'print(age)\n\n' +
            'age = 100\n' +
            'print(age)',
        },
        {
          kind: 'paragraph',
          text: 'On the first run, `age` holds `25`. The next assignment replaces that value with `100`, so the second `print(age)` shows the new value.',
        },
      ],
    },

    // ── 12. Change Values (exercise) ─────────────────────────────────────────
    {
      slug: 'change-values-exercise',
      title: 'Change Values Stored in a Variable',
      type: 'exercise',
      problemDescription: 'Write a program to change the value assigned to a variable.\n\n' +
        '- Create a variable named `var` and assign the value of **25** to it.\n' +
        '- Print `var`.\n' +
        '- Assign the value `"John"` to variable `var`.\n' +
        '- Print the variable `var` again.',
      starterCode:
        '# Assign 25 to the variable var\nvar = ___\n\n' +
        '# Print var\nprint(___)\n\n' +
        '# Assign "John" to the variable var\nvar = ___\n\n' +
        '# Print var again\nprint(___)\n',
      expectedOutput: '25\nJohn',
      validationMode: 'exact',
      solution: 'var = 25\nprint(var)\nvar = "John"\nprint(var)',
    },

    // ── 13. Quiz: Reassigning Variables ──────────────────────────────────────
    {
      slug: 'quiz-reassigning-variables',
      title: 'Reassigning Variables',
      type: 'quiz',
      question:
        "What's the output of this code?\n\n`var = 50`\n`var = \"Jack\"`\n`var = 25.5`\n\n`print(var)`",
      options: [
        { id: 'a', text: '`25.5`' },
        { id: 'b', text: '`50`\n`Jack`\n`25.5`' },
        { id: 'c', text: '`Jack`' },
        { id: 'd', text: 'None of the above' },
      ],
      correctOptionId: 'a',
      explanation:
        'Each assignment replaces the previous value of `var`. After all three assignments, `var` holds `25.5`, and only that value is printed.',
    },

    // ── 14. Assign Value of One Variable to Another ──────────────────────────
    {
      slug: 'assign-value-of-one-variable-to-another',
      title: 'Assign Value of One Variable to Another',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'You can also assign the value of one variable to another.' },
        {
          kind: 'runnable',
          code:
            'color1 = "blue"\n' +
            'print(color1)    # Output: blue\n\n' +
            'color2 = "pink"\n\n' +
            '# Assign the value stored in color2 to color1\n' +
            'color1 = color2\n\n' +
            'print(color1)    # Output: pink\n' +
            'print(color2)    # Output: pink',
        },
        { kind: 'paragraph', text: "Here's how the above program works." },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**Assign initial values:** `color1 = "blue"`, `color2 = "pink"`',
            '**Assign value of color2 to color1:** `color1 = color2` copies the value `"pink"` into `color1`.',
            '**Final values:** both `color1` and `color2` now hold `"pink"`.',
          ],
        },
        {
          kind: 'note',
          text: '**Note:** `color1 = color2` assigns the value of the variable `color2` to `color1`. However, this does not affect the value of `color2`; it remains unchanged.',
        },
      ],
    },

    // ── 15. Visualizing Changing Variables (second) ──────────────────────────
    {
      slug: 'visualizing-changing-variables-2',
      title: 'Visualizing Changing Variables',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Run this code to see the values stored in the variables at each step of the program.' },
        {
          kind: 'runnable',
          code:
            'color1 = "blue"\n' +
            'print(color1)\n\n' +
            'color2 = "pink"\n\n' +
            'color1 = color2\n\n' +
            'print(color1)\n' +
            'print(color2)',
        },
      ],
    },

    // ── 16. Assign Value of One Variable to Another (error case) ─────────────
    {
      slug: 'assign-value-error-case',
      title: 'Assign Value of One Variable to Another',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'Consider the example below:' },
        {
          kind: 'runnable',
          code:
            '# Create a variable\n' +
            'city1 = "Paris"\n\n' +
            '# Assign city2 to city1\n' +
            'city1 = city2\n\n' +
            'print(city1)',
        },
        {
          kind: 'figure',
          code: 'city1 = "Paris"\ncity1 = city2\nprint(city1)',
          output: "NameError: name 'city2' is not defined. Did you mean: 'city1'?",
          caption: 'Output when the source variable is missing',
        },
        { kind: 'paragraph', text: 'In the program, the line `city1 = city2` tries to assign the value of `city2` to `city1`.' },
        { kind: 'paragraph', text: 'However, since `city2` is not defined, the code produces an error.' },
      ],
    },

    // ── 17. Quiz: fruit1 = fruit2 ────────────────────────────────────────────
    {
      slug: 'quiz-fruit-assignment',
      title: 'Fruit Assignment',
      type: 'quiz',
      question:
        "What's the output of this code?\n\n`fruit1 = \"apple\"`\n`fruit2 = \"banana\"`\n\n`fruit1 = fruit2`\n\n`print(fruit1)`",
      options: [
        { id: 'a', text: '`apple`' },
        { id: 'b', text: '`banana`' },
        { id: 'c', text: '`applebanana`' },
        { id: 'd', text: 'The code results in an error.' },
      ],
      correctOptionId: 'b',
      explanation:
        '`fruit1 = fruit2` copies the value of `fruit2` (`"banana"`) into `fruit1`. So `fruit1` now holds `"banana"`, and that\'s what gets printed.',
    },

    // ── 18. Quiz: city3 not defined ──────────────────────────────────────────
    {
      slug: 'quiz-city3-not-defined',
      title: 'A Tricky Reassignment',
      type: 'quiz',
      question:
        "What's the output of this code?\n\n`city1 = \"London\"`\n`dallas = \"city3\"`\n\n`city2 = city1`\n`print(city3)`\n\n**Note:** This is a tricky one! Analyze the code carefully.",
      options: [
        { id: 'a', text: 'Error because `city1` is not defined.' },
        { id: 'b', text: 'Error because `city2` is not defined.' },
        { id: 'c', text: '`London`' },
        { id: 'd', text: 'Error because `city3` is not defined.' },
      ],
      correctOptionId: 'd',
      explanation:
        'A variable named `city3` is never created — the line `dallas = "city3"` assigns the string `"city3"` to a variable called `dallas`. So `print(city3)` raises a `NameError`.',
    },

    // ── 19. Assign One Variable to Other (exercise) ──────────────────────────
    {
      slug: 'assign-one-variable-to-other-exercise',
      title: 'Assign One Variable to Other',
      type: 'exercise',
      problemDescription: 'Write a program to assign one variable to another.\n\n' +
        '- Create a variable named `favorite_food` with the value `"steak"`.\n' +
        '- Print the value of `favorite_food`.\n' +
        '- Create another variable named `food` with the value `"pizza"`.\n' +
        '- Assign the `food` variable to the `favorite_food` variable.\n' +
        '- Print the `favorite_food` variable again.',
      starterCode:
        '# Create the favorite_food variable\nfavorite_food = ___\n\n' +
        '# Print the favorite_food variable\nprint(___)\n\n' +
        '# Create the food variable\nfood = ___\n\n' +
        '# Assign food to favorite_food\nfavorite_food = ___\n\n' +
        '# Print the favorite_food variable\nprint(___)\n',
      expectedOutput: 'steak\npizza',
      validationMode: 'exact',
      solution:
        'favorite_food = "steak"\nprint(favorite_food)\n' +
        'food = "pizza"\nfavorite_food = food\nprint(favorite_food)',
    },

    // ── 20. Legal Variables Name ─────────────────────────────────────────────
    {
      slug: 'legal-variables-name',
      title: 'Legal Variables Name',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "There are certain rules for naming variables. Let's learn about them." },
        { kind: 'paragraph', text: 'A variable name can only consist of three elements:' },
        {
          kind: 'list',
          ordered: false,
          items: ['alphabets', 'numbers', 'underscores'],
        },
        {
          kind: 'paragraph',
          text: 'Do not use spaces or any other symbols when naming a variable. If a variable name consists of two words, separate them with an underscore, `_`, or use camelCase.',
        },
        {
          kind: 'paragraph',
          text: 'For example, `first name` and `first-name` are not valid variable names, but `first_name` and `firstName` are valid.',
        },
        {
          kind: 'figure',
          code: 'Legal Variable Name      Illegal Variable Name\nfirst_name               first name\nfirstName                first-name\nnumber1                  number#1',
          output: '(Names on the left work; names on the right would raise SyntaxError)',
          caption: 'Legal and Illegal Variable Names',
        },
        {
          kind: 'paragraph',
          text: "It's important to note that a valid variable name doesn't necessarily mean it's a good name. For example, `lkc` is a valid variable name, but it's not meaningful.",
        },
        {
          kind: 'paragraph',
          text: 'Aim for clear and meaningful names that describe what the variable holds (like `age`, `first_name`, or `total_price`).',
        },
      ],
    },

    // ── 21. Recap: Variable Basics ───────────────────────────────────────────
    {
      slug: 'recap-variable-basics',
      title: 'Recap: Variable Basics',
      type: 'theory',
      blocks: [
        { kind: 'heading', level: 3, text: 'Create Variables' },
        { kind: 'paragraph', text: 'We create variables by assigning values to them.' },
        {
          kind: 'runnable',
          code:
            'age = 25\n' +
            'print(age)    # Output: 25',
        },
        { kind: 'heading', level: 3, text: 'Change Values of Variables' },
        { kind: 'paragraph', text: "It's possible to change values stored in variables." },
        {
          kind: 'runnable',
          code:
            'current_salary = 77287.5\n' +
            'print(current_salary)    # Output: 77287.5\n\n' +
            '# Change the value stored in the variable\n' +
            'current_salary = 80000.5\n' +
            'print(current_salary)    # Output: 80000.5',
        },
        { kind: 'heading', level: 3, text: 'Assign One Variable to Another' },
        { kind: 'paragraph', text: 'We can also assign the value of one variable to another.' },
        {
          kind: 'runnable',
          code:
            'color1 = "blue"\n' +
            'color2 = "pink"\n\n' +
            '# Assign the value stored in color2 to color1\n' +
            'color1 = color2\n\n' +
            'print(color1)    # Output: pink',
        },
        { kind: 'heading', level: 3, text: "Don't Confuse Strings and Variables" },
        { kind: 'paragraph', text: 'Strings are always wrapped inside quotation marks, but variable names are not.' },
        {
          kind: 'runnable',
          code:
            'city = "San Francisco"\n\n' +
            '# Print the value stored in the city variable\n' +
            'print(city)      # Output: San Francisco\n\n' +
            '# Print the "city" string\n' +
            'print("city")    # Output: city',
        },
      ],
    },

    // ── 22. Recap — module completion ────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Variables — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Variables!',
      summary:
        'You can now create variables, change their values, copy them, and follow Python\'s naming rules. ' +
        "Next up: a deeper look at **output** — printing multiple values, newlines, and f-strings.",
      nextModuleTitle: 'Output',
    },
  ],
}
