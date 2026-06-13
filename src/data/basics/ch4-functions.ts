import type { Chapter } from '../../types/basics'
import { pythonFunctionsModule } from './ch4/python-functions'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 4: Functions — write your own reusable blocks of code.  Modules are
// added one per PR.  Planned order:
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
  ],
}
