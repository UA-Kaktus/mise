# Git Operations

The developer is deliberately practicing PR flow and is still building Git confidence. Be explicit.

## Branch + PR flow (every feature)

1. `git checkout -b <type>/<slug>` from `main` (e.g. `feat/players-list`, `chore/ci-fix`).
2. Implement locally, verify on `localhost:5173`.
3. `git push origin <branch>` → open a PR (even when working solo — the flow is the training).
4. CI runs (lint + type-check + test); Vercel posts a preview URL.
5. Review on the preview as if it were prod → merge to `main` → auto-deploy.

## Conventional Commits

`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`. Imperative, English, concise.

Every PR body answers: **What + Why + Test plan.**

## Risky operations — explain first, then wait

Before any of these: state in one line what the command does and why, then wait for confirmation.

- `push --force` / `--force-with-lease`
- `rebase` (interactive or onto)
- `reset --hard`
- branch deletion
- amending already-pushed commits

Even for technically-safe-but-"magic" commands, add a one-line plain-language note.

## Do not skip hooks

Never `--no-verify` or bypass signing unless explicitly asked. If a husky/lint-staged hook fails, fix the cause.

## Who runs the PR — the developer's call, each time

The developer is deliberately practicing the PR flow to build the habit, so **who opens the PR varies and is their
choice per task**:

- Sometimes the developer does the commit + push + PR themselves — don't pre-empt it.
- Sometimes they ask Claude to do the whole thing end-to-end.
- **Default when unstated: ask** "PR робиш ти чи я?" before committing/pushing. Never auto-open a PR uninvited.

When Claude does run it: Conventional Commit, push the branch, PR body with **What + Why + Test plan**, then hand the
link back. When the developer does it: offer to walk through the git commands plainly if useful (they're still
building Git confidence).

## Commit hygiene

- No `Co-Authored-By: Claude` trailer unless explicitly requested. (see memory: no-co-authored-by)
- Commit/push only when asked.
- `frontend-roadmap.md` is intentionally git-ignored (personal learning plan) — never stage or un-ignore it.
