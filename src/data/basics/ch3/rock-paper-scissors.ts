import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 3 · Project 4: Rock, Paper, Scissors — 10 lesson screens.
//
// Computer picks with random.randint(1,3) mapped to a name via if/elif; player
// types a choice; comparison logic decides the winner; a fixed 3-round for loop
// tracks the score. Ch1–2 skills only (no functions/lists). The round loop is
// bounded by range(3), so inputValues of length 3 always terminate it.
// ─────────────────────────────────────────────────────────────────────────────

export const rockPaperScissorsModule: Module = {
  slug: 'rock-paper-scissors',
  title: 'Rock, Paper, Scissors',
  summary: 'Play Rock, Paper, Scissors against the computer.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Time for a classic: **Rock, Paper, Scissors**. You will build a game where you play against the computer, which makes a random choice each round.',
        },
        {
          kind: 'paragraph',
          text: 'The rules you already know: rock crushes scissors, scissors cut paper, and paper covers rock. Your job is to turn those rules into Python.',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Let the computer choose randomly',
            'Read the player\'s choice',
            'Decide who wins each round and keep score',
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
          text: 'You already have every skill this game needs:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'The `random` module (from the Number Guessing Game)',
            'Reading text with `input()`',
            '`if` / `elif` / `else` to compare the two choices',
            'A `for` loop and counter variables to play several rounds and keep score',
          ],
        },
      ],
    },

    // ── 3. The Computer's Choice ──────────────────────────────────────────────
    {
      slug: 'the-computers-choice',
      title: "The Computer's Choice",
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The computer needs to pick rock, paper, or scissors at random. We get a random number from 1 to 3 and turn it into a word with `if` / `elif`.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'number = random.randint(1, 3)\n\n' +
            'if number == 1:\n' +
            '    computer = "rock"\n' +
            'elif number == 2:\n' +
            '    computer = "paper"\n' +
            'else:\n' +
            '    computer = "scissors"\n\n' +
            'print("Computer chose:", computer)',
        },
        {
          kind: 'paragraph',
          text: 'Run it a few times — the computer\'s choice changes. Mapping a random number to a word like this is a handy trick for any game.',
        },
      ],
    },

    // ── 4. The Player's Choice ────────────────────────────────────────────────
    {
      slug: 'the-players-choice',
      title: "The Player's Choice",
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Now we ask the player what they want to throw. Their answer is plain text, so no conversion is needed.',
        },
        {
          kind: 'runnable',
          code:
            'player = input("Choose rock, paper, or scissors: ")\n\n' +
            'print("You chose:", player)',
          inputValues: ['rock'],
        },
        {
          kind: 'note',
          text: 'For now we will trust the player to type one of the three words in lowercase. Handling typos is one of the improvements you can add later.',
        },
      ],
    },

    // ── 5. Who Wins? ──────────────────────────────────────────────────────────
    {
      slug: 'who-wins',
      title: 'Who Wins?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'This is the heart of the game. First check for a tie (both chose the same), then check each way the player can win. Anything else means the computer wins.',
        },
        {
          kind: 'runnable',
          code:
            'player = input("Choose rock, paper, or scissors: ")\n' +
            'computer = "scissors"   # pretend the computer picked this\n\n' +
            'if player == computer:\n' +
            '    print("It\'s a tie!")\n' +
            'elif player == "rock" and computer == "scissors":\n' +
            '    print("You win!")\n' +
            'elif player == "paper" and computer == "rock":\n' +
            '    print("You win!")\n' +
            'elif player == "scissors" and computer == "paper":\n' +
            '    print("You win!")\n' +
            'else:\n' +
            '    print("Computer wins!")',
          inputValues: ['rock'],
        },
        {
          kind: 'paragraph',
          text: 'With the player on `rock` and the computer on `scissors`, rock crushes scissors — `You win!` The three "win" branches list exactly the ways the player beats the computer; the `else` covers every losing case.',
        },
      ],
    },

    // ── 6. Exercise: Beat the Rock ────────────────────────────────────────────
    {
      slug: 'beat-the-rock-exercise',
      title: 'Your Turn: Beat the Rock',
      type: 'exercise',
      problemDescription:
        'The computer always throws `rock` this time. Read the player\'s choice and decide the result:\n\n' +
        '- If the player also chose `rock`, print `It\'s a tie!`.\n' +
        '- If the player chose `paper`, print `You win!` (paper covers rock).\n' +
        '- Otherwise (scissors), print `Computer wins!`.\n\n' +
        'The test enters `paper`, so the expected output is `You win!`.',
      starterCode:
        'computer = "rock"\n' +
        'player = input("Your choice: ")\n\n' +
        '# Tie if equal, "You win!" if paper, otherwise "Computer wins!"\n',
      expectedOutput: 'You win!',
      validationMode: 'exact',
      inputValues: ['paper'],
      solution:
        'computer = "rock"\n' +
        'player = input("Your choice: ")\n' +
        'if player == computer:\n' +
        '    print("It\'s a tie!")\n' +
        'elif player == "paper":\n' +
        '    print("You win!")\n' +
        'else:\n' +
        '    print("Computer wins!")',
    },

    // ── 7. Playing Several Rounds ─────────────────────────────────────────────
    {
      slug: 'playing-several-rounds',
      title: 'Playing Several Rounds',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A single round is over too quickly. A `for` loop lets us play a fixed number of rounds, and two counter variables keep score.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'player_score = 0\n' +
            'computer_score = 0\n\n' +
            'for i in range(3):\n' +
            '    number = random.randint(1, 3)\n' +
            '    if number == 1:\n' +
            '        computer = "rock"\n' +
            '    elif number == 2:\n' +
            '        computer = "paper"\n' +
            '    else:\n' +
            '        computer = "scissors"\n\n' +
            '    player = input("Choose rock, paper, or scissors: ")\n\n' +
            '    if player == computer:\n' +
            '        print("Tie!")\n' +
            '    elif player == "rock" and computer == "scissors":\n' +
            '        print("You win this round!")\n' +
            '        player_score = player_score + 1\n' +
            '    elif player == "paper" and computer == "rock":\n' +
            '        print("You win this round!")\n' +
            '        player_score = player_score + 1\n' +
            '    elif player == "scissors" and computer == "paper":\n' +
            '        print("You win this round!")\n' +
            '        player_score = player_score + 1\n' +
            '    else:\n' +
            '        print("Computer wins this round!")\n' +
            '        computer_score = computer_score + 1\n\n' +
            'print("Final score - You:", player_score, "Computer:", computer_score)',
          inputValues: ['rock', 'paper', 'scissors'],
        },
        {
          kind: 'paragraph',
          text: 'The loop runs three rounds, reading one choice each time, and adds to whichever score won. After the loop, it prints the totals.',
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
          text: 'Let us polish it: announce each round, reveal the computer\'s choice, and declare an overall winner at the end.',
        },
        {
          kind: 'runnable',
          code:
            'import random\n\n' +
            'player_score = 0\n' +
            'computer_score = 0\n\n' +
            'for i in range(3):\n' +
            '    print("--- Round", i + 1, "---")\n' +
            '    number = random.randint(1, 3)\n' +
            '    if number == 1:\n' +
            '        computer = "rock"\n' +
            '    elif number == 2:\n' +
            '        computer = "paper"\n' +
            '    else:\n' +
            '        computer = "scissors"\n\n' +
            '    player = input("Choose rock, paper, or scissors: ")\n' +
            '    print("Computer chose:", computer)\n\n' +
            '    if player == computer:\n' +
            '        print("Tie!")\n' +
            '    elif player == "rock" and computer == "scissors":\n' +
            '        print("You win this round!")\n' +
            '        player_score = player_score + 1\n' +
            '    elif player == "paper" and computer == "rock":\n' +
            '        print("You win this round!")\n' +
            '        player_score = player_score + 1\n' +
            '    elif player == "scissors" and computer == "paper":\n' +
            '        print("You win this round!")\n' +
            '        player_score = player_score + 1\n' +
            '    else:\n' +
            '        print("Computer wins this round!")\n' +
            '        computer_score = computer_score + 1\n\n' +
            'print("Final score - You:", player_score, "Computer:", computer_score)\n' +
            'if player_score > computer_score:\n' +
            '    print("You won the game!")\n' +
            'elif computer_score > player_score:\n' +
            '    print("The computer won. Try again!")\n' +
            'else:\n' +
            '    print("It\'s a draw!")',
          inputValues: ['rock', 'paper', 'scissors'],
        },
        {
          kind: 'paragraph',
          text: 'That is a full game — random opponent, three rounds, running score, and a final result. Press **Run** and play!',
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
          text: 'Make the game your own with a few upgrades — each uses skills you already have:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Ask the player how many rounds they want and use that in `range()`.',
            'Reject invalid input ("lizard"?) with an `if` check before scoring.',
            'Play "first to 3 wins" with a `while` loop instead of a fixed count.',
            'Print a running score after every round, not just at the end.',
          ],
        },
      ],
    },

    // ── 10. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Rock, Paper, Scissors — Complete',
      type: 'recap',
      congratsTitle: 'You built Rock, Paper, Scissors! ✊✋✌️',
      summary:
        'You mapped a random number to the computer\'s move, compared it against the player\'s ' +
        'choice to decide each round, and used a loop with counters to play a best-of-three ' +
        'and crown a winner. Next up: a creative Mad Libs word game.',
      nextModuleTitle: 'Mad Libs',
    },
  ],
}
