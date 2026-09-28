import { useNavigate } from "react-router-dom";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { SkillIcon } from "../utils/skillIcons.jsx";
import { useI18n } from "../i18n/index.jsx";

export function ProgressSidebar({ question }) {
  const navigate = useNavigate();
  const { setFilters } = useQuestions();
  const { t } = useI18n();
  const percent = Math.round((question.learnedCount / question.learnedGoal) * 100);

  function handleKeywordClick(keyword) {
    setFilters((f) => ({ ...f, query: keyword }));
    navigate("/knowledge-base/questions");
  }

  return (
    <aside className="progress-sidebar">
      <h3 className="progress-sidebar__title">{t("progress.title")}</h3>
      <p className="progress-sidebar__subtitle">
        {t("progress.questionLearned", {
          count: question.learnedCount,
          goal: question.learnedGoal,
        })}
      </p>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="progress-sidebar__block">
        <div className="progress-sidebar__label">{t("progress.level")}</div>
        <div className="chip-row">
          <span className="pill pill--rating">
            {t("common.rating")} {question.rating}
          </span>
          <span className="pill pill--difficulty">
            {t("common.complexity")} {question.difficulty}
          </span>
        </div>
      </div>

      <div className="progress-sidebar__block">
        <div className="progress-sidebar__label">{t("progress.skills")}</div>
        <div className="chip-row">
          {question.skills.map((skill) => (
            <span className="skill-tag skill-tag--static" key={skill}>
              <SkillIcon skill={skill} size={14} />
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="progress-sidebar__block">
        <div className="progress-sidebar__label">{t("progress.keywords")}</div>
        <div className="chip-row">
          {question.keywords.map((keyword) => (
            <button
              type="button"
              className="keyword-tag"
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
