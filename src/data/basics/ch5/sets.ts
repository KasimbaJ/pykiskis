import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 · Module 7: Sets — 10 lesson screens.
//
// Unordered collections of unique items: create, duplicates removed, add/remove,
// membership, union/intersection. IMPORTANT: sets are unordered, so every
// checked output (quizzes, exercise) uses len() or membership — never the print
// order of a set.
// ─────────────────────────────────────────────────────────────────────────────

export const setsModule: Module = {
  slug: 'sets',
  title: 'Python Sets',
  summary: 'Collections of unique items, with fast membership tests.',
  lessons: [
    // ── 1. What Is a Set? ─────────────────────────────────────────────────────
    {
      slug: 'what-is-a-set',
      title: 'What Is a Set?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A **set** is a collection of **unique** items — no duplicates allowed. It is also **unordered**, meaning the items have no fixed position, so you cannot index a set like a list.',
        },
        {
          kind: 'paragraph',
          text: 'Sets are perfect when you care only about *which* items are present, not their order or how many times they appear — like a list of unique tags, or the distinct words in a sentence.',
        },
        {
          kind: 'note',
          text: 'Sets use curly braces `{ }`, like dictionaries — but with single items, not `key: value` pairs.',
        },
      ],
    },

    // ── 2. Creating a Set ─────────────────────────────────────────────────────
    {
      slug: 'creating-a-set',
      title: 'Creating a Set',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'List the items inside curly braces. Because a set is unordered, the items may print in a different order than you wrote them — that is normal.',
        },
        {
          kind: 'runnable',
          code:
            'colors = {"red", "green", "blue"}\n' +
            'print(len(colors))',
        },
        {
          kind: 'paragraph',
          text: 'We print `len(colors)` — `3` — rather than the set itself, because the order of items in a set is not guaranteed.',
        },
      ],
    },

    // ── 3. Duplicates Are Removed ─────────────────────────────────────────────
    {
      slug: 'duplicates-removed',
      title: 'Duplicates Are Removed',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The defining feature of a set: it keeps only **one** of each value. Any duplicates simply vanish.',
        },
        {
          kind: 'runnable',
          code:
            'numbers = {1, 2, 2, 3, 3, 3}\n' +
            'print(len(numbers))',
        },
        {
          kind: 'paragraph',
          text: 'Even though we wrote six numbers, the set keeps only the unique ones — `1`, `2`, `3` — so `len` is `3`. This makes sets a quick way to remove duplicates.',
        },
      ],
    },

    // ── 4. Adding and Removing ────────────────────────────────────────────────
    {
      slug: 'adding-and-removing',
      title: 'Adding and Removing',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: '`.add()` puts an item in, and `.remove()` takes one out. Adding an item that is already there changes nothing — the set stays unique.',
        },
        {
          kind: 'runnable',
          code:
            's = {1, 2, 3}\n\n' +
            's.add(4)\n' +
            'print(len(s))\n\n' +
            's.remove(2)\n' +
            'print(len(s))',
        },
        {
          kind: 'paragraph',
          text: 'After `add(4)` the set has 4 items; after `remove(2)` it has 3. (Try adding `3` again — the length will not change, because it is already in the set.)',
        },
      ],
    },

    // ── 5. Membership Testing ─────────────────────────────────────────────────
    {
      slug: 'membership-testing',
      title: 'Membership Testing',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The main thing sets are great at is checking whether an item is present, using `in`. It is the same `in` you have seen with dictionaries and loops.',
        },
        {
          kind: 'runnable',
          code:
            'fruits = {"apple", "banana"}\n\n' +
            'print("apple" in fruits)\n' +
            'print("cherry" in fruits)',
        },
        {
          kind: 'paragraph',
          text: 'This prints `True` then `False`. Sets answer "is this in here?" very quickly, which is why they are popular for membership checks.',
        },
      ],
    },

    // ── 6. Combining Sets ─────────────────────────────────────────────────────
    {
      slug: 'set-operations',
      title: 'Combining Sets',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Sets can be combined like in maths. `&` (intersection) keeps items in **both** sets; `|` (union) keeps items in **either** set.',
        },
        {
          kind: 'runnable',
          code:
            'a = {1, 2, 3}\n' +
            'b = {2, 3, 4}\n\n' +
            'common = a & b      # items in both: 2 and 3\n' +
            'print(len(common))\n\n' +
            'combined = a | b    # all items: 1, 2, 3, 4\n' +
            'print(len(combined))',
        },
        {
          kind: 'paragraph',
          text: '`a & b` is `{2, 3}` — two items in common — so its length is `2`. `a | b` is `{1, 2, 3, 4}` (duplicates merged), so its length is `4`.',
        },
      ],
    },

    // ── 7. Quiz: Unique Count ─────────────────────────────────────────────────
    {
      slug: 'quiz-unique-count',
      title: 'Counting Unique Items',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`nums = {1, 2, 2, 3}`\n' +
        '`print(len(nums))`',
      options: [
        { id: 'a', text: '`4`' },
        { id: 'b', text: '`3`' },
        { id: 'c', text: '`2`' },
        { id: 'd', text: '`1`' },
      ],
      correctOptionId: 'b',
      explanation: 'A set keeps only unique values, so the duplicate `2` is dropped, leaving `1, 2, 3` — length `3`.',
    },

    // ── 8. Quiz: Membership ───────────────────────────────────────────────────
    {
      slug: 'quiz-set-membership',
      title: 'Is It In There?',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`s = {"a", "b"}`\n' +
        '`print("a" in s)`',
      options: [
        { id: 'a', text: '`True`' },
        { id: 'b', text: '`False`' },
        { id: 'c', text: '`"a"`' },
        { id: 'd', text: 'An error' },
      ],
      correctOptionId: 'a',
      explanation: '`"a"` is one of the items in the set, so `"a" in s` is `True`.',
    },

    // ── 9. Exercise: Unique Items ─────────────────────────────────────────────
    {
      slug: 'unique-items-exercise',
      title: 'Your Turn: Keep It Unique',
      type: 'exercise',
      problemDescription:
        'See uniqueness in action.\n\n' +
        '- A set `nums = {1, 2, 3}` is already created.\n' +
        '- Add `3` (already present) and then `4`.\n' +
        '- Print how many items the set has with `len()`.\n\n' +
        'The expected output is `4` — adding the duplicate `3` changes nothing.',
      starterCode:
        'nums = {1, 2, 3}\n\n' +
        '# Add 3 and 4, then print len(nums)\n',
      expectedOutput: '4',
      validationMode: 'exact',
      solution:
        'nums = {1, 2, 3}\n' +
        'nums.add(3)\n' +
        'nums.add(4)\n' +
        'print(len(nums))',
    },

    // ── 10. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Python Sets — Complete',
      type: 'recap',
      congratsTitle: 'You understand sets!',
      summary:
        'A set is an unordered collection of unique items in curly braces. Duplicates are ' +
        'removed automatically, you add and remove with `.add()` and `.remove()`, test ' +
        'membership with `in`, and combine sets with `&` (intersection) and `|` (union). ' +
        'Next up: converting between data types.',
      nextModuleTitle: 'Conversion',
    },
  ],
}
