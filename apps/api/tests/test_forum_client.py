from pathlib import Path

from app.crawler.forum_client import parse_board_threads

FIXTURE_PATH = Path(__file__).parent / "fixtures" / "forum_board_sample.html"


def test_parse_board_threads_extracts_expected_fields():
    html = FIXTURE_PATH.read_text(encoding="utf-8")
    threads = parse_board_threads(html)

    assert len(threads) == 2

    first = threads[0]
    assert first.id == "1111111"
    assert first.title == "[3.29] SRS Necromancer League Starter Guide"
    assert first.author == "TestAuthor#1234"
    assert first.views == 4500
    assert first.replies == 12
    assert first.posted_at == "Jun 1, 2026, 10:00:00 AM"

    second = threads[1]
    assert second.id == "2222222"  # extracted correctly even with /page/3 suffix in href
    assert second.title == "Just a question about mana"
    assert second.views == 120
    assert second.replies == 3


def test_parse_board_threads_returns_empty_list_for_no_threads():
    assert parse_board_threads("<table></table>") == []
