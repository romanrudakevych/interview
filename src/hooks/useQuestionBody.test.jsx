import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Both the hook and the loader it calls are re-imported per test: the loader
// keeps process-wide chunk caches, and half of what this hook promises is about
// the cached-vs-uncached paths.
//
// The i18n provider has to come from the same fresh module graph, or the hook
// would look up a LanguageContext that the wrapper never filled — resetModules
// creates a *new* context object, and React matches contexts by identity.
let useQuestionBody;
let loadQuestionBody;
let providerWrapper;

beforeEach(async () => {
  vi.resetModules();
  ({ useQuestionBody } = await import("./useQuestionBody.js"));
  ({ loadQuestionBody } = await import("../utils/questionBodies.js"));

  const { LanguageProvider } = await import("../i18n/index.jsx");
  providerWrapper = ({ lang = "en" } = {}) => {
    localStorage.setItem("interview-prep:language", lang);
    return function Wrapper({ children }) {
      return <LanguageProvider>{children}</LanguageProvider>;
    };
  };
});

describe("the null id", () => {
  it("fetches nothing and reports not-loading", () => {
    // This is how a collapsed card and an unrevealed interview question stay
    // inert — the hook is always called, with null instead of an id.
    const { result } = renderHook(() => useQuestionBody(null), { wrapper: providerWrapper() });
    expect(result.current).toEqual({ body: null, error: null, loading: false });
  });

  it("goes back to not-loading when the id is cleared", async () => {
    const { result, rerender } = renderHook(({ id }) => useQuestionBody(id), {
      wrapper: providerWrapper(),
      initialProps: { id: 1 },
    });
    await waitFor(() => expect(result.current.body).not.toBeNull());

    rerender({ id: null });
    expect(result.current).toEqual({ body: null, error: null, loading: false });
  });
});

describe("loading a body", () => {
  it("reports loading, then the body", async () => {
    const { result } = renderHook(() => useQuestionBody(1), { wrapper: providerWrapper() });

    expect(result.current.loading).toBe(true);
    expect(result.current.body).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.body.shortAnswer).toBeTypeOf("string");
    expect(result.current.error).toBeNull();
  });

  it("returns an already-cached body on the very first render", async () => {
    // Warm the chunk, then mount fresh: no loading state at all, which is what
    // keeps expanding a second card in the same id range flash-free.
    await loadQuestionBody(1, "en");

    const { result } = renderHook(() => useQuestionBody(2), { wrapper: providerWrapper() });
    expect(result.current.loading).toBe(false);
    expect(result.current.body).not.toBeNull();
  });

  it("switches body when the id changes", async () => {
    const { result, rerender } = renderHook(({ id }) => useQuestionBody(id), {
      wrapper: providerWrapper(),
      initialProps: { id: 1 },
    });
    await waitFor(() => expect(result.current.body).not.toBeNull());
    const first = result.current.body;

    rerender({ id: 150 }); // a different chunk, so not already in memory
    // The stale result is dropped immediately rather than shown under the new
    // id: it is tagged { id, lang } and ignored during render.
    expect(result.current.body).toBeNull();
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.body).not.toBeNull();
    expect(result.current.body).not.toBe(first);
  });

  it("reports an error for an id with no chunk, and stops loading", async () => {
    const { result } = renderHook(() => useQuestionBody(999999), { wrapper: providerWrapper() });

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.loading).toBe(false);
    expect(result.current.body).toBeNull();
  });
});

describe("language", () => {
  it("is part of the result's identity, so a stale language is ignored", async () => {
    const { result: en } = renderHook(() => useQuestionBody(1), {
      wrapper: providerWrapper({ lang: "en" }),
    });
    await waitFor(() => expect(en.current.body).not.toBeNull());
    const english = en.current.body.shortAnswer;

    const { result: cs } = renderHook(() => useQuestionBody(1), {
      wrapper: providerWrapper({ lang: "cs" }),
    });
    await waitFor(() => expect(cs.current.body).not.toBeNull());

    // Same id, different prose — a cache keyed on the chunk alone would have
    // served the English text here.
    expect(cs.current.body.shortAnswer).not.toBe(english);
  });
});

describe("unmounting", () => {
  it("does not warn when a fetch lands after unmount", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});

    const { unmount } = renderHook(() => useQuestionBody(300), { wrapper: providerWrapper() });
    unmount();

    // Let the in-flight load settle against an unmounted component.
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(warn).not.toHaveBeenCalled();
  });
});
