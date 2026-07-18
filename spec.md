# Specifikace projektu: PoE Build Finder
### Agregovaný vyhledávač buildů pro Path of Exile 1 a Path of Exile 2

**Verze dokumentu:** 1.1
**Účel dokumentu:** Podklad pro vlastní vývoj pomocí Claude Code — popisuje produkt, funkce, datovou architekturu a doporučený postup implementace. Slouží jako referenční dokument, ze kterého se bude v Claude Code vycházet při zadávání jednotlivých implementačních kroků.
**Model:** čistě komunitní projekt, bez monetizace, bez záměru generovat příjem.

---

## 1. Shrnutí projektu

Cílem je veřejný web, který funguje jako **meta-vyhledávač buildů** pro Path of Exile 1 i Path of Exile 2. Uživatel zadá filtry (hra, liga/patch, class, ascendancy, hlavní skill, styl hraní apod.) a web mu vrátí přehledný seznam odkazů na buildy nalezené napříč více zdroji (Reddit, YouTube, oficiální PoE fórum, PoB Community fórum, poe.ninja, Mobalytics, případně Maxroll a PoE-Vault) — a navíc buildy, které rovnou přidají sami uživatelé. Web sám buildy nehostuje ani nekopíruje jejich obsah — funguje jako index/rozcestník s odkazy na originál.

**Inspirace / konkurence:** pobarchives.com — existující, ale pomalý a nepřehledný nástroj se stejným účelem. Cílem je udělat rychlejší, přehlednější a spolehlivější alternativu.

---

## 2. Cílová skupina a hodnota produktu

- Hráči PoE, kteří na začátku ligy nebo při plánování nového buildu chtějí rychle najít relevantní guide/build napříč celým internetem, ne jen na jednom webu.
- Hodnota: úspora času (nemusí ručně prohledávat 5 různých webů), lepší filtrace než na jednotlivých zdrojích, agregace "co je zrovna populární".

---

## 3. Klíčové funkce (MVP i další fáze)

### MVP (verze 1.0)
- Vyhledávání a filtrování buildů podle:
  - Hra: PoE1 / PoE2 (obě hry podporované od první verze)
  - Liga / patch verze (např. 3.29 pro PoE1, 0.5 pro PoE2)
  - Class (Witch, Marauder, Ranger...)
  - Ascendancy (Necromancer, Slayer...)
  - Hlavní skill (Cyclone, Lightning Arrow...)
  - Tag/styl (League Starter, Bossing, Mapping, Budget, SSF...)
  - Zdroj (Reddit / YouTube / fórum / poe.ninja / Mobalytics / komunitně přidané)
- Řazení výsledků: podle data přidání, podle popularity (upvotes/views), podle relevance
- Výsledek = seznam karet: název, autor, zdroj, náhledový obrázek/ikona ascendancy, datum, přímý odkaz na originál
- Fulltextové vyhledávání v názvech/popiscích
- **Komunitní přidávání buildů** — jednoduchý anonymní formulář (bez nutnosti registrace, s ochranou proti spamu — rate limiting, honeypot pole, případně captcha), kde uživatel vloží odkaz na svůj build (PoB export, YouTube video, reddit post, vlastní guide) a doplní metadata (class/ascendancy/skill/liga/tagy). Nově přidaný build se **nezobrazí veřejně hned** — čeká ve frontě na ruční schválení (pre-moderace). Součástí MVP je proto i jednoduché administrátorské rozhraní: seznam čekajících příspěvků + schválit/zamítnout.

### Fáze 2 — hotovo (2026-07-10)
- Extrakce a zobrazení základních statistik buildu (DPS, Life, EHP) tam, kde je dostupný PoB export/link — parsováním PoB kódu (viz sekce 6). **Upřesnění:** parsuje se jen kód vložený přímo (formulář nebo doslova v textu postu), ne fetchovaný odkaz — viz sekce 5, bod 1.
- Uživatelské účty: email + heslo, bez emailové služby (žádné ověření emailu/reset hesla odkazem — rozhodnuto 2026-07-10). Oblíbené buildy, uložené filtry. Místo emailových notifikací na nové buildy dle uloženého filtru je in-app počítadlo nových shod od posledního zobrazení (důsledek rozhodnutí bez emailové služby).
- "Podobné buildy" doporučení — heuristika (stejná hra + main_skill nebo class), ne strojové učení
- Meta přehled — nejpopulárnější buildy dle ligy/patche (`/meta`)
- Navíc oproti původnímu zadání: moderace nahlášeného obsahu (uživatelé mohou nahlásit už schválený build jako spam/nevhodný, admin ho může odebrat) a odkazy-prokliky na Mobalytics/Maxroll (viz sekce 10, krok 9)

### Fáze 3 (volitelné, do budoucna)
- Rozšíření zdrojů (Maxroll, PoE-Vault) — pouze formou prokliku/agregace metadat, ne kopírování obsahu (viz právní sekce)
- Vícejazyčnost

---

## 4. Zdroje dat a způsob přístupu

| Zdroj | Dostupnost dat | Doporučený přístup | Riziko |
|---|---|---|---|
| **Reddit** (r/PathOfExileBuilds, r/PathOfExile, r/PathOfExile2) | Oficiální Reddit API (OAuth) | Pravidelné stahování nových postů dle klíčových slov/flairu | Nízké — je to podporovaný a legální způsob, ale má rate limity a od roku 2023 zpoplatněné vyšší tarify (pro malý projekt by měl stačit free tier) |
| **YouTube** | YouTube Data API v3 | Search dle klíčových slov + stahování metadat (title, popis, datum, počet zhlédnutí) | Nízké — oficiální API, zdarma v rámci kvóty |
| **Oficiální PoE fórum** (pathofexile.com/forum) | Bez API. `robots.txt` ověřen (krok 8): `/forum/view-forum/` a `/forum/view-thread/` (čtení desek/vláken) NEJSOU zakázané, jen akční endpointy (`/forum/post-reply/`, `/forum/new-thread/`, `/forum/view-post/`, `/api/`). Cloudflare blokuje jen generické UA nástrojů (curl, python-requests) — s poctivě identifikovatelným UA prochází bez problému, žádné obcházení bot-detekce netřeba. Skutečná struktura: PoE1 má samostatné desky per třída (Witch/Marauder/Ranger/Duelist/Templar/Shadow/Scion — deska sama už je spolehlivá klasifikace class), PoE2 má jednu smíšenou desku "Path of Exile 2 Builds" | Scraping HTML desek (název vlákna, autor, views, datum) — bez fetchování plného obsahu vlákna, jen odkaz na originál | Nízké/střední — čtení je dle robots.txt povolené, ale je to pořád HTML scraping (křehčí než API), nutno dělat šetrně (rate limiting, cache) |
| **Path of Building Community** (GitHub/fórum) | Bez API, ale obsah je většinou strojově čitelný | Scraping / RSS pokud existuje | Nízké až střední |
| **poe.ninja** | Bez oficiálního veřejného API pro buildy. `robots.txt` na doméně neexistuje (ověřeno při implementaci kroku 7, žádná explicitní právní překážka). Ale: samotný build-listing endpoint (`/api/builds/{verze}/search`) vrací **binární Protocol Buffers** (`Content-Type: application/x-protobuf`), ne JSON, jak se původně předpokládalo — a navíc odkazuje na desítky samostatných "dictionary" endpointů pro rozbalení řetězců. Jediný ověřený JSON endpoint (`/api/data/index-state`) obsahuje jen navigační metadata (seznam lig), ne samotné buildy | Bez zveřejněného `.proto` schématu by šlo o reverzní inženýrství binárního formátu — proveditelné, ale křehké a s rizikem chybné interpretace dat. **Rozhodnutí (2026-07-10): krok 7 odložen**, projekt zatím staví na Reddit + YouTube konektorech. K poe.ninja se vrátit, až bude jasnější přínos/náročnost nebo se objeví zdokumentovanější cesta | Střední/vysoké — nejde o oficiálně dokumentované/podporované API, formát se může bez upozornění změnit, navíc vyžaduje reverzní inženýrství binárního protokolu |
| **Mobalytics** (PoE2 build guides) | Bez veřejného API, komerční web podobně jako Maxroll | Stejné doporučení jako u Maxroll/PoE-Vault — nezahrnovat plný scraping obsahu, jen odkazy-prokliky na jejich vyhledávání/kategorie | Vysoké — porušení ToS, riziko právní výzvy |
| **Maxroll.gg, PoE-Vault.com** | Bez API, komerční weby | **Nedoporučuji plný scraping obsahu.** Doporučuji buď (a) nezahrnovat vůbec v MVP, nebo (b) zahrnout jen jako "prokliky" — tj. generovat odkaz na jejich vyhledávání/kategorii, ne stahovat a zobrazovat jejich obsah | Vysoké — porušení ToS, riziko právní výzvy, poškození vztahů s komunitou |

**Doporučení pro MVP:** začít Redditem, YouTube (obě mají legální API) a komunitně přidanými buildy (vlastní formulář, žádné právní riziko). poe.ninja lze zkusit přidat brzy, protože jde jen o čtení strukturovaných dat bez porušení autorských práv na obsah. Fóra přidat, jakmile bude fungovat základ. Mobalytics/Maxroll/PoE-Vault řešit jen jako odkazy-prokliky, nikdy ne jako scraping obsahu.

**Implementováno (2026-07-12): admin CRUD pro Maxroll/PoE-Vault/Mobalytics odkazy.**
Místo samostatné tabulky je to rozšíření stávající `builds` tabulky/modelu (stejné
API/search/moderace jako u ostatních zdrojů, žádná duplikace):
- `source` enum rozšířen o `maxroll`/`poevault`/`mobalytics` (`ADMIN_EXTERNAL_SOURCES`
  v `app/models/build.py`).
- Nová pole: `build_type` (text, volný typ buildu — "league starter" apod.),
  `link_status` (`ok`/`broken`/`unchecked`, default `unchecked`), `last_checked_at`.
- Admin CRUD: `GET/POST /api/admin/builds`, `GET/PUT/DELETE /api/admin/builds/{id}`
  (HTTP Basic, stejné jako moderace) — vytváří rovnou `moderation_status=approved`
  (ruční ověřený vstup, ne anonymní formulář). Endpoint omezen jen na tři externí
  zdroje, nejde jím editovat/mazat crawlerem spravované buildy.
- Veřejné čtení: existující `GET /api/builds` (+ nový `GET /api/builds/{id}` detail)
  fungují beze změny, navíc teď skrývají buildy s `link_status='broken'` napříč
  všemi zdroji.
- Denní cron `app/crawler/check_links.py`: HEAD (fallback streamovaný GET bez čtení
  těla) na `source_url` každého buildu, nastaví `link_status`/`last_checked_at`.
  Rate-limit 2 s mezi requesty na stejnou doménu, žádný obsah stránky se nestahuje
  ani neukládá — jen HTTP status kód.

**Implementováno (2026-07-12): automatické objevování odkazů pro PoE Vault a
Mobalytics — Maxroll záměrně vynechán.** Před implementací byl ověřen skutečný
`robots.txt` všech tří domén (ne jen obecný předpoklad z tabulky výše):

- **maxroll.gg** — obsahuje výslovné právní upozornění ("Use of any robot,
  crawler, or other tool to scrape, harvest, extract, or retrieve any content on
  this website using automated means is prohibited without written permission
  from Ziff Davis...", včetně explicitního zákazu "creating data sets containing
  our content") a rozsáhlý seznam jmenovitě blokovaných botů (generické scrapery
  i AI crawlery). **Rozhodnutí: Maxroll se automaticky neprochází vůbec, ani jen
  pro title+URL.** Odkazy na Maxroll lze nadále přidávat jen ručně přes admin CRUD
  výše.
- **poe-vault.com** a **mobalytics.gg** — `robots.txt` obou domén je standardní,
  bez podobného upozornění, a cesty použité crawlerem (`/guides/builds-for-path-of-exile`,
  `/poe2/<class>`, `/poe/creator-builds`, `/poe-2/creator-builds`) nejsou v
  `Disallow`. Pro tyto dva zdroje proto existuje `app/crawler/external_discover.py`
  + `run_external_discover.py`:
  - Stahuje **jen veřejné přehledové/hub stránky** (seznam buildů jedné třídy nebo
    tvůrců), nikdy stránku samotného build guide (žádné skilly/gear/staty).
  - Z nalezených odkazů vytáhne pouze title + URL (regex na vzor URL, ne parsování
    obsahu stránky). U PoE Vault se `class_`/`ascendancy` čtou přímo ze struktury
    URL (`/poe2/<class>/<ascendancy>/...`), u Mobalytics (kde to URL neobsahuje) se
    na titulek pustí stejný klíčeslovní klasifikátor jako u Reddit/YouTube
    (`classify_text`) — když nic nenajde, pole zůstanou `None`.
  - Nově nalezené buildy se ukládají rovnou jako `moderation_status='approved'`
    (rozhodnutí 2026-07-12, na přání projektu) — na rozdíl od anonymního
    community formuláře, který má stále pre-moderaci.
  - `--dry-run` flag vypíše, co by se našlo, bez zápisu do databáze — pro ověření
    po nasazení, než se poprvé spustí naostro.

---

## 5. Právní a etické aspekty (důležité probrat s vývojářem/právníkem)

1. **Scraping fór** — i když jde o veřejně dostupný obsah, je třeba dodržet `robots.txt` daného webu a nezatěžovat server nadměrnou frekvencí požadavků. Doporučeno: max. 1 request / několik sekund, identifikovatelné User-Agent, cache výsledků.
   - **Rozhodnutí ohledně PoB odkazů (2026-07-10, krok 6):** `pobb.in` i `pastebin.com` mají v `robots.txt` výslovně zakázané přesně ty endpointy (`/raw`, `/api/`, `/json`), které by byly potřeba pro automatické stažení PoB kódu z odkazu. Rozhodnuto respektovat to doslova — aplikace PoB odkazy z crawlovaného obsahu **nikdy nefetchuje**. Parsuje se jen PoB kód, který uživatel vloží přímo (community formulář), nebo který je doslova vložený v textu už staženém přes oficiální Reddit/YouTube API (viz `app/pob/`).
2. **Autorská práva na obsah** — web nesmí kopírovat plné texty guide článků, PoB kódy ani obrázky ze zdrojových webů (kromě případů, kdy je to explicitně povoleno, např. YouTube thumbnaily přes jejich API jsou k tomuto účelu povolené). Zobrazovat jen: název, krátký automaticky generovaný popis/metadata, odkaz na originál.
3. **Ochranná známka "Path of Exile"** — na vzor pobarchives.com přidat do patičky disclaimer typu "Tento web není přidružen ke Grinding Gear Games ani jimi podporován."
4. **GDPR** — pokud budou uživatelské účty, je třeba standardní privacy policy a souhlas s cookies.
5. **Reddit/YouTube API Terms of Service** — nutno dodržet limity a podmínky použití dat (např. Reddit API nesmí být použito k tréninku AI modelů bez licence, YouTube data nesmí být uchovávána nad rámec povolený jejich ToS).
6. **Neoficiální API endpointy (poe.ninja)** — i když jde technicky jen o strukturovaná data (ne HTML scraping), stále je to použití mimo oficiálně dokumentované/podporované rozhraní. Doporučeno chovat se stejně ohleduplně jako u scrapingu fór (rate limiting, cache, slušný User-Agent) a počítat s tím, že se endpoint může kdykoliv změnit bez upozornění.
7. **Komunitně přidávaný obsah** — protože uživatelé budou moct sami přidávat buildy, je třeba mít jasná pravidla pro obsah (žádné spamové/nevhodné odkazy) a alespoň základní ochranu proti zneužití formuláře (rate limiting na odesílání, případně captcha), viz sekce 3 — moderace ve fázi 2.

---

## 6. Datový model (návrh)

### Tabulka `builds`
| Pole | Typ | Popis |
|---|---|---|
| id | UUID | primární klíč |
| title | text | název buildu/videa/postu |
| source | enum | reddit / youtube / poe_forum / pob_forum / poe_ninja / community |
| source_url | text | odkaz na originál |
| author | text | jméno autora |
| submitted_by | text | nullable — vyplněno jen u source = community (nepovinný kontakt přispěvatele, formulář je anonymní) |
| moderation_status | enum | pending / approved / rejected — u source = community výchozí stav "pending", u automaticky nalezených buildů rovnou "approved" |
| game | enum | poe1 / poe2 |
| class | text | herní třída (nullable, pokud se nepodaří klasifikovat) |
| ascendancy | text | nullable |
| main_skill | text | nullable |
| league_patch | text | např. "3.29" |
| tags | text[] | League Starter, Mapping, Bossing... |
| pob_link | text | nullable — pokud byl v popisu nalezen PoB export odkaz |
| stats_dps | numeric | nullable, jen pokud lze dekódovat z PoB |
| stats_life | numeric | nullable |
| stats_ehp | numeric | nullable |
| popularity_score | numeric | upvotes / views normalizované napříč zdroji |
| published_at | timestamp | datum publikace na zdrojovém webu |
| indexed_at | timestamp | kdy to náš systém našel |

### Tabulka `users` (fáze 2)
Standardní: id, email/OAuth identita, uložené filtry, oblíbené buildy.

---

## 7. Klasifikace buildů (nejtěžší technický problém)

Zdrojová data (název YouTube videa, text reddit postu) nejsou strukturovaná — je třeba je automaticky roztřídit do polí class/ascendancy/skill/liga. Doporučený přístup, seřazeno od nejspolehlivějšího:

1. **Extrakce a parsování PoB odkazu** (pobb.in, pastebin.com, poe.ninja/pob) z popisu/textu příspěvku. PoB export je gzip+base64 kódované XML, ze kterého lze programově vyčíst přesnou class, ascendancy, gemy a case-by-case i dosazené staty. Toto je nejpřesnější zdroj pravdy, pokud je odkaz dostupný.
2. **Klíčová slova / regex** na název a popis (funguje slušně, protože komunita používá konzistentní názvosloví — "Necromancer", "3.29", "SSF", "League Starter").
3. **Klasifikace pomocí LLM** — pro případy, kdy výše uvedené selže, lze poslat text (název + popis) přes API jazykového modelu s instrukcí vrátit strukturovaná metadata v JSON. Zvyšuje náklady, ale zlepšuje pokrytí.

Doporučení: v MVP kombinovat body 1 a 2, bod 3 nechat na fázi 2 kvůli nákladům.

---

## 8. Architektura systému (na vysoké úrovni, technologicky neutrální)

```
┌─────────────────────────────────────────┐
│           CRAWLER / INDEXER              │
│  (spouští se periodicky, např. každou    │
│   hodinu, přes scheduler/cron)           │
│                                           │
│  ├─ Reddit API konektor                  │
│  ├─ YouTube API konektor                 │
│  └─ Fórum scraper (fáze 2)               │
└──────────────────┬────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         NORMALIZACE A KLASIFIKACE         │
│  - extrakce PoB odkazů, parsování         │
│  - přiřazení class/ascendancy/skillu       │
│  - deduplikace (stejný build z více       │
│    zdrojů)                                │
└──────────────────┬────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│              DATABÁZE                     │
│  (uložené, indexované, prohledávatelné)   │
└──────────────────┬────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         SEARCH / FILTER API               │
│  (REST nebo GraphQL endpoint pro           │
│   frontend, s filtrováním, řazením,        │
│   stránkováním)                            │
└──────────────────┬────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│              FRONTEND WEB                 │
│  - filtrovací panel (multi-select)         │
│  - seznam výsledků / karty                 │
│  - detail buildu s odkazem na originál     │
└─────────────────────────────────────────┘
```

---

## 9. Doporučený tech stack (výchozí bod pro vývoj v Claude Code)

Vzhledem k tomu, že jde o veřejný produkt s výkyvy návštěvnosti (typicky špička na začátku nové PoE ligy), je vhodné od začátku stavět na technologiích, které se dobře škálují a se kterými se Claude Code snadno pracuje:

- **Frontend:** moderní JS framework (React/Next.js) — SEO je důležité (uživatelé budou builda hledat i přes Google), takže framework s server-side renderingem je vhodnější než čistě klientská SPA
- **Backend/API:** Node.js nebo Python (FastAPI) — obojí má dobré knihovny pro práci s Reddit/YouTube API a je dobře podporované v Claude Code
- **Databáze:** PostgreSQL (relační data + fulltextové vyhledávání přes vestavěný `tsvector`, případně později Meilisearch pro pokročilejší fulltext)
- **Crawler scheduler:** cron job / scheduled task, spouštěný periodicky nezávisle na frontendu
- **Hosting:** libovolná platforma podporující Node/Python + Postgres se snadným nasazením (řešení hostingu a případných nákladů je mimo rozsah tohoto dokumentu — je to samostatné rozhodnutí až ve fázi nasazení)

Tento stack je doporučení, ne pevné zadání — dá se v Claude Code upravit podle toho, co se během vývoje osvědčí.

---

## 10. Doporučené pořadí implementace (roadmapa pro postupný vývoj v Claude Code)

Místo odhadu pro externí dodavatele jde o pořadí kroků, ve kterém dává smysl projekt v Claude Code stavět — každý krok je funkční přírůstek, na kterém lze stavět další:

| Krok | Náplň |
|---|---|
| 1 | Datový model + databáze (PostgreSQL), základní `builds` tabulka |
| 2 | Anonymní formulář pro komunitní přidávání buildů + fronta ke schválení + jednoduché admin rozhraní pro pre-moderaci (nejjednodušší zdroj dat, žádné právní riziko, funguje hned) |
| 3 | Search/filter API nad databází + základní frontend s filtry a výpisem výsledků |
| 4 | Reddit API konektor (crawler + normalizace + klasifikace přes regex) |
| 5 | YouTube API konektor (stejným způsobem) |
| 6 | Parsování PoB *kódů* pro přesnější klasifikaci a zobrazení statistik (DPS/Life/EHP) — jen kódy vložené přímo uživatelem/v textu, ne fetchování odkazů (viz sekce 5, bod 1) |
| 7 | poe.ninja konektor — **odloženo** (2026-07-10): reálný formát je nezdokumentovaný binární protobuf, ne JSON jak se předpokládalo; viz sekce 4, tabulka zdrojů. Vrátit se k tomu později |
| 8 | Fórum scraper (PoE fórum, PoB Community) — až jako doplněk, protože je nejnáročnější na ošetření okrajových případů |
| 9 (post-MVP) | **Hotovo (2026-07-10):** uživatelské účty (email+heslo, bez emailové služby), oblíbené buildy, uložené filtry s in-app počítadlem nových shod (místo emailových notifikací), moderace nahlášeného obsahu, "podobné buildy", meta přehled, Mobalytics/Maxroll odkazy-prokliky |

---

## 11. Rozhodnutá zadání

- **Monetizace:** Google AdSense (Auto ads) přidáno 2026-07-18 — viz `POZNATKY.md`, sekce "Malé reklamy". Rozhodnutí "žádná monetizace" tímto padlo; **cookie consent banner pro EU/GDPR zatím chybí** a je potřeba ho doplnit před tím, než reklamy reálně naběhnou.
- **Název:** pracovní název "PoE Build Finder" zůstává, dokud nevznikne finální branding.
- **Podpora her:** PoE1 i PoE2 od první verze (ne postupné přidávání).
- **Komunitní obsah:** ano, uživatelé mohou od začátku (MVP) přidávat vlastní buildy formulářem.
- **Vývoj:** samostatně pomocí Claude Code, bez externího vývojáře/agentury.
- **Přihlašování k formuláři:** anonymní, bez registrace — s technickou ochranou proti spamu (rate limiting na IP, honeypot pole, případně jednoduchá captcha).
- **Rozlišení PoE1/PoE2 v UI:** společný filtr "Hra" (ne oddělené taby/sekce).
- **Moderace komunitního obsahu:** pre-moderace od MVP — nově přidaný build se veřejně nezobrazí, dokud ho ručně neschválíš. Znamená to nutnost jednoduchého administrátorského rozhraní (fronta čekajících příspěvků + tlačítko schválit/zamítnout) už v MVP, ne až ve fázi 2.

## 12. Zbývající otevřené otázky (k doladění průběžně během vývoje)

Aktuálně žádné — všechny klíčové otázky byly zodpovězeny. Nové otázky se pravděpodobně objeví v průběhu vývoje jednotlivých kroků (sekce 10) a budou se řešit průběžně.

---

## 13. Reference / inspirace

- pobarchives.com — existující obdobný nástroj, dobrý zdroj inspirace pro UX filtrů, ale s uvedenými nedostatky (výkon, přesnost dat, nepřehlednost)
- poe.ninja — kromě role datového zdroje (sekce 4) je i příkladem dobře fungujícího PoE datového webu, vhodný jako referenční vzor kvality UX a rychlosti
- Mobalytics — příklad dobře udělaného přehledu PoE2 buildů, vhodný jako referenční vzor pro vizuální prezentaci karty buildu
