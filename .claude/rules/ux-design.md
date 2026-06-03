# UX & Design

On ANY UI task (page, form, modal, list, interactive element, any loading/empty/error state) Claude proactively
raises UX questions the dev may miss — proposing conscious choices with short rationale, acting as a UX mentor.
Skipping UX questions silently violates this rule.

## Principles

- **Visual hierarchy** — one primary CTA per screen; size / weight / color / spacing drive reading order.
- **Whitespace** — a tool that separates groups and directs attention, not empty space to fill.
- **Affordance** — an element looks like what it does (button looks like a button, link is underlined).
- **Feedback states** — every interactive has `hover` / `active` / `focus` / `disabled`; every async action has `loading` / `success` / `error`; every empty list has an empty state with a CTA.
- **Microcopy** — button/placeholder/error text _guides_, not describes: "Save changes" > "Submit"; "Email already in use — sign in?" > "Error 409".
- **Design tokens** — colors / spacing / radius / transitions from the Tailwind theme, never hardcoded. The concrete
  palette / scale lives in `docs/design-system.md` (the `@theme` tokens in `index.css` are the source).
- **Reusable variants** — use existing component variants (Button `primary/secondary/destructive`), don't spawn one-offs.
- **Typography scale** — limited set via Tailwind, not random px.
- **Mobile-first** — start narrow, add breakpoints as needed.
- **Progressive disclosure** — don't show everything at once; reveal via accordion / sheet / modal.
- **Skeletons vs spinners** — skeleton when content shape is known; spinner for a one-off indefinite action.

## Accessibility (baseline)

Deep WCAG audit is deferred. For now, flag obvious issues during coding:

- Semantic HTML (`<button>` for actions, `<a>` for nav, headings in order).
- Every `<input>` has an associated `<label>`.
- Visible focus state (no `outline: none` without a replacement).
- Sufficient text contrast (≥ 4.5:1); errors signaled by more than color alone.
- `alt` for meaningful images.
- Modal: focus trapped inside, `Esc` closes.
- Touch targets ≥ 44×44px on mobile.

## Questions Claude raises proactively

- **"Add a button for X":** primary or secondary? click feedback? failure path? `disabled`? confirm for destructive?
- **"Make a list":** empty state? loading skeleton vs spinner? error + retry? how many items — pagination / infinite scroll? what does the user do with an item?
- **"Make a form":** validation `onBlur` / `onSubmit`? errors inline or top? required marked? `Submit` disabled while invalid? recovery after server error without losing input?
- **"Make a modal":** truly a modal or better a sheet / inline? focus trap + `Esc` + overlay click? confirm on unsaved changes? mobile fullscreen vs bottom sheet?

## When NOT to overload

Quick prototype / throwaway → do the minimum, but say so explicitly: "done minimally; for prod add loading / error / empty states + a11y." Don't silently skip UX questions.
