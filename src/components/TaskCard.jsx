import { Link } from "react-router-dom";
import { SkillIcon } from "../utils/skillIcons.jsx";

const STATUS_LABELS = {
  not_started: "Not started",
  in_progress: "In progress",
  solved: "Solved",
};

export function TaskCard({ task }) {
  return (
    <Link className="task-card" to={`/training/tasks/${task.id}`}>
      <span className="task-card__title">{task.title}</span>

      <div className="task-card__meta">
        <span className={`task-status task-status--${task.status.replace("_", "-")}`}>
          {STATUS_LABELS[task.status]}
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
