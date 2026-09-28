// English UI strings. This file is the fallback catalogue: `t()` resolves a key
// here when the active locale is missing it, so en.js must stay complete.
// Keys are ordered identically in every locale file so the four stay diffable.
export default {
  // Sidebar navigation
  "nav.home": "Home",
  "nav.training": "Training",
  "nav.interview": "Interview",
  "nav.tasks": "Tasks",
  "nav.knowledgeBase": "Knowledge base",
  "nav.resources": "Resources",
  "nav.questions": "Questions",
  "nav.collections": "Collections",
  "nav.analytics": "Analytics",

  // Breadcrumbs
  "breadcrumb.label": "Breadcrumb",
  "breadcrumb.listOfQuestions": "List of questions",
  "breadcrumb.moreDetails": "More details",
  "breadcrumb.notFound": "Not found",

  // Language selector
  "language.label": "Interface language",

  // Home
  "home.title": "Welcome back",
  "home.subtitle": "Keep preparing for technical interviews — step by step.",
  "home.stats.total": "Questions total",
  "home.stats.learned": "Learned",
  "home.stats.favorites": "Favorites",
  "home.stats.skills": "Skills covered",
  "home.links.questionsDesc": "Browse the question and answer bank",
  "home.links.interviewDesc": "An interview simulation with random questions",
  "home.links.analyticsDesc": "Learning progress and statistics",

  // Questions — list and details
  "questions.title": "Questions",
  "questions.pageTitle": "Questions",
  "questions.empty": "No questions match the filters. Try changing the search criteria or add new questions to `questions.js`.",
  "questions.notFound": "Question not found. It may have been removed from `questions.js`.",
  "questions.backToList": "Back to the question list",
  "questions.subtitle": "This question tests your understanding of {skills}",
  "questions.previous": "Previous",
  "questions.next": "Next",
  "questions.position": "{current} of {total}",
  "questions.shortAnswer": "Short answer",
  "questions.longAnswer": "Long answer",
  "questions.learned": "Learned",
  "questions.notLearned": "Not learned",

  // Collections
  "collections.title": "Collections",
  "collections.subtitle": "Your collection of favorite questions.",
  "collections.empty": "No favorite questions yet. Mark a question with the heart in the question list.",

  // Resources
  "resources.title": "Useful IT resources",
  "resources.empty": "No resources match the filters. Try changing the search criteria.",

  // Shared labels
  "common.loadingAnswer": "Loading the answer…",
  "common.rating": "Rating:",
  "common.complexity": "Complexity:",

  // Question actions
  "actions.learn": "Learn",
  "actions.repeat": "Repeat",
  "actions.favorite": "Favorite",
  "actions.unfavorite": "Unfavorite",
  "actions.more": "More",
  "actions.questionActions": "Question actions",

  // Progress sidebar
  "progress.title": "Progress",
  "progress.questionLearned": "Question learned {count} of {goal}",
  "progress.level": "Level:",
  "progress.skills": "Skills:",
  "progress.keywords": "Keywords:",

  // Filters (questions, tasks, resources)
  "filters.title": "Filters",
  "filters.reset": "Reset",
  "filters.queryPlaceholder": "Enter a query...",
  "filters.taskPlaceholder": "Enter a task...",
  "filters.resourcePlaceholder": "Enter resource...",
  "filters.selectSkill": "Select skill from the list",
  "filters.questionDifficulty": "Question Difficulty",
  "filters.questionRating": "Question Rating",
  "filters.status": "Status",
  "filters.statusUnlearned": "Unlearned",
  "filters.statusLearned": "Learned",
  "filters.statusAll": "All",
  "filters.favoriteOnly": "Favorite only",
  "filters.difficulty": "Difficulty",
  "filters.programmingLanguages": "Programming languages",
  "filters.taskCategories": "Task categories",
  "filters.resourceTypes": "Resource types",
  "filters.showLess": "Show less",
  "filters.viewAll": "View all",

  // Analytics
  "analytics.title": "Analytics",
  "analytics.empty": "No questions yet. Add questions to `questions.js` to see statistics.",
  "analytics.overallProgress": "Overall progress",
  "analytics.summary": "Learned {learned} of {total} questions ({percent}%)",
  "analytics.bySkill": "Distribution by topic",
  "analytics.byDifficulty": "Questions by difficulty",
  "analytics.legendLearned": "Learned",
  "analytics.legendRemaining": "Remaining",

  // Interview simulation
  "interview.title": "Interview simulation",
  "interview.empty": "There are no questions to simulate. Add questions to `questions.js`.",
  "interview.showAnswer": "Show the answer",
  "interview.dontKnow": "Don't know",
  "interview.know": "Know",
  "interview.nextRandom": "Next random question",

  // Coding tasks
  "tasks.title": "Coding tasks",
  "tasks.empty": "No tasks match the filters. Try changing the search criteria or add new tasks to `tasks.js`.",
  "tasks.notFound": "Task not found.",
  "tasks.backToList": "Back to the task list",
  "tasks.status.not_started": "Not started",
  "tasks.status.in_progress": "In progress",
  "tasks.status.solved": "Solved",
  "tasks.tab.description": "Description",
  "tasks.tab.result": "Code result",
  "tasks.tab.tests": "Test cases",
  "tasks.run": "Run",
  "tasks.submit": "Submit",
  "tasks.resetToTemplate": "Reset to the template",
  "tasks.editorLabel": "Code editor",
  "tasks.section.condition": "Task:",
  "tasks.section.input": "Input:",
  "tasks.section.output": "Output:",
  "tasks.section.constraints": "Constraints:",
  "tasks.section.example": "Example:",

  // Test results
  "tests.idle": "Run your code with the Run button to see the test results.",
  "tests.running": "Running…",
  "tests.passed": "Passed {passed} of {total}",
  "tests.hiddenTag": "hidden",
  "tests.error": "Error:",
  "tests.expected": "Expected:",
  "tests.received": "Received:",
  "tests.input": "Input:",
  "tests.expects": "Expects:",
  "tests.hiddenNote.one": "+ {count} hidden test runs when the solution is submitted (Submit).",
  "tests.hiddenNote.few": "+ {count} hidden tests run when the solution is submitted (Submit).",
  "tests.hiddenNote.many": "+ {count} hidden tests run when the solution is submitted (Submit).",

  // Code runner errors (produced as codes by the worker, translated here)
  "run.workerFailed": "Could not start the worker: {message}",
  "run.executionError": "Code execution error",
  "run.executionErrorDetail": "Code execution error: {message}",
  "run.timeout": "Execution timed out ({ms} ms). Your code may contain an infinite loop.",
  "run.compileError": "Compilation error: {message}",
  "run.functionNotFound": "Function `{name}` not found. Declare it in the editor.",

  // Pagination
  "pagination.label": "Pagination",
  "pagination.previousPage": "Previous page",
  "pagination.nextPage": "Next page",

  // Code block
  "code.copy": "Copy",
  "code.copied": "Copied",
};
