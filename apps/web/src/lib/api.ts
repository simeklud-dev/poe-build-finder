export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface BuildSubmitPayload {
  title: string;
  source_url: string;
  author: string;
  submitted_by: string;
  game: string;
  class: string;
  ascendancy: string;
  main_skill: string;
  league_patch: string;
  tags: string[];
  pob_link: string;
  pob_code: string; // nepovinný, vyplní se jen když uživatel vloží PoB export kód
  website: string; // honeypot — musí zůstat prázdné
}

export interface PendingBuild {
  id: string;
  title: string;
  source_url: string;
  author: string | null;
  submitted_by: string | null;
  game: string;
  class: string | null;
  ascendancy: string | null;
  main_skill: string | null;
  league_patch: string | null;
  tags: string[];
  pob_link: string | null;
  stats_dps: number | null;
  stats_life: number | null;
  stats_ehp: number | null;
  created_at: string;
}

export function basicAuthHeader(username: string, password: string): string {
  return "Basic " + btoa(`${username}:${password}`);
}

export interface BuildCard {
  id: string;
  title: string;
  source: string;
  source_url: string;
  author: string | null;
  game: string;
  class: string | null;
  ascendancy: string | null;
  main_skill: string | null;
  league_patch: string | null;
  tags: string[];
  thumbnail_url: string | null;
  popularity_score: number | null;
  stats_dps: number | null;
  stats_life: number | null;
  stats_ehp: number | null;
  published_at: string | null;
  indexed_at: string;
}

export interface BuildListResponse {
  items: BuildCard[];
  total: number;
  page: number;
  page_size: number;
}

export interface AuthUser {
  id: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

export interface AdminReport {
  id: string;
  build_id: string;
  build_title: string;
  build_source_url: string;
  reason: string | null;
  status: string;
  created_at: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  filter_params: Record<string, unknown>;
  new_matches_count: number;
  created_at: string;
}

// Ruční hromadné přidání odkazů na cizí buildy (Maxroll apod.), které se z
// právních důvodů (robots.txt) nesmí automaticky procházet — admin je sám
// nakopíruje z webu a vloží sem, tenhle typ jen popisuje tvar jednoho řádku
// před odesláním na POST /api/admin/builds.
export interface AdminBuildCreatePayload {
  title: string;
  source_site: "maxroll" | "poevault" | "mobalytics";
  url: string;
  game: "poe1" | "poe2";
  class_tag?: string;
  build_type?: string;
  league_version?: string;
  short_note?: string;
  author?: string;
  tags?: string[];
}

export interface AdminBuildOut {
  id: string;
  title: string;
  source_site: string;
  url: string;
  game: string;
}

