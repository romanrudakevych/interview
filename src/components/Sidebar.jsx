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

const NAV_SECTIONS = [
  {
    items: [{ to: "/", label: "Home", icon: Home, end: true }],
  },
  {
    title: "Training",
    icon: GraduationCap,
    items: [
      { to: "/training/interview", label: "Interview", icon: MessagesSquare },
      { to: "/training/tasks", label: "Tasks", icon: ListChecks },
    ],
  },
  {
    title: "Knowledge base",
    icon: BookOpen,
    items: [
      { to: "/knowledge-base/resources", label: "Resources", icon: FileText },
      { to: "/knowledge-base/questions", label: "Questions", icon: HelpCircle },
      { to: "/knowledge-base/collections", label: "Collections", icon: FolderHeart },
    ],
  },
  {
    items: [{ to: "/analytics", label: "Analytics", icon: BarChart3, end: true }],
  },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-badge">IP</span>
        <span className="sidebar__brand-name">Interview Prep</span>
      </div>

      <nav className="sidebar__nav">
        {NAV_SECTIONS.map((section, i) => (
          <div className="sidebar__section" key={section.title ?? i}>
            {section.title && (
              <div className="sidebar__section-title">
                {section.icon && <section.icon size={14} />}
                <span>{section.title}</span>
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
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
