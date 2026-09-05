# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (HMR)
- `npm run build` — production build (`vite build`); use this to check for compile errors
- `npm run preview` — serve the production build locally
- `npm run lint` — run Oxlint (config: `.oxlintrc.json`, plugins `react` + `oxc`)

There is no test suite configured in this project.

## Architecture

This is a client-only React 19 + Vite SPA (no backend) for interview-prep Q&A study, styled with a single global `src/index.css` (no CSS framework). Routing is `react-router-dom`.

### Data flow: static content vs. persisted progress

The core design constraint: **question content and user progress are stored separately** so that editing the question bank never wipes a user's learning progress, and vice versa.

- `src/data/questions.js` — the static question bank. Exports `SKILLS` (the fixed list of 14 skill tags) and `questions` (an array built from an internal `rawQuestions` array via `createQuestion()`). **IDs are assigned by array position (`index + 1`), not randomly** — this is intentional: a random ID generated at module-load time would change on every page refresh and orphan all saved localStorage progress. This means reordering or deleting entries in `rawQuestions` shifts IDs and can disconnect existing progress; appending new entries at the end is always safe. See the comment block at the top of the file for the exact shape to copy when adding a question.
- `src/utils/storage.js` — thin localStorage read/write wrappers for two independent keys: per-question progress (`status`/`favorite`/`learnedCount`/`learnedGoal`) and filter state.
- `src/context/QuestionsContext.jsx` (`QuestionsProvider` / `useQuestions()`) — the single source of truth at runtime. On render it merges the static `questions` array with saved progress from localStorage, and **derives `status` from `learnedCount >= learnedGoal`** rather than trusting a stored status field, so the "Learned" badge can never drift out of sync with the count. Also owns filter state (`DEFAULT_FILTERS`, `setFilters`, `resetFilters`), persisted the same way.

### Shared behavior hooks

- `src/hooks/useQuestionActions.js` (`learn` / `repeat` / `toggleFavorite` / `canRepeat`) is the **only** place Learn/Repeat/Favorite logic is implemented. Both `QuestionCardMenu` (list view dropdown) and `QuestionActionsBar` (details page) call into this hook so the two surfaces can never diverge. `repeat` is only meaningful when `learnedCount > 0` (`canRepeat`); `learn` increments `learnedCount` capped at `learnedGoal`.
- `src/hooks/useFilteredQuestions.js` derives the visible list from `useQuestions()`'s `questions` + `filters`. The pure `filterQuestions(questions, filters)` export is reused directly by `QuestionDetailsPage` to compute Previous/Next order consistent with whatever filter was active on the list page.

### Pages and navigation

`App.jsx` wraps everything in `QuestionsProvider` + `BrowserRouter`, with a persistent `Sidebar` (`src/components/Sidebar.jsx`) and routed content in `src/pages/*`. Route structure mirrors the sidebar's nav groups (Training → Interview/Tasks, Knowledge base → Resources/Questions/Collections, plus Home and Analytics); question details live at `/knowledge-base/questions/:id`. Each page renders its own `Breadcrumbs` rather than deriving them from route config.

`src/utils/skillIcons.jsx` centralizes the skill → icon/color mapping (brand icons via `react-icons/si`, a couple of `lucide-react` fallbacks for CI/CD and Networks) — use `SKILL_META` / `<SkillIcon skill=... />` instead of adding new icon imports elsewhere.
