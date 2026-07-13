"""Lehké, jen-odkazové objevování nových buildů z PoE Vault a Mobalytics
(SPEC.md/CLAUDE.md, sekce 5: "Komerční weby — jen odkazy-prokliky, nikdy plný
scraping obsahu").

Co tohle NEDĚLÁ: nikdy nenačítá ani neparsuje stránku samotného build guide
(skilly, gear, staty) — to by byl plný scraping obsahu, přesně to, co je
zakázané. Místo toho stahuje jen veřejné přehledové/hub stránky (seznam buildů
jedné třídy nebo tvůrců) a z nich vytáhne (title, url) párů podle vzoru URL —
obdoba toho, jak by stránku indexoval vyhledávač, ne kopírování obsahu.

- PoE Vault: `class_`/`ascendancy` se berou přímo z cesty URL
  (.../poe2/<class>/<ascendancy>/<slug>-build-guide) — strukturální info, ne
  odvozené z obsahu stránky.
- Mobalytics: nemá třídu v URL, takže se na titulek odkazu pustí stejný
  klíčeslovní klasifikátor (`classify_text`) jako u Reddit/YouTube — když nic
  nenajde, pole zůstanou `None` (to je záměr, viz classify.py).

Maxroll.gg je záměrně VYNECHANÝ: jeho robots.txt obsahuje výslovné upozornění
("Use of any robot, crawler, or other tool to scrape, harvest, extract, or
retrieve any content on this website using automated means is prohibited
without written permission...") a rozsáhlý seznam blokovaných botů (včetně
obecných scraping nástrojů). To respektujeme stejně, jako bychom respektovali
kterýkoliv jiný Disallow — viz POZNATKY.md pro plný zápis rozhodnutí.

Parsovací funkce (`parse_*`) berou už stažené HTML a nepotřebují síť — jde jen
o vytažení (title, url) párů z odkazů, žádný scraping textu článku. Fetch
funkce (`discover_*`) je jen tenký obal, co HTML stáhne a předá parseru.
"""

import re
from dataclasses import dataclass, field
from urllib.parse import urljoin

import httpx
from bs4 import BeautifulSoup

from app.crawler.classify import classify_text

USER_AGENT = (
    "PoEBuildFinderBot/0.1 (+https://github.com/simeklud-dev/poe-build-finder; "
    "non-commercial community build index; only reads public build-guide listing "
    "pages for title+URL, never fetches an individual guide's own page)"
)
REQUEST_TIMEOUT_SECONDS = 10.0

POE_VAULT_BASE = "https://www.poe-vault.com"
MOBALYTICS_BASE = "https://mobalytics.gg"

POE_VAULT_POE2_CLASSES = [
    "warrior",
    "huntress",
    "mercenary",
    "monk",
    "ranger",
    "sorceress",
    "witch",
    "druid",
]
POE_VAULT_BUILD_HREF_RE = re.compile(r"-(build-guide|leveling-build)/?$")

MOBALYTICS_BUILD_HREF_RE = {
    "poe1": re.compile(r"^/poe/builds/[\w-]+/?$"),
    "poe2": re.compile(r"^/poe-2/builds/[\w-]+/?$"),
}


@dataclass
class DiscoveredBuild:
    title: str
    url: str
    source: str
    game: str
    class_: str | None = None
    ascendancy: str | None = None
    league_patch: str | None = None
    tags: list[str] = field(default_factory=list)


def parse_poevault_poe1_html(html: str) -> list[DiscoveredBuild]:
    soup = BeautifulSoup(html, "html.parser")
    seen: set[str] = set()
    results: list[DiscoveredBuild] = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if not POE_VAULT_BUILD_HREF_RE.search(href):
            continue
        url = urljoin(POE_VAULT_BASE, href)
        if url in seen:
            continue
        title = a.get_text(strip=True)
        if not title:
            continue
        seen.add(url)
        results.append(DiscoveredBuild(title=title, url=url, source="poevault", game="poe1"))
    return results


def parse_poevault_poe2_class_html(html: str) -> list[DiscoveredBuild]:
    """`class_`/`ascendancy` se čtou přímo z cesty URL
    (.../poe2/<class>/<ascendancy>/<slug>-build-guide), ne z obsahu stránky."""
    soup = BeautifulSoup(html, "html.parser")
    seen: set[str] = set()
    results: list[DiscoveredBuild] = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if not POE_VAULT_BUILD_HREF_RE.search(href):
            continue
        url = urljoin(POE_VAULT_BASE, href)
        if url in seen:
            continue
        title = a.get_text(strip=True)
        if not title:
            continue
        seen.add(url)

        path_parts = [p for p in href.split("/") if p]
        class_ = None
        ascendancy = None
        if len(path_parts) >= 3 and path_parts[0] == "poe2":
            class_ = path_parts[1].capitalize()
            ascendancy = path_parts[2].replace("-", " ").title()

        results.append(
            DiscoveredBuild(
                title=title,
                url=url,
                source="poevault",
                game="poe2",
                class_=class_,
                ascendancy=ascendancy,
            )
        )
    return results


def parse_mobalytics_html(html: str, game: str) -> list[DiscoveredBuild]:
    soup = BeautifulSoup(html, "html.parser")
    href_re = MOBALYTICS_BUILD_HREF_RE[game]
    seen: set[str] = set()
    results: list[DiscoveredBuild] = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if not href_re.match(href):
            continue
        url = urljoin(MOBALYTICS_BASE, href)
        if url in seen:
            continue
        title = a.get_text(strip=True)
        if not title:
            continue
        seen.add(url)

        classification = classify_text(game, title)
        results.append(
            DiscoveredBuild(
                title=title,
                url=url,
                source="mobalytics",
                game=game,
                class_=classification.class_,
                ascendancy=classification.ascendancy,
                league_patch=classification.league_patch,
                tags=classification.tags,
            )
        )
    return results


def _get_html(client: httpx.Client, url: str) -> str | None:
    try:
        response = client.get(url)
        response.raise_for_status()
    except httpx.HTTPError:
        return None
    return response.text


def discover_poevault(client: httpx.Client) -> list[DiscoveredBuild]:
    results: list[DiscoveredBuild] = []
    seen_urls: set[str] = set()

    html = _get_html(client, f"{POE_VAULT_BASE}/guides/builds-for-path-of-exile")
    if html:
        for item in parse_poevault_poe1_html(html):
            if item.url in seen_urls:
                continue
            seen_urls.add(item.url)
            results.append(item)

    for cls in POE_VAULT_POE2_CLASSES:
        html = _get_html(client, f"{POE_VAULT_BASE}/poe2/{cls}")
        if not html:
            continue
        for item in parse_poevault_poe2_class_html(html):
            if item.url in seen_urls:
                continue
            seen_urls.add(item.url)
            results.append(item)

    return results


def discover_mobalytics(client: httpx.Client) -> list[DiscoveredBuild]:
    results: list[DiscoveredBuild] = []
    pages = [
        ("poe1", f"{MOBALYTICS_BASE}/poe/creator-builds"),
        ("poe2", f"{MOBALYTICS_BASE}/poe-2/creator-builds"),
    ]
    for game, url in pages:
        html = _get_html(client, url)
        if not html:
            continue
        results.extend(parse_mobalytics_html(html, game))
    return results


def discover_all(client: httpx.Client, sources: list[str] | None = None) -> list[DiscoveredBuild]:
    sources = sources or ["poevault", "mobalytics"]
    results: list[DiscoveredBuild] = []
    if "poevault" in sources:
        results.extend(discover_poevault(client))
    if "mobalytics" in sources:
        results.extend(discover_mobalytics(client))
    return results
