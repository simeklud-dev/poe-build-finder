"""create builds table

Revision ID: 0001
Revises:
Create Date: 2026-07-10

"""
from typing import Sequence, Union

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

SEARCH_VECTOR_EXPR = (
    "setweight(to_tsvector('simple', coalesce(title, '')), 'A') || "
    "setweight(to_tsvector('simple', coalesce(description, '')), 'B')"
)


def upgrade() -> None:
    op.create_table(
        "builds",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        # základní identifikace
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("source", sa.Text(), nullable=False),
        sa.Column("source_url", sa.Text(), nullable=False),
        sa.Column("source_id", sa.Text(), nullable=True),
        sa.Column("author", sa.Text(), nullable=True),
        sa.Column("submitted_by", sa.Text(), nullable=True),
        # moderace
        sa.Column(
            "moderation_status", sa.Text(), nullable=False, server_default="approved"
        ),
        sa.Column("moderated_at", sa.TIMESTAMP(timezone=True), nullable=True),
        sa.Column("moderation_note", sa.Text(), nullable=True),
        # klasifikace
        sa.Column("game", sa.Text(), nullable=False),
        sa.Column("class", sa.Text(), nullable=True),
        sa.Column("ascendancy", sa.Text(), nullable=True),
        sa.Column("main_skill", sa.Text(), nullable=True),
        sa.Column("league_patch", sa.Text(), nullable=True),
        sa.Column(
            "tags",
            postgresql.ARRAY(sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'"),
        ),
        # PoB a statistiky
        sa.Column("pob_link", sa.Text(), nullable=True),
        sa.Column("stats_dps", sa.Numeric(), nullable=True),
        sa.Column("stats_life", sa.Numeric(), nullable=True),
        sa.Column("stats_ehp", sa.Numeric(), nullable=True),
        # prezentace / řazení
        sa.Column("thumbnail_url", sa.Text(), nullable=True),
        sa.Column("popularity_score", sa.Numeric(), nullable=True),
        # časové značky
        sa.Column("published_at", sa.TIMESTAMP(timezone=True), nullable=True),
        sa.Column(
            "indexed_at",
            sa.TIMESTAMP(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        # fulltext
        sa.Column(
            "search_vector",
            postgresql.TSVECTOR(),
            sa.Computed(SEARCH_VECTOR_EXPR, persisted=True),
            nullable=True,
        ),
        sa.CheckConstraint(
            "source IN ('reddit','youtube','poe_forum','pob_forum','poe_ninja','community')",
            name="ck_builds_source",
        ),
        sa.CheckConstraint(
            "moderation_status IN ('pending','approved','rejected')",
            name="ck_builds_moderation_status",
        ),
        sa.CheckConstraint("game IN ('poe1','poe2')", name="ck_builds_game"),
        sa.UniqueConstraint("source", "source_url", name="uq_builds_source_url"),
    )

    op.create_index("idx_builds_game", "builds", ["game"])
    op.create_index("idx_builds_class", "builds", ["class"])
    op.create_index("idx_builds_ascendancy", "builds", ["ascendancy"])
    op.create_index("idx_builds_main_skill", "builds", ["main_skill"])
    op.create_index("idx_builds_league_patch", "builds", ["league_patch"])
    op.create_index("idx_builds_source", "builds", ["source"])
    op.create_index("idx_builds_moderation", "builds", ["moderation_status"])
    op.create_index("idx_builds_tags", "builds", ["tags"], postgresql_using="gin")
    op.create_index(
        "idx_builds_search_vector", "builds", ["search_vector"], postgresql_using="gin"
    )
    op.create_index(
        "idx_builds_published_at", "builds", [sa.text("published_at DESC")]
    )
    op.create_index(
        "idx_builds_popularity", "builds", [sa.text("popularity_score DESC")]
    )


def downgrade() -> None:
    op.drop_table("builds")
