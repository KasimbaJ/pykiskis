import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5 · Module 1: Lists — 13 lesson screens.
//
// Create, index (incl. negative), change items, append/remove/pop, len, and
// loop over a list, plus a visualize block showing list mutation. Lists print
// deterministically (ordered), so figures/predict-output are safe to verify.
// ─────────────────────────────────────────────────────────────────────────────

export const listsModule: Module = {
  slug: 'lists',
  title: 'Lists',
  summary: 'Store many values in one ordered, changeable collection.',
  lessons: [
    // ── 1. What Is a List? ────────────────────────────────────────────────────
    {
      slug: 'what-is-a-list',
      title: 'What Is a List?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'So far each variable has held a single value. But what if you want to store a whole shopping list, or every score in a game? A **list** holds many values in one place, in order.',
        },
        {
          kind: 'paragraph',
          text: 'A list is written with square brackets `[ ]`, with the items separated by commas. The items keep their order, and you can change them later.',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Lists are **ordered** — item 1 always comes before item 2',
            'Lists are **changeable** — you can add, remove, and update items',
            'A list can hold numbers, strings, or a mix',
          ],
        },
      ],
    },

    // ── 2. Creating a List ────────────────────────────────────────────────────
    {
      slug: 'creating-a-list',
      title: 'Creating a List',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Put the items inside square brackets and store the whole thing in a variable, just like any other value.',
        },
        {
          kind: 'runnable',
          code:
            'fruits = ["apple", "banana", "cherry"]\n' +
            'print(fruits)',
        },
        {
          kind: 'paragraph',
          text: 'Printing the whole list shows it with its brackets: `[\'apple\', \'banana\', \'cherry\']`. The list is one value, even though it contains three items.',
        },
      ],
    },

    // ── 3. Accessing by Index ─────────────────────────────────────────────────
    {
      slug: 'accessing-by-index',
      title: 'Accessing by Index',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Each item has a position number called an **index**. Python counts from **0**, so the first item is at index 0, the second at index 1, and so on. Use square brackets to read one item.',
        },
        {
          kind: 'runnable',
          code:
            'fruits = ["apple", "banana", "cherry"]\n\n' +
            'print(fruits[0])\n' +
            'print(fruits[1])\n' +
            'print(fruits[2])',
        },
        {
          kind: 'note',
          text: '**Watch out:** counting starts at 0, not 1. So `fruits[1]` is the *second* item, `banana` — not the first.',
        },
      ],
    },

    // ── 4. Negative Indexing ──────────────────────────────────────────────────
    {
      slug: 'negative-indexing',
      title: 'Counting from the End',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Negative indexes count from the **end** of the list. `-1` is the last item, `-2` the second-to-last — handy when you do not know how long the list is.',
        },
        {
          kind: 'runnable',
          code:
            'fruits = ["apple", "banana", "cherry"]\n\n' +
            'print(fruits[-1])\n' +
            'print(fruits[-2])',
        },
        {
          kind: 'paragraph',
          text: 'This prints `cherry` then `banana`. `fruits[-1]` always gives the last item, however many there are.',
        },
      ],
    },

    // ── 5. Changing an Item ───────────────────────────────────────────────────
    {
      slug: 'changing-an-item',
      title: 'Changing an Item',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Lists are **changeable** (the technical word is *mutable*). Assign a new value to an index to replace the item there.',
        },
        {
          kind: 'runnable',
          code:
            'colors = ["red", "green", "blue"]\n' +
            'colors[1] = "yellow"\n' +
            'print(colors)',
        },
        {
          kind: 'paragraph',
          text: 'The item at index 1 changes from `green` to `yellow`, so the list becomes `[\'red\', \'yellow\', \'blue\']`. The other items are untouched.',
        },
      ],
    },

    // ── 6. Adding Items ───────────────────────────────────────────────────────
    {
      slug: 'adding-items',
      title: 'Adding Items',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Lists can grow. The `.append()` **method** adds a new item to the end. (A method is a function attached to a value — you call it with a dot.)',
        },
        {
          kind: 'runnable',
          code:
            'numbers = [1, 2, 3]\n' +
            'numbers.append(4)\n' +
            'print(numbers)',
        },
        {
          kind: 'paragraph',
          text: 'After `append(4)`, the list is `[1, 2, 3, 4]`. This is perfect inside a loop, where you build a list up one item at a time.',
        },
      ],
    },

    // ── 7. Removing Items ─────────────────────────────────────────────────────
    {
      slug: 'removing-items',
      title: 'Removing Items',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You can take items out too. `.remove(value)` deletes the first matching value; `.pop()` removes the last item and hands it back to you.',
        },
        {
          kind: 'runnable',
          code:
            'numbers = [1, 2, 3, 4]\n\n' +
            'numbers.remove(2)     # remove the value 2\n' +
            'print(numbers)\n\n' +
            'last = numbers.pop()  # remove and return the last item\n' +
            'print(last)\n' +
            'print(numbers)',
        },
        {
          kind: 'paragraph',
          text: '`remove(2)` leaves `[1, 3, 4]`. Then `pop()` removes `4`, returns it (so `last` is `4`), and the list ends as `[1, 3]`.',
        },
      ],
    },

    // ── 8. How Long Is It? ────────────────────────────────────────────────────
    {
      slug: 'list-length',
      title: 'How Long Is It?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The `len()` function tells you how many items a list holds — the same `len()` that measures strings.',
        },
        {
          kind: 'runnable',
          code:
            'animals = ["cat", "dog", "fish"]\n' +
            'print(len(animals))',
        },
        {
          kind: 'paragraph',
          text: 'This prints `3`. Because the last valid index is always `len - 1`, here the last item is at index 2.',
        },
      ],
    },

    // ── 9. Looping Over a List ────────────────────────────────────────────────
    {
      slug: 'looping-over-a-list',
      title: 'Looping Over a List',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A `for` loop can walk through a list directly, giving you one item at a time — no index needed.',
        },
        {
          kind: 'runnable',
          code:
            'scores = [10, 20, 30]\n\n' +
            'for score in scores:\n' +
            '    print(score)',
        },
        {
          kind: 'paragraph',
          text: 'The loop variable `score` takes each value in turn, printing `10`, `20`, `30`. This is the most common way to process every item in a list.',
        },
      ],
    },

    // ── 10. Visualizing List Changes ──────────────────────────────────────────
    {
      slug: 'visualizing-list-changes',
      title: 'Visualizing List Changes',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Lists change in place as your program runs. Step through this and watch the list grow with `append` and then change at an index.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize and watch nums grow and then change.',
          code:
            'nums = [1, 2, 3]\n' +
            'nums.append(4)\n' +
            'nums[0] = 99\n' +
            'print(nums)',
        },
        {
          kind: 'paragraph',
          text: 'The list starts as `[1, 2, 3]`, grows to `[1, 2, 3, 4]` after `append(4)`, then its first item becomes `99`, giving `[99, 2, 3, 4]`.',
        },
      ],
    },

    // ── 11. Quiz: Index ───────────────────────────────────────────────────────
    {
      slug: 'quiz-index',
      title: 'Reading an Index',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`items = ["a", "b", "c"]`\n' +
        '`print(items[1])`',
      options: [
        { id: 'a', text: '`a`' },
        { id: 'b', text: '`b`' },
        { id: 'c', text: '`c`' },
        { id: 'd', text: '`1`' },
      ],
      correctOptionId: 'b',
      explanation: 'Index counting starts at 0, so `items[1]` is the second item, `b`.',
    },

    // ── 12. Quiz: Append + len ────────────────────────────────────────────────
    {
      slug: 'quiz-append-len',
      title: 'After Appending',
      type: 'quiz',
      question:
        'What does this print?\n\n' +
        '`nums = [5, 10, 15]`\n' +
        '`nums.append(20)`\n' +
        '`print(len(nums))`',
      options: [
        { id: 'a', text: '`3`' },
        { id: 'b', text: '`4`' },
        { id: 'c', text: '`20`' },
        { id: 'd', text: '`[5, 10, 15, 20]`' },
      ],
      correctOptionId: 'b',
      explanation: '`append(20)` adds a fourth item, so `len(nums)` is `4`.',
    },

    // ── 13. Exercise: Build a List ────────────────────────────────────────────
    {
      slug: 'build-a-list-exercise',
      title: 'Your Turn: Add to a List',
      type: 'exercise',
      problemDescription:
        'Work with a list.\n\n' +
        '- A list `nums = [10, 20, 30]` is already created.\n' +
        '- Use `.append()` to add `40` to the end.\n' +
        '- Print the whole list.\n\n' +
        'The expected output is `[10, 20, 30, 40]`.',
      starterCode:
        'nums = [10, 20, 30]\n\n' +
        '# Append 40, then print nums\n',
      expectedOutput: '[10, 20, 30, 40]',
      validationMode: 'exact',
      solution:
        'nums = [10, 20, 30]\n' +
        'nums.append(40)\n' +
        'print(nums)',
    },

    // ── 14. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Lists — Complete',
      type: 'recap',
      congratsTitle: 'You can work with lists!',
      summary:
        'You learned to create lists, read items by index (including negative indexes from the ' +
        'end), change items, grow a list with `append`, remove items with `remove` and `pop`, ' +
        'measure it with `len`, and loop over it. Next up: Tuples — lists\' unchangeable cousin.',
      nextModuleTitle: 'Tuples',
    },
  ],
}
