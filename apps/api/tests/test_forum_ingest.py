from sqlalchemy import select

from app.crawler.forum_client import ForumThread
from app.crawler.forum_ingest import ingest_forum_threads
from app.db import SessionLocal
from app.models.build import Build


def _thread(**overrides) -> ForumThread:
    defaults = dict(
        id="1111111",
        title="[3.29] SRS Necromancer League Starter Guide",
        author="TestAuthor#1234",
        views=4500,
        replies=12,
        posted_at="Jun 1, 2026, 10:00:00 AM",
    )
    defaults.update(overrides)
    return ForumThread(**defaults)


def test_ingest_inserts_approved_build_with_class_hint():
    db = SessionLocal()
    try:
        stats = ingest_forum_threads(db, [_thread()], "poe1", class_hint="Witch")
        assert stats == {"inserted": 1, "skipped_duplicate": 0, "skipped_not_build": 0}

        build = db.scalar(select(Build).where(Build.source_id == "1111111"))
        assert build is not None
        assert build.source == "poe_forum"
        assert build.moderation_status == "approved"
        assert build.game == "poe1"
        assert build.class_ == "Witch"  # z class_hint (deska), ne z textu
        assert build.ascendancy == "Necromancer"  # z klasifikace textu
        assert build.main_skill == "Summon Raging Spirit"
        assert build.popularity_score == 4500
        assert build.source_url == "https://www.pathofexile.com/forum/view-thread/1111111"
        assert build.published_at is not None
    finally:
        db.close()


def test_ingest_skips_duplicate_on_rerun():
    db = SessionLocal()
    try:
        ingest_forum_threads(db, [_thread()], "poe1", class_hint="Witch")
        stats = ingest_forum_threads(db, [_thread()], "poe1", class_hint="Witch")
        assert stats == {"inserted": 0, "skipped_duplicate": 1, "skipped_not_build": 0}
    finally:
        db.close()


def test_ingest_skips_non_build_looking_thread():
    db = SessionLocal()
    try:
        stats = ingest_forum_threads(
            db,
            [_thread(id="skip1", title="Just a question about mana")],
            "poe1",
            class_hint="Witch",
        )
        assert stats == {"inserted": 0, "skipped_duplicate": 0, "skipped_not_build": 1}
    finally:
        db.close()


def test_ingest_without_class_hint_uses_text_classification():
    db = SessionLocal()
    try:
        ingest_forum_threads(
            db,
            [_thread(id="mixed1", title="[0.5] Warrior Titan Sunder league starter build guide")],
            "poe2",
            class_hint=None,
        )
        build = db.scalar(select(Build).where(Build.source_id == "mixed1"))
        assert build.class_ == "Warrior"
        assert build.ascendancy == "Titan"
    finally:
        db.close()


def test_ingest_handles_unparseable_date_gracefully():
    db = SessionLocal()
    try:
        ingest_forum_threads(
            db,
            [_thread(id="baddate1", posted_at="not a real date")],
            "poe1",
            class_hint="Witch",
        )
        build = db.scalar(select(Build).where(Build.source_id == "baddate1"))
        assert build is not None
        assert build.published_at is None
    finally:
        db.close()
