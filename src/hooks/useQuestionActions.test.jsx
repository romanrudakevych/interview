import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { makeQuestion } from "../../test/fixtures/questions.js";
import { setQuestions } from "../../test/helpers/mockContexts.js";
import { useQuestionActions } from "./useQuestionActions.js";

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

/**
 * Renders the hook and returns it alongside a helper that applies whatever
 * updater the action passed to updateProgress. The hook never writes state
 * itself — it hands an updater function to the context — so applying it to a
 * known starting point is how its logic gets observed.
 */
function setup(progress = {}) {
  const value = setQuestions({});
  const { result } = renderHook(() => useQuestionActions());

  function apply(current) {
    expect(value.updateProgress).toHaveBeenCalledOnce();
    const [id, updater] = value.updateProgress.mock.calls[0];
    return { id, next: updater({ ...current }) };
  }

  return { actions: result.current, updateProgress: value.updateProgress, apply, progress };
}

const PROGRESS = { status: "not_learned", favorite: false, learnedCount: 0, learnedGoal: 3 };

describe("learn", () => {
  it("increments learnedCount for the given id", () => {
    const { actions, apply } = setup();
    actions.learn(7);
    expect(apply(PROGRESS)).toEqual({ id: 7, next: { ...PROGRESS, learnedCount: 1 } });
  });

  it("caps learnedCount at learnedGoal", () => {
    const { actions, apply } = setup();
    actions.learn(1);
    expect(apply({ ...PROGRESS, learnedCount: 3 }).next.learnedCount).toBe(3);
  });

  it("caps against a non-default goal", () => {
    const { actions, apply } = setup();
    actions.learn(1);
    expect(apply({ ...PROGRESS, learnedCount: 5, learnedGoal: 5 }).next.learnedCount).toBe(5);
  });

  it("preserves the other progress fields", () => {
    const { actions, apply } = setup();
    actions.learn(1);
    expect(apply({ ...PROGRESS, favorite: true }).next.favorite).toBe(true);
  });

  it("does not set status itself — that is derived in the context", () => {
    const { actions, apply } = setup();
    actions.learn(1);
    // Reaching the goal must not write status: QuestionsContext derives it, so
    // writing it here is what would let the badge drift.
    expect(apply({ ...PROGRESS, learnedCount: 2 }).next.status).toBe("not_learned");
  });
});

describe("repeat", () => {
  it("resets learnedCount to zero", () => {
    const { actions, apply } = setup();
    actions.repeat(4);
    expect(apply({ ...PROGRESS, learnedCount: 3 })).toEqual({
      id: 4,
      next: { ...PROGRESS, learnedCount: 0 },
    });
  });

  it("leaves favorite alone", () => {
    const { actions, apply } = setup();
    actions.repeat(4);
    expect(apply({ ...PROGRESS, learnedCount: 2, favorite: true }).next.favorite).toBe(true);
  });
});

describe("toggleFavorite", () => {
  it("turns a favorite on", () => {
    const { actions, apply } = setup();
    actions.toggleFavorite(3);
    expect(apply(PROGRESS).next.favorite).toBe(true);
  });

  it("turns a favorite off again", () => {
    const { actions, apply } = setup();
    actions.toggleFavorite(3);
    expect(apply({ ...PROGRESS, favorite: true }).next.favorite).toBe(false);
  });

  it("leaves learnedCount alone", () => {
    const { actions, apply } = setup();
    actions.toggleFavorite(3);
    expect(apply({ ...PROGRESS, learnedCount: 2 }).next.learnedCount).toBe(2);
  });
});

describe("canRepeat", () => {
  it("is false before anything has been learned", () => {
    const { actions } = setup();
    expect(actions.canRepeat(makeQuestion({ learnedCount: 0 }))).toBe(false);
  });

  it("is true once something has been learned", () => {
    const { actions } = setup();
    expect(actions.canRepeat(makeQuestion({ learnedCount: 1 }))).toBe(true);
  });

  it("is true for a fully learned question", () => {
    const { actions } = setup();
    expect(actions.canRepeat(makeQuestion({ learnedCount: 3, status: "learned" }))).toBe(true);
  });
});

describe("identity", () => {
  it("keeps the callbacks stable across renders", () => {
    // Both QuestionCardMenu and QuestionActionsBar take these as props-ish
    // values; a new identity every render would defeat their memoisation.
    setQuestions({});
    const { result, rerender } = renderHook(() => useQuestionActions());
    const first = result.current;
    rerender();
    expect(result.current.learn).toBe(first.learn);
    expect(result.current.repeat).toBe(first.repeat);
    expect(result.current.toggleFavorite).toBe(first.toggleFavorite);
    expect(result.current.canRepeat).toBe(first.canRepeat);
  });
});
