import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App.jsx";
import en from "./i18n/locales/en.js";

// The whole app, with the real providers and the real router — the one test
// that proves the route table in App.jsx matches the sidebar's links. Only the
// history is replaced, because BrowserRouter reads window.location.
function renderAt(path) {
  window.history.pushState({}, "", path);
  localStorage.setItem("interview-prep:language", "en");
  return render(<App />);
}

describe("routing", () => {
  it.each([
    ["/", "home.title"],
    ["/training/interview", "interview.title"],
    ["/training/tasks", "tasks.title"],
    ["/knowledge-base/resources", "resources.title"],
    ["/knowledge-base/questions", "questions.pageTitle"],
    ["/knowledge-base/collections", "collections.title"],
    ["/analytics", "analytics.title"],
  ])("renders %s", async (path, titleKey) => {
    renderAt(path);
    expect(
      await screen.findByRole("heading", { level: 1, name: en[titleKey] })
    ).toBeInTheDocument();
  });

  it("renders a task's details page", async () => {
    renderAt("/training/tasks/1");
    // The title comes from the task bank, so assert on the editor instead.
    expect(await screen.findByRole("textbox", { name: en["tasks.editorLabel"] })).toBeInTheDocument();
  });

  it("renders a question's details page", async () => {
    renderAt("/knowledge-base/questions/1");
    await waitFor(() =>
      expect(document.querySelector(".progress-sidebar")).toBeInTheDocument()
    );
  });

  it("redirects an unknown path to home", async () => {
    renderAt("/nope/nowhere");
    expect(
      await screen.findByRole("heading", { level: 1, name: en["home.title"] })
    ).toBeInTheDocument();
  });

  it("shows the sidebar on every page", async () => {
    renderAt("/analytics");
    expect(await screen.findByText("Interview Prep")).toBeInTheDocument();
  });
});

describe("the provider stack", () => {
  it("puts the language provider outermost, so the sidebar can translate", async () => {
    localStorage.setItem("interview-prep:language", "ru");
    window.history.pushState({}, "", "/");
    const ru = (await import("./i18n/locales/ru.js")).default;

    render(<App />);

    expect(await screen.findByRole("link", { name: ru["nav.questions"] })).toBeInTheDocument();
  });

  it("provides the questions context to the pages", async () => {
    renderAt("/");
    // The totals come from the real generated index, so a non-zero count proves
    // the provider resolved and the page consumed it.
    await waitFor(() => {
      const total = document.querySelector(".stat-card__value");
      expect(Number(total.textContent)).toBeGreaterThan(0);
    });
  });

  it("provides the tasks context to the pages", async () => {
    renderAt("/training/tasks");
    await waitFor(() => expect(document.querySelectorAll(".task-card").length).toBe(10));
  });

  it("mounts without warnings", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    renderAt("/");
    await screen.findByRole("heading", { level: 1, name: en["home.title"] });
    expect(error).not.toHaveBeenCalled();
  });
});
