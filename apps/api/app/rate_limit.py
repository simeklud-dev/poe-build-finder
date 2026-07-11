from datetime import datetime, timedelta, timezone

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.submission_attempt import SubmissionAttempt


def is_rate_limited(db: Session, ip_hash: str, limit_per_hour: int) -> bool:
    window_start = datetime.now(timezone.utc) - timedelta(hours=1)
    count = db.scalar(
        select(func.count())
        .select_from(SubmissionAttempt)
        .where(
            SubmissionAttempt.ip_hash == ip_hash,
            SubmissionAttempt.created_at >= window_start,
        )
    )
    return count >= limit_per_hour


def record_attempt(db: Session, ip_hash: str) -> None:
    db.add(SubmissionAttempt(ip_hash=ip_hash))
    db.commit()
