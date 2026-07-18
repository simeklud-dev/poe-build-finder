from datetime import timezone

from app.crawler.poe_news_client import parse_news_rss
from app.crawler.poe_news_ingest import ingest_poe_news
from app.db import SessionLocal
from app.models.poe_news import PoeNewsItem

SAMPLE_RSS = """<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Path of Exile News</title>
<item>
  <title>Announcing Path of Exile: Curse of the Allflame</title>
  <description><![CDATA[Full article text we must NOT store.]]></description>
  <pubDate>Thu, 16 Jul 2026 20:56:43 +0000</pubDate>
  <link>https://www.pathofexile.com/forum/view-thread/3985297</link>
  <guid>https://www.pathofexile.com/forum/view-thread/3985297</guid>
</item>
<item>
  <title>Curse of the Allflame Twitch Drops</title>
  <description><![CDATA[More full text.]]></description>
  <pubDate>Wed, 15 Jul 2026 21:30:16 +0000</pubDate>
  <link>https://www.pathofexile.com/forum/view-thread/3985053</link>
  <guid>https://www.pathofexile.com/forum/view-thread/3985053</guid>
</item>
</channel></rss>
"""


def test_parse_news_rss_extracts_title_url_and_date_only():
    entries = parse_news_rss(SAMPLE_RSS)

    assert len(entries) == 2
    first = entries[0]
    assert first.title == "Announcing Path of Exile: Curse of the Allflame"
    assert first.url == "https://www.pathofexile.com/forum/view-thread/3985297"
    assert first.published_at.astimezone(timezone.utc).isoformat() == "2026-07-16T20:56:43+00:00"


def test_parse_news_rss_skips_items_missing_required_fields():
    xml_text = """<rss><channel>
    <item><title>No link or date</title></item>
    </channel></rss>"""
    assert parse_news_rss(xml_text) == []


def test_ingest_poe_news_inserts_new_and_skips_duplicates():
    entries = parse_news_rss(SAMPLE_RSS)
    db = SessionLocal()
    try:
        stats = ingest_poe_news(db, entries)
        assert stats == {"inserted": 2, "skipped_duplicate": 0}
        assert db.query(PoeNewsItem).count() == 2

        # Re-running with the same entries must not create duplicates.
        stats_again = ingest_poe_news(db, entries)
        assert stats_again == {"inserted": 0, "skipped_duplicate": 2}
        assert db.query(PoeNewsItem).count() == 2
    finally:
        db.close()
