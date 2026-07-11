"""Normalizace + deduplikace + uložení YouTube videí jako buildů (SPEC.md, sekce 7-8, 11)."""

from datetime import datetime

from sqlalchemy.orm import Session

from app.crawler.classify import classify_text, looks_like_build_post
from app.crawler.common import build_already_exists, enrich_with_inline_pob_code, save_build, short_description
from app.crawler.youtube_client import YouTubeVideo
from app.models.build import Build


def _parse_published_at(value: str) -> datetime:
    # YouTube vrací "2024-05-01T12:34:56Z"
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def ingest_youtube_videos(db: Session, videos: list[YouTubeVideo], game: str) -> dict[str, int]:
    """Vrací počty {inserted, skipped_duplicate, skipped_not_build} pro logování v run_youtube.py."""

    inserted = 0
    skipped_duplicate = 0
    skipped_not_build = 0

    for video in videos:
        if not looks_like_build_post(video.title, video.description, None):
            skipped_not_build += 1
            continue

        source_url = f"https://www.youtube.com/watch?v={video.id}"

        if build_already_exists(db, "youtube", source_url):
            skipped_duplicate += 1
            continue

        combined_text = f"{video.title}\n{video.description}"
        classification = classify_text(game, combined_text)
        enriched = enrich_with_inline_pob_code(combined_text, classification)

        build = Build(
            title=video.title,
            description=short_description(video.description),
            source="youtube",
            source_url=source_url,
            source_id=video.id,
            author=video.channel_title,
            moderation_status="approved",  # automaticky nalezené buildy jsou approved rovnou (sekce 11)
            game=game,
            class_=enriched.class_,
            ascendancy=enriched.ascendancy,
            main_skill=enriched.main_skill,
            league_patch=classification.league_patch,
            tags=classification.tags,
            thumbnail_url=video.thumbnail_url,  # YouTube thumbnaily přes API jsou výslovně povolené (sekce 5.2)
            popularity_score=video.view_count,
            published_at=_parse_published_at(video.published_at),
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
