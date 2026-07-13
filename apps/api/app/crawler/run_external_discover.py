"""Ruční/cronem spouštěný objevovač nových buildů z PoE Vault a Mobalytics
(SPEC.md, sekce 5 a 8) — viz app/crawler/external_discover.py pro detaily
a vysvětlení, proč Maxroll.gg mezi zdroji NENÍ.

Spuštění:
    python -m app.crawler.run_external_discover               # naostro, uloží do DB
    python -m app.crawler.run_external_discover --dry-run      # jen vypíše, co by našel
    python -m app.crawler.run_external_discover --source poevault

Nově nalezené buildy se ukládají rovnou jako moderation_status='approved' (na
přání projektu — u community formuláře i nadále platí pre-moderace, tohle je
jiný, důvěryhodnější zdroj). Duplicity (stejná `source` + `source_url`) se
přeskočí přes existující unique constraint (viz app/crawler/common.py).
"""

import argparse

from app.crawler.common import build_already_exists, save_build
from app.crawler.external_discover import USER_AGENT, DiscoveredBuild, discover_all
from app.db import SessionLocal
from app.models.build import Build

import httpx


def _to_build(item: DiscoveredBuild) -> Build:
    return Build(
        title=item.title,
        source=item.source,
        source_url=item.url,
        moderation_status="approved",
        game=item.game,
        class_=item.class_,
        ascendancy=item.ascendancy,
        league_patch=item.league_patch,
        tags=item.tags,
        link_status="unchecked",
    )


def run(source_filter: list[str] | None = None, dry_run: bool = False) -> None:
    with httpx.Client(
        headers={"User-Agent": USER_AGENT},
        timeout=10.0,
        follow_redirects=True,
    ) as client:
        discovered = discover_all(client, sources=source_filter)

    print(f"run_external_discover: found {len(discovered)} candidate link(s).")

    if dry_run:
        for item in discovered:
            print(
                f"[dry-run] {item.source} {item.game} :: {item.title!r} :: {item.url} "
                f"class={item.class_} ascendancy={item.ascendancy}"
            )
        return

    db = SessionLocal()
    inserted = 0
    skipped_duplicate = 0
    try:
        for item in discovered:
            if build_already_exists(db, item.source, item.url):
                skipped_duplicate += 1
                continue
            if save_build(db, _to_build(item)):
                inserted += 1
                print(f"[new] {item.source} {item.game} :: {item.title!r} :: {item.url}")
            else:
                skipped_duplicate += 1
    finally:
        db.close()

    print(
        f"run_external_discover: done. inserted={inserted} "
        f"skipped_duplicate={skipped_duplicate} total_candidates={len(discovered)}"
    )


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        default=None,
        help="Comma-separated list of sources to discover (poevault,mobalytics). "
        "Default: both.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Only print what would be discovered, don't write to the database.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = _parse_args()
    sources = [s.strip() for s in args.source.split(",")] if args.source else None
    run(source_filter=sources, dry_run=args.dry_run)
