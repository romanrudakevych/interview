import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TASK_FILTER_DEFAULTS } from "../../test/helpers/mockContexts.js";
import { tasks as staticTasks } from "../data/tasks.js";
import { DEFAULT_TASK_FILTERS, TasksProvider, useTasks } from "./TasksContext.jsx";

// The real provider against the real task bank. Unlike questions, tasks are
// bundled synchronously, so there is no loading state to wait for.
function wrapper({ children }) {
  return <TasksProvider>{children}</TasksProvider>;
}

function mount() {
  return renderHook(() => useTasks(), { wrapper });
}

const FIRST = staticTasks[0];

describe("DEFAULT_TASK_FILTERS", () => {
  it("has its own shape, not the question filters' shape", () => {
    expect(DEFAULT_TASK_FILTERS).toEqual({
      query: "",
      difficulties: [],
      languages: [],
      categories: [],
    });
    // No difficultyRanges / ratings / status / favoriteOnly: reusing the
    // question filter key would corrupt both sides.
    expect(DEFAULT_TASK_FILTERS).not.toHaveProperty("difficultyRanges");
  });

  it("matches the copy the test helpers use", () => {
    expect(TASK_FILTER_DEFAULTS).toEqual(DEFAULT_TASK_FILTERS);
  });
});

describe("the bank", () => {
  it("exposes every static task", () => {
    const { result } = mount();
    expect(result.current.tasks).toHaveLength(staticTasks.length);
    expect(result.current.tasks.length).toBeGreaterThan(200);
  });

  it("assigns ids by array position", () => {
    const { result } = mount();
    expect(result.current.tasks.map((t) => t.id)).toEqual(
      staticTasks.map((_, i) => i + 1)
    );
  });

  it("keeps task difficulty in the 1–5 range, not questions' 1–10", () => {
    const { result } = mount();
    for (const task of result.current.tasks) {
      expect(task.difficulty, task.title).toBeGreaterThanOrEqual(1);
      expect(task.difficulty, task.title).toBeLessThanOrEqual(5);
    }
  });
});

describe("status derivation", () => {
  it("is not_started with no saved progress", () => {
    const { result } = mount();
    expect(result.current.tasks[0].status).toBe("not_started");
  });

  it("is in_progress once saved code differs from the starter", () => {
    localStorage.setItem(
      "interview-prep:tasks",
      JSON.stringify({ 1: { code: `${FIRST.starterCode}// edited`, solved: false } })
    );
    const { result } = mount();
    expect(result.current.tasks[0].status).toBe("in_progress");
  });

  it("stays not_started when saved code is identical to the starter", () => {
    // Opening a task and typing nothing must not mark it started.
    localStorage.setItem(
      "interview-prep:tasks",
      JSON.stringify({ 1: { code: FIRST.starterCode, solved: false } })
    );
    const { result } = mount();
    expect(result.current.tasks[0].status).toBe("not_started");
  });

  it("stays not_started when code is null", () => {
    localStorage.setItem("interview-prep:tasks", JSON.stringify({ 1: { code: null, solved: false } }));
    const { result } = mount();
    expect(result.current.tasks[0].status).toBe("not_started");
  });

  it("is solved whenever the solved flag is set, whatever the code says", () => {
    localStorage.setItem(
      "interview-prep:tasks",
      JSON.stringify({ 1: { code: FIRST.starterCode, solved: true } })
    );
    const { result } = mount();
    expect(result.current.tasks[0].status).toBe("solved");
  });

  it("ignores a stored status field entirely", () => {
    // Derive, don't trust — the same rule as questions.
    localStorage.setItem(
      "interview-prep:tasks",
      JSON.stringify({ 1: { status: "solved", code: null, solved: false } })
    );
    const { result } = mount();
    expect(result.current.tasks[0].status).toBe("not_started");
  });
});

describe("updateTaskProgress", () => {
  it("accepts an updater function", () => {
    const { result } = mount();

    act(() => result.current.updateTaskProgress(1, (p) => ({ ...p, solved: true })));

    expect(result.current.tasks[0].status).toBe("solved");
  });

  it("accepts a patch object", () => {
    const { result } = mount();

    act(() => result.current.updateTaskProgress(1, { code: "edited" }));

    expect(result.current.tasks[0].code).toBe("edited");
    expect(result.current.tasks[0].status).toBe("in_progress");
  });

  it("starts from the task's own defaults", () => {
    const { result } = mount();

    act(() => result.current.updateTaskProgress(1, (p) => ({ ...p, code: `${p.code}x` })));

    // `code` defaults to the task's own (null) value, not undefined.
    expect(result.current.tasks[0].code).toBe("nullx");
  });

  it("ignores an unknown id rather than inventing a task", () => {
    const { result } = mount();
    const before = result.current.tasks;

    act(() => result.current.updateTaskProgress(999999, { solved: true }));

    expect(result.current.tasks).toBe(before);
    expect(localStorage.getItem("interview-prep:tasks")).toBe("{}");
  });

  it("leaves other tasks untouched", () => {
    const { result } = mount();

    act(() => result.current.updateTaskProgress(1, { solved: true }));

    expect(result.current.tasks[1].status).toBe("not_started");
  });

  it("persists to the task key, never the question keys", () => {
    const { result } = mount();

    act(() => result.current.updateTaskProgress(1, { solved: true }));

    expect(JSON.parse(localStorage.getItem("interview-prep:tasks"))).toMatchObject({
      1: { solved: true },
    });
    expect(localStorage.getItem("interview-prep:progress")).toBeNull();
    expect(localStorage.getItem("interview-prep:filters")).toBeNull();
  });
});

describe("filters", () => {
  it("starts from the defaults and restores a saved blob", () => {
    const fresh = mount();
    expect(fresh.result.current.filters).toEqual(DEFAULT_TASK_FILTERS);
    fresh.unmount();

    localStorage.setItem("interview-prep:task-filters", JSON.stringify({ query: "sum" }));
    const restored = mount();
    expect(restored.result.current.filters).toEqual({ ...DEFAULT_TASK_FILTERS, query: "sum" });
  });

  it("accepts a patch and an updater, and resets", () => {
    const { result } = mount();

    act(() => result.current.setFilters({ query: "a" }));
    expect(result.current.filters.query).toBe("a");

    act(() => result.current.setFilters((f) => ({ ...f, difficulties: [3] })));
    expect(result.current.filters).toMatchObject({ query: "a", difficulties: [3] });

    act(() => result.current.resetFilters());
    expect(result.current.filters).toEqual(DEFAULT_TASK_FILTERS);
  });

  it("persists to the task-filters key", () => {
    const { result } = mount();

    act(() => result.current.setFilters({ query: "tree" }));

    expect(JSON.parse(localStorage.getItem("interview-prep:task-filters"))).toMatchObject({
      query: "tree",
    });
    expect(localStorage.getItem("interview-prep:filters")).toBeNull();
  });
});

describe("useTasks outside a provider", () => {
  it("throws rather than returning undefined", () => {
    expect(() => renderHook(() => useTasks())).toThrow(/within a TasksProvider/);
  });
});
