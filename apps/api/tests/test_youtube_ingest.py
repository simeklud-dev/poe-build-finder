from sqlalchemy import select

from app.crawler.youtube_client import YouTubeVideo
from app.crawler.youtube_ingest import ingest_youtube_videos
from app.db import SessionLocal
from app.models.build import Build


def _video(**overrides) -> YouTubeVideo:
    defaults = dict(
        id="vid123",
        title="SRS Necromancer League Starter build guide",
        description="A powerful minion build for league start. " * 10,
        channel_title="SomeChannel",
        published_at="2026-01-01T10:00:00Z",
        view_count=1500,
        thumbnail_url="https://img.youtube.com/vid123.jpg",
    )
    defaults.update(overrides)
    return YouTubeVideo(**defaults)


def test_ingest_inserts_approved_build():
    db = SessionLocal()
    try:
        stats = ingest_youtube_videos(db, [_video()], "poe1")
        assert stats == {"inserted": 1, "skipped_duplicate": 0, "skipped_not_build": 0}

        build = db.scalar(select(Build).where(Build.source_id == "vid123"))
        assert build is not None
        assert build.source == "youtube"
        assert build.moderation_status == "approved"
        assert build.game == "poe1"
        assert build.class_ == "Witch"
        assert build.ascendancy == "Necromancer"
        assert build.author == "SomeChannel"
        assert build.thumbnail_url == "https://img.youtube.com/vid123.jpg"
        assert build.popularity_score == 1500
        assert build.source_url == "https://www.youtube.com/watch?v=vid123"
        assert build.published_at is not None
    finally:
        db.close()


def test_ingest_skips_duplicate_on_rerun():
    db = SessionLocal()
    try:
        ingest_youtube_videos(db, [_video()], "poe1")
        stats = ingest_youtube_videos(db, [_video()], "poe1")
        assert stats == {"inserted": 0, "skipped_duplicate": 1, "skipped_not_build": 0}
    finally:
        db.close()


def test_ingest_skips_non_build_looking_video():
    db = SessionLocal()
    try:
        stats = ingest_youtube_videos(
            db,
            [
                _video(
                    id="skip1",
                    title="Path of Exile patch notes discussion",
                    description="just chatting about balance changes",
                )
            ],
            "poe1",
        )
        assert stats == {"inserted": 0, "skipped_duplicate": 0, "skipped_not_build": 1}
    finally:
        db.close()
