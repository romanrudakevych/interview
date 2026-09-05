import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { QuestionCard } from "../components/QuestionCard.jsx";

export function CollectionsPage() {
  const { questions } = useQuestions();
  const favorites = questions.filter((q) => q.favorite);

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "Knowledge base" }, { label: "Collections" }]} />
      <h1 className="page-title">Collections</h1>
      <p className="home__subtitle">Твоя колекція обраних питань (Favorite).</p>

      {favorites.length === 0 ? (
        <div className="empty-state">
          Ще немає обраних питань. Познач питання зіркою (Favorite) у списку питань.
        </div>
      ) : (
        <div className="question-list">
          {favorites.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}
