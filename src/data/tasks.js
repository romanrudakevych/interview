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
// A test takes one of two forms:
//   { args, expected }  — call the solution with these arguments (most tasks).
//   { body, expected }  — a JS snippet run in the worker that receives
//                         `solution` and returns the value to compare. Use it
//                         whenever a test must pass functions in (promisify,
//                         memoize, runSequentially), count calls, or assert on
//                         a rejection. The body may use `await`.
//
// `hidden: true` tests are withheld from the Test cases tab and only run on
// Submit, so a solution can't be hard-coded against the visible examples.
// Keep at least one test that a plausible-but-wrong implementation fails —
// e.g. majorityElement has a case where the answer is not nums[0].
// Inline code in description strings uses `backticks` and renders through
// FormattedText, exactly like question answers.

export const TASK_LANGUAGES = ["JavaScript"];

export const TASK_CATEGORIES = [
  "Aggregation",
  "Algorithmics",
  "Arrays",
  "Asynchronous",
  "Caching",
  "Conditions",
  "Data structures",
  "Databases",
  "Dictionaries",
  "Dynamic programming",
  "Filtering",
  "Functions",
  "Graphs",
  "Greedy algorithms",
  "Grouping",
  "Iterators",
  "Linked lists",
  "Loops",
  "Matrices",
  "Objects",
  "Parsing",
  "Patterns",
  "Pointers",
  "Queue",
  "Recursion",
  "Search",
  "Sorting",
  "Stack",
  "Strings",
  "Trees",
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
  {
    title: "Сумма поля amount в массиве объектов (Sum of Amount Field)",
    difficulty: 3,
    categories: ["Objects"],
    languages: ["JavaScript"],
    functionName: "sumAmount",
    description: {
      condition:
        "Дан массив объектов, где у каждого объекта есть числовое поле `amount`. Если поле отсутствует, равно `undefined`, `null` или не является числом (например, строка), такой элемент должен игнорироваться при подсчёте (не должен вызывать ошибку и не должен добавляться к сумме). Напишите функцию, которая возвращает сумму значений поля `amount` по всем валидным элементам массива.",
      input: [
        "массив объектов `[{ amount: number | string | null | undefined, ... }, ...]`",
      ],
      output: "число — сумма валидных числовых значений `amount`",
      constraints: [
        "длина массива от 0 до 1000; объекты могут содержать другие поля, не влияющие на результат",
      ],
      example: "Вход: `[{amount: 10}, {amount: 20}, {amount: \"bad\"}, {amount: null}]`\nВыход: `30`",
    },
    starterCode:
      "function sumAmount(items) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Пример из условия",
        args: [[{"amount": 10}, {"amount": 20}, {"amount": "bad"}, {"amount": null}]],
        expected: 30,
      },
      {
        name: "Пустой массив — 0",
        args: [[]],
        expected: 0,
      },
      {
        name: "Поле отсутствует — игнорируется",
        args: [[{"amount": 5}, {"id": 1}, {"amount": 5}]],
        expected: 10,
      },
      {
        name: "Дробные и отрицательные значения",
        args: [[{"amount": 1.5}, {"amount": -0.5}]],
        expected: 1.0,
        hidden: true,
      },
      {
        name: "Булево значение не считается числом",
        args: [[{"amount": true}, {"amount": 4}]],
        expected: 4,
        hidden: true,
      },
      {
        name: "Все значения невалидны — 0",
        args: [[{"amount": "x"}, {"amount": null}, {}]],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Элемент большинства (Majority Element)",
    difficulty: 2,
    categories: ["Arrays"],
    languages: ["JavaScript"],
    functionName: "majorityElement",
    description: {
      condition:
        "Дан массив целых чисел `nums` размером `n`. Верните элемент, который встречается в массиве более `⌊n / 2⌋` раз (элемент большинства). Гарантируется, что такой элемент всегда существует в массиве.",
      input: [
        "`nums` — массив целых чисел, `1 ≤ nums.length ≤ 5 * 10^4`, `-10^9 ≤ nums[i] ≤ 10^9`",
      ],
      output: "Целое число — элемент большинства.",
      constraints: [
        "Элемент большинства всегда присутствует в массиве",
        "Массив содержит хотя бы один элемент",
      ],
      example: "Вход: nums = [3, 2, 3]\nВыход: 3\n\nВход: nums = [2, 2, 1, 1, 1, 2, 2]\nВыход: 2",
    },
    starterCode:
      "// Доступно без импорта: встроенные методы JS\n\nfunction majorityElement(nums) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Пример 1",
        args: [[3, 2, 3]],
        expected: 3,
      },
      {
        name: "Пример 2",
        args: [[2, 2, 1, 1, 1, 2, 2]],
        expected: 2,
      },
      {
        name: "Массив из одного элемента",
        args: [[1]],
        expected: 1,
      },
      {
        name: "Отрицательные числа",
        args: [[-5, -5, -5, 2, 3]],
        expected: -5,
        hidden: true,
      },
      {
        name: "Ровно ⌊n/2⌋+1 вхождений",
        args: [[1, 2, 3, 1, 1]],
        expected: 1,
        hidden: true,
      },
      {
        // Guards against simply returning nums[0].
        name: "Элемент большинства не в начале массива",
        args: [[2, 1, 1]],
        expected: 1,
      },
      {
        name: "Элемент большинства в середине",
        args: [[5, 1, 1, 1, 5]],
        expected: 1,
        hidden: true,
      },
    ],
  },
  {
    title: "Медиана массива (Median of Array)",
    difficulty: 2,
    categories: ["Arrays", "Sorting"],
    languages: ["JavaScript"],
    functionName: "findMedian",
    description: {
      condition:
        "Дан массив целых чисел. Найдите медиану — значение, которое находится в середине массива, если его отсортировать по возрастанию.\nЕсли длина массива нечётная, верните средний элемент. Если чётная — верните среднее арифметическое двух центральных элементов (как число с плавающей точкой).",
      input: [
        "`nums` — массив целых чисел, длина от 1 до 1000",
      ],
      output: "Число (целое или с плавающей точкой) — медиана массива.",
      constraints: [
        "`-10^6 <= nums[i] <= 10^6`",
        "`1 <= nums.length <= 1000`",
      ],
      example: "Вход: nums = [3, 1, 2]\nВыход: 2\n\nВход: nums = [4, 1, 3, 2]\nВыход: 2.5",
    },
    starterCode:
      "// Доступно без импорта: встроенные методы JS\n\nfunction findMedian(nums) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Нечётная длина",
        args: [[3, 1, 2]],
        expected: 2,
      },
      {
        name: "Чётная длина — среднее двух центральных",
        args: [[4, 1, 3, 2]],
        expected: 2.5,
      },
      {
        name: "Один элемент",
        args: [[5]],
        expected: 5,
      },
      {
        name: "Отрицательные числа",
        args: [[-5, -1, -3]],
        expected: -3,
        hidden: true,
      },
      {
        name: "Дубликаты, чётная длина",
        args: [[2, 2, 2, 2]],
        expected: 2,
        hidden: true,
      },
      {
        name: "Не полагается на исходный порядок",
        args: [[10, 1, 9, 2]],
        expected: 5.5,
        hidden: true,
      },
    ],
  },
  {
    title: "Полифил метода startsWith (String startsWith Polyfill)",
    difficulty: 2,
    categories: ["Strings"],
    languages: ["JavaScript"],
    functionName: "myStartsWith",
    description: {
      condition:
        "Реализуйте функцию, которая проверяет, начинается ли строка с указанной подстроки — аналог метода `String.prototype.startsWith`, но без использования этого встроенного метода (и без других строковых методов высокого уровня, реализующих ту же проверку напрямую). Требуется базовая посимвольная логика.",
      input: [
        "`str` — исходная строка",
        "`search` — подстрока, наличие которой в начале `str` нужно проверить",
        "`position` (необязательный) — индекс, с которого начинать проверку в `str` (по умолчанию 0)",
      ],
      output: "`true`, если `str`, начиная с индекса `position`, начинается с `search`, иначе `false`.",
      constraints: [
        "`0 ≤ str.length ≤ 10^4`",
        "`0 ≤ search.length ≤ str.length`",
        "`0 ≤ position ≤ str.length`",
        "Если `search` — пустая строка, результат всегда `true`",
        "Сравнение регистрозависимое",
      ],
      example: "Вход: str=\"Hello world\", search=\"Hello\"\nВыход: true\n\nВход: str=\"Hello world\", search=\"world\"\nВыход: false\n\nВход: str=\"Hello world\", search=\"world\", position=6\nВыход: true\n\nВход: str=\"test\", search=\"\"\nВыход: true",
    },
    starterCode:
      "// Доступно без импорта: встроенные методы JS\n\nfunction myStartsWith(str, search, position = 0) {\n  // TODO: напишите решение здесь\n  return false;\n}\n",
    tests: [
      {
        name: "Строка начинается с подстроки",
        args: ["Hello world", "Hello"],
        expected: true,
      },
      {
        name: "Строка не начинается с подстроки",
        args: ["Hello world", "world"],
        expected: false,
      },
      {
        name: "С учётом position",
        args: ["Hello world", "world", 6],
        expected: true,
      },
      {
        name: "Пустая подстрока — всегда true",
        args: ["test", ""],
        expected: true,
      },
      {
        name: "Сравнение регистрозависимое",
        args: ["Test", "t"],
        expected: false,
        hidden: true,
      },
      {
        name: "Подстрока длиннее остатка строки",
        args: ["abc", "abcd"],
        expected: false,
        hidden: true,
      },
      {
        name: "position в конце строки",
        args: ["abc", "", 3],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Поиск белок на дереве (Find Squirrels in Tree)",
    difficulty: 2,
    categories: ["Trees"],
    languages: ["JavaScript"],
    functionName: "findSquirrels",
    description: {
      condition:
        "На дереве в виде узлов сидят разные животные (белки и вороны). Каждый узел дерева содержит тип животного и его имя, а также список дочерних узлов (веток с животными). Реализуйте функцию, которая обходит дерево и возвращает имена всех белок в порядке обхода в глубину (preorder).",
      input: [
        "Корень дерева — объект вида `{ type: \"squirrel\" | \"crow\", name: string, children: [...] }`. `children` — массив таких же объектов (может быть пустым или отсутствовать).",
      ],
      output: "Массив строк — имена всех животных с типом `\"squirrel\"`, в порядке DFS-обхода.",
      constraints: [
        "Глубина дерева до 100",
        "Количество узлов до 1000",
        "Тип животного — только `\"squirrel\"` или `\"crow\"`",
      ],
      example: "Вход: {\ntype: \"crow\", name: \"Grayfeather\",\nchildren: [\n{ type: \"squirrel\", name: \"Acorn\", children: [\n{ type: \"squirrel\", name: \"Sirsalty\" }\n]},\n{ type: \"crow\", name: \"Blackwing\", children: [\n{ type: \"squirrel\", name: \"Macadamia\" },\n{ type: \"squirrel\", name: \"Kernel\" }\n]}\n]\n}\nВыход: [\"Acorn\", \"Sirsalty\", \"Macadamia\", \"Kernel\"]",
    },
    starterCode:
      "// Узел дерева: { type: \"squirrel\" | \"crow\", name: string, children?: [...] }\n\nfunction findSquirrels(root) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Пример из условия",
        args: [{"type": "crow", "name": "Grayfeather", "children": [{"type": "squirrel", "name": "Acorn", "children": [{"type": "squirrel", "name": "Sirsalty"}]}, {"type": "crow", "name": "Blackwing", "children": [{"type": "squirrel", "name": "Macadamia"}, {"type": "squirrel", "name": "Kernel"}]}]}],
        expected: ["Acorn", "Sirsalty", "Macadamia", "Kernel"],
      },
      {
        name: "Корень-белка без children",
        args: [{"type": "squirrel", "name": "Solo"}],
        expected: ["Solo"],
      },
      {
        name: "Только вороны — пустой результат",
        args: [{"type": "crow", "name": "A", "children": [{"type": "crow", "name": "B"}]}],
        expected: [],
      },
      {
        name: "Глубокая вложенность сохраняет порядок preorder",
        args: [{"type": "squirrel", "name": "S1", "children": [{"type": "squirrel", "name": "S2", "children": [{"type": "squirrel", "name": "S3"}]}, {"type": "squirrel", "name": "S4"}]}],
        expected: ["S1", "S2", "S3", "S4"],
        hidden: true,
      },
      {
        name: "Пустой список children",
        args: [{"type": "squirrel", "name": "Lone", "children": []}],
        expected: ["Lone"],
        hidden: true,
      },
    ],
  },
  {
    title: "Top-K по id из двух массивов записей (Top K Records By Id From Two Arrays)",
    difficulty: 3,
    categories: ["Arrays", "Sorting"],
    languages: ["JavaScript"],
    functionName: "topKRecordsById",
    description: {
      condition:
        "Даны два массива записей, полученных с разных серверов. Каждая запись имеет поле `id` (целое число) и поле `value` (строка). Все `id` уникальны в пределах каждого массива и не повторяются между массивами. Дано число `k`. Нужно объединить оба массива и вернуть `k` записей с наибольшими значениями `id`, отсортированных по `id` по убыванию.",
      input: [
        "`first` — массив записей `{id, value}`",
        "`second` — массив записей `{id, value}`",
        "`k` — целое число, `0 <= k <= first.length + second.length`",
      ],
      output: "Массив из `k` записей `{id, value}`, отсортированных по `id` по убыванию.",
      constraints: [
        "`0 <= first.length, second.length <= 10^4`",
        "все `id` уникальны в объединении обоих массивов",
        "`1 <= id <= 10^9`",
      ],
      example: "Вход: `first = [{id:1,value:\"a\"},{id:5,value:\"b\"}]`, `second = [{id:3,value:\"c\"},{id:8,value:\"d\"}]`, `k = 3`\nВыход: `[{id:8,value:\"d\"},{id:5,value:\"b\"},{id:3,value:\"c\"}]`",
    },
    starterCode:
      "// Доступно без импорта: встроенные методы JS\n\nfunction topKRecordsById(first, second, k) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Пример из условия",
        args: [[{"id": 1, "value": "a"}, {"id": 5, "value": "b"}], [{"id": 3, "value": "c"}, {"id": 8, "value": "d"}], 3],
        expected: [{"id": 8, "value": "d"}, {"id": 5, "value": "b"}, {"id": 3, "value": "c"}],
      },
      {
        name: "k = 0 — пустой результат",
        args: [[{"id": 1, "value": "a"}], [{"id": 2, "value": "b"}], 0],
        expected: [],
      },
      {
        name: "Один из массивов пустой",
        args: [[], [{"id": 2, "value": "b"}, {"id": 9, "value": "c"}], 1],
        expected: [{"id": 9, "value": "c"}],
      },
      {
        name: "k равен суммарной длине",
        args: [[{"id": 4, "value": "x"}], [{"id": 7, "value": "y"}], 2],
        expected: [{"id": 7, "value": "y"}, {"id": 4, "value": "x"}],
        hidden: true,
      },
      {
        name: "Оба массива пустые",
        args: [[], [], 0],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Мемоизация с очисткой кэша (Memoize with Cache Clearing)",
    difficulty: 2,
    categories: ["Functions"],
    languages: ["JavaScript"],
    functionName: "memoize",
    description: {
      condition:
        "Реализуйте функцию `memoize(fn)`, которая возвращает мемоизированную версию `fn`. При повторном вызове с теми же аргументами результат берётся из кэша, а не пересчитывается заново. Аргументы могут быть любыми примитивами, включая `undefined` (в Python — `None`), причём вызов с явным `undefined`/`None` должен кэшироваться отдельно от вызова с другим значением того же аргумента. Возвращаемая функция должна иметь метод `clearCache()` (в Python — `clear_cache()`), который полностью очищает кэш: следующий вызов с любыми аргументами после этого пересчитывается заново.",
      input: [],
      output: "",
      constraints: [],
      example: "Вход: memoize(fn); fn.call(2, 3) -> 5 (вычисляется)\nВход: тот же вызов fn.call(2, 3) -> 5 (из кэша)\nВход: fn.clearCache(); fn.call(2, 3) -> 5 (вычисляется заново)",
    },
    starterCode:
      "// Доступно без импорта: встроенные методы JS\n\nfunction memoize(fn) {\n  // TODO: напишите решение здесь\n  return fn;\n}\n",
    tests: [
      {
        name: "Повторный вызов берётся из кэша",
        body:
          "let calls = 0;\nconst fn = (a, b) => { calls++; return a + b; };\nconst m = solution(fn);\nconst r1 = m(2, 3);\nconst r2 = m(2, 3);\nreturn { r1, r2, calls };",
        expected: {"r1": 5, "r2": 5, "calls": 1},
      },
      {
        name: "clearCache() заставляет пересчитать",
        body:
          "let calls = 0;\nconst fn = (a, b) => { calls++; return a + b; };\nconst m = solution(fn);\nm(2, 3);\nm(2, 3);\nm.clearCache();\nconst r = m(2, 3);\nreturn { r, calls };",
        expected: {"r": 5, "calls": 2},
      },
      {
        name: "Разные аргументы кэшируются отдельно",
        body:
          "let calls = 0;\nconst fn = (a) => { calls++; return a * 2; };\nconst m = solution(fn);\nconst out = [m(1), m(2), m(1), m(2)];\nreturn { out, calls };",
        expected: {"out": [2, 4, 2, 4], "calls": 2},
      },
      {
        name: "undefined кэшируется отдельно от строки \"undefined\"",
        body:
          "let calls = 0;\nconst fn = (a) => { calls++; return String(a); };\nconst m = solution(fn);\nconst a = m(undefined);\nconst b = m('undefined');\nconst c = m(undefined);\nreturn { a, b, c, calls };",
        expected: {"a": "undefined", "b": "undefined", "c": "undefined", "calls": 2},
        hidden: true,
      },
      {
        name: "Кэш работает и после очистки",
        body:
          "let calls = 0;\nconst fn = (a) => { calls++; return a; };\nconst m = solution(fn);\nm(7); m.clearCache(); m(7); m(7);\nreturn calls;",
        expected: 2,
        hidden: true,
      },
      {
        // Guards against a naive args.join(",") cache key, which would collide
        // m(1, 2) with m("1,2").
        name: "Ключ кэша учитывает границы аргументов",
        body:
          "let calls = 0;\nconst fn = (...a) => { calls++; return a.length; };\nconst m = solution(fn);\nconst a = m(1, 2);\nconst b = m('1,2');\nreturn { a, b, calls };",
        expected: { a: 2, b: 1, calls: 2 },
        hidden: true,
      },
    ],
  },
  {
    title: "Промисификация функции (Promisify)",
    difficulty: 3,
    categories: ["Functions"],
    languages: ["JavaScript"],
    functionName: "promisify",
    description: {
      condition:
        "Дана функция в стиле error-first callback вида `(...args, callback) => void`, где `callback(err, result)` вызывается ровно один раз — либо с ошибкой (`err` не null, `result` не важен), либо без ошибки (`err` равен null, `result` содержит данные). Функция может принимать произвольное количество аргументов перед колбэком (например, `loadScript(url, callback)`). Нужно реализовать функцию `promisify(asyncFn)`, которая возвращает новую функцию. Новая функция принимает те же аргументы, что и `asyncFn`, но без колбэка, сама добавляет колбэк при вызове `asyncFn` и возвращает `Promise`, который резолвится значением `result`, если ошибки не было, и реджектится значением `err`, если ошибка произошла.",
      input: [
        "`asyncFn` — функция вида `(...args, callback) => void`.",
      ],
      output: "функция вида `(...args) => Promise<result>`.",
      constraints: [
        "`asyncFn` вызывает колбэк ровно один раз",
        "без реальных задержек (`setTimeout`) — только микротаски",
      ],
      example: "Вход: `asyncFn = (url, cb) => Promise.resolve().then(() => cb(null, \"loaded:\" + url))`\nВыход: `promisify(asyncFn)(\"script.js\")` → resolve `\"loaded:script.js\"`",
    },
    starterCode:
      "// Шаблон:\n// Доступно без импорта: встроенные методы JS\nfunction promisify(asyncFn) {\n  // TODO: напишите решение здесь\n  return function() {};\n}\n",
    tests: [
      {
        name: "Резолвится результатом колбэка",
        body:
          "const asyncFn = (url, cb) => Promise.resolve().then(() => cb(null, 'loaded:' + url));\nreturn await solution(asyncFn)('script.js');",
        expected: "loaded:script.js",
      },
      {
        name: "Реджектится ошибкой из колбэка",
        body:
          "const asyncFn = (cb) => Promise.resolve().then(() => cb('boom'));\ntry { await solution(asyncFn)(); return 'NO_REJECT'; }\ncatch (e) { return { rejected: e }; }",
        expected: {"rejected": "boom"},
      },
      {
        name: "Возвращает именно Promise",
        body:
          "const asyncFn = (cb) => Promise.resolve().then(() => cb(null, 1));\nconst r = solution(asyncFn)();\nreturn r != null && typeof r.then === 'function';",
        expected: true,
      },
      {
        name: "Пробрасывает несколько аргументов",
        body:
          "const asyncFn = (a, b, cb) => Promise.resolve().then(() => cb(null, a + b));\nreturn await solution(asyncFn)(2, 3);",
        expected: 5,
        hidden: true,
      },
      {
        name: "Работает без аргументов",
        body:
          "const asyncFn = (cb) => Promise.resolve().then(() => cb(null, 'ok'));\nreturn await solution(asyncFn)();",
        expected: "ok",
        hidden: true,
      },
    ],
  },
  {
    title: "Последовательное выполнение промисов (Run Promises Sequentially)",
    difficulty: 3,
    categories: ["Asynchronous"],
    languages: ["JavaScript"],
    functionName: "runSequentially",
    description: {
      condition:
        "Реализуйте функцию `runSequentially`, которая принимает массив функций, каждая из которых при вызове возвращает промис. Функция должна выполнять эти промисы последовательно (не параллельно) — следующий запускается только после того, как предыдущий успешно завершился.\nЕсли все промисы выполнились успешно, возвращаемый промис резолвится массивом результатов (в порядке следования исходных функций). Если хотя бы один из промисов отклоняется (reject), выполнение немедленно прекращается, и возвращаемый промис отклоняется с этой же ошибкой — оставшиеся промисы не запускаются.",
      input: [
        "`tasks` — массив функций без аргументов, каждая из которых возвращает `Promise` (может быть пустым).",
      ],
      output: "`Promise`, который:\nрезолвится массивом результатов всех промисов (в порядке `tasks`), если все выполнились успешно;\n\nотклоняется с ошибкой первого зареджекченного промиса, если такой встретился (промисы после него не запускаются).",
      constraints: [
        "`0 ≤ tasks.length ≤ 20`",
        "Каждая функция при вызове возвращает промис, который резолвится или реджектится с любой задержкой",
        "Пустой массив — немедленный resolve с `[]`",
      ],
      example: "Вход: tasks = [() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)]\nВыход: промис резолвится [1, 2, 3]\n\nВход: tasks = [() => Promise.resolve(1), () => Promise.reject('err'), () => Promise.resolve(3)]\nВыход: промис отклоняется 'err' (третья функция не вызывается)\n\nВход: tasks = []\nВыход: промис резолвится []",
    },
    starterCode:
      "// Доступно без импорта: встроенные методы JS\n\nfunction runSequentially(tasks) {\n  // TODO: напишите решение здесь\n  return Promise.resolve([]);\n}\n",
    tests: [
      {
        name: "Все промисы успешны",
        body:
          "return await solution([() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)]);",
        expected: [1, 2, 3],
      },
      {
        name: "Пустой массив — resolve с []",
        body:
          "return await solution([]);",
        expected: [],
      },
      {
        name: "Реджект останавливает выполнение",
        body:
          "let started = 0;\nconst tasks = [\n  () => { started++; return Promise.resolve(1); },\n  () => { started++; return Promise.reject('err'); },\n  () => { started++; return Promise.resolve(3); },\n];\ntry { await solution(tasks); return 'NO_REJECT'; }\ncatch (e) { return { error: e, started }; }",
        expected: {"error": "err", "started": 2},
      },
      {
        name: "Выполняется последовательно, а не параллельно",
        body:
          "const order = [];\nconst mk = (id, ms) => () => new Promise((r) => setTimeout(() => { order.push(id); r(id); }, ms));\nconst res = await solution([mk(1, 40), mk(2, 15), mk(3, 0)]);\nreturn { res, order };",
        expected: {"res": [1, 2, 3], "order": [1, 2, 3]},
        hidden: true,
      },
      {
        name: "Одна задача",
        body:
          "return await solution([() => Promise.resolve('only')]);",
        expected: ["only"],
        hidden: true,
      },
    ],
  },
  // ---- Импортировано из yeahub scrape (scrap-code-tasks) ----
  {
    title: "Самая длинная подстрока с не более чем K различными символами",
    difficulty: 3,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "longestSubstringKDistinct",
    description: {
      condition: "Дана строка `s` и число `k`.\n\nНужно вернуть длину самой длинной подстроки, которая содержит не более `k` различных символов.\n\nПодстрока — это непрерывная часть строки.",
      input: [],
      output: "",
      constraints: [],
      example: "s = \"eceba\"\nk = 2\n\n3\n\nПояснение:\n\n\"ece\"",
    },
    starterCode: "function longestSubstringKDistinct(s, k) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "\"eceba\", k = 2 → 3",
        args: [
          "eceba",
          2,
        ],
        expected: 3,
      },
      {
        name: "\"aa\", k = 1 → 2",
        args: [
          "aa",
          1,
        ],
        expected: 2,
      },
      {
        name: "Пустая строка",
        args: [
          "",
          3,
        ],
        expected: 0,
      },
      {
        name: "k = 0 — подстроки нет",
        args: [
          "abc",
          0,
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Окно в середине строки длиннее краёв",
        args: [
          "aabbccddeeff",
          3,
        ],
        expected: 6,
        hidden: true,
      },
      {
        name: "k больше числа различных символов",
        args: [
          "abcabc",
          10,
        ],
        expected: 6,
        hidden: true,
      },
    ],
  },
  {
    title: "Аккумуляция символов (Accum)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "accum",
    description: {
      condition: "Напишите функцию `accum`, которая принимает строку и возвращает новую строку, где каждый символ повторяется столько раз, какой его индекс в строке (начиная с 1), и разделяется дефисами. Каждый блок начинается с заглавной буквы, а остальные символы в блоке — строчные.\n\nПравила:\n\nИндексация начинается с 1 (первый символ повторяется 1 раз, второй — 2 раза и т.д.)\n\nПервая буква каждого блока — заглавная, остальные — строчные\n\nБлоки разделяются дефисом `-`",
      input: [],
      output: "",
      constraints: [
        "Длина строки: 1 ≤ N ≤ 100",
        "Символы: латинские буквы (a-z, A-Z)",
        "Время выполнения: O(N²)",
        "Память: O(N²)",
      ],
      example: "accum('abcd')      // -> \"A-Bb-Ccc-Dddd\"\naccum('RqaEzty')   // -> \"R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy\"\naccum('cwAt')      // -> \"C-Ww-Aaa-Tttt\"",
    },
    starterCode: "function accum(str) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "\"abcd\"",
        args: [
          "abcd",
        ],
        expected: "A-Bb-Ccc-Dddd",
      },
      {
        name: "\"RqaEzty\"",
        args: [
          "RqaEzty",
        ],
        expected: "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy",
      },
      {
        name: "Один символ",
        args: [
          "z",
        ],
        expected: "Z",
      },
      {
        name: "\"cwAt\" — регистр нормализуется",
        args: [
          "cwAt",
        ],
        expected: "C-Ww-Aaa-Tttt",
        hidden: true,
      },
      {
        name: "Все буквы заглавные",
        args: [
          "ABC",
        ],
        expected: "A-Bb-Ccc",
        hidden: true,
      },
    ],
  },
  {
    title: "Среднее значение массива чисел (Array Average)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findAverage",
    description: {
      condition: "Напишите функцию `findAverage`, которая принимает массив чисел и возвращает их среднее арифметическое. Если массив пуст, функция должна вернуть 0.",
      input: [],
      output: "",
      constraints: [
        "Массив может содержать целые числа или числа с плавающей точкой",
        "Массив может быть пустым (тогда возвращается 0)",
        "Длина массива не превышает 1000 элементов",
        "Результат может быть дробным числом",
      ],
      example: "Вход: [1, 2, 3, 4]\nВыход: 2.5\n\nВход: [10, 20, 30]\nВыход: 20\n\nВход: [5]\nВыход: 5\n\nВход: []\nВыход: 0",
    },
    starterCode: "function findAverage(arr) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "[1, 2, 3, 4]",
        args: [
          [
            1,
            2,
            3,
            4,
          ],
        ],
        expected: 2.5,
      },
      {
        name: "[10, 20, 30]",
        args: [
          [
            10,
            20,
            30,
          ],
        ],
        expected: 20,
      },
      {
        name: "Пустой массив → 0",
        args: [
          [],
        ],
        expected: 0,
      },
      {
        name: "Один элемент",
        args: [
          [
            5,
          ],
        ],
        expected: 5,
        hidden: true,
      },
      {
        name: "Отрицательные числа",
        args: [
          [
            -4,
            -2,
            0,
            2,
          ],
        ],
        expected: -1,
        hidden: true,
      },
    ],
  },
  {
    title: "Реализация стека на массиве (Array-Based Stack)",
    difficulty: 2,
    categories: [
      "Arrays",
      "Stack",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "Stack",
    description: {
      condition: "Реализуйте класс `Stack`, работающий на основе массива фиксированного размера с автоматическим увеличением при заполнении.\n\nКласс должен поддерживать:\n\nИнициализацию с заданной начальной ёмкостью (`capacity`)\n\n`push(value)` — добавление элемента в стек. Если внутренний массив заполнен, его размер увеличивается вдвое перед вставкой.\n\n`peek()` — возвращает последний добавленный элемент без удаления. Если стек пуст — возвращает `null`.\n\n`pop()` — возвращает последний добавленный элемент и удаляет его из стека (уменьшает логический размер). Если стек пуст — возвращает `null`.\n\n`isEmpty()` — возвращает `true`, если элементов в стеке нет, иначе `false`.\n\n`size()` — возвращает текущее количество элементов в стеке.",
      input: [
        "`capacity` — начальная ёмкость стека (целое положительное число), передаётся в конструктор",
        "Далее — последовательность вызовов методов `push` / `pop` / `peek` / `isEmpty` / `size`",
      ],
      output: "Результат каждого вызова: `push` ничего не возвращает, `pop` и `peek` — элемент или `null`, `isEmpty` — `true`/`false`, `size` — число",
      constraints: [
        "`1 <= capacity <= 100`",
        "Количество операций `0 <= n <= 1000`",
        "Значения элементов — целые числа",
      ],
      example: "const stack = new Stack(2);\nstack.push(1);\nstack.push(2);\nstack.push(3);   // массив вырос вдвое\n\nstack.peek();     // -> 3\nstack.size();     // -> 3\nstack.pop();      // -> 3\nstack.isEmpty();  // -> false",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nclass Stack {\n  constructor(capacity) {\n    // TODO: напишите решение здесь\n  }\n\n  push(value) {\n    // TODO: напишите решение здесь\n  }\n\n  pop() {\n    // TODO: напишите решение здесь\n    return null;\n  }\n\n  peek() {\n    // TODO: напишите решение здесь\n    return null;\n  }\n\n  isEmpty() {\n    // TODO: напишите решение здесь\n    return true;\n  }\n\n  size() {\n    // TODO: напишите решение здесь\n    return 0;\n  }\n}\n",
    tests: [
      {
        name: "Пример из условия",
        body: "const s = new solution(2);\nconst out = [];\nout.push(s.push(1) ?? null, s.push(2) ?? null, s.push(3) ?? null);\nout.push(s.peek(), s.size(), s.pop(), s.isEmpty());\nreturn out;",
        expected: [
          null,
          null,
          null,
          3,
          3,
          3,
          false,
        ],
      },
      {
        name: "Пустой стек: pop и peek возвращают null",
        body: "const s = new solution(3);\nreturn [s.pop(), s.peek(), s.isEmpty(), s.size()];",
        expected: [
          null,
          null,
          true,
          0,
        ],
      },
      {
        name: "LIFO-порядок сохраняется",
        body: "const s = new solution(1);\ns.push(\"a\"); s.push(\"b\"); s.push(\"c\");\nreturn [s.pop(), s.pop(), s.pop(), s.pop()];",
        expected: [
          "c",
          "b",
          "a",
          null,
        ],
        hidden: true,
      },
      {
        name: "Рост ёмкости не теряет элементы",
        body: "const s = new solution(2);\nfor (let i = 1; i <= 10; i++) s.push(i);\nreturn [s.size(), s.peek(), s.pop(), s.size()];",
        expected: [
          10,
          10,
          10,
          9,
        ],
        hidden: true,
      },
      {
        name: "Повторное использование после опустошения",
        body: "const s = new solution(2);\ns.push(1); s.pop();\ns.push(7);\nreturn [s.size(), s.peek(), s.isEmpty()];",
        expected: [
          1,
          7,
          false,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма элементов массива (Array Sum)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumArray",
    description: {
      condition: "Напишите функцию `sumArray`, которая принимает массив чисел и возвращает сумму всех его элементов.",
      input: [],
      output: "",
      constraints: [
        "Массив может содержать целые числа (положительные, отрицательные или ноль)",
        "Массив может быть пустым (тогда сумма равна 0)",
        "Длина массива не превышает 1000 элементов",
      ],
      example: "Вход: [1, 2, 5]\nВыход: 8\n\nВход: [10, -5, 3]\nВыход: 8\n\nВход: []\nВыход: 0\n\nВход: [42]\nВыход: 42",
    },
    starterCode: "function sumArray(arr) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "[1, 2, 5]",
        args: [
          [
            1,
            2,
            5,
          ],
        ],
        expected: 8,
      },
      {
        name: "[10, -5, 3]",
        args: [
          [
            10,
            -5,
            3,
          ],
        ],
        expected: 8,
      },
      {
        name: "Пустой массив → 0",
        args: [
          [],
        ],
        expected: 0,
      },
      {
        name: "Один элемент",
        args: [
          [
            42,
          ],
        ],
        expected: 42,
        hidden: true,
      },
      {
        name: "Только отрицательные",
        args: [
          [
            -1,
            -2,
            -3,
          ],
        ],
        expected: -6,
        hidden: true,
      },
    ],
  },
  {
    title: "Преобразование массива свойств в объект (Array to Object Mapping)",
    difficulty: 1,
    categories: [
      "Objects",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "arrayToObject",
    description: {
      condition: "С бекенда приходит массив объектов. Каждый объект содержит два поля:\n\n`name` — название свойства;\n\n`value` — значение свойства.\n\nНеобходимо написать функцию, которая преобразует такой массив в один объект, где каждый `name` становится ключом, а соответствующий `value` становится значением.\n\nЕсли в массиве несколько объектов с одинаковым `name`, нужно использовать значение из последнего такого объекта.",
      input: [
        "Массив объектов вида:",
        "[\n  { name: \"width\", value: 10 },\n  { name: \"height\", value: 20 }\n]",
      ],
      output: "Объект, где ключи — это значения поля `name`, а значения — это значения поля `value`.",
      constraints: [
        "0 <= arr.length <= 10 000",
        "name — непустая строка",
        "value — любое примитивное значение: number, string, boolean, null",
        "Если name повторяется, используется последнее значение",
      ],
      example: "Вход:\n\n[\n  { name: \"width\", value: 10 },\n  { name: \"height\", value: 20 }\n]\n\nВыход:\n\n{\n  width: 10,\n  height: 20\n}",
    },
    starterCode: "function arrayToObject(arr) {\n  // TODO: напишите решение здесь\n  return {};\n}\n",
    tests: [
      {
        name: "Два свойства",
        args: [
          [
            {
              name: "width",
              value: 10,
            },
            {
              name: "height",
              value: 20,
            },
          ],
        ],
        expected: {
          width: 10,
          height: 20,
        },
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: {},
      },
      {
        name: "Повтор name — побеждает последнее значение",
        args: [
          [
            {
              name: "color",
              value: "red",
            },
            {
              name: "color",
              value: "blue",
            },
          ],
        ],
        expected: {
          color: "blue",
        },
      },
      {
        name: "Разные типы значений",
        args: [
          [
            {
              name: "a",
              value: null,
            },
            {
              name: "b",
              value: false,
            },
            {
              name: "c",
              value: "x",
            },
          ],
        ],
        expected: {
          a: null,
          b: false,
          c: "x",
        },
        hidden: true,
      },
      {
        name: "Повтор среди других ключей",
        args: [
          [
            {
              name: "x",
              value: 1,
            },
            {
              name: "y",
              value: 2,
            },
            {
              name: "x",
              value: 3,
            },
          ],
        ],
        expected: {
          x: 3,
          y: 2,
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Массив в объект с нулевыми значениями (Array to Zero-Value Object)",
    difficulty: 1,
    categories: [
      "Objects",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "foo",
    description: {
      condition: "Реализуйте функцию `foo`, которая принимает массив элементов и возвращает объект, где каждый элемент массива становится ключом, а его значением всегда является `0`.",
      input: [
        "`arr` — массив строк или чисел (длина от 0 до 10⁴)",
      ],
      output: "Объект (словарь), где каждый ключ — элемент из `arr` (приведённый к строке), а значение — `0`.",
      constraints: [
        "`0 <= arr.length <= 10000`",
        "Элементы массива могут повторяться — в этом случае ключ в объекте один",
        "Элементы массива — строки или числа",
      ],
      example: "Вход: [\"a\", \"b\", \"c\"]\nВыход: {\"a\": 0, \"b\": 0, \"c\": 0}\n\nВход: [1, 2, 2, 3]\nВыход: {\"1\": 0, \"2\": 0, \"3\": 0}\n\nВход: []\nВыход: {}",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction foo(arr) {\n  // TODO: напишите решение здесь\n  return {};\n}\n",
    tests: [
      {
        name: "[\"a\", \"b\", \"c\"]",
        args: [
          [
            "a",
            "b",
            "c",
          ],
        ],
        expected: {
          a: 0,
          b: 0,
          c: 0,
        },
      },
      {
        name: "Дубликаты схлопываются",
        args: [
          [
            1,
            2,
            2,
            3,
          ],
        ],
        expected: {
          "1": 0,
          "2": 0,
          "3": 0,
        },
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: {},
      },
      {
        name: "Числа приводятся к строкам-ключам",
        args: [
          [
            10,
          ],
        ],
        expected: {
          "10": 0,
        },
        hidden: true,
      },
      {
        name: "Смешанные строки и числа",
        args: [
          [
            "x",
            1,
            "x",
          ],
        ],
        expected: {
          "1": 0,
          x: 0,
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Поиск статей по слову (Article Word Search)",
    difficulty: 3,
    categories: [
      "Search",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "createArticleStorage",
    description: {
      condition: "Необходимо реализовать простое хранилище статей.\n\nФункция `createArticleStorage()` возвращает объект с двумя методами:\n\n`addArticle(articleId, text)` — сохраняет статью по идентификатору `articleId`. Если статья с таким `articleId` уже существует, её текст нужно заменить на новый.\n\n`search(word)` — возвращает список всех `articleId`, в тексте которых есть заданное слово. Слово должно искаться как отдельное слово, а не как часть другого: `\"test\"` есть в `\"this is test article\"`, но не в `\"test2\"`.\n\nПорядок идентификаторов в результате — порядок добавления статей.",
      input: [
        "`articleId` — строковый идентификатор статьи",
        "`text` — текст статьи",
        "`word` — слово для поиска",
      ],
      output: "`search(word)` — массив `articleId`, в которых найдено заданное слово",
      constraints: [
        "`1 <= articleId.length <= 100`",
        "`1 <= text.length <= 10000`",
        "`1 <= word.length <= 100`",
        "Количество статей <= 10000",
        "Текст состоит из латинских букв, цифр, пробелов и знаков препинания",
      ],
      example: "const { addArticle, search } = createArticleStorage();\n\naddArticle(\"article111\", \"this is test1 article\");\naddArticle(\"article112\", \"this is test2 article\");\naddArticle(\"article113\", \"this is test article\");\n\nsearch(\"test\");    // -> [\"article113\"]\nsearch(\"article\"); // -> [\"article111\", \"article112\", \"article113\"]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction createArticleStorage() {\n  const storage = {};\n\n  function addArticle(articleId, text) {\n    // TODO: напишите решение здесь\n  }\n\n  function search(word) {\n    // TODO: напишите решение здесь\n    return [];\n  }\n\n  return { addArticle, search };\n}\n",
    tests: [
      {
        name: "Слово ищется целиком, а не как подстрока",
        body: "const s = solution();\ns.addArticle(\"a111\", \"this is test1 article\");\ns.addArticle(\"a112\", \"this is test2 article\");\ns.addArticle(\"a113\", \"this is test article\");\nreturn s.search(\"test\");",
        expected: [
          "a113",
        ],
      },
      {
        name: "Слово есть во всех статьях",
        body: "const s = solution();\ns.addArticle(\"a111\", \"this is test1 article\");\ns.addArticle(\"a112\", \"this is test2 article\");\nreturn s.search(\"article\");",
        expected: [
          "a111",
          "a112",
        ],
      },
      {
        name: "Слово не найдено",
        body: "const s = solution();\ns.addArticle(\"a1\", \"hello world\");\nreturn s.search(\"missing\");",
        expected: [],
      },
      {
        name: "Повторный addArticle заменяет текст",
        body: "const s = solution();\ns.addArticle(\"a1\", \"first text\");\ns.addArticle(\"a1\", \"second text\");\nreturn [s.search(\"first\"), s.search(\"second\")];",
        expected: [
          [],
          [
            "a1",
          ],
        ],
        hidden: true,
      },
      {
        name: "Знаки препинания не мешают найти слово",
        body: "const s = solution();\ns.addArticle(\"a1\", \"Hello, world! Testing.\");\nreturn [s.search(\"world\"), s.search(\"testing\")];",
        expected: [
          [
            "a1",
          ],
          [
            "a1",
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Асинхронный фильтр массива (Async Array Filter)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "asyncFilter",
    description: {
      condition: "Реализуйте асинхронную функцию `asyncFilter()`, которая фильтрует массив, используя асинхронную функцию-предикат.\n\nПараметры функции:\n\n`array` (массив) - исходный массив для фильтрации\n\n`callback` (асинхронная функция) - предикат, возвращающий Promise с boolean или number (где truthy/falsy определяет включение)",
      input: [],
      output: "",
      constraints: [
        "Функция должна обрабатывать элементы параллельно (Promise.all)",
        "Результат должен сохранять исходный порядок элементов",
        "Возвращать Promise с отфильтрованным массивом",
        "Если callback возвращает число, оно преобразуется в boolean (0 = false, остальное = true)",
        "Не использовать внешние библиотеки",
        "Размер массива ≤ 1000",
        "Время выполнения ≤ 5 секунд",
      ],
      example: "const isOdd = (num) => {\n    return new Promise((resolve) => setTimeout(() => resolve(num % 2), 500))\n}\n\nasyncFilter([1, 2, 3, 4, 5], isOdd).then(result => {\n    console.log(result); // [1, 3, 5]\n});",
    },
    starterCode: "async function asyncFilter(array, callback) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Нечётные числа (предикат возвращает число)",
        body: "const isOdd = (n) => new Promise((r) => setTimeout(() => r(n % 2), 5));\nreturn await solution([1, 2, 3, 4, 5], isOdd);",
        expected: [
          1,
          3,
          5,
        ],
      },
      {
        name: "Пустой массив",
        body: "return await solution([], async () => true);",
        expected: [],
      },
      {
        name: "Все элементы отфильтрованы",
        body: "return await solution([1, 2, 3], async () => false);",
        expected: [],
      },
      {
        name: "Порядок сохраняется при разных задержках",
        body: "const slowFirst = (n) => new Promise((r) => setTimeout(() => r(true), n === 1 ? 30 : 1));\nreturn await solution([1, 2, 3], slowFirst);",
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
      {
        name: "Элементы обрабатываются параллельно",
        body: "let running = 0;\nlet peak = 0;\nconst cb = async () => {\n  running++;\n  peak = Math.max(peak, running);\n  await new Promise((r) => setTimeout(r, 10));\n  running--;\n  return true;\n};\nawait solution([1, 2, 3, 4], cb);\nreturn peak;",
        expected: 4,
        hidden: true,
      },
    ],
  },
  {
    title: "Проверка чётности/нечётности через Promise (Async Even/Odd Check)",
    difficulty: 2,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "checkEvenOdd",
    description: {
      condition: "Реализуйте функцию `checkEvenOdd`, которая принимает один аргумент и возвращает `Promise`. Если переданное значение является числом, промис должен резолвиться строкой `\"even\"`, если число чётное, или строкой `\"odd\"`, если нечётное. Если переданное значение не является числом (либо является `NaN`), промис должен резолвиться значением `-1` (не reject, а именно resolve с -1).",
      input: [
        "`value` — любое значение (число, строка, объект, `NaN`, и т.д.)",
      ],
      output: "`Promise<string | number>`, резолвящийся в `\"even\"`, `\"odd\"` или `-1`",
      constraints: [
        "Числа могут быть отрицательными и дробными (дробное число также считается \"не числом\" для чётности — приводится к ошибке, т.е. -1, если не является целым)",
        "`NaN` считается невалидным входом → `-1`",
        "Без реальных задержек (`setTimeout`) — только микротаски, для детерминированности",
      ],
      example: "Вход: 4       → Выход: \"even\"\nВход: 7       → Выход: \"odd\"\nВход: \"abc\"   → Выход: -1\nВход: NaN     → Выход: -1\nВход: 3.5     → Выход: -1",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction checkEvenOdd(value) {\n  // TODO: напишите решение здесь\n  return Promise.resolve(-1);\n}\n",
    tests: [
      {
        name: "4 → even",
        args: [
          4,
        ],
        expected: "even",
      },
      {
        name: "7 → odd",
        args: [
          7,
        ],
        expected: "odd",
      },
      {
        name: "\"abc\" → -1",
        args: [
          "abc",
        ],
        expected: -1,
      },
      {
        name: "NaN → -1",
        args: [
          NaN,
        ],
        expected: -1,
        hidden: true,
      },
      {
        name: "3.5 → -1",
        args: [
          3.5,
        ],
        expected: -1,
        hidden: true,
      },
      {
        name: "Отрицательное чётное",
        args: [
          -8,
        ],
        expected: "even",
        hidden: true,
      },
      {
        name: "0 → even",
        args: [
          0,
        ],
        expected: "even",
        hidden: true,
      },
    ],
  },
  {
    title: "Мемоизация асинхронной функции с TTL (Async Memoize with TTL)",
    difficulty: 3,
    categories: [
      "Caching",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "memoize",
    description: {
      condition: "Реализуйте функцию `memoize(fn, ttl)`, которая принимает асинхронную функцию `fn` и время жизни кэша `ttl` в миллисекундах. Функция возвращает обёртку, которая при первом вызове выполняет `fn`, кэширует результат и возвращает его. При повторных вызовах в течение `ttl` миллисекунд возвращает закэшированный результат, не вызывая `fn`. После истечения `ttl` кэш инвалидируется, и следующий вызов снова выполнит `fn`.",
      input: [
        "`fn` — асинхронная функция без аргументов, возвращает `Promise`",
        "`ttl` — число, время жизни кэша в миллисекундах",
      ],
      output: "Функция-обёртка, которая возвращает `Promise` с результатом — закэшированным или свежим.",
      constraints: [
        "`ttl >= 0`",
        "`fn` всегда возвращает `Promise`",
        "Функция без аргументов (кэш единственный, без ключей)",
        "Параллельные вызовы во время выполнения `fn` не должны запускать `fn` повторно (дедупликация in-flight запросов)",
      ],
      example: "Вход: fn = async () => ++count, ttl = 3000\nawait memoize(fn, 3000)()  // fn вызвана → 1\n// (через 1000 мс)\nawait memoize(fn, 3000)()  // кэш → 1\n// (через ещё 2500 мс, итого 3500 мс)\nawait memoize(fn, 3000)()  // кэш истёк, fn вызвана → 2\nВыход: 1, 1, 2",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction memoize(fn, ttl) {\n  // TODO: напишите решение здесь\n  return async function() {\n    return fn();\n  };\n}\n",
    tests: [
      {
        name: "Второй вызов внутри TTL берётся из кэша",
        body: "let calls = 0;\nconst fn = async () => ++calls;\nconst memo = solution(fn, 200);\nconst a = await memo();\nconst b = await memo();\nreturn [a, b, calls];",
        expected: [
          1,
          1,
          1,
        ],
      },
      {
        name: "После истечения TTL функция вызывается заново",
        body: "let calls = 0;\nconst fn = async () => ++calls;\nconst memo = solution(fn, 50);\nconst a = await memo();\nawait new Promise((r) => setTimeout(r, 80));\nconst b = await memo();\nreturn [a, b, calls];",
        expected: [
          1,
          2,
          2,
        ],
      },
      {
        name: "Параллельные вызовы не дублируют запрос",
        body: "let calls = 0;\nconst fn = () => new Promise((r) => setTimeout(() => r(++calls), 30));\nconst memo = solution(fn, 200);\nconst [a, b, c] = await Promise.all([memo(), memo(), memo()]);\nreturn [a, b, c, calls];",
        expected: [
          1,
          1,
          1,
          1,
        ],
        hidden: true,
      },
      {
        name: "ttl = 0 — кэш не переживает вызов",
        body: "let calls = 0;\nconst fn = async () => ++calls;\nconst memo = solution(fn, 0);\nawait memo();\nawait new Promise((r) => setTimeout(r, 5));\nawait memo();\nreturn calls;",
        expected: 2,
        hidden: true,
      },
    ],
  },
  {
    title: "Банкомат (ATM)",
    difficulty: 2,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getMoney",
    description: {
      condition: "Напишите функцию `getMoney`, которая принимает сумму денег и возвращает объект (словарь) с количеством купюр по каждому номиналу. Банкомат должен выдать сумму, используя минимальное количество банкнот.\n\nДоступные номиналы: 50, 100, 500, 1000, 5000 рублей.",
      input: [],
      output: "",
      constraints: [
        "Сумма всегда кратна минимальному номиналу (50 рублей)",
        "Сумма может быть равна 0",
        "Сумма не превышает 100000 рублей",
      ],
      example: "Вход: 6200\nВыход: {5000: 1, 1000: 1, 500: 0, 100: 2, 50: 0}\n\nВход: 1500\nВыход: {5000: 0, 1000: 1, 500: 1, 100: 0, 50: 0}\n\nВход: 0\nВыход: {5000: 0, 1000: 0, 500: 0, 100: 0, 50: 0}\n\nВход: 50\nВыход: {5000: 0, 1000: 0, 500: 0, 100: 0, 50: 1}",
    },
    starterCode: "function getMoney(amount) {\n    // TODO: write your solution here\n    return { 5000: 0, 1000: 0, 500: 0, 100: 0, 50: 0 };\n}\n",
    tests: [
      {
        name: "6200",
        args: [
          6200,
        ],
        expected: {
          "50": 0,
          "100": 2,
          "500": 0,
          "1000": 1,
          "5000": 1,
        },
      },
      {
        name: "1500",
        args: [
          1500,
        ],
        expected: {
          "50": 0,
          "100": 0,
          "500": 1,
          "1000": 1,
          "5000": 0,
        },
      },
      {
        name: "0 — все нули",
        args: [
          0,
        ],
        expected: {
          "50": 0,
          "100": 0,
          "500": 0,
          "1000": 0,
          "5000": 0,
        },
      },
      {
        name: "50",
        args: [
          50,
        ],
        expected: {
          "50": 1,
          "100": 0,
          "500": 0,
          "1000": 0,
          "5000": 0,
        },
        hidden: true,
      },
      {
        name: "Максимальная сумма",
        args: [
          100000,
        ],
        expected: {
          "50": 0,
          "100": 0,
          "500": 0,
          "1000": 0,
          "5000": 20,
        },
        hidden: true,
      },
      {
        name: "Задействованы все номиналы",
        args: [
          6650,
        ],
        expected: {
          "50": 1,
          "100": 1,
          "500": 1,
          "1000": 1,
          "5000": 1,
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Базовый EventEmitter (Basic EventEmitter)",
    difficulty: 2,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "EventEmitter",
    description: {
      condition: "Реализуйте класс `EventEmitter` с методами для работы с событиями.\n\nКласс должен содержать следующие методы:\n\n`on(eventName, callback)` — подписка на событие. Добавляет обработчик `callback` для события `eventName`. Если на событие уже подписаны другие обработчики, новый должен добавляться в конец списка.\n\n`off(eventName, callback)` — отписка от события. Удаляет указанный обработчик `callback` для события `eventName`. Если обработчик не был подписан, метод ничего не делает.\n\n`emit(eventName)` — вызов всех обработчиков события. Принимает название события и вызывает все подписанные на него функции в порядке их добавления.\n\nПример использования:",
      input: [],
      output: "",
      constraints: [
        "Нужно использовать предоставленный шаблон класса.",
        "Обработчики должны вызываться в порядке их добавления.",
        "При `emit` в обработчики должны передаваться все аргументы, переданные в `emit` после названия события.",
      ],
      example: "const emitter = new EventEmitter();\n\nfunction handler1(data) {\n    console.log('handler1', data);\n}\nfunction handler2(data) {\n    console.log('handler2', data);\n}\n\nemitter.on('event1', handler1);\nemitter.on('event1', handler2);\n\nemitter.emit('event1', 'test'); // handler1 test, handler2 test\n\nemitter.off('event1', handler1);\nemitter.emit('event1', 'test2'); // handler2 test2",
    },
    starterCode: "class EventEmitter {\n    constructor() {\n        // TODO: initialize your event storage\n    }\n\n    on(eventName, callback) {\n        // TODO: implement\n    }\n\n    off(eventName, callback) {\n        // TODO: implement\n    }\n\n    emit(eventName, ...args) {\n        // TODO: implement\n    }\n}\n",
    tests: [
      {
        name: "Обработчики вызываются в порядке подписки",
        body: "const e = new solution();\nconst calls = [];\ne.on(\"x\", (v) => calls.push(\"first:\" + v));\ne.on(\"x\", (v) => calls.push(\"second:\" + v));\ne.emit(\"x\", 1);\nreturn calls;",
        expected: [
          "first:1",
          "second:1",
        ],
      },
      {
        name: "off снимает только указанный обработчик",
        body: "const e = new solution();\nconst calls = [];\nconst h1 = () => calls.push(\"h1\");\nconst h2 = () => calls.push(\"h2\");\ne.on(\"x\", h1);\ne.on(\"x\", h2);\ne.off(\"x\", h1);\ne.emit(\"x\");\nreturn calls;",
        expected: [
          "h2",
        ],
      },
      {
        name: "emit неизвестного события ничего не ломает",
        body: "const e = new solution();\ne.emit(\"nothing\", 1, 2);\nreturn \"ok\";",
        expected: "ok",
      },
      {
        name: "В обработчик передаются все аргументы",
        body: "const e = new solution();\nlet got = null;\ne.on(\"x\", (...args) => { got = args; });\ne.emit(\"x\", 1, \"two\", { three: 3 });\nreturn got;",
        expected: [
          1,
          "two",
          {
            three: 3,
          },
        ],
        hidden: true,
      },
      {
        name: "События независимы друг от друга",
        body: "const e = new solution();\nconst calls = [];\ne.on(\"a\", () => calls.push(\"a\"));\ne.on(\"b\", () => calls.push(\"b\"));\ne.emit(\"b\");\ne.emit(\"a\");\nreturn calls;",
        expected: [
          "b",
          "a",
        ],
        hidden: true,
      },
      {
        name: "off несуществующего обработчика — не ошибка",
        body: "const e = new solution();\nconst calls = [];\nconst h = () => calls.push(\"h\");\ne.off(\"x\", h);\ne.on(\"x\", h);\ne.emit(\"x\");\nreturn calls;",
        expected: [
          "h",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Лучший покупатель (Best Buyer)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "bestBuyer",
    description: {
      condition: "Есть список покупателей, каждый из которых предлагает свою цену за рекламное место и асинхронно отвечает — согласен он купить или нет. Опрашивать покупателей нужно параллельно.\n\nНапишите функцию, которая принимает массив покупателей и возвращает индекс покупателя с наибольшей ценой среди тех, кто ответил согласием. При этом функция должна завершиться как можно быстрее — то есть не ждать тех, кто заведомо не может улучшить результат.\n\nПокупатель с более высокой ценой имеет приоритет. Если он ещё не ответил — нужно дождаться его ответа, прежде чем вернуть результат с меньшей ценой. Если все покупатели с более высокой ценой ответили отказом — возвращаем лучшего из оставшихся согласившихся.",
      input: [
        "`buyers` — массив объектов:",
        "{ price: number, response: () => Promise<boolean> }",
        "Покупатели не отсортированы. `response()` возвращает промис, который резолвится в `true` (согласен) или `false` (отказ).",
      ],
      output: "`Promise<number>` — индекс лучшего покупателя, или `-1` если никто не согласился.",
      constraints: [
        "`1 <= buyers.length <= 100`",
        "Каждый покупатель отвечает ровно один раз",
        "Цены уникальны",
      ],
      example: "Вход:\n\nbuyers = [\n  { price: 1,  response: () => asyncResponse(true,  500) },\n  { price: 10, response: () => asyncResponse(false, 200) },\n  { price: 5,  response: () => asyncResponse(true,  100) }\n]\n\nВыход: `2` (покупатель с ценой 5, индекс 2 — покупатель с ценой 10 ответил отказом, покупатель с ценой 1 ещё не ответил, но его цена ниже)\n\nВремя выполнения: ~200мс (не 300мс и не 600мс)",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction bestBuyer(buyers) {\n  // TODO: напишите решение здесь\n  return Promise.resolve(-1);\n}\n",
    tests: [
      {
        name: "Пример из условия",
        body: "const after = (value, ms) => new Promise((r) => setTimeout(() => r(value), ms));\nreturn await solution([\n  { price: 1, response: () => after(true, 100) },\n  { price: 10, response: () => after(false, 40) },\n  { price: 5, response: () => after(true, 20) },\n]);",
        expected: 2,
      },
      {
        name: "Никто не согласился",
        body: "const after = (value, ms) => new Promise((r) => setTimeout(() => r(value), ms));\nreturn await solution([\n  { price: 3, response: () => after(false, 10) },\n  { price: 7, response: () => after(false, 20) },\n]);",
        expected: -1,
      },
      {
        name: "Самая высокая цена побеждает, даже если отвечает последней",
        body: "const after = (value, ms) => new Promise((r) => setTimeout(() => r(value), ms));\nreturn await solution([\n  { price: 2, response: () => after(true, 5) },\n  { price: 9, response: () => after(true, 60) },\n]);",
        expected: 1,
      },
      {
        name: "Не ждёт заведомо проигрышного покупателя",
        body: "let slowSettled = false;\nconst after = (value, ms) => new Promise((r) => setTimeout(() => r(value), ms));\nconst buyers = [\n  { price: 1, response: () => new Promise((r) => setTimeout(() => { slowSettled = true; r(true); }, 300)) },\n  { price: 10, response: () => after(false, 20) },\n  { price: 5, response: () => after(true, 10) },\n];\nconst index = await solution(buyers);\nreturn [index, slowSettled];",
        expected: [
          2,
          false,
        ],
        hidden: true,
      },
      {
        name: "Единственный покупатель",
        body: "return await solution([{ price: 4, response: async () => true }]);",
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Объединение книг и рецензий (Books and Reviews Merge)",
    difficulty: 2,
    categories: [
      "Dictionaries",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "mergeBooksAndReviews",
    description: {
      condition: "Даны два массива:\n\n`books` — список книг;\n\n`reviews` — список рецензий.\n\nУ каждой книги есть уникальный `id`.\nУ каждой рецензии есть поле `bookId`, которое указывает, к какой книге относится рецензия.\n\nНужно вернуть новый массив книг, где к каждой книге добавлено поле `reviews`.\nВ это поле нужно положить все рецензии, относящиеся к этой книге.\n\nЕсли у книги нет рецензий, поле `reviews` должно быть пустым массивом.\n\nЗадача взята из обсуждения на интервью: нужно было объединить массив книг и массив рецензий по `bookId`.",
      input: [
        "`books` — массив объектов:",
        "[\n  { id: 1, title: \"War and Peace\" }\n]",
        "`reviews` — массив объектов:",
        "[\n  { id: 101, bookId: 1, text: \"Great book\" }\n]",
      ],
      output: "Новый массив книг:\n[\n  {\n    id: 1,\n    title: \"War and Peace\",\n    reviews: [\n      { id: 101, bookId: 1, text: \"Great book\" }\n    ]\n  }\n]",
      constraints: [
        "`0 <= books.length <= 10^4`",
        "`0 <= reviews.length <= 10^4`",
        "`id` книги уникален",
        "`bookId` в рецензии может ссылаться на существующую книгу",
        "порядок книг в результате должен совпадать с исходным массивом `books`",
        "порядок рецензий внутри каждой книги должен совпадать с исходным массивом `reviews`",
      ],
      example: "Вход:\n\nbooks = [\n  { id: 1, title: \"War and Peace\" },\n  { id: 2, title: \"1984\" }\n]\n\nreviews = [\n  { id: 101, bookId: 1, text: \"Excellent\" },\n  { id: 102, bookId: 1, text: \"Long but good\" }\n]\n\nВыход:\n\n[\n  {\n    id: 1,\n    title: \"War and Peace\",\n    reviews: [\n      { id: 101, bookId: 1, text: \"Excellent\" },\n      { id: 102, bookId: 1, text: \"Long but good\" }\n    ]\n  },\n  {\n    id: 2,\n    title: \"1984\",\n    reviews: []\n  }\n]",
    },
    starterCode: "function mergeBooksAndReviews(books, reviews) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Одна книга с одной рецензией",
        args: [
          [
            {
              id: 1,
              title: "War and Peace",
            },
          ],
          [
            {
              id: 101,
              bookId: 1,
              text: "Great book",
            },
          ],
        ],
        expected: [
          {
            id: 1,
            title: "War and Peace",
            reviews: [
              {
                id: 101,
                bookId: 1,
                text: "Great book",
              },
            ],
          },
        ],
      },
      {
        name: "Книга без рецензий получает пустой массив",
        args: [
          [
            {
              id: 1,
              title: "War and Peace",
            },
            {
              id: 2,
              title: "1984",
            },
          ],
          [
            {
              id: 101,
              bookId: 1,
              text: "Excellent",
            },
            {
              id: 102,
              bookId: 1,
              text: "Long but good",
            },
          ],
        ],
        expected: [
          {
            id: 1,
            title: "War and Peace",
            reviews: [
              {
                id: 101,
                bookId: 1,
                text: "Excellent",
              },
              {
                id: 102,
                bookId: 1,
                text: "Long but good",
              },
            ],
          },
          {
            id: 2,
            title: "1984",
            reviews: [],
          },
        ],
      },
      {
        name: "Пустые входные массивы",
        args: [
          [],
          [],
        ],
        expected: [],
      },
      {
        name: "Рецензия на несуществующую книгу игнорируется",
        args: [
          [
            {
              id: 1,
              title: "A",
            },
          ],
          [
            {
              id: 1,
              bookId: 99,
              text: "orphan",
            },
            {
              id: 2,
              bookId: 1,
              text: "ok",
            },
          ],
        ],
        expected: [
          {
            id: 1,
            title: "A",
            reviews: [
              {
                id: 2,
                bookId: 1,
                text: "ok",
              },
            ],
          },
        ],
        hidden: true,
      },
      {
        name: "Порядок книг и рецензий не меняется",
        args: [
          [
            {
              id: 2,
              title: "B",
            },
            {
              id: 1,
              title: "A",
            },
          ],
          [
            {
              id: 11,
              bookId: 1,
              text: "first",
            },
            {
              id: 12,
              bookId: 2,
              text: "second",
            },
            {
              id: 13,
              bookId: 1,
              text: "third",
            },
          ],
        ],
        expected: [
          {
            id: 2,
            title: "B",
            reviews: [
              {
                id: 12,
                bookId: 2,
                text: "second",
              },
            ],
          },
          {
            id: 1,
            title: "A",
            reviews: [
              {
                id: 11,
                bookId: 1,
                text: "first",
              },
              {
                id: 13,
                bookId: 1,
                text: "third",
              },
            ],
          },
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "День максимальной загрузки отеля (Busiest Hotel Day)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findBusiestDay",
    description: {
      condition: "Напишите функцию `findBusiestDay`, которая принимает массив бронирований `bookings`, где каждый элемент — это подмассив `[checkIn, checkOut]`, и возвращает день (число), когда в отеле было максимальное количество клиентов.\n\n`checkIn` — день заезда клиента\n\n`checkOut` — день выезда клиента (клиент ещё находится в отеле в этот день?)\n\nЕсли несколько дней имеют одинаковую максимальную загрузку, вернуть наименьший день\n\nВажно: Клиент занимает номер включительно с `checkIn` по `checkOut`",
      input: [],
      output: "",
      constraints: [
        "`checkIn` всегда меньше `checkOut`",
        "Дни — положительные целые числа",
        "Количество бронирований не превышает 1000",
        "Диапазон дней может быть любым (не обязательно с 1)",
      ],
      example: "Вход: [[1, 5], [2, 4], [3, 6]]\nВыход: 3\nПояснение: В день 3 в отеле 3 клиента (1-й, 2-й и 3-й)\n\nВход: [[1, 3], [2, 4], [3, 5]]\nВыход: 3\nПояснение: В день 3 в отеле 3 клиента\n\nВход: [[1, 2], [2, 3], [3, 4]]\nВыход: 2\nПояснение: В день 2 в отеле 2 клиента (1-й и 2-й)\n\nВход: [[1, 10]]\nВыход: 1\nПояснение: Только один клиент, максимальная загрузка в любой день с 1 по 9, возвращаем наименьший",
    },
    starterCode: "function findBusiestDay(bookings) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "[[1,5],[2,4],[3,6]] → 3",
        args: [
          [
            [
              1,
              5,
            ],
            [
              2,
              4,
            ],
            [
              3,
              6,
            ],
          ],
        ],
        expected: 3,
      },
      {
        name: "[[1,3],[2,4],[3,5]] → 3",
        args: [
          [
            [
              1,
              3,
            ],
            [
              2,
              4,
            ],
            [
              3,
              5,
            ],
          ],
        ],
        expected: 3,
      },
      {
        name: "[[1,2],[2,3],[3,4]] → 2 (наименьший из равных)",
        args: [
          [
            [
              1,
              2,
            ],
            [
              2,
              3,
            ],
            [
              3,
              4,
            ],
          ],
        ],
        expected: 2,
      },
      {
        name: "Одно бронирование",
        args: [
          [
            [
              1,
              10,
            ],
          ],
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Непересекающиеся брони — первый день",
        args: [
          [
            [
              10,
              12,
            ],
            [
              50,
              52,
            ],
          ],
        ],
        expected: 10,
        hidden: true,
      },
      {
        name: "Пик не совпадает с первым днём заезда",
        args: [
          [
            [
              1,
              2,
            ],
            [
              5,
              9,
            ],
            [
              6,
              9,
            ],
            [
              7,
              9,
            ],
          ],
        ],
        expected: 7,
        hidden: true,
      },
    ],
  },
  {
    title: "Рецепт пирожных (Cakes Recipe)",
    difficulty: 2,
    categories: [
      "Objects",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "cakes",
    description: {
      condition: "Напишите функцию `cakes`, которая принимает рецепт (объект) и доступные ингредиенты (объект) и возвращает максимальное количество пирожных, которое можно испечь (целое число). Для простоты не существует единиц измерения количества. Ингредиенты, которых нет в доступных, можно рассматривать как 0.\n\nПравила:\n\nРецепт содержит необходимые ингредиенты и их количество на одно пирожное\n\nДоступные ингредиенты содержат имеющееся количество\n\nВозвращается максимальное целое количество пирожных\n\nЕсли какого-то ингредиента из рецепта нет в доступных, возвращается 0",
      input: [],
      output: "",
      constraints: [
        "Количество ингредиентов: 1 ≤ N ≤ 100",
        "Значения: целые положительные числа",
        "Время выполнения: O(N)",
        "Память: O(1)",
      ],
      example: "cakes(\n    { flour: 500, sugar: 200, eggs: 1 },\n    { flour: 1200, sugar: 1200, eggs: 5, milk: 200 }\n) // -> 2\n\ncakes(\n    { apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 },\n    { apples: 500, flour: 2000, milk: 2000 }\n) // -> 0",
    },
    starterCode: "function cakes(recipe, ingredients) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "Хватает на два пирожных",
        args: [
          {
            flour: 500,
            sugar: 200,
            eggs: 1,
          },
          {
            flour: 1200,
            sugar: 1200,
            eggs: 5,
            milk: 200,
          },
        ],
        expected: 2,
      },
      {
        name: "Не хватает ингредиента — 0",
        args: [
          {
            apples: 3,
            flour: 300,
            sugar: 150,
            milk: 100,
            oil: 100,
          },
          {
            apples: 500,
            flour: 2000,
            milk: 2000,
          },
        ],
        expected: 0,
      },
      {
        name: "Ровно на одно пирожное",
        args: [
          {
            flour: 100,
          },
          {
            flour: 100,
          },
        ],
        expected: 1,
      },
      {
        name: "Ингредиента нет вовсе",
        args: [
          {
            flour: 10,
            salt: 1,
          },
          {
            flour: 1000,
          },
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Лимитирует самый дефицитный ингредиент",
        args: [
          {
            flour: 10,
            sugar: 10,
          },
          {
            flour: 1000,
            sugar: 35,
          },
        ],
        expected: 3,
        hidden: true,
      },
    ],
  },
  {
    title: "Заглавные буквы слов в строке (Capitalize First Letter of Each Word)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "capitalizeWords",
    description: {
      condition: "Напишите функцию, которая принимает строку из одного или нескольких слов, разделённых пробелами, и возвращает строку, в которой первая буква каждого слова сделана заглавной, а остальные буквы слова остаются без изменений.",
      input: [
        "`s` — строка, содержащая слова, разделённые одним пробелом (может быть пустой)",
      ],
      output: "Строка, где первая буква каждого слова — заглавная, остальные символы слова не изменяются",
      constraints: [
        "`0 <= длина s <= 10^4`",
        "Строка состоит из строчных и заглавных латинских букв и пробелов",
        "Слова разделены ровно одним пробелом, без начальных/конечных пробелов",
      ],
      example: "Вход: \"hello world\"\nВыход: \"Hello World\"\n\nВход: \"already Capitalized\"\nВыход: \"Already Capitalized\"\n\nВход: \"\"\nВыход: \"\"\n\nВход: \"a\"\nВыход: \"A\"",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction capitalizeWords(s) {\n  // TODO: напишите решение здесь\n  return \"\";\n}\n",
    tests: [
      {
        name: "\"hello world\"",
        args: [
          "hello world",
        ],
        expected: "Hello World",
      },
      {
        name: "Остальные буквы не трогаем",
        args: [
          "hELLo wORld",
        ],
        expected: "HELLo WORld",
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: "",
      },
      {
        name: "Одна буква",
        args: [
          "a",
        ],
        expected: "A",
      },
      {
        name: "Уже с заглавных",
        args: [
          "already Capitalized",
        ],
        expected: "Already Capitalized",
        hidden: true,
      },
      {
        name: "Одно слово",
        args: [
          "javascript",
        ],
        expected: "Javascript",
        hidden: true,
      },
    ],
  },
  {
    title: "Сжатие строки с игнорированием регистра (Case-Insensitive Compression)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getCompressedString",
    description: {
      condition: "Напишите функцию `getCompressedString`, которая принимает строку и возвращает сжатую версию в формате `букваЦифра`, где:\n\nБуквы приводятся к нижнему регистру\n\nПодсчитывается количество последовательных вхождений каждой буквы (без учёта регистра)\n\nВсегда добавляется количество повторений (даже если буква встретилась 1 раз)\n\nВажно: Сжатие учитывает только последовательные повторения. Если одна и та же буква встречается снова после других букв, она считается отдельной группой.",
      input: [],
      output: "",
      constraints: [
        "Строка содержит только латинские буквы (a-z, A-Z)",
        "Длина строки: 0 ≤ N ≤ 1000",
        "Регистр букв игнорируется",
        "Время выполнения: O(N)",
        "Память: O(N)",
      ],
      example: "getCompressedString('aaAaBbBbDFFFff')\n// -> 'a4b4d1f5'\n// Пояснение:\n// a a A a → 4 раза 'a'\n// B b B b → 4 раза 'b'\n// D → 1 раз 'd'\n// F F F f f → 5 раз 'f'\n\ngetCompressedString('abc')        // -> 'a1b1c1'\ngetCompressedString('AAbb')       // -> 'a2b2'\ngetCompressedString('aAa')        // -> 'a3'\ngetCompressedString('')           // -> ''",
    },
    starterCode: "function getCompressedString(str) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "'aaAaBbBbDFFFff'",
        args: [
          "aaAaBbBbDFFFff",
        ],
        expected: "a4b4d1f5",
      },
      {
        name: "'abc'",
        args: [
          "abc",
        ],
        expected: "a1b1c1",
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: "",
      },
      {
        name: "'AAbb'",
        args: [
          "AAbb",
        ],
        expected: "a2b2",
        hidden: true,
      },
      {
        name: "Повтор буквы после других — отдельная группа",
        args: [
          "aabaa",
        ],
        expected: "a2b1a2",
        hidden: true,
      },
    ],
  },
  {
    title: "Подсчёт вхождений символов (Character Count)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "foo",
    description: {
      condition: "Напишите функцию `foo`, которая принимает строку и возвращает список массивов, где каждый массив содержит символ и количество его вхождений в строке. Порядок должен соответствовать порядку первого появления символа в строке. Если строка пустая, вернуть пустой список.\n\nПравила:\n\nПодсчитывается каждый символ (буквы, цифры, пробелы, знаки пунктуации)\n\nРегистр учитывается (заглавные и строчные буквы считаются разными символами)\n\nПорядок определяется по первому вхождению символа\n\nВозвращается массив пар [символ, количество]",
      input: [],
      output: "",
      constraints: [
        "Длина строки: 0 ≤ N ≤ 1000",
        "Символы: любые",
        "Время выполнения: O(N)",
        "Память: O(K), где K — количество уникальных символов",
      ],
      example: "foo('abracadabra')  // -> [['a', 5], ['b', 2], ['r', 2], ['c', 1], ['d', 1]]\nfoo('hello')        // -> [['h', 1], ['e', 1], ['l', 2], ['o', 1]]\nfoo('aabbcc')       // -> [['a', 2], ['b', 2], ['c', 2]]\nfoo('')             // -> []",
    },
    starterCode: "function foo(text) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "'abracadabra'",
        args: [
          "abracadabra",
        ],
        expected: [
          [
            "a",
            5,
          ],
          [
            "b",
            2,
          ],
          [
            "r",
            2,
          ],
          [
            "c",
            1,
          ],
          [
            "d",
            1,
          ],
        ],
      },
      {
        name: "'hello'",
        args: [
          "hello",
        ],
        expected: [
          [
            "h",
            1,
          ],
          [
            "e",
            1,
          ],
          [
            "l",
            2,
          ],
          [
            "o",
            1,
          ],
        ],
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: [],
      },
      {
        name: "Регистр различается",
        args: [
          "aAa",
        ],
        expected: [
          [
            "a",
            2,
          ],
          [
            "A",
            1,
          ],
        ],
        hidden: true,
      },
      {
        name: "Пробелы и знаки тоже считаются",
        args: [
          "a b!",
        ],
        expected: [
          [
            "a",
            1,
          ],
          [
            " ",
            1,
          ],
          [
            "b",
            1,
          ],
          [
            "!",
            1,
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Списывание (Cheating Groups)",
    difficulty: 3,
    categories: [
      "Graphs",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "isBipartite",
    description: {
      condition: "Во время контрольной работы профессор заметил обмен записками между некоторыми студентами. Он хочет разделить всех студентов на две группы так, чтобы любой обмен записками происходил только между студентами из разных групп (то есть внутри одной группы обменов быть не должно).\n\nДано количество студентов и список пар студентов, обменивавшихся записками. Необходимо определить, возможно ли такое разделение.",
      input: [
        "`n` — количество студентов (1 ≤ n ≤ 100), пронумерованы от 1 до n",
        "`pairs` — массив пар чисел `[a, b]`, каждая пара — обмен записками между студентами a и b (каждая пара встречается не более одного раза, без пар вида `[a, a]`)",
      ],
      output: "Булево значение: `true`, если разделение на две группы возможно, `false` — если нет.",
      constraints: [
        "1 ≤ n ≤ 100",
        "0 ≤ количество пар ≤ n(n-1)/2",
      ],
      example: "Вход: n=4, pairs=[[1,2],[2,3],[3,4]]\nВыход: true\n\nВход: n=3, pairs=[[1,2],[2,3],[1,3]]\nВыход: false",
    },
    starterCode: "function isBipartite(n, pairs) {\n  // TODO: напишите решение здесь\n  return false;\n}\n",
    tests: [
      {
        name: "Цепочка из 4 студентов",
        args: [
          4,
          [
            [
              1,
              2,
            ],
            [
              2,
              3,
            ],
            [
              3,
              4,
            ],
          ],
        ],
        expected: true,
      },
      {
        name: "Треугольник — разделить нельзя",
        args: [
          3,
          [
            [
              1,
              2,
            ],
            [
              2,
              3,
            ],
            [
              1,
              3,
            ],
          ],
        ],
        expected: false,
      },
      {
        name: "Нет обменов вовсе",
        args: [
          5,
          [],
        ],
        expected: true,
      },
      {
        name: "Цикл чётной длины",
        args: [
          4,
          [
            [
              1,
              2,
            ],
            [
              2,
              3,
            ],
            [
              3,
              4,
            ],
            [
              4,
              1,
            ],
          ],
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Нечётный цикл в одной из компонент",
        args: [
          6,
          [
            [
              1,
              2,
            ],
            [
              3,
              4,
            ],
            [
              4,
              5,
            ],
            [
              5,
              3,
            ],
          ],
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Один студент",
        args: [
          1,
          [],
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Проверка квадратных скобок (Check Square Brackets)",
    difficulty: 2,
    categories: [
      "Stack",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "check",
    description: {
      condition: "Дана строка `case`, состоящая только из символов `[` и `]`.\n\nНужно проверить, правильно ли расположены квадратные скобки.\n\nСтрока считается корректной, если:\n\nкаждой открывающей скобке `[` соответствует закрывающая `]`;\n\nзакрывающая скобка `]` не появляется раньше соответствующей открывающей `[`;\n\nвсе открытые скобки закрыты.",
      input: [
        "case",
      ],
      output: "true / false",
      constraints: [
        "0 <= case.length <= 100000",
        "case состоит только из символов \"[\" и \"]\"",
      ],
      example: "Вход: [][[][]]\nВыход: true",
    },
    starterCode: "function check(caseStr) {\n  // TODO: напишите решение здесь\n  return false;\n}\n",
    tests: [
      {
        name: "\"[][[][]]\"",
        args: [
          "[][[][]]",
        ],
        expected: true,
      },
      {
        name: "\"][\"  — закрывающая раньше открывающей",
        args: [
          "][",
        ],
        expected: false,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: true,
      },
      {
        name: "Незакрытая скобка",
        args: [
          "[[]",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Лишняя закрывающая",
        args: [
          "[]]",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Глубокая вложенность",
        args: [
          "[[[[]]]]",
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Формирование строки классов (Class Names Builder)",
    difficulty: 3,
    categories: [
      "Recursion",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "classNames",
    description: {
      condition: "Реализуйте функцию `classNames`, которая принимает любое количество аргументов без ограничения по типу и преобразует их в строку с именами классов, разделёнными пробелами.\n\nПравила:\n\n`string` — используется как есть\n\n`number` (кроме 0) — преобразуется в строку\n\nмассивы — должны быть развернуты (рекурсивно)\n\nиз объектов добавляются ключи, значения которых можно привести к `true`\n\nвсё остальное игнорируется",
      input: [],
      output: "",
      constraints: [
        "Количество аргументов: 0 ≤ N ≤ 100",
        "Глубина вложенности массивов: 0 ≤ depth ≤ 10",
        "Время выполнения: O(N), где N — общее количество обработанных элементов",
        "Память: O(N)",
      ],
      example: "classNames('a', null, false, 0, { b: undefined }, '') // -> 'a'\n\nclassNames(['a', true, 'b', () => 25], ['c', 'd'], 'e') // -> 'a b c d e'",
    },
    starterCode: "function classNames(...args) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Мусорные значения отбрасываются",
        body: "return solution(\"a\", null, false, 0, { b: undefined }, \"\");",
        expected: "a",
      },
      {
        name: "Массивы разворачиваются",
        body: "return solution([\"a\", true, \"b\", () => 25], [\"c\", \"d\"], \"e\");",
        expected: "a b c d e",
      },
      {
        name: "Из объекта берутся truthy-ключи",
        args: [
          {
            active: true,
            disabled: false,
            size: 1,
          },
        ],
        expected: "active size",
      },
      {
        name: "Числа, кроме 0",
        args: [
          1,
          0,
          -2,
        ],
        expected: "1 -2",
        hidden: true,
      },
      {
        name: "Глубокая вложенность массивов",
        args: [
          [
            "a",
            [
              "b",
              [
                "c",
              ],
            ],
          ],
        ],
        expected: "a b c",
        hidden: true,
      },
      {
        name: "Без аргументов — пустая строка",
        args: [],
        expected: "",
        hidden: true,
      },
    ],
  },
  {
    title: "Счётчик с замыканием (Closure Counter)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "createCounter",
    description: {
      condition: "Напишите функцию `createCounter` (или `count`), которая возвращает внутреннюю функцию-счётчик. При каждом вызове внутренней функции счётчик увеличивается на 1 и возвращает текущее значение. Изначальное значение счётчика — 0.\n\nВажно: Каждый вызов внешней функции должен создавать независимый счётчик со своим собственным состоянием.\n\nПримеры использования",
      input: [],
      output: "",
      constraints: [
        "Не использовать глобальные переменные",
        "Не использовать объекты с методами (только функция)",
        "Состояние должно быть инкапсулировано в замыкании",
        "Счётчик начинается с 0, первый вызов возвращает 1",
      ],
      example: "// Создаём первый счётчик\nconst counter1 = createCounter();\nconsole.log(counter1()); // 1\nconsole.log(counter1()); // 2\nconsole.log(counter1()); // 3\n\n// Создаём второй независимый счётчик\nconst counter2 = createCounter();\nconsole.log(counter2()); // 1 (новый счётчик начинается с 0 → 1)\nconsole.log(counter1()); // 4 (первый счётчик продолжает счёт)\n\n// Третий независимый счётчик\nconst counter3 = createCounter();\nconsole.log(counter3()); // 1\nconsole.log(counter3()); // 2",
    },
    starterCode: "function createCounter() {\n    // TODO: write your solution here\n    return function() {\n        return 0;\n    };\n}\n",
    tests: [
      {
        name: "Счётчик растёт с каждого вызова",
        body: "const c = solution();\nreturn [c(), c(), c()];",
        expected: [
          1,
          2,
          3,
        ],
      },
      {
        name: "Счётчики независимы",
        body: "const a = solution();\nconst b = solution();\na(); a();\nreturn [b(), a()];",
        expected: [
          1,
          3,
        ],
      },
      {
        name: "Первый вызов возвращает 1",
        body: "return solution()();",
        expected: 1,
        hidden: true,
      },
      {
        name: "Третий счётчик начинается заново",
        body: "const a = solution();\nfor (let i = 0; i < 5; i++) a();\nconst c = solution();\nreturn [c(), c(), a()];",
        expected: [
          1,
          2,
          6,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Схлопывание пробелов в строке (Collapse Consecutive Spaces)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "collapseSpaces",
    description: {
      condition: "Дана строка. Необходимо преобразовать её так, чтобы каждая последовательность из нескольких подряд идущих пробелов была заменена на один пробел. Остальные символы (включая одиночные пробелы) остаются без изменений. Ведущие и завершающие пробелы не удаляются — обрабатываются по тому же правилу (несколько подряд → один).",
      input: [
        "`s` — строка, может содержать буквы, цифры, знаки препинания и пробелы; длина от 0 до 10^5",
      ],
      output: "Строка с схлопнутыми последовательными пробелами",
      constraints: [
        "`0 <= s.length <= 10^5`",
        "Обрабатывается только символ пробела (' '), табуляция и другие пробельные символы не учитываются",
      ],
      example: "Вход: \"hello   world\"\nВыход: \"hello world\"\n\nВход: \"a  b    c\"\nВыход: \"a b c\"\n\nВход: \"no extra spaces\"\nВыход: \"no extra spaces\"\n\nВход: \"   leading and trailing   \"\nВыход: \" leading and trailing \"\n\nВход: \"\"\nВыход: \"\"",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction collapseSpaces(s) {\n  // TODO: напишите решение здесь\n  return \"\";\n}\n",
    tests: [
      {
        name: "\"hello   world\"",
        args: [
          "hello   world",
        ],
        expected: "hello world",
      },
      {
        name: "\"a  b    c\"",
        args: [
          "a  b    c",
        ],
        expected: "a b c",
      },
      {
        name: "Без лишних пробелов",
        args: [
          "no extra spaces",
        ],
        expected: "no extra spaces",
      },
      {
        name: "Ведущие и завершающие пробелы схлопываются, но остаются",
        args: [
          "   leading and trailing   ",
        ],
        expected: " leading and trailing ",
        hidden: true,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: "",
        hidden: true,
      },
      {
        name: "Строка из одних пробелов",
        args: [
          "     ",
        ],
        expected: " ",
        hidden: true,
      },
    ],
  },
  {
    title: "Комбинации с суммой (Combinations with the sum)",
    difficulty: 2,
    categories: [
      "Dynamic programming",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "combinationSum2",
    description: {
      condition: "Дан массив целых чисел `candidates` и целое число `target`.\nНеобходимо найти все уникальные комбинации элементов массива, сумма которых равна `target`.\n\nКаждое число из массива можно использовать не более одного раза в каждой комбинации.\n\nРешение не должно содержать дублирующихся комбинаций.",
      input: [
        "Массив целых чисел `candidates`",
        "Целое число `target`",
      ],
      output: "Массив массивов, где каждый вложенный массив — уникальная комбинация чисел, дающая сумму `target`",
      constraints: [
        "Числа внутри каждой комбинации идут по возрастанию",
        "Сами комбинации идут в лексикографическом порядке",
        "`1 <= candidates.length <= 100`",
      ],
      example: "Вход:\n`candidates = [10,1,2,7,6,1,5], target = 8`\n\nВыход:\n`[[1,1,6],[1,2,5],[1,7],[2,6]]`",
    },
    starterCode: "function combinationSum2(candidates, target) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Пример из условия",
        args: [
          [
            10,
            1,
            2,
            7,
            6,
            1,
            5,
          ],
          8,
        ],
        expected: [
          [
            1,
            1,
            6,
          ],
          [
            1,
            2,
            5,
          ],
          [
            1,
            7,
          ],
          [
            2,
            6,
          ],
        ],
      },
      {
        name: "Комбинаций нет",
        args: [
          [
            2,
            4,
          ],
          7,
        ],
        expected: [],
      },
      {
        name: "Один элемент равен target",
        args: [
          [
            5,
          ],
          5,
        ],
        expected: [
          [
            5,
          ],
        ],
      },
      {
        name: "Дубликаты не порождают одинаковых комбинаций",
        args: [
          [
            2,
            5,
            2,
            1,
            2,
          ],
          5,
        ],
        expected: [
          [
            1,
            2,
            2,
          ],
          [
            5,
          ],
        ],
        hidden: true,
      },
      {
        name: "Каждое число используется не более одного раза",
        args: [
          [
            1,
            1,
            1,
          ],
          3,
        ],
        expected: [
          [
            1,
            1,
            1,
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Общее количество чисел на префиксах (Common Numbers in Prefixes)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "commonNumbersInPrefixes",
    description: {
      condition: "Даны два массива целых чисел `a` и `b` длины `N`. Для каждого `K` от 1 до N нужно посчитать количество общих чисел в префиксах длины K массивов `a` и `b`.\n\nОбщие числа считаются без учёта кратности.\n\nМассивы содержат числа в диапазоне `1 ≤ a[i], b[i] ≤ 10^9`.",
      input: [],
      output: "",
      constraints: [],
      example: "a = [1, 2, 5, 2, 7, 9]\nb = [2, 5, 8, 1, 9, 3]\n\nres = [0, 1, 2, 3, 3, 4]\n\nПояснение:\n\nПрефиксы длины 1: `[1]` и `[2]` → пересечение {} → 0\n\nПрефиксы длины 2: `[1,2]` и `[2,5]` → пересечение {2} → 1\n\nПрефиксы длины 3: `[1,2,5]` и `[2,5,8]` → {2,5} → 2\n\nПрефиксы длины 4: `[1,2,5,2]` и `[2,5,8,1]` → {1,2,5} → 3\n\nПрефиксы длины 5: `[1,2,5,2,7]` и `[2,5,8,1,9]` → {1,2,5} → 3\n\nПрефиксы длины 6: `[1,2,5,2,7,9]` и `[2,5,8,1,9,3]` → {1,2,5,9} → 4",
    },
    starterCode: "function commonNumbersInPrefixes(a, b) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Пример из условия",
        args: [
          [
            1,
            2,
            5,
            2,
            7,
            9,
          ],
          [
            2,
            5,
            8,
            1,
            9,
            3,
          ],
        ],
        expected: [
          0,
          1,
          2,
          3,
          3,
          4,
        ],
      },
      {
        name: "Полностью совпадающие массивы",
        args: [
          [
            1,
            2,
          ],
          [
            1,
            2,
          ],
        ],
        expected: [
          1,
          2,
        ],
      },
      {
        name: "Пересечений нет",
        args: [
          [
            1,
            2,
            3,
          ],
          [
            4,
            5,
            6,
          ],
        ],
        expected: [
          0,
          0,
          0,
        ],
      },
      {
        name: "Кратность не учитывается",
        args: [
          [
            7,
            7,
            7,
          ],
          [
            7,
            7,
            7,
          ],
        ],
        expected: [
          1,
          1,
          1,
        ],
        hidden: true,
      },
      {
        name: "Общий элемент появляется в разных позициях",
        args: [
          [
            4,
            1,
          ],
          [
            1,
            4,
          ],
        ],
        expected: [
          0,
          2,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Сравнение версий (Compare Versions)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "compareVersions",
    description: {
      condition: "Напишите функцию `compareVersions`, которая сравнивает два номера версий программы. Номер версии — это строка, содержащая цифры и точки. Номера версий состоят только из цифр и точек и всегда валидны.\n\nПравила:\n\nФункция возвращает `1`, если первая версия больше второй\n\nФункция возвращает `-1`, если вторая версия больше первой\n\nФункция возвращает `0`, если версии равны\n\nЧасти версии сравниваются по очереди слева направо\n\nОтсутствующие части считаются равными 0",
      input: [],
      output: "",
      constraints: [
        "Длина строк: 1 ≤ length ≤ 100",
        "Количество частей: 1 ≤ parts ≤ 10",
        "Значения частей: 0 ≤ value ≤ 10^6",
        "Время выполнения: O(N), где N — максимальное количество частей",
        "Память: O(N)",
      ],
      example: "compareVersions('1.0', '1.0')      // -> 0\ncompareVersions('1.0', '1.0.0')    // -> 0\ncompareVersions('1.0.1', '1.0.0')  // -> 1\ncompareVersions('2.0', '2.1')      // -> -1",
    },
    starterCode: "function compareVersions(ver1, ver2) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "'1.0' и '1.0'",
        args: [
          "1.0",
          "1.0",
        ],
        expected: 0,
      },
      {
        name: "Разная длина, но равные версии",
        args: [
          "1.0",
          "1.0.0",
        ],
        expected: 0,
      },
      {
        name: "'1.0.1' больше '1.0.0'",
        args: [
          "1.0.1",
          "1.0.0",
        ],
        expected: 1,
      },
      {
        name: "'2.0' меньше '2.1'",
        args: [
          "2.0",
          "2.1",
        ],
        expected: -1,
      },
      {
        name: "Числа сравниваются как числа, а не как строки",
        args: [
          "1.10",
          "1.9",
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Недостающие части считаются нулями",
        args: [
          "1.0.0.1",
          "1",
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Ведущие нули",
        args: [
          "1.01",
          "1.1",
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Сжатие групп точек по значению (Compress Consecutive Value Groups)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "compressConsecutiveValueGroups",
    description: {
      condition: "Дан массив точек, каждая из которых имеет поля `time` (время) и `value` (значение). Массив отсортирован по `time`. Необходимо найти группы подряд идущих точек с одинаковым `value` и оставить в результате только первую и последнюю точку каждой такой группы (это нужно для оптимизации построения линейного графика — промежуточные точки внутри \"плато\" избыточны). Если группа состоит из одной точки — она остаётся в результате один раз (первая и последняя точка совпадают).",
      input: [
        "`points` — массив объектов вида `{ time: number, value: number }`, отсортированный по возрастанию `time`",
      ],
      output: "Массив объектов той же формы `{ time, value }`, содержащий только первую и последнюю точку каждой группы подряд идущих точек с одинаковым `value`, в исходном порядке",
      constraints: [
        "`0 <= points.length <= 10^4`",
        "`time` — уникальные, возрастающие целые числа",
        "`value` — произвольное целое число",
      ],
      example: "Вход: [{time:1,value:5}, {time:2,value:5}, {time:3,value:5}, {time:4,value:8}, {time:5,value:8}, {time:6,value:2}]\nВыход: [{time:1,value:5}, {time:3,value:5}, {time:4,value:8}, {time:5,value:8}, {time:6,value:2}]\n\nВход: [{time:1,value:5}]\nВыход: [{time:1,value:5}]\n\nВход: []\nВыход: []",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction compressConsecutiveValueGroups(points) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Плато сжимается до первой и последней точки",
        args: [
          [
            {
              time: 1,
              value: 5,
            },
            {
              time: 2,
              value: 5,
            },
            {
              time: 3,
              value: 5,
            },
            {
              time: 4,
              value: 8,
            },
            {
              time: 5,
              value: 8,
            },
            {
              time: 6,
              value: 2,
            },
          ],
        ],
        expected: [
          {
            time: 1,
            value: 5,
          },
          {
            time: 3,
            value: 5,
          },
          {
            time: 4,
            value: 8,
          },
          {
            time: 5,
            value: 8,
          },
          {
            time: 6,
            value: 2,
          },
        ],
      },
      {
        name: "Одна точка",
        args: [
          [
            {
              time: 1,
              value: 5,
            },
          ],
        ],
        expected: [
          {
            time: 1,
            value: 5,
          },
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Все значения разные — массив не меняется",
        args: [
          [
            {
              time: 1,
              value: 1,
            },
            {
              time: 2,
              value: 2,
            },
            {
              time: 3,
              value: 3,
            },
          ],
        ],
        expected: [
          {
            time: 1,
            value: 1,
          },
          {
            time: 2,
            value: 2,
          },
          {
            time: 3,
            value: 3,
          },
        ],
        hidden: true,
      },
      {
        name: "Одно значение возвращается после другого — новая группа",
        args: [
          [
            {
              time: 1,
              value: 4,
            },
            {
              time: 2,
              value: 4,
            },
            {
              time: 3,
              value: 9,
            },
            {
              time: 4,
              value: 4,
            },
            {
              time: 5,
              value: 4,
            },
          ],
        ],
        expected: [
          {
            time: 1,
            value: 4,
          },
          {
            time: 2,
            value: 4,
          },
          {
            time: 3,
            value: 9,
          },
          {
            time: 4,
            value: 4,
          },
          {
            time: 5,
            value: 4,
          },
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Сжатие последовательности чисел в диапазоны (Compress Numbers to Ranges)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "compress",
    description: {
      condition: "Реализуйте функцию `compress`, которая принимает список целых чисел и возвращает строку, где подряд идущие числа объединяются в диапазоны.\n\nПравила сжатия:\n\nЧисла сортируются по возрастанию\n\nДубликаты игнорируются\n\nНепрерывная последовательность из минимум 2 чисел записывается как `start-end`\n\nОдиночное число записывается как просто число\n\nРезультат — строка, диапазоны разделяются запятой `,`",
      input: [],
      output: "",
      constraints: [
        "Вход: массив целых чисел",
        "Размер массива: 0 ≤ N ≤ 100000",
        "Значения: -10^9 ≤ value ≤ 10^9",
        "Время: O(n log n) или быстрее",
        "Память: O(n)",
      ],
      example: "Вход: [1, 4, 5, 2, 3, 9, 8, 11, 0]\nВыход: \"0-5,8-9,11\"\n\nВход: [1, 4]\nВыход: \"1,4\"\n\nВход: [1, 2, 3]\nВыход: \"1-3\"\n\nВход: [1, 2, 2, 4]\nВыход: \"1-2,4\"\n\nВход: [-2, -1, 0, 5]\nВыход: \"-2-0,5\"\n\nВход: [7]\nВыход: \"7\"\n\nВход: []\nВыход: \"\"",
    },
    starterCode: "function compress(numbers) {\n    // TODO: напишите решение здесь\n    return \"\";\n}\n",
    tests: [
      {
        name: "Несколько диапазонов",
        args: [
          [
            1,
            4,
            5,
            2,
            3,
            9,
            8,
            11,
            0,
          ],
        ],
        expected: "0-5,8-9,11",
      },
      {
        name: "Только одиночные числа",
        args: [
          [
            1,
            4,
          ],
        ],
        expected: "1,4",
      },
      {
        name: "Один диапазон",
        args: [
          [
            1,
            2,
            3,
          ],
        ],
        expected: "1-3",
      },
      {
        name: "Дубликаты игнорируются",
        args: [
          [
            1,
            2,
            2,
            4,
          ],
        ],
        expected: "1-2,4",
        hidden: true,
      },
      {
        name: "Отрицательные числа",
        args: [
          [
            -2,
            -1,
            0,
            5,
          ],
        ],
        expected: "-2-0,5",
        hidden: true,
      },
      {
        name: "Одно число",
        args: [
          [
            7,
          ],
        ],
        expected: "7",
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: "",
        hidden: true,
      },
    ],
  },
  {
    title: "Подсчёт вложенных элементов (Count Nested Elements)",
    difficulty: 2,
    categories: [
      "Recursion",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "countElements",
    description: {
      condition: "Дан массив, элементы которого могут быть числами, строками, булевыми значениями, `null` или другими массивами.\n\nНеобходимо написать функцию, которая возвращает количество всех не-массивных элементов, включая элементы внутри любых вложенных массивов.\n\nСами массивы как элементы не считаются.",
      input: [
        "Массив `arr`, который может содержать обычные элементы и вложенные массивы любой глубины.",
      ],
      output: "Целое число — количество всех не-массивных элементов внутри массива.",
      constraints: [
        "`0 <= arr.length <= 10^4`",
        "Глубина вложенности не превышает `1000`",
        "Элементами массива могут быть:числа",
        "строки",
        "булевы значения",
        "`null`",
        "вложенные массивы",
      ],
      example: "Вход:\n\n[[1, 2, 3], [4, [5]]]\n\nВыход:\n\n5",
    },
    starterCode: "function countElements(arr) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "[[1, 2, 3], [4, [5]]]",
        args: [
          [
            [
              1,
              2,
              3,
            ],
            [
              4,
              [
                5,
              ],
            ],
          ],
        ],
        expected: 5,
      },
      {
        name: "Плоский массив",
        args: [
          [
            1,
            "a",
            true,
            null,
          ],
        ],
        expected: 4,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
      },
      {
        name: "Массив из пустых массивов",
        args: [
          [
            [],
            [
              [],
            ],
          ],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Глубокая вложенность",
        args: [
          [
            1,
            [
              2,
              [
                3,
                [
                  4,
                  [
                    5,
                  ],
                ],
              ],
            ],
          ],
        ],
        expected: 5,
        hidden: true,
      },
    ],
  },
  {
    title: "Подсчет количества гласных (Count Vowels)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "countVowels",
    description: {
      condition: "Напишите функцию `countVowels`, которая принимает строку и возвращает количество гласных букв (a, e, i, o, u) в этой строке. Функция должна игнорировать регистр букв.",
      input: [],
      output: "",
      constraints: [
        "Строка может содержать буквы в любом регистре (верхнем или нижнем)",
        "Строка может быть пустой (тогда возвращается 0)",
        "Строка может содержать только латинские буквы",
        "Гласными считаются только символы a, e, i, o, u (и их заглавные аналоги)",
      ],
      example: "Вход: \"hello\"\nВыход: 2\n\nВход: \"world\"\nВыход: 1\n\nВход: \"AEIOU\"\nВыход: 5\n\nВход: \"xyz\"\nВыход: 0",
    },
    starterCode: "function countVowels(str) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "\"hello\"",
        args: [
          "hello",
        ],
        expected: 2,
      },
      {
        name: "\"world\"",
        args: [
          "world",
        ],
        expected: 1,
      },
      {
        name: "Регистр игнорируется",
        args: [
          "AEIOU",
        ],
        expected: 5,
      },
      {
        name: "Гласных нет",
        args: [
          "xyz",
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Смешанный регистр",
        args: [
          "JavaScript Is Fun",
        ],
        expected: 5,
        hidden: true,
      },
    ],
  },
  {
    title: "Подсчет количества слов в строке (Count Words)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "countWords",
    description: {
      condition: "Напишите функцию `countWords`, которая принимает строку и возвращает количество слов в этой строке. Слово определяется как последовательность символов, разделенных пробелами. Функция должна корректно обрабатывать лишние пробелы в начале, в конце и между словами.",
      input: [],
      output: "",
      constraints: [
        "Строка может содержать пробелы в любом количестве",
        "Строка может быть пустой (тогда возвращается 0)",
        "Слова состоят только из букв (латиница)",
        "Строка может содержать начальные и конечные пробелы",
      ],
      example: "Вход: \"The quick brown fox jumps over the lazy dog\"\nВыход: 9\n\nВход: \" Hello   world  \"\nВыход: 2\n\nВход: \"\"\nВыход: 0\n\nВход: \"single\"\nВыход: 1",
    },
    starterCode: "function countWords(str) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "Обычное предложение",
        args: [
          "The quick brown fox jumps over the lazy dog",
        ],
        expected: 9,
      },
      {
        name: "Лишние пробелы по краям и внутри",
        args: [
          "  Hello   world  ",
        ],
        expected: 2,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: 0,
      },
      {
        name: "Одно слово",
        args: [
          "single",
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Только пробелы",
        args: [
          "     ",
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Фабрика символов (createCharReader)",
    difficulty: 1,
    categories: [
      "Iterators",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "createCharReader",
    description: {
      condition: "Реализуй функцию `createCharReader(str)`, которая принимает строку и возвращает функцию-читатель. Каждый вызов возвращённой функции отдаёт следующий символ строки. Когда символы заканчиваются, функция возвращает `null` (или аналог в других языках).",
      input: [
        "строка `str`",
      ],
      output: "функция без аргументов, возвращающая `string | null`",
      constraints: [
        "`0 <= str.length <= 1000`",
        "строка может содержать любые Unicode-символы",
        "после исчерпания строки все последующие вызовы возвращают `null`",
      ],
      example: "const reader = createCharReader(\"hi\");\nreader() → \"h\"\nreader() → \"i\"\nreader() → null",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction createCharReader(str) {\n  // TODO: напишите решение здесь\n}\n",
    tests: [
      {
        name: "Читает символы по одному",
        body: "const read = solution(\"hi\");\nreturn [read(), read(), read()];",
        expected: [
          "h",
          "i",
          null,
        ],
      },
      {
        name: "Пустая строка — сразу null",
        body: "const read = solution(\"\");\nreturn read();",
        expected: null,
      },
      {
        name: "После конца всегда null",
        body: "const read = solution(\"a\");\nread(); read();\nreturn read();",
        expected: null,
        hidden: true,
      },
      {
        name: "Читатели независимы",
        body: "const a = solution(\"xy\");\nconst b = solution(\"xy\");\na();\nreturn [a(), b()];",
        expected: [
          "y",
          "x",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Каррированное сложение (Curried Add)",
    difficulty: 1,
    categories: [
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "add",
    description: {
      condition: "Реализуйте функцию `add(a)`, которая принимает одно число и возвращает другую функцию, принимающую второе число. Итоговый вызов возвращает сумму двух чисел.",
      input: [
        "два числа `a` и `b`, передаваемые через каррирование: `add(a)(b)`",
      ],
      output: "число — сумма `a + b`",
      constraints: [
        "`-10^6 <= a, b <= 10^6`",
        "`a` и `b` — целые числа",
      ],
      example: "Вход: add(3)(5)\nВыход: 8\n\nВход: add(-1)(1)\nВыход: 0\n\nВход: add(0)(0)\nВыход: 0",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction add(a) {\n  // TODO: напишите решение здесь\n  return function(b) {\n    return 0;\n  };\n}\n",
    tests: [
      {
        name: "add(3)(5)",
        body: "return solution(3)(5);",
        expected: 8,
      },
      {
        name: "add(-1)(1)",
        body: "return solution(-1)(1);",
        expected: 0,
      },
      {
        name: "add(0)(0)",
        body: "return solution(0)(0);",
        expected: 0,
      },
      {
        name: "Частичное применение переиспользуется",
        body: "const add10 = solution(10);\nreturn [add10(1), add10(2)];",
        expected: [
          11,
          12,
        ],
        hidden: true,
      },
      {
        name: "Дробные числа",
        body: "return solution(0.5)(0.25);",
        expected: 0.75,
        hidden: true,
      },
    ],
  },
  {
    title: "Собственная реализация метода some (Custom Array Some)",
    difficulty: 2,
    categories: [
      "Arrays",
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "mySome",
    description: {
      condition: "Реализуйте функцию `mySome(array, callback, thisArg)`, которая проверяет, удовлетворяет ли хотя бы один элемент массива условию, заданному функцией `callback`. Функция `callback` вызывается для каждого элемента массива по порядку и принимает три аргумента: текущий элемент, его индекс и сам массив. Если `callback` возвращает истинное (truthy) значение хотя бы для одного элемента — функция должна немедленно вернуть `true` и прекратить дальнейшую проверку. Если ни один элемент не удовлетворяет условию — вернуть `false`. Для пустого массива всегда возвращается `false`. Если передан `thisArg`, он должен использоваться как контекст `this` при вызове `callback`.",
      input: [
        "`array` — массив элементов (числа, строки или смешанные значения), длина от 0 до 1000",
        "`callback` — функция-предикат `(element, index, array) => boolean`",
        "`thisArg` — (необязательно) контекст для `this` внутри `callback`",
      ],
      output: "`true`, если хотя бы один элемент прошёл проверку callback, иначе `false`.",
      constraints: [
        "`0 <= array.length <= 1000`",
        "Функция должна прекращать обход при первом true (short-circuit)",
        "Пустой массив → `false`",
      ],
      example: "Вход: array = [1, 2, 3, 4], callback = x => x % 2 === 0\nВыход: true\n\nВход: array = [], callback = x => true\nВыход: false\n\nВход: array = [1, 3, 5], callback = x => x % 2 === 0\nВыход: false",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction mySome(array, callback, thisArg) {\n  // TODO: напишите решение здесь\n  return false;\n}\n",
    tests: [
      {
        name: "Есть чётный элемент",
        body: "return solution([1, 2, 3, 4], (x) => x % 2 === 0);",
        expected: true,
      },
      {
        name: "Пустой массив — всегда false",
        body: "return solution([], () => true);",
        expected: false,
      },
      {
        name: "Ни один элемент не подходит",
        body: "return solution([1, 3, 5], (x) => x % 2 === 0);",
        expected: false,
      },
      {
        name: "Проверка останавливается на первом совпадении",
        body: "let seen = 0;\nsolution([1, 2, 3, 4], (x) => { seen++; return x === 2; });\nreturn seen;",
        expected: 2,
        hidden: true,
      },
      {
        name: "В callback приходят элемент, индекс и массив",
        body: "let args = null;\nsolution([\"a\"], (...rest) => { args = rest; return false; });\nreturn args;",
        expected: [
          "a",
          0,
          [
            "a",
          ],
        ],
        hidden: true,
      },
      {
        name: "thisArg становится контекстом callback",
        body: "return solution([1, 2], function (x) { return x === this.needle; }, { needle: 2 });",
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Кастомный Promise.all (Custom Promise.all)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "customPromiseAll",
    description: {
      condition: "Реализуйте функцию `customPromiseAll`, которая принимает массив промисов и возвращает новый промис. Новый промис:\n\nрезолвится массивом результатов, когда все переданные промисы успешно выполнились, при этом порядок результатов соответствует порядку входного массива, независимо от порядка завершения промисов;\n\nреджектится с ошибкой первого упавшего промиса, если хотя бы один из промисов был отклонён.\n\nЕсли входной массив пуст — немедленно резолвитесь пустым массивом.\n\nНельзя использовать встроенный `Promise.all`.",
      input: [
        "`promises` — массив промисов (может быть пустым)",
      ],
      output: "Промис, который резолвится в `Array` результатов или реджектится с ошибкой.",
      constraints: [
        "`0 <= promises.length <= 1000`",
        "Каждый элемент массива является промисом",
        "Промисы могут резолвиться в любом порядке и с задержкой",
      ],
      example: "Вход: [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]Выход: [1, 2, 3]\nВход: [Promise.resolve(1), Promise.reject(\"error\"), Promise.resolve(3)]Выход: реджект с \"error\"\nВход: []Выход: []",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction customPromiseAll(promises) {\n  // TODO: напишите решение здесь\n  return Promise.resolve([]);\n}\n",
    tests: [
      {
        name: "Все промисы успешны",
        body: "return await solution([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);",
        expected: [
          1,
          2,
          3,
        ],
      },
      {
        name: "Пустой массив",
        body: "return await solution([]);",
        expected: [],
      },
      {
        name: "Реджект первого упавшего промиса",
        body: "try {\n  await solution([Promise.resolve(1), Promise.reject(\"error\"), Promise.resolve(3)]);\n  return \"resolved\";\n} catch (e) {\n  return e;\n}",
        expected: "error",
      },
      {
        name: "Порядок результатов — как во входном массиве",
        body: "const slow = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));\nreturn await solution([slow(\"a\", 30), slow(\"b\", 10), slow(\"c\", 1)]);",
        expected: [
          "a",
          "b",
          "c",
        ],
        hidden: true,
      },
      {
        name: "Не-промисы тоже поддерживаются",
        body: "return await solution([1, Promise.resolve(2), 3]);",
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Собственная реализация Promise.any (Custom Promise.any)",
    difficulty: 4,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "any",
    description: {
      condition: "Реализуйте функцию `any(promises)`, которая работает аналогично `Promise.any()`. Функция принимает непустой массив промисов и возвращает промис. Если хотя бы один из переданных промисов успешно резолвится, возвращаемый промис резолвится значением первого по времени успешного результата (независимо от порядка промисов в массиве). Если все переданные промисы отклоняются (reject), возвращаемый промис должен отклониться с ошибкой `AggregateError`, содержащей все ошибки в порядке, соответствующем исходному массиву промисов.",
      input: [
        "`promises` — непустой массив промисов (`Promise[]`)",
      ],
      output: "Промис, который:резолвится значением первого успешно выполнившегося промиса, ИЛИ\nотклоняется с `AggregateError`, содержащим массив всех ошибок (в порядке промисов), если все промисы отклонены",
      constraints: [
        "Массив непустой, `1 <= promises.length <= 20`",
        "Промисы могут резолвиться/отклоняться в любом порядке и с разной задержкой",
        "Порядок ошибок в `AggregateError.errors` должен соответствовать порядку промисов во входном массиве, а не порядку завершения",
      ],
      example: "Вход: promises = [Promise.reject('err1'), Promise.resolve(42), Promise.reject('err2')]\nВыход: промис резолвится значением 42\n\nВход: promises = [Promise.reject('err1'), Promise.reject('err2')]\nВыход: промис отклоняется AggregateError с errors = ['err1', 'err2']",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction any(promises) {\n  // TODO: напишите решение здесь\n  return Promise.reject(new AggregateError([], 'Not implemented'));\n}\n",
    tests: [
      {
        name: "Резолвится первым успешным значением",
        body: "return await solution([Promise.reject(\"err1\"), Promise.resolve(42), Promise.reject(\"err2\")]);",
        expected: 42,
      },
      {
        name: "Все упали — AggregateError со списком ошибок",
        body: "try {\n  await solution([Promise.reject(\"err1\"), Promise.reject(\"err2\")]);\n  return \"resolved\";\n} catch (e) {\n  return [e instanceof AggregateError, e.errors];\n}",
        expected: [
          true,
          [
            "err1",
            "err2",
          ],
        ],
      },
      {
        name: "Побеждает самый быстрый, а не первый по списку",
        body: "const slow = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));\nreturn await solution([slow(\"late\", 40), slow(\"early\", 5)]);",
        expected: "early",
        hidden: true,
      },
      {
        name: "Ошибки идут в порядке входного массива",
        body: "const fail = (v, ms) => new Promise((_, rej) => setTimeout(() => rej(v), ms));\ntry {\n  await solution([fail(\"first\", 30), fail(\"second\", 5)]);\n  return \"resolved\";\n} catch (e) {\n  return e.errors;\n}",
        expected: [
          "first",
          "second",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Неудовлетворённость покупателей (Customer Dissatisfaction)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "calculateDissatisfaction",
    description: {
      condition: "Напишите функцию `calculateDissatisfaction(goods, buyerNeeds)`, которая принимает два массива целых чисел:\n\n`goods` — массив доступных товаров (их характеристики/цены)\n\n`buyerNeeds` — массив потребностей покупателей\n\nФункция должна вычислить и вернуть сумму неудовлетворённостей всех покупателей, которая определяется как сумма абсолютных разностей между потребностью покупателя и ближайшим по значению товаром.\n\nПравила:\n\nДля каждого покупателя найти товар, значение которого наиболее близко к потребности покупателя\n\nВычислить абсолютную разницу между потребностью и этим товаром\n\nСуммировать все такие разницы для всех покупателей\n\nВажные случаи:\n\nЕсли массив товаров пуст, для любого покупателя разница равна его потребности\n\nЕсли массив потребностей пуст, сумма = 0\n\nЕсли у покупателя есть несколько ближайших товаров (например, потребность 5, товары 4 и 6), разница будет минимальной (в данном случае 1)",
      input: [],
      output: "",
      constraints: [
        "Массивы могут быть пустыми",
        "Элементы массивов — целые числа (могут быть отрицательными)",
        "Длина массивов: 0 ≤ N, M ≤ 1000",
        "Время выполнения: O((N+M) log N), где N — длина goods, M — длина buyerNeeds",
      ],
      example: "// Пример 1\ngoods = [8, 3, 5]\nbuyerNeeds = [5, 6]\n// Результат: 1\n// Пояснение:\n// - Для потребности 5 → ближайший товар 5 → разница |5-5| = 0\n// - Для потребности 6 → ближайший товар 5 или 8 → минимальная разница |6-5| = 1\n// Сумма: 0 + 1 = 1\n\n// Пример 2\ngoods = [1, 10, 100]\nbuyerNeeds = [5, 50, 95]\n// Результат: 4 + 40 + 5 = 49\n\n// Пример 3\ngoods = []\nbuyerNeeds = [1, 2, 3]\n// Результат: 1 + 2 + 3 = 6\n\n// Пример 4\ngoods = [5, 5, 5]\nbuyerNeeds = [5, 6, 4]\n// Результат: 0 + 1 + 1 = 2",
    },
    starterCode: "function calculateDissatisfaction(goods, buyerNeeds) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "Пример 1",
        args: [
          [
            8,
            3,
            5,
          ],
          [
            5,
            6,
          ],
        ],
        expected: 1,
      },
      {
        name: "Пример 2",
        args: [
          [
            1,
            10,
            100,
          ],
          [
            5,
            50,
            95,
          ],
        ],
        expected: 49,
      },
      {
        name: "Товаров нет — неудовлетворённость равна потребности",
        args: [
          [],
          [
            1,
            2,
            3,
          ],
        ],
        expected: 6,
      },
      {
        name: "Одинаковые товары",
        args: [
          [
            5,
            5,
            5,
          ],
          [
            5,
            6,
            4,
          ],
        ],
        expected: 2,
        hidden: true,
      },
      {
        name: "Покупателей нет",
        args: [
          [
            1,
            2,
          ],
          [],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Ближайший товар — не первый в массиве",
        args: [
          [
            100,
            7,
          ],
          [
            8,
          ],
        ],
        expected: 1,
        hidden: true,
      },
    ],
  },
  {
    title: "Циклический сдвиг массива (Cyclic Array Shift)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "rotateArray",
    description: {
      condition: "Напишите функцию `rotateArray`, которая принимает массив и целое число `step`. Функция должна вернуть новый массив, полученный циклическим сдвигом исходного массива на `step` элементов:\n\nЕсли `step` положительное число — выполняется сдвиг вправо (элементы перемещаются в конец массива)\n\nЕсли `step` отрицательное число — выполняется сдвиг влево (элементы перемещаются в начало массива)\n\nЕсли `step` равен `0` или кратен длине массива — возвращается копия исходного массива",
      input: [],
      output: "",
      constraints: [
        "Исходный массив не должен изменяться",
        "Длина массива может быть любой (включая пустой)",
        "`step` может быть больше длины массива (тогда сдвиг циклический)",
      ],
      example: "Вход: [1, 2, 3, 4, 5], 2\nВыход: [4, 5, 1, 2, 3]\nПояснение: сдвиг вправо на 2\n\nВход: [1, 2, 3, 4, 5], -2\nВыход: [3, 4, 5, 1, 2]\nПояснение: сдвиг влево на 2\n\nВход: [1, 2, 3], 1\nВыход: [3, 1, 2]\n\nВход: [1, 2, 3], 0\nВыход: [1, 2, 3]",
    },
    starterCode: "function rotateArray(arr, step) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Сдвиг вправо на 2",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
          ],
          2,
        ],
        expected: [
          4,
          5,
          1,
          2,
          3,
        ],
      },
      {
        name: "Сдвиг влево на 2",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
          ],
          -2,
        ],
        expected: [
          3,
          4,
          5,
          1,
          2,
        ],
      },
      {
        name: "Сдвиг на 1",
        args: [
          [
            1,
            2,
            3,
          ],
          1,
        ],
        expected: [
          3,
          1,
          2,
        ],
      },
      {
        name: "Сдвиг на 0",
        args: [
          [
            1,
            2,
            3,
          ],
          0,
        ],
        expected: [
          1,
          2,
          3,
        ],
      },
      {
        name: "Сдвиг кратен длине",
        args: [
          [
            1,
            2,
            3,
          ],
          6,
        ],
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
      {
        name: "Сдвиг больше длины массива",
        args: [
          [
            1,
            2,
            3,
            4,
          ],
          7,
        ],
        expected: [
          2,
          3,
          4,
          1,
        ],
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
          3,
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Функция запроса данных (Data Query Function)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "query",
    description: {
      condition: "Реализуйте асинхронную функцию `query()`, которая выполняет выборку и трансформацию данных из источника.\n\nПараметры функции:\n\n`fields` (массив строк) - список полей, которые нужно включить в результат\n\n`source` (асинхронная функция) - возвращает массив исходных объектов\n\n`filter` (функция) - предикат для фильтрации записей\n\n`order` (функция или null) - функция сравнения для сортировки",
      input: [],
      output: "",
      constraints: [
        "Все запрашиваемые в `fields` поля должны существовать в каждом объекте данных",
        "Если поле отсутствует, выбрасывать ошибку `'Incorrect params'`",
        "`order` может быть `null` (тогда сортировка не применяется)",
        "Функция должна быть асинхронной и возвращать Promise",
        "Не использовать внешние библиотеки",
        "Количество записей ≤ 1000",
        "Время выполнения ≤ 1 секунда",
      ],
      example: "const data = [\n    { name: 'Michael', profession: 'teacher', age: 50 },\n    { name: 'Anna', profession: 'scientific', age: 21 }\n];\n\nconst result = await query({\n    fields: ['name', 'age'],\n    source: async () => data,\n    filter: entry => entry.age > 20,\n    order: (a, b) => a.name.localeCompare(b.name)\n});\n\n// Результат: [{ name: 'Anna', age: 21 }, { name: 'Michael', age: 50 }]",
    },
    starterCode: "async function query({ fields = [], source = () => [], filter, order = null }) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Фильтрация, сортировка и выбор полей",
        body: "const data = [\n  { name: \"Michael\", profession: \"teacher\", age: 50 },\n  { name: \"Anna\", profession: \"scientific\", age: 21 },\n  { name: \"Kid\", profession: \"none\", age: 7 },\n];\nreturn await solution({\n  fields: [\"name\", \"age\"],\n  source: async () => data,\n  filter: (e) => e.age > 20,\n  order: (a, b) => a.name.localeCompare(b.name),\n});",
        expected: [
          {
            name: "Anna",
            age: 21,
          },
          {
            name: "Michael",
            age: 50,
          },
        ],
      },
      {
        name: "Без order порядок исходный",
        body: "return await solution({\n  fields: [\"name\"],\n  source: async () => [{ name: \"b\" }, { name: \"a\" }],\n  filter: () => true,\n});",
        expected: [
          {
            name: "b",
          },
          {
            name: "a",
          },
        ],
      },
      {
        name: "Фильтр отсеял всё",
        body: "return await solution({\n  fields: [\"name\"],\n  source: async () => [{ name: \"a\" }],\n  filter: () => false,\n});",
        expected: [],
      },
      {
        name: "Источник вызывается один раз",
        body: "let calls = 0;\nawait solution({\n  fields: [\"a\"],\n  source: async () => { calls++; return [{ a: 1 }]; },\n  filter: () => true,\n});\nreturn calls;",
        expected: 1,
        hidden: true,
      },
      {
        name: "В результат попадают только запрошенные поля",
        body: "return await solution({\n  fields: [\"age\"],\n  source: async () => [{ name: \"x\", age: 30, secret: true }],\n  filter: () => true,\n});",
        expected: [
          {
            age: 30,
          },
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Debounce функция (Debounce Function)",
    difficulty: 3,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "debounce",
    description: {
      condition: "Реализуйте функцию `debounce`, которая принимает функцию `func` и задержку `delay` в миллисекундах. Дебаунсинг позволяет \"задержать\" выполнение функции до тех пор, пока не пройдет определенный период времени без ее вызова. Это полезно, например, для обработки ввода в текстовое поле, чтобы не выполнять операцию на каждое нажатие клавиши.\n\nВозвращаемая функция должна:\n\nПри вызове отменять предыдущий запланированный вызов\n\nЗапланировать новый вызов исходной функции через `delay` миллисекунд\n\nВызвать исходную функцию с последними переданными аргументами",
      input: [],
      output: "",
      constraints: [
        "Исходная функция может принимать любое количество аргументов",
        "Возвращаемая функция должна сохранять контекст вызова (`this`)",
        "При повторных вызовах таймер должен сбрасываться",
        "Функция должна работать с асинхронным кодом",
      ],
      example: "const log = (message) => console.log(message);\nconst debouncedLog = debounce(log, 1000);\n\n// Симуляция быстрых вызовов\ndebouncedLog(\"Первый вызов\");  // Отменяется\ndebouncedLog(\"Второй вызов\");  // Отменяется\ndebouncedLog(\"Третий вызов\");  // Выполнится через 1 секунду\n\n// Ожидается: только \"Третий вызов\" в консоли",
    },
    starterCode: "function debounce(func, delay) {\n    // TODO: write your solution here\n}\n",
    tests: [
      {
        name: "Выполняется только последний вызов",
        body: "const calls = [];\nconst d = solution((m) => calls.push(m), 30);\nd(\"первый\"); d(\"второй\"); d(\"третий\");\nawait new Promise((r) => setTimeout(r, 80));\nreturn calls;",
        expected: [
          "третий",
        ],
      },
      {
        name: "До истечения задержки ничего не вызвано",
        body: "let called = false;\nconst d = solution(() => { called = true; }, 50);\nd();\nawait new Promise((r) => setTimeout(r, 10));\nreturn called;",
        expected: false,
      },
      {
        name: "Новый вызов после паузы срабатывает снова",
        body: "const calls = [];\nconst d = solution((m) => calls.push(m), 20);\nd(\"a\");\nawait new Promise((r) => setTimeout(r, 60));\nd(\"b\");\nawait new Promise((r) => setTimeout(r, 60));\nreturn calls;",
        expected: [
          "a",
          "b",
        ],
        hidden: true,
      },
      {
        name: "Аргументы берутся от последнего вызова",
        body: "let got = null;\nconst d = solution((...args) => { got = args; }, 20);\nd(1, 2);\nd(3, 4);\nawait new Promise((r) => setTimeout(r, 60));\nreturn got;",
        expected: [
          3,
          4,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Debounce-хук значения (Debounced Value Hook)",
    difficulty: 2,
    categories: [
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "debounceValue",
    description: {
      condition: "Реализуйте функцию `debounceValue(value, delay)`, которая возвращает `Promise`.\n\nПромис резолвится значением из последнего вызова только после того, как прошло `delay` миллисекунд без новых вызовов. Если новый вызов пришёл раньше — предыдущий таймер сбрасывается, и все ожидающие промисы получат последнее значение.\n\nПоведение должно соответствовать механизму debounce.",
      input: [
        "`value` — значение любого типа",
        "`delay` — число миллисекунд",
      ],
      output: "`Promise`, резолвящийся последним значением после паузы в `delay` мс",
      constraints: [
        "Состояние общее для всех вызовов — это одна «подписка», а не независимые таймеры",
        "`delay >= 0`",
      ],
      example: "debounceValue(\"a\", 500);\n// через 100 мс\ndebounceValue(\"ab\", 500);\n// через 100 мс\nconst result = await debounceValue(\"abc\", 500);\n// result === \"abc\"",
    },
    starterCode: "function debounceValue(value, delay) {\n   // TODO\n}\n",
    tests: [
      {
        name: "Побеждает последнее значение",
        body: "solution(\"a\", 40);\nawait new Promise((r) => setTimeout(r, 10));\nsolution(\"ab\", 40);\nawait new Promise((r) => setTimeout(r, 10));\nreturn await solution(\"abc\", 40);",
        expected: "abc",
      },
      {
        name: "Одиночный вызов резолвится своим значением",
        body: "return await solution(7, 20);",
        expected: 7,
      },
      {
        name: "Значение приходит не раньше задержки",
        body: "let done = false;\nconst p = solution(\"x\", 60).then(() => { done = true; });\nawait new Promise((r) => setTimeout(r, 20));\nconst early = done;\nawait p;\nreturn [early, done];",
        expected: [
          false,
          true,
        ],
        hidden: true,
      },
      {
        name: "Ранние промисы тоже получают последнее значение",
        body: "const first = solution(\"old\", 30);\nawait new Promise((r) => setTimeout(r, 5));\nsolution(\"new\", 30);\nreturn await first;",
        expected: "new",
        hidden: true,
      },
    ],
  },
  {
    title: "Глубокое сравнение массивов (Deep Array Comparison)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "deepCompare",
    description: {
      condition: "Напишите функцию `deepCompare(array1, array2)`, которая сравнивает два массива и возвращает `true`, если они структурно идентичны по следующим правилам:\n\nДлины массивов должны быть одинаковыми.\n\nТипы соответствующих элементов должны совпадать:Примитивы сравниваются по значению\n\nЕсли элемент — массив (список, срез), проверяется только совпадение длины (рекурсивно во вложенные массивы заходить не нужно)\n\nЕсли один элемент — массив, а другой — примитив → `false`",
      input: [],
      output: "",
      constraints: [
        "Элементы могут быть: числа, строки, булевы значения, null, массивы",
        "Глубина вложенности: 1 уровень (проверяем только прямые вложенные массивы)",
        "Массивы не содержат других сложных структур (объектов, словарей)",
      ],
      example: "Вход: array1 = [1, 2, 3], array2 = [1, 2, 3]\nВыход: true\nПояснение: длины равны, типы совпадают, значения равны\n\nВход: array1 = [1, [5, 7]], array2 = [1, [2, 2]]\nВыход: true\nПояснение: длины равны, оба элемента - массивы, длины вложенных равны\n\nВход: array1 = [1, [8, 1]], array2 = [[20, 2], 2]\nВыход: false\nПояснение: на позиции 0 тип не совпадает (примитив vs массив)\n\nВход: array1 = [1, [1, 10]], array2 = [1, [4]]\nВыход: false\nПояснение: длины вложенных массивов не совпадают (2 vs 1)",
    },
    starterCode: "function deepCompare(array1, array2) {\n    // TODO: write your solution here\n    return false;\n}\n",
    tests: [
      {
        name: "Одинаковые плоские массивы",
        args: [
          [
            1,
            2,
            3,
          ],
          [
            1,
            2,
            3,
          ],
        ],
        expected: true,
      },
      {
        name: "Вложенные массивы сравниваются только по длине",
        args: [
          [
            1,
            [
              5,
              7,
            ],
          ],
          [
            1,
            [
              2,
              2,
            ],
          ],
        ],
        expected: true,
      },
      {
        name: "Примитив против массива",
        args: [
          [
            1,
            [
              8,
              1,
            ],
          ],
          [
            [
              20,
              2,
            ],
            2,
          ],
        ],
        expected: false,
      },
      {
        name: "Разные длины вложенных массивов",
        args: [
          [
            1,
            [
              1,
              10,
            ],
          ],
          [
            1,
            [
              4,
            ],
          ],
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Разная длина верхнего уровня",
        args: [
          [
            1,
            2,
          ],
          [
            1,
            2,
            3,
          ],
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Два пустых массива",
        args: [
          [],
          [],
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Разные примитивы на одной позиции",
        args: [
          [
            1,
            "2",
          ],
          [
            1,
            2,
          ],
        ],
        expected: false,
        hidden: true,
      },
    ],
  },
  {
    title: "Глубокое клонирование объекта без JSON (Deep Clone Without JSON)",
    difficulty: 3,
    categories: [
      "Objects",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "deepClone",
    description: {
      condition: "Реализуйте функцию глубокого клонирования произвольной структуры данных без использования `JSON.parse`/`JSON.stringify`. Клон должен быть полностью независим от оригинала: изменение вложенных объектов или массивов в клоне не должно влиять на исходную структуру, и наоборот.\n\nСтруктура может содержать: примитивы (числа, строки, булевы значения), вложенные объекты, вложенные массивы (в том числе разреженные/с \"дырками\" — пустыми слотами), и произвольную глубину вложенности.",
      input: [
        "Значение произвольного типа: примитив, объект или массив, с возможной вложенностью любой глубины (объекты внутри массивов, массивы внутри объектов и т.д.).",
      ],
      output: "Глубокая копия входного значения той же структуры.",
      constraints: [
        "Глубина вложенности не превышает 20 уровней",
        "Циклические ссылки не встречаются",
        "Значения — только примитивы, обычные объекты (plain objects) и массивы (без функций, дат, Map/Set и т.п.)",
      ],
      example: "Вход: { a: 1, b: { c: [1, 2, \"3\"] }, d: [] }\nВыход: { a: 1, b: { c: [1, 2, \"3\"] } (независимая копия), d: [] }",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction deepClone(value) {\n  // TODO: напишите решение здесь\n  return value;\n}\n",
    tests: [
      {
        name: "Структура копируется целиком",
        args: [
          {
            a: 1,
            b: {
              c: [
                1,
                2,
                "3",
              ],
            },
            d: [],
          },
        ],
        expected: {
          a: 1,
          b: {
            c: [
              1,
              2,
              "3",
            ],
          },
          d: [],
        },
      },
      {
        name: "Изменение клона не трогает оригинал",
        body: "const original = { nested: { list: [1, 2] } };\nconst clone = solution(original);\nclone.nested.list.push(3);\nreturn [original.nested.list.length, clone.nested.list.length];",
        expected: [
          2,
          3,
        ],
      },
      {
        name: "Примитив возвращается как есть",
        args: [
          42,
        ],
        expected: 42,
      },
      {
        name: "Вложенные объекты — новые ссылки",
        body: "const original = { a: { b: 1 } };\nconst clone = solution(original);\nreturn clone.a === original.a;",
        expected: false,
        hidden: true,
      },
      {
        name: "Массив объектов",
        args: [
          [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        ],
        expected: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
        hidden: true,
      },
      {
        name: "null",
        args: [
          null,
        ],
        expected: null,
        hidden: true,
      },
    ],
  },
  {
    title: "Глубокий вложенный объект (Deep Nested Object)",
    difficulty: 3,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "nestedVal",
    description: {
      condition: "Напишите функцию `nestedVal`, которая принимает строку в формате `'key1.key2.key3.key4.key5'` и преобразует её в глубоко вложенный объект, где каждый следующий ключ является свойством предыдущего, а последний ключ содержит пустой объект `{}`.",
      input: [],
      output: "",
      constraints: [
        "Строка всегда содержит минимум один ключ",
        "Ключи разделены точкой `.`",
        "Ключи могут содержать только буквы латинского алфавита и цифры",
        "Максимальная глубина вложенности: 10",
      ],
      example: "Вход: 'value1.value2.value3.value4.value5'\nВыход: {\n  value1: {\n    value2: {\n      value3: {\n        value4: {\n          value5: {}\n        }\n      }\n    }\n  }\n}\n\nВход: 'a.b.c'\nВыход: {\n  a: {\n    b: {\n      c: {}\n    }\n  }\n}",
    },
    starterCode: "function nestedVal(str) {\n    // TODO: write your solution here\n    return {};\n}\n",
    tests: [
      {
        name: "'a.b.c'",
        args: [
          "a.b.c",
        ],
        expected: {
          a: {
            b: {
              c: {},
            },
          },
        },
      },
      {
        name: "Пять уровней",
        args: [
          "value1.value2.value3.value4.value5",
        ],
        expected: {
          value1: {
            value2: {
              value3: {
                value4: {
                  value5: {},
                },
              },
            },
          },
        },
      },
      {
        name: "Один ключ",
        args: [
          "only",
        ],
        expected: {
          only: {},
        },
      },
      {
        name: "Два ключа",
        args: [
          "x.y",
        ],
        expected: {
          x: {
            y: {},
          },
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Разница в возрасте (Difference in Ages)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "differenceInAges",
    description: {
      condition: "Напишите функцию `differenceInAges`, которая принимает массив возрастов и возвращает массив из трёх чисел: самого младшего возраста, самого старшего возраста и разницы между ними (старший - младший).\n\nПравила:\n\nМассив всегда содержит хотя бы один элемент\n\nВозраста — целые неотрицательные числа\n\nВозвращается массив в формате [min, max, difference]\n\nРазница вычисляется как max - min",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 1 ≤ N ≤ 1000",
        "Возраста: 0 ≤ age ≤ 200",
        "Время выполнения: O(N)",
        "Память: O(1)",
      ],
      example: "differenceInAges([82, 15, 6, 38, 35])  // -> [6, 82, 76]\ndifferenceInAges([57, 99, 14, 32])     // -> [14, 99, 85]\ndifferenceInAges([25])                 // -> [25, 25, 0]\ndifferenceInAges([10, 10, 10])         // -> [10, 10, 0]",
    },
    starterCode: "function differenceInAges(ages) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "[82, 15, 6, 38, 35]",
        args: [
          [
            82,
            15,
            6,
            38,
            35,
          ],
        ],
        expected: [
          6,
          82,
          76,
        ],
      },
      {
        name: "[57, 99, 14, 32]",
        args: [
          [
            57,
            99,
            14,
            32,
          ],
        ],
        expected: [
          14,
          99,
          85,
        ],
      },
      {
        name: "Один элемент",
        args: [
          [
            25,
          ],
        ],
        expected: [
          25,
          25,
          0,
        ],
      },
      {
        name: "Все возрасты равны",
        args: [
          [
            10,
            10,
            10,
          ],
        ],
        expected: [
          10,
          10,
          0,
        ],
        hidden: true,
      },
      {
        name: "Минимум и максимум не на краях",
        args: [
          [
            50,
            1,
            99,
            50,
          ],
        ],
        expected: [
          1,
          99,
          98,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Доминантные элементы массива (Dominant Elements)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "solve",
    description: {
      condition: "Напишите функцию `solve`, которая принимает массив чисел и возвращает массив из доминантных элементов. Доминантным является элемент массива, который больше, чем все элементы, следующие за ним.\n\nПравила:\n\nЭлемент считается доминантным, если он больше всех элементов справа от него\n\nПоследний элемент всегда доминантный (справа от него нет элементов)\n\nПорядок элементов в результате должен соответствовать порядку в исходном массиве",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 1 ≤ N ≤ 1000",
        "Элементы: целые числа",
        "Время выполнения: O(N)",
        "Память: O(N)",
      ],
      example: "solve([16, 17, 14, 3, 14, 5, 2])  // -> [17, 14, 5, 2]\nsolve([92, 52, 93, 31, 89, 87, 77, 105])  // -> [105]\nsolve([75, 47, 42, 56, 13, 55])  // -> [75, 56, 55]",
    },
    starterCode: "function solve(array) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "[16, 17, 14, 3, 14, 5, 2]",
        args: [
          [
            16,
            17,
            14,
            3,
            14,
            5,
            2,
          ],
        ],
        expected: [
          17,
          14,
          5,
          2,
        ],
      },
      {
        name: "Максимум в конце — один доминантный",
        args: [
          [
            92,
            52,
            93,
            31,
            89,
            87,
            77,
            105,
          ],
        ],
        expected: [
          105,
        ],
      },
      {
        name: "[75, 47, 42, 56, 13, 55]",
        args: [
          [
            75,
            47,
            42,
            56,
            13,
            55,
          ],
        ],
        expected: [
          75,
          56,
          55,
        ],
      },
      {
        name: "Один элемент",
        args: [
          [
            3,
          ],
        ],
        expected: [
          3,
        ],
        hidden: true,
      },
      {
        name: "Строго убывающий массив — все доминантные",
        args: [
          [
            5,
            4,
            3,
          ],
        ],
        expected: [
          5,
          4,
          3,
        ],
        hidden: true,
      },
      {
        name: "Равные элементы не доминантны",
        args: [
          [
            2,
            2,
          ],
        ],
        expected: [
          2,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Обогащение постов данными пользователей и количеством комментариев (Enrich Posts with Author and Comment Count)",
    difficulty: 3,
    categories: [
      "Objects",
      "Grouping",
      "Aggregation",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "enrichPosts",
    description: {
      condition: "Даны три массива: посты, пользователи и комментарии. Каждый пост содержит `id`, `title` и `userId` — идентификатор автора. Каждый пользователь содержит `id` и `name`. Каждый комментарий содержит `postId`, указывающий, к какому посту он относится.\n\nНапишите функцию, которая для каждого поста возвращает объект с полями:\n\n`id` — id поста\n\n`title` — заголовок поста\n\n`userName` — имя пользователя, полученное по `userId` из массива пользователей\n\n`commentsCount` — количество комментариев с соответствующим `postId`\n\nПорядок постов в результате должен совпадать с порядком во входном массиве постов.",
      input: [
        "`posts` — массив объектов `{ id, title, userId }`",
        "`users` — массив объектов `{ id, name }`",
        "`comments` — массив объектов `{ postId, ... }`",
      ],
      output: "Массив объектов `{ id, title, userName, commentsCount }`",
      constraints: [
        "`posts.length ≤ 1000`",
        "`users.length ≤ 1000`",
        "`comments.length ≤ 10000`",
        "если пользователь не найден по `userId` — `userName = \"Unknown\"`",
      ],
      example: "Вход:\nposts = [{ id: 1, title: \"Hello\", userId: 1 }]\nusers = [{ id: 1, name: \"Leanne Graham\" }]\ncomments = [{ postId: 1 }, { postId: 1 }]\n\nВыход:\n[{ id: 1, title: \"Hello\", userName: \"Leanne Graham\", commentsCount: 2 }]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction enrichPosts(posts, users, comments) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Один пост с двумя комментариями",
        args: [
          [
            {
              id: 1,
              title: "Hello",
              userId: 1,
            },
          ],
          [
            {
              id: 1,
              name: "Leanne Graham",
            },
          ],
          [
            {
              postId: 1,
            },
            {
              postId: 1,
            },
          ],
        ],
        expected: [
          {
            id: 1,
            title: "Hello",
            userName: "Leanne Graham",
            commentsCount: 2,
          },
        ],
      },
      {
        name: "Комментарии считаются по своему посту",
        args: [
          [
            {
              id: 1,
              title: "A",
              userId: 1,
            },
            {
              id: 2,
              title: "B",
              userId: 2,
            },
          ],
          [
            {
              id: 1,
              name: "Ann",
            },
            {
              id: 2,
              name: "Bob",
            },
          ],
          [
            {
              postId: 2,
            },
            {
              postId: 1,
            },
            {
              postId: 2,
            },
          ],
        ],
        expected: [
          {
            id: 1,
            title: "A",
            userName: "Ann",
            commentsCount: 1,
          },
          {
            id: 2,
            title: "B",
            userName: "Bob",
            commentsCount: 2,
          },
        ],
      },
      {
        name: "Постов нет",
        args: [
          [],
          [
            {
              id: 1,
              name: "Ann",
            },
          ],
          [],
        ],
        expected: [],
      },
      {
        name: "Пост без комментариев",
        args: [
          [
            {
              id: 5,
              title: "Quiet",
              userId: 1,
            },
          ],
          [
            {
              id: 1,
              name: "Ann",
            },
          ],
          [
            {
              postId: 9,
            },
          ],
        ],
        expected: [
          {
            id: 5,
            title: "Quiet",
            userName: "Ann",
            commentsCount: 0,
          },
        ],
        hidden: true,
      },
      {
        name: "Порядок постов сохраняется",
        args: [
          [
            {
              id: 2,
              title: "Second",
              userId: 1,
            },
            {
              id: 1,
              title: "First",
              userId: 1,
            },
          ],
          [
            {
              id: 1,
              name: "Ann",
            },
          ],
          [],
        ],
        expected: [
          {
            id: 2,
            title: "Second",
            userName: "Ann",
            commentsCount: 0,
          },
          {
            id: 1,
            title: "First",
            userName: "Ann",
            commentsCount: 0,
          },
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "EventEmitter с отпиской через замыкание и строгой проверкой подписчиков (EventEmitter with Unsubscribe Closure)",
    difficulty: 3,
    categories: [
      "Patterns",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "EventEmitter",
    description: {
      condition: "Реализуйте класс `EventEmitter` с методами `on` и `emit`. В отличие от классического EventEmitter с методом `off`, в этой реализации отдельного метода отписки нет — отписка выполняется через функцию, которую возвращает сам `on`.\n\nМетод `on(eventName, callback)`:\n\nрегистрирует `callback` как слушателя события `eventName`;\n\nвозвращает функцию без аргументов — при её вызове именно этот `callback` удаляется из списка слушателей данного события (и только он, если тот же обработчик был подписан на событие несколько раз).\n\nМетод `emit(eventName, payload)`:\n\nвызывает все обработчики, подписанные на `eventName`, передавая им `payload`, в порядке подписки;\n\nесли на момент вызова у события нет ни одного подписанного слушателя, метод обязан выбросить исключение (это ключевое отличие от реализаций, которые в этом случае просто ничего не делают).",
      input: [
        "Последовательность операций: подписка через `on` (с сохранением возвращённой функции-отписки), вызов через `emit`, отписка вызовом сохранённой функции.",
      ],
      output: "Список вызовов обработчиков (какой обработчик и с каким `payload` был вызван) либо факт выброшенного исключения при `emit` без подписчиков.",
      constraints: [
        "Имя события — непустая строка.",
        "Подписчиков на одно событие: от 0 до 20.",
        "Операций (on/emit/вызов отписки) в одном тесте: не более 50.",
        "`payload` — произвольное сериализуемое значение или отсутствует.",
      ],
      example: "Вход:\nunsubscribe1 = on(\"event\", cb1)\nemit(\"event\", \"hello\")       → cb1 вызван с \"hello\"\nunsubscribe1()\nemit(\"event\", \"hello2\")      → нет подписчиков → исключение\n\nВход:\non(\"event\", cb1)\non(\"event\", cb1)             // тот же callback дважды\nunsubscribe = ...             // отписка от первого\nemit(\"event\", \"x\")           → cb1 вызван один раз (второй остался)",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nclass EventEmitter {\n  constructor() {\n    // TODO: напишите решение здесь\n  }\n\n  on(eventName, callback) {\n    // TODO: напишите решение здесь\n    // Должна вернуться функция без аргументов - отписка именно этого callback\n    return function() {};\n  }\n\n  emit(eventName, payload) {\n    // TODO: напишите решение здесь\n    // Если у eventName нет активных подписчиков - выбросить исключение\n  }\n}\n",
    tests: [
      {
        name: "on возвращает функцию отписки",
        body: "const e = new solution();\nconst calls = [];\nconst unsubscribe = e.on(\"event\", (p) => calls.push(p));\ne.emit(\"event\", \"hello\");\nunsubscribe();\ntry {\n  e.emit(\"event\", \"hello2\");\n  return [calls, \"no error\"];\n} catch {\n  return [calls, \"threw\"];\n}",
        expected: [
          [
            "hello",
          ],
          "threw",
        ],
      },
      {
        name: "Отписка снимает только одну из двух одинаковых подписок",
        body: "const e = new solution();\nlet count = 0;\nconst cb = () => count++;\nconst off = e.on(\"event\", cb);\ne.on(\"event\", cb);\noff();\ne.emit(\"event\", \"x\");\nreturn count;",
        expected: 1,
      },
      {
        name: "emit без подписчиков выбрасывает исключение",
        body: "const e = new solution();\ntry {\n  e.emit(\"nothing\", 1);\n  return \"no error\";\n} catch {\n  return \"threw\";\n}",
        expected: "threw",
      },
      {
        name: "Обработчики вызываются в порядке подписки",
        body: "const e = new solution();\nconst calls = [];\ne.on(\"x\", () => calls.push(\"first\"));\ne.on(\"x\", () => calls.push(\"second\"));\ne.emit(\"x\");\nreturn calls;",
        expected: [
          "first",
          "second",
        ],
        hidden: true,
      },
      {
        name: "Повторная отписка безопасна",
        body: "const e = new solution();\nconst off = e.on(\"x\", () => {});\ne.on(\"x\", () => {});\noff();\noff();\ntry {\n  e.emit(\"x\");\n  return \"ok\";\n} catch {\n  return \"threw\";\n}",
        expected: "ok",
        hidden: true,
      },
    ],
  },
  {
    title: "Fetch с повторными попытками (fetchWithRetry)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "fetchWithRetry",
    description: {
      condition: "Реализуйте функцию `fetchWithRetry(url, options, retries)`, которая отправляет HTTP-запрос с помощью `fetch` и автоматически повторяет его при неудаче.\n\nФункция должна соблюдать следующие правила:\n\nЕсли запрос завершился успешно (статус `response.ok === true`), вернуть объект `response`.\n\nЕсли ответ пришёл со статусом `401` (Unauthorized) или `403` (Forbidden) — немедленно вернуть reject с ошибкой, не делая повторных попыток.\n\nЕсли метод запроса — `PUT` — повторные попытки не разрешены: максимум 1 попытка (т.е. `retries` принудительно устанавливается в `1`).\n\nЕсли все попытки исчерпаны и ни одна не удалась — вернуть reject с последней ошибкой.\n\nВ остальных случаях — повторять запрос, пока не закончатся попытки.",
      input: [
        "`url` (string) — адрес запроса",
        "`options` (object) — параметры fetch: `{ method, headers, body, ... }`",
        "`retries` (number) — максимальное количество попыток (≥ 1)",
      ],
      output: "Promise, который resolves с объектом Response при успехе, или rejects с объектом Error при неудаче.",
      constraints: [
        "`1 ≤ retries ≤ 10`",
        "`options.method` — одно из `\"GET\"`, `\"POST\"`, `\"PUT\"`, `\"DELETE\"`",
        "Без задержки между попытками (для простоты)",
        "Среда: Node.js / браузер с поддержкой `fetch`",
      ],
      example: "Вход: url = \"https://api.example.com/data\", options = { method: \"GET\" }, retries = 3\n// Сервер дважды отвечает 500, третий раз — 200\nВыход: Promise<Response> (resolved, статус 200)\nВход: url = \"...\", options = { method: \"GET\" }, retries = 3\n// Сервер отвечает 401\nВыход: Promise<Error> (rejected немедленно, без повторов)\nВход: url = \"...\", options = { method: \"PUT\" }, retries = 5\n// retries принудительно = 1, одна попытка\nВыход: Promise<Response> или Promise<Error> (только 1 попытка)\n\nТест будет использовать mock-реализацию fetch, симулирующую разные сценарии.",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nasync function fetchWithRetry(url, options, retries) {\n  // TODO: напишите решение здесь\n}\n",
    tests: [
      {
        name: "Повторяет запрос до успеха",
        body: "let calls = 0;\nglobalThis.fetch = async () => {\n  calls++;\n  return calls < 3 ? { ok: false, status: 500 } : { ok: true, status: 200 };\n};\nconst response = await solution(\"/data\", { method: \"GET\" }, 3);\nreturn [response.status, calls];",
        expected: [
          200,
          3,
        ],
      },
      {
        name: "401 — реджект без повторов",
        body: "let calls = 0;\nglobalThis.fetch = async () => { calls++; return { ok: false, status: 401 }; };\ntry {\n  await solution(\"/data\", { method: \"GET\" }, 3);\n  return [\"resolved\", calls];\n} catch {\n  return [\"rejected\", calls];\n}",
        expected: [
          "rejected",
          1,
        ],
      },
      {
        name: "PUT выполняется ровно один раз",
        body: "let calls = 0;\nglobalThis.fetch = async () => { calls++; return { ok: false, status: 500 }; };\ntry {\n  await solution(\"/data\", { method: \"PUT\" }, 5);\n} catch {}\nreturn calls;",
        expected: 1,
      },
      {
        name: "403 тоже не повторяется",
        body: "let calls = 0;\nglobalThis.fetch = async () => { calls++; return { ok: false, status: 403 }; };\ntry {\n  await solution(\"/data\", { method: \"GET\" }, 4);\n  return [\"resolved\", calls];\n} catch {\n  return [\"rejected\", calls];\n}",
        expected: [
          "rejected",
          1,
        ],
        hidden: true,
      },
      {
        name: "Все попытки исчерпаны — реджект",
        body: "let calls = 0;\nglobalThis.fetch = async () => { calls++; return { ok: false, status: 500 }; };\ntry {\n  await solution(\"/data\", { method: \"GET\" }, 3);\n  return [\"resolved\", calls];\n} catch {\n  return [\"rejected\", calls];\n}",
        expected: [
          "rejected",
          3,
        ],
        hidden: true,
      },
      {
        name: "Успех с первой попытки",
        body: "let calls = 0;\nglobalThis.fetch = async () => { calls++; return { ok: true, status: 200 }; };\nconst response = await solution(\"/data\", { method: \"GET\" }, 3);\nreturn [response.ok, calls];",
        expected: [
          true,
          1,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Заполнение матрицы по спирали (Fill Matrix in Spiral Order)",
    difficulty: 3,
    categories: [
      "Matrices",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "fillMatrixSpiral",
    description: {
      condition: "Напишите функцию, которая принимает ширину и высоту матрицы и возвращает двумерный массив, заполненный числами по спирали — по возрастанию, начиная с 1, двигаясь сначала вправо, затем вниз, затем влево, затем вверх, и так далее по кругу к центру.",
      input: [
        "`width` — количество столбцов",
        "`height` — количество строк",
      ],
      output: "Матрица (массив массивов) размером `height x width`, заполненная числами от 1 до `width * height` по спирали",
      constraints: [
        "`0 <= width, height <= 100`",
        "Если `width` или `height` равны 0 — вернуть пустой массив",
      ],
      example: "Вход: width = 3, height = 3\nВыход:\n[\n  [1, 2, 3],\n  [8, 9, 4],\n  [7, 6, 5]\n]\n\nВход: width = 4, height = 3\nВыход:\n[\n  [1, 2, 3, 4],\n  [10, 11, 12, 5],\n  [9, 8, 7, 6]\n]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction fillMatrixSpiral(width, height) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "3 x 3",
        args: [
          3,
          3,
        ],
        expected: [
          [
            1,
            2,
            3,
          ],
          [
            8,
            9,
            4,
          ],
          [
            7,
            6,
            5,
          ],
        ],
      },
      {
        name: "4 x 3",
        args: [
          4,
          3,
        ],
        expected: [
          [
            1,
            2,
            3,
            4,
          ],
          [
            10,
            11,
            12,
            5,
          ],
          [
            9,
            8,
            7,
            6,
          ],
        ],
      },
      {
        name: "1 x 1",
        args: [
          1,
          1,
        ],
        expected: [
          [
            1,
          ],
        ],
      },
      {
        name: "Одна строка",
        args: [
          4,
          1,
        ],
        expected: [
          [
            1,
            2,
            3,
            4,
          ],
        ],
        hidden: true,
      },
      {
        name: "Один столбец",
        args: [
          1,
          4,
        ],
        expected: [
          [
            1,
          ],
          [
            2,
          ],
          [
            3,
          ],
          [
            4,
          ],
        ],
        hidden: true,
      },
      {
        name: "2 x 4",
        args: [
          2,
          4,
        ],
        expected: [
          [
            1,
            2,
          ],
          [
            8,
            3,
          ],
          [
            7,
            4,
          ],
          [
            6,
            5,
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Заполнение матрицы змейкой по столбцам (Fill Matrix Snake by Columns)",
    difficulty: 3,
    categories: [
      "Matrices",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "fillMatrixSnake",
    description: {
      condition: "Дан одномерный массив чисел и размеры матрицы (количество строк `rows` и столбцов `cols`). Нужно заполнить матрицу элементами массива по столбцам змейкой: первый столбец заполняется сверху вниз, второй — снизу вверх, третий — снова сверху вниз, и так далее (чередование направления в каждом следующем столбце). Если `rows * cols` не равно длине массива, нужно выбросить ошибку.",
      input: [
        "`nums` — массив целых чисел",
        "`rows` — количество строк матрицы",
        "`cols` — количество столбцов матрицы",
      ],
      output: "Матрица (массив массивов) размером `rows x cols`, заполненная по описанному правилу",
      constraints: [
        "`0 <= nums.length <= 10^4`",
        "`1 <= rows, cols <= 100` (при непустом массиве)",
        "Если `rows * cols != nums.length` — выбросить ошибку (исключение)",
      ],
      example: "Вход: nums = [1, 2, 3, 4, 5, 6], rows = 3, cols = 2\nСтолбец 0 (сверху вниз): 1, 2, 3\nСтолбец 1 (снизу вверх): 4, 5, 6 → в столбец идут как 6, 5, 4 сверху вниз\nВыход:\n[\n  [1, 6],\n  [2, 5],\n  [3, 4]\n]\n\nВход: nums = [1, 2, 3], rows = 2, cols = 2\nВыход: ошибка (2*2=4 ≠ 3)",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction fillMatrixSnake(nums, rows, cols) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "3 x 2 змейкой",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
            6,
          ],
          3,
          2,
        ],
        expected: [
          [
            1,
            6,
          ],
          [
            2,
            5,
          ],
          [
            3,
            4,
          ],
        ],
      },
      {
        name: "Несовпадение размеров — ошибка",
        body: "try {\n  solution([1, 2, 3], 2, 2);\n  return \"no error\";\n} catch {\n  return \"threw\";\n}",
        expected: "threw",
      },
      {
        name: "Один столбец",
        args: [
          [
            1,
            2,
            3,
          ],
          3,
          1,
        ],
        expected: [
          [
            1,
          ],
          [
            2,
          ],
          [
            3,
          ],
        ],
      },
      {
        name: "Третий столбец снова сверху вниз",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
            6,
          ],
          2,
          3,
        ],
        expected: [
          [
            1,
            4,
            5,
          ],
          [
            2,
            3,
            6,
          ],
        ],
        hidden: true,
      },
      {
        name: "Одна строка",
        args: [
          [
            1,
            2,
            3,
          ],
          1,
          3,
        ],
        expected: [
          [
            1,
            2,
            3,
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Фильтрация числовых значений из массива объектов (Filter Numeric Values From Objects)",
    difficulty: 1,
    categories: [
      "Arrays",
      "Objects",
      "Filtering",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "filterNumericValues",
    description: {
      condition: "Дан массив объектов, каждый из которых содержит поле `value`. Значение этого поля может быть числом или строкой. Напишите функцию, которая возвращает новый массив, содержащий только числовые значения поля `value` (строковые значения отбрасываются, даже если строка визуально похожа на число, например `\"42\"`). Порядок значений в результате должен совпадать с порядком объектов в исходном массиве.",
      input: [
        "`items` — массив объектов вида `{ value: number | string }` (длина от 0 до 10⁴)",
      ],
      output: "Массив чисел — значения поля `value`, у которых тип действительно `number` (строки, даже числоподобные, исключаются).",
      constraints: [
        "`0 <= items.length <= 10000`",
        "`value` может быть числом (включая отрицательные и дробные) или строкой",
        "Другие типы (`null`, `boolean`, `undefined`, объекты) в поле `value` не встречаются",
      ],
      example: "Вход: [{value: 1}, {value: \"2\"}, {value: 3.5}, {value: \"abc\"}]\nВыход: [1, 3.5]\n\nВход: [{value: \"10\"}, {value: \"20\"}]\nВыход: []\n\nВход: []\nВыход: []",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction filterNumericValues(items) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Строки отбрасываются",
        args: [
          [
            {
              value: 1,
            },
            {
              value: "2",
            },
            {
              value: 3.5,
            },
            {
              value: "abc",
            },
          ],
        ],
        expected: [
          1,
          3.5,
        ],
      },
      {
        name: "Только строки",
        args: [
          [
            {
              value: "10",
            },
            {
              value: "20",
            },
          ],
        ],
        expected: [],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Порядок сохраняется",
        args: [
          [
            {
              value: 3,
            },
            {
              value: "x",
            },
            {
              value: 1,
            },
            {
              value: 2,
            },
          ],
        ],
        expected: [
          3,
          1,
          2,
        ],
        hidden: true,
      },
      {
        name: "Ноль и отрицательные числа остаются",
        args: [
          [
            {
              value: 0,
            },
            {
              value: -5,
            },
          ],
        ],
        expected: [
          0,
          -5,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Поиск анаграмм в строке (Find All Anagrams)",
    difficulty: 3,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findAnagrams",
    description: {
      condition: "Напишите функцию `findAnagrams`, которая принимает строку `str` и подстроку `substr`, и возвращает массив индексов начала всех вхождений анаграмм подстроки `substr` в строке `str`. Анаграмма — это перестановка символов исходной строки.",
      input: [],
      output: "",
      constraints: [
        "Строка `str` может быть любой длины (до 10^5 символов)",
        "Подстрока `substr` может быть любой длины (до 10^4 символов)",
        "Если длина `substr` больше длины `str`, возвращается пустой массив",
        "Регистр символов учитывается (анаграммы чувствительны к регистру)",
        "Индексы в возвращаемом массиве должны быть в порядке возрастания",
      ],
      example: "Вход: (\"cbaebabacd\", \"abc\")\nВыход: [0, 6]\nПояснение: Анаграммы \"abc\" начинаются с индекса 0 (\"cba\") и индекса 6 (\"bac\")\n\nВход: (\"abab\", \"ab\")\nВыход: [0, 1, 2]\nПояснение: Анаграммы \"ab\" начинаются с индексов 0 (\"ab\"), 1 (\"ba\") и 2 (\"ab\")\n\nВход: (\"aaaa\", \"aa\")\nВыход: [0, 1, 2]\nПояснение: Анаграммы \"aa\" начинаются с индексов 0, 1, 2\n\nВход: (\"hello\", \"world\")\nВыход: []\nПояснение: Нет анаграмм \"world\" в строке \"hello\"",
    },
    starterCode: "function findAnagrams(str, substr) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "(\"cbaebabacd\", \"abc\")",
        args: [
          "cbaebabacd",
          "abc",
        ],
        expected: [
          0,
          6,
        ],
      },
      {
        name: "(\"abab\", \"ab\")",
        args: [
          "abab",
          "ab",
        ],
        expected: [
          0,
          1,
          2,
        ],
      },
      {
        name: "(\"aaaa\", \"aa\")",
        args: [
          "aaaa",
          "aa",
        ],
        expected: [
          0,
          1,
          2,
        ],
      },
      {
        name: "Анаграмм нет",
        args: [
          "hello",
          "world",
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Подстрока длиннее строки",
        args: [
          "ab",
          "abc",
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Совпадение в самом конце",
        args: [
          "xxab",
          "ba",
        ],
        expected: [
          2,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Определение чемпионов по шагам (Find Champions by Steps)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findChampions",
    description: {
      condition: "Напишите функцию `findChampions(statistics)`, которая принимает массив ежедневных данных о шагах участников соревнования.\n\nКаждый элемент массива представляет собой массив объектов с информацией об участниках:`userId` — идентификатор участника (число)\n\n`steps` — количество шагов за день (число)\n\nФункция должна вернуть объект с двумя полями:\n\n`userIds` — массив идентификаторов участников, которые прошли наибольшее количество шагов и не пропустили ни одного дня соревнования\n\n`steps` — общее количество шагов этих участников\n\nПравила:\n\nУчастник считается пропустившим день, если в этом дне отсутствует его запись.\n\nЕсли несколько участников набрали одинаковое максимальное количество шагов, все их идентификаторы должны присутствовать в массиве `userIds`.\n\nПримеры ввода и ожидаемого вывода:",
      input: [],
      output: "",
      constraints: [],
      example: "statistics1 = [\n  [{ userId: 1, steps: 1000 }, { userId: 2, steps: 1500 }],\n  [{ userId: 2, steps: 1000 }]\n]\n-> { userIds: [2], steps: 2500 }\n\nstatistics2 = [\n  [{ userId: 1, steps: 2000 }, { userId: 2, steps: 1500 }],\n  [{ userId: 2, steps: 4000 }, { userId: 1, steps: 3500 }]\n]\n-> { userIds: [1, 2], steps: 5500 }\n\nstatistics3 = [\n  [{ userId: 1, steps: 1000 }],\n  [{ userId: 2, steps: 2000 }]\n]\n-> { userIds: [], steps: 0 }  // никто не прошел все дни",
    },
    starterCode: "function findChampions(statistics) {\n    // TODO: write your solution here\n    return { userIds: [], steps: 0 };\n}\n",
    tests: [
      {
        name: "Пропустивший день не считается",
        args: [
          [
            [
              {
                userId: 1,
                steps: 1000,
              },
              {
                userId: 2,
                steps: 1500,
              },
            ],
            [
              {
                userId: 2,
                steps: 1000,
              },
            ],
          ],
        ],
        expected: {
          userIds: [
            2,
          ],
          steps: 2500,
        },
      },
      {
        name: "Ничья — оба чемпиона",
        args: [
          [
            [
              {
                userId: 1,
                steps: 2000,
              },
              {
                userId: 2,
                steps: 1500,
              },
            ],
            [
              {
                userId: 2,
                steps: 4000,
              },
              {
                userId: 1,
                steps: 3500,
              },
            ],
          ],
        ],
        expected: {
          userIds: [
            1,
            2,
          ],
          steps: 5500,
        },
      },
      {
        name: "Все пропустили хотя бы день",
        args: [
          [
            [
              {
                userId: 1,
                steps: 1000,
              },
            ],
            [
              {
                userId: 2,
                steps: 2000,
              },
            ],
          ],
        ],
        expected: {
          userIds: [],
          steps: 0,
        },
      },
      {
        name: "Один день соревнований",
        args: [
          [
            [
              {
                userId: 3,
                steps: 10,
              },
              {
                userId: 4,
                steps: 20,
              },
            ],
          ],
        ],
        expected: {
          userIds: [
            4,
          ],
          steps: 20,
        },
        hidden: true,
      },
      {
        name: "Пустая статистика",
        args: [
          [],
        ],
        expected: {
          userIds: [],
          steps: 0,
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Поиск дубликатов в массиве (Find Duplicates)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "existsDuplicate",
    description: {
      condition: "Напишите функцию `existsDuplicate`, которая принимает массив целых чисел и возвращает `true`, если какое-либо значение появляется в массиве не менее двух раз, и `false`, если каждый элемент уникален.\n\nПравила:\n\nМассив содержит целые числа\n\nФункция должна вернуть `true` при наличии хотя бы одного дубликата\n\nЕсли все элементы уникальны, возвращается `false`\n\nПустой массив считается не содержащим дубликатов",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 0 ≤ N ≤ 1000",
        "Элементы: целые числа",
        "Время выполнения: O(N)",
        "Память: O(N)",
      ],
      example: "existsDuplicate([4, 6, 7, 7, 1])     // -> true\nexistsDuplicate([7, 1, 5, 4, 2, 10]) // -> false\nexistsDuplicate([1, 2, 3, 1])         // -> true\nexistsDuplicate([])                   // -> false",
    },
    starterCode: "function existsDuplicate(numbers) {\n    // TODO: write your solution here\n    return false;\n}\n",
    tests: [
      {
        name: "Есть дубликат",
        args: [
          [
            4,
            6,
            7,
            7,
            1,
          ],
        ],
        expected: true,
      },
      {
        name: "Все элементы уникальны",
        args: [
          [
            7,
            1,
            5,
            4,
            2,
            10,
          ],
        ],
        expected: false,
      },
      {
        name: "Дубликаты не рядом",
        args: [
          [
            1,
            2,
            3,
            1,
          ],
        ],
        expected: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Один элемент",
        args: [
          [
            5,
          ],
        ],
        expected: false,
        hidden: true,
      },
    ],
  },
  {
    title: "Повторяющиеся элементы (Find Duplicates)",
    difficulty: 3,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findDuplicates",
    description: {
      condition: "Дан слайс строк. Верни слайс строк, которые встречаются в исходном слайсе более одного раза. Порядок элементов в результате — в порядке первого появления в исходном слайсе.",
      input: [
        "`[]string` — слайс строк",
      ],
      output: "`[]string` — строки, встречающиеся более одного раза, в порядке первого появления",
      constraints: [
        "`0 <= len(input) <= 10^4`",
        "Каждая строка состоит из латинских букв, длина строки `1..50`",
      ],
      example: "Вход:  [\"a\", \"bb\", \"bb\", \"aa\", \"a\", \"a\"]\nВыход: [\"a\", \"bb\"]",
    },
    starterCode: "function findDuplicates(items) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Порядок первого появления",
        args: [
          [
            "a",
            "bb",
            "bb",
            "aa",
            "a",
            "a",
          ],
        ],
        expected: [
          "a",
          "bb",
        ],
      },
      {
        name: "Дубликатов нет",
        args: [
          [
            "a",
            "b",
            "c",
          ],
        ],
        expected: [],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Элемент встречается трижды — в результате один раз",
        args: [
          [
            "x",
            "x",
            "x",
          ],
        ],
        expected: [
          "x",
        ],
        hidden: true,
      },
      {
        name: "Несколько групп дубликатов",
        args: [
          [
            "b",
            "a",
            "b",
            "c",
            "a",
          ],
        ],
        expected: [
          "b",
          "a",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Поиск комбинаций чисел (Find Number Combinations)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findCombinations",
    description: {
      condition: "Напишите функцию `findCombinations`, которая принимает массив целых чисел и целевое число. Функция должна найти все уникальные комбинации чисел из массива, сумма которых равна целевому числу.\n\nВажные условия:\n\nКаждое число может использоваться в комбинации только один раз\n\nКомбинации должны быть уникальными (порядок чисел не важен)\n\nВ результате комбинации должны быть отсортированы по возрастанию\n\nИтоговый массив комбинаций должен быть отсортирован по первому элементу, затем по второму и т.д.",
      input: [],
      output: "",
      constraints: [
        "Массив может содержать дубликаты чисел",
        "Длина массива: от 1 до 20 элементов",
        "Значения чисел: от -100 до 100",
        "Целевое число: от -1000 до 1000",
        "Время выполнения: не более 1 секунды",
      ],
      example: "Вход: массив = [1, 2, 3, 4, 5], целевое число = 5\nВыход: [[1,4], [2,3], [5]]\n\nВход: массив = [2, 2, 3], целевое число = 5\nВыход: [[2,3]]\n\nВход: массив = [1, 1, 1, 1], целевое число = 2\nВыход: [[1,1]]\n\nВход: массив = [1, 2, 3], целевое число = 7\nВыход: []",
    },
    starterCode: "function findCombinations(arr, target) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "[1,2,3,4,5], target 5",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
          ],
          5,
        ],
        expected: [
          [
            1,
            4,
          ],
          [
            2,
            3,
          ],
          [
            5,
          ],
        ],
      },
      {
        name: "Дубликаты во входе",
        args: [
          [
            2,
            2,
            3,
          ],
          5,
        ],
        expected: [
          [
            2,
            3,
          ],
        ],
      },
      {
        name: "Одинаковые числа",
        args: [
          [
            1,
            1,
            1,
            1,
          ],
          2,
        ],
        expected: [
          [
            1,
            1,
          ],
        ],
      },
      {
        name: "Комбинаций нет",
        args: [
          [
            1,
            2,
            3,
          ],
          7,
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Числа больше target не мешают",
        args: [
          [
            9,
            1,
            2,
          ],
          3,
        ],
        expected: [
          [
            1,
            2,
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Найти лишний символ (Find the Difference)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findTheDifference",
    description: {
      condition: "Даны две строки `s` и `t`.\n\nСтрока `t` получена перемешиванием символов строки `s` и добавлением одного лишнего символа.\n\nНужно найти этот лишний символ.\n\nАлгоритм должен работать за O(n).",
      input: [
        "s, t",
        "Где:",
        "len(t) - len(s) == 1",
      ],
      output: "Нужно вернуть символ, который есть в строке `t`, но является добавленным лишним символом.",
      constraints: [
        "0 <= s.length <= 100000",
        "t.length == s.length + 1",
        "s и t состоят из строчных английских букв",
      ],
      example: "Вход: s = \"abcd\", t = \"abcde\"\nВыход: \"e\"",
    },
    starterCode: "function findTheDifference(s, t) {\n  // TODO: напишите решение здесь\n  return \"\";\n}\n",
    tests: [
      {
        name: "\"abcd\" → \"abcde\"",
        args: [
          "abcd",
          "abcde",
        ],
        expected: "e",
      },
      {
        name: "Лишний символ в начале",
        args: [
          "abc",
          "xabc",
        ],
        expected: "x",
      },
      {
        name: "Пустая s",
        args: [
          "",
          "q",
        ],
        expected: "q",
      },
      {
        name: "Символы перемешаны, лишний в середине",
        args: [
          "abcd",
          "dbzac",
        ],
        expected: "z",
        hidden: true,
      },
      {
        name: "Лишний символ — повтор существующего",
        args: [
          "aab",
          "aaab",
        ],
        expected: "a",
        hidden: true,
      },
    ],
  },
  {
    title: "Минимальное отсутствующее положительное число (First Missing Positive)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "firstMissingPositive",
    description: {
      condition: "Дан неотсортированный массив целых чисел `nums`.\n\nНужно найти минимальное положительное число, которого нет в массиве.\n\nПоложительными считаются только числа больше 0. Число `0` положительным не считается.",
      input: [
        "`nums` — массив целых чисел (может быть пустым)",
      ],
      output: "Целое число — минимальное положительное число, отсутствующее в массиве",
      constraints: [
        "`0 <= nums.length <= 10^5`",
        "Числа могут быть отрицательными и повторяться",
      ],
      example: "Вход: [1, 2, 0]\nВыход: 3\n\nВход: [3, 4, -1, 1]\nВыход: 2\n\nВход: [7, 8, 9]\nВыход: 1",
    },
    starterCode: "function firstMissingPositive(nums) {\n  // TODO: напишите решение здесь\n  return 1;\n}\n",
    tests: [
      {
        name: "[1, 2, 0]",
        args: [
          [
            1,
            2,
            0,
          ],
        ],
        expected: 3,
      },
      {
        name: "[3, 4, -1, 1]",
        args: [
          [
            3,
            4,
            -1,
            1,
          ],
        ],
        expected: 2,
      },
      {
        name: "[7, 8, 9]",
        args: [
          [
            7,
            8,
            9,
          ],
        ],
        expected: 1,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Дубликаты",
        args: [
          [
            1,
            1,
            2,
            2,
          ],
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "Только отрицательные",
        args: [
          [
            -3,
            -1,
          ],
        ],
        expected: 1,
        hidden: true,
      },
    ],
  },
  {
    title: "Первый уникальный элемент (First Unique Element)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "firstUniqueElement",
    description: {
      condition: "Дан массив целых чисел `nums`.\n\nНужно найти первый элемент, который встречается в массиве ровно один раз.\n\nПорядок важен: нужно вернуть именно тот уникальный элемент, который расположен раньше всех в исходном массиве.\n\nЕсли в массиве нет уникальных элементов, нужно вернуть `-1`.",
      input: [
        "Массив целых чисел:",
        "nums",
      ],
      output: "Целое число — первый неповторяющийся элемент массива.\nЕсли такого элемента нет, вернуть:\n-1",
      constraints: [
        "0 <= nums.length <= 100000",
        "-10^9 <= nums[i] <= 10^9",
      ],
      example: "Вход:\n\nnums = [9, 4, 9, 6, 7, 4, 5]\n\nВыход:\n\n6",
    },
    starterCode: "function firstUniqueElement(nums) {\n  // TODO: напишите решение здесь\n  return -1;\n}\n",
    tests: [
      {
        name: "[9, 4, 9, 6, 7, 4, 5] → 6",
        args: [
          [
            9,
            4,
            9,
            6,
            7,
            4,
            5,
          ],
        ],
        expected: 6,
      },
      {
        name: "Уникальных нет",
        args: [
          [
            1,
            1,
            2,
            2,
          ],
        ],
        expected: -1,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: -1,
      },
      {
        name: "Первый элемент уникален",
        args: [
          [
            5,
            3,
            3,
          ],
        ],
        expected: 5,
        hidden: true,
      },
      {
        name: "Уникальный элемент окружён разными числами",
        args: [
          [
            1,
            2,
            1,
            3,
            2,
            4,
            3,
          ],
        ],
        expected: 4,
        hidden: true,
      },
    ],
  },
  {
    title: "FizzBuzz",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "fizzBuzz",
    description: {
      condition: "Напишите функцию `fizzBuzz`, которая выводит числа от 1 до 100. При этом:\n\nЕсли число кратно 3, вместо числа выводится `\"Fizz\"`\n\nЕсли число кратно 5, вместо числа выводится `\"Buzz\"`\n\nЕсли число кратно и 3, и 5, вместо числа выводится `\"FizzBuzz\"`\n\nВ остальных случаях выводится само число\n\nФункция должна вернуть строку, где все результаты разделены пробелами.",
      input: [],
      output: "",
      constraints: [
        "Функция не принимает параметров (всегда от 1 до 100)",
        "Возвращает строку с пробелами между элементами",
        "В конце строки пробела нет",
      ],
      example: "Первые 15 чисел:\nВход: (функция без параметров)\nВыход: \"1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz\"\n\nКонкретные проверки:\nЧисло 3 → \"Fizz\"\nЧисло 5 → \"Buzz\"\nЧисло 15 → \"FizzBuzz\"\nЧисло 7 → \"7\"",
    },
    starterCode: "function fizzBuzz() {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Первые 15 чисел",
        body: "return solution().split(\" \").slice(0, 15).join(\" \");",
        expected: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz",
      },
      {
        name: "Ровно 100 значений",
        body: "return solution().split(\" \").length;",
        expected: 100,
      },
      {
        name: "Последнее значение — Buzz (100)",
        body: "const parts = solution().split(\" \");\nreturn parts[99];",
        expected: "Buzz",
        hidden: true,
      },
      {
        name: "Кратные 15 — FizzBuzz",
        body: "const parts = solution().split(\" \");\nreturn [parts[14], parts[29], parts[89]];",
        expected: [
          "FizzBuzz",
          "FizzBuzz",
          "FizzBuzz",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Разворачивание вложенных массивов (Flatten Array)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "unpack",
    description: {
      condition: "Напишите функцию `unpack`, которая принимает массив, содержащий элементы и вложенные массивы любой глубины, и возвращает новый одномерный массив, содержащий все элементы из исходного массива и всех вложенных массивов в том же порядке.",
      input: [],
      output: "",
      constraints: [
        "Массив может содержать числа, строки или другие массивы",
        "Глубина вложенности не ограничена",
        "Исходный массив не должен изменяться",
        "Если массив пустой, возвращается пустой массив",
      ],
      example: "Вход: [1, 2, 3, [4, 5, [6, 7]]]\nВыход: [1, 2, 3, 4, 5, 6, 7]\n\nВход: [1, [2, [3]], 4, [5, [6, 7]]]\nВыход: [1, 2, 3, 4, 5, 6, 7]\n\nВход: []\nВыход: []\n\nВход: [1, [2, 3], 4]\nВыход: [1, 2, 3, 4]",
    },
    starterCode: "function unpack(arr) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "[1, 2, 3, [4, 5, [6, 7]]]",
        args: [
          [
            1,
            2,
            3,
            [
              4,
              5,
              [
                6,
                7,
              ],
            ],
          ],
        ],
        expected: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
        ],
      },
      {
        name: "[1, [2, [3]], 4, [5, [6, 7]]]",
        args: [
          [
            1,
            [
              2,
              [
                3,
              ],
            ],
            4,
            [
              5,
              [
                6,
                7,
              ],
            ],
          ],
        ],
        expected: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Один уровень вложенности",
        args: [
          [
            1,
            [
              2,
              3,
            ],
            4,
          ],
        ],
        expected: [
          1,
          2,
          3,
          4,
        ],
        hidden: true,
      },
      {
        name: "Глубокая вложенность",
        args: [
          [
            [
              [
                [
                  1,
                ],
              ],
            ],
            2,
          ],
        ],
        expected: [
          1,
          2,
        ],
        hidden: true,
      },
      {
        name: "Вложенные пустые массивы",
        args: [
          [
            [],
            [
              [],
            ],
            1,
          ],
        ],
        expected: [
          1,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Плоское преобразование объекта (Flatten Object)",
    difficulty: 3,
    categories: [
      "Objects",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "flattenObject",
    description: {
      condition: "Реализуйте функцию `flattenObject()`, которая преобразует вложенный объект в плоскую структуру, где ключи содержат пути до значений в исходном объекте.\n\nПараметры функции:\n\n`obj` (Object) - входной объект для преобразования",
      input: [],
      output: "",
      constraints: [
        "Пути до значений разделяются символом `/`",
        "Массивы обрабатываются как объекты с числовыми индексами",
        "Функция должна корректно обрабатывать вложенные объекты любой глубины",
        "Возвращать плоский объект с путями в качестве ключей",
        "Не использовать внешние библиотеки",
        "Глубина вложенности ≤ 100",
        "Размер объекта ≤ 10000 ключей",
      ],
      example: "const input = {\n    a: 1,\n    b: {\n        c: 2,\n        d: {\n            e: 3\n        }\n    },\n    f: [4, 5, { g: 6 }]\n};\n\nconst output = flattenObject(input);\n// {\n//     \"a\": 1,\n//     \"b/c\": 2,\n//     \"b/d/e\": 3,\n//     \"f/0\": 4,\n//     \"f/1\": 5,\n//     \"f/2/g\": 6\n// }",
    },
    starterCode: "function flattenObject(obj) {\n    // TODO: напишите решение здесь\n    return {};\n}\n",
    tests: [
      {
        name: "Объекты и массивы",
        args: [
          {
            a: 1,
            b: {
              c: 2,
              d: {
                e: 3,
              },
            },
            f: [
              4,
              5,
              {
                g: 6,
              },
            ],
          },
        ],
        expected: {
          a: 1,
          "b/c": 2,
          "b/d/e": 3,
          "f/0": 4,
          "f/1": 5,
          "f/2/g": 6,
        },
      },
      {
        name: "Плоский объект не меняется",
        args: [
          {
            a: 1,
            b: 2,
          },
        ],
        expected: {
          a: 1,
          b: 2,
        },
      },
      {
        name: "Пустой объект",
        args: [
          {},
        ],
        expected: {},
      },
      {
        name: "Глубокая вложенность",
        args: [
          {
            a: {
              b: {
                c: {
                  d: 1,
                },
              },
            },
          },
        ],
        expected: {
          "a/b/c/d": 1,
        },
        hidden: true,
      },
      {
        name: "Массив на верхнем уровне",
        args: [
          {
            list: [
              [
                1,
              ],
              [
                2,
              ],
            ],
          },
        ],
        expected: {
          "list/0/0": 1,
          "list/1/0": 2,
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Плоский обход дерева (Flatten Tree to List)",
    difficulty: 3,
    categories: [
      "Trees",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "flattenTree",
    description: {
      condition: "Дано дерево, каждый узел которого содержит поле `name` (строка) и поле `children` (массив дочерних узлов, может быть пустым или отсутствовать). Напишите функцию, которая обходит всё дерево и возвращает плоский массив значений `name` всех узлов.\n\nПорядок вывода — не важен (допустим любой корректный обход). Реализацию необходимо выполнить итеративно, используя стек, без рекурсии.",
      input: [
        "`root` — корневой узел дерева вида `{ name: string, children?: Node[] }`",
      ],
      output: "Массив строк — значения `name` всех узлов дерева в порядке обхода (глубина первая, итеративно).",
      constraints: [
        "`1 <= количество узлов <= 10^4`",
        "Глубина вложенности может быть произвольной",
        "`name` — непустая строка",
      ],
      example: "Вход:\n\n{\n  name: \"A\",\n  children: [\n    { name: \"B\", children: [{ name: \"D\", children: [] }, { name: \"E\", children: [] }] },\n    { name: \"C\", children: [{ name: \"F\", children: [] }] }\n  ]\n}\n\nВыход: `[\"A\", \"C\", \"F\", \"B\", \"E\", \"D\"]` (DFS через стек, дети добавляются слева направо, извлекается с конца)",
    },
    starterCode: "// Узел дерева: { name: string, children?: { name: string, children?: ... }[] }\n// Доступно без импорта: встроенные методы JS\n\nfunction flattenTree(root) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "DFS через стек",
        args: [
          {
            name: "A",
            children: [
              {
                name: "B",
                children: [
                  {
                    name: "D",
                    children: [],
                  },
                  {
                    name: "E",
                    children: [],
                  },
                ],
              },
              {
                name: "C",
                children: [
                  {
                    name: "F",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
        expected: [
          "A",
          "C",
          "F",
          "B",
          "E",
          "D",
        ],
      },
      {
        name: "Один узел",
        args: [
          {
            name: "root",
            children: [],
          },
        ],
        expected: [
          "root",
        ],
      },
      {
        name: "Узел без поля children",
        args: [
          {
            name: "solo",
          },
        ],
        expected: [
          "solo",
        ],
      },
      {
        name: "Глубокая цепочка",
        args: [
          {
            name: "1",
            children: [
              {
                name: "2",
                children: [
                  {
                    name: "3",
                  },
                ],
              },
            ],
          },
        ],
        expected: [
          "1",
          "2",
          "3",
        ],
        hidden: true,
      },
      {
        name: "Все узлы попадают в результат",
        body: "const tree = {\n  name: \"root\",\n  children: [\n    { name: \"a\", children: [{ name: \"a1\" }, { name: \"a2\" }] },\n    { name: \"b\", children: [{ name: \"b1\" }] },\n  ],\n};\nreturn solution(tree).slice().sort();",
        expected: [
          "a",
          "a1",
          "a2",
          "b",
          "b1",
          "root",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Футбольный приз (Football Prize)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getPrize",
    description: {
      condition: "Две команды, А и Б, играют в футбол. Некто делает свою ставку на результат матча, например `\"1:2\"`. По окончании матча становится известен настоящий счёт, и нам надо выдать тот или иной приз:\n\nЕсли некто угадал точный счёт — он получает большой приз (2)\n\nЕсли некто угадал исход матча (победа/ничья/поражение) — он получает маленький приз (1)\n\nЕсли же он не угадал — он получает нулевой приз (0)\n\nНеобходимо написать функцию, которая принимает в качестве аргументов предполагаемый счёт и реальный счёт, и возвращает целое число 0, 1 или 2.\n\nПравила:\n\nСчёт передаётся в формате `\"X:Y\"`, где X — голы команды А, Y — голы команды Б\n\nТочный счёт — совпадают оба числа\n\nИсход матча определяется сравнением голов:Победа команды А: X > Y\n\nПобеда команды Б: X < Y\n\nНичья: X = Y",
      input: [],
      output: "",
      constraints: [
        "Строки всегда в формате `\"X:Y\"` с целыми неотрицательными числами",
        "X и Y — целые числа от 0 до 100",
        "Время выполнения: O(1)",
        "Память: O(1)",
      ],
      example: "getPrize('1:2', '1:2')  // -> 2 (точный счёт)\ngetPrize('2:1', '5:0')  // -> 1 (исход: победа А)\ngetPrize('3:0', '2:2')  // -> 0 (не угадал)",
    },
    starterCode: "function getPrize(guessScore, realScore) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "Точный счёт",
        args: [
          "1:2",
          "1:2",
        ],
        expected: 2,
      },
      {
        name: "Угадан исход — победа А",
        args: [
          "2:1",
          "5:0",
        ],
        expected: 1,
      },
      {
        name: "Не угадал",
        args: [
          "3:0",
          "2:2",
        ],
        expected: 0,
      },
      {
        name: "Угадана ничья",
        args: [
          "1:1",
          "3:3",
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Угадана победа Б",
        args: [
          "0:2",
          "1:4",
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Ничья против победы",
        args: [
          "2:2",
          "2:1",
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Форматирование списка имён (Format Name List)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "list",
    description: {
      condition: "Напишите функцию `list`, которая принимает массив объектов с полем `name` и возвращает строку, отформатированную в виде списка имён, разделённых запятыми, за исключением двух последних имён, которые должны быть разделены амперсандом `&`.\n\nПравила:\n\nЕсли массив пустой, вернуть пустую строку\n\nЕсли в массиве один элемент, вернуть только это имя\n\nЕсли в массиве два элемента, вернуть `\"name1 & name2\"`\n\nЕсли в массиве три и более элементов, все имена, кроме последних двух, разделяются запятыми, а последние два — амперсандом",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 0 ≤ N ≤ 1000",
        "Объекты всегда имеют поле `name`",
        "Имена — строки",
        "Время выполнения: O(N)",
        "Память: O(N)",
      ],
      example: "list([{name:'Bart'}])                      // -> \"Bart\"\nlist([{name:'Bart'}, {name: 'Lisa'}])      // -> \"Bart & Lisa\"\nlist([{name:'Bart'}, {name: 'Lisa'}, {name: 'Maggie'}])  // -> \"Bart, Lisa & Maggie\"\nlist([])                                   // -> \"\"",
    },
    starterCode: "function list(names) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Одно имя",
        args: [
          [
            {
              name: "Bart",
            },
          ],
        ],
        expected: "Bart",
      },
      {
        name: "Два имени",
        args: [
          [
            {
              name: "Bart",
            },
            {
              name: "Lisa",
            },
          ],
        ],
        expected: "Bart & Lisa",
      },
      {
        name: "Три имени",
        args: [
          [
            {
              name: "Bart",
            },
            {
              name: "Lisa",
            },
            {
              name: "Maggie",
            },
          ],
        ],
        expected: "Bart, Lisa & Maggie",
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: "",
        hidden: true,
      },
      {
        name: "Четыре имени",
        args: [
          [
            {
              name: "A",
            },
            {
              name: "B",
            },
            {
              name: "C",
            },
            {
              name: "D",
            },
          ],
        ],
        expected: "A, B, C & D",
        hidden: true,
      },
    ],
  },
  {
    title: "Форматирование числа с разделителями тысяч (Format Number With Thousands Separator)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "formatWithApostrophe",
    description: {
      condition: "С сервера приходит цена товара как целое число (например, `12345678`). Нужно написать функцию, которая преобразует это число в строку, где группы из трёх цифр (считая от конца числа) разделены апострофом `'`.",
      input: [
        "`price` — целое число в диапазоне от 1 до 2^31 - 1.",
      ],
      output: "Строка — то же число, но с апострофами между группами по три цифры, считая справа.",
      constraints: [
        "`1 <= price <= 2147483647`",
      ],
      example: "Вход: 12345678\nВыход: \"12'345'678\"\n\nВход: 999\nВыход: \"999\"\n\nВход: 1000\nВыход: \"1'000\"",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction formatWithApostrophe(price) {\n  // TODO: напишите решение здесь\n  return \"\";\n}\n",
    tests: [
      {
        name: "12345678",
        args: [
          12345678,
        ],
        expected: "12'345'678",
      },
      {
        name: "999 — без разделителей",
        args: [
          999,
        ],
        expected: "999",
      },
      {
        name: "1000",
        args: [
          1000,
        ],
        expected: "1'000",
      },
      {
        name: "Ровно шесть цифр",
        args: [
          123456,
        ],
        expected: "123'456",
        hidden: true,
      },
      {
        name: "Одна цифра",
        args: [
          7,
        ],
        expected: "7",
        hidden: true,
      },
      {
        name: "Большое число",
        args: [
          2147483647,
        ],
        expected: "2'147'483'647",
        hidden: true,
      },
    ],
  },
  {
    title: "Ограничение вызовов функции (Function Call Limit)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "callLimit",
    description: {
      condition: "Напишите функцию `callLimit(fn, limit, onLimit)` (или аналог для других языков), которая возвращает декоратор/обёртку:\n\nФункция может быть вызвана максимум `limit` раз.\n\nПосле превышения лимита вызывается `onLimit`.\n\nУ обёртки должен быть метод `reset()`, который сбрасывает счётчик вызовов.\n\nПримеры использования:",
      input: [],
      output: "",
      constraints: [],
      example: "function log(title, message) {\n  console.log(title + ': ' + message);\n}\n\nvar logLimited = callLimit(log, 3, () => console.log('Limit reached!'));\nlogLimited('title1', 'desc'); // Вывод: title1: desc\nlogLimited('title2', 'desc'); // Вывод: title2: desc\nlogLimited('title3', 'desc'); // Вывод: title3: desc\nlogLimited('title4', 'desc'); // Вывод: Limit reached!\nlogLimited.reset();\nlogLimited('title5', 'desc'); // Вывод: title5: desc",
    },
    starterCode: "function callLimit(fn, limit, onLimit) {\n    // TODO: напишите решение здесь\n}\n",
    tests: [
      {
        name: "Ровно limit вызовов проходят",
        body: "const calls = [];\nconst limited = solution((t) => calls.push(t), 3, () => calls.push(\"limit\"));\nlimited(\"a\"); limited(\"b\"); limited(\"c\"); limited(\"d\");\nreturn calls;",
        expected: [
          "a",
          "b",
          "c",
          "limit",
        ],
      },
      {
        name: "reset обнуляет счётчик",
        body: "const calls = [];\nconst limited = solution((t) => calls.push(t), 1, () => calls.push(\"limit\"));\nlimited(\"a\"); limited(\"b\");\nlimited.reset();\nlimited(\"c\");\nreturn calls;",
        expected: [
          "a",
          "limit",
          "c",
        ],
      },
      {
        name: "Результат обёрнутой функции возвращается",
        body: "const limited = solution((a, b) => a + b, 2, () => \"limit\");\nreturn [limited(1, 2), limited(3, 4), limited(5, 6)];",
        expected: [
          3,
          7,
          "limit",
        ],
        hidden: true,
      },
      {
        name: "limit = 0 — ни одного вызова",
        body: "let calls = 0;\nconst limited = solution(() => calls++, 0, () => \"limit\");\nconst result = limited();\nreturn [calls, result];",
        expected: [
          0,
          "limit",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Декоратор логирования вызова функции (Function Call Logger Decorator)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "logCalls",
    description: {
      condition: "Напишите декоратор (обёртку) `log_calls`, который оборачивает произвольную функцию и добавляет логирование вокруг её вызова. Перед вызовом обёрнутой функции декоратор должен вывести сообщение `\"Before call\"`, затем выполнить саму функцию с переданными аргументами, после чего вывести сообщение `\"After call\"`. Результат работы обёрнутой функции должен быть возвращён без изменений.",
      input: [
        "Функция, принимающая произвольное число аргументов, и сами аргументы для её вызова.",
      ],
      output: "Результат выполнения обёрнутой функции (после того как выведены оба лог-сообщения).",
      constraints: [
        "Обёрнутая функция может принимать 0 и более аргументов любого простого типа (числа, строки)",
        "Обёрнутая функция всегда завершается успешно (без исключений)",
        "Порядок вывода строго фиксирован: `\"Before call\"` → результат работы функции → `\"After call\"`",
      ],
      example: "Вход: функция `add(a, b)`, вызов с аргументами `(2, 3)`\nВывод (логи): `Before call`, `After call`\nРезультат: `5`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction logCalls(fn) {\n  // TODO: напишите решение здесь\n  return fn;\n}\n",
    tests: [
      {
        name: "Логи вокруг вызова, результат не меняется",
        body: "const log = [];\nconst original = console.log;\nconsole.log = (m) => log.push(m);\nconst wrapped = solution((a, b) => { log.push(\"call\"); return a + b; });\nconst result = wrapped(2, 3);\nconsole.log = original;\nreturn [result, log];",
        expected: [
          5,
          [
            "Before call",
            "call",
            "After call",
          ],
        ],
      },
      {
        name: "Аргументы передаются без изменений",
        body: "const original = console.log;\nconsole.log = () => {};\nlet got = null;\nconst wrapped = solution((...args) => { got = args; });\nwrapped(1, \"two\", true);\nconsole.log = original;\nreturn got;",
        expected: [
          1,
          "two",
          true,
        ],
      },
      {
        name: "Функция без аргументов",
        body: "const original = console.log;\nconsole.log = () => {};\nconst wrapped = solution(() => \"ok\");\nconst result = wrapped();\nconsole.log = original;\nreturn result;",
        expected: "ok",
        hidden: true,
      },
      {
        name: "Ровно два лог-сообщения на вызов",
        body: "const log = [];\nconst original = console.log;\nconsole.log = (m) => log.push(m);\nconst wrapped = solution(() => 1);\nwrapped();\nconsole.log = original;\nreturn log;",
        expected: [
          "Before call",
          "After call",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Реализация функции compose (Function Composition)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "compose",
    description: {
      condition: "Напишите функцию `compose(...fns)`, которая принимает любое количество функций и возвращает новую функцию. Возвращаемая функция применяет переданные функции справа налево: аргументы передаются в самую правую функцию, а результат каждой функции передаётся следующей слева.\n\nЕсли функций не передано, возвращённая функция должна вернуть свой аргумент как есть.",
      input: [
        "`fns` — любое количество функций",
        "Аргументы вызова — любое количество значений",
      ],
      output: "Функция, возвращающая результат последовательного применения `fns` справа налево",
      constraints: [
        "Самая правая функция может принимать несколько аргументов, остальные — один",
        "Без функций `compose()(x)` возвращает `x`",
      ],
      example: "const square = (x) => x * x;\nconst times2 = (x) => x * 2;\nconst sum = (a, b) => a + b;\n\ncompose(square, times2)(2)         // square(times2(2)) -> 16\ncompose(square, times2, sum)(3, 4) // square(times2(sum(3, 4))) -> 196\ncompose()(5)                       // -> 5",
    },
    starterCode: "function compose(...fns) {\n    // TODO: напишите решение здесь\n    return (x) => x;\n}\n",
    tests: [
      {
        name: "Две функции",
        body: "const square = (x) => x * x;\nconst times2 = (x) => x * 2;\nreturn solution(square, times2)(2);",
        expected: 16,
      },
      {
        name: "Правая функция принимает два аргумента",
        body: "const square = (x) => x * x;\nconst times2 = (x) => x * 2;\nconst sum = (a, b) => a + b;\nreturn solution(square, times2, sum)(3, 4);",
        expected: 196,
      },
      {
        name: "Без функций возвращается аргумент",
        body: "return solution()(5);",
        expected: 5,
      },
      {
        name: "Одна функция",
        body: "return solution((x) => x + 1)(1);",
        expected: 2,
        hidden: true,
      },
      {
        name: "Порядок именно справа налево",
        body: "const order = [];\nconst a = (x) => { order.push(\"a\"); return x; };\nconst b = (x) => { order.push(\"b\"); return x; };\nsolution(a, b)(1);\nreturn order;",
        expected: [
          "b",
          "a",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Каррирование функций (Function Currying)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "curry",
    description: {
      condition: "Реализуйте функцию `curry`, которая принимает функцию `func` и возвращает её каррированную версию. Каррирование (currying) — это процесс преобразования функции с множеством аргументов в последовательность функций, каждая из которых принимает один аргумент.\n\nКаррированная функция должна:\n\nРаботать с любым количеством аргументов\n\nВозвращать новую функцию до тех пор, пока не будут переданы все аргументы\n\nПосле получения всех аргументов вызвать исходную функцию с накопленными аргументами",
      input: [],
      output: "",
      constraints: [
        "Исходная функция может принимать любое количество аргументов",
        "Каррированная функция должна сохранять контекст вызова (`this`)",
        "Должна поддерживать все способы передачи аргументов (по одному, группами, все сразу)",
      ],
      example: "function add(a, b, c) {\n  return a + b + c;\n}\n\nconst curriedAdd = curry(add);\nconsole.log(curriedAdd(1)(2)(3)); // 6\nconsole.log(curriedAdd(1, 2)(3)); // 6\nconsole.log(curriedAdd(1)(2, 3)); // 6\nconsole.log(curriedAdd(1, 2, 3)); // 6",
    },
    starterCode: "function curry(func) {\n    // TODO: write your solution here\n}\n",
    tests: [
      {
        name: "По одному аргументу",
        body: "const add = (a, b, c) => a + b + c;\nreturn solution(add)(1)(2)(3);",
        expected: 6,
      },
      {
        name: "Два, затем один",
        body: "const add = (a, b, c) => a + b + c;\nreturn solution(add)(1, 2)(3);",
        expected: 6,
      },
      {
        name: "Один, затем два",
        body: "const add = (a, b, c) => a + b + c;\nreturn solution(add)(1)(2, 3);",
        expected: 6,
      },
      {
        name: "Все аргументы сразу",
        body: "const add = (a, b, c) => a + b + c;\nreturn solution(add)(1, 2, 3);",
        expected: 6,
        hidden: true,
      },
      {
        name: "Частичное применение переиспользуется",
        body: "const add = (a, b, c) => a + b + c;\nconst add1 = solution(add)(1);\nreturn [add1(2, 3), add1(10, 20)];",
        expected: [
          6,
          31,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Throttle — ограничение частоты вызова функции (Function Throttle)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "throttle",
    description: {
      condition: "Реализуйте функцию `throttle(func, delay)`, которая возвращает новую функцию-обёртку. Эта обёртка ограничивает частоту выполнения `func`.\n\nПоведение:\n\nПервый вызов выполняется сразу (leading edge)\n\nПока не прошёл интервал `delay` — новые вызовы не выполняются сразу\n\nЗапоминается только последний вызов, произошедший в интервале ожидания\n\nПосле окончания интервала выполняется ровно один отложенный вызов — с последними аргументами (trailing edge)\n\nДалее цикл повторяется\n\nПример поведения:",
      input: [],
      output: "",
      constraints: [
        "Функция должна корректно передавать аргументы и контекст (`this`)",
        "Возвращаемое значение `func` должно быть доступно (для синхронных вызовов)",
        "Должна быть возможность отмены отложенного вызова (опционально)",
      ],
      example: "delay = 1000 ms\n\nt=0      call(\"A\")  → выполняется сразу\nt=200    call(\"B\")  → откладывается\nt=400    call(\"C\")  → заменяет B\nt=1000               → выполняется C\nt=1200   call(\"D\")  → новый интервал → выполняется сразу",
    },
    starterCode: "function throttle(func, delay) {\n    // TODO: напишите решение здесь\n}\n",
    tests: [
      {
        name: "Первый вызов сразу, последний — в конце интервала",
        body: "const calls = [];\nconst t = solution((v) => calls.push(v), 40);\nt(\"A\");\nawait new Promise((r) => setTimeout(r, 10));\nt(\"B\");\nawait new Promise((r) => setTimeout(r, 5));\nt(\"C\");\nawait new Promise((r) => setTimeout(r, 80));\nreturn calls;",
        expected: [
          "A",
          "C",
        ],
      },
      {
        name: "Одиночный вызов выполняется сразу",
        body: "const calls = [];\nconst t = solution((v) => calls.push(v), 40);\nt(\"only\");\nreturn calls;",
        expected: [
          "only",
        ],
      },
      {
        name: "После паузы новый вызов снова мгновенный",
        body: "const calls = [];\nconst t = solution((v) => calls.push(v), 20);\nt(\"A\");\nawait new Promise((r) => setTimeout(r, 60));\nt(\"B\");\nreturn calls;",
        expected: [
          "A",
          "B",
        ],
        hidden: true,
      },
      {
        name: "Аргументы отложенного вызова — от последнего",
        body: "const calls = [];\nconst t = solution((...args) => calls.push(args), 30);\nt(1);\nt(2);\nt(3);\nawait new Promise((r) => setTimeout(r, 70));\nreturn calls;",
        expected: [
          [
            1,
          ],
          [
            3,
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Нечёткий поиск подпоследовательности (Fuzzy Search)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "fuzzysearch",
    description: {
      condition: "Даны две строки: `needle` и `haystack`. Нужно определить, можно ли получить `needle`, удалив из `haystack` некоторые символы (ноль или более), не меняя порядок оставшихся символов. Другими словами, все символы `needle` должны встречаться в `haystack` в том же порядке, но необязательно подряд.\n\nФункция должна быть реализована за один проход по символам обеих строк, без использования регулярных выражений.",
      input: [
        "`needle` — строка, которую нужно найти",
        "`haystack` — строка, в которой производится поиск",
      ],
      output: "`true`/`True`, если `needle` является подпоследовательностью `haystack`, иначе `false`/`False`",
      constraints: [
        "`0 <= длина needle <= 10^4`",
        "`0 <= длина haystack <= 10^5`",
        "Строки состоят из печатных ASCII-символов",
      ],
      example: "Вход: `needle = \"car\"`, `haystack = \"cartwheel\"`\nВыход: `true`\n\nВход: `needle = \"cwhl\"`, `haystack = \"cartwheel\"`\nВыход: `true`\n\nВход: `needle = \"cartwheeel\"`, `haystack = \"cartwheel\"`\nВыход: `false`\n\nВход: `needle = \"lw\"`, `haystack = \"cartwheel\"`\nВыход: `false`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction fuzzysearch(needle, haystack) {\n  // TODO: напишите решение здесь\n  return false;\n}\n",
    tests: [
      {
        name: "\"car\" в \"cartwheel\"",
        args: [
          "car",
          "cartwheel",
        ],
        expected: true,
      },
      {
        name: "Символы не подряд",
        args: [
          "cwhl",
          "cartwheel",
        ],
        expected: true,
      },
      {
        name: "Лишняя буква",
        args: [
          "cartwheeel",
          "cartwheel",
        ],
        expected: false,
      },
      {
        name: "Неверный порядок",
        args: [
          "lw",
          "cartwheel",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Пустой needle",
        args: [
          "",
          "abc",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Пустой haystack",
        args: [
          "a",
          "",
        ],
        expected: false,
        hidden: true,
      },
    ],
  },
  {
    title: "Разница массивов по произвольному ключу (Generic Array Diff by Key)",
    difficulty: 2,
    categories: [
      "Arrays",
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "diffGeneric",
    description: {
      condition: "Реализуйте функцию `diffGeneric(prev, next, keyFn)`, которая сравнивает два массива элементов и определяет, какие элементы были удалены, а какие — добавлены, между состоянием `prev` и состоянием `next`.\n\nПринадлежность элемента к массиву определяется не самим значением, а ключом, который возвращает функция `keyFn(item)` для этого элемента. Элемент считается:\n\nудалённым (removed), если его ключ присутствует в `prev`, но отсутствует в `next`;\n\nдобавленным (added), если его ключ присутствует в `next`, но отсутствует в `prev`.\n\nЭлементы, чей ключ есть в обоих массивах, в результат не попадают (даже если сам объект изменился — сравнение идёт только по ключу).\n\nПорядок элементов в `added` и `removed` соответствует их порядку появления в соответствующем исходном массиве (`next` — для added, `prev` — для removed).",
      input: [
        "`prev` — массив элементов произвольного типа (числа, строки или объекты)",
        "`next` — массив элементов произвольного типа",
        "`keyFn` — функция, принимающая элемент и возвращающая ключ (строку или число)",
      ],
      output: "Объект вида `{ added: [...], removed: [...] }`, где:\n`added` — элементы из `next`, ключа которых нет в `prev`\n`removed` — элементы из `prev`, ключа которых нет в `next`",
      constraints: [
        "`0 <= prev.length, next.length <= 10^4`",
        "`keyFn` всегда возвращает строку или число, приводимое к строке",
        "ключи внутри одного массива уникальны (дубликатов ключей в `prev` или в `next` не бывает)",
      ],
      example: "Вход: `prev = [1, 2, 3, 4, 6]`, `next = [2, 3, 4]`, `keyFn = x => x`\nВыход: `{ added: [], removed: [1, 6] }`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction diffGeneric(prev, next, keyFn) {\n  // TODO: напишите решение здесь\n  return { added: [], removed: [] };\n}\n",
    tests: [
      {
        name: "Числа, ключ — само значение",
        body: "return solution([1, 2, 3, 4, 6], [2, 3, 4], (x) => x);",
        expected: {
          added: [],
          removed: [
            1,
            6,
          ],
        },
      },
      {
        name: "Объекты сравниваются по id",
        body: "return solution(\n  [{ id: 1 }, { id: 2 }],\n  [{ id: 2 }, { id: 3 }],\n  (x) => x.id\n);",
        expected: {
          added: [
            {
              id: 3,
            },
          ],
          removed: [
            {
              id: 1,
            },
          ],
        },
      },
      {
        name: "Пустые массивы",
        body: "return solution([], [], (x) => x);",
        expected: {
          added: [],
          removed: [],
        },
      },
      {
        name: "Совпадающий ключ при разном содержимом не попадает в результат",
        body: "return solution(\n  [{ id: 1, name: \"old\" }],\n  [{ id: 1, name: \"new\" }],\n  (x) => x.id\n);",
        expected: {
          added: [],
          removed: [],
        },
        hidden: true,
      },
      {
        name: "Всё добавлено",
        body: "return solution([], [{ k: \"a\" }], (x) => x.k);",
        expected: {
          added: [
            {
              k: "a",
            },
          ],
          removed: [],
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Получение значения по пути в объекте (Get Value By Path)",
    difficulty: 2,
    categories: [
      "Objects",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "get",
    description: {
      condition: "Напишите функцию `get(obj, path)`, которая принимает объект `obj` и строку `path`, представляющую путь к вложенному значению в этом объекте. Путь состоит из ключей, разделённых точкой (`.`).\n\nЕсли путь существует — функция должна вернуть значение, найденное по этому пути.\n\nЕсли путь не существует (на любом уровне вложенности отсутствует нужный ключ, либо промежуточное значение не является объектом) — функция должна вернуть `undefined`.",
      input: [
        "`obj` — произвольный объект с вложенной структурой (ключи — строки, значения — любые типы, включая вложенные объекты)",
        "`path` — строка вида `\"a.b.c\"`, представляющая путь к значению",
      ],
      output: "Значение по указанному пути, либо `undefined`, если путь не найден.",
      constraints: [
        "Глубина вложенности от 1 до 10",
        "Ключи пути состоят из букв, цифр и `_`",
        "`obj` может быть пустым объектом",
      ],
      example: "Вход: obj = {a: {b: {c: \"d\"}}}, path = \"a.b.c\"   → Выход: \"d\"\nВход: obj = {a: {b: {c: \"d\"}}}, path = \"a.b\"     → Выход: {c: \"d\"}\nВход: obj = {x: {y: {z: 42}}}, path = \"x.c\"      → Выход: undefined",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction get(obj, path) {\n  // TODO: напишите решение здесь\n  return undefined;\n}\n",
    tests: [
      {
        name: "Полный путь",
        args: [
          {
            a: {
              b: {
                c: "d",
              },
            },
          },
          "a.b.c",
        ],
        expected: "d",
      },
      {
        name: "Промежуточный узел",
        args: [
          {
            a: {
              b: {
                c: "d",
              },
            },
          },
          "a.b",
        ],
        expected: {
          c: "d",
        },
      },
      {
        name: "Пути нет",
        args: [
          {
            x: {
              y: {
                z: 42,
              },
            },
          },
          "x.c",
        ],
      },
      {
        name: "Путь упирается в примитив",
        args: [
          {
            a: 1,
          },
          "a.b.c",
        ],
        hidden: true,
      },
      {
        name: "Один ключ",
        args: [
          {
            only: 5,
          },
          "only",
        ],
        expected: 5,
        hidden: true,
      },
      {
        name: "Пустой объект",
        args: [
          {},
          "a",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Фильтрация графа по локации событий (Graph Filtering by Event Location)",
    difficulty: 3,
    categories: [
      "Graphs",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "filterGraphByLocation",
    description: {
      condition: "Дан граф в виде списка вершин (персон) и списка рёбер (связей между персонами), а также список событий, где каждое событие содержит идентификатор персоны и её локацию. Необходимо реализовать функцию, которая возвращает отфильтрованный граф — оставляя только те вершины, которые фигурировали хотя бы в одном событии с заданной локацией, а также только те рёбра, у которых оба конца остались среди отфильтрованных вершин.",
      input: [
        "`vertices` — массив идентификаторов персон (строки/числа)",
        "`edges` — массив пар `[from, to]`, задающих связи между персонами",
        "`events` — массив объектов `{ personId, location }`",
        "`targetLocation` — строка, целевая локация",
      ],
      output: "Объект `{ vertices: [...], edges: [...] }` — отфильтрованный граф.",
      constraints: [
        "0 ≤ количество вершин ≤ 1000",
        "0 ≤ количество событий ≤ 5000",
        "Ускорение фильтрации (учитывая вопрос 04) через построение хеш-множества персон по нужной локации за O(n), вместо перебора событий для каждой вершины — O(V+E+N) вместо O(V×N)",
      ],
      example: "Вход: vertices=[\"A\",\"B\",\"C\"], edges=[[\"A\",\"B\"],[\"B\",\"C\"]], events=[{personId:\"A\",location:\"Moscow\"},{personId:\"B\",location:\"SPB\"},{personId:\"C\",location:\"Moscow\"}], targetLocation=\"Moscow\"\nВыход: {vertices:[\"A\",\"C\"], edges:[]}",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction filterGraphByLocation(vertices, edges, events, targetLocation) {\n  // TODO: напишите решение здесь\n  return { vertices: [], edges: [] };\n}\n",
    tests: [
      {
        name: "Ребро отбрасывается, если один конец отфильтрован",
        args: [
          [
            "A",
            "B",
            "C",
          ],
          [
            [
              "A",
              "B",
            ],
            [
              "B",
              "C",
            ],
          ],
          [
            {
              personId: "A",
              location: "Moscow",
            },
            {
              personId: "B",
              location: "SPB",
            },
            {
              personId: "C",
              location: "Moscow",
            },
          ],
          "Moscow",
        ],
        expected: {
          vertices: [
            "A",
            "C",
          ],
          edges: [],
        },
      },
      {
        name: "Ребро остаётся, если оба конца прошли фильтр",
        args: [
          [
            "A",
            "B",
          ],
          [
            [
              "A",
              "B",
            ],
          ],
          [
            {
              personId: "A",
              location: "Moscow",
            },
            {
              personId: "B",
              location: "Moscow",
            },
          ],
          "Moscow",
        ],
        expected: {
          vertices: [
            "A",
            "B",
          ],
          edges: [
            [
              "A",
              "B",
            ],
          ],
        },
      },
      {
        name: "Никто не был в целевой локации",
        args: [
          [
            "A",
          ],
          [],
          [
            {
              personId: "A",
              location: "SPB",
            },
          ],
          "Moscow",
        ],
        expected: {
          vertices: [],
          edges: [],
        },
      },
      {
        name: "Персона побывала в нескольких локациях",
        args: [
          [
            "A",
            "B",
          ],
          [
            [
              "A",
              "B",
            ],
          ],
          [
            {
              personId: "A",
              location: "SPB",
            },
            {
              personId: "A",
              location: "Moscow",
            },
            {
              personId: "B",
              location: "Moscow",
            },
          ],
          "Moscow",
        ],
        expected: {
          vertices: [
            "A",
            "B",
          ],
          edges: [
            [
              "A",
              "B",
            ],
          ],
        },
        hidden: true,
      },
      {
        name: "Событий нет",
        args: [
          [
            "A",
            "B",
          ],
          [
            [
              "A",
              "B",
            ],
          ],
          [],
          "Moscow",
        ],
        expected: {
          vertices: [],
          edges: [],
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Группировка массива по ключу (Group By Key)",
    difficulty: 3,
    categories: [
      "Grouping",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "groupBy",
    description: {
      condition: "Реализуйте функцию `groupBy(array, keyFn)`, которая группирует элементы массива по ключам, возвращаемым функцией `keyFn`.\n\nДля каждого элемента массива вычисляется ключ — результат вызова `keyFn(element)`. Все элементы с одинаковым ключом объединяются в массив под этим ключом в результирующем объекте. Порядок элементов внутри каждой группы соответствует порядку их появления в исходном массиве.",
      input: [
        "`array` — массив элементов произвольного типа (длина от 0 до 10⁴)",
        "`keyFn` — функция, принимающая элемент и возвращающая строковый ключ",
      ],
      output: "Объект (словарь), где каждый ключ — результат `keyFn`, а значение — массив элементов с этим ключом.",
      constraints: [
        "`0 <= array.length <= 10000`",
        "`keyFn` всегда возвращает строку или число, приводимое к строке",
        "Не использовать встроенный `Object.groupBy`",
      ],
      example: "Вход: `[{id: 1, name: \"a\"}, {id: 2, name: \"b\"}, {id: 1, name: \"c\"}]`, `item => item.id`\nВыход: `{\"1\": [{id:1,name:\"a\"},{id:1,name:\"c\"}], \"2\": [{id:2,name:\"b\"}]}`\n\nВход: `[1, 2, 3, 4, 5, 6]`, `n => n % 2 === 0 ? \"even\" : \"odd\"`\nВыход: `{\"odd\": [1,3,5], \"even\": [2,4,6]}`\n\nВход: `[]`, `item => item`\nВыход: `{}`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\n/**\n * @param {Array} array\n * @param {Function} keyFn\n * @returns {Object}\n */\nfunction groupBy(array, keyFn) {\n  // TODO: напишите решение здесь\n  return {};\n}\n",
    tests: [
      {
        name: "Группировка объектов по id",
        body: "return solution(\n  [{ id: 1, name: \"a\" }, { id: 2, name: \"b\" }, { id: 1, name: \"c\" }],\n  (item) => item.id\n);",
        expected: {
          "1": [
            {
              id: 1,
              name: "a",
            },
            {
              id: 1,
              name: "c",
            },
          ],
          "2": [
            {
              id: 2,
              name: "b",
            },
          ],
        },
      },
      {
        name: "Чётные и нечётные",
        body: "return solution([1, 2, 3, 4, 5, 6], (n) => (n % 2 === 0 ? \"even\" : \"odd\"));",
        expected: {
          odd: [
            1,
            3,
            5,
          ],
          even: [
            2,
            4,
            6,
          ],
        },
      },
      {
        name: "Пустой массив",
        body: "return solution([], (x) => x);",
        expected: {},
      },
      {
        name: "Все элементы в одной группе",
        body: "return solution([\"a\", \"b\"], () => \"all\");",
        expected: {
          all: [
            "a",
            "b",
          ],
        },
        hidden: true,
      },
      {
        name: "Порядок внутри группы сохраняется",
        body: "return solution([3, 1, 3, 2, 3], (n) => String(n));",
        expected: {
          "1": [
            1,
          ],
          "2": [
            2,
          ],
          "3": [
            3,
            3,
            3,
          ],
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Реализация функции reduce (Implement Array Reduce)",
    difficulty: 2,
    categories: [
      "Arrays",
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "myReduce",
    description: {
      condition: "Реализуйте функцию `myReduce`, которая принимает массив, функцию-редьюсер (callback) и начальное значение аккумулятора, и последовательно применяет callback к каждому элементу массива, накапливая результат. Функция должна работать аналогично встроенному методу `Array.prototype.reduce`, но не использовать его. Callback вызывается с аргументами `(accumulator, currentElement, index)` и возвращает новое значение аккумулятора.",
      input: [
        "`array` — массив чисел",
        "`callback` — функция вида `(acc, element, index) => newAcc`",
        "`initial` — начальное значение аккумулятора",
      ],
      output: "Итоговое значение аккумулятора после обработки всех элементов массива.",
      constraints: [
        "`0 <= array.length <= 10^4`",
        "Нельзя использовать встроенный `Array.prototype.reduce`",
        "`callback` всегда является валидной функцией",
        "`initial` всегда передаётся явно",
      ],
      example: "Вход: array = [1, 2, 3, 4], callback = (acc, x) => acc + x, initial = 0\nВыход: 10\n\nВход: array = [1, 2, 3], callback = (acc, x) => acc * x, initial = 1\nВыход: 6\n\nВход: array = [], callback = (acc, x) => acc + x, initial = 5\nВыход: 5",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction myReduce(array, callback, initial) {\n  // TODO: напишите решение здесь\n  return initial;\n}\n",
    tests: [
      {
        name: "Сумма",
        body: "return solution([1, 2, 3, 4], (acc, x) => acc + x, 0);",
        expected: 10,
      },
      {
        name: "Произведение",
        body: "return solution([1, 2, 3], (acc, x) => acc * x, 1);",
        expected: 6,
      },
      {
        name: "Пустой массив — начальное значение",
        body: "return solution([], (acc, x) => acc + x, 5);",
        expected: 5,
      },
      {
        name: "Начальное значение учитывается",
        body: "return solution([1, 2], (acc, x) => acc + x, 100);",
        expected: 103,
        hidden: true,
      },
      {
        name: "В callback приходит индекс",
        body: "return solution([10, 20, 30], (acc, x, i) => acc.concat(i), []);",
        expected: [
          0,
          1,
          2,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Реализация функции map (Implement Map Function)",
    difficulty: 2,
    categories: [
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "myMap",
    description: {
      condition: "Реализуйте функцию `myMap`, которая принимает массив элементов и функцию-преобразователь, и возвращает новый массив, где каждый элемент исходного массива заменён результатом вызова этой функции. Функция должна работать аналогично встроенному `Array.prototype.map`, но не использовать его.",
      input: [
        "`array` — массив произвольных значений",
        "`callback` — функция, принимающая один аргумент и возвращающая преобразованное значение",
      ],
      output: "Новый массив той же длины, где каждый элемент — результат `callback(element)`.",
      constraints: [
        "`0 <= array.length <= 10^4`",
        "Нельзя использовать `Array.prototype.map`",
        "Исходный массив не должен изменяться",
      ],
      example: "Вход: array = [1, 2, 3], callback = x => x * 2\nВыход: [2, 4, 6]\n\nВход: array = [1, 2, 3], callback = x => x + 5\nВыход: [6, 7, 8]\n\nВход: array = [], callback = x => x\nВыход: []",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction myMap(array, callback) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Удвоение",
        body: "return solution([1, 2, 3], (x) => x * 2);",
        expected: [
          2,
          4,
          6,
        ],
      },
      {
        name: "Прибавление",
        body: "return solution([1, 2, 3], (x) => x + 5);",
        expected: [
          6,
          7,
          8,
        ],
      },
      {
        name: "Пустой массив",
        body: "return solution([], (x) => x);",
        expected: [],
      },
      {
        name: "Исходный массив не изменяется",
        body: "const source = [1, 2, 3];\nsolution(source, (x) => x * 10);\nreturn source;",
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
      {
        name: "Длина результата совпадает с исходной",
        body: "return solution([\"a\", \"b\"], (x) => x.toUpperCase());",
        expected: [
          "A",
          "B",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Промо-фильмы в коллекции (Insert Promo Films)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "addPromoFilms",
    description: {
      condition: "Дан список фильмов `collection`.\n\nТакже дан словарь `promo_positions`, где:\n\nключ — название промо-фильма\n\nзначение — позиция, на которой фильм должен находиться\n\nНеобходимо вставить промо-фильмы в исходную коллекцию.\n\nПравила:\n\nесли позиция находится внутри диапазона массива — фильм вставляется в указанную позицию\n\nесли позиция больше длины результирующего массива — фильм добавляется в конец\n\nпри вставке элементы сдвигаются вправо\n\nпорядок промо-фильмов с одинаковыми позициями должен сохраняться\n\nФункция должна вернуть новую коллекцию.",
      input: [
        "`collection: string[]`",
        "`promo_positions: { [movie:string]: number }`",
      ],
      output: "`string[]`\nИтоговый массив фильмов.",
      constraints: [
        "0 <= collection.length <= 10^5",
        "0 <= promo_positions.length <= 10^5",
        "0 <= position <= 10^9",
        "длина названия фильма <= 100",
      ],
      example: "Вход:\n\ncollection = [\n'Harry Potter',\n'Matrix 2',\n'Nemo',\n'Godfather',\n'Avengers'\n]\n\npromo_positions = {\n'Iron man':0,\n'Batman':3,\n'Blade Runner':10,\n'Jaws':7\n}\n\nВыход:\n\n[\n'Iron man',\n'Harry Potter',\n'Matrix 2',\n'Batman',\n'Nemo',\n'Godfather',\n'Avengers',\n'Jaws',\n'Blade Runner'\n]",
    },
    starterCode: "function addPromoFilms(collection, promoPositions) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Пример из условия",
        args: [
          [
            "Harry Potter",
            "Matrix 2",
            "Nemo",
            "Godfather",
            "Avengers",
          ],
          {
            "Iron man": 0,
            Batman: 3,
            "Blade Runner": 10,
            Jaws: 7,
          },
        ],
        expected: [
          "Iron man",
          "Harry Potter",
          "Matrix 2",
          "Batman",
          "Nemo",
          "Godfather",
          "Avengers",
          "Jaws",
          "Blade Runner",
        ],
      },
      {
        name: "Промо-фильмов нет",
        args: [
          [
            "A",
            "B",
          ],
          {},
        ],
        expected: [
          "A",
          "B",
        ],
      },
      {
        name: "Вставка в начало",
        args: [
          [
            "A",
          ],
          {
            Promo: 0,
          },
        ],
        expected: [
          "Promo",
          "A",
        ],
      },
      {
        name: "Позиция больше длины — в конец",
        args: [
          [
            "A",
            "B",
          ],
          {
            Promo: 99,
          },
        ],
        expected: [
          "A",
          "B",
          "Promo",
        ],
        hidden: true,
      },
      {
        name: "Пустая коллекция",
        args: [
          [],
          {
            Only: 0,
          },
        ],
        expected: [
          "Only",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Пересечение массивов по ключу (Intersect Arrays by Key)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "intersectByCode",
    description: {
      condition: "Даны два массива объектов. Каждый объект содержит числовое поле `code`. Верните новый массив, содержащий все объекты из массива `a`, для которых в массиве `b` найдётся объект с таким же значением поля `code`. Порядок элементов в результате определяется порядком элементов в массиве `b`: объекты из `a` должны располагаться в том порядке, в каком встречается соответствующий `code` в `b`. Если в `b` встречается несколько одинаковых `code`, учитывается только первое вхождение.",
      input: [
        "`a` — массив объектов вида `{ code: number, ...rest }`, длина от 0 до 10⁵",
        "`b` — массив объектов вида `{ code: number, ...rest }`, длина от 0 до 10⁵",
      ],
      output: "Массив объектов из `a`, отфильтрованных и упорядоченных по первому вхождению соответствующего `code` в `b`.",
      constraints: [
        "`0 <= a.length, b.length <= 100 000`",
        "Поле `code` — целое неотрицательное число",
        "В массиве `b` могут быть дубликаты `code` — учитывается только первое вхождение",
      ],
      example: "Вход: a = [{code:0},{code:3},{code:4}], b = [{code:0},{code:3},{code:4}]\nВыход: [{code:0},{code:3},{code:4}]\n\nВход: a = [{code:0},{code:1},{code:3},{code:4}], b = [{code:3},{code:0},{code:4}]\nВыход: [{code:3},{code:0},{code:4}]\n\nВход: a = [{code:1},{code:2}], b = [{code:3},{code:4}]\nВыход: []",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction intersectByCode(a, b) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Порядок совпадает",
        args: [
          [
            {
              code: 0,
            },
            {
              code: 3,
            },
            {
              code: 4,
            },
          ],
          [
            {
              code: 0,
            },
            {
              code: 3,
            },
            {
              code: 4,
            },
          ],
        ],
        expected: [
          {
            code: 0,
          },
          {
            code: 3,
          },
          {
            code: 4,
          },
        ],
      },
      {
        name: "Порядок задаётся массивом b",
        args: [
          [
            {
              code: 0,
            },
            {
              code: 1,
            },
            {
              code: 3,
            },
            {
              code: 4,
            },
          ],
          [
            {
              code: 3,
            },
            {
              code: 0,
            },
            {
              code: 4,
            },
          ],
        ],
        expected: [
          {
            code: 3,
          },
          {
            code: 0,
          },
          {
            code: 4,
          },
        ],
      },
      {
        name: "Пересечения нет",
        args: [
          [
            {
              code: 1,
            },
            {
              code: 2,
            },
          ],
          [
            {
              code: 3,
            },
            {
              code: 4,
            },
          ],
        ],
        expected: [],
      },
      {
        name: "Повтор code в b учитывается один раз",
        args: [
          [
            {
              code: 1,
              tag: "x",
            },
          ],
          [
            {
              code: 1,
            },
            {
              code: 1,
            },
          ],
        ],
        expected: [
          {
            code: 1,
            tag: "x",
          },
        ],
        hidden: true,
      },
      {
        name: "Пустые массивы",
        args: [
          [],
          [],
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Проверка массива на монотонность (Is Monotonic)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "isMonotonic",
    description: {
      condition: "Реализуйте функцию `isMonotonic(numbers)`, которая принимает массив чисел и определяет, является ли он монотонным — то есть либо полностью не убывающим (каждый следующий элемент больше или равен предыдущему), либо полностью не возрастающим (каждый следующий элемент меньше или равен предыдущему).",
      input: [
        "`numbers` — массив целых или вещественных чисел, длина от 0 до 10^5.",
      ],
      output: "`true`, если массив монотонный (не убывает ИЛИ не возрастает на всём протяжении), иначе `false`.",
      constraints: [
        "`0 ≤ numbers.length ≤ 10^5`",
        "`-10^9 ≤ numbers[i] ≤ 10^9`",
        "Массивы длиной 0 или 1 считаются монотонными по определению",
      ],
      example: "Вход: [1, 2, 2, 3]\nВыход: true (не убывает)\n\nВход: [6, 5, 4, 4]\nВыход: true (не возрастает)\n\nВход: [1, 3, 2]\nВыход: false",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction isMonotonic(numbers) {\n  // TODO: напишите решение здесь\n  return true;\n}\n",
    tests: [
      {
        name: "Не убывает",
        args: [
          [
            1,
            2,
            2,
            3,
          ],
        ],
        expected: true,
      },
      {
        name: "Не возрастает",
        args: [
          [
            6,
            5,
            4,
            4,
          ],
        ],
        expected: true,
      },
      {
        name: "Немонотонный",
        args: [
          [
            1,
            3,
            2,
          ],
        ],
        expected: false,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Один элемент",
        args: [
          [
            7,
          ],
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Все элементы равны",
        args: [
          [
            2,
            2,
            2,
          ],
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Проверка панграммы (Is Pangram)",
    difficulty: 3,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "isPangram",
    description: {
      condition: "Панграмма — это предложение, в котором встречается каждая буква латинского алфавита хотя бы один раз. Напишите функцию, которая принимает строку и возвращает `true`, если строка является панграммой, и `false` в противном случае. Регистр букв игнорируется.",
      input: [
        "`text` — строка длиной от 0 до 1000 символов, может содержать буквы, цифры, пробелы и знаки препинания",
      ],
      output: "`true`, если строка содержит все 26 букв латинского алфавита, иначе `false`",
      constraints: [
        "`0 <= text.length <= 1000`",
        "Регистр не учитывается",
        "Небуквенные символы игнорируются",
      ],
      example: "Вход: `\"The quick brown fox jumps over the lazy dog\"`\nВыход: `true`\n\nВход: `\"Hello, World!\"`\nВыход: `false`\n\nВход: `\"\"`\nВыход: `false`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\n/**\n * @param {string} text\n * @returns {boolean}\n */\nfunction isPangram(text) {\n  // TODO: напишите решение здесь\n  return false;\n}\n",
    tests: [
      {
        name: "Классическая панграмма",
        args: [
          "The quick brown fox jumps over the lazy dog",
        ],
        expected: true,
      },
      {
        name: "Не панграмма",
        args: [
          "Hello, World!",
        ],
        expected: false,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: false,
      },
      {
        name: "Длинная строка без всех букв",
        args: [
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Все буквы, но в разном регистре",
        args: [
          "ABCDEFGhijklmnopQRSTUVwxyz",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Не хватает одной буквы",
        args: [
          "abcdefghijklmnopqrstuvwxy",
        ],
        expected: false,
        hidden: true,
      },
    ],
  },
  {
    title: "Изоморфные строки (Isomorphic Strings)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "isIsomorphic",
    description: {
      condition: "Даны две строки `s` и `t` одинаковой длины. Определите, являются ли они изоморфными.\n\nДве строки изоморфны, если существует взаимно-однозначное соответствие между символами первой строки и символами второй: каждый символ из `s` всегда заменяется на один и тот же символ из `t`, и при этом два разных символа из `s` не могут заменяться на один и тот же символ из `t`.",
      input: [
        "Две строки `s` и `t`, состоящие из строчных латинских букв.",
      ],
      output: "`true`, если строки изоморфны, иначе `false`.",
      constraints: [
        "`1 <= s.length == t.length <= 10^4`",
        "Строки содержат только строчные латинские буквы",
      ],
      example: "Вход: s = \"kotlin\", t = \"python\"  →  Выход: true\nВход: s = \"egg\", t = \"add\"        →  Выход: true\nВход: s = \"foobar\", t = \"bar\"     →  Выход: false  (разные длины — сразу false)\nВход: s = \"abcd\", t = \"aabo\"      →  Выход: false  (два разных символа → один)\nВход: s = \"paper\", t = \"title\"    →  Выход: true",
    },
    starterCode: "function isIsomorphic(s, t) {\n    // TODO: напишите решение здесь\n    return false;\n}\n",
    tests: [
      {
        name: "\"kotlin\" и \"python\"",
        args: [
          "kotlin",
          "python",
        ],
        expected: true,
      },
      {
        name: "\"egg\" и \"add\"",
        args: [
          "egg",
          "add",
        ],
        expected: true,
      },
      {
        name: "Разные длины",
        args: [
          "foobar",
          "bar",
        ],
        expected: false,
      },
      {
        name: "Два символа в один",
        args: [
          "abcd",
          "aabo",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "\"paper\" и \"title\"",
        args: [
          "paper",
          "title",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Пустые строки",
        args: [
          "",
          "",
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Склейка строк с адаптивным разделителем (Join Strings With Adaptive Delimiter)",
    difficulty: 2,
    categories: [
      "Strings",
      "Arrays",
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "strjoin",
    description: {
      condition: "Реализуйте функцию, которая склеивает список строк в одну строку, выбирая разделитель в зависимости от количества элементов:\n\nесли элементов 3 или меньше — использовать разделитель `.` (точка)\n\nесли элементов больше 3 — использовать разделитель `-` (дефис)",
      input: [
        "`strings` — массив строк (0 ≤ длина ≤ 20)",
      ],
      output: "Строка — элементы массива, склеенные выбранным разделителем.",
      constraints: [
        "0 ≤ strings.length ≤ 20",
        "каждая строка состоит из латинских букв, длина от 1 до 20 символов",
      ],
      example: "Вход: [\"a\", \"b\", \"c\"]\nВыход: \"a.b.c\"\n\nВход: [\"a\", \"b\", \"c\", \"d\", \"e\", \"f\"]\nВыход: \"a-b-c-d-e-f\"\n\nВход: []\nВыход: \"\"\n\nВход: [\"a\"]\nВыход: \"a\"",
    },
    starterCode: "function strjoin(strings) {\n  // TODO: напишите решение здесь\n  return \"\";\n}\n",
    tests: [
      {
        name: "Три элемента — точка",
        args: [
          [
            "a",
            "b",
            "c",
          ],
        ],
        expected: "a.b.c",
      },
      {
        name: "Шесть элементов — дефис",
        args: [
          [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
          ],
        ],
        expected: "a-b-c-d-e-f",
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: "",
      },
      {
        name: "Один элемент",
        args: [
          [
            "a",
          ],
        ],
        expected: "a",
        hidden: true,
      },
      {
        name: "Четыре элемента — уже дефис",
        args: [
          [
            "a",
            "b",
            "c",
            "d",
          ],
        ],
        expected: "a-b-c-d",
        hidden: true,
      },
    ],
  },
  {
    title: "K ближайших чисел (K Closest Numbers)",
    difficulty: 3,
    categories: [
      "Search",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "kClosestNumbers",
    description: {
      condition: "Дан отсортированный по возрастанию массив `nums`, индекс `index` и число `k`.\n\nНужно вернуть `k` чисел из массива, которые ближе всего по значению к числу `nums[index]`. Сам элемент `nums[index]` в результат включать нельзя.\n\nЧтобы результат был однозначным: при равном расстоянии выбирается меньшее число, а итоговый массив возвращается отсортированным по возрастанию.",
      input: [
        "`nums` — отсортированный по возрастанию массив чисел",
        "`index` — индекс опорного элемента",
        "`k` — сколько ближайших чисел вернуть",
      ],
      output: "Массив из `k` чисел, отсортированный по возрастанию",
      constraints: [
        "`0 <= index < nums.length`",
        "`0 <= k < nums.length`",
        "Числа в массиве уникальны",
      ],
      example: "Вход: nums = [1, 5, 7, 8, 9, 11, 15, 18], index = 4, k = 5\nВыход: [5, 7, 8, 11, 15]",
    },
    starterCode: "function kClosestNumbers(nums, index, k) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Пример из условия",
        args: [
          [
            1,
            5,
            7,
            8,
            9,
            11,
            15,
            18,
          ],
          4,
          5,
        ],
        expected: [
          5,
          7,
          8,
          11,
          15,
        ],
      },
      {
        name: "k = 1",
        args: [
          [
            1,
            5,
            7,
            8,
            9,
            11,
            15,
            18,
          ],
          4,
          1,
        ],
        expected: [
          8,
        ],
      },
      {
        name: "k = 0",
        args: [
          [
            1,
            2,
            3,
          ],
          1,
          0,
        ],
        expected: [],
      },
      {
        name: "Опорный элемент в начале",
        args: [
          [
            1,
            2,
            3,
            10,
          ],
          0,
          2,
        ],
        expected: [
          2,
          3,
        ],
        hidden: true,
      },
      {
        name: "При равном расстоянии берётся меньшее число",
        args: [
          [
            1,
            2,
            3,
          ],
          1,
          1,
        ],
        expected: [
          1,
        ],
        hidden: true,
      },
      {
        name: "Все элементы, кроме опорного",
        args: [
          [
            4,
            8,
            12,
          ],
          1,
          2,
        ],
        expected: [
          4,
          12,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Поиск элемента с конца списка (K-th Element From End)",
    difficulty: 2,
    categories: [
      "Linked lists",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "itemFromEnd",
    description: {
      condition: "Дан односвязный список и число `k`.\n\nНужно вернуть значение элемента, который находится на позиции `k` с конца списка.\n\nЕсли такого элемента нет, вернуть `null` / `None` / `nil`.",
      input: [
        "k — целое число\nhead — голова односвязного списка",
      ],
      output: "Значение k-го элемента с конца списка или null / None / nil.",
      constraints: [
        "0 ≤ k ≤ 100000",
        "0 ≤ длина списка ≤ 100000",
        "-10^9 ≤ value ≤ 10^9",
      ],
      example: "k = 0 — последний элемент\nk = 1 — предпоследний элемент\nk = 2 — третий с конца\n\nВход:\nhead = [65, 19, 17, 50, 55, 21, 4]\nk = 3\n\nВыход:\n50",
    },
    starterCode: "// Узел списка: { value: number, next: Item | null }\nfunction itemFromEnd(k, head) {\n    // TODO: напишите решение здесь\n    return null;\n}\n",
    tests: [
      {
        name: "Третий элемент с конца",
        body: "const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);\nreturn solution(3, build([65, 19, 17, 50, 55, 21, 4]));",
        expected: 50,
      },
      {
        name: "k = 0 — последний элемент",
        body: "const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);\nreturn solution(0, build([1, 2, 3]));",
        expected: 3,
      },
      {
        name: "k выходит за границы списка",
        body: "const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);\nreturn solution(5, build([1, 2]));",
        expected: null,
      },
      {
        name: "Пустой список",
        body: "return solution(0, null);",
        expected: null,
        hidden: true,
      },
      {
        name: "Первый элемент списка",
        body: "const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);\nreturn solution(2, build([7, 8, 9]));",
        expected: 7,
        hidden: true,
      },
    ],
  },
  {
    title: "Кратчайший путь коня (Knight Shortest Path)",
    difficulty: 3,
    categories: [
      "Queue",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "knightShortestPath",
    description: {
      condition: "Дана шахматная доска размера `N × N` в виде массива строк: `\".\"` — свободная клетка, `\"#\"` — заблокированная.\n\nВ клетке `(x1, y1)` стоит конь. Нужно найти самый короткий маршрут до клетки `(x2, y2)`. Конь ходит стандартным шахматным ходом: `(±2, ±1)` и `(±1, ±2)`. На заблокированные клетки ходить нельзя.\n\nЕсли путь существует — вернуть массив координат маршрута от старта до финиша включительно. Если пути нет — вернуть `null`. Кратчайших маршрутов может быть несколько, подойдёт любой.",
      input: [
        "`board` — массив из `N` строк длины `N`",
        "`x1`, `y1` — координаты старта (отсчёт с нуля, `x` — строка, `y` — столбец)",
        "`x2`, `y2` — координаты финиша",
      ],
      output: "Массив координат `[[x1, y1], ..., [x2, y2]]` либо `null`",
      constraints: [
        "`1 <= N <= 50`",
        "Старт и финиш — свободные клетки",
      ],
      example: "Вход:\nboard = [\n  \"...\",\n  \"...\",\n  \"...\"\n]\nx1 = 0, y1 = 0, x2 = 1, y2 = 2\n\nВыход: [[0, 0], [1, 2]]",
    },
    starterCode: "function knightShortestPath(board, x1, y1, x2, y2) {\n  // TODO: напишите решение здесь\n  return null;\n}\n",
    tests: [
      {
        name: "Один ход",
        body: "return solution([\"...\", \"...\", \"...\"], 0, 0, 1, 2);",
        expected: [
          [
            0,
            0,
          ],
          [
            1,
            2,
          ],
        ],
      },
      {
        name: "Старт совпадает с финишем",
        body: "return solution([\"...\", \"...\", \"...\"], 1, 1, 1, 1);",
        expected: [
          [
            1,
            1,
          ],
        ],
      },
      {
        name: "Пути нет — конь заперт",
        body: "return solution([\"..#\", \"###\", \"###\"], 0, 0, 0, 1);",
        expected: null,
      },
      {
        name: "Маршрут корректен и кратчайший",
        body: "const board = [\".....\", \".....\", \".....\", \".....\", \".....\"];\nconst path = solution(board, 0, 0, 4, 4);\nconst moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];\nconst legal = path.every(([x, y], i) => {\n  if (i === 0) return true;\n  const [px, py] = path[i - 1];\n  return moves.some(([dx, dy]) => px + dx === x && py + dy === y);\n});\nreturn [path.length, legal, path[0], path[path.length - 1]];",
        expected: [
          5,
          true,
          [
            0,
            0,
          ],
          [
            4,
            4,
          ],
        ],
        hidden: true,
      },
      {
        name: "Обход препятствий",
        body: "const board = [\".....\", \".....\", \"##.##\", \".....\", \".....\"];\nconst path = solution(board, 0, 0, 4, 4);\nreturn [Array.isArray(path), path[0], path[path.length - 1]];",
        expected: [
          true,
          [
            0,
            0,
          ],
          [
            4,
            4,
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Дополнение строки пробелами слева (Left Pad)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "leftPad",
    description: {
      condition: "Напишите функцию `leftPad`, которая добавляет слева к строке пробелы. Функция принимает два аргумента: число, обозначающее минимальную длину результата, и строку, которую нужно дополнить, если её длина меньше.\n\nПравила:\n\nЕсли длина строки меньше указанной минимальной длины, добавляются пробелы слева\n\nЕсли длина строки больше или равна указанной длине, строка возвращается без изменений\n\nФункция должна возвращать новую строку, не изменяя исходную",
      input: [],
      output: "",
      constraints: [
        "Минимальная длина: 0 ≤ N ≤ 1000",
        "Длина строки: 0 ≤ length ≤ 1000",
        "Символы: любые",
        "Время выполнения: O(N)",
        "Память: O(N)",
      ],
      example: "leftPad(6, 'test')    // -> \"  test\" (2 пробела слева)\nleftPad(10, 'hello')  // -> \"     hello\" (5 пробелов)\nleftPad(3, 'test')    // -> \"test\" (длина уже больше)\nleftPad(0, 'abc')     // -> \"abc\"",
    },
    starterCode: "function leftPad(symbolCount, str) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "leftPad(6, 'test')",
        args: [
          6,
          "test",
        ],
        expected: "  test",
      },
      {
        name: "leftPad(10, 'hello')",
        args: [
          10,
          "hello",
        ],
        expected: "     hello",
      },
      {
        name: "Строка уже длиннее",
        args: [
          3,
          "test",
        ],
        expected: "test",
      },
      {
        name: "Нулевая длина",
        args: [
          0,
          "abc",
        ],
        expected: "abc",
        hidden: true,
      },
      {
        name: "Длина совпадает",
        args: [
          3,
          "abc",
        ],
        expected: "abc",
        hidden: true,
      },
      {
        name: "Пустая строка",
        args: [
          2,
          "",
        ],
        expected: "  ",
        hidden: true,
      },
    ],
  },
  {
    title: "Длина самой длинной подстроки без повторяющихся символов (Length of Longest Substring Without Repeating Characters)",
    difficulty: 3,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "lengthOfLongestSubstring",
    description: {
      condition: "Дана строка `s`. Найдите длину самой длинной подстроки, в которой все символы различны (не повторяются).",
      input: [
        "`s` — строка, может содержать английские буквы, цифры, символы и пробелы.",
      ],
      output: "Целое число — длина самой длинной подстроки без повторяющихся символов.",
      constraints: [
        "`0 <= s.length <= 5 * 10^4`",
      ],
      example: "Вход: \"abcabcbb\" → Выход: 3 (\"abc\")\nВход: \"cccccccc\" → Выход: 1 (\"c\")\nВход: \"pwwkew\"   → Выход: 3 (\"wke\")\nВход: \"\"         → Выход: 0",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction lengthOfLongestSubstring(s) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "\"abcabcbb\"",
        args: [
          "abcabcbb",
        ],
        expected: 3,
      },
      {
        name: "\"cccccccc\"",
        args: [
          "cccccccc",
        ],
        expected: 1,
      },
      {
        name: "\"pwwkew\"",
        args: [
          "pwwkew",
        ],
        expected: 3,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Все символы различны",
        args: [
          "abcdef",
        ],
        expected: 6,
        hidden: true,
      },
      {
        name: "Повтор в самом конце",
        args: [
          "abcda",
        ],
        expected: 4,
        hidden: true,
      },
    ],
  },
  {
    title: "Ограниченный счётчик вызовов (Limited Call Counter)",
    difficulty: 2,
    categories: [
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "canGetCount",
    description: {
      condition: "Необходимо реализовать функцию `canGetCount`, которая принимает число `n` и возвращает новую функцию.\n\nВозвращённая функция при каждом вызове должна:\n\nпервые `n` раз возвращать строку `\"yes\"`;\n\nначиная с вызова номер `n + 1` возвращать строку `\"no\"`.\n\nКаждый вызов функции должен уменьшать количество оставшихся успешных вызовов.",
      input: [
        "На вход подаётся целое число `n`.",
      ],
      output: "Функция `canGetCount(n)` должна вернуть функцию, которая при вызове возвращает строку `\"yes\"` или `\"no\"`.",
      constraints: [
        "0 <= n <= 10^6",
      ],
      example: "Вход:\n\nconst getOne = canGetCount(2);\n\nВыход:\n\ngetOne() === \"yes\"\ngetOne() === \"yes\"\ngetOne() === \"no\"",
    },
    starterCode: "function canGetCount(n) {\n  // TODO: напишите решение здесь\n}\n",
    tests: [
      {
        name: "Два разрешённых вызова",
        body: "const f = solution(2);\nreturn [f(), f(), f()];",
        expected: [
          "yes",
          "yes",
          "no",
        ],
      },
      {
        name: "n = 0 — сразу no",
        body: "const f = solution(0);\nreturn f();",
        expected: "no",
      },
      {
        name: "Счётчики независимы",
        body: "const a = solution(1);\nconst b = solution(1);\na();\nreturn [a(), b()];",
        expected: [
          "no",
          "yes",
        ],
        hidden: true,
      },
      {
        name: "После исчерпания всегда no",
        body: "const f = solution(1);\nf(); f(); f();\nreturn f();",
        expected: "no",
        hidden: true,
      },
    ],
  },
  {
    title: "Самый длинный палиндром (Longest Palindrome)",
    difficulty: 3,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "longestPalindrome",
    description: {
      condition: "Напишите функцию `longestPalindrome`, которая принимает строку `s` и возвращает длину самой длинной подстроки, которая читается одинаково слева направо и справа налево (палиндром). Если строка пустая, функция должна вернуть 0.",
      input: [],
      output: "",
      constraints: [
        "Строка может содержать буквы, пробелы и знаки пунктуации",
        "Регистр учитывается (палиндром чувствителен к регистру)",
        "Длина строки не превышает 1000 символов",
        "Если есть несколько палиндромов одинаковой длины, возвращается их длина",
      ],
      example: "Вход: \"baabcd\"\nВыход: 4\nПояснение: Самый длинный палиндром - \"baab\" (индексы 0-3)\n\nВход: \"I like racecars that go fast\"\nВыход: 7\nПояснение: Самый длинный палиндром - \"racecar\"\n\nВход: \"a\"\nВыход: 1\nПояснение: Одиночный символ всегда палиндром\n\nВход: \"\"\nВыход: 0",
    },
    starterCode: "function longestPalindrome(s) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "\"baabcd\" → 4",
        args: [
          "baabcd",
        ],
        expected: 4,
      },
      {
        name: "Палиндром внутри предложения",
        args: [
          "I like racecars that go fast",
        ],
        expected: 7,
      },
      {
        name: "Один символ",
        args: [
          "a",
        ],
        expected: 1,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Палиндромов длиннее 1 нет",
        args: [
          "abcd",
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Вся строка — палиндром",
        args: [
          "abba",
        ],
        expected: 4,
        hidden: true,
      },
    ],
  },
  {
    title: "Самый длинный промежуток тишины (Longest Silence Period)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "longestSilence",
    description: {
      condition: "В функцию передается массив со значениями времени (в минутах от полуночи), в которые звенит будильник. Каждый будильник звенит ровно одну минуту. Необходимо найти самый длинный промежуток времени (в минутах), когда ни один будильник не будет звенеть.\n\nВажные условия:\n\nВремя измеряется в минутах от полуночи (0:00 = 0, 23:59 = 1439)\n\nБудильник звенит ровно 1 минуту (включительно)\n\nЕсли будильник заведен на время X, то тишина отсутствует в интервале [X, X] (одна минута)\n\nДень начинается в 0 минут и заканчивается в 1439 минут (включительно)\n\nНужно учитывать тишину до первого будильника и после последнего\n\nПример 1:\n\nПример 2:\n\nПример 3:",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 0 ≤ length ≤ 1000",
        "Значения времени: 0 ≤ time ≤ 1439",
        "Массив может быть неотсортирован",
        "В массиве могут быть дубликаты (несколько будильников на одно время)",
      ],
      example: "Вход: [10, 100, 200]\nРазбор:\n- Тишина от 0 до 9: 10 минут\n- Тишина от 11 до 99: 89 минут (самый длинный промежуток)\n- Тишина от 101 до 199: 99 минут\n- Тишина от 201 до 1439: 1239 минут\n\nРезультат: 1239\n\nВход: [5, 10, 15]\nРезультат: 1424 (тишина с 16 до 1439)\n\nВход: [0, 100, 1439]\nРезультат: 1339 (тишина с 101 до 1438)",
    },
    starterCode: "function longestSilence(alarms) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "[10, 100, 200] — тишина до полуночи",
        args: [
          [
            10,
            100,
            200,
          ],
        ],
        expected: 1239,
      },
      {
        name: "[5, 10, 15]",
        args: [
          [
            5,
            10,
            15,
          ],
        ],
        expected: 1424,
      },
      {
        name: "Будильник в конце дня",
        args: [
          [
            0,
            100,
            1439,
          ],
        ],
        expected: 1338,
      },
      {
        name: "Один будильник посреди дня",
        args: [
          [
            720,
          ],
        ],
        expected: 720,
        hidden: true,
      },
      {
        name: "Будильники не отсортированы",
        args: [
          [
            200,
            10,
            100,
          ],
        ],
        expected: 1239,
        hidden: true,
      },
      {
        name: "Будильник в 0:00",
        args: [
          [
            0,
          ],
        ],
        expected: 1439,
        hidden: true,
      },
    ],
  },
  {
    title: "Максимальная длина подряд идущих единиц после удаления одного элемента (Max Consecutive Ones After Deleting One Element)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "maxOnes",
    description: {
      condition: "Дан непустой массив, состоящий только из нулей и единиц. Нужно определить максимальную длину подряд идущих единиц, которую можно получить, если удалить (пропустить) ровно один элемент массива. Удаление одного элемента обязательно, даже если массив состоит целиком из единиц.",
      input: [
        "`nums` — непустой массив целых чисел, каждый элемент равен 0 или 1",
      ],
      output: "Целое число — максимальная длина подряд идущих единиц после обязательного удаления одного элемента",
      constraints: [
        "`1 <= nums.length <= 10^5`",
        "`nums[i]` равен 0 или 1",
      ],
      example: "Вход: nums = [1, 1, 0, 1]\nВыход: 3\n\nВход: nums = [1, 1, 0, 0, 1]\nВыход: 2",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction maxOnes(nums) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "[1, 1, 0, 1]",
        args: [
          [
            1,
            1,
            0,
            1,
          ],
        ],
        expected: 3,
      },
      {
        name: "[1, 1, 0, 0, 1]",
        args: [
          [
            1,
            1,
            0,
            0,
            1,
          ],
        ],
        expected: 2,
      },
      {
        name: "Все единицы — удаление обязательно",
        args: [
          [
            1,
            1,
            1,
          ],
        ],
        expected: 2,
      },
      {
        name: "Все нули",
        args: [
          [
            0,
            0,
          ],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Один элемент",
        args: [
          [
            1,
          ],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Удаление склеивает две группы",
        args: [
          [
            1,
            1,
            1,
            0,
            1,
            1,
          ],
        ],
        expected: 5,
        hidden: true,
      },
    ],
  },
  {
    title: "Максимальная роль по приоритету (Max Priority Role)",
    difficulty: 2,
    categories: [
      "Dictionaries",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findMaxPriorityRole",
    description: {
      condition: "Дан словарь `priorities`, где ключ — название роли, а значение — числовой приоритет этой роли.\n\nТакже дан массив `roles`, содержащий список допустимых ролей.\n\nНеобходимо написать функцию, которая вернёт роль из массива `roles` с максимальным приоритетом по словарю `priorities`.\n\nЕсли массив `roles` пустой или ни одной роли из массива нет в словаре, нужно вернуть пустую строку.",
      input: [
        "`priorities` — словарь, где ключи являются строками, а значения — числами.",
        "`roles` — массив строк с допустимыми ролями.",
      ],
      output: "Строка — роль с максимальным приоритетом.\nЕсли подходящей роли нет — пустая строка `\"\"`.",
      constraints: [
        "`0 <= roles.length <= 10^5`",
        "`0 <= количество ключей в priorities <= 10^5`",
        "Значения приоритетов — целые числа от `-10^9` до `10^9`",
        "Названия ролей состоят из латинских букв, цифр и `_`",
      ],
      example: "Вход:\n\npriorities = {\n  guest: 1,\n  user: 2,\n  admin: 100,\n  moderator: 10,\n  vip: 50\n}\n\nroles = ['user', 'vip', 'guest']\n\nВыход:\n\n\"vip\"",
    },
    starterCode: "function findMaxPriorityRole(priorities, roles) {\n  // TODO: напишите решение здесь\n  return \"\";\n}\n",
    tests: [
      {
        name: "Максимум среди допустимых ролей",
        args: [
          {
            guest: 1,
            user: 2,
            admin: 100,
            moderator: 10,
            vip: 50,
          },
          [
            "user",
            "vip",
            "guest",
          ],
        ],
        expected: "vip",
      },
      {
        name: "Пустой список ролей",
        args: [
          {
            admin: 1,
          },
          [],
        ],
        expected: "",
      },
      {
        name: "Ни одной роли нет в словаре",
        args: [
          {
            admin: 1,
          },
          [
            "ghost",
          ],
        ],
        expected: "",
      },
      {
        name: "Часть ролей отсутствует в словаре",
        args: [
          {
            user: 2,
            admin: 100,
          },
          [
            "ghost",
            "user",
          ],
        ],
        expected: "user",
        hidden: true,
      },
      {
        name: "Одна роль",
        args: [
          {
            admin: 100,
          },
          [
            "admin",
          ],
        ],
        expected: "admin",
        hidden: true,
      },
    ],
  },
  {
    title: "Стек с максимумом (Max Stack)",
    difficulty: 3,
    categories: [
      "Stack",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "MyStack",
    description: {
      condition: "Реализуйте стек целочисленных значений `MyStack` с методами:\n\n`push(value)` — добавить значение в стек.\n\n`pop()` — удалить верхний элемент стека и вернуть его.\n\n`max()` — вернуть максимальное значение в стеке.\n\nВсе методы должны работать за O(1). Если вызывается `pop()` или `max()` для пустого стека, нужно вернуть `null`.",
      input: [
        "Последовательность вызовов `push` / `pop` / `max`",
      ],
      output: "`push` ничего не возвращает; `pop` возвращает снятый элемент или `null`; `max` — максимум в стеке или `null`",
      constraints: [
        "Все операции — за O(1)",
        "Значения — целые числа",
      ],
      example: "const stack = new MyStack();\nstack.push(1);\nstack.push(3);\nstack.push(7);\nstack.push(1);\n\nstack.max();  // -> 7\nstack.pop();  // -> 1\nstack.max();  // -> 7\nstack.pop();  // -> 7\nstack.max();  // -> 3",
    },
    starterCode: "class MyStack {\n  constructor() {\n    // TODO: напишите решение здесь\n  }\n\n  push(value) {\n    // TODO: напишите решение здесь\n  }\n\n  pop() {\n    // TODO: напишите решение здесь\n    return null;\n  }\n\n  max() {\n    // TODO: напишите решение здесь\n    return null;\n  }\n}\n",
    tests: [
      {
        name: "Пример из условия",
        body: "const s = new solution();\ns.push(1); s.push(3); s.push(7); s.push(1);\nreturn [s.max(), s.pop(), s.max(), s.pop(), s.max()];",
        expected: [
          7,
          1,
          7,
          7,
          3,
        ],
      },
      {
        name: "Пустой стек",
        body: "const s = new solution();\nreturn [s.pop(), s.max()];",
        expected: [
          null,
          null,
        ],
      },
      {
        name: "Максимум обновляется после pop",
        body: "const s = new solution();\ns.push(5); s.push(2);\ns.pop();\nreturn s.max();",
        expected: 5,
      },
      {
        name: "Повторяющийся максимум",
        body: "const s = new solution();\ns.push(4); s.push(4);\ns.pop();\nreturn s.max();",
        expected: 4,
        hidden: true,
      },
      {
        name: "Стек опустошён до конца",
        body: "const s = new solution();\ns.push(1); s.push(2);\ns.pop(); s.pop();\nreturn [s.pop(), s.max()];",
        expected: [
          null,
          null,
        ],
        hidden: true,
      },
      {
        name: "Отрицательные значения",
        body: "const s = new solution();\ns.push(-5); s.push(-1); s.push(-3);\nreturn [s.max(), s.pop(), s.max()];",
        expected: [
          -1,
          -3,
          -1,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Место в кинотеатре максимально далеко от других зрителей (Maximize Distance to Closest Person)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "maxDistToClosestPerson",
    description: {
      condition: "Места в кинотеатре расположены в один ряд и представлены массивом из нулей и единиц, где `1` — занятое место, `0` — свободное. Только что пришедший зритель выбирает свободное место так, чтобы расстояние до ближайшего уже сидящего зрителя было максимальным. Напишите функцию, которая возвращает это максимальное расстояние (в местах) от выбранного места до ближайшего занятого. Гарантируется, что в ряду есть хотя бы одно занятое место и хотя бы одно свободное.",
      input: [
        "`seats` — массив из `0` и `1`, длина от 2 до 10^5, содержит хотя бы одну `1` и хотя бы один `0`.",
      ],
      output: "Целое число — максимальное расстояние от выбранного места до ближайшего занятого.",
      constraints: [
        "`2 <= seats.length <= 10^5`",
        "`seats[i]` равен `0` или `1`",
        "гарантированно есть хотя бы одно занятое и хотя бы одно свободное место",
      ],
      example: "Вход: [1, 0, 0, 0, 0, 1]\nВыход: 2\n\nВход: [1, 0, 1, 0, 0, 1, 0, 0, 0, 1]\nВыход: 2\n\nВход: [1, 0, 1, 0]\nВыход: 1",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction maxDistToClosestPerson(seats) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "[1, 0, 0, 0, 0, 1]",
        args: [
          [
            1,
            0,
            0,
            0,
            0,
            1,
          ],
        ],
        expected: 2,
      },
      {
        name: "[1, 0, 1, 0, 0, 1, 0, 0, 0, 1]",
        args: [
          [
            1,
            0,
            1,
            0,
            0,
            1,
            0,
            0,
            0,
            1,
          ],
        ],
        expected: 2,
      },
      {
        name: "Свободное место в конце",
        args: [
          [
            1,
            0,
            1,
            0,
          ],
        ],
        expected: 1,
      },
      {
        name: "Свободные места в начале ряда",
        args: [
          [
            0,
            0,
            0,
            1,
          ],
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "Два места",
        args: [
          [
            1,
            0,
          ],
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Длинный промежуток в середине",
        args: [
          [
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
          ],
        ],
        expected: 3,
        hidden: true,
      },
    ],
  },
  {
    title: "Максимальное число из тех же цифр (Maximum Number from Digits)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getMaxNumber",
    description: {
      condition: "Напишите функцию `getMaxNumber`, которая принимает число (целое или с плавающей точкой) и возвращает максимально возможное число, составленное из тех же цифр, что и исходное число. Знак числа игнорируется (все цифры считаются положительными). Если передан некорректный аргумент (не число), функция возвращает `NaN`.\n\nПравила:\n\nЦифры числа сортируются в порядке убывания\n\nДесятичная точка игнорируется (все цифры считаются частью одного числа)\n\nЗнак минус игнорируется (все цифры считаются положительными)\n\nРезультат возвращается как целое число (без ведущих нулей)",
      input: [],
      output: "",
      constraints: [
        "Входное значение может быть числом или другим типом",
        "Число может быть целым или дробным",
        "Число может быть отрицательным",
        "Если после сортировки первая цифра 0, это означает, что исходное число состояло только из нулей",
      ],
      example: "Вход: 6118\nВыход: 8611\nПояснение: Цифры: 6,1,1,8 → сортируем: 8,6,1,1 → 8611\n\nВход: 17.5\nВыход: 751\nПояснение: Цифры: 1,7,5 → сортируем: 7,5,1 → 751\n\nВход: 100\nВыход: 100\nПояснение: Цифры: 1,0,0 → сортируем: 1,0,0 → 100\n\nВход: Hello\"\nВыход: NaN",
    },
    starterCode: "function getMaxNumber(input) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "6118",
        args: [
          6118,
        ],
        expected: 8611,
      },
      {
        name: "Дробное число",
        args: [
          17.5,
        ],
        expected: 751,
      },
      {
        name: "Нули в конце",
        args: [
          100,
        ],
        expected: 100,
      },
      {
        name: "Не число → NaN",
        args: [
          "Hello",
        ],
        expected: NaN,
        hidden: true,
      },
      {
        name: "Отрицательное число",
        args: [
          -321,
        ],
        expected: 321,
        hidden: true,
      },
      {
        name: "Одна цифра",
        args: [
          7,
        ],
        expected: 7,
        hidden: true,
      },
    ],
  },
  {
    title: "Максимальное число в массиве (Maximum Number)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findMax",
    description: {
      condition: "Напишите функцию `findMax`, которая принимает массив чисел и возвращает максимальное число из массива.",
      input: [],
      output: "",
      constraints: [
        "Массив содержит только числа (целые или с плавающей точкой)",
        "Массив всегда содержит хотя бы один элемент",
        "Длина массива не превышает 1000 элементов",
      ],
      example: "Вход: [1, 2, 5]\nВыход: 5\n\nВход: [10, -5, 3, 8]\nВыход: 10\n\nВход: [-1, -5, -3]\nВыход: -1\n\nВход: [42]\nВыход: 42",
    },
    starterCode: "function findMax(arr) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "[1, 2, 5]",
        args: [
          [
            1,
            2,
            5,
          ],
        ],
        expected: 5,
      },
      {
        name: "[10, -5, 3, 8]",
        args: [
          [
            10,
            -5,
            3,
            8,
          ],
        ],
        expected: 10,
      },
      {
        name: "Только отрицательные",
        args: [
          [
            -1,
            -5,
            -3,
          ],
        ],
        expected: -1,
      },
      {
        name: "Один элемент",
        args: [
          [
            42,
          ],
        ],
        expected: 42,
        hidden: true,
      },
      {
        name: "Максимум в конце",
        args: [
          [
            1,
            2,
            3,
            99,
          ],
        ],
        expected: 99,
        hidden: true,
      },
    ],
  },
  {
    title: "Максимальное количество единиц в строке матрицы (Maximum Ones in Matrix Row)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "maxOnes",
    description: {
      condition: "На вход подаётся 2D матрица из `\"0\"` и `\"1\"`.\n\nГарантии:\n\nВ каждой строке сначала идут `0`, затем после первой единицы идут только единицы.\n\nНужно найти строку с наибольшим количеством единиц и вернуть это количество.",
      input: [],
      output: "",
      constraints: [],
      example: "grid = [\n    [\"0\",\"0\",\"0\",\"1\",\"1\"],\n    [\"0\",\"0\",\"1\",\"1\",\"1\"],\n    [\"0\",\"0\",\"0\",\"0\",\"1\"],\n    [\"0\",\"1\",\"1\",\"1\",\"1\"]\n]\n# -> 4\n\ngrid = [\n    [\"0\",\"0\",\"0\",\"0\",\"0\"],\n    [\"0\",\"0\",\"0\",\"0\",\"0\"],\n    [\"0\",\"0\",\"0\",\"0\",\"0\"],\n    [\"0\",\"0\",\"0\",\"0\",\"0\"]\n]\n# -> 0\n\nИдея решения:\n\nИдём сверху вниз и справа налево.\n\nНаходим самую левую единицу в первой строке.\n\nВ каждой следующей строке проверяем этот индекс:если там `0` → идём ниже,\n\nесли `1` → ищем новую самую левую единицу и продолжаем сравнивать.\n\nКоличество единиц в строке = `длина_строки - индекс_самой_левой_единицы`.",
    },
    starterCode: "function maxOnes(grid) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "Максимум в последней строке",
        args: [
          [
            [
              "0",
              "0",
              "0",
              "1",
              "1",
            ],
            [
              "0",
              "0",
              "1",
              "1",
              "1",
            ],
            [
              "0",
              "0",
              "0",
              "0",
              "1",
            ],
            [
              "0",
              "1",
              "1",
              "1",
              "1",
            ],
          ],
        ],
        expected: 4,
      },
      {
        name: "Единиц нет вовсе",
        args: [
          [
            [
              "0",
              "0",
            ],
            [
              "0",
              "0",
            ],
          ],
        ],
        expected: 0,
      },
      {
        name: "Одна строка",
        args: [
          [
            [
              "1",
              "1",
              "1",
            ],
          ],
        ],
        expected: 3,
      },
      {
        name: "Вся строка из единиц",
        args: [
          [
            [
              "0",
              "1",
            ],
            [
              "1",
              "1",
            ],
          ],
        ],
        expected: 2,
        hidden: true,
      },
      {
        name: "Пустая матрица",
        args: [
          [],
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Максимальная сумма подмассива (Maximum Subarray Sum)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "maxSubarraySum",
    description: {
      condition: "Реализуйте функцию `maxSubarraySum()`, которая находит максимальную сумму непрерывного подмассива в массиве целых чисел.\n\nПараметры функции:\n\n`arr` (массив целых чисел) - исходный массив",
      input: [],
      output: "",
      constraints: [
        "Подмассив должен быть непрерывным",
        "Функция должна работать за O(n) времени",
        "Если массив пустой, вернуть 0",
        "Если все числа отрицательные, вернуть максимальный элемент",
        "Длина массива ≤ 10^5",
        "Значения элементов: -10^4 ≤ arr[i] ≤ 10^4",
      ],
      example: "const input = [-2, 1, -3, 4, -1, 2, 1, -5, 4];\nconst output = 6; // Сумма подмассива [4, -1, 2, 1]",
    },
    starterCode: "function maxSubarraySum(arr) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "Классический пример",
        args: [
          [
            -2,
            1,
            -3,
            4,
            -1,
            2,
            1,
            -5,
            4,
          ],
        ],
        expected: 6,
      },
      {
        name: "Все элементы положительные",
        args: [
          [
            1,
            2,
            3,
          ],
        ],
        expected: 6,
      },
      {
        name: "Все элементы отрицательные",
        args: [
          [
            -3,
            -1,
            -7,
          ],
        ],
        expected: -1,
      },
      {
        name: "Один элемент",
        args: [
          [
            5,
          ],
        ],
        expected: 5,
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Максимум — весь массив",
        args: [
          [
            2,
            -1,
            3,
          ],
        ],
        expected: 4,
        hidden: true,
      },
    ],
  },
  {
    title: "Максимальная сумма в треугольнике (Maximum Triangle Sum)",
    difficulty: 3,
    categories: [
      "Dynamic programming",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "maxTriangleSum",
    description: {
      condition: "Напишите функцию `maxTriangleSum`, которая принимает двумерный массив в виде треугольника (горки) и возвращает наибольшую возможную сумму чисел от вершины до основания. С числа сверху можно переходить только на нижнее число и его соседей (левый и правый).\n\nПравила перемещения:\n\nНачинаем с вершины треугольника (первый элемент)\n\nС текущего числа можно перейти на число в следующем ряду под текущим индексом или под индексом `+1`\n\nНеобходимо найти путь с максимальной суммой всех чисел на пути",
      input: [],
      output: "",
      constraints: [
        "Массив всегда имеет треугольную форму (1, 2, 3, ... элементов)",
        "Глубина может быть любой",
        "Числа могут быть отрицательными",
        "Нельзя использовать встроенные функции для поиска пути",
      ],
      example: "Вход: [\n  [1],\n  [4, 8],\n  [1, 5, 3]\n]\nВыход: 14\nПояснение: Путь 1 → 8 → 5 = 14\n\nВход: [\n  [1],\n  [-3, -4],\n  [2, 1, 9]\n]\nВыход: 7\nПояснение: Путь 1 → -3 → 9 = 7\n\nВход: [\n  [5],\n  [2, 3],\n  [1, 1, 1]\n]\nВыход: 9\nПояснение: Путь 5 → 3 → 1 = 9\n\nВход: [\n  [10]\n]\nВыход: 10\nПояснение: Только один элемент",
    },
    starterCode: "function maxTriangleSum(triangle) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "Путь 1 → 8 → 5",
        args: [
          [
            [
              1,
            ],
            [
              4,
              8,
            ],
            [
              1,
              5,
              3,
            ],
          ],
        ],
        expected: 14,
      },
      {
        name: "Отрицательные числа по пути",
        args: [
          [
            [
              1,
            ],
            [
              -3,
              -4,
            ],
            [
              2,
              1,
              9,
            ],
          ],
        ],
        expected: 6,
      },
      {
        name: "Путь 5 → 3 → 1",
        args: [
          [
            [
              5,
            ],
            [
              2,
              3,
            ],
            [
              1,
              1,
              1,
            ],
          ],
        ],
        expected: 9,
      },
      {
        name: "Один элемент",
        args: [
          [
            [
              10,
            ],
          ],
        ],
        expected: 10,
        hidden: true,
      },
      {
        name: "Жадный выбор не оптимален",
        args: [
          [
            [
              1,
            ],
            [
              9,
              2,
            ],
            [
              0,
              0,
              100,
            ],
          ],
        ],
        expected: 103,
        hidden: true,
      },
    ],
  },
  {
    title: "Медиана двух отсортированных массивов (Median of Two Sorted Arrays)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findMedianSortedArrays",
    description: {
      condition: "Даны два массива целых чисел, каждый из которых отсортирован по возрастанию. Найдите медиану объединённого массива — элемент, который стоял бы на средней позиции, если бы оба массива были объединены и отсортированы.\n\nЕсли общее количество элементов чётное, верните меньший из двух центральных элементов (элемент с индексом `(total / 2) - 1` после целочисленного деления).",
      input: [
        "`nums1` — отсортированный массив целых чисел, длина от 0 до 1000",
        "`nums2` — отсортированный массив целых чисел, длина от 0 до 1000",
        "Суммарная длина массивов >= 1",
      ],
      output: "Одно целое число — медиана объединённого массива.",
      constraints: [
        "`-10^6 <= nums1[i], nums2[i] <= 10^6`",
        "`0 <= nums1.length, nums2.length <= 1000`",
        "`nums1.length + nums2.length >= 1`",
      ],
      example: "Вход: `nums1 = [1, 3]`, `nums2 = [2]`\nВыход: `2`\n\nВход: `nums1 = [1, 2]`, `nums2 = [3, 4]`\nВыход: `2`\n\nВход: `nums1 = [1, 3, 5]`, `nums2 = [2, 4, 6]`\nВыход: `3`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction findMedianSortedArrays(nums1, nums2) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Нечётная суммарная длина",
        args: [
          [
            1,
            3,
          ],
          [
            2,
          ],
        ],
        expected: 2,
      },
      {
        name: "Чётная длина — меньший из центральных",
        args: [
          [
            1,
            2,
          ],
          [
            3,
            4,
          ],
        ],
        expected: 2,
      },
      {
        name: "Оба массива по три элемента",
        args: [
          [
            1,
            3,
            5,
          ],
          [
            2,
            4,
            6,
          ],
        ],
        expected: 3,
      },
      {
        name: "Один массив пуст",
        args: [
          [],
          [
            7,
          ],
        ],
        expected: 7,
        hidden: true,
      },
      {
        name: "Массивы не пересекаются по диапазону",
        args: [
          [
            1,
            2,
            3,
          ],
          [
            100,
            200,
          ],
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "Повторяющиеся значения",
        args: [
          [
            2,
            2,
          ],
          [
            2,
            2,
          ],
        ],
        expected: 2,
        hidden: true,
      },
    ],
  },
  {
    title: "Мемоизация функции с несколькими аргументами (Memoization with Multiple Arguments)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "memo",
    description: {
      condition: "Напишите функцию `memo` (в Java — статический метод `memoize`), которая принимает другую функцию и возвращает её мемоизированную версию. Мемоизация — это техника оптимизации, при которой результаты вызовов функции кэшируются, чтобы при повторном вызове с теми же аргументами не выполнять вычисления заново.",
      input: [],
      output: "",
      constraints: [
        "Функция может принимать два аргумента (для простоты).",
        "Аргументы — целые числа.",
        "Кэш должен храниться в объекте/словаре/map.",
        "При повторном вызове с теми же аргументами результат должен возвращаться из кэша без повторного вычисления.",
      ],
      example: "Вход: функция pow(2, 3)\nВыход: 8 (вычисляется)\nВход: функция pow(2, 3) повторно\nВыход: 8 (берётся из кэша)\nВход: функция pow(3, 2)\nВыход: 9 (вычисляется)",
    },
    starterCode: "function memo(fn) {\n    // TODO: write your solution here\n    return function(a, b) {\n        return fn(a, b);\n    };\n}\n",
    tests: [
      {
        name: "Повторный вызов берётся из кэша",
        body: "let calls = 0;\nconst pow = (a, b) => { calls++; return a ** b; };\nconst memo = solution(pow);\nreturn [memo(2, 3), memo(2, 3), calls];",
        expected: [
          8,
          8,
          1,
        ],
      },
      {
        name: "Разные аргументы — разные вычисления",
        body: "let calls = 0;\nconst pow = (a, b) => { calls++; return a ** b; };\nconst memo = solution(pow);\nreturn [memo(2, 3), memo(3, 2), calls];",
        expected: [
          8,
          9,
          2,
        ],
      },
      {
        name: "Второй аргумент влияет на ключ кэша",
        body: "const pow = (a, b) => a ** b;\nconst memo = solution(pow);\nmemo(2, 3);\nreturn memo(2, 4);",
        expected: 16,
        hidden: true,
      },
      {
        name: "Кэши независимы для разных обёрток",
        body: "let calls = 0;\nconst fn = (a) => { calls++; return a; };\nconst first = solution(fn);\nconst second = solution(fn);\nfirst(1);\nsecond(1);\nreturn calls;",
        expected: 2,
        hidden: true,
      },
    ],
  },
  {
    title: "Склейка отрезков (Merge Intervals)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "mergeIntervals",
    description: {
      condition: "Дан список отрезков `intervals`, где каждый отрезок представлен массивом из двух чисел:\n\nНужно объединить все пересекающиеся или соприкасающиеся отрезки и вернуть новый список отрезков.\n\nЕсли один отрезок заканчивается в той же точке, где начинается другой, они тоже считаются объединяемыми.\n\nНапример:",
      input: [
        "intervals: массив отрезков",
        "Каждый отрезок имеет вид:",
        "[start, end]",
      ],
      output: "Нужно вернуть массив объединённых отрезков.",
      constraints: [
        "0 <= intervals.length <= 10^4",
        "-10^9 <= start <= end <= 10^9",
      ],
      example: "[start, end]\n\n[1, 3] и [2, 6] → [1, 6]\n[1, 2] и [2, 2] → [1, 2]\n\nВход:\n\n[[1, 3], [2, 6], [8, 10], [15, 18]]\n\nВыход:\n\n[[1, 6], [8, 10], [15, 18]]",
    },
    starterCode: "function mergeIntervals(intervals) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Пример из условия",
        args: [
          [
            [
              1,
              3,
            ],
            [
              2,
              6,
            ],
            [
              8,
              10,
            ],
            [
              15,
              18,
            ],
          ],
        ],
        expected: [
          [
            1,
            6,
          ],
          [
            8,
            10,
          ],
          [
            15,
            18,
          ],
        ],
      },
      {
        name: "Соприкасающиеся отрезки",
        args: [
          [
            [
              1,
              2,
            ],
            [
              2,
              2,
            ],
          ],
        ],
        expected: [
          [
            1,
            2,
          ],
        ],
      },
      {
        name: "Пересечений нет",
        args: [
          [
            [
              1,
              2,
            ],
            [
              5,
              6,
            ],
          ],
        ],
        expected: [
          [
            1,
            2,
          ],
          [
            5,
            6,
          ],
        ],
      },
      {
        name: "Отрезки идут не по порядку",
        args: [
          [
            [
              8,
              10,
            ],
            [
              1,
              3,
            ],
            [
              2,
              6,
            ],
          ],
        ],
        expected: [
          [
            1,
            6,
          ],
          [
            8,
            10,
          ],
        ],
        hidden: true,
      },
      {
        name: "Отрезок полностью внутри другого",
        args: [
          [
            [
              1,
              10,
            ],
            [
              2,
              3,
            ],
          ],
        ],
        expected: [
          [
            1,
            10,
          ],
        ],
        hidden: true,
      },
      {
        name: "Пустой список",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Объединение товаров по названию (Merge Products by Name)",
    difficulty: 3,
    categories: [
      "Grouping",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "mergeProducts",
    description: {
      condition: "Дан массив объектов-товаров. Каждый объект содержит поля `name` (строка), `count` (число) и `price` (число). Несколько объектов могут иметь одинаковое значение `name`. Напишите функцию, которая объединяет все товары с одинаковым именем в один объект, суммируя их поля `count` и `price`. Результирующий массив должен содержать по одному объекту на каждое уникальное имя. Порядок объектов в результате определяется порядком первого появления имени во входном массиве.",
      input: [
        "`products` — массив объектов вида `{ name: string, count: number, price: number }`, длина от 0 до 1000.",
      ],
      output: "Массив объектов того же вида, где каждое имя встречается ровно один раз, а `count` и `price` являются суммами соответствующих полей всех исходных объектов с этим именем.",
      constraints: [
        "`0 <= products.length <= 1000`",
        "`name` — непустая строка",
        "`count` и `price` — неотрицательные целые числа",
      ],
      example: "Вход:\n\n[\n  { name: \"apple\", count: 10, price: 5 },\n  { name: \"bread\", count: 3,  price: 20 },\n  { name: \"apple\", count: 5,  price: 7 }\n]\n\nВыход:\n\n[\n  { name: \"apple\", count: 15, price: 12 },\n  { name: \"bread\", count: 3,  price: 20 }\n]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\n/**\n * @param {{ name: string, count: number, price: number }[]} products\n * @returns {{ name: string, count: number, price: number }[]}\n */\nfunction mergeProducts(products) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Два товара с одинаковым именем",
        args: [
          [
            {
              name: "apple",
              count: 10,
              price: 5,
            },
            {
              name: "bread",
              count: 3,
              price: 20,
            },
            {
              name: "apple",
              count: 5,
              price: 7,
            },
          ],
        ],
        expected: [
          {
            name: "apple",
            count: 15,
            price: 12,
          },
          {
            name: "bread",
            count: 3,
            price: 20,
          },
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Все имена уникальны",
        args: [
          [
            {
              name: "a",
              count: 1,
              price: 2,
            },
          ],
        ],
        expected: [
          {
            name: "a",
            count: 1,
            price: 2,
          },
        ],
      },
      {
        name: "Порядок — по первому появлению имени",
        args: [
          [
            {
              name: "b",
              count: 1,
              price: 1,
            },
            {
              name: "a",
              count: 1,
              price: 1,
            },
            {
              name: "b",
              count: 2,
              price: 2,
            },
          ],
        ],
        expected: [
          {
            name: "b",
            count: 3,
            price: 3,
          },
          {
            name: "a",
            count: 1,
            price: 1,
          },
        ],
        hidden: true,
      },
      {
        name: "Три вхождения одного имени",
        args: [
          [
            {
              name: "x",
              count: 1,
              price: 10,
            },
            {
              name: "x",
              count: 2,
              price: 20,
            },
            {
              name: "x",
              count: 3,
              price: 30,
            },
          ],
        ],
        expected: [
          {
            name: "x",
            count: 6,
            price: 60,
          },
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Слияние отсортированных массивов (Merge Sorted Arrays)",
    difficulty: 3,
    categories: [
      "Sorting",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "mergeSortedArrays",
    description: {
      condition: "Дан список из `k` отсортированных по возрастанию массивов целых чисел. Объедините их в один отсортированный массив. Каждый входной массив уже отсортирован.",
      input: [
        "`arrays` — список из `k` массивов целых чисел, каждый из которых отсортирован по возрастанию. `1 ≤ k ≤ 100`, суммарное количество элементов `≤ 10^5`.",
      ],
      output: "Один отсортированный массив, содержащий все элементы всех входных массивов.",
      constraints: [
        "`1 ≤ k ≤ 100`",
        "Каждый подмассив отсортирован по возрастанию",
        "Суммарно не более 100 000 элементов",
        "Элементы: `-10^9 ≤ x ≤ 10^9`",
      ],
      example: "Вход: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]\nВыход: [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\nВход: [[1, 3, 5], [2, 4, 6]]\nВыход: [1, 2, 3, 4, 5, 6]",
    },
    starterCode: "function mergeSortedArrays(arrays) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Три массива",
        args: [
          [
            [
              1,
              4,
              7,
            ],
            [
              2,
              5,
              8,
            ],
            [
              3,
              6,
              9,
            ],
          ],
        ],
        expected: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
        ],
      },
      {
        name: "Два массива",
        args: [
          [
            [
              1,
              3,
              5,
            ],
            [
              2,
              4,
              6,
            ],
          ],
        ],
        expected: [
          1,
          2,
          3,
          4,
          5,
          6,
        ],
      },
      {
        name: "Один массив",
        args: [
          [
            [
              1,
              2,
            ],
          ],
        ],
        expected: [
          1,
          2,
        ],
      },
      {
        name: "Числа больше девяти",
        args: [
          [
            [
              9,
              11,
            ],
            [
              10,
              12,
            ],
          ],
        ],
        expected: [
          9,
          10,
          11,
          12,
        ],
        hidden: true,
      },
      {
        name: "Пустые массивы",
        args: [
          [
            [],
            [],
          ],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Отрицательные числа",
        args: [
          [
            [
              -5,
              0,
            ],
            [
              -3,
              2,
            ],
          ],
        ],
        expected: [
          -5,
          -3,
          0,
          2,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Минимальный и максимальный возраст (Min Max Age)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getAgeRange",
    description: {
      condition: "Напишите функцию `getAgeRange`, которая принимает массив объектов с полем `age` и возвращает массив (или кортеж), содержащий три значения: минимальный возраст, максимальный возраст и разницу между максимальным и минимальным возрастом.",
      input: [],
      output: "",
      constraints: [
        "Массив всегда содержит хотя бы один объект",
        "Каждый объект гарантированно имеет поле `age` с целочисленным значением",
        "Возраст может быть любым неотрицательным целым числом",
      ],
      example: "Вход: [{ name: 'a', age: 20 }, { name: 'b', age: 40 }, { name: 'c', age: 60 }, { name: 'd', age: 10 }]\nВыход: [10, 60, 50]\n\nВход: [{ name: 'x', age: 5 }, { name: 'y', age: 5 }]\nВыход: [5, 5, 0]\n\nВход: [{ name: 'p', age: 100 }]\nВыход: [100, 100, 0]\n\nВход: [{ name: 'm', age: 30 }, { name: 'n', age: 20 }, { name: 'o', age: 25 }]\nВыход: [20, 30, 10]",
    },
    starterCode: "function getAgeRange(people) {\n    // TODO: write your solution here\n    return [0, 0, 0];\n}\n",
    tests: [
      {
        name: "Разные возрасты",
        args: [
          [
            {
              name: "a",
              age: 20,
            },
            {
              name: "b",
              age: 40,
            },
            {
              name: "c",
              age: 60,
            },
            {
              name: "d",
              age: 10,
            },
          ],
        ],
        expected: [
          10,
          60,
          50,
        ],
      },
      {
        name: "Одинаковые возрасты",
        args: [
          [
            {
              name: "x",
              age: 5,
            },
            {
              name: "y",
              age: 5,
            },
          ],
        ],
        expected: [
          5,
          5,
          0,
        ],
      },
      {
        name: "Один человек",
        args: [
          [
            {
              name: "p",
              age: 100,
            },
          ],
        ],
        expected: [
          100,
          100,
          0,
        ],
      },
      {
        name: "Минимум и максимум не на краях",
        args: [
          [
            {
              name: "m",
              age: 30,
            },
            {
              name: "n",
              age: 20,
            },
            {
              name: "o",
              age: 25,
            },
          ],
        ],
        expected: [
          20,
          30,
          10,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Минимальное расстояние между x и y (Minimum Distance Between X and Y)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "shortestXYDistance",
    description: {
      condition: "Дана строка `s`, состоящая из разных символов.\nНужно найти минимальное расстояние между любым символом `x` и любым символом `y`.\n\nРасстояние считается как разница между индексами двух символов.\n\nЕсли в строке нет хотя бы одного символа `x` или `y`, нужно вернуть `0`.",
      input: [
        "Строка `s`.",
      ],
      output: "Целое число — минимальное расстояние между символами `x` и `y`.",
      constraints: [
        "`0 <= s.length <= 100000`",
        "строка может содержать любые символы",
        "нужно учитывать только символы `x` и `y`",
      ],
      example: "Вход:\n\ns = \"abxkkky\"\n\nВыход:\n\n4",
    },
    starterCode: "function shortestXYDistance(s) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "\"abxkkky\"",
        args: [
          "abxkkky",
        ],
        expected: 4,
      },
      {
        name: "Нет символа y",
        args: [
          "abcx",
        ],
        expected: 0,
      },
      {
        name: "Символы рядом",
        args: [
          "xy",
        ],
        expected: 1,
      },
      {
        name: "y раньше x",
        args: [
          "yzx",
        ],
        expected: 2,
        hidden: true,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Несколько вхождений",
        args: [
          "xaaayax",
        ],
        expected: 2,
        hidden: true,
      },
    ],
  },
  {
    title: "Минимальное количество взвешиваний (Minimum Weighings)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "minWeighings",
    description: {
      condition: "Дано `n` одинаковых на вид монет. Известно, что ровно одна монета фальшивая, и она легче остальных.\n\nЕсть чашечные весы. За одно взвешивание можно положить любое количество монет на левую и правую чашу. После взвешивания возможны три результата: левая чаша легче, правая чаша легче, чаши равны.\n\nНужно вернуть минимальное количество взвешиваний, достаточное, чтобы гарантированно определить фальшивую монету.",
      input: [
        "`n` — количество монет (целое число, `n >= 1`)",
      ],
      output: "Целое число — минимальное количество взвешиваний",
      constraints: [
        "`1 <= n <= 10^9`",
        "Ровно одна монета фальшивая и она легче",
      ],
      example: "Вход: 8\nВыход: 2\n\nВход: 1\nВыход: 0\n\nВход: 9\nВыход: 2\n\nВход: 10\nВыход: 3",
    },
    starterCode: "function minWeighings(n) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "8 монет",
        args: [
          8,
        ],
        expected: 2,
      },
      {
        name: "Одна монета — взвешивать не нужно",
        args: [
          1,
        ],
        expected: 0,
      },
      {
        name: "9 монет",
        args: [
          9,
        ],
        expected: 2,
      },
      {
        name: "10 монет — уже три взвешивания",
        args: [
          10,
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "3 монеты",
        args: [
          3,
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "27 монет",
        args: [
          27,
        ],
        expected: 3,
        hidden: true,
      },
    ],
  },
  {
    title: "Зеркальные ключи (Mirror Object)",
    difficulty: 2,
    categories: [
      "Objects",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "mirror",
    description: {
      condition: "Напишите функцию `mirror`, которая принимает объект, где все свойства имеют значение `undefined`. Функция должна вернуть новый объект с теми же ключами, но значениями являются строки, представляющие зеркальное отражение ключа (перевёрнутая строка).\n\nПравила:\n\nВсе значения входного объекта — `undefined`\n\nЗначениями выходного объекта становятся перевёрнутые строки ключей\n\nИсходный объект не должен изменяться\n\nВозвращается новый объект",
      input: [],
      output: "",
      constraints: [
        "Ключи — строки",
        "Длина строк: 1 ≤ length ≤ 100",
        "Количество свойств: 0 ≤ N ≤ 1000",
        "Время выполнения: O(N * M), где M — длина строки",
        "Память: O(N)",
      ],
      example: "mirror({ abc: undefined, hello: undefined })\n// -> { abc: 'cba', hello: 'olleh' }\n\nmirror({ arara: undefined })\n// -> { arara: 'arara' }\n\nmirror({ a: undefined, b: undefined, c: undefined })\n// -> { a: 'a', b: 'b', c: 'c' }\n\nmirror({})\n// -> {}",
    },
    starterCode: "function mirror(obj) {\n    // TODO: write your solution here\n    return {};\n}\n",
    tests: [
      {
        name: "Два ключа",
        args: [
          {},
        ],
        expected: {
          abc: "cba",
          hello: "olleh",
        },
      },
      {
        name: "Палиндром",
        args: [
          {},
        ],
        expected: {
          arara: "arara",
        },
      },
      {
        name: "Односимвольные ключи",
        args: [
          {},
        ],
        expected: {
          a: "a",
          b: "b",
          c: "c",
        },
      },
      {
        name: "Пустой объект",
        args: [
          {},
        ],
        expected: {},
        hidden: true,
      },
      {
        name: "Исходный объект не изменяется",
        body: "const source = { abc: undefined };\nsolution(source);\nreturn source.abc;",
        hidden: true,
      },
    ],
  },
  {
    title: "Элементы первой последовательности, отсутствующие во второй (Missing Elements)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "missingElements",
    description: {
      condition: "Напишите функцию `missing_elements(a, b)`, которая принимает две отсортированные последовательности чисел `a` и `b` (по неубыванию) и возвращает список всех элементов из `a`, которых нет в `b`.",
      input: [],
      output: "",
      constraints: [],
      example: "a = [1, 1, 4, 6, 7, 9]\nb = [0, 2, 3, 4, 8, 9]\nmissing_elements(a, b) -> [1, 1, 6, 7]\n\na = [2, 3, 5, 5, 8]\nb = [1, 2, 5, 6]\nmissing_elements(a, b) -> [3, 5, 8]\n\na = []\nb = [1, 2, 3]\nmissing_elements(a, b) -> []\n\na = [1, 2, 3]\nb = []\nmissing_elements(a, b) -> [1, 2, 3]\n\nДополнительно:\n\nПоследовательности могут быть пустыми.\n\nЭлементы могут повторяться.\n\nОба массива отсортированы по неубыванию",
    },
    starterCode: "function missingElements(a, b) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Повторы сохраняются",
        args: [
          [
            1,
            1,
            4,
            6,
            7,
            9,
          ],
          [
            0,
            2,
            3,
            4,
            8,
            9,
          ],
        ],
        expected: [
          1,
          1,
          6,
          7,
        ],
      },
      {
        name: "Второй пример",
        args: [
          [
            2,
            3,
            5,
            5,
            8,
          ],
          [
            1,
            2,
            5,
            6,
          ],
        ],
        expected: [
          3,
          8,
        ],
      },
      {
        name: "Пустой a",
        args: [
          [],
          [
            1,
            2,
            3,
          ],
        ],
        expected: [],
      },
      {
        name: "Пустой b",
        args: [
          [
            1,
            2,
            3,
          ],
          [],
        ],
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
      {
        name: "Все элементы есть в b",
        args: [
          [
            1,
            2,
          ],
          [
            1,
            2,
          ],
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Перемещение нулей в конец массива (Move Zeros to End)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "moveZero",
    description: {
      condition: "Напишите функцию `moveZero`, которая принимает массив и перемещает все нули в конец, сохраняя порядок остальных элементов. Функция должна возвращать новый массив, не изменяя исходный.\n\nПравила:\n\nВсе нули (0) перемещаются в конец массива\n\nПорядок ненулевых элементов сохраняется\n\nИсходный массив не изменяется\n\nНули могут быть числами, а также другими типами (булевы значения, строки и т.д.) не считаются нулями",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 0 ≤ N ≤ 1000",
        "Элементы могут быть любого типа",
        "Нулями считаются только числовые значения 0",
        "Время выполнения: O(N)",
        "Память: O(N)",
      ],
      example: "moveZero([false, 1, 0, 1, 2, 0, 1, 3, \"a\"])\n// -> [false, 1, 1, 2, 1, 3, \"a\", 0, 0]\n\nmoveZero([0, 1, 0, 2, 0, 3])\n// -> [1, 2, 3, 0, 0, 0]\n\nmoveZero([1, 2, 3])\n// -> [1, 2, 3]\n\nmoveZero([])\n// -> []",
    },
    starterCode: "function moveZero(arr) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "false и строки не считаются нулями",
        args: [
          [
            false,
            1,
            0,
            1,
            2,
            0,
            1,
            3,
            "a",
          ],
        ],
        expected: [
          false,
          1,
          1,
          2,
          1,
          3,
          "a",
          0,
          0,
        ],
      },
      {
        name: "Только числа",
        args: [
          [
            0,
            1,
            0,
            2,
            0,
            3,
          ],
        ],
        expected: [
          1,
          2,
          3,
          0,
          0,
          0,
        ],
      },
      {
        name: "Нулей нет",
        args: [
          [
            1,
            2,
            3,
          ],
        ],
        expected: [
          1,
          2,
          3,
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Исходный массив не изменяется",
        body: "const source = [0, 1];\nsolution(source);\nreturn source;",
        expected: [
          0,
          1,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Скользящее среднее (Moving Average)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "movingAverage",
    description: {
      condition: "Дан список чисел `input_list` и размер окна `window_size`.\n\nНеобходимо написать функцию, которая возвращает список скользящих средних значений.\n\nСкользящее среднее считается для каждого непрерывного окна длиной `window_size`.\n\nНапример, для списка:\n\nи окна `3` окна будут такими:\n\nОтвет:",
      input: [
        "input_list — список чисел\nwindow_size — размер окна",
      ],
      output: "Список чисел — скользящие средние значения",
      constraints: [
        "1 <= input_list.length <= 100000",
        "1 <= window_size <= input_list.length",
        "-10^9 <= input_list[i] <= 10^9",
      ],
      example: "[1, 2, 3, 4, 5]\n\n[1, 2, 3] → 2\n[2, 3, 4] → 3\n[3, 4, 5] → 4\n\n[2, 3, 4]\n\nВход:\n\ninput_list = [1, 2, 3, 4, 5]\nwindow_size = 3\n\nВыход:\n\n[2, 3, 4]",
    },
    starterCode: "function movingAverage(inputList, windowSize) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Окно 3",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
          ],
          3,
        ],
        expected: [
          2,
          3,
          4,
        ],
      },
      {
        name: "Окно 1 — исходный массив",
        args: [
          [
            1,
            2,
          ],
          1,
        ],
        expected: [
          1,
          2,
        ],
      },
      {
        name: "Окно равно длине массива",
        args: [
          [
            2,
            4,
          ],
          2,
        ],
        expected: [
          3,
        ],
      },
      {
        name: "Окно больше массива — пустой результат",
        args: [
          [
            1,
            2,
          ],
          5,
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Дробные средние",
        args: [
          [
            1,
            2,
            4,
          ],
          2,
        ],
        expected: [
          1.5,
          3,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Создание функции-множителя (Multiplier Factory)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "makeMultiplier",
    description: {
      condition: "Напишите функцию `makeMultiplier`, которая принимает число `factor` и возвращает новую функцию. Возвращаемая функция должна принимать один аргумент и возвращать результат умножения этого аргумента на сохранённый `factor`.\n\nЭто классический пример использования замыкания для сохранения контекста — внутренняя функция \"запоминает\" переданный множитель.",
      input: [],
      output: "",
      constraints: [
        "`factor` может быть любым числом (целым, дробным, положительным, отрицательным)",
        "Возвращаемая функция должна правильно работать с любым числовым аргументом",
        "Нельзя использовать глобальные переменные",
      ],
      example: "const double = makeMultiplier(2);\nconsole.log(double(5)); // 10\n\nconst triple = makeMultiplier(3);\nconsole.log(triple(5)); // 15\n\nconst half = makeMultiplier(0.5);\nconsole.log(half(10)); // 5\n\nconst zero = makeMultiplier(0);\nconsole.log(zero(100)); // 0",
    },
    starterCode: "function makeMultiplier(factor) {\n    // TODO: write your solution here\n}\n",
    tests: [
      {
        name: "Удвоение",
        body: "return solution(2)(5);",
        expected: 10,
      },
      {
        name: "Утроение",
        body: "return solution(3)(5);",
        expected: 15,
      },
      {
        name: "Дробный множитель",
        body: "return solution(0.5)(10);",
        expected: 5,
      },
      {
        name: "Множитель 0",
        body: "return solution(0)(100);",
        expected: 0,
        hidden: true,
      },
      {
        name: "Множители независимы",
        body: "const double = solution(2);\nconst triple = solution(3);\nreturn [double(4), triple(4)];",
        expected: [
          8,
          12,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Ближайшее простое число (Nearest Prime Number)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findPrimeNumber",
    description: {
      condition: "Реализовать функцию, которая принимает целое число и возвращает ближайшее простое число.\nЕсли два простых числа находятся на одинаковом расстоянии от заданного числа, выбрать меньшее.\n\nОпределение: Простое число — это натуральное число больше 1, которое имеет ровно два натуральных делителя: 1 и само себя.\n\nПравила поиска:\n\nЕсли переданное число само является простым, вернуть его\n\nИначе найти ближайшее простое число\n\nПри равенстве расстояний выбрать меньшее простое число\n\nЧисла могут быть отрицательными, нулем или единицей (они не являются простыми)",
      input: [],
      output: "",
      constraints: [
        "Входное число: любое целое число в диапазоне -10⁶ ≤ num ≤ 10⁶",
        "Время выполнения: должно работать для больших чисел",
      ],
      example: "findPrimeNumber(3) → 3    (3 простое)\nfindPrimeNumber(11) → 11  (11 простое)\nfindPrimeNumber(125) → 127 (ближайшее простое)\nfindPrimeNumber(110) → 109 (109 ближе, чем 113)\nfindPrimeNumber(1) → 2     (1 не простое, ближайшее 2)\nfindPrimeNumber(0) → 2     (0 не простое, ближайшее 2)\nfindPrimeNumber(-5) → 2    (отрицательные не простые, ближайшее 2)\nfindPrimeNumber(4) → 3     (3 ближе, чем 5)\nfindPrimeNumber(6) → 5     (5 ближе, чем 7, хотя 5 и 7 равноудалены? 6-5=1, 7-6=1 → выбираем меньшее 5)",
    },
    starterCode: "function findPrimeNumber(num) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "Само число простое",
        args: [
          3,
        ],
        expected: 3,
      },
      {
        name: "Ближайшее сверху",
        args: [
          125,
        ],
        expected: 127,
      },
      {
        name: "Ближайшее снизу",
        args: [
          110,
        ],
        expected: 109,
      },
      {
        name: "1 не простое",
        args: [
          1,
        ],
        expected: 2,
        hidden: true,
      },
      {
        name: "Отрицательное число",
        args: [
          -5,
        ],
        expected: 2,
        hidden: true,
      },
      {
        name: "При равенстве берётся меньшее",
        args: [
          4,
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "6 → 5",
        args: [
          6,
        ],
        expected: 5,
        hidden: true,
      },
    ],
  },
  {
    title: "Игла в стоге сена (Needle in Haystack)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "needleInHaystack",
    description: {
      condition: "Напишите функцию `needleInHaystack`, которая проверяет, встречаются ли все символы из строки `needle` в строке `haystack` в том же порядке, в каком они приведены в `needle`. Использование `indexOf` или аналогичных встроенных методов поиска подстроки запрещено.\n\nПравила:\n\nВсе символы из `needle` должны встречаться в `haystack` в том же порядке\n\nСимволы не обязаны быть подряд, но порядок должен сохраняться\n\nПоиск должен быть ручным (без `indexOf`, `includes`, `find` и т.д.)\n\nУчитывается регистр символов",
      input: [],
      output: "",
      constraints: [
        "Длина строк: 1 ≤ N ≤ 1000",
        "Символы: латинские буквы (a-z, A-Z)",
        "Время выполнения: O(N × M), где N — длина haystack, M — длина needle",
        "Память: O(1)",
      ],
      example: "needleInHaystack('whe', 'cartwheel')   // -> true\nneedleInHaystack('crt', 'cartwheel')   // -> true\nneedleInHaystack('cw', 'cartwheel')    // -> true\nneedleInHaystack('weee', 'cartwheel')  // -> false",
    },
    starterCode: "function needleInHaystack(needle, haystack) {\n    // TODO: write your solution here\n    return false;\n}\n",
    tests: [
      {
        name: "'whe' в 'cartwheel'",
        args: [
          "whe",
          "cartwheel",
        ],
        expected: true,
      },
      {
        name: "Символы вразброс",
        args: [
          "crt",
          "cartwheel",
        ],
        expected: true,
      },
      {
        name: "Две далёкие буквы",
        args: [
          "cw",
          "cartwheel",
        ],
        expected: true,
      },
      {
        name: "Не хватает повторов",
        args: [
          "weee",
          "cartwheel",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Регистр учитывается",
        args: [
          "C",
          "cartwheel",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Пустая игла",
        args: [
          "",
          "abc",
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма чисел во вложенном массиве (Nested Array Sum)",
    difficulty: 3,
    categories: [
      "Arrays",
      "Recursion",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sum",
    description: {
      condition: "Напишите функцию `sum(arr)`, которая вычисляет сумму всех числовых значений в массиве. Массив может быть не плоским (содержать вложенные массивы произвольной глубины) и может содержать элементы разных типов.\n\nВалидными числовыми значениями считаются:\n\nчисла — учитываются как есть;\n\nстроки, которые начинаются с одной или нескольких цифр — в этом случае в сумму добавляется числовое значение этой начальной последовательности цифр (например, `\"2x\"` даёт `2`); строки, не начинающиеся с цифры, игнорируются (дают `0`).\n\nОстальные типы данных (например, `null`, булевы значения, объекты) игнорируются.\n\nНельзя использовать встроенные методы `.flat`, `.flatMap` — обход вложенности нужно реализовать самостоятельно (рекурсией или явным стеком/циклом).",
      input: [
        "`arr` — массив, элементами которого могут быть числа, строки или вложенные массивы (любой глубины вложенности)",
      ],
      output: "Число — сумма всех числовых значений, извлечённых из массива по правилам выше",
      constraints: [
        "Глубина вложенности: от 0 до 100",
        "Суммарное количество элементов (с учётом вложенности): от 0 до 10^4",
        "Числа: `-10^6 <= число <= 10^6`",
      ],
      example: "Вход: [1, 'x', '2x', ['3', ['x2', '5']]]\nВыход: 11   // 1 + 0 + 2 + 3 + 0 + 5\n\nВход: []\nВыход: 0\n\nВход: [[[1, 2], 3], 4]\nВыход: 10",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction sum(arr) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Числа и строки вперемешку",
        args: [
          [
            1,
            "x",
            "2x",
            [
              "3",
              [
                "x2",
                "5",
              ],
            ],
          ],
        ],
        expected: 11,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
      },
      {
        name: "Только числа",
        args: [
          [
            [
              [
                1,
                2,
              ],
              3,
            ],
            4,
          ],
        ],
        expected: 10,
      },
      {
        name: "Не-числовые типы игнорируются",
        args: [
          [
            null,
            true,
            {},
            5,
          ],
        ],
        expected: 5,
        hidden: true,
      },
      {
        name: "Строка без ведущих цифр даёт 0",
        args: [
          [
            "abc",
            "12abc",
          ],
        ],
        expected: 12,
        hidden: true,
      },
    ],
  },
  {
    title: "Доступ к вложенным свойствам (Nested Property Access)",
    difficulty: 2,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "get",
    description: {
      condition: "Напишите функцию `get`, которая принимает объект (словарь) и строку пути к полю, разделённую точками. Функция должна вернуть значение по указанному пути. Запрашиваемое поле гарантированно существует в объекте.",
      input: [],
      output: "",
      constraints: [
        "Путь всегда валидный и ведёт к существующему полю",
        "Путь может быть любой глубины вложенности",
        "Значения могут быть любого типа (объекты, строки, числа)",
      ],
      example: "Вход: ({ a: { b: { c: 'd' } }, e: 'f' }, 'a.b')\nВыход: { c: 'd' }\n\nВход: ({ a: { b: { c: 'd' } }, e: 'f' }, 'a.b.c')\nВыход: 'd'\n\nВход: ({ a: { b: { c: 'd' } }, e: 'f' }, 'e')\nВыход: 'f'\n\nВход: ({ x: { y: { z: 42 } } }, 'x.y.z')\nВыход: 42",
    },
    starterCode: "function get(obj, path) {\n    // TODO: write your solution here\n    return undefined;\n}\n",
    tests: [
      {
        name: "Промежуточный объект",
        args: [
          {
            a: {
              b: {
                c: "d",
              },
            },
            e: "f",
          },
          "a.b",
        ],
        expected: {
          c: "d",
        },
      },
      {
        name: "Полный путь",
        args: [
          {
            a: {
              b: {
                c: "d",
              },
            },
            e: "f",
          },
          "a.b.c",
        ],
        expected: "d",
      },
      {
        name: "Ключ верхнего уровня",
        args: [
          {
            a: {
              b: 1,
            },
            e: "f",
          },
          "e",
        ],
        expected: "f",
      },
      {
        name: "Числовое значение",
        args: [
          {
            x: {
              y: {
                z: 42,
              },
            },
          },
          "x.y.z",
        ],
        expected: 42,
        hidden: true,
      },
      {
        name: "Глубокая вложенность",
        args: [
          {
            a: {
              b: {
                c: {
                  d: {
                    e: "deep",
                  },
                },
              },
            },
          },
          "a.b.c.d.e",
        ],
        expected: "deep",
        hidden: true,
      },
    ],
  },
  {
    title: "Следующий язык по кругу (Next Language)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getNextLang",
    description: {
      condition: "Напишите функцию `getNextLang`, которая принимает массив языков и текущий язык, и возвращает следующий язык по кругу. Если текущий язык является последним в массиве, функция должна вернуть первый язык (циклический обход).",
      input: [],
      output: "",
      constraints: [
        "Массив языков всегда непустой",
        "Текущий язык всегда присутствует в массиве",
        "Языки могут быть любыми строками",
      ],
      example: "Вход: (['ru', 'en', 'fr'], 'fr')\nВыход: 'ru'\n\nВход: (['ru', 'en', 'fr'], 'ru')\nВыход: 'en'\n\nВход: (['ru', 'en', 'fr'], 'en')\nВыход: 'fr'\n\nВход: (['ru', 'en'], 'en')\nВыход: 'ru'",
    },
    starterCode: "function getNextLang(languages, current) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Последний → первый",
        args: [
          [
            "ru",
            "en",
            "fr",
          ],
          "fr",
        ],
        expected: "ru",
      },
      {
        name: "Первый → второй",
        args: [
          [
            "ru",
            "en",
            "fr",
          ],
          "ru",
        ],
        expected: "en",
      },
      {
        name: "Второй → третий",
        args: [
          [
            "ru",
            "en",
            "fr",
          ],
          "en",
        ],
        expected: "fr",
      },
      {
        name: "Два языка",
        args: [
          [
            "ru",
            "en",
          ],
          "en",
        ],
        expected: "ru",
        hidden: true,
      },
      {
        name: "Один язык",
        args: [
          [
            "ru",
          ],
          "ru",
        ],
        expected: "ru",
        hidden: true,
      },
    ],
  },
  {
    title: "N-й член числовой последовательности (Nth Term of a Custom Sequence)",
    difficulty: 2,
    categories: [
      "Recursion",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "nthTerm",
    description: {
      condition: "Дана числовая последовательность, в которой первый член равен 3, второй член равен 2, а каждый следующий член равен сумме двух предыдущих: 3, 2, 5, 7, 12, 19, ... Напишите функцию, которая по номеру `n` (нумерация с 1) возвращает n-й член этой последовательности.",
      input: [
        "`n` — целое число, номер члена последовательности (1-based)",
      ],
      output: "Целое число — значение n-го члена последовательности",
      constraints: [
        "`1 <= n <= 40`",
      ],
      example: "Вход: n = 1\nВыход: 3\n\nВход: n = 2\nВыход: 2\n\nВход: n = 5\nВыход: 12",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction nthTerm(n) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "n = 1",
        args: [
          1,
        ],
        expected: 3,
      },
      {
        name: "n = 2",
        args: [
          2,
        ],
        expected: 2,
      },
      {
        name: "n = 5",
        args: [
          5,
        ],
        expected: 12,
      },
      {
        name: "n = 3",
        args: [
          3,
        ],
        expected: 5,
        hidden: true,
      },
      {
        name: "n = 6",
        args: [
          6,
        ],
        expected: 19,
        hidden: true,
      },
      {
        name: "n = 10",
        args: [
          10,
        ],
        expected: 131,
        hidden: true,
      },
    ],
  },
  {
    title: "Количество связных областей в матрице (Number of Connected Regions)",
    difficulty: 3,
    categories: [
      "Matrices",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "countRegions",
    description: {
      condition: "Дана двумерная матрица целых чисел. Каждая ячейка содержит число. Две ячейки считаются связными, если они соседние по горизонтали или вертикали и содержат одинаковое число. Связная область — это максимальная группа ячеек с одинаковым значением, соединённых друг с другом.\n\nНапишите функцию, которая возвращает количество таких связных областей в матрице.",
      input: [
        "Двумерный массив целых чисел `grid` (матрица размером m×n).",
      ],
      output: "Целое число — количество связных областей.",
      constraints: [
        "`1 <= m, n <= 100`",
        "`0 <= grid[i][j] <= 100`",
      ],
      example: "Вход:\n[[1, 1, 2],\n [1, 2, 2],\n [3, 3, 2]]\n\nВыход: 3\n(область из 1-ек, область из 2-ек, область из 3-ек)\n\nВход:\n[[1, 2],\n [2, 1]]\n\nВыход: 4\n(каждая ячейка — отдельная область)",
    },
    starterCode: "function countRegions(grid) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "Три области",
        args: [
          [
            [
              1,
              1,
              2,
            ],
            [
              1,
              2,
              2,
            ],
            [
              3,
              3,
              2,
            ],
          ],
        ],
        expected: 3,
      },
      {
        name: "Каждая клетка — своя область",
        args: [
          [
            [
              1,
              2,
            ],
            [
              2,
              1,
            ],
          ],
        ],
        expected: 4,
      },
      {
        name: "Одна клетка",
        args: [
          [
            [
              7,
            ],
          ],
        ],
        expected: 1,
      },
      {
        name: "Одинаковое значение в двух несвязных областях",
        args: [
          [
            [
              1,
              2,
              1,
            ],
          ],
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "Вся матрица — одна область",
        args: [
          [
            [
              5,
              5,
            ],
            [
              5,
              5,
            ],
          ],
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Пустая матрица",
        args: [
          [],
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Реализация метода times для числа (Number.prototype.times)",
    difficulty: 2,
    categories: [
      "Loops",
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "times",
    description: {
      condition: "Реализуйте функцию `times(n, callback)`, которая вызывает переданную функцию `callback` ровно `n` раз, передавая в неё индекс текущей итерации (начиная с 0). Если `n` — не целое положительное число (например, отрицательное или дробное), функция должна привести его к количеству итераций через `Math.trunc` (отбросить дробную часть; отрицательные и нулевые значения дают 0 итераций). Функция должна возвращать массив со значениями, которые вернул `callback` на каждом вызове.",
      input: [
        "`n` — число (может быть дробным, отрицательным, нулём)",
        "`callback` — функция, принимающая индекс итерации и возвращающая значение",
      ],
      output: "Массив длиной `Math.max(0, Math.trunc(n))`, где `i`-й элемент — результат вызова `callback(i)`",
      constraints: [
        "`-100 <= n <= 1000`",
        "`callback` — чистая функция, возвращающая число",
      ],
      example: "Вход: n = 3, callback = (i) => i\nВыход: [0, 1, 2]\n\nВход: n = 0, callback = (i) => i\nВыход: []\n\nВход: n = 2.9, callback = (i) => i * 2\nВыход: [0, 2]\n\nВход: n = -1, callback = (i) => i\nВыход: []",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction times(n, callback) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "n = 3",
        body: "return solution(3, (i) => i);",
        expected: [
          0,
          1,
          2,
        ],
      },
      {
        name: "n = 0",
        body: "return solution(0, (i) => i);",
        expected: [],
      },
      {
        name: "Дробное n отбрасывается",
        body: "return solution(2.9, (i) => i * 2);",
        expected: [
          0,
          2,
        ],
      },
      {
        name: "Отрицательное n",
        body: "return solution(-1, (i) => i);",
        expected: [],
        hidden: true,
      },
      {
        name: "callback получает индекс",
        body: "const seen = [];\nsolution(3, (i) => seen.push(i));\nreturn seen;",
        expected: [
          0,
          1,
          2,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Строки на расстоянии редактирования не более 1 (One Edit Distance)",
    difficulty: 3,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "oneEditApart",
    description: {
      condition: "Даны две строки `s1` и `s2`, состоящие из строчных латинских букв. Требуется определить, находятся ли они на «расстоянии редактирования» ровно 1 — то есть можно ли превратить одну строку в другую ровно одной из трёх операций:\n\nзаменить один символ (если строки одинаковой длины);\n\nвставить один символ (если вторая строка длиннее первой на 1);\n\nудалить один символ (если первая строка длиннее второй на 1).\n\nЕсли строки идентичны, либо отличаются больше чем на одну операцию, либо разница в длине больше 1 — функция должна вернуть `false`.",
      input: [
        "Две строки `s1` и `s2`.",
      ],
      output: "`true`, если строки отличаются ровно одной операцией редактирования, иначе `false`.",
      constraints: [
        "`0 <= s1.length, s2.length <= 10^4`",
        "строки состоят только из строчных латинских букв",
      ],
      example: "Вход: s1 = \"pale\", s2 = \"ple\"   → Выход: true   (удалён символ \"a\")\nВход: s1 = \"cab\",  s2 = \"cf\"    → Выход: false  (несовпадение более чем в одной позиции при сдвиге)\nВход: s1 = \"abc\",  s2 = \"abc\"   → Выход: false  (строки идентичны, ни одной операции не требуется)\nВход: s1 = \"abc\",  s2 = \"abd\"   → Выход: true   (заменён один символ)",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction oneEditApart(s1, s2) {\n  // TODO: напишите решение здесь\n  return false;\n}\n",
    tests: [
      {
        name: "Удалён символ",
        args: [
          "pale",
          "ple",
        ],
        expected: true,
      },
      {
        name: "Слишком много различий",
        args: [
          "cab",
          "cf",
        ],
        expected: false,
      },
      {
        name: "Идентичные строки",
        args: [
          "abc",
          "abc",
        ],
        expected: false,
      },
      {
        name: "Заменён один символ",
        args: [
          "abc",
          "abd",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Разница в длине больше 1",
        args: [
          "a",
          "abc",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Вставка в начало",
        args: [
          "bc",
          "abc",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Пустая и односимвольная",
        args: [
          "",
          "a",
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Пересечение интервалов онлайна (Online Intervals Intersection)",
    difficulty: 3,
    categories: [
      "Arrays",
      "Pointers",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "intersection",
    description: {
      condition: "Даны два отсортированных списка интервалов присутствия пользователей в онлайне в течение дня. Каждый интервал — пара чисел `[start, end]`, где `start` строго меньше `end`, часы указаны в диапазоне от 0 до 24. Необходимо вычислить список интервалов, когда оба пользователя были в онлайне одновременно.",
      input: [
        "`user1` — отсортированный массив интервалов `[start, end]`",
        "`user2` — отсортированный массив интервалов `[start, end]`",
      ],
      output: "Массив интервалов `[start, end]`, представляющих пересечение периодов онлайна обоих пользователей, в хронологическом порядке.",
      constraints: [
        "`0 <= start < end <= 24`",
        "Интервалы внутри каждого списка отсортированы и не пересекаются между собой",
        "`0 <= user1.length, user2.length <= 1000`",
      ],
      example: "Вход:\nintersection([[8, 12], [17, 22]], [[5, 11], [14, 18], [20, 23]])\nВыход: [[8, 11], [17, 18], [20, 22]]\n\nВход:\nintersection([[9, 15], [18, 21]], [[10, 14], [21, 22]])\nВыход: [[10, 14]]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction intersection(user1, user2) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Три пересечения",
        args: [
          [
            [
              8,
              12,
            ],
            [
              17,
              22,
            ],
          ],
          [
            [
              5,
              11,
            ],
            [
              14,
              18,
            ],
            [
              20,
              23,
            ],
          ],
        ],
        expected: [
          [
            8,
            11,
          ],
          [
            17,
            18,
          ],
          [
            20,
            22,
          ],
        ],
      },
      {
        name: "Одно пересечение",
        args: [
          [
            [
              9,
              15,
            ],
            [
              18,
              21,
            ],
          ],
          [
            [
              10,
              14,
            ],
            [
              21,
              22,
            ],
          ],
        ],
        expected: [
          [
            10,
            14,
          ],
        ],
      },
      {
        name: "Пересечений нет",
        args: [
          [
            [
              1,
              2,
            ],
          ],
          [
            [
              3,
              4,
            ],
          ],
        ],
        expected: [],
      },
      {
        name: "Пустой список",
        args: [
          [],
          [
            [
              1,
              2,
            ],
          ],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Интервалы соприкасаются, но не пересекаются",
        args: [
          [
            [
              1,
              5,
            ],
          ],
          [
            [
              5,
              9,
            ],
          ],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Один длинный интервал перекрывает несколько коротких",
        args: [
          [
            [
              0,
              24,
            ],
          ],
          [
            [
              1,
              2,
            ],
            [
              5,
              6,
            ],
          ],
        ],
        expected: [
          [
            1,
            2,
          ],
          [
            5,
            6,
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Упорядоченный рендер сообщений (Ordered Message Rendering)",
    difficulty: 3,
    categories: [
      "Queue",
      "Caching",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getRenderOrder",
    description: {
      condition: "В чат-приложение сообщения приходят с сервера в произвольном порядке, но должны отображаться (рендериться) строго по возрастанию `id`, начиная с `id = 1`, без пропусков.\n\nКаждое сообщение имеет вид:\n\nДана последовательность сообщений в том порядке, в котором они пришли с сервера (может не совпадать с порядком id). Необходимо определить порядок, в котором сообщения были бы фактически отрендерены: сообщение рендерится немедленно при получении, если оно является следующим по очереди (т.е. его id на 1 больше id последнего отрендеренного сообщения), либо буферизуется в ожидании более ранних сообщений. Как только приходит недостающее сообщение, из буфера последовательно \"дорендериваются\" все сообщения, которые становятся доступны по порядку.\n\nНапишите функцию, которая принимает массив пришедших сообщений (в порядке прихода) и возвращает массив id в том порядке, в котором они были бы отрендерены.",
      input: [
        "`messages` — массив объектов `{ id: number, text: string }`, представляющий порядок прихода сообщений с сервера",
      ],
      output: "Массив чисел — id сообщений в порядке их рендеринга (всегда возрастающая последовательность `1, 2, 3, ...` до количества сообщений).",
      constraints: [
        "`1 <= messages.length <= 1000`",
        "Все id уникальны и образуют непрерывную последовательность от 1 до `messages.length`",
        "`text` — непустая строка (для теста несущественна)",
      ],
      example: "{ id: number, text: string }\n\nВход: `[{id:1,text:\"a\"},{id:2,text:\"b\"},{id:3,text:\"c\"}]`\nВыход: `[1, 2, 3]`\n\nВход: `[{id:3,text:\"c\"},{id:1,text:\"a\"},{id:2,text:\"b\"}]`\nВыход: `[1, 2, 3]`\n\nВход: `[{id:2,text:\"b\"},{id:4,text:\"d\"},{id:1,text:\"a\"},{id:3,text:\"c\"},{id:5,text:\"e\"}]`\nВыход: `[1, 2, 3, 4, 5]`",
    },
    starterCode: "// Available without import: built-in JS methods\n\nfunction getRenderOrder(messages) {\n  // TODO: write solution here\n  return [];\n}\n",
    tests: [
      {
        name: "Сообщения пришли по порядку",
        args: [
          [
            {
              id: 1,
              text: "a",
            },
            {
              id: 2,
              text: "b",
            },
            {
              id: 3,
              text: "c",
            },
          ],
        ],
        expected: [
          1,
          2,
          3,
        ],
      },
      {
        name: "Первым пришло третье",
        args: [
          [
            {
              id: 3,
              text: "c",
            },
            {
              id: 1,
              text: "a",
            },
            {
              id: 2,
              text: "b",
            },
          ],
        ],
        expected: [
          1,
          2,
          3,
        ],
      },
      {
        name: "Буфер разбирается порциями",
        args: [
          [
            {
              id: 2,
              text: "b",
            },
            {
              id: 4,
              text: "d",
            },
            {
              id: 1,
              text: "a",
            },
            {
              id: 3,
              text: "c",
            },
            {
              id: 5,
              text: "e",
            },
          ],
        ],
        expected: [
          1,
          2,
          3,
          4,
          5,
        ],
      },
      {
        name: "Пустой список",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Все сообщения в обратном порядке",
        args: [
          [
            {
              id: 3,
              text: "c",
            },
            {
              id: 2,
              text: "b",
            },
            {
              id: 1,
              text: "a",
            },
          ],
        ],
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Проверка на палиндром (Palindrome Check)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "isPalindrome",
    description: {
      condition: "Напишите функцию `isPalindrome`, которая принимает строку и проверяет, является ли она палиндромом. Палиндром — это строка, которая читается одинаково слева направо и справа налево. Функция должна игнорировать пробелы, знаки пунктуации и регистр букв.",
      input: [],
      output: "",
      constraints: [
        "Строка может содержать буквы, пробелы и знаки пунктуации",
        "Пустая строка считается палиндромом",
        "Проверка должна быть нечувствительна к регистру",
        "Пробелы и знаки пунктуации должны игнорироваться",
      ],
      example: "Вход: \"A man a plan a canal Panama\"\nВыход: true\n\nВход: \"hello\"\nВыход: false\n\nВход: \"racecar\"\nВыход: true\n\nВход: \"\"\nВыход: true",
    },
    starterCode: "function isPalindrome(str) {\n    // TODO: write your solution here\n    return false;\n}\n",
    tests: [
      {
        name: "Фраза с пробелами",
        args: [
          "A man a plan a canal Panama",
        ],
        expected: true,
      },
      {
        name: "Не палиндром",
        args: [
          "hello",
        ],
        expected: false,
      },
      {
        name: "Слово-палиндром",
        args: [
          "racecar",
        ],
        expected: true,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Знаки препинания игнорируются",
        args: [
          "No 'x' in Nixon",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Один символ",
        args: [
          "a",
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Парсинг файловой системы (Parse File System)",
    difficulty: 3,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "parseFileSystem",
    description: {
      condition: "Напишите функцию `parseFileSystem`, которая принимает объект (словарь), описывающий структуру файловой системы. Функция должна вернуть строку, представляющую файловую систему в виде дерева. Каждый уровень вложенности в строке должен быть обозначен двумя пробелами.\n\nПравила:\n\nЕсли значение ключа — `null`, это файл\n\nЕсли значение ключа — объект (словарь), это папка\n\nКаждый уровень вложенности отображается двумя пробелами в начале строки",
      input: [],
      output: "",
      constraints: [
        "Имена файлов и папок могут содержать только буквы, цифры, точки и подчеркивания",
        "Глубина вложенности не превышает 10 уровней",
        "Объект всегда имеет корневой элемент",
      ],
      example: "const fs = {\n  root: {\n    folder1: {\n      \"file1.txt\": null,\n      \"file2.txt\": null\n    },\n    folder2: {\n      subfolder1: {\n        \"file3.txt\": null\n      }\n    },\n    \"file4.txt\": null\n  }\n};\n\nconsole.log(parseFileSystem(fs));\n// Вывод:\n// root\n//   folder1\n//     file1.txt\n//     file2.txt\n//   folder2\n//     subfolder1\n//       file3.txt\n//   file4.txt",
    },
    starterCode: "function parseFileSystem(fs) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Дерево из условия",
        args: [
          {
            root: {
              folder1: {
                "file1.txt": null,
                "file2.txt": null,
              },
              folder2: {
                subfolder1: {
                  "file3.txt": null,
                },
              },
              "file4.txt": null,
            },
          },
        ],
        expected: "root\n  folder1\n    file1.txt\n    file2.txt\n  folder2\n    subfolder1\n      file3.txt\n  file4.txt",
      },
      {
        name: "Один файл",
        args: [
          {
            "a.txt": null,
          },
        ],
        expected: "a.txt",
      },
      {
        name: "Пустая структура",
        args: [
          {},
        ],
        expected: "",
      },
      {
        name: "Пустая папка",
        args: [
          {
            root: {
              empty: {},
            },
          },
        ],
        expected: "root\n  empty",
        hidden: true,
      },
      {
        name: "Два уровня вложенности",
        args: [
          {
            a: {
              b: {
                "c.txt": null,
              },
            },
          },
        ],
        expected: "a\n  b\n    c.txt",
        hidden: true,
      },
    ],
  },
  {
    title: "Частичное применение функций (Partial Function Application)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "partial",
    description: {
      condition: "Напишите функцию `partial`, которая принимает функцию и фиксированные аргументы. Она должна возвращать новую функцию, которая может принимать оставшиеся аргументы и вызывать исходную функцию с полным набором аргументов.\n\nЧастичное применение — это техника, при которой мы фиксируем часть аргументов функции, создавая новую функцию с меньшим количеством параметров.",
      input: [],
      output: "",
      constraints: [
        "Исходная функция может принимать любое количество аргументов",
        "Количество фиксированных аргументов может быть меньше общего количества аргументов функции",
        "Возвращаемая функция должна принимать оставшиеся аргументы",
      ],
      example: "function add(a, b, c) {\n    return a + b + c;\n}\n\nconst add5 = partial(add, 2, 3);\nconsole.log(add5(4)); // 9 (2 + 3 + 4)\n\nconst multiply = (a, b, c) => a * b * c;\nconst multiplyBy2 = partial(multiply, 2);\nconsole.log(multiplyBy2(3, 4)); // 24 (2 * 3 * 4)\n\nconst greet = (greeting, name) => `${greeting}, ${name}!`;\nconst sayHello = partial(greet, \"Hello\");\nconsole.log(sayHello(\"John\")); // \"Hello, John!\"",
    },
    starterCode: "function partial(fn, ...args) {\n    // TODO: write your solution here\n}\n",
    tests: [
      {
        name: "Два фиксированных аргумента",
        body: "const add = (a, b, c) => a + b + c;\nreturn solution(add, 2, 3)(4);",
        expected: 9,
      },
      {
        name: "Один фиксированный аргумент",
        body: "const multiply = (a, b, c) => a * b * c;\nreturn solution(multiply, 2)(3, 4);",
        expected: 24,
      },
      {
        name: "Порядок аргументов сохраняется",
        body: "const greet = (greeting, name) => greeting + \", \" + name + \"!\";\nreturn solution(greet, \"Hello\")(\"John\");",
        expected: "Hello, John!",
      },
      {
        name: "Без фиксированных аргументов",
        body: "const add = (a, b) => a + b;\nreturn solution(add)(1, 2);",
        expected: 3,
        hidden: true,
      },
      {
        name: "Частичная функция переиспользуется",
        body: "const add = (a, b) => a + b;\nconst add10 = solution(add, 10);\nreturn [add10(1), add10(2)];",
        expected: [
          11,
          12,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Разбивка игроков по отрядам (Partition Players by Squad)",
    difficulty: 2,
    categories: [
      "Grouping",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "partitionPlayers",
    description: {
      condition: "Дан массив объектов-игроков. У каждого игрока есть числовой идентификатор `id` и поле `squadId` — идентификатор отряда, которому он принадлежит. Если игрок не состоит ни в каком отряде, `squadId` равен `null`.\n\nНапишите функцию, которая разбивает массив на два подмассива и возвращает их в виде массива из двух элементов: первый — игроки с отрядом, второй — игроки без отряда.\n\nПорядок игроков внутри каждого подмассива должен соответствовать исходному порядку.",
      input: [
        "`players` — массив объектов вида `{ id: number, squadId: number | null }`",
      ],
      output: "Массив из двух массивов: `[playersWithSquad, playersWithoutSquad]`",
      constraints: [
        "`0 <= players.length <= 10^4`",
        "`id` — уникальное целое число",
        "`squadId` — целое число или `null`",
      ],
      example: "Вход:\n\n[\n  { id: 1, squadId: 10 },\n  { id: 2, squadId: null },\n  { id: 3, squadId: 10 },\n  { id: 4, squadId: null }\n]\n\nВыход:\n\n[\n  [{ id: 1, squadId: 10 }, { id: 3, squadId: 10 }],\n  [{ id: 2, squadId: null }, { id: 4, squadId: null }]\n]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction partitionPlayers(players) {\n  // TODO: напишите решение здесь\n  return [[], []];\n}\n",
    tests: [
      {
        name: "Игроки с отрядом и без",
        args: [
          [
            {
              id: 1,
              squadId: 10,
            },
            {
              id: 2,
              squadId: null,
            },
            {
              id: 3,
              squadId: 10,
            },
            {
              id: 4,
              squadId: null,
            },
          ],
        ],
        expected: [
          [
            {
              id: 1,
              squadId: 10,
            },
            {
              id: 3,
              squadId: 10,
            },
          ],
          [
            {
              id: 2,
              squadId: null,
            },
            {
              id: 4,
              squadId: null,
            },
          ],
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [
          [],
          [],
        ],
      },
      {
        name: "Все без отряда",
        args: [
          [
            {
              id: 1,
              squadId: null,
            },
          ],
        ],
        expected: [
          [],
          [
            {
              id: 1,
              squadId: null,
            },
          ],
        ],
      },
      {
        name: "squadId = 0 — это отряд",
        args: [
          [
            {
              id: 1,
              squadId: 0,
            },
          ],
        ],
        expected: [
          [
            {
              id: 1,
              squadId: 0,
            },
          ],
          [],
        ],
        hidden: true,
      },
      {
        name: "Порядок внутри групп сохраняется",
        args: [
          [
            {
              id: 3,
              squadId: 1,
            },
            {
              id: 1,
              squadId: 1,
            },
          ],
        ],
        expected: [
          [
            {
              id: 3,
              squadId: 1,
            },
            {
              id: 1,
              squadId: 1,
            },
          ],
          [],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Студенты, сдавшие курс (Passed Students)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "passedStudents",
    description: {
      condition: "Дан словарь, где ключ — имя студента, значение — список строк вида `\"x/y\"`, где `x` — набранные баллы, `y` — максимальные баллы по предмету. Напишите функцию `passed_students`, которая возвращает список имён студентов, у которых процент набранных баллов по каждому предмету не ниже порогового значения `threshold` (в процентах).",
      input: [
        "`students` — словарь, ключ — имя студента, значение — список оценок в формате `\"x/y\"`",
        "`threshold` — целое число от 0 до 100",
      ],
      output: "Список строк — имена студентов, сдавших курс. Порядок — как в словаре.",
      constraints: [
        "`1 <= len(students) <= 1000`",
        "`1 <= len(marks) <= 50` для каждого студента",
        "`0 <= x <= y`, `y > 0`",
        "`0 <= threshold <= 100`",
      ],
      example: "Вход:\nstudents = {\n  \"Alice\": [\"4/5\", \"4/5\", \"4/5\"],\n  \"Bob\":   [\"2/5\", \"5/5\", \"5/5\"],\n  \"Carol\": [\"5/5\", \"5/5\", \"5/5\"]\n}\nthreshold = 70\n\nВыход: [\"Alice\", \"Carol\"]",
    },
    starterCode: "function passedStudents(students, threshold) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Один предмет ниже порога — студент не сдал",
        args: [
          {
            Alice: [
              "4/5",
              "4/5",
              "4/5",
            ],
            Bob: [
              "2/5",
              "5/5",
              "5/5",
            ],
            Carol: [
              "5/5",
              "5/5",
              "5/5",
            ],
          },
          70,
        ],
        expected: [
          "Alice",
          "Carol",
        ],
      },
      {
        name: "Порог 0 — сдали все",
        args: [
          {
            A: [
              "0/5",
            ],
          },
          0,
        ],
        expected: [
          "A",
        ],
      },
      {
        name: "Пустой словарь",
        args: [
          {},
          50,
        ],
        expected: [],
      },
      {
        name: "Ровно на пороге — сдал",
        args: [
          {
            A: [
              "7/10",
            ],
          },
          70,
        ],
        expected: [
          "A",
        ],
        hidden: true,
      },
      {
        name: "Никто не сдал",
        args: [
          {
            A: [
              "1/10",
            ],
            B: [
              "2/10",
            ],
          },
          50,
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Проверка пароля (Password Validator)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "is_valid_password",
    description: {
      condition: "Напишите функцию `is_valid_password(password)`, которая проверяет пароль по правилам:\n\nТолько английские буквы, цифры и `_ . # %`.\n\nМинимум одна цифра.\n\nМинимум один спецсимвол `_ # %`.\n\nДлина не меньше 8.\n\nМинимум одна заглавная буква.\n\nПароль не должен быть палиндромом.\n\nПримеры ввода и ожидаемого вывода:",
      input: [],
      output: "",
      constraints: [],
      example: "\"Asdfghjk#2\"      -> True\n\"Asdfghjk\"        -> False\n\"Asdf#232#fdsA\"   -> False\n\"aB1#\"            -> False\n\"asdfghjk#1\"      -> False\n\"Asdf gh#2\"       -> False\n\"XyZ_123#A\"       -> True",
    },
    starterCode: "function is_valid_password(password) {\n    // TODO: напишите решение здесь\n    return false;\n}\n",
    tests: [
      {
        name: "Валидный пароль",
        args: [
          "Asdfghjk#2",
        ],
        expected: true,
      },
      {
        name: "Нет цифры и спецсимвола",
        args: [
          "Asdfghjk",
        ],
        expected: false,
      },
      {
        name: "Палиндром",
        args: [
          "Asdf#232#fdsA",
        ],
        expected: false,
      },
      {
        name: "Слишком короткий",
        args: [
          "aB1#",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Нет заглавной буквы",
        args: [
          "asdfghjk#1",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Недопустимый символ — пробел",
        args: [
          "Asdf gh#2",
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Второй валидный пароль",
        args: [
          "XyZ_123#A",
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Канонизация пути (Path Canonicalization)",
    difficulty: 3,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "canonizePath",
    description: {
      condition: "Напишите функцию `canonizePath`, которая принимает абсолютный путь в Unix-подобной операционной системе и преобразует его к канонической форме.\n\nПравила преобразования:\n\n`..` означает переход на один уровень выше в иерархии директорий\n\n`.` означает текущий уровень в иерархии директорий\n\nНесколько слэшей `//` подряд превращаются в один `/`\n\nПуть не должен оканчиваться слэшем (кроме корневого пути `/`)\n\nНельзя подняться выше корневой директории (лишние `..` игнорируются)",
      input: [],
      output: "",
      constraints: [
        "Входной путь всегда абсолютный (начинается с `/`)",
        "Путь может содержать только буквы, цифры, точки, слэши",
        "Длина пути не превышает 1000 символов",
      ],
      example: "Вход: \"/dir/subdir/../file.txt\"\nВыход: \"/dir/file.txt\"\n\nВход: \"/dir/subdir/../../file.txt\"\nВыход: \"/file.txt\"\n\nВход: \"/dir/subdir/../../../file.txt\"\nВыход: \"/file.txt\"\n\nВход: \"/dir//file.txt\"\nВыход: \"/dir/file.txt\"\n\nВход: \"/dir/\"\nВыход: \"/dir\"\n\nВход: \"/dir/..\"\nВыход: \"/\"\n\nВход: \"/\"\nВыход: \"/\"",
    },
    starterCode: "function canonizePath(path) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Один переход вверх",
        args: [
          "/dir/subdir/../file.txt",
        ],
        expected: "/dir/file.txt",
      },
      {
        name: "Два перехода вверх",
        args: [
          "/dir/subdir/../../file.txt",
        ],
        expected: "/file.txt",
      },
      {
        name: "Выше корня подняться нельзя",
        args: [
          "/dir/subdir/../../../file.txt",
        ],
        expected: "/file.txt",
      },
      {
        name: "Двойной слэш",
        args: [
          "/dir//file.txt",
        ],
        expected: "/dir/file.txt",
        hidden: true,
      },
      {
        name: "Завершающий слэш убирается",
        args: [
          "/dir/",
        ],
        expected: "/dir",
        hidden: true,
      },
      {
        name: "Возврат в корень",
        args: [
          "/dir/..",
        ],
        expected: "/",
        hidden: true,
      },
      {
        name: "Корень",
        args: [
          "/",
        ],
        expected: "/",
        hidden: true,
      },
      {
        name: "Точка — текущая директория",
        args: [
          "/a/./b",
        ],
        expected: "/a/b",
        hidden: true,
      },
    ],
  },
  {
    title: "Промис с внешним резолвером (Promise With Resolvers)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "promiseWithResolve",
    description: {
      condition: "Реализуйте функцию `promiseWithResolve`, которая возвращает объект с двумя полями: `promise` — новый промис, и `resolve` — функцию, вызов которой снаружи резолвит этот промис переданным значением. Это должно работать как аналог `Promise.withResolvers()` — резолвер должен быть доступен вне тела промиса.",
      input: [
        "Функция вызывается без аргументов.",
      ],
      output: "Объект вида `{ resolve, promise }`, где:\n`promise` — Promise, который изначально находится в состоянии pending\n`resolve` — функция `(value) => void`, вызов которой переводит `promise` в состояние resolved с переданным значением",
      constraints: [
        "`resolve` может быть вызван только один раз (повторные вызовы не должны менять результат)",
        "Значение, переданное в `resolve`, может быть любого типа (число, строка, объект)",
        "Если `resolve` не был вызван — промис остаётся pending (в тестах не проверяется)",
      ],
      example: "Вход: (вызов без аргументов)\nconst { resolve, promise } = promiseWithResolve();\npromise.then(v => console.log(v));\nresolve(13);\n// promise резолвится значением 13\n\nВход: resolve вызывается со строкой\nresolve(\"done\");\n// promise резолвится значением \"done\"",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction promiseWithResolve() {\n  // TODO: напишите решение здесь\n  return { resolve: () => {}, promise: Promise.resolve() };\n}\n",
    tests: [
      {
        name: "Резолв снаружи",
        body: "const { resolve, promise } = solution();\nresolve(13);\nreturn await promise;",
        expected: 13,
      },
      {
        name: "Резолв строкой",
        body: "const { resolve, promise } = solution();\nresolve(\"done\");\nreturn await promise;",
        expected: "done",
      },
      {
        name: "До вызова resolve промис висит",
        body: "const { resolve, promise } = solution();\nconst marker = Symbol(\"pending\");\nconst race = await Promise.race([promise, Promise.resolve(marker)]);\nresolve(1);\nreturn race === marker;",
        expected: true,
        hidden: true,
      },
      {
        name: "Пары независимы",
        body: "const a = solution();\nconst b = solution();\na.resolve(\"a\");\nb.resolve(\"b\");\nreturn [await a.promise, await b.promise];",
        expected: [
          "a",
          "b",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Обёртка callback-функции в Promise (Promisify Callback Function)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "promisify",
    description: {
      condition: "Дана функция `asyncFn`, принимающая единственный аргумент — `callback`. Сама `asyncFn` вызывает этот `callback` асинхронно (через микротаск, без реального ожидания по времени) с двумя аргументами: `err` и `data`. Если при выполнении произошла ошибка, `err` содержит её значение, а `data` — `undefined`. Если ошибки нет, `err` равен `null`, а `data` содержит результат.\n\nНужно реализовать функцию `promisify(asyncFn)`, которая возвращает новую функцию. При вызове эта новая функция должна вызвать `asyncFn`, передать ей колбэк, и вернуть `Promise`, который:\n\nрезолвится значением `data`, если ошибки не было;\n\nреджектится значением `err`, если ошибка произошла.",
      input: [
        "`asyncFn` — функция вида `(callback) => void`, где `callback(err, data)` вызывается ровно один раз.",
      ],
      output: "функция, при вызове возвращающая `Promise`, который резолвится или реджектится в зависимости от поведения `asyncFn`.",
      constraints: [
        "`asyncFn` вызывает `callback` ровно один раз (либо с ошибкой, либо с данными)",
        "Реальные задержки (`setTimeout` с ожиданием) не используются — только микротаски, чтобы результат был детерминирован",
      ],
      example: "Вход: asyncFn = (cb) => Promise.resolve().then(() => cb(null, 42))\nВыход: promisify(asyncFn)() → resolve(42)\n\nВход: asyncFn = (cb) => Promise.resolve().then(() => cb(\"Ошибка сети\"))\nВыход: promisify(asyncFn)() → reject(\"Ошибка сети\")",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction promisify(asyncFn) {\n  // TODO: напишите решение здесь\n  return function() {\n    return Promise.resolve();\n  };\n}\n",
    tests: [
      {
        name: "Успешный вызов резолвится данными",
        body: "const asyncFn = (cb) => Promise.resolve().then(() => cb(null, 42));\nreturn await solution(asyncFn)();",
        expected: 42,
      },
      {
        name: "Ошибка приводит к реджекту",
        body: "const asyncFn = (cb) => Promise.resolve().then(() => cb(\"Ошибка сети\"));\ntry {\n  await solution(asyncFn)();\n  return \"resolved\";\n} catch (e) {\n  return e;\n}",
        expected: "Ошибка сети",
      },
      {
        name: "Функция вызывается при каждом обращении",
        body: "let calls = 0;\nconst asyncFn = (cb) => { calls++; cb(null, calls); };\nconst wrapped = solution(asyncFn);\nawait wrapped();\nawait wrapped();\nreturn calls;",
        expected: 2,
        hidden: true,
      },
      {
        name: "Резолв значением falsy",
        body: "const asyncFn = (cb) => cb(null, 0);\nreturn await solution(asyncFn)();",
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Очередь с ограничением параллельности (Queue with Concurrency Limit)",
    difficulty: 3,
    categories: [
      "Queue",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "Queue",
    description: {
      condition: "Реализуйте класс `Queue`, который выполняет задачи с ограничением на количество одновременно выполняемых.\n\nКонструктор принимает три аргумента:\n\n`processTask(task)` — функция обработки задачи, возвращает `Promise`;\n\n`parallel` — максимальное число одновременно выполняемых задач;\n\n`whenEmpty()` — колбэк, вызываемый один раз, когда очередь опустела и все запущенные задачи завершились.\n\n`add(task)` кладёт задачу в очередь, `loop()` запускает обработку.",
      input: [
        "`processTask` — `(task) => Promise`",
        "`parallel` — целое число `>= 1`",
        "`whenEmpty` — функция без аргументов",
      ],
      output: "Класс не возвращает значений напрямую — результат виден по порядку и параллельности вызовов `processTask` и по вызову `whenEmpty`",
      constraints: [
        "Одновременно выполняется не больше `parallel` задач",
        "Задачи берутся из очереди в порядке добавления",
        "`whenEmpty` вызывается ровно один раз после завершения всех задач",
      ],
      example: "const queue = new Queue(\n  (task) => new Promise((r) => setTimeout(() => r(task), 10)),\n  2,\n  () => console.log('готово')\n);\n\nqueue.add(1);\nqueue.add(2);\nqueue.add(3);\nqueue.loop(); // не более двух задач одновременно",
    },
    starterCode: "class Queue {\n    constructor(processTask, parallel, whenEmpty) {\n        // TODO: initialize\n    }\n\n    add(task) {\n        // TODO: add task to queue\n    }\n\n    loop() {\n        // TODO: start processing\n    }\n}\n",
    tests: [
      {
        name: "Одновременно не больше parallel задач",
        body: "let running = 0;\nlet peak = 0;\nconst process = () => new Promise((r) => {\n  running++;\n  peak = Math.max(peak, running);\n  setTimeout(() => { running--; r(); }, 10);\n});\nawait new Promise((done) => {\n  const q = new solution(process, 2, done);\n  for (let i = 0; i < 5; i++) q.add(i);\n  q.loop();\n});\nreturn peak;",
        expected: 2,
      },
      {
        name: "Все задачи обработаны в порядке добавления",
        body: "const seen = [];\nconst process = (task) => new Promise((r) => { seen.push(task); setTimeout(r, 5); });\nawait new Promise((done) => {\n  const q = new solution(process, 1, done);\n  q.add(\"a\"); q.add(\"b\"); q.add(\"c\");\n  q.loop();\n});\nreturn seen;",
        expected: [
          "a",
          "b",
          "c",
        ],
      },
      {
        name: "whenEmpty вызывается ровно один раз",
        body: "let calls = 0;\nawait new Promise((done) => {\n  const q = new solution(() => Promise.resolve(), 2, () => { calls++; done(); });\n  q.add(1); q.add(2);\n  q.loop();\n});\nawait new Promise((r) => setTimeout(r, 30));\nreturn calls;",
        expected: 1,
        hidden: true,
      },
      {
        name: "Пустая очередь сразу сообщает о завершении",
        body: "return await new Promise((done) => {\n  const q = new solution(() => Promise.resolve(), 2, () => done(\"empty\"));\n  q.loop();\n});",
        expected: "empty",
        hidden: true,
      },
    ],
  },
  {
    title: "Сворачивание диапазонов (Range Compression)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "createRanges",
    description: {
      condition: "Напишите функцию `createRanges`, которая принимает массив уникальных целых чисел и возвращает строку, представляющую свернутые диапазоны. Соседние числа (отличающиеся на 1) должны быть объединены в диапазоны формата \"начало-конец\". Числа, не имеющие соседей, выводятся как отдельные значения. Порядок вывода должен соответствовать возрастанию чисел.",
      input: [],
      output: "",
      constraints: [
        "Массив содержит только уникальные целые числа",
        "Массив может быть пустым (тогда вернуть пустую строку)",
        "Числа могут быть отрицательными",
        "Порядок в выходной строке должен соответствовать возрастанию чисел",
      ],
      example: "Вход: [1, 4, 5, 2, 3, 9, 8, 11, 0]\nВыход: \"0-5,8-9,11\"\n\nВход: [1, 4, 3, 2]\nВыход: \"1-4\"\n\nВход: [1, 4]\nВыход: \"1,4\"\n\nВход: [5]\nВыход: \"5\"",
    },
    starterCode: "function createRanges(arr) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Несколько диапазонов",
        args: [
          [
            1,
            4,
            5,
            2,
            3,
            9,
            8,
            11,
            0,
          ],
        ],
        expected: "0-5,8-9,11",
      },
      {
        name: "Один диапазон из перемешанных чисел",
        args: [
          [
            1,
            4,
            3,
            2,
          ],
        ],
        expected: "1-4",
      },
      {
        name: "Соседей нет",
        args: [
          [
            1,
            4,
          ],
        ],
        expected: "1,4",
      },
      {
        name: "Одно число",
        args: [
          [
            5,
          ],
        ],
        expected: "5",
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: "",
        hidden: true,
      },
      {
        name: "Отрицательные числа",
        args: [
          [
            -3,
            -2,
            5,
          ],
        ],
        expected: "-3--2,5",
        hidden: true,
      },
    ],
  },
  {
    title: "Удаление дубликатов из массива (Remove Duplicates)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "removeDuplicate",
    description: {
      condition: "Напишите функцию `removeDuplicate`, которая принимает массив со строками и возвращает новый массив с теми же строками, в том же порядке, из которого удалены все дубликаты. Set и Map использовать запрещено.\n\nПравила:\n\nСохраняется порядок первого вхождения элементов\n\nУдаляются все последующие вхождения\n\nSet и Map использовать нельзя\n\nИсходный массив не должен изменяться",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 0 ≤ N ≤ 1000",
        "Элементы: строки",
        "Время выполнения: O(N²) (без Set/Map)",
        "Память: O(N)",
      ],
      example: "removeDuplicate([\n    'string', '3', '0', 'string', 'string',\n    'number', 'number', '3', 'constructor', '0'\n])\n// -> ['string', '3', '0', 'number', 'constructor']\n\nremoveDuplicate(['a', 'b', 'c', 'a', 'b'])\n// -> ['a', 'b', 'c']\n\nremoveDuplicate(['x', 'x', 'x'])\n// -> ['x']\n\nremoveDuplicate([])\n// -> []",
    },
    starterCode: "function removeDuplicate(arr) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "Строки, в том числе 'constructor'",
        args: [
          [
            "string",
            "3",
            "0",
            "string",
            "string",
            "number",
            "number",
            "3",
            "constructor",
            "0",
          ],
        ],
        expected: [
          "string",
          "3",
          "0",
          "number",
          "constructor",
        ],
      },
      {
        name: "Простые дубликаты",
        args: [
          [
            "a",
            "b",
            "c",
            "a",
            "b",
          ],
        ],
        expected: [
          "a",
          "b",
          "c",
        ],
      },
      {
        name: "Все элементы одинаковые",
        args: [
          [
            "x",
            "x",
            "x",
          ],
        ],
        expected: [
          "x",
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Исходный массив не изменяется",
        body: "const source = [\"a\", \"a\"];\nsolution(source);\nreturn source;",
        expected: [
          "a",
          "a",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Удаление смайликов из строки (Remove Emoticons)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "deleteP",
    description: {
      condition: "Дана строка, в которой могут встречаться смайлики вида `:-` с последующей серией одинаковых символов `)` или `(` (например, `:-)`, `:-)))`, `:-(((`). Напишите функцию, которая удаляет из строки все такие смайлики целиком (последовательность `:-` и все идущие сразу за ней одинаковые символы `)` или `(`), а остальные символы строки оставляет без изменений.",
      input: [
        "строка `str`, содержащая произвольные символы, среди которых могут встречаться смайлики указанного вида.",
      ],
      output: "строка с удалёнными смайликами.",
      constraints: [
        "`0 <= str.length <= 10^4`",
        "смайлик состоит из `:-`, за которым следует один или более одинаковых символов `)` либо `(`",
        "символы `)` или `(`, не идущие сразу после `:-`, смайликом не считаются и остаются в строке",
      ],
      example: "Вход: \"ab :-)\"     → Выход: \"ab \"\nВход: \"ab :-)))\"   → Выход: \"ab \"\nВход: \"ab :-)))(\"  → Выход: \"ab (\"\nВход: \"ab ):-)\"    → Выход: \"ab )\"\nВход: \":-)\"        → Выход: \"\"",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction deleteP(str) {\n  // TODO: напишите решение здесь\n  return '';\n}\n",
    tests: [
      {
        name: "Один смайлик",
        args: [
          "ab :-)",
        ],
        expected: "ab ",
      },
      {
        name: "Длинный смайлик",
        args: [
          "ab :-)))",
        ],
        expected: "ab ",
      },
      {
        name: "Скобка другого типа остаётся",
        args: [
          "ab :-)))(",
        ],
        expected: "ab (",
      },
      {
        name: "Скобка перед смайликом",
        args: [
          "ab ):-)",
        ],
        expected: "ab )",
        hidden: true,
      },
      {
        name: "Вся строка — смайлик",
        args: [
          ":-)",
        ],
        expected: "",
        hidden: true,
      },
      {
        name: "Смайликов нет",
        args: [
          "hello",
        ],
        expected: "hello",
        hidden: true,
      },
    ],
  },
  {
    title: "Удаление falsy значений из объекта или массива (Remove Falsy Values)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "filterFalsy",
    description: {
      condition: "Напишите функцию `filterFalsy(obj)`, которая принимает объект или массив и возвращает новый объект или массив с удалёнными всеми falsy значениями.\n\nFalsy значения — это такие значения `value`, для которых `Boolean(value) === false`. К ним относятся:\n\n`false`\n\n`0`\n\n`\"\"` (пустая строка)\n\n`null`\n\n`undefined`\n\n`NaN`\n\nЕсли значение является массивом или объектом, функция должна рекурсивно фильтровать их элементы или свойства. Пустые массивы и объекты остаются, если после фильтрации внутри них есть хотя бы одно truthy значение.",
      input: [],
      output: "",
      constraints: [
        "Входной объект — результат `JSON.parse`, то есть plain object или array.",
        "Входные данные могут содержать вложенные объекты и массивы.",
        "Не использовать сторонние библиотеки.",
        "Максимальная глубина вложенности ≤ 20.",
        "Время выполнения: O(n), где n — общее количество элементов и свойств.",
      ],
      example: "filterFalsy([null, 0, false, 1])\n-> [1]\n\nfilterFalsy({\n    \"a\": null,\n    \"b\": [false, 1]\n})\n-> { \"b\": [1] }\n\nfilterFalsy([null, 0, 5, [0], false, [6]])\n-> [5, [6]]",
    },
    starterCode: "function filterFalsy(obj) {\n    // TODO: напишите решение здесь\n    return obj;\n}\n",
    tests: [
      {
        name: "Плоский массив",
        args: [
          [
            null,
            0,
            false,
            1,
          ],
        ],
        expected: [
          1,
        ],
      },
      {
        name: "Вложенный массив внутри объекта",
        args: [
          {
            a: null,
            b: [
              false,
              1,
            ],
          },
        ],
        expected: {
          b: [
            1,
          ],
        },
      },
      {
        name: "Пустой после фильтрации массив удаляется",
        args: [
          [
            null,
            0,
            5,
            [
              0,
            ],
            false,
            [
              6,
            ],
          ],
        ],
        expected: [
          5,
          [
            6,
          ],
        ],
      },
      {
        name: "Глубокая вложенность",
        args: [
          {
            a: {
              b: {
                c: 0,
                d: 7,
              },
            },
          },
        ],
        expected: {
          a: {
            b: {
              d: 7,
            },
          },
        },
        hidden: true,
      },
      {
        name: "Всё falsy — пустой результат",
        args: [
          {
            a: 0,
            b: "",
            c: null,
          },
        ],
        expected: {},
        hidden: true,
      },
    ],
  },
  {
    title: "Удаление столбцов с положительными элементами (Remove Positive Columns)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "removePositiveColumns",
    description: {
      condition: "Напишите функцию `removePositiveColumns`, которая принимает двумерный массив (матрицу), содержащую как положительные, так и отрицательные элементы. Функция должна вернуть новую матрицу, из которой удалены все столбцы, содержащие только положительные элементы.\n\nСтолбец удаляется, если каждый элемент в этом столбце больше нуля. Если в столбце есть хотя бы один отрицательный элемент или ноль, столбец сохраняется.",
      input: [],
      output: "",
      constraints: [
        "Матрица может быть любого размера (не обязательно квадратная)",
        "Элементы — целые числа",
        "Если все столбцы удалены, вернуть пустой массив",
        "Исходная матрица не должна изменяться",
      ],
      example: "Вход: [\n  [2, 55, 8, 10],\n  [-1, 4, -9, 1],\n  [2, 4, -3, 50],\n  [7, 9, 7, 108]\n]\nВыход: [\n  [2, 8],\n  [-1, -9],\n  [2, -3],\n  [7, 7]\n]\nПояснение: Удален второй столбец (55, 4, 4, 9) - все положительные\n\nВход: [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n]\nВыход: []\nПояснение: Все столбцы содержат только положительные числа\n\nВход: [\n  [-1, -2, -3],\n  [-4, -5, -6]\n]\nВыход: [\n  [-1, -2, -3],\n  [-4, -5, -6]\n]\nПояснение: Нет положительных чисел, все столбцы сохраняются\n\nВход: [\n  [0, 1, 2],\n  [0, 3, 4]\n]\nВыход: [\n  [0, 1, 2],\n  [0, 3, 4]\n]\nПояснение: Ноль не является положительным числом",
    },
    starterCode: "function removePositiveColumns(matrix) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "Удаляются два столбца",
        args: [
          [
            [
              2,
              55,
              8,
              10,
            ],
            [
              -1,
              4,
              -9,
              1,
            ],
            [
              2,
              4,
              -3,
              50,
            ],
            [
              7,
              9,
              7,
              108,
            ],
          ],
        ],
        expected: [
          [
            2,
            8,
          ],
          [
            -1,
            -9,
          ],
          [
            2,
            -3,
          ],
          [
            7,
            7,
          ],
        ],
      },
      {
        name: "Все столбцы положительные",
        args: [
          [
            [
              1,
              2,
              3,
            ],
            [
              4,
              5,
              6,
            ],
            [
              7,
              8,
              9,
            ],
          ],
        ],
        expected: [],
      },
      {
        name: "Положительных столбцов нет",
        args: [
          [
            [
              -1,
              -2,
              -3,
            ],
            [
              -4,
              -5,
              -6,
            ],
          ],
        ],
        expected: [
          [
            -1,
            -2,
            -3,
          ],
          [
            -4,
            -5,
            -6,
          ],
        ],
      },
      {
        name: "Ноль сохраняет столбец",
        args: [
          [
            [
              0,
              1,
            ],
            [
              5,
              2,
            ],
          ],
        ],
        expected: [
          [
            0,
          ],
          [
            5,
          ],
        ],
        hidden: true,
      },
      {
        name: "Пустая матрица",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Удаление нулей из массива (Remove Zeros)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "removeZeros",
    description: {
      condition: "Дан массив целых чисел. Напишите функцию, которая возвращает новый массив, содержащий все элементы исходного массива, кроме нулей, с сохранением порядка оставшихся элементов.",
      input: [
        "`nums` — массив целых чисел (длина от 0 до 10⁴).",
      ],
      output: "Новый массив целых чисел без нулей, порядок элементов сохранён.",
      constraints: [
        "`0 <= nums.length <= 10000`",
        "`-10^6 <= nums[i] <= 10^6`",
      ],
      example: "Вход: []\nВыход: []\n\nВход: [0]\nВыход: []\n\nВход: [1, 0, 0, 2]\nВыход: [1, 2]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction removeZeros(nums) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Только ноль",
        args: [
          [
            0,
          ],
        ],
        expected: [],
      },
      {
        name: "Нули в середине",
        args: [
          [
            1,
            0,
            0,
            2,
          ],
        ],
        expected: [
          1,
          2,
        ],
      },
      {
        name: "Нулей нет",
        args: [
          [
            3,
            -1,
          ],
        ],
        expected: [
          3,
          -1,
        ],
        hidden: true,
      },
      {
        name: "Отрицательный ноль тоже удаляется",
        args: [
          [
            0,
            4,
          ],
        ],
        expected: [
          4,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Замена элементов в массиве (Replace Items in Array)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "replaceItems",
    description: {
      condition: "Напишите функцию, которая принимает на вход массив `arr`, элемент `item` и элемент `replaceItem`. Функция должна создать новый массив, в котором все элементы, равные `item`, заменены на `replaceItem`. Исходный массив должен остаться неизменным.",
      input: [],
      output: "",
      constraints: [
        "Массив `arr` может содержать элементы любых типов (числа, строки, булевы значения, `null`, `undefined`, вложенные массивы или объекты).",
        "Сравнение элементов должно быть строгим (по значению и типу, где это применимо). Для объектов и массивов сравнение должно быть по ссылке (т.е. они считаются равными, только если это один и тот же объект в памяти). Однако, для простоты данной задачи, можно считать, что массив состоит из примитивов.",
        "Функция должна возвращать новый массив.",
        "Исходный массив не должен быть изменен.",
      ],
      example: "replaceItems([1, 2, 3, 4, 2], 2, 'a')          // [1, 'a', 3, 4, 'a']\nreplaceItems(['apple', 'banana', 'apple'], 'apple', 'orange') // ['orange', 'banana', 'orange']\nreplaceItems([true, false, true], true, 1)    // [1, false, 1]\nreplaceItems([], 5, 10)                        // []",
    },
    starterCode: "function replaceItems(arr, item, replaceItem) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Числа заменяются строкой",
        args: [
          [
            1,
            2,
            3,
            4,
            2,
          ],
          2,
          "a",
        ],
        expected: [
          1,
          "a",
          3,
          4,
          "a",
        ],
      },
      {
        name: "Строки",
        args: [
          [
            "apple",
            "banana",
            "apple",
          ],
          "apple",
          "orange",
        ],
        expected: [
          "orange",
          "banana",
          "orange",
        ],
      },
      {
        name: "Булевы значения",
        args: [
          [
            true,
            false,
            true,
          ],
          true,
          1,
        ],
        expected: [
          1,
          false,
          1,
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
          5,
          10,
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Строгое сравнение: 0 не равно false",
        args: [
          [
            0,
            false,
          ],
          0,
          "zero",
        ],
        expected: [
          "zero",
          false,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Замена элементов в массиве (Replace Items)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "replaceItems",
    description: {
      condition: "Напишите функцию `replaceItems`, которая принимает массив `arr`, значение `item` для поиска и значение `replaceItem` для замены. Функция должна возвращать новый массив, в котором все вхождения `item` заменены на `replaceItem`. Исходный массив не должен изменяться.\n\nПравила:\n\nСравнение элементов должно быть строгим (=== в JS, == в Python, equals в Java)\n\nЕсли элемент не найден, массив возвращается без изменений\n\nИсходный массив не мутируется\n\nВозвращается новый массив",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 0 ≤ N ≤ 1000",
        "Элементы могут быть любого типа (числа, строки, булевы значения)",
        "Время выполнения: O(N)",
        "Память: O(N)",
      ],
      example: "replaceItems([1, 2, 3, 4, 2], 2, 'a')  // -> [1, 'a', 3, 4, 'a']\nreplaceItems([1, 2, 3, 4, 5], 6, 'x')   // -> [1, 2, 3, 4, 5]\nreplaceItems([], 1, 'a')                // -> []\nreplaceItems(['a', 'b', 'c'], 'b', 'z') // -> ['a', 'z', 'c']",
    },
    starterCode: "function replaceItems(arr, item, replaceItem) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "Замена числа",
        args: [
          [
            1,
            2,
            3,
            4,
            2,
          ],
          2,
          "a",
        ],
        expected: [
          1,
          "a",
          3,
          4,
          "a",
        ],
      },
      {
        name: "Элемент не найден",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
          ],
          6,
          "x",
        ],
        expected: [
          1,
          2,
          3,
          4,
          5,
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
          1,
          "a",
        ],
        expected: [],
      },
      {
        name: "Замена строки",
        args: [
          [
            "a",
            "b",
            "c",
          ],
          "b",
          "z",
        ],
        expected: [
          "a",
          "z",
          "c",
        ],
        hidden: true,
      },
      {
        name: "Исходный массив не мутируется",
        body: "const source = [1, 2, 3];\nsolution(source, 2, \"x\");\nreturn source;",
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Замена подстроки в строке (Replace Substring)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "replaceSubstring",
    description: {
      condition: "Напишите функцию `replaceSubstring`, которая принимает строку, подстроку для поиска и подстроку для замены. Функция должна возвращать новую строку, где все вхождения искомой подстроки заменены на подстроку для замены. Замена должна быть чувствительна к регистру.",
      input: [],
      output: "",
      constraints: [
        "Строка может быть пустой (тогда возвращается пустая строка)",
        "Поиск и замена чувствительны к регистру",
        "Если искомая подстрока не найдена, возвращается исходная строка",
        "Подстроки могут быть любой длины",
      ],
      example: "Вход: (\"hello world\", \"world\", \"there\")\nВыход: \"hello there\"\n\nВход: (\"abc abc abc\", \"abc\", \"123\")\nВыход: \"123 123 123\"\n\nВход: (\"Hello hello\", \"hello\", \"hi\")\nВыход: \"Hello hi\"\n\nВход: (\"programming\", \"xyz\", \"123\")\nВыход: \"programming\"",
    },
    starterCode: "function replaceSubstring(str, search, replace) {\n    // TODO: write your solution here\n    return str;\n}\n",
    tests: [
      {
        name: "Одно вхождение",
        args: [
          "hello world",
          "world",
          "there",
        ],
        expected: "hello there",
      },
      {
        name: "Три вхождения",
        args: [
          "abc abc abc",
          "abc",
          "123",
        ],
        expected: "123 123 123",
      },
      {
        name: "Регистр учитывается",
        args: [
          "Hello hello",
          "hello",
          "hi",
        ],
        expected: "Hello hi",
      },
      {
        name: "Подстрока не найдена",
        args: [
          "programming",
          "xyz",
          "123",
        ],
        expected: "programming",
        hidden: true,
      },
      {
        name: "Замена на пустую строку",
        args: [
          "a-b-c",
          "-",
          "",
        ],
        expected: "abc",
        hidden: true,
      },
    ],
  },
  {
    title: "Кэширование одинаковых запросов (Request Cache)",
    difficulty: 3,
    categories: [
      "Caching",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "processRequests",
    description: {
      condition: "Дан массив запросов. Каждый запрос представлен строкой.\n\nНужно обработать запросы по порядку и определить, был ли такой запрос уже выполнен раньше.\n\nЕсли запрос встречается впервые, он считается новым и добавляется в кэш.\nЕсли такой же запрос уже был раньше, он считается полученным из кэша.\n\nФункция должна вернуть массив строк такой же длины:\n\n`\"new\"` — если запрос встретился впервые;\n\n`\"cached\"` — если запрос уже был в кэше.",
      input: [
        "Массив строк `requests`.",
      ],
      output: "Массив строк `\"new\"` и `\"cached\"`.",
      constraints: [
        "1 ≤ requests.length ≤ 100000",
        "0 ≤ requests[i].length ≤ 100",
      ],
      example: "Вход:\n\n[\"/users?id=1\", \"/posts\", \"/users?id=1\", \"/users?id=2\", \"/posts\"]\n\nВыход:\n\n[\"new\", \"new\", \"cached\", \"new\", \"cached\"]",
    },
    starterCode: "function processRequests(requests) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Повторы через несколько запросов",
        args: [
          [
            "/users?id=1",
            "/posts",
            "/users?id=1",
            "/users?id=2",
            "/posts",
          ],
        ],
        expected: [
          "new",
          "new",
          "cached",
          "new",
          "cached",
        ],
      },
      {
        name: "Все запросы уникальны",
        args: [
          [
            "/a",
            "/b",
          ],
        ],
        expected: [
          "new",
          "new",
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Один и тот же запрос трижды",
        args: [
          [
            "/a",
            "/a",
            "/a",
          ],
        ],
        expected: [
          "new",
          "cached",
          "cached",
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Восстановление строки по индексам (Restore String)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "restoreString",
    description: {
      condition: "Напишите функцию `restoreString`, которая принимает строку `str` и массив чисел `arr` — перестановку индексов от `0` до `n-1`.\n\nБуква `str[i]` должна встать на позицию `arr[i]` в новой строке. Функция возвращает получившуюся строку.",
      input: [
        "`str` — строка длины `n`",
        "`arr` — перестановка чисел от `0` до `n-1`",
      ],
      output: "Строка той же длины с переставленными буквами",
      constraints: [
        "Длина строки равна длине массива",
        "`arr` содержит каждый индекс ровно один раз",
      ],
      example: "restoreString(\"house\", [4, 1, 0, 3, 2])  // -> \"uoesh\"\n// 'h' → позиция 4, 'o' → 1, 'u' → 0, 's' → 3, 'e' → 2\n\nrestoreString(\"steal\", [1, 4, 3, 2, 0])  // -> \"lsaet\"",
    },
    starterCode: "function restoreString(str, arr) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "\"house\"",
        args: [
          "house",
          [
            4,
            1,
            0,
            3,
            2,
          ],
        ],
        expected: "uoesh",
      },
      {
        name: "\"steal\"",
        args: [
          "steal",
          [
            1,
            4,
            3,
            2,
            0,
          ],
        ],
        expected: "lsaet",
      },
      {
        name: "Один символ",
        args: [
          "a",
          [
            0,
          ],
        ],
        expected: "a",
      },
      {
        name: "Тождественная перестановка",
        args: [
          "abc",
          [
            0,
            1,
            2,
          ],
        ],
        expected: "abc",
        hidden: true,
      },
      {
        name: "Разворот строки",
        args: [
          "abcd",
          [
            3,
            2,
            1,
            0,
          ],
        ],
        expected: "dcba",
        hidden: true,
      },
    ],
  },
  {
    title: "Повтор промиса с задержкой (Retry Promise)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "retryPromise",
    description: {
      condition: "Напишите функцию `retryPromise(fn, retries, delay)`, которая принимает:\n\n`fn` — функцию без аргументов, возвращающую Promise\n\n`retries` — количество дополнительных попыток при неудаче (не считая первой)\n\n`delay` — задержка в миллисекундах между попытками\n\nФункция должна вызывать `fn`. Если Promise разрешается — вернуть его результат. Если отклоняется — подождать `delay` миллисекунд и повторить вызов. Если все попытки исчерпаны, отклонить с последней ошибкой.",
      input: [
        "`fn`: `() => Promise<any>`",
        "`retries`: целое число `>= 0`",
        "`delay`: число в миллисекундах `>= 0`",
      ],
      output: "Promise, который разрешается значением первого успешного вызова `fn` или отклоняется с ошибкой последней попытки.",
      constraints: [
        "`0 <= retries <= 10`",
        "`0 <= delay <= 5000`",
        "`fn` всегда возвращает Promise",
      ],
      example: "Вход: fn — функция, которая падает 2 раза, потом успешно возвращает 42; retries = 3, delay = 100\nВыход: Promise resolves → 42\n\nВход: fn — функция, которая всегда падает с ошибкой \"fail\"; retries = 2, delay = 50\nВыход: Promise rejects → \"fail\"",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction retryPromise(fn, retries, delay) {\n  // TODO: напишите решение здесь\n  return Promise.resolve();\n}\n",
    tests: [
      {
        name: "Успех после двух падений",
        body: "let calls = 0;\nconst fn = () => { calls++; return calls < 3 ? Promise.reject(\"fail\") : Promise.resolve(42); };\nconst value = await solution(fn, 3, 5);\nreturn [value, calls];",
        expected: [
          42,
          3,
        ],
      },
      {
        name: "Все попытки исчерпаны",
        body: "let calls = 0;\nconst fn = () => { calls++; return Promise.reject(\"fail\"); };\ntry {\n  await solution(fn, 2, 5);\n  return \"resolved\";\n} catch (e) {\n  return [e, calls];\n}",
        expected: [
          "fail",
          3,
        ],
      },
      {
        name: "Успех с первой попытки — повторов нет",
        body: "let calls = 0;\nconst fn = () => { calls++; return Promise.resolve(\"ok\"); };\nconst value = await solution(fn, 3, 5);\nreturn [value, calls];",
        expected: [
          "ok",
          1,
        ],
      },
      {
        name: "retries = 0 — ровно одна попытка",
        body: "let calls = 0;\nconst fn = () => { calls++; return Promise.reject(\"nope\"); };\ntry {\n  await solution(fn, 0, 5);\n  return \"resolved\";\n} catch (e) {\n  return [e, calls];\n}",
        expected: [
          "nope",
          1,
        ],
        hidden: true,
      },
      {
        name: "Между попытками есть задержка",
        body: "let calls = 0;\nconst fn = () => { calls++; return calls < 2 ? Promise.reject(\"x\") : Promise.resolve(\"ok\"); };\nconst start = Date.now();\nawait solution(fn, 2, 40);\nreturn Date.now() - start >= 30;",
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Обратный словарь (Reverse Dictionary)",
    difficulty: 1,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "reverseKeyValue",
    description: {
      condition: "Напишите функцию `reverseKeyValue(dictionary)`, которая принимает словарь и возвращает новый словарь, где каждое значение исходного словаря становится ключом, а исходный ключ — значением.",
      input: [],
      output: "",
      constraints: [],
      example: "data = {1: 2, 3: 2, 's': 'b'}\nreverse_key_value(data)  # -> {2: 3, 'b': 's'}\n\nЗамечания:\n\nЕсли несколько ключей имеют одно и то же значение, новый словарь оставляет последнее совпадение.\n\nВсе ключи и значения в исходном словаре могут быть любых типов, поддерживаемых в качестве ключей словаря в языке.",
    },
    starterCode: "function reverseKeyValue(dict) {\n    // TODO: напишите решение здесь\n    return {};\n}\n",
    tests: [
      {
        name: "Одинаковые значения — побеждает последнее",
        args: [
          {
            "1": 2,
            "3": 2,
            s: "b",
          },
        ],
        expected: {
          "2": "3",
          b: "s",
        },
      },
      {
        name: "Пустой словарь",
        args: [
          {},
        ],
        expected: {},
      },
      {
        name: "Один ключ",
        args: [
          {
            a: "b",
          },
        ],
        expected: {
          b: "a",
        },
      },
      {
        name: "Все значения уникальны",
        args: [
          {
            x: 1,
            y: 2,
          },
        ],
        expected: {
          "1": "x",
          "2": "y",
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Обратная польская нотация (Reverse Polish Notation)",
    difficulty: 2,
    categories: [
      "Stack",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "evaluateRPN",
    description: {
      condition: "Дана строка `expression`, содержащая математическое выражение в обратной польской нотации.\n\nВ выражении числа и операторы разделены пробелами.\nНеобходимо вычислить значение выражения и вернуть результат.\n\nПоддерживаются операторы:\n\n`+` — сложение\n\n`-` — вычитание\n\n`*` — умножение\n\n`/` — деление\n\nВ обратной польской нотации оператор записывается после двух операндов.\n\nНапример:\n\nСначала вычисляется:\n\nЗатем:",
      input: [
        "Строка `expression` — математическое выражение в обратной польской нотации.",
      ],
      output: "Число — результат вычисления выражения.",
      constraints: [
        "1 <= expression.length <= 10_000",
        "Числа могут быть целыми или дробными",
        "Операторы: +, -, *, /",
        "Выражение всегда корректное",
        "Деления на 0 нет",
      ],
      example: "5 8 3 + *\n\n8 + 3 = 11\n\n5 * 11 = 55\n\nВход:\n\n\"5 8 3 + *\"\n\nВыход:\n\n55",
    },
    starterCode: "function evaluateRPN(expression) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "\"5 8 3 + *\"",
        args: [
          "5 8 3 + *",
        ],
        expected: 55,
      },
      {
        name: "Вычитание",
        args: [
          "10 4 -",
        ],
        expected: 6,
      },
      {
        name: "Деление",
        args: [
          "20 4 /",
        ],
        expected: 5,
      },
      {
        name: "Одно число",
        args: [
          "7",
        ],
        expected: 7,
        hidden: true,
      },
      {
        name: "Отрицательные числа",
        args: [
          "-3 5 +",
        ],
        expected: 2,
        hidden: true,
      },
      {
        name: "Вложенные операции",
        args: [
          "2 3 + 4 5 + *",
        ],
        expected: 45,
        hidden: true,
      },
    ],
  },
  {
    title: "Переворот строки на месте (Reverse String In-Place)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "reverseString",
    description: {
      condition: "Напишите функцию `reverse_string(s)`, которая переворачивает входной массив символов `s` на месте без использования дополнительной памяти (O(1) extra space).\n\nПримеры ввода и ожидаемого вывода:",
      input: [],
      output: "",
      constraints: [
        "Массив `s` может содержать только английские буквы.",
        "1 ≤ len(s) ≤ 10^5",
        "Нельзя использовать дополнительный массив для хранения результата.",
      ],
      example: "Input: s = [\"h\",\"e\",\"l\",\"l\",\"o\"]\nOutput: [\"o\",\"l\",\"l\",\"e\",\"h\"]\n\nInput: s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]\nOutput: [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]",
    },
    starterCode: "function reverseString(s) {\n    // TODO: перевернуть массив s на месте\n}\n",
    tests: [
      {
        name: "[\"h\",\"e\",\"l\",\"l\",\"o\"]",
        body: "const s = [\"h\", \"e\", \"l\", \"l\", \"o\"];\nsolution(s);\nreturn s;",
        expected: [
          "o",
          "l",
          "l",
          "e",
          "h",
        ],
      },
      {
        name: "Чётная длина с регистром",
        body: "const s = [\"H\", \"a\", \"n\", \"n\", \"a\", \"h\"];\nsolution(s);\nreturn s;",
        expected: [
          "h",
          "a",
          "n",
          "n",
          "a",
          "H",
        ],
      },
      {
        name: "Пустой массив",
        body: "const s = [];\nsolution(s);\nreturn s;",
        expected: [],
      },
      {
        name: "Один символ",
        body: "const s = [\"x\"];\nsolution(s);\nreturn s;",
        expected: [
          "x",
        ],
        hidden: true,
      },
      {
        name: "Новый массив не создаётся",
        body: "const s = [\"a\", \"b\"];\nconst same = s;\nsolution(s);\nreturn [same === s, s];",
        expected: [
          true,
          [
            "b",
            "a",
          ],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Обращение строки или массива (Reverse)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "reverse",
    description: {
      condition: "Напишите функцию `reverse`, которая:\n\nПринимает строку или массив строк/чисел.\n\nВозвращает перевёрнутую версию входных данных.\n\nНе должна мутировать (изменять) исходный массив.",
      input: [],
      output: "",
      constraints: [
        "Исходные данные не должны изменяться.",
        "Для строки возвращается строка, для массива — новый массив.",
        "Массив может содержать строки или числа (в рамках одной задачи — однотипные элементы).",
        "Если вход — пустой массив или пустая строка, возвращается пустой массив или пустая строка соответственно.",
      ],
      example: "Вход: \"abcd\"\nВыход: \"dcba\"\n\nВход: [\"a\", \"b\", \"c\"]\nВыход: [\"c\", \"b\", \"a\"]\n\nВход: [1, 2, 3, 4, 5]\nВыход: [5, 4, 3, 2, 1]\n\nВход: []\nВыход: []",
    },
    starterCode: "function reverse(input) {\n    // TODO: write your solution here\n    return input;\n}\n",
    tests: [
      {
        name: "Строка",
        args: [
          "abcd",
        ],
        expected: "dcba",
      },
      {
        name: "Массив строк",
        args: [
          [
            "a",
            "b",
            "c",
          ],
        ],
        expected: [
          "c",
          "b",
          "a",
        ],
      },
      {
        name: "Массив чисел",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
          ],
        ],
        expected: [
          5,
          4,
          3,
          2,
          1,
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Исходный массив не мутируется",
        body: "const source = [1, 2, 3];\nsolution(source);\nreturn source;",
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Сжатие строки (Run-Length Encoding)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "compress",
    description: {
      condition: "Напишите функцию `compress`, которая выполняет сжатие строки с помощью алгоритма RLE (Run-Length Encoding). Алгоритм заменяет последовательности одинаковых символов на сам символ и количество его повторений. Если символ встречается один раз, он остаётся без изменений (без цифры 1).",
      input: [],
      output: "",
      constraints: [
        "Строка содержит только заглавные буквы латинского алфавита (A-Z)",
        "Длина строки не превышает 1000 символов",
        "Если строка пустая, возвращается пустая строка",
        "Не использовать встроенные функции сжатия",
      ],
      example: "Вход: \"AAAABBCCDDAAB\"\nВыход: \"A4B2C2D2A2B\"\nПояснение: AAAA → A4, BB → B2, CC → C2, DD → D2, AA → A2, B → B\n\nВход: \"ABCD\"\nВыход: \"ABCD\"\nПояснение: Все символы уникальны, остаются без изменений\n\nВход: \"AAA\"\nВыход: \"A3\"\nПояснение: Три A подряд → A3\n\nВход: \"\"\nВыход: \"\"",
    },
    starterCode: "function compress(str) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "\"AAAABBCCDDAAB\"",
        args: [
          "AAAABBCCDDAAB",
        ],
        expected: "A4B2C2D2A2B",
      },
      {
        name: "Все символы уникальны",
        args: [
          "ABCD",
        ],
        expected: "ABCD",
      },
      {
        name: "\"AAA\"",
        args: [
          "AAA",
        ],
        expected: "A3",
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: "",
        hidden: true,
      },
      {
        name: "Один символ",
        args: [
          "Z",
        ],
        expected: "Z",
        hidden: true,
      },
      {
        name: "Возврат к прежней букве",
        args: [
          "aabaa",
        ],
        expected: "a2ba2",
        hidden: true,
      },
    ],
  },
  {
    title: "Функция runOnce (Run Once)",
    difficulty: 1,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "runOnce",
    description: {
      condition: "Реализуйте функцию-обёртку `runOnce(fn)`. Эта функция принимает другую функцию `fn` в качестве аргумента и возвращает новую функцию. Возвращенная функция может быть вызвана только один раз. При первом вызове она выполняет исходную функцию `fn` с переданными аргументами и возвращает её результат. Все последующие попытки вызова возвращенной функции должны возвращать `undefined`, независимо от переданных аргументов. Исходная функция `fn` может принимать любое количество аргументов и возвращать любое значение.\n\nПримеры использования:",
      input: [],
      output: "",
      constraints: [],
      example: "const logHello = () => {\n  console.log('hello!');\n};\nconst logHelloOnce = runOnce(logHello);\n\nlogHelloOnce(); // Должно вывести \"hello!\" в консоль\nlogHelloOnce(); // Должно вернуть undefined, ничего не выводя в консоль\n\nconst add = (a, b) => a + b;\nconst addOnce = runOnce(add);\n\nconsole.log(addOnce(5, 3)); // Должно вывести 8\nconsole.log(addOnce(10, 2)); // Должно вывести undefined",
    },
    starterCode: "function runOnce(fn) {\n    // TODO: write your solution here\n}\n",
    tests: [
      {
        name: "Второй вызов возвращает undefined",
        body: "const add = (a, b) => a + b;\nconst once = solution(add);\nreturn [once(5, 3), once(10, 2)];",
        expected: [
          8,
          undefined,
        ],
      },
      {
        name: "Исходная функция вызывается один раз",
        body: "let calls = 0;\nconst once = solution(() => { calls++; });\nonce(); once(); once();\nreturn calls;",
        expected: 1,
      },
      {
        name: "Обёртки независимы",
        body: "const fn = (x) => x;\nconst a = solution(fn);\nconst b = solution(fn);\na(1);\nreturn [a(2), b(3)];",
        expected: [
          undefined,
          3,
        ],
        hidden: true,
      },
      {
        name: "Функция без аргументов",
        body: "const once = solution(() => \"hello!\");\nreturn [once(), once()];",
        expected: [
          "hello!",
          undefined,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Позиция стрелки на диске сейфа (Safe Dial Final Position)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "safeDialPosition",
    description: {
      condition: "Механический сейф оснащён круглым барабаном с делениями от 0 до 99. Стрелка изначально указывает на положение 50. Поворот барабана задаётся целым числом: положительное число означает вращение по часовой стрелке на соответствующее количество делений, отрицательное — против часовой стрелки. При выходе за пределы 0 или 99 отсчёт продолжается по кругу (циклически). Дан массив целых чисел, представляющих последовательные повороты барабана. Нужно определить итоговое положение стрелки после выполнения всех поворотов по порядку.",
      input: [
        "массив целых чисел `moves` (повороты, каждое может быть положительным, отрицательным или нулём)",
      ],
      output: "целое число — финальная позиция стрелки (от 0 до 99)",
      constraints: [
        "`0 <= moves.length <= 1000`",
        "`-1000 <= moves[i] <= 1000`",
        "начальная позиция всегда 50",
      ],
      example: "Вход: `[10, -5, 3]`\nВыход: `58` (50 → 60 → 55 → 58)",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction safeDialPosition(moves) {\n  // TODO: напишите решение здесь\n  return 50;\n}\n",
    tests: [
      {
        name: "[10, -5, 3]",
        args: [
          [
            10,
            -5,
            3,
          ],
        ],
        expected: 58,
      },
      {
        name: "Без поворотов",
        args: [
          [],
        ],
        expected: 50,
      },
      {
        name: "Полный круг",
        args: [
          [
            100,
          ],
        ],
        expected: 50,
      },
      {
        name: "Переход через 0 против часовой",
        args: [
          [
            -60,
          ],
        ],
        expected: 90,
        hidden: true,
      },
      {
        name: "Переход через 99 по часовой",
        args: [
          [
            60,
          ],
        ],
        expected: 10,
        hidden: true,
      },
      {
        name: "Несколько кругов",
        args: [
          [
            250,
            -50,
          ],
        ],
        expected: 50,
        hidden: true,
      },
    ],
  },
  {
    title: "Количество пересечений нуля на диске сейфа (Safe Dial Zero Crossings)",
    difficulty: 3,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "safeDialZeroCrossings",
    description: {
      condition: "Модификация задачи про сейф: барабан имеет деления от 0 до 99, стрелка изначально указывает на 50. Дан массив целых чисел `moves` — последовательные повороты барабана (положительное число — по часовой стрелке, отрицательное — против часовой стрелки, циклически в пределах 0–99). Вместо итоговой позиции нужно посчитать, сколько раз за все повороты стрелка пересекла границу между делениями 99 и 0 (в любом направлении). Если один поворот охватывает несколько полных кругов, каждое пересечение границы считается отдельно.",
      input: [
        "массив целых чисел `moves`",
      ],
      output: "целое число — общее количество пересечений границы 99/0",
      constraints: [
        "`0 <= moves.length <= 1000`",
        "`-1000 <= moves[i] <= 1000`",
        "начальная позиция всегда 50",
      ],
      example: "Вход: `[60, -70, 250]`\nВыход: `4`\nПояснение: 50→110 (1 пересечение, позиция 10) → 10→−60 (1 пересечение, позиция 40) → 40→290 (2 пересечения, позиция 90). Итого 1+1+2=4.",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction safeDialZeroCrossings(moves) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "[60, -70, 250]",
        args: [
          [
            60,
            -70,
            250,
          ],
        ],
        expected: 4,
      },
      {
        name: "Без пересечений",
        args: [
          [
            10,
            -10,
          ],
        ],
        expected: 0,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
      },
      {
        name: "Ровно один круг",
        args: [
          [
            100,
          ],
        ],
        expected: 1,
        hidden: true,
      },
      {
        name: "Три круга назад",
        args: [
          [
            -300,
          ],
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "Остановка ровно на 0",
        args: [
          [
            50,
          ],
        ],
        expected: 1,
        hidden: true,
      },
    ],
  },
  {
    title: "Поиск позиции вставки (Search Insert Position)",
    difficulty: 2,
    categories: [
      "Search",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "searchInsert",
    description: {
      condition: "Дан отсортированный по возрастанию массив целых чисел `nums` и целое число `target`.\n\nНеобходимо определить индекс, по которому число `target` должно быть вставлено в массив, чтобы порядок сортировки сохранился.\n\nЕсли число уже присутствует в массиве — вернуть его индекс.\n\nТребуется решение лучше линейного перебора.",
      input: [
        "`nums` — массив целых чисел, отсортированный по возрастанию",
        "`target` — число для вставки",
      ],
      output: "Вернуть индекс вставки числа.",
      constraints: [
        "`1 <= nums.length <= 100000`",
        "`-10^9 <= nums[i], target <= 10^9`",
        "массив отсортирован",
        "желательно `O(log n)`",
      ],
      example: "Вход:\n\nnums=[1,5,10,20]\ntarget=17\n\nВыход:\n\n3",
    },
    starterCode: "function searchInsert(nums, target) {\n    // TODO: напишите решение здесь\n    return 0;\n}\n",
    tests: [
      {
        name: "Вставка в середину",
        args: [
          [
            1,
            5,
            10,
            20,
          ],
          17,
        ],
        expected: 3,
      },
      {
        name: "Число уже есть",
        args: [
          [
            1,
            3,
            5,
            6,
          ],
          5,
        ],
        expected: 2,
      },
      {
        name: "Вставка в начало",
        args: [
          [
            2,
            4,
          ],
          1,
        ],
        expected: 0,
      },
      {
        name: "Вставка в конец",
        args: [
          [
            1,
            2,
            3,
          ],
          10,
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
          5,
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Совпадение с первым элементом",
        args: [
          [
            1,
            3,
          ],
          1,
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Второй по величине элемент за один проход (Second Largest Element in One Pass)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "secondLargest",
    description: {
      condition: "Дан массив чисел. Напишите функцию, которая находит второе по величине число за один проход по массиву (без сортировки). Если в массиве меньше двух различных чисел, функция должна выбросить ошибку.",
      input: [
        "`nums` — массив чисел, длина от 0 до 10^4",
      ],
      output: "Второе по величине число в массиве (учитываются только различные значения — если максимум встречается несколько раз, второй по величине считается следующее по убыванию отличное значение)",
      constraints: [
        "`-10^6 <= nums[i] <= 10^6`",
        "Если в массиве менее двух различных чисел — выбросить ошибку",
      ],
      example: "Вход: [3, 1, 4, 1, 5, 9, 2, 6]\nВыход: 6\n\nВход: [5, 5, 5]\nВыход: ошибка (недостаточно различных чисел)\n\nВход: [7]\nВыход: ошибка",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction secondLargest(nums) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Обычный массив",
        args: [
          [
            3,
            1,
            4,
            1,
            5,
            9,
            2,
            6,
          ],
        ],
        expected: 6,
      },
      {
        name: "Все элементы одинаковые — ошибка",
        body: "try {\n  solution([5, 5, 5]);\n  return \"no error\";\n} catch {\n  return \"threw\";\n}",
        expected: "threw",
      },
      {
        name: "Один элемент — ошибка",
        body: "try {\n  solution([7]);\n  return \"no error\";\n} catch {\n  return \"threw\";\n}",
        expected: "threw",
      },
      {
        name: "Максимум повторяется",
        args: [
          [
            4,
            9,
            9,
            1,
          ],
        ],
        expected: 4,
        hidden: true,
      },
      {
        name: "Отрицательные числа",
        args: [
          [
            -5,
            -2,
            -9,
          ],
        ],
        expected: -5,
        hidden: true,
      },
      {
        name: "Пустой массив — ошибка",
        body: "try {\n  solution([]);\n  return \"no error\";\n} catch {\n  return \"threw\";\n}",
        expected: "threw",
        hidden: true,
      },
    ],
  },
  {
    title: "Выбор баннеров по весу (Select Banners by Weight)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "selectBanners",
    description: {
      condition: "Напишите функцию `selectBanners`, которая принимает массив баннеров и число `count`, обозначающее количество баннеров, которые нужно выбрать из массива. Функция должна вернуть массив из `count` баннеров с наибольшим весом (чем выше вес, тем выше приоритет выбора).\n\nКаждый баннер представлен объектом с полями:\n\n`id` (число) — уникальный идентификатор баннера\n\n`weight` (число) — вес баннера (чем больше, тем выше приоритет)",
      input: [],
      output: "",
      constraints: [
        "Если `count` больше длины массива, вернуть все баннеры, отсортированные по убыванию веса",
        "Если `count` равен 0, вернуть пустой массив",
        "Веса могут быть любыми положительными числами",
        "Порядок баннеров в результате должен быть от наибольшего веса к наименьшему",
      ],
      example: "const banners = [\n  {id: 2, weight: 10},\n  {id: 4, weight: 5},\n  {id: 8, weight: 15},\n  {id: 22, weight: 18},\n  {id: 41, weight: 41},\n  {id: 53, weight: 1},\n  {id: 69, weight: 9},\n];\n\nselectBanners(banners, 3);\n// Возвращает: [{id: 41, weight: 41}, {id: 22, weight: 18}, {id: 8, weight: 15}]",
    },
    starterCode: "function selectBanners(banners, count) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Три самых тяжёлых баннера",
        args: [
          [
            {
              id: 2,
              weight: 10,
            },
            {
              id: 4,
              weight: 5,
            },
            {
              id: 8,
              weight: 15,
            },
            {
              id: 22,
              weight: 18,
            },
            {
              id: 41,
              weight: 41,
            },
            {
              id: 53,
              weight: 1,
            },
            {
              id: 69,
              weight: 9,
            },
          ],
          3,
        ],
        expected: [
          {
            id: 41,
            weight: 41,
          },
          {
            id: 22,
            weight: 18,
          },
          {
            id: 8,
            weight: 15,
          },
        ],
      },
      {
        name: "count = 0",
        args: [
          [
            {
              id: 1,
              weight: 5,
            },
          ],
          0,
        ],
        expected: [],
      },
      {
        name: "count больше числа баннеров",
        args: [
          [
            {
              id: 1,
              weight: 5,
            },
          ],
          10,
        ],
        expected: [
          {
            id: 1,
            weight: 5,
          },
        ],
      },
      {
        name: "Исходный массив не мутируется",
        body: "const banners = [{ id: 1, weight: 1 }, { id: 2, weight: 9 }];\nsolution(banners, 1);\nreturn banners[0].id;",
        expected: 1,
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
          3,
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Генератор последовательных ID через замыкание (Sequential ID Generator via Closure)",
    difficulty: 1,
    categories: [
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "createIdGenerator",
    description: {
      condition: "Реализуйте функцию `createIdGenerator` (или `id`, если нужна одна функция без фабрики), которая при каждом вызове возвращает следующее целое число, начиная с 0. Первый вызов возвращает 0, второй — 1, третий — 2, и так далее. Состояние должно сохраняться между вызовами благодаря замыканию.",
      input: [
        "нет аргументов у самой генерирующей функции",
      ],
      output: "целое число — очередной номер по счёту вызова",
      constraints: [
        "до 1000 последовательных вызовов на тест",
      ],
      example: "id() → 0\nid() → 1\nid() → 2\nid() → 3",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction createIdGenerator() {\n  // TODO: напишите решение здесь\n  return function() {\n    return 0;\n  };\n}\n",
    tests: [
      {
        name: "Счёт начинается с нуля",
        body: "const id = solution();\nreturn [id(), id(), id(), id()];",
        expected: [
          0,
          1,
          2,
          3,
        ],
      },
      {
        name: "Генераторы независимы",
        body: "const a = solution();\nconst b = solution();\na(); a();\nreturn [b(), a()];",
        expected: [
          0,
          2,
        ],
      },
      {
        name: "Первый вызов возвращает 0",
        body: "return solution()();",
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Пересечение множеств (Set Intersection)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "intersection",
    description: {
      condition: "Реализуйте функцию `intersection(set1, set2)`, которая принимает два массива уникальных целых чисел и возвращает новый массив, содержащий только те числа, которые присутствуют одновременно в обоих массивах.\n\nПорядок элементов в результате соответствует порядку в `set1`.",
      input: [
        "`set1` — массив уникальных целых чисел",
        "`set2` — массив уникальных целых чисел",
      ],
      output: "Массив чисел, присутствующих в обоих массивах",
      constraints: [
        "Элементы внутри каждого массива не повторяются",
        "Длина от 0 до 10^5",
      ],
      example: "Вход: set1 = [1, 2, 3, 4], set2 = [3, 4, 5, 6, 7, 8]\nВыход: [3, 4]\n\nВход: set1 = [1, 2], set2 = [3, 4]\nВыход: []\n\nВход: set1 = [], set2 = [1, 2, 3]\nВыход: []",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction intersection(set1, set2) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Общие элементы",
        args: [
          [
            1,
            2,
            3,
            4,
          ],
          [
            3,
            4,
            5,
            6,
            7,
            8,
          ],
        ],
        expected: [
          3,
          4,
        ],
      },
      {
        name: "Пересечения нет",
        args: [
          [
            1,
            2,
          ],
          [
            3,
            4,
          ],
        ],
        expected: [],
      },
      {
        name: "Первое множество пустое",
        args: [
          [],
          [
            1,
            2,
            3,
          ],
        ],
        expected: [],
      },
      {
        name: "Множества совпадают",
        args: [
          [
            1,
            2,
          ],
          [
            1,
            2,
          ],
        ],
        expected: [
          1,
          2,
        ],
        hidden: true,
      },
      {
        name: "Второе множество пустое",
        args: [
          [
            1,
          ],
          [],
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Реализация Singleton (Singleton Pattern)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "Singleton",
    description: {
      condition: "Реализуйте класс `Singleton`, который гарантирует существование только одного экземпляра объекта в приложении.\n\nКласс должен предоставлять метод `getInstance()`, который возвращает единственный объект класса. Любые последующие вызовы `getInstance()` должны возвращать тот же самый объект.\n\nПримеры использования:",
      input: [],
      output: "",
      constraints: [
        "Использовать только стандартные средства языка.",
        "Экземпляр должен создаваться лениво (только при первом вызове `getInstance()`).",
        "Поддержка многопоточности необязательна, но приветствуется.",
        "Входных данных нет — проверяется только идентичность объектов.",
      ],
      example: "Singleton s1 = Singleton.getInstance();\nSingleton s2 = Singleton.getInstance();\nSystem.out.println(s1 == s2); // true",
    },
    starterCode: "class Singleton {\n    static #instance = null;\n\n    constructor() {\n        // Приватный конструктор (через символ или ошибку)\n        if (Singleton.#instance !== null) {\n            throw new Error(\"Singleton cannot be instantiated directly. Use getInstance()\");\n        }\n    }\n\n    static getInstance() {\n        // TODO: вернуть единственный экземпляр\n        return Singleton.#instance;\n    }\n}\n",
    tests: [
      {
        name: "getInstance возвращает один и тот же объект",
        body: "const a = solution.getInstance();\nconst b = solution.getInstance();\nreturn a === b;",
        expected: true,
      },
      {
        name: "Экземпляр не null",
        body: "return solution.getInstance() !== null;",
        expected: true,
      },
      {
        name: "Состояние сохраняется между вызовами",
        body: "solution.getInstance().value = 42;\nreturn solution.getInstance().value;",
        expected: 42,
        hidden: true,
      },
      {
        name: "Десять вызовов — один объект",
        body: "const first = solution.getInstance();\nfor (let i = 0; i < 10; i++) if (solution.getInstance() !== first) return false;\nreturn true;",
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Сортировка по частоте встречаемости (Sort Array by Frequency)",
    difficulty: 3,
    categories: [
      "Sorting",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sortByFrequency",
    description: {
      condition: "Вот исправленное условие задачи:\n\nДан массив целых чисел. Верните новый массив, в котором элементы расположены по убыванию частоты их встречаемости в исходном массиве. Если два элемента встречаются одинаковое количество раз, они сортируются по убыванию значения.",
      input: [
        "Массив целых чисел `nums` (может содержать повторяющиеся элементы).",
      ],
      output: "Новый массив тех же элементов, отсортированных по убыванию частоты. При равной частоте — по убыванию значения элемента. Каждый элемент присутствует в результате столько раз, сколько он встречался в исходном массиве.",
      constraints: [
        "`1 <= nums.length <= 10^4`",
        "`-10^5 <= nums[i] <= 10^5`",
      ],
      example: "Вход: `[1, 1, 2, 2, 2, 3]` → Выход: `[2, 2, 2, 1, 1, 3]`\n\nВход: `[4, 4, 1, 1, 1, 2, 2, 3]` → Выход: `[1, 1, 1, 4, 4, 2, 2, 3]`\n\nВход: `[5, 3, 1, 2, 4]` → Выход: `[5, 4, 3, 2, 1]`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction sortByFrequency(nums) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "[1, 1, 2, 2, 2, 3]",
        args: [
          [
            1,
            1,
            2,
            2,
            2,
            3,
          ],
        ],
        expected: [
          2,
          2,
          2,
          1,
          1,
          3,
        ],
      },
      {
        name: "Разные частоты",
        args: [
          [
            4,
            4,
            1,
            1,
            1,
            2,
            2,
            3,
          ],
        ],
        expected: [
          1,
          1,
          1,
          4,
          4,
          2,
          2,
          3,
        ],
      },
      {
        name: "Все частоты равны — по убыванию значения",
        args: [
          [
            5,
            3,
            1,
            2,
            4,
          ],
        ],
        expected: [
          5,
          4,
          3,
          2,
          1,
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Один элемент",
        args: [
          [
            7,
          ],
        ],
        expected: [
          7,
        ],
        hidden: true,
      },
      {
        name: "Ничья по частоте",
        args: [
          [
            1,
            1,
            2,
            2,
          ],
        ],
        expected: [
          2,
          2,
          1,
          1,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Сортировка дат с пустыми значениями (Sort Dates With Null Values)",
    difficulty: 2,
    categories: [
      "Sorting",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sortDatesWithNulls",
    description: {
      condition: "Дан список дат и пустых значений.\n\nНеобходимо отсортировать даты по возрастанию, а все пустые значения оставить в конце списка.\n\nДаты представлены строками в формате `\"YYYY-MM-DD\"`.\nПустое значение представлено как `null` / `None`.\n\nНужно вернуть новый отсортированный список.",
      input: [
        "Список `items`, содержащий строки с датами и пустые значения.",
      ],
      output: "Отсортированный список, где:\nвсе даты идут по возрастанию;\nвсе пустые значения находятся в конце.",
      constraints: [
        "`0 <= items.length <= 100000`",
        "дата всегда задана в формате `\"YYYY-MM-DD\"`",
        "пустые значения могут быть в любом количестве",
        "список может быть пустым",
        "список может содержать только даты",
        "список может содержать только пустые значения",
      ],
      example: "Вход:\n\n[\"2025-01-10\", None, \"2024-05-01\", \"2025-01-01\", None]\n\nВыход:\n\n[\"2024-05-01\", \"2025-01-01\", \"2025-01-10\", None, None]",
    },
    starterCode: "function sortDatesWithNulls(items) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Даты и null вперемешку",
        args: [
          [
            "2025-01-10",
            null,
            "2024-05-01",
            "2025-01-01",
            null,
          ],
        ],
        expected: [
          "2024-05-01",
          "2025-01-01",
          "2025-01-10",
          null,
          null,
        ],
      },
      {
        name: "Только null",
        args: [
          [
            null,
            null,
          ],
        ],
        expected: [
          null,
          null,
        ],
      },
      {
        name: "Пустой список",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Без пустых значений",
        args: [
          [
            "2024-12-31",
            "2024-01-01",
          ],
        ],
        expected: [
          "2024-01-01",
          "2024-12-31",
        ],
        hidden: true,
      },
      {
        name: "null в начале списка",
        args: [
          [
            null,
            "2020-02-02",
          ],
        ],
        expected: [
          "2020-02-02",
          null,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Сортировка иерархических номеров пунктов (Sort Hierarchical Section Numbers)",
    difficulty: 3,
    categories: [
      "Strings",
      "Arrays",
      "Sorting",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sortHierarchical",
    description: {
      condition: "Дан массив строк, представляющих номера пунктов иерархического нумерованного списка документа (например: `'1'`, `'1.1'`, `'1.2'`, `'1.10'`, `'2'`, `'2.1'`). Каждая строка состоит из одного или нескольких неотрицательных целых чисел, разделённых точками. Напишите функцию, которая сортирует такие номера в правильном порядке следования пунктов в документе — то есть числовое сравнение по каждому уровню вложенности, а не лексикографическое сравнение строк (например, `'1.10'` должен идти после `'1.2'`, хотя лексикографически `'1.10'` < `'1.2'`). Более короткий номер, являющийся префиксом более длинного (например, `'1'` перед `'1.1'`), должен идти раньше.",
      input: [
        "`items` — массив строк, каждая из которых является номером пункта в формате `\"N\"`, `\"N.N\"`, `\"N.N.N\"` и т.д. (числа неотрицательные, без ведущих нулей)",
      ],
      output: "Новый массив строк, отсортированный в правильном иерархическом порядке.",
      constraints: [
        "`0 <= items.length <= 10^4`",
        "Каждая строка содержит от 1 до 10 уровней, разделённых точками",
        "Каждый уровень — целое число от 0 до 10^6",
      ],
      example: "Вход: ['1', '1.1', '1.2', '1.10', '2', '2.1']\nВыход: ['1', '1.1', '1.2', '1.10', '2', '2.1']\n\nВход: ['2.1', '1.10', '1.2', '1']\nВыход: ['1', '1.2', '1.10', '2.1']\n\nВход: ['1.1', '1']\nВыход: ['1', '1.1']",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction sortHierarchical(items) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Уже отсортированный список",
        args: [
          [
            "1",
            "1.1",
            "1.2",
            "1.10",
            "2",
            "2.1",
          ],
        ],
        expected: [
          "1",
          "1.1",
          "1.2",
          "1.10",
          "2",
          "2.1",
        ],
      },
      {
        name: "Перемешанный список",
        args: [
          [
            "2.1",
            "1.10",
            "1.2",
            "1",
          ],
        ],
        expected: [
          "1",
          "1.2",
          "1.10",
          "2.1",
        ],
      },
      {
        name: "Родитель перед потомком",
        args: [
          [
            "1.1",
            "1",
          ],
        ],
        expected: [
          "1",
          "1.1",
        ],
      },
      {
        name: "Три уровня вложенности",
        args: [
          [
            "1.1.2",
            "1.1.10",
            "1.1",
          ],
        ],
        expected: [
          "1.1",
          "1.1.2",
          "1.1.10",
        ],
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Сортировка объектов с фильтрацией (Sort Objects with Filtering)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sortObjects",
    description: {
      condition: "Напишите функцию `sortObjects`, которая принимает массив объектов, каждый из которых имеет поля `id` и `val`. Функция должна вернуть новый массив, содержащий только те объекты, у которых значение `val` неотрицательное (больше или равно 0), отсортированный по возрастанию значения `val`.",
      input: [],
      output: "",
      constraints: [
        "Исходный массив не должен изменяться",
        "Если все объекты имеют отрицательные `val`, вернуть пустой массив",
        "Если массив пустой, вернуть пустой массив",
        "`id` и `val` — целые числа",
      ],
      example: "const arr = [\n  {id: 13, val: 5},\n  {id: 5, val: -17},\n  {id: 77, val: 98},\n  {id: 24, val: 2}\n];\n\nsortObjects(arr);\n// Возвращает: [\n//   {id: 24, val: 2},\n//   {id: 13, val: 5},\n//   {id: 77, val: 98}\n// ]",
    },
    starterCode: "function sortObjects(arr) {\n    // TODO: напишите решение здесь\n    return [];\n}\n",
    tests: [
      {
        name: "Фильтрация и сортировка",
        args: [
          [
            {
              id: 13,
              val: 5,
            },
            {
              id: 5,
              val: -17,
            },
            {
              id: 77,
              val: 98,
            },
            {
              id: 24,
              val: 2,
            },
          ],
        ],
        expected: [
          {
            id: 24,
            val: 2,
          },
          {
            id: 13,
            val: 5,
          },
          {
            id: 77,
            val: 98,
          },
        ],
      },
      {
        name: "Все значения отрицательные",
        args: [
          [
            {
              id: 1,
              val: -1,
            },
          ],
        ],
        expected: [],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Ноль остаётся",
        args: [
          [
            {
              id: 1,
              val: 0,
            },
            {
              id: 2,
              val: -1,
            },
          ],
        ],
        expected: [
          {
            id: 1,
            val: 0,
          },
        ],
        hidden: true,
      },
      {
        name: "Уже отсортированные значения",
        args: [
          [
            {
              id: 1,
              val: 1,
            },
            {
              id: 2,
              val: 2,
            },
          ],
        ],
        expected: [
          {
            id: 1,
            val: 1,
          },
          {
            id: 2,
            val: 2,
          },
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Сортировка нечётных чисел массива (Sort Odd Numbers In Place)",
    difficulty: 2,
    categories: [
      "Arrays",
      "Sorting",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sortOddInPlace",
    description: {
      condition: "Дан массив целых чисел. Нужно отсортировать по возрастанию только нечётные числа, сохранив их относительный порядок позиций, а чётные числа должны остаться на своих исходных местах без изменений.",
      input: [
        "`nums` — массив целых чисел.",
      ],
      output: "Новый (или изменённый) массив той же длины, где чётные элементы стоят на прежних местах, а на местах бывших нечётных элементов — отсортированные по возрастанию нечётные значения (в порядке их исходного появления).",
      constraints: [
        "`0 ≤ nums.length ≤ 1000`",
        "`-10^6 ≤ nums[i] ≤ 10^6`",
      ],
      example: "Вход: [2, 3, 7, 4, 6, 1, 5, 8, 9]\nВыход: [2, 1, 3, 4, 6, 5, 7, 8, 9]\n\nВход: [1, 2, 3]\nВыход: [1, 2, 3]\n\n(нечётные [1, 3] уже отсортированы)",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction sortOddInPlace(nums) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Нечётные переставляются, чётные остаются",
        args: [
          [
            2,
            3,
            7,
            4,
            6,
            1,
            5,
            8,
            9,
          ],
        ],
        expected: [
          2,
          1,
          3,
          4,
          6,
          5,
          7,
          8,
          9,
        ],
      },
      {
        name: "Нечётные уже отсортированы",
        args: [
          [
            1,
            2,
            3,
          ],
        ],
        expected: [
          1,
          2,
          3,
        ],
      },
      {
        name: "Только чётные",
        args: [
          [
            4,
            2,
          ],
        ],
        expected: [
          4,
          2,
        ],
      },
      {
        name: "Только нечётные",
        args: [
          [
            5,
            1,
            3,
          ],
        ],
        expected: [
          1,
          3,
          5,
        ],
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Разделение массива по значению (Split Array by Value)",
    difficulty: 2,
    categories: [
      "Sorting",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "splitByValue",
    description: {
      condition: "Напишите функцию `splitByValue`, которая принимает число `k` и массив `elements`. Функция должна вернуть новый массив, состоящий из тех же элементов, что и исходный, но отсортированный таким образом, чтобы в начале шли элементы, которые меньше числа `k`. Относительный порядок элементов внутри каждой группы (меньше k и остальные) должен сохраняться.\n\nПравила:\n\nЭлементы, меньшие `k`, перемещаются в начало массива\n\nЭлементы, большие или равные `k`, остаются в конце\n\nОтносительный порядок элементов внутри каждой группы сохраняется\n\nИсходный массив не должен изменяться",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 0 ≤ N ≤ 1000",
        "Элементы: целые числа",
        "Время выполнения: O(N)",
        "Память: O(N)",
      ],
      example: "splitByValue(5, [1, 3, 5, 7, 6, 4, 2])\n// -> [1, 3, 4, 2, 5, 7, 6]\n// Пояснение: меньше 5: [1, 3, 4, 2] (в том же порядке),\n//            остальные: [5, 7, 6] (в том же порядке)\n\nsplitByValue(0, [5, 2, 7, 3, 2])\n// -> [5, 2, 7, 3, 2]\n// Пояснение: нет элементов меньше 0, массив не меняется\n\nsplitByValue(10, [1, 2, 3, 4, 5])\n// -> [1, 2, 3, 4, 5]\n// Пояснение: все элементы меньше 10, порядок сохраняется\n\nsplitByValue(3, [3, 2, 1, 3, 4, 5])\n// -> [2, 1, 3, 3, 4, 5]\n// Пояснение: меньше 3: [2, 1], остальные: [3, 3, 4, 5]",
    },
    starterCode: "function splitByValue(k, elements) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "k = 5",
        args: [
          5,
          [
            1,
            3,
            5,
            7,
            6,
            4,
            2,
          ],
        ],
        expected: [
          1,
          3,
          4,
          2,
          5,
          7,
          6,
        ],
      },
      {
        name: "Нет элементов меньше k",
        args: [
          0,
          [
            5,
            2,
            7,
            3,
            2,
          ],
        ],
        expected: [
          5,
          2,
          7,
          3,
          2,
        ],
      },
      {
        name: "Все элементы меньше k",
        args: [
          10,
          [
            1,
            2,
            3,
            4,
            5,
          ],
        ],
        expected: [
          1,
          2,
          3,
          4,
          5,
        ],
      },
      {
        name: "Пустой массив",
        args: [
          3,
          [],
        ],
        expected: [],
        hidden: true,
      },
      {
        name: "Элемент равен k остаётся во второй группе",
        args: [
          3,
          [
            3,
            1,
          ],
        ],
        expected: [
          1,
          3,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Квадраты чисел (Squares Array)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getSquares",
    description: {
      condition: "Дано целое число `n`.\n\nНужно вернуть массив квадратов чисел от `0` до `n - 1`.",
      input: [
        "`n` — целое число.",
      ],
      output: "Массив целых чисел.",
      constraints: [
        "1 <= n <= 10000",
      ],
      example: "Вход: n = 5\nВыход: [0, 1, 4, 9, 16]",
    },
    starterCode: "function getSquares(n) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "n = 5",
        args: [
          5,
        ],
        expected: [
          0,
          1,
          4,
          9,
          16,
        ],
      },
      {
        name: "n = 1",
        args: [
          1,
        ],
        expected: [
          0,
        ],
      },
      {
        name: "n = 0",
        args: [
          0,
        ],
        expected: [],
      },
      {
        name: "n = 3",
        args: [
          3,
        ],
        expected: [
          0,
          1,
          4,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Очистка строки с backspace (String Cleaner with Backspace)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "cleanString",
    description: {
      condition: "В функцию передается строка, которая может содержать буквы, цифры и специальный символ '#'.\nСимвол '#' означает нажатие клавиши backspace (удаление предыдущего символа).\nНеобходимо обработать строку и вернуть результат после применения всех backspace.\n\nПравила обработки:\n\nЕсли встречается '#', он удаляет один предыдущий символ (если он есть)\n\nНесколько '#' подряд удаляют соответствующее количество предыдущих символов\n\nЕсли '#' стоит в начале строки, он ничего не удаляет (нечего удалять)\n\nРегистр символов сохраняется",
      input: [],
      output: "",
      constraints: [
        "Длина строки: 0 ≤ length ≤ 1000",
        "Строка содержит только латинские буквы, цифры и символ '#'",
        "Символ '#' не может появляться более 100 раз подряд",
      ],
      example: "cleanString(\"Hello###world\") → \"Heworld\"\ncleanString(\"abc#d##c\") → \"ac\"\ncleanString(\"abc##d\") → \"ad\"\ncleanString(\"###\") → \"\"\ncleanString(\"a#bc#d\") → \"bd\"",
    },
    starterCode: "function cleanString(s) {\n    // TODO: напишите решение здесь\n    return \"\";\n}\n",
    tests: [
      {
        name: "Три backspace подряд",
        args: [
          "Hello###world",
        ],
        expected: "Heworld",
      },
      {
        name: "Смешанные удаления",
        args: [
          "abc#d##c",
        ],
        expected: "ac",
      },
      {
        name: "Два backspace",
        args: [
          "abc##d",
        ],
        expected: "ad",
      },
      {
        name: "Только backspace",
        args: [
          "###",
        ],
        expected: "",
        hidden: true,
      },
      {
        name: "Удаление в середине",
        args: [
          "a#bc#d",
        ],
        expected: "bd",
        hidden: true,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: "",
        hidden: true,
      },
    ],
  },
  {
    title: "Объединение строк с чередованием (String Sandwich)",
    difficulty: 1,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "stringSandwich",
    description: {
      condition: "Напишите функцию `stringSandwich`, которая принимает две строки и возвращает новую строку: сначала более короткая строка, затем более длинная, затем снова короткая.\n\nЕсли строки одинаковой длины, порядок берётся как есть: `a + b + a`.",
      input: [
        "`a` — первая строка",
        "`b` — вторая строка",
      ],
      output: "Строка вида «короткая + длинная + короткая»",
      constraints: [
        "Строки могут быть пустыми",
        "Результат не зависит от порядка аргументов",
      ],
      example: "Вход: \"1\", \"22\"      → Выход: \"1221\"\nВход: \"22\", \"1\"      → Выход: \"1221\"\nВход: \"abc\", \"def\"   → Выход: \"abcdefabc\"\nВход: \"\", \"hello\"    → Выход: \"hello\"",
    },
    starterCode: "function stringSandwich(a, b) {\n    // TODO: напишите решение здесь\n    return \"\";\n}\n",
    tests: [
      {
        name: "Короткая первая",
        args: [
          "1",
          "22",
        ],
        expected: "1221",
      },
      {
        name: "Короткая вторая",
        args: [
          "22",
          "1",
        ],
        expected: "1221",
      },
      {
        name: "Равные длины",
        args: [
          "abc",
          "def",
        ],
        expected: "abcdefabc",
      },
      {
        name: "Пустая строка считается короткой",
        args: [
          "",
          "hello",
        ],
        expected: "hello",
        hidden: true,
      },
      {
        name: "Обе пустые",
        args: [
          "",
          "",
        ],
        expected: "",
        hidden: true,
      },
    ],
  },
  {
    title: "Строки с преобладанием гласных (Strings With More Vowels Than Consonants)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "countVowelDominantStrings",
    description: {
      condition: "Дан массив строк, состоящих из строчных латинских букв. Требуется посчитать количество строк, в которых число гласных букв (a, e, i, o, u) строго больше числа согласных букв.",
      input: [
        "Массив строк `words`, каждая строка состоит только из строчных латинских букв.",
      ],
      output: "Целое число — количество строк, где гласных больше, чем согласных.",
      constraints: [
        "`0 <= words.length <= 10^4`",
        "`0 <= words[i].length <= 100`",
        "строки состоят только из строчных латинских букв (`a-z`)",
        "буква `y` считается согласной",
      ],
      example: "Вход: [\"aei\", \"bcd\", \"aab\", \"xyz\"]\nВыход: 2   (\"aei\" — 3 гласных/0 согласных; \"aab\" — 2 гласных/1 согласная; \"bcd\" и \"xyz\" — гласных нет)\n\nВход: []\nВыход: 0\n\nВход: [\"a\"]\nВыход: 1",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction countVowelDominantStrings(words) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Четыре строки",
        args: [
          [
            "aei",
            "bcd",
            "aab",
            "xyz",
          ],
        ],
        expected: 2,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
      },
      {
        name: "Одна гласная",
        args: [
          [
            "a",
          ],
        ],
        expected: 1,
      },
      {
        name: "Поровну гласных и согласных — не считается",
        args: [
          [
            "ab",
          ],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Пустая строка",
        args: [
          [
            "",
          ],
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Подмассив с заданной суммой (Subarray with Target Sum)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "subarrayWithTargetSum",
    description: {
      condition: "Дан массив целых неотрицательных чисел и число `target`. Найдите непрерывный подмассив (последовательно идущие элементы), сумма которых равна `target`. Гарантируется, что такой подмассив существует ровно один. Верните этот подмассив.",
      input: [
        "`nums` — массив целых неотрицательных чисел (длина от 1 до 10^5)",
        "`target` — целое положительное число",
      ],
      output: "Массив чисел — непрерывный подмассив, сумма элементов которого равна `target`",
      constraints: [
        "Все числа неотрицательные",
        "Подходящий подмассив существует ровно один",
      ],
      example: "Вход: nums = [1, 6, 3, 10, 4, 5], target = 19\nВыход: [6, 3, 10]  // 6 + 3 + 10 = 19\n\nВход: nums = [5, 4, 1, 3, 2], target = 6\nВыход: [1, 3, 2]  // 1 + 3 + 2 = 6",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction subarrayWithTargetSum(nums, target) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Подмассив в середине",
        args: [
          [
            1,
            6,
            3,
            10,
            4,
            5,
          ],
          19,
        ],
        expected: [
          6,
          3,
          10,
        ],
      },
      {
        name: "Хвост массива",
        args: [
          [
            5,
            4,
            1,
            3,
            2,
          ],
          6,
        ],
        expected: [
          1,
          3,
          2,
        ],
      },
      {
        name: "Один элемент",
        args: [
          [
            7,
          ],
          7,
        ],
        expected: [
          7,
        ],
      },
      {
        name: "Подмассив с начала",
        args: [
          [
            2,
            3,
            9,
          ],
          5,
        ],
        expected: [
          2,
          3,
        ],
        hidden: true,
      },
      {
        name: "Подмассив длиннее двух элементов",
        args: [
          [
            9,
            1,
            2,
            3,
            9,
          ],
          6,
        ],
        expected: [
          1,
          2,
          3,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма массива с конвертацией строк в числа (Sum Array With String Conversion)",
    difficulty: 2,
    categories: [
      "Arrays",
      "Parsing",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumArrayWithStringConversion",
    description: {
      condition: "Дан массив, элементами которого могут быть числа или строки. Нужно написать функцию, которая возвращает сумму всех элементов массива, предварительно конвертируя строковые элементы в числа.\n\nЕсли строка представляет собой корректное число (включая отрицательные и дробные, с необязательными пробелами по краям) — она конвертируется и учитывается в сумме. Если строка не может быть корректно преобразована в число (содержит нечисловые символы, пустая строка и т.п.) — такой элемент игнорируется (не добавляется в сумму, не прерывает выполнение).",
      input: [
        "`arr` — массив, элементами которого являются числа (`number`) или строки (`string`)",
      ],
      output: "Число — сумма всех элементов после конвертации, с учётом правил выше",
      constraints: [
        "`0 <= arr.length <= 10^4`",
        "Числовые значения: `-10^6 <= value <= 10^6`",
        "Строки могут содержать пробелы, буквы, спецсимволы",
      ],
      example: "Вход: [1, \"2\", \"3abc\", 4]\nВыход: 7   // 1 + 2 + 4 (3abc игнорируется)\n\nВход: [\"10\", \"20\", \"30\"]\nВыход: 60\n\nВход: [1, \"abc\", \"  5  \", -2]\nВыход: 4   // 1 + 5 - 2\n\nВход: []\nВыход: 0",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction sumArrayWithStringConversion(arr) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Строка с мусором игнорируется",
        args: [
          [
            1,
            "2",
            "3abc",
            4,
          ],
        ],
        expected: 7,
      },
      {
        name: "Только строки-числа",
        args: [
          [
            "10",
            "20",
            "30",
          ],
        ],
        expected: 60,
      },
      {
        name: "Пробелы по краям",
        args: [
          [
            1,
            "abc",
            "  5  ",
            -2,
          ],
        ],
        expected: 4,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Пустая строка игнорируется",
        args: [
          [
            "",
            3,
          ],
        ],
        expected: 3,
        hidden: true,
      },
      {
        name: "Дробные строки",
        args: [
          [
            "1.5",
            0.5,
          ],
        ],
        expected: 2,
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма значений дерева (Sum Binary Tree Values)",
    difficulty: 2,
    categories: [
      "Trees",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumTree",
    description: {
      condition: "Дано бинарное дерево, где каждый узел содержит числовое значение `value`, а также может иметь левого потомка `left` и правого потомка `right`.\n\nНеобходимо написать функцию, которая возвращает сумму всех чисел во всех узлах дерева.\n\nЕсли дерево пустое, нужно вернуть `0`.",
      input: [
        "На вход подаётся корень бинарного дерева.",
      ],
      output: "Нужно вернуть число — сумму всех значений в дереве.",
      constraints: [
        "`0 <= количество узлов <= 10^4`",
        "`-10^9 <= value <= 10^9`",
        "У каждого узла может быть максимум два потомка: `left` и `right`",
      ],
      example: "Вход:\n\n{\n  value: 5,\n  left: {\n    value: 10\n  },\n  right: {\n    value: 21\n  }\n}\n\nВыход:\n\n36",
    },
    starterCode: "function sumTree(tree) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "Корень и два потомка",
        args: [
          {
            value: 5,
            left: {
              value: 10,
            },
            right: {
              value: 21,
            },
          },
        ],
        expected: 36,
      },
      {
        name: "Пустое дерево",
        args: [
          null,
        ],
        expected: 0,
      },
      {
        name: "Только корень",
        args: [
          {
            value: 7,
          },
        ],
        expected: 7,
      },
      {
        name: "Глубокое дерево",
        args: [
          {
            value: 1,
            left: {
              value: 2,
              left: {
                value: 3,
              },
            },
            right: {
              value: 4,
              right: {
                value: 5,
              },
            },
          },
        ],
        expected: 15,
        hidden: true,
      },
      {
        name: "Отрицательные значения",
        args: [
          {
            value: -1,
            left: {
              value: -2,
            },
          },
        ],
        expected: -3,
        hidden: true,
      },
    ],
  },
  {
    title: "Подсчет суммы возрастов (Sum of Ages)",
    difficulty: 2,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumAges",
    description: {
      condition: "Напишите функцию `sumAges`, которая принимает объект (словарь), описывающий человека и его детей. Функция должна вернуть сумму возрастов этого человека и всех его потомков (детей, внуков и т.д.).\n\nКаждый человек имеет следующую структуру:\n\n`name` (строка) — имя человека\n\n`age` (число) — возраст человека\n\n`children` (массив) — список детей (может быть пустым)",
      input: [],
      output: "",
      constraints: [
        "Глубина вложенности может быть любой",
        "Массив детей может быть пустым",
        "Возраст — положительное целое число",
        "Имена могут быть на любом языке (для тестов используем латиницу)",
      ],
      example: "const user = {\n  name: 'Петр',\n  age: 49,\n  children: [\n    {\n      name: 'Нина',\n      age: 25,\n      children: [\n        { name: 'Андрей', age: 3, children: [] },\n        { name: 'Олег', age: 1, children: [] }\n      ]\n    },\n    {\n      name: 'Александр',\n      age: 22,\n      children: []\n    }\n  ]\n};\n\nsumAges(user); // 49 + 25 + 3 + 1 + 22 = 100",
    },
    starterCode: "function sumAges(person) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "Три поколения",
        args: [
          {
            name: "Петр",
            age: 49,
            children: [
              {
                name: "Нина",
                age: 25,
                children: [
                  {
                    name: "Андрей",
                    age: 3,
                    children: [],
                  },
                  {
                    name: "Олег",
                    age: 1,
                    children: [],
                  },
                ],
              },
              {
                name: "Александр",
                age: 22,
                children: [],
              },
            ],
          },
        ],
        expected: 100,
      },
      {
        name: "Без детей",
        args: [
          {
            name: "A",
            age: 30,
            children: [],
          },
        ],
        expected: 30,
      },
      {
        name: "Один ребёнок",
        args: [
          {
            name: "A",
            age: 30,
            children: [
              {
                name: "B",
                age: 5,
                children: [],
              },
            ],
          },
        ],
        expected: 35,
      },
      {
        name: "Четыре поколения",
        args: [
          {
            name: "A",
            age: 1,
            children: [
              {
                name: "B",
                age: 2,
                children: [
                  {
                    name: "C",
                    age: 3,
                    children: [
                      {
                        name: "D",
                        age: 4,
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        expected: 10,
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма цифр числа (Sum of Digits)",
    difficulty: 1,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumDigits",
    description: {
      condition: "Напишите функцию `sumDigits`, которая принимает целое число и возвращает сумму всех его цифр. Число может быть как положительным, так и отрицательным. Для отрицательных чисел сумма считается по модулю (знак минуса игнорируется).",
      input: [],
      output: "",
      constraints: [
        "Число может быть любым целым числом в диапазоне от -10^9 до 10^9",
        "Для отрицательных чисел суммируются цифры абсолютного значения",
        "Функция должна работать с числом, а не со строкой (можно преобразовывать внутри)",
      ],
      example: "Вход: 123\nВыход: 6\nПояснение: 1 + 2 + 3 = 6\n\nВход: 904\nВыход: 13\nПояснение: 9 + 0 + 4 = 13\n\nВход: -506\nВыход: 11\nПояснение: | -506 | = 506 → 5 + 0 + 6 = 11\n\nВход: 0\nВыход: 0",
    },
    starterCode: "function sumDigits(n) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "123",
        args: [
          123,
        ],
        expected: 6,
      },
      {
        name: "904",
        args: [
          904,
        ],
        expected: 13,
      },
      {
        name: "Отрицательное число",
        args: [
          -506,
        ],
        expected: 11,
      },
      {
        name: "Ноль",
        args: [
          0,
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Одна цифра",
        args: [
          7,
        ],
        expected: 7,
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма положительных нечетных чисел (Sum of Positive Odd Numbers)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumPositiveOdd",
    description: {
      condition: "Напишите функцию `sumPositiveOdd`, которая принимает массив целых чисел и возвращает сумму всех нечетных чисел, которые больше нуля.",
      input: [],
      output: "",
      constraints: [
        "Массив может содержать целые числа (положительные, отрицательные, ноль)",
        "Массив может быть пустым (тогда сумма равна 0)",
        "Нечетными считаются числа, которые не делятся на 2 нацело",
        "Положительными считаются числа больше 0",
      ],
      example: "Вход: [5, 0, -5, 20, 88, 17, -32]\nВыход: 22\nПояснение: 5 + 17 = 22\n\nВход: [1, 3, 5, 7]\nВыход: 16\nПояснение: 1 + 3 + 5 + 7 = 16\n\nВход: [2, 4, 6, 8]\nВыход: 0\nПояснение: Нет нечетных чисел\n\nВход: [-1, -3, -5]\nВыход: 0\nПояснение: Нет положительных чисел",
    },
    starterCode: "function sumPositiveOdd(arr) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "Смешанный массив",
        args: [
          [
            5,
            0,
            -5,
            20,
            88,
            17,
            -32,
          ],
        ],
        expected: 22,
      },
      {
        name: "Только нечётные положительные",
        args: [
          [
            1,
            3,
            5,
            7,
          ],
        ],
        expected: 16,
      },
      {
        name: "Только чётные",
        args: [
          [
            2,
            4,
            6,
            8,
          ],
        ],
        expected: 0,
      },
      {
        name: "Только отрицательные нечётные",
        args: [
          [
            -1,
            -3,
            -5,
          ],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма промисов (Sum of Promises)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumPromises",
    description: {
      condition: "Реализуйте функцию `sumPromises(...promises)`, которая принимает произвольное количество промисов и возвращает новый промис, резолвящийся суммой их результатов.\n\nЕсли хотя бы один промис отклоняется, результирующий промис отклоняется с той же ошибкой. Без аргументов сумма равна `0`.",
      input: [
        "Произвольное количество промисов, каждый резолвится числом",
      ],
      output: "Промис, резолвящийся числом — суммой всех результатов",
      constraints: [
        "Промисы выполняются параллельно",
        "Без аргументов результат — `0`",
      ],
      example: "await sumPromises(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3));\n// -> 6\n\nawait sumPromises();\n// -> 0",
    },
    starterCode: "function sumPromises(...promises) {\n    // TODO: напишите решение здесь\n}\n",
    tests: [
      {
        name: "Три промиса",
        body: "return await solution(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3));",
        expected: 6,
      },
      {
        name: "Без аргументов",
        body: "return await solution();",
        expected: 0,
      },
      {
        name: "Разные задержки",
        body: "const later = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));\nreturn await solution(later(5, 20), later(10, 1));",
        expected: 15,
      },
      {
        name: "Реджект пробрасывается",
        body: "try {\n  await solution(Promise.resolve(1), Promise.reject(\"boom\"));\n  return \"resolved\";\n} catch (e) {\n  return e;\n}",
        expected: "boom",
        hidden: true,
      },
      {
        name: "Отрицательные числа",
        body: "return await solution(Promise.resolve(-5), Promise.resolve(5));",
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма квадратов через кастомный reduce (Sum of Squares via Custom Reduce)",
    difficulty: 2,
    categories: [
      "Arrays",
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumSquares",
    description: {
      condition: "Дана вспомогательная функция `myReduce(array, callback, initial)`, которая работает аналогично встроенному методу `Array.prototype.reduce`: последовательно применяет `callback(accumulator, element, index)` к каждому элементу массива, начиная с `initial`, и возвращает итоговое значение аккумулятора.\n\nНапишите функцию `sumSquares(array)`, которая возвращает сумму квадратов всех чисел массива, используя для вычисления только `myReduce` (без использования встроенного `reduce`, циклов `for`/`while` внутри `sumSquares` и без изменения самой `myReduce`).",
      input: [
        "`array` — массив целых чисел.",
      ],
      output: "Число — сумма квадратов элементов массива.",
      constraints: [
        "`0 <= array.length <= 10^4`",
        "`-10^4 <= array[i] <= 10^4`",
        "Внутри `sumSquares` нельзя использовать `for`/`while` и встроенный `reduce` — только вызов `myReduce`",
      ],
      example: "Вход: [1, 2, 3]\nВыход: 14   (1² + 2² + 3² = 1 + 4 + 9)\n\nВход: []\nВыход: 0\n\nВход: [-2, 0, 5]\nВыход: 29   (4 + 0 + 25)",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction myReduce(array, callback, initial) {\n  let acc = initial;\n  for (let i = 0; i < array.length; i++) {\n    acc = callback(acc, array[i], i);\n  }\n  return acc;\n}\n\nfunction sumSquares(array) {\n  // TODO: напишите решение здесь\n  return 0;\n}\n",
    tests: [
      {
        name: "[1, 2, 3]",
        args: [
          [
            1,
            2,
            3,
          ],
        ],
        expected: 14,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
      },
      {
        name: "Отрицательные числа и ноль",
        args: [
          [
            -2,
            0,
            5,
          ],
        ],
        expected: 29,
      },
      {
        name: "Один элемент",
        args: [
          [
            4,
          ],
        ],
        expected: 16,
        hidden: true,
      },
      {
        name: "Все нули",
        args: [
          [
            0,
            0,
          ],
        ],
        expected: 0,
        hidden: true,
      },
    ],
  },
  {
    title: "Сумма уникальных элементов (Sum of Unique Elements)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sumUniq",
    description: {
      condition: "Напишите функцию `sumUniq`, которая принимает массив чисел и возвращает сумму только уникальных элементов — то есть элементов, которые встречаются в массиве ровно один раз.",
      input: [],
      output: "",
      constraints: [
        "Массив может содержать целые числа (положительные и отрицательные)",
        "Массив может быть пустым (тогда сумма равна 0)",
        "Длина массива не превышает 1000 элементов",
      ],
      example: "Вход: [1, 2, 3, 2, 2]\nВыход: 4 (1 + 3)\n\nВход: [1, 1, 2, 2, 3, 3]\nВыход: 0 (нет уникальных элементов)\n\nВход: [5, 7, 5, 9, 7, 11]\nВыход: 20 (9 + 11)\n\nВход: []\nВыход: 0",
    },
    starterCode: "function sumUniq(arr) {\n    // TODO: write your solution here\n    return 0;\n}\n",
    tests: [
      {
        name: "[1, 2, 3, 2, 2]",
        args: [
          [
            1,
            2,
            3,
            2,
            2,
          ],
        ],
        expected: 4,
      },
      {
        name: "Уникальных нет",
        args: [
          [
            1,
            1,
            2,
            2,
            3,
            3,
          ],
        ],
        expected: 0,
      },
      {
        name: "[5, 7, 5, 9, 7, 11]",
        args: [
          [
            5,
            7,
            5,
            9,
            7,
            11,
          ],
        ],
        expected: 20,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: 0,
        hidden: true,
      },
      {
        name: "Все элементы уникальны",
        args: [
          [
            1,
            2,
            3,
          ],
        ],
        expected: 6,
        hidden: true,
      },
    ],
  },
  {
    title: "Обмен соседних узлов связанного списка (Swap Nodes in Pairs)",
    difficulty: 3,
    categories: [
      "Linked lists",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "swapPairs",
    description: {
      condition: "Дан односвязный список. Требуется поменять местами каждую пару соседних узлов и вернуть голову изменённого списка.\n\nИзменять разрешается только связи между узлами (порядок узлов), но не значения, хранящиеся в узлах — перестановка должна выполняться перестановкой самих узлов, а не копированием значений.",
      input: [
        "односвязный список (последовательность числовых значений, представляющих узлы).",
      ],
      output: "односвязный список после попарной перестановки соседних узлов.",
      constraints: [
        "число узлов от 0 до 100; значения узлов — целые числа в диапазоне от -1000 до 1000.",
      ],
      example: "Вход: [1,2,3,4]\nВыход: [2,1,4,3]\n\nВход: []\nВыход: []\n\nВход: [1]\nВыход: [1]\n\nВход: [1,2,3]\nВыход: [2,1,3]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n// Узел списка: { value: number, next: Item | null }\n\nfunction swapPairs(head) {\n  // TODO: напишите решение здесь\n  return head;\n}\n",
    tests: [
      {
        name: "Чётное количество узлов",
        body: "const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);\nconst toArray = (node) => { const out = []; while (node) { out.push(node.value); node = node.next; } return out; };\nreturn toArray(solution(build([1, 2, 3, 4])));",
        expected: [
          2,
          1,
          4,
          3,
        ],
      },
      {
        name: "Пустой список",
        body: "return solution(null);",
        expected: null,
      },
      {
        name: "Один узел",
        body: "const toArray = (node) => { const out = []; while (node) { out.push(node.value); node = node.next; } return out; };\nreturn toArray(solution({ value: 1, next: null }));",
        expected: [
          1,
        ],
      },
      {
        name: "Нечётное количество узлов",
        body: "const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);\nconst toArray = (node) => { const out = []; while (node) { out.push(node.value); node = node.next; } return out; };\nreturn toArray(solution(build([1, 2, 3])));",
        expected: [
          2,
          1,
          3,
        ],
        hidden: true,
      },
      {
        name: "Переставляются узлы, а не значения",
        body: "const third = { value: 3, next: null };\nconst second = { value: 2, next: third };\nconst first = { value: 1, next: second };\nconst head = solution(first);\nreturn [head === second, head.next === first, first.value, second.value];",
        expected: [
          true,
          true,
          1,
          2,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Менеджер задач (Task Manager)",
    difficulty: 2,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "taskManager",
    description: {
      condition: "Напишите функцию `taskManager`, которая создаёт и возвращает объект (или структуру) с тремя методами для управления внутренним списком задач:\n\n`addTask(task)` — добавляет задачу в список\n\n`removeTask(task)` — удаляет задачу из списка (если задача встречается несколько раз, удаляется только первое вхождение)\n\n`getTasks()` — возвращает текущий список задач\n\nВнутренний список задач должен быть доступен только через эти методы (инкапсуляция).",
      input: [],
      output: "",
      constraints: [
        "Задачи — это строки",
        "При удалении несуществующей задачи ничего не происходит",
        "Список задач должен быть изолирован от внешнего доступа",
      ],
      example: "const manager = taskManager();\nmanager.addTask('Learn JavaScript');\nmanager.addTask('Practice coding');\nmanager.removeTask('Learn JavaScript');\nconsole.log(manager.getTasks()); // ['Practice coding']",
    },
    starterCode: "function taskManager() {\n    // TODO: write your solution here\n    return {\n        addTask: function(task) {},\n        removeTask: function(task) {},\n        getTasks: function() { return []; }\n    };\n}\n",
    tests: [
      {
        name: "Добавление и удаление",
        body: "const m = solution();\nm.addTask(\"Learn JavaScript\");\nm.addTask(\"Practice coding\");\nm.removeTask(\"Learn JavaScript\");\nreturn m.getTasks();",
        expected: [
          "Practice coding",
        ],
      },
      {
        name: "Пустой список в начале",
        body: "return solution().getTasks();",
        expected: [],
      },
      {
        name: "Удаляется только первое вхождение",
        body: "const m = solution();\nm.addTask(\"a\"); m.addTask(\"a\"); m.addTask(\"b\");\nm.removeTask(\"a\");\nreturn m.getTasks();",
        expected: [
          "a",
          "b",
        ],
      },
      {
        name: "Удаление несуществующей задачи",
        body: "const m = solution();\nm.addTask(\"a\");\nm.removeTask(\"zzz\");\nreturn m.getTasks();",
        expected: [
          "a",
        ],
        hidden: true,
      },
      {
        name: "Менеджеры независимы",
        body: "const a = solution();\nconst b = solution();\na.addTask(\"x\");\nreturn [a.getTasks(), b.getTasks()];",
        expected: [
          [
            "x",
          ],
          [],
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Ограничение времени выполнения функции (Time Limit)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "timeLimit",
    description: {
      condition: "Реализуйте функцию `timeLimit(fn, t)`, которая принимает асинхронную функцию `fn` и число `t` (миллисекунды). Функция возвращает обёртку — новую асинхронную функцию с той же сигнатурой. При вызове обёртки, если `fn` завершается в течение `t` миллисекунд — возвращается её результат. Если `fn` не успевает за `t` миллисекунд — промис отклоняется с ошибкой `\"Time Limit Exceeded\"`.",
      input: [
        "`fn` — асинхронная функция, принимающая произвольные аргументы и возвращающая Promise",
        "`t` — число миллисекунд (положительное целое)",
      ],
      output: "Новая функция-обёртка, которая при вызове возвращает Promise: либо с результатом `fn`, либо отклонённый со строкой `\"Time Limit Exceeded\"`.",
      constraints: [
        "`1 <= t <= 5000`",
        "`fn` всегда возвращает Promise",
        "Аргументы обёртки передаются в `fn` без изменений",
      ],
      example: "Вход: `fn = async (n) => n * 2`, `t = 100`, вызов с аргументом `5`\nВыход: `10` (успел)\n\nВход: `fn = () => new Promise(resolve => setTimeout(resolve, 200))`, `t = 100`, вызов без аргументов\nВыход: rejected `\"Time Limit Exceeded\"`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\n/**\n * @param {Function} fn\n * @param {number} t\n * @returns {Function}\n */\nfunction timeLimit(fn, t) {\n  // TODO: напишите решение здесь\n  return function() {};\n}\n",
    tests: [
      {
        name: "Успевает в лимит",
        body: "const fn = async (n) => n * 2;\nreturn await solution(fn, 100)(5);",
        expected: 10,
      },
      {
        name: "Не успевает — Time Limit Exceeded",
        body: "const fn = () => new Promise((r) => setTimeout(r, 200));\ntry {\n  await solution(fn, 30)();\n  return \"resolved\";\n} catch (e) {\n  return e;\n}",
        expected: "Time Limit Exceeded",
      },
      {
        name: "Аргументы передаются в fn",
        body: "const fn = async (a, b) => a + b;\nreturn await solution(fn, 100)(2, 3);",
        expected: 5,
        hidden: true,
      },
      {
        name: "Отказ раньше лимита пробрасывается как есть",
        body: "const fn = async () => { throw \"own error\"; };\ntry {\n  await solution(fn, 100)();\n  return \"resolved\";\n} catch (e) {\n  return e;\n}",
        expected: "own error",
        hidden: true,
      },
    ],
  },
  {
    title: "Таймер с замыканием (Timer with Closure)",
    difficulty: 2,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "createTimer",
    description: {
      condition: "Напишите функцию `createTimer`, которая возвращает новую функцию. При каждом вызове возвращённая функция должна возвращать количество целых секунд, прошедших с момента создания таймера (момента вызова `createTimer`).\n\nИспользуйте `Date.now()` для получения текущего времени в миллисекундах. Результат должен быть округлён вниз до целого числа секунд.",
      input: [],
      output: "",
      constraints: [
        "Используйте `Date.now()` для получения текущего времени",
        "Результат должен быть целым числом (округление вниз)",
        "Таймер должен работать для любого количества вызовов",
        "Функция должна использовать замыкание для сохранения времени старта",
      ],
      example: "const timer = createTimer();\n\n// Через 1.5 секунды\nsetTimeout(() => {\n  console.log(timer()); // 1 (прошла 1 полная секунда)\n}, 1500);\n\n// Через 3.2 секунды\nsetTimeout(() => {\n  console.log(timer()); // 3 (прошло 3 полных секунды)\n}, 3200);\n\n// Ещё через 0.8 секунды\nsetTimeout(() => {\n  console.log(timer()); // 4 (прошло 4 полных секунды)\n}, 4000);",
    },
    starterCode: "function createTimer() {\n    // TODO: write your solution here\n}\n",
    tests: [
      {
        name: "Через 1.5 секунды — 1",
        body: "const realNow = Date.now;\nlet now = 1000000;\nDate.now = () => now;\nconst timer = solution();\nnow += 1500;\nconst value = timer();\nDate.now = realNow;\nreturn value;",
        expected: 1,
      },
      {
        name: "Сразу после создания — 0",
        body: "const realNow = Date.now;\nlet now = 5000;\nDate.now = () => now;\nconst timer = solution();\nconst value = timer();\nDate.now = realNow;\nreturn value;",
        expected: 0,
      },
      {
        name: "Накопление времени",
        body: "const realNow = Date.now;\nlet now = 0;\nDate.now = () => now;\nconst timer = solution();\nnow = 3200;\nconst a = timer();\nnow = 4000;\nconst b = timer();\nDate.now = realNow;\nreturn [a, b];",
        expected: [
          3,
          4,
        ],
        hidden: true,
      },
      {
        name: "Таймеры независимы",
        body: "const realNow = Date.now;\nlet now = 0;\nDate.now = () => now;\nconst first = solution();\nnow = 2000;\nconst second = solution();\nnow = 5000;\nconst value = [first(), second()];\nDate.now = realNow;\nreturn value;",
        expected: [
          5,
          3,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Переводы с логированием (Translation with Logging)",
    difficulty: 1,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "translations",
    description: {
      condition: "У нас есть объект (словарь) с переводами, которые используются на сайте. Напишите функцию `getTranslationSafe`, которая принимает язык и ключ, и возвращает перевод. Если для указанного языка и ключа перевод отсутствует, функция должна вернуть строку `\"[MISSING]\"`.\n\nСтруктура переводов:",
      input: [],
      output: "",
      constraints: [
        "Функция должна использовать глобальный объект `translations`",
        "При отсутствии перевода возвращается строка `\"[MISSING]\"`",
        "Никакого логирования в консоль не требуется",
      ],
      example: "const translations = {\n  en: {\n    hello: \"Hello\",\n    welcome: \"Welcome\"\n  },\n  ru: {\n    hello: \"Привет\",\n    welcome: \"Добро пожаловать\"\n  }\n};\n\nВход: ('en', 'hello')\nВыход: \"Hello\"\n\nВход: ('ru', 'welcome')\nВыход: \"Добро пожаловать\"\n\nВход: ('en', 'goodbye')\nВыход: \"[MISSING]\"\n\nВход: ('fr', 'hello')\nВыход: \"[MISSING]\"",
    },
    starterCode: "const translations = {\n  en: {\n    hello: \"Hello\",\n    welcome: \"Welcome\"\n  },\n  ru: {\n    hello: \"Privet\",\n    welcome: \"Dobro pozhalovat\"\n  }\n};\n\nfunction getTranslationSafe(lang, key) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Существующий перевод",
        args: [
          "en",
          "hello",
        ],
        expected: "Hello",
      },
      {
        name: "Русская локаль",
        args: [
          "ru",
          "welcome",
        ],
        expected: "Dobro pozhalovat",
      },
      {
        name: "Нет ключа",
        args: [
          "en",
          "goodbye",
        ],
        expected: "[MISSING]",
      },
      {
        name: "Нет языка",
        args: [
          "fr",
          "hello",
        ],
        expected: "[MISSING]",
        hidden: true,
      },
      {
        name: "Пустой ключ",
        args: [
          "en",
          "",
        ],
        expected: "[MISSING]",
        hidden: true,
      },
    ],
  },
  {
    title: "Обход объекта и сбор значений (Traverse Object)",
    difficulty: 3,
    categories: [
      "Algorithmics",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "traverseObject",
    description: {
      condition: "Напишите функцию `traverseObject`, которая принимает объект (словарь) произвольной вложенности и возвращает строку, содержащую все значения из объекта, разделённые запятой. Функция должна рекурсивно обходить все вложенные объекты и собирать значения, игнорируя ключи.",
      input: [],
      output: "",
      constraints: [
        "Объект может содержать вложенные объекты любой глубины",
        "Значения могут быть строками, числами, булевыми значениями",
        "Если значение не является объектом, оно добавляется в результат",
        "Если объект пустой, возвращается пустая строка",
      ],
      example: "const obj = {\n  level1: {\n    level2: {\n      level3: \"deep value\",\n      anotherKey: \"another deep value\"\n    },\n    anotherLevel2: {\n      level3: \"value in another object\"\n    }\n  },\n  anotherLevel1: \"top level value\"\n};\n\ntraverseObject(obj);\n// Возвращает: \"deep value, another deep value, value in another object, top level value\"\n\ntraverseObject(obj);\n// Возвращает: \"значение на уровне 3, еще одно значение на уровне 3, значение на уровне 3 в другом объекте, значение на уровне 1\"",
    },
    starterCode: "function traverseObject(obj) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Трёхуровневый объект",
        args: [
          {
            level1: {
              level2: {
                level3: "deep value",
                anotherKey: "another deep value",
              },
              anotherLevel2: {
                level3: "value in another object",
              },
            },
            anotherLevel1: "top level value",
          },
        ],
        expected: "deep value, another deep value, value in another object, top level value",
      },
      {
        name: "Плоский объект",
        args: [
          {
            a: "1",
            b: "2",
          },
        ],
        expected: "1, 2",
      },
      {
        name: "Пустой объект",
        args: [
          {},
        ],
        expected: "",
      },
      {
        name: "Глубокая вложенность",
        args: [
          {
            a: {
              b: {
                c: {
                  d: "x",
                },
              },
            },
          },
        ],
        expected: "x",
        hidden: true,
      },
      {
        name: "Числовые значения",
        args: [
          {
            a: 1,
            b: {
              c: 2,
            },
          },
        ],
        expected: "1, 2",
        hidden: true,
      },
    ],
  },
  {
    title: "Восстановление маршрута (Trip Reconstruction)",
    difficulty: 3,
    categories: [
      "Data structures",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "reconstructTrip",
    description: {
      condition: "Напишите функцию `reconstructTrip`, которая принимает массив билетов, где каждый билет — это объект с полями `from` (откуда) и `to` (куда). Билеты перемешаны в случайном порядке. Функция должна восстановить правильный порядок маршрута, начиная с первого пункта и заканчивая последним.",
      input: [],
      output: "",
      constraints: [
        "Все пункты назначения уникальны (кроме начального и конечного)",
        "Маршрут всегда можно восстановить (нет циклов)",
        "Количество билетов от 1 до 1000",
        "Названия городов — строки",
      ],
      example: "Вход: [\n  {from: 'Спб', to: 'Минск'},\n  {from: 'Киев', to: 'Новосибирск'},\n  {from: 'Череповец', to: 'Москва'},\n  {from: 'Минск', to: 'Киев'},\n  {from: 'Москва', to: 'Спб'}\n]\n\nВыход: [\n  {from: 'Череповец', to: 'Москва'},\n  {from: 'Москва', to: 'Спб'},\n  {from: 'Спб', to: 'Минск'},\n  {from: 'Минск', to: 'Киев'},\n  {from: 'Киев', to: 'Новосибирск'}\n]",
    },
    starterCode: "function reconstructTrip(tickets) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "Маршрут из пяти билетов",
        args: [
          [
            {
              from: "Спб",
              to: "Минск",
            },
            {
              from: "Киев",
              to: "Новосибирск",
            },
            {
              from: "Череповец",
              to: "Москва",
            },
            {
              from: "Минск",
              to: "Киев",
            },
            {
              from: "Москва",
              to: "Спб",
            },
          ],
        ],
        expected: [
          {
            from: "Череповец",
            to: "Москва",
          },
          {
            from: "Москва",
            to: "Спб",
          },
          {
            from: "Спб",
            to: "Минск",
          },
          {
            from: "Минск",
            to: "Киев",
          },
          {
            from: "Киев",
            to: "Новосибирск",
          },
        ],
      },
      {
        name: "Один билет",
        args: [
          [
            {
              from: "A",
              to: "B",
            },
          ],
        ],
        expected: [
          {
            from: "A",
            to: "B",
          },
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Билеты уже по порядку",
        args: [
          [
            {
              from: "A",
              to: "B",
            },
            {
              from: "B",
              to: "C",
            },
          ],
        ],
        expected: [
          {
            from: "A",
            to: "B",
          },
          {
            from: "B",
            to: "C",
          },
        ],
        hidden: true,
      },
      {
        name: "Обратный порядок во входных данных",
        args: [
          [
            {
              from: "B",
              to: "C",
            },
            {
              from: "A",
              to: "B",
            },
          ],
        ],
        expected: [
          {
            from: "A",
            to: "B",
          },
          {
            from: "B",
            to: "C",
          },
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Проверка суммы двух чисел (Two Sum Check)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "hasPairWithSum",
    description: {
      condition: "Напишите функцию `hasPairWithSum`, которая принимает массив целых чисел `arr` и целое число `k`. Функция должна вернуть `true`, если в массиве существует хотя бы одна пара различных элементов, сумма которых равна `k`. Иначе вернуть `false`.",
      input: [],
      output: "",
      constraints: [
        "Массив может содержать целые числа (положительные, отрицательные, ноль)",
        "Массив может быть пустым (тогда возвращается `false`)",
        "Элементы могут повторяться",
        "Нельзя использовать один и тот же элемент дважды",
      ],
      example: "Вход: [10, 15, 3, 7], 17\nВыход: true\nПояснение: 10 + 7 = 17\n\nВход: [10, 15, 3, 7], 20\nВыход: false\nПояснение: Нет пары с суммой 20\n\nВход: [1, 2, 3, 4, 5], 9\nВыход: true\nПояснение: 4 + 5 = 9\n\nВход: [5], 10\nВыход: false\nПояснение: Нужно два разных элемента",
    },
    starterCode: "function hasPairWithSum(arr, k) {\n    // TODO: напишите решение здесь\n    return false;\n}\n",
    tests: [
      {
        name: "Пара есть",
        args: [
          [
            10,
            15,
            3,
            7,
          ],
          17,
        ],
        expected: true,
      },
      {
        name: "Пары нет",
        args: [
          [
            10,
            15,
            3,
            7,
          ],
          20,
        ],
        expected: false,
      },
      {
        name: "Пара в конце",
        args: [
          [
            1,
            2,
            3,
            4,
            5,
          ],
          9,
        ],
        expected: true,
      },
      {
        name: "Один элемент",
        args: [
          [
            5,
          ],
          10,
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          [],
          0,
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Два одинаковых элемента",
        args: [
          [
            4,
            4,
          ],
          8,
        ],
        expected: true,
        hidden: true,
      },
    ],
  },
  {
    title: "Поиск суммы двух индексов (Two Sum Indices)",
    difficulty: 3,
    categories: [
      "Pointers",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "findIndexSum",
    description: {
      condition: "Напишите функцию `findIndexSum`, которая принимает число `val` и отсортированный по возрастанию массив `arr`. Функция должна вернуть сумму двух индексов массива, элементы которых в сумме дают число `val`. Если таких элементов нет, вернуть `-1`.\n\nПравила:\n\nМассив отсортирован по возрастанию\n\nНужно найти два разных элемента (индексы должны быть разными)\n\nВозвращается сумма индексов найденных элементов\n\nЕсли есть несколько пар, можно вернуть любую\n\nЕсли пара не найдена, вернуть `-1`",
      input: [],
      output: "",
      constraints: [
        "Длина массива: 1 ≤ N ≤ 1000",
        "Элементы: целые числа",
        "Массив отсортирован по возрастанию",
        "Время выполнения: O(N)",
        "Память: O(1)",
      ],
      example: "const arr = [2, 5, 8, 9, 22, 57, 94, 100, 127, 198, 345, 451];\n\nfindIndexSum(79, arr)  // -> 9 (индексы 4 и 5: 22 + 57 = 79, 4 + 5 = 9)\nfindIndexSum(70, arr)  // -> -1",
    },
    starterCode: "function findIndexSum(val, arr) {\n    // TODO: write your solution here\n    return -1;\n}\n",
    tests: [
      {
        name: "Пара найдена",
        args: [
          79,
          [
            2,
            5,
            8,
            9,
            22,
            57,
            94,
            100,
            127,
            198,
            345,
            451,
          ],
        ],
        expected: 9,
      },
      {
        name: "Пары нет",
        args: [
          70,
          [
            2,
            5,
            8,
            9,
            22,
            57,
            94,
            100,
            127,
            198,
            345,
            451,
          ],
        ],
        expected: -1,
      },
      {
        name: "Первый и последний элементы",
        args: [
          10,
          [
            1,
            4,
            9,
          ],
        ],
        expected: 2,
      },
      {
        name: "Массив из одного элемента",
        args: [
          5,
          [
            5,
          ],
        ],
        expected: -1,
        hidden: true,
      },
      {
        name: "Пустой массив",
        args: [
          1,
          [],
        ],
        expected: -1,
        hidden: true,
      },
      {
        name: "Соседние элементы",
        args: [
          7,
          [
            1,
            3,
            4,
            100,
          ],
        ],
        expected: 3,
        hidden: true,
      },
    ],
  },
  {
    title: "Стек отмены и повтора действий (Undo/Redo Stack)",
    difficulty: 3,
    categories: [
      "Stack",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "applyHistory",
    description: {
      condition: "Реализуй систему отмены и повтора действий для списка постов. У тебя есть начальный список постов и история операций над ним в виде стека событий. Каждое событие имеет тип (`\"add\"` или `\"remove\"`) и данные — пост (`{ id, title }`).\n\nНапиши функцию `applyHistory(initialPosts, history, index)`, которая по заданному индексу в стеке истории возвращает актуальный список постов. Индекс указывает, сколько событий из истории нужно применить (начиная с первого). При `index === history.length` применяются все события (текущее состояние). При `index === 0` возвращаются только начальные посты.",
      input: [
        "`initialPosts` — массив объектов `{ id: number, title: string }` — исходные посты (с сервера)",
        "`history` — массив событий `{ type: \"add\" | \"remove\", post: { id: number, title: string } }`",
        "`index` — число от `0` до `history.length` включительно",
      ],
      output: "Массив постов `{ id: number, title: string }` — результат применения первых `index` событий из истории к `initialPosts`.",
      constraints: [
        "`0 <= initialPosts.length <= 100`",
        "`0 <= history.length <= 100`",
        "`0 <= index <= history.length`",
        "`id` у каждого поста уникален",
        "Событие `\"remove\"` всегда ссылается на пост, который есть в текущем состоянии на момент применения",
      ],
      example: "Вход:\n\ninitialPosts = [{ id: 1, title: \"First\" }]\nhistory = [\n  { type: \"add\",    post: { id: 2, title: \"Second\" } },\n  { type: \"add\",    post: { id: 3, title: \"Third\" }  },\n  { type: \"remove\", post: { id: 2, title: \"Second\" } }\n]\nindex = 2\n\nВыход:\n\n[{ id: 1, title: \"First\" }, { id: 2, title: \"Second\" }, { id: 3, title: \"Third\" }]\n\nПри `index = 3`:\n\n[{ id: 1, title: \"First\" }, { id: 3, title: \"Third\" }]\n\nПри `index = 0`:\n\n[{ id: 1, title: \"First\" }]",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\n// Структура поста: { id: number, title: string }\n// Структура события: { type: \"add\" | \"remove\", post: { id: number, title: string } }\n\nfunction applyHistory(initialPosts, history, index) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Применены первые два события",
        args: [
          [
            {
              id: 1,
              title: "First",
            },
          ],
          [
            {
              type: "add",
              post: {
                id: 2,
                title: "Second",
              },
            },
            {
              type: "add",
              post: {
                id: 3,
                title: "Third",
              },
            },
            {
              type: "remove",
              post: {
                id: 2,
                title: "Second",
              },
            },
          ],
          2,
        ],
        expected: [
          {
            id: 1,
            title: "First",
          },
          {
            id: 2,
            title: "Second",
          },
          {
            id: 3,
            title: "Third",
          },
        ],
      },
      {
        name: "Применена вся история",
        args: [
          [
            {
              id: 1,
              title: "First",
            },
          ],
          [
            {
              type: "add",
              post: {
                id: 2,
                title: "Second",
              },
            },
            {
              type: "add",
              post: {
                id: 3,
                title: "Third",
              },
            },
            {
              type: "remove",
              post: {
                id: 2,
                title: "Second",
              },
            },
          ],
          3,
        ],
        expected: [
          {
            id: 1,
            title: "First",
          },
          {
            id: 3,
            title: "Third",
          },
        ],
      },
      {
        name: "index = 0 — исходное состояние",
        args: [
          [
            {
              id: 1,
              title: "First",
            },
          ],
          [
            {
              type: "add",
              post: {
                id: 2,
                title: "Second",
              },
            },
          ],
          0,
        ],
        expected: [
          {
            id: 1,
            title: "First",
          },
        ],
      },
      {
        name: "Исходный массив не мутируется",
        body: "const initial = [{ id: 1, title: \"First\" }];\nsolution(initial, [{ type: \"add\", post: { id: 2, title: \"Second\" } }], 1);\nreturn initial.length;",
        expected: 1,
        hidden: true,
      },
      {
        name: "Пустая история",
        args: [
          [
            {
              id: 9,
              title: "Only",
            },
          ],
          [],
          0,
        ],
        expected: [
          {
            id: 9,
            title: "Only",
          },
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Уникальные элементы массива (Unique Array Elements)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "getUniqueElements",
    description: {
      condition: "Напишите функцию `getUniqueElements(arr)`, которая принимает массив чисел и возвращает новый массив, содержащий только уникальные элементы, отсортированные по возрастанию.",
      input: [],
      output: "",
      constraints: [
        "Реализуйте алгоритм вручную, без использования встроенных структур данных для удаления дубликатов (таких как Set, HashSet, Dictionary и т.д.)",
        "Запрещено использовать встроенные функции вроде `np.unique` или `lodash.uniq`",
        "Массив может быть пустым",
        "Элементы — целые числа",
        "Алгоритмический подход:",
        "Отсортировать исходный массив",
        "Пройти по отсортированному массиву и добавить в результат только те элементы, которые отличаются от предыдущего",
        "Длина массива: 0 ≤ N ≤ 10000",
        "Элементы: -10^6 ≤ arr[i] ≤ 10^6",
        "Время выполнения: O(N log N) (из-за сортировки)",
        "Память: O(N)",
      ],
      example: "// Пример 1\ngetUniqueElements([1, 2, 3, 5, 1, 5, 9, 1, 2, 8])\n// -> [1, 2, 3, 5, 8, 9]\n\n// Пример 2\ngetUniqueElements([5, 4, 3, 2, 1])\n// -> [1, 2, 3, 4, 5]\n\n// Пример 3\ngetUniqueElements([])\n// -> []\n\n// Пример 4\ngetUniqueElements([7, 7, 7, 7])\n// -> [7]",
    },
    starterCode: "function getUniqueElements(arr) {\n    // TODO: write your solution here\n    return [];\n}\n",
    tests: [
      {
        name: "Дубликаты и сортировка",
        args: [
          [
            1,
            2,
            3,
            5,
            1,
            5,
            9,
            1,
            2,
            8,
          ],
        ],
        expected: [
          1,
          2,
          3,
          5,
          8,
          9,
        ],
      },
      {
        name: "Обратный порядок",
        args: [
          [
            5,
            4,
            3,
            2,
            1,
          ],
        ],
        expected: [
          1,
          2,
          3,
          4,
          5,
        ],
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: [],
      },
      {
        name: "Все элементы одинаковые",
        args: [
          [
            7,
            7,
            7,
            7,
          ],
        ],
        expected: [
          7,
        ],
        hidden: true,
      },
      {
        name: "Числа больше девяти",
        args: [
          [
            10,
            9,
            100,
            20,
          ],
        ],
        expected: [
          9,
          10,
          20,
          100,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Уникальные случайные числа (Unique Random Numbers)",
    difficulty: 2,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "uniqRandn",
    description: {
      condition: "Напишите функцию, которая принимает число `n` и возвращает массив из `n` уникальных случайных целых чисел.\n\nЧисла должны быть в диапазоне от `0` до `n * 10 - 1`.\n\nПорядок чисел может быть любым.",
      input: [
        "`n` — количество уникальных случайных чисел.",
      ],
      output: "Массив длины `n`, в котором все числа уникальны.",
      constraints: [
        "`0 <= n <= 1000`",
        "Все числа должны быть целыми",
        "Все числа должны быть уникальными",
        "Каждое число должно быть в диапазоне `[0, n * 10 - 1]`",
        "При `n = 0` нужно вернуть пустой массив",
      ],
      example: "Вход:\n\nn = 5\n\nВыход:\n\n[12, 3, 41, 7, 25]",
    },
    starterCode: "function uniqRandn(n) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Ровно n чисел, все уникальные",
        body: "const result = solution(5);\nreturn [result.length, new Set(result).size];",
        expected: [
          5,
          5,
        ],
      },
      {
        name: "Все числа в диапазоне 0..n*10-1",
        body: "const n = 8;\nconst result = solution(n);\nreturn result.every((v) => Number.isInteger(v) && v >= 0 && v < n * 10);",
        expected: true,
      },
      {
        name: "n = 1",
        body: "const result = solution(1);\nreturn [result.length, result[0] >= 0 && result[0] < 10];",
        expected: [
          1,
          true,
        ],
      },
      {
        name: "Уникальность на большой выборке",
        body: "const result = solution(50);\nreturn new Set(result).size;",
        expected: 50,
        hidden: true,
      },
      {
        name: "n = 0 — пустой массив",
        body: "return solution(0);",
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Проверка правильности скобок (Valid Parentheses)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "validParentheses",
    description: {
      condition: "Напишите функцию `validParentheses`, которая принимает строку, содержащую только круглые скобки `(` и `)`. Функция должна вернуть `true`, если скобки расставлены правильно (каждая открывающая скобка имеет соответствующую закрывающую, и порядок соблюден), и `false` в противном случае.\n\nПравила:\n\nКаждая открывающая скобка `(` должна иметь соответствующую закрывающую скобку `)`\n\nЗакрывающая скобка не может идти перед открывающей\n\nСтрока может быть пустой (считается правильной)",
      input: [],
      output: "",
      constraints: [
        "Строка содержит только символы `(` и `)`",
        "Длина строки не превышает 1000 символов",
      ],
      example: "Вход: \"()\"\nВыход: true\n\nВход: \"())\"\nВыход: false\n\nВход: \"())(\"\nВыход: false\n\nВход: \"\"\nВыход: true",
    },
    starterCode: "function validParentheses(s) {\n    // TODO: напишите решение здесь\n    return false;\n}\n",
    tests: [
      {
        name: "Простая пара",
        args: [
          "()",
        ],
        expected: true,
      },
      {
        name: "Лишняя закрывающая",
        args: [
          "())",
        ],
        expected: false,
      },
      {
        name: "Верное количество, неверный порядок",
        args: [
          "())(",
        ],
        expected: false,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Вложенные скобки",
        args: [
          "(())",
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Незакрытая скобка",
        args: [
          "(()",
        ],
        expected: false,
        hidden: true,
      },
    ],
  },
  {
    title: "Каррированная сумма с переменной арностью (Variadic Curried Sum)",
    difficulty: 3,
    categories: [
      "Functions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "sum",
    description: {
      condition: "Реализуйте функцию `sum`, которая принимает одно число и возвращает новую функцию, также принимающую число и возвращающую следующую функцию — и так далее. Цепочка вызовов может продолжаться сколь угодно долго. Как только результирующая функция вызывается без аргументов, должна вернуться итоговая сумма всех ранее переданных чисел.",
      input: [
        "Последовательность вызовов вида `sum(a)(b)(c)...()`, где каждое число — целое (может быть отрицательным).",
      ],
      output: "Число — сумма всех чисел, переданных в цепочке вызовов, возвращаемое при финальном вызове без аргументов.",
      constraints: [
        "Длина цепочки вызовов: от 1 до 20",
        "Числа могут быть отрицательными",
        "Финальный вызов без аргументов завершает цепочку и возвращает сумму",
      ],
      example: "Вход: sum(1)()\nВыход: 1\n\nВход: sum(1)(2)()\nВыход: 3\n\nВход: sum(1)(2)(-3)()\nВыход: 0",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction sum(a) {\n  // TODO: напишите решение здесь\n  return function() {\n    return a;\n  };\n}\n",
    tests: [
      {
        name: "Одно число",
        body: "return solution(1)();",
        expected: 1,
      },
      {
        name: "Два числа",
        body: "return solution(1)(2)();",
        expected: 3,
      },
      {
        name: "С отрицательным числом",
        body: "return solution(1)(2)(-3)();",
        expected: 0,
      },
      {
        name: "Длинная цепочка",
        body: "return solution(1)(2)(3)(4)(5)();",
        expected: 15,
        hidden: true,
      },
      {
        name: "Цепочки независимы",
        body: "const a = solution(10)(10);\nconst b = solution(1)(1);\nreturn [a(), b()];",
        expected: [
          20,
          2,
        ],
        hidden: true,
      },
    ],
  },
  {
    title: "Вертикальная симметрия точек (Vertical Symmetry of Points)",
    difficulty: 3,
    categories: [
      "Arrays",
      "Conditions",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "isVerticalSymmetric",
    description: {
      condition: "Дан массив точек на плоскости с целочисленными координатами. Каждая точка представлена объектом `{ x: number, y: number }`. Точки могут повторяться.\n\nНужно определить, существует ли вертикальная прямая `x = c`, относительно которой все точки образуют симметричный набор — то есть для каждой точки `(x, y)` в наборе найдётся точка `(2c - x, y)`, также присутствующая в наборе (с учётом кратности повторов).\n\nНапишите функцию, которая возвращает `true`, если такая вертикальная прямая существует, и `false` — в противном случае. Пустой массив и массив из одной точки считаются симметричными.",
      input: [
        "`points` — массив объектов `{ x: number, y: number }`, длина от 0 до 1000",
      ],
      output: "`boolean` — существует ли ось вертикальной симметрии.",
      constraints: [
        "`0 <= points.length <= 1000`",
        "`-10^4 <= x, y <= 10^4`",
        "Координаты — целые числа",
        "Точки могут повторяться",
      ],
      example: "Вход: `[{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0},{x:4,y:0}]`\nВыход: `true`\n\nВход: `[{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0}]`\nВыход: `false`\n\nВход: `[]`\nВыход: `true`\n\nВход: `[{x:0,y:0}]`\nВыход: `true`\n\nВход: `[{x:0,y:0},{x:10,y:0}]`\nВыход: `true`\n\nВход: `[{x:0,y:0},{x:11,y:1}]`\nВыход: `false`\n\nВход: `[{x:0,y:0},{x:1,y:0},{x:3,y:0}]`\nВыход: `false`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\n\nfunction isVerticalSymmetric(points) {\n  // TODO: напишите решение здесь\n  return false;\n}\n",
    tests: [
      {
        name: "Симметричный набор",
        args: [
          [
            {
              x: 0,
              y: 0,
            },
            {
              x: 0,
              y: 0,
            },
            {
              x: 1,
              y: 1,
            },
            {
              x: 2,
              y: 2,
            },
            {
              x: 3,
              y: 1,
            },
            {
              x: 4,
              y: 0,
            },
            {
              x: 4,
              y: 0,
            },
          ],
        ],
        expected: true,
      },
      {
        name: "Не хватает пары",
        args: [
          [
            {
              x: 0,
              y: 0,
            },
            {
              x: 0,
              y: 0,
            },
            {
              x: 1,
              y: 1,
            },
            {
              x: 2,
              y: 2,
            },
            {
              x: 3,
              y: 1,
            },
            {
              x: 4,
              y: 0,
            },
          ],
        ],
        expected: false,
      },
      {
        name: "Пустой массив",
        args: [
          [],
        ],
        expected: true,
      },
      {
        name: "Одна точка",
        args: [
          [
            {
              x: 0,
              y: 0,
            },
          ],
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Две точки на одной высоте",
        args: [
          [
            {
              x: 0,
              y: 0,
            },
            {
              x: 10,
              y: 0,
            },
          ],
        ],
        expected: true,
        hidden: true,
      },
      {
        name: "Две точки на разной высоте",
        args: [
          [
            {
              x: 0,
              y: 0,
            },
            {
              x: 11,
              y: 1,
            },
          ],
        ],
        expected: false,
        hidden: true,
      },
      {
        name: "Нечётный набор без центра",
        args: [
          [
            {
              x: 0,
              y: 0,
            },
            {
              x: 1,
              y: 0,
            },
            {
              x: 3,
              y: 0,
            },
          ],
        ],
        expected: false,
        hidden: true,
      },
    ],
  },
  {
    title: "Кодирование и декодирование гласных (Vowel Encoding/Decoding)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "transformVowels",
    description: {
      condition: "Напишите функцию `transformVowels`, которая принимает строку и преобразует её по следующим правилам:\n\nЕсли в строке есть цифры 1-5, функция расшифровывает строку, заменяя их на соответствующие гласные:`1` → `a`\n\n`2` → `e`\n\n`3` → `i`\n\n`4` → `o`\n\n`5` → `u`\n\nЕсли в строке нет цифр 1-5, функция шифрует строку, заменяя гласные буквы на соответствующие цифры:\n\n`a` → `1`\n\n`e` → `2`\n\n`i` → `3`\n\n`o` → `4`\n\n`u` → `5`",
      input: [],
      output: "",
      constraints: [
        "Строка содержит только буквы английского алфавита и цифры 1-5",
        "Строка не может содержать одновременно буквы и цифры (кроме результата преобразования)",
        "Длина строки не превышает 1000 символов",
      ],
      example: "Вход: \"hello\"\nВыход: \"h2ll4\"\nПояснение: e → 2, o → 4\n\nВход: \"h2ll4\"\nВыход: \"hello\"\nПояснение: 2 → e, 4 → o\n\nВход: \"world\"\nВыход: \"w4rld\"\nПояснение: o → 4\n\nВход: \"w4rld\"\nВыход: \"world\"\nПояснение: 4 → o",
    },
    starterCode: "function transformVowels(str) {\n    // TODO: write your solution here\n    return \"\";\n}\n",
    tests: [
      {
        name: "Шифрование",
        args: [
          "hello",
        ],
        expected: "h2ll4",
      },
      {
        name: "Расшифровка",
        args: [
          "h2ll4",
        ],
        expected: "hello",
      },
      {
        name: "Одна гласная",
        args: [
          "world",
        ],
        expected: "w4rld",
      },
      {
        name: "Обратно в буквы",
        args: [
          "w4rld",
        ],
        expected: "world",
        hidden: true,
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: "",
        hidden: true,
      },
      {
        name: "Без гласных и цифр",
        args: [
          "xyz",
        ],
        expected: "xyz",
        hidden: true,
      },
    ],
  },
  {
    title: "Подсчёт слов и нахождение наиболее частого слова (Word Count and Most Frequent Word)",
    difficulty: 2,
    categories: [
      "Strings",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "calc",
    description: {
      condition: "Напишите функцию `calc(text)`, которая принимает строку `text`, подсчитывает общее количество слов и находит самое часто встречающееся слово.\n\nСлова разделяются пробелами, регистр не учитывается. При равной частоте возвращается слово, встретившееся раньше. Для пустой строки `wordCount` равен `0`, а `mostFrequentWord` — пустая строка.",
      input: [
        "`text` — строка со словами, разделёнными пробелами",
      ],
      output: "Объект `{ wordCount, mostFrequentWord }`",
      constraints: [
        "Регистр игнорируется — `\"The\"` и `\"the\"` считаются одним словом",
        "Возвращаемое слово — в нижнем регистре",
        "Лишние пробелы не учитываются",
      ],
      example: "calc(\"the cat and the dog and the bird\")\n// -> { wordCount: 8, mostFrequentWord: \"the\" }\n\ncalc(\"\")\n// -> { wordCount: 0, mostFrequentWord: \"\" }",
    },
    starterCode: "function calc(text) {\n    // TODO: напишите решение здесь\n    return { wordCount: 0, mostFrequentWord: \"\" };\n}\n",
    tests: [
      {
        name: "Самое частое слово",
        args: [
          "the cat and the dog and the bird",
        ],
        expected: {
          wordCount: 8,
          mostFrequentWord: "the",
        },
      },
      {
        name: "Пустая строка",
        args: [
          "",
        ],
        expected: {
          wordCount: 0,
          mostFrequentWord: "",
        },
      },
      {
        name: "Регистр не учитывается",
        args: [
          "The the THE cat",
        ],
        expected: {
          wordCount: 4,
          mostFrequentWord: "the",
        },
      },
      {
        name: "Лишние пробелы",
        args: [
          "  a   b  ",
        ],
        expected: {
          wordCount: 2,
          mostFrequentWord: "a",
        },
        hidden: true,
      },
      {
        name: "При равной частоте — первое слово",
        args: [
          "b a a b",
        ],
        expected: {
          wordCount: 4,
          mostFrequentWord: "b",
        },
        hidden: true,
      },
    ],
  },
  {
    title: "Слова с заданным префиксом (Words With Given Prefix)",
    difficulty: 1,
    categories: [
      "Arrays",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "wordsWithPrefix",
    description: {
      condition: "Дана строка `s`, содержащая слова, разделённые пробелами, и строка `prefix`. Напишите функцию, которая возвращает список всех слов из `s` (в порядке их появления, с повторениями), которые начинаются с `prefix`.",
      input: [
        "`s` — строка со словами, разделёнными одним пробелом (может быть пустой)",
        "`prefix` — строка-префикс для поиска (может быть пустой строкой)",
      ],
      output: "Массив/список строк — все слова из `s`, начинающиеся с `prefix`, в исходном порядке, включая повторы",
      constraints: [
        "`0 <= длина s <= 10^5`",
        "`0 <= длина prefix <= 100`",
        "Слова состоят из строчных и заглавных латинских букв",
        "Если `prefix` — пустая строка, все слова считаются подходящими",
      ],
      example: "Вход: `s = \"ab abc def abc xyz ace ab cab\"`, `prefix = \"ab\"`\nВыход: `[\"ab\", \"abc\", \"abc\", \"ab\"]`\n\nВход: `s = \"hello world\"`, `prefix = \"z\"`\nВыход: `[]`\n\nВход: `s = \"\"`, `prefix = \"a\"`\nВыход: `[]`",
    },
    starterCode: "// Доступно без импорта: встроенные методы JS\nfunction wordsWithPrefix(s, prefix) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Несколько совпадений с повторами",
        args: [
          "ab abc def abc xyz ace ab cab",
          "ab",
        ],
        expected: [
          "ab",
          "abc",
          "abc",
          "ab",
        ],
      },
      {
        name: "Совпадений нет",
        args: [
          "hello world",
          "z",
        ],
        expected: [],
      },
      {
        name: "Пустая строка",
        args: [
          "",
          "a",
        ],
        expected: [],
      },
      {
        name: "Пустой префикс — все слова",
        args: [
          "a b",
          "",
        ],
        expected: [
          "a",
          "b",
        ],
        hidden: true,
      },
      {
        name: "Префикс должен быть в начале слова",
        args: [
          "cab bca",
          "ab",
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    title: "Worker Pool (Worker Pool)",
    difficulty: 3,
    categories: [
      "Asynchronous",
    ],
    languages: [
      "JavaScript",
    ],
    functionName: "workerPool",
    description: {
      condition: "Реализуйте worker pool.\n\nЕсть `tasksCount` задач. Каждая задача имитирует работу: засыпает на короткое время и после этого считается выполненной. Количество воркеров задаётся параметром `workersCount`.\n\nКаждый воркер берёт задачи из общей очереди — нельзя запускать отдельный воркер на каждую задачу. Функция возвращает массив строк вида `\"task X executed by worker Y\"`, где `X` — номер задачи (с 1), `Y` — номер воркера (с 1).\n\nПорядок строк в результате может быть любым.",
      input: [
        "`workersCount` — количество воркеров",
        "`tasksCount` — количество задач",
      ],
      output: "Массив строк вида `\"task X executed by worker Y\"` — по одной на каждую задачу",
      constraints: [
        "Одновременно работает не более `workersCount` воркеров",
        "Каждая задача выполняется ровно один раз",
        "Номера воркеров — от 1 до `workersCount`",
      ],
      example: "Вход: workersCount = 3, tasksCount = 10\n\nВыход (порядок может отличаться):\n[\n  \"task 1 executed by worker 1\",\n  \"task 2 executed by worker 2\",\n  \"task 3 executed by worker 3\",\n  ...\n]",
    },
    starterCode: "async function workerPool(workersCount, tasksCount) {\n  // TODO: напишите решение здесь\n  return [];\n}\n",
    tests: [
      {
        name: "Каждая задача выполнена ровно один раз",
        body: "const result = await solution(3, 10);\nconst tasks = result.map((line) => Number(line.match(/task (\\d+)/)[1])).sort((a, b) => a - b);\nreturn [result.length, tasks];",
        expected: [
          10,
          [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
          ],
        ],
      },
      {
        name: "Номера воркеров не выходят за предел",
        body: "const result = await solution(3, 10);\nconst workers = result.map((line) => Number(line.match(/worker (\\d+)/)[1]));\nreturn workers.every((w) => w >= 1 && w <= 3);",
        expected: true,
      },
      {
        name: "Ноль задач — пустой результат",
        body: "return await solution(3, 0);",
        expected: [],
      },
      {
        name: "Один воркер обрабатывает всё",
        body: "const result = await solution(1, 4);\nconst workers = new Set(result.map((line) => line.match(/worker (\\d+)/)[1]));\nreturn [result.length, [...workers]];",
        expected: [
          4,
          [
            "1",
          ],
        ],
        hidden: true,
      },
      {
        name: "Воркеров больше, чем задач",
        body: "const result = await solution(5, 2);\nreturn result.length;",
        expected: 2,
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
