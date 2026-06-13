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

// ── Test 2 bank: Strings + Dictionaries ──────────────────────────────────────

export const test2Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'word = "hello"\nprint(word[0])',
    expectedOutput: 'h',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("cat"[1])',
    expectedOutput: 'a',
  },
  {
    id: 'q3',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'word = "Python"\nprint(word[0:3])',
    expectedOutput: 'Pyt',
  },
  {
    id: 'q4',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(len("hello"))',
    expectedOutput: '5',
  },
  {
    id: 'q5',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("abc".upper())',
    expectedOutput: 'ABC',
  },
  {
    id: 'q6',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("ABC".lower())',
    expectedOutput: 'abc',
  },
  {
    id: 'q7',
    qType: 'mcq',
    prompt: 'How do you take a slice of a string from index 1 up to (not including) 4?',
    options: [
      { id: 'a', text: '`word[1, 4]`' },
      { id: 'b', text: '`word[1:4]`' },
      { id: 'c', text: '`word(1:4)`' },
      { id: 'd', text: '`word.slice(1, 4)`' },
    ],
    correctOptionId: 'b',
    explanation: 'Slicing uses `[start:stop]`, including `start` and stopping before `stop`.',
  },
  {
    id: 'q8',
    qType: 'fill-in-blank',
    prompt: 'The string method that breaks text into a list of words is `.___()`.',
    acceptedAnswers: ['split', 'split()'],
    hint: 'Five letters.',
    explanation: '`.split()` with no argument splits on spaces, returning a list of words.',
  },
  {
    id: 'q9',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("a b c".split())',
    expectedOutput: "['a', 'b', 'c']",
  },
  {
    id: 'q10',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("hello".replace("l", "L"))',
    expectedOutput: 'heLLo',
  },
  {
    id: 'q11',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'word = "Python"\nprint(word[-1])',
    expectedOutput: 'n',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'for c in "hi":\n    print(c)',
    expectedOutput: 'h\ni',
  },
  {
    id: 'q13',
    qType: 'mcq',
    prompt: 'Which brackets create a dictionary?',
    options: [
      { id: 'a', text: 'Square brackets `[ ]`' },
      { id: 'b', text: 'Round brackets `( )`' },
      { id: 'c', text: 'Curly braces `{ }`' },
      { id: 'd', text: 'Angle brackets `< >`' },
    ],
    correctOptionId: 'c',
    explanation: 'Dictionaries use curly braces with `key: value` pairs.',
  },
  {
    id: 'q14',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'd = {"a": 1, "b": 2}\nprint(d["a"])',
    expectedOutput: '1',
  },
  {
    id: 'q15',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'd = {"x": 5}\nd["y"] = 9\nprint(d["y"])',
    expectedOutput: '9',
  },
  {
    id: 'q16',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'd = {"a": 1, "b": 2}\nprint(len(d))',
    expectedOutput: '2',
  },
  {
    id: 'q17',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'd = {"a": 1}\nprint("a" in d)',
    expectedOutput: 'True',
  },
  {
    id: 'q18',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'd = {"a": 1, "b": 2}\nprint("c" in d)',
    expectedOutput: 'False',
  },
  {
    id: 'q19',
    qType: 'fill-in-blank',
    prompt: 'In a dictionary, each entry pairs a key with a ___.',
    acceptedAnswers: ['value', 'Value'],
    hint: 'Key and ___.',
    explanation: 'Each dictionary entry is a `key: value` pair.',
  },
  {
    id: 'q20',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'd = {"a": 1}\nd["a"] = 10\nprint(d["a"])',
    expectedOutput: '10',
  },
  {
    id: 'q21',
    qType: 'mcq',
    prompt: 'What happens if you look up a key that is not in the dictionary?',
    options: [
      { id: 'a', text: 'It returns `0`.' },
      { id: 'b', text: 'It returns `None`.' },
      { id: 'c', text: 'It raises a `KeyError`.' },
      { id: 'd', text: 'It adds the key automatically.' },
    ],
    correctOptionId: 'c',
    explanation: 'Accessing a missing key raises a `KeyError`. Use `in` first to check.',
  },
  {
    id: 'q22',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(len("  hi  ".strip()))',
    expectedOutput: '2',
  },
  {
    id: 'q23',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'word = "programming"\nprint(word[0:4])',
    expectedOutput: 'prog',
  },
  {
    id: 'q24',
    qType: 'mcq',
    prompt: 'When you loop `for k in my_dict:`, what does `k` become each time?',
    options: [
      { id: 'a', text: 'Each value in the dictionary.' },
      { id: 'b', text: 'Each key in the dictionary.' },
      { id: 'c', text: 'Each key/value pair as a tuple.' },
      { id: 'd', text: 'The length of the dictionary.' },
    ],
    correctOptionId: 'b',
    explanation: 'Looping over a dictionary yields its keys. Use `.items()` to get key and value together.',
  },
  {
    id: 'q25',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("Hello World".split())',
    expectedOutput: "['Hello', 'World']",
  },
]

// ── Test 3 bank: Sets + Conversion + range() ─────────────────────────────────

export const test3Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(len({1, 2, 2, 3}))',
    expectedOutput: '3',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("a" in {"a", "b"})',
    expectedOutput: 'True',
  },
  {
    id: 'q3',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 's = {1, 2, 3}\ns.add(4)\nprint(len(s))',
    expectedOutput: '4',
  },
  {
    id: 'q4',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(len(set([1, 1, 2, 2, 3])))',
    expectedOutput: '3',
  },
  {
    id: 'q5',
    qType: 'mcq',
    prompt: 'What is special about a set?',
    options: [
      { id: 'a', text: 'It keeps items in sorted order.' },
      { id: 'b', text: 'It stores only unique items (no duplicates).' },
      { id: 'c', text: 'It can be indexed like a list.' },
      { id: 'd', text: 'It stores key/value pairs.' },
    ],
    correctOptionId: 'b',
    explanation: 'A set holds only unique items and is unordered.',
  },
  {
    id: 'q6',
    qType: 'fill-in-blank',
    prompt: 'To remove duplicates from a list, convert it to a ___.',
    acceptedAnswers: ['set', 'Set', 'set()'],
    hint: 'Three letters; uses curly braces.',
    explanation: 'Converting to a `set` drops duplicate values.',
  },
  {
    id: 'q7',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("-".join(["a", "b", "c"]))',
    expectedOutput: 'a-b-c',
  },
  {
    id: 'q8',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print("x y z".split())',
    expectedOutput: "['x', 'y', 'z']",
  },
  {
    id: 'q9',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(list(range(4)))',
    expectedOutput: '[0, 1, 2, 3]',
  },
  {
    id: 'q10',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(list(range(2, 6)))',
    expectedOutput: '[2, 3, 4, 5]',
  },
  {
    id: 'q11',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(list(range(0, 10, 2)))',
    expectedOutput: '[0, 2, 4, 6, 8]',
  },
  {
    id: 'q12',
    qType: 'mcq',
    prompt: 'Which numbers does `range(1, 5)` produce?',
    options: [
      { id: 'a', text: '`1, 2, 3, 4, 5`' },
      { id: 'b', text: '`1, 2, 3, 4`' },
      { id: 'c', text: '`0, 1, 2, 3, 4`' },
      { id: 'd', text: '`1, 5`' },
    ],
    correctOptionId: 'b',
    explanation: '`range(1, 5)` starts at 1 and stops before 5: `1, 2, 3, 4`.',
  },
  {
    id: 'q13',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(list(range(3, 0, -1)))',
    expectedOutput: '[3, 2, 1]',
  },
  {
    id: 'q14',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(tuple([1, 2, 3]))',
    expectedOutput: '(1, 2, 3)',
  },
  {
    id: 'q15',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(list((4, 5, 6)))',
    expectedOutput: '[4, 5, 6]',
  },
  {
    id: 'q16',
    qType: 'fill-in-blank',
    prompt: 'The string method that breaks text into a list is `.___()`.',
    acceptedAnswers: ['split', 'split()'],
    hint: 'Five letters.',
    explanation: '`.split()` turns a string into a list of pieces.',
  },
  {
    id: 'q17',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(str(5) + "!")',
    expectedOutput: '5!',
  },
  {
    id: 'q18',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(int("7") + 3)',
    expectedOutput: '10',
  },
  {
    id: 'q19',
    qType: 'mcq',
    prompt: 'Which conversion removes duplicate values from a collection?',
    options: [
      { id: 'a', text: '`list()`' },
      { id: 'b', text: '`tuple()`' },
      { id: 'c', text: '`set()`' },
      { id: 'd', text: '`str()`' },
    ],
    correctOptionId: 'c',
    explanation: '`set()` keeps only unique items, so it removes duplicates.',
  },
  {
    id: 'q20',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 's = {1, 2, 3}\nprint(2 in s)',
    expectedOutput: 'True',
  },
  {
    id: 'q21',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 's = {1, 2, 3}\nprint(5 in s)',
    expectedOutput: 'False',
  },
  {
    id: 'q22',
    qType: 'mcq',
    prompt: 'Which numbers does `range(0, 6, 2)` produce?',
    options: [
      { id: 'a', text: '`0, 2, 4, 6`' },
      { id: 'b', text: '`0, 2, 4`' },
      { id: 'c', text: '`2, 4, 6`' },
      { id: 'd', text: '`0, 1, 2, 3, 4, 5`' },
    ],
    correctOptionId: 'b',
    explanation: 'Step 2 from 0, stopping before 6: `0, 2, 4`.',
  },
  {
    id: 'q23',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(len(range(10)))',
    expectedOutput: '10',
  },
  {
    id: 'q24',
    qType: 'fill-in-blank',
    prompt: 'With one argument, `range(5)` starts counting at the number ___.',
    acceptedAnswers: ['0', 'zero', 'Zero'],
    hint: 'A single digit.',
    explanation: 'With one argument, a range starts at 0.',
  },
  {
    id: 'q25',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'a = {1, 2}\nb = {2, 3}\nprint(len(a | b))',
    expectedOutput: '3',
  },
]

// ── Module checkpoint tests ──────────────────────────────────────────────────

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

export const progressTest2Module: Module = {
  slug: 'progress-test-2',
  title: 'Progress Test 2',
  summary: 'Checkpoint: Strings + Dictionaries.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 2',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Strings** and **Dictionaries**. Retake as many times as you ' +
        'like to improve your score.',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [test2Bank],
    },
  ],
}

export const progressTest3Module: Module = {
  slug: 'progress-test-3',
  title: 'Progress Test 3',
  summary: 'Checkpoint: Sets + Conversion + range().',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 3',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Sets**, **Conversion**, and the **range() function**. ' +
        'Retake as many times as you like to improve your score.',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [test3Bank],
    },
  ],
}

// ── Chapter 5 Final Test ─────────────────────────────────────────────────────

export const finalTestModule: Module = {
  slug: 'final-test',
  title: 'Final Test',
  summary: 'Chapter 5 capstone — 15 questions across every data type.',
  lessons: [
    {
      slug: 'test',
      title: 'Chapter 5 Final Test',
      type: 'progress-test',
      intro:
        'The Chapter 5 Final Test — 15 questions drawn from everything you learned: lists, ' +
        'tuples, strings, dictionaries, sets, conversion, and range(). Graded out of 10. ' +
        'Retake as many times as you like to improve your score.',
      passingScore: 7,
      presentCount: 15,
      questionBanks: [test1Bank, test2Bank, test3Bank],
    },
  ],
}
