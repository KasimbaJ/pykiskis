import type { Chapter, Module } from '../../types/basics'
import { getStartedModule }         from './ch1/get-started'
import { numbersAndStringsModule }  from './ch1/numbers-and-strings'
import { commentsModule }           from './ch1/comments'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 1: Introduction
//
// Each module lives in its own file under ./ch1/ to keep file sizes
// manageable.  Modules that haven't been transcribed yet are stubbed below
// with empty lesson arrays so the chapter / drawer structure still renders.
// ─────────────────────────────────────────────────────────────────────────────

const variablesModule: Module = {
  slug: 'variables',
  title: 'Variables',
  summary: 'Store and reuse values in your programs.',
  lessons: [],
}

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

const dataConversionModule: Module = {
  slug: 'data-conversion',
  title: 'Data Conversion',
  summary: 'Convert between numbers and strings.',
  lessons: [],
}

const getUserInputModule: Module = {
  slug: 'get-user-input',
  title: 'Get User Input',
  summary: 'Read input from the user with input().',
  lessons: [],
}

const introductionExamplesModule: Module = {
  slug: 'introduction-examples',
  title: 'Introduction Examples',
  summary: 'Apply what you learned to small problems.',
  lessons: [],
}

const recapModule: Module = {
  slug: 'recap',
  title: 'Recap',
  summary: 'Wrap up Chapter 1.',
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
