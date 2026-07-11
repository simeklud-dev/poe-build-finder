"use client";

import { useEffect, useState, FormEvent } from "react";
import BuildCard from "@/components/BuildCard";
import { API_URL, BuildListResponse } from "@/lib/api";
import { GAMES, SOURCES, SORTS } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";

const PAGE_SIZE = 20;

export default function Home() {
  const { token } = useAuth();

  const [q, setQ] = useState("");
  const [game, setGame] = useState("");
  const [source, setSource] = useState("");
  const [buildClass, setBuildClass] = useState("");
  const [ascendancy, setAscendancy] = useState("");
  const [mainSkill, setMainSkill] = useState("");
  const [leaguePatch, setLeaguePatch] = useState("");
  const [tags, setTags] = useState("");
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const [results, setResults] = useState<BuildListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveFilterMessage, setSaveFilterMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        if (game) params.set("game", game);
        if (source) params.set("source", source);
        if (buildClass) params.set("class", buildClass);
        if (ascendancy) params.set("ascendancy", ascendancy);
        if (mainSkill) params.set("main_skill", mainSkill);
        if (leaguePatch) params.set("league_patch", leaguePatch);
        tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .forEach((t) => params.append("tags", t));
        params.set("sort", sort);
        params.set("page", String(page));
        params.set("page_size", String(PAGE_SIZE));

        const response = await fetch(`${API_URL}/api/builds?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("request failed");
        const data: BuildListResponse = await response.json();
        setResults(data);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError("Nepodařilo se načíst buildy.");
        }
      } finally {
        setLoading(false);
      }
    }

    void run();
    return () => controller.abort();
    // filter text fields are read fresh from closure each render; this effect only
    // needs to auto-refire on pagination/sort clicks or an explicit submit (refreshKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, refreshKey]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (page !== 1) {
      setPage(1);
    } else {
      setRefreshKey((k) => k + 1);
    }
  }

  async function saveCurrentFilter() {
    if (!token) return;
    const name = window.prompt("Název pro uložený filtr:");
    if (!name || !name.trim()) return;

    setSaveFilterMessage(null);
    const payload: Record<string, unknown> = { name: name.trim() };
    if (q.trim()) payload.q = q.trim();
    if (game) payload.game = game;
    if (source) payload.source = source;
    if (buildClass) payload.class = buildClass;
    if (ascendancy) payload.ascendancy = ascendancy;
    if (mainSkill) payload.main_skill = mainSkill;
    if (leaguePatch) payload.league_patch = leaguePatch;
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (tagList.length > 0) payload.tags = tagList;

    const response = await fetch(`${API_URL}/api/saved-filters`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setSaveFilterMessage(
      response.ok ? "Filtr uložen — najdeš ho na stránce Účet." : "Uložení filtru se nepovedlo."
    );
  }

  const totalPages = results ? Math.max(1, Math.ceil(results.total / results.page_size)) : 1;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Hledat buildy</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Meta-vyhledávač buildů pro Path of Exile 1 a 2 napříč Redditem, YouTube, fóry a
        komunitou.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Hledat v názvu a popisu..."
          className="input"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <select value={game} onChange={(e) => setGame(e.target.value)} className="input">
            {GAMES.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          <select value={source} onChange={(e) => setSource(e.target.value)} className="input">
            {SOURCES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <input
            value={buildClass}
            onChange={(e) => setBuildClass(e.target.value)}
            placeholder="Class"
            className="input"
          />
          <input
            value={ascendancy}
            onChange={(e) => setAscendancy(e.target.value)}
            placeholder="Ascendancy"
            className="input"
          />
          <input
            value={mainSkill}
            onChange={(e) => setMainSkill(e.target.value)}
            placeholder="Hlavní skill"
            className="input"
          />
          <input
            value={leaguePatch}
            onChange={(e) => setLeaguePatch(e.target.value)}
            placeholder="Liga / patch"
            className="input"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tagy (odděl čárkou)"
            className="input"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input">
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="self-start rounded-md bg-neutral-900 px-4 py-2 text-white"
          >
            Hledat
          </button>
          {token && (
            <button
              type="button"
              onClick={saveCurrentFilter}
              className="self-start rounded-md border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-700"
            >
              Uložit filtr
            </button>
          )}
          {saveFilterMessage && (
            <span className="text-sm text-neutral-500">{saveFilterMessage}</span>
          )}
        </div>
      </form>

      <p className="mt-4 text-xs text-neutral-500">
        Nenašel jsi, co hledáš? Zkus hledat i na{" "}
        <a
          href="https://maxroll.gg/poe/build-guides"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Maxroll
        </a>{" "}
        nebo{" "}
        <a
          href="https://mobalytics.gg/poe-2/builds"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Mobalytics
        </a>
        .
      </p>

      <div className="mt-8">
        {loading && <p className="text-sm text-neutral-500">Načítám...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && results && results.items.length === 0 && (
          <p className="text-sm text-neutral-500">
            Žádné buildy neodpovídají zadaným filtrům. Zkus je uvolnit, nebo{" "}
            <a href="/submit" className="underline">
              přidej svůj vlastní
            </a>
            .
          </p>
        )}

        <ul className="flex flex-col gap-4">
          {results?.items.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </ul>

        {results && results.total > 0 && (
          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md border border-neutral-300 px-3 py-1.5 disabled:opacity-40 dark:border-neutral-700"
            >
              Předchozí
            </button>
            <span className="text-neutral-500">
              Strana {results.page} z {totalPages} ({results.total} buildů)
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md border border-neutral-300 px-3 py-1.5 disabled:opacity-40 dark:border-neutral-700"
            >
              Další
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
