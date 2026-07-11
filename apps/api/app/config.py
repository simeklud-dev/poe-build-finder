from pathlib import Path

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Lokálně (celý monorepo pohromadě) je config.py na apps/api/app/config.py, takže
# kořen repa je o 3 úrovně výš. Na hostingu (Railway apod.), kde bývá Root Directory
# nastavený rovnou na apps/api, tahle hlubší struktura neexistuje — v tom případě
# žádný .env soubor nenačítáme a spoléháme čistě na proměnné prostředí z UI hostingu.
_here = Path(__file__).resolve()
_repo_root = _here.parents[3] if len(_here.parents) > 3 else None
REPO_ROOT_ENV_FILE = (_repo_root / ".env") if _repo_root else None


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://poe:poe@localhost:5432/poe_build_finder"

    # Railway (a další hostingy) dávají DATABASE_URL bez '+psycopg' driveru — SQLAlchemy
    # ho ale vyžaduje. Bez tohohle by šlo o ruční úpravu proměnné na hostingu při každém
    # nasazení; takhle funguje surová platformní DATABASE_URL beze změny.
    @field_validator("database_url")
    @classmethod
    def normalize_database_url(cls, v: str) -> str:
        if v.startswith("postgresql://"):
            return v.replace("postgresql://", "postgresql+psycopg://", 1)
        if v.startswith("postgres://"):
            return v.replace("postgres://", "postgresql+psycopg://", 1)
        return v

    # CORS — čárkou oddělený seznam povolených originů frontendu. Lokálně jen dev
    # server; na hostingu sem přidej produkční URL frontendu (ZMĚŇ/DOPLŇ v .env).
    cors_origins: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    # admin (pre-moderation) — single shared admin account, no user accounts yet (fáze 2)
    admin_username: str = "admin"
    admin_password: str = "changeme"

    # anti-spam pro anonymní formulář (sekce 3, 5.7, 7 v SPEC.md)
    ip_hash_salt: str = "change-this-salt"
    submission_rate_limit_per_hour: int = 5

    # Reddit API konektor (krok 4) — vlastní "script" app na https://www.reddit.com/prefs/apps
    # (typ "script"), žádné uživatelské jméno/heslo netřeba, jen client_id + client_secret
    reddit_client_id: str = ""
    reddit_client_secret: str = ""
    reddit_user_agent: str = "poe-build-finder/0.1 (crawler)"

    # YouTube Data API v3 konektor (krok 5) — API klíč z Google Cloud Console,
    # žádné OAuth přihlášení netřeba (read-only přístup k veřejným datům)
    youtube_api_key: str = ""

    # Uživatelské účty (post-MVP) — email+heslo, bez emailové služby (rozhodnuto
    # 2026-07-10): žádné ověření emailu/reset hesla odkazem, jen hashované heslo +
    # podepsaný JWT token. ZMĚŇ jwt_secret pro cokoliv mimo lokální vývoj.
    jwt_secret: str = "change-this-jwt-secret"
    jwt_expiry_days: int = 30
    auth_rate_limit_per_hour: int = 10

    model_config = SettingsConfigDict(
        env_file=str(REPO_ROOT_ENV_FILE) if REPO_ROOT_ENV_FILE else None,
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
