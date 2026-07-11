from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class ReportCreateRequest(BaseModel):
    reason: Optional[str] = Field(default=None, max_length=500)


class ReportOut(BaseModel):
    id: UUID
    build_id: UUID
    build_title: str
    build_source_url: str
    reason: Optional[str] = None
    status: str
    created_at: datetime
