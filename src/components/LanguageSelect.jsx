import { Languages } from "lucide-react";
import { LOCALES, useI18n } from "../i18n/index.jsx";

// A native <select> rather than a custom dropdown: keyboard and screen-reader
// behaviour come for free, and it degrades correctly on mobile.
export function LanguageSelect() {
  const { lang, setLang, t } = useI18n();

  return (
    <label className="sidebar__lang">
      <Languages size={16} />
      <span className="visually-hidden">{t("language.label")}</span>
      <select
        className="sidebar__lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        {LOCALES.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.label}
          </option>
        ))}
      </select>
    </label>
  );
}
