import { Link } from "react-router-dom";
import { HelpCircle, MessagesSquare, BarChart3 } from "lucide-react";
import { useQuestions } from "../context/QuestionsContext.jsx";

export function HomePage() {
  const { questions } = useQuestions();

  const total = questions.length;
  const learned = questions.filter((q) => q.status === "learned").length;
  const favorites = questions.filter((q) => q.favorite).length;
  const skillsCovered = new Set(questions.flatMap((q) => q.skills)).size;

  return (
    <div className="page">
      <h1 className="page-title">Welcome back</h1>
      <p className="home__subtitle">Продовжуй готуватись до технічних співбесід — крок за кроком.</p>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__value">{total}</span>
          <span className="stat-card__label">Questions total</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{learned}</span>
          <span className="stat-card__label">Learned</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{favorites}</span>
          <span className="stat-card__label">Favorites</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{skillsCovered}</span>
          <span className="stat-card__label">Skills covered</span>
        </div>
      </div>

      <div className="quick-links">
        <Link to="/knowledge-base/questions" className="quick-link-card">
          <HelpCircle size={22} />
          <div>
            <div className="quick-link-card__title">Questions</div>
            <div className="quick-link-card__desc">Переглянути базу питань і відповідей</div>
          </div>
        </Link>
        <Link to="/training/interview" className="quick-link-card">
          <MessagesSquare size={22} />
          <div>
            <div className="quick-link-card__title">Interview</div>
            <div className="quick-link-card__desc">Симуляція співбесіди з випадковими питаннями</div>
          </div>
        </Link>
        <Link to="/analytics" className="quick-link-card">
          <BarChart3 size={22} />
          <div>
            <div className="quick-link-card__title">Analytics</div>
            <div className="quick-link-card__desc">Прогрес навчання і статистика</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
