import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { QuestionCardMenu } from "./QuestionCardMenu.jsx";
import { FormattedText } from "./FormattedText.jsx";
import { CodeBlock } from "./CodeBlock.jsx";
import { useQuestionBody } from "../hooks/useQuestionBody.js";

export function QuestionCard({ question }) {
  const [expanded, setExpanded] = useState(false);
  const isLearned = question.status === "learned";
  // null while collapsed — a collapsed card never fetches its answer.
  const { body, loading } = useQuestionBody(expanded ? question.id : null);

  return (
    <div className="question-card">
      <button
        type="button"
        className="question-card__header"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <span className={`status-badge ${isLearned ? "status-badge--learned" : "status-badge--not-learned"}`}>
          {isLearned ? "Learned" : "Not learned"}
        </span>
        <span className="question-card__question">{question.question}</span>
        <ChevronDown size={20} className={"question-card__chevron" + (expanded ? " question-card__chevron--open" : "")} />
      </button>

      {expanded && (
        <div className="question-card__body">
          <div className="question-card__meta">
            <span className="pill pill--rating">Rating: {question.rating}</span>
            <span className="pill pill--difficulty">Complexity: {question.difficulty}</span>
            <div className="question-card__menu-slot">
              <QuestionCardMenu question={question} />
            </div>
          </div>

          {loading ? (
            <p className="question-card__answer answer-loading">Завантаження відповіді…</p>
          ) : (
            body && (
              <>
                <p className="question-card__answer">
                  <FormattedText text={body.shortAnswer} />
                </p>
                {body.codeExample && <CodeBlock code={body.codeExample} />}
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}
