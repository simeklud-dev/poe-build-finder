"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { LOCALES, LOCALE_META } from "@/i18n/locales";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={LOCALE_META[locale].label}
        aria-expanded={open}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-lg leading-none hover:bg-white/5"
      >
        <span>{LOCALE_META[locale].flag}</span>
        <span className="text-[10px] text-neutral-500">▾</span>
      </button>
      {open && (
        <div
          className="absolute right-0 z-20 mt-2 flex flex-col overflow-hidden rounded-md border shadow-lg"
          style={{ borderColor: "var(--border-subtle)", background: "rgba(12,10,14,0.97)" }}
        >
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 text-left text-sm hover:bg-white/5"
              style={l === locale ? { color: "var(--accent-gold)" } : undefined}
            >
              <span className="text-base">{LOCALE_META[l].flag}</span>
              <span>{LOCALE_META[l].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
