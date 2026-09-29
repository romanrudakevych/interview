import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loadProgress, saveProgress, loadFilters, saveFilters } from "../utils/storage.js";
import { useI18n } from "../i18n/index.jsx";

// One generated index per language — see scripts/build-questions-data.mjs. The
// Russian index alone is ~650 KB, so these load on demand rather than through a
// static import: only the active language's index is ever fetched.
//
// import.meta.glob is the form Vite rewrites for the `/interview/` base; a
// hand-built fetch would 404 on Pages, same trap as the Web Worker URL.
const indexLoaders = import.meta.glob("../data/generated/index.*.json");

const QuestionsContext = createContext(null);

// Stable identity so the `questions` memo doesn't recompute on every render.
const EMPTY_INDEX = [];

// The same defaults createQuestion() applies in src/data/questions.js. Real
// values live in localStorage, so the index never carries progress.
const PROGRESS_DEFAULTS = {
  status: "not_learned",
  favorite: false,
  learnedCount: 0,
  learnedGoal: 3,
};

export const DEFAULT_FILTERS = {
  query: "",
  skills: [],
  difficultyRanges: [], // e.g. ["1-3", "4-6"]
  ratings: [], // e.g. [1, 3, 5]
  status: "all", // "all" | "learned" | "not_learned"
  favoriteOnly: false,
};

function progressDefaults(question) {
  return {
    status: question.status,
    favorite: question.favorite,
    learnedCount: question.learnedCount,
    learnedGoal: question.learnedGoal,
  };
}

export function QuestionsProvider({ children }) {
  // LanguageProvider wraps this one in App.jsx, so useI18n is safe here.
  const { lang } = useI18n();

  const [progressById, setProgressById] = useState(() => loadProgress());
  const [filters, setFiltersState] = useState(() => loadFilters(DEFAULT_FILTERS));
  // Tagged with the language it belongs to, so a result left over from the
  // previous language is ignored during render rather than cleared by a
  // synchronous setState (which would cascade an extra render).
  const [loaded, setLoaded] = useState(null);

  useEffect(() => {
    saveProgress(progressById);
  }, [progressById]);

  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  useEffect(() => {
    const loader = indexLoaders[`../data/generated/index.${lang}.json`];
    if (!loader) return;

    let active = true;
    loader().then((mod) => {
      if (active) setLoaded({ lang, index: mod.default ?? mod });
    });

    // Guards against a load landing after the language moved on again.
    return () => {
      active = false;
    };
  }, [lang]);

  // A language with no generated index has no questions rather than an error,
  // and that is knowable during render — no effect needed.
  const hasIndex = Boolean(indexLoaders[`../data/generated/index.${lang}.json`]);
  const index = !hasIndex ? EMPTY_INDEX : loaded?.lang === lang ? loaded.index : null;

  const questions = useMemo(() => {
    if (!index) return [];
    return index.map((q) => {
      const base = { ...q, ...PROGRESS_DEFAULTS };
      const saved = progressById[q.id];
      const merged = saved ? { ...base, ...saved } : { ...base, ...progressDefaults(base) };
      // Derived, never trusted from storage, so the "Learned" badge can't drift
      // out of sync with the count. Ids are identical across languages, so
      // switching language never disturbs saved progress.
      merged.status = merged.learnedCount >= merged.learnedGoal ? "learned" : "not_learned";
      return merged;
    });
  }, [index, progressById]);

  const updateProgress = useCallback((id, updater) => {
    setProgressById((prev) => {
      const current = prev[id] ?? { ...PROGRESS_DEFAULTS };
      const next = typeof updater === "function" ? updater(current) : { ...current, ...updater };
      return { ...prev, [id]: next };
    });
  }, []);

  const setFilters = useCallback((updater) => {
    setFiltersState((prev) => (typeof updater === "function" ? updater(prev) : { ...prev, ...updater }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  const value = useMemo(
    () => ({ questions, loading: index === null, updateProgress, filters, setFilters, resetFilters }),
    [questions, index, updateProgress, filters, setFilters, resetFilters]
  );

  return <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>;
}

export function useQuestions() {
  const ctx = useContext(QuestionsContext);
  if (!ctx) throw new Error("useQuestions must be used within a QuestionsProvider");
  return ctx;
}
