from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import func, or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.build_filters import build_filter_conditions
from app.config import settings
from app.db import get_db
from app.models.build import Build
from app.models.report import Report
from app.pob.parse import try_parse_pob_code
from app.rate_limit import is_rate_limited, record_attempt
from app.schemas.build import (
    BuildCardOut,
    BuildListResponse,
    BuildSubmitRequest,
    BuildSubmitResponse,
)
from app.schemas.report import ReportCreateRequest
from app.security import hash_ip

router = APIRouter(prefix="/api/builds", tags=["builds"])

SORT_VALUES = ("date", "popularity", "relevance")


@router.post(
    "/submit",
    response_model=BuildSubmitResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_build(
    payload: BuildSubmitRequest, request: Request, db: Session = Depends(get_db)
) -> BuildSubmitResponse:
    client_ip = request.client.host if request.client else "unknown"
    ip_hash = hash_ip(client_ip)

    if is_rate_limited(db, ip_hash, settings.submission_rate_limit_per_hour):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many submissions from this address, try again later.",
        )
    record_attempt(db, ip_hash)

    if payload.website:
        # honeypot triggered — tváříme se navenek jako úspěch, ale nic neukládáme
        return BuildSubmitResponse()

    # PoB kód (pokud ho uživatel vloží) je nejspolehlivější zdroj klasifikace (sekce
    # 7, bod 1) — jeho hodnoty proto přebijí ručně vyplněná pole, kde je má k dispozici.
    pob_info = try_parse_pob_code(payload.pob_code) if payload.pob_code else None

    build = Build(
        title=payload.title,
        source="community",
        source_url=payload.source_url,
        author=payload.author,
        submitted_by=payload.submitted_by,
        moderation_status="pending",
        game=payload.game,
        class_=(pob_info.class_name if pob_info and pob_info.class_name else payload.class_),
        ascendancy=(
            pob_info.ascendancy_name if pob_info and pob_info.ascendancy_name else payload.ascendancy
        ),
        main_skill=(
            pob_info.main_skill if pob_info and pob_info.main_skill else payload.main_skill
        ),
        league_patch=payload.league_patch,
        tags=payload.tags,
        pob_link=payload.pob_link,
        stats_dps=pob_info.stats_dps if pob_info else None,
        stats_life=pob_info.stats_life if pob_info else None,
        stats_ehp=pob_info.stats_ehp if pob_info else None,
    )
    db.add(build)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This build (URL) has already been submitted.",
        )

    return BuildSubmitResponse()


@router.get("", response_model=BuildListResponse)
def list_builds(
    db: Session = Depends(get_db),
    q: Optional[str] = Query(default=None, description="Fulltextové hledání v názvu a popisu"),
    game: Optional[str] = None,
    ascendancy: Optional[str] = None,
    main_skill: Optional[str] = None,
    league_patch: Optional[str] = None,
    source: Optional[str] = None,
    class_: Optional[str] = Query(default=None, alias="class"),
    tags: list[str] = Query(default_factory=list),
    author: Optional[str] = Query(default=None, description="Content creator / autor (částečná shoda)"),
    sort: str = Query(default="date"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> BuildListResponse:
    """Veřejný search/filter endpoint — vrací jen schválené (approved) buildy."""

    if sort not in SORT_VALUES:
        sort = "date"

    conditions, ts_query = build_filter_conditions(
        q=q,
        game=game,
        source=source,
        class_=class_,
        ascendancy=ascendancy,
        main_skill=main_skill,
        league_patch=league_patch,
        tags=tags,
        author=author,
    )

    total = db.scalar(select(func.count()).select_from(Build).where(*conditions))

    items_query = select(Build).where(*conditions)
    if sort == "popularity":
        items_query = items_query.order_by(
            Build.popularity_score.desc().nulls_last(),
            Build.published_at.desc().nulls_last(),
        )
    elif sort == "relevance" and ts_query is not None:
        items_query = items_query.order_by(func.ts_rank(Build.search_vector, ts_query).desc())
    else:
        items_query = items_query.order_by(
            Build.published_at.desc().nulls_last(), Build.indexed_at.desc()
        )

    items_query = items_query.offset((page - 1) * page_size).limit(page_size)
    items = list(db.scalars(items_query).all())

    return BuildListResponse(
        items=[BuildCardOut.model_validate(b) for b in items],
        total=total or 0,
        page=page,
        page_size=page_size,
    )


@router.get("/leagues", response_model=list[str])
def list_leagues(game: Optional[str] = None, db: Session = Depends(get_db)) -> list[str]:
    """Distinct hodnoty `league_patch` mezi schválenými buildy — pro meta přehled (fáze 2)."""
    conditions = [Build.moderation_status == "approved", Build.league_patch.isnot(None)]
    if game:
        conditions.append(Build.game == game)
    rows = db.scalars(
        select(Build.league_patch).where(*conditions).distinct().order_by(Build.league_patch.desc())
    ).all()
    return list(rows)


@router.get("/{build_id}/similar", response_model=list[BuildCardOut])
def similar_builds(
    build_id: UUID,
    limit: int = Query(default=5, ge=1, le=20),
    db: Session = Depends(get_db),
) -> list[Build]:
    """'Podobné buildy' (SPEC.md, sekce 3, fáze 2) — stejná hra + stejný main_skill
    nebo class, bez samotného buildu. Heuristika, ne strojové učení."""

    build = db.get(Build, build_id)
    if build is None or build.moderation_status != "approved":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Build not found")

    similarity_conditions = []
    if build.main_skill:
        similarity_conditions.append(func.lower(Build.main_skill) == build.main_skill.lower())
    if build.class_:
        similarity_conditions.append(func.lower(Build.class_) == build.class_.lower())
    if not similarity_conditions:
        return []

    conditions = [
        Build.moderation_status == "approved",
        Build.id != build_id,
        Build.game == build.game,
        or_(*similarity_conditions),
    ]
    items = db.scalars(
        select(Build)
        .where(*conditions)
        .order_by(Build.popularity_score.desc().nulls_last())
        .limit(limit)
    ).all()
    return list(items)


@router.post("/{build_id}/report", status_code=status.HTTP_201_CREATED)
def report_build(
    build_id: UUID,
    payload: ReportCreateRequest,
    request: Request,
    db: Session = Depends(get_db),
) -> dict:
    """Nahlášení už schváleného buildu (spam/nevhodný obsah) — moderace nad rámec
    pre-moderace komunitních příspěvků (SPEC.md, sekce 10, krok 9, post-MVP).
    Anonymní, ale rate-limitované stejně jako komunitní formulář."""

    if db.get(Build, build_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Build not found")

    client_ip = request.client.host if request.client else "unknown"
    ip_hash = hash_ip(f"report:{client_ip}")
    if is_rate_limited(db, ip_hash, settings.submission_rate_limit_per_hour):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many reports from this address, try again later.",
        )
    record_attempt(db, ip_hash)

    db.add(Report(build_id=build_id, reason=payload.reason))
    db.commit()
    return {"status": "reported"}
