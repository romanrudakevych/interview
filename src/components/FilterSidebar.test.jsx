import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { questions } from "../../test/fixtures/questions.js";
import { setQuestions } from "../../test/helpers/mockContexts.js";
import { FilterSidebar } from "./FilterSidebar.jsx";
import en from "../i18n/locales/en.js";

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

function setup({ filters = {}, list = questions } = {}) {
  const value = setQuestions({ questions: list, filters });
  renderWithProviders(<FilterSidebar />);
  return value;
}

/** The current `filters` after applying whatever setFilters was handed. */
function applied(setFilters, current) {
  const arg = setFilters.mock.calls.at(-1)[0];
  return typeof arg === "function" ? arg(current) : { ...current, ...arg };
}

describe("skill chips", () => {
  it("shows only the skills the loaded bank actually covers", () => {
    setup();
    // The fixtures use 5 of the 14 skills — a chip that matches nothing must
    // never render, which is also what makes a sparse locale behave.
    for (const skill of ["JavaScript", "React", "TypeScript", "Git", "Docker"]) {
      expect(screen.getByRole("button", { name: skill })).toBeInTheDocument();
    }
    for (const skill of ["HTML", "CSS", "Webpack", "Kubernetes"]) {
      expect(screen.queryByRole("button", { name: skill })).toBeNull();
    }
  });

  it("renders no chips at all for an empty bank", () => {
    // Still loading, or a locale that covers nothing: no chip rather than
    // fourteen dead ones.
    setup({ list: [] });
    expect(document.querySelectorAll(".skill-grid .skill-tag")).toHaveLength(0);
  });

  it("keeps the chips in SKILLS order rather than first-seen order", () => {
    setup();
    const labels = [...document.querySelectorAll(".skill-grid .skill-tag")].map((b) =>
      b.textContent.trim()
    );
    expect(labels).toEqual(["JavaScript", "TypeScript", "React", "Git", "Docker"]);
  });

  it("marks a selected skill active", () => {
    setup({ filters: { skills: ["React"] } });
    expect(screen.getByRole("button", { name: "React" })).toHaveClass("skill-tag--active");
    expect(screen.getByRole("button", { name: "Git" })).not.toHaveClass("skill-tag--active");
  });

  it("adds a skill to the selection rather than replacing it", async () => {
    const { setFilters, filters } = setup({ filters: { skills: ["React"] } });

    await userEvent.click(screen.getByRole("button", { name: "Git" }));

    expect(applied(setFilters, filters).skills).toEqual(["React", "Git"]);
  });

  it("removes an already-selected skill", async () => {
    const { setFilters, filters } = setup({ filters: { skills: ["React", "Git"] } });

    await userEvent.click(screen.getByRole("button", { name: "React" }));

    expect(applied(setFilters, filters).skills).toEqual(["Git"]);
  });
});

describe("search", () => {
  it("shows the current query", () => {
    setup({ filters: { query: "hooks" } });
    expect(screen.getByPlaceholderText(en["filters.queryPlaceholder"])).toHaveValue("hooks");
  });

  it("reports each keystroke", async () => {
    const { setFilters } = setup();

    await userEvent.type(screen.getByPlaceholderText(en["filters.queryPlaceholder"]), "a");

    expect(setFilters).toHaveBeenCalledWith({ query: "a" });
  });
});

describe("difficulty and rating", () => {
  it("offers the four documented ranges", () => {
    setup();
    for (const range of ["1-3", "4-6", "7-8", "9-10"]) {
      expect(screen.getByRole("button", { name: range })).toBeInTheDocument();
    }
  });

  it("toggles a range", async () => {
    const { setFilters, filters } = setup();

    await userEvent.click(screen.getByRole("button", { name: "4-6" }));

    expect(applied(setFilters, filters).difficultyRanges).toEqual(["4-6"]);
  });

  it("marks an active range", () => {
    setup({ filters: { difficultyRanges: ["7-8"] } });
    expect(screen.getByRole("button", { name: "7-8" })).toHaveClass("chip--active");
  });

  it("offers ratings 1 to 5 and toggles them as numbers", async () => {
    const { setFilters, filters } = setup();

    await userEvent.click(screen.getByRole("button", { name: "3" }));

    // Numbers, not strings — question ratings are compared with includes().
    expect(applied(setFilters, filters).ratings).toEqual([3]);
  });
});

describe("status and favorites", () => {
  it("offers the three status options and marks the active one", () => {
    setup({ filters: { status: "learned" } });
    expect(screen.getByRole("button", { name: en["filters.statusLearned"] })).toHaveClass(
      "segmented__item--active"
    );
    expect(screen.getByRole("button", { name: en["filters.statusAll"] })).not.toHaveClass(
      "segmented__item--active"
    );
  });

  it("sets the status", async () => {
    const { setFilters } = setup();
    await userEvent.click(screen.getByRole("button", { name: en["filters.statusUnlearned"] }));
    expect(setFilters).toHaveBeenCalledWith({ status: "not_learned" });
  });

  it("toggles favourites-only through a checkbox", async () => {
    const { setFilters } = setup();

    await userEvent.click(screen.getByRole("checkbox"));

    expect(setFilters).toHaveBeenCalledWith({ favoriteOnly: true });
  });

  it("reflects the current favourites-only state", () => {
    setup({ filters: { favoriteOnly: true } });
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});

describe("reset", () => {
  it("is hidden when no filter is active", () => {
    setup();
    expect(screen.queryByRole("button", { name: en["filters.reset"] })).toBeNull();
  });

  it.each([
    ["a query", { query: "x" }],
    ["a skill", { skills: ["React"] }],
    ["a difficulty range", { difficultyRanges: ["1-3"] }],
    ["a rating", { ratings: [1] }],
    ["a status", { status: "learned" }],
    ["favourites only", { favoriteOnly: true }],
  ])("appears when %s is set", (_label, filters) => {
    setup({ filters });
    expect(screen.getByRole("button", { name: en["filters.reset"] })).toBeInTheDocument();
  });

  it("resets the filters", async () => {
    const { resetFilters } = setup({ filters: { query: "x" } });

    await userEvent.click(screen.getByRole("button", { name: en["filters.reset"] }));

    expect(resetFilters).toHaveBeenCalled();
  });
});
