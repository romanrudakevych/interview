import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LOCALES, LanguageProvider, useI18n } from "./index.jsx";
import en from "./locales/en.js";

function wrapper({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function mount({ lang, navigatorLanguage } = {}) {
  if (lang) localStorage.setItem("interview-prep:language", lang);
  if (navigatorLanguage !== undefined) {
    vi.spyOn(navigator, "language", "get").mockReturnValue(navigatorLanguage);
  }
  return renderHook(() => useI18n(), { wrapper });
}

afterEach(() => {
  document.documentElement.lang = "en";
});

describe("LOCALES", () => {
  it("lists the four locales, each labelled in its own language", () => {
    expect(LOCALES).toEqual([
      { code: "en", label: "English" },
      { code: "uk", label: "Українська" },
      { code: "ru", label: "Русский" },
      { code: "cs", label: "Čeština" },
    ]);
  });
});

describe("choosing the initial language", () => {
  it("prefers a saved preference", () => {
    const { result } = mount({ lang: "cs", navigatorLanguage: "en-US" });
    expect(result.current.lang).toBe("cs");
  });

  it("ignores an unsupported saved value", () => {
    const { result } = mount({ lang: "zz", navigatorLanguage: "ru-RU" });
    expect(result.current.lang).toBe("ru");
  });

  it("matches the browser on the two-letter prefix", () => {
    const { result } = mount({ navigatorLanguage: "uk-UA" });
    expect(result.current.lang).toBe("uk");
  });

  it("is case-insensitive about the browser value", () => {
    const { result } = mount({ navigatorLanguage: "CS-CZ" });
    expect(result.current.lang).toBe("cs");
  });

  it("falls back to English for an unsupported browser language", () => {
    const { result } = mount({ navigatorLanguage: "de-DE" });
    expect(result.current.lang).toBe("en");
  });

  it("falls back to English when the browser reports nothing", () => {
    const { result } = mount({ navigatorLanguage: undefined });
    expect(result.current.lang).toBe("en");
  });
});

describe("setLang", () => {
  it("switches language", () => {
    const { result } = mount({ lang: "en" });
    act(() => result.current.setLang("ru"));
    expect(result.current.lang).toBe("ru");
  });

  it("rejects an unsupported code instead of blanking the interface", () => {
    const { result } = mount({ lang: "en" });
    act(() => result.current.setLang("zz"));
    expect(result.current.lang).toBe("en");
  });

  it("persists the choice as a bare string", () => {
    const { result } = mount({ lang: "en" });
    act(() => result.current.setLang("uk"));
    expect(localStorage.getItem("interview-prep:language")).toBe("uk");
  });

  it("syncs document.documentElement.lang", () => {
    // index.html hardcodes lang="en"; screen readers and hyphenation follow
    // this attribute, so it has to track the choice.
    const { result } = mount({ lang: "en" });
    expect(document.documentElement.lang).toBe("en");

    act(() => result.current.setLang("cs"));
    expect(document.documentElement.lang).toBe("cs");
  });

  it("keeps a stable identity across renders", () => {
    const { result, rerender } = mount({ lang: "en" });
    const first = result.current.setLang;
    rerender();
    expect(result.current.setLang).toBe(first);
  });
});

describe("t: resolution", () => {
  it("returns the active locale's string", () => {
    const { result } = mount({ lang: "cs" });
    expect(result.current.t("filters.reset")).toBe("Zrušit");
  });

  it("returns the key itself for an unknown key", () => {
    // Deliberate: a missing translation shows as "filters.nope" in review
    // rather than rendering blank.
    const { result } = mount({ lang: "en" });
    expect(result.current.t("filters.nope")).toBe("filters.nope");
  });

  // Note: the active -> en step of the chain can't be triggered with the real
  // catalogues, because all four are complete — which locales.test.js asserts.
  // That completeness is the reason the fallback never fires in practice.

  it("re-resolves when the language changes", () => {
    const { result } = mount({ lang: "en" });
    expect(result.current.t("filters.reset")).toBe("Reset");

    act(() => result.current.setLang("ru"));
    expect(result.current.t("filters.reset")).toBe("Сбросить");
  });
});

describe("t: interpolation", () => {
  it("substitutes named placeholders", () => {
    const { result } = mount({ lang: "en" });
    expect(result.current.t("analytics.summary", { learned: 2, total: 10, percent: 20 })).toBe(
      "Learned 2 of 10 questions (20%)"
    );
  });

  it("stringifies non-string values", () => {
    const { result } = mount({ lang: "en" });
    expect(result.current.t("questions.position", { current: 1, total: 2 })).toBe("1 of 2");
  });

  it("leaves an unsupplied placeholder intact rather than printing undefined", () => {
    const { result } = mount({ lang: "en" });
    expect(result.current.t("questions.position", { current: 1 })).toBe("1 of {total}");
  });

  it("substitutes a value of 0", () => {
    // Object.hasOwn, not truthiness — "0 of 10" must not come out as "{learned} of 10".
    const { result } = mount({ lang: "en" });
    expect(result.current.t("analytics.summary", { learned: 0, total: 10, percent: 0 })).toBe(
      "Learned 0 of 10 questions (0%)"
    );
  });

  it("returns the template untouched when no vars are passed", () => {
    const { result } = mount({ lang: "en" });
    expect(result.current.t("questions.position")).toBe("{current} of {total}");
  });
});

describe("t: plurals", () => {
  it("selects a variant only when the key has them", () => {
    const { result } = mount({ lang: "en" });
    // The variant is selected *and* {count} is still interpolated into it.
    expect(result.current.t("tests.hiddenNote", { count: 1 })).toBe(
      en["tests.hiddenNote.one"].replace("{count}", "1")
    );
    expect(result.current.t("tests.hiddenNote", { count: 3 })).toBe(
      en["tests.hiddenNote.many"].replace("{count}", "3")
    );
  });

  it("treats count as an ordinary placeholder when there are no variants", () => {
    // progress.questionLearned reads "{count} of {goal}" and doesn't inflect;
    // plural suffixes are opt-in by existence precisely so this keeps working.
    const { result } = mount({ lang: "en" });
    expect(result.current.t("progress.questionLearned", { count: 1, goal: 3 })).toBe(
      "Question learned 1 of 3"
    );
  });

  it.each([
    ["en", 1, "one"],
    ["en", 0, "many"],
    ["en", 2, "many"],
    ["en", 21, "many"],
    ["cs", 1, "one"],
    ["cs", 2, "few"],
    ["cs", 4, "few"],
    ["cs", 5, "many"],
    ["cs", 0, "many"],
    ["cs", 21, "many"],
    ["ru", 1, "one"],
    ["ru", 21, "one"],
    ["ru", 101, "one"],
    ["ru", 11, "many"],
    ["ru", 111, "many"],
    ["ru", 2, "few"],
    ["ru", 23, "few"],
    ["ru", 12, "many"],
    ["ru", 14, "many"],
    ["ru", 5, "many"],
    ["ru", 0, "many"],
    ["uk", 1, "one"],
    ["uk", 2, "few"],
    ["uk", 11, "many"],
  ])("%s picks the %i -> %s form", async (lang, count, form) => {
    const catalogue = (await import(`./locales/${lang}.js`)).default;
    const { result } = mount({ lang });
    expect(result.current.t("tests.hiddenNote", { count })).toBe(
      catalogue[`tests.hiddenNote.${form}`].replace("{count}", String(count))
    );
  });

  it("ignores a non-numeric count", () => {
    const { result } = mount({ lang: "en" });
    // Not a number, so no variant lookup — the base key is missing, so the key
    // itself comes back.
    expect(result.current.t("tests.hiddenNote", { count: "3" })).toBe("tests.hiddenNote");
  });
});

describe("useI18n outside a provider", () => {
  it("throws rather than returning undefined", () => {
    expect(() => renderHook(() => useI18n())).toThrow(/within a LanguageProvider/);
  });
});
