import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { questions } from "../../test/fixtures/questions.js";
import { setBody, setQuestions } from "../../test/helpers/mockContexts.js";
import { CollectionsPage } from "./CollectionsPage.jsx";
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

function setup(state = {}) {
  setBody({});
  setQuestions(state);
  return renderWithProviders(<CollectionsPage />);
}

describe("CollectionsPage", () => {
  it("shows only the favorites", () => {
    const { container } = setup();
    // Exactly one fixture is starred.
    expect(container.querySelectorAll(".question-card")).toHaveLength(1);
    expect(screen.getByText("What is a React hook?")).toBeInTheDocument();
    expect(screen.queryByText("What is a closure?")).toBeNull();
  });

  it("shows every favorite when there are several", () => {
    const starred = questions.map((q) => ({ ...q, favorite: true }));
    const { container } = setup({ questions: starred });
    expect(container.querySelectorAll(".question-card")).toHaveLength(questions.length);
  });

  it("shows the empty state when nothing is starred", () => {
    setup({ questions: questions.map((q) => ({ ...q, favorite: false })) });
    expect(screen.getByText(en["collections.empty"])).toBeInTheDocument();
  });

  it("says it is loading rather than empty while the index arrives", () => {
    // Without the loading check this would flash "nothing starred" on every
    // language switch.
    setup({ questions: [], loading: true });
    expect(screen.getByText(en["questions.loadingIndex"])).toBeInTheDocument();
    expect(screen.queryByText(en["collections.empty"])).toBeNull();
  });

  it("shows its title, subtitle and breadcrumbs", () => {
    setup();
    expect(screen.getByRole("heading", { name: en["collections.title"] })).toBeInTheDocument();
    expect(screen.getByText(en["collections.subtitle"])).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: en["breadcrumb.label"] })).toBeInTheDocument();
  });
});
