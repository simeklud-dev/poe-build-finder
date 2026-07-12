"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function NavBar() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="border-b px-4 py-3 border-[color:var(--border-subtle)]" style={{ background: "rgba(8,7,10,0.6)", backdropFilter: "blur(6px)" }}>
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="font-semibold" style={{ color: "var(--accent-gold)" }}>
          PoE Build Finder
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/meta">Meta přehled</Link>
          <Link href="/submit">Přidat build</Link>
          <Link href="/admin">Admin</Link>
          {!loading && user && (
            <>
              <Link href="/favorites">Oblíbené</Link>
              <Link href="/account">{user.email}</Link>
              <button onClick={logout} className="underline">
                Odhlásit
              </button>
            </>
          )}
          {!loading && !user && <Link href="/account">Přihlásit</Link>}
        </div>
      </nav>
    </header>
  );
}
