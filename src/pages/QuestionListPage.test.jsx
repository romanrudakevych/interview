import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeQuestion } from "../../test/fixtures/questions.js";
import { setBody, setQuestions } from "../../test/helpers/mockContexts.js";
import { QuestionListPage } from "./QuestionListPage.jsx";
import en from "../i18n/locales/en.js";

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

vi.mock("../hooks/useQuestionBody.js", async () => {
  const { useQuestionBodyDouble } = await import("../../test/helpers/mockContexts.js");
  return { useQuestionBody: useQuestionBodyDouble };
});

/** `count` questions, titled "Question 1".."Question N". */
function bank(count) {
  return Array.from({ length: count }, (_, i) =>
    makeQuestion({ id: i + 1, question: `Question ${i + 1}`, skills: ["React"] })
  );
}

function setup(state = {}) {
  setBody({});
  const value = setQuestions(state);
  const utils = renderWithProviders(<QuestionListPage />);
  return { ...utils, value };
}

function visibleTitles(container) {
  return [...container.querySelectorAll(".question-card__question")].map((el) => el.textContent);
}

/**
 * The page-N button, scoped to the pagination nav. The filter sidebar renders
 * rating chips labelled 1–5, so an unscoped getByRole("button", { name: "2" })
 * matches two different controls.
 */
function pageButton(n) {
  return within(screen.getByRole("navigation", { name: en["pagination.label"] })).getByRole(
    "button",
    { name: String(n) }
  );
}

describe("pagination", () => {
  it("shows ten questions per page", () => {
    const { container } = setup({ questions: bank(25) });
    expect(visibleTitles(container)).toHaveLength(10);
    expect(visibleTitles(container)[0]).toBe("Question 1");
  });

  it("renders no pagination control for a single page", () => {
    const { container } = setup({ questions: bank(8) });
    expect(container.querySelector(".pagination")).toBeNull();
  });

  it("moves to the next page", async () => {
    const { container } = setup({ questions: bank(25) });

    await userEvent.click(pageButton(2));

    expect(visibleTitles(container)[0]).toBe("Question 11");
    expect(visibleTitles(container)).toHaveLength(10);
  });

  it("shows the remainder on the last page", async () => {
    const { container } = setup({ questions: bank(25) });

    await userEvent.click(pageButton(3));

    expect(visibleTitles(container)).toEqual(["Question 21", "Question 22", "Question 23", "Question 24", "Question 25"]);
  });

  it("scrolls to the top on a page change, so you don't land mid-list", async () => {
    setup({ questions: bank(25) });

    await userEvent.click(pageButton(2));

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});

describe("filters and pagination together", () => {
  it("jumps back to page 1 when the filters change", async () => {
    const { container, rerender } = setup({ questions: bank(25) });
    await userEvent.click(pageButton(3));
    expect(visibleTitles(container)[0]).toBe("Question 21");

    // A new filters identity is what the page watches for.
    setQuestions({ questions: bank(25), filters: { query: "Question" } });
    rerender(<QuestionListPage />);

    expect(visibleTitles(container)[0]).toBe("Question 1");
  });

  it("clamps to the last page when the result set shrinks", async () => {
    const { container, rerender } = setup({ questions: bank(25) });
    await userEvent.click(pageButton(3));

    // The filter narrows the list to one page while page 3 is stored.
    setQuestions({ questions: bank(5), filters: { query: "Question" } });
    rerender(<QuestionListPage />);

    // Clamped on read rather than corrected in an effect — so there is never a
    // blank page.
    expect(visibleTitles(container)).toHaveLength(5);
  });

  it("renders the filter sidebar", () => {
    const { container } = setup({ questions: bank(3) });
    expect(container.querySelector(".filter-sidebar")).toBeInTheDocument();
  });
});

describe("empty and loading", () => {
  it("shows the empty state when the filters match nothing", () => {
    setup({ questions: bank(5), filters: { query: "nothing matches this" } });
    // Rendered through FormattedText, hence the inline code element.
    expect(document.querySelector(".empty-state")).toBeInTheDocument();
    expect(document.querySelector(".question-list")).toBeNull();
  });

  it("says it is loading rather than empty while the index arrives", () => {
    setup({ questions: [], loading: true });
    expect(screen.getByText(en["questions.loadingIndex"])).toBeInTheDocument();
  });

  it("shows no pagination with an empty result set", () => {
    const { container } = setup({ questions: [], filters: { query: "x" } });
    expect(container.querySelector(".pagination")).toBeNull();
  });

  it("shows its title and breadcrumbs", () => {
    setup({ questions: bank(3) });
    expect(screen.getByRole("heading", { name: en["questions.pageTitle"] })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: en["breadcrumb.label"] })).toBeInTheDocument();
  });
});
