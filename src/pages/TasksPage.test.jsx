import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeTask } from "../../test/fixtures/tasks.js";
import { setTasks } from "../../test/helpers/mockContexts.js";
import { TasksPage } from "./TasksPage.jsx";
import en from "../i18n/locales/en.js";

vi.mock("../context/TasksContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { tasksRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useTasks: () => tasksRef.current };
});

function bank(count) {
  return Array.from({ length: count }, (_, i) =>
    makeTask({ id: i + 1, title: `Task ${i + 1}` })
  );
}

function setup(state = {}) {
  setTasks(state);
  return renderWithProviders(<TasksPage />);
}

function visibleTitles(container) {
  return [...container.querySelectorAll(".task-card__title")].map((el) => el.textContent);
}

/** Scoped to the pagination nav: the difficulty chips are also 1–5 buttons. */
function pageButton(n) {
  return within(screen.getByRole("navigation", { name: en["pagination.label"] })).getByRole(
    "button",
    { name: String(n) }
  );
}

describe("TasksPage", () => {
  it("lists ten tasks per page", () => {
    const { container } = setup({ tasks: bank(25) });
    expect(visibleTitles(container)).toHaveLength(10);
    expect(visibleTitles(container)[0]).toBe("Task 1");
  });

  it("pages through the list", async () => {
    const { container } = setup({ tasks: bank(25) });

    await userEvent.click(pageButton(3));

    expect(visibleTitles(container)).toEqual(["Task 21", "Task 22", "Task 23", "Task 24", "Task 25"]);
  });

  it("renders no pagination for a single page", () => {
    const { container } = setup({ tasks: bank(4) });
    expect(container.querySelector(".pagination")).toBeNull();
  });

  it("clamps to the last page when the filters shrink the list", async () => {
    const { container, rerender } = setup({ tasks: bank(25) });
    await userEvent.click(pageButton(3));

    setTasks({ tasks: bank(5), filters: { query: "Task" } });
    rerender(<TasksPage />);

    expect(visibleTitles(container)).toHaveLength(5);
  });

  it("shows the empty state when nothing matches", () => {
    setup({ tasks: [], filters: { query: "nope" } });
    expect(document.querySelector(".empty-state")).toBeInTheDocument();
    expect(document.querySelector(".task-list")).toBeNull();
  });

  it("renders the filter sidebar", () => {
    const { container } = setup({ tasks: bank(3) });
    expect(container.querySelector(".filter-sidebar")).toBeInTheDocument();
  });

  it("shows its title and breadcrumbs", () => {
    setup({ tasks: bank(3) });
    expect(screen.getByRole("heading", { name: en["tasks.title"] })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: en["breadcrumb.label"] })).toBeInTheDocument();
  });
});
