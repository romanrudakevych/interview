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

const TABS = [
  { id: "description", label: "Description" },
  { id: "result", label: "Code result" },
  { id: "tests", label: "Test cases" },
];

const STATUS_LABELS = {
  not_started: "Not started",
  in_progress: "In progress",
  solved: "Solved",
};

export function TaskDetailsPage() {
  const { id } = useParams();
  const { tasks, updateTaskProgress } = useTasks();
  const task = tasks.find((t) => t.id === Number(id));

  const [tab, setTab] = useState("description");
  const [runState, setRunState] = useState({ status: "idle" });

  if (!task) {
    return (
      <div className="page">
        <Breadcrumbs items={[{ label: "Tasks", to: "/training/tasks" }, { label: "Not found" }]} />
        <div className="empty-state">
          Завдання не знайдено. <Link to="/training/tasks">До списку завдань</Link>.
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
        items={[{ label: "Tasks", to: "/training/tasks" }, { label: "More details" }]}
      />

      <div className="task-details">
        <section className="task-details__pane">
          <div className="task-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={"task-tab" + (tab === t.id ? " task-tab--active" : "")}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="task-details__body">
            {tab === "description" && (
              <>
                <h1 className="task-details__title">{task.title}</h1>

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
                  {task.categories.map((c) => (
                    <span key={c} className="task-category">
                      {c}
                    </span>
                  ))}
                </div>

                {/* Imported tasks don't all carry every section — a heading over
                    an empty list reads as a bug, so each one is conditional. */}
                <h3 className="task-section__title">Условие:</h3>
                <p className="task-section__text">
                  <FormattedText text={task.description.condition} />
                </p>

                {task.description.input.length > 0 && (
                  <>
                    <h3 className="task-section__title">Входные данные:</h3>
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
                    <h3 className="task-section__title">Выходные данные:</h3>
                    <p className="task-section__text">
                      <FormattedText text={task.description.output} />
                    </p>
                  </>
                )}

                {task.description.constraints.length > 0 && (
                  <>
                    <h3 className="task-section__title">Ограничения:</h3>
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
                    <h3 className="task-section__title">Пример:</h3>
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
                Run
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => execute({ includeHidden: true })}
                disabled={isRunning}
              >
                <Send size={14} />
                Submit
              </button>
            </div>
          </div>

          <CodeEditor value={code} onChange={handleCodeChange} />

          <button
            type="button"
            className="task-editor__reset"
            onClick={() => handleCodeChange(task.starterCode)}
          >
            Сбросить к шаблону
          </button>
        </section>
      </div>
    </div>
  );
}
