import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { Pagination } from "./Pagination.jsx";
import en from "../i18n/locales/en.js";

/** The page row as a reader sees it: numbers and ellipses in order. */
function visibleItems() {
  return [...document.querySelectorAll(".pagination__page, .pagination__ellipsis")].map(
    (el) => el.textContent
  );
}

function setup({ page = 1, pageCount = 10, onChange = vi.fn() } = {}) {
  renderWithProviders(<Pagination page={page} pageCount={pageCount} onChange={onChange} />);
  return { onChange };
}

describe("when there is nothing to paginate", () => {
  it("renders nothing for a single page", () => {
    const { container } = renderWithProviders(
      <Pagination page={1} pageCount={1} onChange={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing for zero pages", () => {
    const { container } = renderWithProviders(
      <Pagination page={1} pageCount={0} onChange={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("the page row", () => {
  it("lists every page when there are 7 or fewer, with no ellipsis", () => {
    setup({ page: 1, pageCount: 7 });
    expect(visibleItems()).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
  });

  // The documented shapes — the row keeps a fixed width whether there are 8
  // pages or 337.
  it.each([
    [1, 312, ["1", "2", "3", "4", "5", "6", "…", "312"]],
    [4, 312, ["1", "2", "3", "4", "5", "6", "…", "312"]],
    [5, 312, ["1", "…", "4", "5", "6", "…", "312"]],
    [50, 312, ["1", "…", "49", "50", "51", "…", "312"]],
    [309, 312, ["1", "…", "307", "308", "309", "310", "311", "312"]],
    [310, 312, ["1", "…", "307", "308", "309", "310", "311", "312"]],
    [312, 312, ["1", "…", "307", "308", "309", "310", "311", "312"]],
  ])("collapses page %i of %i correctly", (page, pageCount, expected) => {
    setup({ page, pageCount });
    expect(visibleItems()).toEqual(expected);
  });

  it("keeps the row the same width across the middle pages", () => {
    const widths = new Set();
    for (const page of [5, 50, 150, 308]) {
      document.body.innerHTML = "";
      setup({ page, pageCount: 312 });
      widths.add(visibleItems().length);
    }
    expect(widths.size).toBe(1);
  });

  it("marks the active page for assistive tech", () => {
    setup({ page: 3, pageCount: 10 });
    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "4" })).not.toHaveAttribute("aria-current");
  });

  it("styles only the active page", () => {
    setup({ page: 3, pageCount: 10 });
    expect(screen.getByRole("button", { name: "3" })).toHaveClass("pagination__page--active");
    expect(screen.getByRole("button", { name: "2" })).not.toHaveClass("pagination__page--active");
  });

  it("hides the ellipsis from assistive tech", () => {
    const { container } = renderWithProviders(
      <Pagination page={50} pageCount={312} onChange={vi.fn()} />
    );
    expect(container.querySelector(".pagination__ellipsis")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("navigation", () => {
  it("reports the clicked page", async () => {
    const { onChange } = setup({ page: 1, pageCount: 10 });
    await userEvent.click(screen.getByRole("button", { name: "3" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("steps back and forward with the arrows", async () => {
    const { onChange } = setup({ page: 5, pageCount: 10 });

    await userEvent.click(screen.getByRole("button", { name: en["pagination.previousPage"] }));
    expect(onChange).toHaveBeenCalledWith(4);

    await userEvent.click(screen.getByRole("button", { name: en["pagination.nextPage"] }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("disables the previous arrow on the first page", () => {
    setup({ page: 1, pageCount: 10 });
    expect(screen.getByRole("button", { name: en["pagination.previousPage"] })).toBeDisabled();
    expect(screen.getByRole("button", { name: en["pagination.nextPage"] })).toBeEnabled();
  });

  it("disables the next arrow on the last page", () => {
    setup({ page: 10, pageCount: 10 });
    expect(screen.getByRole("button", { name: en["pagination.nextPage"] })).toBeDisabled();
    expect(screen.getByRole("button", { name: en["pagination.previousPage"] })).toBeEnabled();
  });

  it("labels the nav", () => {
    setup();
    expect(screen.getByRole("navigation", { name: en["pagination.label"] })).toBeInTheDocument();
  });
});
