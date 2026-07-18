"""Oficiální RSS feed novinek z pathofexile.com/news/rss.

Jde o první-stranový (GGG vlastní) zdroj, ne komerční web třetí strany — `robots.txt`
domény `/news`, `/news/rss` ani `/news/archive` nezakazuje (ověřeno při implementaci).

Z každé RSS položky se bere JEN title/link/pubDate — `<description>` (plný text/HTML
novinky) se záměrně ignoruje a nikam se neukládá, ať web nekopíruje obsah GGG článků
(CLAUDE.md: jen metadata + odkaz na originál, stejné pravidlo jako u forum_client.py).
"""

from dataclasses import dataclass
from datetime import datetime
from email.utils import parsedate_to_datetime
from xml.etree import ElementTree

import httpx

RSS_URL = "https://www.pathofexile.com/news/rss"
USER_AGENT = (
    "PoEBuildFinderBot/0.1 (+https://github.com/simeklud-dev/poe-build-finder; "
    "non-commercial community build index; respects robots.txt; reads only "
    "title/link/date from the official RSS feed, never the full article)"
)
REQUEST_TIMEOUT_SECONDS = 15.0


@dataclass
class PoeNewsEntry:
    title: str
    url: str
    published_at: datetime


def fetch_news_rss() -> str:
    with httpx.Client(
        headers={"User-Agent": USER_AGENT},
        timeout=REQUEST_TIMEOUT_SECONDS,
        follow_redirects=True,
    ) as client:
        response = client.get(RSS_URL)
        response.raise_for_status()
        return response.text


def parse_news_rss(xml_text: str) -> list[PoeNewsEntry]:
    root = ElementTree.fromstring(xml_text)
    entries: list[PoeNewsEntry] = []

    for item in root.findall("./channel/item"):
        title_el = item.find("title")
        link_el = item.find("link")
        pub_date_el = item.find("pubDate")

        title = title_el.text.strip() if title_el is not None and title_el.text else None
        url = link_el.text.strip() if link_el is not None and link_el.text else None
        pub_date_text = pub_date_el.text.strip() if pub_date_el is not None and pub_date_el.text else None
        if not title or not url or not pub_date_text:
            continue

        entries.append(
            PoeNewsEntry(title=title, url=url, published_at=parsedate_to_datetime(pub_date_text))
        )

    return entries
