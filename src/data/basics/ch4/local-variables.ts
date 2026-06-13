import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 4 · Module 2: Local Variables — 11 lesson screens.
//
// Scope: variables created inside a function are local and vanish when it ends;
// functions can read outer (global) variables; assigning inside makes a new
// local. The "leak" demo is a non-executed code block (so qa-verify never runs
// the NameError). A visualize block shows locals appearing and disappearing.
// ─────────────────────────────────────────────────────────────────────────────

export const localVariablesModule: Module = {
  slug: 'local-variables',
  title: 'Local Variables',
  summary: 'Understand where the variables inside a function live.',
  lessons: [
    // ── 1. What Is Scope? ─────────────────────────────────────────────────────
    {
      slug: 'what-is-scope',
      title: 'What Is Scope?',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'When you create a variable, it does not necessarily exist everywhere in your program. Where a variable can be seen and used is called its **scope**.',
        },
        {
          kind: 'paragraph',
          text: 'Functions are the key to scope: a variable created **inside** a function lives only there. This is a good thing — it keeps each function tidy and self-contained, so its variables cannot accidentally clash with the rest of the program.',
        },
      ],
    },

    // ── 2. Local Variables ────────────────────────────────────────────────────
    {
      slug: 'local-variables',
      title: 'Local Variables',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A variable created inside a function is a **local variable**. It exists while the function runs and is forgotten the moment the function ends.',
        },
        {
          kind: 'runnable',
          code:
            'def show_total():\n' +
            '    total = 5 + 3\n' +
            '    print(total)\n\n' +
            'show_total()',
        },
        {
          kind: 'paragraph',
          text: 'Here `total` is local to `show_total`. The function calculates it, prints `8`, and then `total` disappears.',
        },
      ],
    },

    // ── 3. Locals Don't Leak ──────────────────────────────────────────────────
    {
      slug: 'locals-dont-leak',
      title: "Locals Don't Leak Out",
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Because a local variable only exists inside its function, trying to use it **outside** causes an error. This code looks reasonable but fails:',
        },
        {
          kind: 'code',
          code:
            'def show_total():\n' +
            '    total = 8\n' +
            '    print(total)\n\n' +
            'show_total()\n' +
            'print(total)   # NameError: total is not defined out here',
        },
        {
          kind: 'note',
          text: 'Running that last line raises a **NameError**, because `total` lives only inside `show_total`. If you need a value after the function ends, **return** it instead of leaving it as a local.',
        },
      ],
    },

    // ── 4. Parameters Are Local Too ───────────────────────────────────────────
    {
      slug: 'parameters-are-local',
      title: 'Parameters Are Local Too',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A function\'s parameters are local variables as well. They are created fresh each time the function is called and vanish when it ends.',
        },
        {
          kind: 'runnable',
          code:
            'def greet(name):\n' +
            '    print("Hi", name)\n\n' +
            'greet("Ada")\n' +
            'greet("Bob")',
        },
        {
          kind: 'paragraph',
          text: 'The parameter `name` holds `"Ada"` for the first call and `"Bob"` for the second. Outside the function, `name` does not exist at all.',
        },
      ],
    },

    // ── 5. Reading Outer Variables ────────────────────────────────────────────
    {
      slug: 'reading-outer-variables',
      title: 'Reading Outer Variables',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'A variable defined at the top level of your program (outside any function) is called a **global** variable. Functions are allowed to **read** globals.',
        },
        {
          kind: 'runnable',
          code:
            'greeting = "Hello"\n\n' +
            'def show():\n' +
            '    print(greeting)   # reads the global greeting\n\n' +
            'show()',
        },
        {
          kind: 'paragraph',
          text: 'The function `show` has no `greeting` of its own, so Python looks outside and finds the global one, printing `Hello`.',
        },
      ],
    },

    // ── 6. Same Name, Different Scope ─────────────────────────────────────────
    {
      slug: 'same-name-different-scope',
      title: 'Same Name, Different Scope',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Here is the part that surprises people. If you **assign** to a variable inside a function, Python makes a brand-new local — even if a global with the same name exists. The global is left untouched.',
        },
        {
          kind: 'runnable',
          code:
            'x = 10\n\n' +
            'def change():\n' +
            '    x = 99           # a NEW local x, not the global one\n' +
            '    print("inside:", x)\n\n' +
            'change()\n' +
            'print("outside:", x)',
        },
        {
          kind: 'paragraph',
          text: 'Inside the function `x` is `99`, but outside it is still `10`. The local `x` and the global `x` are two completely separate variables that just happen to share a name.',
        },
        {
          kind: 'note',
          text: 'This is exactly why scope is helpful: a function can use any variable names it likes without disturbing the rest of your program.',
        },
      ],
    },

    // ── 7. Visualizing Scope ──────────────────────────────────────────────────
    {
      slug: 'visualizing-scope',
      title: 'Visualizing Scope',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Step through this and watch the local variables `a` and `b` appear while `calc()` runs, then disappear once it returns — leaving only `total` behind.',
        },
        {
          kind: 'visualize',
          caption: 'Press Visualize and watch a and b live only inside calc().',
          code:
            'def calc():\n' +
            '    a = 5\n' +
            '    b = 3\n' +
            '    return a + b\n\n' +
            'total = calc()\n' +
            'print(total)',
        },
        {
          kind: 'paragraph',
          text: '`a` and `b` exist only during the call. Their sum is returned and stored in `total`, which is the only variable left when the program finishes.',
        },
      ],
    },

    // ── 8. Quiz: Scope Output ─────────────────────────────────────────────────
    {
      slug: 'quiz-scope-output',
      title: 'Inside and Outside',
      type: 'quiz',
      question:
        'What does this code print?\n\n' +
        '`x = 10`\n' +
        '`def f():`\n' +
        '`    x = 5`\n' +
        '`    print(x)`\n' +
        '`f()`\n' +
        '`print(x)`',
      options: [
        { id: 'a', text: '`5` then `5`' },
        { id: 'b', text: '`5` then `10`' },
        { id: 'c', text: '`10` then `10`' },
        { id: 'd', text: '`10` then `5`' },
      ],
      correctOptionId: 'b',
      explanation: 'Inside `f`, assigning `x = 5` makes a new local, so it prints `5`. The global `x` is untouched, so the last line prints `10`.',
    },

    // ── 9. Quiz: Using a Local Outside ────────────────────────────────────────
    {
      slug: 'quiz-local-access',
      title: 'Reaching a Local',
      type: 'quiz',
      question: 'What happens if you try to use a function\'s local variable outside that function?',
      options: [
        { id: 'a', text: 'It works fine — variables are global by default.' },
        { id: 'b', text: 'Python raises a `NameError` because the variable does not exist there.' },
        { id: 'c', text: 'It prints `None`.' },
        { id: 'd', text: 'Python creates it automatically with value 0.' },
      ],
      correctOptionId: 'b',
      explanation: 'A local variable only exists inside its function. Outside, it is undefined, so Python raises a `NameError`. To use the value outside, `return` it.',
    },

    // ── 10. Exercise: Total Price ─────────────────────────────────────────────
    {
      slug: 'total-price-exercise',
      title: 'Your Turn: Total Price',
      type: 'exercise',
      problemDescription:
        'Use a local variable inside a function.\n\n' +
        '- Define `total_price(price, tax)`.\n' +
        '- Inside it, create a local variable `total = price + tax` and `return` it.\n' +
        '- Then print the result of `total_price(100, 20)`.\n\n' +
        'The expected output is `120`.',
      starterCode:
        '# Define total_price(price, tax): make a local total, then return it\n\n\n' +
        '# Then print total_price(100, 20)\n',
      expectedOutput: '120',
      validationMode: 'exact',
      solution:
        'def total_price(price, tax):\n' +
        '    total = price + tax\n' +
        '    return total\n\n' +
        'print(total_price(100, 20))',
    },

    // ── 11. Recap ─────────────────────────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Local Variables — Complete',
      type: 'recap',
      congratsTitle: 'You understand scope!',
      summary:
        'Variables created inside a function are local: they exist only while the function ' +
        'runs and cannot be used outside it. Functions can read global variables, but ' +
        'assigning inside makes a separate local. To pass a value back out, `return` it. ' +
        'Next is a short Progress Test on functions and scope.',
      nextModuleTitle: 'Progress Test',
    },
  ],
}
