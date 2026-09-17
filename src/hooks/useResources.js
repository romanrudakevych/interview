import { useCallback, useEffect, useMemo, useState } from "react";
import { resources } from "../data/resources.js";
import { loadResourceFilters, saveResourceFilters } from "../utils/storage.js";

export const DEFAULT_RESOURCE_FILTERS = {
  query: "",
  types: [],
  skills: [],
};

function matchesQuery(resource, query) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return (
    resource.name.toLowerCase().includes(q) ||
    resource.description.toLowerCase().includes(q) ||
    resource.url.toLowerCase().includes(q)
  );
}

export function filterResources(list, filters) {
  return list.filter((resource) => {
    if (!matchesQuery(resource, filters.query)) return false;
    if (filters.types.length > 0 && !filters.types.includes(resource.type)) return false;
    if (filters.skills.length > 0 && !resource.skills.some((s) => filters.skills.includes(s))) {
      return false;
    }
    return true;
  });
}

/**
 * Resources have no learning progress, so unlike questions and tasks there is no
 * provider and no merge step — just the static bank plus persisted filters.
 */
export function useFilteredResources() {
  const [filters, setFiltersState] = useState(() => loadResourceFilters(DEFAULT_RESOURCE_FILTERS));

  useEffect(() => {
    saveResourceFilters(filters);
  }, [filters]);

  const setFilters = useCallback((updater) => {
    setFiltersState((prev) =>
      typeof updater === "function" ? updater(prev) : { ...prev, ...updater }
    );
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_RESOURCE_FILTERS), []);

  const visible = useMemo(() => filterResources(resources, filters), [filters]);

  return { resources: visible, total: resources.length, filters, setFilters, resetFilters };
}
