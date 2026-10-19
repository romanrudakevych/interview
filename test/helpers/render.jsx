import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "../../src/i18n/index.jsx";

/**
 * Renders `ui` inside the providers every component in this app assumes:
 * LanguageProvider (outermost in App.jsx) and a router.
 *
 * `lang` is applied by seeding the storage key the provider reads on mount —
 * setLang after the fact would re-render and lose the initial-state path.
 * Defaults to English so assertions can be written against en.js, which is the
 * one catalogue guaranteed to be complete.
 */
export function renderWithProviders(ui, { route = "/", lang = "en", ...options } = {}) {
  localStorage.setItem("interview-prep:language", lang);

  function Wrapper({ children }) {
    return (
      <LanguageProvider>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </LanguageProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

/** The same providers as a wrapper, for renderHook. */
export function providerWrapper({ lang = "en", route = "/" } = {}) {
  localStorage.setItem("interview-prep:language", lang);
  return function Wrapper({ children }) {
    return (
      <LanguageProvider>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </LanguageProvider>
    );
  };
}
