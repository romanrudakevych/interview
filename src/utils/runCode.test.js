// Gives jsdom a real Worker that understands `new Worker(new URL(...), { type:
// "module" })` — the exact form runCode.js uses, which is also the only form
// Vite rewrites for the /interview/ base.
import "@vitest/web-worker";

import { describe, expect, it } from "vitest";
import { runCode } from "./runCode.js";

const SUM = "function sum(a, b) { return a + b; }";

describe("against the real worker", () => {
  it("resolves { ok: true, results } for a passing solution", async () => {
    const out = await runCode({
      code: SUM,
      functionName: "sum",
      tests: [{ name: "1+1", args: [1, 1], expected: 2 }],
    });

    expect(out.ok).toBe(true);
    expect(out.results).toHaveLength(1);
    expect(out.results[0].passed).toBe(true);
  });

  it("passes a compile error through as { code, params }", async () => {
    const out = await runCode({ code: "function (", functionName: "sum", tests: [] });
    expect(out.ok).toBe(false);
    expect(out.error.code).toBe("run.compileError");
  });

  it("passes run.functionNotFound through", async () => {
    const out = await runCode({ code: "const a = 1;", functionName: "sum", tests: [] });
    expect(out.error).toEqual({ code: "run.functionNotFound", params: { name: "sum" } });
  });

  it("reports a failing test without rejecting", async () => {
    const out = await runCode({
      code: SUM,
      functionName: "sum",
      tests: [{ name: "wrong", args: [1, 1], expected: 3 }],
    });
    expect(out.ok).toBe(true);
    expect(out.results[0]).toMatchObject({ passed: false, expected: "3", actual: "2" });
  });
});


// The timeout and transport-failure paths live in runCode.timeout.test.js:
// they need a Worker stub, and @vitest/web-worker's global cannot be displaced
// once this module has imported it.
