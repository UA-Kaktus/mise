# Supabase

The browser talks to Supabase **directly** via `supabase-js`. Vercel only hosts static frontend — it is not in the
DB request path. The dev has no backend experience; explain data flow, not server internals.

## Client & data access

- Single client init in `src/shared/api/supabase.ts` (already present). Type it with the generated DB types:
  `createClient<Database>(url, anonKey)` — without the generic, queries aren't type-checked.
- Reads → TanStack Query hooks in `shared/api/queries/`. Writes → mutation hooks in `shared/api/mutations/`.
- Prefer one query per view that selects exactly the columns/relations needed (avoid `select('*')` on wide tables).
- Use Supabase relational selects (`select('*, teams(name)')`) instead of N manual fetches.
- `supabase-js` returns `{ data, error }` — it does NOT throw on a failed query. Always check `error` and surface it
  (or `.throwOnError()` so TanStack Query's error state catches it). Don't assume `data` is non-null.

## Types

- Generate types from the schema into `shared/types/` and use them for row shapes — don't hand-redeclare tables.
- Pair with `zod` on the form/input side; DB types on the read side.

## Security model

- The **anon key is safe to expose** in the frontend — the database is protected by **Row Level Security (RLS)**, not by hiding the key.
- Admin-only writes are enforced by RLS policies + auth, NOT by hiding edit buttons in the UI.
- **Do not** invent server-only secret handling (e.g. Next.js `process.env` server vars) — this is a Vite SPA; there is no server runtime to hold secrets. (see memory: stack-context-precision)

## Env vars

- Local: `.env.local` (git-ignored). Prod/preview: Vercel dashboard. Tests: `.env.test`.
- Only `VITE_`-prefixed vars reach the client bundle (Vite rule). Both Supabase URL and anon key are `VITE_`-prefixed and public by design.

## Schema reference

Tables: `leagues`, `teams`, `players`, `team_standings`. Player season stats live on `players` (single-season snapshot).
Full domain detail: see `docs/project-idea.md`.
