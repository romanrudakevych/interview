import meta from "../data/generated/meta.json";

// Lazy loader for question answer bodies.
//
// The index (id/title/skills/keywords/difficulty/rating) ships with the app;
// the prose — shortAnswer, longAnswer, codeExample — is 2.5 MB gzipped and is
// fetched a chunk at a time, only when something actually renders an answer.
//
// `import.meta.glob` is the form Vite can statically analyse: it emits each
// chunk as its own hashed asset and rewrites the URLs for the `/interview/`
// base. A hand-built fetch("/data/…") string would 404 on GitHub Pages.
const chunkLoaders = import.meta.glob("../data/generated/bodies/*.json");

// Caching the in-flight *promise* means concurrent requests for the same chunk
// fetch once; the separate resolved map lets callers read a already-loaded body
// synchronously and skip the loading flash entirely.
const pending = new Map(); // chunkIndex -> Promise<Map<id, body>>
const resolved = new Map(); // chunkIndex -> Map<id, body>

function chunkIndexForId(id) {
  return Math.floor((id - 1) / meta.chunkSize);
}

function loadChunk(chunkIndex) {
  const done = resolved.get(chunkIndex);
  if (done) return Promise.resolve(done);

  const inFlight = pending.get(chunkIndex);
  if (inFlight) return inFlight;

  const key = `../data/generated/bodies/${String(chunkIndex).padStart(3, "0")}.json`;
  const loader = chunkLoaders[key];
  if (!loader) return Promise.reject(new Error(`Нет чанка ответов: ${key}`));

  const promise = loader()
    .then((mod) => {
      const rows = mod.default ?? mod;
      const map = new Map(
        rows.map(([id, shortAnswer, longAnswer, codeExample]) => [
          id,
          { shortAnswer, longAnswer, codeExample: codeExample ?? undefined },
        ])
      );
      resolved.set(chunkIndex, map);
      pending.delete(chunkIndex);
      return map;
    })
    .catch((error) => {
      // Don't cache a failure — a later retry should be able to succeed.
      pending.delete(chunkIndex);
      throw error;
    });

  pending.set(chunkIndex, promise);
  return promise;
}

/** Resolves { shortAnswer, longAnswer, codeExample } for one question id. */
export async function loadQuestionBody(id) {
  const chunk = await loadChunk(chunkIndexForId(id));
  return chunk.get(id) ?? null;
}

/** The body if its chunk is already in memory, else null. Never triggers a fetch. */
export function peekQuestionBody(id) {
  return resolved.get(chunkIndexForId(id))?.get(id) ?? null;
}
