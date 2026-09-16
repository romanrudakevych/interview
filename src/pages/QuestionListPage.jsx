import { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { QuestionCard } from "../components/QuestionCard.jsx";
import { FilterSidebar } from "../components/FilterSidebar.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { useFilteredQuestions } from "../hooks/useFilteredQuestions.js";

const PAGE_SIZE = 10;

export function QuestionListPage() {
  const { filters } = useQuestions();
  const questions = useFilteredQuestions();
  const [page, setPage] = useState(1);

  // Changing a filter jumps back to page 1 — otherwise narrowing the list while
  // on page 12 would drop you at page 12 of a completely different result set.
  // Adjusting state during render (rather than in an effect) is the React-
  // sanctioned pattern here: it re-renders before paint, with no flash.
  const [lastFilters, setLastFilters] = useState(filters);
  if (filters !== lastFilters) {
    setLastFilters(filters);
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(questions.length / PAGE_SIZE));

  // Changing filters can shrink the list past the stored page, so clamp on read
  // rather than correcting state in an effect (which would cascade a render).
  const currentPage = Math.min(page, pageCount);
  const visible = questions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function goToPage(next) {
    setPage(next);
    // Without this you land mid-list on the next page.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "Knowledge base" }, { label: "List of questions" }]} />
      <div className="page-with-sidebar">
        <div className="page-with-sidebar__main">
          <h1 className="page-title">Questions</h1>

          {questions.length === 0 ? (
            <div className="empty-state">
              Немає питань, що відповідають фільтрам. Спробуй змінити критерії пошуку
              або додай нові питання у <code className="inline-code">questions.js</code>.
            </div>
          ) : (
            <>
              <div className="question-list">
                {visible.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </div>
              <Pagination page={currentPage} pageCount={pageCount} onChange={goToPage} />
            </>
          )}
        </div>
        <FilterSidebar />
      </div>
    </div>
  );
}
