import type { Module } from '../../../types/basics'

// ─────────────────────────────────────────────────────────────────────────────
// Module 2: Numbers and Strings — 12 lesson screens.
//
// Introduces the two most common data types in Python — strings (text inside
// quotes) and numbers (integers and floating-point).  Mixes theory pages with
// runnable demos, two quizzes, and two coding exercises.
// ─────────────────────────────────────────────────────────────────────────────

export const numbersAndStringsModule: Module = {
  slug: 'numbers-and-strings',
  title: 'Numbers and Strings',
  summary: 'Meet the two most common types of data in Python.',
  lessons: [
    // ── 1. Introduction to Data Types ────────────────────────────────────────
    {
      slug: 'introduction-to-data-types',
      title: 'Introduction to Data Types',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: { en: 'Hey! Remember this from the last lesson?', lt: 'Ei! Ar prisimeni tai iš paskutinės pamokos?' },
        },
        { kind: 'runnable', code: 'print("welcome")' },
        {
          kind: 'paragraph',
          text: {
            en: 'Anything inside quotation marks `" "` is treated as text. In programming, text is called **string**.',
            lt: 'Viskas, kas yra kabutėse `" "`, laikoma tekstu. Programavime tekstas vadinamas **eilute** (angl. **string**).',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "In this lesson, you'll learn about two of the most commonly used types of data:",
            lt: 'Šioje pamokoje sužinosi apie du dažniausiai naudojamus duomenų tipus:',
          },
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            {
              en: '**Strings** — used for text (like the `"welcome"` above)',
              lt: '**Eilutės** (angl. **Strings**) — naudojamos tekstui (pvz. `"welcome"` aukščiau)',
            },
            {
              en: '**Numbers** — used for doing math and calculations',
              lt: '**Skaičiai** (angl. **Numbers**) — naudojami matematiniams veiksmams ir skaičiavimams',
            },
          ],
        },
        {
          kind: 'note',
          text: {
            en: "**Note:** You don't need to be a math genius. We're just talking about basic things — adding, subtracting, multiplying. So don't overthink the numbers. You've got this!",
            lt: '**Pastaba:** Nereikia būti matematikos genijumi. Kalbame tik apie paprastus dalykus — sudėtį, atimtį, daugybą. Taigi nesukk galvos dėl skaičių. Tu susidorosi!',
          },
        },
        {
          kind: 'paragraph',
          text: { en: "Next, let's explore strings in more detail.", lt: 'Toliau išnagrinėsime eilutes plačiau.' },
        },
        {
          kind: 'paragraph',
          text: { en: 'Click **Next Lesson** to continue.', lt: 'Spausk **Kita pamoka**, kad tęstum.' },
        },
      ],
    },

    // ── 2. Strings ───────────────────────────────────────────────────────────
    {
      slug: 'strings',
      title: 'Strings',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'So now you know — anything inside quotes is a string in Python. Like this:',
            lt: 'Dabar žinai — viskas kabutėse yra eilutė Python kalboje. Pavyzdžiui:',
          },
        },
        { kind: 'code', code: '"This is a string."' },
        {
          kind: 'paragraph',
          text: {
            en: 'But guess what? You can also use single quotes:',
            lt: 'Bet ar žinai? Gali naudoti ir viengubas kabutes:',
          },
        },
        { kind: 'code', code: "'This is also a string.'" },
        {
          kind: 'paragraph',
          text: {
            en: 'To show them on the screen, just wrap them inside the `print()` function, like this:',
            lt: 'Norėdamas juos parodyti ekrane, tiesiog įdėk juos į funkciją `print()`, pavyzdžiui:',
          },
        },
        {
          kind: 'runnable',
          code: 'print("This is a string.")\nprint(\'This is also a string.\')',
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Go ahead — click the **Run Code** button to see the output.',
            lt: 'Drąsiai — spausk mygtuką **Paleisti kodą**, kad pamatytum rezultatą.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'You can use single or double quotes — just try to be consistent so your code stays nice and tidy.',
            lt: 'Gali naudoti viengubas arba dvigubas kabutes — tik stenkis būti nuoseklus, kad kodas atrodytų tvarkingai.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "But what if you don't use quotes at all?",
            lt: 'Bet kas atsitiks, jei visai nenaudosi kabučių?',
          },
        },
        {
          kind: 'paragraph',
          text: { en: "Let's find out in the next lesson.", lt: 'Sužinokime tai kitoje pamokoje.' },
        },
        {
          kind: 'paragraph',
          text: { en: 'Click **Next Lesson** to continue.', lt: 'Spausk **Kita pamoka**, kad tęstum.' },
        },
      ],
    },

    // ── 3. Be Careful When Using Strings ─────────────────────────────────────
    {
      slug: 'be-careful-when-using-strings',
      title: 'Be Careful When Using Strings',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'If you do not wrap text inside quotation marks, it is not recognized as a string. For example:',
            lt: 'Jei teksto neapgaubi kabutėmis, jis nebus atpažintas kaip eilutė. Pavyzdžiui:',
          },
        },
        { kind: 'runnable', code: 'print(Hey there)' },
        {
          kind: 'figure',
          code: 'print(Hey there)',
          output:
            'ERROR! File "<string>", line 1\n    print(Hey there)\n              ^^^^^\nSyntaxError: invalid syntax. Perhaps you forgot a comma?',
          caption: {
            en: 'Output when quotes are missing',
            lt: 'Rezultatas, kai trūksta kabučių',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'If you execute this program, you will get an error.',
            lt: 'Jei paleisi šią programą, gausi klaidą.',
          },
        },
        {
          kind: 'paragraph',
          text: { en: 'Here is another example:', lt: 'Štai dar vienas pavyzdys:' },
        },
        { kind: 'runnable', code: 'print("Hey)' },
        {
          kind: 'figure',
          code: 'print("Hey)',
          output:
            'ERROR! File "<string>", line 1\n    print("Hey)\n          ^\nSyntaxError: unterminated string literal (detected at line 1)',
          caption: {
            en: 'Output when a closing quote is missing',
            lt: 'Rezultatas, kai trūksta uždarymo kabutės',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'You will get an error here because the closing quotation mark is missing at the end of `"Hey`.',
            lt: 'Čia gausi klaidą, nes trūksta uždarymo kabutės `"Hey` pabaigoje.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "These kinds of errors are super common when you're starting out, so don't worry — you'll get the hang of it!",
            lt: 'Tokios klaidos labai dažnos pradedant, taigi nesijaudink — greitai įgausi įgūdžių!',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Ready to move on? Next, you'll look at how even tiny things — like a capital letter or an extra space — can make a big difference.",
            lt: 'Pasiruošęs tęsti? Toliau pamatysi, kaip net smulkmenos — kaip didžioji raidė ar papildomas tarpas — gali daug ką pakeisti.',
          },
        },
        {
          kind: 'paragraph',
          text: { en: 'Click **Next Lesson** to continue!', lt: 'Spausk **Kita pamoka**, kad tęstum!' },
        },
      ],
    },

    // ── 4. Strings are Fixed Values ──────────────────────────────────────────
    {
      slug: 'strings-are-fixed-values',
      title: 'Strings are Fixed Values',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'Remember the very first Python code you wrote?',
            lt: 'Ar prisimeni pirmąjį Python kodą, kurį parašei?',
          },
        },
        { kind: 'runnable', code: 'print("welcome")' },
        {
          kind: 'paragraph',
          text: {
            en: "We asked you to type it exactly like that — and here's why.",
            lt: 'Paprašėme tave įvesti tai tiksliai taip — ir štai kodėl.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'In Python, strings are **case sensitive**. That means uppercase and lowercase letters are treated as completely different.',
            lt: 'Python kalboje eilutės yra **didžiųjų ir mažųjų raidžių jautrios** (angl. **case sensitive**). Tai reiškia, kad didžiosios ir mažosios raidės laikomos visiškai skirtingomis.',
          },
        },
        {
          kind: 'paragraph',
          text: { en: 'For example:', lt: 'Pavyzdžiui:' },
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            {
              en: '`"welcome"` is not the same as `"WELCOME"`',
              lt: '`"welcome"` nėra tas pats kaip `"WELCOME"`',
            },
            {
              en: '`"welcome"` is not the same as `"Welcome"`',
              lt: '`"welcome"` nėra tas pats kaip `"Welcome"`',
            },
            {
              en: '`"welcome"` is not the same as `"WelCome"`',
              lt: '`"welcome"` nėra tas pats kaip `"WelCome"`',
            },
          ],
        },
        {
          kind: 'paragraph',
          text: {
            en: 'The letters have to match exactly — same spelling, same case.',
            lt: 'Raidės turi tiksliai sutapti — toks pats rašymas, tokia pati raidžių didumas.',
          },
        },
        {
          kind: 'paragraph',
          text: { en: 'Similarly, spaces matter too.', lt: 'Panašiai ir tarpai yra svarbūs.' },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Even a small space can change the string completely.',
            lt: 'Net mažas tarpas gali visiškai pakeisti eilutę.',
          },
        },
        {
          kind: 'list',
          ordered: false,
          items: [
            {
              en: '`"welcome"` is not the same as `"wel come"` (there\'s a space in the middle)',
              lt: '`"welcome"` nėra tas pats kaip `"wel come"` (yra tarpas viduryje)',
            },
            {
              en: '`"welcome"` is not the same as `" welcome"` (space at the beginning)',
              lt: '`"welcome"` nėra tas pats kaip `" welcome"` (tarpas pradžioje)',
            },
            {
              en: '`"welcome"` is not the same as `"welcome "` (space at the end)',
              lt: '`"welcome"` nėra tas pats kaip `"welcome "` (tarpas pabaigoje)',
            },
          ],
        },
        {
          kind: 'paragraph',
          text: {
            en: 'To us, it might look similar — but Python sees it as something totally different.',
            lt: 'Mums tai gali atrodyti panašiai — bet Python tai mato kaip kažką visiškai skirtingo.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'So always double-check your spelling, your casing, and your spacing.',
            lt: 'Taigi visada patikrink savo rašybą, raidžių didumą ir tarpus.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Next, let's learn about numbers in Python.",
            lt: 'Toliau sužinosime apie skaičius Python kalboje.',
          },
        },
      ],
    },

    // ── 5. Numbers ───────────────────────────────────────────────────────────
    {
      slug: 'numbers',
      title: 'Numbers',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: 'The two common types of numbers in Python are:',
            lt: 'Du dažni skaičių tipai Python kalboje yra:',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: { en: '1. Integers', lt: '1. Sveikieji skaičiai (angl. Integers)' },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Integers are numbers without decimal points. They can be positive, negative, or zero. Examples include **5**, **-11**, **0** and **12**.',
            lt: 'Sveikieji skaičiai yra skaičiai be kablelių. Jie gali būti teigiami, neigiami arba lygūs nuliui. Pavyzdžiai: **5**, **-11**, **0** ir **12**.',
          },
        },
        {
          kind: 'heading',
          level: 3,
          text: { en: '2. Floating-Point Numbers', lt: '2. Slankiojo kablelio skaičiai (angl. Floating-Point Numbers)' },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Floating-point numbers contain decimal points. Like integers, they can also be positive, negative, or zero. Examples include **2.5**, **6.76**, **0.0**, and **-9.45**.',
            lt: 'Slankiojo kablelio skaičiai turi kabelį. Kaip ir sveikieji skaičiai, jie taip pat gali būti teigiami, neigiami arba lygūs nuliui. Pavyzdžiai: **2.5**, **6.76**, **0.0** ir **-9.45**.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "You'll learn how to print these numbers — but first, take a quick quiz on floating-point numbers.",
            lt: 'Sužinosi, kaip spausdinti šiuos skaičius — bet pirmiausia atlik trumpą viktoriną apie slankiojo kablelio skaičius.',
          },
        },
      ],
    },

    // ── 6. Quiz: Not a floating-point number ─────────────────────────────────
    {
      slug: 'quiz-not-a-floating-point',
      title: 'Identify the Non-Float',
      type: 'quiz',
      question: 'Which of the following is **not a floating-point** number in Python?',
      options: [
        { id: 'a', text: '`3.14`' },
        { id: 'b', text: '`-2.0`' },
        { id: 'c', text: '`5`' },
        { id: 'd', text: '`0.001`' },
      ],
      correctOptionId: 'c',
      explanation:
        'Floating-point numbers contain a decimal point. `5` has no decimal — it is an integer. `3.14`, `-2.0`, and `0.001` all contain decimal points, so they are floating-point numbers.',
    },

    // ── 7. Print Numbers ─────────────────────────────────────────────────────
    {
      slug: 'print-numbers',
      title: 'Print Numbers',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "In Python, you don't need to use quotation marks to print numbers. Unlike strings, numbers can be printed directly.",
            lt: 'Python kalboje, norint spausdinti skaičius, nereikia naudoti kabučių. Skirtingai nei eilutės, skaičiai gali būti spausdinami tiesiogiai.',
          },
        },
        {
          kind: 'paragraph',
          text: { en: 'For example, to print the number **5**:', lt: 'Pavyzdžiui, norint spausdinti skaičių **5**:' },
        },
        { kind: 'runnable', code: 'print(5)' },
        {
          kind: 'paragraph',
          text: {
            en: 'Click the **Run Code** button, and you should see **5** printed on the Output screen.',
            lt: 'Spausk mygtuką **Paleisti kodą**, ir turėtum pamatyti **5** išvesties ekrane.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'You can also print floating-point numbers (numbers with decimals) the same way:',
            lt: 'Taip pat tuo pačiu būdu gali spausdinti slankiojo kablelio skaičius (skaičius su kabeliu):',
          },
        },
        { kind: 'runnable', code: 'print(343.44)' },
        {
          kind: 'paragraph',
          text: {
            en: 'Click the **Run Code** button, and you should see **343.44** printed on the Output screen.',
            lt: 'Spausk mygtuką **Paleisti kodą**, ir turėtum pamatyti **343.44** išvesties ekrane.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "No quotes needed — Python understands that you're working with numbers, not text.",
            lt: 'Kabučių nereikia — Python supranta, kad dirbate su skaičiais, o ne tekstu.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'But what happens if you print numbers with quotation marks?',
            lt: 'Bet kas atsitiks, jei spausdinsime skaičius su kabutėmis?',
          },
        },
        {
          kind: 'paragraph',
          text: { en: "Let's find out next!", lt: 'Sužinokime toliau!' },
        },
      ],
    },

    // ── 8. Quiz: Not a string ────────────────────────────────────────────────
    {
      slug: 'quiz-not-a-string',
      title: 'Identify the Non-String',
      type: 'quiz',
      question: 'Which of the following is **not a string** in Python?',
      options: [
        { id: 'a', text: "`'123'`" },
        { id: 'b', text: '`"Hello, World!"`' },
        { id: 'c', text: '`Python`' },
        { id: 'd', text: '`"52"`' },
      ],
      correctOptionId: 'c',
      explanation:
        'A string in Python must be wrapped in quotation marks (single or double). `Python` has no quotes, so Python does not recognise it as a string — it would raise an error if you tried to use it as one.',
    },

    // ── 9. Print Number (exercise) ───────────────────────────────────────────
    {
      slug: 'print-number',
      title: 'Print Number',
      type: 'exercise',
      problemDescription: 'Write a program to print the number **65.6**.',
      remember: [
        'Use the `print()` function to show the number.',
        'Put `65.6` inside the `print()` function.',
        "Don't use quotation marks — we're printing a number, not text.",
      ],
      starterCode: '# Write your code below\n',
      expectedOutput: '65.6',
      validationMode: 'exact',
      solution: 'print(65.6)',
    },

    // ── 10. Print Numbers and Strings ────────────────────────────────────────
    {
      slug: 'print-numbers-and-strings',
      title: 'Print Numbers and Strings',
      type: 'theory',
      blocks: [
        {
          kind: 'paragraph',
          text: {
            en: "You've already used `print()` a few times — great job so far!",
            lt: 'Jau naudojai `print()` kelis kartus — puikus darbas iki šiol!',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Let's look at one more example — just to help you get more comfortable using `print()`:",
            lt: 'Pažvelkime į dar vieną pavyzdį — tik tam, kad geriau įgytum įgūdžių naudojant `print()`:',
          },
        },
        { kind: 'runnable', code: 'print(11)\nprint("How are you?")' },
        {
          kind: 'figure',
          code: 'print(11)\nprint("How are you?")',
          output: '11\nHow are you?',
          caption: {
            en: 'Print on two separate lines',
            lt: 'Spausdinti dviejose atskirose eilutėse',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'Each time you use `print()`, Python moves to a new line automatically.',
            lt: 'Kiekvieną kartą, kai naudoji `print()`, Python automatiškai pereina į naują eilutę.',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: 'That\'s why **11** appears on the first line, and `"How are you?"` on the second.',
            lt: 'Štai kodėl **11** pasirodo pirmoje eilutėje, o `"How are you?"` — antroje.',
          },
        },
        {
          kind: 'note',
          text: {
            en: "**Note:** You'll learn more ways to use `print()` later (in the Output section). For now, don't worry — we've got you covered. This course is designed to guide you step by step without overwhelming you. Just keep going — you're doing great!",
            lt: '**Pastaba:** Vėliau (skyriuje Išvestis) sužinosi daugiau būdų naudoti `print()`. Kol kas nesijaudink — mes pasirūpinsime tavimi. Šis kursas skirtas vesti tave žingsnis po žingsnio, neapkraunant. Tiesiog tęsk — tu darai puikiai!',
          },
        },
        {
          kind: 'paragraph',
          text: {
            en: "Next up, you'll do a quick practice using the same idea — printing a string and a number.",
            lt: 'Toliau atliksi trumpą pratimą naudodamas tą pačią idėją — spausdindamas eilutę ir skaičių.',
          },
        },
      ],
    },

    // ── 11. Print Numbers and Strings (exercise) ─────────────────────────────
    {
      slug: 'print-numbers-and-strings-exercise',
      title: 'Print Numbers and Strings',
      type: 'exercise',
      problemDescription: 'Write a program to print a string and an integer.\n\n' +
        '- Print `Python` on the first line.\n' +
        '- Print **75** on the next line.',
      remember: [
        'Use the `print()` function twice — once for each line.',
        'Put quotes around `Python` (it\'s a string).',
        'Don\'t use quotes for `75` (it\'s a number).',
        'Each `print()` will automatically go to a new line — no need to add anything extra.',
        "If your answer isn't working, double-check and match the spelling and capitalization exactly.",
      ],
      starterCode: '# Write your code below\n',
      expectedOutput: 'Python\n75',
      validationMode: 'exact',
      solution: 'print("Python")\nprint(75)',
    },

    // ── 12. Recap — module completion ────────────────────────────────────────
    {
      slug: 'recap',
      title: 'Numbers and Strings — Complete',
      type: 'recap',
      congratsTitle: 'Congrats on completing Numbers and Strings!',
      summary:
        "You can now tell strings and numbers apart, print them, and watch out for missing quotes and case mismatches. " +
        'Next up: a quick **Progress Test** to check what you have learned so far.',
      nextModuleTitle: 'Progress Test 1',
    },
  ],
}
