"""Parsovací logika pro app/crawler/external_discover.py — čistě na uloženém HTML,
žádná síť. Ověřuje, že se z veřejných přehledových stránek vytáhnou jen (title, url)
páry odpovídající vzoru build guide odkazu, nikdy obsah samotné build stránky."""

from pathlib import Path

from app.crawler.external_discover import (
    parse_mobalytics_html,
    parse_poevault_poe1_html,
    parse_poevault_poe2_class_html,
)

FIXTURES = Path(__file__).parent / "fixtures"


def test_parse_poevault_poe1_extracts_build_links_only():
    html = (FIXTURES / "poevault_poe1_builds_sample.html").read_text(encoding="utf-8")
    items = parse_poevault_poe1_html(html)

    assert len(items) == 2
    assert items[0].title == "POEGuy's Siege Ballista Hierophant Build Guide (Poe Mirage 3.28)"
    assert items[0].url == "https://www.poe-vault.com/guides/siege-ballista-hierophant-build-guide"
    assert items[0].source == "poevault"
    assert items[0].game == "poe1"
    # tag/pagination links must NOT be picked up as builds
    assert all("tag" not in i.url for i in items)


def test_parse_poevault_poe2_class_derives_class_and_ascendancy_from_url():
    html = (FIXTURES / "poevault_poe2_class_sample.html").read_text(encoding="utf-8")
    items = parse_poevault_poe2_class_html(html)

    assert len(items) == 3
    leveling = next(i for i in items if "Leveling" in i.title)
    assert leveling.class_ == "Warrior"
    assert leveling.ascendancy == "Warbringer"
    assert leveling.game == "poe2"

    endgame = next(i for i in items if "Totems" in i.title)
    assert endgame.class_ == "Warrior"
    assert endgame.ascendancy == "Warbringer"
    assert endgame.url == "https://www.poe-vault.com/poe2/warrior/warbringer/totems-build-guide"


def test_parse_mobalytics_only_matches_build_detail_links():
    html = (FIXTURES / "mobalytics_poe1_sample.html").read_text(encoding="utf-8")
    items = parse_mobalytics_html(html, "poe1")

    assert len(items) == 2
    assert items[0].title == "[3.28] Life Stacking Forbidden Rite Reliquarian"
    assert items[0].url == "https://mobalytics.gg/poe/builds/life-stacking-forbidden-rite-reliquarian"
    assert items[0].source == "mobalytics"
    # profile links must not be picked up
    assert all("/profile/" not in i.url for i in items)


def test_parse_mobalytics_classifies_from_title():
    html = """
    <a href="/poe/builds/srs-necromancer-league-starter">SRS Necromancer League Starter 3.29 build guide</a>
    """
    items = parse_mobalytics_html(html, "poe1")
    assert len(items) == 1
    assert items[0].class_ == "Witch"
    assert items[0].ascendancy == "Necromancer"
    assert items[0].league_patch == "3.29"


def test_parse_functions_return_empty_list_when_no_matches():
    assert parse_poevault_poe1_html("<html></html>") == []
    assert parse_poevault_poe2_class_html("<html></html>") == []
    assert parse_mobalytics_html("<html></html>", "poe1") == []
