import type { Chapter } from '../../types/basics'
import { todoListManagerModule } from './ch7/todo-list-manager'
import { contactBookModule } from './ch7/contact-book'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 7: Projects (FEATURED) — capstone projects that bring together
// everything from Chapters 1–6 (lists, dictionaries, functions, loops, strings).
// The step-up from Chapter 3, which used only Chapter 1–2 skills.  Projects are
// added one per PR.  Planned order (see plans/chapter-7-projects-plan.md):
//   1. To-Do List Manager     (lists + functions + menu loop)
//   2. Contact Book           (dictionaries + functions)
//   3. Hangman                (strings + lists + random + functions)
//   4. Word Frequency Counter (strings + dicts + sets)
// ─────────────────────────────────────────────────────────────────────────────

/** Chapter 7: Projects (FEATURED) — capstone projects covering all of Basics. */
export const ch7: Chapter = {
  id: 7,
  slug: 'projects-2',
  title: 'Projects',
  subtitle: 'Capstone projects',
  description:
    'Bring everything together in bigger projects that use the whole Basics ' +
    'course — lists, dictionaries, functions, and loops — to build real, ' +
    'working apps one step at a time.',
  color: 'amber',
  featured: true,
  modules: [
    todoListManagerModule, // 1
    contactBookModule,     // 2
  ],
}
