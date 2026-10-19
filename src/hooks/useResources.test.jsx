import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { resources as fixtures } from "../../test/fixtures/resources.js";
import {
  DEFAULT_RESOURCE_FILTERS,
  filterResources,
  useFilteredResources,
} from "./useResources.js";

function filter(overrides) {
  return filterResources(fixtures, { ...DEFAULT_RESOURCE_FILTERS, ...overrides }).map((r) => r.name);
}

describe("filterResources", () => {
  it("returns everything with the defaults", () => {
    expect(filter({})).toHaveLength(fixtures.length);
  });

  it("matches the name, case-insensitively", () => {
    expect(filter({ query: "FROGGY" })).toEqual(["Flexbox Froggy"]);
  });

  it("matches the description", () => {
    expect(filter({ query: "internals" })).toEqual(["You Don't Know JS"]);
  });

  it("matches the url, which neither questions nor tasks search on", () => {
    expect(filter({ query: "mozilla" })).toEqual(["MDN Web Docs"]);
  });

  it("treats a whitespace-only query as no query", () => {
    expect(filter({ query: " " })).toHaveLength(fixtures.length);
  });

  it("matches an exact type", () => {
    expect(filter({ types: ["Игра"] })).toEqual(["Flexbox Froggy"]);
  });

  it("unions several types", () => {
    expect(filter({ types: ["Игра", "Книга"] })).toEqual(["Flexbox Froggy", "You Don't Know JS"]);
  });

  it("matches any one of a resource's skills", () => {
    expect(filter({ skills: ["HTML"] })).toEqual(["MDN Web Docs"]);
  });

  it("excludes a resource with no skills when a skill filter is set", () => {
    expect(filter({ skills: ["CSS"] })).toEqual(["Flexbox Froggy"]);
  });

  it("ANDs the axes together", () => {
    expect(filter({ types: ["Игра"], skills: ["HTML"] })).toEqual([]);
  });
});

describe("useFilteredResources", () => {
  it("starts with the real bank unfiltered", () => {
    const { result } = renderHook(() => useFilteredResources());
    expect(result.current.resources).toHaveLength(result.current.total);
    expect(result.current.total).toBeGreaterThan(0);
  });

  it("keeps `total` at the unfiltered count while filtering", () => {
    const { result } = renderHook(() => useFilteredResources());
    const total = result.current.total;

    act(() => result.current.setFilters({ query: "a-query-that-matches-nothing-xyz" }));

    expect(result.current.resources).toHaveLength(0);
    // The sidebar shows "N of M" — M must not shrink with the filter.
    expect(result.current.total).toBe(total);
  });

  it("accepts both a patch and an updater function", () => {
    const { result } = renderHook(() => useFilteredResources());

    act(() => result.current.setFilters({ query: "mdn" }));
    expect(result.current.filters.query).toBe("mdn");

    act(() => result.current.setFilters((f) => ({ ...f, query: f.query.toUpperCase() })));
    expect(result.current.filters.query).toBe("MDN");
  });

  it("persists filters under its own key", () => {
    const { result } = renderHook(() => useFilteredResources());
    act(() => result.current.setFilters({ query: "docs" }));

    expect(JSON.parse(localStorage.getItem("interview-prep:resource-filters"))).toMatchObject({
      query: "docs",
    });
    // Never the question or task keys.
    expect(localStorage.getItem("interview-prep:filters")).toBeNull();
    expect(localStorage.getItem("interview-prep:task-filters")).toBeNull();
  });

  it("restores persisted filters on mount", () => {
    localStorage.setItem("interview-prep:resource-filters", JSON.stringify({ query: "mdn" }));
    const { result } = renderHook(() => useFilteredResources());
    expect(result.current.filters.query).toBe("mdn");
    // Spread over the defaults, so the keys it doesn't name are still present.
    expect(result.current.filters.types).toEqual([]);
  });

  it("resets back to the defaults", () => {
    const { result } = renderHook(() => useFilteredResources());
    act(() => result.current.setFilters({ query: "x", types: ["Игра"] }));
    act(() => result.current.resetFilters());
    expect(result.current.filters).toEqual(DEFAULT_RESOURCE_FILTERS);
  });
});
