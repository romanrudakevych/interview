import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The worker registers `self.onmessage` at module scope. In jsdom `self` is the
// window, so importing it here installs the handler and the test can drive it
// directly — no Worker, no message plumbing, and the real deepEqual/preview
// code under test rather than a copy of it.
import "./runner.worker.js";

let posted;

beforeEach(() => {
  posted = [];
  // Must be stubbed after the import: the handler reads self.postMessage when
  // it runs, and jsdom's own postMessage has a different signature.
  vi.stubGlobal("postMessage", (message) => posted.push(message));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Runs the worker's handler to completion and returns what it posted back. */
async function run({ code, functionName, tests }) {
  await globalThis.onmessage({ data: { code, functionName, tests } });
  expect(posted).toHaveLength(1);
  return posted[0];
}

const SUM = "function sum(a, b) { return a + b; }";

describe("compilation", () => {
  it("runs a solution and reports each test", async () => {
    const out = await run({
      code: SUM,
      functionName: "sum",
      tests: [
        { name: "1+1", args: [1, 1], expected: 2 },
        { name: "2+3", args: [2, 3], expected: 5 },
      ],
    });

    expect(out.ok).toBe(true);
    expect(out.results).toEqual([
      { name: "1+1", hidden: false, passed: true, expected: "2", actual: "2", error: null },
      { name: "2+3", hidden: false, passed: true, expected: "5", actual: "5", error: null },
    ]);
  });

  it("reports a syntax error as run.compileError", async () => {
    const out = await run({ code: "function sum( {", functionName: "sum", tests: [] });
    expect(out).toEqual({
      ok: false,
      error: { code: "run.compileError", params: { message: expect.any(String) } },
    });
  });

  it("reports a missing function as run.functionNotFound, naming it", async () => {
    const out = await run({ code: "const x = 1;", functionName: "sum", tests: [] });
    expect(out).toEqual({
      ok: false,
      error: { code: "run.functionNotFound", params: { name: "sum" } },
    });
  });

  it("rejects a non-function binding of the right name", async () => {
    const out = await run({ code: "const sum = 42;", functionName: "sum", tests: [] });
    expect(out.error.code).toBe("run.functionNotFound");
  });

  it("runs the solution in strict mode", async () => {
    // "use strict" is prepended, so an undeclared assignment throws rather than
    // leaking a global.
    const out = await run({
      code: "function f() { leaked = 1; return leaked; }",
      functionName: "f",
      tests: [{ name: "strict", args: [], expected: 1 }],
    });
    expect(out.results[0].passed).toBe(false);
    expect(out.results[0].error).toMatch(/not defined/);
  });

  it("never posts more than one message", async () => {
    await run({ code: SUM, functionName: "sum", tests: [{ name: "t", args: [1, 1], expected: 2 }] });
    expect(posted).toHaveLength(1);
  });
});

describe("deepEqual", () => {
  // Driven through a solution that just returns its argument, so each case is a
  // comparison of `actual` against `expected`.
  const ECHO = "function echo(v) { return v; }";

  async function compare(value, expected) {
    const out = await run({
      code: ECHO,
      functionName: "echo",
      tests: [{ name: "c", args: [value], expected }],
    });
    return out.results[0].passed;
  }

  it.each([
    [1, 1, true],
    [1, 2, false],
    ["a", "a", true],
    [null, null, true],
    [undefined, undefined, true],
    [true, 1, false],
    [[1, 2], [1, 2], true],
    [[1, 2], [2, 1], false],
    [[1, 2], [1, 2, 3], false],
    [[[1], [2]], [[1], [2]], true],
    [{ a: 1 }, { a: 1 }, true],
    [{ a: 1 }, { a: 2 }, false],
    [{ a: 1 }, { a: 1, b: 2 }, false],
    [{ a: 1, b: 2 }, { a: 1 }, false],
    [{ a: { b: [1] } }, { a: { b: [1] } }, true],
    [{ a: 1 }, null, false],
    [null, { a: 1 }, false],
    [[], {}, false],
    [{}, [], false],
  ])("compares %j with %j as %s", async (value, expected, result) => {
    expect(await compare(value, expected)).toBe(result);
  });

  it("treats NaN as equal to NaN", async () => {
    // Explicitly special-cased: a === b is false for NaN, but a test expecting
    // NaN should pass when the solution returns NaN.
    const out = await run({
      code: "function f() { return NaN; }",
      functionName: "f",
      tests: [{ name: "nan", args: [], expected: NaN }],
    });
    expect(out.results[0].passed).toBe(true);
  });

  it("ignores key order", async () => {
    const out = await run({
      code: "function f() { return { b: 2, a: 1 }; }",
      functionName: "f",
      tests: [{ name: "order", args: [], expected: { a: 1, b: 2 } }],
    });
    expect(out.results[0].passed).toBe(true);
  });
});

describe("preview", () => {
  it("renders values as display strings, not structured clones", async () => {
    const out = await run({
      code: "function f() { return [1, 'a', null]; }",
      functionName: "f",
      tests: [{ name: "p", args: [], expected: [1, "a", null] }],
    });
    expect(out.results[0].actual).toBe('[1,"a",null]');
  });

  it("stringifies undefined", async () => {
    const out = await run({
      code: "function f() { return undefined; }",
      functionName: "f",
      tests: [{ name: "p", args: [], expected: null }],
    });
    expect(out.results[0].actual).toBe("undefined");
  });

  it.each([
    ["a function", "function f() { return () => 1; }"],
    ["a Symbol", "function f() { return Symbol('s'); }"],
    ["a circular object", "function f() { const o = {}; o.self = o; return o; }"],
    ["a BigInt", "function f() { return 10n; }"],
  ])("survives %s, which structuredClone would refuse", async (_label, code) => {
    // This is the DataCloneError that would otherwise throw inside postMessage
    // and hang the host until its 2s timeout.
    const out = await run({
      code,
      functionName: "f",
      tests: [{ name: "p", args: [], expected: "whatever" }],
    });
    expect(out.ok).toBe(true);
    expect(typeof out.results[0].actual).toBe("string");
    expect(posted).toHaveLength(1);
  });
});

describe("test forms", () => {
  it("compiles a `body` test as an async function so it can await", async () => {
    const out = await run({
      code: "function f() { return Promise.resolve(7); }",
      functionName: "f",
      tests: [{ name: "await", body: "return await solution();", expected: 7 }],
    });
    expect(out.results[0].passed).toBe(true);
  });

  it("passes the solution into a `body` test, including as an argument", async () => {
    // The promisify/memoize/runSequentially shape: functions can't be
    // structured-cloned, so those tasks use `body` instead of `args`.
    const out = await run({
      code: "function callTwice(fn) { return fn() + fn(); }",
      functionName: "callTwice",
      tests: [{ name: "fn arg", body: "return solution(() => 2);", expected: 4 }],
    });
    expect(out.results[0].passed).toBe(true);
  });

  it("awaits an async solution called with plain args", async () => {
    const out = await run({
      code: "async function f(x) { return x * 2; }",
      functionName: "f",
      tests: [{ name: "async", args: [3], expected: 6 }],
    });
    expect(out.results[0].passed).toBe(true);
  });

  it("reports a rejection asserted through a body test", async () => {
    const out = await run({
      code: "async function f() { throw new Error('nope'); }",
      functionName: "f",
      tests: [
        {
          name: "rejects",
          body: "try { await solution(); return 'resolved'; } catch (e) { return e.message; }",
          expected: "nope",
        },
      ],
    });
    expect(out.results[0].passed).toBe(true);
  });

  it("clones args so a mutating solution cannot corrupt a later test", async () => {
    const shared = [3, 1, 2];
    const out = await run({
      code: "function f(arr) { arr.sort(); return arr.length; }",
      functionName: "f",
      tests: [
        { name: "first", args: [shared], expected: 3 },
        { name: "second", args: [shared], expected: 3 },
      ],
    });
    expect(out.results.every((r) => r.passed)).toBe(true);
    // The caller's array is untouched: the worker sorted a copy.
    expect(shared).toEqual([3, 1, 2]);
  });

  it("falls back to raw args when they cannot be cloned", async () => {
    // structuredClone refuses a function; the worker passes it through rather
    // than failing the test.
    const out = await run({
      code: "function f(fn) { return fn(); }",
      functionName: "f",
      tests: [{ name: "raw", args: [() => 5], expected: 5 }],
    });
    expect(out.results[0].passed).toBe(true);
  });
});

describe("failure reporting", () => {
  it("records a throwing test as failed and keeps going", async () => {
    const out = await run({
      code: "function f(x) { if (x === 0) throw new Error('boom'); return x; }",
      functionName: "f",
      tests: [
        { name: "throws", args: [0], expected: 1 },
        { name: "fine", args: [2], expected: 2 },
      ],
    });

    expect(out.ok).toBe(true);
    expect(out.results[0]).toMatchObject({ passed: false, error: "boom", actual: null });
    // The run is not aborted by one failure.
    expect(out.results[1].passed).toBe(true);
  });

  it("still reports `expected` for a throwing test", async () => {
    const out = await run({
      code: "function f() { throw new Error('x'); }",
      functionName: "f",
      tests: [{ name: "t", args: [], expected: 42 }],
    });
    expect(out.results[0].expected).toBe("42");
  });

  it("coerces a missing hidden flag to false", async () => {
    const out = await run({
      code: SUM,
      functionName: "sum",
      tests: [
        { name: "visible", args: [1, 1], expected: 2 },
        { name: "hidden", args: [1, 1], expected: 2, hidden: true },
      ],
    });
    expect(out.results.map((r) => r.hidden)).toEqual([false, true]);
  });

  it("reports an empty test list as a passing empty run", async () => {
    const out = await run({ code: SUM, functionName: "sum", tests: [] });
    expect(out).toEqual({ ok: true, results: [] });
  });
});

describe("display text", () => {
  it("never puts a sentence in the error, only a code and params", async () => {
    // The worker can't reach the React i18n context, so every failure it reports
    // must be translatable on the main thread.
    const out = await run({ code: "{{{", functionName: "f", tests: [] });
    expect(Object.keys(out.error).sort()).toEqual(["code", "params"]);
    expect(out.error.code).toMatch(/^run\./);
  });
});
