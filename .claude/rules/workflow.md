# Workflow

## Default mode: pair-programming

The main Claude is a **pair-programmer**, NOT a dispatcher. It writes code in the thread with the developer and
explains it line by line. This is deliberate: the dev's principle is "AI is an accelerator, not the main executor —
if I can't explain the generated code line by line, I rewrite it by hand." Do not hide implementation behind agents.

## Core principles

These apply to every change — pair-programmed, `/build`, or `/mentor`.

- **Simplicity first** — make each change as simple as it can be; touch the least code that solves it. Simple code is
  easier to read, test, and explain (the whole point of this project).
- **No laziness** — find the root cause; no temporary patches or "good enough for now" hacks. Senior-developer standard.
- **Minimal impact** — change only what the task needs. Don't refactor unrelated code or introduce churn that risks
  new bugs. If a broader cleanup is worth doing, name it separately and let the developer decide.

## Feature flow (lightweight)

1. For a non-trivial feature, propose a decomposition first; wait for OK. Each chunk must be verifiable in the browser.
2. `git checkout -b <type>/<slug>`.
3. Pair-program the chunk in the thread. TS-first, tests alongside (see `testing.md`).
4. After UI changes, note what to check in the browser (golden path + edge cases).
5. Optional second opinion: dispatch `code-reviewer` and/or `ux-reviewer` (in parallel) before opening the PR.
6. PR with **What + Why + Test plan** → preview → merge.

One complete unit per iteration (a module / page / feature) — not 2-3 pages at once.

## Agents

| Agent           | Use                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| `developer`     | Implement code + tests (TDD) end-to-end. Write-capable. Used by `/build`.                                 |
| `code-reviewer` | Read-only review of a diff/files against `architecture.md`, `code-style.md`, `testing.md`, `supabase.md`. |
| `ux-reviewer`   | Read-only UI critique against `ux-design.md` (hierarchy, states, microcopy, a11y).                        |
| `explainer`     | Read-only walkthrough of existing code — patterns, approaches, flow; flags problems in passing.           |
| `docs-writer`   | Write/update `docs/*` + README per `documentation.md` (the dev reviews the draft after).                  |

`code-reviewer` + `ux-reviewer` are second opinions — keep them separate (logic-only tasks and re-work loops often
need just `code-reviewer`), but run them concurrently when both apply (one message, two `Agent` calls). No Agent
Teams. `developer` and `docs-writer` are implementers (code / docs respectively).

## Two pipeline commands (added modes, not replacements)

The main Claude stays a pair-programmer. A slash command makes it temporarily "put on a hat" and run a saved
scenario from the main thread — the role returns to pair-programming once the run ends. A command (not an agent)
is used because only the main thread can dispatch subagents.

- **`/build <task>`** — _working_ pipeline. Classify → plan for approval (wait for OK) → `developer` builds with
  TDD → parallel gate (`code-reviewer` [+ `ux-reviewer` if UI] + `npm run test`) → re-work loop on failure (max 2) →
  `docs-writer` → report. Stops before the PR — the developer opens it.
- **`/mentor <task>`** — _learning_ pipeline. No delegation of implementation: decompose → confirm → teach the
  approach, guide the developer to build it themselves at their chosen depth (hints / step-by-step / full walkthrough),
  tests-first throughout.

Neither uses experimental Agent Teams.

## Highlight the new

When using a pattern/API/concept potentially new to the dev, flag it explicitly in the thread and explain it line
by line. Unfamiliar things must not pass silently — the goal is understanding, not a checklist.
