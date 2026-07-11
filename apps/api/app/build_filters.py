"""Sdílené sestavení SQL podmínek filtru buildů.

Používá jak `GET /api/builds` (routers/builds.py), tak počítání nových shod u
uložených filtrů (routers/saved_filters.py, post-MVP) — jedna definice "co filtr
znamená", ne dvě rozjeté kopie.
"""

from typing import Optional

from sqlalchemy import func

from app.models.build import Build


def build_filter_conditions(
    q: Optional[str] = None,
    game: Optional[str] = None,
    source: Optional[str] = None,
    class_: Optional[str] = None,
    ascendancy: Optional[str] = None,
    main_skill: Optional[str] = None,
    league_patch: Optional[str] = None,
    tags: Optional[list[str]] = None,
) -> tuple[list, object | None]:
    """Vrací (podmínky, ts_query). `ts_query` je None, pokud `q` není zadané —
    volající ho může znovupoužít pro řazení podle relevance."""

    conditions = [Build.moderation_status == "approved"]
    if game:
        conditions.append(Build.game == game)
    if source:
        conditions.append(Build.source == source)
    if class_:
        conditions.append(func.lower(Build.class_) == class_.lower())
    if ascendancy:
        conditions.append(func.lower(Build.ascendancy) == ascendancy.lower())
    if main_skill:
        conditions.append(func.lower(Build.main_skill) == main_skill.lower())
    if league_patch:
        conditions.append(func.lower(Build.league_patch) == league_patch.lower())
    if tags:
        conditions.append(Build.tags.overlap(tags))

    ts_query = None
    cleaned_q = q.strip() if q else None
    if cleaned_q:
        ts_query = func.plainto_tsquery("simple", cleaned_q)
        conditions.append(Build.search_vector.op("@@")(ts_query))

    return conditions, ts_query
