import { useState, useCallback } from "react";
import { Shuffle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { FormattedText } from "../components/FormattedText.jsx";
import { CodeBlock } from "../components/CodeBlock.jsx";
import { SkillIcon } from "../utils/skillIcons.jsx";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { useQuestionActions } from "../hooks/useQuestionActions.js";

function pickRandomId(questions, excludeId) {
  const pool = questions.length > 1 ? questions.filter((q) => q.id !== excludeId) : questions;
  return pool[Math.floor(Math.random() * pool.length)]?.id ?? null;
}

export function InterviewPage() {
  const { questions } = useQuestions();
  const { learn, repeat } = useQuestionActions();
  const [currentId, setCurrentId] = useState(() => pickRandomId(questions, null));
  const [revealed, setRevealed] = useState(false);

  const question = questions.find((q) => q.id === currentId);

  const nextQuestion = useCallback(() => {
    setCurrentId((prevId) => pickRandomId(questions, prevId));
    setRevealed(false);
  }, [questions]);

  function handleKnow() {
    if (question) learn(question.id);
    nextQuestion();
  }

  function handleDontKnow() {
    if (question && question.learnedCount > 0) repeat(question.id);
    nextQuestion();
  }

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "Training" }, { label: "Interview" }]} />
      <h1 className="page-title">Interview simulation</h1>

      {!question ? (
        <div className="empty-state">
          Немає жодного питання для симуляції. Додай питання у <code className="inline-code">questions.js</code>.
        </div>
      ) : (
        <div className="interview-card">
          <div className="interview-card__meta">
            <SkillIcon skill={question.skills[0]} size={20} />
            <span>{question.skills.join(", ")}</span>
          </div>

          <p className="interview-card__question">{question.question}</p>

          {!revealed ? (
            <button type="button" className="btn btn--primary" onClick={() => setRevealed(true)}>
              Показати відповідь
            </button>
          ) : (
            <>
              <div className="interview-card__answer">
                <p>
                  <FormattedText text={question.shortAnswer} />
                </p>
                {question.codeExample && <CodeBlock code={question.codeExample} />}
              </div>

              <div className="interview-card__actions">
                <button type="button" className="btn btn--danger" onClick={handleDontKnow}>
                  <ThumbsDown size={16} />
                  Не знаю
                </button>
                <button type="button" className="btn btn--success" onClick={handleKnow}>
                  <ThumbsUp size={16} />
                  Знаю
                </button>
              </div>
            </>
          )}

          <button type="button" className="interview-card__skip" onClick={nextQuestion}>
            <Shuffle size={14} />
            Наступне випадкове питання
          </button>
        </div>
      )}
    </div>
  );
}
