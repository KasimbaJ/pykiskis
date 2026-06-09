import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module: Arithmetic Operators — 21 lesson screens.
//
// Introduces Python's arithmetic operators (+, -, *, /, //, %, **), operator
// precedence with parentheses, and the arithmetic assignment shorthand (+=).
// Mixes theory, quizzes, and small exercises and ends with a recap.
// ─────────────────────────────────────────────────────────────────────────────

export const arithmeticOperatorsModule: Module = {
  slug: 'arithmetic-operators',
  title: 'Arithmetic Operators',
  summary: 'Add, subtract, multiply, divide, and more.',
  lessons: [
    // ── 1. Introduction to Operators ─────────────────────────────────────────
    {
      slug: 'introduction-to-operators',
      title: 'Introduction to Operators',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "So far in this course, we've focused on just printing values and variables to keep things simple.",
            lt: 'Iki šiol šiame kurse mes daugiausia spausdinome reikšmes ir kintamuosius, kad viskas būtų paprasta.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'However, to solve problems, you often need to perform calculations on variables and values, not just print them. To achieve this, we use **operators**.',
            lt: 'Tačiau norint spręsti uždavinius, dažnai reikia atlikti skaičiavimus su kintamaisiais ir reikšmėmis, o ne tik jas spausdinti. Tam naudojame **operatorius**.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'An operator is a special symbol that performs operations on values and variables. For example,',
            lt: 'Operatorius yra specialus simbolis, atliekantis veiksmus su reikšmėmis ir kintamaisiais. Pavyzdžiui,',
          },
        },
        {
          kind: 'runnable',
          code:
            'total = 5 + 10\n\n' +
            'print(total)    # Output: 15',
        },
        {
          kind: 'paragraph',
          text: {
            en: "In the program, `+` is an operator that is used to perform addition.",
            lt: 'Šioje programoje `+` yra operatorius, naudojamas sumai apskaičiuoti.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Let's learn about different types of operators and how to use them in this lesson.",
            lt: 'Sužinokime apie skirtingus operatorių tipus ir kaip juos naudoti šioje pamokoje.',
          },
        },
      ],
    },

    // ── 2. Arithmetic Operators ──────────────────────────────────────────────
    {
      slug: 'arithmetic-operators-overview',
      title: 'Arithmetic Operators',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "Let's look at the operators we'll learn in this lesson.",
            lt: 'Pažiūrėkime į operatorius, kuriuos išmoksime šioje pamokoje.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "As the title suggests, we'll only deal with operators that perform basic mathematical operations; they are summarized in the table below:",
            lt: 'Kaip rodo pavadinimas, mes kalbėsime tik apie operatorius, atliekančius pagrindines matematines operacijas; jie apibendrinti lentelėje žemiau:',
          },
        },
        {
          kind: 'figure',
          code:
            'Operator   Syntax     Meaning\n' +
            '+          x + y      Addition\n' +
            '-          x - y      Subtraction\n' +
            '*          x * y      Multiplication\n' +
            '/          x / y      Division\n' +
            '%          x % y      Remainder\n' +
            '//         x // y     Quotient\n' +
            '**         x ** y     Exponentiation',
          output: '',
          caption: {
            en: 'Arithmetic Operators in Python',
            lt: 'Python aritmetiniai operatoriai',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Let's start with the `+` operator.",
            lt: 'Pradėkime nuo `+` operatoriaus.',
          },
        },
      ],
    },

    // ── 3. + Operator ────────────────────────────────────────────────────────
    {
      slug: 'plus-operator',
      title: '+ Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'As we have seen from the last example, the `+` operator is used to add operands (values and variables).',
            lt: 'Kaip matėme iš paskutinio pavyzdžio, `+` operatorius naudojamas operandams (reikšmėms ir kintamiesiems) sudėti.',
          },
        },
        {
          kind: 'runnable',
          code:
            'x = 10\n' +
            'y = 20\n\n' +
            '# Use + to perform addition\n' +
            'total = x + y + 30\n\n' +
            'print(total)    # Output: 60',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In the program, `total = x + y + 30` first computes the sum of `x`, `y`, and **30**. Then, the result is assigned to the `total` variable.',
            lt: 'Šioje programoje `total = x + y + 30` pirmiausia apskaičiuoja `x`, `y` ir **30** sumą. Tada rezultatas priskiriamas kintamajam `total`.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Run the visualizer to see how variables are utilized in this program.',
            lt: 'Paleiskite vizualizatorių, kad pamatytumėte, kaip kintamieji naudojami šioje programoje.',
          },
        },
        {
          kind: 'runnable',
          code:
            'x = 10\n' +
            'y = 20\n\n' +
            '# Use + to perform addition\n' +
            'total = x + y + 30\n\n\n' +
            'print(total)    # Output: 60',
        },
      ],
    },

    // ── 4. Perform Operation and Print ───────────────────────────────────────
    {
      slug: 'perform-operation-and-print',
      title: 'Perform Operation and Print',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "We can also perform addition directly without using the extra variable. Let's take an example.",
            lt: 'Taip pat galime atlikti sudėtį tiesiogiai, nenaudodami papildomo kintamojo. Paimkime pavyzdį.',
          },
        },
        {
          kind: 'runnable',
          code:
            'x = 12.5\n' +
            'y = 10\n\n' +
            'print(x + y)    # Output: 22.5',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, the line `print(x + y)` first computes the sum of `x` and `y`. Then, the result is directly printed on the screen.',
            lt: 'Čia eilutė `print(x + y)` pirmiausia apskaičiuoja `x` ir `y` sumą. Tada rezultatas tiesiogiai atspausdinamas ekrane.',
          },
        },
      ],
    },

    // ── 5. Quiz: y + x with negatives ────────────────────────────────────────
    {
      slug: 'quiz-add-negative-and-positive',
      title: 'Add a Negative and Positive Number',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n`x = -1`\n`y = 10`\n\n`print(y + x)`',
      options: [
        { id: 'a', text: '`11`' },
        { id: 'b', text: '`10-1`' },
        { id: 'c', text: '`9`' },
        { id: 'd', text: '`-9`' },
      ],
      correctOptionId: 'c',
      explanation:
        '`y + x` is `10 + (-1)`, which equals `9`. Adding a negative number is the same as subtracting, so the result is `9`.',
    },

    // ── 6. - Operator ────────────────────────────────────────────────────────
    {
      slug: 'minus-operator',
      title: '- Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'The `-` operator subtracts the value on the right from the value on the left.',
            lt: 'Operatorius `-` atima dešinėje esančią reikšmę iš kairėje esančios reikšmės.',
          },
        },
        {
          kind: 'runnable',
          code:
            'x = 10\n' +
            'y = 6\n\n' +
            'result = x - y\n' +
            'print(result)    # Output: 4',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here, `result = x - y` first subtracts `y` from `x`. Then, the result is assigned to the `result` variable.',
            lt: 'Čia `result = x - y` pirmiausia atima `y` iš `x`. Tada rezultatas priskiriamas kintamajam `result`.',
          },
        },
      ],
    },

    // ── 7. Calculate Profit (exercise) ───────────────────────────────────────
    {
      slug: 'calculate-profit-exercise',
      title: 'Calculate Profit',
      type: 'exercise',
      problemDescription:
        'Write a program to calculate the profit made from selling a book.\n\n' +
        '- The cost price of a book is **25** dollars.\n' +
        '- The selling price of the book is **35** dollars.\n' +
        '- Calculate the profit amount and print it.\n\n' +
        '**Hint:** The profit amount is calculated by subtracting the cost price from the selling price.',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Create the cost_price variable\n' +
        'price = 25\n\n' +
        '# Create the selling_price variable\n' +
        'selling_price = 35\n\n' +
        '# Compute the profit and print it\n' +
        'profit = ___\n' +
        'print(profit)\n',
      expectedOutput: '10',
      validationMode: 'exact',
      solution:
        'price = 25\n' +
        'selling_price = 35\n' +
        'profit = selling_price - price\n' +
        'print(profit)',
    },

    // ── 8. * Operator ────────────────────────────────────────────────────────
    {
      slug: 'multiply-operator',
      title: '* Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'The `*` operator multiplies two values or variables.',
            lt: 'Operatorius `*` daugina dvi reikšmes arba kintamuosius.',
          },
        },
        {
          kind: 'runnable',
          code:
            'number1 = 5\n' +
            'number2 = 10\n\n' +
            '# Compute the product of number1 and number2\n' +
            'product = number1 * number2\n' +
            'print(product)',
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        { kind: 'code', code: '50' },
        {
          kind: 'paragraph',
          text: {
            en: "Let's take one more example.",
            lt: 'Paimkime dar vieną pavyzdį.',
          },
        },
        {
          kind: 'runnable',
          code:
            'number = 5.5\n\n' +
            '# Compute the product of number and 10\n' +
            'product = number * 10\n' +
            'print(product)',
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        { kind: 'code', code: '55.0' },
      ],
    },

    // ── 9. Quiz: a * b ───────────────────────────────────────────────────────
    {
      slug: 'quiz-multiply-int-and-float',
      title: 'Multiply an Integer and a Float',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n`a = 20`\n`b = 6.5`\n`print(a * b)`',
      options: [
        { id: 'a', text: '`20`' },
        { id: 'b', text: '`130`' },
        { id: 'c', text: '`130.0`' },
        { id: 'd', text: '`Error`' },
      ],
      correctOptionId: 'c',
      explanation:
        '`20 * 6.5` equals `130`. When you multiply an integer by a float, Python promotes the result to a float, so the output is `130.0`, not `130`.',
    },

    // ── 10. / Operator ───────────────────────────────────────────────────────
    {
      slug: 'divide-operator',
      title: '/ Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'The `/` operator is used for division. For example,',
            lt: 'Operatorius `/` naudojamas dalijimui. Pavyzdžiui,',
          },
        },
        {
          kind: 'runnable',
          code:
            'number = 25\n\n' +
            'result = number / 4\n' +
            'print(result)',
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        { kind: 'code', code: '6.25' },
        {
          kind: 'paragraph',
          text: {
            en: "Let's take another example.",
            lt: 'Paimkime kitą pavyzdį.',
          },
        },
        {
          kind: 'runnable',
          code:
            'number = 25\n\n' +
            'result = number / 5\n' +
            'print(result)',
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        { kind: 'code', code: '5.0' },
        {
          kind: 'note',
          text: {
            en: '**Note:** The `/` operator always returns a floating-point value. In the above program, `25 / 5` results in **5.0** and not **5**.',
            lt: '**Pastaba:** Operatorius `/` visada grąžina slankiojo kablelio reikšmę. Pirmiau pateiktoje programoje `25 / 5` duoda **5.0**, o ne **5**.',
          },
        },
      ],
    },

    // ── 11. Quiz: 10 / 5 * 6 ─────────────────────────────────────────────────
    {
      slug: 'quiz-precedence-divide-multiply',
      title: 'Operator Precedence: / and *',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n`result = 10 / 5 * 6`\n`print(result)`',
      options: [
        { id: 'a', text: '`Error`' },
        { id: 'b', text: '`12.0`' },
        { id: 'c', text: '`0.33333333`' },
        { id: 'd', text: '`120`' },
      ],
      correctOptionId: 'b',
      explanation:
        '`/` and `*` have the same precedence and are evaluated left to right. So `10 / 5` is computed first, giving `2.0`, then `2.0 * 6` gives `12.0`. The `/` operator always returns a float.',
    },

    // ── 12. // and % Operator ────────────────────────────────────────────────
    {
      slug: 'floor-divide-and-modulo-operator',
      title: '// and % Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'The `/` operator performs division. However, if you need to find the quotient instead, use the `//` operator.',
            lt: 'Operatorius `/` atlieka dalijimą. Tačiau jei reikia rasti dalmenį, naudokite operatorių `//`.',
          },
        },
        {
          kind: 'figure',
          code:
            '       6   <- Quotient\n' +
            '    ┌─────\n' +
            '  4 ) 25\n' +
            '    - 24\n' +
            '    ─────\n' +
            '       1   <- Remainder',
          output: '',
          caption: {
            en: 'Figure: Basic Division Operation',
            lt: 'Iliustracija: Pagrindinis dalijimo veiksmas',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Let's take an example.",
            lt: 'Paimkime pavyzdį.',
          },
        },
        {
          kind: 'runnable',
          code:
            'divisor = 4\n' +
            'dividend = 25\n\n' +
            '# Compute quotient\n' +
            'quotient = dividend // divisor\n\n' +
            'print(quotient)    # Output: 6',
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: '% Operator',
            lt: '% Operatorius',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'The `%` operator computes the remainder when one number is divided by another.',
            lt: 'Operatorius `%` apskaičiuoja liekaną, kai vienas skaičius dalijamas iš kito.',
          },
        },
        {
          kind: 'runnable',
          code:
            'divisor = 4\n' +
            'dividend = 25\n\n' +
            '# compute remainder\n' +
            'remainder = dividend % divisor\n\n' +
            'print(remainder)    # Output: 1',
        },
      ],
    },

    // ── 13. Divide Pens to Students (exercise) ───────────────────────────────
    {
      slug: 'divide-pens-to-students-exercise',
      title: 'Divide Pens to Students',
      type: 'exercise',
      problemDescription:
        'Write a program to divide pens among students.\n\n' +
        'Imagine you have to divide **14** pens among **3** students equally. Your task is to find out:\n\n' +
        '1. How many pens each student would get when divided equally?\n' +
        '2. The number of pens left over (if any).\n\n' +
        'To solve this problem:\n\n' +
        '- Create a variable named `pen_number` and assign it the value of **14**.\n' +
        '- Create another variable named `student_number` and assign it the value of **3**.\n' +
        '- Compute the number of pens each student will get and print the result.\n' +
        '- Compute the number of pens remaining and print the remainder.\n\n' +
        "**Note:** If your output doesn't match the expected output exactly, you won't pass the exercise.",
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Create pen_number and student_number variables\n' +
        'pen_number = 14\n' +
        'student_number = 3\n\n' +
        '# Compute the number of pens each student will get and print it\n' +
        '# Hint: find the quotient\n' +
        'quotient = ___\n' +
        'print(f"Pens for each student: {quotient}")\n\n' +
        '# Compute and print the number of remaining pens\n' +
        '# Hint: find the remainder\n' +
        'remainder = ___\n' +
        'print(f"Remaining pens: {remainder}")\n',
      expectedOutput: 'Pens for each student: 4\nRemaining pens: 2',
      validationMode: 'exact',
      solution:
        'pen_number = 14\n' +
        'student_number = 3\n' +
        'quotient = pen_number // student_number\n' +
        'print(f"Pens for each student: {quotient}")\n' +
        'remainder = pen_number % student_number\n' +
        'print(f"Remaining pens: {remainder}")',
    },

    // ── 14. ** Operator ──────────────────────────────────────────────────────
    {
      slug: 'power-operator',
      title: '** Operator',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'The `**` operator computes the exponential (power) of a number.',
            lt: 'Operatorius `**` apskaičiuoja skaičiaus laipsnį (kėlimą laipsniu).',
          },
        },
        {
          kind: 'figure',
          code: 'In Python, 4**3 is equal to 4^3 in Mathematics.',
          output: '',
          caption: {
            en: 'Figure: Power of a Number',
            lt: 'Iliustracija: Skaičiaus laipsnis',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Let's take an example.",
            lt: 'Paimkime pavyzdį.',
          },
        },
        {
          kind: 'runnable',
          code:
            'base = 4\n' +
            'power = 3\n\n' +
            'result = base ** power\n' +
            'print(result)',
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        { kind: 'code', code: '64' },
        {
          kind: 'paragraph',
          text: {
            en: "Let's take another example.",
            lt: 'Paimkime kitą pavyzdį.',
          },
        },
        {
          kind: 'runnable',
          code:
            'base = 2.5\n' +
            'power = 3\n\n' +
            'result = base ** power\n' +
            'print(result)',
        },
        {
          kind: 'heading',
          level: 3,
          text: {
            en: 'Output',
            lt: 'Išvestis',
          },
        },
        { kind: 'code', code: '15.625' },
      ],
    },

    // ── 15. Quiz: 2 ** 3 ─────────────────────────────────────────────────────
    {
      slug: 'quiz-power-of-2',
      title: 'Power of 2',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n`result = 2 ** 3`\n`print(result)`',
      options: [
        { id: 'a', text: '`9`' },
        { id: 'b', text: '`8`' },
        { id: 'c', text: '`6`' },
        { id: 'd', text: '`5`' },
      ],
      correctOptionId: 'b',
      explanation:
        '`2 ** 3` means `2` raised to the power of `3`, which is `2 * 2 * 2 = 8`.',
    },

    // ── 16. Volume of Cube (exercise) ────────────────────────────────────────
    {
      slug: 'volume-of-cube-exercise',
      title: 'Volume of Cube',
      type: 'exercise',
      problemDescription:
        'Write a program to find the volume of a cube.\n\n' +
        '- Create a variable named `length` and assign it the value **5**.\n' +
        '- Calculate the volume of the cube using its length.\n' +
        '- Print the volume.\n\n' +
        '**Hint:** The volume of a cube is calculated as:\n\n' +
        '`volume = length³`',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Create the length variable\n' +
        'length = 5\n\n' +
        '# Calculate the volume\n' +
        'volume = ___\n\n' +
        '# Print the volume\n' +
        'print(volume)\n',
      expectedOutput: '125',
      validationMode: 'exact',
      solution:
        'length = 5\n' +
        'volume = length ** 3\n' +
        'print(volume)',
    },

    // ── 17. Using Parentheses in Arithmetic Operations ───────────────────────
    {
      slug: 'using-parentheses-in-arithmetic-operations',
      title: 'Using Parentheses in Arithmetic Operations',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'Can you guess the output of the following program?',
            lt: 'Ar galite atspėti šios programos išvestį?',
          },
        },
        {
          kind: 'runnable',
          code:
            'result = 2 * 5 - 10 / 5\n' +
            'print(result)',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In the above program, it may be harder to determine the order in which the operations are performed first.',
            lt: 'Pirmiau pateiktoje programoje gali būti sunkiau nustatyti, kuria tvarka operacijos atliekamos pirmiau.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'To avoid confusion, we can use `()` like this:',
            lt: 'Norėdami išvengti painiavos, galime naudoti `()` taip:',
          },
        },
        {
          kind: 'runnable',
          code:
            'result = (2 * 5) - (10 / 5)\n' +
            'print(result)',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Now, our code is much easier to understand. The operations are performed in a certain order during calculations.',
            lt: 'Dabar mūsų kodas yra daug lengviau suprantamas. Skaičiavimų metu operacijos atliekamos tam tikra tvarka.',
          },
        },
      ],
    },

    // ── 18. Calculate Fee Discount (exercise) ────────────────────────────────
    {
      slug: 'calculate-fee-discount-exercise',
      title: 'Calculate Fee Discount',
      type: 'exercise',
      problemDescription:
        'Write a Python program to calculate the fee amount after applying the discount.\n\n' +
        'You are a university student, and your tuition fee is **$1536**.\n\n' +
        'The college offers a **10%** discount if you pay early. To solve this problem,\n\n' +
        '- Create a variable named `fee` and assign **1536** to it.\n' +
        '- Create another variable `discount_percent` and assign **10** to it.\n' +
        '- Compute the discount by using the formula `(discount_percent / 100) * fee` and assign it to the `discount` variable.\n' +
        '- Subtract the discount from the original fee to get the final amount.\n' +
        '- Print the final amount you have to pay.',
      starterCode:
        '# Replace ___ with your code below\n\n' +
        '# Create the fee and discount_percent variables\n' +
        'fee = 1536\n' +
        'discount_percent = 10\n\n' +
        '# Compute discount and assign it to the discount variable\n' +
        'discount = ___\n\n' +
        '# Compute and print the fee you have to pay\n' +
        'final_amount = ___\n' +
        'print(final_amount)\n',
      expectedOutput: '1382.4',
      validationMode: 'exact',
      solution:
        'fee = 1536\n' +
        'discount_percent = 10\n' +
        'discount = (discount_percent / 100) * fee\n' +
        'final_amount = fee - discount\n' +
        'print(final_amount)',
    },

    // ── 19. Arithmetic Assignment Operators ──────────────────────────────────
    {
      slug: 'arithmetic-assignment-operators',
      title: 'Arithmetic Assignment Operators',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'Consider this program:',
            lt: 'Apsvarstykite šią programą:',
          },
        },
        {
          kind: 'runnable',
          code:
            'total = 10\n' +
            'total = total + 5\n\n' +
            'print(total)    # Output: 15',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In this program, we have added the value of the variable `total` to **5**, and assigned the result back to the `total` variable.',
            lt: 'Šioje programoje pridėjome kintamojo `total` reikšmę prie **5** ir rezultatą priskyrėme atgal kintamajam `total`.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In such case, we can use the arithmetic assignment operators `+=` to simplify code:',
            lt: 'Tokiu atveju galime naudoti aritmetinius priskyrimo operatorius `+=`, kad supaprastintume kodą:',
          },
        },
        {
          kind: 'runnable',
          code:
            'total = 10\n\n' +
            '# Equivalent to: total = total + 5\n' +
            'total += 5\n\n' +
            'print(total)',
        },
        {
          kind: 'visualize',
          caption: {
            en: 'Step through it and watch `total` build up as each operator runs.',
            lt: 'Eikite per kodą žingsnis po žingsnio ir stebėkite, kaip `total` auga, kai veikia kiekvienas operatorius.',
          },
          code:
            'total = 10\n' +
            'total += 5\n' +
            'total += 5\n' +
            'total *= 2\n' +
            'print(total)',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Consider reading **Python Assignment Operator** to explore more examples of arithmetic assignment operators.',
            lt: 'Apsvarstykite galimybę perskaityti **Python priskyrimo operatorių** straipsnį, norėdami rasti daugiau aritmetinių priskyrimo operatorių pavyzdžių.',
          },
        },
      ],
    },

    // ── 20. Recap: Operators ─────────────────────────────────────────────────
    {
      slug: 'recap-operators',
      title: 'Recap: Operators',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "We've wrapped up our lesson on arithmetic operators.",
            lt: 'Baigėme pamoką apie aritmetinius operatorius.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Before we dive into the next lesson, let's take a quick recap of all the arithmetic operators in Python:",
            lt: 'Prieš pereidami prie kitos pamokos, greitai prisiminkime visus Python aritmetinius operatorius:',
          },
        },
        {
          kind: 'figure',
          code:
            'Operator   Syntax     Meaning\n' +
            '+          x + y      Addition\n' +
            '-          x - y      Subtraction\n' +
            '*          x * y      Multiplication\n' +
            '/          x / y      Division\n' +
            '//         x // y     Quotient\n' +
            '%          x % y      Remainder\n' +
            '**         x ** y     Exponentiation',
          output: '',
          caption: {
            en: 'Arithmetic Operators Recap',
            lt: 'Aritmetinių operatorių apžvalga',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Ready to go? Next, we will learn to convert data of one type to another.',
            lt: 'Pasiruošę? Toliau sužinosime, kaip konvertuoti duomenis iš vieno tipo į kitą.',
          },
        },
      ],
    },

    // ── 21. Recap — module completion ────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Arithmetic Operators — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Arithmetic Operators!',
      summary:
        'You can now use Python to add, subtract, multiply, divide, find quotients and remainders, ' +
        "and raise numbers to powers — plus group operations with parentheses and shorten updates with `+=`. " +
        'Next up: a quick **Progress Test** covering Output and Arithmetic Operators.',
      nextModuleTitle: 'Progress Test 3',
    },
  ],
}
