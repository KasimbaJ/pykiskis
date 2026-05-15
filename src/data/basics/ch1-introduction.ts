import type { Chapter, Module } from '../../types/basics'
import { getStartedModule }         from './ch1/get-started'
import { numbersAndStringsModule }  from './ch1/numbers-and-strings'
import { commentsModule }           from './ch1/comments'
import { variablesModule }          from './ch1/variables'
import { dataConversionModule }     from './ch1/data-conversion'
import { getUserInputModule }       from './ch1/get-user-input'
import { recapModule }              from './ch1/recap'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 1: Introduction
//
// Each module lives in its own file under ./ch1/ to keep file sizes
// manageable.  Modules that haven't been transcribed yet are stubbed below
// with empty lesson arrays so the chapter / drawer structure still renders.
// ─────────────────────────────────────────────────────────────────────────────

const outputModule: Module = {
  slug: 'output',
  title: 'Output',
  summary: 'Display results to the user.',
  lessons: [],
}

const arithmeticOperatorsModule: Module = {
  slug: 'arithmetic-operators',
  title: 'Arithmetic Operators',
  summary: 'Add, subtract, multiply, divide, and more.',
  lessons: [],
}

const introductionExamplesModule: Module = {
  slug: 'introduction-examples',
  title: 'Introduction Examples',
  summary: 'Apply what you learned to small problems.',
  lessons: [],
}

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
