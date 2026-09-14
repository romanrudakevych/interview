import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { tasks as staticTasks } from "../data/tasks.js";
import {
  loadTaskProgress,
  saveTaskProgress,
  loadTaskFilters,
  saveTaskFilters,
} from "../utils/storage.js";

const TasksContext = createContext(null);

export const DEFAULT_TASK_FILTERS = {
  query: "",
  difficulties: [], // e.g. [1, 3, 5] — exact values, unlike questions' ranges
  languages: [],
  categories: [],
};

function progressDefaults(task) {
  return {
    status: task.status,
    code: task.code,
    solved: false,
  };
}

export function TasksProvider({ children }) {
  const [progressById, setProgressById] = useState(() => loadTaskProgress());
  const [filters, setFiltersState] = useState(() => loadTaskFilters(DEFAULT_TASK_FILTERS));

  useEffect(() => {
    saveTaskProgress(progressById);
  }, [progressById]);

  useEffect(() => {
    saveTaskFilters(filters);
  }, [filters]);

  const tasks = useMemo(() => {
    return staticTasks.map((t) => {
      const saved = progressById[t.id];
      const merged = saved ? { ...t, ...saved } : { ...t, ...progressDefaults(t) };
      // Derive status rather than trusting a stored field, so the badge can
      // never drift from the underlying solved flag / saved code.
      if (merged.solved) merged.status = "solved";
      else if (merged.code != null && merged.code !== t.starterCode) merged.status = "in_progress";
      else merged.status = "not_started";
      return merged;
    });
  }, [progressById]);

  const updateTaskProgress = useCallback((id, updater) => {
    setProgressById((prev) => {
      const task = staticTasks.find((t) => t.id === id);
      if (!task) return prev;
      const current = prev[id] ?? progressDefaults(task);
      const next = typeof updater === "function" ? updater(current) : { ...current, ...updater };
      return { ...prev, [id]: next };
    });
  }, []);

  const setFilters = useCallback((updater) => {
    setFiltersState((prev) => (typeof updater === "function" ? updater(prev) : { ...prev, ...updater }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_TASK_FILTERS), []);

  const value = useMemo(
    () => ({ tasks, updateTaskProgress, filters, setFilters, resetFilters }),
    [tasks, updateTaskProgress, filters, setFilters, resetFilters]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within a TasksProvider");
  return ctx;
}
