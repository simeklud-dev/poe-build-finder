import httpx

from app.crawler.youtube_client import fetch_videos_for_query

SEARCH_RESPONSE = {
    "items": [
        {
            "id": {"videoId": "vid1"},
            "snippet": {
                "title": "SRS Necromancer Build Guide",
                "description": "A minion build guide",
                "channelTitle": "SomeChannel",
                "publishedAt": "2026-01-01T10:00:00Z",
                "thumbnails": {"medium": {"url": "https://img.youtube.com/vid1.jpg"}},
            },
        },
        {
            "id": {"videoId": "vid2"},
            "snippet": {
                "title": "Cyclone Slayer Guide",
                "description": "Bossing build",
                "channelTitle": "OtherChannel",
                "publishedAt": "2026-01-02T10:00:00Z",
                "thumbnails": {},
            },
        },
    ]
}

VIDEOS_RESPONSE = {
    "items": [
        {"id": "vid1", "statistics": {"viewCount": "1000"}},
        {"id": "vid2", "statistics": {"viewCount": "500"}},
    ]
}


def _fake_transport() -> httpx.MockTransport:
    def handler(request: httpx.Request) -> httpx.Response:
        if "search" in str(request.url):
            return httpx.Response(200, json=SEARCH_RESPONSE)
        return httpx.Response(200, json=VIDEOS_RESPONSE)

    return httpx.MockTransport(handler)


def test_fetch_videos_for_query_merges_snippet_and_view_count():
    with httpx.Client(transport=_fake_transport()) as client:
        videos = fetch_videos_for_query(client, "fake-key", "path of exile build")

    assert len(videos) == 2
    assert videos[0].id == "vid1"
    assert videos[0].title == "SRS Necromancer Build Guide"
    assert videos[0].view_count == 1000
    assert videos[0].thumbnail_url == "https://img.youtube.com/vid1.jpg"
    assert videos[1].view_count == 500
    assert videos[1].thumbnail_url is None
