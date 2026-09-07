# Interview Prep

A client-only React SPA for studying technical-interview questions. Browse a
question bank, filter by skill / difficulty / rating, expand short and long
answers with code samples, track your learning progress, star favorites, and
run a quick flash-card style interview simulation.

All progress is stored in the browser's `localStorage` — there is no backend and
no account.

## Features

- **Question bank** (`/knowledge-base/questions`) — collapsible cards with a
  status badge, rating, complexity, short answer and optional code example.
- **Filtering** — full-text query (question text + keywords), multi-select skill
  tags, difficulty ranges (`1-3`, `4-6`, `7-8`, `9-10`), rating chips, learned /
  not-learned status, and a "favorites only" toggle. Filter state is persisted.
- **Question details** (`/knowledge-base/questions/:id`) — full long answer,
  Previous / Next navigation that respects the active list filter, a progress
  sidebar, and clickable keyword tags that jump back to a filtered list.
- **Learn / Repeat / Favorite** — `Learn` increments a per-question counter
  (`learnedCount`) up to its goal; once `learnedCount >= learnedGoal` the
  question is considered *Learned*. `Repeat` resets the counter. `Favorite`
  toggles a star.
- **Interview simulation** (`/training/interview`) — random question, reveal the
  answer, mark it as known or not known (which call `Learn` / `Repeat`), shuffle
  to the next one.
- **Collections** (`/knowledge-base/collections`) — every question you have
  favorited.
- **Analytics** (`/analytics`) — overall learned percentage, a per-skill
  learned/remaining bar chart, and a question-count-by-difficulty chart.
- **Home** (`/`) — totals for questions, learned, favorites and skills covered,
  plus quick links.

`Tasks` and `Resources` are placeholder pages.

## Tech stack

| Purpose        | Choice                                   |
| -------------- | ---------------------------------------- |
| UI             | React 19                                 |
| Build / dev    | Vite 8 (`@vitejs/plugin-react`)          |
| Routing        | `react-router-dom` 7 (`BrowserRouter`)   |
| Icons          | `react-icons` (Simple Icons) + `lucide-react` |
| Linting        | Oxlint (`react` + `oxc` plugins)         |
| Styling        | One hand-written global stylesheet (`src/index.css`), no CSS framework |

No TypeScript, no test runner, no state-management library — runtime state lives
in a single React context.

## Getting started

Requires Node.js **20.19+** or **22.12+** (Vite 8 requirement).

```bash
npm install
npm run dev        # start the dev server with HMR
```

### Scripts

| Script            | Description                                        |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Vite dev server with hot module replacement       |
| `npm run build`   | Production build to `dist/` (use it to check for compile errors) |
| `npm run preview` | Serve the production build locally                 |
| `npm run lint`    | Run Oxlint (config: `.oxlintrc.json`)              |

## Project structure

```
src/
├── main.jsx                 # React entry point
├── App.jsx                  # QuestionsProvider + BrowserRouter + routes
├── index.css                # single global stylesheet
├── data/
│   └── questions.js         # static question bank (SKILLS + questions)
├── context/
│   └── QuestionsContext.jsx # runtime source of truth: merges data + progress, owns filters
├── hooks/
│   ├── useQuestionActions.js   # Learn / Repeat / Favorite logic (used by every surface)
│   └── useFilteredQuestions.js # derives the visible list; exports pure filterQuestions()
├── utils/
│   ├── storage.js           # localStorage read/write wrappers
│   └── skillIcons.jsx       # skill → icon + color mapping (SKILL_META / <SkillIcon />)
├── pages/
│   ├── HomePage.jsx
│   ├── QuestionListPage.jsx
│   ├── QuestionDetailsPage.jsx
│   ├── InterviewPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── CollectionsPage.jsx
│   ├── TasksPage.jsx        # placeholder
│   └── ResourcesPage.jsx    # placeholder
└── components/
    ├── Sidebar.jsx          # persistent nav
    ├── Breadcrumbs.jsx
    ├── FilterSidebar.jsx
    ├── QuestionCard.jsx
    ├── QuestionCardMenu.jsx
    ├── QuestionActionsBar.jsx
    ├── ProgressSidebar.jsx
    ├── FormattedText.jsx    # renders `backtick` spans as inline <code>
    └── CodeBlock.jsx        # <pre> block with copy-to-clipboard
```

### Routes

| Path                               | Page                  |
| ---------------------------------- | --------------------- |
| `/`                                | Home                  |
| `/training/interview`              | Interview simulation  |
| `/training/tasks`                  | Tasks (placeholder)   |
| `/knowledge-base/resources`        | Resources (placeholder) |
| `/knowledge-base/questions`        | Question list         |
| `/knowledge-base/questions/:id`    | Question details      |
| `/knowledge-base/collections`      | Favorites             |
| `/analytics`                       | Analytics             |
| `*`                                | redirect to `/`       |

## Architecture

### Static content vs. persisted progress

The core design constraint: **question content and user progress are stored
separately**, so editing the question bank never wipes learning progress and
vice-versa.

- **`src/data/questions.js`** — the static bank. Exports `SKILLS` (14 fixed skill
  tags) and `questions`, an array built from an internal `rawQuestions` list via
  `createQuestion()`. **IDs are assigned by array position (`index + 1`)**, not
  stored in the data. A random id generated at module-load time would change on
  every refresh and orphan all saved progress — hence positional ids.
  *Consequence:* reordering or deleting entries in `rawQuestions` shifts ids and
  can disconnect existing progress. **Appending new entries at the end is always
  safe.**
- **`src/utils/storage.js`** — thin `localStorage` wrappers for two independent
  keys:
  - `interview-prep:progress` — `{ [id]: { status, favorite, learnedCount, learnedGoal } }`
  - `interview-prep:filters` — the last-used filter state
- **`src/context/QuestionsContext.jsx`** (`QuestionsProvider` / `useQuestions()`)
  — the runtime source of truth. On render it merges the static `questions` array
  with saved progress and **derives `status` from `learnedCount >= learnedGoal`**
  rather than trusting a stored status field, so the *Learned* badge can never
  drift out of sync with the count. It also owns filter state (`DEFAULT_FILTERS`,
  `setFilters`, `resetFilters`).

### Shared behavior hooks

- **`useQuestionActions.js`** is the single implementation of
  `learn` / `repeat` / `toggleFavorite` / `canRepeat`. Both the list-view
  dropdown (`QuestionCardMenu`) and the details-page bar (`QuestionActionsBar`)
  call into it, so the two surfaces can't diverge.
- **`useFilteredQuestions.js`** derives the visible list from the context's
  `questions` + `filters`. Its pure `filterQuestions(questions, filters)` export
  is reused by the details page to compute Previous / Next order consistent with
  whatever filter was active on the list.

### Icons

`src/utils/skillIcons.jsx` centralizes the skill → icon / color mapping (brand
icons from `react-icons/si`, `lucide-react` fallbacks for CI/CD and Networks).
Use `SKILL_META` / `<SkillIcon skill=… />` instead of importing icons elsewhere.

## The question bank

`SKILLS` (fixed list):

```
HTML · CSS · JavaScript · TypeScript · React · React Router · Next.js ·
Redux · Git · Docker · Kubernetes · CI/CD · Webpack · Networks
```

### Adding a question

Append an object to `rawQuestions` in `src/data/questions.js`:

```js
{
  question: "Question text",
  shortAnswer: "Short answer. Mark inline code with backticks: `<tag>`.",
  longAnswer: "Full, detailed answer. Blank lines separate paragraphs.",
  codeExample: `console.log("optional — delete this field if not needed")`,
  skills: ["TypeScript"],        // one or more names from SKILLS
  keywords: ["#generics", "#type-safety"],
  difficulty: 4,                 // 1–10
  rating: 3,                     // 1–5 (importance)
}
```

- **Do not** set `id` — it is derived from array position.
- **Do not** set progress fields (`status`, `favorite`, `learnedCount`,
  `learnedGoal`); `createQuestion()` fills defaults (`learnedGoal: 3`) and real
  values live in `localStorage`.
- Inline code in `shortAnswer` / `longAnswer` uses `` `backticks` ``
  (`FormattedText` turns those into `<code>`); `codeExample` renders as a
  `CodeBlock` with a copy button.

## License

No license file is included; all rights reserved by the author unless stated
otherwise.
