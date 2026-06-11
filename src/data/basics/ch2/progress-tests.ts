import type { Module, ProgressTestQuestion } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 2 — Progress Tests
//
// Checkpoint tests after the second, fifth, and eighth modules, plus a Final
// Test after the chapter Recap.  Each module test draws 10 random questions
// from its bank; the Final Test draws 15 — 5 from each of the three banks.
// Questions mix three types:
//   • mcq             — multiple-choice
//   • predict-output  — read a snippet, type the exact output
//   • fill-in-blank   — single short answer
//
// Every attempt is graded out of 10.  Suggested passing score is 7/10 but
// progression is NOT gated on it.  Learners can retake any test unlimited
// times; a fresh random draw is presented each attempt and the best score
// is kept.
//
// Banks 2 (Logical + while) and 3 (for + break/continue), plus the Final Test,
// are added as those modules are authored.
// ─────────────────────────────────────────────────────────────────────────────

// ── Test 1 bank: Python Booleans + If/Else Statement ─────────────────────────

export const test1Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'mcq',
    prompt: 'What are the only two values a Python boolean can hold?',
    options: [
      { id: 'a', text: '`yes` and `no`' },
      { id: 'b', text: '`True` and `False`' },
      { id: 'c', text: '`1` and `0`' },
      { id: 'd', text: '`on` and `off`' },
    ],
    correctOptionId: 'b',
    explanation: 'A boolean (`bool`) is either `True` or `False` — capitalised exactly like that.',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'print(5 > 3)',
    expectedOutput: 'True',
  },
  {
    id: 'q3',
    qType: 'mcq',
    prompt: 'Which of these is the correct way to write the boolean "true" in Python?',
    options: [
      { id: 'a', text: '`true`' },
      { id: 'b', text: '`TRUE`' },
      { id: 'c', text: '`True`' },
      { id: 'd', text: '`"True"`' },
    ],
    correctOptionId: 'c',
    explanation: '`True` has a capital first letter. `true` and `TRUE` are not keywords; `"True"` is a string.',
  },
  {
    id: 'q4',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(10 == 10)',
    expectedOutput: 'True',
  },
  {
    id: 'q5',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(4 != 4)',
    expectedOutput: 'False',
  },
  {
    id: 'q6',
    qType: 'fill-in-blank',
    prompt: 'The operator that checks whether two values are equal is ___.',
    acceptedAnswers: ['==', 'eq'],
    hint: 'Two characters — not a single equals sign.',
    explanation: '`==` checks equality. A single `=` is for assignment.',
  },
  {
    id: 'q7',
    qType: 'mcq',
    prompt: 'What does the `==` operator do?',
    options: [
      { id: 'a', text: 'Stores a value in a variable.' },
      { id: 'b', text: 'Checks whether two values are equal.' },
      { id: 'c', text: 'Adds two numbers together.' },
      { id: 'd', text: 'Creates a new variable.' },
    ],
    correctOptionId: 'b',
    explanation: '`==` compares two values and returns `True` or `False`. Assignment uses a single `=`.',
  },
  {
    id: 'q8',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(7 < 2)',
    expectedOutput: 'False',
  },
  {
    id: 'q9',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(bool(0))',
    expectedOutput: 'False',
  },
  {
    id: 'q10',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(bool("hi"))',
    expectedOutput: 'True',
  },
  {
    id: 'q11',
    qType: 'mcq',
    prompt: 'Which of these values is **falsy** (treated as `False`)?',
    options: [
      { id: 'a', text: '`"hello"`' },
      { id: 'b', text: '`42`' },
      { id: 'c', text: '`""` (empty string)' },
      { id: 'd', text: '`-1`' },
    ],
    correctOptionId: 'c',
    explanation: 'The empty string `""` is falsy. Non-empty strings and non-zero numbers are truthy.',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 5\nif x > 3:\n    print("yes")\nelse:\n    print("no")',
    expectedOutput: 'yes',
  },
  {
    id: 'q13',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'age = 12\nif age >= 18:\n    print("adult")\nelse:\n    print("minor")',
    expectedOutput: 'minor',
  },
  {
    id: 'q14',
    qType: 'mcq',
    prompt: 'Which character must end the header line of an `if` statement?',
    options: [
      { id: 'a', text: 'A semicolon `;`' },
      { id: 'b', text: 'A colon `:`' },
      { id: 'c', text: 'A comma `,`' },
      { id: 'd', text: 'A full stop `.`' },
    ],
    correctOptionId: 'b',
    explanation: 'Every `if`, `elif`, and `else` header ends with a colon `:`, followed by an indented body.',
  },
  {
    id: 'q15',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'n = 0\nif n > 0:\n    print("positive")\nelif n < 0:\n    print("negative")\nelse:\n    print("zero")',
    expectedOutput: 'zero',
  },
  {
    id: 'q16',
    qType: 'fill-in-blank',
    prompt: 'The keyword that means "else if" — used to check another condition — is ___.',
    acceptedAnswers: ['elif', 'Elif'],
    hint: 'Five letters; it sits between `if` and `else`.',
    explanation: '`elif` lets you test additional conditions when the previous ones were `False`.',
  },
  {
    id: 'q17',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'temp = 30\nif temp > 25:\n    print("hot")',
    expectedOutput: 'hot',
  },
  {
    id: 'q18',
    qType: 'mcq',
    prompt: 'If an `if` condition is `False` and there is no `else`, what happens?',
    options: [
      { id: 'a', text: 'Python raises an error.' },
      { id: 'b', text: 'The indented block is skipped and nothing is printed.' },
      { id: 'c', text: 'The block runs anyway.' },
      { id: 'd', text: 'Python prints `False`.' },
    ],
    correctOptionId: 'b',
    explanation: 'With no matching branch, Python simply skips the body and moves on — no output, no error.',
  },
  {
    id: 'q19',
    qType: 'predict-output',
    prompt: 'What does this print? (Remember: Python is case-sensitive.)',
    code: 'print("cat" == "Cat")',
    expectedOutput: 'False',
  },
  {
    id: 'q20',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'a = 10\nb = 10\nprint(a >= b)',
    expectedOutput: 'True',
  },
  {
    id: 'q21',
    qType: 'fill-in-blank',
    prompt: 'The standard number of spaces used to indent the body of an `if` statement is ___.',
    acceptedAnswers: ['4', 'four', 'Four'],
    hint: 'A single digit.',
    explanation: 'Python code is conventionally indented by 4 spaces per level.',
  },
  {
    id: 'q22',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 7\nif x > 5:\n    if x < 10:\n        print("between")',
    expectedOutput: 'between',
  },
  {
    id: 'q23',
    qType: 'mcq',
    prompt: 'Which line correctly checks whether `score` equals 100 inside an `if`?',
    options: [
      { id: 'a', text: '`if score = 100:`' },
      { id: 'b', text: '`if score == 100:`' },
      { id: 'c', text: '`if score := 100:`' },
      { id: 'd', text: '`if 100 = score:`' },
    ],
    correctOptionId: 'b',
    explanation: 'Use `==` to check equality. A single `=` assigns and is not valid as a condition.',
  },
  {
    id: 'q24',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")',
    expectedOutput: 'B',
  },
  {
    id: 'q25',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(3 <= 3)',
    expectedOutput: 'True',
  },
]

// ── Test 2 bank: Logical Operators + While Loop ──────────────────────────────

export const test2Bank: ProgressTestQuestion[] = [
  {
    id: 'q1',
    qType: 'mcq',
    prompt: 'Which operator returns `True` only when **both** conditions are `True`?',
    options: [
      { id: 'a', text: '`or`' },
      { id: 'b', text: '`and`' },
      { id: 'c', text: '`not`' },
      { id: 'd', text: '`while`' },
    ],
    correctOptionId: 'b',
    explanation: '`and` is `True` only when both sides are True. `or` needs just one side True.',
  },
  {
    id: 'q2',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(True and False)',
    expectedOutput: 'False',
  },
  {
    id: 'q3',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(True or False)',
    expectedOutput: 'True',
  },
  {
    id: 'q4',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(not True)',
    expectedOutput: 'False',
  },
  {
    id: 'q5',
    qType: 'mcq',
    prompt: 'The `or` operator returns `False` in which case?',
    options: [
      { id: 'a', text: 'When both sides are `True`.' },
      { id: 'b', text: 'When at least one side is `True`.' },
      { id: 'c', text: 'When both sides are `False`.' },
      { id: 'd', text: '`or` is never `False`.' },
    ],
    correctOptionId: 'c',
    explanation: '`or` is only `False` when **both** sides are False; otherwise it is `True`.',
  },
  {
    id: 'q6',
    qType: 'fill-in-blank',
    prompt: 'The logical operator that flips a boolean (True becomes False) is ___.',
    acceptedAnswers: ['not', 'Not'],
    hint: 'Three letters.',
    explanation: '`not` flips a boolean: `not True` is `False`, and `not False` is `True`.',
  },
  {
    id: 'q7',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(5 > 3 and 10 > 2)',
    expectedOutput: 'True',
  },
  {
    id: 'q8',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(False or False)',
    expectedOutput: 'False',
  },
  {
    id: 'q9',
    qType: 'mcq',
    prompt: 'What does `not False` evaluate to?',
    options: [
      { id: 'a', text: '`True`' },
      { id: 'b', text: '`False`' },
      { id: 'c', text: '`None`' },
      { id: 'd', text: 'An error' },
    ],
    correctOptionId: 'a',
    explanation: '`not` flips the value, so `not False` is `True`.',
  },
  {
    id: 'q10',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'age = 16\nprint(age >= 13 and age <= 19)',
    expectedOutput: 'True',
  },
  {
    id: 'q11',
    qType: 'mcq',
    prompt: 'In `age > 10 and age < 20`, what does Python evaluate first?',
    options: [
      { id: 'a', text: 'The `and`, then the comparisons.' },
      { id: 'b', text: 'The two comparisons, then combines them with `and`.' },
      { id: 'c', text: 'It reads strictly right to left.' },
      { id: 'd', text: 'Nothing — this is a syntax error.' },
    ],
    correctOptionId: 'b',
    explanation: 'Comparisons are evaluated first, producing two booleans, which `and` then combines.',
  },
  {
    id: 'q12',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1',
    expectedOutput: '1\n2\n3',
  },
  {
    id: 'q13',
    qType: 'mcq',
    prompt: 'When does a `while` loop check its condition?',
    options: [
      { id: 'a', text: 'Only once, at the very start.' },
      { id: 'b', text: 'Before every iteration.' },
      { id: 'c', text: 'After every iteration.' },
      { id: 'd', text: 'Only when the loop ends.' },
    ],
    correctOptionId: 'b',
    explanation: 'The condition is checked **before** each iteration. If it is `False`, the body is skipped.',
  },
  {
    id: 'q14',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1',
    expectedOutput: '3\n2\n1',
  },
  {
    id: 'q15',
    qType: 'mcq',
    prompt: 'What causes an infinite `while` loop?',
    options: [
      { id: 'a', text: 'Using `<=` instead of `<`.' },
      { id: 'b', text: 'Forgetting the colon `:`.' },
      { id: 'c', text: 'Never updating the variable the condition checks.' },
      { id: 'd', text: 'Printing inside the loop.' },
    ],
    correctOptionId: 'c',
    explanation: 'If nothing in the body makes the condition `False`, it stays `True` forever.',
  },
  {
    id: 'q16',
    qType: 'fill-in-blank',
    prompt: 'Each single pass through the body of a loop is called an ___.',
    acceptedAnswers: ['iteration', 'Iteration'],
    hint: 'Starts with "iter".',
    explanation: 'One pass through a loop body is an **iteration**.',
  },
  {
    id: 'q17',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'total = 0\ni = 1\nwhile i <= 4:\n    total = total + i\n    i = i + 1\nprint(total)',
    expectedOutput: '10',
  },
  {
    id: 'q18',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 5\nwhile x > 10:\n    print("hi")\nprint("done")',
    expectedOutput: 'done',
  },
  {
    id: 'q19',
    qType: 'mcq',
    prompt: 'How many times does a `while` loop run if its condition is `False` from the start?',
    options: [
      { id: 'a', text: 'Once.' },
      { id: 'b', text: 'Zero times.' },
      { id: 'c', text: 'Forever.' },
      { id: 'd', text: 'It raises an error.' },
    ],
    correctOptionId: 'b',
    explanation: 'Because the check happens first, a condition that starts `False` means the body never runs.',
  },
  {
    id: 'q20',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'i = 0\nwhile i < 3:\n    print("loop")\n    i = i + 1',
    expectedOutput: 'loop\nloop\nloop',
  },
  {
    id: 'q21',
    qType: 'fill-in-blank',
    prompt: 'The keyword that starts a loop which repeats as long as a condition is True is ___.',
    acceptedAnswers: ['while', 'While'],
    hint: 'Five letters.',
    explanation: 'A `while` loop repeats its body as long as the condition stays `True`.',
  },
  {
    id: 'q22',
    qType: 'predict-output',
    prompt: 'What is the output?',
    code: 'print(True and (False or True))',
    expectedOutput: 'True',
  },
  {
    id: 'q23',
    qType: 'mcq',
    prompt: 'What does `not (5 > 3)` evaluate to?',
    options: [
      { id: 'a', text: '`True`' },
      { id: 'b', text: '`False`' },
      { id: 'c', text: '`5`' },
      { id: 'd', text: 'An error' },
    ],
    correctOptionId: 'b',
    explanation: '`5 > 3` is `True`, and `not True` is `False`.',
  },
  {
    id: 'q24',
    qType: 'predict-output',
    prompt: 'What does this print?',
    code: 'x = 2\nwhile x <= 8:\n    print(x)\n    x = x + 2',
    expectedOutput: '2\n4\n6\n8',
  },
  {
    id: 'q25',
    qType: 'mcq',
    prompt: 'What must a `while` loop body do to avoid running forever?',
    options: [
      { id: 'a', text: 'Always print something.' },
      { id: 'b', text: 'Eventually make the condition `False` (usually by updating the loop variable).' },
      { id: 'c', text: 'Use an `if` statement inside.' },
      { id: 'd', text: 'Count only upward.' },
    ],
    correctOptionId: 'b',
    explanation: 'Something in the body must move the loop toward its end so the condition eventually becomes `False`.',
  },
]

// ── Module checkpoint tests ──────────────────────────────────────────────────

export const progressTest1Module: Module = {
  slug: 'progress-test-1',
  title: 'Progress Test 1',
  summary: 'Checkpoint: Python Booleans + If/Else Statement.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 1',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Python Booleans** and the **If/Else Statement**. ' +
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
  summary: 'Checkpoint: Logical Operators + While Loop.',
  lessons: [
    {
      slug: 'test',
      title: 'Progress Test 2',
      type: 'progress-test',
      intro:
        'Checkpoint covering **Logical Operators** (`and` / `or` / `not`) and the ' +
        '**While Loop**. Retake as many times as you like to improve your score.',
      passingScore: 7,
      presentCount: 10,
      questionBanks: [test2Bank],
    },
  ],
}
