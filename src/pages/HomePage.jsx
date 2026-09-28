import { Link } from "react-router-dom";
import { HelpCircle, MessagesSquare, BarChart3 } from "lucide-react";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { useI18n } from "../i18n/index.jsx";

export function HomePage() {
  const { questions } = useQuestions();
  const { t } = useI18n();

  const total = questions.length;
  const learned = questions.filter((q) => q.status === "learned").length;
  const favorites = questions.filter((q) => q.favorite).length;
  const skillsCovered = new Set(questions.flatMap((q) => q.skills)).size;

  return (
    <div className="page">
      <h1 className="page-title">{t("home.title")}</h1>
      <p className="home__subtitle">{t("home.subtitle")}</p>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__value">{total}</span>
          <span className="stat-card__label">{t("home.stats.total")}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{learned}</span>
          <span className="stat-card__label">{t("home.stats.learned")}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{favorites}</span>
          <span className="stat-card__label">{t("home.stats.favorites")}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{skillsCovered}</span>
          <span className="stat-card__label">{t("home.stats.skills")}</span>
        </div>
      </div>

      <div className="quick-links">
        <Link to="/knowledge-base/questions" className="quick-link-card">
          <HelpCircle size={22} />
          <div>
            <div className="quick-link-card__title">{t("nav.questions")}</div>
            <div className="quick-link-card__desc">{t("home.links.questionsDesc")}</div>
          </div>
        </Link>
        <Link to="/training/interview" className="quick-link-card">
          <MessagesSquare size={22} />
          <div>
            <div className="quick-link-card__title">{t("nav.interview")}</div>
            <div className="quick-link-card__desc">{t("home.links.interviewDesc")}</div>
          </div>
        </Link>
        <Link to="/analytics" className="quick-link-card">
          <BarChart3 size={22} />
          <div>
            <div className="quick-link-card__title">{t("nav.analytics")}</div>
            <div className="quick-link-card__desc">{t("home.links.analyticsDesc")}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
