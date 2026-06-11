import type { Chapter } from '../../types/basics'
import { pythonBooleansModule } from './ch2/python-booleans'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 2: Decision Making & Loops
//
// Modules are added one at a time via the daily content routine.
// Final order: python-booleans → if-else-statement → progress-test-1 →
//   logical-operators → while-loop → progress-test-2 →
//   for-loop → break-and-continue → progress-test-3 →
//   control-flow-examples → recap → final-test
// ─────────────────────────────────────────────────────────────────────────────

export const ch2: Chapter = {
  id: 2,
  slug: 'decision-making-loops',
  title: 'Decision Making & Loops',
  subtitle: 'If statements, loops, and control flow',
  description:
    'Make your programs make decisions and repeat work with if statements, ' +
    'logical operators, while loops, and for loops.',
  color: 'sky',
  modules: [
    pythonBooleansModule,  // 1
  ],
}
