// Czech UI strings. Keys mirror en.js exactly.
export default {
  // Sidebar navigation
  "nav.home": "Domů",
  "nav.training": "Trénink",
  "nav.interview": "Pohovor",
  "nav.tasks": "Úlohy",
  "nav.knowledgeBase": "Znalostní báze",
  "nav.resources": "Zdroje",
  "nav.questions": "Otázky",
  "nav.collections": "Kolekce",
  "nav.analytics": "Analytika",

  // Breadcrumbs
  "breadcrumb.label": "Navigační cesta",
  "breadcrumb.listOfQuestions": "Seznam otázek",
  "breadcrumb.moreDetails": "Podrobnosti",
  "breadcrumb.notFound": "Nenalezeno",

  // Language selector
  "language.label": "Jazyk rozhraní",

  // Home
  "home.title": "Vítej zpátky",
  "home.subtitle": "Pokračuj v přípravě na technické pohovory — krok za krokem.",
  "home.stats.total": "Otázek celkem",
  "home.stats.learned": "Naučeno",
  "home.stats.favorites": "Oblíbené",
  "home.stats.skills": "Pokrytých technologií",
  "home.links.questionsDesc": "Prohlédnout databázi otázek a odpovědí",
  "home.links.interviewDesc": "Simulace pohovoru s náhodnými otázkami",
  "home.links.analyticsDesc": "Pokrok v učení a statistiky",

  // Questions — list and details
  "questions.title": "Otázky",
  "questions.pageTitle": "Otázky",
  "questions.empty": "Žádné otázky neodpovídají filtrům. Zkus změnit kritéria hledání nebo přidej nové otázky do `questions.js`.",
  "questions.notFound": "Otázka nenalezena. Možná byla odstraněna z `questions.js`.",
  "questions.backToList": "Zpět na seznam otázek",
  "questions.subtitle": "Tato otázka zkouší porozumění {skills}",
  "questions.previous": "Předchozí",
  "questions.next": "Další",
  "questions.position": "{current} z {total}",
  "questions.shortAnswer": "Krátká odpověď",
  "questions.longAnswer": "Podrobná odpověď",
  "questions.learned": "Naučeno",
  "questions.notLearned": "Nenaučeno",

  // Collections
  "collections.title": "Kolekce",
  "collections.subtitle": "Tvoje kolekce oblíbených otázek.",
  "collections.empty": "Zatím žádné oblíbené otázky. Označ otázku srdcem v seznamu otázek.",

  // Resources
  "resources.title": "Užitečné IT zdroje",
  "resources.empty": "Žádné zdroje neodpovídají filtrům. Zkus změnit kritéria hledání.",

  // Shared labels
  "common.loadingAnswer": "Načítání odpovědi…",
  "common.rating": "Hodnocení:",
  "common.complexity": "Složitost:",

  // Question actions
  "actions.learn": "Naučit",
  "actions.repeat": "Zopakovat",
  "actions.favorite": "Do oblíbených",
  "actions.unfavorite": "Z oblíbených",
  "actions.more": "Podrobnosti",
  "actions.questionActions": "Akce s otázkou",

  // Progress sidebar
  "progress.title": "Pokrok",
  "progress.questionLearned": "Otázka naučena {count} z {goal}",
  "progress.level": "Úroveň:",
  "progress.skills": "Technologie:",
  "progress.keywords": "Klíčová slova:",

  // Filters (questions, tasks, resources)
  "filters.title": "Filtry",
  "filters.reset": "Zrušit",
  "filters.queryPlaceholder": "Zadej dotaz...",
  "filters.taskPlaceholder": "Zadej úlohu...",
  "filters.resourcePlaceholder": "Zadej zdroj...",
  "filters.selectSkill": "Vyber technologii ze seznamu",
  "filters.questionDifficulty": "Obtížnost otázky",
  "filters.questionRating": "Hodnocení otázky",
  "filters.status": "Stav",
  "filters.statusUnlearned": "Nenaučené",
  "filters.statusLearned": "Naučené",
  "filters.statusAll": "Všechny",
  "filters.favoriteOnly": "Jen oblíbené",
  "filters.difficulty": "Obtížnost",
  "filters.programmingLanguages": "Programovací jazyky",
  "filters.taskCategories": "Kategorie úloh",
  "filters.resourceTypes": "Typy zdrojů",
  "filters.showLess": "Zobrazit méně",
  "filters.viewAll": "Zobrazit vše",

  // Analytics
  "analytics.title": "Analytika",
  "analytics.empty": "Zatím žádná otázka. Přidej otázky do `questions.js`, aby se zobrazily statistiky.",
  "analytics.overallProgress": "Celkový pokrok",
  "analytics.summary": "Naučeno {learned} z {total} otázek ({percent}%)",
  "analytics.bySkill": "Rozdělení podle témat",
  "analytics.byDifficulty": "Otázky podle obtížnosti",
  "analytics.legendLearned": "Naučeno",
  "analytics.legendRemaining": "Zbývá",

  // Interview simulation
  "interview.title": "Simulace pohovoru",
  "interview.empty": "Není žádná otázka pro simulaci. Přidej otázky do `questions.js`.",
  "interview.showAnswer": "Zobrazit odpověď",
  "interview.dontKnow": "Nevím",
  "interview.know": "Vím",
  "interview.nextRandom": "Další náhodná otázka",

  // Coding tasks
  "tasks.title": "Programovací úlohy",
  "tasks.empty": "Žádné úlohy neodpovídají filtrům. Zkus změnit kritéria hledání nebo přidej nové úlohy do `tasks.js`.",
  "tasks.notFound": "Úloha nenalezena.",
  "tasks.backToList": "Zpět na seznam úloh",
  "tasks.status.not_started": "Nezahájeno",
  "tasks.status.in_progress": "Probíhá",
  "tasks.status.solved": "Vyřešeno",
  "tasks.tab.description": "Zadání",
  "tasks.tab.result": "Výsledek kódu",
  "tasks.tab.tests": "Testovací případy",
  "tasks.run": "Spustit",
  "tasks.submit": "Odeslat",
  "tasks.resetToTemplate": "Obnovit šablonu",
  "tasks.editorLabel": "Editor kódu",
  "tasks.section.condition": "Zadání:",
  "tasks.section.input": "Vstupní data:",
  "tasks.section.output": "Výstupní data:",
  "tasks.section.constraints": "Omezení:",
  "tasks.section.example": "Příklad:",

  // Test results
  "tests.idle": "Spusť kód tlačítkem „Spustit“, aby se zobrazil výsledek testů.",
  "tests.running": "Probíhá…",
  "tests.passed": "Prošlo {passed} z {total}",
  "tests.hiddenTag": "skrytý",
  "tests.error": "Chyba:",
  "tests.expected": "Očekáváno:",
  "tests.received": "Získáno:",
  "tests.input": "Vstup:",
  "tests.expects": "Očekává se:",
  "tests.hiddenNote.one": "+ {count} skrytý test se spustí při odeslání řešení.",
  "tests.hiddenNote.few": "+ {count} skryté testy se spustí při odeslání řešení.",
  "tests.hiddenNote.many": "+ {count} skrytých testů se spustí při odeslání řešení.",

  // Code runner errors (produced as codes by the worker, translated here)
  "run.workerFailed": "Nepodařilo se spustit worker: {message}",
  "run.executionError": "Chyba při vykonávání kódu",
  "run.executionErrorDetail": "Chyba při vykonávání kódu: {message}",
  "run.timeout": "Překročen čas vykonávání ({ms} ms). Kód možná obsahuje nekonečnou smyčku.",
  "run.compileError": "Chyba kompilace: {message}",
  "run.functionNotFound": "Funkce `{name}` nebyla nalezena. Deklaruj ji v editoru.",

  // Pagination
  "pagination.label": "Stránkování",
  "pagination.previousPage": "Předchozí stránka",
  "pagination.nextPage": "Další stránka",

  // Code block
  "code.copy": "Kopírovat",
  "code.copied": "Zkopírováno",
};
