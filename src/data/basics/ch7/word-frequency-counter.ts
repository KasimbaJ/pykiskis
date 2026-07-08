import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 7 · Project 4: Word Frequency Counter — 13 lesson screens.
//
// Strings (.lower/.split/.replace) + dicts (.get counter) + sets (unique) +
// for loops + functions. Deterministic throughout: the graded exercise is
// pure-data; the complete app reads text via a single input() (one inputValue,
// no input loop). Finds the most-common word with a plain loop (taught skills).
// ─────────────────────────────────────────────────────────────────────────────

export const wordFrequencyCounterModule: Module = {
  slug: 'word-frequency-counter',
  title: 'Word Frequency Counter',
  summary: 'Feed in text and get a report of how often each word appears.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'For your final project, you will build a **Word Frequency Counter** 📊. Give it some text, and it tells you how many words there are, how many are unique, and which word appears most often.',
        },
        {
          kind: 'paragraph',
          text: 'It is the perfect showcase for Chapter 5 — strings, dictionaries, and sets working together — wrapped up with functions.',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Split text into words',
            'Tidy them up (lowercase, remove punctuation)',
            'Count each word with a dictionary',
            'Report the totals and the most common word',
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
          text: 'This project leans on your Chapter 5 data-type skills:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Strings: `.lower()`, `.replace()`, and `.split()`',
            'Dictionaries: counting with `.get()`',
            'Sets: finding unique items',
            'A `for` loop and a function to tie it together',
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
          text: 'Four plain steps:',
        },
        {
          kind: 'figure',
          code:
            '1. Split the text into a list of words.\n' +
            '2. Normalise them: lowercase + remove punctuation.\n' +
            '3. Count each word using a dictionary.\n' +
            '4. Report: total words, unique words, most common word.',
          output: '',
          caption: 'The plan — each step becomes a few lines of Python.',
        },
      ],
    },

    // ── 4. Text to Words ──────────────────────────────────────────────────────
    {
      slug: 'text-to-words',
      title: 'Text to Words',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `.split()` method turns a sentence into a list of words, splitting on spaces.',
        },
        {
          kind: 'runnable',
          code:
            'text = "the cat sat on the mat"\n' +
            'words = text.split()\n\n' +
            'print(words)\n' +
            'print(len(words))',
        },
        {
          kind: 'paragraph',
          text: 'That gives a list of 6 words. `len(words)` is the total word count — the first number in our report.',
        },
      ],
    },

    // ── 5. Normalise the Text ─────────────────────────────────────────────────
    {
      slug: 'normalize-the-text',
      title: 'Normalise the Text',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Without tidying, `"The"`, `"the"`, and `"the."` count as three different words. We fix that by lowercasing and removing punctuation **before** splitting.',
        },
        {
          kind: 'runnable',
          code:
            'text = "The CAT sat. The cat Ran!"\n\n' +
            'text = text.lower()\n' +
            'text = text.replace(".", "").replace("!", "")\n' +
            'words = text.split()\n\n' +
            'print(words)',
        },
        {
          kind: 'paragraph',
          text: 'After lowercasing and stripping the `.` and `!`, the words line up: `[\'the\', \'cat\', \'sat\', \'the\', \'cat\', \'ran\']`. Now `the` matches `the`, ready to be counted accurately.',
        },
      ],
    },

    // ── 6. Count With a Dictionary ────────────────────────────────────────────
    {
      slug: 'count-with-a-dict',
      title: 'Count With a Dictionary',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A dictionary maps each word to its count. The `.get(word, 0)` trick reads the current count (or 0 if the word is new), then we add 1.',
        },
        {
          kind: 'runnable',
          code:
            'words = ["the", "cat", "the", "mat", "the"]\n\n' +
            'counts = {}\n' +
            'for word in words:\n' +
            '    counts[word] = counts.get(word, 0) + 1\n\n' +
            'print(counts["the"])\n' +
            'print(counts["cat"])',
        },
        {
          kind: 'paragraph',
          text: '`counts.get(word, 0)` avoids a KeyError the first time a word appears. After the loop, `the` is `3` and `cat` is `1`. This little pattern is the core of the whole counter.',
        },
      ],
    },

    // ── 7. Exercise: Count the Words ──────────────────────────────────────────
    {
      slug: 'count-the-words-exercise',
      title: 'Your Turn: Count the Words',
      type: 'exercise',
      problemDescription:
        'Count words with a dictionary.\n\n' +
        '- The text `"a b a c a b"` is split into `words`.\n' +
        '- Use the `.get()` counting pattern to count each word.\n' +
        '- Print how many times `"a"` appears.\n\n' +
        'The expected output is `3`.',
      starterCode:
        'text = "a b a c a b"\n' +
        'words = text.split()\n' +
        'counts = {}\n\n' +
        '# Count each word, then print counts["a"]\n' +
        'for word in words:\n' +
        '    ___\n\n' +
        'print(counts["a"])\n',
      expectedOutput: '3',
      validationMode: 'exact',
      solution:
        'text = "a b a c a b"\n' +
        'words = text.split()\n' +
        'counts = {}\n' +
        'for word in words:\n' +
        '    counts[word] = counts.get(word, 0) + 1\n' +
        'print(counts["a"])',
    },

    // ── 8. Unique Words With a Set ────────────────────────────────────────────
    {
      slug: 'unique-words-with-a-set',
      title: 'Unique Words With a Set',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'How many **different** words are there? Convert the list to a `set` (which drops duplicates) and take its length.',
        },
        {
          kind: 'runnable',
          code:
            'words = ["the", "cat", "the", "mat", "the"]\n\n' +
            'unique = set(words)\n' +
            'print(len(unique))',
        },
        {
          kind: 'paragraph',
          text: 'Five words, but only three distinct ones (`the`, `cat`, `mat`), so `len(unique)` is `3` — the unique-word count for our report.',
        },
      ],
    },

    // ── 9. Find the Most Common ───────────────────────────────────────────────
    {
      slug: 'find-the-most-common',
      title: 'Find the Most Common',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To find the word with the highest count, loop through the dictionary and remember the biggest so far — the same "find the largest" idea, applied to counts.',
        },
        {
          kind: 'runnable',
          code:
            'counts = {"the": 3, "cat": 1, "mat": 1}\n\n' +
            'most_common = ""\n' +
            'highest = 0\n' +
            'for word in counts:\n' +
            '    if counts[word] > highest:\n' +
            '        highest = counts[word]\n' +
            '        most_common = word\n\n' +
            'print(most_common)\n' +
            'print(highest)',
        },
        {
          kind: 'note',
          text: 'This prints `the` and `3`. (Python also offers a shortcut, `max(counts, key=counts.get)`, but writing the loop yourself shows exactly how it works.)',
        },
      ],
    },

    // ── 10. Wrap It in a Function ─────────────────────────────────────────────
    {
      slug: 'wrap-in-a-function',
      title: 'Wrap It in a Function',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The counting logic is reusable, so it belongs in a function that takes text and returns the counts dictionary.',
        },
        {
          kind: 'runnable',
          code:
            'def count_words(text):\n' +
            '    words = text.split()\n' +
            '    counts = {}\n' +
            '    for word in words:\n' +
            '        counts[word] = counts.get(word, 0) + 1\n' +
            '    return counts\n\n' +
            'result = count_words("the cat the dog the")\n' +
            'print(result["the"])',
        },
        {
          kind: 'paragraph',
          text: '`count_words` hands back the whole dictionary, so `result["the"]` is `3`. Wrapping logic in a function keeps the main program short and readable.',
        },
      ],
    },

    // ── 11. The Complete App ──────────────────────────────────────────────────
    {
      slug: 'the-complete-app',
      title: 'The Complete App',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Now the full report: read some text, normalise it, count the words, and print the totals plus the most common word.',
        },
        {
          kind: 'runnable',
          code:
            'text = input("Enter some text: ")\n\n' +
            'text = text.lower()\n' +
            'text = text.replace(".", "").replace(",", "").replace("!", "")\n' +
            'words = text.split()\n\n' +
            'counts = {}\n' +
            'for word in words:\n' +
            '    counts[word] = counts.get(word, 0) + 1\n\n' +
            'print("Total words:", len(words))\n' +
            'print("Unique words:", len(set(words)))\n\n' +
            'most_common = ""\n' +
            'highest = 0\n' +
            'for word in counts:\n' +
            '    if counts[word] > highest:\n' +
            '        highest = counts[word]\n' +
            '        most_common = word\n\n' +
            'print("Most common word:", most_common, "(" + str(highest) + " times)")',
          inputValues: ['the cat sat on the mat the cat ran'],
        },
        {
          kind: 'paragraph',
          text: 'For the sample text, it reports 9 total words, 6 unique words, and `the` as the most common (3 times). A complete little text-analysis tool — built from the data types you learned in Chapter 5!',
        },
      ],
    },

    // ── 12. Add More Features ─────────────────────────────────────────────────
    {
      slug: 'add-more-features',
      title: 'Add More Features',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Ways to grow the project:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Ignore common "stop words" (the, a, and) using a set to skip them.',
            'Print the top 3 words, not just the single most common.',
            'Strip more punctuation (`?`, `:`, `;`) for cleaner counts.',
            'Read the text from a file instead of from input.',
          ],
        },
      ],
    },

    // ── 13. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Word Frequency Counter — Complete',
      type: 'recap',
      congratsTitle: 'You built a Word Frequency Counter! 📊',
      summary:
        'You split and normalised text, counted words with a dictionary and the `.get()` ' +
        'pattern, found unique words with a set, and located the most common word with a loop — ' +
        'then wrapped it in a function. That is Chapter 5\'s data types working together on a ' +
        'real task, and it completes your Chapter 7 projects. Fantastic work!',
      nextModuleTitle: 'Finish',
    },
  ],
}
