import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 5: While Loop — 13 lesson screens.
//
// while syntax, the condition, updating the loop variable, the infinite-loop
// caution (shown as a non-executed code block), the accumulator pattern, a
// loop that runs zero times, a visualize block stepping a counter, three
// quizzes, and two exercises (countdown, sum 1..n).
// ─────────────────────────────────────────────────────────────────────────────

export const whileLoopModule: Module = {
  slug: 'while-loop',
  title: 'While Loop',
  summary: 'Repeat code while a condition stays True.',
  lessons: [
    // ── 1. Repeating Work ─────────────────────────────────────────────────────
    {
      slug: 'introduction-to-while-loops',
      title: 'Repeating Work',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Imagine printing the numbers 1 to 100. Writing 100 separate `print()` lines would be exhausting — and what if you wanted 1 to 1,000,000?',
        },
        {
          kind: 'paragraph',
          text: 'A **loop** repeats a block of code automatically. The first kind you will meet is the **while loop**, which keeps repeating *while* a condition stays `True`.',
        },
        {
          kind: 'paragraph',
          text: 'A while loop reuses everything you already know: a boolean **condition** decides whether to keep going, exactly like the condition in an `if` statement — only now it is checked again and again.',
        },
      ],
    },

    // ── 2. The while Statement ────────────────────────────────────────────────
    {
      slug: 'the-while-statement',
      title: 'The while Statement',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A `while` loop has the same shape as an `if`: a header ending in a colon `:`, and an indented body. The difference is that the body repeats as long as the condition is `True`.',
        },
        {
          kind: 'runnable',
          code:
            'count = 1\n\n' +
            'while count <= 3:\n' +
            '    print(count)\n' +
            '    count = count + 1\n\n' +
            'print("Done")',
        },
        {
          kind: 'paragraph',
          text: 'This prints `1`, `2`, `3`, then `Done`. Each time through, Python checks `count <= 3`, runs the body, and `count` grows by 1. When `count` reaches 4 the condition is `False`, so the loop stops and the program continues at `print("Done")`.',
        },
        {
          kind: 'note',
          text: 'The line `count = count + 1` is what moves the loop forward. Each pass through the body of a loop is called an **iteration**.',
        },
      ],
    },

    // ── 3. Stepping Through a Loop ────────────────────────────────────────────
    {
      slug: 'stepping-through-a-loop',
      title: 'Stepping Through a Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Loops are much easier to understand when you watch them run. Step through the counter below one line at a time and notice how `count` changes and how the condition is re-checked at the top of every iteration.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize, then step through and watch count climb from 1 to 4.',
          code:
            'count = 1\n' +
            'while count <= 3:\n' +
            '    print(count)\n' +
            '    count = count + 1',
        },
        {
          kind: 'paragraph',
          text: 'Watch the cycle: check the condition → run the body → update `count` → back to the top. The loop ends the moment the check is `False` (when `count` becomes 4).',
        },
      ],
    },

    // ── 4. The Infinite Loop ──────────────────────────────────────────────────
    {
      slug: 'the-infinite-loop',
      title: 'The Infinite Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The most common mistake with `while` loops is forgetting to update the loop variable. If the condition never becomes `False`, the loop runs **forever** — an **infinite loop**.',
        },
        {
          kind: 'code',
          code:
            '# WARNING: do not run this — it never stops!\n' +
            'count = 1\n' +
            'while count <= 3:\n' +
            '    print(count)\n' +
            '    # count is never changed, so count <= 3 is always True',
        },
        {
          kind: 'note',
          text: '**Always make sure the loop moves toward its end.** Something inside the body must eventually make the condition `False` — usually by updating the variable the condition checks.',
        },
      ],
    },

    // ── 5. Building a Total ───────────────────────────────────────────────────
    {
      slug: 'building-a-total',
      title: 'Building a Total',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A very common loop pattern is an **accumulator**: a variable that starts at 0 and grows on each iteration. This lets a loop add up many numbers.',
        },
        {
          kind: 'runnable',
          code:
            'total = 0\n' +
            'number = 1\n\n' +
            'while number <= 5:\n' +
            '    total = total + number\n' +
            '    number = number + 1\n\n' +
            'print(total)',
        },
        {
          kind: 'paragraph',
          text: 'The loop adds 1, then 2, 3, 4, and 5 onto `total`. After the last iteration `total` holds `15` (1 + 2 + 3 + 4 + 5), which is printed.',
        },
      ],
    },

    // ── 6. Counting Down ──────────────────────────────────────────────────────
    {
      slug: 'counting-down',
      title: 'Counting Down',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A loop does not have to count up. By **subtracting** from the loop variable, you can count down.',
        },
        {
          kind: 'runnable',
          code:
            'n = 5\n\n' +
            'while n > 0:\n' +
            '    print(n)\n' +
            '    n = n - 1\n\n' +
            'print("Lift off!")',
        },
        {
          kind: 'paragraph',
          text: 'This prints `5`, `4`, `3`, `2`, `1`, then `Lift off!`. The condition `n > 0` becomes `False` when `n` reaches 0, ending the countdown.',
        },
      ],
    },

    // ── 7. When a Loop Runs Zero Times ────────────────────────────────────────
    {
      slug: 'looping-zero-times',
      title: 'Looping Zero Times',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Because the condition is checked **before** each iteration, a `while` loop can run **zero** times — if the condition is `False` from the very start, the body is skipped entirely.',
        },
        {
          kind: 'runnable',
          code:
            'x = 10\n\n' +
            'while x < 5:\n' +
            '    print("inside the loop")\n\n' +
            'print("loop skipped")',
        },
        {
          kind: 'paragraph',
          text: '`x < 5` is `False` immediately (10 is not less than 5), so the body never runs. Only `loop skipped` is printed.',
        },
      ],
    },

    // ── 8. Quiz: How Many Lines? ──────────────────────────────────────────────
    {
      slug: 'quiz-how-many-lines',
      title: 'How Many Lines?',
      type: 'quiz',
      question:
        'What does this code print?\n\n' +
        '`i = 0`\n' +
        '`while i < 4:`\n' +
        '`    print("hi")`\n' +
        '`    i = i + 1`',
      options: [
        { id: 'a', text: '`hi` three times' },
        { id: 'b', text: '`hi` four times' },
        { id: 'c', text: '`hi` five times' },
        { id: 'd', text: 'It loops forever' },
      ],
      correctOptionId: 'b',
      explanation:
        '`i` takes the values 0, 1, 2, 3 — four iterations — printing `hi` each time. When `i` becomes 4, `i < 4` is `False` and the loop stops.',
    },

    // ── 9. Quiz: Spot the Bug ─────────────────────────────────────────────────
    {
      slug: 'quiz-spot-the-bug',
      title: 'Spot the Bug',
      type: 'quiz',
      question:
        'What is wrong with this loop?\n\n' +
        '`count = 1`\n' +
        '`while count <= 5:`\n' +
        '`    print(count)`',
      options: [
        { id: 'a', text: 'It prints 1 to 5 correctly — nothing is wrong.' },
        { id: 'b', text: '`count` is never updated, so it loops forever.' },
        { id: 'c', text: 'The colon `:` is missing.' },
        { id: 'd', text: 'It prints nothing at all.' },
      ],
      correctOptionId: 'b',
      explanation:
        'Nothing inside the loop changes `count`, so `count <= 5` stays `True` forever. The loop needs a line like `count = count + 1` to end.',
    },

    // ── 10. Quiz: What is the Total? ──────────────────────────────────────────
    {
      slug: 'quiz-what-is-the-total',
      title: 'What is the Total?',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`total = 0`\n' +
        '`i = 1`\n' +
        '`while i <= 3:`\n' +
        '`    total = total + i`\n' +
        '`    i = i + 1`\n' +
        '`print(total)`',
      options: [
        { id: 'a', text: '`3`' },
        { id: 'b', text: '`5`' },
        { id: 'c', text: '`6`' },
        { id: 'd', text: '`7`' },
      ],
      correctOptionId: 'c',
      explanation: 'The loop adds 1, then 2, then 3 onto `total`: 1 + 2 + 3 = `6`.',
    },

    // ── 11. Exercise: Countdown ───────────────────────────────────────────────
    {
      slug: 'countdown-exercise',
      title: 'Countdown',
      type: 'exercise',
      problemDescription:
        'Print a countdown.\n\n' +
        '- A variable `n` is already created.\n' +
        '- Print `n`, then `n - 1`, and so on, down to `1` — each on its own line.\n' +
        '- Stop at 1 (do not print 0).',
      starterCode:
        'n = 5\n\n' +
        '# Print n, n-1, ..., down to 1 (each on its own line)\n' +
        'while n > 0:\n' +
        '    print(n)\n' +
        '    ___  # decrease n by 1\n',
      expectedOutput: '5\n4\n3\n2\n1',
      validationMode: 'exact',
      solution:
        'n = 5\n' +
        'while n > 0:\n' +
        '    print(n)\n' +
        '    n = n - 1',
    },

    // ── 12. Exercise: Sum to N ────────────────────────────────────────────────
    {
      slug: 'sum-to-n-exercise',
      title: 'Sum to N',
      type: 'exercise',
      problemDescription:
        'Add up the numbers from 1 to n.\n\n' +
        '- A variable `n` is already created.\n' +
        '- Use a `while` loop to add 1 + 2 + ... + n.\n' +
        '- Print the final total. For `n = 5` the answer is `15`.',
      starterCode:
        'n = 5\n' +
        'total = 0\n' +
        'i = 1\n\n' +
        '# Add 1 + 2 + ... + n into total, then print it\n' +
        'while i <= n:\n' +
        '    ___          # add i to total\n' +
        '    i = i + 1\n\n' +
        'print(total)\n',
      expectedOutput: '15',
      validationMode: 'exact',
      solution:
        'n = 5\n' +
        'total = 0\n' +
        'i = 1\n' +
        'while i <= n:\n' +
        '    total = total + i\n' +
        '    i = i + 1\n' +
        'print(total)',
    },

    // ── 13. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'While Loop — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing the While Loop!',
      summary:
        'You can now repeat code with `while`: the condition is checked before every ' +
        'iteration, the body must move the loop toward its end (or it runs forever), and ' +
        'accumulator variables let a loop build a total. Next is a short **Progress Test** ' +
        'on logical operators and while loops.',
      nextModuleTitle: 'Progress Test 2',
    },
  ],
}
