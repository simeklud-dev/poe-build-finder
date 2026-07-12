"""Denní kontrola dostupnosti odkazů na buildy (SPEC.md / CLAUDE.md, sekce 5):

Kontroluje jen HTTP status kód (HEAD, s fallbackem na streamovaný GET, pokud server
HEAD odmítá) — NIKDY nestahuje ani neukládá obsah stránky. U GET fallbacku se tělo
odpovědi vůbec nečte (`httpx.Client.stream`), takže se z cizího serveru přenese jen
hlavička odpovědi.

Zvlášť důležité pro odkazy z Maxroll/PoE Vault/Mobalytics (viz ADMIN_EXTERNAL_SOURCES
v app/models/build.py) — u nich je tohle jediná data, která o buildu vůbec držíme,
ale kontroluje se dostupnost URL napříč všemi zdroji (i Reddit/YouTube odkazy časem
zmizí), protože rozbité odkazy se veřejně skrývají všude (viz app/build_filters.py).

Spuštění: python -m app.crawler.check_links [--source maxroll,poevault]

Rate limiting: requesty se seskupí podle domény a mezi dvěma requesty na stejnou
doménu se čeká aspoň MIN_DELAY_SECONDS, ať zbytečně nezatěžujeme cizí servery
(SPEC.md, sekce 5, bod 1).
"""

import argparse
import time
from collections import defaultdict
from datetime import datetime, timezone
from urllib.parse import urlsplit

import httpx
from sqlalchemy import select

from app.db import SessionLocal
from app.models.build import Build

USER_AGENT = (
    "PoEBuildFinderBot/0.1 (+https://github.com/simeklud-dev/poe-build-finder; "
    "non-commercial community build index; link-availability check only, no "
    "content is downloaded or stored)"
)
REQUEST_TIMEOUT_SECONDS = 10.0
MIN_DELAY_SECONDS = 2.0  # mezi dvěma requesty na stejnou doménu


def extract_domain(url: str) -> str:
    return urlsplit(url).netloc.lower()


def group_by_domain(builds: list[Build]) -> dict[str, list[Build]]:
    """Seskupí buildy podle domény odkazu, ať můžeme requesty na stejnou doménu
    poslat za sebou s prodlevou mezi nimi (a requesty na různé domény bez čekání)."""
    groups: dict[str, list[Build]] = defaultdict(list)
    for build in builds:
        groups[extract_domain(build.source_url)].append(build)
    return groups


def classify_status(status_code: int | None) -> str:
    """HTTP < 400 (po případných redirectech, které httpx defaultně následuje) = ok,
    jinak (4xx/5xx, nebo request úplně selhal — timeout, DNS, spojení odmítnuto) =
    broken. Status `None` znamená, že request selhal na úrovni transportu."""
    if status_code is None:
        return "broken"
    return "ok" if status_code < 400 else "broken"


def check_url(client: httpx.Client, url: str) -> tuple[int | None, str | None]:
    """Vrátí (status_code, error). Zkusí nejdřív HEAD (nejlevnější, žádné tělo se
    vůbec nepřenáší); pokud server HEAD odmítá (405/501) nebo na něj nereaguje
    rozumně, zkusí GET, ale odpověď se STREAMUJE a tělo se nikdy nenačte (`.read()`
    /`.aread()` se nezavolá) — díky tomu se z cizí stránky stáhne jen status řádka
    a hlavičky, ne HTML/obsah."""
    try:
        response = client.head(url)
        if response.status_code not in (405, 501):
            return response.status_code, None
    except httpx.HTTPError as exc:
        return None, f"HEAD failed: {exc}"

    try:
        with client.stream("GET", url) as response:
            return response.status_code, None
    except httpx.HTTPError as exc:
        return None, f"GET failed: {exc}"


def run(source_filter: list[str] | None = None) -> None:
    client = httpx.Client(
        headers={"User-Agent": USER_AGENT},
        timeout=REQUEST_TIMEOUT_SECONDS,
        follow_redirects=True,
    )
    db = SessionLocal()

    ok_count = 0
    broken_count = 0

    try:
        query = select(Build)
        if source_filter:
            query = query.where(Build.source.in_(source_filter))
        builds = list(db.scalars(query).all())

        if not builds:
            print("check_links: no builds to check.")
            return

        domain_groups = group_by_domain(builds)
        print(
            f"check_links: {len(builds)} builds across {len(domain_groups)} domains, "
            f"source_filter={source_filter or 'all'}"
        )

        for domain, domain_builds in domain_groups.items():
            last_request_at: float | None = None
            for build in domain_builds:
                if last_request_at is not None:
                    elapsed = time.monotonic() - last_request_at
                    if elapsed < MIN_DELAY_SECONDS:
                        time.sleep(MIN_DELAY_SECONDS - elapsed)

                status_code, error = check_url(client, build.source_url)
                last_request_at = time.monotonic()

                new_status = classify_status(status_code)
                build.link_status = new_status
                build.last_checked_at = datetime.now(timezone.utc)

                if new_status == "ok":
                    ok_count += 1
                else:
                    broken_count += 1

                detail = f"status={status_code}" if error is None else error
                print(f"[{new_status}] {domain} :: {build.title!r} :: {detail}")

            db.commit()

        print(f"check_links: done. ok={ok_count} broken={broken_count} total={len(builds)}")
    finally:
        client.close()
        db.close()


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        default=None,
        help="Comma-separated list of `source` values to limit the check to "
        "(e.g. 'maxroll,poevault,mobalytics'). Default: check every build.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = _parse_args()
    sources = [s.strip() for s in args.source.split(",")] if args.source else None
    run(source_filter=sources)
