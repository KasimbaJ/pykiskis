import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 2: Comments — 6 lesson screens.
//
// Teaches the learner what comments are, why they exist, and how to write
// them in Python using the `#` symbol.  Ends with two quizzes and a recap.
// ─────────────────────────────────────────────────────────────────────────────

export const commentsModule: Module = {
  slug: 'comments',
  title: 'Comments',
  summary: 'Add notes to your code that Python ignores.',
  lessons: [
    // ── 1. Introduction to Comments ──────────────────────────────────────────
    {
      slug: 'introduction-to-comments',
      title: 'Introduction to Comments',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'As you start writing more code, you might want to add short explanations inside your program—not for the computer, but for yourself or anyone else reading it later.',
            lt: 'Kai pradėsite rašyti daugiau kodo, galbūt norėsite pridėti trumpų paaiškinimų savo programoje — ne kompiuteriui, o sau ar kitiems, kurie ją skaitys vėliau.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Suppose you write this line in your code:',
            lt: 'Tarkime, jūs rašote šią eilutę savo kode:',
          },
        },
        { kind: 'runnable', code: 'print(34.0)' },
        {
          kind: 'paragraph',
          text: {
            en: 'This will simply print the number **34.0**.',
            lt: 'Tai tiesiog atspausdins skaičių **34.0**.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Now let's say you want to explain what this number means. Maybe it's the temperature or the result of a calculation. You might try writing it like this:",
            lt: 'Dabar tarkime, kad norite paaiškinti, ką šis skaičius reiškia. Galbūt tai temperatūra arba skaičiavimo rezultatas. Galite bandyti rašyti taip:',
          },
        },
        { kind: 'runnable', code: 'print(34.0) this shows the temperature' },
        {
          kind: 'paragraph',
          text: {
            en: "But Python won't understand that extra text, and it will give you an error.",
            lt: 'Tačiau Python nesupranta to papildomo teksto ir pateiks klaidą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'So how do you include extra information in your code without breaking it?',
            lt: 'Taigi, kaip įtraukti papildomą informaciją į kodą jo nesugadinant?',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "That's where comments come in. Comments let you add helpful notes right inside your code, and Python will simply ignore them when running the program.",
            lt: 'Čia atsiranda komentarai. Komentarai leidžia pridėti naudingų pastabų tiesiai į kodą, o Python jas tiesiog ignoruos, kai bus vykdoma programa.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "You don't need to worry about how to write them just yet.",
            lt: 'Kol kas nereikia jaudintis, kaip juos rašyti.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Click **Next Lesson** to learn how to add comments properly in Python.',
            lt: 'Spustelėkite **Kita pamoka**, kad sužinotumėte, kaip tinkamai pridėti komentarų Python.',
          },
        },
      ],
    },

    // ── 2. Python Comments ───────────────────────────────────────────────────
    {
      slug: 'python-comments',
      title: 'Python Comments',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'In Python, we use the `#` symbol to write comments in our code.',
            lt: 'Python kalboje naudojame simbolį `#`, norėdami rašyti komentarus kode.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'On the last page, we saw that writing something like this:',
            lt: 'Ankstesniame puslapyje matėme, kad rašant kažką panašaus:',
          },
        },
        { kind: 'runnable', code: 'print(34.0) this shows the temperature' },
        {
          kind: 'paragraph',
          text: {
            en: "will give you an error. That's because Python tries to read everything on the line, and it doesn't know what to do with the extra text.",
            lt: 'gausime klaidą. Taip yra todėl, kad Python bando perskaityti viską eilutėje ir nežino, ką daryti su papildomu tekstu.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'But sometimes, you do want to write a quick note to explain what a line of code is doing. To do that without causing an error, you can use a comment.',
            lt: 'Tačiau kartais norisi parašyti greitą pastabą, paaiškinančią, ką daro kodo eilutė. Norėdami tai padaryti nesukeldami klaidos, galite naudoti komentarą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Just add a `#` before the explanation, like this:',
            lt: 'Tiesiog pridėkite `#` prieš paaiškinimą, kaip čia:',
          },
        },
        { kind: 'runnable', code: 'print(34.0)  # This shows the temperature' },
        {
          kind: 'paragraph',
          text: {
            en: "Now Python will run the first part (`print(34.0)`) and completely ignore anything after the `#`. In fact, Python skips any line that starts with `#`—it doesn't run it, and it won't appear in the output at all.",
            lt: 'Dabar Python vykdys pirmą dalį (`print(34.0)`) ir visiškai ignoruos viską po `#`. Tiesą sakant, Python praleids bet kurią eilutę, prasidedančią `#` — jos nevykdys ir ji išvestyje nepasirodys.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Next, you'll look at more examples of comments.",
            lt: 'Toliau pažiūrėsite daugiau komentarų pavyzdžių.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Click **Next Lesson** to continue.',
            lt: 'Spustelėkite **Kita pamoka** ir tęskite.',
          },
        },
      ],
    },

    // ── 3. Understanding Python Comments ─────────────────────────────────────
    {
      slug: 'understanding-python-comments',
      title: 'Understanding Python Comments',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "Let's look at another example:",
            lt: 'Pažiūrėkime į kitą pavyzdį:',
          },
        },
        {
          kind: 'runnable',
          code:
            '# Print a number\n' +
            'print(6)\n' +
            'print(8)   # Print another number\n' +
            '# Print third number\n' +
            'print(88.3)',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'This code has three comments:',
            lt: 'Šiame kode yra trys komentarai:',
          },
        },
        {
          kind: 'code',
          code: '# Print a number\n# Print another number\n# Print third number',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Python skips all of them when running the program. Only the `print()` lines are executed.',
            lt: 'Python praleids visus juos vykdydamas programą. Vykdomos tik `print()` eilutės.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'So this is the same as:',
            lt: 'Taigi tai tas pat, kas:',
          },
        },
        { kind: 'runnable', code: 'print(6)\nprint(8)\nprint(88.3)' },
        {
          kind: 'paragraph',
          text: {
            en: 'The output will be:',
            lt: 'Išvestis bus:',
          },
        },
        {
          kind: 'figure',
          code: 'print(6)\nprint(8)\nprint(88.3)',
          output: '6\n8\n88.3',
          caption: { en: 'Output of the program', lt: 'Programos išvestis' },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'The comments help explain the code, but do not affect what the program does.',
            lt: 'Komentarai padeda paaiškinti kodą, tačiau neturi įtakos tam, ką programa atlieka.',
          },
        },
        {
          kind: 'note',
          text: {
            en: "You'll find comments throughout this course, which we'll use to explain the code examples.",
            lt: 'Šiame kurse rasite komentarų, kuriuos naudosime kodo pavyzdžiams paaiškinti.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Next, you'll check your understanding with two short quizzes on identifying comments and understanding their effect.",
            lt: 'Toliau patikrinsite savo supratimą dviem trumpomis viktorinomis apie komentarų atpažinimą ir jų poveikio supratimą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Click **Next Lesson** to continue.',
            lt: 'Spustelėkite **Kita pamoka** ir tęskite.',
          },
        },
      ],
    },

    // ── 4. Quiz: Identify the comment ────────────────────────────────────────
    {
      slug: 'quiz-identify-the-comment',
      title: 'Identify the Comment',
      type: 'quiz',
      question: 'Identify the comment from the given lines of code.\n\n`# print Hello World`\n`print("Hello World")`',
      options: [
        { id: 'a', text: '`print("Hello World")`' },
        { id: 'b', text: '`# print Hello World`' },
        { id: 'c', text: '`#`' },
        { id: 'd', text: '`# print Hello World`\n`print("Hello World")`' },
      ],
      correctOptionId: 'b',
      explanation:
        'A comment in Python is any line that starts with `#`. The line `# print Hello World` begins with `#`, so Python treats it as a comment and ignores it.',
    },

    // ── 5. Quiz: Output with comment ─────────────────────────────────────────
    {
      slug: 'quiz-output-with-comment',
      title: 'Output with Comment',
      type: 'quiz',
      question:
        'What is the output of the following code?\n\n`# print("Hello World")`\n`print(5)`',
      options: [
        { id: 'a', text: '`# print("Hello World")`' },
        { id: 'b', text: '`Hello World`' },
        { id: 'c', text: '`Hello World`\n`5`' },
        { id: 'd', text: '`5`' },
      ],
      correctOptionId: 'd',
      explanation:
        'Python ignores any line that starts with `#`, so `# print("Hello World")` is skipped. Only `print(5)` runs, producing the output `5`.',
    },

    // ── 6. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Comments — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Comments!',
      summary:
        "You learned how to use the `#` symbol to add notes to your code that Python ignores. " +
        "Next up: variables — how to store and reuse values in your programs.",
      nextModuleTitle: 'Variables',
    },
  ],
}
