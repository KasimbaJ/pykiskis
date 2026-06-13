import type { Chapter } from '../../types/basics'
import { pythonFunctionsModule } from './ch4/python-functions'
import { localVariablesModule } from './ch4/local-variables'
import { progressTest1Module, finalTestModule } from './ch4/progress-tests'
import { thinkFunctionsModule } from './ch4/think-functions'
import { recapModule } from './ch4/recap'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 4: Functions — write your own reusable blocks of code.
//   1. python-functions   (def, parameters, return)
//   2. local-variables    (scope)
//   3. progress-test-1     (bank: functions + scope)
//   4. think-functions     (applied — refactor repetition into functions)
//   5. recap
//   6. final-test
// ─────────────────────────────────────────────────────────────────────────────

/** Chapter 4: Functions. */
export const ch4: Chapter = {
  id: 4,
  slug: 'functions',
  title: 'Functions',
  subtitle: 'Reusable blocks of code',
  description: 'Write your own functions with def and return, and learn how scope works.',
  color: 'emerald',
  modules: [
    pythonFunctionsModule,  // 1
    localVariablesModule,   // 2
    progressTest1Module,    // 3
    thinkFunctionsModule,   // 4
    recapModule,            // 5
    finalTestModule,        // 6
  ],
}
