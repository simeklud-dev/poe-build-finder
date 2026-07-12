from app.crawler.classify import (
    classify_text,
    detect_game_from_text,
    game_for_subreddit,
    looks_like_build_post,
)


def test_game_for_subreddit():
    assert game_for_subreddit("pathofexilebuilds") == "poe1"
    assert game_for_subreddit("PathOfExile") == "poe1"
    assert game_for_subreddit("pathofexile2") == "poe2"
    assert game_for_subreddit("unrelated") is None


def test_looks_like_build_post_by_flair():
    assert looks_like_build_post("Some title", "", "Build Showcase") is True


def test_looks_like_build_post_by_keyword():
    assert looks_like_build_post("My SRS Necromancer build", "", None) is True
    assert looks_like_build_post("What patch notes say about X", "just chatting", None) is False


def test_classify_text_finds_class_and_ascendancy():
    result = classify_text("poe1", "SRS Necromancer League Starter 3.29 build guide")
    assert result.class_ == "Witch"
    assert result.ascendancy == "Necromancer"
    assert result.main_skill == "Summon Raging Spirit"
    assert result.league_patch == "3.29"
    assert "League Starter" in result.tags


def test_classify_text_infers_class_from_ascendancy_alone():
    result = classify_text("poe1", "Slayer Cyclone build, no class mentioned directly")
    assert result.ascendancy == "Slayer"
    assert result.class_ == "Duelist"


def test_classify_text_poe2():
    result = classify_text("poe2", "PoE2 Warrior Titan Sunder league starter 0.5")
    assert result.class_ == "Warrior"
    assert result.ascendancy == "Titan"
    assert result.main_skill == "Sunder"
    assert result.league_patch == "0.5"


def test_classify_text_returns_none_when_nothing_matches():
    result = classify_text("poe1", "just some random unrelated text with no keywords")
    assert result.class_ is None
    assert result.ascendancy is None
    assert result.main_skill is None
    assert result.league_patch is None
    assert result.tags == []


def test_detect_game_from_text_overrides_when_poe2_mentioned():
    # regression test: YouTube search for a "poe1" query used to blindly tag every
    # result as poe1, even when the video was clearly about PoE2 (e.g. "#POE2" in
    # the title) — see run_youtube.py / youtube_ingest.py.
    text = "End Game 1000 Div Build #POE2 #PathOfExile"
    assert detect_game_from_text(text, fallback="poe1") == "poe2"


def test_detect_game_from_text_keeps_fallback_when_only_poe1_signal():
    text = "My Righteous Fire Juggernaut league starter build guide"
    assert detect_game_from_text(text, fallback="poe1") == "poe1"


def test_detect_game_from_text_keeps_fallback_when_ambiguous():
    # both explicitly mentioned -> trust the search query bucket
    text = "Comparing PoE1 vs PoE2 endgame builds"
    assert detect_game_from_text(text, fallback="poe1") == "poe1"
    assert detect_game_from_text(text, fallback="poe2") == "poe2"


def test_detect_game_from_text_explicit_poe1_mention():
    text = "Path of Exile 1 is still great in 2026"
    assert detect_game_from_text(text, fallback="poe2") == "poe1"
