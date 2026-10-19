import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { bodies, makeQuestion } from "../../test/fixtures/questions.js";
import { setBody, setQuestions } from "../../test/helpers/mockContexts.js";
import { QuestionCard } from "./QuestionCard.jsx";
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

let body;

beforeEach(() => {
  setQuestions({});
  body = setBody({ body: bodies[1] });
});

function setup(question = makeQuestion({ id: 1 })) {
  renderWithProviders(<QuestionCard question={question} />);
  return { header: screen.getByRole("button", { expanded: false }) };
}

describe("collapsed", () => {
  it("shows the question text", () => {
    setup(makeQuestion({ question: "What is a closure?" }));
    expect(screen.getByText("What is a closure?")).toBeInTheDocument();
  });

  it("requests no body at all", () => {
    setup();
    // A collapsed card passes null, which is what keeps the chunk unfetched.
    expect(body.calls).toEqual([null]);
  });

  it("shows no answer", () => {
    setup();
    expect(screen.queryByText(bodies[1].shortAnswer)).toBeNull();
  });

  it("reports collapsed state to assistive tech", () => {
    const { header } = setup();
    expect(header).toHaveAttribute("aria-expanded", "false");
  });

  it("shows the not-learned badge", () => {
    setup(makeQuestion({ status: "not_learned" }));
    expect(screen.getByText(en["questions.notLearned"])).toHaveClass("status-badge--not-learned");
  });

  it("shows the learned badge for a learned question", () => {
    setup(makeQuestion({ status: "learned" }));
    expect(screen.getByText(en["questions.learned"])).toHaveClass("status-badge--learned");
  });
});

describe("expanding", () => {
  it("requests the body for its id", async () => {
    const { header } = setup(makeQuestion({ id: 1 }));

    await userEvent.click(header);

    expect(body.calls.at(-1)).toBe(1);
  });

  it("shows the short answer", async () => {
    const { header } = setup();
    await userEvent.click(header);
    expect(screen.getByText(bodies[1].shortAnswer)).toBeInTheDocument();
  });

  it("shows the code example when there is one", async () => {
    const { container } = renderWithProviders(<QuestionCard question={makeQuestion({ id: 1 })} />);
    await userEvent.click(screen.getByRole("button", { expanded: false }));
    expect(container.querySelector(".code-block")).toBeInTheDocument();
  });

  it("omits the code block when there is no example", async () => {
    setBody({ body: bodies[2] });
    const { container } = renderWithProviders(<QuestionCard question={makeQuestion({ id: 2 })} />);
    await userEvent.click(screen.getByRole("button", { expanded: false }));
    expect(container.querySelector(".code-block")).toBeNull();
  });

  it("shows the rating and difficulty", async () => {
    const { header } = setup(makeQuestion({ rating: 4, difficulty: 7 }));
    await userEvent.click(header);
    expect(screen.getByText(`${en["common.rating"]} 4`)).toBeInTheDocument();
    expect(screen.getByText(`${en["common.complexity"]} 7`)).toBeInTheDocument();
  });

  it("offers the actions menu", async () => {
    const { header } = setup();
    await userEvent.click(header);
    expect(screen.getByRole("button", { name: en["actions.questionActions"] })).toBeInTheDocument();
  });

  it("reports expanded state", async () => {
    const { header } = setup();
    await userEvent.click(header);
    expect(header).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses again", async () => {
    const { header } = setup();
    await userEvent.click(header);
    await userEvent.click(header);
    expect(screen.queryByText(bodies[1].shortAnswer)).toBeNull();
    expect(body.calls.at(-1)).toBeNull();
  });
});

describe("while the body loads", () => {
  it("shows the loading line instead of the answer", async () => {
    setBody({ loading: true });
    renderWithProviders(<QuestionCard question={makeQuestion({ id: 1 })} />);

    await userEvent.click(screen.getByRole("button", { expanded: false }));

    expect(screen.getByText(en["common.loadingAnswer"])).toBeInTheDocument();
  });

  it("renders nothing rather than an empty answer when the body is null", async () => {
    setBody({ body: null, loading: false });
    const { container } = renderWithProviders(<QuestionCard question={makeQuestion({ id: 1 })} />);

    await userEvent.click(screen.getByRole("button", { expanded: false }));

    expect(container.querySelector(".question-card__answer")).toBeNull();
  });
});
