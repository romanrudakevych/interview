// Ukrainian UI strings. Seeded from the copy that was hardcoded in the pages
// before the i18n pass; keys mirror en.js exactly.
export default {
  // Sidebar navigation
  "nav.home": "Головна",
  "nav.training": "Тренування",
  "nav.interview": "Співбесіда",
  "nav.tasks": "Завдання",
  "nav.knowledgeBase": "База знань",
  "nav.resources": "Ресурси",
  "nav.questions": "Питання",
  "nav.collections": "Колекції",
  "nav.analytics": "Аналітика",

  // Breadcrumbs
  "breadcrumb.label": "Навігаційний шлях",
  "breadcrumb.listOfQuestions": "Список питань",
  "breadcrumb.moreDetails": "Детальніше",
  "breadcrumb.notFound": "Не знайдено",

  // Language selector
  "language.label": "Мова інтерфейсу",

  // Home
  "home.title": "З поверненням",
  "home.subtitle": "Продовжуй готуватись до технічних співбесід — крок за кроком.",
  "home.stats.total": "Усього питань",
  "home.stats.learned": "Вивчено",
  "home.stats.favorites": "Обрані",
  "home.stats.skills": "Охоплено технологій",
  "home.links.questionsDesc": "Переглянути базу питань і відповідей",
  "home.links.interviewDesc": "Симуляція співбесіди з випадковими питаннями",
  "home.links.analyticsDesc": "Прогрес навчання і статистика",

  // Questions — list and details
  "questions.title": "Питання",
  "questions.pageTitle": "Питання",
  "questions.empty": "Немає питань, що відповідають фільтрам. Спробуй змінити критерії пошуку або додай нові питання у `questions.js`.",
  "questions.notFound": "Питання не знайдено. Можливо, воно було видалене з `questions.js`.",
  "questions.loadingIndex": "Завантаження питань…",
  "questions.notInLanguage": "Це питання поки недоступне вибраною мовою.",
  "questions.backToList": "До списку питань",
  "questions.subtitle": "Цей запит перевіряє розуміння {skills}",
  "questions.previous": "Назад",
  "questions.next": "Далі",
  "questions.position": "{current} з {total}",
  "questions.shortAnswer": "Коротка відповідь",
  "questions.longAnswer": "Розгорнута відповідь",
  "questions.learned": "Вивчено",
  "questions.notLearned": "Не вивчено",

  // Collections
  "collections.title": "Колекції",
  "collections.subtitle": "Твоя колекція обраних питань.",
  "collections.empty": "Ще немає обраних питань. Познач питання серцем у списку питань.",

  // Resources
  "resources.title": "Корисні IT-ресурси",
  "resources.empty": "Немає ресурсів, що відповідають фільтрам. Спробуй змінити критерії пошуку.",

  // Shared labels
  "common.loadingAnswer": "Завантаження відповіді…",
  "common.rating": "Рейтинг:",
  "common.complexity": "Складність:",

  // Question actions
  "actions.learn": "Вивчити",
  "actions.repeat": "Повторити",
  "actions.favorite": "В обрані",
  "actions.unfavorite": "З обраних",
  "actions.more": "Детальніше",
  "actions.questionActions": "Дії з питанням",

  // Progress sidebar
  "progress.title": "Прогрес",
  "progress.questionLearned": "Питання вивчено {count} з {goal}",
  "progress.level": "Рівень:",
  "progress.skills": "Технології:",
  "progress.keywords": "Ключові слова:",

  // Filters (questions, tasks, resources)
  "filters.title": "Фільтри",
  "filters.reset": "Скинути",
  "filters.queryPlaceholder": "Введи запит...",
  "filters.taskPlaceholder": "Введи завдання...",
  "filters.resourcePlaceholder": "Введи ресурс...",
  "filters.selectSkill": "Вибери технологію зі списку",
  "filters.questionDifficulty": "Складність питання",
  "filters.questionRating": "Рейтинг питання",
  "filters.status": "Статус",
  "filters.statusUnlearned": "Не вивчені",
  "filters.statusLearned": "Вивчені",
  "filters.statusAll": "Усі",
  "filters.favoriteOnly": "Лише обрані",
  "filters.difficulty": "Складність",
  "filters.programmingLanguages": "Мови програмування",
  "filters.taskCategories": "Категорії завдань",
  "filters.resourceTypes": "Типи ресурсів",
  "filters.showLess": "Показати менше",
  "filters.viewAll": "Показати всі",

  // Analytics
  "analytics.title": "Аналітика",
  "analytics.empty": "Ще немає жодного питання. Додай питання у `questions.js`, щоб побачити статистику.",
  "analytics.overallProgress": "Загальний прогрес",
  "analytics.summary": "Вивчено {learned} з {total} питань ({percent}%)",
  "analytics.bySkill": "Розподіл по темах",
  "analytics.byDifficulty": "Питання за складністю",
  "analytics.legendLearned": "Вивчено",
  "analytics.legendRemaining": "Залишилось",

  // Interview simulation
  "interview.title": "Симуляція співбесіди",
  "interview.empty": "Немає жодного питання для симуляції. Додай питання у `questions.js`.",
  "interview.showAnswer": "Показати відповідь",
  "interview.dontKnow": "Не знаю",
  "interview.know": "Знаю",
  "interview.nextRandom": "Наступне випадкове питання",

  // Coding tasks
  "tasks.title": "Завдання з програмування",
  "tasks.empty": "Немає завдань, що відповідають фільтрам. Спробуй змінити критерії пошуку або додай нові завдання у `tasks.js`.",
  "tasks.notFound": "Завдання не знайдено.",
  "tasks.backToList": "До списку завдань",
  "tasks.status.not_started": "Не розпочато",
  "tasks.status.in_progress": "У процесі",
  "tasks.status.solved": "Розв'язано",
  "tasks.tab.description": "Умова",
  "tasks.tab.result": "Результат коду",
  "tasks.tab.tests": "Тест-кейси",
  "tasks.run": "Запустити",
  "tasks.submit": "Надіслати",
  "tasks.resetToTemplate": "Скинути до шаблону",
  "tasks.editorLabel": "Редактор коду",
  "tasks.section.condition": "Умова:",
  "tasks.section.input": "Вхідні дані:",
  "tasks.section.output": "Вихідні дані:",
  "tasks.section.constraints": "Обмеження:",
  "tasks.section.example": "Приклад:",

  // Test results
  "tests.idle": "Запусти код кнопкою «Запустити», щоб побачити результат прогону тестів.",
  "tests.running": "Виконується…",
  "tests.passed": "Пройдено {passed} з {total}",
  "tests.hiddenTag": "прихований",
  "tests.error": "Помилка:",
  "tests.expected": "Очікувалось:",
  "tests.received": "Отримано:",
  "tests.input": "Вхід:",
  "tests.expects": "Очікується:",
  "tests.hiddenNote.one": "+ {count} прихований тест виконується при надсиланні розв'язку.",
  "tests.hiddenNote.few": "+ {count} прихованих тести виконуються при надсиланні розв'язку.",
  "tests.hiddenNote.many": "+ {count} прихованих тестів виконуються при надсиланні розв'язку.",

  // Code runner errors (produced as codes by the worker, translated here)
  "run.workerFailed": "Не вдалося запустити воркер: {message}",
  "run.executionError": "Помилка виконання коду",
  "run.executionErrorDetail": "Помилка виконання коду: {message}",
  "run.timeout": "Перевищено час виконання ({ms} мс). Можливо, у коді безкінечний цикл.",
  "run.compileError": "Помилка компіляції: {message}",
  "run.functionNotFound": "Функцію `{name}` не знайдено. Оголоси її в редакторі.",

  // Pagination
  "pagination.label": "Пагінація",
  "pagination.previousPage": "Попередня сторінка",
  "pagination.nextPage": "Наступна сторінка",

  // Code block
  "code.copy": "Копіювати",
  "code.copied": "Скопійовано",
};
