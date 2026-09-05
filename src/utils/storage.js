const PROGRESS_KEY = "interview-prep:progress";
const FILTERS_KEY = "interview-prep:filters";

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
