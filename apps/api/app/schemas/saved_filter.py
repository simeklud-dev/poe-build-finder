from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class SavedFilterCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    q: Optional[str] = None
    game: Optional[str] = None
    source: Optional[str] = None
    class_: Optional[str] = Field(default=None, alias="class")
    ascendancy: Optional[str] = None
    main_skill: Optional[str] = None
    league_patch: Optional[str] = None
    tags: list[str] = Field(default_factory=list)
    author: Optional[str] = None

    model_config = {"populate_by_name": True}


class SavedFilterOut(BaseModel):
    id: UUID
    name: str
    filter_params: dict
    new_matches_count: int
    created_at: datetime
