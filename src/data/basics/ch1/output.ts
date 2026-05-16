import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 5: Output — 15 lesson screens (pages p040-0 through p054-0).
//
// Teaches how to print multiple values, use the newline character `\n`, and
// format strings using Python f-strings, plus common beginner mistakes.
// ─────────────────────────────────────────────────────────────────────────────

export const outputModule: Module = {
  slug: 'output',
  title: 'Output',
  summary: 'Print multiple values, newlines, and f-strings.',
  lessons: [
    // ── 1. Introduction to Output ────────────────────────────────────────────
    {
      slug: 'introduction-to-output',
      title: 'Introduction to Output',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "We have previously used `print()` to display a single value or variable. Here's a quick recap:" },
        {
          kind: 'runnable',
          code:
            '# Print an integer\n' +
            'print(34)    # Output: 34\n\n' +
            '# Print a string\n' +
            'print("Squid Game")    # Output: Squid Game\n\n' +
            '# Create a variable\n' +
            'city = "London"\n\n' +
            '# Print the city variable\n' +
            'print(city)    # Output: London',
        },
        {
          kind: 'paragraph',
          text: "Now, you'll learn how to print multiple values and variables. You'll also explore **f-strings**, which makes it easier to print multiple data in the desired format.",
        },
      ],
    },

    // ── 2. Print Multiple Values ─────────────────────────────────────────────
    {
      slug: 'print-multiple-values',
      title: 'Print Multiple Values',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'We can print multiple pieces of data at once by separating them with commas. For example:' },
        {
          kind: 'figure',
          code:
            '# Display three numbers\n' +
            'print(67, -5, 19)\n\n' +
            '# Display two strings\n' +
            'print("Hey.", "Are you enjoying the course?")\n\n' +
            '# Display numbers and strings\n' +
            'print("Rating:", 8.5)',
          output: '67 -5 19\nHey. Are you enjoying the course?\nRating: 8.5',
        },
        { kind: 'paragraph', text: 'Here, the comma is used for separation and is not printed.' },
        {
          kind: 'paragraph',
          text: "Additionally, spaces before or after the comma don't affect the output. By default, `print()` always inserts a single space between the values.",
        },
      ],
    },

    // ── 3. Print Strings and Variables ───────────────────────────────────────
    {
      slug: 'print-strings-and-variables',
      title: 'Print Strings and Variables',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'You can also display values and variables using a single `print()` function. For example:' },
        {
          kind: 'figure',
          code: 'name = "Jack"\nprint("Name:", name)',
          output: 'Name: Jack',
        },
        {
          kind: 'paragraph',
          text: 'Here, the `print()` function displays the string `"Name:"` as it is, and displays the value stored in the variable `name`.',
        },
        {
          kind: 'figure',
          code: 'name = "Jack"\nprint("Name:", name)',
          output: 'Name: Jack',
          caption: 'Print Strings and Variables in the Same Line',
        },
      ],
    },

    // ── 4. Quiz: print favorite_actor ────────────────────────────────────────
    {
      slug: 'quiz-favorite-actor',
      title: 'Print Favorite Actor',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n`favorite_actor = "Andrew"`\n`print("Favorite actor:", favorite_actor)`',
      options: [
        { id: 'a', text: '`Favorite actor:, Andrew`' },
        { id: 'b', text: '`Favorite actor: favorite_actor`' },
        { id: 'c', text: '`"Favorite actor:" Andrew`' },
        { id: 'd', text: '`Favorite actor: Andrew`' },
      ],
      correctOptionId: 'd',
      explanation:
        'The string `"Favorite actor:"` is printed as it is, then `print()` adds a single space and the value of the `favorite_actor` variable (`Andrew`). The result is `Favorite actor: Andrew`.',
    },

    // ── 5. Print a String and a Number (exercise) ────────────────────────────
    {
      slug: 'print-a-string-and-a-number',
      title: 'Print a String and a Number',
      type: 'exercise',
      problemDescription:
        'Write a program to print a string and a number using a single `print()` function.\n\n' +
        '- Define a variable `age` with value **19**.\n' +
        '- Create another variable `message` to store the string `"My age is:"`.\n' +
        '- Use a single `print()` function to display the `message` and `age` variables together.',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Create the variable age\n' +
        'age = ___\n\n' +
        '# Create the message variable\n' +
        'message = (___)\n\n' +
        '# Print message and age variables\n' +
        'print(___, ___)\n',
      expectedOutput: 'My age is: 19',
      validationMode: 'exact',
      solution: 'age = 19\nmessage = "My age is:"\nprint(message, age)',
    },

    // ── 6. Print Newline (Enter Key) ─────────────────────────────────────────
    {
      slug: 'print-newline-enter-key',
      title: 'Print Newline (Enter Key)',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "It's possible to use a single `print()` function to display output in multiple lines." },
        {
          kind: 'paragraph',
          text: 'To do this, we use the newline character `\\n` in the position where we want to break the line:',
        },
        {
          kind: 'figure',
          code: 'print("Welcome to Pykiskis\\nThe Amazing Spider-Man")',
          output: 'Welcome to Pykiskis\nThe Amazing Spider-Man',
        },
        {
          kind: 'paragraph',
          text: 'Every use of `\\n` adds a newline. So, if we use another `\\n`, it will add a space between the separated lines.',
        },
        {
          kind: 'figure',
          code: 'print("Welcome to Pykiskis\\n\\nThe Amazing Spider-Man")',
          output: 'Welcome to Pykiskis\n\nThe Amazing Spider-Man',
        },
        {
          kind: 'figure',
          code: 'print("Hey\\n\\nHow are you?")',
          output: 'Hey\n\nHow are you?',
          caption: 'Print Newline Character',
        },
      ],
    },

    // ── 7. Quiz: Output with \n ──────────────────────────────────────────────
    {
      slug: 'quiz-newline-output',
      title: 'Output with Newline',
      type: 'quiz',
      question: "What's the output of the following code?\n\n`print(\"London\\nis beautiful\")`",
      options: [
        { id: 'a', text: '`London\\nis beautiful`' },
        { id: 'b', text: '`London is beautiful`' },
        { id: 'c', text: '`London`\n`is beautiful`' },
        { id: 'd', text: '`Londonis beautiful`' },
      ],
      correctOptionId: 'c',
      explanation:
        'The `\\n` character is interpreted as a newline, so the output breaks into two lines: `London` on the first line and `is beautiful` on the second.',
    },

    // ── 8. Newline (exercise) ────────────────────────────────────────────────
    {
      slug: 'newline-exercise',
      title: 'Newline',
      type: 'exercise',
      problemDescription:
        'Write a program to display `Hey` and `How are you` in two different lines using a single `print()` function.',
      remember: [
        'Use `\\n` between `Hey` and `How are you`. Also, make sure you don\'t use any spaces after `Hey`, as it will cause the exercise to fail.',
      ],
      starterCode: '# Replace ___ with your code below\n\nprint("Hey\\n___")\n',
      expectedOutput: 'Hey\nHow are you',
      validationMode: 'exact',
      solution: 'print("Hey\\nHow are you")',
    },

    // ── 9. Python f-strings (intro) ──────────────────────────────────────────
    {
      slug: 'python-f-strings',
      title: 'Python f-strings',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Python offers another way to format and print strings: **f-strings**, which simplify printing multiple values and variables.',
        },
        {
          kind: 'paragraph',
          text: 'To specify an f-string, simply put an **f** before the starting quotation marks. For example,',
        },
        { kind: 'runnable', code: 'print(f"Hello")' },
        { kind: 'paragraph', text: 'This code is equivalent to:' },
        { kind: 'runnable', code: 'print("Hello")' },
        {
          kind: 'paragraph',
          text: "The true power of the f-string becomes evident when you use it with variables. Let's explore it next.",
        },
      ],
    },

    // ── 10. Print Variables Using f-strings ──────────────────────────────────
    {
      slug: 'print-variables-using-f-strings',
      title: 'Print Variables Using f-strings',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: 'To print variables using f-strings, you need to wrap them inside curly braces `{}`. For example:' },
        {
          kind: 'runnable',
          code:
            'name = "Alice"\n' +
            'location = "Wonderland"\n\n' +
            'print(f"My name is {name} and I live in {location}.")',
        },
        { kind: 'paragraph', text: "Here's how this program works:" },
        {
          kind: 'figure',
          code:
            'name = "Alice"\n' +
            'location = "Wonderland"\n' +
            'print(f"My name is {name} and I live in {location}.")',
          output: 'My name is Alice and I live in Wonderland.',
          caption: 'Working of fstrings',
        },
        {
          kind: 'paragraph',
          text: 'F-strings also allow you to control the spaces and formatting in your output. For example,',
        },
        {
          kind: 'runnable',
          code:
            'name = "Alice"\n' +
            'id = 12\n\n' +
            'print(f"#   {id}->{name}    #")',
        },
        { kind: 'paragraph', text: 'This flexibility makes f-strings a preferred way to format and print strings.' },
      ],
    },

    // ── 11. Quiz: f-string output ────────────────────────────────────────────
    {
      slug: 'quiz-f-string-output',
      title: 'f-string Output',
      type: 'quiz',
      question:
        "What's the output of the following code?\n\n`name = \"Alice\"`\n`age = 30`\n`print(f\"{name} is age years old.\")`",
      options: [
        { id: 'a', text: '`name is age years old.`' },
        { id: 'b', text: '`Alice is 30 years old.`' },
        { id: 'c', text: '`Alice is age years old.`' },
        { id: 'd', text: '`{name} is age years old.`' },
      ],
      correctOptionId: 'c',
      explanation:
        'Only `{name}` is wrapped in curly braces, so it is replaced with the value of `name` (`Alice`). The word `age` has no braces around it, so it is treated as plain text — not as the variable.',
    },

    // ── 12. Python f-strings (exercise) ──────────────────────────────────────
    {
      slug: 'python-f-strings-exercise',
      title: 'Python f-strings',
      type: 'exercise',
      problemDescription:
        'Write a program to display the output in the specified format using f-strings.\n\n' +
        '- Create a variable `title` with the value `"The Great Gatsby"`.\n' +
        '- Create a variable `author` with the value `"Fitzgerald"`.\n' +
        '- Use an f-string to display the output in the format below.',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Create the title variable\n' +
        'title = ___\n\n' +
        '# Create the author variable\n' +
        'author = ___\n\n' +
        '# Use an f-string to print:  <title> by <author>.\n' +
        '___\n',
      expectedOutput: 'The Great Gatsby by Fitzgerald.',
      validationMode: 'exact',
      solution:
        'title = "The Great Gatsby"\nauthor = "Fitzgerald"\nprint(f"{title} by {author}.")',
    },

    // ── 13. Common Mistakes (I) ──────────────────────────────────────────────
    {
      slug: 'common-mistakes-i',
      title: 'Common Mistakes (I)',
      type: 'theory',
      blocks: [
        { kind: 'paragraph', text: "Before moving to the next lesson, let's discuss common mistakes beginners may make." },
        { kind: 'heading', level: 3, text: '1. Spelling Error' },
        {
          kind: 'paragraph',
          text: 'This one is obvious — using wrong variable names and misspelling words will cause an error. For example:',
        },
        {
          kind: 'figure',
          code:
            'annual_income = 95000\n\n' +
            '# error because of a spelling mistake\n' +
            'print(annual_icome)',
          output:
            'File "<string>", line 4, in <module>\n' +
            "NameError: name 'annual_icome' is not defined. Did you mean: 'annual_income'?",
        },
        { kind: 'paragraph', text: 'In most cases, carefully reading the error message helps us fix these problems easily.' },
        { kind: 'paragraph', text: 'For instance, the output clearly states that `annual_icome` is not defined in **line 4**.' },
        { kind: 'paragraph', text: 'Also, Python is case-sensitive. So `annual_income` and `Annual_income` are also not the same.' },
        {
          kind: 'paragraph',
          text: 'The same rule applies to `print()` as well — writing it as `Print()` or any other way will result in an error.',
        },
        { kind: 'heading', level: 3, text: '2. Adding Spaces at the Beginning' },
        {
          kind: 'paragraph',
          text: 'In Python, indentation has a specific meaning. So, if we add unnecessary spaces at the beginning, we will get an error. For example,',
        },
        { kind: 'code', code: '    print("Hello")    # Error' },
        { kind: 'paragraph', text: 'If you run the program, you will get an error because there are spaces before `print()`.' },
      ],
    },

    // ── 14. Common Mistakes (II) ─────────────────────────────────────────────
    {
      slug: 'common-mistakes-ii',
      title: 'Common Mistakes (II)',
      type: 'theory',
      blocks: [
        { kind: 'heading', level: 3, text: '3. Error because of Quotation Marks' },
        {
          kind: 'paragraph',
          text: 'We have seen many beginners make this mistake. They usually forget to close the string with quotation marks. For example,',
        },
        { kind: 'code', code: 'print("Hello)    # Error' },
        { kind: 'paragraph', text: "Here, Python doesn't understand what `\"Hello` is." },
        {
          kind: 'paragraph',
          text: "`\"Hello` is not a string because it doesn't have the closing quotation mark. And it's not a variable because we cannot use quotation marks in variable names.",
        },
        { kind: 'heading', level: 3, text: '4. Forgetting Commas in the print() Function' },
        {
          kind: 'code',
          code: 'age = 20\nprint("Age:" age)    # Error',
        },
        {
          kind: 'paragraph',
          text: "Here, Python interprets `\"Age:\" age` as a single item. Since it's neither a string nor a variable, we get an error.",
        },
        { kind: 'heading', level: 3, text: '5. Forgetting to use f in a f-string' },
        {
          kind: 'code',
          code: 'age = 20\nprint("Age = {age}")    # Output: Age = {age}',
        },
        {
          kind: 'paragraph',
          text: 'If you forget to include `f` before the quotation marks, the string is treated as a normal string. As a result, `{age}` is interpreted as plain text instead of being evaluated as a variable.',
        },
        { kind: 'paragraph', text: 'Avoid these five common mistakes and enjoy a smoother programming experience.' },
        {
          kind: 'paragraph',
          text: 'You can improve your Python skills by practicing regularly and staying mindful of common mistakes. To learn more about printing in Python, check out the Printing Basics in Python article.',
        },
      ],
    },

    // ── 15. Recap — module completion ────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Output — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Output!',
      summary:
        'You can now print multiple values, break lines with `\\n`, and use f-strings to format output. ' +
        "Next up: arithmetic operators — adding, subtracting, multiplying, dividing, and more.",
      nextModuleTitle: 'Arithmetic Operators',
    },
  ],
}
