# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR (defaults to http://localhost:5173)
- `npm run build` — production build (`vite build`); use this to check for compile errors
- `npm run build:data` — regenerate `src/data/generated/` from the question bank. Runs
  automatically via `predev`/`prebuild`, so you rarely invoke it directly.
- `npm run preview` — serve the production build locally
- `npm run lint` — run Oxlint (config: `.oxlintrc.json`, plugins `react` + `oxc`)

Requires Node 20.19+ / 22.12+ (Vite 8) — there is no `engines` field to enforce it.

There is no test suite configured in this project.

`npm run lint` currently emits pre-existing `react/only-export-components` warnings in
`src/context/QuestionsContext.jsx`, `src/context/TasksContext.jsx`, `src/utils/skillIcons.jsx`
and `src/i18n/index.jsx` (all intentionally export non-component values alongside a
provider/helpers). Don't try to "fix" these.

## Architecture

This is a client-only React 19 + Vite SPA (no backend) for interview-prep Q&A study, styled with a single global `src/index.css` (no CSS framework). Routing is `react-router-dom`.

### Data flow: static content vs. persisted progress

The core design constraint: **question content and user progress are stored separately** so that editing the question bank never wipes a user's learning progress, and vice versa.

- `src/data/questions.js` — the static question bank. Exports `SKILLS` (the fixed list of 14 skill tags) and `questions` (an array built from an internal `rawQuestions` array via `createQuestion()`). **IDs are assigned by array position (`index + 1`), not randomly** — this is intentional: a random ID generated at module-load time would change on every page refresh and orphan all saved localStorage progress. This means reordering or deleting entries in `rawQuestions` shifts IDs and can disconnect existing progress; appending new entries at the end is always safe. `rawQuestions.map()` also re-forces the progress fields (`status`/`favorite`/`learnedCount`/`learnedGoal`) to defaults, so any progress-like values in the data file are ignored.
- `src/utils/storage.js` — thin localStorage read/write wrappers for two independent keys (`interview-prep:progress`, `interview-prep:filters`). Every read/write is wrapped in try/catch and degrades silently (private mode, quota) — these functions never throw. `loadFilters` spreads saved state over the passed defaults, so adding a new filter key is backward-compatible.
- `src/context/QuestionsContext.jsx` (`QuestionsProvider` / `useQuestions()`) — the single source of truth at runtime. On render it merges the static `questions` array with saved progress from localStorage, and **derives `status` from `learnedCount >= learnedGoal`** rather than trusting a stored status field, so the "Learned" badge can never drift out of sync with the count. Also owns filter state: `DEFAULT_FILTERS` is `{ query, skills[], difficultyRanges[] (values `"1-3"|"4-6"|"7-8"|"9-10"`), ratings[] (1–5), status (`"all"|"learned"|"not_learned"`), favoriteOnly }`, persisted the same way.

### Question data is split at build time

`src/data/questions.js` is the **source of truth but is never bundled**. At ~11 MB it
would otherwise ship 2.7 MB gzipped to every visitor, so
`scripts/build-questions-data.mjs` (Node-only, run from `predev`/`prebuild`) splits it
into gitignored `src/data/generated/`:

- `index.json` — `id`, `question`, `skills`, `keywords`, `difficulty`, `rating` for all
  3,361 questions (~100 KB gz). Imported eagerly by `QuestionsContext`; this is all that
  filtering, search, Analytics, Home totals and Collections ever need.
- `bodies/000.json`…`033.json` — `shortAnswer`/`longAnswer`/`codeExample` as tuples, 100
  questions per chunk (~77 KB gz each), loaded on demand.
- `meta.json` — `{ chunkSize, chunkCount, total }`; the client reads `chunkSize` from
  here rather than redeclaring it, so the two can't drift.

Answers load through `useQuestionBody(id | null)`
(`src/hooks/useQuestionBody.js` + `src/utils/questionBodies.js`). Pass `null` to skip
fetching — that's how collapsed cards stay inert. Only three places render answers
(`QuestionCard`, `InterviewPage`, `QuestionDetailsPage`) and all are gated behind a user
action, so the fetch is invisible. **Question objects from `useQuestions()` have no
`shortAnswer`/`longAnswer`/`codeExample`** — reach for the hook instead.

The loader uses `import.meta.glob(...)` + dynamic `import()`: the only form Vite rewrites
for the `/interview/` base. A hand-built `fetch("/data/…")` would 404 on Pages, same trap
as the Web Worker URL.

Ids are the join key for saved localStorage progress, so the generator asserts its ids
match `questions[].id` position-for-position and fails the build otherwise.

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

The 202 tasks under `// ---- Импортировано из yeahub scrape (scrap-code-tasks) ----` came from
scraped pages that carry no test cases, so every suite there was written by hand against that
two-sided rule. A few of those pages state examples that contradict their own rules (a triangle
path that skips a row, an off-by-one silence interval) — the verified answer wins, and the
task's `description` is overridden in place when it does. `description` sections render
conditionally on the details page: an imported task may legitimately have no
`input`/`output`/`constraints`/`example`.

**`tasks.js` ships whole in the main bundle** (~1 MB raw / ~100 KB gz of the initial download)
because `TasksProvider` wraps the whole app in `App.jsx`, while only `TasksPage`,
`TaskDetailsPage`, `TaskFilterSidebar` and `useFilteredTasks` read it. It's now large enough to
deserve the same index + lazy-chunk treatment as the question bank (`scripts/build-questions-data.mjs`),
or at minimum a route-level split.

`src/components/CodeEditor.jsx` is a transparent `<textarea>` over a highlighted `<pre>` plus a
gutter — all three must keep identical font/size/line-height/padding (`.code-editor__*` in
`index.css`) or the caret drifts from the text. `src/utils/highlightCode.js` feeds
`dangerouslySetInnerHTML`, so its HTML-escaping is load-bearing; edit it with care.

### Syntax highlighting

`src/utils/highlightCode.js` is a hand-rolled tokenizer (no highlighting library) used by
both `CodeEditor` (`highlightJs`, JS only) and `CodeBlock` (`highlightCode(code, language)`,
which auto-detects between markup / CSS / JS). It emits `<span class="tok tok--…">` colored by
the shared palette near the end of `index.css`. Question `codeExample`s are a mix — ~2,600 JS
(286 with JSX), ~230 markup, ~130 CSS — so `detectLanguage` dispatches per block, and
`highlightMarkup` hands `<script>`/`<style>` bodies to the JS and CSS tokenizers.

**Every tokenizer escapes each token's text as it emits it and never concatenates raw source
into the output** — the output goes through `dangerouslySetInnerHTML` and the editor's input is
user-typed. Highlighting accuracy is best-effort; escaping is not. The `JSX_HINT` gate exists
for the same reason the tag pattern forbids a space after `<`: without it, `a<b && c>d` in
plain JS would read as a tag and yellow-out everything after it. When touching this file,
re-run the corpus round-trip check — unescaping the output of all ~3,000 `codeExample`s must
return the input byte-for-byte.

`CodeBlock` takes `language="text"` to opt out (used for a task's "Пример:" input/output prose,
which isn't source).

### Resources

`/knowledge-base/resources` lists 26 external learning materials (courses, books,
repositories, channels, games…) — the React Frontend Developer track of the yeahub
catalog, the same slice the questions and tasks came from.

`src/data/resources.js` is **generated** by `node scripts/import-resources.mjs`, which
pulls the public, unauthenticated catalog API
(`https://api.yeahub.ru/external-products/product?specializations=11`). It is deliberately
not wired into `predev`/`prebuild` — that would make every build need the network. Re-run
it by hand to refresh, and edit the script rather than the data file. `RESOURCE_TYPES` and
`RESOURCE_SKILLS` are derived from the resources actually present, so the sidebar can
never show a chip that matches nothing.

Ids are upstream UUIDs, not array positions — the opposite of the `questions.js` /
`tasks.js` rule, and safe here because the API assigns them and they survive a re-import.

There is no context provider and no progress: resources are read-only links, so
`src/hooks/useResources.js` is just the static bank plus filter state persisted under
`interview-prep:resource-filters`. `ResourceCard` hot-links thumbnails from the upstream
CDN and falls back to an initial-letter tile when one 404s.

### Interface language (i18n)

`src/i18n/` is a hand-rolled i18n layer — no library, matching the project's other
hand-rolled primitives. `LanguageProvider` wraps everything (outermost in `App.jsx`) and
`useI18n()` yields `{ lang, setLang, t }`. Four locales live in `src/i18n/locales/`
(`en`, `uk`, `ru`, `cs`) as flat dot-key maps, **kept in identical key order** so they diff
cleanly; `en.js` is the fallback catalogue and must stay complete. `t()` resolves
active locale → `en` → the key itself, so a missing key renders visibly as `filters.reset`
rather than blank.

Chrome and **question content** are translated separately — see "Translated question
content" below for the latter. Coding-task content (titles, descriptions, test names),
resource titles, and every data-derived chip label (`SKILLS`, `TASK_CATEGORIES`,
`TASK_LANGUAGES`, `RESOURCE_TYPES`) stay in their source language. The "Interview Prep"
brand name is likewise untranslated.

Three things to know before editing:

- **Inline code in a string uses backticks, not JSX.** `t("analytics.empty")` returns
  ``"… add questions to `questions.js` …"`` and is rendered through `FormattedText`, which
  already converts backticks to `<code class="inline-code">`. This keeps word order in the
  translator's hands.
- **Plural suffixes are opt-in by existence.** `t(key, { count })` only switches to
  `key.one`/`.few`/`.many` when those variants exist in a catalogue; otherwise `count` is an
  ordinary `{count}` placeholder. `tests.hiddenNote` is currently the one genuinely
  inflecting string — the rest are the "N of M" shape, where the Slavic noun doesn't inflect
  on the number. Czech and ru/uk use different three-form rules; see `pluralForm`.
- **The Web Worker can't reach React context.** `runner.worker.js` and `runCode.js`
  therefore report failures as `{ code, params }`, and `TestResults` calls
  `t(error.code, error.params)`. Never put display text in the worker.

Language choice persists under its own key (`interview-prep:language`, a bare string) via
`loadLanguage`/`saveLanguage`, falls back to a `navigator.language` prefix match, and syncs
`document.documentElement.lang`. The selector is `LanguageSelect` in the sidebar footer — a
native `<select>`, for free keyboard/screen-reader behavior.

### Translated question content

The same selector also switches **question content**. `ru` is the source bank
(`src/data/questions.js`, all 3,367 questions); `cs`, `en` and `uk` each carry translations
in `src/data/translations/<lang>.js`. **`cs` now claims all 14 skills and covers the whole
bank — 3,367 of 3,367 questions**. `en` claims **HTML** (ids 1–306), **CSS**
(ids 307–592), **React** (ids 2014–2750 and 3362–3367), **TypeScript**
(ids 1852–2013), **React Router** (ids 2751–2790) and **Networks**
(ids 3158–3361) — 1,741 questions; `uk` carries only the React Router block
(40 questions).

**A question with no translation is hidden, not fallen back.** Selecting `en` therefore
shows only its 1,741 questions and `uk` only its 40, and Home totals, Analytics and
Collections shrink to match; `ru` and `cs` both show the full bank. This is deliberate —
mixing languages in one list was the alternative. Because `cs` is now complete, adding a
question to `questions.js` breaks the Czech build until it is translated too (a claimed
skill must be 100 % covered), and adding an HTML, CSS, React, TypeScript, React
Router or Networks question now breaks the English build for the same reason.

- **Each translation file declares `coverage`**, a named list of skills it claims. A claimed
  skill must be 100 % translated or the build fails; entries for unclaimed skills are
  staged (reported by the generator) and excluded from the shipped data. That is how a
  half-finished skill block can sit in the file without ever reaching a user. A question
  tagged with several skills ships once any one of its skills is claimed, so a question can
  reach a locale through a skill other than the one you were translating (ids 3362–3367 are
  tagged React *and* Next.js, and shipped with the React block before Next.js was claimed).
- **Ids are the join key across languages and into localStorage progress.** They are array
  positions in `questions.js`, so each translation entry carries the Russian `source` text
  it was made from, and `scripts/build-questions-data.mjs` fails the build if that text no
  longer matches. It also fails if a *claimed* skill block is partially translated — adding
  a 41st React Router question forces you to translate it rather than letting it vanish from
  three locales.
- **Generated artifacts are per-language**: `index.<lang>.json` plus `bodies/<lang>/NNN.json`.
  Chunking still keys on the *global* id, so `chunkIndexForId` is language-independent and a
  sparse language simply writes fewer files (`uk` produces only `027.json`).
- **Three places must agree on the language or you serve stale prose**: the glob in
  `questionBodies.js` is two levels deep (`bodies/*/*.json`), its caches key on
  `` `${lang}:${chunk}` ``, and `useQuestionBody` tags its result `{ id, lang }` with
  `[id, lang]` deps.
- **The index is async.** `QuestionsContext` loads `index.<lang>.json` on demand and exposes
  `loading`; consumers that render an empty state (`QuestionListPage`, `HomePage`,
  `AnalyticsPage`, `CollectionsPage`, `QuestionDetailsPage`) must check it first or they
  flash "no questions" on every switch. `FilterSidebar` derives its skill chips from the
  loaded index for the same reason `ResourceFilterSidebar` does — a chip that matches
  nothing never renders.
- Translating `question` text is also what keeps **search** working: `useFilteredQuestions`
  substring-matches `question.question`, so a Czech user typing Czech finds Czech questions.

Some scraped React Router entries are imperfect: ids 2783–2786 are actually about **Vue
Router** despite their tag, and 2790's code example lost its JSX to the scraper (the
translations carry a reconstructed one). Translate faithfully; don't silently rewrite the
subject matter.

### Shared behavior hooks

- `src/hooks/useQuestionActions.js` (`learn` / `repeat` / `toggleFavorite` / `canRepeat`) is the **only** place Learn/Repeat/Favorite logic is implemented. Both `QuestionCardMenu` (list view dropdown) and `QuestionActionsBar` (details page) call into this hook so the two surfaces can never diverge. `repeat` is only meaningful when `learnedCount > 0` (`canRepeat`); `learn` increments `learnedCount` capped at `learnedGoal`.
- `src/hooks/useFilteredQuestions.js` derives the visible list from `useQuestions()`'s `questions` + `filters`. The pure `filterQuestions(questions, filters)` export is reused directly by `QuestionDetailsPage` to compute Previous/Next order consistent with whatever filter was active on the list page.

### Pages and navigation

`App.jsx` wraps everything in `QuestionsProvider` + `BrowserRouter`, with a persistent `Sidebar` (`src/components/Sidebar.jsx`) and routed content in `src/pages/*`. Route structure mirrors the sidebar's nav groups (Training → Interview/Tasks, Knowledge base → Resources/Questions/Collections, plus Home and Analytics); question details live at `/knowledge-base/questions/:id`. Each page renders its own `Breadcrumbs` rather than deriving them from route config.

`src/utils/skillIcons.jsx` centralizes the skill → icon/color mapping (brand icons via `react-icons/si`, a couple of `lucide-react` fallbacks for CI/CD and Networks) — use `SKILL_META` / `<SkillIcon skill=... />` instead of adding new icon imports elsewhere.
