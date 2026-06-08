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
| `visualizer-more-lessons-plan.md` | **Pending — not started** | Add one `visualize` block to the Data Conversion `convert-to-integer` lesson (string→int step-through). Content-only, deterministic; open a draft PR. |

## How the daily routine uses this

1. Read this index + every `*-plan.md` marked Pending/In progress.
2. Continue the next unfinished phase of the highest-priority pending plan,
   following that plan's own steps and verification gates (lint, build, etc.).
3. If a plan reaches an item marked **OPEN**, stop and describe the decision in
   the PR — do not guess.
4. Open a pull request for review; do **not** push directly to `master`.
5. If nothing is pending, do nothing.
