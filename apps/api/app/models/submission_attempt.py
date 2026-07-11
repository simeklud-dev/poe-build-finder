import uuid

from sqlalchemy import Index, Text, text
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class SubmissionAttempt(Base):
    """Jeden řádek na každý pokus o odeslání community formuláře — čistě pro rate limiting.

    Neukládá se syrová IP adresa, jen sůl+hash (viz app.security.hash_ip), aby v DB
    nebyly osobní údaje navíc k tomu nezbytnému pro anti-spam ochranu.
    """

    __tablename__ = "submission_attempts"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    ip_hash: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    __table_args__ = (
        # deklarováno explicitně, aby ho `alembic revision --autogenerate` nepovažoval
        # za odchylku (byl vytvořený ručně v migraci 0002)
        Index("idx_submission_attempts_ip_hash_created_at", "ip_hash", "created_at"),
    )
