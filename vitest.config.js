import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.js";

// Merged onto the real Vite config on purpose: `import.meta.glob` in
// questionBodies.js / QuestionsContext.jsx and the `new Worker(new URL(...))`
// form in runCode.js only have meaning inside Vite's transform. Running the
// tests through any other transform would mean mocking all three away.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./test/setup.js"],
      include: ["src/**/*.test.{js,jsx}", "test/scripts/**/*.test.mjs"],
      // The corpus round-trip check walks all 3,367 code examples, and the
      // provider tests import ~650 KB language indexes — more again under
      // coverage instrumentation.
      testTimeout: 30000,
      coverage: {
        provider: "v8",
        include: ["src/**/*.{js,jsx}"],
        exclude: [
          // Content, not logic — and questions.js is 11 MB of it.
          "src/data/**",
          // Three lines of bootstrap, with nothing to assert.
          "src/main.jsx",
          "**/*.test.{js,jsx}",

          // Measured separately, because it is loaded twice and the readings
          // collide: src/workers/runner.worker.test.js drives it directly and
          // covers it 100%, while runCode.test.js loads a second copy through
          // @vitest/web-worker that only runs the handful of paths those tests
          // need. Whichever copy reports last wins, so the figure here swung
          // between 71% and 93% across runs and would make any threshold below
          // meaningless. Check it on its own with:
          //   npm run test:coverage:worker
          "src/workers/**",
        ],
        // scripts/*.mjs is deliberately absent from `include`: those are Node
        // entry points and their tests run them in a subprocess, which the v8
        // provider cannot see. test/scripts/ covers them; the report can't.

        // Set just under what the suite actually measures, so new untested code
        // fails `npm run test:coverage` rather than quietly lowering the bar.
        // Re-measure before raising these.
        thresholds: {
          statements: 99,
          branches: 97,
          functions: 99,
          lines: 99,
        },
      },
    },
  })
);

// Vite resolves `src/data/generated/**` through import.meta.glob at transform
// time, so a missing directory is a cryptic build error rather than a test
// failure. Fail here, where the message can say what to run.
const generated = fileURLToPath(new URL("./src/data/generated/meta.json", import.meta.url));
if (!existsSync(generated)) {
  throw new Error(
    "src/data/generated/ is missing — run `npm run build:data` first.\n" +
      "(`npm test` does this for you via the pretest script.)"
  );
}
