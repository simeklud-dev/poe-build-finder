from app.config import Settings


def test_database_url_normalizes_postgresql_scheme():
    s = Settings(database_url="postgresql://user:pass@host:5432/db")
    assert s.database_url == "postgresql+psycopg://user:pass@host:5432/db"


def test_database_url_normalizes_postgres_scheme():
    s = Settings(database_url="postgres://user:pass@host:5432/db")
    assert s.database_url == "postgresql+psycopg://user:pass@host:5432/db"


def test_database_url_leaves_psycopg_scheme_untouched():
    s = Settings(database_url="postgresql+psycopg://user:pass@host:5432/db")
    assert s.database_url == "postgresql+psycopg://user:pass@host:5432/db"


def test_cors_origins_list_splits_and_strips():
    s = Settings(cors_origins="http://localhost:3000, https://example.com ,,")
    assert s.cors_origins_list == ["http://localhost:3000", "https://example.com"]
