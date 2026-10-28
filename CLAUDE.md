# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR (defaults to http://localhost:5173)
- `npm run build` — production build (`vite build`); use this to check for compile errors
- `npm run build:data` — regenerate `src/data/generated/` from the question bank. Runs
  automatically via `predev`/`prebuild`, so you rarely invoke it directly.
- `npm run preview` — serve the production build locally
- `npm run lint` — run Oxlint (config: `.oxlintrc.json`, plugins `react` + `oxc`)
- `npm test` — run the whole suite once (`pretest` regenerates the split data first)
- `npm run test:watch` — re-run affected tests on change
- `npm run test:coverage` — coverage report; **fails below the thresholds** in
  `vitest.config.js`
- `npm run test:coverage:worker` — coverage for `src/workers/` alone (see below)

Each of the four test scripts has its own `pre*` hook running `build:data`, because
npm only fires `pre<exact script name>` — `pretest` alone would leave
`test:coverage` failing on a clean checkout.

`.github/workflows/ci.yml` runs lint, `test:coverage`, `test:coverage:worker` and
the production build on every push to `master` and every pull request (Node 22.x).
Lint is gated on errors, not warnings: the 7 documented
`react/only-export-components` warnings are intentional, so `--deny-warnings`
would fail the build today.

Requires Node 20.19+ / 22.12+ to build and run the app (Vite 8), declared in
`engines`. **The test suite needs 22.12+** — a higher floor than the app, because
`vitest`, `jsdom` and `@testing-library/jest-dom` all drop Node 20. Don't
"simplify" the two bounds into one: CI runs the suite on 22.x and builds on
20.19 precisely to keep both honest.

## Tests

**Vitest, not Jest** — 949 tests in 46 files, co-located as `src/**/*.test.{js,jsx}`
plus `test/scripts/` for the two Node scripts. The runner choice is forced:
`questionBodies.js` and `QuestionsContext.jsx` read their data through
`import.meta.glob`, and `runCode.js` builds its worker with
`new Worker(new URL(..., import.meta.url))`. Those are Vite constructs with no
runtime meaning elsewhere, so `vitest.config.js` merges the real `vite.config.js`
and all three modules are tested as written rather than mocked away. The API is
Jest-compatible (`describe`/`it`/`expect`/`vi.fn`), so don't let the filenames
mislead you into reaching for Jest.

Things to know before adding a test:

- **Never import `src/data/questions.js` from a test** — it is 11 MB and Node-only.
  Use `test/fixtures/questions.js`, whose eight entries span every filter axis
  (two skills plus a multi-skill entry, all four difficulty buckets, ratings 1–5,
  one favourite, one learned). `test/fixtures/tasks.js` and `resources.js` do the
  same for the other two banks. The exception is `test/scripts/`, which tests the
  generator and therefore must load the real bank — that import alone costs ~6 s,
  which is why it happens once in a `beforeAll`.
- **Contexts are tested for real, everything above them is not.**
  `QuestionsContext.jsx` and `TasksContext.jsx` have their own suites running the
  real providers against the real generated data — that is where the
  `import.meta.glob` load, the progress merge and the status derivation are
  exercised. Components and pages instead mock `useQuestions`/`useTasks`/
  `useQuestionBody` through `test/helpers/mockContexts.js`, so a page test fails
  for a reason in the page. The `vi.mock` block has to be written out in each
  file (Vitest hoists it), and that helper **must not import the context modules
  it stands in for** — that cycle deadlocks the loader, which is why it keeps its
  own copy of the filter defaults, guarded by a parity test in each context's suite.
- **The corpus round-trip check is now automated.** `highlightCode.corpus.test.js`
  unescapes the output of every `codeExample` in all four languages (~13,000
  blocks) and asserts it equals the input byte-for-byte. Run it after any edit to
  `highlightCode.js`: unit tests on hostile inputs can't catch a regex that eats
  characters, and a corpus can.
- **`src/workers/runner.worker.js` is excluded from the main coverage report.** It
  is loaded twice — directly by its own suite (which covers it 100%) and again
  through `@vitest/web-worker` in `runCode.test.js`, whose barely-exercised copy
  is what the merged report keeps. Measure it with `npm run test:coverage:worker`.
  For the same reason `runCode`'s timeout and transport-failure paths live in
  `runCode.timeout.test.js`: `@vitest/web-worker` installs a non-configurable
  global `Worker` that `vi.stubGlobal` cannot displace, and it runs the worker on
  the same thread, so an infinite loop would hang the run instead of tripping the
  2 s timeout.
- `test/setup.js` raises testing-library's `asyncUtilTimeout` to 10 s. The real
  provider imports a ~650 KB language index, which under coverage instrumentation
  and 46 parallel files intermittently outran the 1 s default.

`npm run lint` currently emits pre-existing `react/only-export-components` warnings in
`src/context/QuestionsContext.jsx`, `src/context/TasksContext.jsx`, `src/utils/skillIcons.jsx`
and `src/i18n/index.jsx` (all intentionally export non-component values alongside a
provider/helpers). Don't try to "fix" these.

## Architecture

This is a client-only React 19 + Vite SPA (no backend) for interview-prep Q&A study, styled with a single global `src/index.css` (no CSS framework). Routing is `react-router-dom`.

### Data flow: static content vs. persisted progress

The core design constraint: **question content and user progress are stored separately** so that editing the question bank never wipes a user's learning progress, and vice versa.

- `src/data/questions.js` — the static question bank. Exports `SKILLS` (the fixed list of 15 skill tags) and `questions` (an array built from an internal `rawQuestions` array via `createQuestion()`). **IDs are assigned by array position (`index + 1`), not randomly** — this is intentional: a random ID generated at module-load time would change on every page refresh and orphan all saved localStorage progress. This means reordering or deleting entries in `rawQuestions` shifts IDs and can disconnect existing progress; appending new entries at the end is always safe. `rawQuestions.map()` also re-forces the progress fields (`status`/`favorite`/`learnedCount`/`learnedGoal`) to defaults, so any progress-like values in the data file are ignored.
- `src/utils/storage.js` — thin localStorage read/write wrappers for two independent keys (`interview-prep:progress`, `interview-prep:filters`). Every read/write is wrapped in try/catch and degrades silently (private mode, quota) — these functions never throw. `loadFilters` spreads saved state over the passed defaults, so adding a new filter key is backward-compatible.
- `src/context/QuestionsContext.jsx` (`QuestionsProvider` / `useQuestions()`) — the single source of truth at runtime. On render it merges the static `questions` array with saved progress from localStorage, and **derives `status` from `learnedCount >= learnedGoal`** rather than trusting a stored status field, so the "Learned" badge can never drift out of sync with the count. Also owns filter state: `DEFAULT_FILTERS` is `{ query, skills[], difficultyRanges[] (values `"1-3"|"4-6"|"7-8"|"9-10"`), ratings[] (1–5), status (`"all"|"learned"|"not_learned"`), favoriteOnly }`, persisted the same way.

### Question data is split at build time

`src/data/questions.js` is the **source of truth but is never bundled**. At ~11 MB it
would otherwise ship 2.7 MB gzipped to every visitor, so
`scripts/build-questions-data.mjs` (Node-only, run from `predev`/`prebuild`) splits it
into gitignored `src/data/generated/`:

- `index.<lang>.json` — `id`, `question`, `skills`, `keywords`, `difficulty`, `rating`
  for all 3,524 questions (~100 KB gz per language). Imported eagerly by
  `QuestionsContext`; this is all that filtering, search, Analytics, Home totals and
  Collections ever need.
- `bodies/<lang>/000.json`…`035.json` — `shortAnswer`/`longAnswer`/`codeExample` as
  tuples, 100 questions per chunk (~78 KB gz each), loaded on demand.
- `meta.json` — `{ chunkSize, languages: { <lang>: { total, chunks } } }`, where `chunks`
  lists the chunk indices that language actually wrote. `questionBodies.js` reads
  `meta.chunkSize` rather than redeclaring it, so the two can't drift.

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

The generator runs `main()` only when invoked as a script
(`process.argv[1] === fileURLToPath(import.meta.url)`) and exports `validate` and
`questionsFor`, so `test/scripts/build-questions-data.test.mjs` can drive the drift
and coverage rules against synthetic translation maps. Importing the module must stay
side-effect-free — don't move that guard.

### Editing the question bank

`src/data/questions.js` is ~13k lines. `rawQuestions` is split into per-skill blocks with banner comments (`// ---- <Skill> ----`) in `SKILLS` order; the large blocks under `// ---- Импортировано из внешнего скрейпа ... ----` markers (React, TypeScript, Git) are bulk-imported and dominate the file. When adding a question for a skill, append it at the **end of that skill's block**; appending at the very end of `rawQuestions` is safest for ID stability. The Russian comment block at the top of the file is the canonical "shape of one question" reference — copy it from there.

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

The 202 tasks under `// ---- Импортировано из внешнего скрейпа (scrap-code-tasks) ----` came from
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
repositories, channels, games…) — the React Frontend Developer track of an upstream
catalog, the same slice the questions and tasks came from.

`src/data/resources.js` is **generated** by `node scripts/import-resources.mjs`, which
pulls a paginated catalog API. **The endpoint is not in the repo** — the script reads it
from `RESOURCES_API_URL` or `argv[2]` and exits with a usage message otherwise, so a
re-import needs whoever runs it to supply the URL. It is deliberately not wired into
`predev`/`prebuild` — that would make every build need the network. Re-run it by hand to
refresh, and edit the script rather than the data file. `RESOURCE_TYPES` and
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
(`src/data/questions.js`, all 3,524 questions); `cs`, `en` and `uk` each carry translations
in `src/data/translations/<lang>.js`. **All three claim all 15 skills and cover the whole
bank — 3,524 of 3,524 questions each**, so every locale now shows every question.

**A question with no translation is hidden, not fallen back** — the mechanism still
matters even though nothing is currently hidden, because it is what a partially translated
skill would do. Mixing languages in one list was the alternative. Since every locale is
complete, **adding a question to `questions.js` breaks the Czech, English *and* Ukrainian
builds until it is translated in each** (a claimed skill must be 100 % covered), whatever
skill it is tagged with.

- **Each translation file declares `coverage`**, a named list of skills it claims. A claimed
  skill must be 100 % translated or the build fails; entries for unclaimed skills are
  staged (reported by the generator) and excluded from the shipped data. That is how a
  half-finished skill block can sit in the file without ever reaching a user. A question
  tagged with several skills ships once any one of its skills is claimed, so a question can
  reach a locale through a skill other than the one you were translating (ids 3362–3367 are
  tagged React *and* Next.js, and shipped with the React block before Next.js was claimed —
  so claiming Next.js later needed only its own 30 ids, 2791–2820).
- **Ids are the join key across languages and into localStorage progress.** They are array
  positions in `questions.js`, so each translation entry carries the Russian `source` text
  it was made from, and `scripts/build-questions-data.mjs` fails the build if that text no
  longer matches. It also fails if a *claimed* skill block is partially translated — adding
  a 41st React Router question forces you to translate it rather than letting it vanish from
  three locales.
- **Generated artifacts are per-language**: `index.<lang>.json` plus `bodies/<lang>/NNN.json`.
  Chunking still keys on the *global* id, so `chunkIndexForId` is language-independent and a
  sparse language simply writes fewer files — no locale is sparse today, but one that
  claimed only, say, Networks would write just the chunks its ids fall in.
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

**Node.js** (ids 3368–3524) is the newest block and the only one written by hand rather
than scraped. It deliberately holds adjacent back-end topics too — Express.js middleware
(3384–3387), databases/SQL (3392–3397) and web basics — CORS, REST methods, DNS
(3398–3401) —, NestJS (3433–3434), core JavaScript and Web Workers (3435–3448),
microservices architecture (3449–3452), CI, Docker and deployment strategies
(3453–3455) and web security (3456–3460) under the Node.js tag rather than skills of their own. The block is appended after id 3367, so it sits last in `rawQuestions` and
last in `SKILLS`. Ids 3383 (`string` vs
`String`) and 3444 (abstract class vs interface) are really TypeScript questions and are
tagged with both skills, so they also list under TypeScript.

Some scraped entries are imperfect. React Router ids 2783–2786 are actually about **Vue
Router** despite their tag, and Redux ids 2887–2888 are about **Vuex** (they name it, and
use `this.$store.commit`). The CI/CD block is only loosely about CI/CD: ids 3076–3088 are
an **Apache Airflow** primer and 3071–3072 are about **Agile process**. Several code
examples lost characters to the scraper — JSX in 2790, 2810, 2895 and 2811, string
literals in 3050, 3056, 3066 and 3087 — and the translations carry reconstructed ones.
Translate faithfully; don't silently rewrite the subject matter.

The **JavaScript** block (ids 593–1851, 1,259 questions — a third of the bank) is the worst
of the scraped lot and worth knowing before you touch it:

- **It is only loosely about JavaScript.** Long stretches are Python, Java, C#, C/C++,
  Swift/iOS, Kotlin/Android, TypeScript, React, Redux, SQL or process questions that merely
  arrived under the JavaScript tag. The translations keep each example in its source
  language rather than porting it to JS.
- **Heavy duplication.** The event loop is re-covered 15+ times; retry mechanisms four times
  (1720, 1723, 1731, 1732); FSD five times (1749, 1760, 1765, 1766, 1769); `Promise.all`
  fan-out five times (1618, 1635, 1636, 1644, 1710); string interning twice (1805, 1809);
  stack/LIFO and queue/FIFO twice each; and ids 1349–1356 are eight consecutive
  `Array.prototype.some` questions.
- **Some answers are simply wrong, and were translated as-is.** 1413 and 1414 answer a
  different question than they ask (both repeat the setTimeout/ECMAScript answer of
  1410–1412); 1649 claims a Python `set` preserves insertion order; 1677 claims
  `Promise.all` returns results in completion order; 1732 advises against retrying
  idempotent operations; 1800 says `every` returns `false` for an empty array. Flag such
  entries rather than silently correcting the prose.
- **Scraper damage is dense**: stripped JSX (30+ blocks), eaten `"n` inside JSON string
  literals, eaten `\n`/`\s`/`\.` escapes, eaten Java/TS generics, eaten Swift string
  interpolation backslashes, eaten shell line continuations and eaten ASCII-art backslashes.
  All of these were reconstructed in `en.js`; expect the same in any other locale.

### Shared behavior hooks

- `src/hooks/useQuestionActions.js` (`learn` / `repeat` / `toggleFavorite` / `canRepeat`) is the **only** place Learn/Repeat/Favorite logic is implemented. Both `QuestionCardMenu` (list view dropdown) and `QuestionActionsBar` (details page) call into this hook so the two surfaces can never diverge. `repeat` is only meaningful when `learnedCount > 0` (`canRepeat`); `learn` increments `learnedCount` capped at `learnedGoal`.
- `src/hooks/useFilteredQuestions.js` derives the visible list from `useQuestions()`'s `questions` + `filters`. The pure `filterQuestions(questions, filters)` export is reused directly by `QuestionDetailsPage` to compute Previous/Next order consistent with whatever filter was active on the list page.

### Pages and navigation

`App.jsx` wraps everything in `QuestionsProvider` + `BrowserRouter`, with a persistent `Sidebar` (`src/components/Sidebar.jsx`) and routed content in `src/pages/*`. Route structure mirrors the sidebar's nav groups (Training → Interview/Tasks, Knowledge base → Resources/Questions/Collections, plus Home and Analytics); question details live at `/knowledge-base/questions/:id`. Each page renders its own `Breadcrumbs` rather than deriving them from route config.

`src/utils/skillIcons.jsx` centralizes the skill → icon/color mapping (brand icons via `react-icons/si`, a couple of `lucide-react` fallbacks for CI/CD and Networks) — use `SKILL_META` / `<SkillIcon skill=... />` instead of adding new icon imports elsewhere.
