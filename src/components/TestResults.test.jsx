import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/helpers/render.jsx";
import { TestCaseList, TestResults } from "./TestResults.jsx";
import en from "../i18n/locales/en.js";

function result(overrides = {}) {
  return {
    name: "case",
    hidden: false,
    passed: true,
    expected: "2",
    actual: "2",
    error: null,
    ...overrides,
  };
}

describe("TestResults: states", () => {
  it("prompts before anything has run", () => {
    renderWithProviders(<TestResults state={{ status: "idle" }} />);
    expect(screen.getByText(en["tests.idle"])).toBeInTheDocument();
  });

  it("shows a spinner while running", () => {
    const { container } = renderWithProviders(<TestResults state={{ status: "running" }} />);
    expect(screen.getByText(en["tests.running"])).toBeInTheDocument();
    expect(container.querySelector(".spin")).toBeInTheDocument();
  });

  it("translates the worker's error code on the main thread", () => {
    // The worker can't reach the i18n context, so it reports { code, params }
    // and this is where that becomes a sentence.
    renderWithProviders(
      <TestResults state={{ status: "error", error: { code: "run.timeout", params: { ms: 2000 } } }} />
    );
    expect(screen.getByText(en["run.timeout"].replace("{ms}", "2000"))).toBeInTheDocument();
  });

  it("handles an error code with no params", () => {
    renderWithProviders(
      <TestResults state={{ status: "error", error: { code: "run.executionError" } }} />
    );
    expect(screen.getByText(en["run.executionError"])).toBeInTheDocument();
  });

  it("shows an unknown error code rather than blanking", () => {
    renderWithProviders(<TestResults state={{ status: "error", error: { code: "run.nope" } }} />);
    expect(screen.getByText("run.nope")).toBeInTheDocument();
  });
});

describe("TestResults: the summary", () => {
  it("counts the passes", () => {
    renderWithProviders(
      <TestResults
        state={{ status: "done", results: [result(), result({ passed: false }), result()] }}
      />
    );
    expect(
      screen.getByText(en["tests.passed"].replace("{passed}", "2").replace("{total}", "3"))
    ).toBeInTheDocument();
  });

  it("marks an all-green run", () => {
    const { container } = renderWithProviders(
      <TestResults state={{ status: "done", results: [result(), result()] }} />
    );
    expect(container.querySelector(".test-results__summary--ok")).toBeInTheDocument();
  });

  it("does not mark a run with any failure", () => {
    const { container } = renderWithProviders(
      <TestResults state={{ status: "done", results: [result(), result({ passed: false })] }} />
    );
    expect(container.querySelector(".test-results__summary--ok")).toBeNull();
  });

  it("treats an empty run as all-passed", () => {
    const { container } = renderWithProviders(<TestResults state={{ status: "done", results: [] }} />);
    expect(container.querySelector(".test-results__summary--ok")).toBeInTheDocument();
  });
});

describe("TestResults: each case", () => {
  it("names each case and styles pass and fail differently", () => {
    const { container } = renderWithProviders(
      <TestResults
        state={{
          status: "done",
          results: [result({ name: "ok case" }), result({ name: "bad case", passed: false })],
        }}
      />
    );
    expect(screen.getByText("ok case")).toBeInTheDocument();
    expect(container.querySelectorAll(".test-result--pass")).toHaveLength(1);
    expect(container.querySelectorAll(".test-result--fail")).toHaveLength(1);
  });

  it("shows no detail for a passing case", () => {
    const { container } = renderWithProviders(
      <TestResults state={{ status: "done", results: [result()] }} />
    );
    expect(container.querySelector(".test-result__detail")).toBeNull();
  });

  it("shows expected and received for a failing case", () => {
    renderWithProviders(
      <TestResults
        state={{ status: "done", results: [result({ passed: false, expected: "5", actual: "2" })] }}
      />
    );
    expect(screen.getByText(en["tests.expected"])).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText(en["tests.received"])).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows the thrown message instead of a comparison", () => {
    renderWithProviders(
      <TestResults
        state={{ status: "done", results: [result({ passed: false, error: "boom", actual: null })] }}
      />
    );
    expect(screen.getByText(en["tests.error"])).toBeInTheDocument();
    expect(screen.getByText("boom")).toBeInTheDocument();
    expect(screen.queryByText(en["tests.expected"])).toBeNull();
  });

  it("renders an em-dash for a null actual", () => {
    renderWithProviders(
      <TestResults
        state={{ status: "done", results: [result({ passed: false, actual: null, error: null })] }}
      />
    );
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("tags a hidden case", () => {
    renderWithProviders(
      <TestResults state={{ status: "done", results: [result({ hidden: true })] }} />
    );
    expect(screen.getByText(en["tests.hiddenTag"])).toBeInTheDocument();
  });

  it("does not tag a visible case", () => {
    renderWithProviders(<TestResults state={{ status: "done", results: [result()] }} />);
    expect(screen.queryByText(en["tests.hiddenTag"])).toBeNull();
  });
});

describe("TestCaseList", () => {
  const visible = { name: "1 + 1", args: [1, 1], expected: 2 };
  const hidden = { name: "secret", args: [2, 2], expected: 4, hidden: true };

  it("lists the visible cases with their input and expectation", () => {
    renderWithProviders(<TestCaseList tests={[visible]} />);
    expect(screen.getByText("1 + 1")).toBeInTheDocument();
    expect(screen.getByText("[1,1]")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("withholds hidden cases entirely", () => {
    // Showing them would let a solution be hard-coded against them.
    renderWithProviders(<TestCaseList tests={[visible, hidden]} />);
    expect(screen.queryByText("secret")).toBeNull();
    expect(screen.queryByText("[2,2]")).toBeNull();
  });

  it("counts the hidden cases, inflected", () => {
    renderWithProviders(<TestCaseList tests={[visible, hidden]} />);
    expect(
      screen.getByText(en["tests.hiddenNote.one"].replace("{count}", "1"))
    ).toBeInTheDocument();
  });

  it("uses the plural form for several hidden cases", () => {
    renderWithProviders(<TestCaseList tests={[visible, hidden, { ...hidden, name: "s2" }]} />);
    expect(
      screen.getByText(en["tests.hiddenNote.many"].replace("{count}", "2"))
    ).toBeInTheDocument();
  });

  it("shows no note when nothing is hidden", () => {
    const { container } = renderWithProviders(<TestCaseList tests={[visible]} />);
    expect(container.querySelector(".test-cases__hidden-note")).toBeNull();
  });

  it("shows the snippet for a body test, which has no plain args", () => {
    renderWithProviders(
      <TestCaseList tests={[{ name: "fn", body: "return solution(() => 1);", expected: 1 }]} />
    );
    expect(screen.getByText("return solution(() => 1);")).toBeInTheDocument();
    expect(screen.queryByText(en["tests.input"])).toBeNull();
  });

  it("renders an empty list", () => {
    const { container } = renderWithProviders(<TestCaseList tests={[]} />);
    expect(container.querySelectorAll(".test-case")).toHaveLength(0);
  });
});
