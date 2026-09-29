import meta from "../data/generated/meta.json";

// Lazy loader for question answer bodies, per language.
//
// The index (id/title/skills/keywords/difficulty/rating) ships with the app;
// the prose — shortAnswer, longAnswer, codeExample — is 2.5 MB gzipped and is
// fetched a chunk at a time, only when something actually renders an answer.
//
// `import.meta.glob` is the form Vite can statically analyse: it emits each
// chunk as its own hashed asset and rewrites the URLs for the `/interview/`
// base. A hand-built fetch("/data/…") string would 404 on GitHub Pages.
// The pattern is two levels deep because chunks are grouped by language.
const chunkLoaders = import.meta.glob("../data/generated/bodies/*/*.json");

// Caching the in-flight *promise* means concurrent requests for the same chunk
// fetch once; the separate resolved map lets callers read an already-loaded body
// synchronously and skip the loading flash entirely.
//
// Both are keyed by `${lang}:${chunkIndex}` — keying on the chunk alone would
// serve the previous language's prose after a switch.
const pending = new Map(); // key -> Promise<Map<id, body>>
const resolved = new Map(); // key -> Map<id, body>

// Chunking is on the *global* id, identically for every language, so this needs
// no language argument: a sparse language simply has fewer chunk files.
function chunkIndexForId(id) {
  return Math.floor((id - 1) / meta.chunkSize);
}

function cacheKey(lang, chunkIndex) {
  return `${lang}:${chunkIndex}`;
}

function loadChunk(lang, chunkIndex) {
  const key = cacheKey(lang, chunkIndex);

  const done = resolved.get(key);
  if (done) return Promise.resolve(done);

  const inFlight = pending.get(key);
  if (inFlight) return inFlight;

  const path = `../data/generated/bodies/${lang}/${String(chunkIndex).padStart(3, "0")}.json`;
  const loader = chunkLoaders[path];
  if (!loader) return Promise.reject(new Error(`Нет чанка ответов: ${path}`));

  const promise = loader()
    .then((mod) => {
      const rows = mod.default ?? mod;
      const map = new Map(
        rows.map(([id, shortAnswer, longAnswer, codeExample]) => [
          id,
          { shortAnswer, longAnswer, codeExample: codeExample ?? undefined },
        ])
      );
      resolved.set(key, map);
      pending.delete(key);
      return map;
    })
    .catch((error) => {
      // Don't cache a failure — a later retry should be able to succeed.
      pending.delete(key);
      throw error;
    });

  pending.set(key, promise);
  return promise;
}

/** Resolves { shortAnswer, longAnswer, codeExample } for one question id. */
export async function loadQuestionBody(id, lang) {
  const chunk = await loadChunk(lang, chunkIndexForId(id));
  return chunk.get(id) ?? null;
}

/** The body if its chunk is already in memory, else null. Never triggers a fetch. */
export function peekQuestionBody(id, lang) {
  return resolved.get(cacheKey(lang, chunkIndexForId(id)))?.get(id) ?? null;
}
