import { useState } from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { CodeEditor } from "./CodeEditor.jsx";
import en from "../i18n/locales/en.js";

function setup(value = "function f() {}", onChange = vi.fn()) {
  const utils = renderWithProviders(<CodeEditor value={value} onChange={onChange} />);
  return { ...utils, onChange, textarea: screen.getByRole("textbox") };
}

describe("the three layers", () => {
  it("renders a textarea over a highlighted pre and a gutter", () => {
    const { container } = setup();
    expect(container.querySelector(".code-editor__input")).toBeInstanceOf(HTMLTextAreaElement);
    expect(container.querySelector(".code-editor__highlight")).toBeInTheDocument();
    expect(container.querySelector(".code-editor__gutter")).toBeInTheDocument();
  });

  it("gives the textarea an accessible name", () => {
    setup();
    expect(screen.getByRole("textbox", { name: en["tasks.editorLabel"] })).toBeInTheDocument();
  });

  it("hides the decorative layers from assistive tech", () => {
    // They duplicate the textarea's content; a screen reader should hear it once.
    const { container } = setup();
    expect(container.querySelector(".code-editor__highlight")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".code-editor__gutter")).toHaveAttribute("aria-hidden", "true");
  });

  it("disables the browser's text corrections", () => {
    // Autocorrect in a code editor rewrites the user's code.
    const { textarea } = setup();
    expect(textarea).toHaveAttribute("spellcheck", "false");
    expect(textarea).toHaveAttribute("autocomplete", "off");
    expect(textarea).toHaveAttribute("autocorrect", "off");
    expect(textarea).toHaveAttribute("autocapitalize", "off");
  });

  it("highlights the current value in the pre layer", () => {
    const { container } = setup("const x = 1;");
    expect(container.querySelector(".code-editor__highlight .tok--keyword")).toHaveTextContent("const");
  });

  it("escapes the user's own typing in the highlight layer", () => {
    // The highlight layer is dangerouslySetInnerHTML over user-typed text.
    const { container } = setup('const s = "</pre><script>alert(1)</script>";');
    expect(container.querySelector("script")).toBeNull();
  });
});

describe("the gutter", () => {
  it.each([
    ["", 1],
    ["one line", 1],
    ["a\nb", 2],
    ["a\nb\nc\n", 4],
  ])("numbers %j as %i lines", (value, lines) => {
    const { container } = setup(value);
    expect(container.querySelectorAll(".code-editor__gutter > div")).toHaveLength(lines);
  });

  it("numbers from 1", () => {
    const { container } = setup("a\nb\nc");
    expect([...container.querySelectorAll(".code-editor__gutter > div")].map((d) => d.textContent)).toEqual(
      ["1", "2", "3"]
    );
  });
});

describe("editing", () => {
  it("reports typing to onChange", async () => {
    const { textarea, onChange } = setup("");
    await userEvent.type(textarea, "x");
    expect(onChange).toHaveBeenCalledWith("x");
  });

  // Tab is dispatched directly rather than through userEvent.type: typing
  // focuses the field first, which moves the caret to the end and would
  // discard the selection these cases are about.
  function pressTab(textarea, start, end = start) {
    textarea.setSelectionRange(start, end);
    return fireEvent.keyDown(textarea, { key: "Tab" });
  }

  it("inserts two spaces for Tab instead of leaving the field", () => {
    const { textarea, onChange } = setup("ab");

    const notPrevented = pressTab(textarea, 1);

    expect(onChange).toHaveBeenCalledWith("a  b");
    // preventDefault is what stops Tab moving focus out of the editor.
    expect(notPrevented).toBe(false);
  });

  it("replaces the selection when Tab is pressed with text selected", () => {
    const { textarea, onChange } = setup("abcd");
    pressTab(textarea, 1, 3);
    expect(onChange).toHaveBeenCalledWith("a  d");
  });

  it("appends at the end", () => {
    const { textarea, onChange } = setup("ab");
    pressTab(textarea, 2);
    expect(onChange).toHaveBeenCalledWith("ab  ");
  });

  it("inserts at the very start", () => {
    const { textarea, onChange } = setup("ab");
    pressTab(textarea, 0);
    expect(onChange).toHaveBeenCalledWith("  ab");
  });

  it("leaves other keys to the browser", () => {
    const { textarea, onChange } = setup("ab");
    const notPrevented = fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
    expect(notPrevented).toBe(true);
  });

  it("restores the caret after Tab, once React has re-rendered", async () => {
    // The caret is repositioned in a requestAnimationFrame callback, because
    // React has to commit the new value first. That needs a real controlled
    // host — with a stubbed onChange the value prop never changes and the new
    // caret position would be clamped to the old length.
    function Host() {
      const [value, setValue] = useState("ab");
      return <CodeEditor value={value} onChange={setValue} />;
    }
    renderWithProviders(<Host />);
    const textarea = screen.getByRole("textbox");

    textarea.setSelectionRange(1, 1);
    fireEvent.keyDown(textarea, { key: "Tab" });

    await waitFor(() => expect(textarea).toHaveValue("a  b"));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(textarea.selectionStart).toBe(3);
    expect(textarea.selectionEnd).toBe(3);
  });
});

describe("scroll syncing", () => {
  it("follows the textarea's scroll in both other layers", () => {
    // The textarea is the only scrollable layer; if the others don't follow,
    // the highlighting drifts away from the text.
    const { container, textarea } = setup("a\n".repeat(50));
    const highlight = container.querySelector(".code-editor__highlight");
    const gutter = container.querySelector(".code-editor__gutter");

    textarea.scrollTop = 120;
    textarea.scrollLeft = 40;
    textarea.dispatchEvent(new Event("scroll", { bubbles: true }));

    expect(highlight.scrollTop).toBe(120);
    expect(highlight.scrollLeft).toBe(40);
    expect(gutter.scrollTop).toBe(120);
  });
});
