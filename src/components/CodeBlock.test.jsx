import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { CodeBlock } from "./CodeBlock.jsx";
import en from "../i18n/locales/en.js";

describe("rendering", () => {
  it("highlights the code it is given", () => {
    const { container } = renderWithProviders(<CodeBlock code="const x = 1;" />);
    expect(container.querySelector("code .tok--keyword")).toHaveTextContent("const");
  });

  it("auto-detects the language by default", () => {
    const { container } = renderWithProviders(<CodeBlock code=".a { color: red; }" />);
    expect(container.querySelector("code .tok--property")).toHaveTextContent("color");
  });

  it("honours an explicit language", () => {
    const { container } = renderWithProviders(<CodeBlock code="<a href='/x'>y</a>" language="html" />);
    expect(container.querySelector("code .tok--tag")).toBeInTheDocument();
  });

  it("emits no highlighting for language=text", () => {
    // Used for a task's Вход/Выход prose, which is not source code.
    const { container } = renderWithProviders(<CodeBlock code="const x = 1;" language="text" />);
    expect(container.querySelector(".tok")).toBeNull();
    expect(container.querySelector("code")).toHaveTextContent("const x = 1;");
  });

  it("escapes markup in the code rather than rendering it", () => {
    // The output goes through dangerouslySetInnerHTML, so this is the one that
    // matters: a <script> in an answer must not become an element.
    const { container } = renderWithProviders(
      <CodeBlock code={'const h = "<script>alert(1)</script>";'} />
    );
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("code").textContent).toContain("<script>alert(1)</script>");
  });
});

describe("copying", () => {
  it("writes the raw code, not the highlighted HTML", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    const code = "const x = 1; // <b>";
    renderWithProviders(<CodeBlock code={code} />);

    await userEvent.click(screen.getByRole("button", { name: en["code.copy"] }));

    expect(writeText).toHaveBeenCalledWith(code);
  });

  it("confirms the copy, then reverts after the timeout", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });

    renderWithProviders(<CodeBlock code="x" />);
    await userEvent.click(screen.getByRole("button", { name: en["code.copy"] }));

    expect(await screen.findByRole("button", { name: en["code.copied"] })).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(1500);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: en["code.copy"] })).toBeInTheDocument()
    );

    vi.useRealTimers();
  });

  it("stays silent when the clipboard API rejects", async () => {
    // Denied permission or an insecure context — nothing to tell the user, and
    // certainly nothing to crash over.
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });

    renderWithProviders(<CodeBlock code="x" />);
    await userEvent.click(screen.getByRole("button", { name: en["code.copy"] }));

    // Still showing "copy", not "copied", and no error surfaced.
    expect(screen.getByRole("button", { name: en["code.copy"] })).toBeInTheDocument();
  });

  it("stays silent when there is no clipboard API at all", async () => {
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });

    renderWithProviders(<CodeBlock code="x" />);
    await expect(
      userEvent.click(screen.getByRole("button", { name: en["code.copy"] }))
    ).resolves.not.toThrow();
  });
});
