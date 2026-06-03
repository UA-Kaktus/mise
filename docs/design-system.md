# Design System

> Заготовка. Наповнюється в міру побудови UI (модуль «Design system + UI shell»).
> Джерело істини для токенів — Tailwind theme; цей файл документує рішення, не дублює конфіг.

## Дизайн-токени

- **Кольори** — _TBD_ (палітра, semantic tokens: primary / surface / border / danger / success).
- **Spacing** — Tailwind scale (4px base). Документувати відхилення, якщо будуть.
- **Radius** — _TBD_.
- **Transitions** — _TBD_ (тривалість / easing для hover/focus).

## Типографіка

- Обмежений набір розмірів через Tailwind (`text-sm … text-3xl`). Конкретну шкалу зафіксувати тут.
- Шрифт — _TBD_.

## UI-компоненти (власні, на Tailwind)

Перелік примітивів у `src/shared/ui/` із варіантами. Заповнюється по мірі створення.

| Компонент     | Варіанти                          | Стан  |
| ------------- | --------------------------------- | ----- |
| Button        | primary / secondary / destructive | _TBD_ |
| Input         | —                                 | _TBD_ |
| Card          | —                                 | _TBD_ |
| Modal / Sheet | —                                 | _TBD_ |

## Патерни станів

- **Loading** — skeleton коли відома форма контенту; spinner для разової невизначеної дії.
- **Empty** — кожен порожній список має empty state з CTA.
- **Error** — inline + retry де доречно.

> Принципи UX/a11y, якими керуємось: `.claude/rules/ux-design.md`.
