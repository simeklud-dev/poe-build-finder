"use client";

import { useState } from "react";
import { API_URL, BuildCard as BuildCardType } from "@/lib/api";
import { formatStat } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/i18n/LocaleContext";

interface Props {
  build: BuildCardType;
  initiallyFavorited?: boolean;
  onFavoriteChange?: (buildId: string, favorited: boolean) => void;
}

export default function BuildCard({ build, initiallyFavorited, onFavoriteChange }: Props) {
  const { token } = useAuth();
  const { t, intlLocale } = useLocale();
  const [favorited, setFavorited] = useState(Boolean(initiallyFavorited));
  const [favoriteBusy, setFavoriteBusy] = useState(false);
  const [reportBusy, setReportBusy] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  async function toggleFavorite() {
    if (!token || favoriteBusy) return;
    setFavoriteBusy(true);
    try {
      const method = favorited ? "DELETE" : "POST";
      const response = await fetch(`${API_URL}/api/favorites/${build.id}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const next = !favorited;
        setFavorited(next);
        onFavoriteChange?.(build.id, next);
      }
    } finally {
      setFavoriteBusy(false);
    }
  }

  async function sendReport() {
    if (reportBusy || reportSent) return;
    const reason = window.prompt(t.buildCard.reportPrompt) ?? "";
    setReportBusy(true);
    try {
      const response = await fetch(`${API_URL}/api/builds/${build.id}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: reason.trim() || null }),
      });
      if (response.ok) setReportSent(true);
    } finally {
      setReportBusy(false);
    }
  }

  const sourceLabel = t.sources[build.source as keyof typeof t.sources] ?? build.source;

  return (
    <li className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <a
          href={build.source_url}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-blue-400 underline"
        >
          {build.title}
        </a>
        <div className="flex shrink-0 items-center gap-3 text-xs">
          {token && (
            <button
              type="button"
              onClick={toggleFavorite}
              disabled={favoriteBusy}
              title={favorited ? t.buildCard.removeFavorite : t.buildCard.addFavorite}
              className="text-lg leading-none text-yellow-500 disabled:opacity-50"
            >
              {favorited ? "★" : "☆"}
            </button>
          )}
          {reportSent ? (
            <span className="text-neutral-400">{t.buildCard.reported}</span>
          ) : (
            <button
              type="button"
              onClick={sendReport}
              disabled={reportBusy}
              className="text-neutral-400 underline disabled:opacity-50"
            >
              {t.buildCard.report}
            </button>
          )}
        </div>
      </div>
      <p className="mt-1 text-sm text-neutral-500">
        {sourceLabel}
        {build.author && ` · ${build.author}`} · {build.game} · {build.class ?? "?"} ·{" "}
        {build.ascendancy ?? "?"} · {build.main_skill ?? "?"}
        {build.league_patch && ` · ${build.league_patch}`}
      </p>
      {build.tags.length > 0 && (
        <p className="mt-1 text-xs text-neutral-500">
          {t.admin.tags}: {build.tags.join(", ")}
        </p>
      )}
      {(build.stats_dps || build.stats_life || build.stats_ehp) && (
        <p className="mt-1 text-xs text-neutral-500">
          {build.stats_dps && `DPS: ${formatStat(build.stats_dps, intlLocale)}`}
          {build.stats_life && ` · Life: ${formatStat(build.stats_life, intlLocale)}`}
          {build.stats_ehp && ` · EHP: ${formatStat(build.stats_ehp, intlLocale)}`}
        </p>
      )}
      {build.published_at && (
        <p className="mt-1 text-xs text-neutral-400">
          {new Date(build.published_at).toLocaleDateString(intlLocale)}
        </p>
      )}
    </li>
  );
}
