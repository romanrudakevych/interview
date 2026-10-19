import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormattedText } from "./FormattedText.jsx";

/** The text content as a reader sees it, with the <code> runs identified. */
function codeRuns(container) {
  return [...container.querySelectorAll("code.inline-code")].map((el) => el.textContent);
}

describe("FormattedText", () => {
  it("renders plain text unchanged", () => {
    const { container } = render(<FormattedText text="Just prose." />);
    expect(container).toHaveTextContent("Just prose.");
    expect(codeRuns(container)).toEqual([]);
  });

  it("turns a backtick segment into inline code", () => {
    const { container } = render(<FormattedText text="Use `const` here." />);
    expect(codeRuns(container)).toEqual(["const"]);
    expect(container).toHaveTextContent("Use const here.");
  });

  it("handles several segments", () => {
    const { container } = render(<FormattedText text="`a` then `b` then `c`" />);
    expect(codeRuns(container)).toEqual(["a", "b", "c"]);
  });

  it("renders markup inside backticks as text, not as HTML", () => {
    // The canonical case from the locale files: "Тег `<link>` подключает…".
    const { container } = render(<FormattedText text="The `<link>` tag" />);
    expect(codeRuns(container)).toEqual(["<link>"]);
    // The angle brackets are text; no <link> element was created.
    expect(container.querySelector("link")).toBeNull();
  });

  it("does not create a code run for a lone backtick", () => {
    const { container } = render(<FormattedText text="a ` b" />);
    expect(codeRuns(container)).toEqual([]);
    expect(container).toHaveTextContent("a ` b");
  });

  it("does not treat an empty pair as code", () => {
    // The split pattern needs at least one character between the backticks.
    const { container } = render(<FormattedText text="a `` b" />);
    expect(codeRuns(container)).toEqual([]);
  });

  it("handles a segment at the very start and end", () => {
    const { container } = render(<FormattedText text="`npm` and `vite`" />);
    expect(codeRuns(container)).toEqual(["npm", "vite"]);
  });

  it("renders an empty string without crashing", () => {
    const { container } = render(<FormattedText text="" />);
    expect(container).toHaveTextContent("");
  });

  it("preserves newlines in the text (CSS turns them into breaks)", () => {
    // .answer-section__text sets white-space: pre-line, so the \n must survive
    // into the DOM rather than being normalised away here.
    render(<FormattedText text={"line one\nline two"} />);
    expect(screen.getByText(/line one/).textContent).toContain("\n");
  });
});
