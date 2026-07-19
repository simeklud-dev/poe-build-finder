from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field, field_validator

from app.models.build import ADMIN_EXTERNAL_SOURCES

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
    build_type: Optional[str] = None
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


class BuildFacetsOut(BaseModel):
    """Distinct hodnoty pro filtr-dropdowny na hlavní stránce (GET /api/builds/facets)
    — 'autofilter' styl: jen hodnoty, co v DB mezi schválenými buildy skutečně
    existují, místo napevno psaného seznamu ve frontendu. Scoped jen podle `game`
    (ne křížově podle ostatních vybraných filtrů — vědomé zjednodušení)."""

    source: list[str]
    class_: list[str] = Field(default_factory=list, serialization_alias="class")
    ascendancy: list[str]
    main_skill: list[str]
    league_patch: list[str]
    tags: list[str]


class AdminBuildCreateRequest(BaseModel):
    """Ruční přidání odkazu na build z Maxroll/PoE Vault/Mobalytics admin uživatelem
    (routers/admin.py) — ukládají se jen metadata a odkaz na originál, nikdy obsah
    stránky (CLAUDE.md, sekce 'Komerční weby'). Rovnou moderation_status=approved,
    protože jde o ručně ověřený vstup, ne anonymní community formulář."""

    title: str = Field(min_length=3, max_length=200)
    source_site: str
    url: str = Field(max_length=1000)
    game: str
    class_tag: Optional[str] = Field(default=None, max_length=100)
    build_type: Optional[str] = Field(default=None, max_length=100)
    league_version: Optional[str] = Field(default=None, max_length=50)
    short_note: Optional[str] = Field(default=None, max_length=2000)
    author: Optional[str] = Field(default=None, max_length=200)
    tags: list[str] = Field(default_factory=list)

    @field_validator("source_site")
    @classmethod
    def validate_source_site(cls, v: str) -> str:
        if v not in ADMIN_EXTERNAL_SOURCES:
            raise ValueError(f"source_site must be one of {ADMIN_EXTERNAL_SOURCES}")
        return v

    @field_validator("game")
    @classmethod
    def validate_game(cls, v: str) -> str:
        if v not in GAME_VALUES:
            raise ValueError(f"game must be one of {GAME_VALUES}")
        return v

    @field_validator("url")
    @classmethod
    def validate_url(cls, v: str) -> str:
        result = _validate_url(v)
        if result is None:
            raise ValueError("url is required")
        return result

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, v: list[str]) -> list[str]:
        return [t.strip() for t in v if t.strip()][:10]


class AdminBuildUpdateRequest(BaseModel):
    """Stejná pole jako `AdminBuildCreateRequest`, ale všechna nepovinná — PATCH-like
    částečná úprava přes PUT (nastavené pole se přepíše, nenastavené zůstane beze
    změny). `link_status`/`last_checked_at` se tudy neupravují, ty spravuje jen
    app/crawler/check_links.py."""

    title: Optional[str] = Field(default=None, min_length=3, max_length=200)
    source_site: Optional[str] = None
    url: Optional[str] = Field(default=None, max_length=1000)
    game: Optional[str] = None
    class_tag: Optional[str] = Field(default=None, max_length=100)
    build_type: Optional[str] = Field(default=None, max_length=100)
    league_version: Optional[str] = Field(default=None, max_length=50)
    short_note: Optional[str] = Field(default=None, max_length=2000)
    author: Optional[str] = Field(default=None, max_length=200)
    tags: Optional[list[str]] = None

    @field_validator("source_site")
    @classmethod
    def validate_source_site(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in ADMIN_EXTERNAL_SOURCES:
            raise ValueError(f"source_site must be one of {ADMIN_EXTERNAL_SOURCES}")
        return v

    @field_validator("game")
    @classmethod
    def validate_game(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in GAME_VALUES:
            raise ValueError(f"game must be one of {GAME_VALUES}")
        return v

    @field_validator("url")
    @classmethod
    def validate_url(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        result = _validate_url(v)
        if result is None:
            raise ValueError("url must not be empty")
        return result

    @field_validator("tags")
    @classmethod
    def validate_tags(cls, v: Optional[list[str]]) -> Optional[list[str]]:
        if v is None:
            return None
        return [t.strip() for t in v if t.strip()][:10]


class AdminBuildOut(BaseModel):
    """Admin pohled na odkaz z Maxroll/PoE Vault/Mobalytics — pole pojmenovaná podle
    zadání (source_site/url/class_tag/league_version/short_note/added_at), interně
    čtená z ORM atributů `source`/`source_url`/`class_`/`league_patch`/`description`/
    `created_at` skrze `validation_alias` (stejný trik jako `serialization_alias`
    u `class_` v BuildCardOut výše, jen obousměrně)."""

    id: UUID
    title: str
    source_site: str = Field(validation_alias="source", serialization_alias="source_site")
    url: str = Field(validation_alias="source_url", serialization_alias="url")
    game: str
    class_tag: Optional[str] = Field(
        default=None, validation_alias="class_", serialization_alias="class_tag"
    )
    build_type: Optional[str] = None
    league_version: Optional[str] = Field(
        default=None, validation_alias="league_patch", serialization_alias="league_version"
    )
    short_note: Optional[str] = Field(
        default=None, validation_alias="description", serialization_alias="short_note"
    )
    author: Optional[str] = None
    tags: list[str]
    link_status: str
    added_at: datetime = Field(validation_alias="created_at", serialization_alias="added_at")
    last_checked_at: Optional[datetime] = None

    model_config = {"from_attributes": True, "populate_by_name": True}


class AdminBuildListResponse(BaseModel):
    items: list[AdminBuildOut]
    total: int
