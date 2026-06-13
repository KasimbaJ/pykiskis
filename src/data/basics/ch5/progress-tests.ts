import type { Module, ProgressTestQuestion } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 — Progress Tests + Final Test
//
// Three 25-question banks; progress tests draw 10 per attempt, the Final Test
// draws 15 (5 per bank). Graded /10, ungated, unlimited retakes. Banks 2–3 and
// the Final Test are added as later modules land.
//   Bank 1: Lists + Tuples
//   Bank 2: Strings + Dictionaries
//   Bank 3: Sets + Conversion + range()
// Note: avoid asserting set/dict *print order* in predict-output (use membership
// or len); lists/tuples print in order, so they are safe.
// ─────────────────────────────────────────────────────────────────────────────

// ── Test 1 bank: Lists + Tuples ──────────────────────────────────────────────

export const test1Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'mcq',
    prompt: 'Which brackets create a list?',
    options: [
      { id: 'a', text: 'Square brackets `[ ]`' },
      { id: 'b', text: 'Round brackets `( )`' },
      { id: 'c', text: 'Curly braces `{ }`' },
      { id: 'd', text: 'Angle brackets `< >`' },
    ],
    correctOptionId: 'a',
    explanation: 'Lists use square brackets, e.g. `[1, 2, 3]`. Round brackets make a tuple.',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'fruits = ["a", "b", "c"]\nprint(fruits[0])',
    expectedOutput: 'a',
  },
  {
    id: 'q3',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'nums = [1, 2, 3]\nnums.append(4)\nprint(nums)',
    expectedOutput: '[1, 2, 3, 4]',
  },
  {
    id: 'q4',
    qType: 'mcq',
    prompt: 'What is the index of the first item in a list?',
    options: [
      { id: 'a', text: '`1`' },
      { id: 'b', text: '`0`' },
      { id: 'c', text: '`-1`' },
      { id: 'd', text: 'It depends on the list.' },
    ],
    correctOptionId: 'b',
    explanation: 'Python counts from 0, so the first item is at index 0.',
  },
  {
    id: 'q5',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'nums = [10, 20, 30]\nprint(len(nums))',
    expectedOutput: '3',
  },
  {
    id: 'q6',
    qType: 'fill-in-blank',
    prompt: 'The list method that adds an item to the end is `.___()`.',
    acceptedAnswers: ['append', 'append()'],
    hint: 'Six letters.',
    explanation: '`.append(value)` adds a new item to the end of a list.',
  },
  {
    id: 'q7',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'items = ["x", "y", "z"]\nprint(items[-1])',
    expectedOutput: 'z',
  },
  {
    id: 'q8',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'nums = [1, 2, 3]\nnums[0] = 9\nprint(nums)',
    expectedOutput: '[9, 2, 3]',
  },
  {
    id: 'q9',
    qType: 'mcq',
    prompt: 'Which brackets create a tuple?',
    options: [
      { id: 'a', text: 'Square brackets `[ ]`' },
      { id: 'b', text: 'Round brackets `( )`' },
      { id: 'c', text: 'Curly braces `{ }`' },
      { id: 'd', text: 'Quotation marks `" "`' },
    ],
    correctOptionId: 'b',
    explanation: 'Tuples use round brackets, e.g. `(3, 5)`.',
  },
  {
    id: 'q10',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 't = (5, 6, 7)\nprint(t[1])',
    expectedOutput: '6',
  },
  {
    id: 'q11',
    qType: 'mcq',
    prompt: 'Which one cannot be changed after it is created?',
    options: [
      { id: 'a', text: 'A list' },
      { id: 'b', text: 'A tuple' },
      { id: 'c', text: 'Both' },
      { id: 'd', text: 'Neither' },
    ],
    correctOptionId: 'b',
    explanation: 'A tuple is immutable; a list can be changed.',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'point = (1, 2)\nx, y = point\nprint(x)',
    expectedOutput: '1',
  },
  {
    id: 'q13',
    qType: 'fill-in-blank',
    prompt: 'Counting the positions (indexes) of a list starts at the number ___.',
    acceptedAnswers: ['0', 'zero', 'Zero'],
    hint: 'A single digit.',
    explanation: 'The first item is at index 0.',
  },
  {
    id: 'q14',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'nums = [4, 5, 6]\nnums.remove(5)\nprint(nums)',
    expectedOutput: '[4, 6]',
  },
  {
    id: 'q15',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'nums = [1, 2, 3, 4]\nlast = nums.pop()\nprint(last)',
    expectedOutput: '4',
  },
  {
    id: 'q16',
    qType: 'mcq',
    prompt: 'What does `len([1, 2, 3, 4, 5])` return?',
    options: [
      { id: 'a', text: '`4`' },
      { id: 'b', text: '`5`' },
      { id: 'c', text: '`6`' },
      { id: 'd', text: '`15`' },
    ],
    correctOptionId: 'b',
    explanation: 'The list has 5 items, so `len` is `5`.',
  },
  {
    id: 'q17',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'colors = ["red", "green"]\ncolors.append("blue")\nprint(len(colors))',
    expectedOutput: '3',
  },
  {
    id: 'q18',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'for n in [1, 2, 3]:\n    print(n)',
    expectedOutput: '1\n2\n3',
  },
  {
    id: 'q19',
    qType: 'mcq',
    prompt: 'Can you change an item in a list after creating it?',
    options: [
      { id: 'a', text: 'Yes — lists are changeable (mutable).' },
      { id: 'b', text: 'No — lists are fixed.' },
      { id: 'c', text: 'Only the first item.' },
      { id: 'd', text: 'Only if it is a number.' },
    ],
    correctOptionId: 'a',
    explanation: 'Lists are mutable, so you can change items, add, and remove them.',
  },
  {
    id: 'q20',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 't = (10, 20)\na, b = t\nprint(a + b)',
    expectedOutput: '30',
  },
  {
    id: 'q21',
    qType: 'fill-in-blank',
    prompt: 'A tuple cannot be changed after it is made — the word for this is ___.',
    acceptedAnswers: ['immutable', 'Immutable'],
    hint: 'Starts with "im"; the opposite of "mutable".',
    explanation: 'Tuples are **immutable** — fixed once created.',
  },
  {
    id: 'q22',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'nums = [3, 1, 2]\nprint(nums[1])',
    expectedOutput: '1',
  },
  {
    id: 'q23',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'letters = ["a", "b", "c", "d"]\nprint(letters[-2])',
    expectedOutput: 'c',
  },
  {
    id: 'q24',
    qType: 'mcq',
    prompt: 'Which line creates a tuple?',
    options: [
      { id: 'a', text: '`t = [1, 2, 3]`' },
      { id: 'b', text: '`t = (1, 2, 3)`' },
      { id: 'c', text: '`t = {1, 2, 3}`' },
      { id: 'd', text: '`t = "1, 2, 3"`' },
    ],
    correctOptionId: 'b',
    explanation: 'Round brackets make a tuple. Square brackets make a list.',
  },
  {
    id: 'q25',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'nums = [1, 2]\nnums.append(3)\nnums.append(4)\nprint(nums)',
    expectedOutput: '[1, 2, 3, 4]',
  },
]

// ── Module checkpoint test ───────────────────────────────────────────────────

export const progressTest1Module: Module = {
  slug: 'progress-test-1',
  title: 'Progress Test 1',
  summary: 'Checkpoint: Lists + Tuples.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 1',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Lists** and **Tuples**. Take your time — there is no time ' +
        'limit, and you can retake the test to improve your score.',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [test1Bank],
    },
  ],
}
