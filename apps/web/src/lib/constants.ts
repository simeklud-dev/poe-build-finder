export const GAMES = [
  { value: "", label: "Všechny hry" },
  { value: "poe1", label: "Path of Exile 1" },
  { value: "poe2", label: "Path of Exile 2" },
];

export const SOURCES = [
  { value: "", label: "Všechny zdroje" },
  { value: "reddit", label: "Reddit" },
  { value: "youtube", label: "YouTube" },
  { value: "poe_forum", label: "PoE fórum" },
  { value: "pob_forum", label: "PoB Community" },
  { value: "poe_ninja", label: "poe.ninja" },
  { value: "community", label: "Komunita" },
];

export const SORTS = [
  { value: "date", label: "Nejnovější" },
  { value: "popularity", label: "Nejpopulárnější" },
  { value: "relevance", label: "Relevance (vyžaduje hledaný výraz)" },
];

export const SOURCE_LABELS: Record<string, string> = Object.fromEntries(
  SOURCES.filter((s) => s.value).map((s) => [s.value, s.label])
);

export function formatStat(value: number): string {
  return new Intl.NumberFormat("cs-CZ", { notation: "compact", maximumFractionDigits: 1 }).format(
    value
  );
}
