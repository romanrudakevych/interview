import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { QuestionCard } from "../components/QuestionCard.jsx";
import { FilterSidebar } from "../components/FilterSidebar.jsx";
import { useFilteredQuestions } from "../hooks/useFilteredQuestions.js";

export function QuestionListPage() {
  const questions = useFilteredQuestions();

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
            <div className="question-list">
              {questions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          )}
        </div>
        <FilterSidebar />
      </div>
    </div>
  );
}
