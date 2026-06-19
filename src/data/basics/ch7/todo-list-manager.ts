import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 7 · Project 1: To-Do List Manager — 13 lesson screens.
//
// A guided capstone applying all-of-Basics skills: lists (append, pop,
// enumerate, len), functions, a menu-driven `while True` loop, input, and
// f-strings.  Reference project for Chapter 7 (mirrors the Ch3 Number Guessing
// Game format).  Runnables use inputValues so they execute in qa-verify; the
// menu loops are bounded (inputValues end with the Quit choice) so they always
// terminate.  The one graded exercise is pure-data (no input) and deterministic.
// ─────────────────────────────────────────────────────────────────────────────

export const todoListManagerModule: Module = {
  slug: 'todo-list-manager',
  title: 'To-Do List Manager',
  summary: 'Build a menu-driven app that adds, views, and removes tasks in a list.',
  lessons: [
    // ── 1. Meet Your Project ──────────────────────────────────────────────────
    {
      slug: 'meet-your-project',
      title: 'Meet Your Project',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Welcome to your first **capstone** project! 📝 You are going to build a **To-Do List Manager** — a small app that keeps a list of tasks and lets you add to it, view it, and remove from it, all from a menu.',
        },
        {
          kind: 'paragraph',
          text: 'This is a step up from the Chapter 3 projects: here you will bring together everything from the whole Basics course — **lists**, **functions**, and **loops** — into one program.',
        },
        {
          kind: 'paragraph',
          text: 'By the end you will have built a program that:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Stores many tasks in a single **list**',
            'Shows a **menu** and keeps running until you choose to quit',
            'Uses **functions** to keep each job (add, view, remove) tidy and separate',
          ],
        },
        {
          kind: 'note',
          text: 'As always, the real skill is **thinking like a developer**: starting with one small piece and growing it, step by step, into a complete app.',
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
          text: 'Before we start, make sure these skills from earlier chapters feel familiar — we will use all of them:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Creating a **list** and adding to it with `.append()`',
            'Looping over a list with a `for` loop',
            'Writing your own **functions** with `def`',
            'Reading input with `input()` and making decisions with `if` / `elif` / `else`',
            'Repeating actions with a `while` loop',
          ],
        },
        {
          kind: 'paragraph',
          text: 'If any of these feel shaky, a quick review of Chapters 4 (Functions) and 5 (Data Types) will help. Ready? Let us plan the app.',
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
          text: 'Good developers plan before they code. Our app will show a **menu** and repeat until the user quits. Each menu choice does one job:',
        },
        {
          kind: 'figure',
          code:
            '1. Add a task\n' +
            '2. View tasks\n' +
            '3. Remove a task\n' +
            '4. Quit',
          output: '',
          caption: 'The four things our To-Do List Manager will do.',
        },
        {
          kind: 'paragraph',
          text: 'In plain steps, the program will:',
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            'Keep all the tasks in one list.',
            'Show the menu and ask the user to choose.',
            'Run the matching job (add, view, or remove).',
            'Go back to the menu — unless the user chose Quit.',
          ],
        },
        {
          kind: 'paragraph',
          text: "We will build this one piece at a time, starting with the list itself.",
        },
      ],
    },

    // ── 4. An Empty List ──────────────────────────────────────────────────────
    {
      slug: 'an-empty-list',
      title: 'An Empty List',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Every to-do app needs somewhere to keep the tasks. We will use a **list** — and at the start it is empty, written `[]`.',
        },
        {
          kind: 'runnable',
          code:
            'tasks = []\n\n' +
            'print(tasks)\n' +
            'print("Number of tasks:", len(tasks))',
        },
        {
          kind: 'paragraph',
          text: 'An empty list prints as `[]`, and `len(tasks)` is `0` because there is nothing in it yet. As the user adds tasks, this list will grow.',
        },
      ],
    },

    // ── 5. Add a Task ─────────────────────────────────────────────────────────
    {
      slug: 'add-a-task',
      title: 'Add a Task',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To add a task we read it with `input()` and put it on the end of the list with `.append()`.',
        },
        {
          kind: 'runnable',
          caption: 'Run it — the demo adds "Buy milk" for you.',
          code:
            'tasks = []\n\n' +
            'new_task = input("Enter a task: ")\n' +
            'tasks.append(new_task)\n\n' +
            'print("Added:", new_task)\n' +
            'print(tasks)',
          inputValues: ['Buy milk'],
        },
        {
          kind: 'paragraph',
          text: "`.append()` always adds to the **end** of the list, so tasks stay in the order they were entered. After adding, the list holds one item: `['Buy milk']`.",
        },
        {
          kind: 'note',
          text: 'In this lesson the demo is given the task "Buy milk" automatically. In the real app you type the task yourself.',
        },
      ],
    },

    // ── 6. View the Tasks ─────────────────────────────────────────────────────
    {
      slug: 'view-tasks',
      title: 'View the Tasks',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Printing the raw list shows the brackets and quotes — not very friendly. Instead we loop over the tasks and print a **numbered** line for each one.',
        },
        {
          kind: 'paragraph',
          text: '`enumerate(tasks, start=1)` gives us both a counter and the task on each pass, so we can number the list starting at 1.',
        },
        {
          kind: 'runnable',
          code:
            'tasks = ["Buy milk", "Walk the dog", "Do homework"]\n\n' +
            'for index, task in enumerate(tasks, start=1):\n' +
            '    print(index, "-", task)',
        },
        {
          kind: 'paragraph',
          text: 'This prints a tidy list:',
        },
        {
          kind: 'figure',
          code:
            'tasks = ["Buy milk", "Walk the dog", "Do homework"]\n' +
            'for index, task in enumerate(tasks, start=1):\n' +
            '    print(index, "-", task)',
          output:
            '1 - Buy milk\n' +
            '2 - Walk the dog\n' +
            '3 - Do homework',
          caption: 'Each task on its own numbered line.',
        },
      ],
    },

    // ── 7. Exercise: Add and Show ─────────────────────────────────────────────
    {
      slug: 'add-and-show-exercise',
      title: 'Add and Show',
      type: 'exercise',
      problemDescription:
        'Put `.append()` and a numbered loop together.\n\n' +
        '- A list `tasks` already holds two tasks.\n' +
        '- Add `"Do homework"` to the end of the list.\n' +
        '- Then print every task on its own numbered line, starting at 1.',
      remember: [
        '`.append()` adds to the end of the list.',
        '`enumerate(tasks, start=1)` numbers the items from 1.',
      ],
      starterCode:
        'tasks = ["Buy milk", "Walk the dog"]\n\n' +
        '# 1. Add "Do homework" to the list\n' +
        '___\n\n' +
        '# 2. Print each task numbered, starting at 1\n' +
        'for index, task in enumerate(tasks, start=1):\n' +
        '    print(index, "-", task)\n',
      expectedOutput: '1 - Buy milk\n2 - Walk the dog\n3 - Do homework',
      validationMode: 'exact',
      solution:
        'tasks = ["Buy milk", "Walk the dog"]\n' +
        'tasks.append("Do homework")\n' +
        'for index, task in enumerate(tasks, start=1):\n' +
        '    print(index, "-", task)',
    },

    // ── 8. A Menu Loop ────────────────────────────────────────────────────────
    {
      slug: 'a-menu-loop',
      title: 'A Menu Loop',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'An app should keep showing its menu until the user decides to quit. We do that with `while True` — a loop that runs forever — and a `break` to leave it when the user chooses Quit.',
        },
        {
          kind: 'runnable',
          caption: 'The demo chooses 1, then 2, then 3 (Quit) for you.',
          code:
            'while True:\n' +
            '    print("1. Add  2. View  3. Quit")\n' +
            '    choice = input("Choose: ")\n\n' +
            '    if choice == "1":\n' +
            '        print("You chose Add")\n' +
            '    elif choice == "2":\n' +
            '        print("You chose View")\n' +
            '    elif choice == "3":\n' +
            '        print("Goodbye!")\n' +
            '        break\n' +
            '    else:\n' +
            '        print("Unknown choice, try again.")',
          inputValues: ['1', '2', '3'],
        },
        {
          kind: 'paragraph',
          text: 'Each time around, the loop prints the menu, reads a choice, and runs the matching branch. Choice `"3"` hits the `break`, which ends the loop. Any unexpected input falls to the `else` and the menu simply shows again.',
        },
      ],
    },

    // ── 9. Remove a Task ──────────────────────────────────────────────────────
    {
      slug: 'remove-a-task',
      title: 'Remove a Task',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'To remove a task we ask the user for its **number**, then use `.pop()` to take it out of the list. Because list positions start at 0, task number 1 lives at index `0` — so we subtract 1.',
        },
        {
          kind: 'runnable',
          caption: 'The demo removes task number 2.',
          code:
            'tasks = ["Buy milk", "Walk the dog", "Do homework"]\n\n' +
            'for index, task in enumerate(tasks, start=1):\n' +
            '    print(index, "-", task)\n\n' +
            'number = int(input("Which task number to remove? "))\n\n' +
            'if 1 <= number <= len(tasks):\n' +
            '    removed = tasks.pop(number - 1)\n' +
            '    print("Removed:", removed)\n' +
            'else:\n' +
            '    print("That task number does not exist.")\n\n' +
            'print(tasks)',
          inputValues: ['2'],
        },
        {
          kind: 'note',
          text: 'The check `1 <= number <= len(tasks)` guards against bad input — a number that is too small or too big does not crash the program; it just prints a friendly message.',
        },
      ],
    },

    // ── 10. Tidy Up With Functions ────────────────────────────────────────────
    {
      slug: 'wrap-in-functions',
      title: 'Tidy Up With Functions',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Our app is growing. To keep it organised, we move each job into its own **function**. A function with a clear name like `add_task` makes the main program much easier to read.',
        },
        {
          kind: 'runnable',
          code:
            'def add_task(tasks, task):\n' +
            '    tasks.append(task)\n' +
            '    print("Added:", task)\n\n' +
            'def view_tasks(tasks):\n' +
            '    if not tasks:\n' +
            '        print("No tasks yet.")\n' +
            '    for index, task in enumerate(tasks, start=1):\n' +
            '        print(index, "-", task)\n\n' +
            'tasks = []\n' +
            'add_task(tasks, "Buy milk")\n' +
            'add_task(tasks, "Walk the dog")\n' +
            'view_tasks(tasks)',
        },
        {
          kind: 'paragraph',
          text: 'Each function takes the `tasks` list as an argument and works on it. Notice `view_tasks` even handles the empty case with `if not tasks`. With these helpers ready, the menu loop becomes short and clear.',
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
          text: 'Now we put it all together: the three functions plus the menu loop. This is the full To-Do List Manager.',
        },
        {
          kind: 'runnable',
          caption: 'The demo adds two tasks, views them, removes one, then quits.',
          code:
            'def add_task(tasks):\n' +
            '    task = input("Enter a task: ")\n' +
            '    tasks.append(task)\n' +
            '    print("Added:", task)\n\n' +
            'def view_tasks(tasks):\n' +
            '    if not tasks:\n' +
            '        print("No tasks yet.")\n' +
            '        return\n' +
            '    for index, task in enumerate(tasks, start=1):\n' +
            '        print(index, "-", task)\n\n' +
            'def remove_task(tasks):\n' +
            '    view_tasks(tasks)\n' +
            '    number = int(input("Task number to remove: "))\n' +
            '    if 1 <= number <= len(tasks):\n' +
            '        removed = tasks.pop(number - 1)\n' +
            '        print("Removed:", removed)\n' +
            '    else:\n' +
            '        print("That task number does not exist.")\n\n' +
            'tasks = []\n' +
            'while True:\n' +
            '    print("\\n1. Add  2. View  3. Remove  4. Quit")\n' +
            '    choice = input("Choose: ")\n' +
            '    if choice == "1":\n' +
            '        add_task(tasks)\n' +
            '    elif choice == "2":\n' +
            '        view_tasks(tasks)\n' +
            '    elif choice == "3":\n' +
            '        remove_task(tasks)\n' +
            '    elif choice == "4":\n' +
            '        print("Goodbye!")\n' +
            '        break\n' +
            '    else:\n' +
            '        print("Unknown choice, try again.")',
          inputValues: ['1', 'Buy milk', '1', 'Walk the dog', '2', '3', '1', '4'],
        },
        {
          kind: 'paragraph',
          text: 'That is a real, working application! Each function does one job, and the loop ties them together. In the live app you control the menu yourself, adding and removing as many tasks as you like.',
        },
      ],
    },

    // ── 12. Make It Your Own ──────────────────────────────────────────────────
    {
      slug: 'add-more-features',
      title: 'Make It Your Own',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'You have a complete app — now stretch it. Here are some ideas to try on your own:',
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            'Add a **"mark as done"** option that puts a ✓ in front of finished tasks.',
            'Show a **count** ("You have 3 tasks") each time the menu appears.',
            'Stop the user from adding an **empty** task.',
            'Give each task a **priority** (high / low) and view the high-priority ones first.',
          ],
        },
        {
          kind: 'note',
          text: 'Each idea is a small change to the code you already have. Pick one, plan the steps, and grow your app — exactly how real software gets better over time.',
        },
      ],
    },

    // ── 13. Recap — project complete ──────────────────────────────────────────
    {
      slug: 'recap',
      title: 'To-Do List Manager — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on building the To-Do List Manager!',
      summary:
        'You built a complete menu-driven app from scratch — storing tasks in a `list`, ' +
        'adding with `.append()`, showing them with `enumerate()`, removing with `.pop()`, ' +
        'and organising everything into `functions` driven by a `while True` menu loop. ' +
        'That is real all-of-Basics programming. Next up: the **Contact Book** project.',
      nextModuleTitle: 'Contact Book',
    },
  ],
}
