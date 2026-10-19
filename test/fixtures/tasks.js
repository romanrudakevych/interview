// Hand-written coding-task fixtures, in the shape createTask() produces
// (src/data/tasks.js) with the progress fields TasksContext merges in.
//
// Task difficulty is 1–5 and categories/languages are free-form strings — the
// deliberate divergence from questions, which use 1–10 difficulty ranges.

export function makeTask(overrides = {}) {
  return {
    id: 1,
    title: "Sum two numbers",
    difficulty: 1,
    categories: ["Arrays"],
    languages: ["JavaScript"],
    functionName: "sum",
    description: { condition: "Add `a` and `b`.", input: [], output: "", constraints: [], example: "" },
    starterCode: "function sum(a, b) {\n  \n}",
    code: null,
    status: "not_started",
    solved: false,
    tests: [
      { name: "1 + 1", args: [1, 1], expected: 2 },
      { name: "hidden case", args: [2, 3], expected: 5, hidden: true },
    ],
    ...overrides,
  };
}

export const tasks = [
  makeTask({ id: 1 }),
  makeTask({
    id: 2,
    title: "Reverse a string",
    difficulty: 3,
    categories: ["Strings", "Loops"],
    functionName: "reverse",
    starterCode: "function reverse(s) {}",
    // In progress: saved code differs from the starter.
    code: "function reverse(s) { return s; }",
    status: "in_progress",
  }),
  makeTask({
    id: 3,
    title: "Binary search",
    difficulty: 5,
    categories: ["Search"],
    functionName: "search",
    solved: true,
    status: "solved",
  }),
  makeTask({
    id: 4,
    title: "Flatten a tree",
    difficulty: 4,
    categories: ["Trees", "Recursion"],
    functionName: "flatten",
    // Every section populated — the counterpart to task 1's empty ones.
    description: {
      condition: "Flatten the tree.",
      input: ["`root` — the tree root"],
      output: "A flat array.",
      constraints: ["0 ≤ nodes ≤ 1000"],
      example: "Вход: [1,2]\nВыход: [1,2]",
    },
  }),
];
