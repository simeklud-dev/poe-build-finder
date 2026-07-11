import uuid

from sqlalchemy import ForeignKey, Index, Text, text
from sqlalchemy.dialects.postgresql import JSONB, TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class SavedFilter(Base):
    """Uložená kombinace filtrů (post-MVP) — základ pro 'notifikace na nové buildy
    dle uloženého filtru' (SPEC.md, sekce 3, fáze 2). Bez emailové služby (viz
    rozhodnutí o účtech) jde o in-app počítadlo nových shod, ne emailový alert."""

    __tablename__ = "saved_filters"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    filter_params: Mapped[dict] = mapped_column(JSONB, nullable=False, server_default=text("'{}'"))
    last_checked_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    created_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    __table_args__ = (Index("idx_saved_filters_user_id", "user_id"),)
