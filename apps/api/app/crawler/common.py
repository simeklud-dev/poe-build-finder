"""Sdílené pomocné funkce pro crawlery jednotlivých zdrojů (Reddit, YouTube, ...)."""

from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.crawler.classify import Classification
from app.models.build import Build
from app.pob.extract import find_inline_pob_code
from app.pob.parse import try_parse_pob_code

DESCRIPTION_MAX_LEN = 280


@dataclass
class EnrichedFields:
    class_: str | None
    ascendancy: str | None
    main_skill: str | None
    stats_dps: float | None
    stats_life: float | None
    stats_ehp: float | None


def enrich_with_inline_pob_code(text: str, classification: Classification) -> EnrichedFields:
    """Pokud `text` obsahuje doslova vložený PoB export kód (ne odkaz — ten se nikdy
    nefetchuje, viz app/pob/decode.py), jeho data přebijí výsledek `classify_text`,
    protože jde o nejspolehlivější zdroj klasifikace (SPEC.md, sekce 7, bod 1)."""

    code = find_inline_pob_code(text)
    pob_info = try_parse_pob_code(code) if code else None

    return EnrichedFields(
        class_=pob_info.class_name if pob_info and pob_info.class_name else classification.class_,
        ascendancy=(
            pob_info.ascendancy_name
            if pob_info and pob_info.ascendancy_name
            else classification.ascendancy
        ),
        main_skill=(
            pob_info.main_skill if pob_info and pob_info.main_skill else classification.main_skill
        ),
        stats_dps=pob_info.stats_dps if pob_info else None,
        stats_life=pob_info.stats_life if pob_info else None,
        stats_ehp=pob_info.stats_ehp if pob_info else None,
    )


def short_description(text: str, max_len: int = DESCRIPTION_MAX_LEN) -> str | None:
    """Krátký automaticky generovaný popis, ne plný text (SPEC.md, sekce 5, bod 2)."""
    stripped = text.strip()
    if not stripped:
        return None
    if len(stripped) <= max_len:
        return stripped
    return stripped[:max_len].rsplit(" ", 1)[0] + "…"


def build_already_exists(db: Session, source: str, source_url: str) -> bool:
    return (
        db.scalar(select(Build.id).where(Build.source == source, Build.source_url == source_url))
        is not None
    )


def save_build(db: Session, build: Build) -> bool:
    """Uloží build; vrací False (a rollbackne) při konfliktu unique(source, source_url)."""
    db.add(build)
    try:
        db.commit()
        return True
    except IntegrityError:
        db.rollback()
        return False
