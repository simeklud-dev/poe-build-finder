"""Moderace nahlášeného obsahu (post-MVP) — nad rámec pre-moderace komunitních
příspěvků z kroku 2 (SPEC.md, sekce 10, krok 9)."""

from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.build import Build
from app.models.report import Report
from app.schemas.report import ReportOut
from app.security import require_admin

router = APIRouter(
    prefix="/api/admin/reports",
    tags=["admin"],
    dependencies=[Depends(require_admin)],
)


def _to_out(report: Report, build: Build) -> ReportOut:
    return ReportOut(
        id=report.id,
        build_id=report.build_id,
        build_title=build.title,
        build_source_url=build.source_url,
        reason=report.reason,
        status=report.status,
        created_at=report.created_at,
    )


def _get_open_report_or_404(db: Session, report_id: UUID) -> Report:
    report = db.get(Report, report_id)
    if report is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    return report


@router.get("", response_model=list[ReportOut])
def list_open_reports(db: Session = Depends(get_db)) -> list[ReportOut]:
    rows = db.execute(
        select(Report, Build)
        .join(Build, Build.id == Report.build_id)
        .where(Report.status == "open")
        .order_by(Report.created_at.asc())
    ).all()
    return [_to_out(report, build) for report, build in rows]


@router.post("/{report_id}/dismiss")
def dismiss_report(report_id: UUID, db: Session = Depends(get_db)) -> dict:
    report = _get_open_report_or_404(db, report_id)
    report.status = "dismissed"
    db.commit()
    return {"status": "dismissed"}


@router.post("/{report_id}/remove-build")
def remove_reported_build(report_id: UUID, db: Session = Depends(get_db)) -> dict:
    report = _get_open_report_or_404(db, report_id)
    build = db.get(Build, report.build_id)
    if build is not None:
        build.moderation_status = "rejected"
        build.moderated_at = datetime.now(timezone.utc)
        build.moderation_note = "Removed following a user report."
    report.status = "resolved"
    db.commit()
    return {"status": "resolved"}
