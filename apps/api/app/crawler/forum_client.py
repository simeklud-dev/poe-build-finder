"""Scraping oficiálního PoE fóra (pathofexile.com) — žádné oficiální API existuje.

Respektuje `robots.txt` domény (ověřeno při implementaci): `/forum/view-forum/` a
`/forum/view-thread/` (čtení desek a vláken) NEJSOU zakázané, jen akční endpointy
(`/forum/post-reply/`, `/forum/new-thread/`, `/forum/view-post/`, `/api/`) — ty se
zde vůbec nepoužívají.

User-Agent je záměrně čitelný a identifikovatelný (SPEC.md, sekce 5, bod 1) — s
generickým UA nástrojů jako `curl`/`python-requests` web blokuje přes Cloudflare,
s poctivě se představujícím botem ne. Nejde o obcházení bot-detekce, jen o férovou
identifikaci.
"""

from dataclasses import dataclass

import httpx
from bs4 import BeautifulSoup

FORUM_BASE_URL = "https://www.pathofexile.com"
USER_AGENT = (
    "PoEBuildFinderBot/0.1 (+https://github.com/example/poe-build-finder; "
    "non-commercial community build index; respects robots.txt)"
)


@dataclass
class ForumThread:
    id: str
    title: str
    author: str | None
    views: int
    replies: int
    posted_at: str | None  # syrový text data prvního postu, parsuje se v forum_ingest.py


def build_forum_client() -> httpx.Client:
    return httpx.Client(
        base_url=FORUM_BASE_URL,
        headers={"User-Agent": USER_AGENT},
        timeout=15.0,
        follow_redirects=True,
    )


def _extract_thread_id(href: str) -> str:
    # href je tvaru "/forum/view-thread/3786207" nebo "/forum/view-thread/3786207/page/2"
    parts = [p for p in href.split("/") if p]
    idx = parts.index("view-thread")
    return parts[idx + 1]


def _text_or_none(el) -> str | None:
    if el is None:
        return None
    text = el.get_text(strip=True)
    return text or None


def _int_or_zero(el) -> int:
    text = _text_or_none(el)
    return int(text) if text and text.isdigit() else 0


def fetch_board_threads(client: httpx.Client, board_id: str, page: int = 1) -> list[ForumThread]:
    url = f"/forum/view-forum/{board_id}"
    response = client.get(url, params={"page": page} if page > 1 else None)
    response.raise_for_status()
    return parse_board_threads(response.text)


def parse_board_threads(html: str) -> list[ForumThread]:
    soup = BeautifulSoup(html, "html.parser")
    threads: list[ForumThread] = []

    for row in soup.select("tr.odd, tr.even"):
        title_link = row.select_one(".thread_title .title a")
        if title_link is None or not title_link.get("href"):
            continue

        author_link = row.select_one(".postBy a")
        post_date_el = row.select_one(".postBy .post_date")
        views_el = row.select_one(".post-stat span")
        replies_el = row.select_one("td.views strong + span")

        posted_at = _text_or_none(post_date_el)
        if posted_at:
            posted_at = posted_at.lstrip(", ").strip()

        threads.append(
            ForumThread(
                id=_extract_thread_id(title_link["href"]),
                title=title_link.get_text(strip=True),
                author=_text_or_none(author_link),
                views=_int_or_zero(views_el),
                replies=_int_or_zero(replies_el),
                posted_at=posted_at,
            )
        )

    return threads
