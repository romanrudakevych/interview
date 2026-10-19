import { describe, expect, it, vi } from "vitest";
import {
  loadProgress,
  saveProgress,
  loadFilters,
  saveFilters,
  loadTaskProgress,
  saveTaskProgress,
  loadTaskFilters,
  saveTaskFilters,
  loadResourceFilters,
  saveResourceFilters,
  loadLanguage,
  saveLanguage,
} from "./storage.js";

// The six keys, paired with their loader/saver. Keeping them in one table is
// what makes the "every loader degrades silently" contract testable as a rule
// rather than twelve near-identical tests.
const JSON_PAIRS = [
  { name: "progress", key: "interview-prep:progress", load: loadProgress, save: saveProgress, empty: {} },
  { name: "task progress", key: "interview-prep:tasks", load: loadTaskProgress, save: saveTaskProgress, empty: {} },
];

const FILTER_PAIRS = [
  { name: "question filters", key: "interview-prep:filters", load: loadFilters, save: saveFilters },
  { name: "task filters", key: "interview-prep:task-filters", load: loadTaskFilters, save: saveTaskFilters },
  { name: "resource filters", key: "interview-prep:resource-filters", load: loadResourceFilters, save: saveResourceFilters },
];

describe("storage keys", () => {
  it("keeps all six keys distinct", () => {
    saveProgress({ 1: { learnedCount: 1 } });
    saveTaskProgress({ 1: { solved: true } });
    saveFilters({ query: "q" });
    saveTaskFilters({ query: "t" });
    saveResourceFilters({ query: "r" });
    saveLanguage("cs");

    // Six writes, six keys — a shared key would show up as a shorter list, and
    // question/task filter shapes differ, so a collision would corrupt both.
    expect(Object.keys(localStorage).sort()).toEqual([
      "interview-prep:filters",
      "interview-prep:language",
      "interview-prep:progress",
      "interview-prep:resource-filters",
      "interview-prep:task-filters",
      "interview-prep:tasks",
    ]);
  });
});

describe.each(JSON_PAIRS)("$name", ({ key, load, save, empty }) => {
  it("round-trips through its own key", () => {
    save({ 7: { learnedCount: 2, favorite: true } });
    expect(localStorage.getItem(key)).toBe(JSON.stringify({ 7: { learnedCount: 2, favorite: true } }));
    expect(load()).toEqual({ 7: { learnedCount: 2, favorite: true } });
  });

  it("returns an empty object when nothing is stored", () => {
    expect(load()).toEqual(empty);
  });

  it("returns an empty object for malformed JSON instead of throwing", () => {
    localStorage.setItem(key, "{not json");
    expect(load).not.toThrow();
    expect(load()).toEqual(empty);
  });

  it("returns an empty object when getItem throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError: access denied");
    });
    expect(load).not.toThrow();
    expect(load()).toEqual(empty);
  });

  it("swallows a setItem failure so progress loss never breaks the app", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => save({ 1: {} })).not.toThrow();
  });
});

describe.each(FILTER_PAIRS)("$name", ({ key, load, save }) => {
  const defaults = { query: "", skills: [], extra: "default" };

  it("round-trips through its own key", () => {
    save({ query: "hooks" });
    expect(localStorage.getItem(key)).toBe(JSON.stringify({ query: "hooks" }));
  });

  it("returns the defaults object itself when nothing is stored", () => {
    expect(load(defaults)).toBe(defaults);
  });

  it("spreads saved state over the defaults, so a new filter key survives an old blob", () => {
    // The backward-compatibility guarantee: this blob predates `extra`.
    localStorage.setItem(key, JSON.stringify({ query: "old" }));
    expect(load(defaults)).toEqual({ query: "old", skills: [], extra: "default" });
  });

  it("falls back to the defaults for malformed JSON", () => {
    localStorage.setItem(key, "][");
    expect(load(defaults)).toEqual(defaults);
  });

  it("falls back to the defaults when getItem throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(load(defaults)).toEqual(defaults);
  });

  it("swallows a setItem failure", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => save({ query: "x" })).not.toThrow();
  });
});

describe("language", () => {
  it("stores a bare string, not JSON", () => {
    saveLanguage("uk");
    // Not '"uk"' — the provider reads it back without parsing.
    expect(localStorage.getItem("interview-prep:language")).toBe("uk");
    expect(loadLanguage()).toBe("uk");
  });

  it("returns null when unset, leaving the navigator fallback to the provider", () => {
    expect(loadLanguage()).toBeNull();
  });

  it("returns null when getItem throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(loadLanguage()).toBeNull();
  });

  it("swallows a setItem failure", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => saveLanguage("cs")).not.toThrow();
  });
});
