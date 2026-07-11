"""Normalizace + deduplikace + uložení vláken z oficiálního PoE fóra (SPEC.md, sekce 7-8, 11)."""

from datetime import datetime

from sqlalchemy.orm import Session

from app.crawler.classify import classify_text, looks_like_build_post
from app.crawler.common import build_already_exists, enrich_with_inline_pob_code, save_build
from app.crawler.forum_client import FORUM_BASE_URL, ForumThread
from app.models.build import Build

POSTED_AT_FORMAT = "%b %d, %Y, %I:%M:%S %p"


def _parse_posted_at(text: str | None) -> datetime | None:
    if not text:
        return None
    try:
        return datetime.strptime(text, POSTED_AT_FORMAT)
    except ValueError:
        return None


def ingest_forum_threads(
    db: Session, threads: list[ForumThread], game: str, class_hint: str | None = None
) -> dict[str, int]:
    """`class_hint` = třída odvozená ze samotné desky (spolehlivější než hádání z textu,
    protože PoE1 class-boardy jsou už samy o sobě klasifikací — viz run_forum.py)."""

    inserted = 0
    skipped_duplicate = 0
    skipped_not_build = 0

    for thread in threads:
        if not looks_like_build_post(thread.title, "", None):
            skipped_not_build += 1
            continue

        source_url = f"{FORUM_BASE_URL}/forum/view-thread/{thread.id}"

        if build_already_exists(db, "poe_forum", source_url):
            skipped_duplicate += 1
            continue

        classification = classify_text(game, thread.title)
        enriched = enrich_with_inline_pob_code(thread.title, classification)

        build = Build(
            title=thread.title,
            source="poe_forum",
            source_url=source_url,
            source_id=thread.id,
            author=thread.author,
            moderation_status="approved",  # automaticky nalezené buildy jsou approved rovnou (sekce 11)
            game=game,
            class_=class_hint or enriched.class_,
            ascendancy=enriched.ascendancy,
            main_skill=enriched.main_skill,
            league_patch=classification.league_patch,
            tags=classification.tags,
            popularity_score=thread.views,
            published_at=_parse_posted_at(thread.posted_at),
            stats_dps=enriched.stats_dps,
            stats_life=enriched.stats_life,
            stats_ehp=enriched.stats_ehp,
        )
        if save_build(db, build):
            inserted += 1
        else:
            skipped_duplicate += 1

    return {
        "inserted": inserted,
        "skipped_duplicate": skipped_duplicate,
        "skipped_not_build": skipped_not_build,
    }
