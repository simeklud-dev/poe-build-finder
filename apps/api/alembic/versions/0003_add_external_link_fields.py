"""add build_type/link_status/last_checked_at and external-link sources

Adds support for admin-curated "link only" build entries from Maxroll, PoE Vault
and Mobalytics (CLAUDE.md: never scrape their content, only metadata + a link
back to the original). See app/routers/admin.py and app/crawler/check_links.py.

Revision ID: 0003
Revises: 2238ff67cfee
Create Date: 2026-07-12

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0003"
down_revision: Union[str, None] = "2238ff67cfee"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

OLD_SOURCES = ("reddit", "youtube", "poe_forum", "pob_forum", "poe_ninja", "community")
NEW_SOURCES = OLD_SOURCES + ("maxroll", "poevault", "mobalytics")
LINK_STATUSES = ("ok", "broken", "unchecked")


def upgrade() -> None:
    op.add_column("builds", sa.Column("build_type", sa.Text(), nullable=True))
    op.add_column(
        "builds",
        sa.Column("link_status", sa.Text(), nullable=False, server_default="unchecked"),
    )
    op.add_column(
        "builds", sa.Column("last_checked_at", sa.TIMESTAMP(timezone=True), nullable=True)
    )

    op.drop_constraint("ck_builds_source", "builds", type_="check")
    op.create_check_constraint("ck_builds_source", "builds", f"source IN {NEW_SOURCES}")
    op.create_check_constraint(
        "ck_builds_link_status", "builds", f"link_status IN {LINK_STATUSES}"
    )

    op.create_index("idx_builds_link_status", "builds", ["link_status"])


def downgrade() -> None:
    op.drop_index("idx_builds_link_status", table_name="builds")
    op.drop_constraint("ck_builds_link_status", "builds", type_="check")
    op.drop_constraint("ck_builds_source", "builds", type_="check")
    op.create_check_constraint("ck_builds_source", "builds", f"source IN {OLD_SOURCES}")

    op.drop_column("builds", "last_checked_at")
    op.drop_column("builds", "link_status")
    op.drop_column("builds", "build_type")
