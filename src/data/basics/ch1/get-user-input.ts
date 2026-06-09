import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 8: Get User Input — 10 lesson screens.
//
// Introduces the `input()` function for reading data from the user, then shows
// how to convert string input into numbers (int / float) so it can be used in
// arithmetic.  Mixes theory, one quiz, and two coding exercises.
// ─────────────────────────────────────────────────────────────────────────────

export const getUserInputModule: Module = {
  slug: 'get-user-input',
  title: 'Get User Input',
  summary: 'Read input from the user with input().',
  lessons: [
    // ── 1. Introduction to User Input ────────────────────────────────────────
    {
      slug: 'introduction-to-user-input',
      title: 'Introduction to User Input',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "Till now, we've directly assigned values to variables like this:",
            lt: 'Iki šiol mes tiesiogiai priskyrėme reikšmes kintamiesiems taip:',
          },
        },
        { kind: 'code', code: 'name = "James"' },
        {
          kind: 'paragraph',
          text: {
            en: "Now, let's make things more interactive.",
            lt: 'Dabar padarykime viską interaktyviau.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "You can ask the user for input and use that data in your program, instead of assigning values directly. Let's see how to do this.",
            lt: 'Galite paprašyti vartotojo įvesti duomenis ir naudoti juos savo programoje, vietoj tiesioginio reikšmių priskyrimo. Pažiūrėkime, kaip tai padaryti.',
          },
        },
      ],
    },

    // ── 2. Take User Input ───────────────────────────────────────────────────
    {
      slug: 'take-user-input',
      title: 'Take User Input',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'You can also ask the user for input and assign it to a variable using the `input()` function. For example,',
            lt: 'Taip pat galite paprašyti vartotojo įvesti duomenis ir priskirti juos kintamajam naudojant `input()` funkciją. Pavyzdžiui,',
          },
        },
        {
          kind: 'runnable',
          code: 'name = input("Enter your name: ")\nprint("Your name is", name)',
          inputValues: ['James'],
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, the program prints `Enter your name:` and then waits for the user to enter data.',
            lt: 'Čia programa išspausdina `Enter your name:` ir tada laukia, kol vartotojas įves duomenis.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Let us type `James` and press the **ENTER** key. In this case, the `James` string will be assigned to the `name` variable.',
            lt: 'Įveskime `James` ir paspauskime klavišą **ENTER**. Tokiu atveju eilutė `James` bus priskirta kintamajam `name`.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: '`James` will be printed when we print the `name` variable.',
            lt: '`James` bus išspausdinta, kai spausdinsime kintamąjį `name`.',
          },
        },
        {
          kind: 'figure',
          code: '',
          output: 'Enter your name: James\nYour name is James',
          caption: {
            en: 'Sample Output 1',
            lt: '1 išvesties pavyzdys',
          },
        },
        {
          kind: 'figure',
          code: '',
          output: 'Enter your name: Emily\nYour name is Emily',
          caption: {
            en: 'Sample Output 2',
            lt: '2 išvesties pavyzdys',
          },
        },
      ],
    },

    // ── 3. User Input Without Prompt ─────────────────────────────────────────
    {
      slug: 'user-input-without-prompt',
      title: 'User Input Without Prompt',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "Let's take another example of user input.",
            lt: 'Paimkime kitą vartotojo įvesties pavyzdį.',
          },
        },
        {
          kind: 'runnable',
          code: 'full_name = input()\nprint("Full Name:", full_name)',
          inputValues: ['Micheal Smith'],
        },
        {
          kind: 'figure',
          code: '',
          output: 'Micheal Smith\nFull Name: Micheal Smith',
          caption: {
            en: 'Sample Output',
            lt: 'Išvesties pavyzdys',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, we have used the `input()` function without putting text (prompt message) inside it.',
            lt: 'Čia mes naudojome `input()` funkciją be teksto (raginimo pranešimo) jos viduje.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "The `full_name = input()` function doesn't print anything but makes the program wait until the user enters some input.",
            lt: 'Funkcija `full_name = input()` nieko nespausdina, bet priverčia programą laukti, kol vartotojas įves kažką.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'When the user types something and hits the **ENTER** key, it is assigned to the `full_name` variable.',
            lt: 'Kai vartotojas ką nors įveda ir paspaudžia klavišą **ENTER**, tai priskiriama kintamajam `full_name`.',
          },
        },
      ],
    },

    // ── 4. User Input (exercise) ─────────────────────────────────────────────
    {
      slug: 'user-input-exercise',
      title: 'User Input',
      type: 'exercise',
      problemDescription:
        'Write a program to get user input.\n\n' +
        'Print the variables in the format shown in the **Expected Output** section.\n\n' +
        '**Example**\n\n' +
        'Test Input:\n`James`\n`Smith`\n\n' +
        'Expected Output:\n`First Name: James`\n`Last Name: Smith`\n\n' +
        '**Note:** This exercise checks output based on input provided. To ensure accuracy, multiple test cases have been added to handle different inputs.',
      remember: [
        'Get the first name of the user and store it in the `first_name` variable.',
        'Get the last name of the user and store it in the `last_name` variable.',
        'Print the variables in the format shown in the **Expected Output** section.',
      ],
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Get the first name from the user\n' +
        'first_name = input("Whats your first name? ")\n\n' +
        '# Get the last name from the user\n' +
        'last_name = input("Whats your last name? ")\n\n' +
        '# Print the full name\n' +
        '___\n' +
        '___\n',
      expectedOutput: 'First Name: James\nLast Name: Smith',
      validationMode: 'exact',
      solution:
        'first_name = input("Whats your first name? ")\n' +
        'last_name = input("Whats your last name? ")\n' +
        'print(f"First Name: {first_name}")\n' +
        'print(f"Last Name: {last_name}")',
      inputValues: ['James', 'Smith'],
    },

    // ── 5. Use input() With Numbers (error) ──────────────────────────────────
    {
      slug: 'use-input-with-numbers',
      title: 'Use input() With Numbers',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'The `input()` function always takes input as a string. Even if our input is just a number, the `input()` function stores it as a string.',
            lt: 'Funkcija `input()` visada priima įvestį kaip eilutę. Net jei mūsų įvestis yra tik skaičius, funkcija `input()` saugo jį kaip eilutę.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Let's take an example to understand why this is important.",
            lt: 'Paimkime pavyzdį, kad suprastume, kodėl tai svarbu.',
          },
        },
        {
          kind: 'runnable',
          code:
            '# Program to multiply numbers entered by the user\n\n' +
            '# Take inputs from the user\n' +
            'number1 = input("Enter a number: ")\n' +
            'number2 = input("Enter another number: ")\n\n' +
            'product = number1 * number2\n' +
            'print("Product:", product)',
          // Intentionally broken demo: multiplying two strings raises a
          // TypeError — that's the point of this lesson.
          inputValues: ['5', '10'],
        },
        {
          kind: 'figure',
          code: '',
          output:
            "Enter a number: 5\n" +
            "Enter another number: ERROR!10\n" +
            "Traceback (most recent call last):\n" +
            '  File "<string>", line 7, in <module>\n' +
            "TypeError: can't multiply sequence by non-int of type 'str'",
          caption: {
            en: 'Sample Output',
            lt: 'Išvesties pavyzdys',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "This program will give us an error after we enter two numbers. It's because the `input()` function takes input in the form of a string.",
            lt: 'Ši programa pateiks klaidą po to, kai įvesime du skaičius. Taip yra todėl, kad funkcija `input()` priima įvestį eilutės pavidalu.',
          },
        },
        {
          kind: 'figure',
          code: 'product = "5" * "10"',
          output: 'Error: Cannot multiply two strings',
          caption: {
            en: 'Figure: Cannot Multiply Two Strings',
            lt: 'Paveikslėlis: negalima dauginti dviejų eilučių',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here,',
            lt: 'Čia,',
          },
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            {
              en: '`"5"` (string) is assigned to `number1` instead of **5** (integer).',
              lt: '`"5"` (eilutė) priskiriama `number1` vietoje **5** (sveikojo skaičiaus).',
            },
            {
              en: '`"10"` (string) is assigned to `number2` instead of **10** (integer).',
              lt: '`"10"` (eilutė) priskiriama `number2` vietoje **10** (sveikojo skaičiaus).',
            },
            {
              en: '`product = number1 * number2` results in an error because we cannot multiply two strings.',
              lt: '`product = number1 * number2` sukelia klaidą, nes negalima dauginti dviejų eilučių.',
            },
          ],
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'So, how do we solve this problem?',
            lt: 'Taigi, kaip išsprendžiame šią problemą?',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'We cannot directly take integers and floats as input.',
            lt: 'Mes negalime tiesiogiai priimti sveikųjų skaičių ir slankiojo kablelio skaičių kaip įvesties.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'However, we can convert the strings entered by the user to integers using the `int()` and into floating-point numbers using the `float()` function.',
            lt: 'Tačiau galime konvertuoti vartotojo įvestas eilutes į sveikuosius skaičius naudojant `int()` ir į slankiojo kablelio skaičius naudojant `float()` funkciją.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Let's see how we can do this.",
            lt: 'Pažiūrėkime, kaip tai galime padaryti.',
          },
        },
      ],
    },

    // ── 6. Use input() With Numbers (fix) ────────────────────────────────────
    {
      slug: 'use-input-with-numbers-fix',
      title: 'Use input() With Numbers',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "Let's try to fix the error that occurred on the last page.",
            lt: 'Pabandykime ištaisyti klaidą, kuri įvyko paskutiniame puslapyje.',
          },
        },
        {
          kind: 'runnable',
          code:
            '# Program to multiply numbers entered by the user\n\n' +
            '# Take inputs from the user\n' +
            'number1 = input("Enter a number: ")\n' +
            'number2 = input("Enter another number: ")\n\n' +
            '# Convert strings to floating-point numbers\n' +
            'number1 = float(number1)\n' +
            'number2 = float(number2)\n\n' +
            'product = number1 * number2\n' +
            'print("Product:", product)',
          inputValues: ['5', '10'],
        },
        {
          kind: 'figure',
          code: '',
          output: 'Enter a number: 5\nEnter another number: 10\nProduct: 50.0',
          caption: {
            en: 'Sample Output',
            lt: 'Išvesties pavyzdys',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In this program, we have added lines to convert the string, `"5"`, stored in `number1` to its equivalent floating-point number, **5.0**. We have done the same for `number2`.',
            lt: 'Šioje programoje mes pridėjome eilutes, kurios konvertuoja eilutę `"5"`, saugomą `number1`, į atitinkamą slankiojo kablelio skaičių **5.0**. Tą patį padarėme `number2`.',
          },
        },
        {
          kind: 'code',
          code:
            '# Convert strings to floating-point numbers\n' +
            'number1 = float(number1)\n' +
            'number2 = float(number2)',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Now, the `product = number1 * number2` statement works as expected.',
            lt: 'Dabar sakinys `product = number1 * number2` veikia kaip tikėtasi.',
          },
        },
      ],
    },

    // ── 7. A General Tip ─────────────────────────────────────────────────────
    {
      slug: 'a-general-tip',
      title: 'A General Tip',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'By the way, we could have written the last program like the following too.',
            lt: 'Beje, galėjome parašyti paskutinę programą ir šitaip.',
          },
        },
        {
          kind: 'runnable',
          code:
            '# Program to multiply numbers entered by the user\n\n' +
            '# Take inputs from the user\n' +
            'number1 = float(input("Enter a number: "))\n' +
            'number2 = float(input("Enter another number: "))\n\n' +
            'product = number1 * number2\n' +
            'print("Product:", product)',
          inputValues: ['5', '10'],
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, we have converted the input entered by the user to `float` before they are assigned to their respective variables.',
            lt: 'Čia mes konvertavome vartotojo įvestus duomenis į `float` prieš priskiriant juos atitinkamiems kintamiesiems.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Basically, this code',
            lt: 'Iš esmės, šis kodas',
          },
        },
        { kind: 'code', code: 'number1 = float(input("Enter a number: "))' },
        {
          kind: 'paragraph',
          text: {
            en: 'is equivalent to',
            lt: 'yra lygiavertis',
          },
        },
        {
          kind: 'code',
          code: 'number1 = input("Enter a number: ")\nnumber1 = float(number1)',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'This approach allows you to directly convert user input to `int` or `float` in fewer lines of code.',
            lt: 'Šis metodas leidžia tiesiogiai konvertuoti vartotojo įvestį į `int` arba `float` mažesniu eilučių skaičiumi.',
          },
        },
      ],
    },

    // ── 8. Quiz: input() always returns a string ─────────────────────────────
    {
      slug: 'quiz-input-type',
      title: 'Variable Type After input()',
      type: 'quiz',
      question:
        'Given the Python code snippet below, which of the following values can be stored in the variable `number` after user input?\n\n`number = input("Enter a number: ")`',
      options: [
        { id: 'a', text: '`10` (integer)' },
        { id: 'b', text: '`"10"` (string)' },
        { id: 'c', text: '`10.0` (floating-point number)' },
        { id: 'd', text: '`99` (integer)' },
      ],
      correctOptionId: 'b',
      explanation:
        'The `input()` function always returns the user\'s input as a string, regardless of what they type. So `number` will be the string `"10"`, not the integer `10` or float `10.0`.',
    },

    // ── 9. User Input — arithmetic exercise ──────────────────────────────────
    {
      slug: 'user-input-arithmetic-exercise',
      title: 'User Input',
      type: 'exercise',
      problemDescription:
        'Write a program to perform arithmetic operations on user input.\n\n' +
        '**Example**\n\n' +
        'Test Input:\n`5.5`\n`3.5`\n\n' +
        'Expected Output:\n`81.0`\n\n' +
        '**Reason:** The sum of **5.5** and **3.5** is **9.0**. And, the square of **9.0** is **81.0**.',
      remember: [
        'Get two numeric type inputs from the user, convert them to `float` and assign them to variables `number1` and `number2`.',
        'Add `number1` and `number2`, and store the result in the `result` variable.',
        'Then, print the **square** of the `result` variable.',
      ],
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Get two numbers as input and convert them to float\n' +
        'number1 = ___\n' +
        'number2 = ___\n\n' +
        '# Add the numbers and store the result\n' +
        'result = ___\n\n' +
        '# Print the square of result\n' +
        '___\n',
      expectedOutput: '81.0',
      validationMode: 'exact',
      solution:
        'number1 = float(input("Enter a number: "))\n' +
        'number2 = float(input("Enter another number: "))\n' +
        'result = number1 + number2\n' +
        'print(result ** 2)',
      inputValues: ['5.5', '3.5'],
    },

    // ── 10. Recap ────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Get User Input — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Get User Input!',
      summary:
        "You can now make your programs interactive — reading text and numbers from the user with `input()`, and converting strings to `int` or `float` for calculations. " +
        'Next up: a quick **Progress Test** covering Data Conversion and Get User Input.',
      nextModuleTitle: 'Progress Test 4',
    },
  ],
}
