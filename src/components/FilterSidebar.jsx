import { Search, Heart } from "lucide-react";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { SKILLS } from "../data/skills.js";
import { SkillIcon } from "../utils/skillIcons.jsx";

const DIFFICULTY_RANGES = ["1-3", "4-6", "7-8", "9-10"];
const RATINGS = [1, 2, 3, 4, 5];

function toggleInArray(array, value) {
  return array.includes(value) ? array.filter((v) => v !== value) : [...array, value];
}

export function FilterSidebar() {
  const { filters, setFilters, resetFilters } = useQuestions();

  const hasActiveFilters =
    filters.query ||
    filters.skills.length > 0 ||
    filters.difficultyRanges.length > 0 ||
    filters.ratings.length > 0 ||
    filters.status !== "all" ||
    filters.favoriteOnly;

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
            placeholder="Enter a query..."
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group__title">Select skill from the list</div>
        <div className="skill-grid">
          {SKILLS.map((skill) => {
            const active = filters.skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                className={"skill-tag" + (active ? " skill-tag--active" : "")}
                onClick={() => setFilters((f) => ({ ...f, skills: toggleInArray(f.skills, skill) }))}
              >
                <SkillIcon skill={skill} size={14} />
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group__title">Question Difficulty</div>
        <div className="chip-row">
          {DIFFICULTY_RANGES.map((range) => {
            const active = filters.difficultyRanges.includes(range);
            return (
              <button
                key={range}
                type="button"
                className={"chip" + (active ? " chip--active" : "")}
                onClick={() =>
                  setFilters((f) => ({ ...f, difficultyRanges: toggleInArray(f.difficultyRanges, range) }))
                }
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group__title">Question Rating</div>
        <div className="chip-row">
          {RATINGS.map((rating) => {
            const active = filters.ratings.includes(rating);
            return (
              <button
                key={rating}
                type="button"
                className={"chip" + (active ? " chip--active" : "")}
                onClick={() => setFilters((f) => ({ ...f, ratings: toggleInArray(f.ratings, rating) }))}
              >
                {rating}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group__title">Status</div>
        <div className="segmented">
          {[
            { value: "not_learned", label: "Unlearned" },
            { value: "learned", label: "Learned" },
            { value: "all", label: "All" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={"segmented__item" + (filters.status === opt.value ? " segmented__item--active" : "")}
              onClick={() => setFilters({ status: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="favorite-toggle">
          <input
            type="checkbox"
            checked={filters.favoriteOnly}
            onChange={(e) => setFilters({ favoriteOnly: e.target.checked })}
          />
          <Heart size={16} fill={filters.favoriteOnly ? "currentColor" : "none"} />
          Favorite only
        </label>
      </div>
    </aside>
  );
}
