"""Ruční/cronem spouštěný scraper oficiálního PoE fóra (SPEC.md, sekce 8 a 10, krok 8).

Respektuje robots.txt (viz app/crawler/forum_client.py) a mezi requesty záměrně čeká
(RATE_LIMIT_DELAY_SECONDS) — SPEC.md, sekce 5, bod 1: "max. 1 request / několik sekund".

Spuštění: python -m app.crawler.run_forum

Žádné API klíče/přihlašovací údaje netřeba — čte se jen veřejně dostupný obsah desek.
"""

import time

from app.crawler.forum_client import build_forum_client, fetch_board_threads
from app.crawler.forum_ingest import ingest_forum_threads
from app.db import SessionLocal

RATE_LIMIT_DELAY_SECONDS = 3

# (board_id, hra, class hint — None pro desku se smíšenými třídami)
# PoE1 class-boardy jsou samy o sobě klasifikací (spolehlivější než hádání z textu).
DEFAULT_BOARDS: list[tuple[str, str, str | None]] = [
    ("2216", "poe2", None),  # Path of Exile 2 Builds (smíšené třídy)
    ("22", "poe1", "Witch"),
    ("marauder", "poe1", "Marauder"),
    ("24", "poe1", "Ranger"),
    ("40", "poe1", "Duelist"),
    ("41", "poe1", "Templar"),
    ("303", "poe1", "Shadow"),
    ("436", "poe1", "Scion"),
]


def run(boards: list[tuple[str, str, str | None]] | None = None) -> None:
    boards = boards or DEFAULT_BOARDS
    db = SessionLocal()
    try:
        with build_forum_client() as client:
            for i, (board_id, game, class_hint) in enumerate(boards):
                if i > 0:
                    time.sleep(RATE_LIMIT_DELAY_SECONDS)
                threads = fetch_board_threads(client, board_id, page=1)
                stats = ingest_forum_threads(db, threads, game, class_hint)
                print(
                    f"[{game}] board {board_id}: fetched={len(threads)} "
                    f"inserted={stats['inserted']} "
                    f"duplicates={stats['skipped_duplicate']} "
                    f"not_build={stats['skipped_not_build']}"
                )
    finally:
        db.close()


if __name__ == "__main__":
    run()
