"""Oficiální novinky z pathofexile.com/news/rss (denní cron, viz
app/crawler/run_poe_news.py). Ukládáme jen title/url/published_at — NIKDY plný
text článku (RSS <description> se v app/crawler/poe_news_client.py zahazuje), ať
web nekopíruje obsah GGG novinek (CLAUDE.md: jen metadata + odkaz na originál)."""

import uuid

from sqlalchemy import Text, UniqueConstraint, text
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class PoeNewsItem(Base):
    __tablename__ = "poe_news_items"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    title: Mapped[str] = mapped_column(Text, nullable=False)
    url: Mapped[str] = mapped_column(Text, nullable=False)
    published_at: Mapped[object] = mapped_column(TIMESTAMP(timezone=True), nullable=False)
    created_at: Mapped[object] = mapped_column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    __table_args__ = (UniqueConstraint("url", name="uq_poe_news_items_url"),)
