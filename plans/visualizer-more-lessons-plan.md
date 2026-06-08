# Wire the visualizer into the Data Conversion lesson

> STATUS: **Pending — not started.**
> Self-contained handoff. Small, deterministic, content-only task.

## Goal

Add one `visualize` content block to the **Data Conversion** module so learners
can step through a string→integer conversion and watch the value (and its use in
arithmetic) change line by line. This continues the "wire the visualizer into
more lessons" work; the `visualize` block + `CodeVisualizer` component already
exist and are deployed.

## Exact change (do exactly this — one block, one file)

File: `src/data/basics/ch1/data-conversion.ts`, lesson with `slug: 'convert-to-integer'`.

Insert this block **immediately after** the "String to Integer" `runnable` block
(the one whose `code` starts with `string_number = "15"`) and **before** the
paragraph that reads "Here, the `int()` function converts the string to its
equivalent integer.":

```ts
{
  kind: 'visualize',
  caption: 'Step through it: watch the string "15" become the integer 15, then get used in arithmetic.',
  code:
    'text_value = "15"\n' +
    'number = int(text_value)\n' +
    'doubled = number * 2\n' +
    'print(doubled)',
},
```

Do not change anything else in the file or repo.

## Verify
- `npm run lint` and `npm run build` must both pass clean.
- (Browser/Clerk click-through verification is not possible in this environment —
  state that in the PR. The `visualize` block + component are already proven in
  production, so a new block is low-risk.)

## PR
- Branch + **draft** PR (do not push to `master`).
- PR body: what was added (one `visualize` block in the convert-to-integer
  lesson), lint/build result, note that browser verification is pending human
  review, and that this is the whole task (no remaining phases).

## On completion
- Set this plan's STATUS to **Done** and update `plans/README.md`.

## Done when
- The convert-to-integer lesson has the `visualize` block; lint + build green;
  a draft PR is open for review.
