import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 · Module 8: Conversion — 9 lesson screens.
//
// Converting between data types: list()/tuple()/set(), split()/join(), and a
// recap of int()/str(). Set conversions are checked via len() (sets are
// unordered); list/tuple conversions print in order, so are safe to show.
// ─────────────────────────────────────────────────────────────────────────────

export const conversionModule: Module = {
  slug: 'conversion',
  title: 'Conversion',
  summary: 'Convert between lists, tuples, sets, strings, and numbers.',
  lessons: [
    // ── 1. Why Convert? ───────────────────────────────────────────────────────
    {
      slug: 'why-convert',
      title: 'Why Convert?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Each data type is good at something different: lists keep order and can change, tuples stay fixed, sets remove duplicates, and strings hold text. **Conversion** lets you switch between them to use the right tool for the job.',
        },
        {
          kind: 'paragraph',
          text: 'You convert with the type\'s name as a function: `list()`, `tuple()`, `set()`, `str()`, `int()`. You already used `int()` and `str()` back in Chapter 1 — now we extend the idea to collections.',
        },
      ],
    },

    // ── 2. Removing Duplicates With a Set ─────────────────────────────────────
    {
      slug: 'removing-duplicates-with-set',
      title: 'Removing Duplicates',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A favourite trick: convert a list to a `set()` to drop duplicates, since a set keeps only unique items.',
        },
        {
          kind: 'runnable',
          code:
            'nums = [1, 2, 2, 3, 3, 3]\n' +
            'unique = set(nums)\n\n' +
            'print(len(unique))',
        },
        {
          kind: 'paragraph',
          text: 'The list has six items but only three distinct values, so `len(unique)` is `3`. We check the length rather than printing the set, because a set has no fixed order.',
        },
      ],
    },

    // ── 3. Between Lists and Tuples ───────────────────────────────────────────
    {
      slug: 'between-lists-and-tuples',
      title: 'Between Lists and Tuples',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Lists and tuples both keep their order, so converting between them is straightforward — and the order is preserved.',
        },
        {
          kind: 'runnable',
          code:
            'letters = ["a", "b", "c"]\n' +
            'print(tuple(letters))\n\n' +
            'point = (3, 5)\n' +
            'print(list(point))',
        },
        {
          kind: 'paragraph',
          text: '`tuple(letters)` gives `(\'a\', \'b\', \'c\')`, and `list(point)` gives `[3, 5]`. Convert to a tuple to lock data down, or to a list when you need to change it.',
        },
      ],
    },

    // ── 4. Strings and Lists ──────────────────────────────────────────────────
    {
      slug: 'strings-and-lists',
      title: 'Strings and Lists',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Two methods bridge strings and lists: `.split()` turns a string into a list, and `.join()` turns a list of strings back into one string.',
        },
        {
          kind: 'runnable',
          code:
            'sentence = "one two three"\n' +
            'words = sentence.split()\n' +
            'print(words)\n\n' +
            'joined = "-".join(words)\n' +
            'print(joined)',
        },
        {
          kind: 'paragraph',
          text: '`split()` produces `[\'one\', \'two\', \'three\']`. Then `"-".join(words)` glues them with a dash between each, giving `one-two-three`. The string you call `.join()` on is the "glue".',
        },
      ],
    },

    // ── 5. Numbers and Strings ────────────────────────────────────────────────
    {
      slug: 'numbers-and-strings',
      title: 'Numbers and Strings',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A quick recap of the conversions from Chapter 1, which still matter here: `str()` turns a number into text (handy for joining with strings), and `int()` turns a number-looking string into a number.',
        },
        {
          kind: 'runnable',
          code:
            'age = 25\n' +
            'text = str(age)\n' +
            'print("Age: " + text)\n\n' +
            'number = int("42")\n' +
            'print(number + 8)',
        },
        {
          kind: 'paragraph',
          text: '`str(25)` becomes `"25"`, so it can be joined with `"Age: "`. `int("42")` becomes the number `42`, so `42 + 8` gives `50`. Converting is what lets text and numbers work together.',
        },
      ],
    },

    // ── 6. Quiz: Deduplicate ──────────────────────────────────────────────────
    {
      slug: 'quiz-dedupe',
      title: 'Counting Unique Values',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`nums = [1, 1, 2, 2, 3]`\n' +
        '`print(len(set(nums)))`',
      options: [
        { id: 'a', text: '`5`' },
        { id: 'b', text: '`3`' },
        { id: 'c', text: '`2`' },
        { id: 'd', text: '`1`' },
      ],
      correctOptionId: 'b',
      explanation: 'Converting to a set keeps only the unique values `1, 2, 3`, so the length is `3`.',
    },

    // ── 7. Quiz: Join ─────────────────────────────────────────────────────────
    {
      slug: 'quiz-join',
      title: 'Gluing a List Together',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`words = ["a", "b", "c"]`\n' +
        '`print("-".join(words))`',
      options: [
        { id: 'a', text: '`abc`' },
        { id: 'b', text: '`a-b-c`' },
        { id: 'c', text: "`['a', 'b', 'c']`" },
        { id: 'd', text: '`a, b, c`' },
      ],
      correctOptionId: 'b',
      explanation: '`"-".join(words)` joins the items with a dash between each, giving `a-b-c`.',
    },

    // ── 8. Exercise: Count Unique ─────────────────────────────────────────────
    {
      slug: 'count-unique-exercise',
      title: 'Your Turn: Count Unique',
      type: 'exercise',
      problemDescription:
        'Remove duplicates by converting.\n\n' +
        '- A list `nums = [1, 2, 2, 3, 3]` is already created.\n' +
        '- Convert it to a set to drop duplicates.\n' +
        '- Print how many unique values there are with `len()`.\n\n' +
        'The expected output is `3`.',
      starterCode:
        'nums = [1, 2, 2, 3, 3]\n\n' +
        '# Convert to a set and print how many unique values there are\n',
      expectedOutput: '3',
      validationMode: 'exact',
      solution:
        'nums = [1, 2, 2, 3, 3]\n' +
        'print(len(set(nums)))',
    },

    // ── 9. Recap ──────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Conversion — Complete',
      type: 'recap',
      congratsTitle: 'You can convert between types!',
      summary:
        'You convert with the type\'s name: `list()`, `tuple()`, `set()`, `str()`, `int()`. ' +
        'A set drops duplicates, list and tuple convert while keeping order, and `.split()` / ' +
        '`.join()` move between strings and lists. Picking the right type — and converting when ' +
        'needed — is a real programming skill. Next up: a closer look at the range() function.',
      nextModuleTitle: 'range() Function',
    },
  ],
}
