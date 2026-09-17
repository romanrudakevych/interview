const PROGRESS_KEY = "interview-prep:progress";
const FILTERS_KEY = "interview-prep:filters";
const TASK_PROGRESS_KEY = "interview-prep:tasks";
const TASK_FILTERS_KEY = "interview-prep:task-filters";
const RESOURCE_FILTERS_KEY = "interview-prep:resource-filters";

export function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progressById) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressById));
  } catch {
    // localStorage unavailable (private mode, quota) — progress just won't persist
  }
}

export function loadFilters(defaults) {
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

export function saveFilters(filters) {
  try {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  } catch {
    // ignore
  }
}

// Coding-task progress and filters live under their own keys. Task filters have
// a different shape from question filters, so they must not share FILTERS_KEY.

export function loadTaskProgress() {
  try {
    const raw = localStorage.getItem(TASK_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveTaskProgress(progressById) {
  try {
    localStorage.setItem(TASK_PROGRESS_KEY, JSON.stringify(progressById));
  } catch {
    // localStorage unavailable (private mode, quota) — progress just won't persist
  }
}

export function loadTaskFilters(defaults) {
  try {
    const raw = localStorage.getItem(TASK_FILTERS_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

export function saveTaskFilters(filters) {
  try {
    localStorage.setItem(TASK_FILTERS_KEY, JSON.stringify(filters));
  } catch {
    // ignore
  }
}

// Resources have no learning progress — only their filters are worth persisting.

export function loadResourceFilters(defaults) {
  try {
    const raw = localStorage.getItem(RESOURCE_FILTERS_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

export function saveResourceFilters(filters) {
  try {
    localStorage.setItem(RESOURCE_FILTERS_KEY, JSON.stringify(filters));
  } catch {
    // ignore
  }
}
