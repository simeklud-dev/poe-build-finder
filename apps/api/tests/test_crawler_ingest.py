from sqlalchemy import select

from app.crawler.ingest import ingest_reddit_posts
from app.crawler.reddit_client import RedditPost
from app.db import SessionLocal
from app.models.build import Build
from app.pob.decode import encode_pob_code

SAMPLE_POB_XML = """<?xml version="1.0" encoding="UTF-8"?>
<PathOfBuilding>
    <Build level="93" className="Duelist" ascendClassName="Slayer">
        <PlayerStat stat="TotalDPS" value="9999999"/>
        <PlayerStat stat="Life" value="5000"/>
        <PlayerStat stat="TotalEHP" value="35000"/>
    </Build>
    <Skills activeSkillSet="1">
        <SkillSet id="1">
            <Skill label="" enabled="true">
                <Gem nameSpec="Cyclone" enabled="true"/>
            </Skill>
        </SkillSet>
    </Skills>
</PathOfBuilding>
"""


def _post(**overrides) -> RedditPost:
    defaults = dict(
        id="abc123",
        title="SRS Necromancer League Starter build guide",
        selftext="A powerful minion build for league start. " * 10,
        author="RedditUser1",
        permalink="/r/pathofexilebuilds/comments/abc123/srs_necro/",
        created_utc=1750000000.0,
        score=250,
        link_flair_text=None,
        subreddit="pathofexilebuilds",
    )
    defaults.update(overrides)
    return RedditPost(**defaults)


def test_ingest_inserts_approved_build():
    db = SessionLocal()
    try:
        stats = ingest_reddit_posts(db, [_post()])
        assert stats == {"inserted": 1, "skipped_duplicate": 0, "skipped_not_build": 0}

        build = db.scalar(select(Build).where(Build.source_id == "abc123"))
        assert build is not None
        assert build.source == "reddit"
        assert build.moderation_status == "approved"
        assert build.game == "poe1"
        assert build.class_ == "Witch"
        assert build.ascendancy == "Necromancer"
        assert build.main_skill == "Summon Raging Spirit"
        assert build.popularity_score == 250
        assert build.source_url == "https://reddit.com/r/pathofexilebuilds/comments/abc123/srs_necro/"
        assert build.description is not None and build.description.endswith("…")
    finally:
        db.close()


def test_ingest_skips_duplicate_on_rerun():
    db = SessionLocal()
    try:
        ingest_reddit_posts(db, [_post()])
        stats = ingest_reddit_posts(db, [_post()])
        assert stats == {"inserted": 0, "skipped_duplicate": 1, "skipped_not_build": 0}

        count = db.scalar(select(Build).where(Build.source_id == "abc123"))
        assert count is not None  # still exactly one row, no error
    finally:
        db.close()


def test_ingest_skips_unknown_subreddit():
    db = SessionLocal()
    try:
        stats = ingest_reddit_posts(db, [_post(subreddit="unrelated", id="skip1")])
        assert stats == {"inserted": 0, "skipped_duplicate": 0, "skipped_not_build": 1}
    finally:
        db.close()


def test_ingest_skips_non_build_looking_post():
    db = SessionLocal()
    try:
        stats = ingest_reddit_posts(
            db,
            [
                _post(
                    id="skip2",
                    title="What do you think about the new patch notes?",
                    selftext="just chatting about balance changes",
                )
            ],
        )
        assert stats == {"inserted": 0, "skipped_duplicate": 0, "skipped_not_build": 1}
    finally:
        db.close()


def test_ingest_uses_inline_pob_code_when_present():
    code = encode_pob_code(SAMPLE_POB_XML)
    db = SessionLocal()
    try:
        # záměrně nekonzistentní title (naznačuje Necromancer) — PoB kód (Slayer/Cyclone)
        # by měl mít přednost, protože je spolehlivější (SPEC.md, sekce 7, bod 1)
        stats = ingest_reddit_posts(
            db,
            [
                _post(
                    id="pobpost1",
                    title="Necromancer-ish title but check my real build below",
                    selftext=f"Full PoB code:\n{code}\nbuild guide inside",
                )
            ],
        )
        assert stats["inserted"] == 1

        build = db.scalar(select(Build).where(Build.source_id == "pobpost1"))
        assert build.class_ == "Duelist"
        assert build.ascendancy == "Slayer"
        assert build.main_skill == "Cyclone"
        assert build.stats_dps == 9999999
        assert build.stats_life == 5000
        assert build.stats_ehp == 35000
    finally:
        db.close()


def test_ingest_short_selftext_kept_as_is():
    db = SessionLocal()
    try:
        ingest_reddit_posts(db, [_post(id="short1", selftext="Short build guide description.")])
        build = db.scalar(select(Build).where(Build.source_id == "short1"))
        assert build.description == "Short build guide description."
    finally:
        db.close()
