const TIMEOUT_MS = 2000;

/**
 * Runs `code` against `tests` in a throwaway Web Worker.
 *
 * The worker is the reason an infinite loop in user code can't freeze the tab:
 * if it doesn't answer within TIMEOUT_MS we terminate it outright. The worker is
 * always torn down, on every path.
 *
 * Resolves with { ok: true, results } or { ok: false, error }; never rejects.
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
      finish({ ok: false, error: `Не удалось запустить воркер: ${error.message}` });
      return;
    }

    worker.onmessage = (event) => finish(event.data);
    worker.onerror = (event) =>
      finish({ ok: false, error: event.message || "Ошибка выполнения кода" });

    timer = setTimeout(() => {
      finish({
        ok: false,
        error: `Превышено время выполнения (${TIMEOUT_MS} мс). Возможно, в коде бесконечный цикл.`,
      });
    }, TIMEOUT_MS);

    worker.postMessage({ code, functionName, tests });
  });
}
