import type { Chapter } from '../../types/basics'
import { usingModulesModule } from './ch6/using-modules'
import { nestedLoopsModule } from './ch6/nested-loops'
import { miscellaneousModule } from './ch6/miscellaneous'
import { progressTest1Module, finalTestModule } from './ch6/progress-tests'
import { mathQuizGameModule } from './ch6/math-quiz-game'
import { recapModule } from './ch6/recap'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 6: Completing Basics — the final Basics chapter. Modules per PR:
//   1. using-modules   2. nested-loops   3. miscellaneous   4. progress-test-1
//   5. math-quiz-game (capstone)   6. recap   7. final-test
// ─────────────────────────────────────────────────────────────────────────────

/** Chapter 6: Completing Basics — modules, nested loops, and finishing touches. */
export const ch6: Chapter = {
  id: 6,
  slug: 'completing-basics',
  title: 'Completing Basics',
  subtitle: 'Modules, nested loops, and finishing touches',
  description:
    'Round out the basics: use Python modules, nest loops, tidy up with handy ' +
    'extras, and build a final project.',
  color: 'rose',
  modules: [
    usingModulesModule,   // 1
    nestedLoopsModule,    // 2
    miscellaneousModule,  // 3
    progressTest1Module,  // 4
    mathQuizGameModule,   // 5 (capstone)
    recapModule,          // 6
    finalTestModule,      // 7
  ],
}
