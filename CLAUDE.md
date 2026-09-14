# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR (defaults to http://localhost:5173)
- `npm run build` — production build (`vite build`); use this to check for compile errors
- `npm run preview` — serve the production build locally
- `npm run lint` — run Oxlint (config: `.oxlintrc.json`, plugins `react` + `oxc`)

Requires Node 20.19+ / 22.12+ (Vite 8) — there is no `engines` field to enforce it.

There is no test suite configured in this project.

`npm run lint` currently emits pre-existing `react/only-export-components` warnings in
`src/context/QuestionsContext.jsx` and `src/utils/skillIcons.jsx` (both intentionally
export non-component values alongside a provider/helpers). Don't try to "fix" these.

## Architecture

This is a client-only React 19 + Vite SPA (no backend) for interview-prep Q&A study, styled with a single global `src/index.css` (no CSS framework). Routing is `react-router-dom`.

### Data flow: static content vs. persisted progress

The core design constraint: **question content and user progress are stored separately** so that editing the question bank never wipes a user's learning progress, and vice versa.

- `src/data/questions.js` — the static question bank. Exports `SKILLS` (the fixed list of 14 skill tags) and `questions` (an array built from an internal `rawQuestions` array via `createQuestion()`). **IDs are assigned by array position (`index + 1`), not randomly** — this is intentional: a random ID generated at module-load time would change on every page refresh and orphan all saved localStorage progress. This means reordering or deleting entries in `rawQuestions` shifts IDs and can disconnect existing progress; appending new entries at the end is always safe. `rawQuestions.map()` also re-forces the progress fields (`status`/`favorite`/`learnedCount`/`learnedGoal`) to defaults, so any progress-like values in the data file are ignored.
- `src/utils/storage.js` — thin localStorage read/write wrappers for two independent keys (`interview-prep:progress`, `interview-prep:filters`). Every read/write is wrapped in try/catch and degrades silently (private mode, quota) — these functions never throw. `loadFilters` spreads saved state over the passed defaults, so adding a new filter key is backward-compatible.
- `src/context/QuestionsContext.jsx` (`QuestionsProvider` / `useQuestions()`) — the single source of truth at runtime. On render it merges the static `questions` array with saved progress from localStorage, and **derives `status` from `learnedCount >= learnedGoal`** rather than trusting a stored status field, so the "Learned" badge can never drift out of sync with the count. Also owns filter state: `DEFAULT_FILTERS` is `{ query, skills[], difficultyRanges[] (values `"1-3"|"4-6"|"7-8"|"9-10"`), ratings[] (1–5), status (`"all"|"learned"|"not_learned"`), favoriteOnly }`, persisted the same way.

### Editing the question bank

`src/data/questions.js` is ~13k lines. `rawQuestions` is split into per-skill blocks with banner comments (`// ---- <Skill> ----`) in `SKILLS` order; the large blocks under `// ---- Импортировано из yeahub-scrap ... ----` markers (React, TypeScript, Git) are bulk-imported and dominate the file. When adding a question for a skill, append it at the **end of that skill's block**; appending at the very end of `rawQuestions` is safest for ID stability. The Russian comment block at the top of the file is the canonical "shape of one question" reference — copy it from there.

Question text conventions: inline code in `shortAnswer` / `longAnswer` is written with `` `backticks` `` and rendered as `<code>` by `src/components/FormattedText.jsx`; `codeExample` (optional) renders through `src/components/CodeBlock.jsx` with a copy button. `\n` in answer strings survives as a line break because `.answer-section__text` in `index.css` sets `white-space: pre-line` — keep that rule if you touch answer styling.

### Coding tasks

`/training/tasks` is a second, parallel feature with the same content/progress split:
`src/data/tasks.js` (static bank, ids by array position, `TASK_CATEGORIES` / `TASK_LANGUAGES`)
+ `src/context/TasksContext.jsx` (`TasksProvider` / `useTasks()`) persisting to its **own**
localStorage keys (`interview-prep:tasks`, `interview-prep:task-filters`) — never reuse the
question keys, the filter shapes differ. Task `status` (`not_started` | `in_progress` | `solved`)
is derived from the `solved` flag and whether saved code differs from `starterCode`, the same
"derive, don't trust stored status" rule as questions. Task difficulty is **1–5**; question
difficulty is 1–10 — don't share the filter constants.

Solutions really execute: `src/utils/runCode.js` spawns `src/workers/runner.worker.js` and
races it against a 2s timeout, terminating the worker on expiry — that's what keeps an infinite
loop in user code from freezing the tab. Keep the
`new Worker(new URL("...", import.meta.url), { type: "module" })` form; a string path would 404
under the `/interview/` GitHub Pages base. Test values cross the worker boundary as display
strings because a solution may return non-cloneable values. `Run` executes visible tests only;
`Submit` adds `hidden: true` ones and is the only path that can mark a task solved.

A test is either `{ args, expected }` or `{ body, expected }` — `body` is a snippet compiled as
an **async** function receiving `solution`, needed when a test passes functions in (promisify,
memoize, runSequentially), counts calls, or asserts on a rejection. When adding a task, verify
a reference solution passes *and* that a plausible-wrong one fails; tests that only confirm the
happy path let `return nums[0]` pass a majority-element suite.

`src/components/CodeEditor.jsx` is a transparent `<textarea>` over a highlighted `<pre>` plus a
gutter — all three must keep identical font/size/line-height/padding (`.code-editor__*` in
`index.css`) or the caret drifts from the text. `src/utils/highlightJs.js` feeds
`dangerouslySetInnerHTML`, so its HTML-escaping is load-bearing; edit it with care.

### Shared behavior hooks

- `src/hooks/useQuestionActions.js` (`learn` / `repeat` / `toggleFavorite` / `canRepeat`) is the **only** place Learn/Repeat/Favorite logic is implemented. Both `QuestionCardMenu` (list view dropdown) and `QuestionActionsBar` (details page) call into this hook so the two surfaces can never diverge. `repeat` is only meaningful when `learnedCount > 0` (`canRepeat`); `learn` increments `learnedCount` capped at `learnedGoal`.
- `src/hooks/useFilteredQuestions.js` derives the visible list from `useQuestions()`'s `questions` + `filters`. The pure `filterQuestions(questions, filters)` export is reused directly by `QuestionDetailsPage` to compute Previous/Next order consistent with whatever filter was active on the list page.

### Pages and navigation

`App.jsx` wraps everything in `QuestionsProvider` + `BrowserRouter`, with a persistent `Sidebar` (`src/components/Sidebar.jsx`) and routed content in `src/pages/*`. Route structure mirrors the sidebar's nav groups (Training → Interview/Tasks, Knowledge base → Resources/Questions/Collections, plus Home and Analytics); question details live at `/knowledge-base/questions/:id`. `TasksPage` and `ResourcesPage` are placeholders. Each page renders its own `Breadcrumbs` rather than deriving them from route config.

`src/utils/skillIcons.jsx` centralizes the skill → icon/color mapping (brand icons via `react-icons/si`, a couple of `lucide-react` fallbacks for CI/CD and Networks) — use `SKILL_META` / `<SkillIcon skill=... />` instead of adding new icon imports elsewhere.
