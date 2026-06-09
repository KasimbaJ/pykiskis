import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 9: Introduction Examples — 8 lesson screens.
//
// A set of small example programs that put together everything learned so far:
// variable assignment, arithmetic, user input, and data conversion.
// Includes two practice exercises (Celsius to Fahrenheit, Area of a Triangle)
// and a worked example showing why a naive swap fails before the correct
// temp-variable approach.
// ─────────────────────────────────────────────────────────────────────────────

export const introductionExamplesModule: Module = {
  slug: 'introduction-examples',
  title: 'Introduction Examples',
  summary: 'Apply what you learned to small problems.',
  lessons: [
    // ── 1. Introduction Examples ─────────────────────────────────────────────
    {
      slug: 'introduction-examples',
      title: 'Introduction Examples',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "To start with, take a moment to appreciate how far you've come–You're almost at the end of the first chapter!",
            lt: 'Visų pirma, skirkite akimirką įvertinti, kiek jau nuėjote – beveik pasiekėte pirmojo skyriaus pabaigą!',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Now, in this lesson, you'll write a few exciting programs using what you've learned.",
            lt: 'Dabar šioje pamokoje parašysite keletą įdomių programų, naudodami tai, ko išmokote.',
          },
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            {
              en: 'Convert Kilometers to Miles',
              lt: 'Konvertuoti kilometrus į mylias',
            },
            {
              en: '**Practice:** Convert Celsius to Fahrenheit',
              lt: '**Praktika:** Konvertuoti Celsijaus laipsnius į Farenheito',
            },
            {
              en: 'Find the Square Root of a Number',
              lt: 'Rasti skaičiaus kvadratinę šaknį',
            },
            {
              en: '**Practice:** Find the Area of a Triangle',
              lt: '**Praktika:** Rasti trikampio plotą',
            },
            {
              en: 'Swap Two Variables',
              lt: 'Sukeisti du kintamuosius',
            },
          ],
        },
      ],
    },

    // ── 2. Convert Kilometers to Miles ───────────────────────────────────────
    {
      slug: 'convert-kilometers-to-miles',
      title: 'Convert Kilometers to Miles',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'We can convert distance in kilometers to miles using this formula:',
            lt: 'Galime konvertuoti atstumą kilometrais į mylias naudodami šią formulę:',
          },
        },
        { kind: 'code', code: '1 kilometer = 0.621 miles' },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Example',
            lt: 'Pavyzdys',
          },
        },
        {
          kind: 'runnable',
          code:
            '# Program to convert distance in kilometer to miles\n' +
            '# The distance will be entered by the user\n\n' +
            '# Get distance in kilometers\n' +
            'km = float(input("Enter distance in km: "))\n\n' +
            '# Conversion ratio\n' +
            'ratio = 0.621\n\n' +
            '# Compute distance in miles\n' +
            'miles = km * ratio\n' +
            'print(f"Distance in miles: {miles}")',
          inputValues: ['100'],
        },
        {
          kind: 'paragraph',
          text: {
            en: "Here's how this program works.",
            lt: 'Štai kaip ši programa veikia.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In line 6: `km = float(input("Enter distance in km: "))`',
            lt: '6 eilutėje: `km = float(input("Enter distance in km: "))`',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'We are taking input from the user using the expression `input("Enter distance in km: ")`.',
            lt: 'Priimame įvestį iš vartotojo naudodami išraišką `input("Enter distance in km: ")`.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Before it's assigned to the variable, we have converted it to a floating-point number using the `float()` function. It's because we want the distance to be a number, not a string.",
            lt: 'Prieš priskiriant kintamajam, konvertavome jį į slankiojo kablelio skaičių naudojant `float()` funkciją. Taip yra todėl, kad norime, jog atstumas būtų skaičius, o ne eilutė.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In line 12: `miles = km * ratio`',
            lt: '12 eilutėje: `miles = km * ratio`',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'We then calculated the distance in miles by multiplying the distance in kilometers by **0.621**.',
            lt: 'Tada apskaičiavome atstumą myliomis, daugindami atstumą kilometrais iš **0.621**.',
          },
        },
      ],
    },

    // ── 3. Celsius to Fahrenheit (exercise) ──────────────────────────────────
    {
      slug: 'celsius-to-fahrenheit',
      title: 'Celsius to Fahrenheit',
      type: 'exercise',
      problemDescription:
        'Write a program to convert temperature from Celsius to Fahrenheit.\n\n' +
        '**Formula:**\n\n' +
        '`fahrenheit = (celsius * 1.8) + 32`\n\n' +
        '- Get temperature in Celsius from the user and assign it to a variable.\n' +
        '- Convert it to Fahrenheit using the above formula.\n' +
        '- Print the result.',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Get temperature in degrees Celsius from the user\n' +
        'celsius = ___\n\n' +
        '# Convert it to degrees Fahrenheit using the formula\n' +
        'fahrenheit = ___\n\n' +
        '# Print the temperature in Fahrenheit\n' +
        '___\n',
      expectedOutput: '95.9',
      validationMode: 'exact',
      solution:
        'celsius = float(input("Enter temp in celsius"))\n' +
        'fahrenheit = (celsius * 1.8) + 32\n' +
        'print(fahrenheit)',
      inputValues: ['35.5'],
    },

    // ── 4. Find the Square Root ──────────────────────────────────────────────
    {
      slug: 'find-the-square-root',
      title: 'Find the Square Root',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'The square root of a number is a value that, when squared (multiplied by itself), equals the original number.',
            lt: 'Skaičiaus kvadratinė šaknis yra reikšmė, kuri, pakelta kvadratu (padauginta iš savęs), lygi pradiniam skaičiui.',
          },
        },
        {
          kind: 'figure',
          code: '√25  =  25 ^ (1/2)',
          output: '5',
          caption: {
            en: 'Find Square Root',
            lt: 'Rasti kvadratinę šaknį',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'We can use the `**` operator (exponent operator) to find the square root.',
            lt: 'Galime naudoti operatorių `**` (laipsnio operatorius), kad rastume kvadratinę šaknį.',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Example',
            lt: 'Pavyzdys',
          },
        },
        {
          kind: 'runnable',
          code:
            'number = 25\n\n' +
            'square_root = number ** (1/2)\n' +
            'print(f"Square root of {number} is {square_root}")',
        },
      ],
    },

    // ── 5. Calculate Area of a Triangle (exercise) ───────────────────────────
    {
      slug: 'calculate-area-of-a-triangle',
      title: 'Calculate Area of a Triangle',
      type: 'exercise',
      problemDescription:
        'Write a program to calculate the area of a triangle.\n\n' +
        'Suppose `a`, `b` and `c` are three sides of a triangle. Then, the area of a triangle is given as:\n\n' +
        '`semi-perimeter (s) = (a + b + c) / 2`\n\n' +
        '`area = √(s*(s-a)*(s-b)*(s-c))`\n\n' +
        '- Get three numeric inputs from the user and store them in variables `a`, `b`, and `c`.\n' +
        '- Compute semiperimeter `s` and then the triangle area using the above formula.\n' +
        '- Print the area.\n\n' +
        '**Hint:** To find the square root of a number, let\'s say **36**, you can use `36**(1/2)`.',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Get three sides of a triangle as integer input\n' +
        'a = ___\n' +
        'b = ___\n' +
        'c = ___\n\n' +
        '# Compute the semiperimeter\n' +
        's = ___\n\n' +
        '# Compute the area and print it\n' +
        'area = ___\n' +
        'print(area)\n',
      expectedOutput: '6.0',
      validationMode: 'exact',
      solution:
        'a = int(input("Enter the first side: "))\n' +
        'b = int(input("Enter the second side: "))\n' +
        'c = int(input("Enter the third side: "))\n' +
        's = (a + b + c)/2\n' +
        'area = (s*(s-a)*(s-b)*(s-c))**(1/2)\n' +
        'print(area)',
      inputValues: ['3', '4', '5'],
    },

    // ── 6. Swap Two Variables (naive, broken) ────────────────────────────────
    {
      slug: 'swap-two-variables-naive',
      title: 'Swap Two Variables',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'Suppose we have two variables as follows:',
            lt: 'Tarkime, turime du kintamuosius:',
          },
        },
        {
          kind: 'code',
          code: 'phone1 = "iPhone"\nphone2 = "Galaxy Ultra"',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'After swapping, the values of `phone1` and `phone2` should be exchanged, resulting in:',
            lt: 'Po sukeitimo `phone1` ir `phone2` reikšmės turėtų pasikeisti vietomis, gaunant:',
          },
        },
        {
          kind: 'code',
          code: 'phone1 = "Galaxy Ultra"\nphone2 = "iPhone"',
        },
        {
          kind: 'paragraph',
          text: {
            en: "Before you explore the correct solution, let's try an approach that will not work:",
            lt: 'Prieš nagrinėjant teisingą sprendimą, pabandykime metodą, kuris neveiks:',
          },
        },
        {
          kind: 'runnable',
          code:
            'phone1 = "iPhone"\n' +
            'phone2 = "Galaxy Ultra"\n\n' +
            'phone1 = phone2    # assign phone2 to phone1\n' +
            'phone2 = phone1    # assign phone1 to phone2\n\n' +
            'print(f"phone1: {phone1}\\nphone2: {phone2}")',
        },
        {
          kind: 'paragraph',
          text: {
            en: "**Can you figure out why the program above didn't work?**",
            lt: '**Ar galite suprasti, kodėl aukščiau pateikta programa neveikė?**',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Initially, `phone1` is assigned `"iPhone"` and `phone2` is assigned `"Galaxy Ultra"`.',
            lt: 'Iš pradžių `phone1` priskiriama `"iPhone"`, o `phone2` priskiriama `"Galaxy Ultra"`.',
          },
        },
        {
          kind: 'figure',
          code: 'phone1 = "iPhone"\nphone2 = "Galaxy Ultra"',
          output: 'phone1 → "iPhone"\nphone2 → "Galaxy Ultra"',
          caption: {
            en: 'Assign Values to phone1 and phone2',
            lt: 'Priskirti reikšmes kintamiesiems phone1 ir phone2',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: '**Step 1:** Assign `phone2` to `phone1`.',
            lt: '**1 žingsnis:** Priskirti `phone2` kintamajam `phone1`.',
          },
        },
        {
          kind: 'figure',
          code: 'phone1 = phone2',
          output: 'phone1 → "Galaxy Ultra"\nphone2 → "Galaxy Ultra"',
          caption: {
            en: 'Assign Value of phone2 to phone1',
            lt: 'Priskirti phone2 reikšmę kintamajam phone1',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'At this point, the value of `phone2` (`"Galaxy Ultra"`) is assigned to `phone1`. Now, both `phone1` and `phone2` hold `"Galaxy Ultra"`.',
            lt: 'Šiuo momentu `phone2` reikšmė (`"Galaxy Ultra"`) priskiriama `phone1`. Dabar tiek `phone1`, tiek `phone2` laiko `"Galaxy Ultra"`.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'The original value of `phone1` (`"iPhone"`) is overwritten and lost.',
            lt: 'Originali `phone1` reikšmė (`"iPhone"`) perrašoma ir prarandama.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: '**Step 2:** Assign `phone1` to `phone2`.',
            lt: '**2 žingsnis:** Priskirti `phone1` kintamajam `phone2`.',
          },
        },
        {
          kind: 'figure',
          code: 'phone2 = phone1',
          output: 'phone2 → "Galaxy Ultra"\nphone1 → "Galaxy Ultra"',
          caption: {
            en: 'Assign Value of phone1 to phone2',
            lt: 'Priskirti phone1 reikšmę kintamajam phone2',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Since both `phone1` and `phone2` now hold `\"Galaxy Ultra\"`, assigning `phone1` to `phone2` doesn't change anything.",
            lt: 'Kadangi tiek `phone1`, tiek `phone2` dabar laiko `"Galaxy Ultra"`, priskyrimas `phone1` kintamajam `phone2` nieko nekeičia.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "This is why both variables end up storing `\"Galaxy Ultra\"`. To correctly swap the values, we need a different approach, which we'll explore next.",
            lt: 'Štai kodėl abu kintamieji galiausiai saugo `"Galaxy Ultra"`. Norint teisingai sukeisti reikšmes, reikia kito metodo, kurį nagrinėsime toliau.',
          },
        },
      ],
    },

    // ── 7. Swap Two Variables (temp variable, correct) ───────────────────────
    {
      slug: 'swap-two-variables-temp',
      title: 'Swap Two Variables',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'To solve the previous problem, you need to store the value of `phone1` temporarily in another variable. This prevents the original value of `phone1` from being lost during the swap.',
            lt: 'Norint išspręsti ankstesnę problemą, reikia laikinai saugoti `phone1` reikšmę kitame kintamajame. Tai neleidžia pradinei `phone1` reikšmei būti prarastai sukeitimo metu.',
          },
        },
        {
          kind: 'runnable',
          code:
            'phone1 = "iPhone"\n\n' +
            'phone2 = "Galaxy Ultra"\n\n' +
            '# Store the value of phone1 in another variable\n' +
            'temp_phone = phone1\n\n' +
            '# Assign phone2 to phone1\n' +
            'phone1 = phone2\n\n' +
            '# Assign temp_phone (old value of phone1) to phone2\n' +
            'phone2 = temp_phone\n\n' +
            'print(f"phone1: {phone1}\\nphone2: {phone2}")',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Run this visualizer below to understand how this code works step by step:',
            lt: 'Paleiskite šį vizualizatorių žemiau, kad suprastumėte, kaip šis kodas veikia žingsnis po žingsnio:',
          },
        },
        {
          kind: 'runnable',
          code:
            'phone1 = "iPhone"\n\n' +
            'phone2 = "Galaxy Ultra"\n\n' +
            '# Store the old value of phone1\n' +
            'temp_phone = phone1\n\n' +
            '# Assign phone2 to phone1\n' +
            'phone1 = phone2\n\n' +
            '# Assign temp_phone (old value of phone1) to phone2\n' +
            'phone2 = temp_phone\n\n' +
            'print(f"phone1: {phone1}\\nphone2: {phone2}")',
        },
      ],
    },

    // ── 8. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Introduction Examples — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Introduction Examples!',
      summary:
        "You've just put everything together — variables, arithmetic, user input, and data " +
        "conversion — to build small, useful programs. Next up: a quick **Recap** of the whole chapter.",
      nextModuleTitle: 'Recap',
    },
  ],
}
