import { Breadcrumbs } from "../components/Breadcrumbs.jsx";

export function TasksPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "Training" }, { label: "Tasks" }]} />
      <h1 className="page-title">Tasks</h1>
      <div className="empty-state">Практичні завдання з'являться тут найближчим часом.</div>
    </div>
  );
}
