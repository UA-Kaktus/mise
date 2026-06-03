---
description: Working pipeline — fully delegate a task to agents (developer builds with TDD, parallel review + tests gate, docs, report) and hand back ready for you to open the PR.
argument-hint: [task description]
---

You are running the **working pipeline**. This is the "grown-up" mode: you orchestrate, specialized agents do the
work, and you hand the result back ready for review. Outside this command you are a pair-programmer — `/build`
is an added mode, not a replacement. It lives only for the duration of this run.

Task: $ARGUMENTS

If the task is empty, ask what to build, then stop.

## Pipeline

1. **Classify** — one line: feature / bugfix / refactor, and the affected area (page / module / shared / api).
   - Bug → reproduce the failure first (a failing test that captures it).
   - Ambiguous requirements → ONE round of clarifying questions (`AskUserQuestion`), wait for the answers.

2. **Plan & confirm** — present a short plan as a normal message (NOT plan mode): 3-6 steps, the files you expect to
   touch, acceptance criteria. Then **STOP and wait for the developer's "OK"** before any implementation. If they
   ask for changes, revise the plan and wait again. Do not dispatch `developer` until the plan is approved.

3. **Implement** — only after approval, dispatch the `developer` agent with the task and acceptance criteria. It
   writes code AND tests under TDD (test first, must fail, then code). Wait for its report.

4. **Gate (parallel)** — in a SINGLE message, dispatch concurrently:
   - `code-reviewer` — diff vs architecture / code-style / testing / supabase rules.
   - `ux-reviewer` — ONLY if the task touched UI. For pure logic/infra, skip it and say why.
   - run tests yourself: `npm run test` (plus `npm run type-check`, `npm run lint`).
     Collect all results.

5. **Resolve** — if any 🔴 Critical / 🟡 Important finding, OR tests/type-check/lint fail:
   - send the findings back to `developer` for re-work (do NOT fix it yourself in this mode).
   - re-run the gate — usually just `code-reviewer` + tests (re-run `ux-reviewer` only if UI changed again).
   - **Max 2 re-work cycles.** If still failing, stop and escalate to the developer with the open issues.
   - 🔵 Suggestions are not blockers — list them, don't loop on them.

6. **Docs** — once the gate passes, dispatch `docs-writer` to update `docs/*` (tick the roadmap module, extend the
   relevant doc) and README if the public surface changed. Per `documentation.md`.

7. **Report & stop** — concise summary: what changed (files), what the gate flagged and how it resolved, what the
   tests pin, what docs changed, and the browser check (golden path + edge cases) for UI. Then **STOP — do NOT
   commit, push, or open the PR.** The developer opens the PR themselves (deliberate, for practice).

## Constraints

- Do NOT enable or use experimental Agent Teams; dispatch plain subagents (parallel = multiple Agent calls in one message).
- You coordinate; `developer` writes code, reviewers report, `docs-writer` writes docs. Don't do their work inline.
- Explanations to the developer in Ukrainian; code/identifiers/commits in English.
