# Plans — active & pending implementation handoffs

This directory holds **self-contained implementation plans**. Each `*-plan.md`
can be executed by a fresh session (or the daily routine) with zero prior
context. This index is the source of truth for what is pending vs. done.

When a plan is fully implemented and deployed, change its status here to **Done**
and add the merge/commit reference.

## Status

| Plan | Status | Notes |
|------|--------|-------|
| `code-visualizer-plan.md` | **v2 done & deployed** | Native step-through code visualizer authored as a `visualize` content block. v1 (stepper + variables + output) and **v2 (heap view with drawn arrows for aliasing)** both complete & browser-verified. Authored into 3 Chapter-1 lessons (Variables ×2, Arithmetic `+=`). Arrows activate automatically once mutable objects appear (Chapter 5+). Remaining: optional polish; wire into future chapters as authored. |
| `class-scores-table-plan.md` | **Done & deployed** | Teacher Dashboard "Test Scores" view: class-wide table (students × progress/final tests) with per-student Average + CSV export, behind an Overview/Test Scores toggle. Read-only, teacher-only; no API/DB change. |
| `visualizer-more-lessons-plan.md` | **Done** | Added one `visualize` block to the Data Conversion `convert-to-integer` lesson (string→int step-through). Lint + build green; deployed via PR. |
| `language-toggle-plan.md` | **Phase 1 done & deployed** | EN/LT language toggle. Foundation (`LocalizedString`/`localize`/`useLangStore`), header toggle, and theory-content wiring shipped. Decisions: EN+LT, default EN, UI+content, routine drafts translations, custom (no dep). Remaining = complete wiring + translate. |
| `i18n-complete-wiring-plan.md` | **Proposed (careful session — NOT the routine)** | Extend localize() wiring to non-theory basics surfaces (titles, quiz/exercise/progress-test/recap). Broad type change; do with browser verification, not unattended. |
| `i18n-translate-ch1-plan.md` | **Done** | Draft Lithuanian for Chapter 1 **theory** prose, one module per run, into draft PRs for teacher review. All modules translated: `get-started`, `numbers-and-strings`, `comments`, `variables`, `output`, `arithmetic-operators`, `data-conversion`, `get-user-input`, `introduction-examples`, and `recap`. |

| `classes-and-assignments-plan.md` | **Phases 1+2 done & deployed** | Classes (group + filter) and teacher Assignments (assign a test + due date; per-class completion, average, not-done, overdue). Remaining: Phase 3 student "My assignments" view. Human-verified — not for the routine. |

## How the daily routine uses this

1. Read this index + every `*-plan.md` marked Pending/In progress.
2. Continue the next unfinished phase of the highest-priority pending plan,
   following that plan's own steps and verification gates (lint, build, etc.).
3. If a plan reaches an item marked **OPEN**, stop and describe the decision in
   the PR — do not guess.
4. Open a pull request for review; do **not** push directly to `master`.
5. If nothing is pending, do nothing.
