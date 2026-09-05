import { Breadcrumbs } from "../components/Breadcrumbs.jsx";

export function ResourcesPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "Knowledge base" }, { label: "Resources" }]} />
      <h1 className="page-title">Resources</h1>
      <div className="empty-state">Корисні матеріали та посилання з'являться тут найближчим часом.</div>
    </div>
  );
}
