import { useMemo } from "react";
import { useTasks } from "../context/TasksContext.jsx";

function matchesQuery(task, query) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const inTitle = task.title.toLowerCase().includes(q);
  const inCategories = task.categories.some((c) => c.toLowerCase().includes(q));
  return inTitle || inCategories;
}

export function filterTasks(tasks, filters) {
  return tasks.filter((task) => {
    if (!matchesQuery(task, filters.query)) return false;

    // Tasks filter on exact difficulty values (1–5), not the range strings
    // questions use.
    if (filters.difficulties.length > 0 && !filters.difficulties.includes(task.difficulty)) {
      return false;
    }

    if (
      filters.languages.length > 0 &&
      !task.languages.some((l) => filters.languages.includes(l))
    ) {
      return false;
    }

    if (
      filters.categories.length > 0 &&
      !task.categories.some((c) => filters.categories.includes(c))
    ) {
      return false;
    }

    return true;
  });
}

export function useFilteredTasks() {
  const { tasks, filters } = useTasks();

  return useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
}
