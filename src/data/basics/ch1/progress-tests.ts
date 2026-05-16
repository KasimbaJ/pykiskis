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
