import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 · Module 4: Strings — 12 lesson screens.
//
// Strings as sequences: indexing, slicing, len, looping over characters, and
// the common methods .upper/.lower/.split/.replace/.strip. All deterministic.
// ─────────────────────────────────────────────────────────────────────────────

export const stringsModule: Module = {
  slug: 'strings',
  title: 'Strings',
  summary: 'Work with text: indexing, slicing, and string methods.',
  lessons: [
    // ── 1. Strings Are Sequences ──────────────────────────────────────────────
    {
      slug: 'strings-are-sequences',
      title: 'Strings Are Sequences',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You have used strings since Chapter 1. Now you will see that a string is really a **sequence of characters** — much like a list, but made of letters.',
        },
        {
          kind: 'paragraph',
          text: 'That means many list skills carry straight over: you can index into a string, slice it, measure it with `len()`, and loop over it. Strings also come with their own helpful **methods**.',
        },
      ],
    },

    // ── 2. Indexing Characters ────────────────────────────────────────────────
    {
      slug: 'indexing-characters',
      title: 'Indexing Characters',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Each character has an index, starting at 0. Use square brackets to read one, exactly like a list. Negative indexes count from the end.',
        },
        {
          kind: 'runnable',
          code:
            'word = "Python"\n\n' +
            'print(word[0])\n' +
            'print(word[1])\n' +
            'print(word[-1])',
        },
        {
          kind: 'paragraph',
          text: 'This prints `P`, then `y`, then `n` (the last character). The same 0-based counting you learned for lists applies to the letters of a string.',
        },
      ],
    },

    // ── 3. Slicing Strings ────────────────────────────────────────────────────
    {
      slug: 'slicing-strings',
      title: 'Slicing Strings',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A **slice** grabs a range of characters. Write `[start:stop]` — it includes `start` and stops **before** `stop`, just like `range()`.',
        },
        {
          kind: 'runnable',
          code:
            'word = "Python"\n\n' +
            'print(word[0:3])   # characters at 0, 1, 2\n' +
            'print(word[3:])    # from index 3 to the end',
        },
        {
          kind: 'paragraph',
          text: '`word[0:3]` gives `Pyt` (stopping before index 3), and `word[3:]` gives `hon`. Leaving out the stop means "to the end"; leaving out the start means "from the beginning".',
        },
      ],
    },

    // ── 4. String Length ──────────────────────────────────────────────────────
    {
      slug: 'string-length',
      title: 'String Length',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`len()` counts the characters in a string — including spaces.',
        },
        {
          kind: 'runnable',
          code:
            'word = "Python"\n' +
            'print(len(word))',
        },
        {
          kind: 'paragraph',
          text: 'This prints `6`. The last character is always at index `len - 1`, so here that is index 5.',
        },
      ],
    },

    // ── 5. Looping Over Characters ────────────────────────────────────────────
    {
      slug: 'looping-over-characters',
      title: 'Looping Over Characters',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A `for` loop walks through a string one character at a time — the same way it walks through a list.',
        },
        {
          kind: 'runnable',
          code:
            'for letter in "cat":\n' +
            '    print(letter)',
        },
        {
          kind: 'paragraph',
          text: 'The loop variable `letter` becomes `c`, then `a`, then `t`. This is how you examine or count characters one by one.',
        },
      ],
    },

    // ── 6. Changing Case ──────────────────────────────────────────────────────
    {
      slug: 'changing-case',
      title: 'Changing Case',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Strings have **methods** — functions you call with a dot. `.upper()` and `.lower()` return a new string in upper or lower case.',
        },
        {
          kind: 'runnable',
          code:
            'name = "Ada"\n\n' +
            'print(name.upper())\n' +
            'print(name.lower())',
        },
        {
          kind: 'note',
          text: 'These methods return a **new** string — they do not change the original (strings, like tuples, cannot be changed in place). `name` is still `"Ada"` afterwards.',
        },
      ],
    },

    // ── 7. Splitting a String ─────────────────────────────────────────────────
    {
      slug: 'splitting-a-string',
      title: 'Splitting a String',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `.split()` method breaks a string into a **list** of pieces. With no argument, it splits on spaces — perfect for turning a sentence into words.',
        },
        {
          kind: 'runnable',
          code:
            'sentence = "one two three"\n' +
            'words = sentence.split()\n\n' +
            'print(words)\n' +
            'print(len(words))',
        },
        {
          kind: 'paragraph',
          text: '`split()` produces `[\'one\', \'two\', \'three\']`, and `len(words)` is `3`. Now you can loop over the words or index into them like any list.',
        },
      ],
    },

    // ── 8. Replace and Strip ──────────────────────────────────────────────────
    {
      slug: 'replace-and-strip',
      title: 'Replace and Strip',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Two more everyday methods: `.replace(old, new)` swaps text, and `.strip()` removes spaces from the start and end.',
        },
        {
          kind: 'runnable',
          code:
            'text = "hello world"\n' +
            'print(text.replace("world", "Python"))\n\n' +
            'padded = "  spaces  "\n' +
            'print(padded.strip())',
        },
        {
          kind: 'paragraph',
          text: '`replace` turns the text into `hello Python`, and `strip` trims the padding to just `spaces`. Like the case methods, both return a new string.',
        },
      ],
    },

    // ── 9. Quiz: Indexing ─────────────────────────────────────────────────────
    {
      slug: 'quiz-string-index',
      title: 'Reading a Character',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`word = "hello"`\n' +
        '`print(word[1])`',
      options: [
        { id: 'a', text: '`h`' },
        { id: 'b', text: '`e`' },
        { id: 'c', text: '`l`' },
        { id: 'd', text: '`hello`' },
      ],
      correctOptionId: 'b',
      explanation: 'Index counting starts at 0, so `word[1]` is the second character, `e`.',
    },

    // ── 10. Quiz: upper() ─────────────────────────────────────────────────────
    {
      slug: 'quiz-upper',
      title: 'Changing Case',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`print("abc".upper())`',
      options: [
        { id: 'a', text: '`abc`' },
        { id: 'b', text: '`ABC`' },
        { id: 'c', text: '`Abc`' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'b',
      explanation: '`.upper()` returns the string with every letter in upper case: `ABC`.',
    },

    // ── 11. Exercise: First Three Letters ─────────────────────────────────────
    {
      slug: 'first-three-letters-exercise',
      title: 'Your Turn: First Three Letters',
      type: 'exercise',
      problemDescription:
        'Slice a string.\n\n' +
        '- A variable `word = "Python"` is already created.\n' +
        '- Print just the first three letters using a slice.\n\n' +
        'The expected output is `Pyt`.',
      starterCode:
        'word = "Python"\n\n' +
        '# Print the first three letters using a slice\n',
      expectedOutput: 'Pyt',
      validationMode: 'exact',
      solution:
        'word = "Python"\n' +
        'print(word[0:3])',
    },

    // ── 12. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Strings — Complete',
      type: 'recap',
      congratsTitle: 'You can manipulate text!',
      summary:
        'You learned that a string is a sequence of characters: you can index it, slice ' +
        'ranges with `[start:stop]`, measure it with `len()`, and loop over its letters. You ' +
        'also met the methods `.upper()`, `.lower()`, `.split()`, `.replace()`, and `.strip()`. ' +
        'Next up: Dictionaries.',
      nextModuleTitle: 'Dictionaries',
    },
  ],
}
