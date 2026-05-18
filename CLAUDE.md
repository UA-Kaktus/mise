# Pet Project — план і документація

Централізована точка для пет-проекту, на якому я відпрацьовую технології з плану [frontend-roadmap.md](frontend-roadmap.md). Тут: стек, інфраструктура, принципи розробки, структура коду, ідея проекту, roadmap фіч.

> Цей файл згодом переїде в репозиторій пет-проекту і стане його `CLAUDE.md` — інструкціями для AI-партнера. Тому він пишеться так, щоб бути зрозумілим і поза контекстом цієї розмови.

## Призначення проекту

- Відпрацьовувати технології з плану Middle Frontend на реальному коді, а не "ще один TODO з туторіалу"
- Бути CV-готовим до моменту старту пошуку роботи (live deployment, GitHub commits з нормальною історією, README який не соромно показати)
- Стати містком у Full-Stack після Middle: коли дійду до фази "пишу бек" — додаватиму свою бізнес-логіку поступово, без переписування з нуля

## Два блоки розробки

Проект будується у два етапи (синхронно з планом у `frontend-roadmap.md`):

- **Блок 1 — Ядро.** Стек: **Vite + React + React Router + TypeScript + Tailwind + Supabase + Vitest**. Тут будується весь функціонал проекту. Головний фокус — TypeScript і React advanced.
- **Блок 2 — Next.js.** Міграція готового проекту Vite → Next.js (App Router, RSC, Server Actions). Робиться **після** того, як ядро впевнене.

Більшість цього файлу описує **Блок 1**. Розділ "Блок 2: міграція на Next.js" — окремо в кінці.

## Технологічний стек (Блок 1)

### Core

| Що | Чому |
|---|---|
| **Vite** | Build tool + dev server. Швидкий, простий конфіг. Знайомий з роботи |
| **React 18+** | Базова бібліотека UI |
| **TypeScript** | Головний gap у моєму поточному рівні. Включаємо з день 1, не "додамо потім" — інакше доведеться переписувати весь код |
| **React Router** | Клієнтський роутинг для SPA. У Блоці 2 заміниться файловим роутером Next.js — і це буде наочний контраст двох підходів |
| **Tailwind CSS** | Витісняє SCSS у нових проектах. Тренуємо utility-first підхід. UI-компоненти пишемо **самі** на Tailwind (без shadcn / готових бібліотек) — це практика верстки |

### State & data

| Що | Чому |
|---|---|
| **TanStack Query (React Query)** | Server state, кеш, optimistic updates. Той самий стек що зараз на роботі — тренуємо advanced patterns яких ще не торкався |
| **Zustand** | Client state — для UI стану і draft state. Той самий стек що зараз — закріплюємо + advanced (middleware, slices) |
| **react-hook-form + zod** | Де-факто стандарт для форм у React 2026. Одна zod-schema валідує і дає TypeScript-тип з одного джерела |

### Backend as a Service

| Що | Чому |
|---|---|
| **Supabase** | PostgreSQL + auth + storage + Row Level Security + real-time. Безкоштовний tier, дає реальну БД без писання беку. API авто-генерується зі схеми — нуль рядків backend-коду. Коли почну Full-Stack після Middle — Supabase auto-API заміниться власним беком, але БД-схема залишиться |

### Tests & quality

| Що | Чому |
|---|---|
| **Vitest** | Швидкий тест-раннер, інтегрується з Vite без болю |
| **React Testing Library** | Тести компонентів за поведінкою юзера, не за внутрішніми деталями |
| **MSW** (Mock Service Worker) | Мокає HTTP-запити (Supabase) для тестів |
| **Prettier + ESLint + husky + lint-staged** | Pre-commit gates: код форматується автоматично, лінт-помилки блокують коміт |

### Infrastructure

| Що | Роль |
|---|---|
| **GitHub** | Хостинг коду, PR-флоу, conventional commits |
| **Vercel** | Авто-деплой з main + preview deploy на кожен PR (окремий URL для перевірки змін перед merge). Працює і з Vite SPA, і з Next.js — переживе міграцію в Блоці 2 |
| **GitHub Actions** | CI workflow на PR: `lint + type-check + test`. Червоний прапор — merge заблоковано |

### Можливо пізніше (не зобовʼязання)

- **Sentry** (free tier) — error tracking у проді, тренує "production thinking"
- **Vercel Analytics** — продуктові метрики

## Інфраструктура — як інструменти працюють разом

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   GitHub     │  push   │    Vercel    │         │   Supabase   │
│  (твій код)  ├────────►│  (хостинг)   │         │  (БД + Auth) │
└──────────────┘         └──────────────┘         └──────────────┘
        ▲                       │                        ▲
        │                       │ build + deploy         │
        │                       ▼                        │ HTTPS (прямо з браузера)
        │                ┌──────────────┐                │
        │                │  production  │────────────────┘
        └────────────────┤ + preview URL│
            PR-флоу       └──────────────┘
```

Важливо: браузер спілкується з Supabase **напряму** (через `supabase-js` client). Vercel хостить лише статичний фронт — у запитах до БД / Storage участі не бере.

**Flow для звичайної фічі:**

1. `git checkout -b feat/feature-name` локально
2. Кодиш фічу, локально перевіряєш на `localhost:5173` (Vite dev server). Supabase env vars у `.env.local`
3. `git push origin feat/feature-name` → відкриваєш PR на GitHub
4. **Автоматично запускається:**
   - GitHub Actions: lint + type-check + test
   - Vercel збирає preview deploy → коментар у PR з посиланням
5. Перевіряєш фічу на preview URL так, ніби це прод. Можеш показати комусь
6. Merge у main → Vercel автоматично заливає в продакшн
7. Сторонні люди (зокрема рев'юери на співбесіді) можуть користуватись проектом 24/7

**Environment variables:**

- Локально: `.env.local` (у `.gitignore`)
- Прод / preview: Vercel dashboard → Environment Variables. Supabase URL і anon key (anon key безпечно експонувати — БД захищає RLS)
- Тести: `.env.test` з тестовими значеннями

## Принципи розробки

Обов'язкові, без винятків. Пет-проект для того й існує, щоб тренувати дисципліну, а не "клепати фічі".

- **TypeScript-first з день 1.** Ніяких `// @ts-ignore` без коментаря-причини. Ніяких `any` без `// @ts-expect-error: <чому>`
- **Тести з першого дня.** Кожна нетривіальна функція / hook / компонент отримує тест. Не "напишу пізніше"
- **AI як прискорювач, не як головний виконавець.** Якщо AI згенерував код який я не можу пояснити рядок за рядком — переписую руками. Раз на тиждень — фіча повністю без AI (commit з префіксом `[no-ai]`)
- **AI підсвічує нове.** Коли Claude використовує прийом / API / патерн, потенційно новий для мене — він явно це позначає і пропонує короткий чорновик розбору для `learning-notes.md`. Незнайоме не повинно проскакувати мовчки
- **Кожна фіча — окремий branch + PR + preview deploy.** Навіть якщо я один в команді — тренуємо PR культуру
- **Conventional Commits.** `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`
- **Чесний README з самого початку.** README пишеться паралельно з фічами, не доточується в кінці
- **Кожен PR описує "Що + Why + Test plan".** Навіть свій же PR — тренуємо письмову комунікацію
- **Не клонувати робочий проект бездумно.** Брати з нього патерни і архітектурні рішення, але **домен** та **ідея** мають бути іншими

## Принципи дизайну і UX (інструкція для AI-партнера)

При роботі над будь-якою UI-задачею (нова сторінка, форма, modal, list, інтерактивний елемент, будь-який `loading` / `empty` / `error` state) Claude **активно піднімає UX-питання**, які я можу пропустити. Не просто "робить що попросив" — пропонує свідомі рішення з коротким обґрунтуванням. Я ще не сильний в UX і навмисно покладаюсь на AI як на ментора в цій частині.

### Принципи якими керуватись

- **Visual hierarchy** — один primary CTA на екран; розмір / вага / колір / spacing визначають порядок сприйняття
- **Whitespace як інструмент** — розділяє групи, керує увагою; не "пустота яку треба заповнити"
- **Affordance** — елемент виглядає як те що робить (кнопка — кнопкою, link — підкреслений)
- **Feedback states** — кожен інтерактив має `hover` / `active` / `focus` / `disabled`; кожна асинхронна дія має `loading` / `success` / `error`; порожній список завжди має empty state з CTA
- **Microcopy** — текст кнопок, плейсхолдерів, помилок **направляє**, а не описує: "Save changes" > "Submit", "Email already in use — sign in?" > "Error 409"
- **Design tokens** — кольори / spacing / radius / transitions беруться з Tailwind theme, не хардкодяться
- **Reusable variants** — використовуй наявні варіанти компонентів (Button `primary/secondary/destructive`), не плоди одноразові
- **Typography scale** — обмежений набір розмірів через Tailwind, не "рандомні px"
- **Mobile-first** — стартуємо з вузького viewport, breakpoint-и додаються при потребі
- **Progressive disclosure** — не показуй все одразу; складність розкривається через accordion / sheet / modal
- **Skeletons vs spinners** — skeleton коли знаємо контент-shape; spinner коли разова невизначена дія

### Accessibility (базовий рівень)

Глибоке занурення у WCAG — відкладено на потім. Поки — Claude **вказує на очевидні a11y-проблеми** під час кодингу, без вимоги повного аудиту:

- Семантичний HTML (`<button>` для дій, `<a>` для навігації, заголовки по порядку)
- Кожен `<input>` має пов'язаний `<label>`
- Видимий focus-стан (не `outline: none` без заміни)
- Достатній контраст тексту (мінімум 4.5:1); помилка позначена не лише кольором
- `alt` для змістовних зображень
- Модалка: фокус усередині, `Esc` закриває
- Touch targets — мінімум 44×44px на mobile

Якщо я роблю щось що явно порушує ці пункти — Claude нагадує. Глибший аудит (axe DevTools) — окремий чекбокс наприкінці проекту.

### Типові питання які Claude піднімає проактивно

**"Додай кнопку для X":** primary чи secondary? feedback при кліку? якщо fail — як юзер дізнається? є `disabled`? confirmation для destructive?

**"Зроби список":** empty state? loading — skeleton чи spinner? error state з retry? скільки items — пагінація / infinite scroll? що юзер робить з елементом?

**"Зроби форму":** validation `onBlur` / `onSubmit`? помилки inline чи зверху? required позначені? `Submit` disabled поки invalid? recovery після server error без втрати введеного?

**"Зроби модалку":** це справді модалка чи краще sheet / inline? focus trap + `Esc` + клік на overlay? confirm при unsaved changes? mobile — fullscreen чи bottom sheet?

### Коли НЕ перевантажувати

Quick prototype / throwaway → Claude робить мінімально, але **проговорює явно**: "зроблено базово; якщо в прод — треба loading / error / empty states + a11y". Пропуск UX-питань мовчки == порушення цієї інструкції.

## Структура коду (Блок 1 — Vite)

Трирівнева схема `pages → modules → shared` з робочого проекту, адаптована до Vite + React Router.

```
pet-project/
├── src/
│   ├── main.tsx               # entry point
│   ├── App.tsx                # root: providers (QueryClient, router)
│   ├── index.css              # Tailwind entry
│   │
│   ├── routes/                # конфігурація React Router
│   │   └── index.tsx          # дерево маршрутів, lazy routes
│   │
│   ├── pages/                 # page-specific код (тільки для своєї сторінки)
│   │   └── <page-name>/
│   │       ├── components/
│   │       ├── store.ts       # page draft store (Zustand), якщо потрібен
│   │       ├── hooks/
│   │       └── index.tsx      # сам page-компонент
│   │
│   ├── modules/               # реюзабельні модулі (лише коли 2+ pages реюзають)
│   │   └── <module-name>/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── store.ts
│   │       └── index.ts
│   │
│   └── shared/                # cross-cutting код
│       ├── ui/                # власні базові компоненти на Tailwind (Button, Input, Card, Modal...)
│       ├── api/               # Supabase client + queries / mutations
│       │   ├── supabase.ts    # ініціалізація client
│       │   ├── queries/       # React Query хуки на read
│       │   └── mutations/     # React Query хуки на write
│       ├── hooks/
│       ├── stores/            # глобальні Zustand stores (authStore тощо)
│       ├── types/             # глобальні TS типи + згенеровані Supabase типи
│       └── utils/
│
├── public/
├── .env.local                 # секрети, у .gitignore
├── .env.example               # шаблон env vars без значень — у git
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

**Правила розміщення коду:**

- Page-specific код живе в `src/pages/<name>/`. Якщо він не реюзається з іншої сторінки — **залишається** в pages, не виноситься в modules
- `src/modules/<name>/` — лише коли 2+ pages реально реюзають той самий код. Не пре-створюю модуль "на майбутнє"
- `src/shared/` — низькорівневі речі: власний UI kit, API клієнт, утиліти, глобальні stores
- `src/routes/` — лише конфігурація маршрутів. Page-компоненти тонкі, імпортують з `src/pages/<name>/`

> У Блоці 2 (міграція на Next.js) `src/routes/` зникає, з'являється директорія `app/` з файловим роутингом. Трирівнева схема `pages / modules / shared` зберігається.

## Ідея проекту: Football Analytics

Футбольний аналітичний ресурс. Показує дані ліг, команд і гравців із фокусом на **КПД гравця** — метрику ефективності "грошей за гол" (`зарплата / голи`). Дані веде адміністратор; гості переглядають усе без авторизації.

Робоча назва — `Football Analytics`, фінальну оберу пізніше.

### Ролі

- **Гість** — бачить усі сторінки, read-only, без авторизації
- **Адмін** — логіниться → отримує inline edit-контроли на звичайних сторінках (CRUD над даними). Окремої відокремленої "адмінки" немає — редагування вбудоване в перегляд

### Сутності (таблиці Supabase)

| Таблиця | Поля (орієнтовно) | Хто редагує |
|---|---|---|
| `leagues` | name, country, season | seed + адмін |
| `teams` | league_id, name, logo_url, city | seed + адмін |
| `players` | team_id, name, position, age, nationality, **salary_eur**, photo_url, shirt_number, **goals, assists, appearances, minutes** | seed + адмін |
| `team_standings` | team_id, season, played, won, drawn, lost, goals_for, goals_against, points | seed + адмін |

Примітки:
- Статистика гравця (`goals`, `assists`, ...) тримається **прямо в `players`** — бо snapshot одного сезону. Якби було багато сезонів — була б окрема таблиця `player_stats`
- `photo_url` — поле в схемі є, але реалізація фото (URL-посилання чи Storage upload) вирішується пізніше

### Похідні дані (НЕ зберігаються, рахуються на фронті)

- **КПД гравця** = `salary_eur / goals` — "грошей за гол"
- Альтернативні метрики: гроші/(голи+асисти), гроші/хвилини
- **Сумарна ЗП команди** = сума зарплат гравців
- **КПД команди** = агрегат по гравцях
- **Позиція в таблиці** = сортування standings за `points`

Усе це обчислюється при рендері (`useMemo` де список великий). Жодного збереженого `kpd`-поля — single source of truth це первинні дані.

### Скоуп даних

- Схема розрахована на **2 ліги** (щоб трансфер гравця міг бути і між лігами)
- Стартовий seed — **одна ліга, Ла Ліга** (20 команд, ~500 гравців). Друга ліга — наступним кроком
- Seed заливається одноразово в Supabase; зарплати вносяться руками (публічного API зарплат не існує)
- Дані — **snapshot завершеного сезону** (наприклад 2024/25), не поточного. Це не обмеження, а правильний вибір для метрики КПД: завершений сезон = фінальні голи = стабільний коректний КПД. Поточний недограний сезон давав би неповний показник, що скаче щотижня. "Живі" дані з автосинхронізацією — це серверна логіка (бек), напрям для Full-Stack фази після Middle

### Сторінки

| Сторінка | Маршрут | Блоки |
|---|---|---|
| **League standings** | `/` або `/league/:id` | турнірна таблиця (сортована за очками), перемикач ліги |
| **Team detail** | `/team/:id` | інфо команди, склад (гравці), агрегати: сумарна ЗП, сумарні голи, КПД команди |
| **Player detail** | `/player/:id` | профіль, статистика сезону, КПД (+альтернативні метрики), поточна команда |
| **Players list** | `/players` | список усіх гравців, фільтр-панель, пошук, сортування |
| **KPD leaderboard** | `/leaderboard` | топ гравців за ефективністю (можна як режим Players list) |
| **Admin login** | `/admin/login` | форма входу + demo-login button |

### Фільтри / пошук / сортування (Players list)

- Фільтри: ліга, команда, позиція, діапазон зарплати
- Пошук: за іменем гравця (debounce)
- Сортування: за КПД, голами, зарплатою, віком — **на фронті** (бо КПД — обчислюване)

### Admin-флоу (CRUD)

Адмін залогінений → на сторінках з'являються edit-контроли:
- **Player** — create / edit (усі поля) / delete. Edit-форма багатопільна — гарна практика RHF + zod
- **Team** — edit (логотип, місто), за потреби create / delete
- **Standings** — edit рядка таблиці (очки, перемоги тощо)
- **"Трансфер"** — у edit-формі гравця змінюється `team` (select команди, можливо з іншої ліги). Окремої history-таблиці немає

### Що це покриває з модулів плану

| Модуль | Як покривається |
|---|---|
| Routing | dynamic segments (`/team/:id`, `/player/:id`), nested layouts |
| Auth | admin login + protected edit-контроли + demo-login |
| Core CRUD | player / team / standings — повна вертикаль |
| Forms | player edit form (багатопільна), transfer (select) |
| State management | React Query (дані) + Zustand (UI: модалки, фільтр-стан) |
| Filters + Search | Players list — фільтри, пошук, сортування |
| Performance | список ~500 гравців — `useMemo` для КПД-агрегатів, віртуалізація якщо треба |

> **Real-time** — у цьому проекті слабкий natural use-case (адмін один). Рішення по Realtime-модулю — при коригуванні роадмапу.

### Розширення (фаза 2, якщо зайде)

**Калькулятор ефективності** — збираєш гіпотетичний склад із наявних гравців, бачиш сумарну вартість і сукупний КПД. Не fantasy з лайвом і правилами — простий аналітичний калькулятор поверх наявних даних. Друга ліга в seed.

## Roadmap фіч проекту

> Кістяк — модулі з `frontend-roadmap.md` (Блок 1). Деталізація під конкретні сторінки / поля Football Analytics — наступний крок. Поки — модулі-орієнтири:

- [ ] Setup інфраструктури (Vite + TS + Tailwind + ESLint + Prettier + husky; Vercel; Supabase; GitHub Actions)
- [ ] Routing (React Router — nested / dynamic / lazy routes)
- [ ] Auth (admin login + protected edit-контроли + demo-login button)
- [ ] Design system + UI shell (дизайн-токени, власні Tailwind-компоненти, layout)
- [ ] Core CRUD (player / team / standings — list / detail / create / edit / delete)
- [ ] Forms поглиблено (player edit form, cross-field / async validation, useFieldArray)
- [ ] State management deep (React Query advanced, Zustand advanced)
- [ ] Filters + Search (фільтри ліга / команда / позиція / зарплата, пошук, сортування, URL sync)
- [ ] Real-time (Supabase Realtime) — *під питанням: слабкий use-case, рішення при коригуванні роадмапу*
- [ ] Loading / Error / Empty states скрізь
- [ ] Testing (Vitest + RTL + MSW)
- [ ] Performance optimization (Lighthouse, bundle analysis, code splitting)
- [ ] Debugging практика (10 типових багів через DevTools)
- [ ] CI/CD finalization
- [ ] Документація (README, ADR, Mermaid діаграми)
- [ ] Polish + Portfolio (a11y audit, case studies)

## Блок 2: міграція на Next.js

Робиться **після завершення Блоку 1**, коли React + TS вже впевнені. Це не "переписати з нуля" — це міграція готового проекту, найцінніший варіант (real-world скіл + ти знаєш кожен рядок свого коду).

Орієнтири міграції:
- Структура → App Router (директорія `app/`)
- File-based routing замість `src/routes/` (React Router)
- Server Components vs Client Components
- Server Actions для частини мутацій
- `loading.tsx` / `error.tsx` замість ручних `<Suspense>` / Error Boundary
- `next/image`, `next/font`, Metadata API
- Deploy Next.js-версії на Vercel

Детальний план міграції — у `frontend-roadmap.md`, розділ "Блок 2: Next.js".

## Що НЕ треба робити у пет-проекті

- ❌ "Спочатку зроблю архітектуру ідеальною, потім почну фічі" — паралельно
- ❌ Копіювати рішення з робочого проекту дослівно — там legacy, тут чисте поле
- ❌ Робити фічі "у відповідь на туторіал" — кожна фіча потрібна **проекту**, не розділу в книзі
- ❌ Запушити в main без PR ("я ж один") — вбиває сенс тренування PR-флоу
- ❌ "Тести напишу пізніше" — це гарантоване "ніколи"
- ❌ Перетворити проект у демо-zoo (10 не пов'язаних фіч) — фокус на одній цілісній історії
- ❌ Почати Блок 2 (Next.js) поки Блок 1 не завершений — це саме те розсіяння фокусу, якого ми уникаємо

## Як цей файл оновлюється

- Після кожного завершеного модуля — оновлюється чеклист
- Архітектурні рішення з аргументацією — фіксуються тут (короткі decision records)
- Якщо стек змінюється посеред дороги — пишеться **чому** змінився
- Цей файл — документація для майбутнього мене і для AI-партнера
