"""Tenký obal nad PRAW — odděluje Reddit API volání od klasifikace/ingestu (testovatelné bez sítě).

Vyžaduje vlastní Reddit "script" aplikaci (https://www.reddit.com/prefs/apps) —
stačí client_id + client_secret, žádné uživatelské přihlášení (read-only přístup
k veřejným datům). Viz README.md, sekce "Reddit konektor".
"""

from dataclasses import dataclass

import praw

from app.config import settings


@dataclass
class RedditPost:
    id: str
    title: str
    selftext: str
    author: str | None
    permalink: str
    created_utc: float
    score: int
    link_flair_text: str | None
    subreddit: str


def build_reddit_client() -> praw.Reddit:
    if not settings.reddit_client_id or not settings.reddit_client_secret:
        raise RuntimeError(
            "REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET nejsou nastavené v .env — viz "
            "README.md, sekce 'Reddit konektor', jak si vytvořit vlastní Reddit aplikaci."
        )
    return praw.Reddit(
        client_id=settings.reddit_client_id,
        client_secret=settings.reddit_client_secret,
        user_agent=settings.reddit_user_agent,
    )


def fetch_new_submissions(reddit: praw.Reddit, subreddit_name: str, limit: int = 25) -> list[RedditPost]:
    subreddit = reddit.subreddit(subreddit_name)
    return [
        RedditPost(
            id=submission.id,
            title=submission.title,
            selftext=submission.selftext or "",
            author=str(submission.author) if submission.author else None,
            permalink=submission.permalink,
            created_utc=submission.created_utc,
            score=submission.score,
            link_flair_text=submission.link_flair_text,
            subreddit=subreddit_name,
        )
        for submission in subreddit.new(limit=limit)
    ]
