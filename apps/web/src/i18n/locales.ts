export const LOCALES = ["en", "cs", "pl", "ru", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; flag: string; intl: string }> = {
  en: { label: "English", flag: "🇬🇧", intl: "en-US" },
  cs: { label: "Čeština", flag: "🇨🇿", intl: "cs-CZ" },
  pl: { label: "Polski", flag: "🇵🇱", intl: "pl-PL" },
  ru: { label: "Русский", flag: "🇷🇺", intl: "ru-RU" },
  de: { label: "Deutsch", flag: "🇩🇪", intl: "de-DE" },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
