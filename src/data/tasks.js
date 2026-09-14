// Static bank of coding tasks.
//
// Same contract as src/data/questions.js: ids come from array position
// (`index + 1`), never stored in the data and never random — a random id
// generated at module load would change on every refresh and orphan saved
// localStorage progress. Appending new tasks at the end is always safe;
// reordering or deleting shifts ids and disconnects existing progress.
//
// Shape of one task:
//   {
//     title:        "Название (English Title)",
//     difficulty:   1..5,               // NOTE: tasks use 1–5, questions use 1–10
//     categories:   ["Greedy algorithms"],
//     languages:    ["JavaScript"],
//     functionName: "dispenseCash",     // what the solution must define
//     description:  { condition, input[], output, constraints[], example },
//     starterCode:  "function dispenseCash(...) { ... }",
//     tests:        [{ name, args, expected, hidden }],
//   }
//
// `hidden: true` tests are withheld from the Test cases tab and only run on
// Submit, so a solution can't be hard-coded against the visible examples.
// Inline code in description strings uses `backticks` and renders through
// FormattedText, exactly like question answers.

export const TASK_LANGUAGES = ["JavaScript"];

export const TASK_CATEGORIES = [
  "Algorithmics",
  "Data structures",
  "Databases",
  "Strings",
  "Arrays",
  "Objects",
  "Functions",
  "Sorting",
  "Trees",
  "Asynchronous",
  "Greedy algorithms",
];

const rawTasks = [
  {
    title: "Выдача суммы банкнотами (Cash Dispenser)",
    difficulty: 3,
    categories: ["Greedy algorithms"],
    languages: ["JavaScript"],
    functionName: "dispenseCash",
    description: {
      condition:
        "Реализуйте функцию, которая определяет, можно ли выдать запрошенную сумму заданным набором номиналов банкнот с учётом ограниченного количества банкнот каждого номинала, и если можно — возвращает состав выдачи (сколько банкнот каждого номинала использовано). Набор номиналов и их доступное количество передаются как конфигурация. Если собрать сумму из доступных банкнот невозможно (не хватает номиналов или банкнот), функция должна вернуть признак невозможности выдачи вместо набора банкнот.",
      input: [
        "`amount` — запрошенная сумма, целое положительное число",
        "`bills` — конфигурация доступных банкнот: список записей вида `{ value, count }`, где `value` — номинал, `count` — сколько банкнот этого номинала доступно",
      ],
      output:
        "объект вида `{ success: true, breakdown: [{ value, count }, ...] }` с составом выдачи (только номиналы с count > 0), либо `{ success: false, breakdown: null }`, если сумму выдать нельзя",
      constraints: [
        "`1 <= amount <= 10^7`",
        "Количество различных номиналов ≤ 20",
        "`count` для каждого номинала в пределах `0 <= count <= 1000`",
        "Номиналы — положительные целые числа, без дублирующихся значений в списке",
      ],
      example:
        "Вход:  amount = 130, bills = [{value: 100, count: 2}, {value: 50, count: 1}, {value: 10, count: 3}]\nВыход: { success: true, breakdown: [{value: 100, count: 1}, {value: 10, count: 3}] }\n\nВход:  amount = 45, bills = [{value: 100, count: 2}, {value: 50, count: 1}]\nВыход: { success: false, breakdown: null }\n\nВход:  amount = 0, bills = [{value: 10, count: 5}]\nВыход: { success: true, breakdown: [] }",
    },
    starterCode:
      "function dispenseCash(amount, bills) {\n  // TODO: implement solution here\n  return { success: false, breakdown: null };\n}\n",
    tests: [
      {
        name: "Выдаёт 130 крупными номиналами",
        args: [
          130,
          [
            { value: 100, count: 2 },
            { value: 50, count: 1 },
            { value: 10, count: 3 },
          ],
        ],
        expected: {
          success: true,
          breakdown: [
            { value: 100, count: 1 },
            { value: 10, count: 3 },
          ],
        },
      },
      {
        name: "Невозможно собрать сумму из доступных номиналов",
        args: [
          45,
          [
            { value: 100, count: 2 },
            { value: 50, count: 1 },
          ],
        ],
        expected: { success: false, breakdown: null },
      },
      {
        name: "Нулевая сумма — пустая выдача",
        args: [0, [{ value: 10, count: 5 }]],
        expected: { success: true, breakdown: [] },
      },
      {
        name: "Жадный выбор не должен мешать точной сумме",
        args: [
          60,
          [
            { value: 50, count: 1 },
            { value: 30, count: 2 },
          ],
        ],
        expected: { success: true, breakdown: [{ value: 30, count: 2 }] },
        hidden: true,
      },
      {
        name: "Учитывает ограниченное количество банкнот",
        args: [
          300,
          [
            { value: 100, count: 1 },
            { value: 50, count: 4 },
          ],
        ],
        expected: {
          success: true,
          breakdown: [
            { value: 100, count: 1 },
            { value: 50, count: 4 },
          ],
        },
        hidden: true,
      },
      {
        name: "Не хватает банкнот — выдача невозможна",
        args: [500, [{ value: 100, count: 3 }]],
        expected: { success: false, breakdown: null },
        hidden: true,
      },
    ],
  },
];

export function createTask(id, overrides = {}) {
  return {
    id,
    categories: [],
    languages: TASK_LANGUAGES,
    tests: [],
    ...overrides,
    // Progress fields always start at defaults — real values live in
    // localStorage, so anything progress-like in the data file is ignored.
    status: "not_started",
    code: null,
  };
}

export const tasks = rawTasks.map((task, index) => createTask(index + 1, task));
