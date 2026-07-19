import { Dictionary } from "./translations";

export function gameOptions(t: Dictionary, withAll: boolean = true) {
  const opts = [
    { value: "poe1", label: t.games.poe1 },
    { value: "poe2", label: t.games.poe2 },
  ];
  return withAll ? [{ value: "", label: t.games.all }, ...opts] : opts;
}

// Popisek zdroje podle DB hodnoty (Reddit/YouTube/...) — s fallbackem na syrovou
// hodnotu, kdyby v `translations.ts` chyběl (viz sources sekce Dictionary).
export function sourceLabel(t: Dictionary, value: string): string {
  return (t.sources as Record<string, string>)[value] ?? value;
}

// Dropdown možnosti z reálných DB hodnot (viz GET /api/builds/facets) — "autofilter"
// styl místo napevno psaného seznamu. `allLabel` je popisek prázdné "vše" volby.
export function dynamicOptions(
  values: string[],
  allLabel: string,
  labels?: (value: string) => string,
) {
  return [
    { value: "", label: allLabel },
    ...values.map((v) => ({ value: v, label: labels ? labels(v) : v })),
  ];
}

export function sortOptions(t: Dictionary) {
  return [
    { value: "date", label: t.sorts.date },
    { value: "popularity", label: t.sorts.popularity },
    { value: "relevance", label: t.sorts.relevance },
  ];
}
