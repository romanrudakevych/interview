import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { RESOURCE_SKILLS, RESOURCE_TYPES } from "../data/resources.js";
import { DEFAULT_RESOURCE_FILTERS } from "../hooks/useResources.js";
import { ResourceFilterSidebar } from "./ResourceFilterSidebar.jsx";
import en from "../i18n/locales/en.js";

// The only filter sidebar driven by props rather than a context: resources have
// no provider, because they have no progress to merge.
function setup({ filters = {} } = {}) {
  const props = {
    filters: { ...DEFAULT_RESOURCE_FILTERS, ...filters },
    setFilters: vi.fn(),
    resetFilters: vi.fn(),
  };
  renderWithProviders(<ResourceFilterSidebar {...props} />);
  return props;
}

function applied(setFilters, current) {
  const arg = setFilters.mock.calls.at(-1)[0];
  return typeof arg === "function" ? arg(current) : { ...current, ...arg };
}

describe("ResourceFilterSidebar", () => {
  it("offers every type derived from the bank", () => {
    setup();
    for (const type of RESOURCE_TYPES) {
      expect(screen.getByRole("button", { name: type })).toBeInTheDocument();
    }
  });

  it("offers every skill derived from the bank", () => {
    setup();
    // Derived from the resources actually present, so a chip can never match
    // nothing.
    for (const skill of RESOURCE_SKILLS) {
      expect(screen.getByRole("button", { name: skill })).toBeInTheDocument();
    }
  });

  it("toggles a type", async () => {
    const { setFilters, filters } = setup();

    await userEvent.click(screen.getByRole("button", { name: RESOURCE_TYPES[0] }));

    expect(applied(setFilters, filters).types).toEqual([RESOURCE_TYPES[0]]);
  });

  it("removes an already-selected type", async () => {
    const { setFilters, filters } = setup({ filters: { types: RESOURCE_TYPES.slice(0, 2) } });

    await userEvent.click(screen.getByRole("button", { name: RESOURCE_TYPES[0] }));

    expect(applied(setFilters, filters).types).toEqual([RESOURCE_TYPES[1]]);
  });

  it("toggles a skill", async () => {
    const { setFilters, filters } = setup();

    await userEvent.click(screen.getByRole("button", { name: RESOURCE_SKILLS[0] }));

    expect(applied(setFilters, filters).skills).toEqual([RESOURCE_SKILLS[0]]);
  });

  it("marks active chips", () => {
    setup({ filters: { types: [RESOURCE_TYPES[0]], skills: [RESOURCE_SKILLS[0]] } });
    expect(screen.getByRole("button", { name: RESOURCE_TYPES[0] })).toHaveClass("chip--active");
    expect(screen.getByRole("button", { name: RESOURCE_SKILLS[0] })).toHaveClass("skill-tag--active");
  });

  it("shows and updates the query", async () => {
    const { setFilters } = setup({ filters: { query: "md" } });
    const input = screen.getByPlaceholderText(en["filters.resourcePlaceholder"]);

    expect(input).toHaveValue("md");
    await userEvent.type(input, "n");

    expect(setFilters).toHaveBeenCalledWith({ query: "mdn" });
  });

  it("hides reset until a filter is active", () => {
    setup();
    expect(screen.queryByRole("button", { name: en["filters.reset"] })).toBeNull();
  });

  it.each([
    ["a query", { query: "x" }],
    ["a type", { types: [RESOURCE_TYPES[0]] }],
    ["a skill", { skills: [RESOURCE_SKILLS[0]] }],
  ])("shows reset when %s is set", (_label, filters) => {
    setup({ filters });
    expect(screen.getByRole("button", { name: en["filters.reset"] })).toBeInTheDocument();
  });

  it("calls resetFilters", async () => {
    const { resetFilters } = setup({ filters: { query: "x" } });
    await userEvent.click(screen.getByRole("button", { name: en["filters.reset"] }));
    expect(resetFilters).toHaveBeenCalled();
  });
});
