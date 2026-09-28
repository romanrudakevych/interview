import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loadLanguage, saveLanguage } from "../utils/storage.js";
import en from "./locales/en.js";
import uk from "./locales/uk.js";
import ru from "./locales/ru.js";
import cs from "./locales/cs.js";

// Each label is written in its own language: a user hunting for their language
// recognizes it whatever the interface is currently set to.
export const LOCALES = [
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
  { code: "ru", label: "Русский" },
  { code: "cs", label: "Čeština" },
];

const CATALOGUES = { en, uk, ru, cs };
const FALLBACK_LANG = "en";

// Plural category for a count. Only `tests.hiddenNote` needs this — every other
// counted string in the app is the "N of M" shape, where the Slavic noun sits in
// a fixed genitive plural and doesn't inflect on the number.
function pluralForm(lang, n) {
  if (lang === "en") return n === 1 ? "one" : "many";
  if (lang === "cs") {
    if (n === 1) return "one";
    return n >= 2 && n <= 4 ? "few" : "many";
  }
  // ru + uk share the same three-form rule
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "one";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "few";
  return "many";
}

function isSupported(code) {
  return LOCALES.some((l) => l.code === code);
}

// A saved preference wins; otherwise match the browser on the 2-letter prefix
// ("uk-UA" -> "uk"), and fall back to English.
function initialLang() {
  const saved = loadLanguage();
  if (saved && isSupported(saved)) return saved;
  const browser = (navigator.language ?? "").slice(0, 2).toLowerCase();
  return isSupported(browser) ? browser : FALLBACK_LANG;
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    saveLanguage(lang);
    // index.html hardcodes lang="en" — keep the document in sync so screen
    // readers and hyphenation follow the chosen language.
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (isSupported(next)) setLangState(next);
  }, []);

  // Resolution order: active locale -> English -> the key itself. Showing the
  // key makes a missing translation visible in review instead of blank.
  const t = useCallback(
    (key, vars) => {
      const catalogue = CATALOGUES[lang] ?? CATALOGUES[FALLBACK_LANG];
      const fallback = CATALOGUES[FALLBACK_LANG];

      // A `count` var only selects a plural form when the key actually has the
      // suffixed variants; otherwise `count` is an ordinary placeholder (as in
      // progress.questionLearned, which reads "{count} of {goal}" and doesn't
      // inflect). Checking for existence keeps the two cases from colliding.
      let lookup = key;
      if (vars && typeof vars.count === "number") {
        const plural = `${key}.${pluralForm(lang, vars.count)}`;
        if (plural in catalogue || plural in fallback) lookup = plural;
      }

      const template = catalogue[lookup] ?? fallback[lookup] ?? lookup;
      if (!vars) return template;

      return template.replace(/\{(\w+)\}/g, (match, name) =>
        Object.hasOwn(vars, name) ? String(vars[name]) : match
      );
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
