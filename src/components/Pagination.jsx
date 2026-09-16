import { ArrowLeft, ArrowRight } from "lucide-react";

const ELLIPSIS = "ellipsis";

/**
 * Page numbers to render, with "…" standing in for skipped ranges.
 *
 * First and last page are always reachable; the middle collapses so the control
 * stays a fixed width whether there are 8 pages or 337. Edge cases are padded
 * so the row doesn't visibly shrink on the first/last few pages:
 *
 *   page 1   of 312 -> 1 2 3 4 5 6 … 312
 *   page 50  of 312 -> 1 … 49 50 51 … 312
 *   page 310 of 312 -> 1 … 307 308 309 310 311 312
 */
function pageItems(page, pageCount) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  if (page <= 4) {
    return [1, 2, 3, 4, 5, 6, ELLIPSIS, pageCount];
  }
  if (page >= pageCount - 3) {
    return [1, ELLIPSIS, ...Array.from({ length: 6 }, (_, i) => pageCount - 5 + i)];
  }
  return [1, ELLIPSIS, page - 1, page, page + 1, ELLIPSIS, pageCount];
}

export function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__arrow"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ArrowLeft size={16} />
      </button>

      {pageItems(page, pageCount).map((item, i) =>
        item === ELLIPSIS ? (
          <span key={`gap-${i}`} className="pagination__ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={"pagination__page" + (item === page ? " pagination__page--active" : "")}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        className="pagination__arrow"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ArrowRight size={16} />
      </button>
    </nav>
  );
}
