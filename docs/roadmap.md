# Roadmap фіч проекту

Чеклист модулів **Блоку 1 (Vite + React + TS)**. Оновлюється після кожного завершеного модуля.

> Це роадмап _фіч петпроекту_. Особистий навчальний план Middle Frontend живе окремо в
> `frontend-roadmap.md` (git-ignored) — сюди не дублюється.

## Блок 1 — Ядро

- [x] Setup інфраструктури (Vite + TS + Tailwind + ESLint + Prettier + husky; Vercel; Supabase; GitHub Actions)
- [x] Claude-партнерська інфраструктура (`.claude/` rules + agents + `/build` + `/mentor`; `docs/`)
- [ ] Routing (React Router — nested / dynamic / lazy routes)
- [ ] Auth (admin login + protected edit-контроли + demo-login button)
- [ ] Design system + UI shell (дизайн-токени, власні Tailwind-компоненти, layout)
- [ ] Responsive / mobile-first (breakpoints, адаптивні таблиці: horizontal-scroll vs card-view на мобільному)
- [ ] Household onboarding (create / join by invite code, members list)
- [ ] Dish CRUD (власні страви — фото, опис, інгредієнти, нотатки, лінк)
- [ ] Ingredient catalog — admin (довідник, базові одиниці, ціни Шар 0, маппінг)
- [ ] Weekly plan calendar (додати страву на день, лейбл кухаря, shared в household)
- [ ] Shopping list (вибір днів → агрегація → округлення упаковок → вартість)
- [ ] Forms поглиблено (dish form: RHF + zod, cross-field, useFieldArray для інгредієнтів)
- [ ] State management deep (React Query advanced, Zustand advanced)
- [ ] Filters + Search (каталог: по кухарю / промо; календар: тиждень / кухар; URL sync)
- [ ] Real-time (Supabase Realtime) — _v2: виправданий use-case (двоє редагують спільний календар одночасно)_
- [ ] Loading / Error / Empty states скрізь
- [ ] Animations / microinteractions (переходи, skeleton-shimmer, hover/active; Framer Motion за потреби)
- [ ] Testing (Vitest + RTL + MSW)
- [ ] Performance optimization (Lighthouse, bundle analysis, code splitting)
- [ ] Debugging практика (типові баги через DevTools)
- [ ] CI/CD finalization
- [ ] Документація (README, Mermaid діаграми)
- [ ] Polish + Portfolio (a11y audit, case studies)

## Блок 2 — міграція на Next.js

Робиться **після** завершення Блоку 1. Це міграція готового проекту (App Router, RSC, Server Actions),
не переписування з нуля. Детальний план — в особистому `frontend-roadmap.md`; розгортати тут зарано.
