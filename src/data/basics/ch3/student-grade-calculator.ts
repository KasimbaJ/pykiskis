import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 3 · Project 3: Student Grade Calculator — 12 lesson screens.
//
// Reads a subject count, loops to read that many scores accumulating a total,
// computes the average, assigns a grade band, and prints a formatted report.
// Ch1–2 skills only (accumulator instead of a list). Runnables use inputValues
// sized to the count so the score loop always terminates.
// ─────────────────────────────────────────────────────────────────────────────

export const studentGradeCalculatorModule: Module = {
  slug: 'student-grade-calculator',
  title: 'Student Grade Calculator',
  summary: 'Average several scores and assign a letter grade.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In this project you will build a **Student Grade Calculator**. It takes scores for several subjects, calculates the average, and assigns a letter grade.',
        },
        {
          kind: 'paragraph',
          text: 'Here is what the finished program will do:',
        },
        {
          kind: 'figure',
          code:
            'Student Grade Calculator\n' +
            'Enter the number of subjects: 5\n' +
            'Enter score for subject 1: 71\n' +
            'Enter score for subject 2: 78\n' +
            'Enter score for subject 3: 80\n' +
            'Enter score for subject 4: 76\n' +
            'Enter score for subject 5: 72\n' +
            '--- Student Report ---\n' +
            'Total Score: 377\n' +
            'Average Score: 75.40\n' +
            'Grade: C',
          output: '',
          caption: 'The finished Student Grade Calculator in action.',
        },
        {
          kind: 'paragraph',
          text: 'It reinforces your Python basics while creating something genuinely useful — and we will build it one step at a time.',
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
          text: 'This project brings together several Chapter 1–2 skills:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Reading input with `input()` and converting it with `int()`',
            'A `for` loop with `range()` to repeat a known number of times',
            'The accumulator pattern — a running `total` that grows in a loop',
            'Division to find an average, and `if` / `elif` for the grade band',
          ],
        },
      ],
    },

    // ── 3. Getting the Count ──────────────────────────────────────────────────
    {
      slug: 'getting-the-count',
      title: 'Getting the Count',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'First we need to know how many subjects there are, so we can ask for that many scores.',
        },
        {
          kind: 'runnable',
          code:
            'count = int(input("Enter the number of subjects: "))\n\n' +
            'print("You have", count, "subjects.")',
          inputValues: ['5'],
        },
        {
          kind: 'paragraph',
          text: 'We use `int()` because the number of subjects is a whole number, and we will use it to control a loop in a moment.',
        },
      ],
    },

    // ── 4. Building the Total ─────────────────────────────────────────────────
    {
      slug: 'building-the-total',
      title: 'Building the Total',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To find an average we first need a **total**. We start a variable at `0` and add each score onto it — the accumulator pattern from Chapter 2. Here it is with a single score:',
        },
        {
          kind: 'runnable',
          code:
            'total = 0\n\n' +
            'score = int(input("Enter a score: "))\n' +
            'total = total + score\n\n' +
            'print("Total is now:", total)',
          inputValues: ['71'],
        },
        {
          kind: 'paragraph',
          text: 'On its own that only adds one score. Next we repeat it for every subject.',
        },
      ],
    },

    // ── 5. Looping for Scores ─────────────────────────────────────────────────
    {
      slug: 'looping-for-scores',
      title: 'Looping for Scores',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A `for` loop that runs `count` times lets us read one score per subject, adding each onto `total`.',
        },
        {
          kind: 'runnable',
          code:
            'count = int(input("Enter the number of subjects: "))\n' +
            'total = 0\n\n' +
            'for i in range(count):\n' +
            '    score = int(input("Enter a score: "))\n' +
            '    total = total + score\n\n' +
            'print("Total score:", total)',
          inputValues: ['3', '71', '78', '80'],
        },
        {
          kind: 'paragraph',
          text: 'With 3 subjects and scores 71, 78, 80, the total is `229`. The loop reads exactly as many scores as there are subjects — no more, no less.',
        },
      ],
    },

    // ── 6. Calculating the Average ────────────────────────────────────────────
    {
      slug: 'calculating-the-average',
      title: 'Calculating the Average',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The average is simply the total divided by how many scores there were. We already have both numbers.',
        },
        {
          kind: 'runnable',
          code:
            'count = int(input("Enter the number of subjects: "))\n' +
            'total = 0\n\n' +
            'for i in range(count):\n' +
            '    score = int(input("Enter a score: "))\n' +
            '    total = total + score\n\n' +
            'average = total / count\n' +
            'print("Average score:", average)',
          inputValues: ['4', '70', '80', '90', '100'],
        },
        {
          kind: 'note',
          text: 'Remember `/` always gives a float, so the average can have decimals — perfect for an average. We will tidy up how it displays a little later.',
        },
      ],
    },

    // ── 7. Assigning the Grade ────────────────────────────────────────────────
    {
      slug: 'assigning-the-grade',
      title: 'Assigning the Grade',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A number is fine, but a letter grade is friendlier. An `if` / `elif` ladder turns the average into a grade.',
        },
        {
          kind: 'runnable',
          code:
            'average = 75\n\n' +
            'if average >= 90:\n' +
            '    grade = "A"\n' +
            'elif average >= 80:\n' +
            '    grade = "B"\n' +
            'elif average >= 70:\n' +
            '    grade = "C"\n' +
            'elif average >= 60:\n' +
            '    grade = "D"\n' +
            'else:\n' +
            '    grade = "F"\n\n' +
            'print("Grade:", grade)',
        },
        {
          kind: 'paragraph',
          text: 'An average of 75 lands in the `>= 70` band, so the grade is `C`. The ladder checks from the highest band down, stopping at the first one that fits.',
        },
      ],
    },

    // ── 8. Exercise: Average of Three ─────────────────────────────────────────
    {
      slug: 'average-of-three-exercise',
      title: 'Your Turn: Average of Three',
      type: 'exercise',
      problemDescription:
        'Average three scores.\n\n' +
        '- Use a `for` loop to read **3** scores with `int(input())`, adding each to a `total`.\n' +
        '- Print the average (`total / 3`).\n\n' +
        'When the test runs your code it enters `80`, `90`, and `70` — so the expected output is `80.0`.',
      starterCode:
        'total = 0\n\n' +
        '# Read 3 scores, add them to total, then print total / 3\n' +
        'for i in range(3):\n' +
        '    score = int(input("Score: "))\n' +
        '    total = total + score\n\n',
      expectedOutput: '80.0',
      validationMode: 'exact',
      inputValues: ['80', '90', '70'],
      solution:
        'total = 0\n' +
        'for i in range(3):\n' +
        '    score = int(input("Score: "))\n' +
        '    total = total + score\n' +
        'print(total / 3)',
    },

    // ── 9. The Final Report ───────────────────────────────────────────────────
    {
      slug: 'the-final-report',
      title: 'The Final Report',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A long decimal like `75.4000001` looks messy. An f-string with `:.2f` rounds a number to **2 decimal places** for a clean report.',
        },
        {
          kind: 'runnable',
          code:
            'total = 377\n' +
            'count = 5\n' +
            'average = total / count\n\n' +
            'print("--- Student Report ---")\n' +
            'print("Total Score:", total)\n' +
            'print(f"Average Score: {average:.2f}")\n' +
            'print("Grade: C")',
        },
        {
          kind: 'paragraph',
          text: 'The `{average:.2f}` part shows `75.40` instead of `75.4`. Small formatting touches like this make a program feel polished.',
        },
      ],
    },

    // ── 10. The Complete Program ──────────────────────────────────────────────
    {
      slug: 'the-complete-program',
      title: 'The Complete Program',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Now we assemble every piece into the finished Student Grade Calculator — count, loop, total, average, grade, and report.',
        },
        {
          kind: 'runnable',
          code:
            'print("Student Grade Calculator")\n' +
            'count = int(input("Enter the number of subjects: "))\n\n' +
            'total = 0\n' +
            'for i in range(count):\n' +
            '    score = int(input(f"Enter score for subject {i + 1}: "))\n' +
            '    total = total + score\n\n' +
            'average = total / count\n\n' +
            'if average >= 90:\n' +
            '    grade = "A"\n' +
            'elif average >= 80:\n' +
            '    grade = "B"\n' +
            'elif average >= 70:\n' +
            '    grade = "C"\n' +
            'elif average >= 60:\n' +
            '    grade = "D"\n' +
            'else:\n' +
            '    grade = "F"\n\n' +
            'print("--- Student Report ---")\n' +
            'print("Total Score:", total)\n' +
            'print(f"Average Score: {average:.2f}")\n' +
            'print("Grade:", grade)',
          inputValues: ['5', '71', '78', '80', '76', '72'],
        },
        {
          kind: 'paragraph',
          text: 'Run it with 5 subjects and the scores 71, 78, 80, 76, 72 and you get a total of 377, an average of 75.40, and a grade of C — a complete, useful report built entirely from Chapter 1–2 skills.',
        },
      ],
    },

    // ── 11. Making It Robust ──────────────────────────────────────────────────
    {
      slug: 'making-it-robust',
      title: 'Making It Robust',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'What if the user enters `0` subjects? Then `total / count` would try to divide by zero and crash. A good program guards against that.',
        },
        {
          kind: 'runnable',
          code:
            'count = int(input("Enter the number of subjects: "))\n\n' +
            'if count <= 0:\n' +
            '    print("You must have at least one subject.")\n' +
            'else:\n' +
            '    print("Great, let\'s enter", count, "scores.")',
          inputValues: ['0'],
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Reject a subject count of 0 or less, as above.',
            'Try widening the grade bands or adding an "A+" for 95 and over.',
            'Print a friendly "Well done!" when the grade is an A or B.',
          ],
        },
        {
          kind: 'note',
          text: 'Thinking about what could go wrong — and handling it — is what separates a demo from a dependable tool.',
        },
      ],
    },

    // ── 12. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Student Grade Calculator — Complete',
      type: 'recap',
      congratsTitle: 'You built a Student Grade Calculator! 📊',
      summary:
        'You read a subject count, looped to gather that many scores into a running total, ' +
        'computed the average, turned it into a letter grade, and printed a clean report — ' +
        'all without lists, using the accumulator pattern. Next up: a Rock, Paper, Scissors game.',
      nextModuleTitle: 'Rock, Paper, Scissors',
    },
  ],
}
