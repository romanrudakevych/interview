import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeQuestion, questions } from "../../test/fixtures/questions.js";
import { setQuestions } from "../../test/helpers/mockContexts.js";
import { HomePage } from "./HomePage.jsx";
import en from "../i18n/locales/en.js";

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

/** The four stat tiles, as label -> value. */
function stats() {
  return Object.fromEntries(
    [...document.querySelectorAll(".stat-card")].map((card) => [
      card.querySelector(".stat-card__label").textContent,
      card.querySelector(".stat-card__value").textContent,
    ])
  );
}

function setup(state = {}) {
  setQuestions(state);
  return renderWithProviders(<HomePage />);
}

describe("the stat tiles", () => {
  it("counts the whole bank", () => {
    setup();
    expect(stats()[en["home.stats.total"]]).toBe("8");
  });

  it("counts learned questions", () => {
    setup();
    // One fixture is learned.
    expect(stats()[en["home.stats.learned"]]).toBe("1");
  });

  it("counts favorites", () => {
    setup();
    expect(stats()[en["home.stats.favorites"]]).toBe("1");
  });

  it("counts distinct skills, not skill tags", () => {
    // id 5 is tagged React *and* TypeScript; both are already counted from
    // other questions, so the distinct total is 5, not 9.
    setup();
    expect(stats()[en["home.stats.skills"]]).toBe("5");
  });

  it("shows zeroes for an empty bank rather than blanks", () => {
    setup({ questions: [] });
    expect(Object.values(stats())).toEqual(["0", "0", "0", "0"]);
  });

  it("recounts as progress changes", () => {
    setup({
      questions: [...questions, makeQuestion({ id: 9, status: "learned", favorite: true })],
    });
    expect(stats()[en["home.stats.learned"]]).toBe("2");
    expect(stats()[en["home.stats.favorites"]]).toBe("2");
  });
});

describe("while the index loads", () => {
  it("says so instead of showing the subtitle", () => {
    setup({ questions: [], loading: true });
    expect(screen.getByText(en["questions.loadingIndex"])).toBeInTheDocument();
    expect(screen.queryByText(en["home.subtitle"])).toBeNull();
  });

  it("shows the subtitle once loaded", () => {
    setup();
    expect(screen.getByText(en["home.subtitle"])).toBeInTheDocument();
  });
});

describe("the quick links", () => {
  it("links to questions, the interview and analytics", () => {
    setup();
    expect(screen.getByRole("link", { name: new RegExp(en["nav.questions"]) })).toHaveAttribute(
      "href",
      "/knowledge-base/questions"
    );
    expect(screen.getByRole("link", { name: new RegExp(en["nav.interview"]) })).toHaveAttribute(
      "href",
      "/training/interview"
    );
    expect(screen.getByRole("link", { name: new RegExp(en["nav.analytics"]) })).toHaveAttribute(
      "href",
      "/analytics"
    );
  });

  it("shows the page title", () => {
    setup();
    expect(screen.getByRole("heading", { name: en["home.title"] })).toBeInTheDocument();
  });
});
