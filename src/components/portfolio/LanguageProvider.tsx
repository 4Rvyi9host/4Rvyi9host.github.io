"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type Language } from "@/data/locales";

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");
  const [languageReady, setLanguageReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "id" || saved === "en") setLanguage(saved);
    setLanguageReady(true);
  }, []);

  useEffect(() => {
    if (!languageReady) return;
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language, languageReady]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return { ...value, t: copy[value.language] };
}

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className={`language-switch ${compact ? "language-switch--compact" : ""}`} role="group" aria-label={t.language}>
      <button type="button" onClick={() => setLanguage("id")} aria-pressed={language === "id"}>ID</button>
      <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
    </div>
  );
}
