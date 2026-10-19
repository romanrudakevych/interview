import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { setTasks } from "../../test/helpers/mockContexts.js";
import { TASK_CATEGORIES, TASK_LANGUAGES } from "../data/tasks.js";
import { TaskFilterSidebar } from "./TaskFilterSidebar.jsx";
import en from "../i18n/locales/en.js";

vi.mock("../context/TasksContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { tasksRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useTasks: () => tasksRef.current };
});

function setup({ filters = {} } = {}) {
  const value = setTasks({ filters });
  renderWithProviders(<TaskFilterSidebar />);
  return value;
}

function applied(setFilters, current) {
  const arg = setFilters.mock.calls.at(-1)[0];
  return typeof arg === "function" ? arg(current) : { ...current, ...arg };
}

describe("difficulty", () => {
  it("offers exactly five levels, not the question ranges", () => {
    setup();
    for (const level of ["1", "2", "3", "4", "5"]) {
      expect(screen.getByRole("button", { name: level })).toBeInTheDocument();
    }
    expect(screen.queryByRole("button", { name: "9-10" })).toBeNull();
  });

  it("toggles a level as a number", async () => {
    const { setFilters, filters } = setup();

    await userEvent.click(screen.getByRole("button", { name: "3" }));

    // Numbers, because task difficulty is compared by exact value.
    expect(applied(setFilters, filters).difficulties).toEqual([3]);
  });

  it("marks an active level", () => {
    setup({ filters: { difficulties: [2] } });
    expect(screen.getByRole("button", { name: "2" })).toHaveClass("difficulty-badge--active");
  });

  it("removes an already-selected level", async () => {
    const { setFilters, filters } = setup({ filters: { difficulties: [2, 4] } });

    await userEvent.click(screen.getByRole("button", { name: "2" }));

    expect(applied(setFilters, filters).difficulties).toEqual([4]);
  });
});

describe("languages", () => {
  it("offers every task language", () => {
    setup();
    for (const lang of TASK_LANGUAGES) {
      expect(screen.getByRole("button", { name: lang })).toBeInTheDocument();
    }
  });

  it("toggles a language", async () => {
    const { setFilters, filters } = setup();

    await userEvent.click(screen.getByRole("button", { name: "JavaScript" }));

    expect(applied(setFilters, filters).languages).toEqual(["JavaScript"]);
  });
});

describe("categories", () => {
  it("shows only the first four until asked for more", () => {
    setup();
    for (const category of TASK_CATEGORIES.slice(0, 4)) {
      expect(screen.getByRole("button", { name: category })).toBeInTheDocument();
    }
    expect(screen.queryByRole("button", { name: TASK_CATEGORIES[4] })).toBeNull();
  });

  it("expands to all of them, then collapses again", async () => {
    setup();

    await userEvent.click(screen.getByRole("button", { name: en["filters.viewAll"] }));
    expect(screen.getByRole("button", { name: TASK_CATEGORIES.at(-1) })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: en["filters.showLess"] }));
    expect(screen.queryByRole("button", { name: TASK_CATEGORIES.at(-1) })).toBeNull();
  });

  it("toggles a category", async () => {
    const { setFilters, filters } = setup();

    await userEvent.click(screen.getByRole("button", { name: TASK_CATEGORIES[0] }));

    expect(applied(setFilters, filters).categories).toEqual([TASK_CATEGORIES[0]]);
  });

  it("marks an active category", () => {
    setup({ filters: { categories: [TASK_CATEGORIES[0]] } });
    expect(screen.getByRole("button", { name: TASK_CATEGORIES[0] })).toHaveClass("chip--active");
  });
});

describe("search and reset", () => {
  it("shows and updates the query", async () => {
    const { setFilters } = setup({ filters: { query: "tree" } });
    const input = screen.getByPlaceholderText(en["filters.taskPlaceholder"]);

    expect(input).toHaveValue("tree");
    await userEvent.type(input, "s");

    expect(setFilters).toHaveBeenCalledWith({ query: "trees" });
  });

  it("hides reset until a filter is active", () => {
    setup();
    expect(screen.queryByRole("button", { name: en["filters.reset"] })).toBeNull();
  });

  it.each([
    ["a query", { query: "x" }],
    ["a difficulty", { difficulties: [1] }],
    ["a language", { languages: ["JavaScript"] }],
    ["a category", { categories: ["Arrays"] }],
  ])("shows reset when %s is set", (_label, filters) => {
    setup({ filters });
    expect(screen.getByRole("button", { name: en["filters.reset"] })).toBeInTheDocument();
  });

  it("resets", async () => {
    const { resetFilters } = setup({ filters: { query: "x" } });
    await userEvent.click(screen.getByRole("button", { name: en["filters.reset"] }));
    expect(resetFilters).toHaveBeenCalled();
  });
});
