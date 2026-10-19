import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { LOCALES } from "../i18n/index.jsx";
import { LanguageSelect } from "./LanguageSelect.jsx";
import en from "../i18n/locales/en.js";

describe("LanguageSelect", () => {
  it("is a native select, for free keyboard and screen-reader behaviour", () => {
    renderWithProviders(<LanguageSelect />);
    expect(screen.getByRole("combobox")).toBeInstanceOf(HTMLSelectElement);
  });

  it("has an accessible name", () => {
    renderWithProviders(<LanguageSelect />);
    expect(screen.getByRole("combobox", { name: en["language.label"] })).toBeInTheDocument();
  });

  it("offers every locale, each labelled in its own language", () => {
    renderWithProviders(<LanguageSelect />);
    const options = screen.getAllByRole("option");
    expect(options.map((o) => o.textContent)).toEqual(LOCALES.map((l) => l.label));
    expect(options.map((o) => o.value)).toEqual(LOCALES.map((l) => l.code));
  });

  it("shows the active language as selected", () => {
    renderWithProviders(<LanguageSelect />, { lang: "cs" });
    expect(screen.getByRole("combobox")).toHaveValue("cs");
  });

  it("switches language on change", async () => {
    renderWithProviders(<LanguageSelect />, { lang: "en" });

    await userEvent.selectOptions(screen.getByRole("combobox"), "uk");

    expect(screen.getByRole("combobox")).toHaveValue("uk");
    // The choice is persisted by the provider, under its own bare-string key.
    expect(localStorage.getItem("interview-prep:language")).toBe("uk");
  });

  it("updates the document language as a side effect of the switch", async () => {
    renderWithProviders(<LanguageSelect />, { lang: "en" });
    await userEvent.selectOptions(screen.getByRole("combobox"), "ru");
    expect(document.documentElement.lang).toBe("ru");
  });
});
