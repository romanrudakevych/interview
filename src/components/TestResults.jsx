import { Check, X, Loader2 } from "lucide-react";

export function TestResults({ state }) {
  if (state.status === "idle") {
    return (
      <div className="empty-state">
        Запусти код кнопкой <strong>Run</strong>, чтобы увидеть результат прогона тестов.
      </div>
    );
  }

  if (state.status === "running") {
    return (
      <div className="test-results__running">
        <Loader2 size={16} className="spin" />
        Выполняется…
      </div>
    );
  }

  if (state.status === "error") {
    return <div className="test-results__error">{state.error}</div>;
  }

  const { results } = state;
  const passedCount = results.filter((r) => r.passed).length;
  const allPassed = passedCount === results.length;

  return (
    <div className="test-results">
      <div className={"test-results__summary" + (allPassed ? " test-results__summary--ok" : "")}>
        Пройдено {passedCount} из {results.length}
      </div>

      {results.map((result, i) => (
        <div
          key={i}
          className={"test-result" + (result.passed ? " test-result--pass" : " test-result--fail")}
        >
          <div className="test-result__head">
            {result.passed ? <Check size={14} /> : <X size={14} />}
            <span>{result.name}</span>
            {result.hidden && <span className="test-result__hidden-tag">скрытый</span>}
          </div>

          {!result.passed && (
            <div className="test-result__detail">
              {result.error ? (
                <div>
                  Ошибка: <code>{result.error}</code>
                </div>
              ) : (
                <>
                  <div>
                    Ожидалось: <code>{result.expected}</code>
                  </div>
                  <div>
                    Получено: <code>{result.actual ?? "—"}</code>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function TestCaseList({ tests }) {
  const visible = tests.filter((t) => !t.hidden);
  const hiddenCount = tests.length - visible.length;

  return (
    <div className="test-cases">
      {visible.map((test, i) => (
        <div key={i} className="test-case">
          <div className="test-case__name">{test.name}</div>
          <div className="test-case__io">
            {/* `body` tests have no plain args — show the snippet that runs. */}
            {test.body ? (
              <pre className="test-case__body">{test.body}</pre>
            ) : (
              <div>
                Вход: <code>{JSON.stringify(test.args)}</code>
              </div>
            )}
            <div>
              Ожидается: <code>{JSON.stringify(test.expected)}</code>
            </div>
          </div>
        </div>
      ))}

      {hiddenCount > 0 && (
        <div className="test-cases__hidden-note">
          + {hiddenCount} скрытых теста выполняются при отправке решения (Submit).
        </div>
      )}
    </div>
  );
}
