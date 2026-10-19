import { describe, expect, it } from "vitest";
import cs from "./locales/cs.js";
import en from "./locales/en.js";
import ru from "./locales/ru.js";
import uk from "./locales/uk.js";

const CATALOGUES = { en, uk, ru, cs };
const EN_KEYS = Object.keys(en);

describe("catalogue parity", () => {
  it.each(Object.keys(CATALOGUES))("%s has exactly the same keys as en, in the same order", (lang) => {
    // Identical *order* is the documented rule, not just identical sets: it is
    // what keeps a four-file translation diff readable.
    expect(Object.keys(CATALOGUES[lang])).toEqual(EN_KEYS);
  });

  it("has a non-empty en catalogue to compare against", () => {
    expect(EN_KEYS.length).toBeGreaterThan(100);
  });
});

describe.each(Object.entries(CATALOGUES))("%s values", (lang, catalogue) => {
  it("are all non-empty strings", () => {
    const bad = Object.entries(catalogue).filter(([, v]) => typeof v !== "string" || !v.trim());
    expect(bad.map(([k]) => k)).toEqual([]);
  });

  it("contain no JSX or HTML tags", () => {
    // Inline code is written with backticks and rendered through
    // FormattedText — markup in a string would reach the DOM as literal text.
    const withMarkup = Object.entries(catalogue)
      .filter(([, v]) => /<\/?[a-z][\s\S]*>/i.test(v))
      .map(([k]) => k);
    expect(withMarkup).toEqual([]);
  });

  it("have balanced backticks", () => {
    const unbalanced = Object.entries(catalogue)
      .filter(([, v]) => (v.match(/`/g) ?? []).length % 2 !== 0)
      .map(([k]) => k);
    expect(unbalanced).toEqual([]);
  });

  it("use the same placeholders as the en original", () => {
    // A dropped {count} silently renders a sentence with a hole in it.
    const placeholders = (value) => (value.match(/\{(\w+)\}/g) ?? []).sort();
    const mismatched = EN_KEYS.filter(
      (key) =>
        JSON.stringify(placeholders(catalogue[key])) !== JSON.stringify(placeholders(en[key]))
    );
    expect(mismatched).toEqual([]);
  });

  it("have a complete set of plural variants wherever one exists", () => {
    const bases = new Set(
      Object.keys(catalogue)
        .filter((k) => /\.(one|few|many)$/.test(k))
        .map((k) => k.replace(/\.(one|few|many)$/, ""))
    );

    for (const base of bases) {
      // ru/uk and cs all need three forms; en only uses one/many but carries
      // few too, so the rule is uniform.
      for (const form of ["one", "few", "many"]) {
        expect(catalogue, `${lang}: ${base}.${form}`).toHaveProperty(`${base}.${form}`);
      }
      // The base key must NOT exist, or plural selection would never kick in.
      expect(catalogue).not.toHaveProperty(base);
    }
  });
});

describe("worker error codes", () => {
  it("has a string for every code runCode and the worker can report", () => {
    // The worker can't reach React context, so it reports { code, params } and
    // TestResults translates it. A missing key here renders as "run.timeout".
    for (const code of [
      "run.compileError",
      "run.functionNotFound",
      "run.timeout",
      "run.workerFailed",
      "run.executionError",
      "run.executionErrorDetail",
    ]) {
      expect(en, code).toHaveProperty(code);
    }
  });
});
