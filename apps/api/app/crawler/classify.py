"""Klasifikace buildů z volného textu pomocí klíčových slov/regexu.

SPEC.md, sekce 7, bod 2: "Klíčová slova / regex na název a popis (funguje slušně,
protože komunita používá konzistentní názvosloví)." Seznamy níže jsou reprezentativní,
ne vyčerpávající — obzvlášť u PoE2 (early access, třídy/ascendance se mohou měnit
s patchi) a u main_skill (plný seznam gemů by byl obrovský). Když se nic nenajde,
pole zůstává `None` — to je záměr, ne chyba (viz datový model, sekce 6).
"""

import re
from dataclasses import dataclass, field

SUBREDDIT_GAME = {
    "pathofexilebuilds": "poe1",
    "pathofexile": "poe1",
    "pathofexile2": "poe2",
}

CLASS_ASCENDANCIES: dict[str, dict[str, list[str]]] = {
    "poe1": {
        "Witch": ["Necromancer", "Elementalist", "Occultist"],
        "Marauder": ["Juggernaut", "Berserker", "Chieftain"],
        "Ranger": ["Deadeye", "Raider", "Pathfinder"],
        "Duelist": ["Slayer", "Gladiator", "Champion"],
        "Templar": ["Inquisitor", "Hierophant", "Guardian"],
        "Shadow": ["Assassin", "Saboteur", "Trickster"],
        "Scion": ["Ascendant"],
    },
    "poe2": {
        "Warrior": ["Titan", "Warbringer"],
        "Ranger": ["Deadeye", "Pathfinder"],
        "Witch": ["Infernalist", "Blood Mage"],
        "Sorceress": ["Stormweaver", "Chronomancer"],
        "Monk": ["Invoker", "Acolyte of Chayula"],
        "Mercenary": ["Witchhunter", "Gemling Legionnaire"],
    },
}

MAIN_SKILLS: dict[str, list[str]] = {
    "poe1": [
        "Cyclone", "Righteous Fire", "Summon Raging Spirit", "Toxic Rain",
        "Lightning Arrow", "Explosive Arrow", "Tornado Shot", "Blade Vortex",
        "Winter Orb", "Arc", "Ball Lightning", "Ice Nova", "Fireball", "Spark",
        "Bane", "Essence Drain", "Blight", "Blade Flurry", "Boneshatter",
        "Earthquake", "Sunder", "Ground Slam", "Cleave", "Spectral Throw",
        "Kinetic Blast", "Summon Skeletons", "Storm Brand", "Wintertide Brand",
        "Hexblast", "Vortex", "Cold Snap", "Lightning Strike", "Frenzy",
    ],
    "poe2": [
        "Sunder", "Falling Thunder", "Explosive Grenade", "Freezing Shards",
        "Spark", "Fireball", "Galvanic Shards", "Rake", "Flicker Strike",
        "Hammer of the Gods",
    ],
}

# běžné komunitní zkratky (Reddit tituly je hojně používají) — case-sensitive
# matching, aby krátké zkratky jako "RF"/"LA" nechytaly náhodná slova v textu
MAIN_SKILL_ALIASES: dict[str, dict[str, str]] = {
    "poe1": {
        "SRS": "Summon Raging Spirit",
        "RF": "Righteous Fire",
        "EQ": "Earthquake",
        "BV": "Blade Vortex",
        "TS": "Tornado Shot",
        "LA": "Lightning Arrow",
        "ED": "Essence Drain",
    },
    "poe2": {},
}

TAG_VOCABULARY = [
    "League Starter", "Budget", "Beginner Friendly", "SSF", "Bossing",
    "Mapping", "Endgame", "Uber Bosses", "Delver", "Speedrun",
]

# poe1 ligy jsou 1.x-3.x, poe2 early access je 0.x — omezuje falešné shody na náhodná čísla
LEAGUE_PATCH_RE = re.compile(r"\b[0-3]\.\d{1,2}\b")

BUILD_HINT_RE = re.compile(r"\b(build|guide|league\s*start|pob|ascendancy)\b", re.IGNORECASE)
BUILD_FLAIRS = {"build showcase", "guide", "build", "showcase"}

# YouTube search nemá způsob, jak omezit výsledky jen na jednu hru — dotaz
# "Path of Exile build guide" (mířený na poe1) běžně vrátí i videa o PoE2, protože
# název "Path of Exile 2" obsahuje "Path of Exile" jako podřetězec a tvůrci obsahu
# běžně tagují videa hashtagy typu "#POE2". Proto se hra, zjištěná z hledacího
# dotazu, ještě ověřuje/přebíjí podle skutečného textu videa (title+description).
POE2_SIGNAL_RE = re.compile(
    r"\bpoe\s*-?\s*2\b|\bpath\s+of\s+exile\s*2\b|#pathofexile2|\bpoe2\b",
    re.IGNORECASE,
)
POE1_SIGNAL_RE = re.compile(
    r"\bpoe\s*-?\s*1\b|\bpath\s+of\s+exile\s*1\b|#pathofexile1(?!\d)",
    re.IGNORECASE,
)


def detect_game_from_text(text: str, fallback: str) -> str:
    """Zkusí z volného textu (title+description) rozpoznat, jestli jde o PoE1 nebo
    PoE2 podle explicitní zmínky ("PoE2", "Path of Exile 2", hashtagy). Když je
    zmíněná jen jedna z her, vrátí ji (i kdyby to bylo v rozporu s `fallback`) —
    explicitní zmínka v textu je spolehlivější signál než to, na jaký dotaz video
    zareagovalo. Když je zmíněné obojí nebo nic, použije se `fallback` (hra, pro
    kterou byl vyhledávací dotaz sestavený)."""

    has_poe2 = bool(POE2_SIGNAL_RE.search(text))
    has_poe1 = bool(POE1_SIGNAL_RE.search(text))

    if has_poe2 and not has_poe1:
        return "poe2"
    if has_poe1 and not has_poe2:
        return "poe1"
    return fallback


def _find_keyword(text: str, keywords: list[str]) -> str | None:
    for kw in keywords:
        if re.search(rf"\b{re.escape(kw)}\b", text, re.IGNORECASE):
            return kw
    return None


def _find_all_keywords(text: str, keywords: list[str]) -> list[str]:
    return [kw for kw in keywords if re.search(rf"\b{re.escape(kw)}\b", text, re.IGNORECASE)]


def _find_alias(text: str, aliases: dict[str, str]) -> str | None:
    for alias, full_name in aliases.items():
        if re.search(rf"\b{re.escape(alias)}\b", text):  # case-sensitive záměrně
            return full_name
    return None


@dataclass
class Classification:
    game: str
    class_: str | None = None
    ascendancy: str | None = None
    main_skill: str | None = None
    league_patch: str | None = None
    tags: list[str] = field(default_factory=list)


def game_for_subreddit(subreddit_name: str) -> str | None:
    return SUBREDDIT_GAME.get(subreddit_name.lower())


def looks_like_build_post(title: str, selftext: str, flair: str | None) -> bool:
    if flair and flair.strip().lower() in BUILD_FLAIRS:
        return True
    return bool(BUILD_HINT_RE.search(f"{title}\n{selftext}"))


def classify_text(game: str, text: str) -> Classification:
    ascendancies_by_class = CLASS_ASCENDANCIES.get(game, {})
    all_ascendancies = [a for asc_list in ascendancies_by_class.values() for a in asc_list]

    class_ = _find_keyword(text, list(ascendancies_by_class.keys()))
    ascendancy = _find_keyword(text, all_ascendancies)

    if ascendancy and not class_:
        for cls, asc_list in ascendancies_by_class.items():
            if ascendancy in asc_list:
                class_ = cls
                break

    main_skill = _find_keyword(text, MAIN_SKILLS.get(game, []))
    if main_skill is None:
        main_skill = _find_alias(text, MAIN_SKILL_ALIASES.get(game, {}))

    league_match = LEAGUE_PATCH_RE.search(text)
    league_patch = league_match.group(0) if league_match else None

    tags = _find_all_keywords(text, TAG_VOCABULARY)

    return Classification(
        game=game,
        class_=class_,
        ascendancy=ascendancy,
        main_skill=main_skill,
        league_patch=league_patch,
        tags=tags,
    )
