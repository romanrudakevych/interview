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
