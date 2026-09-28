import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Send } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { CodeBlock } from "../components/CodeBlock.jsx";
import { CodeEditor } from "../components/CodeEditor.jsx";
import { FormattedText } from "../components/FormattedText.jsx";
import { TestResults, TestCaseList } from "../components/TestResults.jsx";
import { SkillIcon } from "../utils/skillIcons.jsx";
import { useTasks } from "../context/TasksContext.jsx";
import { runCode } from "../utils/runCode.js";
import { useI18n } from "../i18n/index.jsx";

// Ids are the tab state; only the text varies by locale.
const TABS = [
  { id: "description", labelKey: "tasks.tab.description" },
  { id: "result", labelKey: "tasks.tab.result" },
  { id: "tests", labelKey: "tasks.tab.tests" },
];

export function TaskDetailsPage() {
  const { id } = useParams();
  const { tasks, updateTaskProgress } = useTasks();
  const { t } = useI18n();
  const task = tasks.find((t) => t.id === Number(id));

  const [tab, setTab] = useState("description");
  const [runState, setRunState] = useState({ status: "idle" });

  if (!task) {
    return (
      <div className="page">
        <Breadcrumbs
          items={[
            { label: t("nav.tasks"), to: "/training/tasks" },
            { label: t("breadcrumb.notFound") },
          ]}
        />
        <div className="empty-state">
          {t("tasks.notFound")} <Link to="/training/tasks">{t("tasks.backToList")}</Link>.
        </div>
      </div>
    );
  }

  const code = task.code ?? task.starterCode;

  function handleCodeChange(next) {
    updateTaskProgress(task.id, (p) => ({ ...p, code: next }));
  }

  async function execute({ includeHidden }) {
    setTab("result");
    setRunState({ status: "running" });

    const tests = includeHidden ? task.tests : task.tests.filter((t) => !t.hidden);
    const outcome = await runCode({ code, functionName: task.functionName, tests });

    if (!outcome.ok) {
      setRunState({ status: "error", error: outcome.error });
      return;
    }

    setRunState({ status: "done", results: outcome.results });

    // Only a Submit that passes every test — visible and hidden — marks it solved.
    if (includeHidden) {
      const solved = outcome.results.every((r) => r.passed);
      updateTaskProgress(task.id, (p) => ({ ...p, solved }));
    }
  }

  const isRunning = runState.status === "running";

  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { label: t("nav.tasks"), to: "/training/tasks" },
          { label: t("breadcrumb.moreDetails") },
        ]}
      />

      <div className="task-details">
        <section className="task-details__pane">
          <div className="task-tabs">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={"task-tab" + (tab === item.id ? " task-tab--active" : "")}
                onClick={() => setTab(item.id)}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>

          <div className="task-details__body">
            {tab === "description" && (
              <>
                <h1 className="task-details__title">{task.title}</h1>

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
                  {task.categories.map((c) => (
                    <span key={c} className="task-category">
                      {c}
                    </span>
                  ))}
                </div>

                {/* Imported tasks don't all carry every section — a heading over
                    an empty list reads as a bug, so each one is conditional. */}
                <h3 className="task-section__title">{t("tasks.section.condition")}</h3>
                <p className="task-section__text">
                  <FormattedText text={task.description.condition} />
                </p>

                {task.description.input.length > 0 && (
                  <>
                    <h3 className="task-section__title">{t("tasks.section.input")}</h3>
                    <ul className="task-section__list">
                      {task.description.input.map((item, i) => (
                        <li key={i}>
                          <FormattedText text={item} />
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {task.description.output && (
                  <>
                    <h3 className="task-section__title">{t("tasks.section.output")}</h3>
                    <p className="task-section__text">
                      <FormattedText text={task.description.output} />
                    </p>
                  </>
                )}

                {task.description.constraints.length > 0 && (
                  <>
                    <h3 className="task-section__title">{t("tasks.section.constraints")}</h3>
                    <ul className="task-section__list">
                      {task.description.constraints.map((item, i) => (
                        <li key={i}>
                          <FormattedText text={item} />
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {task.description.example && (
                  <>
                    <h3 className="task-section__title">{t("tasks.section.example")}</h3>
                    {/* Вход/Выход prose, not source — leave it uncolored. */}
                    <CodeBlock code={task.description.example} language="text" />
                  </>
                )}
              </>
            )}

            {tab === "result" && <TestResults state={runState} />}
            {tab === "tests" && <TestCaseList tests={task.tests} />}
          </div>
        </section>

        <section className="task-details__pane">
          <div className="task-editor__toolbar">
            <select className="task-editor__lang" value={task.languages[0]} readOnly disabled>
              {task.languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <div className="task-editor__actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => execute({ includeHidden: false })}
                disabled={isRunning}
              >
                <Play size={14} />
                {t("tasks.run")}
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => execute({ includeHidden: true })}
                disabled={isRunning}
              >
                <Send size={14} />
                {t("tasks.submit")}
              </button>
            </div>
          </div>

          <CodeEditor value={code} onChange={handleCodeChange} />

          <button
            type="button"
            className="task-editor__reset"
            onClick={() => handleCodeChange(task.starterCode)}
          >
            {t("tasks.resetToTemplate")}
          </button>
        </section>
      </div>
    </div>
  );
}
