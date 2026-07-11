from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.build import Build
from app.schemas.build import ModerationDecisionRequest, PendingBuildOut
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


@router.get("/pending", response_model=list[PendingBuildOut])
def list_pending(db: Session = Depends(get_db)) -> list[Build]:
    return list(
        db.scalars(
            select(Build)
            .where(Build.moderation_status == "pending")
            .order_by(Build.created_at.asc())
        ).all()
    )


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
