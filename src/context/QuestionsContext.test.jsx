import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { FILTER_DEFAULTS } from "../../test/helpers/mockContexts.js";
import { LanguageProvider, useI18n } from "../i18n/index.jsx";
import { DEFAULT_FILTERS, QuestionsProvider, useQuestions } from "./QuestionsContext.jsx";

// The real provider against the real generated index — this is the one place
// the import.meta.glob load, the progress merge and the status derivation are
// exercised for real. Everything above it is tested against fixtures.
function wrapper({ children }) {
  return (
    <LanguageProvider>
      <QuestionsProvider>{children}</QuestionsProvider>
    </LanguageProvider>
  );
}

// Each language index is ~650 KB of JSON, and the first import of one costs
// real time — enough, under coverage instrumentation, to outlast an async wait
// and make a test look broken when it is only slow. Loading all four up front
// puts that cost in one place and leaves the mounts below fast and
// deterministic; the provider still goes through its own import.meta.glob.
beforeAll(async () => {
  await Promise.all([
    import("../data/generated/index.en.json"),
    import("../data/generated/index.cs.json"),
    import("../data/generated/index.ru.json"),
    import("../data/generated/index.uk.json"),
  ]);
});

/** Mounts the provider and waits for the language index to arrive. */
async function mount({ lang = "en" } = {}) {
  localStorage.setItem("interview-prep:language", lang);
  const hook = renderHook(() => ({ ...useQuestions(), i18n: useI18n() }), { wrapper });
  await waitFor(() => expect(hook.result.current.loading).toBe(false));
  return hook;
}

describe("DEFAULT_FILTERS", () => {
  it("has the documented shape", () => {
    expect(DEFAULT_FILTERS).toEqual({
      query: "",
      skills: [],
      difficultyRanges: [],
      ratings: [],
      status: "all",
      favoriteOnly: false,
    });
  });

  it("matches the copy the test helpers use", () => {
    // test/helpers/mockContexts.js can't import this module (it mocks it), so
    // this is the guard against the two drifting apart.
    expect(FILTER_DEFAULTS).toEqual(DEFAULT_FILTERS);
  });
});

describe("loading the index", () => {
  it("starts out loading with no questions", () => {
    localStorage.setItem("interview-prep:language", "en");
    const { result } = renderHook(() => useQuestions(), { wrapper });
    // Consumers that render an empty state must check this, or they flash
    // "no questions" on every language switch.
    expect(result.current.loading).toBe(true);
    expect(result.current.questions).toEqual([]);
  });

  it("loads the whole bank for the active language", async () => {
    const { result } = await mount();
    expect(result.current.questions.length).toBeGreaterThan(3000);
  });

  it("exposes the index fields, and no answer prose", async () => {
    const { result } = await mount();
    const question = result.current.questions[0];

    expect(question).toMatchObject({
      id: expect.any(Number),
      question: expect.any(String),
      skills: expect.any(Array),
      keywords: expect.any(Array),
      difficulty: expect.any(Number),
      rating: expect.any(Number),
    });
    // Bodies load separately through useQuestionBody — a question object
    // carrying prose would mean the split had regressed.
    expect(question.shortAnswer).toBeUndefined();
    expect(question.longAnswer).toBeUndefined();
    expect(question.codeExample).toBeUndefined();
  });

  it("gives every language the same ids, so progress survives a switch", async () => {
    const { result } = await mount({ lang: "en" });
    const englishIds = result.current.questions.map((q) => q.id);

    const cs = await mount({ lang: "cs" });
    expect(cs.result.current.questions.map((q) => q.id)).toEqual(englishIds);
  });

  it("reloads the index when the language changes", async () => {
    const { result } = await mount({ lang: "en" });
    const english = result.current.questions[0].question;

    await act(async () => result.current.i18n.setLang("cs"));
    await waitFor(() => expect(result.current.questions[0].question).not.toBe(english));
    expect(result.current.loading).toBe(false);
  });
});

describe("progress defaults", () => {
  it("applies the same defaults createQuestion() uses", async () => {
    const { result } = await mount();
    expect(result.current.questions[0]).toMatchObject({
      status: "not_learned",
      favorite: false,
      learnedCount: 0,
      learnedGoal: 3,
    });
  });

  it("ignores progress-like values that are not in storage", async () => {
    const { result } = await mount();
    // The index carries no progress at all, so every question starts clean.
    expect(result.current.questions.every((q) => q.learnedCount === 0)).toBe(true);
  });
});

describe("merging saved progress", () => {
  it("merges by id", async () => {
    localStorage.setItem(
      "interview-prep:progress",
      JSON.stringify({ 2: { status: "not_learned", favorite: true, learnedCount: 1, learnedGoal: 3 } })
    );

    const { result } = await mount();
    const byId = new Map(result.current.questions.map((q) => [q.id, q]));

    expect(byId.get(2)).toMatchObject({ favorite: true, learnedCount: 1 });
    expect(byId.get(1)).toMatchObject({ favorite: false, learnedCount: 0 });
  });

  it("derives status from the count rather than trusting the stored field", async () => {
    // The whole reason status is derived: a stored "learned" with a zero count
    // would otherwise show a Learned badge on an unlearned question forever.
    localStorage.setItem(
      "interview-prep:progress",
      JSON.stringify({ 1: { status: "learned", favorite: false, learnedCount: 0, learnedGoal: 3 } })
    );

    const { result } = await mount();
    expect(result.current.questions[0].status).toBe("not_learned");
  });

  it("derives learned once the count reaches the goal", async () => {
    localStorage.setItem(
      "interview-prep:progress",
      JSON.stringify({ 1: { status: "not_learned", favorite: false, learnedCount: 3, learnedGoal: 3 } })
    );

    const { result } = await mount();
    expect(result.current.questions[0].status).toBe("learned");
  });

  it("honours a custom goal when deriving", async () => {
    localStorage.setItem(
      "interview-prep:progress",
      JSON.stringify({ 1: { status: "x", favorite: false, learnedCount: 3, learnedGoal: 5 } })
    );

    const { result } = await mount();
    expect(result.current.questions[0].status).toBe("not_learned");
  });
});

describe("updateProgress", () => {
  it("accepts an updater function", async () => {
    const { result } = await mount();

    await act(async () => result.current.updateProgress(1, (p) => ({ ...p, learnedCount: 2 })));

    expect(result.current.questions[0].learnedCount).toBe(2);
  });

  it("accepts a patch object", async () => {
    const { result } = await mount();

    await act(async () => result.current.updateProgress(1, { favorite: true }));

    expect(result.current.questions[0].favorite).toBe(true);
  });

  it("starts from the defaults for a question with no saved progress", async () => {
    const { result } = await mount();

    await act(async () => result.current.updateProgress(1, (p) => ({ ...p, learnedCount: p.learnedCount + 1 })));

    expect(result.current.questions[0].learnedCount).toBe(1);
  });

  it("re-derives status after an update", async () => {
    const { result } = await mount();

    await act(async () => result.current.updateProgress(1, { learnedCount: 3, learnedGoal: 3 }));

    expect(result.current.questions[0].status).toBe("learned");
  });

  it("leaves other questions untouched", async () => {
    const { result } = await mount();

    await act(async () => result.current.updateProgress(1, { favorite: true }));

    expect(result.current.questions[1].favorite).toBe(false);
  });

  it("persists to the progress key only", async () => {
    const { result } = await mount();

    await act(async () => result.current.updateProgress(1, { favorite: true }));

    expect(JSON.parse(localStorage.getItem("interview-prep:progress"))).toMatchObject({
      1: { favorite: true },
    });
    // Never the task keys — the shapes differ.
    expect(localStorage.getItem("interview-prep:tasks")).toBeNull();
  });
});

describe("filters", () => {
  it("starts from the defaults", async () => {
    const { result } = await mount();
    expect(result.current.filters).toEqual(DEFAULT_FILTERS);
  });

  it("restores saved filters, spread over the defaults", async () => {
    localStorage.setItem("interview-prep:filters", JSON.stringify({ query: "react" }));
    const { result } = await mount();
    expect(result.current.filters).toEqual({ ...DEFAULT_FILTERS, query: "react" });
  });

  it("accepts a patch and an updater", async () => {
    const { result } = await mount();

    await act(async () => result.current.setFilters({ query: "a" }));
    expect(result.current.filters.query).toBe("a");

    await act(async () => result.current.setFilters((f) => ({ ...f, query: `${f.query}b` })));
    expect(result.current.filters.query).toBe("ab");
  });

  it("resets to the defaults", async () => {
    const { result } = await mount();

    await act(async () => result.current.setFilters({ query: "a", favoriteOnly: true }));
    await act(async () => result.current.resetFilters());

    expect(result.current.filters).toEqual(DEFAULT_FILTERS);
  });

  it("persists filters under their own key", async () => {
    const { result } = await mount();

    await act(async () => result.current.setFilters({ query: "hooks" }));

    expect(JSON.parse(localStorage.getItem("interview-prep:filters"))).toMatchObject({
      query: "hooks",
    });
  });

  it("gives a new filters identity on change, which is what resets pagination", async () => {
    const { result } = await mount();
    const before = result.current.filters;

    await act(async () => result.current.setFilters({ query: "x" }));

    // QuestionListPage compares filter identity to decide to jump to page 1.
    expect(result.current.filters).not.toBe(before);
  });
});

describe("useQuestions outside a provider", () => {
  it("throws rather than returning undefined", () => {
    expect(() => renderHook(() => useQuestions())).toThrow(/within a QuestionsProvider/);
  });
});
