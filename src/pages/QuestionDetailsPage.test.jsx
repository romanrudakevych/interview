import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { bodies, questions } from "../../test/fixtures/questions.js";
import { setBody, setQuestions } from "../../test/helpers/mockContexts.js";
import { QuestionDetailsPage } from "./QuestionDetailsPage.jsx";
import en from "../i18n/locales/en.js";

const navigate = vi.fn();
let params = { id: "1" };

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

vi.mock("../hooks/useQuestionBody.js", async () => {
  const { useQuestionBodyDouble } = await import("../../test/helpers/mockContexts.js");
  return { useQuestionBody: useQuestionBodyDouble };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => navigate, useParams: () => params };
});

// `bodyLoading` is the answer fetch; `loading` (passed through in `state`) is
// the language index. The page has to tell them apart — the index one wins over
// "not found" — so the test helper does too.
function setup({ id = "1", body = bodies[1], bodyLoading = false, ...state } = {}) {
  params = { id };
  navigate.mockClear();
  const tracker = setBody({ body, loading: bodyLoading });
  setQuestions(state);
  return { ...renderWithProviders(<QuestionDetailsPage />), tracker };
}

describe("a question that exists", () => {
  it("shows the question as the page title", () => {
    setup({ id: "1" });
    expect(screen.getByRole("heading", { level: 1, name: "What is a closure?" })).toBeInTheDocument();
  });

  it("lists its skills in the subtitle", () => {
    setup({ id: "5" });
    expect(
      screen.getByText(en["questions.subtitle"].replace("{skills}", "React, TypeScript"))
    ).toBeInTheDocument();
  });

  it("shows the short and long answers", () => {
    setup({ id: "1" });
    expect(screen.getByText(en["questions.shortAnswer"])).toBeInTheDocument();
    expect(screen.getByText(bodies[1].shortAnswer)).toBeInTheDocument();
    expect(screen.getByText(en["questions.longAnswer"])).toBeInTheDocument();
    expect(screen.getByText(bodies[1].longAnswer)).toBeInTheDocument();
  });

  it("shows the code example when there is one", () => {
    const { container } = setup({ id: "1" });
    expect(container.querySelector(".code-block")).toBeInTheDocument();
  });

  it("omits the code block when there is none", () => {
    const { container } = setup({ id: "2", body: bodies[2] });
    expect(container.querySelector(".code-block")).toBeNull();
  });

  it("shows the actions bar and the progress sidebar", () => {
    const { container } = setup({ id: "1" });
    expect(container.querySelector(".actions-bar")).toBeInTheDocument();
    expect(container.querySelector(".progress-sidebar")).toBeInTheDocument();
  });

  it("shows a loading line while the body arrives", () => {
    setup({ id: "1", body: null, bodyLoading: true });
    expect(screen.getByText(en["common.loadingAnswer"])).toBeInTheDocument();
    expect(screen.queryByText(en["questions.shortAnswer"])).toBeNull();
  });
});

describe("a question that does not exist", () => {
  it("waits for the index rather than claiming not-found", () => {
    // The documented trap: "not found" is wrong until the index lands.
    setup({ id: "1", questions: [], loading: true });
    expect(screen.getByText(en["questions.loadingIndex"])).toBeInTheDocument();
    expect(screen.queryByText(/not/i)).toBeNull();
  });

  it("says the question is not in this language for a plausible id", () => {
    // Every locale shows only what it covers, so this is the common case after
    // a language switch — not a broken link.
    setup({ id: "4242" });
    expect(document.querySelector(".empty-state")).toHaveTextContent(
      en["questions.notInLanguage"].replace(/`/g, "")
    );
  });

  it("says the question does not exist for a junk id", () => {
    setup({ id: "not-a-number" });
    expect(document.querySelector(".empty-state")).toHaveTextContent(
      en["questions.notFound"].replace(/`/g, "")
    );
  });

  it("treats a zero or negative id as non-existent", () => {
    setup({ id: "0" });
    expect(document.querySelector(".empty-state")).toHaveTextContent(
      en["questions.notFound"].replace(/`/g, "")
    );
  });

  it("offers a way back to the list", () => {
    setup({ id: "4242" });
    expect(screen.getByRole("link", { name: en["questions.backToList"] })).toHaveAttribute(
      "href",
      "/knowledge-base/questions"
    );
  });

  it("requests no body for an unknown id", () => {
    // A bad URL must not ask for a nonexistent chunk.
    const { tracker } = setup({ id: "4242" });
    expect(tracker.calls).toEqual([null]);
  });
});

describe("previous and next", () => {
  it("follows the full bank when no filter is active", async () => {
    setup({ id: "2" });

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["questions.next"]) }));

    expect(navigate).toHaveBeenCalledWith("/knowledge-base/questions/3");
  });

  it("goes back to the previous question", async () => {
    setup({ id: "2" });

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["questions.previous"]) }));

    expect(navigate).toHaveBeenCalledWith("/knowledge-base/questions/1");
  });

  it("follows the filtered order when the question is in it", async () => {
    // Filtered to React: ids 3, 4, 5. From 3, Next must be 4 — and from the
    // whole bank it would also be 4, so filter to Git+Docker to make it differ.
    setup({ id: "7", filters: { skills: ["Git", "Docker"] } });

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["questions.next"]) }));

    expect(navigate).toHaveBeenCalledWith("/knowledge-base/questions/8");
  });

  it("falls back to the full bank when the question is filtered out", async () => {
    // Viewing id 1 while the filter shows only React questions: the filtered
    // list has no position for it, so Previous/Next use the full bank.
    setup({ id: "1", filters: { skills: ["React"] } });

    await userEvent.click(screen.getByRole("button", { name: new RegExp(en["questions.next"]) }));

    expect(navigate).toHaveBeenCalledWith("/knowledge-base/questions/2");
  });

  it("disables Previous on the first question", () => {
    setup({ id: "1" });
    expect(screen.getByRole("button", { name: new RegExp(en["questions.previous"]) })).toBeDisabled();
    expect(screen.getByRole("button", { name: new RegExp(en["questions.next"]) })).toBeEnabled();
  });

  it("disables Next on the last question", () => {
    setup({ id: String(questions.at(-1).id) });
    expect(screen.getByRole("button", { name: new RegExp(en["questions.next"]) })).toBeDisabled();
  });

  it("shows the position in the active list", () => {
    setup({ id: "3", filters: { skills: ["React"] } });
    // First of the three React questions.
    expect(
      screen.getByText(en["questions.position"].replace("{current}", "1").replace("{total}", "3"))
    ).toBeInTheDocument();
  });

  it("counts the position against the full bank when unfiltered", () => {
    setup({ id: "3" });
    expect(
      screen.getByText(en["questions.position"].replace("{current}", "3").replace("{total}", "8"))
    ).toBeInTheDocument();
  });
});
