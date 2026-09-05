import { Breadcrumbs } from "../components/Breadcrumbs.jsx";
import { useQuestions } from "../context/QuestionsContext.jsx";
import { SKILLS } from "../data/questions.js";

const DIFFICULTY_BUCKETS = [
  { label: "1-3", min: 1, max: 3 },
  { label: "4-6", min: 4, max: 6 },
  { label: "7-8", min: 7, max: 8 },
  { label: "9-10", min: 9, max: 10 },
];

export function AnalyticsPage() {
  const { questions } = useQuestions();

  const total = questions.length;
  const learned = questions.filter((q) => q.status === "learned").length;
  const overallPercent = total === 0 ? 0 : Math.round((learned / total) * 100);

  const bySkill = SKILLS.map((skill) => {
    const skillQuestions = questions.filter((q) => q.skills.includes(skill));
    const skillLearned = skillQuestions.filter((q) => q.status === "learned").length;
    return { skill, total: skillQuestions.length, learned: skillLearned };
  }).filter((row) => row.total > 0);

  const maxSkillTotal = Math.max(1, ...bySkill.map((r) => r.total));

  const byDifficulty = DIFFICULTY_BUCKETS.map((bucket) => ({
    ...bucket,
    count: questions.filter((q) => q.difficulty >= bucket.min && q.difficulty <= bucket.max).length,
  }));
  const maxDifficultyCount = Math.max(1, ...byDifficulty.map((b) => b.count));

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "Analytics" }]} />
      <h1 className="page-title">Analytics</h1>

      {total === 0 ? (
        <div className="empty-state">
          Ще немає жодного питання. Додай питання у <code className="inline-code">questions.js</code>, щоб побачити статистику.
        </div>
      ) : (
        <>
          <section className="analytics-card">
            <h2 className="analytics-card__title">Загальний прогрес</h2>
            <p className="analytics-card__summary">
              Вивчено {learned} з {total} питань ({overallPercent}%)
            </p>
            <div className="progress-bar progress-bar--large">
              <div className="progress-bar__fill" style={{ width: `${overallPercent}%` }} />
            </div>
          </section>

          <section className="analytics-card">
            <h2 className="analytics-card__title">Розподіл по темах</h2>
            <div className="chart-legend">
              <span className="chart-legend__item">
                <span className="chart-legend__swatch chart-legend__swatch--learned" /> Learned
              </span>
              <span className="chart-legend__item">
                <span className="chart-legend__swatch chart-legend__swatch--remaining" /> Remaining
              </span>
            </div>
            <div className="bar-chart">
              {bySkill.map((row) => (
                <div className="bar-chart__row" key={row.skill}>
                  <span className="bar-chart__label">{row.skill}</span>
                  <div className="bar-chart__track-outer">
                    <div className="bar-chart__track" style={{ width: `${(row.total / maxSkillTotal) * 100}%` }}>
                      <div
                        className="bar-chart__segment bar-chart__segment--learned"
                        style={{ width: `${(row.learned / row.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="bar-chart__value">
                    {row.learned}/{row.total}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="analytics-card">
            <h2 className="analytics-card__title">Питання за складністю</h2>
            <div className="bar-chart">
              {byDifficulty.map((bucket) => (
                <div className="bar-chart__row" key={bucket.label}>
                  <span className="bar-chart__label">{bucket.label}</span>
                  <div className="bar-chart__track-outer">
                    <div
                      className="bar-chart__track bar-chart__track--single"
                      style={{ width: `${(bucket.count / maxDifficultyCount) * 100}%` }}
                    />
                  </div>
                  <span className="bar-chart__value">{bucket.count}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
