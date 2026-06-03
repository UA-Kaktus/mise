# Testing

Stack: **Vitest** (runner) + **React Testing Library** (components) + **MSW** (mock Supabase HTTP).

## Discipline

- Tests from day 1. Every non-trivial function / hook / component gets a test. Not "later" — later is never.
- When fixing a bug: first write a failing test that reproduces it, then fix.

## What to test (behavior, not internals)

- Query by what the user sees/does: `getByRole`, `getByLabelText`, `getByText`. Avoid testing implementation details (state, prop names, class names).
- Simulate interaction with `userEvent` (not `fireEvent`) — it fires the real event sequence (hover, focus, keystrokes) a user would. `await` it.
- Assert observable outcomes: rendered output, called handlers, navigation, error/empty/loading UI.
- Derived logic (metrics, aggregates, sorting) → plain unit tests on the pure functions. These are cheap and high-value.

## Async & data

- Mock Supabase at the HTTP boundary with MSW, not by stubbing `supabase-js` internals — keeps tests realistic.
- Wrap components that use TanStack Query in a fresh `QueryClient` per test (no shared cache between tests).
- Use `findBy*` / `waitFor` for async; never arbitrary `setTimeout`.

## Coverage targets

- Pure logic (utils, selectors, metric math): aim for thorough coverage — it's deterministic.
- Components: cover the golden path + each state (loading / empty / error) + key edge cases.

## Test env

- `.env.test` with test values. Co-locate tests as `*.test.ts(x)` next to the unit, or under `__tests__/`.
