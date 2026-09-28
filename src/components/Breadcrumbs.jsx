import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useI18n } from "../i18n/index.jsx";

// items: [{ label, to? }] — the last item is rendered as plain text (current page)
export function Breadcrumbs({ items }) {
  const { t } = useI18n();

  return (
    <nav className="breadcrumbs" aria-label={t("breadcrumb.label")}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className="breadcrumbs__item" key={index}>
            {item.to && !isLast ? (
              <Link to={item.to} className="breadcrumbs__link">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "breadcrumbs__current" : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={14} className="breadcrumbs__sep" />}
          </span>
        );
      })}
    </nav>
  );
}
