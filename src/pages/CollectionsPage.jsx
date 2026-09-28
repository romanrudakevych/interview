import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { QuestionCard } from "../components/QuestionCard.jsx";
import { useI18n } from "../i18n/index.jsx";

export function CollectionsPage() {
  const { questions } = useQuestions();
  const { t } = useI18n();
  const favorites = questions.filter((q) => q.favorite);

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: t("nav.knowledgeBase") }, { label: t("nav.collections") }]} />
      <h1 className="page-title">{t("collections.title")}</h1>
      <p className="home__subtitle">{t("collections.subtitle")}</p>

      {favorites.length === 0 ? (
        <div className="empty-state">{t("collections.empty")}</div>
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
