import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 10: Recap — final wrap-up module of Chapter 1.
//
// Four theory screens that celebrate completion, recap what was learned,
// and point the learner toward the next chapter.
// ─────────────────────────────────────────────────────────────────────────────

export const recapModule: Module = {
  slug: 'recap',
  title: 'Recap',
  summary: 'Wrap up Chapter 1 and look forward.',
  lessons: [
    // ── 1. Congratulations ───────────────────────────────────────────────────
    {
      slug: 'congratulations',
      title: 'Congratulations',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: { en: 'Congratulations!', lt: 'Sveikiname!' },
        },
        {
          kind: 'paragraph',
          text: {
            en:
              'You have completed the foundational concepts of Python. These are the ' +
              'building blocks of Python programming and will help you approach upcoming ' +
              'topics with confidence.',
            lt:
              'Jūs baigėte Python pagrindinius konceptus. Tai yra Python programavimo ' +
              'pamatai ir padės jums su pasitikėjimu žengti į ateinančias temas.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Let's recap what you learned so far.",
            lt: 'Pakartokime, ką išmokote.',
          },
        },
      ],
    },

    // ── 2. Recap (I) ─────────────────────────────────────────────────────────
    {
      slug: 'recap-i',
      title: 'Recap (I)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: { en: 'Data Types', lt: 'Duomenų tipai' },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'We started by learning different types of data:',
            lt: 'Pradėjome mokytis skirtingų duomenų tipų:',
          },
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            {
              en: '**String:** `"Hello"`, `\'123a\'`',
              lt: '**Eilutė:** `"Hello"`, `\'123a\'`',
            },
            {
              en: '**Floating-point Numbers:** `124.3`, `12.0`',
              lt: '**Slankiojo kablelio skaičiai:** `124.3`, `12.0`',
            },
            {
              en: '**Integers:** `23`, `42`',
              lt: '**Sveikieji skaičiai:** `23`, `42`',
            },
          ],
        },
        {
          kind: 'heading',
          level: 3,
          text: { en: 'Variables', lt: 'Kintamieji' },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'To store and use these data later in the program, you can store them in variables.',
            lt: 'Norėdami vėliau programoje saugoti ir naudoti šiuos duomenis, galite juos saugoti kintamuosiuose.',
          },
        },
        {
          kind: 'runnable',
          code: 'x = 5\ny = x\n\nprint(f"y = x = {x}")',
        },
        {
          kind: 'heading',
          level: 3,
          text: { en: 'Operators', lt: 'Operatoriai' },
        },
        {
          kind: 'paragraph',
          text: {
            en:
              'In programming, you often need to perform calculations on values and ' +
              'variables, not just print them. To handle mathematical calculations, we use operators.',
            lt:
              'Programuojant dažnai reikia atlikti skaičiavimus su reikšmėmis ir ' +
              'kintamaisiais, o ne vien jas spausdinti. Matematiniams skaičiavimams atlikti naudojame operatorius.',
          },
        },
        {
          kind: 'runnable',
          code:
            'x = 7\ny = 3\n\nremainder = x % y\npower = x ** y\n\n' +
            'print(f"Remainder: {remainder}")\nprint(f"Power: {power}")',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'More on what you learned on the next page.',
            lt: 'Daugiau apie tai, ką išmokote, rasite kitame puslapyje.',
          },
        },
      ],
    },

    // ── 3. Recap (II) ────────────────────────────────────────────────────────
    {
      slug: 'recap-ii',
      title: 'Recap (II)',
      type: 'theory',
      blocks: [
        {
          kind: 'heading',
          level: 3,
          text: { en: 'Take input', lt: 'Gauti įvestį' },
        },
        {
          kind: 'paragraph',
          text: {
            en:
              'You can take input from the user and use this value during program execution ' +
              'by using the `input()` function.',
            lt:
              'Galite gauti įvestį iš vartotojo ir naudoti šią reikšmę programos vykdymo ' +
              'metu naudodami `input()` funkciją.',
          },
        },
        {
          kind: 'runnable',
          code:
            'first_name = input("Enter your first name: ")\n' +
            'last_name = input("Enter your last name: ")\n\n' +
            'print(f"Hey {first_name} {last_name}!")',
          inputValues: ['Ada', 'Lovelace'],
        },
        {
          kind: 'heading',
          level: 3,
          text: { en: 'Data conversion', lt: 'Duomenų konvertavimas' },
        },
        {
          kind: 'paragraph',
          text: {
            en:
              'The data you are trying to use may not always be in the required format. In such ' +
              'situations, you need to perform data conversions.',
            lt:
              'Duomenys, kuriuos bandote naudoti, ne visada būna reikiamo formato. Tokiais ' +
              'atvejais reikia atlikti duomenų konvertavimą.',
          },
        },
        {
          kind: 'runnable',
          code:
            '# Convert strings to integers\n' +
            'x = int(input("Enter the first number: "))\n' +
            'y = int(input("Enter the second number: "))\n\n' +
            'remainder = x % y\n' +
            'power = x ** y\n\n' +
            'print(f"Remainder: {remainder}")\n' +
            'print(f"Power: {power}")',
          inputValues: ['10', '3'],
        },
        {
          kind: 'paragraph',
          text: {
            en: "With these foundational concepts in place, you're ready to move ahead to the next lesson.",
            lt: 'Įtvirtinus šiuos pagrindinius konceptus, esate pasiruošęs pereiti prie kito skyriaus.',
          },
        },
      ],
    },

    // ── 4. Moving Forward ────────────────────────────────────────────────────
    {
      slug: 'moving-forward',
      title: 'Moving Forward',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en:
              'Feeling confident about this chapter? Great! Click the "Next Lesson" button to ' +
              'continue to the next chapter: **Control Flow and Loops**. This chapter introduces ' +
              'the core logic of programming.',
            lt:
              'Ar jaučiatės pasitikintys šiuo skyriumi? Puiku! Spustelėkite mygtuką „Kita pamoka", ' +
              'kad pereitumėte į kitą skyrių: **Valdymo struktūros ir kilpos**. Šiame skyriuje ' +
              'supažindinama su pagrindine programavimo logika.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en:
              'Alternatively, you can take the **Practice: Python Basics** course to reinforce your ' +
              'learning before moving on to the next chapter.',
            lt:
              'Arba galite pasirinkti kursą **Praktika: Python pagrindai**, kad sustiprintumėte ' +
              'žinias prieš pereidami į kitą skyrių.',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: { en: 'Practice: Python Basics', lt: 'Praktika: Python pagrindai' },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'This companion course provides additional practice problems to build your confidence.',
            lt: 'Šis papildomas kursas suteikia papildomų pratimų, skirtų sustiprinti jūsų pasitikėjimą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en:
              "Each chapter of the **Practice: Python Basics** course corresponds with a chapter " +
              "in this course, allowing you to apply what you've learned.",
            lt:
              'Kiekvienas **Praktika: Python pagrindai** kurso skyrius atitinka skyrių šiame kurse, ' +
              'leidžiant jums pritaikyti tai, ko išmokote.',
          },
        },
      ],
    },
  ],
}
