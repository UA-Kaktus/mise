# Documentation

## Where things live

- `CLAUDE.md` — thin AI contract; `@`-imports rules. Keep it navigational, don't duplicate rule/doc content.
- `.claude/rules/*` — operational rules for the AI (English, terse, imperative).
- `docs/*` — project documentation for the developer / CV (**Ukrainian**). Idea, roadmap, design system.
- `README.md` — public face of the repo (**English**, lean — essentials + links into `docs/`, not a copy of them).
- `frontend-roadmap.md` — personal learning plan, git-ignored. Not part of project docs; never edit or un-ignore.

> Language split: `docs/*` are for the developer → Ukrainian; `README.md` is public-facing → English.

## How to write docs

- Concise, scannable. Headings + short bullets over walls of text.
- Keep short "why" footnotes — this is a learning project, the reasoning is part of the value.
- Update docs alongside features, not at the end. README and roadmap stay honest from day 1.

## Who writes them

The `docs-writer` agent drafts ~90% of `docs/*` and the README; the developer reviews and edits after. Whoever writes,
these rules are the contract. (In the `/build` pipeline `docs-writer` runs after the review gate passes.)

## Maintenance triggers

- Finished a roadmap module → tick the checklist in `docs/roadmap.md`.
- Architecture decision changed → record the _why_ briefly inline in the relevant doc or the commit message.

## No ADRs

We do **not** keep separate Architecture Decision Records (`docs/adr/`, `0001-*.md`). Decisions are captured
concisely in the relevant `docs/*` file or the commit/PR description. Don't create an `adr/` folder.
