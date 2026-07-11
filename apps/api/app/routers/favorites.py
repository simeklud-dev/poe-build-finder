from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.db import get_db
from app.models.build import Build
from app.models.favorite import Favorite
from app.models.user import User
from app.schemas.build import BuildCardOut

router = APIRouter(prefix="/api/favorites", tags=["favorites"])


@router.get("", response_model=list[BuildCardOut])
def list_favorites(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> list[Build]:
    return list(
        db.scalars(
            select(Build)
            .join(Favorite, Favorite.build_id == Build.id)
            .where(Favorite.user_id == current_user.id)
            .order_by(Favorite.created_at.desc())
        ).all()
    )


@router.post("/{build_id}", status_code=status.HTTP_201_CREATED)
def add_favorite(
    build_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    if db.get(Build, build_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Build not found")

    existing = db.scalar(
        select(Favorite).where(Favorite.user_id == current_user.id, Favorite.build_id == build_id)
    )
    if existing is not None:
        return {"status": "already_favorited"}

    db.add(Favorite(user_id=current_user.id, build_id=build_id))
    try:
        db.commit()
    except IntegrityError:
        db.rollback()  # závod dvou requestů — v pořádku, výsledný stav je stejně "favorited"

    return {"status": "favorited"}


@router.delete("/{build_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_favorite(
    build_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    db.execute(
        delete(Favorite).where(Favorite.user_id == current_user.id, Favorite.build_id == build_id)
    )
    db.commit()
