import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { bodies, makeQuestion, questions } from "../../test/fixtures/questions.js";
import { setBody, setQuestions } from "../../test/helpers/mockContexts.js";
import { InterviewPage } from "./InterviewPage.jsx";
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

beforeEach(() => {
  // Deterministic "random": always the first of the pool.
  vi.spyOn(Math, "random").mockReturnValue(0);
});

function setup({ body = bodies[1], bodyLoading = false, ...state } = {}) {
  const tracker = setBody({ body, loading: bodyLoading });
  const value = setQuestions(state);
  return { ...renderWithProviders(<InterviewPage />), tracker, value };
}

function cardQuestion() {
  return document.querySelector(".interview-card__question")?.textContent;
}

describe("showing a question", () => {
  it("picks one from the bank", () => {
    setup();
    expect(cardQuestion()).toBe(questions[0].question);
  });

  it("shows the question's skills", () => {
    setup({ questions: [makeQuestion({ id: 5, skills: ["React", "TypeScript"] })] });
    expect(screen.getByText("React, TypeScript")).toBeInTheDocument();
  });

  it("shows its title and breadcrumbs", () => {
    setup();
    expect(screen.getByRole("heading", { name: en["interview.title"] })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: en["breadcrumb.label"] })).toBeInTheDocument();
  });
});

describe("the cold load", () => {
  // The regression this suite exists for: loading /training/interview directly
  // — refresh, bookmark or deep link — mounts the page while the index is still
  // in flight, so the initial pick sees an empty bank.
  it("shows a question once the index arrives after mount", () => {
    const { rerender } = setup({ questions: [], loading: true });
    expect(screen.getByText(en["questions.loadingIndex"])).toBeInTheDocument();

    setQuestions({ questions, loading: false });
    rerender(<InterviewPage />);

    expect(cardQuestion()).toBe(questions[0].question);
    expect(screen.queryByText(en["questions.loadingIndex"])).toBeNull();
  });

  it("shows the loading state, not the empty state, while the index is in flight", () => {
    setup({ questions: [], loading: true });
    expect(screen.getByText(en["questions.loadingIndex"])).toBeInTheDocument();
    expect(document.querySelector(".interview-card")).toBeNull();
  });

  it("shows the empty state only for a genuinely empty bank", () => {
    setup({ questions: [], loading: false });
    expect(document.querySelector(".empty-state")).toBeInTheDocument();
    expect(screen.queryByText(en["questions.loadingIndex"])).toBeNull();
  });

  it("re-picks when the current question leaves the bank", () => {
    // What a language switch does: the id is no longer in the index.
    const { rerender } = setup({ questions: [makeQuestion({ id: 1, question: "Only one" })] });
    expect(cardQuestion()).toBe("Only one");

    setQuestions({ questions: [makeQuestion({ id: 99, question: "A different bank" })] });
    rerender(<InterviewPage />);

    expect(cardQuestion()).toBe("A different bank");
  });

  it("keeps the current question when the bank still contains it", async () => {
    const { rerender, value } = setup();
    await userEvent.click(screen.getByRole("button", { name: en["interview.showAnswer"] }));
    const shown = cardQuestion();

    // A new array identity with the same contents — e.g. after a progress
    // update — must not reshuffle the question under the user.
    setQuestions({ questions: [...questions], updateProgress: value.updateProgress });
    rerender(<InterviewPage />);

    expect(cardQuestion()).toBe(shown);
  });
});

describe("revealing the answer", () => {
  it("fetches nothing before the reveal", () => {
    const { tracker } = setup();
    expect(tracker.calls).toEqual([null]);
  });

  it("shows the answer and the verdict buttons on reveal", async () => {
    const { tracker } = setup();

    await userEvent.click(screen.getByRole("button", { name: en["interview.showAnswer"] }));

    expect(tracker.calls.at(-1)).toBe(questions[0].id);
    expect(screen.getByText(bodies[1].shortAnswer)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: new RegExp(en["interview.know"]) })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: new RegExp(en["interview.dontKnow"]) })
    ).toBeInTheDocument();
  });

  it("shows the code example when there is one", async () => {
    const { container } = setup();
    await userEvent.click(screen.getByRole("button", { name: en["interview.showAnswer"] }));
    expect(container.querySelector(".code-block")).toBeInTheDocument();
  });

  it("shows a loading line while the body arrives", async () => {
    setup({ body: null, bodyLoading: true });
    await userEvent.click(screen.getByRole("button", { name: en["interview.showAnswer"] }));
    expect(screen.getByText(en["common.loadingAnswer"])).toBeInTheDocument();
  });
});

describe("the verdict buttons", () => {
  it("learns the question and moves on", async () => {
    const { value } = setup();
    await userEvent.click(screen.getByRole("button", { name: en["interview.showAnswer"] }));

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["interview.know"]) }));

    expect(value.updateProgress).toHaveBeenCalledWith(questions[0].id, expect.any(Function));
    // Back to the hidden state on the next question.
    expect(screen.getByRole("button", { name: en["interview.showAnswer"] })).toBeInTheDocument();
  });

  it("repeats a question that has been learned at least once", async () => {
    const { value } = setup({ questions: [makeQuestion({ id: 1, learnedCount: 2 })] });
    await userEvent.click(screen.getByRole("button", { name: en["interview.showAnswer"] }));

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["interview.dontKnow"]) }));

    expect(value.updateProgress).toHaveBeenCalledWith(1, expect.any(Function));
  });

  it("does not repeat a question that was never learned", async () => {
    // repeat is only meaningful above a zero count.
    const { value } = setup({ questions: [makeQuestion({ id: 1, learnedCount: 0 })] });
    await userEvent.click(screen.getByRole("button", { name: en["interview.showAnswer"] }));

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["interview.dontKnow"]) }));

    expect(value.updateProgress).not.toHaveBeenCalled();
  });
});

describe("skipping", () => {
  it("moves to a different question", async () => {
    setup();
    const first = cardQuestion();

    // Pick the *last* of the pool this time, so the choice visibly changes.
    Math.random.mockReturnValue(0.99);
    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["interview.nextRandom"]) }));

    expect(cardQuestion()).not.toBe(first);
  });

  it("never offers the same question twice in a row", async () => {
    setup();
    const first = cardQuestion();

    // Even with "random" pinned to the first slot, the current question is
    // excluded from the pool.
    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["interview.nextRandom"]) }));

    expect(cardQuestion()).not.toBe(first);
  });

  it("re-offers the only question when the bank has just one", async () => {
    setup({ questions: [makeQuestion({ id: 1, question: "Only one" })] });

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["interview.nextRandom"]) }));

    // The pool falls back to the whole bank rather than emptying.
    expect(cardQuestion()).toBe("Only one");
  });

  it("hides the answer again after a skip", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: en["interview.showAnswer"] }));

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["interview.nextRandom"]) }));

    expect(screen.getByRole("button", { name: en["interview.showAnswer"] })).toBeInTheDocument();
    expect(screen.queryByText(bodies[1].shortAnswer)).toBeNull();
  });
});
