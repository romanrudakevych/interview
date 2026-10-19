import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { tasks, makeTask } from "../../test/fixtures/tasks.js";
import { filterTasks, useFilteredTasks } from "./useFilteredTasks.js";
import { TASK_FILTER_DEFAULTS, setTasks } from "../../test/helpers/mockContexts.js";

vi.mock("../context/TasksContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { tasksRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useTasks: () => tasksRef.current };
});

function filter(overrides, list = tasks) {
  return filterTasks(list, { ...TASK_FILTER_DEFAULTS, ...overrides }).map((t) => t.id);
}

describe("filterTasks: query", () => {
  it("returns everything with the defaults", () => {
    expect(filter({})).toEqual([1, 2, 3, 4]);
  });

  it("matches the title, case-insensitively", () => {
    expect(filter({ query: "REVERSE" })).toEqual([2]);
  });

  it("matches a category as well as the title", () => {
    expect(filter({ query: "recursion" })).toEqual([4]);
  });

  it("treats a whitespace-only query as no query", () => {
    expect(filter({ query: "  " })).toHaveLength(tasks.length);
  });
});

describe("filterTasks: difficulty", () => {
  it("matches exact 1–5 values, not the range strings questions use", () => {
    // The documented divergence: a task filter holds numbers, a question
    // filter holds strings like "4-6". Sharing the constants would break both.
    expect(filter({ difficulties: [3] })).toEqual([2]);
    expect(filter({ difficulties: ["4-6"] })).toEqual([]);
  });

  it("unions several difficulties", () => {
    expect(filter({ difficulties: [1, 5] })).toEqual([1, 3]);
  });
});

describe("filterTasks: languages and categories", () => {
  it("matches a language", () => {
    expect(filter({ languages: ["JavaScript"] })).toEqual([1, 2, 3, 4]);
  });

  it("returns nothing for a language no task uses", () => {
    expect(filter({ languages: ["Python"] })).toEqual([]);
  });

  it("matches any one of a task's categories", () => {
    expect(filter({ categories: ["Loops"] })).toEqual([2]);
  });

  it("unions several categories", () => {
    expect(filter({ categories: ["Search", "Trees"] })).toEqual([3, 4]);
  });

  it("ANDs the axes together", () => {
    expect(filter({ categories: ["Strings"], difficulties: [1] })).toEqual([]);
  });

  it("handles a task with no categories", () => {
    const list = [makeTask({ id: 9, categories: [] })];
    expect(filter({}, list)).toEqual([9]);
    expect(filter({ categories: ["Arrays"] }, list)).toEqual([]);
  });
});

describe("useFilteredTasks", () => {
  it("derives the list from the context", () => {
    setTasks({ filters: { difficulties: [5] } });
    const { result } = renderHook(() => useFilteredTasks());
    expect(result.current.map((t) => t.id)).toEqual([3]);
  });

  it("memoises while nothing changes", () => {
    setTasks({});
    const { result, rerender } = renderHook(() => useFilteredTasks());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
