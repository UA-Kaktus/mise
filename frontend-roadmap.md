# Frontend Middle Roadmap

Задача цього файлу - сформувати детальний план переходу від поточного рівня `Strong Junior / Pre-Middle` до рівня, з яким можна стабільніше претендувати на `Middle Frontend React Developer`. Нижче будуть викладені основні вимоги роботодавців в Україні станом на травень 2026, План вивчення необхідних технологій, поточні знання користувача (тобто мене), короткий список з чекбоксами для відслідковування прогресу.

# Вимоги роботодавців станом на травень 2026

Таргет на наступні позиції:

- `Middle Frontend Developer (React)`
- `Middle React Developer`
- `Frontend Engineer (React)`

Нижче — сітка вимог, виведена з аналізу актуальних вакансій UA ринку (DOU, Djinni, LinkedIn) станом на травень 2026. Вимоги розділені на три рівні впливу: чи відсіє HR-фільтр CV, чи виділить серед інших на технічній співбесіді, чи це "приємний плюс".

## Must-have — без цього CV не проходить HR-фільтр

- **React 18+** — hooks (включно з `useTransition`, `useDeferredValue` концептуально), Suspense, error boundaries, render cycle
- **TypeScript** на робочому рівні — типізація props, events, generic hooks, utility types (`Pick`, `Omit`, `Partial`, `Record`), discriminated unions для UI state, без зловживання `any`
- **State management** — Redux Toolkit **або** Zustand (на UA ринку RTK ще домінує в legacy-проектах, Zustand активно росте в нових). Розуміння коли потрібен global state, а коли локальний
- **Server state** — React Query / TanStack Query (де-факто стандарт) або SWR
- **REST API integration** — fetch/axios, status codes, auth flows (JWT, refresh tokens), error handling, loading states
- **Git** — гілки, rebase, merge, conflict resolution, PR-флоу. Не лякатись interactive rebase і cherry-pick
- **HTML/CSS fundamentals** — семантичний HTML, Flexbox, Grid, responsive design, CSS variables. SCSS або Tailwind на робочому рівні
- **English** — мінімум B1+ writing, B1+ speaking. Більшість Middle+ вакансій вимагають B2 speaking для розмов з замовником / командою
- **Build tools** — Vite **або** Webpack. Розуміння dev server, bundle, code splitting на базовому рівні

## Часто потрібно — зустрічається в 50-80% вакансій

- **Next.js** (App Router) — SSR / SSG / RSC concepts, layouts, server actions, базове розуміння routing. Зустрічається в ~60% Middle React вакансій станом на 2026
- **Tailwind CSS** — utility-first підхід, responsive prefixes, dark mode. Витісняє SCSS у нових проектах
- **Testing** — Vitest або Jest + React Testing Library. Не вимагають великого досвіду, але вимагають вміти написати компонент-тест і hook-тест
- **Mock Service Worker (MSW)** — де-факто стандарт для мокінгу API в тестах
- **CI/CD awareness** — вміти читати GitHub Actions / GitLab CI workflows, розуміти що відбувається на pre-commit / pre-push hooks
- **Performance basics** — React DevTools Profiler, розуміння причин re-renderів, базове bundle analysis
- **GraphQL** на рівні "знаю що це, читаю query, відрізняю від REST" — навіть якщо проект на REST, питають часто
- **Accessibility basics** — семантичний HTML, ARIA коли потрібно, keyboard navigation, focus management

## Bonus — виділяє серед інших кандидатів, не критично, але один-два пункти звідси значно піднімають CV над пулом.

- **shadcn/ui, Radix UI** або **MUI** — досвід з мейнстрім UI бібліотеками (CoreUI зустрічається рідко)
- **Storybook** — для розробки UI бібліотеки / дизайн-системи
- **Monorepo tooling** — Nx або Turborepo, базове розуміння
- **tRPC** — для TS-fullstack проектів
- **Docker basics** — `docker compose up` для локального dev-середовища
- **Базовий Node.js** — для розуміння API боку (плюс для AI-усвідомленої роботи з контекстом задач)
- **WCAG 2.1 AA compliance** — серйозний accessibility досвід (виділяє на enterprise-вакансіях)
- **Web vitals / Lighthouse** — performance optimization з реальними before/after метриками
- **AI-assisted development** — усвідомлене використання Claude Code / Cursor: skills, MCP, агенти, custom prompts. На 2026 це окрема компетенція яку питають на співбесідах

# Поточний рівень — сильні сторони, дірки, технологічний стек

Калібрування реального рівня на основі мого поточного робочого досвіду і самооцінки. Цей розділ — фундамент для плану вивчення: ми не вчимо те що вже знаємо, і не пропускаємо те що не знаємо.

## Сильні сторони

- **Архітектурне мислення.** На робочому проекті використовую трирівневу схему `pages → modules → shared` з правилом промоції в `modules/` лише коли 2+ pages реюзають той самий код. Це доросла дисципліна — не складати все в одну `components/` помийку.
- **Розподіл стану.** Свідомий split між server state (React Query), shared client state (Zustand з single source of truth), shared filter state (окремий стор для фільтрів) і per-page draft (локальні зміни до Save). Розумію чому це **різні рівні** стану і коли який потрібен.
- **Performance instincts.** У великих фільтр-хуках розділяю `useMemo` блоки за різними залежностями (щоб тяжкі обчислення не перераховувались разом), використовую Sets замість масивів для O(1) lookup, додаю fast-path "no filters → return одразу". Це pre-middle thinking, а не "обернув все в useMemo на всяк випадок".
- **Робота з нетривіальними інваріантами.** Auth flow з захистом від повторного `/auth/me` після SSO exchange (модульний прапорець з документованим коментарем чому). Більшість junior-коду такі речі не позначає взагалі.
- **Робота з binary / streaming.** Реалізував chunked upload з `Content-Range`, окремим upload-клієнтом, video streaming через токен у query param (бо `<video src>` не дає додати Authorization header). Це реальна інженерна робота, а не "форму зробив".
- **HTML/CSS/SCSS фундамент.** 2-3 роки досвіду, BEM-дисципліна з конкретним правилом "`--` тільки для модифікаторів, ніколи для елементів". Це база, з якою легше переходити на Tailwind / CSS Modules / styled-components.
- **Tooling background.** Webpack 2-3 роки до Vite — це означає що поняття bundle / dev server / code splitting / module resolution не лякають. Перехід на Vite за ~1 міс — підтверджує що базова інтуїція є.
- **Vanilla JS solid.** ES6+ patterns (async/await, modules, destructuring, spread), Promise patterns — використовую щодня, без копіпасту.
- **Здатність планувати і декомпозувати.** Сам факт що я роблю роадмап замість "що мені вчити", тримаю CLAUDE.md актуальним, веду `docs/` з правилами — показує що рефлексія над процесом у мене вбудована.

## Слабкі сторони

- **TypeScript.** 0 рядків написаного TS-коду. Головний gap до Middle.
- **Тести.** 0 досвіду — ніколи не налаштовував Vitest/Jest, не писав жодного RTL-теста, не знаю як мокати API в тестах.
- **Git.** За власною самооцінкою слабко на rebase, cherry-pick, conflict resolution. Це блокер на культурі code review в командному проекті.
- **Mainstream UI стек.** Tailwind / shadcn / MUI / Radix — 0 досвіду. Робочий проект на нішевому UI-фреймворку, що обмежує переносимість досвіду.
- **Next.js.** 0 досвіду — поточний робочий проект це SPA на Vite, ніколи не торкався App Router / RSC / Server Actions. Це закриває ~60% Middle React вакансій.
- **React 18 advanced.** Suspense, Error Boundaries, `useTransition`, `useDeferredValue`, concurrent rendering — не використовував, не зможу пояснити на співбесіді.
- **React Query advanced.** Використовую базово (`useQuery` з queryKey, без advanced patterns). Optimistic updates з rollback, query invalidation strategies, infinite queries, dependent queries — не commonly.
- **Performance profiling.** Instincts є (бачу де треба `useMemo`), але як методологія — React DevTools Profiler систематично не використовую, before/after метрики не знімаю.
- **CI/CD.** Лише ESLint script. Немає Prettier, husky, lint-staged, GitHub Actions / GitLab CI workflows.
- **Backend.** За самооцінкою — повна 0. Не блокує Middle, але блокує перехід на Full-Stack після нього.

# Технології, поточний рівень + необхідні для вивчення

4 списки: що знаю, що треба покращити, що не знаю але повинен на Middle, і додатково — 2-3 пункти з bonus-секції які реально дають перевагу під мій профіль.

## Знаю впевнено

- HTML5 / CSS3 — Flexbox, Grid, responsive, CSS variables
- SCSS/SASS + BEM
- Pug — базово (HTML preprocessor, indent-based syntax)
- Bootstrap + CoreUI — досвід використання в admin / dashboard-style UI
- Vanilla JS / ES6+
- React 18 — core hooks (`useState`, `useEffect`, `useRef`, `useContext`)
- Vite — конфіг, призначення, базове використання (достатньо для робочого рівня)
- Webpack — legacy
- Git — базове (commit, branch, push/pull, merge)
- WordPress — базовий

## Треба покращити

- **React advanced + performance** — render cycle (коли і чому ре-рендер, reconciliation), Suspense, Error Boundaries, `useTransition` / `useDeferredValue` (concurrent features), `memo` / `useMemo` / `useCallback` свідомо, React DevTools Profiler для пошуку "wasted render", Context optimization, custom hooks patterns
- **React Query / TanStack Query** — потрібно як базу відпрацювати так і advanced: optimistic updates з rollback, invalidation strategies, infinite queries, dependent queries, prefetching
- **Zustand** — теж база + треба middleware (`persist`, `devtools`), типізацію з TS, advanced patterns (slices, subscribe, computed values)
- **ESLint** — знаю навіщо він, але досвіду мінімум

## Не знаю — але повинен знати на Middle

- **TypeScript** — primitives, objects / arrays, function typing, `type` vs `interface` (коли який), unions і narrowing, type guards, `unknown` / `any` / `never` (коли який і чому), utility types (`Pick` / `Omit` / `Partial` / `Record` / `ReturnType`), generics (функції і компоненти), discriminated unions для UI state (`{ status: 'loading' } | { status: 'success', data } | { status: 'error', error }`), типізація React props / events / refs, generic hooks, типізація API-response і Zustand store. Мета — production-код без `any` без причини
- **Testing** — Vitest + React Testing Library + MSW
- **Tailwind CSS** — utility-first concept (чому це не "inline styles на стероїдах"), responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`), dark mode (`dark:`), кастомізація `theme` у `tailwind.config.ts` (свої кольори, spacing, font sizes — це і є дизайн-токени з пункту вище), `@apply` коли він доречний (рідко), `clsx` + `tailwind-merge` для conditional classes, accessibility-friendly утиліти (`sr-only`, `focus-visible:`). Це підхід замість SCSS, а не "інший спосіб написати ті самі стилі"

## Додатково — дає реальну перевагу (під мій профіль)

- **AI-assisted development (Claude Code)** — я вже працюю з Claude Code щодня, треба формалізувати: skills, MCP, custom agents, hooks, prompt engineering. Низький поріг входу + сильно звучить на співбесіді
- **Debugging skills** — швидко і самостійно знаходити причини багів, errors, re-renderів. Стек: React DevTools (Components + Profiler), Chrome DevTools (Sources breakpoints для крокового запуску коду, Network для API issues, Console для runtime errors), тести як локалізатор регресій. Окрема компетенція до "писати код" — щоб не залежати від AI як основного debugger-а
- **Performance optimization** — проактивна робота над швидкістю: Web Vitals (LCP / INP / CLS) як метрики, Lighthouse audit, Chrome DevTools Performance tab для render-боттлнеків, bundle analysis (rollup-plugin-visualizer), code splitting + lazy loading, image optimization (lazy loading, правильні розміри, сучасні формати). Тренувати на власному проекті з реальними before/after метриками
- **CI/CD — GitHub Actions** — базовий workflow на PR (lint + test + type-check). Раз налаштував — забув, але на CV дає "знаю tooling"

# План вивчення

Підхід: один великий пет-проект як **майданчик** для технологій + окремий трек **теоретичного вивчення**. Замість sequential фаз — чекбокси модулів проекту.

План розбитий на **два блоки**:

- **Блок 1 — Ядро** (головний фокус): TypeScript + React advanced + React Query / Zustand + Testing + Tailwind. Стек пет-проекту: **Vite + React + React Router + TypeScript + Tailwind + Supabase + Vitest**.
- **Блок 2 — Next.js** (після ядра): App Router, RSC, Server Actions, SSR / SSG. Реалізується як міграція пет-проекту Vite → Next.js.

**Чому два блоки, а не все одразу:** вчити TS і Next.js одночасно = розсіяний фокус і посередні знання скрізь. Спочатку — міцне React + TS ядро на простому стеку (Vite). Потім Next.js береться легко, бо React + TS вже впевнені (Next.js — це React + framework, не нова мова). Бонус: після Блоку 1 можна починати дивитись вакансії на чистий React (Vite SPA — це ~40-50% Middle React ринку), не чекаючи Блоку 2.

Кожен чекбокс — окремий PR з preview deploy + оновлення docs. "Відмітив" = код у проекті + тести (де застосовно) + документація оновлена.

## Постійні треки

### AI-controlled mode

Не "етап", а режим роботи. Чотири правила:
- AI не пише код, який не можу переписати руками наступного дня
- 1 фіча/тиждень повністю без AI (commit prefix `[no-ai]`)
- Кожна AI-підказка яка здивувала — 3-речення розбір у `learning-notes.md`

Паралельно — формалізація Claude Code знань: skills, MCP, custom agents, hooks, prompt engineering. Створити власні skills/agents для рутинних задач у пет-проекті (наприклад, "review my Zustand store", "audit my form for a11y").

### Git practice

Тренувати щоденно, не "вивчити блок":
- Малі commits з Conventional Commits format (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`)
- PR флоу навіть для своїх змін (Vercel дає preview deploy на кожен PR — реальна користь)
- Свідомо тренувати: rebase, squash, conflict resolution, reflog. Не уникати — навмисно створювати конфлікти і резолвити

### Документація

Не "блок", а definition of done для кожної фічі:
- Кожна фіча — оновлення `README` і `CLAUDE.md` в тому самому PR
- JSDoc / TSDoc для нетривіальних утиліт і custom hooks

### UI/UX patterns

Як тільки дизайн-токени налаштовані (модуль "Design system + UI shell"), далі — постійна дисципліна:
- Завжди використовуй tokens замість хардкоду
- Завжди використовуй existing variants замість одноразових
- AI-партнер (Claude) активно нагадує про порушення під час кодингу

---

## Блок 1: Ядро

Стек пет-проекту в цьому блоці: **Vite + React + React Router + TypeScript + Tailwind + Supabase + Vitest**. Кожен модуль = практика з вказаних технологій. Реалізація, черговість фіч і детальна архітектура — у `readme-pet.md`.

### Setup інфраструктури

- [ ] GitHub repo створено
- [ ] Vite + React + TS через `npm create vite@latest` (template `react-ts`)
- [ ] Tailwind підключений
- [ ] ESLint flat config + Prettier
- [ ] husky + lint-staged (pre-commit формат + lint)
- [ ] React Router підключений, базовий роутинг працює
- [ ] Vercel project, перший deploy "hello world" з main
- [ ] Supabase project, env vars у Vercel + `.env.local`
- [ ] GitHub Actions workflow на PR: lint + type-check
- [ ] Branch protection на main (PR + green CI обовʼязкові)
- [ ] Початковий `README.md` (як запустити) + `CLAUDE.md` (інструкції AI)
- [ ] **Калібрування:** записати 15-хв голосове пояснення архітектури markup-app англійською — baseline
- [ ] Підписатись на 3-5 актуальних Middle React вакансій (DOU / Djinni / LinkedIn) — для регулярного калібрування ринку
- [ ] `learning-notes.md` з 20 темами "ніби знаю, не зможу пояснити"

**Практикую:** Vite setup, TS config, Tailwind, ESLint flat config, Prettier, husky + lint-staged, React Router setup, Vercel deploy, GitHub Actions basics, Документація

---

### Routing

- [ ] Nested routes + layout routes (shared layout для групи сторінок)
- [ ] Dynamic segments (`:id`)
- [ ] Lazy routes + code splitting через `React.lazy`
- [ ] 404 / not-found route
- [ ] `useSearchParams` для URL state
- [ ] Programmatic navigation, `useNavigate`, redirects

**Практикую:** React Router 6/7 (practical — бо ядро на Vite, не Next.js)

### Auth система

- [ ] Signup / login / logout через Supabase Auth
- [ ] Email verification flow
- [ ] Password reset / forgot-password flow
- [ ] Захищені маршрути через protected-route wrapper (React Router)
- [ ] JWT з refresh механіка (через Supabase, але **розуміти на whiteboard**: де токени зберігаються, як ротуються)
- [ ] UX expired session: toast + redirect без втрати unsaved даних форми
- [ ] Cross-tab logout через `storage` event
- [ ] Demo-login button для портфоліо — кнопка "Enter as guest" → автологін у заздалегідь верифікований demo-акаунт (щоб рев'юери на співбесіді заходили одним кліком)
- [ ] Тести на auth-flow (Vitest + RTL + MSW для мокання Supabase Auth)

**Практикую:** Supabase Auth, React Router (protected routes), Auth flows edge cases, RHF + zod (auth-форми)

### Design system + UI shell

- [ ] Дизайн-токени в Tailwind theme config (color palette, spacing scale, font sizes, border-radius, transitions)
- [ ] Dark mode setup через Tailwind
- [ ] Власні базові компоненти на Tailwind: Button, Input, Card, Badge, Spinner, Modal
- [ ] Reusable variants: Button (`primary / secondary / destructive` × `sm / md / lg`), Input, Card
- [ ] Layout primitives: Card grid, List item, Form section, Page header
- [ ] Mobile responsive — тестую через DevTools на 320/768/1024
- [ ] Швидкий accessibility-прохід через axe DevTools — пофіксити очевидне (semantic HTML, alt, labels, focus states). Глибоке занурення — на потім

**Практикую:** Tailwind CSS, UI/UX patterns & consistency, accessibility basics (оглядово)

### Core CRUD модуль (основний контент проекту)

- [ ] List view з пагінацією (offset або infinite scroll — обрати свідомо)
- [ ] Detail view з editable полями
- [ ] Create форма (RHF + zod)
- [ ] Edit форма (RHF + zod, prefilled values)
- [ ] Delete з confirmation modal
- [ ] React Query queries для read з Supabase
- [ ] React Query mutations для create / update / delete
- [ ] Zustand для UI state (модалки, drafts)
- [ ] zod schemas як single source of truth для shape даних

**Практикую:** TypeScript у бойових умовах, RHF + zod, React Query, Zustand, React Router

### Forms (поглиблено)

- [ ] Cross-field validation (наприклад password confirmation через zod `refine`)
- [ ] Async validation (наприклад "email вже зайнятий" — через debounce)
- [ ] `useFieldArray` для динамічних форм (масив тегів / списки)
- [ ] `Controller` для кастомних інпутів (custom select, date picker — non-native елементи)
- [ ] Server-side errors (з Supabase) → form field errors mapping
- [ ] Multi-step form (wizard) хоча б один

**Практикую:** RHF advanced, zod refinements / superRefine, error handling

### State management deep

- [ ] React Query: optimistic updates з повним rollback на error
- [ ] React Query: точкові invalidation strategies (`invalidateQueries` за key)
- [ ] React Query: infinite queries для нескінченних списків
- [ ] React Query: dependent queries (`enabled: !!`)
- [ ] React Query: prefetching при hover на linki
- [ ] React Query: Query factories pattern (typed query keys)
- [ ] Zustand: `persist` middleware для UI state (theme, sidebar collapsed, filters)
- [ ] Zustand: slice pattern (розділення великого стору на slices)
- [ ] Zustand: subscribe + computed values
- [ ] Zustand: повна TS-типізація з generic actions

**Практикую:** React Query advanced, Zustand advanced

### Filters + Search

- [ ] Tag-based filters (+ / - toggles, як у markup-app)
- [ ] Text search з debounce
- [ ] URL sync через React Router `useSearchParams` (filters live in URL, навігація назад працює)
- [ ] Sort + view modes
- [ ] Performance optimization: Set для O(1) lookup, memoized selectors
- [ ] `useDeferredValue` для важких filter операцій

**Практикую:** Zustand, URL sync (React Router `useSearchParams`), React 18 advanced (`useDeferredValue`), React performance

### Real-time updates

- [ ] Supabase Realtime subscription для однієї таблиці
- [ ] Інтеграція з React Query cache (auto-update at)
- [ ] UX для live changes (toast "оновлено в реальному часі" / silent update)

**Практикую:** Supabase Realtime, React Query advanced (manual cache updates)

### Loading / Error / Empty states

- [ ] `<Suspense>` + `React.lazy` для route-level code splitting
- [ ] Error Boundary компоненти для critical sections (з retry)
- [ ] Skeleton loaders для list / grid pages
- [ ] Spinners для одноразових actions
- [ ] Empty states з CTA на всіх списках
- [ ] 404 / not-found сторінка

**Практикую:** React 18 advanced (Suspense, Error Boundaries), UI/UX (feedback states)

### Testing

- [ ] Vitest + RTL + happy-dom setup
- [ ] MSW setup для мокання Supabase requests
- [ ] 5+ тестів на utils / pure functions
- [ ] 5+ тестів на UI компоненти (variants, states)
- [ ] 3+ тести на форми (submit flow з валідацією, error handling)
- [ ] 3+ тести на mutations з optimistic updates (включаючи rollback)
- [ ] 3+ тести на custom hooks через `renderHook`
- [ ] Coverage report > 60% на critical paths
- [ ] Тести в GitHub Actions workflow (parallel job)

**Практикую:** Vitest, React Testing Library, MSW, CI integration

### Performance optimization

- [ ] Lighthouse audit на 1 сторінці → топ-5 проблем → пофіксити з before/after скріншотами
- [ ] Bundle analysis через `rollup-plugin-visualizer` (Vite) → знайти важкі deps → lazy-load
- [ ] Code splitting через `React.lazy` + lazy routes у React Router
- [ ] `useTransition` для non-urgent updates
- [ ] `useDeferredValue` для важких списків
- [ ] `memo` / `useCallback` свідомо (не "про всяк випадок")
- [ ] Image: lazy loading, правильні розміри, сучасні формати
- [ ] Web Vitals (LCP / INP / CLS) виміряні на проді

**Практикую:** Performance optimization, React performance, React 18 advanced applied

### Debugging практика

- [ ] Спеціально внести 10 типових багів у проект і знайти кожен **через DevTools (не AI)**:
  - Stale closure у `useEffect`
  - Infinite re-render (object / array у dependency array)
  - Race condition у запитах
  - Memory leak (event listener без cleanup)
  - Optimistic update без rollback
  - N+1 запити
  - Інші 4 — на свій смак

**Практикую:** Debugging skills (React DevTools Components + Profiler, Chrome DevTools Sources + Network + Console)

### CI/CD finalization

- [ ] GitHub Actions з parallel jobs: lint / type-check / test / build
- [ ] Matrix builds (Node 18 + 20)
- [ ] Secrets management через GitHub Secrets
- [ ] Branch protection rules: main потребує PR + green CI
- [ ] PR template з форматом "What + Why + Test plan"
- [ ] Preview deploy на кожен PR через Vercel
- [ ] Опційно: commitlint для Conventional Commits

**Практикую:** CI/CD GitHub Actions, PR practice, Git workflow

### Документація (живе через увесь проект)

- [ ] README з картинками, як запустити, доступні скрипти
- [ ] CLAUDE.md з інструкціями для AI (UX patterns, code style, architecture)
- [ ] Mermaid діаграми: auth flow, data flow, схема БД
- [ ] ADR (Architecture Decision Records) для топ-5 архітектурних рішень
- [ ] JSDoc / TSDoc для нетривіальних утиліт і custom hooks
- [ ] CHANGELOG для значних версій

**Практикую:** Документація, Mermaid

### Завершення Блоку 1: Polish + Portfolio

- [ ] Accessibility audit (всі pages) → 0 critical issues у axe
- [ ] SEO meta tags (через `react-helmet-async` або вручну в `<head>`)
- [ ] Mobile responsive перевірка на real devices
- [ ] 2 case studies (LinkedIn / Medium / DOU блог):
  - архітектура пет-проекту (чому Zustand + React Query + design tokens)
  - досвід міграції з vanilla → TS-stack (на основі markup-app)
- [ ] CV у 2 версіях (Strong Junior / Middle Target)
- [ ] Self-recorded mock interviews — 5 сесій 15-хв пояснення проекту англійською (порівняти з baseline із Setup)

**Практикую:** Фіналізація + Документація + AI-controlled mode перевірка ("я можу пояснити кожен рядок без AI")

> **Точка виходу Блоку 1.** Тут пет-проект — production-ready React + TS SPA. Можна **починати дивитись і відгукуватись** на вакансії з чистим React стеком (Vite / CRA SPA — ~40-50% Middle React ринку). Блок 2 можна робити паралельно з пошуком роботи.

---

## Блок 2: Next.js (після ядра)

Береться **коли React + TS ядро вже впевнене**. Next.js з міцною React-базою — це ~4-6 тижнів, а не вивчення з нуля (Next.js = React + framework, не нова мова).

**Спосіб:** міграція пет-проекту Vite → Next.js. Це найцінніший варіант — реальний real-world скіл (компанії регулярно мігрують legacy на Next.js), і ти вже знаєш кожен рядок свого проекту, тому фокус суто на Next.js-частині, а не на доменній логіці.

### Чекбокси

- [ ] Міграція структури на App Router (директорія `app/`)
- [ ] File-based routing замість React Router (контраст відчуваєш на практиці — це сильна тема для співбесіди)
- [ ] Server Components vs Client Components — де ставити `'use client'` і чому
- [ ] Server Actions для mutations (де доречно — замість частини React Query mutations)
- [ ] `loading.tsx` / `error.tsx` / `not-found.tsx` — контраст з ручними `<Suspense>` / Error Boundary з Блоку 1
- [ ] SSR / SSG / RSC — розуміння коли що, вміти обґрунтувати вибір на конкретній сторінці
- [ ] `middleware.ts` для protected routes (контраст з React Router wrapper)
- [ ] `next/image`, `next/font` optimization
- [ ] Metadata API — SEO, OG tags (контраст з ручним `react-helmet`)
- [ ] Deploy Next.js версії на Vercel

**Практикую:** Next.js (App Router, RSC, Server Components, Server Actions, SSR / SSG / CSR)

**Час:** 4-6 тижнів. Альтернатива міграції — окремий менший Next.js проект, якщо міграція виявиться надто болісною. Але міграція переважно краща: один сильний проект цінніший за два слабкі.

> **Точка виходу Блоку 2.** Пул вакансій розширюється до ~70% Middle React ринку (додаються всі Next.js-проекти).

---

## Теоретичне вивчення окремо від проекту

Речі які не закриваються лише через код — треба прочитати / подивитись окремо. Кожен пункт із конкретним ресурсом і часовою інвестицією.

### Must

- [ ] **TypeScript глибше** — conditional types, mapped types, `infer`, template literal types
  - **Ресурс:** TypeScript Deep Dive (basarat.gitbook.io) — розділи Type System + Generics + Type Compatibility
  - **Час:** ~5-6 годин чистого читання, розкидати на 1-2 тижні

- [ ] **React 18 ментальна модель** — fibre, reconciliation, RSC концепти, чим Server Components відрізняються від Client
  - **Ресурс:** [react.dev/learn](https://react.dev/learn) повністю + Dan Abramov "React as a UI Runtime" (overreacted.io)
  - **Час:** ~6-8 годин

- [ ] **JS deep для співбесід** — event loop, microtasks vs macrotasks, closures у hooks (stale closure як bug pattern), `this` binding
  - **Ресурс:** YouTube "What the heck is the event loop anyway?" (Philip Roberts, JSConf — 25 хв класика) + MDN розділи Closures + Event Loop
  - **Час:** ~3-4 години

- [ ] **REST design** — status codes детально, idempotency, pagination styles, error response shapes
  - **Ресурс:** restcookbook.com (короткі статті) + blog.postman.com
  - **Час:** ~2-3 години

### Низький пріоритет (CS-foundations)

- [ ] **Алгоритми і структури даних базово** — Big-O, Map / Set / Stack / Queue / Tree, sort, binary search, рекурсія
  - **Ресурс:** книга **"Grokking Algorithms"** (Aditya Bhargava) — 200 сторінок з ілюстраціями
  - **Час:** ~10-15 годин розкидано на 2-3 тижні

- [ ] **HTTP / CORS / headers глибоко** — статуси, кешування, preflight, security
  - **Ресурс:** MDN HTTP section ([developer.mozilla.org/en-US/docs/Web/HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP))
  - **Час:** ~2-3 години

- [ ] **SQL basics + JOIN-и + індекси**
  - **Ресурс:** [postgresqltutorial.com](https://www.postgresqltutorial.com/) (безкоштовний) + practice одразу у Supabase SQL Editor
  - **Час:** ~5-7 годин

- [ ] **Event loop у Node.js** — single-thread + async I/O
  - **Ресурс:** YouTube + Node.js docs про libuv
  - **Час:** ~1-2 години

- [ ] **System design basics**
  - **Ресурс:** YouTube канал **ByteByteGo** (короткі 5-10 хв пояснення)
  - **Час:** ~5-10 годин розкидано фоном

### Англійська

Підтримання активного speaking — стратегію визначу окремо. Поки фоном через документацію і відео англійською.

---

## Загальна часова оцінка

| Категорія | Час |
|---|---|
| Блок 1 — Setup інфраструктури | 3-5 днів |
| Блок 1 — розробка ядра (всі модулі) | 3-4 місяці |
| Блок 1 — Polish + Portfolio | 2-3 тижні |
| **Блок 1 разом** | **~4-4.5 місяці** |
| Теоретичне вивчення (паралельно з Блоком 1) | ~40 годин (3-4 год/тиждень) |
| Блок 2 — Next.js (міграція пет-проекту) | 1-1.5 місяці |
| **Ядро + Next.js разом** | **~5.5-6 місяців** |

**Реалістичні діапазони** (для людини з повним робочим днем):
- Активний темп (18-22 год/тиждень): Блок 1 ~4 міс → з Next.js ~5.5 міс
- Комфортний темп (12-15 год/тиждень): Блок 1 ~6 міс → з Next.js ~8 міс
- Зі сповільненнями (відпустки, важкі тижні на роботі): +1-2 місяці

**Правило:** не "відмітив = пройдено", а "відмітив = код у проекті + тести (де застосовно) + дока оновлена + код пояснив без AI".