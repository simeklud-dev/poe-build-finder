"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/i18n/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function NavBar() {
  const { user, loading, logout } = useAuth();
  const { t } = useLocale();

  return (
    <header
      className="relative z-50 border-b px-4 py-3 border-[color:var(--border-subtle)]"
      style={{ background: "rgba(8,7,10,0.6)", backdropFilter: "blur(6px)" }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          style={{ color: "var(--accent-gold)" }}
        >
          <Image
            src="/images/poe/logo.png"
            alt=""
            width={28}
            height={28}
            priority
          />
          {t.nav.brand}
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/meta">{t.nav.meta}</Link>
          <Link href="/campaign-guide">{t.nav.campaignGuide}</Link>
          <Link href="/submit">{t.nav.submit}</Link>
          <Link href="/admin">{t.nav.admin}</Link>
          {!loading && user && (
            <>
              <Link href="/favorites">{t.nav.favorites}</Link>
              <Link href="/account">{user.email}</Link>
              <button onClick={logout} className="underline">
                {t.nav.logout}
              </button>
            </>
          )}
          {!loading && !user && <Link href="/account">{t.nav.login}</Link>}
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
