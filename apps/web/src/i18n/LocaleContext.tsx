"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { DEFAULT_LOCALE, isLocale, Locale, LOCALE_META } from "./locales";
import { DICTIONARIES, Dictionary } from "./translations";

const STORAGE_KEY = "poe-build-finder-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  intlLocale: string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // reading the persisted locale on mount only (client-only storage, so this
    // intentionally runs after the SSR-matching first render with the default)
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: DICTIONARIES[locale],
      intlLocale: LOCALE_META[locale].intl,
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
