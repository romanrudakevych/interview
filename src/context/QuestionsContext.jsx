import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { questions as staticQuestions } from "../data/questions.js";
import { loadProgress, saveProgress, loadFilters, saveFilters } from "../utils/storage.js";

const QuestionsContext = createContext(null);

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
  const [progressById, setProgressById] = useState(() => loadProgress());
  const [filters, setFiltersState] = useState(() => loadFilters(DEFAULT_FILTERS));

  useEffect(() => {
    saveProgress(progressById);
  }, [progressById]);

  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  const questions = useMemo(() => {
    return staticQuestions.map((q) => {
      const saved = progressById[q.id];
      const merged = saved ? { ...q, ...saved } : { ...q, ...progressDefaults(q) };
      merged.status = merged.learnedCount >= merged.learnedGoal ? "learned" : "not_learned";
      return merged;
    });
  }, [progressById]);

  const updateProgress = useCallback((id, updater) => {
    setProgressById((prev) => {
      const question = staticQuestions.find((q) => q.id === id);
      if (!question) return prev;
      const current = prev[id] ?? progressDefaults(question);
      const next = typeof updater === "function" ? updater(current) : { ...current, ...updater };
      return { ...prev, [id]: next };
    });
  }, []);

  const setFilters = useCallback((updater) => {
    setFiltersState((prev) => (typeof updater === "function" ? updater(prev) : { ...prev, ...updater }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  const value = useMemo(
    () => ({ questions, updateProgress, filters, setFilters, resetFilters }),
    [questions, updateProgress, filters, setFilters, resetFilters]
  );

  return <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>;
}

export function useQuestions() {
  const ctx = useContext(QuestionsContext);
  if (!ctx) throw new Error("useQuestions must be used within a QuestionsProvider");
  return ctx;
}
