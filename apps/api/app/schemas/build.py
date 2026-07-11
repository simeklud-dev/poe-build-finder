from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field, field_validator

GAME_VALUES = ("poe1", "poe2")


def _validate_url(value: Optional[str]) -> Optional[str]:
    if value is None or value == "":
        return None
    if not (value.startswith("http://") or value.startswith("https://")):
        raise ValueError("must be a valid http(s) URL")
    return value


class BuildSubmitRequest(BaseModel):
    """Payload anonymního community formuláře (SPEC.md, sekce 3 a 11)."""

    title: str = Field(min_length=3, max_length=200)
    source_url: str = Field(max_length=1000)
    author: Optional[str] = Field(default=None, max_length=200)
    submitted_by: Optional[str] = Field(default=None, max_length=200)
    game: str
    class_: Optional[str] = Field(default=None, max_length=100, alias="class")
    ascendancy: Optional[str] = Field(default=None, max_length=100)
    main_skill: Optional[str] = Field(default=None, max_length=100)
    league_patch: Optional[str] = Field(default=None, max_length=50)
    tags: list[str] = Field(default_factory=list)
    pob_link: Optional[str] = Field(default=None, max_length=500)
    # nepovinný PROSTÝ TEXT PoB export kódu (Path of Building → Export Build → Generate
    # code) — pokud je vyplněný, server ho lokálně dekóduje a použije pro přesnější
    # class/ascendancy/main_skill a staty DPS/Life/EHP (SPEC.md, sekce 7, bod 1).
    # Nikdy se nefetchuje žádný odkaz — jde čistě o kód, který uživatel sám vloží.
    pob_code: Optional[str] = Field(default=None, max_length=20000)

    # honeypot: skryté pole ve formuláři, lidský uživatel ho nevyplní. Pokud přijde
    # neprázdné, request se tváří jako úspěch, ale nic se neuloží (viz routers/builds.py).
    website: str = Field(default="", max_length=200)

    model_config = {"populate_by_name": True}

    @field_validator("game")
    @classmethod
    def validate_game(cls, v: str) -> str:
        if v not in GAME_VALUES:
            raise ValueError(f"game must be one of {GAME_VALUES}")
        return v

    @field_validator("source_url")
    @classmethod
    def validate_source_url(cls, v: str) -> str:
        result = _validate_url(v)
        if result is None:
            raise ValueError("source_url is required")
        return result

    @field_validator("pob_link")
    @classmethod
    def validate_pob_link(cls, v: Optional[str]) -> Optional[str]:
        return _validate_url(v)

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, v: list[str]) -> list[str]:
        return [t.strip() for t in v if t.strip()][:10]


class BuildSubmitResponse(BaseModel):
    status: str = "pending_review"


class PendingBuildOut(BaseModel):
    id: UUID
    title: str
    source_url: str
    author: Optional[str] = None
    submitted_by: Optional[str] = None
    game: str
    # serialization_alias (ne alias) záměrně: čte se z atributu ORM objektu `class_`
    # (attribute-based from_attributes), ale do JSON se serializuje jako "class".
    class_: Optional[str] = Field(default=None, serialization_alias="class")
    ascendancy: Optional[str] = None
    main_skill: Optional[str] = None
    league_patch: Optional[str] = None
    tags: list[str]
    pob_link: Optional[str] = None
    stats_dps: Optional[float] = None
    stats_life: Optional[float] = None
    stats_ehp: Optional[float] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class ModerationDecisionRequest(BaseModel):
    note: Optional[str] = Field(default=None, max_length=1000)


class BuildCardOut(BaseModel):
    """Veřejná karta buildu (SPEC.md, sekce 3): název, autor, zdroj, datum, odkaz na originál."""

    id: UUID
    title: str
    source: str
    source_url: str
    author: Optional[str] = None
    game: str
    class_: Optional[str] = Field(default=None, serialization_alias="class")
    ascendancy: Optional[str] = None
    main_skill: Optional[str] = None
    league_patch: Optional[str] = None
    tags: list[str]
    thumbnail_url: Optional[str] = None
    popularity_score: Optional[float] = None
    stats_dps: Optional[float] = None
    stats_life: Optional[float] = None
    stats_ehp: Optional[float] = None
    published_at: Optional[datetime] = None
    indexed_at: datetime

    model_config = {"from_attributes": True}


class BuildListResponse(BaseModel):
    items: list[BuildCardOut]
    total: int
    page: int
    page_size: int
