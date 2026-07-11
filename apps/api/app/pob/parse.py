"""Parsování PoB XML — class/ascendancy/main skill/staty (SPEC.md, sekce 6-7).

Toto je nejspolehlivější zdroj klasifikace, pokud je PoB kód k dispozici (sekce 7,
bod 1). Formát je stabilní napříč verzemi PoB, ale ne úplně identický — proto se u
statů zkouší více kandidátních názvů atributů (různé verze PoB je pojmenovávají
mírně jinak).
"""

import xml.etree.ElementTree as ET
from dataclasses import dataclass

from app.pob.decode import decode_pob_code

STAT_CANDIDATES: dict[str, list[str]] = {
    "dps": ["TotalDPS", "FullDPS", "CombinedDPS", "AverageDamage"],
    "life": ["Life"],
    "ehp": ["TotalEHP", "EffectiveHitPool"],
}


@dataclass
class PobBuildInfo:
    class_name: str | None = None
    ascendancy_name: str | None = None
    main_skill: str | None = None
    level: int | None = None
    stats_dps: float | None = None
    stats_life: float | None = None
    stats_ehp: float | None = None


def _first_stat(stats: dict[str, str], candidates: list[str]) -> float | None:
    for name in candidates:
        if name in stats:
            try:
                return float(stats[name])
            except ValueError:
                continue
    return None


def _clean(value: str | None) -> str | None:
    if not value or value == "None":
        return None
    return value


def parse_pob_xml(xml_str: str) -> PobBuildInfo:
    root = ET.fromstring(xml_str)
    info = PobBuildInfo()

    build_el = root.find("Build")
    if build_el is not None:
        info.class_name = _clean(build_el.get("className"))
        info.ascendancy_name = _clean(build_el.get("ascendClassName"))
        level = build_el.get("level")
        info.level = int(level) if level and level.isdigit() else None

        stats = {
            stat_el.get("stat"): stat_el.get("value")
            for stat_el in build_el.findall("PlayerStat")
            if stat_el.get("stat") is not None
        }
        info.stats_dps = _first_stat(stats, STAT_CANDIDATES["dps"])
        info.stats_life = _first_stat(stats, STAT_CANDIDATES["life"])
        info.stats_ehp = _first_stat(stats, STAT_CANDIDATES["ehp"])

    # hlavní skill = první gem v první zapnuté skill grupě, co není support gem
    # (SkillSet wrapper je jen u novějších/multi-set exportů, proto hledáme .//Skill)
    for skill_el in root.findall(".//Skill"):
        if skill_el.get("enabled", "true").lower() != "true":
            continue
        for gem_el in skill_el.findall("Gem"):
            if gem_el.get("enabled", "true").lower() != "true":
                continue
            name = gem_el.get("nameSpec") or gem_el.get("skillId")
            if name and "support" not in name.lower():
                info.main_skill = name
                break
        if info.main_skill:
            break

    return info


def try_parse_pob_code(code: str) -> PobBuildInfo | None:
    """`decode_pob_code` + `parse_pob_xml`, ale nikdy nevyhodí výjimku — vrátí None
    při jakémkoliv neplatném/neočekávaném vstupu (uživatel může vložit cokoliv)."""
    try:
        return parse_pob_xml(decode_pob_code(code))
    except Exception:
        return None
