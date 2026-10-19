// Deliberately does NOT import @vitest/web-worker: these tests need a Worker
// they control. @vitest/web-worker installs a non-configurable global, so the
// real-worker tests live in runCode.test.js and these get their own module
// registry.
import { afterEach, describe, expect, it, vi } from "vitest";
import { runCode } from "./runCode.js";

const SUM = "function sum(a, b) { return a + b; }";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

/**
 * Installs a Worker stub and hands back the instance the code under test built.
 * The timeout and transport-failure paths can't be driven through the real
 * worker: @vitest/web-worker runs it on this same thread, so a solution that
 * never returns would hang the test run instead of tripping the timeout.
 *
 * The stub has to be a `function`, not an arrow: runCode calls it with `new`.
 */
function stubWorker({ constructorThrows = false } = {}) {
  const instance = {
    postMessage: vi.fn(),
    terminate: vi.fn(),
    onmessage: null,
    onerror: null,
    args: null,
  };

  const Ctor = vi.fn(function WorkerStub(url, options) {
    if (constructorThrows) throw new Error("module not found");
    instance.args = [url, options];
    // Returning an object from a constructor call yields that object.
    return instance;
  });

  vi.stubGlobal("Worker", Ctor);
  return instance;
}

describe("the 2s timeout", () => {
  it("resolves run.timeout and terminates the worker", async () => {
    vi.useFakeTimers();
    const worker = stubWorker();

    const pending = runCode({ code: "while (true) {}", functionName: "f", tests: [] });
    // The worker never answers.
    await vi.advanceTimersByTimeAsync(2000);

    await expect(pending).resolves.toEqual({
      ok: false,
      error: { code: "run.timeout", params: { ms: 2000 } },
    });
    // Termination is what actually stops the runaway loop — the resolved
    // promise alone would leave it spinning.
    expect(worker.terminate).toHaveBeenCalledTimes(1);
  });

  it("does not fire before 2s have passed", async () => {
    vi.useFakeTimers();
    stubWorker();

    let settled = false;
    const pending = runCode({ code: SUM, functionName: "sum", tests: [] }).then(() => {
      settled = true;
    });

    await vi.advanceTimersByTimeAsync(1999);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await pending;
    expect(settled).toBe(true);
  });

  it("clears the timer when the worker answers in time", async () => {
    vi.useFakeTimers();
    const worker = stubWorker();

    const pending = runCode({ code: SUM, functionName: "sum", tests: [] });
    worker.onmessage({ data: { ok: true, results: [] } });

    await expect(pending).resolves.toEqual({ ok: true, results: [] });

    // If the timeout were still armed it would try to settle again here.
    await vi.advanceTimersByTimeAsync(5000);
    await expect(pending).resolves.toEqual({ ok: true, results: [] });
  });

  it("ignores a late message after the timeout has settled", async () => {
    vi.useFakeTimers();
    const worker = stubWorker();

    const pending = runCode({ code: SUM, functionName: "sum", tests: [] });
    await vi.advanceTimersByTimeAsync(2000);
    // The worker answers after it was given up on.
    worker.onmessage?.({ data: { ok: true, results: [{ passed: true }] } });

    await expect(pending).resolves.toMatchObject({ error: { code: "run.timeout" } });
  });
});

describe("transport failures", () => {
  it("reports run.workerFailed when the Worker cannot be constructed", async () => {
    stubWorker({ constructorThrows: true });

    await expect(runCode({ code: SUM, functionName: "sum", tests: [] })).resolves.toEqual({
      ok: false,
      error: { code: "run.workerFailed", params: { message: "module not found" } },
    });
  });

  it("maps onerror with a message to run.executionErrorDetail", async () => {
    const worker = stubWorker();
    const pending = runCode({ code: SUM, functionName: "sum", tests: [] });

    worker.onerror({ message: "Uncaught ReferenceError" });

    await expect(pending).resolves.toEqual({
      ok: false,
      error: { code: "run.executionErrorDetail", params: { message: "Uncaught ReferenceError" } },
    });
    expect(worker.terminate).toHaveBeenCalled();
  });

  it("maps a messageless onerror to run.executionError", async () => {
    const worker = stubWorker();
    const pending = runCode({ code: SUM, functionName: "sum", tests: [] });

    worker.onerror({});

    await expect(pending).resolves.toEqual({ ok: false, error: { code: "run.executionError" } });
  });

  it("settles once even when onmessage and onerror both fire", async () => {
    const worker = stubWorker();
    const pending = runCode({ code: SUM, functionName: "sum", tests: [] });

    worker.onmessage({ data: { ok: true, results: [] } });
    worker.onerror({ message: "too late" });

    await expect(pending).resolves.toEqual({ ok: true, results: [] });
    // One terminate, from the first settle — not one per handler.
    expect(worker.terminate).toHaveBeenCalledTimes(1);
  });
});

describe("the contract", () => {
  it("forwards code, functionName and tests to the worker unchanged", async () => {
    const worker = stubWorker();
    const payload = { code: SUM, functionName: "sum", tests: [{ name: "t", args: [1], expected: 1 }] };

    const pending = runCode(payload);
    expect(worker.postMessage).toHaveBeenCalledWith(payload);

    worker.onmessage({ data: { ok: true, results: [] } });
    await pending;
  });

  it("builds the worker from a URL and as a module", async () => {
    // Both halves matter under the /interview/ base: a string path would 404,
    // and the worker file uses ESM syntax.
    const worker = stubWorker();
    const pending = runCode({ code: SUM, functionName: "sum", tests: [] });

    const [url, options] = worker.args;
    expect(url).toBeInstanceOf(URL);
    expect(url.pathname).toMatch(/runner\.worker\.js$/);
    expect(options).toEqual({ type: "module" });

    worker.onmessage({ data: { ok: true, results: [] } });
    await pending;
  });

  it("never rejects, whatever the worker does", async () => {
    const worker = stubWorker();
    const pending = runCode({ code: SUM, functionName: "sum", tests: [] });

    // A garbage message is still resolved, not thrown.
    worker.onmessage({ data: undefined });
    await expect(pending).resolves.toBeUndefined();
  });
});
