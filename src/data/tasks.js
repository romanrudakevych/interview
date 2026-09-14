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
