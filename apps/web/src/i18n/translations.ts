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
    login: string;
    logout: string;
  };
  footer: {
    disclaimer: string;
  };
  home: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    classPlaceholder: string;
    ascendancyPlaceholder: string;
    mainSkillPlaceholder: string;
    leaguePlaceholder: string;
    tagsPlaceholder: string;
    searchButton: string;
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
    login: "Sign in",
    logout: "Sign out",
  },
  footer: {
    disclaimer:
      "This site is not affiliated with or endorsed by Grinding Gear Games.",
  },
  home: {
    title: "Find builds",
    subtitle:
      "A meta search engine for Path of Exile 1 and 2 builds, across Reddit, YouTube, forums and the community.",
    searchPlaceholder: "Search title and description...",
    classPlaceholder: "Class",
    ascendancyPlaceholder: "Ascendancy",
    mainSkillPlaceholder: "Main skill",
    leaguePlaceholder: "League / patch",
    tagsPlaceholder: "Tags (comma separated)",
    searchButton: "Search",
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
    login: "Přihlásit",
    logout: "Odhlásit",
  },
  footer: {
    disclaimer:
      "Tento web není přidružen ke Grinding Gear Games ani jimi podporován.",
  },
  home: {
    title: "Hledat buildy",
    subtitle:
      "Meta-vyhledávač buildů pro Path of Exile 1 a 2 napříč Redditem, YouTube, fóry a komunitou.",
    searchPlaceholder: "Hledat v názvu a popisu...",
    classPlaceholder: "Class",
    ascendancyPlaceholder: "Ascendancy",
    mainSkillPlaceholder: "Hlavní skill",
    leaguePlaceholder: "Liga / patch",
    tagsPlaceholder: "Tagy (odděl čárkou)",
    searchButton: "Hledat",
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
    login: "Zaloguj się",
    logout: "Wyloguj się",
  },
  footer: {
    disclaimer:
      "Ta strona nie jest powiązana z Grinding Gear Games ani przez nich wspierana.",
  },
  home: {
    title: "Szukaj buildów",
    subtitle:
      "Wyszukiwarka meta buildów do Path of Exile 1 i 2 z Reddita, YouTube, forów i społeczności.",
    searchPlaceholder: "Szukaj w tytule i opisie...",
    classPlaceholder: "Klasa",
    ascendancyPlaceholder: "Ascendancja",
    mainSkillPlaceholder: "Główna umiejętność",
    leaguePlaceholder: "Liga / patch",
    tagsPlaceholder: "Tagi (oddziel przecinkiem)",
    searchButton: "Szukaj",
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
    login: "Войти",
    logout: "Выйти",
  },
  footer: {
    disclaimer:
      "Этот сайт не связан с Grinding Gear Games и не поддерживается ими.",
  },
  home: {
    title: "Поиск билдов",
    subtitle:
      "Мета-поисковик билдов для Path of Exile 1 и 2 по Reddit, YouTube, форумам и сообществу.",
    searchPlaceholder: "Поиск по названию и описанию...",
    classPlaceholder: "Класс",
    ascendancyPlaceholder: "Асцендант",
    mainSkillPlaceholder: "Основной навык",
    leaguePlaceholder: "Лига / патч",
    tagsPlaceholder: "Теги (через запятую)",
    searchButton: "Искать",
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
    login: "Anmelden",
    logout: "Abmelden",
  },
  footer: {
    disclaimer:
      "Diese Seite steht in keiner Verbindung zu Grinding Gear Games und wird nicht von ihnen unterstützt.",
  },
  home: {
    title: "Builds suchen",
    subtitle:
      "Eine Meta-Suchmaschine für Path of Exile 1 und 2 Builds, aus Reddit, YouTube, Foren und der Community.",
    searchPlaceholder: "Titel und Beschreibung durchsuchen...",
    classPlaceholder: "Klasse",
    ascendancyPlaceholder: "Aszendenz",
    mainSkillPlaceholder: "Hauptfähigkeit",
    leaguePlaceholder: "Liga / Patch",
    tagsPlaceholder: "Tags (kommagetrennt)",
    searchButton: "Suchen",
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
