import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeQuestion, questions } from "../../test/fixtures/questions.js";
import { setQuestions } from "../../test/helpers/mockContexts.js";
import { AnalyticsPage } from "./AnalyticsPage.jsx";
import en from "../i18n/locales/en.js";

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

function setup(state = {}) {
  setQuestions(state);
  return renderWithProviders(<AnalyticsPage />);
}

/** Each bar row as label -> value text. */
function rows(container) {
  return [...container.querySelectorAll(".bar-chart__row")].map((row) => [
    row.querySelector(".bar-chart__label").textContent,
    row.querySelector(".bar-chart__value").textContent,
  ]);
}

describe("overall progress", () => {
  it("summarises learned against total, with a percentage", () => {
    setup();
    // 1 of 8 learned = 13%.
    expect(
      screen.getByText(
        en["analytics.summary"]
          .replace("{learned}", "1")
          .replace("{total}", "8")
          .replace("{percent}", "13")
      )
    ).toBeInTheDocument();
  });

  it("fills the bar to the same percentage", () => {
    const { container } = setup();
    expect(container.querySelector(".progress-bar--large .progress-bar__fill")).toHaveStyle({
      width: "13%",
    });
  });

  it("reports 100% when everything is learned", () => {
    setup({ questions: questions.map((q) => ({ ...q, status: "learned" })) });
    expect(
      screen.getByText(
        en["analytics.summary"]
          .replace("{learned}", "8")
          .replace("{total}", "8")
          .replace("{percent}", "100")
      )
    ).toBeInTheDocument();
  });
});

describe("the skill chart", () => {
  it("lists only skills that have questions", () => {
    const { container } = setup();
    // 14 skills exist; a row per empty skill would be a chart of mostly zeroes.
    // Kept in SKILLS order, not first-seen order.
    const skillRows = rows(container).filter(([label]) => !label.includes("-"));
    expect(skillRows.map(([label]) => label)).toEqual([
      "JavaScript",
      "TypeScript",
      "React",
      "Git",
      "Docker",
    ]);
  });

  it("counts learned against total per skill", () => {
    const { container } = setup();
    const bySkill = Object.fromEntries(rows(container));
    // React: ids 3, 4, 5 — one of them (4) is learned.
    expect(bySkill.React).toBe("1/3");
    expect(bySkill.Git).toBe("0/1");
  });

  it("counts a multi-skill question under each of its skills", () => {
    const { container } = setup();
    const bySkill = Object.fromEntries(rows(container));
    expect(bySkill.TypeScript).toBe("0/2");
  });

  it("scales each bar against the largest skill", () => {
    const { container } = setup();
    const tracks = [...container.querySelectorAll(".bar-chart__track")];
    // React has 3 questions, the most of any skill, so its track is full width.
    expect(tracks[2]).toHaveStyle({ width: "100%" });
  });

  it("shows the legend", () => {
    setup();
    expect(screen.getByText(en["analytics.legendLearned"])).toBeInTheDocument();
    expect(screen.getByText(en["analytics.legendRemaining"])).toBeInTheDocument();
  });
});

describe("the difficulty chart", () => {
  it("always shows all four buckets, including empty ones", () => {
    const { container } = setup({ questions: [makeQuestion({ id: 1, difficulty: 2 })] });
    const buckets = rows(container).filter(([label]) => label.includes("-"));
    expect(buckets).toEqual([
      ["1-3", "1"],
      ["4-6", "0"],
      ["7-8", "0"],
      ["9-10", "0"],
    ]);
  });

  it("buckets the fixtures correctly", () => {
    const { container } = setup();
    const buckets = Object.fromEntries(rows(container).filter(([label]) => label.includes("-")));
    expect(buckets).toEqual({ "1-3": "2", "4-6": "3", "7-8": "2", "9-10": "1" });
  });
});

describe("empty and loading", () => {
  it("shows the empty state for an empty bank", () => {
    setup({ questions: [] });
    // Rendered through FormattedText, so the backticked filename becomes code.
    expect(document.querySelector(".empty-state code")).toBeInTheDocument();
    expect(document.querySelector(".analytics-card")).toBeNull();
  });

  it("says it is loading rather than empty while the index arrives", () => {
    setup({ questions: [], loading: true });
    expect(screen.getByText(en["questions.loadingIndex"])).toBeInTheDocument();
  });

  it("shows its title", () => {
    setup();
    expect(screen.getByRole("heading", { name: en["analytics.title"], level: 1 })).toBeInTheDocument();
  });
});
