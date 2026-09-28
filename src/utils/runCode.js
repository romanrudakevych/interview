const TIMEOUT_MS = 2000;

/**
 * Runs `code` against `tests` in a throwaway Web Worker.
 *
 * The worker is the reason an infinite loop in user code can't freeze the tab:
 * if it doesn't answer within TIMEOUT_MS we terminate it outright. The worker is
 * always torn down, on every path.
 *
 * Resolves with { ok: true, results } or { ok: false, error }; never rejects.
 *
 * `error` is a { code, params } pair, not a sentence — the worker has no access
 * to the React i18n context, so TestResults translates it on the main thread.
 */
export function runCode({ code, functionName, tests }) {
  return new Promise((resolve) => {
    let worker;
    let timer;
    let settled = false;

    function finish(outcome) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker?.terminate();
      resolve(outcome);
    }

    try {
      // `new Worker(new URL(...), { type: "module" })` is the only form Vite
      // rewrites for a non-root base — a string path would 404 under /interview/.
      worker = new Worker(new URL("../workers/runner.worker.js", import.meta.url), {
        type: "module",
      });
    } catch (error) {
      finish({
        ok: false,
        error: { code: "run.workerFailed", params: { message: error.message } },
      });
      return;
    }

    worker.onmessage = (event) => finish(event.data);
    worker.onerror = (event) =>
      finish({
        ok: false,
        error: event.message
          ? { code: "run.executionErrorDetail", params: { message: event.message } }
          : { code: "run.executionError" },
      });

    timer = setTimeout(() => {
      finish({
        ok: false,
        error: { code: "run.timeout", params: { ms: TIMEOUT_MS } },
      });
    }, TIMEOUT_MS);

    worker.postMessage({ code, functionName, tests });
  });
}
