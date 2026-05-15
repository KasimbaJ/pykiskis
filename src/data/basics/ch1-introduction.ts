import type { Chapter } from '../../types/basics'
import { getStartedModule }         from './ch1/get-started'
import { numbersAndStringsModule }  from './ch1/numbers-and-strings'
import { commentsModule }           from './ch1/comments'
import { variablesModule }          from './ch1/variables'
import { outputModule }             from './ch1/output'
import { arithmeticOperatorsModule } from './ch1/arithmetic-operators'
import { dataConversionModule }     from './ch1/data-conversion'
import { getUserInputModule }       from './ch1/get-user-input'
import { introductionExamplesModule } from './ch1/introduction-examples'
import { recapModule }              from './ch1/recap'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 1: Introduction
//
// All 10 modules transcribed from the source PDF.  Each module lives in its
// own file under ./ch1/ to keep file sizes manageable.
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
    getStartedModule,
    numbersAndStringsModule,
    commentsModule,
    variablesModule,
    outputModule,
    arithmeticOperatorsModule,
    dataConversionModule,
    getUserInputModule,
    introductionExamplesModule,
    recapModule,
  ],
}
