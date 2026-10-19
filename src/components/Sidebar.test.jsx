import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { Sidebar } from "./Sidebar.jsx";
import en from "../i18n/locales/en.js";
import ru from "../i18n/locales/ru.js";

describe("Sidebar", () => {
  it("shows the untranslated product name", () => {
    renderWithProviders(<Sidebar />, { lang: "ru" });
    // The brand deliberately stays "Interview Prep" in every locale.
    expect(screen.getByText("Interview Prep")).toBeInTheDocument();
    expect(screen.getByText("IP")).toBeInTheDocument();
  });

  it("links every route in the nav", () => {
    renderWithProviders(<Sidebar />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual([
      "/",
      "/training/interview",
      "/training/tasks",
      "/knowledge-base/resources",
      "/knowledge-base/questions",
      "/knowledge-base/collections",
      "/analytics",
    ]);
  });

  it("names each link from the catalogue", () => {
    renderWithProviders(<Sidebar />);
    for (const key of [
      "nav.home",
      "nav.interview",
      "nav.tasks",
      "nav.resources",
      "nav.questions",
      "nav.collections",
      "nav.analytics",
    ]) {
      expect(screen.getByRole("link", { name: en[key] })).toBeInTheDocument();
    }
  });

  it("groups Training and Knowledge base under section titles", () => {
    renderWithProviders(<Sidebar />);
    expect(screen.getByText(en["nav.training"])).toBeInTheDocument();
    expect(screen.getByText(en["nav.knowledgeBase"])).toBeInTheDocument();
  });

  it("translates the nav", () => {
    renderWithProviders(<Sidebar />, { lang: "ru" });
    expect(screen.getByRole("link", { name: ru["nav.questions"] })).toBeInTheDocument();
  });

  it("marks the active route", () => {
    renderWithProviders(<Sidebar />, { route: "/training/tasks" });
    expect(screen.getByRole("link", { name: en["nav.tasks"] })).toHaveClass("sidebar__link--active");
    expect(screen.getByRole("link", { name: en["nav.interview"] })).not.toHaveClass(
      "sidebar__link--active"
    );
  });

  it("does not mark Home active on a nested route", () => {
    // `end: true` is what keeps "/" from matching every path.
    renderWithProviders(<Sidebar />, { route: "/analytics" });
    expect(screen.getByRole("link", { name: en["nav.home"] })).not.toHaveClass(
      "sidebar__link--active"
    );
    expect(screen.getByRole("link", { name: en["nav.analytics"] })).toHaveClass(
      "sidebar__link--active"
    );
  });

  it("marks Home active at the root", () => {
    renderWithProviders(<Sidebar />, { route: "/" });
    expect(screen.getByRole("link", { name: en["nav.home"] })).toHaveClass("sidebar__link--active");
  });

  it("includes the language selector", () => {
    renderWithProviders(<Sidebar />);
    expect(screen.getByRole("combobox", { name: en["language.label"] })).toBeInTheDocument();
  });
});
