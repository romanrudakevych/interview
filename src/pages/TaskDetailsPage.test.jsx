import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { makeTask, tasks } from "../../test/fixtures/tasks.js";
import { setTasks } from "../../test/helpers/mockContexts.js";
import { TaskDetailsPage } from "./TaskDetailsPage.jsx";
import en from "../i18n/locales/en.js";

let params = { id: "1" };
const runCode = vi.fn();

vi.mock("../context/TasksContext.jsx", async (importOriginal) => {
  const actual = await importOriginal();
  const { tasksRef } = await import("../../test/helpers/mockContexts.js");
  return { ...actual, useTasks: () => tasksRef.current };
});

vi.mock("../utils/runCode.js", () => ({ runCode: (...args) => runCode(...args) }));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useParams: () => params };
});

beforeEach(() => {
  runCode.mockReset();
  runCode.mockResolvedValue({ ok: true, results: [] });
});

function setup({ id = "1", ...state } = {}) {
  params = { id };
  const value = setTasks(state);
  return { ...renderWithProviders(<TaskDetailsPage />), value };
}

const tab = (key) => screen.getByRole("button", { name: en[key] });
const runButton = () => screen.getByRole("button", { name: new RegExp(en["tasks.run"]) });
const submitButton = () => screen.getByRole("button", { name: new RegExp(en["tasks.submit"]) });

describe("an unknown task", () => {
  it("says so and links back to the list", () => {
    setup({ id: "999999" });
    expect(document.querySelector(".empty-state")).toHaveTextContent(en["tasks.notFound"]);
    expect(screen.getByRole("link", { name: en["tasks.backToList"] })).toHaveAttribute(
      "href",
      "/training/tasks"
    );
  });

  it("renders no editor", () => {
    const { container } = setup({ id: "999999" });
    expect(container.querySelector(".code-editor")).toBeNull();
  });
});

describe("the description tab", () => {
  it("opens on the description", () => {
    setup({ id: "1" });
    expect(screen.getByRole("heading", { name: tasks[0].title })).toBeInTheDocument();
    expect(tab("tasks.tab.description")).toHaveClass("task-tab--active");
  });

  it("shows the status, difficulty, languages and categories", () => {
    const { container } = setup({ id: "3" });
    expect(screen.getByText(en["tasks.status.solved"])).toBeInTheDocument();
    expect(container.querySelector(".difficulty-badge--5")).toHaveTextContent("5");
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("shows the condition", () => {
    setup({ id: "1" });
    expect(screen.getByText(en["tasks.section.condition"])).toBeInTheDocument();
    // Inline code in the condition renders through FormattedText.
    expect(document.querySelector(".task-section__text code")).toHaveTextContent("a");
  });

  it("omits the sections an imported task does not have", () => {
    // Task 1's input/constraints/output/example are all empty; a heading over
    // an empty list reads as a bug.
    setup({ id: "1" });
    expect(screen.queryByText(en["tasks.section.input"])).toBeNull();
    expect(screen.queryByText(en["tasks.section.output"])).toBeNull();
    expect(screen.queryByText(en["tasks.section.constraints"])).toBeNull();
    expect(screen.queryByText(en["tasks.section.example"])).toBeNull();
  });

  it("shows every section a complete task does have", () => {
    setup({ id: "4" });
    expect(screen.getByText(en["tasks.section.input"])).toBeInTheDocument();
    expect(screen.getByText(en["tasks.section.output"])).toBeInTheDocument();
    expect(screen.getByText(en["tasks.section.constraints"])).toBeInTheDocument();
    expect(screen.getByText(en["tasks.section.example"])).toBeInTheDocument();
  });

  it("renders the example as plain text, not highlighted source", () => {
    const { container } = setup({ id: "4" });
    // "Вход/Выход" prose is not code, so it opts out of the tokenizer.
    expect(container.querySelector(".code-block .tok")).toBeNull();
  });
});

describe("the tabs", () => {
  it("switches to the test cases", async () => {
    setup({ id: "1" });

    await userEvent.click(tab("tasks.tab.tests"));

    expect(screen.getByText("1 + 1")).toBeInTheDocument();
    // The hidden case is withheld but counted.
    expect(screen.queryByText("hidden case")).toBeNull();
    expect(
      screen.getByText(en["tests.hiddenNote.one"].replace("{count}", "1"))
    ).toBeInTheDocument();
  });

  it("switches to the result tab, which starts idle", async () => {
    setup({ id: "1" });

    await userEvent.click(tab("tasks.tab.result"));

    expect(screen.getByText(en["tests.idle"])).toBeInTheDocument();
  });

  it("marks only the active tab", async () => {
    setup({ id: "1" });
    await userEvent.click(tab("tasks.tab.tests"));
    expect(tab("tasks.tab.tests")).toHaveClass("task-tab--active");
    expect(tab("tasks.tab.description")).not.toHaveClass("task-tab--active");
  });
});

describe("the editor", () => {
  it("starts from the starter code", () => {
    setup({ id: "1" });
    expect(screen.getByRole("textbox")).toHaveValue(tasks[0].starterCode);
  });

  it("prefers saved code over the starter", () => {
    setup({ id: "2" });
    expect(screen.getByRole("textbox")).toHaveValue(tasks[1].code);
  });

  it("persists each edit", async () => {
    const { value } = setup({ id: "1" });

    await userEvent.type(screen.getByRole("textbox"), "x");

    expect(value.updateTaskProgress).toHaveBeenCalledWith(1, expect.any(Function));
    const updater = value.updateTaskProgress.mock.calls[0][1];
    expect(updater({ code: null }).code).toContain("x");
  });

  it("resets to the template", async () => {
    const { value } = setup({ id: "2" });

    await userEvent.click(screen.getByRole("button", { name: en["tasks.resetToTemplate"] }));

    const updater = value.updateTaskProgress.mock.calls[0][1];
    expect(updater({ code: "edited" }).code).toBe(tasks[1].starterCode);
  });

  it("shows the language as a disabled select", () => {
    const { container } = setup({ id: "1" });
    expect(container.querySelector(".task-editor__lang")).toBeDisabled();
  });
});

describe("Run", () => {
  it("runs the visible tests only", async () => {
    setup({ id: "1" });

    await userEvent.click(runButton());

    await waitFor(() => expect(runCode).toHaveBeenCalled());
    expect(runCode).toHaveBeenCalledWith({
      code: tasks[0].starterCode,
      functionName: "sum",
      tests: [tasks[0].tests[0]],
    });
  });

  it("switches to the result tab", async () => {
    setup({ id: "1" });

    await userEvent.click(runButton());

    await waitFor(() => expect(tab("tasks.tab.result")).toHaveClass("task-tab--active"));
  });

  it("shows the results", async () => {
    runCode.mockResolvedValue({
      ok: true,
      results: [{ name: "1 + 1", hidden: false, passed: true, expected: "2", actual: "2", error: null }],
    });
    setup({ id: "1" });

    await userEvent.click(runButton());

    expect(
      await screen.findByText(en["tests.passed"].replace("{passed}", "1").replace("{total}", "1"))
    ).toBeInTheDocument();
  });

  it("never marks a task solved, however green the run", async () => {
    runCode.mockResolvedValue({
      ok: true,
      results: [{ name: "t", hidden: false, passed: true, expected: "2", actual: "2", error: null }],
    });
    const { value } = setup({ id: "1" });

    await userEvent.click(runButton());

    await waitFor(() => expect(runCode).toHaveBeenCalled());
    // Only Submit can do that — Run doesn't see the hidden tests.
    expect(value.updateTaskProgress).not.toHaveBeenCalled();
  });

  it("shows the worker's error", async () => {
    runCode.mockResolvedValue({
      ok: false,
      error: { code: "run.timeout", params: { ms: 2000 } },
    });
    setup({ id: "1" });

    await userEvent.click(runButton());

    expect(
      await screen.findByText(en["run.timeout"].replace("{ms}", "2000"))
    ).toBeInTheDocument();
  });

  it("disables both buttons while running", async () => {
    let release;
    runCode.mockReturnValue(new Promise((resolve) => (release = resolve)));
    setup({ id: "1" });

    await userEvent.click(runButton());

    expect(runButton()).toBeDisabled();
    expect(submitButton()).toBeDisabled();
    expect(screen.getByText(en["tests.running"])).toBeInTheDocument();

    release({ ok: true, results: [] });
    await waitFor(() => expect(runButton()).toBeEnabled());
  });
});

describe("Submit", () => {
  it("includes the hidden tests", async () => {
    setup({ id: "1" });

    await userEvent.click(submitButton());

    await waitFor(() => expect(runCode).toHaveBeenCalled());
    expect(runCode.mock.calls[0][0].tests).toEqual(tasks[0].tests);
  });

  it("marks the task solved when every test passes", async () => {
    runCode.mockResolvedValue({
      ok: true,
      results: [
        { name: "a", hidden: false, passed: true, expected: "1", actual: "1", error: null },
        { name: "b", hidden: true, passed: true, expected: "2", actual: "2", error: null },
      ],
    });
    const { value } = setup({ id: "1" });

    await userEvent.click(submitButton());

    await waitFor(() => expect(value.updateTaskProgress).toHaveBeenCalled());
    const updater = value.updateTaskProgress.mock.calls[0][1];
    expect(updater({ solved: false }).solved).toBe(true);
  });

  it("marks it unsolved when any test fails", async () => {
    runCode.mockResolvedValue({
      ok: true,
      results: [
        { name: "a", hidden: false, passed: true, expected: "1", actual: "1", error: null },
        { name: "b", hidden: true, passed: false, expected: "2", actual: "3", error: null },
      ],
    });
    const { value } = setup({ id: "1" });

    await userEvent.click(submitButton());

    await waitFor(() => expect(value.updateTaskProgress).toHaveBeenCalled());
    const updater = value.updateTaskProgress.mock.calls[0][1];
    // A previously solved task that now fails must not stay solved.
    expect(updater({ solved: true }).solved).toBe(false);
  });

  it("does not touch progress when the run itself failed", async () => {
    runCode.mockResolvedValue({ ok: false, error: { code: "run.executionError" } });
    const { value } = setup({ id: "1" });

    await userEvent.click(submitButton());

    expect(await screen.findByText(en["run.executionError"])).toBeInTheDocument();
    expect(value.updateTaskProgress).not.toHaveBeenCalled();
  });

  it("submits the edited code, not the starter", async () => {
    setup({ id: "2", tasks: [makeTask({ id: 2, code: "my solution", functionName: "reverse" })] });

    await userEvent.click(submitButton());

    await waitFor(() => expect(runCode).toHaveBeenCalled());
    expect(runCode.mock.calls[0][0]).toMatchObject({ code: "my solution", functionName: "reverse" });
  });
});
