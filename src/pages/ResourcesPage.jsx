import { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { ResourceCard } from "../components/ResourceCard.jsx";
import { ResourceFilterSidebar } from "../components/ResourceFilterSidebar.jsx";
import { useFilteredResources } from "../hooks/useResources.js";

const PAGE_SIZE = 10;

export function ResourcesPage() {
  const { resources, filters, setFilters, resetFilters } = useFilteredResources();
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(resources.length / PAGE_SIZE));
  // Filters can shrink the list past the stored page, so clamp on read rather
  // than correcting state in an effect (which would cascade a render).
  const currentPage = Math.min(page, pageCount);
  const visible = resources.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "Knowledge base" }, { label: "Resources" }]} />
      <div className="page-with-sidebar">
        <div className="page-with-sidebar__main">
          <h1 className="page-title">Useful IT resources</h1>

          {resources.length === 0 ? (
            <div className="empty-state">
              Немає ресурсів, що відповідають фільтрам. Спробуй змінити критерії пошуку.
            </div>
          ) : (
            <>
              <div className="resource-list">
                {visible.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
              <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
            </>
          )}
        </div>

        <ResourceFilterSidebar
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
}
