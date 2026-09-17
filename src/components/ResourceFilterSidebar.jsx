import { Search } from "lucide-react";
import { RESOURCE_SKILLS, RESOURCE_TYPES } from "../data/resources.js";
import { SkillIcon } from "../utils/skillIcons.jsx";

function toggleInArray(array, value) {
  return array.includes(value) ? array.filter((v) => v !== value) : [...array, value];
}

export function ResourceFilterSidebar({ filters, setFilters, resetFilters }) {
  const hasActiveFilters =
    filters.query || filters.types.length > 0 || filters.skills.length > 0;

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
            placeholder="Enter resource..."
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
          />
        </div>
      </div>

      {/* Both chip lists come from the data, not from a fixed vocabulary, so a
          chip that can't match anything never renders. */}
      <div className="filter-group">
        <div className="filter-group__title">Select skill from the list</div>
        <div className="skill-grid">
          {RESOURCE_SKILLS.map((skill) => {
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
        <div className="filter-group__title">Resource types</div>
        <div className="chip-row">
          {RESOURCE_TYPES.map((type) => {
            const active = filters.types.includes(type);
            return (
              <button
                key={type}
                type="button"
                className={"chip" + (active ? " chip--active" : "")}
                onClick={() => setFilters((f) => ({ ...f, types: toggleInArray(f.types, type) }))}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
