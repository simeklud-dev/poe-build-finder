from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class PoeNewsItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    title: str
    url: str
    published_at: datetime
