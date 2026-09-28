import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { ProgressSidebar } from "../components/ProgressSidebar.jsx";
import { QuestionActionsBar } from "../components/QuestionActionsBar.jsx";
import { FormattedText } from "../components/FormattedText.jsx";
import { CodeBlock } from "../components/CodeBlock.jsx";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { useFilteredQuestions } from "../hooks/useFilteredQuestions.js";
import { useQuestionBody } from "../hooks/useQuestionBody.js";
import { SkillIcon } from "../utils/skillIcons.jsx";
import { useI18n } from "../i18n/index.jsx";

export function QuestionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { questions } = useQuestions();
  const { t } = useI18n();
  const filteredQuestions = useFilteredQuestions();

  const questionId = Number(id);
  const question = questions.find((q) => q.id === questionId);
  // Must run before the early return below — and stays null for an unknown id
  // so a bad URL never requests a nonexistent chunk.
  const { body, loading } = useQuestionBody(question ? questionId : null);

  if (!question) {
    return (
      <div className="page">
        <Breadcrumbs
          items={[
            { label: t("nav.knowledgeBase"), to: "/knowledge-base/questions" },
            { label: t("breadcrumb.notFound") },
          ]}
        />
        <div className="empty-state">
          <FormattedText text={t("questions.notFound")} />
        </div>
        <Link to="/knowledge-base/questions" className="btn btn--primary">
          {t("questions.backToList")}
        </Link>
      </div>
    );
  }

  const listForNav = filteredQuestions.some((q) => q.id === question.id) ? filteredQuestions : questions;
  const currentIndex = listForNav.findIndex((q) => q.id === question.id);
  const prevQuestion = currentIndex > 0 ? listForNav[currentIndex - 1] : null;
  const nextQuestion = currentIndex >= 0 && currentIndex < listForNav.length - 1 ? listForNav[currentIndex + 1] : null;

  const skillsLabel = question.skills.join(", ");

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: t("nav.knowledgeBase"), to: "/knowledge-base/questions" },
          { label: t("breadcrumb.listOfQuestions"), to: "/knowledge-base/questions" },
          { label: t("breadcrumb.moreDetails") },
        ]}
      />

      <div className="page-with-sidebar">
        <div className="page-with-sidebar__main">
          <div className="details-header">
            <div className="details-header__icon">
              <SkillIcon skill={question.skills[0]} size={36} />
            </div>
            <div>
              <h1 className="page-title">{question.question}</h1>
              <p className="details-header__subtitle">{t("questions.subtitle", { skills: skillsLabel })}</p>
            </div>
          </div>

          <QuestionActionsBar question={question} />

          <div className="prev-next">
            <button
              type="button"
              className="prev-next__btn"
              disabled={!prevQuestion}
              onClick={() => prevQuestion && navigate(`/knowledge-base/questions/${prevQuestion.id}`)}
            >
              <ChevronLeft size={16} />
              {t("questions.previous")}
            </button>
            <button
              type="button"
              className="prev-next__btn"
              disabled={!nextQuestion}
              onClick={() => nextQuestion && navigate(`/knowledge-base/questions/${nextQuestion.id}`)}
            >
              {t("questions.next")}
              <ChevronRight size={16} />
            </button>
          </div>

          {currentIndex >= 0 && (
            <p className="prev-next__position">
              {t("questions.position", { current: currentIndex + 1, total: listForNav.length })}
            </p>
          )}

          {loading ? (
            <section className="answer-section">
              <p className="answer-section__text answer-loading">{t("common.loadingAnswer")}</p>
            </section>
          ) : (
            body && (
              <>
                <section className="answer-section">
                  <h2 className="answer-section__title">{t("questions.shortAnswer")}</h2>
                  <p className="answer-section__text">
                    <FormattedText text={body.shortAnswer} />
                  </p>
                  {body.codeExample && <CodeBlock code={body.codeExample} />}
                </section>

                <section className="answer-section">
                  <h2 className="answer-section__title">{t("questions.longAnswer")}</h2>
                  <p className="answer-section__text">
                    <FormattedText text={body.longAnswer} />
                  </p>
                </section>
              </>
            )
          )}
        </div>

        <ProgressSidebar question={question} />
      </div>
    </div>
  );
}
