"""Ukládání PoeNewsEntry záznamů (viz poe_news_client.py) do DB, dedup podle URL."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crawler.poe_news_client import PoeNewsEntry
from app.models.poe_news import PoeNewsItem


def ingest_poe_news(db: Session, entries: list[PoeNewsEntry]) -> dict[str, int]:
    inserted = 0
    skipped = 0

    for entry in entries:
        exists = db.scalar(select(PoeNewsItem.id).where(PoeNewsItem.url == entry.url))
        if exists is not None:
            skipped += 1
            continue

        db.add(PoeNewsItem(title=entry.title, url=entry.url, published_at=entry.published_at))
        inserted += 1

    db.commit()
    return {"inserted": inserted, "skipped_duplicate": skipped}
