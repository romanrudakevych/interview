// ============================================================================
// QUESTIONS DATABASE
// ============================================================================
// Як додати нове питання:
//   1. Скопіюй один об'єкт у масиві `rawQuestions` нижче.
//   2. Заповни поля своїми значеннями.
//   3. Збережи файл — питання одразу з'явиться у застосунку.
//
// ID генерується автоматично (автоінкремент за позицією у списку), вказувати
// його вручну не треба і не можна. Саме тому ID стабільні між перезавантаженнями
// сторінки лише доти, доки ти не міняєш порядок існуючих питань у списку —
// додавання нових питань у КІНЕЦЬ списку завжди безпечне.
//
// Формат одного питання:
// {
//   question: "Текст питання",
//   shortAnswer: "Коротка відповідь. Інлайн-код познач бек-тиками: `<tag>`.",
//   longAnswer: "Розгорнута, детальна відповідь.",
//   codeExample: `console.log("необов'язкове поле — просто видали його,
// якщо приклад коду не потрібен")`,
//   skills: ["HTML"],           // одна чи кілька навичок зі списку SKILLS нижче
//   keywords: ["#tag1", "#tag2"],
//   difficulty: 3,              // складність питання: 1-10
//   rating: 3,                  // важливість/рейтинг питання: 1-5
// }
//
// Поля прогресу (status, favorite, learnedCount, learnedGoal) вказувати НЕ
// треба — вони проставляються автоматично і зберігаються окремо в
// localStorage, тож редагування цього файлу ніколи не стирає твій прогрес.
// ============================================================================

export const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "React Router",
  "Next.js",
  "Redux",
  "Git",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Webpack",
  "Networks",
];

const rawQuestions = [
  // ---------------------------------------------------------------- HTML ---
  {
    question: "Для чого використовується тег <link>?",
    shortAnswer:
      "Тег `<link>` використовується для підключення зовнішніх ресурсів до HTML-документа. Найчастіше застосовується для CSS через `rel=\"stylesheet\"`.",
    longAnswer:
      "Тег `<link>` — це HTML-елемент, який дозволяє підключати зовнішні ресурси до веб-сторінки. Використовується лише в секції `<head>`. Крім стилів, за допомогою `<link>` підключають favicon (`rel=\"icon\"`), попереднє завантаження шрифтів (`rel=\"preload\"`), preconnect до зовнішніх доменів та canonical-посилання для SEO. На відміну від `<script>`, `<link>` не має закриваючого тегу і не блокує парсинг DOM, хоча завантаження CSS може блокувати рендеринг.",
    codeExample: '<link rel="stylesheet" href="styles.css">',
    skills: ["HTML"],
    keywords: ["#link", "#head"],
    difficulty: 2,
    rating: 3,
  },
  {
    question: "У чому різниця між семантичними тегами та <div>?",
    shortAnswer:
      "Семантичні теги (`<header>`, `<nav>`, `<main>`, `<article>`) описують зміст блоку, тоді як `<div>` — це нейтральний контейнер без смислового навантаження.",
    longAnswer:
      "Семантична розмітка покращує доступність (screen reader розуміє структуру сторінки), SEO (пошукові боти краще індексують контент) і читабельність коду для розробників. `<div>` варто використовувати лише тоді, коли жоден семантичний тег не підходить за змістом — наприклад, для суто стильового обгортання елементів. Приклад типової структури сторінки: `<header>` — шапка, `<nav>` — навігація, `<main>` — основний контент, `<article>` — самостійний блок контенту, `<aside>` — бічна панель, `<footer>` — підвал.",
    codeExample:
      "<header>...</header>\n<main>\n  <article>...</article>\n  <aside>...</aside>\n</main>\n<footer>...</footer>",
    skills: ["HTML"],
    keywords: ["#semantics", "#accessibility"],
    difficulty: 2,
    rating: 4,
  },
  {
    question: "Для чого потрібні data-* атрибути?",
    shortAnswer:
      "`data-*` атрибути дозволяють зберігати довільні кастомні дані прямо в HTML-елементі, не порушуючи валідність розмітки.",
    longAnswer:
      "Атрибути виду `data-name=\"value\"` призначені для зберігання додаткової інформації, яку JavaScript може читати через `element.dataset.name`. Це зручно для зв'язку розмітки з логікою без створення додаткових CSS-класів чи глобальних змінних — наприклад, для зберігання ID елемента, стану компонента або параметрів для аналітики. На відміну від нестандартних атрибутів, `data-*` офіційно підтримується специфікацією HTML5 і не викликає помилок валідації.",
    codeExample:
      '<button data-user-id="42">Delete</button>\n\n// JS\nbutton.dataset.userId; // "42"',
    skills: ["HTML"],
    keywords: ["#data-attribute", "#dataset"],
    difficulty: 2,
    rating: 2,
  },

  // ----------------------------------------------------------------- CSS ---
  {
    question: "У чому різниця між box-sizing: content-box і border-box?",
    shortAnswer:
      "`content-box` (за замовчуванням) не враховує padding і border у вказаній ширині/висоті елемента, а `border-box` включає їх.",
    longAnswer:
      "При `content-box` властивість `width` визначає лише розмір контенту, тож фактична ширина елемента = width + padding + border. Це ускладнює верстку, бо додавання padding «розсуває» елемент за межі очікуваних розмірів. `border-box` вирішує цю проблему: вказана ширина вже включає padding і border, тож елемент завжди займає рівно стільки місця, скільки задано. Саме тому в більшості CSS-reset файлів застосовують `* { box-sizing: border-box; }`.",
    codeExample:
      "* {\n  box-sizing: border-box;\n}\n\n.box {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid; /* фактична ширина лишається 200px */\n}",
    skills: ["CSS"],
    keywords: ["#box-sizing", "#layout"],
    difficulty: 2,
    rating: 4,
  },
  {
    question: "Як обчислюється специфічність (specificity) CSS-селекторів?",
    shortAnswer:
      "Специфічність визначається кількістю ID, класів/атрибутів/псевдокласів та тегів у селекторі — чим специфічніший селектор, тим вищий пріоритет.",
    longAnswer:
      "Специфічність зазвичай записують як (a, b, c, d), де: a — inline-стилі, b — кількість ID-селекторів, c — кількість класів, атрибутів і псевдокласів, d — кількість тегів і псевдоелементів. Порівняння відбувається послідовно зліва направо: селектор з вищим a завжди переважає, незалежно від b, c, d. `!important` перебиває звичайну специфічність повністю. Розуміння специфічності допомагає уникати конфліктів стилів і надмірного використання `!important`.",
    codeExample:
      "#nav .item { color: red; }   /* (0,1,1,0) */\n.menu .item { color: blue; }  /* (0,0,2,0) — програє першому */",
    skills: ["CSS"],
    keywords: ["#specificity", "#css-cascade"],
    difficulty: 4,
    rating: 4,
  },
  {
    question: "Коли варто використовувати Flexbox, а коли Grid?",
    shortAnswer:
      "Flexbox добре підходить для одновимірного розташування елементів (в рядок або стовпчик), а Grid — для двовимірних макетів (рядки й колонки одночасно).",
    longAnswer:
      "Flexbox оперує «flex-контейнером» і розподіляє простір вздовж однієї осі — головної (main axis) та поперечної (cross axis), що ідеально підходить для навігаційних меню, карток в ряд, вирівнювання елементів. Grid дозволяє явно визначити сітку з рядків і колонок та розміщувати елементи в конкретних клітинках, що зручно для складних макетів сторінки — шапка/сайдбар/контент/футер. На практиці їх часто комбінують: Grid для загального макету сторінки, Flexbox — для вирівнювання елементів усередині окремих блоків.",
    codeExample:
      ".grid {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  gap: 16px;\n}",
    skills: ["CSS"],
    keywords: ["#flexbox", "#grid", "#layout"],
    difficulty: 3,
    rating: 5,
  },

  // ---------------------------------------------------------------- JS -----
  {
    question:
      "Як працює event loop і в чому різниця між мікро- і макрозадачами?",
    shortAnswer:
      "Event loop — це механізм, який дозволяє JavaScript виконувати асинхронний код у однопотоковому середовищі, чергуючи виконання стека викликів із чергами задач.",
    longAnswer:
      "Коли стек викликів (call stack) порожній, event loop бере задачі з черги мікрозадач (промайс-колбеки, `queueMicrotask`) і виконує їх усі до кінця, перш ніж перейти до черги макрозадач (`setTimeout`, `setInterval`, події DOM). Це означає, що мікрозадачі завжди виконуються раніше за наступну макрозадачу, навіть якщо `setTimeout` вказано з затримкою 0. Розуміння цього порядку критичне для передбачення послідовності виконання асинхронного коду.",
    codeExample:
      "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// Виведе: 1, 4, 3, 2",
    skills: ["JavaScript"],
    keywords: ["#event-loop", "#async", "#promise"],
    difficulty: 6,
    rating: 5,
  },
  {
    question: "Що таке замикання (closure) в JavaScript?",
    shortAnswer:
      "Замикання — це функція, яка «запам'ятовує» змінні з зовнішньої області видимості навіть після того, як зовнішня функція завершила виконання.",
    longAnswer:
      "Замикання виникають природньо в JavaScript завдяки лексичному області видимості: вкладена функція має доступ до змінних батьківської функції. Це використовується для інкапсуляції стану (приватні змінні), фабрик функцій, каррінгу та мемоізації. Кожен виклик зовнішньої функції створює нове замикання з власною копією змінних, що дозволяє незалежно керувати кількома «екземплярами» стану без класів.",
    codeExample:
      "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst counter = makeCounter();\ncounter(); // 1\ncounter(); // 2",
    skills: ["JavaScript"],
    keywords: ["#closure", "#scope"],
    difficulty: 4,
    rating: 5,
  },
  {
    question: "У чому різниця між == і === ?",
    shortAnswer:
      "`==` порівнює значення з приведенням типів (type coercion), а `===` порівнює і значення, і тип без будь-якого приведення.",
    longAnswer:
      "Оператор `==` намагається привести операнди до спільного типу перед порівнянням, що часто призводить до неочевидних результатів (наприклад, `0 == '0'` дає `true`, а `null == undefined` теж `true`). `===` (строге порівняння) не виконує приведення типів взагалі, тому вважається безпечнішим і передбачуванішим і рекомендується для використання за замовчуванням у більшості стайлгайдів (наприклад, Airbnb).",
    codeExample:
      "0 == '0';      // true\n0 === '0';     // false\nnull == undefined;  // true\nnull === undefined; // false",
    skills: ["JavaScript"],
    keywords: ["#equality", "#type-coercion"],
    difficulty: 2,
    rating: 3,
  },

  // ------------------------------------------------------------ TypeScript -
  {
    question: "Яка різниця між interface та type в TypeScript?",
    shortAnswer:
      "`interface` і `type` в більшості випадків взаємозамінні для опису форми об'єкта, але `interface` підтримує декларативне злиття (declaration merging), а `type` — унії, перетини та примітивні аліаси.",
    longAnswer:
      "`interface` можна розширювати через `extends` і кілька оголошень одного імені автоматично зливаються в одне — це зручно для розширення типів зовнішніх бібліотек. `type` гнучкіший: ним можна описати union (`'a' | 'b'`), intersection (`A & B`), tuple, mapped types тощо, чого `interface` робити не може. Практична рекомендація: для публічних API об'єктів і класів частіше використовують `interface`, для складних композицій типів — `type`.",
    codeExample:
      "interface User { name: string; }\ninterface User { age: number; } // зливається в одне\n\ntype ID = string | number; // union — лише через type",
    skills: ["TypeScript"],
    keywords: ["#interface", "#type"],
    difficulty: 4,
    rating: 4,
  },
  {
    question: "Що таке дженерики (generics) в TypeScript і навіщо вони потрібні?",
    shortAnswer:
      "Дженерики дозволяють писати функції, класи та типи, які працюють з довільним типом даних, зберігаючи типову безпеку без дублювання коду.",
    longAnswer:
      "Замість того щоб писати окрему функцію для кожного типу або втрачати типізацію через `any`, дженерик-параметр (`<T>`) фіксує конкретний тип під час виклику і TypeScript автоматично перевіряє узгодженість типів на вході й виході. Дженерики широко застосовуються у вбудованих типах (`Array<T>`, `Promise<T>`), а також у власних утилітах та React-хуках (`useState<number>()`).",
    codeExample:
      "function identity<T>(value: T): T {\n  return value;\n}\n\nidentity<number>(5);\nidentity<string>('hi');",
    skills: ["TypeScript"],
    keywords: ["#generics"],
    difficulty: 5,
    rating: 4,
  },
  {
    question: "У чому різниця між типами unknown і any?",
    shortAnswer:
      "`any` повністю вимикає перевірку типів, тоді як `unknown` вимагає звуження типу (type narrowing) перед тим, як з ним можна щось робити.",
    longAnswer:
      "`any` дозволяє виконувати над значенням будь-які операції без перевірки компілятором, що фактично зводить нанівець переваги TypeScript. `unknown` — типобезпечна альтернатива: значення типу `unknown` можна присвоїти будь-якій змінній, але щоб викликати метод або звернутися до властивості, спочатку потрібно звузити тип через `typeof`, `instanceof` або явну перевірку. Це змушує розробника явно обробити всі можливі типи значення.",
    codeExample:
      "let value: unknown = fetchData();\nif (typeof value === 'string') {\n  value.toUpperCase(); // OK після звуження\n}",
    skills: ["TypeScript"],
    keywords: ["#unknown", "#any", "#type-safety"],
    difficulty: 4,
    rating: 3,
  },

  // -------------------------------------------------------------- React ----
  {
    question: "Для чого потрібен useEffect і як працює масив залежностей?",
    shortAnswer:
      "`useEffect` виконує побічні ефекти (запити, підписки, робота з DOM) після рендеру, а масив залежностей визначає, коли ефект має запуститись повторно.",
    longAnswer:
      "React виконує функцію ефекту після того, як браузер оновив екран. Якщо масив залежностей порожній (`[]`), ефект запускається лише один раз після першого рендеру. Якщо масив не вказано взагалі, ефект запускається після кожного рендеру. Якщо в масиві є значення, ефект перезапускається лише коли хоча б одне з них змінилось. Функція, яку `useEffect` повертає, викликається як cleanup — перед наступним запуском ефекту або при розмонтуванні компонента, що важливо для відписки від подій і скасування запитів.",
    codeExample:
      "useEffect(() => {\n  const id = setInterval(() => tick(), 1000);\n  return () => clearInterval(id); // cleanup\n}, []);",
    skills: ["React"],
    keywords: ["#useEffect", "#hooks", "#side-effects"],
    difficulty: 4,
    rating: 5,
  },
  {
    question: "Що таке Virtual DOM і як працює reconciliation?",
    shortAnswer:
      "Virtual DOM — це легковаговий JS-об'єкт, що відображає структуру реального DOM; React порівнює його попередню й нову версії (diffing) і оновлює реальний DOM лише там, де є зміни.",
    longAnswer:
      "Пряме маніпулювання реальним DOM повільне, тому React спочатку рендерить компоненти у Virtual DOM, а потім за допомогою алгоритму reconciliation порівнює нове дерево зі старим. React використовує евристики (наприклад, `key` для списків) для ефективного визначення мінімального набору змін, які потрібно застосувати до реального DOM. Це дозволяє React оновлювати лише ті вузли, які справді змінились, а не перемальовувати всю сторінку.",
    codeExample:
      "// key допомагає React ідентифікувати елементи списку між рендерами\nitems.map(item => <li key={item.id}>{item.text}</li>)",
    skills: ["React"],
    keywords: ["#virtual-dom", "#reconciliation"],
    difficulty: 5,
    rating: 4,
  },
  {
    question:
      "У чому різниця між контрольованими і неконтрольованими компонентами форм?",
    shortAnswer:
      "У контрольованому компоненті значення поля зберігається в React-стані і оновлюється через `onChange`, а неконтрольований компонент керує своїм значенням самостійно через DOM і `ref`.",
    longAnswer:
      "Контрольовані компоненти дають React повний контроль над значенням поля — його легко валідувати, форматувати чи скидати програмно, оскільки єдине джерело правди — стан компонента. Неконтрольовані компоненти читають значення напряму з DOM через `useRef` лише в момент, коли воно потрібне (наприклад, при сабміті), що зменшує кількість ре-рендерів і простіше для дуже простих форм або інтеграції зі сторонніми бібліотеками.",
    codeExample:
      "// Контрольований\n<input value={name} onChange={e => setName(e.target.value)} />\n\n// Неконтрольований\n<input ref={inputRef} defaultValue=\"initial\" />",
    skills: ["React"],
    keywords: ["#forms", "#controlled-component"],
    difficulty: 3,
    rating: 3,
  },

  // -------------------------------------------------------- React Router --
  {
    question: "Навіщо потрібен React Router у SPA-застосунку?",
    shortAnswer:
      "React Router реалізує клієнтську маршрутизацію: змінює відображуваний контент відповідно до URL без повного перезавантаження сторінки.",
    longAnswer:
      "У класичному сайті кожен URL відповідає окремому HTTP-запиту до сервера. У Single Page Application весь застосунок завантажується один раз, а React Router перехоплює зміни URL (через History API) і рендерить потрібний компонент-сторінку, зберігаючи стан застосунку та уникаючи перезавантаження. Це дає швидшу навігацію, збереження стану між переходами і можливість анімувати перехід між сторінками.",
    codeExample:
      "<Routes>\n  <Route path=\"/\" element={<Home />} />\n  <Route path=\"/questions/:id\" element={<Details />} />\n</Routes>",
    skills: ["React Router"],
    keywords: ["#routing", "#spa"],
    difficulty: 2,
    rating: 4,
  },
  {
    question: "Для чого використовуються хуки useNavigate і useParams?",
    shortAnswer:
      "`useNavigate` дозволяє програмно переходити на інший маршрут, а `useParams` читає динамічні параметри поточного URL.",
    longAnswer:
      "`useNavigate` повертає функцію-навігатор, яку можна викликати після певної дії (наприклад, успішного сабміту форми чи логіну), передаючи шлях або відносне зміщення в історії (`navigate(-1)` — назад). `useParams` повертає об'єкт з іменованими параметрами з шаблону маршруту — наприклад, для `/questions/:id` та URL `/questions/42` поверне `{ id: '42' }`. Разом ці хуки дозволяють будувати динамічні сторінки деталей і програмну навігацію без прямого маніпулювання `window.location`.",
    codeExample:
      "const { id } = useParams();\nconst navigate = useNavigate();\n\nnavigate(`/questions/${nextId}`);",
    skills: ["React Router"],
    keywords: ["#useNavigate", "#useParams"],
    difficulty: 3,
    rating: 3,
  },
  {
    question: "Що таке вкладені маршрути (nested routes) і компонент Outlet?",
    shortAnswer:
      "Вкладені маршрути дозволяють рендерити дочірню сторінку всередині батьківського layout-компонента; `<Outlet />` — це місце, куди React Router підставляє дочірній маршрут.",
    longAnswer:
      "Замість дублювання спільних елементів (сайдбар, хедер) на кожній сторінці, батьківський маршрут визначає layout з `<Outlet />` усередині, а React Router автоматично рендерить у цьому місці відповідний дочірній `<Route>` залежно від URL. Це особливо зручно для розділів на кшталт `Knowledge base`, де Questions, Resources і Collections мають спільну навігацію, але різний контент.",
    codeExample:
      "<Route path=\"knowledge-base\" element={<KnowledgeLayout />}>\n  <Route path=\"questions\" element={<QuestionList />} />\n  <Route path=\"resources\" element={<Resources />} />\n</Route>\n\n// KnowledgeLayout.jsx\n<Outlet />",
    skills: ["React Router"],
    keywords: ["#nested-routes", "#outlet"],
    difficulty: 4,
    rating: 3,
  },

  // ------------------------------------------------------------- Next.js --
  {
    question: "У чому різниця між SSR, SSG і CSR у Next.js?",
    shortAnswer:
      "CSR рендерить сторінку в браузері після завантаження JS, SSR генерує HTML на сервері при кожному запиті, а SSG генерує HTML один раз під час білду.",
    longAnswer:
      "CSR (Client-Side Rendering) — це підхід звичайного SPA: користувач спочатку бачить порожню сторінку, поки не завантажиться і не виконається JavaScript. SSR (Server-Side Rendering) формує готовий HTML на сервері для кожного запиту, що покращує SEO і швидкість першого відображення (FCP), але навантажує сервер. SSG (Static Site Generation) генерує HTML заздалегідь під час білду — сторінки віддаються як статичні файли, що найшвидше, але не підходить для часто змінюваних даних без ревалідації (ISR).",
    codeExample:
      "// SSG: виконується під час білду\nexport async function getStaticProps() { ... }\n\n// SSR: виконується при кожному запиті\nexport async function getServerSideProps() { ... }",
    skills: ["Next.js"],
    keywords: ["#ssr", "#ssg", "#csr"],
    difficulty: 5,
    rating: 5,
  },
  {
    question: "Як влаштована файлова маршрутизація в Next.js?",
    shortAnswer:
      "У Next.js структура файлів у папці `pages` (Pages Router) або `app` (App Router) автоматично визначає маршрути застосунку — без окремого конфігураційного файлу.",
    longAnswer:
      "У Pages Router файл `pages/about.js` автоматично стає доступним за адресою `/about`, а `pages/blog/[slug].js` створює динамічний маршрут. У новішому App Router (з папкою `app`) кожен маршрут — це окрема директорія з файлом `page.js`, а спільні layout визначаються файлом `layout.js`, який автоматично обгортає всі вкладені сторінки. Такий підхід усуває потребу вручну конфігурувати роутер, як у React Router.",
    codeExample:
      "app/\n  layout.js\n  page.js          → \"/\"\n  questions/\n    page.js        → \"/questions\"\n    [id]/\n      page.js      → \"/questions/:id\"",
    skills: ["Next.js"],
    keywords: ["#file-routing", "#app-router"],
    difficulty: 4,
    rating: 3,
  },
  {
    question: "Що таке Server Components у Next.js App Router?",
    shortAnswer:
      "Server Components рендеряться виключно на сервері й не потрапляють у JS-бандл клієнта, що зменшує розмір бандла і дозволяє напряму звертатись до бекенду чи бази даних.",
    longAnswer:
      "У App Router компоненти за замовчуванням є Server Components: вони не мають доступу до браузерних API (`useState`, `onClick`) і рендеряться в HTML на сервері. Щоб отримати інтерактивність, компонент явно позначають директивою `'use client'` — тоді він стає Client Component і виконується також у браузері. Такий гібридний підхід дозволяє тримати важку логіку та секрети (API-ключі, запити до БД) на сервері, надсилаючи клієнту лише мінімально необхідний JavaScript.",
    codeExample:
      "// Server Component (за замовчуванням)\nexport default async function Page() {\n  const data = await db.query(...);\n  return <List data={data} />;\n}\n\n// Client Component\n'use client';\nexport function Button() { ... }",
    skills: ["Next.js"],
    keywords: ["#server-components", "#use-client"],
    difficulty: 7,
    rating: 4,
  },

  // -------------------------------------------------------------- Redux ---
  {
    question: "Які основні принципи Redux?",
    shortAnswer:
      "Redux базується на трьох принципах: єдине джерело правди (один store), стан лише для читання (змінюється тільки через actions) і зміни описуються чистими функціями-редюсерами.",
    longAnswer:
      "Весь стан застосунку зберігається в одному об'єкті store, що спрощує дебаг і відстеження змін (time-travel debugging). Єдиний спосіб змінити стан — відправити (dispatch) action, тобто простий об'єкт, що описує «що сталося». Редюсер — чиста функція `(state, action) => newState`, яка не мутує попередній стан, а повертає новий, що робить зміни передбачуваними і легко тестованими.",
    codeExample:
      "function counterReducer(state = 0, action) {\n  switch (action.type) {\n    case 'increment': return state + 1;\n    default: return state;\n  }\n}",
    skills: ["Redux"],
    keywords: ["#redux", "#reducer", "#store"],
    difficulty: 4,
    rating: 4,
  },
  {
    question: "З яких частин складається типовий Redux-флоу: action, reducer, store?",
    shortAnswer:
      "Action описує намір змінити стан, reducer визначає як саме стан має змінитись, а store зберігає поточний стан і сповіщає підписників про зміни.",
    longAnswer:
      "Компонент викликає `dispatch(action)`, де action — об'єкт з полем `type` і, за потреби, `payload`. Store передає поточний стан і отриманий action у reducer, який обчислює новий стан і повертає його. Store зберігає цей новий стан і повідомляє всіх підписаних React-компонентів (через `useSelector` у react-redux) про оновлення, після чого вони ре-рендеряться з новими даними.",
    codeExample:
      "store.dispatch({ type: 'increment', payload: 1 });\n\nconst count = useSelector(state => state.counter);",
    skills: ["Redux"],
    keywords: ["#action", "#dispatch"],
    difficulty: 3,
    rating: 3,
  },
  {
    question: "Навіщо потрібен redux-thunk (або інший middleware)?",
    shortAnswer:
      "Redux за замовчуванням підтримує лише синхронні дії; middleware на кшталт redux-thunk дозволяє диспатчити асинхронні операції — наприклад, запити до API.",
    longAnswer:
      "Без middleware action creator може повертати лише звичайний об'єкт-action. `redux-thunk` дозволяє action creator-у повертати функцію замість об'єкта; ця функція отримує `dispatch` і `getState` та може виконувати асинхронну логіку (наприклад, `fetch`), диспатчячи звичайні actions (`pending`, `fulfilled`, `rejected`) на різних етапах запиту. Сучасна альтернатива — Redux Toolkit з `createAsyncThunk`, яка інкапсулює цю логіку.",
    codeExample:
      "function fetchUser(id) {\n  return async (dispatch) => {\n    dispatch({ type: 'user/pending' });\n    const user = await api.getUser(id);\n    dispatch({ type: 'user/fulfilled', payload: user });\n  };\n}",
    skills: ["Redux"],
    keywords: ["#thunk", "#middleware", "#async"],
    difficulty: 5,
    rating: 3,
  },

  // ----------------------------------------------------------------- Git --
  {
    question: "У чому різниця між git merge і git rebase?",
    shortAnswer:
      "`git merge` створює новий commit злиття, зберігаючи повну історію обох гілок, а `git rebase` переносить commits однієї гілки поверх іншої, формуючи лінійну історію.",
    longAnswer:
      "`merge` не змінює існуючі commits — він додає новий merge-commit з двома батьками, що чесно відображає момент і спосіб злиття гілок, але ускладнює історію графом. `rebase` переписує історію: кожен commit гілки «перегравається» заново поверх нової базової точки, унаслідок чого історія виглядає так, ніби розробка йшла лінійно. Головне правило: ніколи не робити rebase гілки, яку вже запушили і якою користуються інші — це змінює хеші commits і ламає їхню історію.",
    codeExample:
      "git checkout feature\ngit rebase main   # переносить commits feature поверх main",
    skills: ["Git"],
    keywords: ["#merge", "#rebase"],
    difficulty: 5,
    rating: 5,
  },
  {
    question: "Що робить команда git stash?",
    shortAnswer:
      "`git stash` тимчасово зберігає незакомічені зміни в робочій директорії окремо, повертаючи її до чистого стану останнього commit-у.",
    longAnswer:
      "Це корисно, коли потрібно швидко перемкнутись на іншу гілку (наприклад, для термінового хотфіксу), не завершивши поточну роботу і не бажаючи робити проміжний commit. Зміни зберігаються у стеку stash-ів і можуть бути повернуті командою `git stash pop` (застосувати і видалити зі стеку) або `git stash apply` (застосувати, залишивши в стеку). Можна мати кілька stash-ів одночасно і переглядати їх через `git stash list`.",
    codeExample:
      "git stash            # зберегти зміни\ngit checkout hotfix\n# ...\ngit checkout feature\ngit stash pop         # повернути зміни",
    skills: ["Git"],
    keywords: ["#stash"],
    difficulty: 2,
    rating: 3,
  },
  {
    question: "Як вирішувати конфлікти злиття (merge conflicts)?",
    shortAnswer:
      "Git позначає конфліктні ділянки спеціальними маркерами прямо у файлі; потрібно вручну обрати правильний варіант коду, видалити маркери й закомітити результат.",
    longAnswer:
      "Конфлікт виникає, коли одну й ту саму ділянку файлу було змінено по-різному в обох гілках, і Git не може автоматично визначити правильний варіант. Git вставляє маркери `<<<<<<<`, `=======`, `>>>>>>>`, розділяючи версії з поточної гілки та тієї, що зливається. Розробник редагує файл, залишаючи потрібний код (можливо, комбінуючи обидва варіанти), видаляє маркери, додає файл через `git add` і завершує злиття командою `git commit` (для merge) або `git rebase --continue` (для rebase).",
    codeExample:
      "<<<<<<< HEAD\nconst greeting = 'Привіт';\n=======\nconst greeting = 'Вітаю';\n>>>>>>> feature-branch",
    skills: ["Git"],
    keywords: ["#merge-conflict"],
    difficulty: 4,
    rating: 4,
  },

  // -------------------------------------------------------------- Docker --
  {
    question: "У чому різниця між Docker-образом (image) і контейнером?",
    shortAnswer:
      "Образ — це незмінний шаблон з файловою системою та інструкціями для запуску застосунку, а контейнер — запущений (або зупинений) екземпляр цього образу.",
    longAnswer:
      "Образ будується з `Dockerfile` пошарово і зберігається як набір незмінних шарів файлової системи — його можна відтворити на будь-якій машині з Docker. Контейнер створюється командою `docker run <image>` і додає поверх шарів образу тонкий записуваний шар для змін під час виконання. З одного образу можна запустити багато незалежних контейнерів одночасно, кожен зі своїм станом, мережею і файловою системою в межах цього шару.",
    codeExample: "docker build -t myapp .\ndocker run -p 3000:3000 myapp",
    skills: ["Docker"],
    keywords: ["#image", "#container"],
    difficulty: 3,
    rating: 4,
  },
  {
    question: "З яких основних інструкцій складається Dockerfile?",
    shortAnswer:
      "Найпоширеніші інструкції: `FROM` (базовий образ), `WORKDIR`, `COPY`, `RUN` (виконати команду під час білду), `EXPOSE` і `CMD` (команда запуску контейнера).",
    longAnswer:
      "`FROM` задає базовий образ, від якого успадковується новий. `WORKDIR` встановлює робочу директорію всередині контейнера. `COPY`/`ADD` копіюють файли з хост-машини в образ. `RUN` виконує команди на етапі побудови образу (наприклад, `npm install`) і створює новий шар. `CMD` визначає команду за замовчуванням, яка виконується при старті контейнера (на відміну від `RUN`, вона не виконується під час білду). `EXPOSE` документує, який порт застосунок використовує всередині контейнера.",
    codeExample:
      "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD [\"npm\", \"start\"]",
    skills: ["Docker"],
    keywords: ["#dockerfile"],
    difficulty: 4,
    rating: 4,
  },
  {
    question: "Навіщо потрібен docker-compose?",
    shortAnswer:
      "`docker-compose` дозволяє описати і запускати кілька взаємопов'язаних контейнерів (наприклад, застосунок + база даних) одним конфігураційним файлом і однією командою.",
    longAnswer:
      "Замість того щоб вручну запускати кожен контейнер окремими `docker run` командами з довгими списками параметрів, `docker-compose.yml` декларативно описує всі сервіси, їхні образи, змінні середовища, порти, томи (volumes) і мережеві залежності між ними. Команда `docker compose up` піднімає всю інфраструктуру одразу, а `docker compose down` — коректно її зупиняє й прибирає, що значно спрощує локальну розробку.",
    codeExample:
      "services:\n  web:\n    build: .\n    ports: [\"3000:3000\"]\n    depends_on: [db]\n  db:\n    image: postgres:16",
    skills: ["Docker"],
    keywords: ["#docker-compose"],
    difficulty: 3,
    rating: 3,
  },

  // ---------------------------------------------------------- Kubernetes --
  {
    question: "Що таке Pod у Kubernetes?",
    shortAnswer:
      "Pod — найменша розгортувана одиниця в Kubernetes: обгортка над одним або кількома контейнерами, які поділяють мережу та сховище.",
    longAnswer:
      "Контейнери всередині одного Pod-а завжди плануються на одну і ту ж ноду, поділяють один IP-адрес і простір портів, а також можуть спілкуватися через `localhost`. Зазвичай Pod містить один основний контейнер, але може мати додаткові sidecar-контейнери (наприклад, для логування чи проксі). Kubernetes рідко керує Pod-ами напряму — зазвичай це роблять через вищі абстракції на кшталт Deployment, які відповідають за їх створення, масштабування і перезапуск.",
    codeExample:
      "apiVersion: v1\nkind: Pod\nmetadata:\n  name: my-app\nspec:\n  containers:\n    - name: app\n      image: myapp:latest",
    skills: ["Kubernetes"],
    keywords: ["#pod"],
    difficulty: 4,
    rating: 4,
  },
  {
    question: "У чому різниця між Deployment і ReplicaSet?",
    shortAnswer:
      "ReplicaSet підтримує задану кількість однакових Pod-ів у робочому стані, а Deployment керує ReplicaSet-ами, додаючи можливість оновлень версій, роллбеків та історії змін.",
    longAnswer:
      "Напряму створювати ReplicaSet вручну зазвичай не потрібно — Deployment робить це автоматично і додає декларативний спосіб оновлення застосунку: при зміні образу Deployment створює новий ReplicaSet і поступово переносить трафік на нові Pod-и (rolling update), зберігаючи попередній ReplicaSet для можливого відкату (`kubectl rollout undo`). Це робить Deployment основним і найчастіше використовуваним ресурсом для запуску stateless-застосунків.",
    codeExample:
      "kubectl scale deployment my-app --replicas=3\nkubectl rollout undo deployment my-app",
    skills: ["Kubernetes"],
    keywords: ["#deployment", "#replicaset"],
    difficulty: 5,
    rating: 4,
  },
  {
    question: "Для чого потрібен Service в Kubernetes і які є його типи?",
    shortAnswer:
      "Service надає стабільну мережеву точку доступу до групи Pod-ів, оскільки самі Pod-и ефемерні і їхні IP постійно змінюються.",
    longAnswer:
      "Основні типи: `ClusterIP` (за замовчуванням) — доступний лише всередині кластера; `NodePort` — відкриває фіксований порт на кожній ноді кластера для зовнішнього доступу; `LoadBalancer` — створює зовнішній балансувальник навантаження у хмарного провайдера, який направляє трафік у кластер. Service знаходить потрібні Pod-и через селектори лейблів (labels) і автоматично балансує трафік між усіма Pod-ами, що відповідають цим лейблам, незалежно від того, скільки разів вони були перестворені.",
    codeExample:
      "apiVersion: v1\nkind: Service\nspec:\n  selector:\n    app: my-app\n  ports:\n    - port: 80\n      targetPort: 3000\n  type: LoadBalancer",
    skills: ["Kubernetes"],
    keywords: ["#service", "#loadbalancer"],
    difficulty: 5,
    rating: 3,
  },

  // -------------------------------------------------------------- CI/CD ---
  {
    question:
      "У чому різниця між Continuous Integration, Continuous Delivery та Continuous Deployment?",
    shortAnswer:
      "CI — автоматичне збирання і тестування коду при кожному коміті; Continuous Delivery готує реліз до розгортання автоматично, але деплой запускає людина; Continuous Deployment деплоїть у продакшн повністю автоматично.",
    longAnswer:
      "Continuous Integration означає, що розробники часто інтегрують зміни в спільну гілку, а автоматизована система одразу збирає проєкт і запускає тести, щоб швидко виявляти конфлікти й регресії. Continuous Delivery розширює це: після успішних тестів створюється готовий до випуску артефакт, і команда може випустити його в будь-який момент одним кліком. Continuous Deployment іде ще далі — кожна зміна, що пройшла всі перевірки, автоматично потрапляє у продакшн без ручного втручання.",
    codeExample: undefined,
    skills: ["CI/CD"],
    keywords: ["#ci", "#cd", "#pipeline"],
    difficulty: 3,
    rating: 4,
  },
  {
    question: "З яких етапів зазвичай складається CI/CD pipeline?",
    shortAnswer:
      "Типовий pipeline включає стадії: build (збірка), test (юніт/інтеграційні тести), lint/quality-перевірки, а потім deploy у staging та/або production.",
    longAnswer:
      "Кожна стадія (stage) виконується послідовно чи паралельно і має «прохідну» умову — якщо якась стадія падає (наприклад, тести не пройшли), pipeline зупиняється і зміни не потрапляють далі. Це реалізується у файлах конфігурації CI-систем (GitHub Actions, GitLab CI, Jenkins), де кожна стадія описується як job з певними командами та залежностями між ними.",
    codeExample:
      "jobs:\n  build:\n    steps: [npm ci, npm run build]\n  test:\n    needs: build\n    steps: [npm test]\n  deploy:\n    needs: test\n    steps: [npm run deploy]",
    skills: ["CI/CD"],
    keywords: ["#stages", "#jobs"],
    difficulty: 3,
    rating: 3,
  },
  {
    question: "Навіщо в CI/CD pipeline використовують кешування та артефакти?",
    shortAnswer:
      "Кешування (наприклад, залежностей `node_modules`) прискорює повторні запуски pipeline, а артефакти передають результати однієї стадії (наприклад, зібраний застосунок) іншій, щоб не пересобирати його заново.",
    longAnswer:
      "Без кешування кожен запуск pipeline завантажує всі залежності з нуля, що значно збільшує час виконання і навантаження на мережу. Кеш зберігається між запусками за ключем (часто хешем lock-файлу) і використовується повторно, поки залежності не зміняться. Артефакти — це файли, згенеровані на одній стадії (наприклад, зібраний бандл на стадії `build`), які потрібні на наступних стадіях (`test`, `deploy`); вони передаються між job-ами через сховище CI-системи, а не пересобираються заново, що економить час і гарантує, що деплоїться саме той білд, який пройшов тести.",
    codeExample: undefined,
    skills: ["CI/CD"],
    keywords: ["#cache", "#artifacts"],
    difficulty: 4,
    rating: 2,
  },

  // ------------------------------------------------------------ Webpack ---
  {
    question: "Що таке Webpack і навіщо потрібен бандлер?",
    shortAnswer:
      "Webpack — це модульний бандлер, який об'єднує безліч файлів (JS, CSS, зображення) в оптимізовані бандли для браузера, аналізуючи граф залежностей між ними.",
    longAnswer:
      "Сучасні застосунки складаються з сотень модулів, які браузер неефективно завантажувати окремими запитами. Webpack починає з точки входу (`entry`), будує граф усіх залежностей (`import`/`require`) і на виході генерує один або кілька оптимізованих файлів (`output`) — з мінімізацією, tree-shaking (видаленням невикористаного коду) і поділом на чанки для швидшого завантаження.",
    codeExample:
      "module.exports = {\n  entry: './src/index.js',\n  output: { filename: 'bundle.js' },\n};",
    skills: ["Webpack"],
    keywords: ["#bundler", "#webpack"],
    difficulty: 4,
    rating: 3,
  },
  {
    question: "У чому різниця між loaders і plugins у Webpack?",
    shortAnswer:
      "Loaders перетворюють вміст окремих файлів перед додаванням їх у граф залежностей (наприклад, CSS чи зображення в JS-модулі), а plugins впливають на весь процес збірки в цілому.",
    longAnswer:
      "Loader застосовується до конкретного типу файлів через `test`-регулярку і працює на рівні окремого модуля — наприклад, `babel-loader` транспілює JSX/ES6+ у сумісний JS, `css-loader` дозволяє імпортувати CSS-файли прямо в JS. Plugin, натомість, має доступ до всього процесу компіляції через хуки життєвого циклу Webpack і може виконувати ширші задачі — генерувати HTML-файл (`HtmlWebpackPlugin`), очищати папку збірки (`CleanWebpackPlugin`) чи екстрактити CSS в окремі файли.",
    codeExample:
      "module: {\n  rules: [{ test: /\\.css$/, use: ['style-loader', 'css-loader'] }],\n},\nplugins: [new HtmlWebpackPlugin()],",
    skills: ["Webpack"],
    keywords: ["#loader", "#plugin"],
    difficulty: 5,
    rating: 3,
  },
  {
    question: "Що таке code splitting і навіщо він потрібен?",
    shortAnswer:
      "Code splitting розділяє один великий бандл на кілька менших чанків, які завантажуються лише тоді, коли справді потрібні — це зменшує початковий час завантаження застосунку.",
    longAnswer:
      "Замість того щоб примушувати користувача завантажувати весь JavaScript застосунку одразу, code splitting дозволяє винести код окремих маршрутів чи важких компонентів в окремі чанки, які підвантажуються лише при переході на відповідну сторінку (lazy loading). У Webpack це реалізується через динамічний `import()`, а в React — через `React.lazy` і `Suspense`, що особливо важливо для великих SPA з десятками сторінок.",
    codeExample:
      "const Analytics = React.lazy(() => import('./pages/Analytics'));\n\n<Suspense fallback={<Spinner />}>\n  <Analytics />\n</Suspense>",
    skills: ["Webpack"],
    keywords: ["#code-splitting", "#lazy-loading"],
    difficulty: 5,
    rating: 3,
  },

  // ------------------------------------------------------------ Networks --
  {
    question: "У чому різниця між протоколами TCP і UDP?",
    shortAnswer:
      "TCP встановлює з'єднання і гарантує доставку та порядок пакетів, а UDP надсилає пакети без встановлення з'єднання і без гарантій доставки, зате швидше.",
    longAnswer:
      "TCP (Transmission Control Protocol) виконує тристороннє рукостискання (three-way handshake) перед передачею даних, підтверджує отримання кожного пакета і повторно надсилає втрачені, гарантуючи цілісність і правильний порядок — це критично для HTTP, передачі файлів, email. UDP (User Datagram Protocol) не встановлює з'єднання і не гарантує нічого з переліченого, зате має значно нижчу затримку, тому використовується там, де швидкість важливіша за надійність — відеодзвінки, онлайн-ігри, DNS-запити.",
    codeExample: undefined,
    skills: ["Networks"],
    keywords: ["#tcp", "#udp"],
    difficulty: 4,
    rating: 4,
  },
  {
    question: "Що відбувається, коли ви вводите URL у браузері і натискаєте Enter?",
    shortAnswer:
      "Браузер послідовно виконує: DNS-резолвінг домену в IP-адресу, встановлення TCP-з'єднання (і TLS для HTTPS), надсилання HTTP-запиту, отримання відповіді від сервера і рендеринг сторінки.",
    longAnswer:
      "Спочатку браузер перевіряє кеш DNS, а якщо запису немає — звертається до DNS-сервера, щоб отримати IP-адресу за доменним іменем. Далі встановлюється TCP-з'єднання через тристороннє рукостискання, а для HTTPS додатково відбувається TLS-рукостискання для узгодження шифрування. Після цього браузер надсилає HTTP-запит, сервер обробляє його і повертає відповідь (HTML, статус-код, заголовки). Отримавши HTML, браузер починає парсити його, будувати DOM і CSSOM, завантажувати додаткові ресурси (CSS, JS, зображення) і, зрештою, рендерити сторінку на екран.",
    codeExample: undefined,
    skills: ["Networks"],
    keywords: ["#dns", "#tcp", "#http", "#rendering"],
    difficulty: 6,
    rating: 5,
  },
  {
    question: "Що таке HTTP-статус-коди і на які основні групи вони поділяються?",
    shortAnswer:
      "Статус-коди повідомляють результат HTTP-запиту і групуються за першою цифрою: 2xx — успіх, 3xx — редирект, 4xx — помилка клієнта, 5xx — помилка сервера.",
    longAnswer:
      "1xx — інформаційні коди (рідко зустрічаються напряму в розробці). 2xx означає, що запит успішно оброблено (`200 OK`, `201 Created`, `204 No Content`). 3xx вказує, що клієнту потрібно перейти за іншою адресою (`301 Moved Permanently`, `304 Not Modified` для кешу). 4xx сигналізує про помилку з боку клієнта — неправильний запит, відсутня авторизація чи ресурс (`400 Bad Request`, `401 Unauthorized`, `404 Not Found`). 5xx означає, що сервер не зміг обробити коректний запит через власну помилку (`500 Internal Server Error`, `503 Service Unavailable`). Розуміння цих груп критичне для дебагу мережевих запитів.",
    codeExample: undefined,
    skills: ["Networks"],
    keywords: ["#http-status", "#http"],
    difficulty: 2,
    rating: 4,
  },
];

export function createQuestion(id, overrides = {}) {
  return {
    id,
    codeExample: undefined,
    keywords: [],
    difficulty: 3,
    rating: 3,
    status: "not_learned",
    favorite: false,
    learnedCount: 0,
    learnedGoal: 3,
    ...overrides,
  };
}

export const questions = rawQuestions.map((q, index) =>
  createQuestion(index + 1, {
    ...q,
    status: "not_learned",
    favorite: false,
    learnedCount: 0,
    learnedGoal: 3,
  })
);
