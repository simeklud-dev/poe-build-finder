import uuid

from sqlalchemy import Boolean, Text, text
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class User(Base):
    """Uživatelský účet (post-MVP) — email+heslo, bez emailové služby (žádné ověření
    emailu ani reset hesla odkazem, viz README.md, sekce 'Uživatelské účty')."""

    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    email: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(Text, nullable=False)
    # umožňuje přihlásit se do /admin běžným účtem (Bearer JWT) místo sdíleného
    # HTTP Basic hesla — viz app/security.py require_admin
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("false"))
    created_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
