// Runs the user's solution against a task's test cases.
//
// Lives in a Web Worker so that an infinite loop in user code can be killed by
// terminating the worker instead of freezing the tab. The host (src/utils/runCode.js)
// owns the timeout — this file just runs and reports.

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a === "number" && typeof b === "number" && Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}

// Results are posted back to the main thread, so every value in them must be
// structured-cloneable. A solution can legally return a function, a Symbol, a
// DOM-less class instance, etc. — cloning those throws DataCloneError inside
// postMessage and would hang the host until its timeout. So values cross the
// boundary as display strings, which is all the UI renders anyway.
function preview(value) {
  if (value === undefined) return "undefined";
  try {
    const json = JSON.stringify(value);
    return json === undefined ? String(value) : json;
  } catch {
    return String(value);
  }
}

// Args are structured-cloned so a mutating solution can't corrupt later tests.
// Some tasks legitimately take functions as arguments (promisify, memoize,
// runSequentially), which structuredClone refuses — those tasks use `body`
// instead, but fall back to the raw args rather than failing the test.
// Test bodies may use `await` (async tasks, rejection assertions), so they are
// compiled as async functions — a plain `new Function` would be a syntax error.
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function cloneArgs(args) {
  try {
    return structuredClone(args);
  } catch {
    return args;
  }
}

self.onmessage = async (event) => {
  const { code, functionName, tests } = event.data;

  let solution;
  try {
    // eslint-disable-next-line no-new-func
    solution = new Function(`"use strict";\n${code}\nreturn typeof ${functionName} === "function" ? ${functionName} : null;`)();
  } catch (error) {
    self.postMessage({ ok: false, error: `Ошибка компиляции: ${error.message}` });
    return;
  }

  if (typeof solution !== "function") {
    self.postMessage({
      ok: false,
      error: `Функция \`${functionName}\` не найдена. Объявите её в редакторе.`,
    });
    return;
  }

  const results = [];
  for (const test of tests) {
    try {
      // Two test forms:
      //  - { args, expected }  — call the solution directly (most tasks)
      //  - { body, expected }  — a snippet that receives `solution` and returns
      //    the value to compare. Needed whenever a test must pass functions in,
      //    count calls, or assert on a rejection.
      const actual = test.body
        ? await new AsyncFunction("solution", `"use strict";\n${test.body}`)(solution)
        // `await` is a no-op for sync solutions and makes async ones work.
        : await solution(...cloneArgs(test.args));

      results.push({
        name: test.name,
        hidden: Boolean(test.hidden),
        passed: deepEqual(actual, test.expected),
        expected: preview(test.expected),
        actual: preview(actual),
        error: null,
      });
    } catch (error) {
      results.push({
        name: test.name,
        hidden: Boolean(test.hidden),
        passed: false,
        expected: preview(test.expected),
        actual: null,
        error: error.message,
      });
    }
  }

  self.postMessage({ ok: true, results });
};
