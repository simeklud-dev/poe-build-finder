"""Normalizace + deduplikace + uložení Reddit postů jako buildů (SPEC.md, sekce 7-8, 11)."""

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.crawler.classify import classify_text, game_for_subreddit, looks_like_build_post
from app.crawler.common import build_already_exists, enrich_with_inline_pob_code, save_build, short_description
from app.crawler.reddit_client import RedditPost
from app.models.build import Build


def ingest_reddit_posts(db: Session, posts: list[RedditPost]) -> dict[str, int]:
    """Vrací počty {inserted, skipped_duplicate, skipped_not_build} pro logování v run_reddit.py."""

    inserted = 0
    skipped_duplicate = 0
    skipped_not_build = 0

    for post in posts:
        game = game_for_subreddit(post.subreddit)
        if game is None or not looks_like_build_post(post.title, post.selftext, post.link_flair_text):
            skipped_not_build += 1
            continue

        source_url = f"https://reddit.com{post.permalink}"

        if build_already_exists(db, "reddit", source_url):
            skipped_duplicate += 1
            continue

        combined_text = f"{post.title}\n{post.selftext}"
        classification = classify_text(game, combined_text)
        enriched = enrich_with_inline_pob_code(combined_text, classification)

        build = Build(
            title=post.title,
            description=short_description(post.selftext),
            source="reddit",
            source_url=source_url,
            source_id=post.id,
            author=post.author,
            moderation_status="approved",  # automaticky nalezené buildy jsou approved rovnou (sekce 11)
            game=game,
            class_=enriched.class_,
            ascendancy=enriched.ascendancy,
            main_skill=enriched.main_skill,
            league_patch=classification.league_patch,
            tags=classification.tags,
            popularity_score=post.score,
            published_at=datetime.fromtimestamp(post.created_utc, tz=timezone.utc),
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
