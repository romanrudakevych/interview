import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

// The importer runs on import (top-level await + fetch), so every behavioural
// check here goes through a subprocess. Nothing in this file reaches the
// network: the usage check exits before any fetch, and the "past the gate" case
// uses an unsupported protocol, which fetch rejects without opening a socket.
const execFileAsync = promisify(execFile);
const SCRIPT = join(process.cwd(), "scripts/import-resources.mjs");
const SOURCE = readFileSync(SCRIPT, "utf8");
const USAGE = "usage: RESOURCES_API_URL";

/** Runs the script and resolves with { code, stdout, stderr } either way. */
async function run({ args = [], env } = {}) {
  // RESOURCES_API_URL must not leak in from the developer's own shell — and it
  // has to be *absent*, not empty: the script reads it with `??`, so an empty
  // string counts as supplied.
  const baseEnv = { ...process.env };
  delete baseEnv.RESOURCES_API_URL;

  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, [SCRIPT, ...args], {
      env: { ...baseEnv, ...env },
    });
    return { code: 0, stdout, stderr };
  } catch (error) {
    return { code: error.code, stdout: error.stdout ?? "", stderr: error.stderr ?? "" };
  }
}

describe("the endpoint is not in the repo", () => {
  it("hard-codes no URL", () => {
    // The standing constraint: the catalog endpoint is supplied at run time.
    // Only the two usage lines in the header may mention a scheme-like string.
    const urls = SOURCE.match(/https?:\/\/[^\s"'`)]+/g) ?? [];
    expect(urls).toEqual([]);
  });

  it("reads the endpoint from the environment, falling back to argv", () => {
    // Asserted on the source because the two cannot be told apart from the
    // outside: a bad URL from either fails identically, and a good one would
    // need the network.
    expect(SOURCE).toContain("process.env.RESOURCES_API_URL ?? process.argv[2]");
  });

  it("documents both invocations in its header", () => {
    expect(SOURCE).toContain('RESOURCES_API_URL="<endpoint>" node scripts/import-resources.mjs');
    expect(SOURCE).toContain('node scripts/import-resources.mjs "<endpoint>"');
  });

  it("documents the two assumptions the fetch loop makes", () => {
    // The URL must already carry a query string, and the response must be
    // paginated as { data, total } — neither is validated at run time.
    expect(SOURCE).toContain("must already carry a query string");
    expect(SOURCE).toMatch(/\{ data: \[\.\.\.\], total \}/);
  });
});

describe("with no endpoint supplied", () => {
  it("exits non-zero with a usage message", async () => {
    const { code, stderr } = await run();
    expect(code).toBe(1);
    expect(stderr).toContain(USAGE);
  });

  it("writes nothing", async () => {
    const before = readFileSync(join(process.cwd(), "src/data/resources.js"), "utf8");
    await run();
    expect(readFileSync(join(process.cwd(), "src/data/resources.js"), "utf8")).toBe(before);
  });

  it("also shows usage when the env var is set but empty", async () => {
    // Note the consequence of `??` rather than `||`: an empty-but-set
    // RESOURCES_API_URL counts as supplied, so it shadows an endpoint passed as
    // an argument and the documented argv invocation stops working. Harmless
    // for the normal unset case, and pinned here as current behaviour.
    const { code, stderr } = await run({ env: { RESOURCES_API_URL: "" } });
    expect(code).toBe(1);
    expect(stderr).toContain(USAGE);
  });

  it("shows usage for an empty env var even when an argument is given", async () => {
    const { code, stderr } = await run({
      args: ["stub://catalog?track=react"],
      env: { RESOURCES_API_URL: "" },
    });
    expect(code).toBe(1);
    expect(stderr).toContain(USAGE);
  });
});

describe("with an endpoint supplied", () => {
  it("gets past the usage gate when given one as an argument", async () => {
    // Unsupported protocol: fetch rejects immediately, with no network access
    // and before anything is written.
    const { code, stderr } = await run({ args: ["stub://catalog?track=react"] });
    expect(stderr).not.toContain(USAGE);
    expect(code).not.toBe(0);
  });

  it("gets past the usage gate when given one in the environment", async () => {
    const { stderr } = await run({ env: { RESOURCES_API_URL: "stub://catalog?track=react" } });
    expect(stderr).not.toContain(USAGE);
  });

  it("fails on the fetch, not the gate, once an endpoint is present", async () => {
    const { stderr } = await run({ env: { RESOURCES_API_URL: "stub://catalog?track=react" } });
    // Proof it reached the fetch loop: the failure is a scheme error, which
    // means no socket was opened either.
    expect(stderr).toContain("fetch failed");
    expect(stderr).not.toContain(USAGE);
  });
});

describe("the generated file", () => {
  it("is not wired into any npm script", () => {
    // Wiring it in would make every build need the network.
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    const scripts = Object.values(pkg.scripts).join(" ");
    expect(scripts).not.toContain("import-resources");
  });

  it("carries the header the script would regenerate, byte for byte", () => {
    // If these drift, a re-import shows a spurious diff at the top of the file.
    const generatedHeader = SOURCE.match(/const out = `([\s\S]*?)\n\nexport const RESOURCE_TYPES/);
    expect(generatedHeader).not.toBeNull();

    const expected = generatedHeader[1].replace(/\\`/g, "`");
    const actual = readFileSync(join(process.cwd(), "src/data/resources.js"), "utf8");
    expect(actual.startsWith(expected)).toBe(true);
  });

  it("derives its filter chips from the data actually present", async () => {
    const { RESOURCE_SKILLS, RESOURCE_TYPES, resources } = await import(
      "../../src/data/resources.js"
    );
    // A chip that matches nothing is dead UI, so the exports must be exactly
    // the values present.
    expect([...RESOURCE_TYPES].sort()).toEqual([...new Set(resources.map((r) => r.type))].sort());
    expect([...RESOURCE_SKILLS].sort()).toEqual(
      [...new Set(resources.flatMap((r) => r.skills))].sort()
    );
  });

  it("uses upstream UUIDs as ids, not array positions", async () => {
    const { resources } = await import("../../src/data/resources.js");
    // The opposite of the questions/tasks rule, and safe because the API
    // assigns them and they survive a re-import.
    for (const resource of resources) {
      expect(resource.id, resource.name).toMatch(/^[0-9a-f-]{36}$/);
    }
    expect(new Set(resources.map((r) => r.id)).size).toBe(resources.length);
  });

  it("trims the tag values that arrive with trailing spaces", async () => {
    const { RESOURCE_SKILLS } = await import("../../src/data/resources.js");
    // "Networks " upstream would otherwise show as a second, duplicate chip.
    expect(RESOURCE_SKILLS.filter((s) => s !== s.trim())).toEqual([]);
  });
});
