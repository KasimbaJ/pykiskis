import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 3 · Project 5: Mad Libs — 9 lesson screens.
//
// A creative word game: collect words with input() and drop them into a story
// with f-strings. Pure Chapter 1 skills (input, variables, strings, f-strings,
// print) — no loops, random, functions, or lists. A lighter, string-focused
// project to round out the chapter. Runnables use inputValues.
// ─────────────────────────────────────────────────────────────────────────────

export const madLibsModule: Module = {
  slug: 'mad-libs',
  title: 'Mad Libs',
  summary: 'Collect words and drop them into a silly story.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'For your final Chapter 3 project, you will build **Mad Libs** — the word game where you collect a few words from the player, then drop them into a story to hilarious effect. 📝',
        },
        {
          kind: 'paragraph',
          text: 'It is a lighter project that shines a spotlight on **strings** and **f-strings**. No loops or randomness here — just clean, creative text.',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Ask the player for words like a name, an adjective, and an animal',
            'Weave those words into a pre-written story with f-strings',
            'Print a different, funny story every time',
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
          text: 'This one keeps it simple. You only need a few Chapter 1 skills:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Reading text with `input()`',
            'Storing it in variables',
            'Building sentences with **f-strings** (`f"..."` with `{ }` placeholders)',
            'Printing with `print()`',
          ],
        },
      ],
    },

    // ── 3. Collecting Words ───────────────────────────────────────────────────
    {
      slug: 'collecting-words',
      title: 'Collecting Words',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'First we gather a couple of words from the player and store each in its own variable. Since they are text, no conversion is needed.',
        },
        {
          kind: 'runnable',
          code:
            'name = input("Enter a name: ")\n' +
            'animal = input("Enter an animal: ")\n\n' +
            'print("Name:", name)\n' +
            'print("Animal:", animal)',
          inputValues: ['Ada', 'cat'],
        },
        {
          kind: 'paragraph',
          text: 'Each `input()` pauses for one answer and stores it. Now we have two words to play with.',
        },
      ],
    },

    // ── 4. Building the Story ─────────────────────────────────────────────────
    {
      slug: 'building-the-story',
      title: 'Building the Story',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The magic of Mad Libs is dropping those words into a sentence. An **f-string** lets us slot variables straight into text using `{ }`.',
        },
        {
          kind: 'runnable',
          code:
            'name = input("Enter a name: ")\n' +
            'animal = input("Enter an animal: ")\n\n' +
            'print(f"{name} has a pet {animal} that follows them everywhere.")',
          inputValues: ['Ada', 'cat'],
        },
        {
          kind: 'paragraph',
          text: 'With `Ada` and `cat`, this prints `Ada has a pet cat that follows them everywhere.` Change the words and the story changes with them.',
        },
      ],
    },

    // ── 5. A Longer Story ─────────────────────────────────────────────────────
    {
      slug: 'a-longer-story',
      title: 'A Longer Story',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The more blanks you collect, the funnier it gets. Let us gather a few more words and spread them across several lines.',
        },
        {
          kind: 'runnable',
          code:
            'name = input("Enter a name: ")\n' +
            'adjective = input("Enter an adjective: ")\n' +
            'animal = input("Enter an animal: ")\n' +
            'place = input("Enter a place: ")\n\n' +
            'print(f"One day, {name} found a {adjective} {animal} at the {place}.")\n' +
            'print(f"Everyone at the {place} could not stop laughing!")',
          inputValues: ['Ada', 'fluffy', 'penguin', 'library'],
        },
        {
          kind: 'paragraph',
          text: 'Notice the same variable (`place`) can appear more than once — f-strings let you reuse any word as often as the story needs.',
        },
      ],
    },

    // ── 6. Exercise: Fill in the Blank ────────────────────────────────────────
    {
      slug: 'fill-in-the-blank-exercise',
      title: 'Your Turn: Fill in the Blank',
      type: 'exercise',
      problemDescription:
        'Build one Mad Libs sentence.\n\n' +
        '- Read an adjective and a noun with `input()`.\n' +
        '- Use an f-string to print exactly: `The <adjective> <noun> jumped over the fence.`\n\n' +
        'The test enters `lazy` then `dog`, so the expected output is `The lazy dog jumped over the fence.`',
      starterCode:
        'adjective = input("Adjective: ")\n' +
        'noun = input("Noun: ")\n\n' +
        '# Print: The <adjective> <noun> jumped over the fence.\n',
      expectedOutput: 'The lazy dog jumped over the fence.',
      validationMode: 'exact',
      inputValues: ['lazy', 'dog'],
      solution:
        'adjective = input("Adjective: ")\n' +
        'noun = input("Noun: ")\n' +
        'print(f"The {adjective} {noun} jumped over the fence.")',
    },

    // ── 7. The Complete Mad Libs ──────────────────────────────────────────────
    {
      slug: 'the-complete-mad-libs',
      title: 'The Complete Mad Libs',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Now collect a full set of words and weave them into a complete story. This is your finished Mad Libs generator.',
        },
        {
          kind: 'runnable',
          code:
            'print("Mad Libs! Fill in the blanks.")\n\n' +
            'name = input("Enter a name: ")\n' +
            'adjective = input("Enter an adjective: ")\n' +
            'animal = input("Enter an animal: ")\n' +
            'verb = input("Enter a verb (past tense): ")\n' +
            'place = input("Enter a place: ")\n' +
            'number = input("Enter a number: ")\n\n' +
            'print()\n' +
            'print("=== Your Story ===")\n' +
            'print(f"{name} woke up to a very {adjective} morning.")\n' +
            'print(f"Outside was a {animal} that {verb} across the {place}.")\n' +
            'print(f"It must have done that at least {number} times!")\n' +
            'print(f"{name} laughed and knew it would be a great day.")',
          inputValues: ['Ada', 'sunny', 'dog', 'ran', 'garden', '7'],
        },
        {
          kind: 'paragraph',
          text: 'Run it and supply your own silly words. Because the story is fixed but the words are not, every play-through is different — that is the whole charm of Mad Libs.',
        },
      ],
    },

    // ── 8. Add More Features ──────────────────────────────────────────────────
    {
      slug: 'add-more-features',
      title: 'Add More Features',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Make the story your own:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Add more blanks — a colour, a food, an exclamation — for a longer story.',
            'Write a second story and let the player pick which one to fill in with an `if`.',
            'Ask for a plural noun and a verb to make the grammar funnier.',
            'Reuse a word in a surprising place later in the story.',
          ],
        },
        {
          kind: 'note',
          text: 'Writing the story is half the fun — the sillier the template, the better the result.',
        },
      ],
    },

    // ── 9. Recap ──────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Mad Libs — Complete',
      type: 'recap',
      congratsTitle: 'You built a Mad Libs generator! 🎉',
      summary:
        'You collected words with `input()` and slotted them into a story with f-strings to ' +
        'create a fresh, funny result every time. That wraps up Chapter 3 — you have now built ' +
        'five complete projects from scratch. Next chapter, you will learn to write your own ' +
        'functions and make your code even more powerful.',
      nextModuleTitle: 'Functions',
    },
  ],
}
