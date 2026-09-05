import { useNavigate } from "react-router-dom";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { SkillIcon } from "../utils/skillIcons.jsx";

export function ProgressSidebar({ question }) {
  const navigate = useNavigate();
  const { setFilters } = useQuestions();
  const percent = Math.round((question.learnedCount / question.learnedGoal) * 100);

  function handleKeywordClick(keyword) {
    setFilters((f) => ({ ...f, query: keyword }));
    navigate("/knowledge-base/questions");
  }

  return (
    <aside className="progress-sidebar">
      <h3 className="progress-sidebar__title">Прогресс</h3>
      <p className="progress-sidebar__subtitle">
        Вопрос изучен {question.learnedCount} из {question.learnedGoal}
      </p>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="progress-sidebar__block">
        <div className="progress-sidebar__label">Level:</div>
        <div className="chip-row">
          <span className="pill pill--rating">Rating: {question.rating}</span>
          <span className="pill pill--difficulty">Complexity: {question.difficulty}</span>
        </div>
      </div>

      <div className="progress-sidebar__block">
        <div className="progress-sidebar__label">Skills:</div>
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
        <div className="progress-sidebar__label">Keywords:</div>
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
