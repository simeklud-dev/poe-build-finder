"use client";

import { useEffect, useState } from "react";
import BuildCard from "@/components/BuildCard";
import { API_URL, BuildListResponse } from "@/lib/api";
import { useLocale } from "@/i18n/LocaleContext";
import { gameOptions } from "@/i18n/options";

export default function MetaPage() {
  const { t } = useLocale();
  const [game, setGame] = useState("");
  const [leagues, setLeagues] = useState<string[]>([]);
  const [league, setLeague] = useState("");
  const [results, setResults] = useState<BuildListResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (game) params.set("game", game);
    fetch(`${API_URL}/api/builds/leagues?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: string[]) => {
        setLeagues(data);
        setLeague(data[0] ?? "");
      });
  }, [game]);

  useEffect(() => {
    // fetching the leaderboard whenever game/league changes is the point of this effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const params = new URLSearchParams({ sort: "popularity", page_size: "20" });
    if (game) params.set("game", game);
    if (league) params.set("league_patch", league);
    fetch(`${API_URL}/api/builds?${params.toString()}`)
      .then((r) => r.json())
      .then(setResults)
      .finally(() => setLoading(false));
  }, [game, league]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold">{t.meta.title}</h1>
      <p className="mt-1 text-sm text-neutral-500">{t.meta.subtitle}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <select value={game} onChange={(e) => setGame(e.target.value)} className="input w-auto">
          {gameOptions(t).map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
        <select
          value={league}
          onChange={(e) => setLeague(e.target.value)}
          className="input w-auto"
          disabled={leagues.length === 0}
        >
          {leagues.length === 0 && <option value="">{t.meta.noLeague}</option>}
          {leagues.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        {loading && <p className="text-sm text-neutral-500">{t.meta.loading}</p>}
        {!loading && results?.items.length === 0 && (
          <p className="text-sm text-neutral-500">{t.meta.noBuilds}</p>
        )}
        <ul className="flex flex-col gap-4">
          {results?.items.map((build) => <BuildCard key={build.id} build={build} />)}
        </ul>
      </div>
    </main>
  );
}
