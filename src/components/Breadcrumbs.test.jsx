import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { Breadcrumbs } from "./Breadcrumbs.jsx";
import en from "../i18n/locales/en.js";

describe("Breadcrumbs", () => {
  it("labels the nav for screen readers", () => {
    renderWithProviders(<Breadcrumbs items={[{ label: "Home" }]} />);
    expect(screen.getByRole("navigation", { name: en["breadcrumb.label"] })).toBeInTheDocument();
  });

  it("renders every label", () => {
    renderWithProviders(
      <Breadcrumbs items={[{ label: "Knowledge base", to: "/kb" }, { label: "Questions" }]} />
    );
    expect(screen.getByText("Knowledge base")).toBeInTheDocument();
    expect(screen.getByText("Questions")).toBeInTheDocument();
  });

  it("links an item that has a `to`", () => {
    renderWithProviders(
      <Breadcrumbs items={[{ label: "Knowledge base", to: "/kb" }, { label: "Questions" }]} />
    );
    expect(screen.getByRole("link", { name: "Knowledge base" })).toHaveAttribute("href", "/kb");
  });

  it("renders the last item as plain text even when it has a `to`", () => {
    // The last crumb is the current page; linking it would be a link to here.
    renderWithProviders(<Breadcrumbs items={[{ label: "First", to: "/a" }, { label: "Last", to: "/b" }]} />);
    expect(screen.queryByRole("link", { name: "Last" })).toBeNull();
    expect(screen.getByText("Last")).toHaveClass("breadcrumbs__current");
  });

  it("renders a single item as the current page with no separator", () => {
    const { container } = renderWithProviders(<Breadcrumbs items={[{ label: "Only" }]} />);
    expect(screen.getByText("Only")).toHaveClass("breadcrumbs__current");
    expect(container.querySelectorAll(".breadcrumbs__sep")).toHaveLength(0);
  });

  it("puts a separator between items but not after the last", () => {
    const { container } = renderWithProviders(
      <Breadcrumbs items={[{ label: "A" }, { label: "B" }, { label: "C" }]} />
    );
    expect(container.querySelectorAll(".breadcrumbs__sep")).toHaveLength(2);
  });

  it("renders an item with no `to` as text, mid-trail", () => {
    renderWithProviders(<Breadcrumbs items={[{ label: "Training" }, { label: "Interview" }]} />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders nothing for an empty list", () => {
    const { container } = renderWithProviders(<Breadcrumbs items={[]} />);
    expect(container.querySelectorAll(".breadcrumbs__item")).toHaveLength(0);
  });
});
