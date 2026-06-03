# Footfolio

Football analytics web app focused on a single idea: **player efficiency — "money per goal"**
(`salary / goals`). Browse leagues, teams and players; an admin can edit the data inline. Built as a learning
project to practise TypeScript and advanced React on real code rather than another tutorial to-do app.

**Live:** https://footfolio-b3fl1muda-ua-kaktus-26.vercel.app/ · _Status: early development._

## The metric

Every efficiency number (player KPD, team aggregates, league table positions) is **computed on the frontend** from
primary data — never stored. Single source of truth stays the raw figures from the database. Data is a snapshot of a
**finished season**, so goals are final and the metric is stable.

## Tech stack

| Layer          | Choice                                          |
| -------------- | ----------------------------------------------- |
| Build / dev    | Vite                                            |
| UI             | React 19 + TypeScript                           |
| Styling        | Tailwind CSS v4 (own components, no UI library) |
| Routing        | React Router                                    |
| Server state   | TanStack Query                                  |
| Client state   | Zustand                                         |
| Forms          | react-hook-form + zod                           |
| Backend (BaaS) | Supabase (PostgreSQL + Auth + RLS)              |
| Tests          | Vitest + React Testing Library + MSW            |
| Quality        | ESLint + Prettier + husky + lint-staged         |
| CI / Hosting   | GitHub Actions · Vercel                         |

The browser talks to Supabase directly via `supabase-js`; Vercel only hosts the static frontend. The Supabase anon
key is public by design — the database is protected by Row Level Security.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key
npm run dev                  # http://localhost:5173
```

### Scripts

| Script                            | Does                          |
| --------------------------------- | ----------------------------- |
| `npm run dev`                     | Vite dev server               |
| `npm run build`                   | type-check + production build |
| `npm run lint` / `lint:fix`       | ESLint                        |
| `npm run format` / `format:check` | Prettier                      |
| `npm run type-check`              | `tsc` no-emit                 |
| `npm run preview`                 | preview the production build  |

## Documentation

- [`docs/project-idea.md`](docs/project-idea.md) — domain, entities, pages, admin flow.
- [`docs/roadmap.md`](docs/roadmap.md) — feature roadmap & progress.
- [`docs/design-system.md`](docs/design-system.md) — tokens & UI components.
- [`CLAUDE.md`](CLAUDE.md) + [`.claude/`](.claude/) — AI-pair-programming setup (rules, review agents, `/build` + `/mentor`).

## Roadmap (high level)

Block 1 — core app on Vite + React + TS. Block 2 (later) — migrate to Next.js (App Router, RSC).
See [`docs/roadmap.md`](docs/roadmap.md) for the module checklist.
