"""Denní cron pro stažení oficiálních PoE novinek z pathofexile.com/news/rss.

Nahrazuje dřívější ručně udržovaný `apps/web/src/data/poe-news.ts` — frontend teď
čte novinky přes `GET /api/poe-news` místo napevno vypsaného pole (viz
apps/web/src/components/PoeNewsWidget.tsx).

Spuštění:    python -m app.crawler.run_poe_news
Naplánování: připojeno `&&`-em k existující denní cron službě (check_links), viz
             POZNATKY.md — Railway free/trial plán má limit 5 služeb na projekt,
             takže nová vlastní cron služba nešla přidat.
"""

import httpx

from app.crawler.poe_news_client import fetch_news_rss, parse_news_rss
from app.crawler.poe_news_ingest import ingest_poe_news
from app.db import SessionLocal


def run() -> None:
    try:
        xml_text = fetch_news_rss()
    except httpx.HTTPError as exc:
        # pathofexile.com občas dočasně odmítne požadavek (např. 403) — nemá smysl kvůli
        # tomu shazovat celý cron běh (sdílený `&&`-em s check_links), příští běh to zkusí znovu.
        print(f"poe_news: fetch failed, skipping this run ({exc!r})")
        return

    entries = parse_news_rss(xml_text)

    db = SessionLocal()
    try:
        stats = ingest_poe_news(db, entries)
        print(
            f"poe_news: fetched={len(entries)} inserted={stats['inserted']} "
            f"duplicates={stats['skipped_duplicate']}"
        )
    finally:
        db.close()


if __name__ == "__main__":
    run()
