"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BuildCard from "@/components/BuildCard";
import { API_URL, BuildCard as BuildCardType } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/i18n/LocaleContext";

export default function FavoritesPage() {
  const { user, token, loading: authLoading } = useAuth();
  const { t } = useLocale();
  const [builds, setBuilds] = useState<BuildCardType[] | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/api/favorites`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : []))
      .then(setBuilds);
  }, [token]);

  function handleFavoriteChange(buildId: string, favorited: boolean) {
    if (!favorited) {
      setBuilds((prev) => prev?.filter((b) => b.id !== buildId) ?? null);
    }
  }

  if (authLoading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-neutral-500">{t.favorites.loading}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-neutral-500">
          {t.favorites.loginPrompt}{" "}
          <Link href="/account" className="underline">
            {t.favorites.loginLink}
          </Link>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{t.favorites.title}</h1>

      {builds === null && <p className="mt-4 text-sm text-neutral-500">{t.favorites.loading}</p>}
      {builds?.length === 0 && (
        <p className="mt-4 text-sm text-neutral-500">
          {t.favorites.empty}{" "}
          <Link href="/" className="underline">
            {t.favorites.findBuild}
          </Link>
          .
        </p>
      )}

      <ul className="mt-6 flex flex-col gap-4">
        {builds?.map((build) => (
          <BuildCard
            key={build.id}
            build={build}
            initiallyFavorited
            onFavoriteChange={handleFavoriteChange}
          />
        ))}
      </ul>
    </main>
  );
}
