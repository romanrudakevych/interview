import { Check, X, Loader2 } from "lucide-react";
import { useI18n } from "../i18n/index.jsx";

export function TestResults({ state }) {
  const { t } = useI18n();

  if (state.status === "idle") {
    return <div className="empty-state">{t("tests.idle")}</div>;
  }

  if (state.status === "running") {
    return (
      <div className="test-results__running">
        <Loader2 size={16} className="spin" />
        {t("tests.running")}
      </div>
    );
  }

  if (state.status === "error") {
    // runCode/the worker hand back { code, params } — see src/utils/runCode.js.
    return <div className="test-results__error">{t(state.error.code, state.error.params)}</div>;
  }

  const { results } = state;
  const passedCount = results.filter((r) => r.passed).length;
  const allPassed = passedCount === results.length;

  return (
    <div className="test-results">
      <div className={"test-results__summary" + (allPassed ? " test-results__summary--ok" : "")}>
        {t("tests.passed", { passed: passedCount, total: results.length })}
      </div>

      {results.map((result, i) => (
        <div
          key={i}
          className={"test-result" + (result.passed ? " test-result--pass" : " test-result--fail")}
        >
          <div className="test-result__head">
            {result.passed ? <Check size={14} /> : <X size={14} />}
            <span>{result.name}</span>
            {result.hidden && <span className="test-result__hidden-tag">{t("tests.hiddenTag")}</span>}
          </div>

          {!result.passed && (
            <div className="test-result__detail">
              {result.error ? (
                <div>
                  {t("tests.error")} <code>{result.error}</code>
                </div>
              ) : (
                <>
                  <div>
                    {t("tests.expected")} <code>{result.expected}</code>
                  </div>
                  <div>
                    {t("tests.received")} <code>{result.actual ?? "—"}</code>
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
  const { t } = useI18n();
  const visible = tests.filter((test) => !test.hidden);
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
                {t("tests.input")} <code>{JSON.stringify(test.args)}</code>
              </div>
            )}
            <div>
              {t("tests.expects")} <code>{JSON.stringify(test.expected)}</code>
            </div>
          </div>
        </div>
      ))}

      {hiddenCount > 0 && (
        <div className="test-cases__hidden-note">
          {t("tests.hiddenNote", { count: hiddenCount })}
        </div>
      )}
    </div>
  );
}
