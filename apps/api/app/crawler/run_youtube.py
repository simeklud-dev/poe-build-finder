"""Ruční/cronem spouštěný YouTube crawler (SPEC.md, sekce 8 a 10, krok 5).

Spuštění:      python -m app.crawler.run_youtube
Naplánování:   periodicky (např. každou hodinu) přes cron / Windows Task Scheduler,
               nezávisle na frontendu/API procesu — viz README.md a SPEC.md sekce 8.

Vyžaduje YOUTUBE_API_KEY v .env (viz README.md).
"""

import httpx

from app.crawler.youtube_client import fetch_videos_for_query, require_api_key
from app.crawler.youtube_ingest import ingest_youtube_videos
from app.db import SessionLocal

# (hra, vyhledávací dotaz) dvojice — SPEC.md sekce 4: "Search dle klíčových slov"
DEFAULT_SEARCH_QUERIES: list[tuple[str, str]] = [
    ("poe1", "Path of Exile build guide"),
    ("poe1", "Path of Exile league starter build"),
    ("poe2", "Path of Exile 2 build guide"),
]
VIDEOS_PER_QUERY = 25


def run(
    queries: list[tuple[str, str]] | None = None, max_results: int = VIDEOS_PER_QUERY
) -> None:
    queries = queries or DEFAULT_SEARCH_QUERIES
    api_key = require_api_key()
    db = SessionLocal()
    try:
        with httpx.Client(timeout=10.0) as client:
            for game, query in queries:
                videos = fetch_videos_for_query(client, api_key, query, max_results=max_results)
                stats = ingest_youtube_videos(db, videos, game)
                print(
                    f"[{game}] '{query}': fetched={len(videos)} "
                    f"inserted={stats['inserted']} "
                    f"duplicates={stats['skipped_duplicate']} "
                    f"not_build={stats['skipped_not_build']}"
                )
    finally:
        db.close()


if __name__ == "__main__":
    run()
