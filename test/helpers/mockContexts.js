// Shared mutable refs for the context/hook doubles used by component and page
// tests.
//
// Why doubles at all: QuestionsContext and TasksContext keep their context
// objects module-private, so there is no way to inject a value through the real
// provider. The real providers get their own tests
// (src/context/*.test.jsx) against the real generated data; everything above
// them is tested against these fixtures, so a page test fails for a reason in
// the page.
//
// Usage — the vi.mock call has to be written out in each test file, because
// Vitest hoists it above the imports:
//
//   vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
//     const actual = await importOriginal();
//     const { questionsRef } = await import("../../test/helpers/mockContexts.js");
//     return { ...actual, useQuestions: () => questionsRef.current };
//   });
//
// then call setQuestions(...) in the test body.

import { vi } from "vitest";
import { questions as questionFixtures } from "../fixtures/questions.js";
import { tasks as taskFixtures } from "../fixtures/tasks.js";

// The filter defaults are copied here rather than imported from the context
// modules: those are the modules being mocked, and importing them from inside
// the mock factory's dependency graph deadlocks the loader. Drift is caught by
// the "matches the real DEFAULT_FILTERS" tests in
// src/context/QuestionsContext.test.jsx and TasksContext.test.jsx.
export const FILTER_DEFAULTS = {
  query: "",
  skills: [],
  difficultyRanges: [],
  ratings: [],
  status: "all",
  favoriteOnly: false,
};

export const TASK_FILTER_DEFAULTS = {
  query: "",
  difficulties: [],
  languages: [],
  categories: [],
};

export const questionsRef = { current: null };
export const tasksRef = { current: null };
export const bodyRef = { current: null };

/** Builds (and installs) a QuestionsContext value. Returns it for assertions. */
export function setQuestions({
  questions = questionFixtures,
  loading = false,
  filters = {},
  updateProgress = vi.fn(),
  setFilters = vi.fn(),
  resetFilters = vi.fn(),
} = {}) {
  questionsRef.current = {
    questions,
    loading,
    filters: { ...FILTER_DEFAULTS, ...filters },
    updateProgress,
    setFilters,
    resetFilters,
  };
  return questionsRef.current;
}

/** Builds (and installs) a TasksContext value. Returns it for assertions. */
export function setTasks({
  tasks = taskFixtures,
  filters = {},
  updateTaskProgress = vi.fn(),
  setFilters = vi.fn(),
  resetFilters = vi.fn(),
} = {}) {
  tasksRef.current = {
    tasks,
    filters: { ...TASK_FILTER_DEFAULTS, ...filters },
    updateTaskProgress,
    setFilters,
    resetFilters,
  };
  return tasksRef.current;
}

/**
 * Builds (and installs) a useQuestionBody result. `calls` records the ids the
 * hook was asked for, which is how a test proves a collapsed card fetches
 * nothing (the hook is called with null).
 */
export function setBody({ body = null, loading = false, error = null } = {}) {
  bodyRef.current = { body, loading, error, calls: [] };
  return bodyRef.current;
}

/** The replacement for useQuestionBody; records every id it is called with. */
export function useQuestionBodyDouble(id) {
  bodyRef.current.calls.push(id);
  const { body, loading, error } = bodyRef.current;
  // Mirror the real hook: a null id is never loading and never has a body.
  if (id == null) return { body: null, loading: false, error: null };
  return { body, loading, error };
}
