from datetime import datetime, timezone
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.build import ADMIN_EXTERNAL_SOURCES, Build
from app.schemas.build import (
    AdminBuildCreateRequest,
    AdminBuildListResponse,
    AdminBuildOut,
    AdminBuildUpdateRequest,
    ModerationDecisionRequest,
    PendingBuildOut,
)
from app.security import require_admin

router = APIRouter(
    prefix="/api/admin/builds",
    tags=["admin"],
    dependencies=[Depends(require_admin)],
)


def _get_build_or_404(db: Session, build_id: UUID) -> Build:
    build = db.get(Build, build_id)
    if build is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Build not found")
    return build


def _get_external_build_or_404(db: Session, build_id: UUID) -> Build:
    """Jako `_get_build_or_404`, ale jen pro buildy spravovatelné přes tenhle CRUD
    (Maxroll/PoE Vault/Mobalytics odkazy) — nedovolí přes tenhle endpoint omylem
    přepsat/smazat build, který spravuje crawler (Reddit/YouTube/fórum)."""
    build = _get_build_or_404(db, build_id)
    if build.source not in ADMIN_EXTERNAL_SOURCES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Build not found among admin-managed external links",
        )
    return build


@router.get("", response_model=AdminBuildListResponse)
def list_external_builds(
    db: Session = Depends(get_db),
    class_tag: Optional[str] = Query(default=None, alias="class_tag"),
    source_site: Optional[str] = Query(default=None, alias="source_site"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=50, ge=1, le=200),
) -> AdminBuildListResponse:
    """Odkazy na buildy z Maxroll/PoE Vault/Mobalytics, spravované admin CRUD níže —
    na rozdíl od veřejného GET /api/builds tu vidíš i buildy s link_status='broken'."""
    conditions = [Build.source.in_(ADMIN_EXTERNAL_SOURCES)]
    if class_tag:
        conditions.append(func.lower(Build.class_) == class_tag.lower())
    if source_site:
        conditions.append(Build.source == source_site)

    total = db.scalar(select(func.count()).select_from(Build).where(*conditions))
    items = list(
        db.scalars(
            select(Build)
            .where(*conditions)
            .order_by(Build.created_at.desc())
            .offset((page - 1) * page_size)
            .limit(page_size)
        ).all()
    )
    return AdminBuildListResponse(
        items=[AdminBuildOut.model_validate(b) for b in items], total=total or 0
    )


@router.post("", response_model=AdminBuildOut, status_code=status.HTTP_201_CREATED)
def create_external_build(
    payload: AdminBuildCreateRequest, db: Session = Depends(get_db)
) -> Build:
    """Ruční přidání odkazu (SPEC.md, sekce 5): jen metadata + odkaz na originál,
    nikdy obsah stránky. Rovnou approved — je to ověřený ruční vstup, ne anonymní
    community formulář (ten jde přes POST /api/builds/submit a čeká na schválení)."""
    build = Build(
        title=payload.title,
        source=payload.source_site,
        source_url=payload.url,
        author=payload.author,
        moderation_status="approved",
        game=payload.game,
        class_=payload.class_tag,
        build_type=payload.build_type,
        league_patch=payload.league_version,
        description=payload.short_note,
        tags=payload.tags,
        link_status="unchecked",
    )
    db.add(build)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A build with this source_site + url already exists.",
        )
    db.refresh(build)
    return build


@router.put("/{build_id}", response_model=AdminBuildOut)
def update_external_build(
    build_id: UUID, payload: AdminBuildUpdateRequest, db: Session = Depends(get_db)
) -> Build:
    build = _get_external_build_or_404(db, build_id)

    if payload.title is not None:
        build.title = payload.title
    if payload.source_site is not None:
        build.source = payload.source_site
    if payload.url is not None:
        build.source_url = payload.url
    if payload.game is not None:
        build.game = payload.game
    if payload.class_tag is not None:
        build.class_ = payload.class_tag
    if payload.build_type is not None:
        build.build_type = payload.build_type
    if payload.league_version is not None:
        build.league_patch = payload.league_version
    if payload.short_note is not None:
        build.description = payload.short_note
    if payload.author is not None:
        build.author = payload.author
    if payload.tags is not None:
        build.tags = payload.tags

    build.updated_at = datetime.now(timezone.utc)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A build with this source_site + url already exists.",
        )
    db.refresh(build)
    return build


@router.delete("/{build_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_external_build(build_id: UUID, db: Session = Depends(get_db)) -> None:
    build = _get_external_build_or_404(db, build_id)
    db.delete(build)
    db.commit()


@router.get("/pending", response_model=list[PendingBuildOut])
def list_pending(db: Session = Depends(get_db)) -> list[Build]:
    return list(
        db.scalars(
            select(Build)
            .where(Build.moderation_status == "pending")
            .order_by(Build.created_at.asc())
        ).all()
    )


@router.get("/{build_id}", response_model=AdminBuildOut)
def get_external_build(build_id: UUID, db: Session = Depends(get_db)) -> Build:
    return _get_external_build_or_404(db, build_id)


@router.post("/{build_id}/approve")
def approve_build(build_id: UUID, db: Session = Depends(get_db)) -> dict:
    build = _get_build_or_404(db, build_id)
    build.moderation_status = "approved"
    build.moderated_at = datetime.now(timezone.utc)
    db.commit()
    return {"status": "approved"}


@router.post("/{build_id}/reject")
def reject_build(
    build_id: UUID, payload: ModerationDecisionRequest, db: Session = Depends(get_db)
) -> dict:
    build = _get_build_or_404(db, build_id)
    build.moderation_status = "rejected"
    build.moderated_at = datetime.now(timezone.utc)
    build.moderation_note = payload.note
    db.commit()
    return {"status": "rejected"}
