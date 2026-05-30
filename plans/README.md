# Plans — active & pending implementation handoffs

This directory holds **self-contained implementation plans**. Each `*-plan.md`
can be executed by a fresh session (or the daily routine) with zero prior
context. This index is the source of truth for what is pending vs. done.

When a plan is fully implemented and deployed, change its status here to **Done**
and add the merge/commit reference.

## Status

| Plan | Status | Notes |
|------|--------|-------|
| `code-visualizer-plan.md` | **v1 done & deployed** | Native step-through code visualizer, authored as a `visualize` content block. Phases 1–3 complete & browser-verified; live in the Variables module ("Visualizing Changing Variables"). v1-depth decision resolved = stepper + variables + output. Remaining: optional Phase 4 polish + the **v2 heap/reference diagram**. |

## How the daily routine uses this

1. Read this index + every `*-plan.md` marked Pending/In progress.
2. Continue the next unfinished phase of the highest-priority pending plan,
   following that plan's own steps and verification gates (lint, build, etc.).
3. If a plan reaches an item marked **OPEN**, stop and describe the decision in
   the PR — do not guess.
4. Open a pull request for review; do **not** push directly to `master`.
5. If nothing is pending, do nothing.
