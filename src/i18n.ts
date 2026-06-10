// ─────────────────────────────────────────────────────────────────────────────
// i18n — language types + localized-string model + UI chrome translation.
//
// `LocalizedString` is either a plain string (not yet translated / same in all
// languages — keeps existing content valid and untouched) or a per-language
// map.  `localize()` resolves it to the chosen language, falling back to English
// and then to any available translation.  Only PROSE is localized — Python code,
// expected output, and answer keys stay language-neutral.
//
// `t(key, lang)` resolves a UI chrome string key to the current language,
// falling back to English.  Supports `{varName}` interpolation.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'lt'

/** Display labels for the language switch. */
export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'lt', label: 'LT' },
]

export const DEFAULT_LANG: Lang = 'en'

/** A string that may be translated.  Plain string = same in all languages. */
export type LocalizedString = string | Partial<Record<Lang, string>>

/** Resolve a LocalizedString for display: chosen lang → English → any. */
export function localize(value: LocalizedString, lang: Lang): string {
  if (typeof value === 'string') return value
  return (
    value[lang] ??
    value.en ??
    Object.values(value).find((v): v is string => typeof v === 'string') ??
    ''
  )
}

// ── UI chrome strings ─────────────────────────────────────────────────────────

const UI: Record<Lang, Record<string, string>> = {
  en: {
    // ── Shared ──
    run:                     'Run',
    reset:                   'Reset',
    output:                  'Output',
    completed:               'Completed',
    comingSoon:              'Coming soon',

    // ── Header tooltips ──
    'header.switchLang':     'Switch language',
    'header.switchToLight':  'Switch to light mode',
    'header.switchToDark':   'Switch to dark mode',
    'header.pythonBasics':   'Python Basics — chapter-based course',
    'header.playground':     'Python Playground',
    'header.dashboard':      'Teacher Dashboard',

    // ── Exercise ──
    'exercise.problem':      'Problem',
    'exercise.remember':     'Remember:',
    'exercise.expectedOut':  'Expected Output',
    'exercise.checkCode':    'Check Code',
    'exercise.loadingPy':    'Loading Python… {pct}%',
    'exercise.complete':     'Nice work — exercise complete.',
    'exercise.correct':      'Correct!',
    'exercise.incorrect':    'Not Quite Right',
    'exercise.correctMsg':   'Great work — your output matches. Hit Next to continue.',
    'exercise.errorMsg':     'Your code raised an error. Check the Output panel and try again.',
    'exercise.mismatchMsg':  "Your output doesn't match the expected output yet. Compare them below and try again.",
    'exercise.expected':     'Expected',
    'exercise.yourOutput':   'Your output',
    'exercise.noOutput':     '(no output)',
    'exercise.continue':     'Continue',
    'exercise.keepTrying':   'Keep Trying',
    'exercise.resetCode':    'Reset Code',

    // ── Progress test ──
    'test.title':            'Progress Test',
    'test.best':             'Best: {score}/10',
    'test.meta':             '{count} questions · graded out of 10 · suggested passing score {passing}/10 · unlimited retakes',
    'test.answered':         '{done}/{total} answered',
    'test.submit':           'Submit Test',
    'test.score':            '{correct}/{total} correct · Score: {score}/10',
    'test.pass':             "Nice work — that's a pass!",
    'test.fail':             'Retake the test to improve your grade.',
    'test.retake':           'Retake',
    'test.correctBadge':     'Correct',
    'test.wrongBadge':       'Wrong',
    'test.correctAnswer':    'Correct answer:',
    'test.predictOutput':    'Predict the output:',
    'test.predictPh':        'Type the exact output here…',
    'test.answerPh':         'Your answer…',
    'test.hintPrefix':       'Hint:',

    // ── Recap ──
    'recap.nextUp':          'Next up',

    // ── Course outline drawer ──
    'outline.title':         'Course Outline',
    'outline.soon':          'soon',
    'outline.comingSoon':    'Coming soon',

    // ── Hint panel ──
    'hint.needHint':         'Need a hint?',
    'hint.hints':            'Hints',
    'hint.hide':             'Hide',
    'hint.showNext':         'Show next hint ({current}/3)',

    // ── Output panel ──
    'output.waitingInput':   'waiting for input…',
    'output.stop':           'Stop',
    'output.running':        'Running…',
    'output.pressEnter':     'Press Enter to submit',
    'output.clickRun':       'Click "Run" to execute your code',

    // ── Level card (100-level track) ──
    'level.label':           'Level {id}',
    'level.theory':          'Theory',

    // ── Feedback modal (100-level track) ──
    'feedback.correct':      'Correct!',
    'feedback.incorrect':    'Not Quite Right',
    'feedback.successMsg':   "Great job! You've completed Level {id}: {title}",
    'feedback.solutionReview': 'Review the expected solution below and try again.',
    'feedback.checkHints':   'Not quite! Check the hints for guidance.',
    'feedback.expectedSol':  'Expected Solution',
    'feedback.explanation':  'Explanation',
    'feedback.backToLevels': 'Back to Levels',
    'feedback.nextLevel':    'Next Level',
    'feedback.keepTrying':   'Keep Trying',
    'feedback.resetCode':    'Reset Code',

    // ── Completion modal (100-level track) ──
    'completion.title':      'Course Complete!',
    'completion.subtitle':   "You've mastered all 100 levels of Python 🐍",
    'completion.cert':       'Certificate of Completion',
    'completion.certifies':  'This certifies that',
    'completion.hasCompleted': 'has successfully completed',
    'completion.courseName': '100 Levels of Python',
    'completion.range':      '— from fundamentals to machine learning',
    'completion.share':      'Share on X / Twitter',
    'completion.backHome':   'Back to Home',

    // ── LevelPage (100-level track) ──
    'levelPage.notFound':    'Level not found',
    'levelPage.backToLevels': 'Back to levels',
    'levelPage.locked':      'Level Locked',
    'levelPage.completePrev': 'Complete Level {prev} first to unlock this level.',
    'levelPage.theoryTip':   'Theory level — write the code snippet shown and click Check Answer.',
    'levelPage.checkAnswer': 'Check Answer',
    'levelPage.submit':      'Submit',
    'levelPage.completed':   'Completed',
    'levelPage.backToLevels2': 'Back to Levels',

    // ── LessonPage (Basics track) ──
    'lesson.outline':        'Course Outline',
    'lesson.locked':         'Lesson locked',
    'lesson.unlockPrev':     'Finish the previous lesson to unlock this one.',
    'lesson.previous':       'Previous',
    'lesson.next':           'Next',
    'lesson.finish':         'Finish',
    'lesson.completed':      'Completed',

    // ── HomePage ──
    'home.startHere':        'Start here',
    'home.heroTitle':        'Python Basics Learning Path',
    'home.heroSubtitle':     'A friendly, chapter-based course covering Python from the ground up — read short lessons, run real code in your browser, and build small projects.',
    'home.progress':         'You have completed {done} of {total} lessons.',
    'home.startCh1':         'Start Chapter 1',
    'home.continue':         'Continue learning',
    'home.review':           'Review the basics',
    'home.viewChapters':     'View all chapters',
    'home.challengePath':    'Looking for the 100-level challenge path?',

    // ── BasicsHomePage ──
    'basics.title':          'Python Basics Learning Path',
    'basics.subtitle':       'A friendly, chapter-based course covering Python from the ground up. Read short lessons, run examples in the browser, and build small projects.',
    'basics.comingSoon':     'Coming soon',
    'basics.lesson':         'lesson',
    'basics.lessons':        'lessons',
    'basics.openChapter':    'Open chapter',
    'basics.featured':       'FEATURED',

    // ── ChapterPage ──
    'chapter.backToChapters': 'Back to chapters',
    'chapter.modules':       'Modules',
    'chapter.comingSoon':    'This chapter is coming soon.',
    'chapter.coming':        'Coming soon',
    'chapter.locked':        'Locked',
    'chapter.lessonsOf':     '{done}/{total} lessons',

    // ── LevelsPage (100-level track) ──
    'levels.backToBasics':   'Python Basics',
    'levels.title':          'Python Learning Path',
    'levels.subtitle':       '100 levels across 5 phases — from Hello World to Professional Portfolio.',
    'levels.searchPh':       'Search levels by title, concept or number…',
    'levels.found':          '{count} level found',
    'levels.foundPlural':    '{count} levels found',
    'levels.noMatch':        'No levels match "{query}".',

    // ── DashboardPage ──
    'dashboard.accessOnly':  'Teacher Access Only',
    'dashboard.restricted':  'This dashboard is restricted to teachers. Ask your admin to set role: "teacher" in your Clerk public metadata.',
    'dashboard.backToLearning': 'Back to Learning',
    'dashboard.home':        'Home',
    'dashboard.title':       'Teacher Dashboard',
    'dashboard.loading':     'Loading student data…',
    'dashboard.error':       'Failed to load students: {error}',
    'dashboard.progress':    'Student Progress',
    'dashboard.enrolled':    '{count} student enrolled',
    'dashboard.enrolledPl':  '{count} students enrolled',
    'dashboard.overview':    'Overview',
    'dashboard.testScores':  'Test Scores',

    // ── StudentTable ──
    'table.noStudents':      'No Students Yet',
    'table.noStudentsDesc':  'Student progress will appear here once they start learning.',
    'table.student':         'Student',
    'table.phaseLevels':     'Phase Levels',
    'table.basics':          'Basics',
    'table.streak':          'Streak',
    'table.best':            'Best',
    'table.lastActive':      'Last Active',

    // ── ClassScoresTable ──
    'scores.noStudents':     'No Students Yet',
    'scores.noStudentsDesc': 'Scores will appear here once students take a test.',
    'scores.noTests':        'No Tests Yet',
    'scores.noTestsDesc':    'Progress tests will appear here as chapters are published.',
    'scores.hint':           'Best score per test, out of 10. — = not taken. Click a column to sort.',
    'scores.downloadCsv':    'Download CSV',
    'scores.average':        'Average',
    'scores.classAvg':       'Class average',
    'scores.taken':          '{taken}/{total} taken',
    'scores.notTaken':       'Not taken',

    // ── StudentDetail ──
    'detail.backAll':        'Back to all students',
    'detail.phaseLevels':    'Phase levels:',
    'detail.basicsLessons':  'Basics lessons:',
    'detail.currentStreak':  'Current streak:',
    'detail.bestStreak':     'Best streak:',
    'detail.testScores':     'Progress Test Scores',
    'detail.notTaken':       'Not taken',
    'detail.attempts':       'Attempts: {count}',
    'detail.testLevel':      'Test this level',
    'detail.pythonBasics':   'Python Basics',
    'detail.phaseLevelsTitle': 'Phase Levels',
    'detail.chapterLabel':   'Ch {id} · {title}',
    'detail.lessons':        '{count} lessons',

    // ── PlaygroundPage ──
    'playground.title':      'Python Playground',
    'playground.subtitle':   '— write and run any Python code',
    'playground.examples':   'Examples',
    'playground.usesInput':  '(uses input)',
    'playground.stop':       'Stop',
    'playground.run':        'Run',
    'playground.share':      'Share',
    'playground.copied':     'Copied!',
    'playground.reset':      'Reset',
    'playground.stdin':      'Standard Input (stdin)',
    'playground.stdinPh':    "One value per line (for input() calls)\ne.g.\nAlice\n25",
    'playground.output':     'Output',
    'playground.waitInput':  'waiting for input…',
    'playground.pressEnter': 'Press Enter to submit',
    'playground.clickRun':   'Click Run to see output here…',
    'playground.executing':  'Executing…',
    'playground.noOutput':   'No output produced.',
    'playground.clear':      'Clear',
  },

  lt: {
    // ── Shared ──
    run:                     'Paleisti',
    reset:                   'Iš naujo',
    output:                  'Rezultatas',
    completed:               'Atlikta',
    comingSoon:              'Netrukus',

    // ── Header tooltips ──
    'header.switchLang':     'Keisti kalbą',
    'header.switchToLight':  'Pereiti į šviesų režimą',
    'header.switchToDark':   'Pereiti į tamsų režimą',
    'header.pythonBasics':   'Python pagrindai — skyrelių kursas',
    'header.playground':     'Python žaidimų aikštelė',
    'header.dashboard':      'Mokytojo skydelis',

    // ── Exercise ──
    'exercise.problem':      'Užduotis',
    'exercise.remember':     'Prisiminkite:',
    'exercise.expectedOut':  'Laukiamas rezultatas',
    'exercise.checkCode':    'Tikrinti kodą',
    'exercise.loadingPy':    'Kraunama Python… {pct}%',
    'exercise.complete':     'Puiku — užduotis atlikta.',
    'exercise.correct':      'Teisingai!',
    'exercise.incorrect':    'Dar ne visai',
    'exercise.correctMsg':   'Puiku — jūsų rezultatas atitinka. Paspauskite Toliau.',
    'exercise.errorMsg':     'Jūsų kode yra klaida. Patikrinkite rezultatų sritį ir bandykite dar kartą.',
    'exercise.mismatchMsg':  'Jūsų rezultatas dar neatitinka laukiamo. Palyginkite juos žemiau ir bandykite dar kartą.',
    'exercise.expected':     'Laukiama',
    'exercise.yourOutput':   'Jūsų rezultatas',
    'exercise.noOutput':     '(nėra rezultato)',
    'exercise.continue':     'Tęsti',
    'exercise.keepTrying':   'Bandyti toliau',
    'exercise.resetCode':    'Atkurti kodą',

    // ── Progress test ──
    'test.title':            'Progreso testas',
    'test.best':             'Geriausias: {score}/10',
    'test.meta':             '{count} klausimai · vertinama iš 10 · rekomenduojamas rezultatas {passing}/10 · neriboti bandymai',
    'test.answered':         '{done}/{total} atsakyta',
    'test.submit':           'Pateikti testą',
    'test.score':            '{correct}/{total} teisingai · Rezultatas: {score}/10',
    'test.pass':             'Puiku — įveikta!',
    'test.fail':             'Pakartokite testą, kad pagerintumėte rezultatą.',
    'test.retake':           'Kartoti',
    'test.correctBadge':     'Teisingai',
    'test.wrongBadge':       'Neteisingai',
    'test.correctAnswer':    'Teisingas atsakymas:',
    'test.predictOutput':    'Nuspėkite rezultatą:',
    'test.predictPh':        'Įveskite tikslų rezultatą čia…',
    'test.answerPh':         'Jūsų atsakymas…',
    'test.hintPrefix':       'Užuomina:',

    // ── Recap ──
    'recap.nextUp':          'Toliau',

    // ── Course outline drawer ──
    'outline.title':         'Kurso turinys',
    'outline.soon':          'netrukus',
    'outline.comingSoon':    'Netrukus',

    // ── Hint panel ──
    'hint.needHint':         'Reikia užuominos?',
    'hint.hints':            'Užuominos',
    'hint.hide':             'Slėpti',
    'hint.showNext':         'Rodyti kitą užuominą ({current}/3)',

    // ── Output panel ──
    'output.waitingInput':   'laukiama įvesties…',
    'output.stop':           'Sustabdyti',
    'output.running':        'Vykdoma…',
    'output.pressEnter':     'Spauskite Enter norėdami pateikti',
    'output.clickRun':       'Spauskite „Paleisti", kad vykdytumėte kodą',

    // ── Level card (100-level track) ──
    'level.label':           'Lygis {id}',
    'level.theory':          'Teorija',

    // ── Feedback modal (100-level track) ──
    'feedback.correct':      'Teisingai!',
    'feedback.incorrect':    'Dar ne visai',
    'feedback.successMsg':   'Puiku! Jūs įveikėte lygį {id}: {title}',
    'feedback.solutionReview': 'Peržiūrėkite laukiamą sprendimą žemiau ir bandykite dar kartą.',
    'feedback.checkHints':   'Dar ne! Patikrinkite užuominas.',
    'feedback.expectedSol':  'Laukiamas sprendimas',
    'feedback.explanation':  'Paaiškinimas',
    'feedback.backToLevels': 'Grįžti į lygius',
    'feedback.nextLevel':    'Kitas lygis',
    'feedback.keepTrying':   'Bandyti toliau',
    'feedback.resetCode':    'Atkurti kodą',

    // ── Completion modal (100-level track) ──
    'completion.title':      'Kursas baigtas!',
    'completion.subtitle':   'Jūs įvaldėte visus 100 Python lygių 🐍',
    'completion.cert':       'Baigimo pažymėjimas',
    'completion.certifies':  'Šiuo patvirtinama, kad',
    'completion.hasCompleted': 'sėkmingai baigė',
    'completion.courseName': '100 Python lygių',
    'completion.range':      '— nuo pagrindų iki mašininio mokymosi',
    'completion.share':      'Dalintis X / Twitter',
    'completion.backHome':   'Grįžti į pradžią',

    // ── LevelPage (100-level track) ──
    'levelPage.notFound':    'Lygis nerastas',
    'levelPage.backToLevels': 'Grįžti į lygius',
    'levelPage.locked':      'Lygis užrakintas',
    'levelPage.completePrev': 'Pirmiausia įveikite lygį {prev}, kad atrakintumėte šį lygį.',
    'levelPage.theoryTip':   'Teorijos lygis — parašykite pateiktą kodo fragmentą ir spauskite Patikrinti atsakymą.',
    'levelPage.checkAnswer': 'Patikrinti atsakymą',
    'levelPage.submit':      'Pateikti',
    'levelPage.completed':   'Atlikta',
    'levelPage.backToLevels2': 'Grįžti į lygius',

    // ── LessonPage (Basics track) ──
    'lesson.outline':        'Kurso turinys',
    'lesson.locked':         'Pamoka užrakinta',
    'lesson.unlockPrev':     'Atlikite ankstesnę pamoką, kad atrakintumėte šią.',
    'lesson.previous':       'Atgal',
    'lesson.next':           'Toliau',
    'lesson.finish':         'Baigti',
    'lesson.completed':      'Atlikta',

    // ── HomePage ──
    'home.startHere':        'Pradėkite čia',
    'home.heroTitle':        'Python pagrindų mokymosi kelias',
    'home.heroSubtitle':     'Draugiškas kursas, pagrįstas skyriais, apimantis Python nuo pradžių — skaitykite trumpas pamokas, vykdykite tikrą kodą savo naršyklėje ir kurkite mažus projektus.',
    'home.progress':         'Jūs atlikote {done} iš {total} pamokų.',
    'home.startCh1':         'Pradėti 1 skyrių',
    'home.continue':         'Tęsti mokymąsi',
    'home.review':           'Peržiūrėti pagrindus',
    'home.viewChapters':     'Žiūrėti visus skyrius',
    'home.challengePath':    'Ieškote 100 lygių iššūkio?',

    // ── BasicsHomePage ──
    'basics.title':          'Python pagrindų mokymosi kelias',
    'basics.subtitle':       'Draugiškas kursas, pagrįstas skyriais, apimantis Python nuo pradžių. Skaitykite trumpas pamokas, vykdykite pavyzdžius naršyklėje ir kurkite mažus projektus.',
    'basics.comingSoon':     'Netrukus',
    'basics.lesson':         'pamoka',
    'basics.lessons':        'pamokų',
    'basics.openChapter':    'Atidaryti skyrių',
    'basics.featured':       'IŠSKIRTINIS',

    // ── ChapterPage ──
    'chapter.backToChapters': 'Grįžti į skyrius',
    'chapter.modules':       'Moduliai',
    'chapter.comingSoon':    'Šis skyrius netrukus bus parengtas.',
    'chapter.coming':        'Netrukus',
    'chapter.locked':        'Užrakinta',
    'chapter.lessonsOf':     '{done}/{total} pamokų',

    // ── LevelsPage (100-level track) ──
    'levels.backToBasics':   'Python pagrindai',
    'levels.title':          'Python mokymosi kelias',
    'levels.subtitle':       '100 lygių per 5 fazes — nuo „Hello World" iki profesionalaus portfelio.',
    'levels.searchPh':       'Ieškokite lygių pagal pavadinimą, konceptą arba numerį…',
    'levels.found':          'Rastas {count} lygis',
    'levels.foundPlural':    'Rasti {count} lygiai',
    'levels.noMatch':        'Jokie lygiai neatitinka „{query}".',

    // ── DashboardPage ──
    'dashboard.accessOnly':  'Tik mokytojams',
    'dashboard.restricted':  'Šis skydelis skirtas tik mokytojams. Paprašykite administratoriaus nustatyti role: "teacher" jūsų Clerk viešuosiuose metaduomenyse.',
    'dashboard.backToLearning': 'Grįžti į mokymąsi',
    'dashboard.home':        'Pradžia',
    'dashboard.title':       'Mokytojo skydelis',
    'dashboard.loading':     'Kraunami mokinių duomenys…',
    'dashboard.error':       'Nepavyko užkrauti mokinių: {error}',
    'dashboard.progress':    'Mokinių pažanga',
    'dashboard.enrolled':    'Registruotas {count} mokinys',
    'dashboard.enrolledPl':  'Registruota {count} mokinių',
    'dashboard.overview':    'Apžvalga',
    'dashboard.testScores':  'Testų rezultatai',

    // ── StudentTable ──
    'table.noStudents':      'Kol kas nėra mokinių',
    'table.noStudentsDesc':  'Mokinių pažanga čia bus rodoma, kai jie pradės mokytis.',
    'table.student':         'Mokinys',
    'table.phaseLevels':     'Fazių lygiai',
    'table.basics':          'Pagrindai',
    'table.streak':          'Serija',
    'table.best':            'Geriausias',
    'table.lastActive':      'Paskutinis aktyvumas',

    // ── ClassScoresTable ──
    'scores.noStudents':     'Kol kas nėra mokinių',
    'scores.noStudentsDesc': 'Rezultatai čia bus rodomi, kai mokiniai atliks testus.',
    'scores.noTests':        'Kol kas nėra testų',
    'scores.noTestsDesc':    'Progreso testai čia bus rodomi, kai bus paskelbti skyriai.',
    'scores.hint':           'Geriausias rezultatas už kiekvieną testą iš 10. — = neatlikta. Spauskite stulpelį rūšiuoti.',
    'scores.downloadCsv':    'Atsisiųsti CSV',
    'scores.average':        'Vidurkis',
    'scores.classAvg':       'Klasės vidurkis',
    'scores.taken':          '{taken}/{total} atlikta',
    'scores.notTaken':       'Neatlikta',

    // ── StudentDetail ──
    'detail.backAll':        'Grįžti į visų mokinių sąrašą',
    'detail.phaseLevels':    'Fazių lygiai:',
    'detail.basicsLessons':  'Pagrindų pamokos:',
    'detail.currentStreak':  'Dabartinė serija:',
    'detail.bestStreak':     'Geriausia serija:',
    'detail.testScores':     'Progreso testų rezultatai',
    'detail.notTaken':       'Neatlikta',
    'detail.attempts':       'Bandymai: {count}',
    'detail.testLevel':      'Patikrinti šį lygį',
    'detail.pythonBasics':   'Python pagrindai',
    'detail.phaseLevelsTitle': 'Fazių lygiai',
    'detail.chapterLabel':   'Sk {id} · {title}',
    'detail.lessons':        '{count} pamokų',

    // ── PlaygroundPage ──
    'playground.title':      'Python žaidimų aikštelė',
    'playground.subtitle':   '— rašykite ir vykdykite bet kokį Python kodą',
    'playground.examples':   'Pavyzdžiai',
    'playground.usesInput':  '(naudoja įvestį)',
    'playground.stop':       'Sustabdyti',
    'playground.run':        'Paleisti',
    'playground.share':      'Dalintis',
    'playground.copied':     'Nukopijuota!',
    'playground.reset':      'Iš naujo',
    'playground.stdin':      'Standartinė įvestis (stdin)',
    'playground.stdinPh':    "Viena reikšmė per eilutę (input() iškvietimams)\npvz.\nAlice\n25",
    'playground.output':     'Rezultatas',
    'playground.waitInput':  'laukiama įvesties…',
    'playground.pressEnter': 'Spauskite Enter norėdami pateikti',
    'playground.clickRun':   'Spauskite Paleisti, kad matytumėte rezultatą…',
    'playground.executing':  'Vykdoma…',
    'playground.noOutput':   'Rezultato nėra.',
    'playground.clear':      'Išvalyti',
  },
}

/**
 * Resolve a UI chrome string to the chosen language.
 * Falls back to English if the key is missing for the requested language.
 * Supports `{varName}` placeholder interpolation.
 */
export function t(
  key: string,
  lang: Lang,
  vars?: Record<string, string | number>,
): string {
  let str = UI[lang]?.[key] ?? UI.en[key] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.split(`{${k}}`).join(String(v))
    }
  }
  return str
}
