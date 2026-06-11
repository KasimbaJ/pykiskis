import type { Chapter } from '../../types/basics'
import { pythonBooleansModule } from './ch2/python-booleans'
import { ifElseStatementModule } from './ch2/if-else-statement'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 2: Decision Making & Loops
//
// Modules are added one per run as they are authored.  Final order:
//   1. python-booleans       (content)
//   2. if-else-statement     (content)
//   3. progress-test-1       (bank: Booleans + if/else)
//   4. logical-operators     (content)
//   5. while-loop            (content)
//   6. progress-test-2       (bank: Logical + while)
//   7. for-loop              (content)
//   8. break-and-continue    (content)
//   9. progress-test-3       (bank: for + break/continue)
//  10. control-flow-examples (content)
//  11. recap                 (recap module)
//  12. final-test            (15 questions, 5 per bank)
// ─────────────────────────────────────────────────────────────────────────────

export const ch2: Chapter = {
  id: 2,
  slug: 'decision-making-loops',
  title: 'Decision Making & Loops',
  subtitle: 'If statements, loops, and control flow',
  description:
    'Make your programs make decisions and repeat work. ' +
    'You will learn booleans, if/else statements, logical operators, ' +
    'while and for loops, and break/continue.',
  color: 'sky',
  modules: [
    pythonBooleansModule,    // 1
    ifElseStatementModule,   // 2
  ],
}
