import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeQuestion } from "../../test/fixtures/questions.js";
import { setQuestions } from "../../test/helpers/mockContexts.js";
import { ProgressSidebar } from "./ProgressSidebar.jsx";
import en from "../i18n/locales/en.js";

const navigate = vi.fn();

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => navigate };
});

function setup(question = makeQuestion()) {
  navigate.mockClear();
  const value = setQuestions({});
  const utils = renderWithProviders(<ProgressSidebar question={question} />);
  return { ...utils, setFilters: value.setFilters };
}

describe("the progress bar", () => {
  it.each([
    [0, 3, "0%"],
    [1, 3, "33%"],
    [2, 3, "67%"],
    [3, 3, "100%"],
  ])("fills %i of %i as %s", (learnedCount, learnedGoal, width) => {
    const { container } = setup(makeQuestion({ learnedCount, learnedGoal }));
    expect(container.querySelector(".progress-bar__fill")).toHaveStyle({ width });
  });

  it("states the count against the goal", () => {
    setup(makeQuestion({ learnedCount: 2, learnedGoal: 3 }));
    expect(
      screen.getByText(en["progress.questionLearned"].replace("{count}", "2").replace("{goal}", "3"))
    ).toBeInTheDocument();
  });
});

describe("the metadata", () => {
  it("shows the rating and difficulty", () => {
    setup(makeQuestion({ rating: 4, difficulty: 9 }));
    expect(screen.getByText(`${en["common.rating"]} 4`)).toBeInTheDocument();
    expect(screen.getByText(`${en["common.complexity"]} 9`)).toBeInTheDocument();
  });

  it("lists every skill with its icon", () => {
    const { container } = setup(makeQuestion({ skills: ["React", "TypeScript"] }));
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(container.querySelectorAll(".skill-tag--static svg")).toHaveLength(2);
  });

  it("lists the keywords as buttons", () => {
    setup(makeQuestion({ keywords: ["closure", "scope"] }));
    expect(screen.getByRole("button", { name: "closure" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "scope" })).toBeInTheDocument();
  });

  it("renders a question with no keywords", () => {
    const { container } = setup(makeQuestion({ keywords: [] }));
    expect(container.querySelectorAll(".keyword-tag")).toHaveLength(0);
  });
});

describe("clicking a keyword", () => {
  it("searches for it and goes to the list", async () => {
    const { setFilters } = setup(makeQuestion({ keywords: ["closure"] }));

    await userEvent.click(screen.getByRole("button", { name: "closure" }));

    const updater = setFilters.mock.calls[0][0];
    expect(updater({ query: "", skills: ["React"] })).toEqual({
      query: "closure",
      skills: ["React"],
    });
    expect(navigate).toHaveBeenCalledWith("/knowledge-base/questions");
  });

  it("replaces the query but leaves the other filters alone", async () => {
    const { setFilters } = setup(makeQuestion({ keywords: ["scope"] }));

    await userEvent.click(screen.getByRole("button", { name: "scope" }));

    const updater = setFilters.mock.calls[0][0];
    expect(updater({ query: "old", favoriteOnly: true })).toMatchObject({
      query: "scope",
      favoriteOnly: true,
    });
  });
});
