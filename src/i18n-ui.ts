// ─────────────────────────────────────────────────────────────────────────────
// i18n-ui.ts — UI chrome translation dictionary + t() helper.
//
// `t(key, lang, vars?)` looks up a UI string, falls back to English (or the
// raw key), and substitutes any {variable} placeholders.
// `useT()` returns a t() bound to the current lang from useLangStore —
// the idiomatic way to translate UI strings inside React components.
//
// SCOPE: UI chrome only (buttons, labels, headings, placeholders, empty states).
// Lesson/content prose uses `localize()` from i18n.ts instead.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback } from 'react'
import { useLangStore } from './stores/useLangStore'
import type { Lang } from './i18n'

type Vars = Record<string, string | number>
export type TFunc = (key: string, vars?: Vars) => string

const ui: Record<string, Partial<Record<Lang, string>>> = {

  // ── Common actions ────────────────────────────────────────────────────────
  run:           { en: 'Run',         lt: 'Paleisti' },
  stop:          { en: 'Stop',        lt: 'Sustabdyti' },
  reset:         { en: 'Reset',       lt: 'Iš naujo' },
  resetCode:     { en: 'Reset Code',  lt: 'Atstatyti kodą' },
  checkCode:     { en: 'Check Code',  lt: 'Tikrinti kodą' },
  continue_:     { en: 'Continue',    lt: 'Tęsti' },
  keepTrying:    { en: 'Keep Trying', lt: 'Bandyti toliau' },
  next:          { en: 'Next',        lt: 'Toliau' },
  previous:      { en: 'Previous',    lt: 'Atgal' },
  finish:        { en: 'Finish',      lt: 'Baigti' },
  submit:        { en: 'Submit',      lt: 'Pateikti' },
  create:        { en: 'Create',      lt: 'Sukurti' },
  assign:        { en: 'Assign',      lt: 'Priskirti' },
  close:         { en: 'Close',       lt: 'Uždaryti' },
  hide:          { en: 'Hide',        lt: 'Slėpti' },
  share:         { en: 'Share',       lt: 'Dalintis' },
  clear:         { en: 'Clear',       lt: 'Išvalyti' },
  copied:        { en: 'Copied!',     lt: 'Nukopijuota!' },
  downloadCsv:   { en: 'Download CSV',lt: 'Atsisiųsti CSV' },

  // ── Feedback & status ─────────────────────────────────────────────────────
  correct:      { en: 'Correct!',       lt: 'Teisingai!' },
  notQuiteRight:{ en: 'Not Quite Right',lt: 'Dar ne visai' },
  completed:    { en: 'Completed',      lt: 'Baigta' },
  locked:       { en: 'Locked',         lt: 'Užrakinta' },
  comingSoon:   { en: 'Coming soon',    lt: 'Greitai' },
  theory:       { en: 'Theory',         lt: 'Teorija' },

  // ── Section labels ────────────────────────────────────────────────────────
  output:           { en: 'Output',           lt: 'Išvestis' },
  expectedOutput:   { en: 'Expected Output',  lt: 'Tikėtina išvestis' },
  problem:          { en: 'Problem',          lt: 'Uždavinys' },
  remember:         { en: 'Remember:',        lt: 'Atminti:' },
  yourTask:         { en: 'Your Task',        lt: 'Jūsų užduotis' },
  explanation:      { en: 'Explanation',      lt: 'Paaiškinimas' },
  expectedSolution: { en: 'Expected Solution',lt: 'Tikėtinas sprendimas' },
  correctAnswer:    { en: 'Correct answer:',  lt: 'Teisingas atsakymas:' },
  progressTest:     { en: 'Progress Test',    lt: 'Pažangos testas' },

  // ── Header ────────────────────────────────────────────────────────────────
  'header.switchLanguage': { en: 'Switch language',        lt: 'Perjungti kalbą' },
  'header.switchToLight':  { en: 'Switch to light mode',   lt: 'Perjungti į šviesų režimą' },
  'header.switchToDark':   { en: 'Switch to dark mode',    lt: 'Perjungti į tamsų režimą' },
  'header.basics':         { en: 'Python Basics — chapter-based course', lt: 'Python pagrindai — skyriumi pagrįstas kursas' },
  'header.playground':     { en: 'Python Playground',      lt: 'Python žaidimų aikštelė' },
  'header.dashboard':      { en: 'Teacher Dashboard',      lt: 'Mokytojo skydelis' },

  // ── Auth / onboarding ─────────────────────────────────────────────────────
  'auth.badge':       { en: 'Learn Python in your browser', lt: 'Mokykitės Python naršyklėje' },
  'auth.h1a':         { en: 'From Hello, World',   lt: 'Nuo Hello, World' },
  'auth.h1b':         { en: 'to your first project.', lt: 'iki pirmojo projekto.' },
  'auth.desc':        {
    en: 'A friendly, browser-based Python course. Read short lessons, run real code instantly, build small projects, and track your streak — no setup required.',
    lt: 'Draugiškas, naršyklėje vykdomas Python kursas. Skaitykite trumpas pamokas, vykdykite tikrą kodą akimirksniu, kurkite mažus projektus ir stebėkite savo pažangą — nereikia diegti.',
  },
  'auth.feat1Title': { en: '100+ guided levels',           lt: '100+ lygių su instrukcijomis' },
  'auth.feat1Desc':  { en: 'Bite-sized lessons that build on each other.', lt: 'Trumpos pamokos, kurios remiasi viena kita.' },
  'auth.feat2Title': { en: 'Real Python, in the browser',  lt: 'Tikras Python naršyklėje' },
  'auth.feat2Desc':  { en: 'Powered by Pyodide — no install.',            lt: 'Veikia su Pyodide — nereikia diegti.' },
  'auth.feat3Title': { en: 'Progress tests & streaks',     lt: 'Pažangos testai ir serijos' },
  'auth.feat3Desc':  { en: 'Track grades and stay consistent.',           lt: 'Stebėkite pažymius ir laikykitės ritmo.' },
  'auth.feat4Title': { en: 'Build mini projects',          lt: 'Kurkite mini projektus' },
  'auth.feat4Desc':  { en: 'Apply what you learn straight away.',         lt: 'Iš karto pritaikykite tai, ką išmokote.' },
  'auth.welcomeBack':  { en: 'Welcome back',           lt: 'Sveiki sugrįžę' },
  'auth.createAccount':{ en: 'Create your account',    lt: 'Sukurkite paskyrą' },
  'auth.signInDesc':   { en: 'Sign in to pick up where you left off.', lt: 'Prisijunkite ir tęskite nuo ten, kur sustojote.' },
  'auth.signUpDesc':   { en: 'Free forever. No credit card needed.',   lt: 'Visada nemokama. Nereikia kredito kortelės.' },
  'auth.needAccount':  { en: 'Need an account?',       lt: 'Neturite paskyros?' },
  'auth.haveAccount':  { en: 'Already have an account?', lt: 'Jau turite paskyrą?' },
  'auth.signUp':       { en: 'Sign up',  lt: 'Registruotis' },
  'auth.signIn':       { en: 'Sign in',  lt: 'Prisijungti' },

  // ── Level cards / instructions ────────────────────────────────────────────
  'level.id':               { en: 'Level {id}',                    lt: 'Lygis {id}' },
  'level.outputMustContain':{ en: 'Output Must Contain',           lt: 'Išvestis turi turėti' },
  'level.outputMustMatch':  { en: 'Output Must Match (regex)',     lt: 'Išvestis turi atitikti (regex)' },
  'level.needHint':         { en: 'Need a hint?',                  lt: 'Reikia užuominos?' },
  'level.hints':            { en: 'Hints',                         lt: 'Užuominos' },
  'level.showNextHint':     { en: 'Show next hint ({current}/3)',  lt: 'Rodyti kitą užuominą ({current}/3)' },
  'level.backToLevels':     { en: 'Back to Levels',               lt: 'Grįžti į lygius' },
  'level.nextLevel':        { en: 'Next Level',                   lt: 'Kitas lygis' },
  'level.correctFeedback':  { en: "Great job! You've completed Level {id}: {title}", lt: 'Puiku! Jūs užbaigėte Lygį {id}: {title}' },
  'level.reviewSolution':   { en: 'Review the expected solution below and try again.', lt: 'Peržiūrėkite tikėtiną sprendimą žemiau ir bandykite iš naujo.' },
  'level.checkHints':       { en: 'Not quite! Check the hints for guidance.',         lt: 'Dar ne! Peržiūrėkite užuominas.' },
  'level.theoryInstruction':{ en: 'Theory level — write the code snippet shown and click Check Answer.', lt: 'Teorinis lygis — parašykite parodytą kodo fragmentą ir spauskite Tikrinti atsakymą.' },
  'level.checkAnswer':      { en: 'Check Answer',    lt: 'Tikrinti atsakymą' },
  'level.notFound':         { en: 'Level not found', lt: 'Lygis nerastas' },
  'level.backToLevelsLink': { en: 'Back to levels',  lt: 'Grįžti į lygius' },
  'level.levelLocked':      { en: 'Level Locked',    lt: 'Lygis užrakintas' },
  'level.completeFirst':    { en: 'Complete Level {prev} first to unlock this level.', lt: 'Pirmiausia užbaikite Lygį {prev}, kad atrakintumėte šį lygį.' },

  // ── Course completion modal ───────────────────────────────────────────────
  'completion.title':     { en: 'Course Complete!',  lt: 'Kursas baigtas!' },
  'completion.desc':      { en: "You've mastered all 100 levels of Python 🐍", lt: 'Jūs įvaldėte visus 100 Python lygių 🐍' },
  'completion.cert':      { en: 'Certificate of Completion', lt: 'Baigimo pažymėjimas' },
  'completion.certifies': { en: 'This certifies that',       lt: 'Tai patvirtina, kad' },
  'completion.hasCompleted':{ en: 'has successfully completed', lt: 'sėkmingai baigė' },
  'completion.courseTitle':  { en: '100 Levels of Python',   lt: '100 Python lygių' },
  'completion.courseSubtitle':{ en: '— from fundamentals to machine learning', lt: '— nuo pagrindų iki mašininio mokymosi' },
  'completion.shareX':    { en: 'Share on X / Twitter', lt: 'Dalintis X / Twitter' },
  'completion.backToHome':{ en: 'Back to Home',         lt: 'Grįžti į pradžią' },

  // ── Editor / output panel ─────────────────────────────────────────────────
  'editor.waitingForInput': { en: 'waiting for input…',               lt: 'laukiama įvesties…' },
  'editor.pressEnter':      { en: 'Press Enter to submit',            lt: 'Spauskite Enter, kad pateiktumėte' },
  'editor.running':         { en: 'Running…',                         lt: 'Vykdoma…' },
  'editor.clickToRun':      { en: 'Click "Run" to execute your code', lt: 'Spauskite „Paleisti", kad vykdytumėte kodą' },
  'editor.executing':       { en: 'Executing…',                       lt: 'Vykdoma…' },
  'editor.noOutput':        { en: 'No output produced.',              lt: 'Išvesties nėra.' },
  'editor.loadingPython':   { en: 'Loading Python… {pct}%',           lt: 'Kraunamas Python… {pct}%' },
  'editor.clickRunToSee':   { en: 'Click Run to see output here…',    lt: 'Spauskite Paleisti, kad matytumėte išvestį čia…' },
  'editor.stdin':           { en: 'Standard Input (stdin)',           lt: 'Standartinė įvestis (stdin)' },
  'editor.stdinPlaceholder':{ en: 'One value per line (for input() calls)\ne.g.\nAlice\n25', lt: 'Viena reikšmė eilutėje (input() funkcijoms)\npvz.\nAlicija\n25' },
  'editor.stopExecution':   { en: 'Stop execution',                   lt: 'Sustabdyti vykdymą' },

  // ── Course outline drawer ─────────────────────────────────────────────────
  'outline.title':    { en: 'Course Outline', lt: 'Kurso turinys' },
  'outline.closeAria':{ en: 'Close outline',  lt: 'Uždaryti turinį' },
  'outline.chPrefix': { en: 'Ch {id}',        lt: 'Sk. {id}' },

  // ── Exercise view ─────────────────────────────────────────────────────────
  'exercise.complete':       { en: 'Nice work — exercise complete.', lt: 'Puiku — pratimas baigtas.' },
  'exercise.correctFeedback':{ en: 'Great work — your output matches. Hit Next to continue.', lt: 'Puiku — išvestis atitinka. Spauskite Toliau, kad tęstumėte.' },
  'exercise.errorFeedback':  { en: 'Your code raised an error. Check the Output panel and try again.', lt: 'Jūsų kodas sukėlė klaidą. Patikrinkite išvesties sritį ir bandykite iš naujo.' },
  'exercise.mismatchFeedback':{ en: "Your output doesn't match the expected output yet. Compare them below and try again.", lt: 'Jūsų išvestis dar neatitinka tikėtinos išvesties. Palyginkite jas žemiau ir bandykite iš naujo.' },
  'exercise.noOutput':       { en: '(no output)',   lt: '(nėra išvesties)' },
  'exercise.yourOutput':     { en: 'Your output',  lt: 'Jūsų išvestis' },
  'exercise.expected':       { en: 'Expected',     lt: 'Tikėtina' },

  // ── Progress test ─────────────────────────────────────────────────────────
  'test.metaLine':  { en: '{total} questions · graded out of 10 · suggested passing score {passing}/10 · unlimited retakes', lt: '{total} klausimai · vertinama iš 10 · rekomenduojamas išlaikantis balas {passing}/10 · neribotai bandymų' },
  'test.answered':  { en: '{n}/{total} answered',  lt: '{n}/{total} atsakyta' },
  'test.submitTest':{ en: 'Submit Test',            lt: 'Pateikti testą' },
  'test.results':   { en: '{correct} / {total} correct · Score: {score10} / 10', lt: '{correct} / {total} teisingai · Balas: {score10} / 10' },
  'test.pass':      { en: "Nice work — that's a pass!",              lt: 'Puiku — testas išlaikytas!' },
  'test.retry':     { en: 'Retake the test to improve your grade.',  lt: 'Laikykite testą iš naujo, kad pagerintumėte pažymį.' },
  'test.retake':    { en: 'Retake',                                  lt: 'Laikyti iš naujo' },
  'test.best':      { en: 'Best: {score}/10',                        lt: 'Geriausias: {score}/10' },
  'test.predictOutput':{ en: 'Predict the output:',                 lt: 'Numatykite išvestį:' },
  'test.typeOutput':   { en: 'Type the exact output here…',          lt: 'Įveskite tikslią išvestį čia…' },
  'test.yourAnswer':   { en: 'Your answer…',                         lt: 'Jūsų atsakymas…' },
  'test.hint':         { en: 'Hint: {hint}',                         lt: 'Užuomina: {hint}' },
  'test.correct':      { en: 'Correct',                              lt: 'Teisingai' },
  'test.wrong':        { en: 'Wrong',                                lt: 'Neteisingai' },

  // ── Recap ─────────────────────────────────────────────────────────────────
  'recap.nextUp': { en: 'Next up', lt: 'Toliau' },

  // ── Basics home page ──────────────────────────────────────────────────────
  'basics.h1':       { en: 'Python Basics Learning Path', lt: 'Python pagrindų mokymosi kelias' },
  'basics.desc':     { en: 'A friendly, chapter-based course covering Python from the ground up. Read short lessons, run examples in the browser, and build small projects.', lt: 'Draugiškas, skyriumi pagrįstas kursas, apimantis Python nuo pagrindų. Skaitykite trumpas pamokas, vykdykite pavyzdžius naršyklėje ir kurkite mažus projektus.' },
  'basics.featured': { en: 'FEATURED',     lt: 'PAGRINDINIS' },
  'basics.openChapter':{ en: 'Open chapter', lt: 'Atidaryti skyrių' },
  'basics.chPrefix': { en: 'Ch {id}',      lt: 'Sk. {id}' },

  // ── Chapter page ──────────────────────────────────────────────────────────
  'chapter.backToChapters': { en: 'Back to chapters',             lt: 'Grįžti į skyrius' },
  'chapter.modules':        { en: 'Modules',                      lt: 'Moduliai' },
  'chapter.comingSoon':     { en: 'This chapter is coming soon.', lt: 'Šis skyrius greitai bus prieinamas.' },
  'chapter.lessonsCount':   { en: '{completed}/{total} lessons',  lt: '{completed}/{total} pamokų' },
  'chapter.chPrefix':       { en: 'Ch {id}',                      lt: 'Sk. {id}' },

  // ── Lesson page ───────────────────────────────────────────────────────────
  'lesson.locked':      { en: 'Lesson locked',   lt: 'Pamoka užrakinta' },
  'lesson.lockedDesc':  { en: 'Finish the previous lesson to unlock this one.', lt: 'Užbaikite ankstesnę pamoką, kad atrakintumėte šią.' },
  'lesson.backTo':      { en: '{title}',          lt: '{title}' },
  'lesson.courseOutline':{ en: 'Course Outline',  lt: 'Kurso turinys' },
  'lesson.completed':   { en: 'Completed',        lt: 'Baigta' },

  // ── Home page ─────────────────────────────────────────────────────────────
  'home.startHere':    { en: 'Start here',        lt: 'Pradėkite čia' },
  'home.h1':           { en: 'Python Basics Learning Path', lt: 'Python pagrindų mokymosi kelias' },
  'home.desc':         { en: 'A friendly, chapter-based course covering Python from the ground up — read short lessons, run real code in your browser, and build small projects.', lt: 'Draugiškas, skyriumi pagrįstas Python kursas — skaitykite trumpas pamokas, vykdykite tikrą kodą naršyklėje ir kurkite mažus projektus.' },
  'home.progress':     { en: 'You have completed {completed} of {total} lessons.', lt: 'Jūs užbaigėte {completed} iš {total} pamokų.' },
  'home.startCh1':     { en: 'Start Chapter 1',  lt: 'Pradėti 1 skyrių' },
  'home.continueLearning':{ en: 'Continue learning',  lt: 'Tęsti mokymąsi' },
  'home.reviewBasics': { en: 'Review the basics', lt: 'Peržiūrėti pagrindus' },
  'home.viewAll':      { en: 'View all chapters', lt: 'Peržiūrėti visus skyrius' },
  'home.lookingFor100':{ en: 'Looking for the 100-level challenge path?', lt: 'Ieškote 100 lygių iššūkių kelio?' },

  // ── Levels page ───────────────────────────────────────────────────────────
  'levels.pythonBasics': { en: 'Python Basics',   lt: 'Python pagrindai' },
  'levels.h1':     { en: 'Python Learning Path',  lt: 'Python mokymosi kelias' },
  'levels.desc':   { en: '100 levels across 5 phases — from Hello World to Professional Portfolio.', lt: '100 lygių 5 fazėse — nuo Hello World iki profesionalaus portfelio.' },
  'levels.search': { en: 'Search levels by title, concept or number…', lt: 'Ieškokite lygių pagal pavadinimą, sąvoką ar numerį…' },
  'levels.found':  { en: '{n} level{s} found',    lt: 'Rasta lygių: {n}' },
  'levels.noMatch':{ en: 'No levels match "{query}".', lt: 'Nerasta lygių, atitinkančių „{query}".' },

  // ── Playground ────────────────────────────────────────────────────────────
  'playground.h1':       { en: 'Python Playground',              lt: 'Python žaidimų aikštelė' },
  'playground.subtitle': { en: '— write and run any Python code',lt: '— rašykite ir vykdykite bet kokį Python kodą' },
  'playground.examples': { en: 'Examples',                       lt: 'Pavyzdžiai' },
  'playground.usesInput':{ en: '(uses input)',                   lt: '(naudoja įvestį)' },

  // ── Dashboard page ────────────────────────────────────────────────────────
  'dashboard.home':         { en: 'Home',                  lt: 'Pradžia' },
  'dashboard.accessOnly':   { en: 'Teacher Access Only',   lt: 'Tik mokytojams' },
  'dashboard.restricted':   { en: 'This dashboard is restricted to teachers. Ask your admin to set role: "teacher" in your Clerk public metadata.', lt: 'Šis skydelis skirtas tik mokytojams. Paprašykite administratoriaus nustatyti role: "teacher" jūsų Clerk viešuose metaduomenyse.' },
  'dashboard.backToLearning':{ en: 'Back to Learning',     lt: 'Grįžti į mokymąsi' },
  'dashboard.title':        { en: 'Teacher Dashboard',     lt: 'Mokytojo skydelis' },
  'dashboard.loading':      { en: 'Loading student data…', lt: 'Kraunami mokinių duomenys…' },
  'dashboard.failedToLoad': { en: 'Failed to load students: {error}', lt: 'Nepavyko užkrauti mokinių: {error}' },
  'dashboard.studentProgress':{ en: 'Student Progress',    lt: 'Mokinių pažangumas' },
  'dashboard.enrolledCount':  { en: '{n} student{s} enrolled',     lt: 'Užsiregistravę: {n}' },
  'dashboard.inClass':        { en: '{n} student{s} in {name}',    lt: 'Klasėje {name}: {n}' },
  'dashboard.allStudents':  { en: 'All students',          lt: 'Visi mokiniai' },
  'dashboard.manageClasses':{ en: 'Manage classes',        lt: 'Tvarkyti klases' },
  'dashboard.overview':     { en: 'Overview',              lt: 'Apžvalga' },
  'dashboard.testScores':   { en: 'Test Scores',           lt: 'Testų rezultatai' },
  'dashboard.assignments':  { en: 'Assignments',           lt: 'Užduotys' },
  'dashboard.selectClass':  { en: 'Select a class above to create and track assignments.', lt: 'Pasirinkite klasę viršuje, kad galėtumėte kurti ir stebėti užduotis.' },

  // ── Student table ─────────────────────────────────────────────────────────
  'studentTable.noStudents':    { en: 'No Students Yet',   lt: 'Dar nėra mokinių' },
  'studentTable.noStudentsDesc':{ en: 'Student progress will appear here once they start learning.', lt: 'Mokinių pažangumas atsiras čia, kai jie pradės mokytis.' },
  'studentTable.student':       { en: 'Student',           lt: 'Mokinys' },
  'studentTable.phaseLevels':   { en: 'Phase Levels',      lt: 'Fazių lygiai' },
  'studentTable.basics':        { en: 'Basics',            lt: 'Pagrindai' },
  'studentTable.streak':        { en: 'Streak',            lt: 'Serija' },
  'studentTable.best':          { en: 'Best',              lt: 'Geriausias' },
  'studentTable.lastActive':    { en: 'Last Active',       lt: 'Paskutinis aktyvumas' },
  'studentTable.avgScore':      { en: 'Average progress-test score (out of 10)', lt: 'Vidutinis pažangos testo balas (iš 10)' },

  // ── Student detail ────────────────────────────────────────────────────────
  'studentDetail.back':         { en: 'Back to all students',    lt: 'Grįžti į mokinių sąrašą' },
  'studentDetail.phaseLevels':  { en: 'Phase levels:',           lt: 'Fazių lygiai:' },
  'studentDetail.basicsLessons':{ en: 'Basics lessons:',         lt: 'Pagrindinės pamokos:' },
  'studentDetail.currentStreak':{ en: 'Current streak:',         lt: 'Dabartinė serija:' },
  'studentDetail.bestStreak':   { en: 'Best streak:',            lt: 'Geriausia serija:' },
  'studentDetail.testScores':   { en: 'Progress Test Scores',    lt: 'Pažangos testų rezultatai' },
  'studentDetail.notTaken':     { en: 'Not taken',               lt: 'Neišlaikytas' },
  'studentDetail.pythonBasics': { en: 'Python Basics',           lt: 'Python pagrindai' },
  'studentDetail.phaseLevelsH3':{ en: 'Phase Levels',            lt: 'Fazių lygiai' },
  'studentDetail.attempts':     { en: 'Attempts: {n}',           lt: 'Bandymai: {n}' },
  'studentDetail.testLevel':    { en: 'Test this level',         lt: 'Testuoti šį lygį' },
  'studentDetail.lessons':      { en: '{n} lessons',             lt: '{n} pamokų' },
  'studentDetail.chPrefix':     { en: 'Ch {id}',                 lt: 'Sk. {id}' },

  // ── Class scores table ────────────────────────────────────────────────────
  'classScores.noStudents':    { en: 'No Students Yet',         lt: 'Dar nėra mokinių' },
  'classScores.scoresAppear':  { en: 'Scores will appear here once students take a test.', lt: 'Rezultatai atsiras čia, kai mokiniai atlikis testą.' },
  'classScores.noTests':       { en: 'No Tests Yet',            lt: 'Dar nėra testų' },
  'classScores.testsAppear':   { en: 'Progress tests will appear here as chapters are published.', lt: 'Pažangos testai atsiras čia, kai bus paskelbti skyriai.' },
  'classScores.info':          { en: 'Best score per test, out of 10. — = not taken. Click a column to sort.', lt: 'Geriausias balas kiekvienam testui, iš 10. — = neatliktas. Spustelėkite stulpelį rūšiavimui.' },
  'classScores.student':       { en: 'Student',                 lt: 'Mokinys' },
  'classScores.average':       { en: 'Average',                 lt: 'Vidurkis' },
  'classScores.classAverage':  { en: 'Class average',           lt: 'Klasės vidurkis' },
  'classScores.notTaken':      { en: '(Not taken)',             lt: '(Neatliktas)' },
  'classScores.chPrefix':      { en: 'Ch {id}',                 lt: 'Sk. {id}' },

  // ── Class manager ─────────────────────────────────────────────────────────
  'classManager.title':          { en: 'Manage Classes',     lt: 'Tvarkyti klases' },
  'classManager.placeholder':    { en: 'New class name (e.g. 8A Python)', lt: 'Naujos klasės pavadinimas (pvz. 8A Python)' },
  'classManager.noClasses':      { en: 'No classes yet. Create one above, then assign students.', lt: 'Dar nėra klasių. Sukurkite vieną viršuje, tada priskirkite mokinius.' },
  'classManager.assignStudents': { en: 'Assign students to the selected class', lt: 'Priskirti mokinius pasirinktai klasei' },

  // ── Assignments ───────────────────────────────────────────────────────────
  'assignments.assignTest':    { en: 'Assign a test',          lt: 'Priskirti testą' },
  'assignments.testLabel':     { en: 'Test',                   lt: 'Testas' },
  'assignments.dueDate':       { en: 'Due date (optional)',    lt: 'Terminas (nebūtina)' },
  'assignments.noAssignments': { en: 'No assignments for this class yet.', lt: 'Dar nėra užduočių šiai klasei.' },
  'assignments.due':           { en: 'Due {date}',             lt: 'Terminas: {date}' },
  'assignments.dueOverdue':    { en: 'Due {date} · overdue',   lt: 'Terminas: {date} · vėluojama' },
  'assignments.noDueDate':     { en: 'No due date',            lt: 'Nėra termino' },
  'assignments.remove':        { en: 'Remove assignment',      lt: 'Pašalinti užduotį' },
  'assignments.completed':     { en: '{done}/{total} completed', lt: '{done}/{total} atlikta' },
  'assignments.avg':           { en: 'avg {avg}/10',           lt: 'vid. {avg}/10' },
  'assignments.notDone':       { en: 'Not done: {names}',      lt: 'Neatlikta: {names}' },

  // ── Phase accordion ───────────────────────────────────────────────────────
  'phase.id':     { en: 'Phase {id}', lt: 'Fazė {id}' },
  'phase.locked': { en: 'Complete 80% of the previous phase to unlock this phase.', lt: 'Užbaikite 80% ankstesnės fazės, kad atrakintumėte šią fazę.' },
}

// ─────────────────────────────────────────────────────────────────────────────

export function t(key: string, lang: Lang, vars?: Vars): string {
  const entry = ui[key]
  const template = entry?.[lang] ?? entry?.en ?? key
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}

export function useT(): TFunc {
  const lang = useLangStore((s) => s.lang)
  return useCallback(
    (key: string, vars?: Vars) => t(key, lang, vars),
    [lang],
  )
}
