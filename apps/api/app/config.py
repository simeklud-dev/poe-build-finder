from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# apps/api/app/config.py -> repo root is three levels up
REPO_ROOT_ENV_FILE = Path(__file__).resolve().parents[3] / ".env"


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://poe:poe@localhost:5432/poe_build_finder"

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
        env_file=str(REPO_ROOT_ENV_FILE),
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
