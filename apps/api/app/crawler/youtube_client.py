"""Tenký obal nad YouTube Data API v3 — odděluje HTTP volání od klasifikace/ingestu.

Vyžaduje API klíč z Google Cloud Console (YouTube Data API v3 povolené na projektu).
Jde jen o čtení veřejných dat (search + statistiky), žádné OAuth přihlášení uživatele
netřeba. Viz README.md, sekce "YouTube konektor".
"""

from dataclasses import dataclass

import httpx

from app.config import settings

SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"
VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos"


@dataclass
class YouTubeVideo:
    id: str
    title: str
    description: str
    channel_title: str
    published_at: str  # ISO 8601, přímo z API
    view_count: int
    thumbnail_url: str | None


def require_api_key() -> str:
    if not settings.youtube_api_key:
        raise RuntimeError(
            "YOUTUBE_API_KEY není nastavený v .env — viz README.md, sekce "
            "'YouTube konektor', jak si ho vytvořit v Google Cloud Console."
        )
    return settings.youtube_api_key


def search_video_snippets(
    client: httpx.Client, api_key: str, query: str, max_results: int = 25
) -> list[dict]:
    response = client.get(
        SEARCH_URL,
        params={
            "part": "snippet",
            "q": query,
            "type": "video",
            "order": "date",
            "maxResults": max_results,
            "key": api_key,
        },
    )
    response.raise_for_status()
    data = response.json()
    return [
        {
            "id": item["id"]["videoId"],
            "title": item["snippet"]["title"],
            "description": item["snippet"]["description"],
            "channel_title": item["snippet"]["channelTitle"],
            "published_at": item["snippet"]["publishedAt"],
            "thumbnail_url": item["snippet"].get("thumbnails", {}).get("medium", {}).get("url"),
        }
        for item in data.get("items", [])
    ]


def fetch_view_counts(client: httpx.Client, api_key: str, video_ids: list[str]) -> dict[str, int]:
    if not video_ids:
        return {}
    response = client.get(
        VIDEOS_URL,
        params={"part": "statistics", "id": ",".join(video_ids), "key": api_key},
    )
    response.raise_for_status()
    data = response.json()
    return {item["id"]: int(item["statistics"].get("viewCount", 0)) for item in data.get("items", [])}


def fetch_videos_for_query(
    client: httpx.Client, api_key: str, query: str, max_results: int = 25
) -> list[YouTubeVideo]:
    snippets = search_video_snippets(client, api_key, query, max_results)
    view_counts = fetch_view_counts(client, api_key, [s["id"] for s in snippets])
    return [
        YouTubeVideo(
            id=s["id"],
            title=s["title"],
            description=s["description"],
            channel_title=s["channel_title"],
            published_at=s["published_at"],
            view_count=view_counts.get(s["id"], 0),
            thumbnail_url=s["thumbnail_url"],
        )
        for s in snippets
    ]
