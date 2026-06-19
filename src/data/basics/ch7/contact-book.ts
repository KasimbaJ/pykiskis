import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 7 · Project 2: Contact Book — 14 lesson screens.
//
// A guided capstone applying dictionaries (key/value storage, `in`, `.items()`,
// `del`), functions, a menu-driven `while True` loop, and input.  Mirrors the
// Ch3 / To-Do project format.  Runnables use inputValues so they execute in
// qa-verify; menu loops are bounded (inputValues end with Quit) so they always
// terminate.  The one graded exercise is pure-data (no input) and deterministic.
// ─────────────────────────────────────────────────────────────────────────────

export const contactBookModule: Module = {
  slug: 'contact-book',
  title: 'Contact Book',
  summary: 'Build a phone directory that stores names and numbers in a dictionary.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In this project you will build a **Contact Book** 📇 — a phone directory that stores names and their phone numbers, and lets you add, find, list, and delete contacts from a menu.',
        },
        {
          kind: 'paragraph',
          text: 'The To-Do List Manager kept a plain list of items. A contact book needs to connect two pieces of information — a **name** and a **number** — so this time we reach for a different tool: the **dictionary**.',
        },
        {
          kind: 'paragraph',
          text: 'By the end you will have a program that:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Stores names and numbers as **key/value pairs** in a dictionary',
            'Looks a contact up **instantly** by name',
            'Uses **functions** and a **menu loop** to tie it all together',
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
          text: 'Make sure these skills feel familiar before we begin:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Creating a **dictionary** and storing values by key: `d[key] = value`',
            'Checking whether a key exists with `in`',
            'Looping over a dictionary with `.items()`',
            'Writing **functions** with `def`',
            'A menu `while` loop with `if` / `elif` / `else` (just like the To-Do project)',
          ],
        },
        {
          kind: 'paragraph',
          text: 'A quick look back at Chapter 5 (Dictionaries) will help if any of these feel rusty. Let us plan the app.',
        },
      ],
    },

    // ── 3. Plan the App ───────────────────────────────────────────────────────
    {
      slug: 'project-plan',
      title: 'Plan the App',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Like the last project, our Contact Book shows a **menu** and repeats until the user quits. This time there are five choices:',
        },
        {
          kind: 'figure',
          code:
            '1. Add a contact\n' +
            '2. Find a contact\n' +
            '3. List all contacts\n' +
            '4. Delete a contact\n' +
            '5. Quit',
          output: '',
          caption: 'The five things our Contact Book will do.',
        },
        {
          kind: 'paragraph',
          text: 'The whole directory lives in one dictionary, where each **name** is a key and each **number** is its value. We will build it up one piece at a time, starting with the dictionary itself.',
        },
      ],
    },

    // ── 4. A Dictionary of Contacts ───────────────────────────────────────────
    {
      slug: 'a-dictionary-of-contacts',
      title: 'A Dictionary of Contacts',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A **dictionary** stores pairs: a **key** and the **value** it points to. For a contact book, the key is a person’s name and the value is their number. An empty dictionary is written `{}`.',
        },
        {
          kind: 'runnable',
          code:
            'contacts = {}\n\n' +
            'print(contacts)\n' +
            'print("Number of contacts:", len(contacts))',
        },
        {
          kind: 'paragraph',
          text: 'An empty dictionary prints as `{}`, and `len(contacts)` is `0`. Next we will start filling it in.',
        },
      ],
    },

    // ── 5. Add a Contact ──────────────────────────────────────────────────────
    {
      slug: 'add-a-contact',
      title: 'Add a Contact',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To store a contact we read a name and a number, then save them with `contacts[name] = number`. The name becomes the key; the number becomes its value.',
        },
        {
          kind: 'runnable',
          caption: 'The demo saves Alice with number 12345 for you.',
          code:
            'contacts = {}\n\n' +
            'name = input("Name: ")\n' +
            'number = input("Phone number: ")\n' +
            'contacts[name] = number\n\n' +
            'print("Saved:", name, "->", number)\n' +
            'print(contacts)',
          inputValues: ['Alice', '12345'],
        },
        {
          kind: 'paragraph',
          text: "After saving, the dictionary holds one pair: `{'Alice': '12345'}`. Adding another name simply adds another pair.",
        },
        {
          kind: 'note',
          text: 'If you use a name that already exists, its number is **replaced** — a dictionary keeps only one value per key. That is handy for updating a contact.',
        },
      ],
    },

    // ── 6. Look a Contact Up ──────────────────────────────────────────────────
    {
      slug: 'look-up-a-contact',
      title: 'Look a Contact Up',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The big win of a dictionary is **instant look-up** by key. But if we ask for a name that is not there, Python raises an error — so we first check with `in`.',
        },
        {
          kind: 'runnable',
          caption: 'The demo looks up Alice.',
          code:
            'contacts = {"Alice": "12345", "Bob": "67890"}\n\n' +
            'name = input("Who do you want to find? ")\n\n' +
            'if name in contacts:\n' +
            '    print(name, "->", contacts[name])\n' +
            'else:\n' +
            '    print(name, "is not in your contacts.")',
          inputValues: ['Alice'],
        },
        {
          kind: 'paragraph',
          text: '`name in contacts` is `True` only when that key exists. Checking first means a missing name gives a friendly message instead of crashing the program.',
        },
      ],
    },

    // ── 7. Exercise: Save and Look Up ─────────────────────────────────────────
    {
      slug: 'save-and-look-up-exercise',
      title: 'Save and Look Up',
      type: 'exercise',
      problemDescription:
        'Practise storing a new pair and reading one back.\n\n' +
        '- A `contacts` dictionary already holds two people.\n' +
        '- Add `"Charlie"` with the number `"55555"`.\n' +
        '- Then print **Bob’s** number.',
      remember: [
        'Store a pair with `contacts[key] = value`.',
        'Read a value back with `contacts[key]`.',
      ],
      starterCode:
        'contacts = {"Alice": "12345", "Bob": "67890"}\n\n' +
        '# 1. Add Charlie with number "55555"\n' +
        '___\n\n' +
        "# 2. Print Bob's number\n" +
        'print(___)\n',
      expectedOutput: '67890',
      validationMode: 'exact',
      solution:
        'contacts = {"Alice": "12345", "Bob": "67890"}\n' +
        'contacts["Charlie"] = "55555"\n' +
        'print(contacts["Bob"])',
    },

    // ── 8. List Every Contact ─────────────────────────────────────────────────
    {
      slug: 'list-all-contacts',
      title: 'List Every Contact',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To show the whole directory we loop over the dictionary with `.items()`, which hands us each **name** and **number** together on every pass.',
        },
        {
          kind: 'figure',
          code:
            'contacts = {"Alice": "12345", "Bob": "67890", "Charlie": "55555"}\n' +
            'for name, number in contacts.items():\n' +
            '    print(name, "->", number)',
          output:
            'Alice -> 12345\n' +
            'Bob -> 67890\n' +
            'Charlie -> 55555',
          caption: 'Each contact on its own line.',
        },
        {
          kind: 'paragraph',
          text: 'A dictionary remembers the order pairs were added, so contacts list in the order you entered them.',
        },
      ],
    },

    // ── 9. A Menu Loop ────────────────────────────────────────────────────────
    {
      slug: 'a-menu-loop',
      title: 'A Menu Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Just like the To-Do project, the Contact Book keeps showing its menu with `while True` and leaves the loop with `break` when the user quits.',
        },
        {
          kind: 'runnable',
          caption: 'The demo chooses 1, then 2, then 3 (Quit).',
          code:
            'while True:\n' +
            '    print("1. Add  2. Find  3. Quit")\n' +
            '    choice = input("Choose: ")\n\n' +
            '    if choice == "1":\n' +
            '        print("You chose Add")\n' +
            '    elif choice == "2":\n' +
            '        print("You chose Find")\n' +
            '    elif choice == "3":\n' +
            '        print("Goodbye!")\n' +
            '        break\n' +
            '    else:\n' +
            '        print("Unknown choice, try again.")',
          inputValues: ['1', '2', '3'],
        },
        {
          kind: 'paragraph',
          text: 'The pattern is exactly the one you already know — print the menu, read a choice, run the matching branch, and `break` on Quit.',
        },
      ],
    },

    // ── 10. Delete a Contact ──────────────────────────────────────────────────
    {
      slug: 'delete-a-contact',
      title: 'Delete a Contact',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To remove a contact we use `del contacts[name]` — but only after checking the name exists, so a typo cannot crash the program.',
        },
        {
          kind: 'runnable',
          caption: 'The demo deletes Bob.',
          code:
            'contacts = {"Alice": "12345", "Bob": "67890"}\n\n' +
            'name = input("Who do you want to delete? ")\n\n' +
            'if name in contacts:\n' +
            '    del contacts[name]\n' +
            '    print("Deleted", name)\n' +
            'else:\n' +
            '    print(name, "is not in your contacts.")\n\n' +
            'print(contacts)',
          inputValues: ['Bob'],
        },
        {
          kind: 'paragraph',
          text: "After deleting Bob, the dictionary holds only `{'Alice': '12345'}`. The same `in` guard you used for look-up keeps deletion safe too.",
        },
      ],
    },

    // ── 11. Tidy Up With Functions ────────────────────────────────────────────
    {
      slug: 'wrap-in-functions',
      title: 'Tidy Up With Functions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'With several jobs to do, functions keep the app readable. Each one takes the `contacts` dictionary and does a single task.',
        },
        {
          kind: 'runnable',
          code:
            'def add_contact(contacts, name, number):\n' +
            '    contacts[name] = number\n' +
            '    print("Saved:", name)\n\n' +
            'def find_contact(contacts, name):\n' +
            '    if name in contacts:\n' +
            '        print(name, "->", contacts[name])\n' +
            '    else:\n' +
            '        print(name, "is not in your contacts.")\n\n' +
            'contacts = {}\n' +
            'add_contact(contacts, "Alice", "12345")\n' +
            'add_contact(contacts, "Bob", "67890")\n' +
            'find_contact(contacts, "Alice")\n' +
            'find_contact(contacts, "Zoe")',
        },
        {
          kind: 'paragraph',
          text: 'Because the dictionary is passed in, each function updates the **same** contact book. With these helpers ready, the menu loop becomes short and clear.',
        },
      ],
    },

    // ── 12. The Complete App ──────────────────────────────────────────────────
    {
      slug: 'the-complete-app',
      title: 'The Complete App',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Here is the finished Contact Book — four functions plus the menu loop that calls them.',
        },
        {
          kind: 'runnable',
          caption: 'The demo adds Alice and Bob, lists them, finds Alice, deletes Bob, then quits.',
          code:
            'def add_contact(contacts):\n' +
            '    name = input("Name: ")\n' +
            '    number = input("Phone number: ")\n' +
            '    contacts[name] = number\n' +
            '    print("Saved:", name)\n\n' +
            'def find_contact(contacts):\n' +
            '    name = input("Name to find: ")\n' +
            '    if name in contacts:\n' +
            '        print(name, "->", contacts[name])\n' +
            '    else:\n' +
            '        print(name, "is not in your contacts.")\n\n' +
            'def list_contacts(contacts):\n' +
            '    if not contacts:\n' +
            '        print("No contacts yet.")\n' +
            '        return\n' +
            '    for name, number in contacts.items():\n' +
            '        print(name, "->", number)\n\n' +
            'def delete_contact(contacts):\n' +
            '    name = input("Name to delete: ")\n' +
            '    if name in contacts:\n' +
            '        del contacts[name]\n' +
            '        print("Deleted", name)\n' +
            '    else:\n' +
            '        print(name, "is not in your contacts.")\n\n' +
            'contacts = {}\n' +
            'while True:\n' +
            '    print("\\n1. Add  2. Find  3. List  4. Delete  5. Quit")\n' +
            '    choice = input("Choose: ")\n' +
            '    if choice == "1":\n' +
            '        add_contact(contacts)\n' +
            '    elif choice == "2":\n' +
            '        find_contact(contacts)\n' +
            '    elif choice == "3":\n' +
            '        list_contacts(contacts)\n' +
            '    elif choice == "4":\n' +
            '        delete_contact(contacts)\n' +
            '    elif choice == "5":\n' +
            '        print("Goodbye!")\n' +
            '        break\n' +
            '    else:\n' +
            '        print("Unknown choice, try again.")',
          inputValues: [
            '1', 'Alice', '12345',
            '1', 'Bob', '67890',
            '3',
            '2', 'Alice',
            '4', 'Bob',
            '5',
          ],
        },
        {
          kind: 'paragraph',
          text: 'A full directory app, built from a dictionary and a handful of functions. In the live app you manage as many contacts as you like.',
        },
      ],
    },

    // ── 13. Make It Your Own ──────────────────────────────────────────────────
    {
      slug: 'add-more-features',
      title: 'Make It Your Own',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Ready to extend it? Try one of these on your own:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Add an **Edit** option that changes a contact’s number.',
            'Store an **email** as well as a phone number (a dictionary value can be its own small dictionary).',
            'Show the contacts in **alphabetical** order when listing.',
            'Warn the user before adding a name that **already exists**.',
          ],
        },
        {
          kind: 'note',
          text: 'Each idea builds on the dictionary skills you just practised. Pick one, plan the steps, and grow your Contact Book.',
        },
      ],
    },

    // ── 14. Recap — project complete ──────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Contact Book — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on building the Contact Book!',
      summary:
        'You built a phone directory backed by a `dictionary` — storing names and numbers ' +
        'as key/value pairs, looking them up with `in`, listing them with `.items()`, and ' +
        'removing them with `del`, all organised into `functions` behind a menu loop. ' +
        'Next up: the **Hangman** game.',
      nextModuleTitle: 'Hangman',
    },
  ],
}
