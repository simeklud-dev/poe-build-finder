# PoE Build Finder

Meta-vyhledávač buildů pro Path of Exile 1 a 2. Viz [`SPEC.md`](SPEC.md) pro plnou specifikaci
a [`CLAUDE.md`](CLAUDE.md) pro rychlý přehled pro vývoj v Claude Code.

Aktuální stav: **post-MVP fáze** (SPEC.md, sekce 10, krok 9) — celá MVP roadmapa
(kroky 1-6, 8) je hotová, krok 7 (poe.ninja) je vědomě odložený (viz sekce 4, tabulka
zdrojů — reálný formát je nezdokumentovaný binární protobuf, ne JSON). Post-MVP zatím
zahrnuje: uživatelské účty, oblíbené buildy, uložené filtry s in-app upozorněním na
nové shody, "podobné buildy", meta přehled podle ligy, moderace nahlášeného obsahu a
odkazy-prokliky na Mobalytics/Maxroll.

## Struktura repozitáře

```
poe-build-finder/
├── docker-compose.yml   # lokální PostgreSQL
├── .env.example         # vzor proměnných prostředí (zkopírovat jako .env)
├── apps/
│   ├── api/              # FastAPI backend + Alembic migrace
│   └── web/               # Next.js frontend (/submit, /admin)
```

## Předpoklady

- **Docker Desktop** — jediná ruční instalace potřebná na tomto stroji. Postgres pak běží
  izolovaně v kontejneru, nic dalšího se do systému neinstaluje.
- Python 3.11+ (backend), Node 18+ (frontend).

## Lokální vývoj — databáze

```bash
cp .env.example .env      # pokud .env ještě neexistuje
docker compose up -d db
docker compose ps         # ověření, že kontejner běží a je healthy
```

Reset databáze (smaže i data ve volume):

```bash
docker compose down -v
```

## Lokální vývoj — backend (apps/api)

```bash
cd apps/api
python -m venv .venv
.venv/Scripts/activate     # Windows; na macOS/Linux: source .venv/bin/activate
pip install -r requirements-dev.txt

alembic upgrade head       # vytvoří/aktualizuje schéma v běžící DB

uvicorn app.main:app --reload
```

Po nastartování zkontroluj [http://localhost:8000/health](http://localhost:8000/health) —
mělo by vrátit `{"status": "ok", "builds_count": 0}`.

Testy: `pytest` (spouštět s běžící DB, viz výše — fixtury v `tests/conftest.py` čistí
community buildy a rate-limit záznamy před/po každém testu).

### API endpointy

- `POST /api/builds/submit` — veřejný, anonymní. Honeypot pole `website` musí zůstat
  prázdné (bot ochrana), rate limit `SUBMISSION_RATE_LIMIT_PER_HOUR` požadavků/hodinu/IP
  (IP se ukládá jen jako hash, viz `app/security.py`).
- `GET /api/admin/builds/pending`, `POST /api/admin/builds/{id}/approve`,
  `POST /api/admin/builds/{id}/reject` — chráněné HTTP Basic autentizací
  (`ADMIN_USERNAME`/`ADMIN_PASSWORD` v `.env`). Jde o jediný sdílený admin účet, ne
  uživatelské účty (ty jsou fáze 2 dle SPEC.md).
- `GET /api/builds` — veřejný search/filter/list (krok 3). Vrací jen `moderation_status
  = approved` buildy, včetně `stats_dps`/`stats_life`/`stats_ehp`, pokud byly zjištěné
  z PoB kódu (krok 6). Query parametry: `q` (fulltext přes `search_vector`), `game`,
  `source`, `class`, `ascendancy`, `main_skill`, `league_patch`, `tags` (opakovatelný,
  OR sémantika), `sort` (`date`/`popularity`/`relevance`), `page`, `page_size`.
- `GET /api/builds/leagues`, `GET /api/builds/{id}/similar` (post-MVP) — distinct
  ligy pro meta přehled; "podobné buildy" (stejná hra + main_skill/class).
- `POST /api/builds/{id}/report` (post-MVP) — anonymní nahlášení schváleného buildu,
  rate-limitované stejně jako submit formulář.
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` (post-MVP) —
  viz sekce "Uživatelské účty" níže.
- `GET/POST /api/favorites`, `DELETE /api/favorites/{id}` (post-MVP) — oblíbené
  buildy, vyžaduje přihlášení (`Authorization: Bearer <token>`).
- `GET/POST /api/saved-filters`, `DELETE .../{id}`, `POST .../{id}/mark-seen`
  (post-MVP) — uložené filtry + počítadlo nových shod od posledního zobrazení.
- `GET /api/admin/reports`, `POST .../{id}/dismiss`, `POST .../{id}/remove-build`
  (post-MVP) — moderace nahlášeného obsahu, admin HTTP Basic auth.

### Reddit konektor (krok 4)

Potřebuje vlastní Reddit API přihlašovací údaje — nejde je nijak obejít, je to jediná
věc, kterou si musíš zařídit sám:

1. Přihlaš se na [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) → "create app".
2. Typ aplikace: **script**. Redirect URI může být cokoliv, např. `http://localhost:8000`.
3. Reddit ti vygeneruje `client_id` (pod názvem appky) a `client_secret`.
4. Vlož je do `.env` jako `REDDIT_CLIENT_ID` a `REDDIT_CLIENT_SECRET` (uživatelské
   jméno/heslo k Redditu se nikam nezadává — jde o read-only přístup k veřejným datům).

Spuštění crawleru (jednorázově, ručně):

```bash
cd apps/api
python -m app.crawler.run_reddit
```

Bez vyplněných `REDDIT_CLIENT_ID`/`REDDIT_CLIENT_SECRET` skript rovnou skončí chybou
s odkazem na tento návod. Crawler stahuje nové posty z r/PathOfExileBuilds,
r/PathOfExile a r/PathOfExile2, klasifikuje je (`app/crawler/classify.py` — klíčová
slova/regex na class/ascendancy/skill/ligu/tagy, viz SPEC.md sekce 7) a ukládá jako
buildy s `moderation_status = approved` (automaticky nalezené buildy nejdou přes
pre-moderaci, ta je jen pro community formulář — sekce 11). Deduplikace běží přes
`(source, source_url)` a `source_id`.

Pro produkční provoz naplánuj periodické spouštění (např. každou hodinu) přes cron /
Windows Task Scheduler — crawler je nezávislý na běžícím API procesu (SPEC.md, sekce 8).

Klasifikační seznamy (třídy/ascendance/skilly/tagy) jsou reprezentativní, ne
vyčerpávající — rozšiřuj je v `app/crawler/classify.py` podle toho, co crawler
reálně natrefí. Sdílená ingest logika (krátký popis, deduplikace, ukládání) je
v `app/crawler/common.py` a používá ji jak Reddit, tak YouTube konektor.

### YouTube konektor (krok 5)

Potřebuje vlastní API klíč — opět jediná věc, kterou si musíš zařídit sám:

1. V [Google Cloud Console](https://console.cloud.google.com/) založ (nebo použij)
   projekt a povol **YouTube Data API v3** (API & Services → Library).
2. Vytvoř API klíč (API & Services → Credentials → Create credentials → API key).
   Žádné OAuth přihlášení uživatele netřeba — jde o čtení veřejných dat.
3. Vlož klíč do `.env` jako `YOUTUBE_API_KEY`.

Spuštění crawleru (jednorázově, ručně):

```bash
cd apps/api
python -m app.crawler.run_youtube
```

Bez vyplněného `YOUTUBE_API_KEY` skript rovnou skončí chybou s odkazem na tento návod.
Crawler hledá videa podle klíčových slov (`app/crawler/run_youtube.py`, konstanta
`DEFAULT_SEARCH_QUERIES` — samostatně pro PoE1 a PoE2), stahuje metadata + počty
zhlédnutí, klasifikuje stejnou logikou jako Reddit konektor a ukládá jako buildy
s `moderation_status = approved`. Thumbnail se ukládá přes oficiální API (SPEC.md,
sekce 5, bod 2 to výslovně dovoluje). Deduplikace běží přes `(source, source_url)`.

**Pozor na kvótu:** YouTube Data API v3 má denní kvótu (výchozí 10 000 jednotek/den),
`search.list` stojí 100 jednotek za volání — s výchozími 3 dotazy to vyjde na pohodu,
ale při přidávání dalších klíčových slov to hlídej.

### PoB parsování (krok 6)

**Důležité rozhodnutí:** `pobb.in` i `pastebin.com` mají v `robots.txt` výslovně
zakázané přesně ty endpointy (`/raw`, `/api/`, `/json`), které by byly potřeba pro
automatické stažení PoB kódu z odkazu. V souladu se SPEC.md (sekce 5, bod 1 — dodržovat
`robots.txt`) jsme se rozhodli **takové odkazy vůbec nefetchovat**. Místo toho:

- `app/pob/decode.py` — dekóduje PoB export kód (url-safe base64 + zlib → XML), ale
  **nikdy sám nic nestahuje** — pracuje jen s kódem, který mu někdo přímo dodá.
- `app/pob/parse.py` — z XML vytáhne `className`/`ascendClassName`/level, staty
  (`TotalDPS`/`Life`/`TotalEHP`, s fallbacky na starší názvy atributů) a hlavní skill
  (první gem v první zapnuté skill grupě, co není support gem).
- `app/pob/extract.py` — heuristicky najde PoB kód **doslova vložený v textu**
  (dlouhý base64 blok), ne odkaz — to je plně v souladu s robots.txt, protože se nic
  nefetchuje, jen se parsuje text, který už legálně máme (z Reddit/YouTube API).

**Kde se to používá:**
- Community formulář (`/submit`) má nové nepovinné pole "PoB export kód" — uživatel
  tam vloží text zkopírovaný z Path of Building (Export Build → Generate code), ne
  odkaz. Pokud se podaří dekódovat, jeho hodnoty **přebijí** ručně vyplněné
  class/ascendancy/main_skill (spolehlivější zdroj, SPEC.md sekce 7, bod 1) a doplní
  `stats_dps`/`stats_life`/`stats_ehp`.
- Reddit i YouTube crawler (`app/crawler/common.py::enrich_with_inline_pob_code`)
  zkusí totéž na stažený title+text/description — pokud tam autor postu/videa vložil
  PoB kód přímo (ne jen odkaz), použije se stejným způsobem.
- Samotné `pob_link` pole (odkaz) zůstává jen informační — ukládá se, zobrazuje se,
  ale nikdy se nefetchuje.

### Fórum scraper (krok 8)

Žádné API klíče/přihlašovací údaje netřeba — čte se jen veřejně dostupný obsah desek.

**Ověřeno při implementaci:** `pathofexile.com/robots.txt` zakazuje jen akční
endpointy (`/forum/post-reply/`, `/forum/new-thread/`, `/forum/view-post/`, `/api/`),
ne čtení desek/vláken (`/forum/view-forum/`, `/forum/view-thread/`) — scraping HTML
je tu tedy v souladu s robots.txt. Cloudflare blokuje jen generické User-Agenty
nástrojů (`curl`, `python-requests`) — s poctivě identifikovatelným UA
(`app/crawler/forum_client.py`, konstanta `USER_AGENT`) prochází bez problému, žádné
obcházení bot-detekce.

Spuštění (jednorázově, ručně):

```bash
cd apps/api
python -m app.crawler.run_forum
```

Stahuje první stránku vláken z osmi desek (`app/crawler/run_forum.py`, konstanta
`DEFAULT_BOARDS`): PoE1 má samostatné desky per class (Witch/Marauder/Ranger/
Duelist/Templar/Shadow/Scion) — deska sama o sobě už je spolehlivá klasifikace
`class`, na rozdíl od Reddit/YouTube se tam nemusí hádat. PoE2 má jednu smíšenou
desku "Path of Exile 2 Builds", klasifikovanou stejně jako Reddit/YouTube. Mezi
requesty na jednotlivé desky čeká `RATE_LIMIT_DELAY_SECONDS` (výchozí 3 s) — SPEC.md,
sekce 5, bod 1. Stahuje se jen název vlákna, autor, views a datum — ne plný obsah
příspěvku (build karta pak odkazuje přímo na originál).

Pro produkční provoz naplánuj periodické spouštění stejně jako u Reddit/YouTube
konektorů (cron / Windows Task Scheduler).

### Uživatelské účty (post-MVP)

**Rozhodnutí (2026-07-10):** email + heslo, bez emailové služby — žádné ověření
emailu ani reset hesla odkazem. Zapomenuté heslo = nutnost založit nový účet. Heslo
se hashuje přes `bcrypt`, session je bezstavový JWT token (`Authorization: Bearer
<token>`, platnost `JWT_EXPIRY_DAYS`, výchozí 30 dní) — žádná tabulka session v DB.
`JWT_SECRET` v `.env` **musí** být náhodný řetězec 32+ bajtů mimo lokální vývoj,
jinak lze tokeny podvrhnout. Login/register jsou rate-limitované stejně jako
community formulář (`AUTH_RATE_LIMIT_PER_HOUR`).

Frontend drží token v `localStorage` (`src/lib/auth-context.tsx`, `AuthProvider` +
`useAuth()` hook) — jiný mechanismus než admin (ten používá HTTP Basic v
`sessionStorage`, viz krok 2), protože jde o jiný typ účtu (běžný uživatel vs. jediný
sdílený admin).

## Migrace (Alembic)

- Nová migrace: `alembic revision --autogenerate -m "popis změny"` (vždy zkontrolovat
  vygenerovaný soubor v `alembic/versions/`, autogenerate není neomylný).
- Aplikace migrací: `alembic upgrade head`.
- Návrat o migraci zpět: `alembic downgrade -1`.

## Lokální vývoj — frontend (apps/web)

```bash
cd apps/web
cp .env.local.example .env.local   # pokud .env.local ještě neexistuje
npm install
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000). Backend musí běžet zároveň
(viz výše) na adrese z `NEXT_PUBLIC_API_URL`.

- `/` — hlavní vyhledávání/filtrování buildů (krok 3), zobrazuje jen schválené buildy.
  Přihlášeným uživatelům přidává hvězdičku (oblíbené) a tlačítko "Uložit filtr".
  Karty mají i tlačítko "Nahlásit" (post-MVP, anonymní, bez přihlášení).
- `/submit` — anonymní formulář pro přidání buildu.
- `/admin` — přihlášení (stejné údaje jako `ADMIN_USERNAME`/`ADMIN_PASSWORD`) + fronta
  ke schválení a fronta nahlášeného obsahu (post-MVP).
- `/account` (post-MVP) — registrace/přihlášení + přehled uložených filtrů s
  počítadlem nových shod.
- `/favorites` (post-MVP) — oblíbené buildy přihlášeného uživatele.
- `/meta` (post-MVP) — nejpopulárnější buildy podle ligy/patche.

## Nasazení (Railway)

Produkční úpravy, které to umožňují (bez nich by appka na hostingu jako Railway
nešla spustit):

- **`apps/api/Procfile`** — `alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
  Railway (a podobné platformy) přidělují port dynamicky přes `$PORT`, ne pevně `8000`
  jako lokálně. Migrace se pouští automaticky před každým startem, aby schéma DB
  nikdy nezaostávalo za nasazeným kódem.
- **`apps/api/.python-version`** — pinuje Python 3.12 pro reprodukovatelný build.
- **`CORS_ORIGINS`** (`app/config.py`, `app/main.py`) — čárkou oddělený seznam
  povolených originů frontendu, dřív bylo natvrdo jen `http://localhost:3000`.
- **`DATABASE_URL` normalizace** (`app/config.py`) — Railův Postgres plugin dá
  `DATABASE_URL` ve tvaru `postgresql://...` (bez `+psycopg` driveru, který
  SQLAlchemy vyžaduje) — backend si to teď opraví sám, není potřeba proměnnou ručně
  upravovat.

### Postup

1. **PostgreSQL** — v Railway projektu "New" → "Database" → "PostgreSQL". Railway
   vytvoří proměnnou `DATABASE_URL` (dostupnou dalším službám přes referenci).
2. **Backend service** — "New" → "GitHub Repo" → tenhle repozitář, nastav **Root
   Directory** na `apps/api`. Environment variables (kromě `DATABASE_URL`, kterou
   nastav jako referenci na Postgres plugin, `${{Postgres.DATABASE_URL}}`):
   - `CORS_ORIGINS` — URL frontendové služby, jakmile ji založíš (viz krok 3); do
     té doby klidně `http://localhost:3000`, doplníš později
   - `ADMIN_USERNAME`, `ADMIN_PASSWORD` — **změň** oproti dev hodnotám
   - `IP_HASH_SALT`, `JWT_SECRET` — **náhodné řetězce 32+ bajtů** (např. `openssl rand -hex 32`)
   - `JWT_EXPIRY_DAYS=30`, `SUBMISSION_RATE_LIMIT_PER_HOUR=5`, `AUTH_RATE_LIMIT_PER_HOUR=10`
   - `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USER_AGENT`, `YOUTUBE_API_KEY`
     — nepovinné, jen pokud chceš crawlery pouštět i na hostingu (viz krok 5)

   Railway z `Procfile` pozná start příkaz automaticky (Nixpacks); pokud ne, nastav
   ho ručně ve service settings na stejný řádek jako v `Procfile`.
3. **Frontend service** — "New" → "GitHub Repo" → tenhle repozitář znovu, **Root
   Directory** `apps/web`. Environment variable:
   - `NEXT_PUBLIC_API_URL` — URL backend služby z kroku 2 (Next.js `NEXT_PUBLIC_*`
     proměnné se zapékají při buildu, takže musí být nastavená **před** prvním
     buildem, jinak build znovu spusť ručně po jejím přidání)

   Build/start příkazy Railway odvodí z `package.json` (`npm run build` /
   `npm run start`) automaticky.
4. Až frontend dostane svoji Railway URL, vrať se do backend service a doplň ji do
   `CORS_ORIGINS` (přepiš/redeployni).
5. **Scheduled crawlery (nepovinné)** — Railway "Cron Job" service, stejný GitHub
   repo, root directory `apps/api`, custom command např.
   `python -m app.crawler.run_reddit` (a zvlášť job pro `run_youtube`/`run_forum`),
   s cronem např. `0 * * * *` (každou hodinu). Potřebuje stejné env proměnné jako
   backend service (hlavně `DATABASE_URL` a příslušné API klíče).

## Poznámka

Tento web není přidružen ke Grinding Gear Games ani jimi podporován.
