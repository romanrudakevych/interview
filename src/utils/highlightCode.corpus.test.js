import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { unescapeTokens } from "../../test/helpers/unescapeTokens.js";
import { highlightCode } from "./highlightCode.js";

// The corpus round-trip check CLAUDE.md mandates for any edit to
// highlightCode.js: "unescaping the output of all ~3,000 codeExamples must
// return the input byte-for-byte".
//
// It is the only guard against a tokenizer change that silently *drops*
// characters — a regex that consumes more than it emits produces plausible,
// colourful output and loses a chunk of the user's code. Unit tests on hostile
// inputs can't find that; a real corpus can.
//
// Reads the generated bodies directly rather than through import.meta.glob:
// this is a Node-side bulk read of 136 files, and the glob exists to make the
// *client* lazy, which is irrelevant here. Resolved from the Vitest root
// (= process.cwd()) because `import.meta.url` inside a transformed test module
// is a dev-server URL, not a file:// one.
const BODIES = join(process.cwd(), "src/data/generated/bodies");

function codeExamplesFor(lang) {
  const dir = join(BODIES, lang);
  const examples = [];
  for (const file of readdirSync(dir).sort()) {
    const chunk = JSON.parse(readFileSync(join(dir, file), "utf8"));
    // Tuples: [id, shortAnswer, longAnswer, codeExample | null]
    for (const [id, , , codeExample] of chunk) {
      if (codeExample) examples.push([id, codeExample]);
    }
  }
  return examples;
}

const LANGUAGES = readdirSync(BODIES);

describe("highlightCode round-trips the whole question corpus", () => {
  it("has a corpus to check", () => {
    expect(LANGUAGES.sort()).toEqual(["cs", "en", "ru", "uk"]);
  });

  it.each(LANGUAGES)("%s: every codeExample survives byte-for-byte", (lang) => {
    const examples = codeExamplesFor(lang);
    expect(examples.length).toBeGreaterThan(2000);

    // Collect every failure rather than stopping at the first: a tokenizer
    // regression usually hits a whole class of examples, and the count and
    // spread of ids is the useful signal.
    const broken = [];
    for (const [id, code] of examples) {
      // Auto-detection, exactly as CodeBlock calls it.
      if (unescapeTokens(highlightCode(code)) !== code) broken.push(id);
    }

    expect(broken, `ids whose code did not survive highlighting: ${broken.slice(0, 20).join(", ")}`)
      .toEqual([]);
  });

  it.each(LANGUAGES)("%s: every answer body is non-empty prose", (lang) => {
    // Cheap to fold in while the files are being read anyway: the generator
    // promises shortAnswer/longAnswer are present and trimmed-non-empty.
    const dir = join(BODIES, lang);
    const empty = [];
    for (const file of readdirSync(dir)) {
      for (const [id, shortAnswer, longAnswer] of JSON.parse(readFileSync(join(dir, file), "utf8"))) {
        if (!shortAnswer?.trim() || !longAnswer?.trim()) empty.push(id);
      }
    }
    expect(empty).toEqual([]);
  });
});
