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
      className="sticky top-0 z-50 border-b px-4 py-4 border-[color:var(--border-subtle)] shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
      style={{ background: "rgba(8,7,10,0.75)", backdropFilter: "blur(8px)" }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-wide"
          style={{ color: "var(--accent-gold)" }}
        >
          <Image
            src="/images/poe/logo.png"
            alt=""
            width={34}
            height={34}
            priority
          />
          {t.nav.brand}
        </Link>
        <div className="flex items-center gap-6 text-base">
          <Link href="/meta" className="nav-link">
            {t.nav.meta}
          </Link>
          <Link href="/campaign-guide" className="nav-link">
            {t.nav.campaignGuide}
          </Link>
          <a
            href="https://unique-presence-production-b5e6.up.railway.app"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            {t.nav.buildAdvisor}
          </a>
          {!loading && user && (
            <>
              <Link href="/favorites" className="nav-link">
                {t.nav.favorites}
              </Link>
              <Link href="/account" className="nav-link">
                {user.email}
              </Link>
              <button onClick={logout} className="nav-link">
                {t.nav.logout}
              </button>
            </>
          )}
          {!loading && !user && (
            <Link href="/account" className="nav-link">
              {t.nav.login}
            </Link>
          )}
          <Link href="/submit" className="gem-button">
            {t.nav.submit}
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
