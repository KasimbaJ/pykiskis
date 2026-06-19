import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 7 · Project 3: Hangman — 14 lesson screens.
//
// Strings + lists + random + functions + while/for. qa-determinism: the graded
// exercise is pure-data (no input/random); the game-loop and complete-game use a
// FIXED word + exact winning letters with bounded inputValues (so the loop
// always terminates). random.choice is shown only in an ungraded runnable; prose
// notes the real app picks a random word and is live.
// ─────────────────────────────────────────────────────────────────────────────

export const hangmanModule: Module = {
  slug: 'hangman',
  title: 'Hangman',
  summary: 'Guess the hidden word one letter at a time before you run out of lives.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Time for a real classic: **Hangman** 🎯. The computer picks a secret word, and the player guesses one letter at a time. Right guesses reveal letters; wrong guesses cost a life. Guess the whole word before the lives run out!',
        },
        {
          kind: 'paragraph',
          text: 'This project brings together a lot of what you have learned: strings, lists, the `random` module, loops, and functions — a true capstone.',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Pick a secret word at random',
            'Show the word as blanks that fill in as they are guessed',
            'Track wrong guesses with a lives counter',
            'Decide when the player has won or lost',
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
          text: 'You will use skills from across the whole course:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Strings and the `in` operator (to test if a letter is in the word)',
            'Lists (to remember which letters have been guessed)',
            'The `random` module (to choose a word)',
            'A `while` loop, a `for` loop, and an `if` / `else`',
          ],
        },
      ],
    },

    // ── 3. The Plan ───────────────────────────────────────────────────────────
    {
      slug: 'project-plan',
      title: 'The Plan',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'As always, plan first in plain steps:',
        },
        {
          kind: 'figure',
          code:
            '1. Pick a secret word.\n' +
            '2. Show one blank "_" for each letter.\n' +
            '3. Ask the player to guess a letter.\n' +
            '4. If it is in the word -> reveal it. If not -> lose a life.\n' +
            '5. Repeat until the word is fully revealed (win) or lives reach 0 (lose).',
          output: '',
          caption: 'The plan — we will turn each step into Python.',
        },
      ],
    },

    // ── 4. Pick a Word ────────────────────────────────────────────────────────
    {
      slug: 'pick-a-word',
      title: 'Pick a Word',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A list of words plus `random.choice()` gives us a different secret word each game.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'words = ["python", "coding", "laptop"]\n' +
            'word = random.choice(words)\n\n' +
            'print("A word has been chosen! It has", len(word), "letters.")',
        },
        {
          kind: 'paragraph',
          text: 'Run it a few times — a different word (and length) is picked. We will keep the chosen word secret and reveal it letter by letter.',
        },
      ],
    },

    // ── 5. Show the Blanks ────────────────────────────────────────────────────
    {
      slug: 'show-the-blanks',
      title: 'Show the Blanks',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'At the start, the player sees one blank for each letter. A `for` loop over the word builds a row of underscores.',
        },
        {
          kind: 'runnable',
          code:
            'word = "python"\n\n' +
            'display = ""\n' +
            'for letter in word:\n' +
            '    display += "_ "\n\n' +
            'print(display)',
        },
        {
          kind: 'paragraph',
          text: 'Six letters give six blanks: `_ _ _ _ _ _`. As the player guesses correctly, we will swap blanks for the real letters.',
        },
      ],
    },

    // ── 6. Guess a Letter ─────────────────────────────────────────────────────
    {
      slug: 'guess-a-letter',
      title: 'Guess a Letter',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `in` operator checks whether the guessed letter appears anywhere in the word.',
        },
        {
          kind: 'runnable',
          code:
            'word = "python"\n' +
            'guess = input("Guess a letter: ")\n\n' +
            'if guess in word:\n' +
            '    print("Yes!", guess, "is in the word.")\n' +
            'else:\n' +
            '    print("Sorry,", guess, "is not in the word.")',
          inputValues: ['p'],
        },
        {
          kind: 'paragraph',
          text: 'Guessing `p` against `python` is a hit. The same `in` you used with lists and dictionaries works on the characters of a string.',
        },
      ],
    },

    // ── 7. Reveal the Letters ─────────────────────────────────────────────────
    {
      slug: 'reveal-letters',
      title: 'Reveal the Letters',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To build the display, loop over the word and show each letter **only if** it has been guessed; otherwise show a blank. We keep guessed letters in a list.',
        },
        {
          kind: 'runnable',
          code:
            'word = "python"\n' +
            'guessed = ["p", "y", "t"]\n\n' +
            'display = ""\n' +
            'for letter in word:\n' +
            '    if letter in guessed:\n' +
            '        display += letter + " "\n' +
            '    else:\n' +
            '        display += "_ "\n\n' +
            'print(display)',
        },
        {
          kind: 'paragraph',
          text: 'With `p`, `y`, `t` guessed, the display is `p y t _ _ _`. This one loop is the heart of Hangman — it redraws the word after every guess.',
        },
      ],
    },

    // ── 8. Exercise: Build the Display ────────────────────────────────────────
    {
      slug: 'build-the-display-exercise',
      title: 'Your Turn: Build the Display',
      type: 'exercise',
      problemDescription:
        'Build the masked display yourself.\n\n' +
        '- The word is `coding` and the guessed letters are `["c", "o", "d"]`.\n' +
        '- Loop over the word: add the letter + a space if it has been guessed, otherwise add `"_ "`.\n' +
        '- Print the display.\n\n' +
        'The expected output is `c o d _ _ _`.',
      starterCode:
        'word = "coding"\n' +
        'guessed = ["c", "o", "d"]\n\n' +
        'display = ""\n' +
        'for letter in word:\n' +
        '    if letter in guessed:\n' +
        '        display += letter + " "\n' +
        '    else:\n' +
        '        ___\n\n' +
        'print(display)\n',
      expectedOutput: 'c o d _ _ _',
      validationMode: 'exact',
      solution:
        'word = "coding"\n' +
        'guessed = ["c", "o", "d"]\n' +
        'display = ""\n' +
        'for letter in word:\n' +
        '    if letter in guessed:\n' +
        '        display += letter + " "\n' +
        '    else:\n' +
        '        display += "_ "\n' +
        'print(display)',
    },

    // ── 9. Track Wrong Guesses ────────────────────────────────────────────────
    {
      slug: 'track-wrong-guesses',
      title: 'Track Wrong Guesses',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The player gets a limited number of lives. A wrong guess (the letter is `not in` the word) costs one.',
        },
        {
          kind: 'runnable',
          code:
            'word = "python"\n' +
            'lives = 6\n' +
            'guess = "z"\n\n' +
            'if guess not in word:\n' +
            '    lives -= 1\n' +
            '    print("Wrong! Lives left:", lives)\n' +
            'else:\n' +
            '    print("Good guess!")',
        },
        {
          kind: 'paragraph',
          text: 'Since `z` is not in `python`, the player loses a life, leaving `5`. When lives reach `0`, the game is over.',
        },
      ],
    },

    // ── 10. The Game Loop ─────────────────────────────────────────────────────
    {
      slug: 'the-game-loop',
      title: 'The Game Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A `while` loop ties it together: redraw the word, check for a win, then take a guess. (For this demo the word is fixed and the guesses are chosen so the player wins.)',
        },
        {
          kind: 'runnable',
          code:
            'word = "cat"\n' +
            'guessed = []\n' +
            'lives = 6\n\n' +
            'while lives > 0:\n' +
            '    display = ""\n' +
            '    for letter in word:\n' +
            '        if letter in guessed:\n' +
            '            display += letter + " "\n' +
            '        else:\n' +
            '            display += "_ "\n' +
            '    print(display)\n\n' +
            '    if "_" not in display:\n' +
            '        print("You won!")\n' +
            '        break\n\n' +
            '    guess = input("Guess a letter: ")\n' +
            '    guessed.append(guess)\n' +
            '    if guess not in word:\n' +
            '        lives -= 1\n' +
            '        print("Wrong! Lives:", lives)',
          inputValues: ['c', 'a', 't'],
        },
        {
          kind: 'paragraph',
          text: 'Each pass redraws the word and asks for a letter. Once there are no blanks left (`"_" not in display`), the player has won and the loop `break`s.',
        },
      ],
    },

    // ── 11. Win or Lose ───────────────────────────────────────────────────────
    {
      slug: 'win-or-lose',
      title: 'Win or Lose',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'When the loop ends, a quick check on `lives` tells the player how it went.',
        },
        {
          kind: 'runnable',
          code:
            'word = "cat"\n' +
            'lives = 0\n\n' +
            'if lives > 0:\n' +
            '    print("Congratulations, you guessed it!")\n' +
            'else:\n' +
            '    print("Game over! The word was", word)',
        },
        {
          kind: 'paragraph',
          text: 'If `lives` reached 0 the player lost, and we reveal the word. Otherwise they won. The complete game puts this together with the loop.',
        },
      ],
    },

    // ── 12. The Complete Game ─────────────────────────────────────────────────
    {
      slug: 'the-complete-game',
      title: 'The Complete Game',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Here is the full game — blanks, guessing, lives, and win/lose messages together. The word is fixed so the demo runs cleanly; in your own version, swap in `random.choice(words)` to pick a new word each time.',
        },
        {
          kind: 'runnable',
          code:
            'word = "python"\n' +
            'guessed = []\n' +
            'lives = 6\n\n' +
            'print("Welcome to Hangman! Guess the word.")\n\n' +
            'while lives > 0:\n' +
            '    display = ""\n' +
            '    for letter in word:\n' +
            '        if letter in guessed:\n' +
            '            display += letter + " "\n' +
            '        else:\n' +
            '            display += "_ "\n' +
            '    print(display)\n\n' +
            '    if "_" not in display:\n' +
            '        print("You won! The word was", word)\n' +
            '        break\n\n' +
            '    guess = input("Guess a letter: ")\n' +
            '    guessed.append(guess)\n\n' +
            '    if guess not in word:\n' +
            '        lives -= 1\n' +
            '        print("Nope! Lives left:", lives)\n' +
            '    else:\n' +
            '        print("Good guess!")\n\n' +
            'if lives == 0:\n' +
            '    print("Game over! The word was", word)',
          inputValues: ['p', 'y', 't', 'h', 'o', 'n'],
        },
        {
          kind: 'paragraph',
          text: 'Guessing the letters of `python` reveals the word and wins the game. Press **Run** and play — in the live app you type real guesses, and a random word keeps every game different.',
        },
      ],
    },

    // ── 13. Add More Features ─────────────────────────────────────────────────
    {
      slug: 'add-more-features',
      title: 'Add More Features',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Ideas to take it further, each using skills you have:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Reject a letter the player already guessed (check `guess in guessed`).',
            'Show the wrong letters guessed so far in a list.',
            'Use a `set` of the word\'s letters to detect a win more directly.',
            'Add word categories (animals, countries) with a dictionary of lists.',
          ],
        },
      ],
    },

    // ── 14. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Hangman — Complete',
      type: 'recap',
      congratsTitle: 'You built Hangman! 🎯',
      summary:
        'You combined a list of guessed letters, a loop that redraws the word from blanks, ' +
        'the `in` and `not in` operators, a lives counter, and a game loop into a complete ' +
        'word-guessing game. That is a lot of the course working together. One project left: ' +
        'the Word Frequency Counter.',
      nextModuleTitle: 'Word Frequency Counter',
    },
  ],
}
