import type { Locale } from "./locales";

export interface Dictionary {
  common: {
    loading: string;
  };
  nav: {
    brand: string;
    meta: string;
    submit: string;
    admin: string;
    favorites: string;
    campaignGuide: string;
    login: string;
    logout: string;
  };
  footer: {
    disclaimer: string;
  };
  cookieConsent: {
    message: string;
    accept: string;
    decline: string;
  };
  campaignGuide: {
    title: string;
    subtitle: string;
    watchVideo: string;
    town: string;
    boss: string;
    fullGuides: string;
    enlarge: string;
    close: string;
    tipsTitle: string;
    terminologyTitle: string;
    tips: string[];
    terminology: { term: string; meaning: string }[];
    actSummaries: string[];
  };
  home: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    classPlaceholder: string;
    ascendancyPlaceholder: string;
    creatorPlaceholder: string;
    mainSkillPlaceholder: string;
    leaguePlaceholder: string;
    tagsPlaceholder: string;
    searchButton: string;
    resetButton: string;
    saveFilterButton: string;
    saveFilterPrompt: string;
    saveFilterSuccess: string;
    saveFilterError: string;
    loadError: string;
    loading: string;
    noResults: string;
    addYourOwn: string;
    notFoundHint: string;
    prev: string;
    next: string;
    pageInfo: string; // {page}/{totalPages} ({total})
  };
  news: {
    title: string;
    subtitle: string;
    viewAll: string;
    source: string;
    loading: string;
    error: string;
  };
  games: { all: string; poe1: string; poe2: string };
  sources: {
    all: string;
    reddit: string;
    youtube: string;
    poe_forum: string;
    pob_forum: string;
    poe_ninja: string;
    community: string;
  };
  sorts: { date: string; popularity: string; relevance: string };
  meta: {
    title: string;
    subtitle: string;
    noLeague: string;
    loading: string;
    noBuilds: string;
  };
  favorites: {
    title: string;
    loading: string;
    loginPrompt: string;
    loginLink: string;
    empty: string;
    findBuild: string;
  };
  account: {
    loginTitle: string;
    registerTitle: string;
    authHint: string;
    email: string;
    password: string;
    loginButton: string;
    registerButton: string;
    switchToRegister: string;
    switchToLogin: string;
    genericError: string;
    accountTitle: string;
    logout: string;
    myFavorites: string;
    savedFilters: string;
    loading: string;
    noFilters: string;
    newMatches: string;
    markSeen: string;
    delete: string;
  };
  admin: {
    loginTitle: string;
    invalidCreds: string;
    username: string;
    password: string;
    loginButton: string;
    queueTitle: string;
    logout: string;
    loading: string;
    listError: string;
    emptyQueue: string;
    tags: string;
    author: string;
    contact: string;
    pob: string;
    approve: string;
    reject: string;
    rejectPrompt: string;
    actionFailed: string;
    reportsTitle: string;
    noReports: string;
    reason: string;
    removeBuild: string;
    dismissReport: string;
    bulkAddTitle: string;
    bulkAddHint: string;
    bulkAddPlaceholder: string;
    bulkAddSourceLabel: string;
    bulkAddSubmit: string;
    bulkAddRunning: string;
    bulkAddResultsTitle: string;
    bulkAddSuccess: string;
    bulkAddError: string;
  };
  submit: {
    title: string;
    subtitle: string;
    success: string;
    rateLimited: string;
    genericError: string;
    connectionError: string;
    titleLabel: string;
    linkLabel: string;
    gameLabel: string;
    classLabel: string;
    ascendancyLabel: string;
    mainSkillLabel: string;
    leaguePatchLabel: string;
    leaguePatchPlaceholder: string;
    tagsLabel: string;
    tagsPlaceholder: string;
    pobLinkLabel: string;
    pobCodeLabel: string;
    pobCodePlaceholder: string;
    pobCodeHint: string;
    authorLabel: string;
    contactLabel: string;
    honeypotLabel: string;
    submitButton: string;
    submitting: string;
  };
  buildCard: {
    addFavorite: string;
    removeFavorite: string;
    reportPrompt: string;
    reported: string;
    report: string;
  };
}

const en: Dictionary = {
  common: { loading: "Loading..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Meta overview",
    submit: "Submit build",
    admin: "Admin",
    favorites: "Favorites",
    campaignGuide: "Campaign Guide",
    login: "Sign in",
    logout: "Sign out",
  },
  footer: {
    disclaimer:
      "This site is not affiliated with or endorsed by Grinding Gear Games.",
  },
  cookieConsent: {
    message:
      "We use cookies to serve ads. Accept to allow personalized ads, or decline to browse without them.",
    accept: "Accept",
    decline: "Decline",
  },
  campaignGuide: {
    title: "PoE1 Campaign Guide",
    subtitle:
      "Act-by-act landmark maps for the Path of Exile 1 campaign, with links to full written guides.",
    watchVideo: "Watch a full campaign walkthrough on YouTube",
    town: "Town",
    boss: "Act boss",
    fullGuides: "Full guides",
    enlarge: "Enlarge",
    close: "Close",
    tipsTitle: "General campaign tips",
    terminologyTitle: "Terminology",
    tips: [
      "Don't waste time farming regular monsters — chase quest objectives, and only stop to clear packs of blue (magic) monsters. Rares aren't worth the risk on starting gear until you're well into Act 2.",
      "Decide your build before you start: sketch a rough passive tree in Path of Building and keep it open in a second window so you're not standing around mid-run figuring out where points go.",
      "Movement is king. Pair a travel skill (Flame Dash, Frostblink) with a movement skill (Leap Slam, Shield Charge) and alternate two Quicksilver Flasks whenever you're just running between objectives.",
      "Learn the shape of each zone over repeat playthroughs — knowing roughly where the exit sits relative to your entry point saves far more time than any single item or flask.",
      "Check every vendor when you pass through town for movement-speed boots, life-rolled rings, resistance pieces and useful link colors — but don't backtrack to a town without a real reason to.",
      "Grab your ascendancy as soon as it's available rather than saving Labyrinth runs for later, and try to finish the Merciless Labyrinth before you fight Kitava at the end of Act 10 — the resistance penalty afterward makes any endgame content noticeably harder.",
      "Gear priority while leveling: Life and resistances first, damage second. Once your resistances are capped (75%), shift the priority to Life, then damage.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — a shrine you activate once per zone that lets you fast-travel between any two waypoints you've unlocked, instead of walking the whole level again.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — using a Portal Scroll, the Portal skill gem, or simply exiting to character select and reloading, all of which drop you back in the last town you visited.",
      },
    ],
    actSummaries: [
      "You wash up on the Twilight Strand with nothing and fight your way to Lioneye's Watch, the first town. From there the coastline splits into the Coast and Mud Flats — worth a short detour to the Tidal Island for an optional fight against Hailrake, which rewards a Quicksilver Flask, and a hidden Medicine Chest nearby. The path then climbs through the Ledge and Climb into the Prison district, where Brutus guards the way out, before the Ship Graveyard (home to an optional Fairgraves encounter) and finally the Cavern of Anger, where Merveil waits in her lair.",
      "Act 2 opens up considerably — the Southern Forest leads to the Crossroads, a hub connecting the Chamber of Sins, Broken Bridge and Fellshrine Ruins. This act is where the bandit quest lives: you'll cross paths with Kraityn, Alira and Oak, and can choose to kill or spare each of them for a permanent passive bonus or a one-off reward, so it's worth deciding your build's priorities ahead of time. The road continues through the Western Forest and Wetlands into the Vaal Ruins, and the act closes at the Ancient Pyramid, where the Vaal Oversoul waits at the top.",
      "The City of Sarn gives way to a proper town, the Sarn Encampment, and from there the act sprawls through the Slums, Crematorium and a set of Sewers that double back on themselves — worth remembering the layout, since you'll pass through more than once. The Marketplace and Battlefront lead up to a pair of mirrored dungeons, the Solaris and Lunaris Temples, both of which reappear later in the campaign. From the Ebony Barracks the route climbs the Imperial Gardens into the Sceptre of God, ending on the Tower Rooftop against Dominus. If your build needs specific gems early, Siosa in the Library (reachable from the Imperial Gardens) sells almost the full gem list for a one-time quest.",
      "Highgate is a small town, but Act 4 packs in some of the campaign's most memorable side-fights: the Dried Lake against Voll, and — reached through the Mines and Crystal Veins — two entirely optional boss encounters in Kaom's Dream and Daresso's Dream, both well worth doing for the unique item rewards if you're not in a rush. The main path continues into the Belly of the Beast and down through the Harvest to the Black Core, where three named bosses (Shavronne, Maligaro, Doedre) each drop a piece of Malachai needed to open the final fight in the Black Heart.",
      "Act 5 moves the story to Oriath itself. From the Slave Pens and Control Blocks you reach Oriath Square, the new town, and from there the Templar Courts lead to a fight against High Templar Avarius and Innocence in the Sanctum of Innocence. The Ruined Square area branches out to the Ossuary and Reliquary, both worth visiting for quest items before you press on to the Cathedral Rooftop and Cathedral Apex, where Kitava makes the first of several appearances in the campaign.",
      "The campaign loops back to a changed Wraeclast, revisiting Lioneye's Watch, the Coast and Mud Flats from Act 1, but with new areas branching off them — the Karui Fortress hides an optional Tukohama fight, and the Prisoner's Gate leads to a two-part encounter with Abberath. The Wetlands hold their own optional boss (Ryslatha), and the act's main path runs through the Southern Forest and Beacon out to sea, ending at the Brine King's Reef where Tsoagoth awaits.",
      "Act 7 revisits Act 2's zones with a darker palette. The Crossroads and Fellshrine Ruins lead into the Crypt, where a map item opens an optional side dungeon, Maligaro's Sanctum. From the Den and Ashen Fields, the Dread Thicket hides another optional fight against Gruthkul, while the Causeway holds a lockbox worth grabbing before you head to Vaal City and down through the two-level Temple of Decay, where Arakaali lurks at the bottom.",
      "A flooded, rebuilt Sarn frames Act 8. The Toxic Conduits and Doedre's Cesspool (with an optional Doedre fight) lead to the Grand Promenade and Bath House, from where the path splits toward the Lunaris and Solaris Temples — each holding one of the two Harbinger bosses whose orbs you need. Along the way the Quay and Grain Gate offer a few side objectives worth grabbing, and the act ends at the Harbour Bridge, where activating the Statue of the Sisters triggers a joint fight against both Lunaris and Solaris.",
      "Act 9 trades forests for desert. From Highgate's Descent you drop into the Vastiri Desert, where an optional chest and a bottled-storm side quest are worth picking up before the Oasis, home to Shakari. The Foothills branch off toward the Boiling Lake for an optional Basilisk fight, while the Tunnel and Quarry lead to the Shrine of the Winds and Refinery, each with their own side boss. The act's main line finishes in the Belly of the Beast and Rotting Core, where you'll face Doedre, Maligaro and Shavronne again before the Depraved Trinity itself.",
      "The final act brings you back to Oriath one last time. From the Cathedral Rooftop and Ravaged Square, a side trip to the Sanctum of Innocence yields a fight against Avarius, Reassembled, while the Control Blocks hold an optional Vilenta encounter. The Canals and Feeding Trough lead to the Altar of Hunger for the last fight against Kitava — be aware it applies a lasting resistance penalty afterward, so many players level up a little first and consider running the Merciless Labyrinth before committing to the kill.",
    ],
  },
  home: {
    title: "Find builds",
    subtitle:
      "A meta search engine for Path of Exile 1 and 2 builds, across Reddit, YouTube, forums and the community.",
    searchPlaceholder: "Search title and description...",
    classPlaceholder: "Class",
    ascendancyPlaceholder: "Ascendancy",
    creatorPlaceholder: "Content creator (e.g. Zizaran)",
    mainSkillPlaceholder: "Main skill",
    leaguePlaceholder: "League / patch",
    tagsPlaceholder: "Tags (comma separated)",
    searchButton: "Search",
    resetButton: "Reset filters",
    saveFilterButton: "Save filter",
    saveFilterPrompt: "Name for the saved filter:",
    saveFilterSuccess: "Filter saved — find it on the Account page.",
    saveFilterError: "Couldn't save the filter.",
    loadError: "Couldn't load builds.",
    loading: "Loading...",
    noResults: "No builds match your filters. Try loosening them, or",
    addYourOwn: "add your own",
    notFoundHint: "Didn't find what you're looking for? Try",
    prev: "Previous",
    next: "Next",
    pageInfo: "Page {page} of {totalPages} ({total} builds)",
  },
  news: {
    title: "PoE News",
    subtitle:
      "Latest official announcements from Path of Exile and Path of Exile 2.",
    viewAll: "View all news",
    source: "Official news",
    loading: "Loading news...",
    error: "Couldn't load news.",
  },
  games: { all: "All games", poe1: "Path of Exile 1", poe2: "Path of Exile 2" },
  sources: {
    all: "All sources",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "PoE forum",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Community",
  },
  sorts: {
    date: "Newest",
    popularity: "Most popular",
    relevance: "Relevance (requires search text)",
  },
  meta: {
    title: "Meta overview",
    subtitle: "The most popular approved builds by league/patch.",
    noLeague: "No league available",
    loading: "Loading...",
    noBuilds: "No builds for this league yet.",
  },
  favorites: {
    title: "My favorite builds",
    loading: "Loading...",
    loginPrompt: "To see your favorite builds, please",
    loginLink: "sign in",
    empty: "Nothing here yet —",
    findBuild: "find a build",
  },
  account: {
    loginTitle: "Sign in",
    registerTitle: "Register",
    authHint:
      "An account is needed for favorites and saved filters. There's no email service — a forgotten password can't be recovered yet, only a new account created.",
    email: "Email",
    password: "Password",
    loginButton: "Sign in",
    registerButton: "Register",
    switchToRegister: "No account? Register",
    switchToLogin: "Already have an account? Sign in",
    genericError: "Something went wrong.",
    accountTitle: "Account",
    logout: "Sign out",
    myFavorites: "My favorite builds →",
    savedFilters: "Saved filters",
    loading: "Loading...",
    noFilters:
      'Nothing here yet — save a filter on the home page with the "Save filter" button.',
    newMatches: "new",
    markSeen: "Mark as seen",
    delete: "Delete",
  },
  admin: {
    loginTitle: "Admin sign in",
    invalidCreds: "Invalid credentials.",
    username: "Username",
    password: "Password",
    loginButton: "Sign in",
    queueTitle: "Builds awaiting approval",
    logout: "Sign out",
    loading: "Loading...",
    listError: "Couldn't load the moderation queue.",
    emptyQueue: "The queue is empty.",
    tags: "Tags",
    author: "Author",
    contact: "Contact",
    pob: "PoB",
    approve: "Approve",
    reject: "Reject",
    rejectPrompt: "Rejection note (optional):",
    actionFailed: "The action failed.",
    reportsTitle: "Reported content",
    noReports: "No open reports.",
    reason: "Reason",
    removeBuild: "Remove build",
    dismissReport: "Dismiss report",
    bulkAddTitle: "Bulk-add external links",
    bulkAddHint:
      "For sites that must not be auto-crawled (e.g. Maxroll) — browse the site yourself, then paste one build per line here: title | url | game (poe1/poe2) | class | build type | league | note. Only title, url and game are required; leave the rest blank between the pipes if unknown. Lines are published immediately (no moderation queue).",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Tanky, good clear and bossing",
    bulkAddSourceLabel: "Source site",
    bulkAddSubmit: "Upload",
    bulkAddRunning: "Uploading...",
    bulkAddResultsTitle: "Results",
    bulkAddSuccess: "added",
    bulkAddError: "failed",
  },
  submit: {
    title: "Submit a build",
    subtitle:
      "Paste a link to your build (PoB export, YouTube video, Reddit post, custom guide). This form is anonymous — the contact field below is optional. The build appears publicly only after manual approval.",
    success: "Thanks! Your build was submitted and is awaiting approval.",
    rateLimited:
      "Too many builds were submitted from this address, please try again later.",
    genericError: "Something went wrong, please try again.",
    connectionError: "Couldn't connect to the server.",
    titleLabel: "Build title",
    linkLabel: "Link (PoB, YouTube, Reddit, guide...)",
    gameLabel: "Game",
    classLabel: "Class",
    ascendancyLabel: "Ascendancy",
    mainSkillLabel: "Main skill",
    leaguePatchLabel: "League / patch",
    leaguePatchPlaceholder: "e.g. 3.29",
    tagsLabel: "Tags (comma separated)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Link to PoB export (optional)",
    pobCodeLabel: "PoB export code (optional, for automatic stats)",
    pobCodePlaceholder:
      "Paste the code from Path of Building → Export Build → Generate & copy code…",
    pobCodeHint:
      "Don't paste a link here — just the copied code itself. It's used to auto-fill class/ascendancy/main skill and DPS/Life/EHP, if provided.",
    authorLabel: "Build author (optional)",
    contactLabel: "Your contact (optional, only for possible questions)",
    honeypotLabel: "Leave empty",
    submitButton: "Submit for approval",
    submitting: "Submitting...",
  },
  buildCard: {
    addFavorite: "Add to favorites",
    removeFavorite: "Remove from favorites",
    reportPrompt: "Why are you reporting this build? (optional)",
    reported: "Reported",
    report: "Report",
  },
};

const cs: Dictionary = {
  common: { loading: "Načítám..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Meta přehled",
    submit: "Přidat build",
    admin: "Admin",
    favorites: "Oblíbené",
    campaignGuide: "Průvodce kampaní",
    login: "Přihlásit",
    logout: "Odhlásit",
  },
  footer: {
    disclaimer:
      "Tento web není přidružen ke Grinding Gear Games ani jimi podporován.",
  },
  cookieConsent: {
    message:
      "Používáme cookies pro zobrazování reklam. Souhlaste s personalizovanými reklamami, nebo je odmítněte a prohlížejte web bez nich.",
    accept: "Souhlasím",
    decline: "Odmítnout",
  },
  campaignGuide: {
    title: "Průvodce kampaní PoE1",
    subtitle:
      "Mapy klíčových míst pro každý akt kampaně Path of Exile 1, s odkazy na kompletní psané návody.",
    watchVideo: "Podívej se na kompletní průchod kampaní na YouTube",
    town: "Město",
    boss: "Boss aktu",
    fullGuides: "Kompletní návody",
    enlarge: "Zvětšit",
    close: "Zavřít",
    tipsTitle: "Obecné tipy ke kampani",
    terminologyTitle: "Terminologie",
    tips: [
      "Neztrácejte čas zabíjením běžných příšer — honte se za cíli questů a zastavte se jen kvůli skupinkám modrých (magic) monster. Vzácné (žluté) monstra se nevyplatí riskovat na startovním vybavení, dokud nejste pořádně v Aktu 2.",
      "Naplánujte si build předem: připravte si hrubý pasivní strom v Path of Building a nechte ho otevřený v druhém okně, ať nestojíte uprostřed hraní a nepřemýšlíte, kam dát body.",
      "Pohyb je král. Zkombinujte přesunový skill (Flame Dash, Frostblink) s pohybovým skillem (Leap Slam, Shield Charge) a střídejte dva Quicksilver Flasky, kdykoliv jen běžíte mezi cíli.",
      "Naučte se rozvržení jednotlivých zón opakovaným hraním — přibližná znalost, kde bývá východ vzhledem ke vstupu, ušetří mnohem víc času než jakýkoliv jeden item nebo flask.",
      "Při každém průchodu městem zkontrolujte prodejce — hledejte boty se zrychlením pohybu, prsteny se životy, itemy s resisty a užitečnými barvami linků — ale nevracejte se do města bez skutečného důvodu.",
      "Vezměte si ascendancy hned, jak je dostupná, místo abyste si Labyrinth šetřili na později, a zkuste dokončit Merciless Labyrinth ještě před bojem s Kitavou na konci Aktu 10 — postih na resisty po něm citelně ztíží jakýkoliv endgame obsah.",
      "Priorita vybavení při levelování: nejdřív životy a resisty, pak damage. Jakmile máte resisty na capu (75 %), přesuňte prioritu na životy a pak damage.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — svatyně, kterou aktivujete jednou za zónu a která umožňuje rychlý přesun mezi libovolnými dvěma odemčenými waypointy, místo aby se muselo znovu procházet celou úrovní.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — použití Portal Scrollu, skillu Portal, nebo prosté opuštění do výběru postavy a znovunačtení — všechny tyto možnosti vás vrátí do posledního města, ve kterém jste byli.",
      },
    ],
    actSummaries: [
      "Vyplavíte se na Twilight Strand bez ničeho a probojujete se do Lioneye's Watch, prvního města. Odtud se pobřeží rozděluje na Coast a Mud Flats — stojí za to odbočit na Tidal Island na volitelný souboj s Hailrakem, který dává Quicksilver Flask, a poblíž je i skrytá Medicine Chest. Cesta pak stoupá přes Ledge a Climb do vězeňské čtvrti, kde cestu ven hlídá Brutus, než dorazíte na Ship Graveyard (s volitelným soubojem s Fairgraves) a nakonec do Cavern of Anger, kde ve své sluji čeká Merveil.",
      "Akt 2 se výrazně otevírá — Southern Forest vede na Crossroads, uzel spojující Chamber of Sins, Broken Bridge a Fellshrine Ruins. V tomto aktu je i bandit quest: potkáte Kraityna, Aliru a Oaka a u každého si můžete vybrat, jestli ho zabijete nebo ušetříte, za trvalý pasivní bonus nebo jednorázovou odměnu — stojí za to si předem promyslet priority buildu. Cesta pokračuje přes Western Forest a Wetlands do Vaal Ruins a akt končí na Ancient Pyramid, kde nahoře čeká Vaal Oversoul.",
      "City of Sarn přechází do skutečného města, Sarn Encampment, a odtud se akt rozprostírá přes Slums, Crematorium a soustavu Sewers, která se sama zacyklí — stojí za to zapamatovat si rozvržení, protože tudy projdete víckrát. Marketplace a Battlefront vedou k dvojici zrcadlových dungeonů, Solaris a Lunaris Temple, které se v kampani objeví ještě jednou později. Z Ebony Barracks vede trasa přes Imperial Gardens do Sceptre of God a končí na Tower Rooftop proti Dominovi. Pokud váš build potřebuje konkrétní gemy brzy, Siosa v Library (dostupná z Imperial Gardens) prodává za jednorázový quest skoro celý seznam gemů.",
      "Highgate je malé město, ale Akt 4 nabízí jedny z nejzapamatovatelnějších vedlejších soubojů kampaně: Dried Lake proti Vollovi a — dostupné přes Mines a Crystal Veins — dva zcela volitelné boss souboje v Kaom's Dream a Daresso's Dream, oba stojí za to kvůli unikátním itemům, pokud nespěcháte. Hlavní cesta pokračuje do Belly of the Beast a přes Harvest do Black Core, kde tři pojmenovaní bossové (Shavronne, Maligaro, Doedre) každý pustí jednu část Malachaie potřebnou k otevření finálního souboje v Black Heart.",
      "Akt 5 přesouvá příběh do samotného Oriathu. Ze Slave Pens a Control Blocks se dostanete do Oriath Square, nového města, odkud Templar Courts vedou k souboji s High Templar Avariem a Innocence v Sanctum of Innocence. Oblast Ruined Square se větví do Ossuary a Reliquary, obě stojí za návštěvu kvůli questovým itemům, než se vydáte na Cathedral Rooftop a Cathedral Apex, kde se poprvé z několika v kampani objeví Kitava.",
      "Kampaň se vrací zpět na proměněný Wraeclast, znovu navštívíte Lioneye's Watch, Coast a Mud Flats z Aktu 1, ale s novými oblastmi, které se z nich větví — Karui Fortress skrývá volitelný souboj s Tukohamou a Prisoner's Gate vede k dvoufázovému souboji s Abberathem. Wetlands mají vlastního volitelného bosse (Ryslatha) a hlavní cesta aktu vede přes Southern Forest a Beacon na moře, konče na Brine King's Reef, kde čeká Tsoagoth.",
      "Akt 7 znovu navštěvuje zóny z Aktu 2, ale v temnějším provedení. Crossroads a Fellshrine Ruins vedou do Crypt, kde mapový item otevírá volitelný vedlejší dungeon Maligaro's Sanctum. Z Den a Ashen Fields skrývá Dread Thicket další volitelný souboj s Gruthkul, zatímco Causeway ukrývá schránku, kterou stojí za to sebrat, než zamíříte do Vaal City a dolů přes dvouúrovňový Temple of Decay, kde na dně číhá Arakaali.",
      "Akt 8 se odehrává v zatopeném, přestavěném Sarnu. Toxic Conduits a Doedre's Cesspool (s volitelným soubojem s Doedre) vedou na Grand Promenade a Bath House, odkud se cesta dělí směrem k Lunaris a Solaris Temple — každý ukrývá jednoho z dvojice Harbinger bossů, jejichž orb potřebujete. Cestou nabízí Quay a Grain Gate pár vedlejších cílů, které stojí za sebrání, a akt končí na Harbour Bridge, kde aktivace Statue of the Sisters spustí společný souboj proti Lunaris i Solaris.",
      "Akt 9 vyměňuje lesy za poušť. Z Descent v Highgate se dostanete do Vastiri Desert, kde stojí za sebrání volitelná truhla a vedlejší quest s bottled stormem, než dorazíte do Oasis, domova Shakari. Foothills se větví k Boiling Lake na volitelný souboj s Basiliskem, zatímco Tunnel a Quarry vedou do Shrine of the Winds a Refinery, každé s vlastním vedlejším bossem. Hlavní linka aktu končí v Belly of the Beast a Rotting Core, kde znovu potkáte Doedre, Maligara a Shavronne, než dojde na samotnou Depraved Trinity.",
      "Poslední akt vás naposledy přivádí zpět do Oriathu. Z Cathedral Rooftop a Ravaged Square vede odbočka do Sanctum of Innocence k souboji s Avariem, Reassembled, zatímco Control Blocks ukrývají volitelný souboj s Vilentou. Canals a Feeding Trough vedou k Altar of Hunger na poslední souboj s Kitavou — počítejte s tím, že po něm zůstává trvalý postih na resisty, takže spousta hráčů se nejdřív trochu dolevelí a zváží Merciless Labyrinth, než souboj podstoupí.",
    ],
  },
  home: {
    title: "Hledat buildy",
    subtitle:
      "Meta-vyhledávač buildů pro Path of Exile 1 a 2 napříč Redditem, YouTube, fóry a komunitou.",
    searchPlaceholder: "Hledat v názvu a popisu...",
    classPlaceholder: "Class",
    ascendancyPlaceholder: "Ascendancy",
    creatorPlaceholder: "Content creator (např. Zizaran)",
    mainSkillPlaceholder: "Hlavní skill",
    leaguePlaceholder: "Liga / patch",
    tagsPlaceholder: "Tagy (odděl čárkou)",
    searchButton: "Hledat",
    resetButton: "Vymazat filtry",
    saveFilterButton: "Uložit filtr",
    saveFilterPrompt: "Název pro uložený filtr:",
    saveFilterSuccess: "Filtr uložen — najdeš ho na stránce Účet.",
    saveFilterError: "Uložení filtru se nepovedlo.",
    loadError: "Nepodařilo se načíst buildy.",
    loading: "Načítám...",
    noResults:
      "Žádné buildy neodpovídají zadaným filtrům. Zkus je uvolnit, nebo",
    addYourOwn: "přidej svůj vlastní",
    notFoundHint: "Nenašel jsi, co hledáš? Zkus hledat i na",
    prev: "Předchozí",
    next: "Další",
    pageInfo: "Strana {page} z {totalPages} ({total} buildů)",
  },
  news: {
    title: "PoE novinky",
    subtitle:
      "Nejnovější oficiální oznámení z Path of Exile a Path of Exile 2.",
    viewAll: "Zobrazit všechny novinky",
    source: "Oficiální novinky",
    loading: "Načítám novinky...",
    error: "Novinky se nepodařilo načíst.",
  },
  games: {
    all: "Všechny hry",
    poe1: "Path of Exile 1",
    poe2: "Path of Exile 2",
  },
  sources: {
    all: "Všechny zdroje",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "PoE fórum",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Komunita",
  },
  sorts: {
    date: "Nejnovější",
    popularity: "Nejpopulárnější",
    relevance: "Relevance (vyžaduje hledaný výraz)",
  },
  meta: {
    title: "Meta přehled",
    subtitle: "Nejpopulárnější schválené buildy podle ligy/patche.",
    noLeague: "Žádná liga k dispozici",
    loading: "Načítám...",
    noBuilds: "Pro tuhle ligu zatím žádné buildy.",
  },
  favorites: {
    title: "Moje oblíbené buildy",
    loading: "Načítám...",
    loginPrompt: "Pro zobrazení oblíbených buildů se",
    loginLink: "přihlas",
    empty: "Zatím žádné —",
    findBuild: "najdi si nějaký build",
  },
  account: {
    loginTitle: "Přihlášení",
    registerTitle: "Registrace",
    authHint:
      "Účet je potřeba pro oblíbené buildy a uložené filtry. Bez emailové služby — zapomenuté heslo bohužel zatím nejde obnovit, jen založit nový účet.",
    email: "Email",
    password: "Heslo",
    loginButton: "Přihlásit",
    registerButton: "Zaregistrovat",
    switchToRegister: "Nemáš účet? Zaregistruj se",
    switchToLogin: "Už máš účet? Přihlas se",
    genericError: "Něco se nepovedlo.",
    accountTitle: "Účet",
    logout: "Odhlásit",
    myFavorites: "Moje oblíbené buildy →",
    savedFilters: "Uložené filtry",
    loading: "Načítám...",
    noFilters:
      'Zatím žádné — ulož si filtr na hlavní stránce tlačítkem "Uložit filtr".',
    newMatches: "nových",
    markSeen: "Označit jako viděné",
    delete: "Smazat",
  },
  admin: {
    loginTitle: "Admin přihlášení",
    invalidCreds: "Neplatné přihlašovací údaje.",
    username: "Uživatel",
    password: "Heslo",
    loginButton: "Přihlásit",
    queueTitle: "Buildy čekající na schválení",
    logout: "Odhlásit",
    loading: "Načítám...",
    listError: "Nepodařilo se načíst frontu ke schválení.",
    emptyQueue: "Fronta je prázdná.",
    tags: "Tagy",
    author: "Autor",
    contact: "Kontakt",
    pob: "PoB",
    approve: "Schválit",
    reject: "Zamítnout",
    rejectPrompt: "Poznámka k zamítnutí (nepovinné):",
    actionFailed: "Akce se nepovedla.",
    reportsTitle: "Nahlášený obsah",
    noReports: "Žádná otevřená nahlášení.",
    reason: "Důvod",
    removeBuild: "Odebrat build",
    dismissReport: "Zamítnout nahlášení",
    bulkAddTitle: "Hromadné přidání externích odkazů",
    bulkAddHint:
      "Pro weby, které se nesmí automaticky procházet (např. Maxroll) — projdi web sám a sem vlož jeden build na řádek ve tvaru: název | url | hra (poe1/poe2) | class | typ buildu | liga | poznámka. Povinné je jen název, url a hra, zbytek klidně nech mezi svislítky prázdný. Řádky se publikují rovnou (bez fronty ke schválení).",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Tanky, dobrý clear i bossing",
    bulkAddSourceLabel: "Zdrojový web",
    bulkAddSubmit: "Nahrát",
    bulkAddRunning: "Nahrávám...",
    bulkAddResultsTitle: "Výsledky",
    bulkAddSuccess: "přidáno",
    bulkAddError: "selhalo",
  },
  submit: {
    title: "Přidat build",
    subtitle:
      "Vlož odkaz na svůj build (PoB export, YouTube video, reddit post, vlastní guide). Formulář je anonymní — kontakt níže je nepovinný. Build se zobrazí veřejně až po ručním schválení.",
    success: "Díky! Build byl odeslán a čeká na schválení.",
    rateLimited:
      "Z této adresy bylo odesláno příliš mnoho buildů, zkus to prosím později.",
    genericError: "Něco se nepovedlo, zkus to prosím znovu.",
    connectionError: "Nepodařilo se spojit se serverem.",
    titleLabel: "Název buildu",
    linkLabel: "Odkaz (PoB, YouTube, Reddit, guide...)",
    gameLabel: "Hra",
    classLabel: "Class",
    ascendancyLabel: "Ascendancy",
    mainSkillLabel: "Hlavní skill",
    leaguePatchLabel: "Liga / patch",
    leaguePatchPlaceholder: "např. 3.29",
    tagsLabel: "Tagy (odděl čárkou)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Odkaz na PoB export (nepovinné)",
    pobCodeLabel: "PoB export kód (nepovinné, pro automatické staty)",
    pobCodePlaceholder:
      "Vlož kód z Path of Building → Export Build → Generate & copy code…",
    pobCodeHint:
      "Nevkládej sem odkaz — jen samotný zkopírovaný kód. Použije se k automatickému doplnění class/ascendancy/hlavního skillu a DPS/Life/EHP, pokud ho vložíš.",
    authorLabel: "Autor buildu (nepovinné)",
    contactLabel: "Tvůj kontakt (nepovinné, jen pro případné dotazy)",
    honeypotLabel: "Nechte prázdné",
    submitButton: "Odeslat ke schválení",
    submitting: "Odesílám...",
  },
  buildCard: {
    addFavorite: "Přidat do oblíbených",
    removeFavorite: "Odebrat z oblíbených",
    reportPrompt: "Proč tenhle build nahlašuješ? (nepovinné)",
    reported: "Nahlášeno",
    report: "Nahlásit",
  },
};

const pl: Dictionary = {
  common: { loading: "Ładowanie..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Przegląd meta",
    submit: "Dodaj build",
    admin: "Admin",
    favorites: "Ulubione",
    campaignGuide: "Przewodnik po kampanii",
    login: "Zaloguj się",
    logout: "Wyloguj się",
  },
  footer: {
    disclaimer:
      "Ta strona nie jest powiązana z Grinding Gear Games ani przez nich wspierana.",
  },
  cookieConsent: {
    message:
      "Używamy plików cookie do wyświetlania reklam. Zaakceptuj, aby zezwolić na spersonalizowane reklamy, lub odrzuć, aby przeglądać bez nich.",
    accept: "Akceptuję",
    decline: "Odrzuć",
  },
  campaignGuide: {
    title: "Przewodnik po kampanii PoE1",
    subtitle:
      "Mapy kluczowych miejsc dla każdego aktu kampanii Path of Exile 1, z odnośnikami do pełnych poradników.",
    watchVideo: "Obejrzyj pełne przejście kampanii na YouTube",
    town: "Miasto",
    boss: "Boss aktu",
    fullGuides: "Pełne poradniki",
    enlarge: "Powiększ",
    close: "Zamknij",
    tipsTitle: "Ogólne wskazówki do kampanii",
    terminologyTitle: "Terminologia",
    tips: [
      "Nie trać czasu na zabijanie zwykłych potworów — goń za celami zadań i zatrzymuj się tylko na grupki niebieskich (magicznych) potworów. Rzadkie (żółte) potwory nie są warte ryzyka na startowym sprzęcie, dopóki nie wejdziesz solidnie w Akt 2.",
      "Zaplanuj build zanim zaczniesz: naszkicuj wstępne drzewko pasywne w Path of Building i trzymaj je otwarte w drugim oknie, żeby nie stać w miejscu i zastanawiać się, gdzie przydzielić punkty.",
      "Ruch to podstawa. Połącz umiejętność podróżną (Flame Dash, Frostblink) z umiejętnością ruchu (Leap Slam, Shield Charge) i naprzemiennie używaj dwóch Quicksilver Flasków, gdy tylko biegniesz między celami.",
      "Poznaj układ każdej strefy dzięki wielokrotnym przejściom — orientacyjna wiedza, gdzie znajduje się wyjście względem wejścia, oszczędza znacznie więcej czasu niż jakikolwiek pojedynczy przedmiot czy flaszka.",
      "Sprawdzaj każdego handlarza podczas przechodzenia przez miasto — szukaj butów ze zwiększoną prędkością ruchu, pierścieni z życiem, przedmiotów z odpornościami i przydatnymi kolorami linków — ale nie wracaj do miasta bez realnego powodu.",
      "Zdobądź swoją ascendancy jak najszybciej, zamiast odkładać Labirynt na później, i spróbuj ukończyć Merciless Labirynt przed walką z Kitavą na końcu Aktu 10 — kara do odporności po niej zauważalnie utrudnia całą zawartość endgame.",
      "Priorytet ekwipunku podczas levelowania: najpierw życie i odporności, potem obrażenia. Gdy odporności osiągną limit (75%), priorytet przesuwa się na życie, a potem obrażenia.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — sanktuarium aktywowane raz na strefę, które pozwala szybko podróżować między dowolnymi dwoma odblokowanymi waypointami, zamiast przemierzać cały poziom od nowa.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — użycie Zwoju Portalu, umiejętności Portal, albo po prostu wyjście do wyboru postaci i ponowne wejście — wszystko to przenosi cię z powrotem do ostatniego odwiedzonego miasta.",
      },
    ],
    actSummaries: [
      "Wypływasz na brzeg Twilight Strand bez niczego i przebijasz się do Lioneye's Watch, pierwszego miasta. Stamtąd wybrzeże rozgałęzia się na Coast i Mud Flats — warto zboczyć na Tidal Island na opcjonalną walkę z Hailrakiem, za którą dostajesz Quicksilver Flask, oraz pobliską ukrytą Medicine Chest. Ścieżka wspina się dalej przez Ledge i Climb do dzielnicy więziennej, gdzie drogę blokuje Brutus, po czym trafiasz do Ship Graveyard (z opcjonalnym starciem z Fairgraves), a na końcu do Cavern of Anger, gdzie w swojej kryjówce czeka Merveil.",
      "Akt 2 znacznie się otwiera — Southern Forest prowadzi do Crossroads, węzła łączącego Chamber of Sins, Broken Bridge i Fellshrine Ruins. To w tym akcie znajduje się zadanie bandytów: spotkasz Kraityna, Alirę i Oaka, a przy każdym możesz wybrać, czy go zabić, czy oszczędzić, za stały bonus pasywny albo jednorazową nagrodę — warto wcześniej przemyśleć priorytety builda. Droga prowadzi dalej przez Western Forest i Wetlands do Vaal Ruins, a akt kończy się na Ancient Pyramid, gdzie na szczycie czeka Vaal Oversoul.",
      "City of Sarn przechodzi w prawdziwe miasto, Sarn Encampment, a stamtąd akt rozciąga się przez Slums, Crematorium i sieć Sewers, która zapętla się sama w sobie — warto zapamiętać układ, bo przejdziesz tędy więcej niż raz. Marketplace i Battlefront prowadzą do pary lustrzanych lochów, Solaris i Lunaris Temple, które pojawią się jeszcze raz później w kampanii. Z Ebony Barracks trasa wspina się przez Imperial Gardens do Sceptre of God i kończy się na Tower Rooftop w starciu z Dominusem. Jeśli twój build potrzebuje konkretnych gemów wcześnie, Siosa w Library (dostępnej z Imperial Gardens) sprzedaje za jednorazowe zadanie niemal cały zestaw gemów.",
      "Highgate to niewielkie miasto, ale Akt 4 oferuje jedne z najbardziej zapadających w pamięć walk pobocznych kampanii: Dried Lake przeciwko Vollowi oraz — dostępne przez Mines i Crystal Veins — dwie całkowicie opcjonalne walki z bossami w Kaom's Dream i Daresso's Dream, obie warte zachodu ze względu na unikatowe przedmioty, jeśli się nie spieszysz. Główna ścieżka prowadzi dalej do Belly of the Beast i przez Harvest do Black Core, gdzie trzej nazwani bossowie (Shavronne, Maligaro, Doedre) upuszczają fragment Malachaia potrzebny do otwarcia finałowej walki w Black Heart.",
      "Akt 5 przenosi fabułę do samego Oriath. Ze Slave Pens i Control Blocks docierasz do Oriath Square, nowego miasta, skąd Templar Courts prowadzą do walki z High Templar Avariusem i Innocence w Sanctum of Innocence. Obszar Ruined Square rozgałęzia się do Ossuary i Reliquary, obu wartych odwiedzenia dla przedmiotów zadaniowych, zanim ruszysz na Cathedral Rooftop i Cathedral Apex, gdzie Kitava pojawia się po raz pierwszy z kilku w kampanii.",
      "Kampania zawraca na odmieniony Wraeclast, odwiedzasz ponownie Lioneye's Watch, Coast i Mud Flats z Aktu 1, ale z nowymi obszarami odchodzącymi od nich — Karui Fortress skrywa opcjonalną walkę z Tukohamą, a Prisoner's Gate prowadzi do dwuczęściowego starcia z Abberathem. Wetlands mają własnego opcjonalnego bossa (Ryslatha), a główna ścieżka aktu biegnie przez Southern Forest i Beacon aż nad morze, kończąc się na Brine King's Reef, gdzie czeka Tsoagoth.",
      "Akt 7 odwiedza ponownie strefy z Aktu 2, ale w mroczniejszej odsłonie. Crossroads i Fellshrine Ruins prowadzą do Crypt, gdzie przedmiot-mapa otwiera opcjonalny loch poboczny, Maligaro's Sanctum. Z Den i Ashen Fields, Dread Thicket skrywa kolejną opcjonalną walkę z Gruthkul, podczas gdy Causeway ukrywa skrzynkę wartą zabrania, zanim skierujesz się do Vaal City i w dół przez dwupoziomowy Temple of Decay, gdzie na dnie czai się Arakaali.",
      "Zalany, odbudowany Sarn stanowi tło Aktu 8. Toxic Conduits i Doedre's Cesspool (z opcjonalną walką z Doedre) prowadzą do Grand Promenade i Bath House, skąd ścieżka rozdziela się w kierunku Lunaris i Solaris Temple — każda kryje jednego z dwóch bossów Harbinger, których orby są potrzebne. Po drodze Quay i Grain Gate oferują kilka pobocznych celów wartych zebrania, a akt kończy się na Harbour Bridge, gdzie aktywacja Statue of the Sisters wywołuje wspólną walkę z Lunaris i Solaris.",
      "Akt 9 zamienia lasy na pustynię. Z Descent w Highgate schodzisz do Vastiri Desert, gdzie warto zebrać opcjonalną skrzynię i poboczne zadanie z bottled storm, zanim dotrzesz do Oasis, domu Shakari. Foothills rozgałęziają się do Boiling Lake na opcjonalną walkę z Bazyliszkiem, podczas gdy Tunnel i Quarry prowadzą do Shrine of the Winds i Refinery, każde z własnym pobocznym bossem. Główna linia aktu kończy się w Belly of the Beast i Rotting Core, gdzie ponownie spotkasz Doedre, Maligaro i Shavronne, zanim dojdzie do starcia z samą Depraved Trinity.",
      "Ostatni akt po raz ostatni sprowadza cię do Oriath. Z Cathedral Rooftop i Ravaged Square poboczna wyprawa do Sanctum of Innocence prowadzi do walki z Avariusem, Reassembled, podczas gdy Control Blocks kryją opcjonalne starcie z Vilentą. Canals i Feeding Trough prowadzą do Altar of Hunger na ostatnią walkę z Kitavą — pamiętaj, że pozostawia ona trwałą karę do odporności, więc wielu graczy najpierw trochę się dolevelowuje i rozważa Merciless Labirynt, zanim zdecyduje się na to starcie.",
    ],
  },
  home: {
    title: "Szukaj buildów",
    subtitle:
      "Wyszukiwarka meta buildów do Path of Exile 1 i 2 z Reddita, YouTube, forów i społeczności.",
    searchPlaceholder: "Szukaj w tytule i opisie...",
    classPlaceholder: "Klasa",
    ascendancyPlaceholder: "Ascendancja",
    creatorPlaceholder: "Twórca treści (np. Zizaran)",
    mainSkillPlaceholder: "Główna umiejętność",
    leaguePlaceholder: "Liga / patch",
    tagsPlaceholder: "Tagi (oddziel przecinkiem)",
    searchButton: "Szukaj",
    resetButton: "Wyczyść filtry",
    saveFilterButton: "Zapisz filtr",
    saveFilterPrompt: "Nazwa zapisanego filtra:",
    saveFilterSuccess: "Filtr zapisany — znajdziesz go na stronie Konto.",
    saveFilterError: "Nie udało się zapisać filtra.",
    loadError: "Nie udało się wczytać buildów.",
    loading: "Ładowanie...",
    noResults: "Żaden build nie pasuje do filtrów. Spróbuj je poluzować albo",
    addYourOwn: "dodaj własny",
    notFoundHint: "Nie znalazłeś tego, czego szukasz? Spróbuj też",
    prev: "Poprzednia",
    next: "Następna",
    pageInfo: "Strona {page} z {totalPages} ({total} buildów)",
  },
  news: {
    title: "Nowości PoE",
    subtitle:
      "Najnowsze oficjalne ogłoszenia z Path of Exile i Path of Exile 2.",
    viewAll: "Zobacz wszystkie nowości",
    source: "Oficjalne nowości",
    loading: "Ładowanie nowości...",
    error: "Nie udało się załadować nowości.",
  },
  games: {
    all: "Wszystkie gry",
    poe1: "Path of Exile 1",
    poe2: "Path of Exile 2",
  },
  sources: {
    all: "Wszystkie źródła",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "Forum PoE",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Społeczność",
  },
  sorts: {
    date: "Najnowsze",
    popularity: "Najpopularniejsze",
    relevance: "Trafność (wymaga frazy)",
  },
  meta: {
    title: "Przegląd meta",
    subtitle: "Najpopularniejsze zatwierdzone buildy według ligi/patcha.",
    noLeague: "Brak dostępnej ligi",
    loading: "Ładowanie...",
    noBuilds: "Dla tej ligi nie ma jeszcze buildów.",
  },
  favorites: {
    title: "Moje ulubione buildy",
    loading: "Ładowanie...",
    loginPrompt: "Aby zobaczyć ulubione buildy,",
    loginLink: "zaloguj się",
    empty: "Jeszcze nic tu nie ma —",
    findBuild: "znajdź jakiś build",
  },
  account: {
    loginTitle: "Logowanie",
    registerTitle: "Rejestracja",
    authHint:
      "Konto jest potrzebne do ulubionych i zapisanych filtrów. Brak usługi e-mail — zapomnianego hasła nie da się jeszcze odzyskać, można tylko założyć nowe konto.",
    email: "E-mail",
    password: "Hasło",
    loginButton: "Zaloguj się",
    registerButton: "Zarejestruj się",
    switchToRegister: "Nie masz konta? Zarejestruj się",
    switchToLogin: "Masz już konto? Zaloguj się",
    genericError: "Coś poszło nie tak.",
    accountTitle: "Konto",
    logout: "Wyloguj się",
    myFavorites: "Moje ulubione buildy →",
    savedFilters: "Zapisane filtry",
    loading: "Ładowanie...",
    noFilters:
      'Jeszcze nic tu nie ma — zapisz filtr na stronie głównej przyciskiem "Zapisz filtr".',
    newMatches: "nowych",
    markSeen: "Oznacz jako obejrzane",
    delete: "Usuń",
  },
  admin: {
    loginTitle: "Logowanie administratora",
    invalidCreds: "Nieprawidłowe dane logowania.",
    username: "Użytkownik",
    password: "Hasło",
    loginButton: "Zaloguj się",
    queueTitle: "Buildy oczekujące na zatwierdzenie",
    logout: "Wyloguj się",
    loading: "Ładowanie...",
    listError: "Nie udało się wczytać kolejki moderacji.",
    emptyQueue: "Kolejka jest pusta.",
    tags: "Tagi",
    author: "Autor",
    contact: "Kontakt",
    pob: "PoB",
    approve: "Zatwierdź",
    reject: "Odrzuć",
    rejectPrompt: "Notatka odrzucenia (opcjonalna):",
    actionFailed: "Akcja się nie powiodła.",
    reportsTitle: "Zgłoszona treść",
    noReports: "Brak otwartych zgłoszeń.",
    reason: "Powód",
    removeBuild: "Usuń build",
    dismissReport: "Odrzuć zgłoszenie",
    bulkAddTitle: "Masowe dodawanie linków zewnętrznych",
    bulkAddHint:
      "Dla stron, których nie wolno automatycznie przeszukiwać (np. Maxroll) — przejrzyj stronę sam, a potem wklej tutaj jeden build na wiersz: tytuł | url | gra (poe1/poe2) | klasa | typ builda | liga | notatka. Wymagane są tylko tytuł, url i gra, resztę możesz zostawić pustą między znakami |. Wiersze publikują się od razu (bez kolejki moderacji).",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Wytrzymały, dobry clear i bossing",
    bulkAddSourceLabel: "Strona źródłowa",
    bulkAddSubmit: "Wyślij",
    bulkAddRunning: "Wysyłanie...",
    bulkAddResultsTitle: "Wyniki",
    bulkAddSuccess: "dodano",
    bulkAddError: "błąd",
  },
  submit: {
    title: "Dodaj build",
    subtitle:
      "Wklej link do swojego builda (eksport PoB, film YouTube, post z Reddita, własny poradnik). Formularz jest anonimowy — kontakt poniżej jest opcjonalny. Build pojawi się publicznie dopiero po ręcznym zatwierdzeniu.",
    success: "Dzięki! Build został wysłany i czeka na zatwierdzenie.",
    rateLimited:
      "Z tego adresu wysłano zbyt wiele buildów, spróbuj ponownie później.",
    genericError: "Coś poszło nie tak, spróbuj ponownie.",
    connectionError: "Nie udało się połączyć z serwerem.",
    titleLabel: "Tytuł builda",
    linkLabel: "Link (PoB, YouTube, Reddit, poradnik...)",
    gameLabel: "Gra",
    classLabel: "Klasa",
    ascendancyLabel: "Ascendancja",
    mainSkillLabel: "Główna umiejętność",
    leaguePatchLabel: "Liga / patch",
    leaguePatchPlaceholder: "np. 3.29",
    tagsLabel: "Tagi (oddziel przecinkiem)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Link do eksportu PoB (opcjonalnie)",
    pobCodeLabel:
      "Kod eksportu PoB (opcjonalnie, dla automatycznych statystyk)",
    pobCodePlaceholder:
      "Wklej kod z Path of Building → Export Build → Generate & copy code…",
    pobCodeHint:
      "Nie wklejaj tu linku — tylko sam skopiowany kod. Posłuży do automatycznego uzupełnienia klasy/ascendancji/głównej umiejętności oraz DPS/Life/EHP, jeśli go podasz.",
    authorLabel: "Autor builda (opcjonalnie)",
    contactLabel: "Twój kontakt (opcjonalnie, tylko na ewentualne pytania)",
    honeypotLabel: "Zostaw puste",
    submitButton: "Wyślij do zatwierdzenia",
    submitting: "Wysyłanie...",
  },
  buildCard: {
    addFavorite: "Dodaj do ulubionych",
    removeFavorite: "Usuń z ulubionych",
    reportPrompt: "Dlaczego zgłaszasz ten build? (opcjonalnie)",
    reported: "Zgłoszono",
    report: "Zgłoś",
  },
};

const ru: Dictionary = {
  common: { loading: "Загрузка..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Обзор меты",
    submit: "Добавить билд",
    admin: "Админ",
    favorites: "Избранное",
    campaignGuide: "Гайд по кампании",
    login: "Войти",
    logout: "Выйти",
  },
  footer: {
    disclaimer:
      "Этот сайт не связан с Grinding Gear Games и не поддерживается ими.",
  },
  cookieConsent: {
    message:
      "Мы используем файлы cookie для показа рекламы. Согласитесь, чтобы разрешить персонализированную рекламу, или откажитесь, чтобы просматривать сайт без неё.",
    accept: "Согласен",
    decline: "Отклонить",
  },
  campaignGuide: {
    title: "Гайд по кампании PoE1",
    subtitle:
      "Карты ключевых мест для каждого акта кампании Path of Exile 1, со ссылками на полные текстовые гайды.",
    watchVideo: "Смотреть полное прохождение кампании на YouTube",
    town: "Город",
    boss: "Босс акта",
    fullGuides: "Полные гайды",
    enlarge: "Увеличить",
    close: "Закрыть",
    tipsTitle: "Общие советы по кампании",
    terminologyTitle: "Терминология",
    tips: [
      "Не тратьте время на фарм обычных монстров — гонитесь за целями квестов и останавливайтесь только ради групп синих (магических) монстров. Редкие (жёлтые) монстры не стоят риска на стартовом снаряжении, пока вы не окажетесь глубоко во 2 акте.",
      "Продумайте билд заранее: набросайте примерное пассивное дерево в Path of Building и держите его открытым во втором окне, чтобы не стоять на месте и не думать, куда вложить очки.",
      "Передвижение — это всё. Сочетайте передвигающий скилл (Flame Dash, Frostblink) с движковым скиллом (Leap Slam, Shield Charge) и чередуйте два Quicksilver Flask, когда просто бежите между целями.",
      "Изучайте планировку каждой зоны за счёт повторных прохождений — примерное знание, где находится выход относительно входа, экономит куда больше времени, чем любой отдельный предмет или флакон.",
      "Проверяйте каждого торговца при проходе через город — ищите ботинки со скоростью передвижения, кольца с жизнью, предметы с сопротивлениями и нужными цветами линков — но не возвращайтесь в город без реальной причины.",
      "Берите асцендансию сразу, как только она доступна, вместо того чтобы откладывать Лабиринт на потом, и постарайтесь пройти Merciless Лабиринт до боя с Китавой в конце 10 акта — штраф к сопротивлениям после него заметно усложняет любой эндгейм-контент.",
      "Приоритет экипировки при левелинге: сначала жизнь и сопротивления, потом урон. Как только сопротивления упираются в потолок (75%), приоритет смещается на жизнь, а затем на урон.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — путевая точка, активируемая один раз за зону, которая позволяет быстро перемещаться между любыми двумя открытыми точками, вместо повторного прохождения всего уровня.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — использование свитка портала, скилла Portal, либо просто выход в выбор персонажа и повторный вход — всё это возвращает вас в последний город, в котором вы были.",
      },
    ],
    actSummaries: [
      "Вас выбрасывает на Twilight Strand без ничего, и вы пробиваетесь к Lioneye's Watch, первому городу. Оттуда побережье разделяется на Coast и Mud Flats — стоит заглянуть на Tidal Island ради необязательного боя с Hailrake, за которого дают Quicksilver Flask, и спрятанного рядом Medicine Chest. Дальше путь поднимается через Ledge и Climb в тюремный район, где выход стережёт Brutus, затем идёт Ship Graveyard (с необязательной встречей с Fairgraves) и, наконец, Cavern of Anger, где в своём логове ждёт Merveil.",
      "Акт 2 заметно раскрывается — Southern Forest ведёт к Crossroads, узлу, соединяющему Chamber of Sins, Broken Bridge и Fellshrine Ruins. Именно здесь находится квест бандитов: вы встретите Kraityn, Alira и Oak, и по каждому из них можно выбрать — убить или пощадить — за постоянный пассивный бонус или разовую награду, так что стоит заранее продумать приоритеты билда. Дорога продолжается через Western Forest и Wetlands в Vaal Ruins, а акт заканчивается на Ancient Pyramid, где наверху ждёт Vaal Oversoul.",
      "City of Sarn переходит в настоящий город, Sarn Encampment, а дальше акт разворачивается через Slums, Crematorium и сеть Sewers, которая закольцовывается сама на себя — стоит запомнить планировку, так как вы пройдёте здесь не раз. Marketplace и Battlefront ведут к паре зеркальных подземелий, Solaris и Lunaris Temple, которые ещё раз появятся позже в кампании. Из Ebony Barracks маршрут поднимается через Imperial Gardens в Sceptre of God и заканчивается на Tower Rooftop боем с Dominus. Если вашему билду нужны конкретные гемы пораньше, Siosa в Library (доступна из Imperial Gardens) продаёт за одноразовый квест почти весь список гемов.",
      "Highgate — небольшой город, но Акт 4 включает одни из самых запоминающихся побочных боёв кампании: Dried Lake против Voll, а также — доступные через Mines и Crystal Veins — два полностью необязательных босс-боя в Kaom's Dream и Daresso's Dream, оба стоят того ради уникальных предметов, если вы не торопитесь. Основной путь продолжается в Belly of the Beast и через Harvest к Black Core, где три именных босса (Shavronne, Maligaro, Doedre) каждый роняет часть Malachai, нужную для открытия финального боя в Black Heart.",
      "Акт 5 переносит сюжет в сам Oriath. Из Slave Pens и Control Blocks вы попадаете в Oriath Square, новый город, откуда Templar Courts ведут к бою с High Templar Avarius и Innocence в Sanctum of Innocence. Область Ruined Square разветвляется на Ossuary и Reliquary, обе стоят посещения ради квестовых предметов, прежде чем вы направитесь на Cathedral Rooftop и Cathedral Apex, где Kitava впервые из нескольких раз появляется в кампании.",
      "Кампания возвращается на изменившийся Wraeclast, вы снова посещаете Lioneye's Watch, Coast и Mud Flats из 1 акта, но с новыми зонами, ответвляющимися от них — Karui Fortress скрывает необязательный бой с Tukohama, а Prisoner's Gate ведёт к двухчастной встрече с Abberath. У Wetlands есть свой необязательный босс (Ryslatha), а основной путь акта проходит через Southern Forest и Beacon к морю, заканчиваясь на Brine King's Reef, где ждёт Tsoagoth.",
      "Акт 7 повторно посещает зоны из Акта 2, но в более мрачном исполнении. Crossroads и Fellshrine Ruins ведут в Crypt, где предмет-карта открывает необязательное побочное подземелье, Maligaro's Sanctum. Из Den и Ashen Fields, Dread Thicket скрывает ещё один необязательный бой с Gruthkul, а Causeway прячет сундук, который стоит забрать перед тем, как отправиться в Vaal City и вниз через двухуровневый Temple of Decay, где на дне таится Arakaali.",
      "Затопленный, отстроенный заново Sarn служит фоном Акта 8. Toxic Conduits и Doedre's Cesspool (с необязательным боем с Doedre) ведут к Grand Promenade и Bath House, откуда путь разделяется в сторону Lunaris и Solaris Temple — в каждом скрывается один из двух боссов Harbinger, чьи сферы вам нужны. По пути Quay и Grain Gate предлагают несколько побочных целей, которые стоит собрать, а акт заканчивается на Harbour Bridge, где активация Statue of the Sisters вызывает совместный бой против Lunaris и Solaris.",
      "Акт 9 меняет леса на пустыню. Из Descent в Highgate вы спускаетесь в Vastiri Desert, где стоит забрать необязательный сундук и побочный квест с bottled storm, прежде чем добраться до Oasis, дома Shakari. Foothills разветвляются к Boiling Lake ради необязательного боя с Basilisk, а Tunnel и Quarry ведут к Shrine of the Winds и Refinery, у каждого свой побочный босс. Основная линия акта заканчивается в Belly of the Beast и Rotting Core, где вы снова встретите Doedre, Maligaro и Shavronne, прежде чем дойдёт до самой Depraved Trinity.",
      "Финальный акт в последний раз возвращает вас в Oriath. Из Cathedral Rooftop и Ravaged Square побочный визит в Sanctum of Innocence ведёт к бою с Avarius, Reassembled, а Control Blocks скрывают необязательную встречу с Vilenta. Canals и Feeding Trough ведут к Altar of Hunger для последнего боя с Kitava — учтите, что после него остаётся постоянный штраф к сопротивлениям, поэтому многие игроки сначала немного повышают уровень и рассматривают Merciless Лабиринт, прежде чем решиться на этот бой.",
    ],
  },
  home: {
    title: "Поиск билдов",
    subtitle:
      "Мета-поисковик билдов для Path of Exile 1 и 2 по Reddit, YouTube, форумам и сообществу.",
    searchPlaceholder: "Поиск по названию и описанию...",
    classPlaceholder: "Класс",
    ascendancyPlaceholder: "Асцендант",
    creatorPlaceholder: "Автор контента (напр. Zizaran)",
    mainSkillPlaceholder: "Основной навык",
    leaguePlaceholder: "Лига / патч",
    tagsPlaceholder: "Теги (через запятую)",
    searchButton: "Искать",
    resetButton: "Сбросить фильтры",
    saveFilterButton: "Сохранить фильтр",
    saveFilterPrompt: "Название сохранённого фильтра:",
    saveFilterSuccess: "Фильтр сохранён — найдёшь его на странице Аккаунт.",
    saveFilterError: "Не удалось сохранить фильтр.",
    loadError: "Не удалось загрузить билды.",
    loading: "Загрузка...",
    noResults: "Ни один билд не подходит под фильтры. Попробуй ослабить их или",
    addYourOwn: "добавь свой",
    notFoundHint: "Не нашёл то, что искал? Попробуй также",
    prev: "Назад",
    next: "Далее",
    pageInfo: "Страница {page} из {totalPages} ({total} билдов)",
  },
  news: {
    title: "Новости PoE",
    subtitle: "Последние официальные анонсы Path of Exile и Path of Exile 2.",
    viewAll: "Все новости",
    source: "Официальные новости",
    loading: "Загрузка новостей...",
    error: "Не удалось загрузить новости.",
  },
  games: { all: "Все игры", poe1: "Path of Exile 1", poe2: "Path of Exile 2" },
  sources: {
    all: "Все источники",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "Форум PoE",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Сообщество",
  },
  sorts: {
    date: "Новые",
    popularity: "Популярные",
    relevance: "Релевантность (нужен текст поиска)",
  },
  meta: {
    title: "Обзор меты",
    subtitle: "Самые популярные одобренные билды по лиге/патчу.",
    noLeague: "Нет доступной лиги",
    loading: "Загрузка...",
    noBuilds: "Для этой лиги пока нет билдов.",
  },
  favorites: {
    title: "Мои избранные билды",
    loading: "Загрузка...",
    loginPrompt: "Чтобы увидеть избранные билды,",
    loginLink: "войди",
    empty: "Пока пусто —",
    findBuild: "найди билд",
  },
  account: {
    loginTitle: "Вход",
    registerTitle: "Регистрация",
    authHint:
      "Аккаунт нужен для избранного и сохранённых фильтров. Почтовой службы нет — забытый пароль пока нельзя восстановить, можно только создать новый аккаунт.",
    email: "Email",
    password: "Пароль",
    loginButton: "Войти",
    registerButton: "Зарегистрироваться",
    switchToRegister: "Нет аккаунта? Зарегистрируйся",
    switchToLogin: "Уже есть аккаунт? Войти",
    genericError: "Что-то пошло не так.",
    accountTitle: "Аккаунт",
    logout: "Выйти",
    myFavorites: "Мои избранные билды →",
    savedFilters: "Сохранённые фильтры",
    loading: "Загрузка...",
    noFilters:
      "Пока пусто — сохрани фильтр на главной странице кнопкой «Сохранить фильтр».",
    newMatches: "новых",
    markSeen: "Отметить как просмотренное",
    delete: "Удалить",
  },
  admin: {
    loginTitle: "Вход для админа",
    invalidCreds: "Неверные учётные данные.",
    username: "Логин",
    password: "Пароль",
    loginButton: "Войти",
    queueTitle: "Билды, ожидающие одобрения",
    logout: "Выйти",
    loading: "Загрузка...",
    listError: "Не удалось загрузить очередь модерации.",
    emptyQueue: "Очередь пуста.",
    tags: "Теги",
    author: "Автор",
    contact: "Контакт",
    pob: "PoB",
    approve: "Одобрить",
    reject: "Отклонить",
    rejectPrompt: "Комментарий к отклонению (необязательно):",
    actionFailed: "Действие не удалось.",
    reportsTitle: "Жалобы на контент",
    noReports: "Открытых жалоб нет.",
    reason: "Причина",
    removeBuild: "Удалить билд",
    dismissReport: "Отклонить жалобу",
    bulkAddTitle: "Массовое добавление внешних ссылок",
    bulkAddHint:
      "Для сайтов, которые нельзя автоматически сканировать (например, Maxroll) — просмотри сайт сам, затем вставь сюда по одному билду на строку: название | url | игра (poe1/poe2) | класс | тип билда | лига | заметка. Обязательны только название, url и игра, остальное можно оставить пустым между разделителями. Строки публикуются сразу, без очереди модерации.",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Танк, хороший клир и боссинг",
    bulkAddSourceLabel: "Сайт-источник",
    bulkAddSubmit: "Загрузить",
    bulkAddRunning: "Загрузка...",
    bulkAddResultsTitle: "Результаты",
    bulkAddSuccess: "добавлено",
    bulkAddError: "ошибка",
  },
  submit: {
    title: "Добавить билд",
    subtitle:
      "Вставь ссылку на свой билд (экспорт PoB, видео на YouTube, пост на Reddit, собственный гайд). Форма анонимная — контакт ниже необязателен. Билд появится публично только после ручного одобрения.",
    success: "Спасибо! Билд отправлен и ожидает одобрения.",
    rateLimited:
      "С этого адреса отправлено слишком много билдов, попробуй позже.",
    genericError: "Что-то пошло не так, попробуй ещё раз.",
    connectionError: "Не удалось подключиться к серверу.",
    titleLabel: "Название билда",
    linkLabel: "Ссылка (PoB, YouTube, Reddit, гайд...)",
    gameLabel: "Игра",
    classLabel: "Класс",
    ascendancyLabel: "Асцендант",
    mainSkillLabel: "Основной навык",
    leaguePatchLabel: "Лига / патч",
    leaguePatchPlaceholder: "напр. 3.29",
    tagsLabel: "Теги (через запятую)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Ссылка на экспорт PoB (необязательно)",
    pobCodeLabel: "Код экспорта PoB (необязательно, для автостатистики)",
    pobCodePlaceholder:
      "Вставь код из Path of Building → Export Build → Generate & copy code…",
    pobCodeHint:
      "Не вставляй сюда ссылку — только сам скопированный код. Он используется для автозаполнения класса/асценданта/основного навыка и DPS/Life/EHP, если указан.",
    authorLabel: "Автор билда (необязательно)",
    contactLabel: "Твой контакт (необязательно, только для возможных вопросов)",
    honeypotLabel: "Оставь пустым",
    submitButton: "Отправить на одобрение",
    submitting: "Отправка...",
  },
  buildCard: {
    addFavorite: "Добавить в избранное",
    removeFavorite: "Убрать из избранного",
    reportPrompt: "Почему ты жалуешься на этот билд? (необязательно)",
    reported: "Отправлено",
    report: "Пожаловаться",
  },
};

const de: Dictionary = {
  common: { loading: "Lade..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Meta-Übersicht",
    submit: "Build einreichen",
    admin: "Admin",
    favorites: "Favoriten",
    campaignGuide: "Kampagnenführer",
    login: "Anmelden",
    logout: "Abmelden",
  },
  footer: {
    disclaimer:
      "Diese Seite steht in keiner Verbindung zu Grinding Gear Games und wird nicht von ihnen unterstützt.",
  },
  cookieConsent: {
    message:
      "Wir verwenden Cookies, um Werbung anzuzeigen. Stimme zu, um personalisierte Werbung zuzulassen, oder lehne ab, um ohne sie weiter zu surfen.",
    accept: "Zustimmen",
    decline: "Ablehnen",
  },
  campaignGuide: {
    title: "PoE1 Kampagnenführer",
    subtitle:
      "Karten mit wichtigen Orten für jeden Akt der Path of Exile 1 Kampagne, mit Links zu vollständigen Guides.",
    watchVideo: "Vollständigen Kampagnen-Walkthrough auf YouTube ansehen",
    town: "Stadt",
    boss: "Akt-Boss",
    fullGuides: "Vollständige Guides",
    enlarge: "Vergrößern",
    close: "Schließen",
    tipsTitle: "Allgemeine Kampagnen-Tipps",
    terminologyTitle: "Begriffe",
    tips: [
      "Verschwende keine Zeit mit normalen Monstern — jage Questzielen nach und halte nur für Gruppen blauer (magischer) Monster an. Seltene (gelbe) Monster sind mit Startausrüstung nicht das Risiko wert, bis du gut in Akt 2 bist.",
      "Plane deinen Build vorher: skizziere einen groben Passiv-Baum in Path of Building und lass ihn in einem zweiten Fenster geöffnet, damit du mitten im Spiel nicht stehen bleibst, um zu überlegen, wo Punkte hingehören.",
      "Bewegung ist König. Kombiniere einen Reise-Skill (Flame Dash, Frostblink) mit einem Bewegungs-Skill (Leap Slam, Shield Charge) und wechsle zwischen zwei Quicksilver Flasks, wann immer du nur zwischen Zielen unterwegs bist.",
      "Lerne die Form jeder Zone durch wiederholtes Spielen — ungefähr zu wissen, wo der Ausgang relativ zum Eingang liegt, spart weit mehr Zeit als jeder einzelne Gegenstand oder Flask.",
      "Prüfe jeden Händler, wenn du durch eine Stadt kommst, nach Stiefeln mit Laufgeschwindigkeit, Ringen mit Leben, Gegenständen mit Resistenzen und passenden Link-Farben — kehre aber nicht ohne echten Grund in eine Stadt zurück.",
      "Hol dir deine Ascendancy, sobald sie verfügbar ist, statt Labyrinth-Läufe aufzusparen, und versuche, das Merciless Labyrinth vor dem Kampf gegen Kitava am Ende von Akt 10 abzuschließen — die Resistenz-Strafe danach erschwert jeden Endgame-Inhalt spürbar.",
      "Ausrüstungspriorität beim Leveln: zuerst Leben und Resistenzen, dann Schaden. Sobald deine Resistenzen das Cap (75 %) erreichen, verschiebt sich die Priorität auf Leben, dann Schaden.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "WP (Waypoint) — ein Schrein, den du einmal pro Zone aktivierst und der Schnellreisen zwischen zwei beliebigen freigeschalteten Wegpunkten erlaubt, statt die ganze Zone erneut zu durchqueren.",
      },
      {
        term: "TP",
        meaning:
          "TP (Teleport/Portal) — die Nutzung einer Portalrolle, des Portal-Skillgems, oder einfach das Verlassen zur Charakterauswahl und erneutes Laden, was dich jeweils zurück in die zuletzt besuchte Stadt bringt.",
      },
    ],
    actSummaries: [
      "Du strandest ohne alles am Twilight Strand und kämpfst dich zu Lioneye's Watch durch, der ersten Stadt. Von dort teilt sich die Küste in Coast und Mud Flats — ein kurzer Abstecher zur Tidal Island lohnt sich für den optionalen Kampf gegen Hailrake, der einen Quicksilver Flask belohnt, sowie eine versteckte Medicine Chest in der Nähe. Der Weg steigt weiter über Ledge und Climb ins Gefängnisviertel, wo Brutus den Ausgang bewacht, bevor es zum Ship Graveyard (mit optionaler Begegnung mit Fairgraves) und schließlich zur Cavern of Anger geht, wo Merveil in ihrer Höhle wartet.",
      "Akt 2 öffnet sich deutlich — der Southern Forest führt zu den Crossroads, einem Knotenpunkt, der Chamber of Sins, Broken Bridge und Fellshrine Ruins verbindet. In diesem Akt befindet sich auch die Banditen-Quest: Du triffst auf Kraityn, Alira und Oak und kannst bei jedem wählen, ob du ihn tötest oder verschonst, für einen dauerhaften Passiv-Bonus oder eine einmalige Belohnung — es lohnt sich, die Prioritäten deines Builds vorher festzulegen. Der Weg führt weiter durch Western Forest und Wetlands in die Vaal Ruins, und der Akt endet am Ancient Pyramid, wo oben der Vaal Oversoul wartet.",
      "Die City of Sarn geht in eine richtige Stadt über, das Sarn Encampment, und von dort erstreckt sich der Akt über Slums, Crematorium und ein Sewers-Netz, das sich selbst zurückschleift — die Aufteilung zu merken lohnt sich, da du hier mehrfach durchkommst. Marketplace und Battlefront führen zu einem Paar gespiegelter Dungeons, dem Solaris- und Lunaris-Tempel, die später in der Kampagne erneut auftauchen. Von den Ebony Barracks steigt die Route durch die Imperial Gardens ins Sceptre of God und endet auf dem Tower Rooftop im Kampf gegen Dominus. Braucht dein Build früh bestimmte Gems, verkauft Siosa in der Library (erreichbar über die Imperial Gardens) für eine einmalige Quest fast die gesamte Gem-Liste.",
      "Highgate ist eine kleine Stadt, aber Akt 4 bietet einige der einprägsamsten Nebenkämpfe der Kampagne: den Dried Lake gegen Voll sowie — erreichbar über Mines und Crystal Veins — zwei komplett optionale Bosskämpfe in Kaom's Dream und Daresso's Dream, beide wegen der einzigartigen Beute lohnenswert, wenn du es nicht eilig hast. Der Hauptweg führt weiter in die Belly of the Beast und durch die Harvest zum Black Core, wo drei benannte Bosse (Shavronne, Maligaro, Doedre) jeweils ein Teil von Malachai fallen lassen, das für den finalen Kampf im Black Heart benötigt wird.",
      "Akt 5 verlegt die Handlung nach Oriath selbst. Von Slave Pens und Control Blocks erreichst du den Oriath Square, die neue Stadt, von wo die Templar Courts zu einem Kampf gegen High Templar Avarius und Innocence im Sanctum of Innocence führen. Das Gebiet Ruined Square verzweigt sich zu Ossuary und Reliquary, beide einen Besuch wegen Questgegenständen wert, bevor du weiter zum Cathedral Rooftop und Cathedral Apex ziehst, wo Kitava zum ersten von mehreren Malen in der Kampagne auftaucht.",
      "Die Kampagne kehrt auf ein verändertes Wraeclast zurück — du besuchst Lioneye's Watch, Coast und Mud Flats aus Akt 1 erneut, aber mit neuen Gebieten, die davon abzweigen: Die Karui Fortress verbirgt einen optionalen Kampf gegen Tukohama, und das Prisoner's Gate führt zu einer zweiteiligen Begegnung mit Abberath. Die Wetlands haben ihren eigenen optionalen Boss (Ryslatha), und der Hauptweg des Akts führt durch Southern Forest und Beacon aufs Meer hinaus, endend am Brine King's Reef, wo Tsoagoth wartet.",
      "Akt 7 besucht die Zonen aus Akt 2 erneut, allerdings düsterer eingefärbt. Crossroads und Fellshrine Ruins führen in die Crypt, wo ein Karten-Gegenstand einen optionalen Neben-Dungeon öffnet, Maligaro's Sanctum. Von Den und Ashen Fields verbirgt das Dread Thicket einen weiteren optionalen Kampf gegen Gruthkul, während der Causeway eine Schatulle versteckt, die sich zu holen lohnt, bevor es zur Vaal City und hinab durch den zweistufigen Temple of Decay geht, wo Arakaali am Grund lauert.",
      "Ein überflutetes, wieder aufgebautes Sarn bildet den Rahmen für Akt 8. Toxic Conduits und Doedre's Cesspool (mit optionalem Kampf gegen Doedre) führen zur Grand Promenade und zum Bath House, von wo sich der Weg Richtung Lunaris- und Solaris-Tempel teilt — jeder verbirgt einen der beiden Harbinger-Bosse, deren Orbs du brauchst. Unterwegs bieten Quay und Grain Gate ein paar Nebenziele, die sich zu holen lohnen, und der Akt endet an der Harbour Bridge, wo die Aktivierung der Statue of the Sisters einen gemeinsamen Kampf gegen Lunaris und Solaris auslöst.",
      "Akt 9 tauscht Wälder gegen Wüste. Vom Descent in Highgate steigst du in die Vastiri Desert hinab, wo sich eine optionale Truhe und eine Nebenquest mit Bottled Storm lohnen, bevor du die Oasis erreichst, die Heimat von Shakari. Die Foothills verzweigen sich zum Boiling Lake für einen optionalen Kampf gegen den Basilisken, während Tunnel und Quarry zum Shrine of the Winds und zur Refinery führen, jeweils mit eigenem Nebenboss. Die Hauptlinie des Akts endet in der Belly of the Beast und im Rotting Core, wo du erneut auf Doedre, Maligaro und Shavronne triffst, bevor es zur Depraved Trinity selbst kommt.",
      "Der letzte Akt bringt dich ein letztes Mal zurück nach Oriath. Von Cathedral Rooftop und Ravaged Square führt ein Abstecher ins Sanctum of Innocence zu einem Kampf gegen Avarius, Reassembled, während die Control Blocks eine optionale Begegnung mit Vilenta verbergen. Canals und Feeding Trough führen zum Altar of Hunger für den letzten Kampf gegen Kitava — beachte, dass danach eine dauerhafte Resistenz-Strafe bleibt, weshalb viele Spieler zunächst etwas leveln und das Merciless Labyrinth in Betracht ziehen, bevor sie sich dem Kampf stellen.",
    ],
  },
  home: {
    title: "Builds suchen",
    subtitle:
      "Eine Meta-Suchmaschine für Path of Exile 1 und 2 Builds, aus Reddit, YouTube, Foren und der Community.",
    searchPlaceholder: "Titel und Beschreibung durchsuchen...",
    classPlaceholder: "Klasse",
    ascendancyPlaceholder: "Aszendenz",
    creatorPlaceholder: "Content Creator (z. B. Zizaran)",
    mainSkillPlaceholder: "Hauptfähigkeit",
    leaguePlaceholder: "Liga / Patch",
    tagsPlaceholder: "Tags (kommagetrennt)",
    searchButton: "Suchen",
    resetButton: "Filter zurücksetzen",
    saveFilterButton: "Filter speichern",
    saveFilterPrompt: "Name für den gespeicherten Filter:",
    saveFilterSuccess: "Filter gespeichert — zu finden auf der Konto-Seite.",
    saveFilterError: "Filter konnte nicht gespeichert werden.",
    loadError: "Builds konnten nicht geladen werden.",
    loading: "Lade...",
    noResults: "Keine Builds entsprechen den Filtern. Lockere sie, oder",
    addYourOwn: "füge deinen eigenen hinzu",
    notFoundHint: "Nicht gefunden, wonach du suchst? Versuch es auch bei",
    prev: "Zurück",
    next: "Weiter",
    pageInfo: "Seite {page} von {totalPages} ({total} Builds)",
  },
  news: {
    title: "PoE-News",
    subtitle:
      "Die neuesten offiziellen Ankündigungen zu Path of Exile und Path of Exile 2.",
    viewAll: "Alle News anzeigen",
    source: "Offizielle News",
    loading: "News werden geladen...",
    error: "News konnten nicht geladen werden.",
  },
  games: {
    all: "Alle Spiele",
    poe1: "Path of Exile 1",
    poe2: "Path of Exile 2",
  },
  sources: {
    all: "Alle Quellen",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "PoE-Forum",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Community",
  },
  sorts: {
    date: "Neueste",
    popularity: "Beliebteste",
    relevance: "Relevanz (benötigt Suchtext)",
  },
  meta: {
    title: "Meta-Übersicht",
    subtitle: "Die beliebtesten genehmigten Builds nach Liga/Patch.",
    noLeague: "Keine Liga verfügbar",
    loading: "Lade...",
    noBuilds: "Für diese Liga gibt es noch keine Builds.",
  },
  favorites: {
    title: "Meine Lieblings-Builds",
    loading: "Lade...",
    loginPrompt: "Um Lieblings-Builds zu sehen, bitte",
    loginLink: "anmelden",
    empty: "Noch nichts hier —",
    findBuild: "finde einen Build",
  },
  account: {
    loginTitle: "Anmeldung",
    registerTitle: "Registrierung",
    authHint:
      "Ein Konto wird für Favoriten und gespeicherte Filter benötigt. Es gibt keinen E-Mail-Dienst — ein vergessenes Passwort kann derzeit nicht wiederhergestellt werden, nur ein neues Konto erstellt.",
    email: "E-Mail",
    password: "Passwort",
    loginButton: "Anmelden",
    registerButton: "Registrieren",
    switchToRegister: "Kein Konto? Registrieren",
    switchToLogin: "Schon ein Konto? Anmelden",
    genericError: "Etwas ist schiefgelaufen.",
    accountTitle: "Konto",
    logout: "Abmelden",
    myFavorites: "Meine Lieblings-Builds →",
    savedFilters: "Gespeicherte Filter",
    loading: "Lade...",
    noFilters:
      "Noch nichts hier — speichere einen Filter auf der Startseite mit „Filter speichern“.",
    newMatches: "neu",
    markSeen: "Als gesehen markieren",
    delete: "Löschen",
  },
  admin: {
    loginTitle: "Admin-Anmeldung",
    invalidCreds: "Ungültige Anmeldedaten.",
    username: "Benutzer",
    password: "Passwort",
    loginButton: "Anmelden",
    queueTitle: "Builds, die auf Genehmigung warten",
    logout: "Abmelden",
    loading: "Lade...",
    listError: "Die Moderationswarteschlange konnte nicht geladen werden.",
    emptyQueue: "Die Warteschlange ist leer.",
    tags: "Tags",
    author: "Autor",
    contact: "Kontakt",
    pob: "PoB",
    approve: "Genehmigen",
    reject: "Ablehnen",
    rejectPrompt: "Notiz zur Ablehnung (optional):",
    actionFailed: "Aktion fehlgeschlagen.",
    reportsTitle: "Gemeldete Inhalte",
    noReports: "Keine offenen Meldungen.",
    reason: "Grund",
    removeBuild: "Build entfernen",
    dismissReport: "Meldung verwerfen",
    bulkAddTitle: "Externe Links im Sammelimport hinzufügen",
    bulkAddHint:
      "Für Seiten, die nicht automatisch gecrawlt werden dürfen (z. B. Maxroll) — durchsuche die Seite selbst und füge hier pro Zeile einen Build ein: Titel | URL | Spiel (poe1/poe2) | Klasse | Build-Typ | Liga | Notiz. Nur Titel, URL und Spiel sind Pflicht, den Rest kannst du zwischen den Strichen leer lassen. Zeilen werden sofort veröffentlicht (keine Moderationswarteschlange).",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Robust, guter Clear und Bossing",
    bulkAddSourceLabel: "Quellseite",
    bulkAddSubmit: "Hochladen",
    bulkAddRunning: "Lädt hoch...",
    bulkAddResultsTitle: "Ergebnisse",
    bulkAddSuccess: "hinzugefügt",
    bulkAddError: "fehlgeschlagen",
  },
  submit: {
    title: "Build einreichen",
    subtitle:
      "Füge einen Link zu deinem Build ein (PoB-Export, YouTube-Video, Reddit-Post, eigener Guide). Das Formular ist anonym — der Kontakt unten ist optional. Der Build erscheint erst nach manueller Genehmigung öffentlich.",
    success: "Danke! Der Build wurde eingereicht und wartet auf Genehmigung.",
    rateLimited:
      "Von dieser Adresse wurden zu viele Builds eingereicht, bitte versuche es später erneut.",
    genericError: "Etwas ist schiefgelaufen, bitte versuche es erneut.",
    connectionError: "Verbindung zum Server fehlgeschlagen.",
    titleLabel: "Build-Titel",
    linkLabel: "Link (PoB, YouTube, Reddit, Guide...)",
    gameLabel: "Spiel",
    classLabel: "Klasse",
    ascendancyLabel: "Aszendenz",
    mainSkillLabel: "Hauptfähigkeit",
    leaguePatchLabel: "Liga / Patch",
    leaguePatchPlaceholder: "z. B. 3.29",
    tagsLabel: "Tags (kommagetrennt)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Link zum PoB-Export (optional)",
    pobCodeLabel: "PoB-Export-Code (optional, für automatische Statistiken)",
    pobCodePlaceholder:
      "Code aus Path of Building → Export Build → Generate & copy code einfügen…",
    pobCodeHint:
      "Füge hier keinen Link ein — nur den kopierten Code selbst. Er wird verwendet, um Klasse/Aszendenz/Hauptfähigkeit sowie DPS/Life/EHP automatisch auszufüllen, falls angegeben.",
    authorLabel: "Build-Autor (optional)",
    contactLabel: "Dein Kontakt (optional, nur für eventuelle Rückfragen)",
    honeypotLabel: "Leer lassen",
    submitButton: "Zur Genehmigung einreichen",
    submitting: "Wird gesendet...",
  },
  buildCard: {
    addFavorite: "Zu Favoriten hinzufügen",
    removeFavorite: "Aus Favoriten entfernen",
    reportPrompt: "Warum meldest du diesen Build? (optional)",
    reported: "Gemeldet",
    report: "Melden",
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, cs, pl, ru, de };
