import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module: Data Conversion — 10 lesson screens.
//
// Walks the learner through converting between Python's basic data types
// (int, float, string), the errors that can occur during conversion, and
// implicit type promotion. Ends with an exercise, a quiz, and a recap.
// ─────────────────────────────────────────────────────────────────────────────

export const dataConversionModule: Module = {
  slug: 'data-conversion',
  title: 'Data Conversion',
  summary: 'Convert values between integers, floats, and strings.',
  lessons: [
    // ── 1. Introduction to Data Conversion ───────────────────────────────────
    {
      slug: 'introduction-to-data-conversion',
      title: 'Introduction to Data Conversion',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "So far in this course, you've learned to work with three different types of data:",
            lt: 'Iki šiol šiame kurse jūs išmokote dirbti su trimis skirtingais duomenų tipais:',
          },
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '**Integer** - 5, -6, 17, 0.',
            '**Float** - 5.6, 0.0, -7.84, 16.0.',
            '**String** - `"hello there"`, `"5"`, `"Number is 5.0"`.',
          ],
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In real-world projects, data may not always be in the format you need. For example, numbers might be stored as text, such as `"5.3"`.',
            lt: 'Realiuose projektuose duomenys ne visada būna tokio formato, kokio jums reikia. Pavyzdžiui, skaičiai gali būti saugomi kaip tekstas, pavyzdžiui, `"5.3"`.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In such situations, you may need to change data from one type to another. In this lesson, you will learn to perform such data conversions.',
            lt: 'Tokiose situacijose gali prireikti keisti duomenis iš vieno tipo į kitą. Šioje pamokoje jūs išmoksite atlikti tokias duomenų konversijas.',
          },
        },
      ],
    },

    // ── 2. Convert to Integer ────────────────────────────────────────────────
    {
      slug: 'convert-to-integer',
      title: 'Convert to Integer',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'We use the `int()` function to convert data from other types to integers.',
            lt: 'Naudojame funkciją `int()`, kad konvertuotume duomenis iš kitų tipų į sveikuosius skaičius.',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Convert Float to Integer',
            lt: 'Konvertuoti „float" į „integer"',
          },
        },
        {
          kind: 'runnable',
          code:
            'float_number = 15.0\n\n' +
            '# Convert float to integer\n' +
            'integer_number = int(float_number)\n\n' +
            'print(integer_number)    # Output: 15',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, the `int()` function converts the floating-point number to its equivalent integer.',
            lt: 'Čia funkcija `int()` konvertuoja slankiojo kablelio skaičių į atitinkamą sveiką skaičių.',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'String to Integer',
            lt: 'Eilutė į sveiką skaičių',
          },
        },
        {
          kind: 'runnable',
          code:
            'string_number = "15"\n\n' +
            '# Convert string to integer\n' +
            '# integer_number will contain 15\n' +
            'integer_number = int(string_number)\n\n' +
            'print(integer_number)    # Output: 15',
        },
        {
          kind: 'visualize',
          caption: {
            en: 'Step through it: watch the string "15" become the integer 15, then get used in arithmetic.',
            lt: 'Eikite per kodą žingsnis po žingsnio: stebėkite, kaip eilutė „15" tampa sveiku skaičiumi 15, o tada naudojama aritmetikoje.',
          },
          code:
            'text_value = "15"\n' +
            'number = int(text_value)\n' +
            'doubled = number * 2\n' +
            'print(doubled)',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, the `int()` function converts the string to its equivalent integer.',
            lt: 'Čia funkcija `int()` konvertuoja eilutę į atitinkamą sveiką skaičių.',
          },
        },
        {
          kind: 'note',
          text: {
            en: 'Note: If the `int()` function cannot convert the string to its equivalent integer, we will get an error.',
            lt: 'Pastaba: jei funkcija `int()` negali konvertuoti eilutės į atitinkamą sveiką skaičių, gausite klaidą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Next, we will see an example.',
            lt: 'Toliau pamatysime pavyzdį.',
          },
        },
      ],
    },

    // ── 3. Error Converting String to Integer ────────────────────────────────
    {
      slug: 'error-converting-string-to-integer',
      title: 'Error Converting String to Integer',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "We cannot convert all types of strings to integers. Let's take an example.",
            lt: 'Negalime konvertuoti visų rūšių eilučių į sveikuosius skaičius. Paimkime pavyzdį.',
          },
        },
        {
          kind: 'runnable',
          code:
            'string_number = "Howdy!"\n\n' +
            '# Convert string to integer\n' +
            'integer_number = int(string_number)    # Error!\n\n' +
            'print(integer_number)',
        },
        {
          kind: 'figure',
          code:
            'string_number = "Howdy!"\n\n' +
            '# Convert string to integer\n' +
            'integer_number = int(string_number)    # Error!\n\n' +
            'print(integer_number)',
          output: "ValueError: invalid literal for int() with base 10: 'Howdy!'",
          caption: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, Python cannot convert `"Howdy!"` to its equivalent integer because this string consists of alphabets instead of just numbers. Hence, we will get an error.',
            lt: 'Čia Python negali konvertuoti `"Howdy!"` į atitinkamą sveiką skaičių, nes ši eilutė susideda iš raidžių, o ne tik skaičių. Todėl gauname klaidą.',
          },
        },
      ],
    },

    // ── 4. Convert to Float ──────────────────────────────────────────────────
    {
      slug: 'convert-to-float',
      title: 'Convert to Float',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'We use the `float()` function to convert data from other types to floating-point numbers.',
            lt: 'Naudojame funkciją `float()`, kad konvertuotume duomenis iš kitų tipų į slankiojo kablelio skaičius.',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Integer to Float',
            lt: 'Sveikasis skaičius į slankiojo kablelio skaičių',
          },
        },
        {
          kind: 'runnable',
          code:
            'integer_number = -15\n\n' +
            '# Convert integer to float\n' +
            'float_number = float(integer_number)\n\n' +
            'print(float_number)    # Output: -15.0',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, the `float()` function converts the integer number to its equivalent floating-point number.',
            lt: 'Čia funkcija `float()` konvertuoja sveiką skaičių į atitinkamą slankiojo kablelio skaičių.',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'String to Float',
            lt: 'Eilutė į slankiojo kablelio skaičių',
          },
        },
        {
          kind: 'runnable',
          code:
            'string_number = "-15.65"\n\n' +
            '# Convert string to float\n' +
            'float_number = float(string_number)\n\n' +
            'print(float_number)    # Output: -15.65',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, the `float()` function converts the string to its equivalent floating-point number.',
            lt: 'Čia funkcija `float()` konvertuoja eilutę į atitinkamą slankiojo kablelio skaičių.',
          },
        },
        {
          kind: 'note',
          text: {
            en: 'Note: Similar to `int()`, if the `float()` function cannot convert the string to its equivalent floating-point number, we will get an error.',
            lt: 'Pastaba: panašiai kaip `int()`, jei funkcija `float()` negali konvertuoti eilutės į atitinkamą slankiojo kablelio skaičių, gausite klaidą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Next, we will see another example of an incompatible conversion.',
            lt: 'Toliau pamatysime dar vieną nesuderinamos konversijos pavyzdį.',
          },
        },
      ],
    },

    // ── 5. Error Converting String to Float ──────────────────────────────────
    {
      slug: 'error-converting-string-to-float',
      title: 'Error Converting String to Float',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "We have already learned not all strings can be converted to integers. Similarly, some strings can't be converted to floating-point numbers. Let's look at an example to see why.",
            lt: 'Jau sužinojome, kad ne visas eilutes galima konvertuoti į sveikuosius skaičius. Panašiai kai kurių eilučių negalima konvertuoti į slankiojo kablelio skaičius. Pažiūrėkime pavyzdį, kad suprastume kodėl.',
          },
        },
        {
          kind: 'runnable',
          code:
            'string_number = "12a"\n\n' +
            '# Convert string to float\n' +
            'float_number = float(string_number)    # Error!\n\n' +
            'print(float_number)',
        },
        {
          kind: 'figure',
          code:
            'string_number = "12a"\n\n' +
            '# Convert string to float\n' +
            'float_number = float(string_number)    # Error!\n\n' +
            'print(float_number)',
          output: "ValueError: could not convert string to float: '12a'",
          caption: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, Python cannot convert `"12a"` to its equivalent floating-point number. Hence, we will get an error.',
            lt: 'Čia Python negali konvertuoti `"12a"` į atitinkamą slankiojo kablelio skaičių. Todėl gauname klaidą.',
          },
        },
      ],
    },

    // ── 6. Convert Type (exercise) ───────────────────────────────────────────
    {
      slug: 'convert-type',
      title: 'Convert Type',
      type: 'exercise',
      problemDescription:
        'Write a program to convert a variable of one type to another.\n\n' +
        '- Create a variable named `x` and assign a string value `"5"` to it.\n' +
        '- Create another variable `y` and assign `"10"` to it.\n' +
        '- Convert the values stored in `x` and `y` to integers and multiply them.\n' +
        '- Print the result.',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Create variables x and y\n' +
        'x = "5"\n' +
        'y = "10"\n\n' +
        '# Convert values stored in x and y to integers and multiply them\n' +
        'result = ___\n\n' +
        '# Print the result\n' +
        'print(result)\n',
      expectedOutput: '50',
      validationMode: 'exact',
      solution:
        '# Create variables x and y\n' +
        'x = "5"\n' +
        'y = "10"\n\n' +
        '# Convert values stored in x and y to integers and multiply them\n' +
        'result = int(x) * int(y)\n\n' +
        '# Print the result\n' +
        'print(result)\n',
    },

    // ── 7. Convert to String ─────────────────────────────────────────────────
    {
      slug: 'convert-to-string',
      title: 'Convert to String',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'We use the `str()` function to convert data from other types to string numbers. For example,',
            lt: 'Naudojame funkciją `str()`, kad konvertuotume duomenis iš kitų tipų į eilutes. Pavyzdžiui,',
          },
        },
        {
          kind: 'runnable',
          code: 'number = 5.5\nnumber_str = str(5.5)\n\nprint(number_str)',
        },
        {
          kind: 'figure',
          code: 'number = 5.5\nnumber_str = str(5.5)\n\nprint(number_str)',
          output: '5.5',
          caption: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "It's not immediately clear from the output that `number_str` is storing a string, as printing the `number` variable would produce the same result.",
            lt: 'Iš išvesties iš karto neaišku, kad `number_str` saugo eilutę, nes kintamojo `number` spausdinimas duotų tą patį rezultatą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "To confirm the type of data, you can use the `type()` function, which we have covered in Understanding Python's `type()` article.",
            lt: 'Norėdami patvirtinti duomenų tipą, galite naudoti funkciją `type()`, kurią aptarėme straipsnyje apie Python `type()` funkciją.',
          },
        },
      ],
    },

    // ── 8. Implicit Type Conversion ──────────────────────────────────────────
    {
      slug: 'implicit-type-conversion',
      title: 'Implicit Type Conversion',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "There's more to conversion.",
            lt: 'Konversija turi daugiau aspektų.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Python automatically converts data of one type to another in some situations. For example,',
            lt: 'Python tam tikrose situacijose automatiškai konvertuoja duomenis iš vieno tipo į kitą. Pavyzdžiui,',
          },
        },
        {
          kind: 'runnable',
          code:
            'number_integer = 123\n' +
            'number_float = 1.23\n\n' +
            '# Add an integer and a float\n' +
            'result = number_integer + number_float\n\n' +
            'print(result)',
        },
        {
          kind: 'figure',
          code:
            'number_integer = 123\n' +
            'number_float = 1.23\n\n' +
            '# Add an integer and a float\n' +
            'result = number_integer + number_float\n\n' +
            'print(result)',
          output: '124.23',
          caption: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, we are adding an integer and a floating-point number.',
            lt: 'Čia pridedame sveiką skaičių ir slankiojo kablelio skaičių.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In such situations, Python tries to automatically convert the integer (**123**) to its equivalent floating-point number (**123.0**) before addition.',
            lt: 'Tokiose situacijose Python bando automatiškai konvertuoti sveiką skaičių (**123**) į atitinkamą slankiojo kablelio skaičių (**123.0**) prieš sudėtį.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "That's the reason why the output is also a floating-point number.",
            lt: 'Todėl išvestis taip pat yra slankiojo kablelio skaičius.',
          },
        },
      ],
    },

    // ── 9. Quiz: Output of float conversion ──────────────────────────────────
    {
      slug: 'quiz-output-float-conversion',
      title: 'Output of Float Conversion',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n`var = "25.0"`\n\n`number = float(var)`\n`result = number - 15`\n\n`print(result)`',
      options: [
        { id: 'a', text: '`10.0`' },
        { id: 'b', text: '`10`' },
        { id: 'c', text: '`35.0`' },
        { id: 'd', text: '`Error`' },
      ],
      correctOptionId: 'a',
      explanation:
        '`float("25.0")` converts the string to the floating-point number `25.0`. Subtracting the integer `15` from it promotes `15` to `15.0`, so `25.0 - 15` gives `10.0`.',
    },

    // ── 10. Recap — module completion ────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Data Conversion — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Data Conversion!',
      summary:
        'You learned how to convert values between integers, floats, and strings using `int()`, `float()`, and `str()`, and how Python implicitly promotes types during arithmetic. ' +
        "Next up: you'll learn how to get input from the user to make your programs interactive.",
      nextModuleTitle: 'Get User Input',
    },
  ],
}
