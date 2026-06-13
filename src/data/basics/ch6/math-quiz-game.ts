import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 6 · Module 5: Math Quiz Game — CAPSTONE (10 lesson screens).
//
// A guided final project (different from the ch3 Rock-Paper-Scissors). Uses the
// random module to generate questions, a bounded for-loop to ask several, int
// input + comparison to mark answers, and an accumulator to score. Runnables
// use exactly enough inputValues for the fixed number of questions (range(N)),
// so they always terminate; the graded exercise is deterministic (no random).
// ─────────────────────────────────────────────────────────────────────────────

export const mathQuizGameModule: Module = {
  slug: 'math-quiz-game',
  title: 'Math Quiz Game',
  summary: 'Build a quiz that asks random questions and scores the player.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'For your final Basics project, you will build a **Math Quiz Game** 🧮. The computer asks random multiplication questions, checks your answers, and gives you a score at the end.',
        },
        {
          kind: 'paragraph',
          text: 'It pulls together almost everything from the whole course: the `random` module, a loop, `input()` and `int()`, `if`/`else`, and an accumulator for the score.',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Generate random questions with the `random` module',
            'Ask several questions in a loop',
            'Mark each answer and keep score',
            'Report a final score and a grade',
          ],
        },
      ],
    },

    // ── 2. What You Need ──────────────────────────────────────────────────────
    {
      slug: 'what-you-need',
      title: 'What You Need',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Everything here is something you already know:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`import random` and `random.randint()` (Using Modules)',
            'A `for` loop to repeat a fixed number of times',
            '`int(input())` to read a number',
            '`if` / `else` to check the answer, and `+=` to keep score',
          ],
        },
      ],
    },

    // ── 3. One Random Question ────────────────────────────────────────────────
    {
      slug: 'one-random-question',
      title: 'One Random Question',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Start small: pick two random numbers, show them as a question, and read the player\'s answer.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'a = random.randint(1, 10)\n' +
            'b = random.randint(1, 10)\n\n' +
            'print("What is", a, "x", b, "?")\n' +
            'answer = int(input("Your answer: "))\n' +
            'print("You answered:", answer)',
          inputValues: ['50'],
        },
        {
          kind: 'paragraph',
          text: 'Each run picks a different pair of numbers. We read the answer with `int()` so we can compare it as a number in the next step.',
        },
      ],
    },

    // ── 4. Checking the Answer ────────────────────────────────────────────────
    {
      slug: 'checking-the-answer',
      title: 'Checking the Answer',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The correct answer is simply `a * b`. Compare the player\'s answer to it with `if`.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'a = random.randint(1, 10)\n' +
            'b = random.randint(1, 10)\n\n' +
            'print("What is", a, "x", b, "?")\n' +
            'answer = int(input("Your answer: "))\n\n' +
            'if answer == a * b:\n' +
            '    print("Correct!")\n' +
            'else:\n' +
            '    print("The answer was", a * b)',
          inputValues: ['25'],
        },
        {
          kind: 'paragraph',
          text: 'If the answer matches `a * b`, the player is right; otherwise we reveal the correct product. That is one full question, start to finish.',
        },
      ],
    },

    // ── 5. Exercise: Mark One Answer ──────────────────────────────────────────
    {
      slug: 'mark-one-answer-exercise',
      title: 'Your Turn: Mark an Answer',
      type: 'exercise',
      problemDescription:
        'Check a fixed question.\n\n' +
        '- Ask "What is 6 x 7? " and read the answer with `int(input())`.\n' +
        '- Print `Correct!` if the answer is `42`, otherwise print `Wrong!`.\n\n' +
        'The test enters `42`, so the expected output is `Correct!`.',
      starterCode:
        'answer = int(input("What is 6 x 7? "))\n\n' +
        '# Print "Correct!" if answer is 42, otherwise "Wrong!"\n',
      expectedOutput: 'Correct!',
      validationMode: 'exact',
      inputValues: ['42'],
      solution:
        'answer = int(input("What is 6 x 7? "))\n' +
        'if answer == 42:\n' +
        '    print("Correct!")\n' +
        'else:\n' +
        '    print("Wrong!")',
    },

    // ── 6. Asking Several Questions ───────────────────────────────────────────
    {
      slug: 'asking-several-questions',
      title: 'Asking Several Questions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A quiz needs more than one question. A `for` loop asks a fixed number — here, three — generating fresh random numbers each time.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'for i in range(3):\n' +
            '    a = random.randint(1, 10)\n' +
            '    b = random.randint(1, 10)\n' +
            '    answer = int(input(f"Question {i + 1}: What is {a} x {b}? "))\n' +
            '    if answer == a * b:\n' +
            '        print("Correct!")\n' +
            '    else:\n' +
            '        print("Nope!")',
          inputValues: ['10', '20', '30'],
        },
        {
          kind: 'paragraph',
          text: 'The loop runs three times, each a complete question-and-check. Because the loop count is fixed, the quiz always ends after three questions.',
        },
      ],
    },

    // ── 7. Keeping Score ──────────────────────────────────────────────────────
    {
      slug: 'keeping-score',
      title: 'Keeping Score',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Add a `score` accumulator that starts at 0 and goes up by 1 (`score += 1`) for each correct answer.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'score = 0\n\n' +
            'for i in range(3):\n' +
            '    a = random.randint(1, 5)\n' +
            '    b = random.randint(1, 5)\n' +
            '    answer = int(input(f"What is {a} x {b}? "))\n' +
            '    if answer == a * b:\n' +
            '        print("Correct!")\n' +
            '        score += 1\n' +
            '    else:\n' +
            '        print("Wrong!")\n\n' +
            'print("You scored", score, "out of 3")',
          inputValues: ['4', '9', '16'],
        },
        {
          kind: 'paragraph',
          text: 'Only correct answers raise the score, so at the end `score` is exactly how many the player got right. That is the accumulator pattern doing its job again.',
        },
      ],
    },

    // ── 8. The Complete Game ──────────────────────────────────────────────────
    {
      slug: 'the-complete-game',
      title: 'The Complete Game',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Now the full quiz: five questions, a running score, and a grade at the end based on how many were right.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'print("Math Quiz! Answer 5 questions.")\n' +
            'score = 0\n\n' +
            'for i in range(5):\n' +
            '    a = random.randint(1, 10)\n' +
            '    b = random.randint(1, 10)\n' +
            '    answer = int(input(f"Question {i + 1}: What is {a} x {b}? "))\n' +
            '    if answer == a * b:\n' +
            '        print("Correct!")\n' +
            '        score += 1\n' +
            '    else:\n' +
            '        print("Wrong! The answer was", a * b)\n\n' +
            'print()\n' +
            'print("Final score:", score, "out of 5")\n\n' +
            'if score == 5:\n' +
            '    print("Perfect! A+")\n' +
            'elif score >= 3:\n' +
            '    print("Good job!")\n' +
            'else:\n' +
            '    print("Keep practising!")',
          inputValues: ['10', '20', '30', '40', '50'],
        },
        {
          kind: 'paragraph',
          text: 'That is a complete, replayable quiz game — random questions, scoring, and a grade — built entirely from skills you have learned. Press **Run** and test your times tables!',
        },
      ],
    },

    // ── 9. Add More Features ──────────────────────────────────────────────────
    {
      slug: 'add-more-features',
      title: 'Add More Features',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Make it your own with ideas from across the course:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Use `random.choice(["+", "-", "*"])` to mix in addition and subtraction.',
            'Let the player choose how many questions (use their number in `range()`).',
            'Show the score as a percentage with the `round()` function.',
            'Give bigger numbers for a "hard mode" with `random.randint(1, 20)`.',
          ],
        },
      ],
    },

    // ── 10. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Math Quiz Game — Complete',
      type: 'recap',
      congratsTitle: 'You built a Math Quiz Game! 🧮',
      summary:
        'You combined the random module, a counted loop, input and comparison, and a score ' +
        'accumulator into a complete quiz with a final grade. That is a real program drawing on ' +
        'the whole course. Next is the Chapter 6 Recap, then the Final Test.',
      nextModuleTitle: 'Recap',
    },
  ],
}
