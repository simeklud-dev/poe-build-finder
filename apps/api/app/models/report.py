import uuid

from sqlalchemy import CheckConstraint, ForeignKey, Index, Text, text
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base

REPORT_STATUSES = ("open", "resolved", "dismissed")


class Report(Base):
    """Nahlášení už schváleného buildu (spam/nevhodný obsah) — moderace nad rámec
    pre-moderace komunitních příspěvků (SPEC.md, sekce 10, krok 9, post-MVP)."""

    __tablename__ = "reports"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    build_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("builds.id", ondelete="CASCADE"), nullable=False
    )
    reason: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(Text, nullable=False, server_default="open")
    created_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    __table_args__ = (
        CheckConstraint(f"status IN {REPORT_STATUSES}", name="ck_reports_status"),
        Index("idx_reports_build_id", "build_id"),
        Index("idx_reports_status", "status"),
    )
