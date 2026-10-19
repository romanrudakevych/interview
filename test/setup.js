import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// The real QuestionsProvider loads a ~650 KB language index through a dynamic
// import. With 46 test files running in parallel that can take well over
// testing-library's 1s default, which showed up as an intermittent failure in
// QuestionsContext.test.jsx — so give every async util real headroom. Still far
// below the 20s testTimeout, so a genuinely stuck wait fails well inside it.
configure({ asyncUtilTimeout: 10000 });

// Both storage keys and the body-chunk caches are module-level globals, so a
// test that leaves either behind makes the next one order-dependent.
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

// jsdom gaps the app actually hits. Both are no-ops in jsdom but throw or warn
// when called, which would turn a passing assertion into noise.
beforeEach(() => {
  // QuestionListPage.goToPage scrolls after a page change.
  window.scrollTo = vi.fn();

  // CodeBlock copies to the clipboard; jsdom ships no navigator.clipboard.
  if (!navigator.clipboard) {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true,
    });
  }
});
