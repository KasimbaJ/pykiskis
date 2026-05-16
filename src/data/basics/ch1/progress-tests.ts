import type { Module, ProgressTestQuestion } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 1 — Progress Tests
//
// Four checkpoint tests after the second, fourth, sixth, and eighth modules,
// plus a Final Test after the chapter Recap.  Each module test draws 10 random
// questions from its bank; the Final Test draws 20 — 5 from each of the four
// banks.  Questions mix three types:
//   • mcq             — multiple-choice
//   • predict-output  — read a snippet, type the exact output
//   • fill-in-blank   — single short answer
//
// Every attempt is graded out of 10.  Suggested passing score is 7/10 but
// progression is NOT gated on it.  Learners can retake any test unlimited
// times; a fresh random draw is presented each attempt and the best score
// is kept.
// ─────────────────────────────────────────────────────────────────────────────

// ── Test 1 bank: Get Started + Numbers and Strings ───────────────────────────

export const test1Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'mcq',
    prompt: 'Which function is used to display text on the screen?',
    options: [
      { id: 'a', text: '`display()`' },
      { id: 'b', text: '`print()`' },
      { id: 'c', text: '`show()`' },
      { id: 'd', text: '`echo()`' },
    ],
    correctOptionId: 'b',
    explanation: '`print()` is the built-in function for showing output in Python.',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What does this program print?',
    code: 'print("Hello, World!")',
    expectedOutput: 'Hello, World!',
  },
  {
    id: 'q3',
    qType: 'mcq',
    prompt: 'Which of these is a valid Python string?',
    options: [
      { id: 'a', text: '`hello`' },
      { id: 'b', text: '`"hello"`' },
      { id: 'c', text: '`(hello)`' },
      { id: 'd', text: '`[hello]`' },
    ],
    correctOptionId: 'b',
    explanation: 'Strings in Python must be wrapped in quotation marks — single or double.',
  },
  {
    id: 'q4',
    qType: 'fill-in-blank',
    prompt: 'In programming, text wrapped inside quotation marks is called a ___.',
    acceptedAnswers: ['string', 'String'],
    hint: 'One word, lowercase.',
    explanation: 'Text inside `" "` or `\' \'` is a **string**.',
  },
  {
    id: 'q5',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(5)\nprint(343.44)',
    expectedOutput: '5\n343.44',
  },
  {
    id: 'q6',
    qType: 'mcq',
    prompt: 'Which of these is NOT a floating-point number?',
    options: [
      { id: 'a', text: '`3.14`' },
      { id: 'b', text: '`-2.0`' },
      { id: 'c', text: '`5`' },
      { id: 'd', text: '`0.001`' },
    ],
    correctOptionId: 'c',
    explanation: 'Floating-point numbers contain a decimal point. `5` is an integer.',
  },
  {
    id: 'q7',
    qType: 'mcq',
    prompt: 'Which of the following is NOT a string in Python?',
    options: [
      { id: 'a', text: "`'123'`" },
      { id: 'b', text: '`"Hello"`' },
      { id: 'c', text: '`Python`' },
      { id: 'd', text: '`"52"`' },
    ],
    correctOptionId: 'c',
    explanation: '`Python` has no quotes, so Python does not treat it as a string.',
  },
  {
    id: 'q8',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("Python")\nprint(75)',
    expectedOutput: 'Python\n75',
  },
  {
    id: 'q9',
    qType: 'fill-in-blank',
    prompt: 'Whole numbers without decimal points are called ___ in Python.',
    acceptedAnswers: ['integers', 'integer', 'Integer', 'Integers', 'int', 'ints'],
    hint: 'Plural form of the type.',
    explanation: 'Numbers without decimals are called **integers** (`int`).',
  },
  {
    id: 'q10',
    qType: 'mcq',
    prompt: "What's wrong with this code?\n\n`print(Hey there)`",
    options: [
      { id: 'a', text: 'Nothing — it works fine.' },
      { id: 'b', text: 'The parentheses are missing.' },
      { id: 'c', text: '`Hey there` should be inside quotation marks to be a string.' },
      { id: 'd', text: 'You should use `display()` instead.' },
    ],
    correctOptionId: 'c',
    explanation:
      'Without quotes, Python tries to interpret `Hey there` as code, not text — this raises a `SyntaxError`.',
  },
  {
    id: 'q11',
    qType: 'mcq',
    prompt: 'What does the `print()` function do in Python?',
    options: [
      { id: 'a', text: 'It saves your program to a file.' },
      { id: 'b', text: 'It displays whatever is inside it on the screen.' },
      { id: 'c', text: 'It prints your code on paper.' },
      { id: 'd', text: 'It deletes text from the screen.' },
    ],
    correctOptionId: 'b',
    explanation: 'The `print()` function shows whatever is inside its parentheses on the screen as output.',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What does this program print?',
    code: 'print("Python is fun")',
    expectedOutput: 'Python is fun',
  },
  {
    id: 'q13',
    qType: 'fill-in-blank',
    prompt: 'The `print()` function shows text on the screen **without** the ___ marks around it.',
    acceptedAnswers: ['quotation', 'quote', 'quotation mark', 'quotation marks', 'quote marks', 'quotes'],
    hint: 'The `" "` symbols that wrap a string.',
    explanation: 'Quotation marks tell Python where a string starts and ends, but they are not shown in the output.',
  },
  {
    id: 'q14',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(42)\nprint(7.5)',
    expectedOutput: '42\n7.5',
  },
  {
    id: 'q15',
    qType: 'mcq',
    prompt: 'Which line correctly displays the text `Good morning` on the screen?',
    options: [
      { id: 'a', text: '`print(Good morning)`' },
      { id: 'b', text: '`Print("Good morning")`' },
      { id: 'c', text: '`print("Good morning")`' },
      { id: 'd', text: '`print Good morning`' },
    ],
    correctOptionId: 'c',
    explanation: '`print()` must be lowercase, the text must sit inside the parentheses, and a string must be wrapped in quotation marks.',
  },
  {
    id: 'q16',
    qType: 'predict-output',
    prompt: 'What does this program print?',
    code: "print('Coding')",
    expectedOutput: 'Coding',
  },
  {
    id: 'q17',
    qType: 'fill-in-blank',
    prompt: 'A string can be wrapped in double quotes or in ___ quotes.',
    acceptedAnswers: ['single', 'Single'],
    hint: 'The other kind of quote mark — `\' \'`.',
    explanation: 'A string can use double quotes or single quotes — both work, as long as the opening and closing marks match.',
  },
  {
    id: 'q18',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(100)\nprint("Welcome")\nprint(3.5)',
    expectedOutput: '100\nWelcome\n3.5',
  },
  {
    id: 'q19',
    qType: 'mcq',
    prompt: 'Numbers like `5`, `-11`, and `0` — with no decimal point — are called what in Python?',
    options: [
      { id: 'a', text: 'Strings' },
      { id: 'b', text: 'Integers' },
      { id: 'c', text: 'Floating-point numbers' },
      { id: 'd', text: 'Decimals' },
    ],
    correctOptionId: 'b',
    explanation: 'Whole numbers without a decimal point — positive, negative, or zero — are **integers**.',
  },
  {
    id: 'q20',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(0)\nprint(-8)',
    expectedOutput: '0\n-8',
  },
  {
    id: 'q21',
    qType: 'mcq',
    prompt: 'Which of these is a floating-point number?',
    options: [
      { id: 'a', text: '`12`' },
      { id: 'b', text: '`-9.45`' },
      { id: 'c', text: '`"3.0"`' },
      { id: 'd', text: '`0`' },
    ],
    correctOptionId: 'b',
    explanation: 'A floating-point number contains a decimal point. `-9.45` qualifies; `12` and `0` are integers, and `"3.0"` is a string because it is in quotes.',
  },
  {
    id: 'q22',
    qType: 'fill-in-blank',
    prompt: 'Numbers that contain a decimal point, such as `2.5` and `-9.45`, are called ___ numbers.',
    acceptedAnswers: ['floating-point', 'floating point', 'float', 'floats', 'floating-point number', 'floating point number'],
    hint: 'Think of where the decimal point can "float".',
    explanation: 'Numbers with a decimal point are **floating-point** numbers (often just called floats).',
  },
  {
    id: 'q23',
    qType: 'predict-output',
    prompt: 'What does this program print?',
    code: 'print("Hello")\nprint("World")',
    expectedOutput: 'Hello\nWorld',
  },
  {
    id: 'q24',
    qType: 'mcq',
    prompt: 'Why does printing a number not need quotation marks, while printing text does?',
    options: [
      { id: 'a', text: 'Quotation marks are only for very long text.' },
      { id: 'b', text: 'Python understands numbers directly, but needs quotes to recognise text as a string.' },
      { id: 'c', text: 'Numbers can never be printed at all.' },
      { id: 'd', text: 'Text and numbers both always need quotation marks.' },
    ],
    correctOptionId: 'b',
    explanation:
      'Python recognises numbers on their own, so `print(5)` works. Text must be wrapped in quotes — without them Python tries to read the words as code and raises an error.',
  },
  {
    id: 'q25',
    qType: 'fill-in-blank',
    prompt: 'Each time you use `print()`, Python automatically moves to a new ___ before the next output.',
    acceptedAnswers: ['line', 'Line'],
    hint: 'One word — what each separate `print()` ends up on.',
    explanation: 'Every `print()` call ends by moving to a new line, so consecutive prints appear stacked one per line.',
  },
]

// ── Test 2 bank: Comments + Variables ────────────────────────────────────────

export const test2Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'mcq',
    prompt: 'Which symbol starts a comment in Python?',
    options: [
      { id: 'a', text: '`//`' },
      { id: 'b', text: '`/*`' },
      { id: 'c', text: '`#`' },
      { id: 'd', text: '`--`' },
    ],
    correctOptionId: 'c',
    explanation: 'In Python, comments start with `#`. Everything after `#` on that line is ignored.',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: '# print("Hello World")\nprint(5)',
    expectedOutput: '5',
  },
  {
    id: 'q3',
    qType: 'mcq',
    prompt: 'What is the variable in `age = 25`?',
    options: [
      { id: 'a', text: '`25`' },
      { id: 'b', text: '`age`' },
      { id: 'c', text: '`=`' },
      { id: 'd', text: 'Both `age` and `25`' },
    ],
    correctOptionId: 'b',
    explanation: 'The name on the LEFT of `=` is the variable. The value on the right is what gets stored.',
  },
  {
    id: 'q4',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'greeting = "Hello"\nprint(greeting)',
    expectedOutput: 'Hello',
  },
  {
    id: 'q5',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'greeting = "Hello"\nprint("greeting")',
    expectedOutput: 'greeting',
  },
  {
    id: 'q6',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'var = 50\nvar = "Jack"\nvar = 25.5\nprint(var)',
    expectedOutput: '25.5',
  },
  {
    id: 'q7',
    qType: 'fill-in-blank',
    prompt: 'The symbol used to assign a value to a variable is ___.',
    acceptedAnswers: ['=', 'equals'],
    hint: 'A single character.',
    explanation: 'The assignment operator in Python is `=` (a single equals sign). Note that `==` is a different operator — it checks for equality.',
  },
  {
    id: 'q8',
    qType: 'mcq',
    prompt: 'Which of these is an ILLEGAL variable name in Python?',
    options: [
      { id: 'a', text: '`first_name`' },
      { id: 'b', text: '`firstName`' },
      { id: 'c', text: '`first-name`' },
      { id: 'd', text: '`name1`' },
    ],
    correctOptionId: 'c',
    explanation: 'Hyphens (`-`) are not allowed in variable names. Use underscores (`_`) or camelCase instead.',
  },
  {
    id: 'q9',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'color1 = "blue"\ncolor2 = "pink"\ncolor1 = color2\nprint(color1)',
    expectedOutput: 'pink',
  },
  {
    id: 'q10',
    qType: 'mcq',
    prompt: 'What happens when you `print()` a variable that was never defined?',
    options: [
      { id: 'a', text: 'It prints an empty line.' },
      { id: 'b', text: 'It prints `None`.' },
      { id: 'c', text: 'It prints the variable name as text.' },
      { id: 'd', text: 'It raises a `NameError`.' },
    ],
    correctOptionId: 'd',
    explanation: 'Trying to use an undefined variable raises a `NameError` in Python.',
  },
  {
    id: 'q11',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(7)  # this is the count',
    expectedOutput: '7',
  },
  {
    id: 'q12',
    qType: 'mcq',
    prompt: 'Why do programmers add comments to their code?',
    options: [
      { id: 'a', text: 'To make the program run faster.' },
      { id: 'b', text: 'To explain what the code does, for people reading it later.' },
      { id: 'c', text: 'To display extra text in the output.' },
      { id: 'd', text: 'Because Python will not run without them.' },
    ],
    correctOptionId: 'b',
    explanation: 'Comments are notes for humans — yourself or anyone else reading the code. Python ignores them completely, so they never affect speed or output.',
  },
  {
    id: 'q13',
    qType: 'fill-in-blank',
    prompt: 'Putting a `#` in front of a line of code so Python skips it is called ___ that line out.',
    acceptedAnswers: ['commenting', 'comment'],
    hint: 'It comes from the word "comment".',
    explanation: 'Adding `#` in front of a line turns it into a comment, so Python ignores it. This is called **commenting out** the line.',
  },
  {
    id: 'q14',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: '# print("first")\n# print("second")\nprint("third")',
    expectedOutput: 'third',
  },
  {
    id: 'q15',
    qType: 'mcq',
    prompt: 'In the line `print(50)  # show the score`, which part does Python actually run?',
    options: [
      { id: 'a', text: 'The whole line, including `# show the score`.' },
      { id: 'b', text: 'Only `# show the score`.' },
      { id: 'c', text: 'Only `print(50)`.' },
      { id: 'd', text: 'Nothing — the `#` disables the entire line.' },
    ],
    correctOptionId: 'c',
    explanation: 'Python runs everything before the `#` and ignores everything after it. So `print(50)` runs, and `# show the score` is skipped.',
  },
  {
    id: 'q16',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'price = 19\nprint(price)\nprice = 42\nprint(price)',
    expectedOutput: '19\n42',
  },
  {
    id: 'q17',
    qType: 'fill-in-blank',
    prompt: 'In `score = 100`, the part `100` is called the ___ assigned to the variable.',
    acceptedAnswers: ['value'],
    hint: 'It is what gets stored in the variable.',
    explanation: 'The name on the left of `=` is the variable; the thing on the right that gets stored is the **value**.',
  },
  {
    id: 'q18',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 8\ny = x\nprint(y)',
    expectedOutput: '8',
  },
  {
    id: 'q19',
    qType: 'mcq',
    prompt: 'A **variable** in Python is best described as:',
    options: [
      { id: 'a', text: 'A container used for storing data.' },
      { id: 'b', text: 'A note that Python ignores when running the program.' },
      { id: 'c', text: 'A function that displays text on the screen.' },
      { id: 'd', text: 'Any text wrapped in quotation marks.' },
    ],
    correctOptionId: 'a',
    explanation: 'A variable is a container used for storing data so you can reuse it later in your program.',
  },
  {
    id: 'q20',
    qType: 'fill-in-blank',
    prompt: 'A variable name can contain alphabets, numbers, and ___, but not spaces or hyphens.',
    acceptedAnswers: ['underscores', 'underscore', 'underscores (_)', 'an underscore', '_'],
    hint: 'The `_` character.',
    explanation: 'Variable names may only contain alphabets, numbers, and underscores. So `first_name` is legal, but `first name` and `first-name` are not.',
  },
  {
    id: 'q21',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'count = 3\ncount = count\nprint(count)',
    expectedOutput: '3',
  },
  {
    id: 'q22',
    qType: 'mcq',
    prompt: 'Which of these is a **legal** Python variable name?',
    options: [
      { id: 'a', text: '`2nd_place`' },
      { id: 'b', text: '`my score`' },
      { id: 'c', text: '`total-price`' },
      { id: 'd', text: '`total_price`' },
    ],
    correctOptionId: 'd',
    explanation: 'A variable name cannot start with a digit (`2nd_place`), contain a space (`my score`), or contain a hyphen (`total-price`). `total_price` uses only letters and an underscore, so it is legal.',
  },
  {
    id: 'q23',
    qType: 'mcq',
    prompt: 'After `var = 50` then `var = "Jack"`, what value does `var` hold?',
    options: [
      { id: 'a', text: '`50`' },
      { id: 'b', text: '`"Jack"`' },
      { id: 'c', text: 'Both `50` and `"Jack"`' },
      { id: 'd', text: 'The code results in an error.' },
    ],
    correctOptionId: 'b',
    explanation: 'Each new assignment replaces the previous value. After `var = "Jack"`, the variable holds only its most recent value, `"Jack"`.',
  },
  {
    id: 'q24',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'score = 10\nScore = 99\nprint(score)',
    expectedOutput: '10',
  },
  {
    id: 'q25',
    qType: 'fill-in-blank',
    prompt: 'Python variable names are case-___, so `age` and `Age` are treated as two different variables.',
    acceptedAnswers: ['sensitive', 'case-sensitive'],
    hint: 'The opposite would be ignoring uppercase vs lowercase.',
    explanation: 'Variable names are case-**sensitive**: `age`, `Age`, and `AGE` are three separate variables in Python.',
  },
]

// ── Test 3 bank: Output + Arithmetic Operators ───────────────────────────────

export const test3Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'name = "Alex"\nprint("Hello,", name)',
    expectedOutput: 'Hello, Alex',
  },
  {
    id: 'q2',
    qType: 'fill-in-blank',
    prompt: 'The escape sequence for a newline character in Python is ___.',
    acceptedAnswers: ['\\n'],
    hint: 'Two characters, starts with a backslash.',
    explanation: 'A newline is `\\n` — backslash followed by lowercase n.',
  },
  {
    id: 'q3',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print("London\\nis beautiful")',
    expectedOutput: 'London\nis beautiful',
  },
  {
    id: 'q4',
    qType: 'predict-output',
    prompt: 'What does this f-string print?',
    code: 'name = "Sara"\nage = 22\nprint(f"{name} is {age} years old.")',
    expectedOutput: 'Sara is 22 years old.',
  },
  {
    id: 'q5',
    qType: 'predict-output',
    prompt: 'What is the result?',
    code: 'print(10 / 4)',
    expectedOutput: '2.5',
  },
  {
    id: 'q6',
    qType: 'predict-output',
    prompt: 'What is the result?',
    code: 'print(10 // 3)',
    expectedOutput: '3',
  },
  {
    id: 'q7',
    qType: 'predict-output',
    prompt: 'What is the result?',
    code: 'print(10 % 3)',
    expectedOutput: '1',
  },
  {
    id: 'q8',
    qType: 'predict-output',
    prompt: 'What is the result?',
    code: 'print(2 ** 3)',
    expectedOutput: '8',
  },
  {
    id: 'q9',
    qType: 'mcq',
    prompt: 'What is the value of `10 / 5 * 6`?',
    options: [
      { id: 'a', text: '`0.33`' },
      { id: 'b', text: '`12`' },
      { id: 'c', text: '`12.0`' },
      { id: 'd', text: 'Error' },
    ],
    correctOptionId: 'c',
    explanation:
      '`/` and `*` have the same precedence and evaluate left to right. `10 / 5` is `2.0`, then `2.0 * 6` is `12.0`. (Division always produces a float.)',
  },
  {
    id: 'q10',
    qType: 'mcq',
    prompt: 'Which operator is the shorthand for `total = total + 5`?',
    options: [
      { id: 'a', text: '`total = +5`' },
      { id: 'b', text: '`total += 5`' },
      { id: 'c', text: '`total =+ 5`' },
      { id: 'd', text: '`total ++ 5`' },
    ],
    correctOptionId: 'b',
    explanation: 'The `+=` operator adds the right-hand value to the variable and reassigns it.',
  },
  {
    id: 'q11',
    qType: 'mcq',
    prompt: 'When you pass multiple values to `print()` separated by commas, what does Python put between them in the output?',
    options: [
      { id: 'a', text: 'A comma' },
      { id: 'b', text: 'Nothing — the values are joined directly' },
      { id: 'c', text: 'A single space' },
      { id: 'd', text: 'A newline' },
    ],
    correctOptionId: 'c',
    explanation:
      'The comma is only used to separate the arguments and is not printed. By default, `print()` inserts a single space between each value.',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'score = 90\nprint("Score:", score, "points")',
    expectedOutput: 'Score: 90 points',
  },
  {
    id: 'q13',
    qType: 'fill-in-blank',
    prompt: 'The `//` operator gives you the ___ of a division (the whole-number part), while `%` gives the remainder.',
    acceptedAnswers: ['quotient', 'Quotient'],
    hint: 'Starts with "q" — the result of a division before the remainder.',
    explanation: 'The `//` operator returns the **quotient** — how many whole times the divisor fits into the dividend.',
  },
  {
    id: 'q14',
    qType: 'mcq',
    prompt: 'What does the `%` operator calculate?',
    options: [
      { id: 'a', text: 'A percentage of the number' },
      { id: 'b', text: 'The remainder after division' },
      { id: 'c', text: 'The quotient of a division' },
      { id: 'd', text: 'The number raised to a power' },
    ],
    correctOptionId: 'b',
    explanation:
      'In Python, `%` is the **modulo** operator — it computes the remainder left over when one number is divided by another. For example, `10 % 3` is `1`.',
  },
  {
    id: 'q15',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print("Line one\\nLine two\\nLine three")',
    expectedOutput: 'Line one\nLine two\nLine three',
  },
  {
    id: 'q16',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'first = "Ada"\nlast = "Lovelace"\nprint(first, last)',
    expectedOutput: 'Ada Lovelace',
  },
  {
    id: 'q17',
    qType: 'predict-output',
    prompt: 'What does this f-string print?',
    code: 'price = 4\nqty = 3\nprint(f"Total: {price * qty}")',
    expectedOutput: 'Total: 12',
  },
  {
    id: 'q18',
    qType: 'predict-output',
    prompt: 'What is the result?',
    code: 'print((6 + 4) / 2)',
    expectedOutput: '5.0',
  },
  {
    id: 'q19',
    qType: 'mcq',
    prompt: 'What is the value of `7 + 2 * 3`?',
    options: [
      { id: 'a', text: '`27`' },
      { id: 'b', text: '`13`' },
      { id: 'c', text: '`15`' },
      { id: 'd', text: '`23`' },
    ],
    correctOptionId: 'b',
    explanation:
      'Multiplication is done before addition. So `2 * 3` is computed first, giving `6`, then `7 + 6` gives `13`.',
  },
  {
    id: 'q20',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(8 / 2)',
    expectedOutput: '4.0',
  },
  {
    id: 'q21',
    qType: 'fill-in-blank',
    prompt: 'In Python, the `/` operator always produces a ___ value, even when the division comes out even (for example, `8 / 2` is `4.0`).',
    acceptedAnswers: ['float', 'Float', 'floating-point', 'floating point'],
    hint: 'The number type that has a decimal point.',
    explanation: 'The `/` operator always returns a **float**. That is why `8 / 2` prints `4.0` and not `4`.',
  },
  {
    id: 'q22',
    qType: 'fill-in-blank',
    prompt: 'The rule that decides which operator runs first — for example `*` before `+` — is called operator ___.',
    acceptedAnswers: ['precedence', 'Precedence'],
    hint: 'Another term for the "order of operations".',
    explanation: 'Operator **precedence** is the order Python applies operators: `**` first, then `*`, `/`, `//`, `%`, and finally `+` and `-`.',
  },
  {
    id: 'q23',
    qType: 'fill-in-blank',
    prompt: 'Running `count = 10` then `count += 5` makes `count` equal to ___.',
    acceptedAnswers: ['15'],
    hint: '`+=` adds the value on the right to the variable.',
    explanation: '`count += 5` is shorthand for `count = count + 5`, so `count` becomes `10 + 5`, which is `15`.',
  },
  {
    id: 'q24',
    qType: 'mcq',
    prompt: 'What is wrong with this code?\n\n`age = 20`\n`print("Age = {age}")`',
    options: [
      { id: 'a', text: 'Nothing — it prints `Age = 20`.' },
      { id: 'b', text: 'The `f` before the opening quote is missing, so `{age}` is printed as plain text.' },
      { id: 'c', text: 'You cannot use curly braces inside a string.' },
      { id: 'd', text: 'The variable `age` must be inside the `print()` parentheses.' },
    ],
    correctOptionId: 'b',
    explanation:
      'Without an `f` before the opening quotation mark, the string is an ordinary string. `{age}` is treated as plain text, so the output is literally `Age = {age}`.',
  },
  {
    id: 'q25',
    qType: 'mcq',
    prompt: 'Thanks to the order of operations, which expression equals `20`?',
    options: [
      { id: 'a', text: '`2 + 3 * 4`' },
      { id: 'b', text: '`(2 + 3) * 4`' },
      { id: 'c', text: '`2 * 3 + 4`' },
      { id: 'd', text: '`20 / 4`' },
    ],
    correctOptionId: 'b',
    explanation:
      'Parentheses are evaluated first: `(2 + 3)` is `5`, then `5 * 4` is `20`. Without the parentheses, `2 + 3 * 4` multiplies first and gives `14`.',
  },
]

// ── Test 4 bank: Data Conversion + Get User Input ────────────────────────────

export const test4Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'mcq',
    prompt: 'Which function converts a string like `"42"` to an integer?',
    options: [
      { id: 'a', text: '`str()`' },
      { id: 'b', text: '`int()`' },
      { id: 'c', text: '`float()`' },
      { id: 'd', text: '`number()`' },
    ],
    correctOptionId: 'b',
    explanation: '`int("42")` converts the string to the integer `42`.',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(int("25") + 5)',
    expectedOutput: '30',
  },
  {
    id: 'q3',
    qType: 'mcq',
    prompt: 'What happens if you try `int("Hello")`?',
    options: [
      { id: 'a', text: 'It returns `0`.' },
      { id: 'b', text: 'It returns `None`.' },
      { id: 'c', text: 'It returns the string unchanged.' },
      { id: 'd', text: 'It raises a `ValueError`.' },
    ],
    correctOptionId: 'd',
    explanation:
      '`int()` can only convert strings that look like numbers (e.g. `"42"` or `"-7"`). Other strings cause a `ValueError`.',
  },
  {
    id: 'q4',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(float(10))',
    expectedOutput: '10.0',
  },
  {
    id: 'q5',
    qType: 'predict-output',
    prompt: 'What is the output? (Python promotes the int to float for mixed math.)',
    code: 'print(5 + 2.0)',
    expectedOutput: '7.0',
  },
  {
    id: 'q6',
    qType: 'fill-in-blank',
    prompt: 'The function used to read a line of text from the user is ___.',
    acceptedAnswers: ['input', 'input()', 'Input', 'INPUT'],
    hint: 'A built-in Python function.',
    explanation: '`input()` reads one line from the user. Anything inside `input("prompt")` is shown as a prompt.',
  },
  {
    id: 'q7',
    qType: 'mcq',
    prompt: 'When the user types `42` at an `input()` prompt, what type is the returned value?',
    options: [
      { id: 'a', text: '`int`' },
      { id: 'b', text: '`float`' },
      { id: 'c', text: '`str` (string)' },
      { id: 'd', text: 'It depends on what they typed.' },
    ],
    correctOptionId: 'c',
    explanation:
      '`input()` always returns a **string**, no matter what the user types. Convert it with `int()` or `float()` to do math.',
  },
  {
    id: 'q8',
    qType: 'mcq',
    prompt: 'How do you correctly read a number and double it?',
    options: [
      { id: 'a', text: '`n = input(); print(n * 2)`' },
      { id: 'b', text: '`n = int(input()); print(n * 2)`' },
      { id: 'c', text: '`n = number(input()); print(n * 2)`' },
      { id: 'd', text: '`n = input() * 2; print(n)`' },
    ],
    correctOptionId: 'b',
    explanation:
      'Wrap `input()` with `int()` (or `float()`) so the returned string becomes a number before doing arithmetic.',
  },
  {
    id: 'q9',
    qType: 'predict-output',
    prompt: 'Assume the user enters `7`. What is the output?',
    code: 'n = int(input())\nprint(n * 3)',
    expectedOutput: '21',
    inputValues: ['7'],
  },
  {
    id: 'q10',
    qType: 'fill-in-blank',
    prompt: 'To convert an integer `n` to a string you call ___.',
    acceptedAnswers: ['str(n)', 'str( n )', 'str (n)'],
    hint: 'A function call.',
    explanation: '`str(n)` returns the string representation of the integer `n`.',
  },
  {
    id: 'q11',
    qType: 'mcq',
    prompt: 'Which function converts a number into a **string**?',
    options: [
      { id: 'a', text: '`int()`' },
      { id: 'b', text: '`float()`' },
      { id: 'c', text: '`str()`' },
      { id: 'd', text: '`text()`' },
    ],
    correctOptionId: 'c',
    explanation: '`str()` converts a value of another type into a string. For example, `str(5.5)` gives the string `"5.5"`.',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'price = "19"\nprint(int(price) * 2)',
    expectedOutput: '38',
  },
  {
    id: 'q13',
    qType: 'fill-in-blank',
    prompt: 'Converting a value from one data type to another is called data ___.',
    acceptedAnswers: ['conversion', 'Conversion'],
    hint: 'One word — it is in the name of this module.',
    explanation: 'Changing data from one type to another (for example, string to integer) is called data **conversion**.',
  },
  {
    id: 'q14',
    qType: 'mcq',
    prompt: 'What is the result of `int(3.9)`?',
    options: [
      { id: 'a', text: '`4`' },
      { id: 'b', text: '`3`' },
      { id: 'c', text: '`3.9`' },
      { id: 'd', text: '`Error`' },
    ],
    correctOptionId: 'b',
    explanation: '`int()` does not round — it drops the part after the decimal point. So `int(3.9)` gives `3`.',
  },
  {
    id: 'q15',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'x = int(3.9)\ny = int(8.2)\nprint(x + y)',
    expectedOutput: '11',
  },
  {
    id: 'q16',
    qType: 'mcq',
    prompt: 'Which of these calls raises a `ValueError`?',
    options: [
      { id: 'a', text: '`int("50")`' },
      { id: 'b', text: '`int(7.8)`' },
      { id: 'c', text: '`int("hello")`' },
      { id: 'd', text: '`float("3.5")`' },
    ],
    correctOptionId: 'c',
    explanation: '`int()` can only convert a string that looks like a whole number. `"hello"` contains letters, so it raises a `ValueError`.',
  },
  {
    id: 'q17',
    qType: 'fill-in-blank',
    prompt: 'Trying to run `int("3.5")` raises an error called a ___.',
    acceptedAnswers: ['ValueError', 'value error', 'valueerror'],
    hint: 'Two words joined together — the same error you get from `int("Howdy!")`.',
    explanation: '`int()` cannot convert the string `"3.5"` (the `.5` part is not a whole number), so Python raises a `ValueError`.',
  },
  {
    id: 'q18',
    qType: 'mcq',
    prompt: 'What is the data type of the result of `5 + 2.0`?',
    options: [
      { id: 'a', text: 'Integer' },
      { id: 'b', text: 'Float' },
      { id: 'c', text: 'String' },
      { id: 'd', text: 'It causes an error' },
    ],
    correctOptionId: 'b',
    explanation: 'When you mix an integer and a float, Python promotes the integer to a float first. So `5 + 2.0` gives the float `7.0`.',
  },
  {
    id: 'q19',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'result = 10 + 4.5\nprint(result)',
    expectedOutput: '14.5',
  },
  {
    id: 'q20',
    qType: 'fill-in-blank',
    prompt: 'No matter what the user types, the `input()` function always returns a value of type ___.',
    acceptedAnswers: ['string', 'String', 'str'],
    hint: 'The same type as text in quotation marks.',
    explanation: '`input()` always returns a **string** — even when the user types digits like `42`, you get the string `"42"`.',
  },
  {
    id: 'q21',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'age = 30\nmessage = "Age: " + str(age)\nprint(message)',
    expectedOutput: 'Age: 30',
  },
  {
    id: 'q22',
    qType: 'mcq',
    prompt: 'What does the text inside `input("Enter your name: ")` do?',
    options: [
      { id: 'a', text: 'It is the value stored in the variable.' },
      { id: 'b', text: 'It is a prompt message shown to the user before they type.' },
      { id: 'c', text: 'It converts the input into a number.' },
      { id: 'd', text: 'It is just a comment and is ignored.' },
    ],
    correctOptionId: 'b',
    explanation: 'The text inside `input()` is an optional **prompt** — it is displayed to the user so they know what to enter. The value they type is what gets returned.',
  },
  {
    id: 'q23',
    qType: 'fill-in-blank',
    prompt: 'To read a number from the user and use it in arithmetic, wrap `input()` inside the ___ function (so the string becomes a whole number).',
    acceptedAnswers: ['int', 'int()'],
    hint: 'The function that produces an integer.',
    explanation: 'Writing `int(input())` converts the string returned by `input()` into an integer, so you can do math with it.',
  },
  {
    id: 'q24',
    qType: 'predict-output',
    prompt: 'Assume the user enters `8`. What is the output?',
    code: 'num = input()\nprint(num + num)',
    expectedOutput: '88',
    inputValues: ['8'],
  },
  {
    id: 'q25',
    qType: 'predict-output',
    prompt: 'Assume the user enters `3`. What is the output?',
    code: 'price = float(input())\nprint(price + 0.5)',
    expectedOutput: '3.5',
    inputValues: ['3'],
  },
]

// ── Module checkpoint tests ──────────────────────────────────────────────────

export const progressTest1Module: Module = {
  slug: 'progress-test-1',
  title: 'Progress Test 1',
  summary: 'Checkpoint: Get Started + Numbers and Strings.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 1',
      type: 'progress-test',
      intro:
        'Checkpoint covering everything from **Get Started** and **Numbers and Strings**. ' +
        "Take your time, there's no time limit — you can retake the test to improve your score.",
      passingScore: 7,
      presentCount: 10,
      questionBanks: [test1Bank],
    },
  ],
}

export const progressTest2Module: Module = {
  slug: 'progress-test-2',
  title: 'Progress Test 2',
  summary: 'Checkpoint: Comments + Variables.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 2',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Comments** and **Variables**. ' +
        'Retake as many times as you like to improve your grade.',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [test2Bank],
    },
  ],
}

export const progressTest3Module: Module = {
  slug: 'progress-test-3',
  title: 'Progress Test 3',
  summary: 'Checkpoint: Output + Arithmetic Operators.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 3',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Output** and **Arithmetic Operators**. ' +
        'Pay close attention to operator precedence and integer vs float results.',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [test3Bank],
    },
  ],
}

export const progressTest4Module: Module = {
  slug: 'progress-test-4',
  title: 'Progress Test 4',
  summary: 'Checkpoint: Data Conversion + Get User Input.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 4',
      type: 'progress-test',
      intro:
        'Final checkpoint of Chapter 1 — covering **Data Conversion** and **Get User Input**. ' +
        'Solid on these two and you are ready for the Introduction Examples!',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [test4Bank],
    },
  ],
}

// ── Chapter 1 Final Test ─────────────────────────────────────────────────────
//
// Scheduled after the Recap module.  Draws 20 questions — 5 from each of the
// four banks — so every Chapter 1 topic is represented.

export const finalTestModule: Module = {
  slug: 'final-test',
  title: 'Final Test',
  summary: 'Chapter 1 capstone — 20 questions across every topic.',
  lessons: [
    {
      slug: 'test',
      title: 'Chapter 1 Final Test',
      type: 'progress-test',
      intro:
        'The Chapter 1 Final Test — 20 questions drawn from everything you ' +
        'have learned: data types, variables, output, operators, data ' +
        'conversion, and user input. Graded out of 10. Retake as many ' +
        'times as you like to improve your score.',
      passingScore: 7,
      presentCount: 20,
      questionBanks: [test1Bank, test2Bank, test3Bank, test4Bank],
    },
  ],
}
