import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 1: Get Started — first 7 lesson screens of Chapter 1.
//
// Walks the learner from "what is Python" through writing and running their
// first program, then ends with a chapter-orientation recap.
// ─────────────────────────────────────────────────────────────────────────────

export const getStartedModule: Module = {
  slug: 'get-started',
  title: 'Get Started',
  summary: 'Run your first Python program.',
  lessons: [
    // ── 1. Introduction to Python ────────────────────────────────────────────
    {
      slug: 'introduction-to-python',
      title: 'Introduction to Python',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: { en: 'Welcome to the Python course!', lt: 'Sveiki atvykę į Python kursą!' },
        },
        {
          kind: 'paragraph',
          text: {
            en: "You're about to start learning Python — one of the most popular and widely used programming languages in the world.",
            lt: 'Jūs tuoj pradėsite mokytis Python — vienos populiariausių ir plačiausiai naudojamų programavimo kalbų pasaulyje.',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: { en: 'Why Python?', lt: 'Kodėl Python?' },
        },
        {
          kind: 'paragraph',
          text: {
            en: "It's not just easy to learn — it's also incredibly powerful.",
            lt: 'Ją ne tik lengva išmokti — ji taip pat yra nepaprastai galinga.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'People use it to build websites, create apps, analyze data, automate tasks, and even work on AI.',
            lt: 'Žmonės ją naudoja kurdami svetaines, programas, analizuodami duomenis, automatizuodami užduotis ir netgi dirbdami su dirbtiniu intelektu.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Whether you're aiming for a career in tech or just curious about coding, Python is a great place to start.",
            lt: 'Nesvarbu, ar siekiate karjeros IT srityje, ar tiesiog domitės programavimu — Python yra puiki vieta pradėti.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "On this page, you don't need to write any code yet.",
            lt: 'Šiame puslapyje kodo rašyti dar nereikia.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "You'll be writing your own Python code very soon.",
            lt: 'Labai greitai rašysite savo Python kodą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "And don't worry — you can't break anything. Just follow along, explore, and have fun with it.",
            lt: 'Nesijaudinkite — nieko negalite sugadinti. Tiesiog sekite paskui, tyrinėkite ir mėgaukitės.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'This course will guide you step by step in a friendly and easy way — no pressure, and no prior experience needed.',
            lt: 'Šis kursas vedins jus žingsnis po žingsnio draugišku ir paprastu būdu — be spaudimo ir be išankstinių žinių.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "When you're ready, click **Next Lesson** and we'll run your very first Python code together.",
            lt: 'Kai būsite pasiruošę, spustelėkite **Kita pamoka** ir kartu paleisime jūsų pirmąjį Python kodą.',
          },
        },
      ],
    },

    // ── 2. Run Your First Python Program ─────────────────────────────────────
    {
      slug: 'run-your-first-python-program',
      title: 'Run Your First Python Program',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "You're about to run your very first Python program.",
            lt: 'Jūs tuoj paleisite savo pirmąją Python programą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Here is a simple program that prints `Hello, World!`.',
            lt: 'Štai paprasta programa, kuri išspausdina `Hello, World!`.',
          },
        },
        { kind: 'runnable', code: 'print("Hello, World!")' },
        {
          kind: 'paragraph',
          text: {
            en: 'All you have to do is click the **Run Code** button above.',
            lt: 'Jums tereikia spustelėti aukščiau esantį mygtuką **Paleisti kodą**.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "You'll see `Hello, World!` appear in the Output section.",
            lt: 'Išvesties skiltyje pamatysite `Hello, World!`.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Awesome — you've just run your very first Python program.",
            lt: 'Puiku — jūs ką tik paleidote savo pirmąją Python programą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Don't worry if it doesn't make complete sense yet. We'll walk through how this code works step-by-step on the next page.",
            lt: 'Nesijaudinkite, jei dar ne viskas aišku. Kitame puslapyje žingsnis po žingsnio apžvelgsime, kaip veikia šis kodas.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Go ahead and click **Next Lesson** to keep going.',
            lt: 'Spustelėkite **Kita pamoka** ir tęskite.',
          },
        },
      ],
    },

    // ── 3. Working of the Program ────────────────────────────────────────────
    {
      slug: 'working-of-the-program',
      title: 'Working of the Program',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "Let's take a closer look at the program you just ran.",
            lt: 'Atidžiau pažvelkime į programą, kurią ką tik paleidote.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In Python, we use the function `print()` whenever we want to display something on the screen.',
            lt: 'Python kalboje naudojame funkciją `print()`, kai norime kažką parodyti ekrane.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'The `print()` function shows whatever is inside it.',
            lt: 'Funkcija `print()` rodo viską, kas yra jos viduje.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'For example, this program you ran earlier:',
            lt: 'Pavyzdžiui, ši programa, kurią paleidote anksčiau:',
          },
        },
        {
          kind: 'figure',
          code: 'print("Hello, World!")',
          output: 'Hello, World!',
          caption: { en: 'Print Hello World', lt: 'Spausdinti Hello World' },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'When you run the code, the output will show the text without the quotation marks.',
            lt: 'Paleidus kodą, išvestyje bus rodomas tekstas be kabučių.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'The quotation marks `" "` around the text tell Python that this is plain text and should be shown exactly as written.',
            lt: 'Kabutės `" "` aplink tekstą praneša Python, kad tai yra paprastas tekstas, kuris turi būti rodomas tiksliai taip, kaip parašyta.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Without those quotes, Python would get confused, wouldn't recognize the text, and would show an error.",
            lt: 'Be tų kabučių Python susipainiotų, neatpažintų teksto ir rodytų klaidą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Next, you'll do a quick quiz to help you remember what you've learned.",
            lt: 'Toliau atliksite trumpą viktoriną, kuri padės įsiminti tai, ką išmokote.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "After that, you'll get to write your very first Python code yourself.",
            lt: 'Po to pačys parašysite savo pirmąjį Python kodą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Click **Next Lesson** to keep going.',
            lt: 'Spustelėkite **Kita pamoka** ir tęskite.',
          },
        },
      ],
    },

    // ── 4. Quiz: Valid way to display ────────────────────────────────────────
    {
      slug: 'quiz-valid-print',
      title: 'Valid Way to Display Text',
      type: 'quiz',
      question:
        'Which of the following is the valid way to display `Welcome to Pykiskis` on the screen?',
      options: [
        { id: 'a', text: '`print(Welcome to Pykiskis)`' },
        { id: 'b', text: '`print"Welcome to Pykiskis"`' },
        { id: 'c', text: '`print("Welcome to Pykiskis")`' },
        { id: 'd', text: '`Print("Welcome to Pykiskis")`' },
      ],
      correctOptionId: 'c',
      explanation:
        '`print()` must be lowercase, the parentheses must wrap the text, and the text itself must be inside quotation marks. `print("Welcome to Pykiskis")` satisfies all three rules.',
    },

    // ── 5. Your First Python Program (exercise) ──────────────────────────────
    {
      slug: 'your-first-python-program',
      title: 'Your First Python Program',
      type: 'exercise',
      problemDescription:
        'Write a program that displays the word `welcome` on the screen.\n\n' +
        "On the right, you'll see a code editor where you can write your program.",
      remember: [
        'Use the `print()` function to display the text.',
        'Put the word `welcome` inside quotation marks `" "` — this tells Python it\'s text.',
        'Be careful with capitalization — `welcome` is different from **Welcome**, **WELCOME**, or **WelCome**. You need to match `welcome` exactly.',
      ],
      starterCode: '# Display the word "welcome" on the screen\n',
      expectedOutput: 'welcome',
      validationMode: 'exact',
      solution: 'print("welcome")',
    },

    // ── 6. Course Overview ───────────────────────────────────────────────────
    {
      slug: 'course-overview',
      title: 'Course Overview',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'Congratulations on writing your first Python program!',
            lt: 'Sveikiname parašius pirmąją Python programą!',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "You'll learn and write lots more code throughout this course. Here's what to expect:",
            lt: 'Per šį kursą išmoksite ir parašysite daug daugiau kodo. Štai ko galite tikėtis:',
          },
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            {
              en: '**Learn Python Concepts** — short, friendly lessons that explain each idea.',
              lt: '**Mokytis Python sąvokų** — trumpos, draugiškos pamokos, paaiškinančios kiekvieną idėją.',
            },
            {
              en: '**Write Python Code** — try out examples in the browser as you read.',
              lt: '**Rašyti Python kodą** — išbandykite pavyzdžius naršyklėje skaitydami.',
            },
            {
              en: '**Solve Practical Exercises** — apply what you learned in small problems.',
              lt: '**Spręsti praktinius pratimus** — pritaikykite tai, ką išmokote, spręsdami nedideles užduotis.',
            },
          ],
        },
        {
          kind: 'paragraph',
          text: {
            en: "By the end, you'll write hundreds of programs and create projects, including the rock-paper-scissors game, and become ready to work on real-world projects.",
            lt: 'Kurso pabaigoje parašysite šimtus programų ir sukursite projektų, įskaitant akmenio, žirklių ir popieriaus žaidimą, bei būsite pasiruošę dirbti su realiais projektais.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Click **Next Lesson** to continue your learning journey!',
            lt: 'Spustelėkite **Kita pamoka** ir tęskite savo mokymosi kelionę!',
          },
        },
      ],
    },

    // ── 7. Recap — module completion ─────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Get Started — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Get Started!',
      summary:
        'This is your first step in your journey to becoming a Python expert. ' +
        "Next up: you'll meet the two kinds of data Python uses most — numbers and strings.",
      nextModuleTitle: 'Numbers and Strings',
    },
  ],
}
