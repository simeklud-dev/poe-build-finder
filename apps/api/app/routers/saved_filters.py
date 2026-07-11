"""Uložené filtry (post-MVP) — základ pro in-app upozornění na nové buildy dle
uloženého filtru (SPEC.md, sekce 3, fáze 2). Bez emailové služby jde o počítadlo
nových shod od posledního zobrazení, ne emailový alert."""

from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.build_filters import build_filter_conditions
from app.db import get_db
from app.models.build import Build
from app.models.saved_filter import SavedFilter
from app.models.user import User
from app.schemas.saved_filter import SavedFilterCreateRequest, SavedFilterOut

router = APIRouter(prefix="/api/saved-filters", tags=["saved-filters"])


def _new_matches_count(db: Session, saved_filter: SavedFilter) -> int:
    params = saved_filter.filter_params or {}
    conditions, _ = build_filter_conditions(
        q=params.get("q"),
        game=params.get("game"),
        source=params.get("source"),
        class_=params.get("class"),
        ascendancy=params.get("ascendancy"),
        main_skill=params.get("main_skill"),
        league_patch=params.get("league_patch"),
        tags=params.get("tags") or [],
    )
    conditions.append(Build.indexed_at > saved_filter.last_checked_at)
    return db.scalar(select(func.count()).select_from(Build).where(*conditions)) or 0


def _to_out(db: Session, saved_filter: SavedFilter) -> SavedFilterOut:
    return SavedFilterOut(
        id=saved_filter.id,
        name=saved_filter.name,
        filter_params=saved_filter.filter_params,
        new_matches_count=_new_matches_count(db, saved_filter),
        created_at=saved_filter.created_at,
    )


def _get_owned_or_404(db: Session, filter_id: UUID, user: User) -> SavedFilter:
    saved_filter = db.get(SavedFilter, filter_id)
    if saved_filter is None or saved_filter.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Saved filter not found")
    return saved_filter


@router.get("", response_model=list[SavedFilterOut])
def list_saved_filters(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> list[SavedFilterOut]:
    filters = db.scalars(
        select(SavedFilter)
        .where(SavedFilter.user_id == current_user.id)
        .order_by(SavedFilter.created_at.desc())
    ).all()
    return [_to_out(db, f) for f in filters]


@router.post("", response_model=SavedFilterOut, status_code=status.HTTP_201_CREATED)
def create_saved_filter(
    payload: SavedFilterCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> SavedFilterOut:
    filter_params = payload.model_dump(exclude={"name"}, by_alias=True, exclude_none=True)
    saved_filter = SavedFilter(
        user_id=current_user.id, name=payload.name, filter_params=filter_params
    )
    db.add(saved_filter)
    db.commit()
    db.refresh(saved_filter)
    return _to_out(db, saved_filter)


@router.delete("/{filter_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_saved_filter(
    filter_id: UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> None:
    saved_filter = _get_owned_or_404(db, filter_id, current_user)
    db.delete(saved_filter)
    db.commit()


@router.post("/{filter_id}/mark-seen", response_model=SavedFilterOut)
def mark_seen(
    filter_id: UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> SavedFilterOut:
    saved_filter = _get_owned_or_404(db, filter_id, current_user)
    saved_filter.last_checked_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(saved_filter)
    return _to_out(db, saved_filter)
