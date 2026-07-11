"""Ruční/cronem spouštěný Reddit crawler (SPEC.md, sekce 8 a 10, krok 4).

Spuštění:      python -m app.crawler.run_reddit
Naplánování:   periodicky (např. každou hodinu) přes cron / Windows Task Scheduler,
               nezávisle na frontendu/API procesu — viz README.md a SPEC.md sekce 8.

Vyžaduje REDDIT_CLIENT_ID a REDDIT_CLIENT_SECRET v .env (viz README.md).
"""

from app.crawler.ingest import ingest_reddit_posts
from app.crawler.reddit_client import build_reddit_client, fetch_new_submissions
from app.db import SessionLocal

DEFAULT_SUBREDDITS = ["pathofexilebuilds", "pathofexile", "pathofexile2"]
POSTS_PER_SUBREDDIT = 25


def run(subreddits: list[str] | None = None, limit: int = POSTS_PER_SUBREDDIT) -> None:
    subreddits = subreddits or DEFAULT_SUBREDDITS
    reddit = build_reddit_client()
    db = SessionLocal()
    try:
        for subreddit_name in subreddits:
            posts = fetch_new_submissions(reddit, subreddit_name, limit=limit)
            stats = ingest_reddit_posts(db, posts)
            print(
                f"r/{subreddit_name}: fetched={len(posts)} "
                f"inserted={stats['inserted']} "
                f"duplicates={stats['skipped_duplicate']} "
                f"not_build={stats['skipped_not_build']}"
            )
    finally:
        db.close()


if __name__ == "__main__":
    run()
