import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeQuestion } from "../../test/fixtures/questions.js";
import { setQuestions } from "../../test/helpers/mockContexts.js";
import { QuestionActionsBar } from "./QuestionActionsBar.jsx";
import en from "../i18n/locales/en.js";

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

function setup(question = makeQuestion()) {
  const value = setQuestions({});
  renderWithProviders(<QuestionActionsBar question={question} />);
  return { updateProgress: value.updateProgress, question };
}

/** Applies whatever updater the component handed to updateProgress. */
function applied(updateProgress, current) {
  const [id, updater] = updateProgress.mock.calls[0];
  return { id, next: updater(current) };
}

const PROGRESS = { status: "not_learned", favorite: false, learnedCount: 0, learnedGoal: 3 };

describe("QuestionActionsBar", () => {
  it("offers Learn, Repeat and Favorite", () => {
    setup();
    expect(screen.getByRole("button", { name: en["actions.learn"] })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: en["actions.repeat"] })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: en["actions.favorite"] })).toBeInTheDocument();
  });

  it("learns the question", async () => {
    const { updateProgress } = setup(makeQuestion({ id: 12 }));

    await userEvent.click(screen.getByRole("button", { name: en["actions.learn"] }));

    expect(applied(updateProgress, PROGRESS)).toEqual({
      id: 12,
      next: { ...PROGRESS, learnedCount: 1 },
    });
  });

  it("disables Repeat until something has been learned", () => {
    setup(makeQuestion({ learnedCount: 0 }));
    expect(screen.getByRole("button", { name: en["actions.repeat"] })).toBeDisabled();
  });

  it("enables Repeat once something has been learned", () => {
    setup(makeQuestion({ learnedCount: 1 }));
    expect(screen.getByRole("button", { name: en["actions.repeat"] })).toBeEnabled();
  });

  it("repeats the question", async () => {
    const { updateProgress } = setup(makeQuestion({ id: 3, learnedCount: 2 }));

    await userEvent.click(screen.getByRole("button", { name: en["actions.repeat"] }));

    expect(applied(updateProgress, { ...PROGRESS, learnedCount: 2 }).next.learnedCount).toBe(0);
  });

  it("toggles the favorite", async () => {
    const { updateProgress } = setup(makeQuestion({ id: 5 }));

    await userEvent.click(screen.getByRole("button", { name: en["actions.favorite"] }));

    expect(applied(updateProgress, PROGRESS).next.favorite).toBe(true);
  });

  it("marks the favorite button active when the question is a favorite", () => {
    setup(makeQuestion({ favorite: true }));
    expect(screen.getByRole("button", { name: en["actions.favorite"] })).toHaveClass(
      "actions-bar__btn--active"
    );
  });

  it("does not mark it active otherwise", () => {
    setup(makeQuestion({ favorite: false }));
    expect(screen.getByRole("button", { name: en["actions.favorite"] })).not.toHaveClass(
      "actions-bar__btn--active"
    );
  });
});
