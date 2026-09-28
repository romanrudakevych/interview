import { NavLink } from "react-router-dom";
import {
  Home,
  GraduationCap,
  MessagesSquare,
  ListChecks,
  BookOpen,
  FileText,
  HelpCircle,
  FolderHeart,
  BarChart3,
} from "lucide-react";
import { LanguageSelect } from "./LanguageSelect.jsx";
import { useI18n } from "../i18n/index.jsx";

// Routes and icons are static, so the array stays at module scope; only the text
// is dynamic, which is why these hold translation keys rather than labels. `id`
// is the React key — keying off the label would break once it varies by locale.
const NAV_SECTIONS = [
  {
    id: "home",
    items: [{ to: "/", labelKey: "nav.home", icon: Home, end: true }],
  },
  {
    id: "training",
    titleKey: "nav.training",
    icon: GraduationCap,
    items: [
      { to: "/training/interview", labelKey: "nav.interview", icon: MessagesSquare },
      { to: "/training/tasks", labelKey: "nav.tasks", icon: ListChecks },
    ],
  },
  {
    id: "knowledge-base",
    titleKey: "nav.knowledgeBase",
    icon: BookOpen,
    items: [
      { to: "/knowledge-base/resources", labelKey: "nav.resources", icon: FileText },
      { to: "/knowledge-base/questions", labelKey: "nav.questions", icon: HelpCircle },
      { to: "/knowledge-base/collections", labelKey: "nav.collections", icon: FolderHeart },
    ],
  },
  {
    id: "analytics",
    items: [{ to: "/analytics", labelKey: "nav.analytics", icon: BarChart3, end: true }],
  },
];

export function Sidebar() {
  const { t } = useI18n();

  return (
    <aside className="sidebar">
      {/* Product name — deliberately not translated. */}
      <div className="sidebar__brand">
        <span className="sidebar__brand-badge">IP</span>
        <span className="sidebar__brand-name">Interview Prep</span>
      </div>

      <nav className="sidebar__nav">
        {NAV_SECTIONS.map((section) => (
          <div className="sidebar__section" key={section.id}>
            {section.titleKey && (
              <div className="sidebar__section-title">
                {section.icon && <section.icon size={14} />}
                <span>{t(section.titleKey)}</span>
              </div>
            )}
            <ul className="sidebar__list">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      "sidebar__link" + (isActive ? " sidebar__link--active" : "")
                    }
                  >
                    <item.icon size={17} />
                    <span>{t(item.labelKey)}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <LanguageSelect />
      </div>
    </aside>
  );
}
