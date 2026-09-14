import { useState } from "react";
import { Search } from "lucide-react";
import { useTasks } from "../context/TasksContext.jsx";
import { TASK_CATEGORIES, TASK_LANGUAGES } from "../data/tasks.js";
import { SkillIcon } from "../utils/skillIcons.jsx";

const DIFFICULTIES = [1, 2, 3, 4, 5];
const COLLAPSED_CATEGORY_COUNT = 4;

function toggleInArray(array, value) {
  return array.includes(value) ? array.filter((v) => v !== value) : [...array, value];
}

export function TaskFilterSidebar() {
  const { filters, setFilters, resetFilters } = useTasks();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const hasActiveFilters =
    filters.query ||
    filters.difficulties.length > 0 ||
    filters.languages.length > 0 ||
    filters.categories.length > 0;

  const visibleCategories = showAllCategories
    ? TASK_CATEGORIES
    : TASK_CATEGORIES.slice(0, COLLAPSED_CATEGORY_COUNT);

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button type="button" className="filter-sidebar__reset" onClick={resetFilters}>
            Reset
          </button>
        )}
      </div>

      <div className="filter-group">
        <div className="search-input">
          <Search size={16} />
          <input
            type="text"
            placeholder="Enter a task..."
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group__title">Difficulty</div>
        <div className="chip-row">
          {DIFFICULTIES.map((level) => {
            const active = filters.difficulties.includes(level);
            return (
              <button
                key={level}
                type="button"
                className={
                  `difficulty-badge difficulty-badge--${level}` +
                  (active ? " difficulty-badge--active" : "")
                }
                onClick={() =>
                  setFilters((f) => ({ ...f, difficulties: toggleInArray(f.difficulties, level) }))
                }
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group__title">Programming languages</div>
        <div className="skill-grid">
          {TASK_LANGUAGES.map((lang) => {
            const active = filters.languages.includes(lang);
            return (
              <button
                key={lang}
                type="button"
                className={"skill-tag" + (active ? " skill-tag--active" : "")}
                onClick={() =>
                  setFilters((f) => ({ ...f, languages: toggleInArray(f.languages, lang) }))
                }
              >
                <SkillIcon skill={lang} size={14} />
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group__title">Task categories</div>
        <div className="chip-row">
          {visibleCategories.map((category) => {
            const active = filters.categories.includes(category);
            return (
              <button
                key={category}
                type="button"
                className={"chip" + (active ? " chip--active" : "")}
                onClick={() =>
                  setFilters((f) => ({ ...f, categories: toggleInArray(f.categories, category) }))
                }
              >
                {category}
              </button>
            );
          })}
        </div>
        {TASK_CATEGORIES.length > COLLAPSED_CATEGORY_COUNT && (
          <button
            type="button"
            className="filter-group__more"
            onClick={() => setShowAllCategories((v) => !v)}
          >
            {showAllCategories ? "Show less" : "View all"}
          </button>
        )}
      </div>
    </aside>
  );
}
