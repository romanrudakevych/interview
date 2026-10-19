import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { resources } from "../../test/fixtures/resources.js";
import { ResourceCard } from "./ResourceCard.jsx";

const [mdn, froggy, book] = resources;

describe("the destination link", () => {
  it("links the title to the resource url", () => {
    render(<ResourceCard resource={mdn} />);
    expect(screen.getByRole("link", { name: /MDN Web Docs/ })).toHaveAttribute("href", mdn.url);
  });

  it("opens external links safely", () => {
    // rel=noopener is what stops the target page reaching back through
    // window.opener.
    render(<ResourceCard resource={mdn} />);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("shows the host, without the www prefix", () => {
    render(<ResourceCard resource={froggy} />);
    // https://www.flexboxfroggy.com/ -> flexboxfroggy.com
    expect(screen.getByText("flexboxfroggy.com")).toBeInTheDocument();
  });

  it("shows the host as-is for a url it cannot parse", () => {
    render(<ResourceCard resource={book} />);
    expect(screen.getByText("not a url")).toBeInTheDocument();
  });
});

describe("the thumbnail", () => {
  it("hot-links the upstream image when there is one", () => {
    render(<ResourceCard resource={mdn} />);
    const img = screen.getByRole("presentation");
    expect(img).toHaveAttribute("src", mdn.image);
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("falls back to an initial-letter tile when there is no image", () => {
    const { container } = render(<ResourceCard resource={froggy} />);
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector(".resource-card__thumb-fallback")).toHaveTextContent("F");
  });

  it("swaps in the fallback when the image 404s", () => {
    // Thumbnails come from an upstream CDN, so a dead one is expected rather
    // than exceptional — a broken-image icon would look like our bug.
    const { container } = render(<ResourceCard resource={mdn} />);

    fireEvent.error(screen.getByRole("presentation"));

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector(".resource-card__thumb-fallback")).toHaveTextContent("M");
  });
});

describe("the body", () => {
  it("shows the type and description", () => {
    render(<ResourceCard resource={mdn} />);
    expect(screen.getByText(mdn.type)).toBeInTheDocument();
    expect(screen.getByText(mdn.description)).toBeInTheDocument();
  });

  it("lists the skills as tags", () => {
    render(<ResourceCard resource={mdn} />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("HTML")).toBeInTheDocument();
  });

  it("renders no tag row for a resource with no skills", () => {
    const { container } = render(<ResourceCard resource={book} />);
    expect(container.querySelector(".resource-card__tags")).toBeNull();
  });

  it("needs no i18n provider at all", () => {
    // The only component with no translated chrome — it renders upstream text
    // only, which is why it is rendered here without providers.
    expect(() => render(<ResourceCard resource={book} />)).not.toThrow();
  });
});
