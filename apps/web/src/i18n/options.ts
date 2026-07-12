import { Dictionary } from "./translations";

export function gameOptions(t: Dictionary, withAll: boolean = true) {
  const opts = [
    { value: "poe1", label: t.games.poe1 },
    { value: "poe2", label: t.games.poe2 },
  ];
  return withAll ? [{ value: "", label: t.games.all }, ...opts] : opts;
}

export function sourceOptions(t: Dictionary) {
  return [
    { value: "", label: t.sources.all },
    { value: "reddit", label: t.sources.reddit },
    { value: "youtube", label: t.sources.youtube },
    { value: "poe_forum", label: t.sources.poe_forum },
    { value: "pob_forum", label: t.sources.pob_forum },
    { value: "poe_ninja", label: t.sources.poe_ninja },
    { value: "community", label: t.sources.community },
  ];
}

export function sortOptions(t: Dictionary) {
  return [
    { value: "date", label: t.sorts.date },
    { value: "popularity", label: t.sorts.popularity },
    { value: "relevance", label: t.sorts.relevance },
  ];
}
