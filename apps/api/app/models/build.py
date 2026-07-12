import uuid

from sqlalchemy import (
    CheckConstraint,
    Computed,
    Index,
    Numeric,
    Text,
    UniqueConstraint,
    text,
)
from sqlalchemy.dialects.postgresql import ARRAY, TIMESTAMP, TSVECTOR, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base

SOURCES = (
    "reddit",
    "youtube",
    "poe_forum",
    "pob_forum",
    "poe_ninja",
    "community",
    # Odkazy-prokliky na komerční buildové weby (CLAUDE.md / SPEC.md sekce 5+7:
    # nikdy scraping obsahu, jen admin ručně zadané metadata + odkaz na originál).
    "maxroll",
    "poevault",
    "mobalytics",
)
MODERATION_STATUSES = ("pending", "approved", "rejected")
GAMES = ("poe1", "poe2")
# Stav dostupnosti odkazu, viz app/crawler/check_links.py (denní cron) — "unchecked"
# dokud ho cron poprvé nezkontroluje, pak "ok"/"broken" podle HTTP status kódu.
LINK_STATUSES = ("ok", "broken", "unchecked")
# Zdroje spravovatelné přes admin CRUD (routers/admin.py) — jde vždy jen o odkaz,
# nikdy o zkopírovaný obsah stránky (viz CLAUDE.md, "Komerční weby").
ADMIN_EXTERNAL_SOURCES = ("maxroll", "poevault", "mobalytics")

SEARCH_VECTOR_EXPR = (
    "setweight(to_tsvector('simple', coalesce(title, '')), 'A') || "
    "setweight(to_tsvector('simple', coalesce(description, '')), 'B')"
)


class Build(Base):
    __tablename__ = "builds"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )

    # základní identifikace
    title: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    source: Mapped[str] = mapped_column(Text, nullable=False)
    source_url: Mapped[str] = mapped_column(Text, nullable=False)
    source_id: Mapped[str | None] = mapped_column(Text)
    author: Mapped[str | None] = mapped_column(Text)
    submitted_by: Mapped[str | None] = mapped_column(Text)

    # moderace
    moderation_status: Mapped[str] = mapped_column(
        Text, nullable=False, server_default="approved"
    )
    moderated_at: Mapped[object | None] = mapped_column(TIMESTAMP(timezone=True))
    moderation_note: Mapped[str | None] = mapped_column(Text)

    # klasifikace
    game: Mapped[str] = mapped_column(Text, nullable=False)
    class_: Mapped[str | None] = mapped_column("class", Text)
    ascendancy: Mapped[str | None] = mapped_column(Text)
    main_skill: Mapped[str | None] = mapped_column(Text)
    league_patch: Mapped[str | None] = mapped_column(Text)
    tags: Mapped[list[str]] = mapped_column(
        ARRAY(Text), nullable=False, server_default=text("'{}'")
    )

    # Typ buildu (např. "league starter", "endgame boss killer") — hlavně u ručně
    # přidaných odkazů z Maxroll/PoE Vault/Mobalytics, kde nejde spolehlivě odvodit
    # z textu jako u Reddit/YouTube (viz app/crawler/classify.py).
    build_type: Mapped[str | None] = mapped_column(Text)

    # Dostupnost odkazu — viz LINK_STATUSES výše a app/crawler/check_links.py.
    link_status: Mapped[str] = mapped_column(Text, nullable=False, server_default="unchecked")
    last_checked_at: Mapped[object | None] = mapped_column(TIMESTAMP(timezone=True))

    # PoB a statistiky
    pob_link: Mapped[str | None] = mapped_column(Text)
    stats_dps: Mapped[float | None] = mapped_column(Numeric)
    stats_life: Mapped[float | None] = mapped_column(Numeric)
    stats_ehp: Mapped[float | None] = mapped_column(Numeric)

    # prezentace / řazení
    thumbnail_url: Mapped[str | None] = mapped_column(Text)
    popularity_score: Mapped[float | None] = mapped_column(Numeric)

    # časové značky
    published_at: Mapped[object | None] = mapped_column(TIMESTAMP(timezone=True))
    indexed_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    created_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    updated_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    # fulltext
    search_vector: Mapped[object | None] = mapped_column(
        TSVECTOR, Computed(SEARCH_VECTOR_EXPR, persisted=True)
    )

    __table_args__ = (
        CheckConstraint(f"source IN {SOURCES}", name="ck_builds_source"),
        CheckConstraint(
            f"moderation_status IN {MODERATION_STATUSES}", name="ck_builds_moderation_status"
        ),
        CheckConstraint(f"game IN {GAMES}", name="ck_builds_game"),
        CheckConstraint(f"link_status IN {LINK_STATUSES}", name="ck_builds_link_status"),
        UniqueConstraint("source", "source_url", name="uq_builds_source_url"),
        # deklarováno explicitně, aby je `alembic revision --autogenerate` nepovažoval
        # za odchylku a nenavrhoval jejich smazání (byly vytvořené ručně v migraci 0001)
        Index("idx_builds_game", "game"),
        Index("idx_builds_class", "class"),
        Index("idx_builds_ascendancy", "ascendancy"),
        Index("idx_builds_main_skill", "main_skill"),
        Index("idx_builds_league_patch", "league_patch"),
        Index("idx_builds_source", "source"),
        Index("idx_builds_moderation", "moderation_status"),
        Index("idx_builds_link_status", "link_status"),
        Index("idx_builds_tags", "tags", postgresql_using="gin"),
        Index("idx_builds_search_vector", "search_vector", postgresql_using="gin"),
        Index("idx_builds_published_at", text("published_at DESC")),
        Index("idx_builds_popularity", text("popularity_score DESC")),
    )
