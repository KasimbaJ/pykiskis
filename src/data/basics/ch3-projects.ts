import type { Chapter } from '../../types/basics'
import { numberGuessingGameModule } from './ch3/number-guessing-game'
import { simpleCalculatorModule } from './ch3/simple-calculator'
import { studentGradeCalculatorModule } from './ch3/student-grade-calculator'
import { rockPaperScissorsModule } from './ch3/rock-paper-scissors'
import { madLibsModule } from './ch3/mad-libs'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 3: Projects (FEATURED) — guided, build-it-step-by-step projects that
// apply Chapter 1–2 skills.  Projects are added one per PR.  Planned order:
//   1. number-guessing-game     (Ch1–2 skills + random)
//   2. simple-calculator        (operators, if/elif, loop, error handling)
//   3. student-grade-calculator (loop to read scores, average, grade band)
// ─────────────────────────────────────────────────────────────────────────────

/** Chapter 3: Projects (FEATURED) — small projects built from Chapter 1–2 skills. */
export const ch3: Chapter = {
  id: 3,
  slug: 'projects-1',
  title: 'Projects',
  subtitle: 'Build small projects with what you have learned',
  description:
    'Apply your new skills to fun, guided mini-projects — built one step at a ' +
    'time, just like a real developer.',
  color: 'amber',
  featured: true,
  modules: [
    numberGuessingGameModule,  // 1
    simpleCalculatorModule,    // 2
    studentGradeCalculatorModule, // 3
    rockPaperScissorsModule,   // 4
    madLibsModule,             // 5
  ],
}
