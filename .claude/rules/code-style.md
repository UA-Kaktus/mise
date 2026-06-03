# Code Style

## TypeScript-first

- TS from day 1. No `any` without `// @ts-expect-error: <reason>`. No `// @ts-ignore` without a reason comment.
- Prefer `type` for unions/aliases, `interface` for object shapes that may be extended.
- Derive types from a single source: one `zod` schema validates AND infers the TS type (`z.infer`).
- Use generated Supabase types from `shared/types/` for DB rows — don't hand-redeclare table shapes.
- Use `satisfies` for config-like objects (variant maps, route tables) — it checks the shape while keeping the
  narrow literal type, so keys/values stay precisely typed instead of widening.
- Model "one of N shapes" with **discriminated unions** (a shared literal `kind`/`status` field), e.g. async UI as
  `{ status: 'loading' } | { status: 'error'; error: E } | { status: 'success'; data: D }`. Lets TS narrow safely
  and forces you to handle every state.
- Prefer `unknown` over `any` at untyped boundaries, then narrow — never leave `any`.

## React

- Functional components + hooks only.
- One component per file; co-locate its hook/types unless shared.
- Custom hooks for any non-trivial stateful logic; name `useX`.
- Keep components presentational where possible; push data fetching to TanStack Query hooks in `shared/api/`.
- Lists need stable `key` (entity id, never array index for dynamic lists).

## Styling — Tailwind, utility-first

- Tailwind CSS (v4). Write UI primitives yourself (no shadcn / component libs) — this is verstka practice.
- **v4 config lives in CSS, not JS.** Define design tokens with the `@theme` directive in `index.css` (e.g.
  `--color-primary`, `--spacing-…`, `--radius-…`); there is no `tailwind.config.js`. Each `@theme` token auto-generates
  its utility (`--color-primary` → `bg-primary`, `text-primary`). Use plain `:root` CSS vars only for values that
  should NOT become utilities. (Most online examples are v3 — don't copy `tailwind.config.js` patterns here.)
- Pull from the theme: colors, spacing, radius, transitions. No hardcoded `px` / hex when a token exists; reach for an
  arbitrary value (`w-[37px]`) only as a last resort.
- Limited typography scale via Tailwind sizes, not random values.
- **No SCSS / BEM here.** This project is Tailwind-only (overrides the global SCSS/BEM preference).

## Naming & files

- Components `PascalCase.tsx`; hooks `useThing.ts`; utils/stores `camelCase.ts`.
- Folders expose `index.ts` re-exports; import from the folder boundary, not deep files.
- English for code, identifiers, commit messages. Comments addressed to the dev may be Ukrainian.

## Comments

- Match surrounding density. Explain _why_, not _what_. Short "why" footnotes are welcome (learning project).
