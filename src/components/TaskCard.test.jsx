import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeTask } from "../../test/fixtures/tasks.js";
import { TaskCard } from "./TaskCard.jsx";
import en from "../i18n/locales/en.js";

describe("TaskCard", () => {
  it("links to the task's details page", () => {
    renderWithProviders(<TaskCard task={makeTask({ id: 42, title: "Sum two numbers" })} />);
    expect(screen.getByRole("link", { name: /Sum two numbers/ })).toHaveAttribute(
      "href",
      "/training/tasks/42"
    );
  });

  it.each([
    ["not_started", "task-status--not-started"],
    ["in_progress", "task-status--in-progress"],
    ["solved", "task-status--solved"],
  ])("shows the %s status with its own class", (status, className) => {
    const { container } = renderWithProviders(<TaskCard task={makeTask({ status })} />);
    // The underscore becomes a hyphen for the CSS class.
    expect(container.querySelector(`.${className}`)).toBeInTheDocument();
    expect(screen.getByText(en[`tasks.status.${status}`])).toBeInTheDocument();
  });

  it("shows the difficulty with a difficulty-specific class", () => {
    const { container } = renderWithProviders(<TaskCard task={makeTask({ difficulty: 4 })} />);
    expect(container.querySelector(".difficulty-badge--4")).toHaveTextContent("4");
  });

  it("renders an icon per language", () => {
    const { container } = renderWithProviders(
      <TaskCard task={makeTask({ languages: ["JavaScript"] })} />
    );
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("lists every category", () => {
    renderWithProviders(<TaskCard task={makeTask({ categories: ["Strings", "Loops"] })} />);
    expect(screen.getByText("Strings")).toBeInTheDocument();
    expect(screen.getByText("Loops")).toBeInTheDocument();
  });

  it("renders a task with no categories", () => {
    const { container } = renderWithProviders(<TaskCard task={makeTask({ categories: [] })} />);
    expect(container.querySelectorAll(".task-category")).toHaveLength(0);
  });

  it("leaves category and language labels untranslated", () => {
    // Data-derived chip labels stay in their source language by design.
    renderWithProviders(<TaskCard task={makeTask({ categories: ["Arrays"] })} />, { lang: "ru" });
    expect(screen.getByText("Arrays")).toBeInTheDocument();
  });
});
