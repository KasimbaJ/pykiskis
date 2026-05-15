import type { Chapter } from '../../types/basics'
import { getStartedModule }            from './ch1/get-started'
import { numbersAndStringsModule }     from './ch1/numbers-and-strings'
import { commentsModule }              from './ch1/comments'
import { variablesModule }             from './ch1/variables'
import { outputModule }                from './ch1/output'
import { arithmeticOperatorsModule }   from './ch1/arithmetic-operators'
import { dataConversionModule }        from './ch1/data-conversion'
import { getUserInputModule }          from './ch1/get-user-input'
import { introductionExamplesModule }  from './ch1/introduction-examples'
import { recapModule }                 from './ch1/recap'
import {
  progressTest1Module,
  progressTest2Module,
  progressTest3Module,
  progressTest4Module,
} from './ch1/progress-tests'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 1: Introduction
//
// 10 content modules + 4 checkpoint progress tests (after modules 2, 4, 6, 8).
// Each module lives in its own file under ./ch1/ to keep file sizes manageable.
// ─────────────────────────────────────────────────────────────────────────────

export const ch1: Chapter = {
  id: 1,
  slug: 'introduction',
  title: 'Introduction',
  subtitle: 'Get started with Python',
  description:
    'Welcome to Python! In this chapter you will write your first program, ' +
    'meet strings and numbers, learn about variables and arithmetic, and read ' +
    'input from the user.',
  color: 'indigo',
  modules: [
    getStartedModule,           // 1
    numbersAndStringsModule,    // 2
    progressTest1Module,        //   ↳ checkpoint after module 2
    commentsModule,             // 3
    variablesModule,            // 4
    progressTest2Module,        //   ↳ checkpoint after module 4
    outputModule,               // 5
    arithmeticOperatorsModule,  // 6
    progressTest3Module,        //   ↳ checkpoint after module 6
    dataConversionModule,       // 7
    getUserInputModule,         // 8
    progressTest4Module,        //   ↳ checkpoint after module 8
    introductionExamplesModule, // 9
    recapModule,                // 10
  ],
}
