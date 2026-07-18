from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.poe_news import PoeNewsItem
from app.schemas.poe_news import PoeNewsItemOut

router = APIRouter(prefix="/api/poe-news", tags=["poe-news"])

DEFAULT_LIMIT = 6
MAX_LIMIT = 20


@router.get("", response_model=list[PoeNewsItemOut])
def list_poe_news(limit: int = DEFAULT_LIMIT, db: Session = Depends(get_db)) -> list[PoeNewsItemOut]:
    limit = max(1, min(limit, MAX_LIMIT))
    return db.scalars(
        select(PoeNewsItem).order_by(PoeNewsItem.published_at.desc()).limit(limit)
    ).all()
