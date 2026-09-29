// Russian UI strings. The Russian copy that was hardcoded in TestResults,
// ProgressSidebar, TaskDetailsPage and the code runner is the seed for this
// catalogue; keys mirror en.js exactly.
export default {
  // Sidebar navigation
  "nav.home": "Главная",
  "nav.training": "Тренировка",
  "nav.interview": "Собеседование",
  "nav.tasks": "Задачи",
  "nav.knowledgeBase": "База знаний",
  "nav.resources": "Ресурсы",
  "nav.questions": "Вопросы",
  "nav.collections": "Коллекции",
  "nav.analytics": "Аналитика",

  // Breadcrumbs
  "breadcrumb.label": "Навигационная цепочка",
  "breadcrumb.listOfQuestions": "Список вопросов",
  "breadcrumb.moreDetails": "Подробнее",
  "breadcrumb.notFound": "Не найдено",

  // Language selector
  "language.label": "Язык интерфейса",

  // Home
  "home.title": "С возвращением",
  "home.subtitle": "Продолжай готовиться к техническим собеседованиям — шаг за шагом.",
  "home.stats.total": "Всего вопросов",
  "home.stats.learned": "Изучено",
  "home.stats.favorites": "Избранное",
  "home.stats.skills": "Охвачено технологий",
  "home.links.questionsDesc": "Посмотреть базу вопросов и ответов",
  "home.links.interviewDesc": "Симуляция собеседования со случайными вопросами",
  "home.links.analyticsDesc": "Прогресс обучения и статистика",

  // Questions — list and details
  "questions.title": "Вопросы",
  "questions.pageTitle": "Вопросы",
  "questions.empty": "Нет вопросов, соответствующих фильтрам. Попробуй изменить критерии поиска или добавь новые вопросы в `questions.js`.",
  "questions.notFound": "Вопрос не найден. Возможно, он был удалён из `questions.js`.",
  "questions.loadingIndex": "Загрузка вопросов…",
  "questions.notInLanguage": "Этот вопрос пока недоступен на выбранном языке.",
  "questions.backToList": "К списку вопросов",
  "questions.subtitle": "Этот вопрос проверяет понимание {skills}",
  "questions.previous": "Назад",
  "questions.next": "Далее",
  "questions.position": "{current} из {total}",
  "questions.shortAnswer": "Краткий ответ",
  "questions.longAnswer": "Развёрнутый ответ",
  "questions.learned": "Изучено",
  "questions.notLearned": "Не изучено",

  // Collections
  "collections.title": "Коллекции",
  "collections.subtitle": "Твоя коллекция избранных вопросов.",
  "collections.empty": "Пока нет избранных вопросов. Отметь вопрос сердцем в списке вопросов.",

  // Resources
  "resources.title": "Полезные IT-ресурсы",
  "resources.empty": "Нет ресурсов, соответствующих фильтрам. Попробуй изменить критерии поиска.",

  // Shared labels
  "common.loadingAnswer": "Загрузка ответа…",
  "common.rating": "Рейтинг:",
  "common.complexity": "Сложность:",

  // Question actions
  "actions.learn": "Изучить",
  "actions.repeat": "Повторить",
  "actions.favorite": "В избранное",
  "actions.unfavorite": "Из избранного",
  "actions.more": "Подробнее",
  "actions.questionActions": "Действия с вопросом",

  // Progress sidebar
  "progress.title": "Прогресс",
  "progress.questionLearned": "Вопрос изучен {count} из {goal}",
  "progress.level": "Уровень:",
  "progress.skills": "Технологии:",
  "progress.keywords": "Ключевые слова:",

  // Filters (questions, tasks, resources)
  "filters.title": "Фильтры",
  "filters.reset": "Сбросить",
  "filters.queryPlaceholder": "Введи запрос...",
  "filters.taskPlaceholder": "Введи задачу...",
  "filters.resourcePlaceholder": "Введи ресурс...",
  "filters.selectSkill": "Выбери технологию из списка",
  "filters.questionDifficulty": "Сложность вопроса",
  "filters.questionRating": "Рейтинг вопроса",
  "filters.status": "Статус",
  "filters.statusUnlearned": "Не изученные",
  "filters.statusLearned": "Изученные",
  "filters.statusAll": "Все",
  "filters.favoriteOnly": "Только избранные",
  "filters.difficulty": "Сложность",
  "filters.programmingLanguages": "Языки программирования",
  "filters.taskCategories": "Категории задач",
  "filters.resourceTypes": "Типы ресурсов",
  "filters.showLess": "Показать меньше",
  "filters.viewAll": "Показать все",

  // Analytics
  "analytics.title": "Аналитика",
  "analytics.empty": "Пока нет ни одного вопроса. Добавь вопросы в `questions.js`, чтобы увидеть статистику.",
  "analytics.overallProgress": "Общий прогресс",
  "analytics.summary": "Изучено {learned} из {total} вопросов ({percent}%)",
  "analytics.bySkill": "Распределение по темам",
  "analytics.byDifficulty": "Вопросы по сложности",
  "analytics.legendLearned": "Изучено",
  "analytics.legendRemaining": "Осталось",

  // Interview simulation
  "interview.title": "Симуляция собеседования",
  "interview.empty": "Нет ни одного вопроса для симуляции. Добавь вопросы в `questions.js`.",
  "interview.showAnswer": "Показать ответ",
  "interview.dontKnow": "Не знаю",
  "interview.know": "Знаю",
  "interview.nextRandom": "Следующий случайный вопрос",

  // Coding tasks
  "tasks.title": "Задачи по программированию",
  "tasks.empty": "Нет задач, соответствующих фильтрам. Попробуй изменить критерии поиска или добавь новые задачи в `tasks.js`.",
  "tasks.notFound": "Задача не найдена.",
  "tasks.backToList": "К списку задач",
  "tasks.status.not_started": "Не начата",
  "tasks.status.in_progress": "В процессе",
  "tasks.status.solved": "Решена",
  "tasks.tab.description": "Условие",
  "tasks.tab.result": "Результат кода",
  "tasks.tab.tests": "Тест-кейсы",
  "tasks.run": "Запустить",
  "tasks.submit": "Отправить",
  "tasks.resetToTemplate": "Сбросить к шаблону",
  "tasks.editorLabel": "Редактор кода",
  "tasks.section.condition": "Условие:",
  "tasks.section.input": "Входные данные:",
  "tasks.section.output": "Выходные данные:",
  "tasks.section.constraints": "Ограничения:",
  "tasks.section.example": "Пример:",

  // Test results
  "tests.idle": "Запусти код кнопкой «Запустить», чтобы увидеть результат прогона тестов.",
  "tests.running": "Выполняется…",
  "tests.passed": "Пройдено {passed} из {total}",
  "tests.hiddenTag": "скрытый",
  "tests.error": "Ошибка:",
  "tests.expected": "Ожидалось:",
  "tests.received": "Получено:",
  "tests.input": "Вход:",
  "tests.expects": "Ожидается:",
  "tests.hiddenNote.one": "+ {count} скрытый тест выполняется при отправке решения.",
  "tests.hiddenNote.few": "+ {count} скрытых теста выполняются при отправке решения.",
  "tests.hiddenNote.many": "+ {count} скрытых тестов выполняются при отправке решения.",

  // Code runner errors (produced as codes by the worker, translated here)
  "run.workerFailed": "Не удалось запустить воркер: {message}",
  "run.executionError": "Ошибка выполнения кода",
  "run.executionErrorDetail": "Ошибка выполнения кода: {message}",
  "run.timeout": "Превышено время выполнения ({ms} мс). Возможно, в коде бесконечный цикл.",
  "run.compileError": "Ошибка компиляции: {message}",
  "run.functionNotFound": "Функция `{name}` не найдена. Объяви её в редакторе.",

  // Pagination
  "pagination.label": "Пагинация",
  "pagination.previousPage": "Предыдущая страница",
  "pagination.nextPage": "Следующая страница",

  // Code block
  "code.copy": "Копировать",
  "code.copied": "Скопировано",
};
