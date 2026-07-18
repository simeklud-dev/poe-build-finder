"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useLocale } from "@/i18n/LocaleContext";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const STORAGE_KEY = "cookie-consent";

type Consent = "accepted" | "declined";

export default function CookieConsentBanner() {
  const { t } = useLocale();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    }
    setReady(true);
  }, []);

  function choose(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && ADSENSE_CLIENT_ID && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      {ready && consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t px-4 py-4 text-sm border-[color:var(--border-subtle)] bg-[color:var(--background-elevated)]">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-neutral-300">{t.cookieConsent.message}</p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="rounded-md border border-neutral-300 px-3 py-1.5 dark:border-neutral-700"
              >
                {t.cookieConsent.decline}
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-md bg-neutral-900 px-3 py-1.5 text-white"
              >
                {t.cookieConsent.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
