import type { Module, ProgressTestQuestion } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 4 — Progress Test + Final Test
//
// A single 25-question bank covering Functions + Scope. The Progress Test draws
// 10 per attempt; the Final Test draws 15. Graded /10, ungated, unlimited
// retakes. Question types: mcq, predict-output, fill-in-blank.
// ─────────────────────────────────────────────────────────────────────────────

export const functionsBank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'mcq',
    prompt: 'Which keyword defines a function in Python?',
    options: [
      { id: 'a', text: '`func`' },
      { id: 'b', text: '`def`' },
      { id: 'c', text: '`function`' },
      { id: 'd', text: '`define`' },
    ],
    correctOptionId: 'b',
    explanation: 'Functions are defined with the `def` keyword, followed by a name, parentheses, and a colon.',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def greet():\n    print("Hi")\n\ngreet()',
    expectedOutput: 'Hi',
  },
  {
    id: 'q3',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def add(a, b):\n    return a + b\n\nprint(add(2, 3))',
    expectedOutput: '5',
  },
  {
    id: 'q4',
    qType: 'mcq',
    prompt: 'The value you pass to a function when calling it is called a(n):',
    options: [
      { id: 'a', text: 'parameter' },
      { id: 'b', text: 'argument' },
      { id: 'c', text: 'keyword' },
      { id: 'd', text: 'return' },
    ],
    correctOptionId: 'b',
    explanation: 'The value passed in a call is an **argument**; the placeholder name in the definition is a **parameter**.',
  },
  {
    id: 'q5',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def f(x):\n    return x * 2\n\nprint(f(5))',
    expectedOutput: '10',
  },
  {
    id: 'q6',
    qType: 'fill-in-blank',
    prompt: 'The keyword that sends a value back from a function is ___.',
    acceptedAnswers: ['return', 'Return'],
    hint: 'Six letters.',
    explanation: '`return` hands a value back to the caller and ends the function.',
  },
  {
    id: 'q7',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def greet(name):\n    print("Hello", name)\n\ngreet("Sam")',
    expectedOutput: 'Hello Sam',
  },
  {
    id: 'q8',
    qType: 'mcq',
    prompt: 'What is the difference between `return` and `print` in a function?',
    options: [
      { id: 'a', text: 'They are exactly the same.' },
      { id: 'b', text: '`return` hands a value back to the caller; `print` just displays it.' },
      { id: 'c', text: '`print` ends the function; `return` does not.' },
      { id: 'd', text: '`return` can only be used once per program.' },
    ],
    correctOptionId: 'b',
    explanation: '`return` produces a value the caller can use; `print` only shows something on screen.',
  },
  {
    id: 'q9',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def square(n):\n    return n * n\n\nprint(square(3))',
    expectedOutput: '9',
  },
  {
    id: 'q10',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def f():\n    print("a")\n    print("b")\n\nf()',
    expectedOutput: 'a\nb',
  },
  {
    id: 'q11',
    qType: 'mcq',
    prompt: 'A variable created inside a function is called a:',
    options: [
      { id: 'a', text: 'global variable' },
      { id: 'b', text: 'local variable' },
      { id: 'c', text: 'parameter' },
      { id: 'd', text: 'constant' },
    ],
    correctOptionId: 'b',
    explanation: 'Variables created inside a function are **local** — they exist only while the function runs.',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 5\n\ndef f():\n    x = 9\n    print(x)\n\nf()\nprint(x)',
    expectedOutput: '9\n5',
  },
  {
    id: 'q13',
    qType: 'fill-in-blank',
    prompt: 'Variables defined inside a function are called ___ variables.',
    acceptedAnswers: ['local', 'Local'],
    hint: 'The opposite of "global".',
    explanation: 'They are **local** variables — visible only inside the function.',
  },
  {
    id: 'q14',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def add(a, b):\n    return a + b\n\nprint(add(1, 2) + add(3, 4))',
    expectedOutput: '10',
  },
  {
    id: 'q15',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def greet():\n    return "Hi"\n\nprint(greet())',
    expectedOutput: 'Hi',
  },
  {
    id: 'q16',
    qType: 'mcq',
    prompt: 'Once a function is defined, how many times can you call it?',
    options: [
      { id: 'a', text: 'Only once.' },
      { id: 'b', text: 'Exactly twice.' },
      { id: 'c', text: 'As many times as you like.' },
      { id: 'd', text: 'Only if it returns a value.' },
    ],
    correctOptionId: 'c',
    explanation: 'That is the whole point of a function — define it once, call it as often as you need.',
  },
  {
    id: 'q17',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def double(n):\n    return n * 2\n\nprint(double(double(3)))',
    expectedOutput: '12',
  },
  {
    id: 'q18',
    qType: 'fill-in-blank',
    prompt: 'The placeholder names listed in a function definition\'s parentheses are called ___.',
    acceptedAnswers: ['parameters', 'parameter', 'Parameters'],
    hint: 'Arguments fill these in.',
    explanation: 'They are **parameters**; the values supplied when calling are arguments.',
  },
  {
    id: 'q19',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'greeting = "Hey"\n\ndef show():\n    print(greeting)\n\nshow()',
    expectedOutput: 'Hey',
  },
  {
    id: 'q20',
    qType: 'mcq',
    prompt: 'Can a function read a global variable defined outside it?',
    options: [
      { id: 'a', text: 'Yes — a function can read variables from the outer scope.' },
      { id: 'b', text: 'No — functions are completely sealed off.' },
      { id: 'c', text: 'Only if the variable is a number.' },
      { id: 'd', text: 'Only inside a loop.' },
    ],
    correctOptionId: 'a',
    explanation: 'A function can **read** a global variable. (Assigning a value inside, though, creates a new local.)',
  },
  {
    id: 'q21',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def f(a, b, c):\n    return a + b + c\n\nprint(f(1, 2, 3))',
    expectedOutput: '6',
  },
  {
    id: 'q22',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def f(n):\n    return n + 1\n\nx = f(10)\nprint(x)',
    expectedOutput: '11',
  },
  {
    id: 'q23',
    qType: 'mcq',
    prompt: 'What do the parentheses `()` after a function name do when you write `run()`?',
    options: [
      { id: 'a', text: 'They define the function.' },
      { id: 'b', text: 'They call (run) the function.' },
      { id: 'c', text: 'They delete the function.' },
      { id: 'd', text: 'Nothing — they are optional.' },
    ],
    correctOptionId: 'b',
    explanation: 'Writing the name followed by `()` **calls** the function, running its body.',
  },
  {
    id: 'q24',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def area(w, h):\n    return w * h\n\nprint(area(3, 5))',
    expectedOutput: '15',
  },
  {
    id: 'q25',
    qType: 'fill-in-blank',
    prompt: 'To call a function named `run`, you write its name followed by ___.',
    acceptedAnswers: ['()', 'run()', 'parentheses', 'brackets'],
    hint: 'Two characters.',
    explanation: 'Calling a function uses parentheses: `run()`.',
  },
]

// ── Module checkpoint test ───────────────────────────────────────────────────

export const progressTest1Module: Module = {
  slug: 'progress-test-1',
  title: 'Progress Test 1',
  summary: 'Checkpoint: Python Functions + Local Variables.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 1',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Python Functions** and **Local Variables** (scope). ' +
        'Take your time — there is no time limit, and you can retake the test to improve your score.',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [functionsBank],
    },
  ],
}

// ── Chapter 4 Final Test ─────────────────────────────────────────────────────

export const finalTestModule: Module = {
  slug: 'final-test',
  title: 'Final Test',
  summary: 'Chapter 4 capstone — 15 questions on functions and scope.',
  lessons: [
    {
      slug: 'test',
      title: 'Chapter 4 Final Test',
      type: 'progress-test',
      intro:
        'The Chapter 4 Final Test — 15 questions drawn from everything you learned about ' +
        'defining functions, parameters and arguments, return values, and scope. Graded out ' +
        'of 10. Retake as many times as you like to improve your score.',
      passingScore: 7,
      presentCount: 15,
      questionBanks: [functionsBank],
    },
  ],
}
