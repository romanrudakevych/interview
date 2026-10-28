import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

// Two halves:
//  1. the generated output on disk, checked for the invariants the client
//     depends on (ids, chunk boundaries, meta shape);
//  2. validate() against synthetic translation maps, which is the only way to
//     reach its four failure paths without corrupting a real locale file.
//
// Importing the generator pulls in the 11 MB question bank, so it happens once
// in beforeAll rather than per test.
const OUT = join(process.cwd(), "src/data/generated");
const LANGUAGES = ["ru", "cs", "en", "uk"];

let validate;
let questionsFor;
let questions;
let byId;
let meta;

beforeAll(async () => {
  ({ validate, questionsFor } = await import("../../scripts/build-questions-data.mjs"));
  ({ questions } = await import("../../src/data/questions.js"));
  byId = new Map(questions.map((q) => [q.id, q]));
  meta = JSON.parse(readFileSync(join(OUT, "meta.json"), "utf8"));
}, 60000);

const readIndex = (lang) => JSON.parse(readFileSync(join(OUT, `index.${lang}.json`), "utf8"));
const readChunk = (lang, file) =>
  JSON.parse(readFileSync(join(OUT, "bodies", lang, file), "utf8"));

describe("ids", () => {
  it("are array positions, with no gaps", () => {
    // The join key for saved localStorage progress. A gap or a reorder silently
    // reattaches a user's progress to different questions.
    expect(questions.map((q) => q.id)).toEqual(questions.map((_, i) => i + 1));
  });

  it("are unique", () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  });
});

describe("meta.json", () => {
  it("has the documented shape", () => {
    expect(meta).toEqual({
      chunkSize: expect.any(Number),
      languages: expect.any(Object),
    });
  });

  it("lists every language", () => {
    expect(Object.keys(meta.languages).sort()).toEqual([...LANGUAGES].sort());
  });

  it("records a total and a chunk list per language", () => {
    for (const lang of LANGUAGES) {
      expect(meta.languages[lang], lang).toEqual({
        total: expect.any(Number),
        chunks: expect.any(Array),
      });
    }
  });

  it("reports chunk lists that match the files on disk", () => {
    for (const lang of LANGUAGES) {
      const onDisk = readdirSync(join(OUT, "bodies", lang))
        .map((f) => Number(f.replace(".json", "")))
        .sort((a, b) => a - b);
      expect(meta.languages[lang].chunks, lang).toEqual(onDisk);
    }
  });

  it("is the single source of the chunk size the client reads back", () => {
    // questionBodies.js reads meta.chunkSize rather than redeclaring it.
    expect(meta.chunkSize).toBe(100);
  });
});

describe.each(LANGUAGES)("the %s index", (lang) => {
  it("agrees with the total in meta.json", () => {
    expect(readIndex(lang)).toHaveLength(meta.languages[lang].total);
  });

  it("carries only the eagerly-needed fields", () => {
    // Answer prose here would undo the whole point of the split.
    const shapes = new Set(readIndex(lang).map((row) => Object.keys(row).sort().join(",")));
    expect([...shapes]).toEqual(["difficulty,id,keywords,question,rating,skills"]);
  });

  it("uses ids that exist in the source bank", () => {
    const unknown = readIndex(lang).filter((row) => !byId.has(row.id));
    expect(unknown).toEqual([]);
  });

  it("is sorted by id", () => {
    const ids = readIndex(lang).map((r) => r.id);
    expect(ids).toEqual([...ids].sort((a, b) => a - b));
  });

  it("keeps the skills, difficulty and rating of the source question", () => {
    // Only prose is translated; the metadata must stay identical across
    // languages, or filtering would differ per locale. Collected into one
    // assertion rather than three per question — 3,367 ids x 4 languages is
    // enough expect() calls to dominate the suite's runtime.
    const drifted = readIndex(lang).filter((row) => {
      const source = byId.get(row.id);
      return (
        row.difficulty !== source.difficulty ||
        row.rating !== source.rating ||
        row.skills.join("|") !== source.skills.join("|")
      );
    });
    expect(drifted.map((r) => r.id)).toEqual([]);
  });
});

describe.each(LANGUAGES)("the %s bodies", (lang) => {
  it("puts every id in the chunk its global id dictates", () => {
    // Chunking is language-independent, which is what lets chunkIndexForId in
    // the client take no language argument.
    const misplaced = [];
    for (const file of readdirSync(join(OUT, "bodies", lang))) {
      const chunkIndex = Number(file.replace(".json", ""));
      for (const [id] of readChunk(lang, file)) {
        if (Math.floor((id - 1) / meta.chunkSize) !== chunkIndex) misplaced.push(`${file}:${id}`);
      }
    }
    expect(misplaced).toEqual([]);
  });

  it("covers exactly the ids in its index", () => {
    const inBodies = readdirSync(join(OUT, "bodies", lang))
      .flatMap((file) => readChunk(lang, file).map(([id]) => id))
      .sort((a, b) => a - b);
    expect(inBodies).toEqual(readIndex(lang).map((r) => r.id));
  });

  it("writes four-element tuples, not objects", () => {
    // Repeating four key names 3,367 times costs more than the data.
    const first = readChunk(lang, "000.json")[0];
    expect(Array.isArray(first)).toBe(true);
    expect(first).toHaveLength(4);
  });

  it("writes null, never undefined, for a missing code example", () => {
    const codeExamples = readChunk(lang, "000.json").map(([, , , code]) => code);
    expect(codeExamples.every((c) => c === null || typeof c === "string")).toBe(true);
  });
});

describe("questionsFor", () => {
  it("returns the source bank untouched for ru", () => {
    expect(questionsFor("ru")).toBe(questions);
  });

  it("merges translated prose for another language", () => {
    const [first] = questionsFor("en");
    const source = byId.get(first.id);
    expect(first.question).not.toBe(source.question);
    // Metadata comes from the source, prose from the translation.
    expect(first.skills).toEqual(source.skills);
    expect(first.shortAnswer).toBeTypeOf("string");
  });

  it("ships a question through whichever of its skills is claimed", () => {
    // ids 3362–3367 are tagged React *and* Next.js, and shipped with React
    // before Next.js was claimed.
    const ids = new Set(questionsFor("en").map((q) => q.id));
    for (const id of [3362, 3363, 3364, 3365, 3366, 3367]) {
      expect(ids.has(id), String(id)).toBe(true);
    }
  });
});

describe("validate: the drift guard", () => {
  /** A minimal well-formed entry for `id`, built from the real source text. */
  function entry(id, overrides = {}) {
    return {
      source: byId.get(id).question,
      question: "translated question",
      shortAnswer: "short",
      longAnswer: "long",
      ...overrides,
    };
  }

  it("accepts an entry whose source still matches", () => {
    expect(() => validate("xx", { 1: entry(1) }, ["HTML"], byId)).toThrow(
      // Coverage is incomplete here, which is a different complaint — the
      // source text itself passed.
      /claimed skill "HTML" is only/
    );
  });

  it("rejects an entry whose source text has drifted", () => {
    // Ids are array positions, so inserting a question above a translated block
    // silently reattaches its answers. This is the guard against that.
    expect(() =>
      validate("xx", { 1: entry(1, { source: "something else entirely" }) }, ["HTML"], byId)
    ).toThrow(/id 1 has drifted/);
  });

  it("names both texts in the drift message", () => {
    let message = "";
    try {
      validate("xx", { 1: entry(1, { source: "stale" }) }, ["HTML"], byId);
    } catch (error) {
      message = error.message;
    }
    expect(message).toContain("stale");
    expect(message).toContain(byId.get(1).question);
    expect(message).toContain("array positions");
  });

  it("rejects an id that does not exist in the bank", () => {
    expect(() => validate("xx", { 999999: entry(1) }, ["HTML"], byId)).toThrow(
      /id 999999 does not exist/
    );
  });

  it.each(["question", "shortAnswer", "longAnswer"])("rejects a missing %s", (field) => {
    expect(() => validate("xx", { 1: entry(1, { [field]: "" }) }, ["HTML"], byId)).toThrow(
      new RegExp(`id 1 is missing ${field}`)
    );
  });

  it("rejects a whitespace-only field", () => {
    expect(() => validate("xx", { 1: entry(1, { shortAnswer: "   " }) }, ["HTML"], byId)).toThrow(
      /missing shortAnswer/
    );
  });
});

describe("validate: the coverage rules", () => {
  function entry(id) {
    return {
      source: byId.get(id).question,
      question: "q",
      shortAnswer: "s",
      longAnswer: "l",
    };
  }

  it("rejects an empty translation file", () => {
    expect(() => validate("xx", {}, ["HTML"], byId)).toThrow(/translation file is empty/);
  });

  it("rejects empty coverage, which would ship nothing", () => {
    expect(() => validate("xx", { 1: entry(1) }, [], byId)).toThrow(/coverage is empty/);
  });

  it("rejects a skill that does not exist", () => {
    expect(() => validate("xx", { 1: entry(1) }, ["Fortran"], byId)).toThrow(
      /coverage lists unknown skill "Fortran"/
    );
  });

  it("rejects a partially translated claimed skill, and counts what is missing", () => {
    // Adding a 41st React Router question must break the build rather than let
    // it vanish from three locales.
    let message = "";
    try {
      validate("xx", { 1: entry(1) }, ["HTML"], byId);
    } catch (error) {
      message = error.message;
    }
    const htmlCount = questions.filter((q) => q.skills.includes("HTML")).length;
    expect(message).toMatch(new RegExp(`only 1/${htmlCount} translated`));
    expect(message).toContain("missing, starting at id");
    expect(message).toContain("drop");
  });

  it("accepts a fully translated claimed skill", () => {
    const html = questions.filter((q) => q.skills.includes("HTML"));
    const map = Object.fromEntries(html.map((q) => [q.id, entry(q.id)]));
    expect(() => validate("xx", map, ["HTML"], byId)).not.toThrow();
  });

  it("allows extra entries for unclaimed skills — those are staged, not shipped", () => {
    // How a half-finished section sits in the file without reaching a user.
    const html = questions.filter((q) => q.skills.includes("HTML"));
    const extra = questions.find((q) => !q.skills.includes("HTML"));
    const map = Object.fromEntries([...html, extra].map((q) => [q.id, entry(q.id)]));
    expect(() => validate("xx", map, ["HTML"], byId)).not.toThrow();
  });
});

describe("the real translation files", () => {
  it.each(["cs", "en", "uk"])("%s passes its own validation", async (lang) => {
    const mod = await import(`../../src/data/translations/${lang}.js`);
    expect(() => validate(lang, mod.default, mod.coverage, byId)).not.toThrow();
  });

  it.each(["cs", "en", "uk"])("%s claims every skill", async (lang) => {
    const { SKILLS } = await import("../../src/data/skills.js");
    const { coverage } = await import(`../../src/data/translations/${lang}.js`);
    expect([...coverage].sort()).toEqual([...SKILLS].sort());
  });

  it("gives every locale the whole bank", () => {
    for (const lang of LANGUAGES) {
      expect(meta.languages[lang].total, lang).toBe(questions.length);
    }
  });
});
