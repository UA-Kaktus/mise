# Architecture

Three-tier layout: `pages → modules → shared`. Pages compose; no business logic in pages.

```
src/
  main.tsx            # entry
  App.tsx             # providers (QueryClient, RouterProvider)
  index.css           # Tailwind entry
  routes/             # React Router tree, lazy routes
  pages/<name>/       # page-specific code (components, hooks, store.ts = local UI store, index.tsx)
  modules/<name>/     # reusable feature modules (components, hooks, store.ts, index.ts)
  shared/             # cross-cutting code
    ui/               # own Tailwind primitives (Button, Input, Card, Modal)
    api/              # supabase.ts + queries/ + mutations/
    hooks/            # generic hooks
    stores/           # global Zustand stores (authStore)
    types/            # global TS types + generated Supabase types
    utils/
```

## Placement rules

- **Default: build it inside the page that needs it** (`pages/<name>/`). Most code starts life serving one page —
  that's where it belongs, even if it _might_ be reused later.
- **Promote to `modules/<name>/` only when a SECOND page actually needs the same code.** Reuse is the trigger, not a
  guess. Moving page → module is a cheap refactor when the real need appears; a premature module is dead weight now.
- **Exception — the developer's explicit call.** If the developer deliberately declares a piece shared up front, place
  it in `modules/` (or `shared/`) right away, even with one current user. A conscious decision overrides the heuristic;
  the "wait for a second user" rule is the _default_, not a veto on the developer's intent.
- `shared/` is for low-level building blocks reused broadly: UI kit, API client, utils, global stores.
- `routes/` holds route config only; page components stay thin and import from `pages/<name>/`.
- Every folder exposes a public surface via `index.ts` re-exports; import from the folder, not deep paths.

## Derived data is computed, never stored

Any value derived from primary data — metrics, aggregates, table positions, sort keys — is computed at render time,
NOT persisted. Single source of truth = primary data from Supabase. Use `useMemo` for heavy derivations over large
lists.

> Why: a stored derived column can drift from the inputs it was computed from. Computing on read keeps one source of
> truth. (Domain specifics — which metrics, the formulas — live in `docs/project-idea.md`.)

## State boundaries (don't conflate)

- **Server state** (data from Supabase) → TanStack Query. Caching, refetch, optimistic updates live here.
- **Client state** (UI: modals, filter draft, selected league) → Zustand.
- Never mirror server data into Zustand "to have it locally" — read it from the Query cache.

## Block 2 note

On the Next.js migration `routes/` is replaced by file-based `app/`. The `pages / modules / shared` split is preserved.
