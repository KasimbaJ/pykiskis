import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 · Module 5: Dictionaries — 11 lesson screens.
//
// Key/value pairs: create, access by key, add/update, membership + delete, len,
// and looping (keys and .items()). Modern Python preserves insertion order, but
// predict-output/figures access specific keys to stay obviously deterministic.
// ─────────────────────────────────────────────────────────────────────────────

export const dictionariesModule: Module = {
  slug: 'dictionaries',
  title: 'Dictionaries',
  summary: 'Store data as key/value pairs you can look up by name.',
  lessons: [
    // ── 1. What Is a Dictionary? ──────────────────────────────────────────────
    {
      slug: 'what-is-a-dictionary',
      title: 'What Is a Dictionary?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A list stores items by **position** (index 0, 1, 2...). A **dictionary** stores items by **name** instead. Each entry is a **key** paired with a **value**.',
        },
        {
          kind: 'paragraph',
          text: 'Think of a real dictionary: you look up a word (the key) to find its definition (the value). In Python, you might store each person\'s age, or each product\'s price.',
        },
        {
          kind: 'note',
          text: 'Dictionaries use curly braces `{ }`, with each pair written as `key: value`.',
        },
      ],
    },

    // ── 2. Creating a Dictionary ──────────────────────────────────────────────
    {
      slug: 'creating-a-dictionary',
      title: 'Creating a Dictionary',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Write each `key: value` pair inside curly braces, separated by commas.',
        },
        {
          kind: 'runnable',
          code:
            'ages = {"Ada": 36, "Bob": 25}\n' +
            'print(ages)',
        },
        {
          kind: 'paragraph',
          text: 'Here the keys are the names `"Ada"` and `"Bob"`, and the values are their ages. Keys are usually strings, and each key maps to one value.',
        },
      ],
    },

    // ── 3. Accessing Values ───────────────────────────────────────────────────
    {
      slug: 'accessing-values',
      title: 'Accessing Values',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To get a value, put its **key** in square brackets — just like an index, but using the name instead of a position.',
        },
        {
          kind: 'runnable',
          code:
            'ages = {"Ada": 36, "Bob": 25}\n\n' +
            'print(ages["Ada"])\n' +
            'print(ages["Bob"])',
        },
        {
          kind: 'note',
          text: '**Watch out:** asking for a key that does not exist (like `ages["Cara"]`) raises a **KeyError**. Only keys that are actually in the dictionary can be looked up.',
        },
      ],
    },

    // ── 4. Adding and Updating ────────────────────────────────────────────────
    {
      slug: 'adding-and-updating',
      title: 'Adding and Updating',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Assigning to a key either **adds** a new pair (if the key is new) or **updates** the value (if the key already exists).',
        },
        {
          kind: 'runnable',
          code:
            'ages = {"Ada": 36}\n\n' +
            'ages["Bob"] = 25     # adds a new pair\n' +
            'ages["Ada"] = 37     # updates Ada\'s value\n\n' +
            'print(ages["Ada"])\n' +
            'print(ages["Bob"])',
        },
        {
          kind: 'paragraph',
          text: '`ages["Bob"] = 25` adds Bob, and `ages["Ada"] = 37` changes Ada\'s age from 36 to 37. So this prints `37` then `25`. Each key holds just one value — assigning again replaces it.',
        },
      ],
    },

    // ── 5. Visualizing a Dictionary ───────────────────────────────────────────
    {
      slug: 'visualizing-a-dictionary',
      title: 'Visualizing a Dictionary',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Step through this and watch the dictionary itself change: a new pair is added, then an existing value is updated in place.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize and watch the ages dictionary grow, then change.',
          code:
            'ages = {"Ada": 36}\n' +
            'ages["Bob"] = 25\n' +
            'ages["Ada"] = 37\n' +
            'print(ages["Ada"])',
        },
        {
          kind: 'paragraph',
          text: 'The dictionary starts with one pair, gains `"Bob": 25`, then `"Ada"` updates from 36 to 37 — all in the same dictionary object. Finally it prints `37`.',
        },
      ],
    },

    // ── 6. Checking and Removing ──────────────────────────────────────────────
    {
      slug: 'checking-and-removing',
      title: 'Checking and Removing',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Use `in` to check whether a key exists (handy for avoiding a KeyError), and `del` to remove a pair.',
        },
        {
          kind: 'runnable',
          code:
            'ages = {"Ada": 36, "Bob": 25}\n\n' +
            'print("Ada" in ages)\n\n' +
            'del ages["Bob"]\n' +
            'print("Bob" in ages)',
        },
        {
          kind: 'paragraph',
          text: '`"Ada" in ages` is `True`. After `del ages["Bob"]`, the key is gone, so `"Bob" in ages` is `False`.',
        },
      ],
    },

    // ── 6. How Many Pairs? ────────────────────────────────────────────────────
    {
      slug: 'dictionary-length',
      title: 'How Many Pairs?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`len()` tells you how many key/value pairs a dictionary holds.',
        },
        {
          kind: 'runnable',
          code:
            'ages = {"Ada": 36, "Bob": 25, "Cara": 41}\n' +
            'print(len(ages))',
        },
        {
          kind: 'paragraph',
          text: 'This prints `3` — one for each pair.',
        },
      ],
    },

    // ── 7. Looping Over a Dictionary ──────────────────────────────────────────
    {
      slug: 'looping-over-a-dictionary',
      title: 'Looping Over a Dictionary',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Looping over a dictionary gives you its **keys**. The `.items()` method gives you each key and value together — very handy.',
        },
        {
          kind: 'runnable',
          code:
            'ages = {"Ada": 36, "Bob": 25}\n\n' +
            'for name, age in ages.items():\n' +
            '    print(name, "is", age)',
        },
        {
          kind: 'paragraph',
          text: 'Each loop, `name` and `age` are unpacked from one pair, printing `Ada is 36` then `Bob is 25`. (You can also loop `for name in ages:` to get just the keys, then use `ages[name]` for the value.)',
        },
      ],
    },

    // ── 8. Quiz: Look Up a Value ──────────────────────────────────────────────
    {
      slug: 'quiz-dict-access',
      title: 'Looking Up a Value',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`d = {"x": 1, "y": 2}`\n' +
        '`print(d["y"])`',
      options: [
        { id: 'a', text: '`1`' },
        { id: 'b', text: '`2`' },
        { id: 'c', text: '`y`' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'b',
      explanation: 'The key `"y"` maps to the value `2`, so `d["y"]` is `2`.',
    },

    // ── 9. Quiz: Which Brackets? ──────────────────────────────────────────────
    {
      slug: 'quiz-dict-brackets',
      title: 'Spotting a Dictionary',
      type: 'quiz',
      question: 'Which brackets are used to create a dictionary?',
      options: [
        { id: 'a', text: 'Square brackets `[ ]`' },
        { id: 'b', text: 'Round brackets `( )`' },
        { id: 'c', text: 'Curly braces `{ }`' },
        { id: 'd', text: 'Quotation marks `" "`' },
      ],
      correctOptionId: 'c',
      explanation: 'Dictionaries use curly braces with `key: value` pairs, e.g. `{"Ada": 36}`.',
    },

    // ── 10. Exercise: Add a Price ─────────────────────────────────────────────
    {
      slug: 'add-a-price-exercise',
      title: 'Your Turn: Add a Price',
      type: 'exercise',
      problemDescription:
        'Work with a dictionary.\n\n' +
        '- A dictionary `prices = {"apple": 3}` is already created.\n' +
        '- Add a new pair: `"banana"` with the value `2`.\n' +
        '- Print the price of the banana.\n\n' +
        'The expected output is `2`.',
      starterCode:
        'prices = {"apple": 3}\n\n' +
        '# Add "banana": 2, then print the banana\'s price\n',
      expectedOutput: '2',
      validationMode: 'exact',
      solution:
        'prices = {"apple": 3}\n' +
        'prices["banana"] = 2\n' +
        'print(prices["banana"])',
    },

    // ── 11. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Dictionaries — Complete',
      type: 'recap',
      congratsTitle: 'You can use dictionaries!',
      summary:
        'A dictionary stores `key: value` pairs in curly braces. You look up a value by its ' +
        'key, add or update pairs by assigning to a key, check keys with `in`, remove them with ' +
        '`del`, measure with `len()`, and loop with `.items()`. Next is a short Progress Test on ' +
        'strings and dictionaries.',
      nextModuleTitle: 'Progress Test',
    },
  ],
}
