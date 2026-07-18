"""create poe_news_items table

Stores official Path of Exile news metadata (title/url/published_at only, never
full article text — CLAUDE.md) fetched daily from pathofexile.com/news/rss by
app/crawler/run_poe_news.py, replacing the previously hand-maintained
apps/web/src/data/poe-news.ts static list.

Revision ID: 0004
Revises: 0003
Create Date: 2026-07-18

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0004"
down_revision: Union[str, None] = "0003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "poe_news_items",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("url", sa.Text(), nullable=False),
        sa.Column("published_at", sa.TIMESTAMP(timezone=True), nullable=False),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("url", name="uq_poe_news_items_url"),
    )
    op.create_index("idx_poe_news_items_published_at", "poe_news_items", [sa.text("published_at DESC")])


def downgrade() -> None:
    op.drop_index("idx_poe_news_items_published_at", table_name="poe_news_items")
    op.drop_table("poe_news_items")
