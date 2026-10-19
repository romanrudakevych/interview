import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { questions, makeQuestion } from "../../test/fixtures/questions.js";
import { filterQuestions, useFilteredQuestions } from "./useFilteredQuestions.js";
import {
  FILTER_DEFAULTS,
  setQuestions,
  questionsRef,
} from "../../test/helpers/mockContexts.js";

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef: ref } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => ref.current };
});

/** filterQuestions with only the named filters overridden. */
function filter(overrides, list = questions) {
  return filterQuestions(list, { ...FILTER_DEFAULTS, ...overrides }).map((q) => q.id);
}

describe("filterQuestions: no filters", () => {
  it("returns everything with the defaults", () => {
    expect(filter({})).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("returns a new array rather than the input", () => {
    expect(filterQuestions(questions, FILTER_DEFAULTS)).not.toBe(questions);
  });
});

describe("filterQuestions: query", () => {
  it("matches the question text, case-insensitively", () => {
    expect(filter({ query: "CLOSURE" })).toEqual([1]);
  });

  it("matches keywords as well as the text", () => {
    // "virtual dom" is only in id 4's keywords, not in its title.
    expect(filter({ query: "virtual dom" })).toEqual([4]);
  });

  it("matches a substring, not just a whole word", () => {
    // ids 3 and 5 say "React"; id 4 is also tagged React but its text says
    // "reconciliation", so a text search is not a skill search.
    expect(filter({ query: "eact" })).toEqual([3, 5]);
  });

  it("ignores surrounding whitespace", () => {
    expect(filter({ query: "   closure   " })).toEqual([1]);
  });

  it("treats a whitespace-only query as no query", () => {
    expect(filter({ query: "   " })).toHaveLength(questions.length);
  });

  it("returns nothing when nothing matches", () => {
    expect(filter({ query: "cobol" })).toEqual([]);
  });

  it("does not crash on a question with no keywords", () => {
    const list = [makeQuestion({ id: 99, question: "Bare", keywords: [] })];
    expect(filter({ query: "bare" }, list)).toEqual([99]);
  });
});

describe("filterQuestions: skills", () => {
  it("matches a single skill", () => {
    expect(filter({ skills: ["Git"] })).toEqual([7]);
  });

  it("is a union across several selected skills", () => {
    expect(filter({ skills: ["Git", "Docker"] })).toEqual([7, 8]);
  });

  it("matches a multi-skill question through either of its skills", () => {
    // id 5 is tagged React *and* TypeScript — the case that makes a question
    // reachable in a locale through a skill other than the one you translated.
    expect(filter({ skills: ["React"] })).toContain(5);
    expect(filter({ skills: ["TypeScript"] })).toContain(5);
  });

  it("ignores an unknown skill rather than matching everything", () => {
    expect(filter({ skills: ["Fortran"] })).toEqual([]);
  });
});

describe("filterQuestions: difficulty ranges", () => {
  it.each([
    ["1-3", [1, 8]],
    ["4-6", [2, 5, 7]],
    ["7-8", [3, 6]],
    ["9-10", [4]],
  ])("parses the %s range from its string form", (range, expected) => {
    expect(filter({ difficultyRanges: [range] })).toEqual(expected);
  });

  it("includes both ends of a range", () => {
    // id 8 is difficulty 3 and id 1 is 2 — the upper and lower edges of "1-3".
    expect(filter({ difficultyRanges: ["3-3"] })).toEqual([8]);
  });

  it("unions several ranges", () => {
    expect(filter({ difficultyRanges: ["1-3", "9-10"] })).toEqual([1, 4, 8]);
  });
});

describe("filterQuestions: ratings", () => {
  it("matches an exact rating", () => {
    expect(filter({ ratings: [5] })).toEqual([4, 7]);
  });

  it("unions several ratings", () => {
    expect(filter({ ratings: [1, 2] })).toEqual([1, 2, 8]);
  });
});

describe("filterQuestions: status and favorites", () => {
  it("filters to learned", () => {
    expect(filter({ status: "learned" })).toEqual([4]);
  });

  it("filters to not learned", () => {
    expect(filter({ status: "not_learned" })).toEqual([1, 2, 3, 5, 6, 7, 8]);
  });

  it("treats status 'all' as no filter", () => {
    expect(filter({ status: "all" })).toHaveLength(questions.length);
  });

  it("filters to favorites", () => {
    expect(filter({ favoriteOnly: true })).toEqual([3]);
  });
});

describe("filterQuestions: combinations", () => {
  it("ANDs every axis together", () => {
    // React, not learned, difficulty 7-8 — id 3 only (4 is learned, 5 is 6).
    expect(filter({ skills: ["React"], status: "not_learned", difficultyRanges: ["7-8"] })).toEqual([3]);
  });

  it("can produce an empty result from contradictory filters", () => {
    expect(filter({ skills: ["Git"], difficultyRanges: ["9-10"] })).toEqual([]);
  });
});

describe("useFilteredQuestions", () => {
  it("derives the list from the context's questions and filters", () => {
    setQuestions({ filters: { skills: ["Git"] } });
    const { result } = renderHook(() => useFilteredQuestions());
    expect(result.current.map((q) => q.id)).toEqual([7]);
  });

  it("recomputes when the filters change", () => {
    setQuestions({ filters: { skills: ["Git"] } });
    const { result, rerender } = renderHook(() => useFilteredQuestions());
    expect(result.current).toHaveLength(1);

    setQuestions({ filters: { skills: ["React"] } });
    rerender();
    expect(result.current.map((q) => q.id)).toEqual([3, 4, 5]);
  });

  it("returns a stable array while nothing changes, so consumers don't re-render", () => {
    setQuestions({});
    const { result, rerender } = renderHook(() => useFilteredQuestions());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
    expect(questionsRef.current.questions).toHaveLength(8);
  });

  it("returns an empty list while the index is still loading", () => {
    setQuestions({ questions: [], loading: true });
    const { result } = renderHook(() => useFilteredQuestions());
    expect(result.current).toEqual([]);
  });
});
