# Mise

Household meal-planning app named after the culinary term _mise en place_ ("everything in its place").
Plan who cooks what and when, build a shopping list automatically, and see which dishes are cheapest today based on store prices and deals.

**Live:** https://mise-ua-kaktus-26.vercel.app

## What it does

- Each household member maintains their own dish list.
- Anyone in the household can schedule dishes on a shared weekly calendar.
- Select a date range → the app aggregates raw ingredient needs, rounds up packaged goods, and computes the total shopping cost.
- An admin manages the canonical ingredient catalog and maps ingredients to store products for price tracking.

All metrics (dish cost, weekly spend, shopping list) are **computed at render time from primary data** — nothing is stored as a derived column. Single source of truth stays in Supabase.

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

- [`docs/project-idea.md`](docs/project-idea.md) — domain, entities, pages, pricing layers.
- [`docs/roadmap.md`](docs/roadmap.md) — feature roadmap & progress.
- [`docs/design-system.md`](docs/design-system.md) — tokens & UI components.
- [`CLAUDE.md`](CLAUDE.md) + [`.claude/`](.claude/) — AI-pair-programming setup (rules, review agents, `/build` + `/mentor`).

## Roadmap (high level)

Block 1 — core app on Vite + React + TS. Block 2 (later) — migrate to Next.js (App Router, RSC).
See [`docs/roadmap.md`](docs/roadmap.md) for the module checklist.
