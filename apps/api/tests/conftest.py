import pytest
from sqlalchemy import delete

from app.db import SessionLocal
from app.models.build import Build
from app.models.submission_attempt import SubmissionAttempt
from app.models.user import User


@pytest.fixture(autouse=True)
def clean_db():
    """Vyčistí buildy, uživatele a rate-limit záznamy před i po každém testu.

    Testy běží proti reálné dev databázi (viz README), ne proti mocku — tahle fixtura
    ji drží čistou mezi testy. V tuhle chvíli DB nenese žádná reálná data (crawler
    ještě neběží, kroky 4+), takže je bezpečné mazat celé tabulky. Mazání `Build` a
    `User` kaskádovitě smaže i favorites/saved_filters/reports (ON DELETE CASCADE).
    Nespouštět proti produkční DB.
    """

    def _clean():
        db = SessionLocal()
        db.execute(delete(SubmissionAttempt))
        db.execute(delete(Build))
        db.execute(delete(User))
        db.commit()
        db.close()

    _clean()
    yield
    _clean()
