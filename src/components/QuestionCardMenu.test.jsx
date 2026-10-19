import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeQuestion } from "../../test/fixtures/questions.js";
import { setQuestions } from "../../test/helpers/mockContexts.js";
import { QuestionCardMenu } from "./QuestionCardMenu.jsx";
import en from "../i18n/locales/en.js";

const navigate = vi.fn();

vi.mock("../context/QuestionsContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { questionsRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useQuestions: () => questionsRef.current };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => navigate };
});

function setup(question = makeQuestion()) {
  navigate.mockClear();
  const value = setQuestions({});
  renderWithProviders(<QuestionCardMenu question={question} />);
  return {
    updateProgress: value.updateProgress,
    trigger: screen.getByRole("button", { name: en["actions.questionActions"] }),
  };
}

async function openMenu(question) {
  const utils = setup(question);
  await userEvent.click(utils.trigger);
  return utils;
}

describe("opening and closing", () => {
  it("starts closed", () => {
    setup();
    expect(screen.queryByRole("button", { name: en["actions.learn"] })).toBeNull();
  });

  it("opens on the trigger", async () => {
    await openMenu();
    expect(screen.getByRole("button", { name: en["actions.learn"] })).toBeInTheDocument();
  });

  it("closes again on a second click", async () => {
    const { trigger } = await openMenu();
    await userEvent.click(trigger);
    expect(screen.queryByRole("button", { name: en["actions.learn"] })).toBeNull();
  });

  it("closes on a mousedown outside", async () => {
    await openMenu();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("button", { name: en["actions.learn"] })).toBeNull();
  });

  it("stays open on a mousedown inside", async () => {
    await openMenu();
    fireEvent.mouseDown(screen.getByRole("button", { name: en["actions.learn"] }));
    expect(screen.getByRole("button", { name: en["actions.learn"] })).toBeInTheDocument();
  });

  it("removes the document listener once closed", async () => {
    const remove = vi.spyOn(document, "removeEventListener");
    const { trigger } = await openMenu();

    await userEvent.click(trigger);

    expect(remove).toHaveBeenCalledWith("mousedown", expect.any(Function));
  });

  it("removes the document listener on unmount", async () => {
    const remove = vi.spyOn(document, "removeEventListener");
    const value = setQuestions({});
    const { unmount } = renderWithProviders(<QuestionCardMenu question={makeQuestion()} />);
    await userEvent.click(screen.getByRole("button", { name: en["actions.questionActions"] }));

    unmount();

    expect(remove).toHaveBeenCalledWith("mousedown", expect.any(Function));
    expect(value).toBeTruthy();
  });

  it("adds no listener while closed", () => {
    const add = vi.spyOn(document, "addEventListener");
    setup();
    expect(add).not.toHaveBeenCalledWith("mousedown", expect.any(Function));
  });
});

describe("the items", () => {
  it("navigates to the details page and closes", async () => {
    await openMenu(makeQuestion({ id: 17 }));

    await userEvent.click(screen.getByRole("button", { name: en["actions.more"] }));

    expect(navigate).toHaveBeenCalledWith("/knowledge-base/questions/17");
    expect(screen.queryByRole("button", { name: en["actions.more"] })).toBeNull();
  });

  it("learns and closes", async () => {
    const { updateProgress } = await openMenu(makeQuestion({ id: 4 }));

    await userEvent.click(screen.getByRole("button", { name: en["actions.learn"] }));

    expect(updateProgress).toHaveBeenCalledWith(4, expect.any(Function));
    expect(screen.queryByRole("button", { name: en["actions.learn"] })).toBeNull();
  });

  it("disables Repeat at a zero count, and does nothing if it is clicked", async () => {
    const { updateProgress } = await openMenu(makeQuestion({ learnedCount: 0 }));
    const repeat = screen.getByRole("button", { name: en["actions.repeat"] });

    expect(repeat).toBeDisabled();
    // Belt and braces: the handler also guards, so force the click through.
    fireEvent.click(repeat);
    expect(updateProgress).not.toHaveBeenCalled();
  });

  it("repeats and closes once something has been learned", async () => {
    const { updateProgress } = await openMenu(makeQuestion({ id: 9, learnedCount: 2 }));

    await userEvent.click(screen.getByRole("button", { name: en["actions.repeat"] }));

    expect(updateProgress).toHaveBeenCalledWith(9, expect.any(Function));
    expect(screen.queryByRole("button", { name: en["actions.repeat"] })).toBeNull();
  });

  it("offers Favorite for a question that is not starred", async () => {
    await openMenu(makeQuestion({ favorite: false }));
    expect(screen.getByRole("button", { name: en["actions.favorite"] })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: en["actions.unfavorite"] })).toBeNull();
  });

  it("offers Unfavorite for a starred one", async () => {
    await openMenu(makeQuestion({ favorite: true }));
    expect(screen.getByRole("button", { name: en["actions.unfavorite"] })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: en["actions.favorite"] })).toBeNull();
  });

  it("toggles the favorite and closes", async () => {
    const { updateProgress } = await openMenu(makeQuestion({ id: 6 }));

    await userEvent.click(screen.getByRole("button", { name: en["actions.favorite"] }));

    expect(updateProgress).toHaveBeenCalledWith(6, expect.any(Function));
    expect(screen.queryByRole("button", { name: en["actions.favorite"] })).toBeNull();
  });
});
