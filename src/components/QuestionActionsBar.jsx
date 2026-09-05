import { GraduationCap, RotateCcw, Heart } from "lucide-react";
import { useQuestionActions } from "../hooks/useQuestionActions.js";

export function QuestionActionsBar({ question }) {
  const { learn, repeat, toggleFavorite, canRepeat } = useQuestionActions();
  const repeatEnabled = canRepeat(question);

  return (
    <div className="actions-bar">
      <button type="button" className="actions-bar__btn" onClick={() => learn(question.id)}>
        <GraduationCap size={18} />
        Learn
      </button>
      <button
        type="button"
        className="actions-bar__btn"
        disabled={!repeatEnabled}
        onClick={() => repeatEnabled && repeat(question.id)}
      >
        <RotateCcw size={18} />
        Repeat
      </button>
      <button
        type="button"
        className={"actions-bar__btn" + (question.favorite ? " actions-bar__btn--active" : "")}
        onClick={() => toggleFavorite(question.id)}
      >
        <Heart size={18} fill={question.favorite ? "currentColor" : "none"} />
        Favorite
      </button>
    </div>
  );
}
