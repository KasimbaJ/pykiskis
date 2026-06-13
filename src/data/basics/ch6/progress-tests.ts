import type { Module, ProgressTestQuestion } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 6 — Progress Test + Final Test
//
// One 25-question bank covering Using Modules + Nested Loops + Miscellaneous.
// Progress Test draws 10; Final Test draws 15. Graded /10, ungated, retakeable.
// All predict-output is deterministic (math, not random).
// ─────────────────────────────────────────────────────────────────────────────

export const completingBank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'mcq',
    prompt: 'What must you do before using the `math` module?',
    options: [
      { id: 'a', text: 'Nothing — it is always available.' },
      { id: 'b', text: '`import math` first.' },
      { id: 'c', text: 'Define it with `def`.' },
      { id: 'd', text: 'Download it from the internet.' },
    ],
    correctOptionId: 'b',
    explanation: 'You `import` a module before using its functions.',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'import math\nprint(math.sqrt(36))',
    expectedOutput: '6.0',
  },
  {
    id: 'q3',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'import math\nprint(math.floor(4.8))',
    expectedOutput: '4',
  },
  {
    id: 'q4',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'import math\nprint(math.ceil(4.1))',
    expectedOutput: '5',
  },
  {
    id: 'q5',
    qType: 'mcq',
    prompt: 'What does `random.randint(1, 6)` return?',
    options: [
      { id: 'a', text: 'Always 1.' },
      { id: 'b', text: 'A random whole number from 1 to 6 (inclusive).' },
      { id: 'c', text: 'A random decimal between 1 and 6.' },
      { id: 'd', text: 'The list `[1, 6]`.' },
    ],
    correctOptionId: 'b',
    explanation: '`randint(a, b)` gives a random whole number between `a` and `b`, both included.',
  },
  {
    id: 'q6',
    qType: 'fill-in-blank',
    prompt: 'To bring in only `sqrt` from the math module, you write: `from math ___ sqrt`.',
    acceptedAnswers: ['import', 'Import'],
    hint: 'Six letters.',
    explanation: '`from math import sqrt` imports just that one function.',
  },
  {
    id: 'q7',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 5\nx += 3\nprint(x)',
    expectedOutput: '8',
  },
  {
    id: 'q8',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 20\nx -= 5\nprint(x)',
    expectedOutput: '15',
  },
  {
    id: 'q9',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 4\nx *= 2\nprint(x)',
    expectedOutput: '8',
  },
  {
    id: 'q10',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 10\nx /= 4\nprint(x)',
    expectedOutput: '2.5',
  },
  {
    id: 'q11',
    qType: 'mcq',
    prompt: 'The line `x += 1` is the same as:',
    options: [
      { id: 'a', text: '`x = 1`' },
      { id: 'b', text: '`x = x + 1`' },
      { id: 'c', text: '`x = x - 1`' },
      { id: 'd', text: '`x == 1`' },
    ],
    correctOptionId: 'b',
    explanation: '`+=` adds to the variable: `x += 1` means `x = x + 1`.',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'def f():\n    print("hi")\n\nprint(f())',
    expectedOutput: 'hi\nNone',
  },
  {
    id: 'q13',
    qType: 'mcq',
    prompt: 'What does a function with no `return` statement give back?',
    options: [
      { id: 'a', text: '`0`' },
      { id: 'b', text: '`None`' },
      { id: 'c', text: 'An empty string' },
      { id: 'd', text: 'An error' },
    ],
    correctOptionId: 'b',
    explanation: 'With no `return`, a function automatically returns `None`.',
  },
  {
    id: 'q14',
    qType: 'fill-in-blank',
    prompt: "Python's special value meaning \"no value\" is ___.",
    acceptedAnswers: ['None', 'none'],
    hint: 'Capital N; four letters.',
    explanation: '`None` represents the absence of a value.',
  },
  {
    id: 'q15',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(bool(0))',
    expectedOutput: 'False',
  },
  {
    id: 'q16',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(bool("a"))',
    expectedOutput: 'True',
  },
  {
    id: 'q17',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(bool(""))',
    expectedOutput: 'False',
  },
  {
    id: 'q18',
    qType: 'mcq',
    prompt: 'Which of these is **falsy**?',
    options: [
      { id: 'a', text: '`0`' },
      { id: 'b', text: '`5`' },
      { id: 'c', text: '`"hi"`' },
      { id: 'd', text: '`-1`' },
    ],
    correctOptionId: 'a',
    explanation: '`0` is falsy. Non-zero numbers and non-empty strings are truthy.',
  },
  {
    id: 'q19',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'for i in range(2):\n    for j in range(2):\n        print(i + j)',
    expectedOutput: '0\n1\n1\n2',
  },
  {
    id: 'q20',
    qType: 'mcq',
    prompt: 'In a nested loop, how often does the inner loop run per pass of the outer loop?',
    options: [
      { id: 'a', text: 'Once.' },
      { id: 'b', text: 'Completely — all its iterations.' },
      { id: 'c', text: 'Never.' },
      { id: 'd', text: 'Only on the last outer pass.' },
    ],
    correctOptionId: 'b',
    explanation: 'The inner loop runs from start to finish on every pass of the outer loop.',
  },
  {
    id: 'q21',
    qType: 'fill-in-blank',
    prompt: 'The keyword for a body that does nothing (a placeholder) is ___.',
    acceptedAnswers: ['pass', 'Pass'],
    hint: 'Four letters.',
    explanation: '`pass` is a do-nothing placeholder that satisfies Python\'s need for a body.',
  },
  {
    id: 'q22',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'for i in range(3):\n    pass\nprint("done")',
    expectedOutput: 'done',
  },
  {
    id: 'q23',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)',
    expectedOutput: '6',
  },
  {
    id: 'q24',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'for i in range(3):\n    print(i, end="-")\nprint()',
    expectedOutput: '0-1-2-',
  },
  {
    id: 'q25',
    qType: 'mcq',
    prompt: 'What does the `end=" "` argument to `print()` do?',
    options: [
      { id: 'a', text: 'Ends the program.' },
      { id: 'b', text: 'Prints a space instead of moving to a new line afterwards.' },
      { id: 'c', text: 'Adds a space before the value.' },
      { id: 'd', text: 'Nothing.' },
    ],
    correctOptionId: 'b',
    explanation: '`end=" "` replaces the usual newline with a space, keeping output on the same line.',
  },
]

// ── Module checkpoint test ───────────────────────────────────────────────────

export const progressTest1Module: Module = {
  slug: 'progress-test-1',
  title: 'Progress Test 1',
  summary: 'Checkpoint: Modules, Nested Loops, and Miscellaneous.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 1',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Using Modules**, **Nested Loops**, and the **Miscellaneous** ' +
        'concepts. Retake as many times as you like to improve your score.',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [completingBank],
    },
  ],
}

// ── Chapter 6 Final Test ─────────────────────────────────────────────────────

export const finalTestModule: Module = {
  slug: 'final-test',
  title: 'Final Test',
  summary: 'Chapter 6 capstone — 15 questions completing the basics.',
  lessons: [
    {
      slug: 'test',
      title: 'Chapter 6 Final Test',
      type: 'progress-test',
      intro:
        'The Chapter 6 Final Test — 15 questions on modules, nested loops, assignment ' +
        'operators, None, truthiness, and pass. Graded out of 10. Retake as many times as you ' +
        'like to improve your score.',
      passingScore: 7,
      presentCount: 15,
      questionBanks: [completingBank],
    },
  ],
}
