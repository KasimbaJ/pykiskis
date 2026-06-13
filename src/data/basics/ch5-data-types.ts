import type { Chapter } from '../../types/basics'
import { listsModule } from './ch5/lists'
import { tuplesModule } from './ch5/tuples'
import { stringsModule } from './ch5/strings'
import { dictionariesModule } from './ch5/dictionaries'
import { setsModule } from './ch5/sets'
import { conversionModule } from './ch5/conversion'
import { rangeFunctionModule } from './ch5/range-function'
import {
  progressTest1Module,
  progressTest2Module,
  progressTest3Module,
  finalTestModule,
} from './ch5/progress-tests'
import { recapModule } from './ch5/recap'

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 5: Data Types — Python's built-in collections.
//   1. lists            2. tuples            3. progress-test-1 (lists+tuples)
//   4. strings          5. dictionaries      6. progress-test-2 (strings+dicts)
//   7. sets             8. conversion        9. range-function
//  10. progress-test-3  11. recap            12. final-test
// ─────────────────────────────────────────────────────────────────────────────

/** Chapter 5: Data Types — lists, tuples, dictionaries, sets. */
export const ch5: Chapter = {
  id: 5,
  slug: 'data-types',
  title: 'Data Types',
  subtitle: 'Lists, tuples, dictionaries, and sets',
  description: "Organise data using Python's built-in collection types.",
  color: 'violet',
  modules: [
    listsModule,          // 1
    tuplesModule,         // 2
    progressTest1Module,  // 3
    stringsModule,        // 4
    dictionariesModule,   // 5
    progressTest2Module,  // 6
    setsModule,           // 7
    conversionModule,     // 8
    rangeFunctionModule,  // 9
    progressTest3Module,  // 10
    recapModule,          // 11
    finalTestModule,      // 12
  ],
}
