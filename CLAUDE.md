# PoE Build Finder

Meta-vyhledávač buildů pro Path of Exile 1 a Path of Exile 2. Agreguje buildy z více zdrojů (Reddit, YouTube, poe.ninja, PoE fóra) a umožňuje je filtrovat a hledat na jednom místě. Web sám obsah nehostuje ani nekopíruje — jen indexuje a odkazuje na originál. Doplněno o anonymní komunitní přidávání vlastních buildů.

**Kompletní specifikace:** viz `SPEC.md` v kořeni repozitáře — vždy si ji přečti před zahájením práce na nové části projektu, obsahuje detailní zadání, právní aspekty a datový model.

## Základní fakta o projektu

- **Model:** čistě komunitní, nekomerční, bez monetizace
- **Vývoj:** samostatně přes Claude Code, bez externího vývojáře
- **Hry:** PoE1 i PoE2 od první verze, rozlišené společným filtrem "Hra" (ne oddělené sekce)
- **Komunitní obsah:** anonymní formulář pro přidání buildu, s ochranou proti spamu (rate limiting, honeypot, případně captcha) a **pre-moderací** — nový příspěvek se zobrazí veřejně až po ručním schválení

## Tech stack

- Frontend: React/Next.js (SSR kvůli SEO)
- Backend/API: Node.js nebo Python (FastAPI)
- Databáze: PostgreSQL (fulltextové vyhledávání přes `tsvector`, případně později Meilisearch)
- Crawler: periodický scheduled job/cron, nezávislý na frontendu

## Zdroje dat

| Zdroj | Přístup |
|---|---|
| Reddit | oficiální API |
| YouTube | oficiální Data API v3 |
| poe.ninja | neoficiální JSON endpointy, chovat se šetrně (rate limiting, cache) |
| PoE fórum, PoB Community | scraping HTML, respektovat robots.txt |
| Mobalytics, PoE-Vault | **jen odkazy-prokliky** (title+URL z veřejných přehledových stránek, ne obsah build guide) — viz `app/crawler/external_discover.py` a SPEC.md sekce 4 |
| Maxroll | **NIC automaticky** — robots.txt výslovně zakazuje jakýkoliv automatizovaný přístup; odkazy jen ručně přes admin CRUD |
| Komunita | vlastní formulář, pre-moderace |

## Doporučené pořadí implementace

1. Datový model + PostgreSQL databáze (tabulka `builds`)
2. Anonymní formulář na přidání buildu + fronta ke schválení + admin rozhraní (pre-moderace)
3. Search/filter API + základní frontend s filtry a výpisem výsledků
4. Reddit konektor (crawler + klasifikace přes regex)
5. YouTube konektor
6. Parsování PoB odkazů (přesnější klasifikace + DPS/Life/EHP)
7. poe.ninja konektor
8. Fórum scraper
9. Post-MVP: uživatelské účty, oblíbené, notifikace, "podobné buildy", moderace nahlášeného obsahu

## Důležitá pravidla, která je třeba dodržovat průběžně

- **Autorská práva:** nikdy nekopírovat plné texty/obrázky/PoB kódy ze zdrojových webů — jen metadata (název, autor, datum) a odkaz na originál.
- **Scraping:** vždy respektovat `robots.txt`, rate limitovat požadavky, používat identifikovatelný User-Agent.
- **Komerční weby (Mobalytics, Maxroll, PoE-Vault):** nikdy plný scraping obsahu, jen prokliky. U Mobalytics/PoE-Vault smí automatizovaný crawler číst jen veřejné přehledové/hub stránky (title+URL, nikdy stránku samotného build guide) — Maxroll má v robots.txt výslovný zákaz automatizovaného přístupu, tam se nesmí sahat vůbec, ani takhle lehce.
- **Disclaimer v patičce:** web není přidružený ke Grinding Gear Games ani jimi podporovaný.
- **Datový model:** nové buildy ze source = `community` mají `moderation_status = pending`, automaticky nalezené rovnou `approved`.

## Poznámka k údržbě

Pokud se v průběhu vývoje změní nějaké zadání nebo padne nové rozhodnutí, aktualizuj odpovídající místo v `SPEC.md`, ať zůstane platným zdrojem pravdy pro projekt.
