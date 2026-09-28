import { useState, useCallback } from "react";
import { Shuffle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { FormattedText } from "../components/FormattedText.jsx";
import { CodeBlock } from "../components/CodeBlock.jsx";
import { SkillIcon } from "../utils/skillIcons.jsx";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { useQuestionActions } from "../hooks/useQuestionActions.js";
import { useQuestionBody } from "../hooks/useQuestionBody.js";
import { useI18n } from "../i18n/index.jsx";

function pickRandomId(questions, excludeId) {
  const pool = questions.length > 1 ? questions.filter((q) => q.id !== excludeId) : questions;
  return pool[Math.floor(Math.random() * pool.length)]?.id ?? null;
}

export function InterviewPage() {
  const { questions } = useQuestions();
  const { t } = useI18n();
  const { learn, repeat } = useQuestionActions();
  const [currentId, setCurrentId] = useState(() => pickRandomId(questions, null));
  const [revealed, setRevealed] = useState(false);

  const question = questions.find((q) => q.id === currentId);
  // null until revealed — the answer isn't fetched while it's still hidden.
  const { body, loading } = useQuestionBody(revealed ? currentId : null);

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
      <Breadcrumbs items={[{ label: t("nav.training") }, { label: t("nav.interview") }]} />
      <h1 className="page-title">{t("interview.title")}</h1>

      {!question ? (
        <div className="empty-state">
          <FormattedText text={t("interview.empty")} />
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
              {t("interview.showAnswer")}
            </button>
          ) : (
            <>
              <div className="interview-card__answer">
                {loading ? (
                  <p className="answer-loading">{t("common.loadingAnswer")}</p>
                ) : (
                  body && (
                    <>
                      <p>
                        <FormattedText text={body.shortAnswer} />
                      </p>
                      {body.codeExample && <CodeBlock code={body.codeExample} />}
                    </>
                  )
                )}
              </div>

              <div className="interview-card__actions">
                <button type="button" className="btn btn--danger" onClick={handleDontKnow}>
                  <ThumbsDown size={16} />
                  {t("interview.dontKnow")}
                </button>
                <button type="button" className="btn btn--success" onClick={handleKnow}>
                  <ThumbsUp size={16} />
                  {t("interview.know")}
                </button>
              </div>
            </>
          )}

          <button type="button" className="interview-card__skip" onClick={nextQuestion}>
            <Shuffle size={14} />
            {t("interview.nextRandom")}
          </button>
        </div>
      )}
    </div>
  );
}
