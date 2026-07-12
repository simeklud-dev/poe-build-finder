"use client";

import { useLocale } from "@/i18n/LocaleContext";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t px-4 py-6 text-center text-xs text-neutral-500 border-[color:var(--border-subtle)]">
      {t.footer.disclaimer}
    </footer>
  );
}
