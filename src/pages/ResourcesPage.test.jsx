import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { resources } from "../data/resources.js";
import { ResourcesPage } from "./ResourcesPage.jsx";
import en from "../i18n/locales/en.js";

// Resources have no provider to mock — the hook reads the static bank plus
// persisted filters, so this page is tested against the real 26 resources.
function visibleNames(container) {
  return [...container.querySelectorAll(".resource-card__title")].map((el) => el.textContent.trim());
}

function pageButton(n) {
  return within(screen.getByRole("navigation", { name: en["pagination.label"] })).getByRole(
    "button",
    { name: String(n) }
  );
}

describe("ResourcesPage", () => {
  it("lists ten resources per page", () => {
    const { container } = renderWithProviders(<ResourcesPage />);
    expect(visibleNames(container)).toHaveLength(10);
  });

  it("pages through the rest", async () => {
    const { container } = renderWithProviders(<ResourcesPage />);
    const firstPage = visibleNames(container);

    await userEvent.click(pageButton(2));

    expect(visibleNames(container)).not.toEqual(firstPage);
    expect(visibleNames(container)).toHaveLength(10);
  });

  it("shows the remainder on the last page", async () => {
    const { container } = renderWithProviders(<ResourcesPage />);
    const pageCount = Math.ceil(resources.length / 10);

    await userEvent.click(pageButton(pageCount));

    expect(visibleNames(container)).toHaveLength(resources.length - (pageCount - 1) * 10);
  });

  it("filters by query, through the sidebar", async () => {
    const { container } = renderWithProviders(<ResourcesPage />);

    await userEvent.type(
      screen.getByPlaceholderText(en["filters.resourcePlaceholder"]),
      resources[0].name.slice(0, 6)
    );

    expect(visibleNames(container).length).toBeLessThan(10);
    expect(visibleNames(container)[0]).toContain(resources[0].name.slice(0, 6));
  });

  it("shows the empty state when the filters match nothing", async () => {
    renderWithProviders(<ResourcesPage />);

    await userEvent.type(
      screen.getByPlaceholderText(en["filters.resourcePlaceholder"]),
      "zzz-nothing-matches-zzz"
    );

    expect(screen.getByText(en["resources.empty"])).toBeInTheDocument();
    expect(document.querySelector(".resource-list")).toBeNull();
  });

  it("restores the page when the filter is cleared", async () => {
    const { container } = renderWithProviders(<ResourcesPage />);
    const input = screen.getByPlaceholderText(en["filters.resourcePlaceholder"]);

    await userEvent.type(input, "zzz");
    await userEvent.clear(input);

    expect(visibleNames(container)).toHaveLength(10);
  });

  it("shows its title and breadcrumbs", () => {
    renderWithProviders(<ResourcesPage />);
    expect(screen.getByRole("heading", { name: en["resources.title"] })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: en["breadcrumb.label"] })).toBeInTheDocument();
  });
});
