// Splits the question bank into a light index + lazy-loadable answer chunks,
// once per language.
//
// `src/data/questions.js` stays the source of truth for the Russian original
// (append to `rawQuestions`, ids derived from array position). Translations
// live in `src/data/translations/<lang>.js`, keyed by that same id. This script
// runs in Node only and is never bundled — that is what keeps the 11 MB file
// out of the client bundle.
//
// Wired to `predev` / `prebuild` in package.json so the output can never drift
// from the source. Output is gitignored.

import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { questions } from "../src/data/questions.js";
import * as cs from "../src/data/translations/cs.js";
import * as en from "../src/data/translations/en.js";
import * as uk from "../src/data/translations/uk.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src/data/generated");
const BODIES = join(OUT, "bodies");

// 100 questions/chunk measured best: 34 chunks, ~77 KB gzipped average.
// Bucketing by id (not skill) keeps Previous/Next inside an already-loaded
// chunk and avoids a single 1.1 MB "JavaScript" mega-chunk.
//
// The client reads this value back from the generated meta.json rather than
// redeclaring it — this module must never be imported by client code, since
// importing it would run the generator.
const CHUNK_SIZE = 100;

// `ru` is the source bank itself, so it has no translation map. Every other
// language ships only the questions it actually covers; a question with no
// translation is absent from that language's index and is therefore hidden in
// the UI rather than falling back to Russian.
//
// Each module exports `coverage` (the skills it claims) alongside its entries.
// Only claimed skills are emitted, which is what lets a large section be
// translated over several sittings without a half-done block reaching the UI.
const TRANSLATIONS = { cs, en, uk };
const SOURCE_LANG = "ru";

function pad(n) {
  return String(n).padStart(3, "0");
}

/**
 * Fails the build when a translation file has drifted out of alignment with
 * `questions.js`.
 *
 * Ids are array positions, so inserting a question above a translated block
 * would silently attach its answers to a different question. Each translation
 * entry therefore carries the Russian `source` text it was made from, and it
 * must still match. We also require a translated skill block to be *complete*:
 * adding a 41st React Router question should fail the build rather than let it
 * quietly vanish from every non-Russian locale.
 */
function validate(lang, map, coverage, byId) {
  const ids = Object.keys(map).map(Number).sort((a, b) => a - b);
  if (ids.length === 0) throw new Error(`${lang}: translation file is empty`);
  if (coverage.length === 0) throw new Error(`${lang}: coverage is empty — nothing would ship`);

  for (const id of ids) {
    const source = byId.get(id);
    if (!source) throw new Error(`${lang}: id ${id} does not exist in questions.js`);

    const entry = map[id];
    if (entry.source !== source.question) {
      throw new Error(
        `${lang}: id ${id} has drifted — questions.js now reads\n` +
          `  ${JSON.stringify(source.question)}\n` +
          `but the translation was made from\n  ${JSON.stringify(entry.source)}\n` +
          `Re-check the ids: they are array positions and shift when entries are inserted.`
      );
    }
    for (const field of ["question", "shortAnswer", "longAnswer"]) {
      if (!entry[field]?.trim()) throw new Error(`${lang}: id ${id} is missing ${field}`);
    }
  }

  // A claimed skill must be complete. An unclaimed one may be partial — those
  // entries are staged, not shipped.
  const translated = new Set(ids);
  for (const skill of coverage) {
    const inSkill = questions.filter((q) => q.skills.includes(skill));
    if (inSkill.length === 0) throw new Error(`${lang}: coverage lists unknown skill "${skill}"`);

    const missing = inSkill.filter((q) => !translated.has(q.id)).map((q) => q.id);
    if (missing.length > 0) {
      throw new Error(
        `${lang}: claimed skill "${skill}" is only ${inSkill.length - missing.length}/${inSkill.length} ` +
          `translated — ${missing.length} missing, starting at id ${missing[0]}. Finish it, or drop ` +
          `"${skill}" from this file's \`coverage\` until it is done.`
      );
    }
  }
}

/** The questions available in `lang`, with translated prose merged in. */
function questionsFor(lang) {
  if (lang === SOURCE_LANG) return questions;
  const { default: map, coverage } = TRANSLATIONS[lang];
  const claimed = new Set(coverage);
  return questions
    .filter((q) => map[q.id] && q.skills.some((s) => claimed.has(s)))
    .map((q) => ({ ...q, ...map[q.id] }));
}

async function writeLanguage(lang) {
  const rows = questionsFor(lang);

  // Index: everything the app needs eagerly — filtering/search reads `question`
  // and `keywords`, analytics reads `skills` and `difficulty`.
  const index = rows.map((q) => ({
    id: q.id,
    question: q.question,
    skills: q.skills,
    keywords: q.keywords,
    difficulty: q.difficulty,
    rating: q.rating,
  }));
  await writeFile(join(OUT, `index.${lang}.json`), JSON.stringify(index));

  // Bodies as tuples rather than objects — repeating four key names 3,367
  // times costs more than the data itself. Chunking stays keyed on the global
  // id (not each language's position), so chunkIndexForId in the client is
  // identical for every language and a sparse language simply writes fewer
  // files: `cs` produces only bodies/cs/027.json.
  const buckets = new Map();
  for (const q of rows) {
    const chunk = Math.floor((q.id - 1) / CHUNK_SIZE);
    if (!buckets.has(chunk)) buckets.set(chunk, []);
    buckets.get(chunk).push([q.id, q.shortAnswer, q.longAnswer, q.codeExample ?? null]);
  }

  await mkdir(join(BODIES, lang), { recursive: true });
  for (const [chunk, tuples] of buckets) {
    await writeFile(join(BODIES, lang, `${pad(chunk)}.json`), JSON.stringify(tuples));
  }

  return { total: index.length, chunks: [...buckets.keys()].sort((a, b) => a - b) };
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(BODIES, { recursive: true });

  const byId = new Map(questions.map((q) => [q.id, q]));
  for (const [lang, mod] of Object.entries(TRANSLATIONS)) {
    validate(lang, mod.default, mod.coverage, byId);
  }

  // Ids are the join key for saved localStorage progress. If the generator ever
  // disagreed with the source, progress would silently attach to the wrong
  // questions, so fail loudly instead.
  const mismatch = questions.findIndex((q, i) => q.id !== i + 1);
  if (mismatch !== -1) throw new Error(`id mismatch at position ${mismatch}`);

  const languages = {};
  for (const lang of [SOURCE_LANG, ...Object.keys(TRANSLATIONS)]) {
    languages[lang] = await writeLanguage(lang);
  }

  await writeFile(join(OUT, "meta.json"), JSON.stringify({ chunkSize: CHUNK_SIZE, languages }));

  const summary = Object.entries(languages)
    .map(([lang, { total, chunks }]) => `${lang} ${total}q/${chunks.length}ch`)
    .join(", ");
  console.log(`questions data: ${summary}`);

  // Surface work in progress so a half-finished section isn't forgotten.
  for (const [lang, mod] of Object.entries(TRANSLATIONS)) {
    const claimed = new Set(mod.coverage);
    const staged = Object.keys(mod.default)
      .map(Number)
      .filter((id) => !byId.get(id)?.skills.some((s) => claimed.has(s)));
    if (staged.length > 0) {
      const skills = [...new Set(staged.flatMap((id) => byId.get(id).skills))].join(", ");
      console.log(`  ${lang}: ${staged.length} staged entries not yet shipped (${skills})`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
