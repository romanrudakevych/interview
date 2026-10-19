import { beforeEach, describe, expect, it, vi } from "vitest";

// The module keeps two process-wide caches (`pending` and `resolved`), so every
// test starts from a fresh copy. Without this, a test asserting "peek returns
// null before load" would pass or fail depending on file order.
async function freshModule() {
  vi.resetModules();
  return import("./questionBodies.js");
}

let loadQuestionBody;
let peekQuestionBody;

beforeEach(async () => {
  ({ loadQuestionBody, peekQuestionBody } = await freshModule());
});

describe("loadQuestionBody", () => {
  it("resolves the tuple as a named body object", async () => {
    const body = await loadQuestionBody(1, "ru");
    expect(body).toEqual({
      shortAnswer: expect.any(String),
      longAnswer: expect.any(String),
      codeExample: expect.any(String),
    });
    expect(body.shortAnswer.length).toBeGreaterThan(0);
  });

  it("turns a null codeExample into undefined, not null", async () => {
    // The generator writes `null` for "no example"; the UI tests truthiness, so
    // the loader normalises it. id 7 has no code example in the ru bank.
    const body = await loadQuestionBody(7, "ru");
    expect(body.codeExample).toBeUndefined();
    expect("codeExample" in body).toBe(true);
  });

  it("rejects for an id below the 1-based range rather than guessing a chunk", async () => {
    // Ids are array positions starting at 1, so chunkIndexForId(0) is -1 and no
    // such chunk file exists. Documented here because the arithmetic silently
    // produces a path ("0-1.json") rather than validating its input.
    await expect(loadQuestionBody(0, "ru")).rejects.toThrow(/Нет чанка ответов/);
  });

  // Note: the `chunk.get(id) ?? null` branch — chunk present, id absent from it
  // — is unreachable today, because every locale covers the whole bank. It
  // exists for a sparse locale, which is a state the project can return to.

  it.each([
    [1, "ids 1–100 land in chunk 000"],
    [100, "the upper boundary stays in chunk 000"],
    [101, "101 crosses into chunk 001"],
    [3367, "the last id resolves"],
  ])("maps id %i to a chunk that exists (%s)", async (id) => {
    await expect(loadQuestionBody(id, "ru")).resolves.not.toBeNull();
  });

  it("rejects when the chunk file does not exist", async () => {
    // Beyond the bank: chunk 9999 was never written.
    await expect(loadQuestionBody(999999, "ru")).rejects.toThrow(/Нет чанка ответов/);
  });

  it("rejects for an unknown language rather than serving another one's prose", async () => {
    await expect(loadQuestionBody(1, "de")).rejects.toThrow(/bodies\/de\//);
  });

  it("does not cache a rejection, so a retry can still succeed", async () => {
    await expect(loadQuestionBody(999999, "ru")).rejects.toThrow();
    // The failure must not have poisoned `pending` for that key.
    await expect(loadQuestionBody(999999, "ru")).rejects.toThrow();
    await expect(loadQuestionBody(1, "ru")).resolves.not.toBeNull();
  });

  it("shares one in-flight load between concurrent callers", async () => {
    // Same id twice, concurrently. Each load builds its own Map, so two loads
    // would hand back two distinct body objects; one shared promise gives the
    // identical object.
    const [a, b] = await Promise.all([loadQuestionBody(1, "ru"), loadQuestionBody(1, "ru")]);
    expect(a).toBe(b);
  });

  it("serves a second id in the same chunk from the resolved cache", async () => {
    const first = await loadQuestionBody(1, "ru");
    const again = await loadQuestionBody(1, "ru");
    expect(again).toBe(first);
  });
});

describe("peekQuestionBody", () => {
  it("returns null before the chunk is loaded", () => {
    expect(peekQuestionBody(1, "ru")).toBeNull();
  });

  it("never triggers a fetch of its own", async () => {
    expect(peekQuestionBody(1, "ru")).toBeNull();
    // Give any accidental promise a chance to resolve.
    await Promise.resolve();
    await Promise.resolve();
    expect(peekQuestionBody(1, "ru")).toBeNull();
  });

  it("returns the body once its chunk is in memory", async () => {
    const loaded = await loadQuestionBody(1, "ru");
    expect(peekQuestionBody(1, "ru")).toBe(loaded);
  });

  it("returns a sibling id from an already-loaded chunk without a fetch", async () => {
    await loadQuestionBody(1, "ru");
    // 2 shares chunk 000 with 1 — this is what makes expanding a second card
    // show no loading state at all.
    expect(peekQuestionBody(2, "ru")).not.toBeNull();
  });

  it("returns null for an id in a chunk that has not been loaded", async () => {
    await loadQuestionBody(1, "ru");
    expect(peekQuestionBody(101, "ru")).toBeNull();
  });
});

describe("language is part of the cache key", () => {
  it("does not serve one language's chunk for another", async () => {
    await loadQuestionBody(1, "cs");
    // Same id, same chunk index — only the language differs. Keying the cache
    // on the chunk alone would serve Czech prose to an English reader.
    expect(peekQuestionBody(1, "en")).toBeNull();
  });

  it("keeps both languages cached independently", async () => {
    const cs = await loadQuestionBody(1, "cs");
    const en = await loadQuestionBody(1, "en");
    expect(cs.shortAnswer).not.toBe(en.shortAnswer);
    expect(peekQuestionBody(1, "cs")).toBe(cs);
    expect(peekQuestionBody(1, "en")).toBe(en);
  });
});

describe("chunk size", () => {
  it("is read from the generated meta rather than redeclared", async () => {
    const meta = (await import("../data/generated/meta.json")).default;
    // If the loader hard-coded a size, these two ids would not be the first of
    // their respective chunks and one of the loads would miss.
    expect(meta.chunkSize).toBe(100);
    await expect(loadQuestionBody(meta.chunkSize, "ru")).resolves.not.toBeNull();
    await expect(loadQuestionBody(meta.chunkSize + 1, "ru")).resolves.not.toBeNull();
  });
});
