// Splits the question bank into a light index + lazy-loadable answer chunks.
//
// `src/data/questions.js` stays the source of truth (append to `rawQuestions`,
// ids derived from array position). This script runs in Node only and is never
// bundled — that is what keeps the 11 MB file out of the client bundle.
//
// Wired to `predev` / `prebuild` in package.json so the output can never drift
// from the source. Output is gitignored.

import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { questions } from "../src/data/questions.js";

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

function pad(n) {
  return String(n).padStart(3, "0");
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(BODIES, { recursive: true });

  // Index: everything the app needs eagerly — filtering/search reads `question`
  // and `keywords`, analytics reads `skills` and `difficulty`.
  const index = questions.map((q) => ({
    id: q.id,
    question: q.question,
    skills: q.skills,
    keywords: q.keywords,
    difficulty: q.difficulty,
    rating: q.rating,
  }));
  await writeFile(join(OUT, "index.json"), JSON.stringify(index));

  // Bodies as tuples rather than objects — repeating four key names 3,361
  // times costs more than the data itself.
  let chunkCount = 0;
  for (let start = 0; start < questions.length; start += CHUNK_SIZE) {
    const rows = questions
      .slice(start, start + CHUNK_SIZE)
      .map((q) => [q.id, q.shortAnswer, q.longAnswer, q.codeExample ?? null]);
    await writeFile(join(BODIES, `${pad(chunkCount)}.json`), JSON.stringify(rows));
    chunkCount += 1;
  }

  // Ids are the join key for saved localStorage progress. If the generator ever
  // disagreed with the source, progress would silently attach to the wrong
  // questions, so fail loudly instead.
  const mismatch = index.findIndex((row, i) => row.id !== questions[i].id);
  if (mismatch !== -1) {
    throw new Error(`id mismatch at position ${mismatch}`);
  }

  await writeFile(
    join(OUT, "meta.json"),
    JSON.stringify({ chunkSize: CHUNK_SIZE, chunkCount, total: index.length })
  );

  console.log(
    `questions data: ${index.length} questions -> index.json + ${chunkCount} body chunks`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
