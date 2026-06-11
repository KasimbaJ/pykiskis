import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 3 · Project 1: Number Guessing Game — 12 lesson screens.
//
// A guided, build-it-step-by-step project applying Chapter 1–2 skills (input,
// variables, int conversion, if/elif/else, while loops) plus the random module.
// Runnables use inputValues so they execute in qa-verify; the final game uses a
// guess cap so it always terminates (see plans/chapter-3-projects-plan.md).
// ─────────────────────────────────────────────────────────────────────────────

export const numberGuessingGameModule: Module = {
  slug: 'number-guessing-game',
  title: 'Number Guessing Game',
  summary: 'Build a game where the player guesses a secret number.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Welcome to your first project! 🎲 You are going to build your very own **Number Guessing Game**, step by step. You will write real Python code, run it, and watch your game come to life.',
        },
        {
          kind: 'paragraph',
          text: 'The idea is simple: the program holds a secret number, and the player keeps guessing until they get it right — with the game giving hints of "too high" or "too low" along the way.',
        },
        {
          kind: 'paragraph',
          text: 'Along the way you will learn how to:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            "Build the game's core logic",
            'Improve the player experience with clear, friendly messages',
            'Let the computer pick a new secret number each time you play',
          ],
        },
        {
          kind: 'note',
          text: 'Most importantly, you will practise **thinking like a developer**: breaking a big goal into small steps and solving each one until the whole thing works.',
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
          text: 'Before we dive in, make sure you are comfortable with a few Python basics from Chapters 1 and 2:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Printing text to the screen with `print()`',
            'Creating and using variables',
            'Working with different data types (and `int()` conversion)',
            'Writing `if` / `elif` / `else` statements',
            'Using `while` loops to repeat actions',
          ],
        },
        {
          kind: 'paragraph',
          text: 'If any of these feel shaky, it is worth a quick review — we will use all of them. Ready? Let us plan the game.',
        },
      ],
    },

    // ── 3. Game Overview ──────────────────────────────────────────────────────
    {
      slug: 'game-overview',
      title: 'Game Overview',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Good developers plan before they code. Let us describe the game in plain steps first:',
        },
        {
          kind: 'figure',
          code:
            '1. The program has a secret number.\n' +
            '2. Ask the player to guess.\n' +
            '3. If the guess is correct  -> say so and stop.\n' +
            '4. If the guess is too low  -> say "Too low" and ask again.\n' +
            '5. If the guess is too high -> say "Too high" and ask again.\n' +
            '6. Repeat until the player guesses correctly.',
          output: '',
          caption: 'The plan, in plain English — we will turn each step into Python.',
        },
        {
          kind: 'paragraph',
          text: 'Notice this is just the tools you already have: a variable for the secret, `input()` for the guess, `if/elif/else` for the hints, and a `while` loop to repeat. We will build it up one piece at a time.',
        },
      ],
    },

    // ── 4. A First Guess ──────────────────────────────────────────────────────
    {
      slug: 'a-first-guess',
      title: 'A First Guess',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Let us start small: store a secret number, read one guess, and check whether it matches. Remember that `input()` gives back a string, so we wrap it in `int()` to compare it as a number.',
        },
        {
          kind: 'runnable',
          code:
            'secret = 7\n\n' +
            'guess = int(input("Guess a number between 1 and 10: "))\n\n' +
            'if guess == secret:\n' +
            '    print("You got it!")\n' +
            'else:\n' +
            '    print("Nope, that is not it.")',
          inputValues: ['7'],
        },
        {
          kind: 'paragraph',
          text: 'Press **Run** and type a number when prompted. With the secret set to 7, guessing 7 prints `You got it!` — anything else prints `Nope, that is not it.` It works, but a single guess with no hints is not much of a game yet.',
        },
      ],
    },

    // ── 5. Check the Guess ────────────────────────────────────────────────────
    {
      slug: 'check-the-guess',
      title: 'Check the Guess',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A good guessing game gives hints. Instead of just right or wrong, let us tell the player whether their guess was **too low** or **too high** using `elif`.',
        },
        {
          kind: 'runnable',
          code:
            'secret = 7\n\n' +
            'guess = int(input("Guess a number between 1 and 10: "))\n\n' +
            'if guess == secret:\n' +
            '    print("Correct!")\n' +
            'elif guess < secret:\n' +
            '    print("Too low! Try higher.")\n' +
            'else:\n' +
            '    print("Too high! Try lower.")',
          inputValues: ['4'],
        },
        {
          kind: 'paragraph',
          text: 'Now a guess of 4 against the secret 7 prints `Too low! Try higher.` The three branches cover every case: equal, less than, or greater than the secret.',
        },
      ],
    },

    // ── 6. Exercise: Your Turn to Check ───────────────────────────────────────
    {
      slug: 'check-the-guess-exercise',
      title: 'Your Turn: Check a Guess',
      type: 'exercise',
      problemDescription:
        'Write the hint logic yourself.\n\n' +
        '- The secret number is `50`.\n' +
        '- Read one guess with `int(input())`.\n' +
        '- Print `Too low!` if the guess is less than the secret, `Too high!` if it is greater, and `Correct!` if it matches.\n\n' +
        'When the test runs your code, it enters `30` — so the expected output is `Too low!`.',
      starterCode:
        'secret = 50\n' +
        'guess = int(input("Guess: "))\n\n' +
        '# Print "Too low!", "Too high!", or "Correct!"\n',
      expectedOutput: 'Too low!',
      validationMode: 'exact',
      inputValues: ['30'],
      solution:
        'secret = 50\n' +
        'guess = int(input("Guess: "))\n' +
        'if guess < secret:\n' +
        '    print("Too low!")\n' +
        'elif guess > secret:\n' +
        '    print("Too high!")\n' +
        'else:\n' +
        '    print("Correct!")',
    },

    // ── 7. Let the Player Guess Again ─────────────────────────────────────────
    {
      slug: 'let-them-guess-again',
      title: 'Let the Player Guess Again',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'One guess is not enough — the player should keep trying until they get it right. That is exactly what a `while` loop does: repeat **while** the guess is not equal to the secret.',
        },
        {
          kind: 'runnable',
          code:
            'secret = 7\n\n' +
            'guess = int(input("Guess a number between 1 and 10: "))\n\n' +
            'while guess != secret:\n' +
            '    if guess < secret:\n' +
            '        print("Too low!")\n' +
            '    else:\n' +
            '        print("Too high!")\n' +
            '    guess = int(input("Guess again: "))\n\n' +
            'print("Correct! You found it.")',
          inputValues: ['3', '9', '7'],
        },
        {
          kind: 'paragraph',
          text: 'Trace it: guessing 3 prints `Too low!`, then 9 prints `Too high!`, then 7 matches — the loop ends and prints `Correct! You found it.` The key is asking for a new guess **inside** the loop, so the condition can eventually become False.',
        },
        {
          kind: 'note',
          text: 'This is the whole game — except the secret is always 7. Next we will make the computer choose a different secret every time.',
        },
      ],
    },

    // ── 8. Introduction to Randomization ──────────────────────────────────────
    {
      slug: 'intro-to-randomization',
      title: 'Introduction to Randomization',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A game where the answer is always 7 gets boring fast. Python can pick a **random** number for us using the built-in `random` module.',
        },
        {
          kind: 'paragraph',
          text: 'First we `import random` to use it, then `random.randint(1, 10)` gives a random whole number from 1 to 10 (both ends included).',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'number = random.randint(1, 10)\n' +
            'print("The computer picked:", number)',
        },
        {
          kind: 'paragraph',
          text: 'Run it a few times — you will get a different number on most runs. That is exactly the unpredictability our game needs.',
        },
        {
          kind: 'note',
          text: '`import` lines go at the **top** of your program. You only need to import a module once.',
        },
      ],
    },

    // ── 9. A Random Secret — The Complete Game ────────────────────────────────
    {
      slug: 'a-random-secret',
      title: 'The Complete Game',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Now we put it all together: a **random** secret, the guessing loop, and the hints. We also give the player a limited number of guesses, so the game always ends — a nice touch that makes it feel complete.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'secret = random.randint(1, 10)\n' +
            'attempts = 0\n\n' +
            'guess = int(input("Guess a number between 1 and 10: "))\n\n' +
            'while guess != secret and attempts < 5:\n' +
            '    if guess < secret:\n' +
            '        print("Too low!")\n' +
            '    else:\n' +
            '        print("Too high!")\n' +
            '    attempts = attempts + 1\n' +
            '    guess = int(input("Guess again: "))\n\n' +
            'if guess == secret:\n' +
            '    print("Correct! You found it.")\n' +
            'else:\n' +
            '    print("Out of guesses! The number was", secret)',
          inputValues: ['5', '3', '8', '2', '9', '1'],
        },
        {
          kind: 'paragraph',
          text: 'This is a real, playable game! The secret changes each run, the loop keeps asking, the hints guide the player, and the `attempts < 5` condition ends the game after six guesses if they have not found it. Press **Run** and play it yourself.',
        },
      ],
    },

    // ── 10. What You've Built ─────────────────────────────────────────────────
    {
      slug: 'what-youve-built',
      title: "What You've Built",
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Take a moment to appreciate what you just built from scratch. Every part uses a skill from Chapters 1 and 2:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            '`import random` + `random.randint()` — pick a secret number',
            '`int(input())` — read the player\'s guess as a number',
            '`while` — keep asking until they win or run out of guesses',
            '`if` / `elif` / `else` — give "too low" / "too high" hints',
            'A counter variable (`attempts`) — limit the number of guesses',
          ],
        },
        {
          kind: 'paragraph',
          text: 'That is the developer mindset in action: you broke a whole game into small steps and solved them one at a time. The same approach scales to much bigger programs.',
        },
      ],
    },

    // ── 11. Add More Features ─────────────────────────────────────────────────
    {
      slug: 'add-more-features',
      title: 'Add More Features',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The best way to learn is to make the project your own. Here are some ideas to try in the playground — each one reuses what you already know:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Widen the range to `random.randint(1, 100)` and allow more guesses.',
            'Count and print how many guesses the player used to win.',
            'Tell the player "You are very close!" when the guess is within 2 of the secret.',
            'After the game ends, ask "Play again? (yes/no)" and wrap everything in another loop.',
          ],
        },
        {
          kind: 'note',
          text: 'There is no single right answer — experiment, run it, and fix what breaks. That is exactly how real software gets built.',
        },
      ],
    },

    // ── 12. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Number Guessing Game — Complete',
      type: 'recap',
      congratsTitle: 'You built a Number Guessing Game! 🎉',
      summary:
        'You turned a plain-English plan into a working game: a random secret number, ' +
        'a guessing loop, helpful hints, and a guess limit — all from Chapter 1–2 skills. ' +
        'More importantly, you practised breaking a big problem into small steps. ' +
        'Next up: the Simple Calculator project.',
      nextModuleTitle: 'Simple Calculator',
    },
  ],
}
