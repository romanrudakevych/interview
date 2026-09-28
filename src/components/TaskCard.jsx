import { Link } from "react-router-dom";
import { SkillIcon } from "../utils/skillIcons.jsx";
import { useI18n } from "../i18n/index.jsx";

export function TaskCard({ task }) {
  const { t } = useI18n();

  return (
    <Link className="task-card" to={`/training/tasks/${task.id}`}>
      <span className="task-card__title">{task.title}</span>

      <div className="task-card__meta">
        <span className={`task-status task-status--${task.status.replace("_", "-")}`}>
          {t(`tasks.status.${task.status}`)}
        </span>

        <span className={`difficulty-badge difficulty-badge--${task.difficulty}`}>
          {task.difficulty}
        </span>

        {task.languages.map((lang) => (
          <SkillIcon key={lang} skill={lang} size={16} title={lang} />
        ))}

        {task.categories.map((category) => (
          <span key={category} className="task-category">
            {category}
          </span>
        ))}
      </div>
    </Link>
  );
}
