// Original summaries written by us — we do NOT copy guide text from
// PoE Wiki / Maxroll / Mobalytics / PoE Vault, only link back to them, per
// the no-scraping/no-copying rule in CLAUDE.md.
// Screenshots (act landmark maps) were supplied by the site owner.

export interface CampaignAct {
  act: number;
  image: string;
  town: string;
  boss: string;
  summary: string;
  links: { label: string; url: string }[];
}

export const GENERAL_TIPS: string[] = [
  "Don't waste time farming regular monsters — chase quest objectives, and only stop to clear packs of blue (magic) monsters. Rares aren't worth the risk on starting gear until you're well into Act 2.",
  "Decide your build before you start: sketch a rough passive tree in Path of Building and keep it open in a second window so you're not standing around mid-run figuring out where points go.",
  "Movement is king. Pair a travel skill (Flame Dash, Frostblink) with a movement skill (Leap Slam, Shield Charge) and alternate two Quicksilver Flasks whenever you're just running between objectives.",
  "Learn the shape of each zone over repeat playthroughs — knowing roughly where the exit sits relative to your entry point saves far more time than any single item or flask.",
  "Check every vendor when you pass through town for movement-speed boots, life-rolled rings, resistance pieces and useful link colors — but don't backtrack to a town without a real reason to.",
  "Grab your ascendancy as soon as it's available rather than saving Labyrinth runs for later, and try to finish the Merciless Labyrinth before you fight Kitava at the end of Act 10 — the resistance penalty afterward makes any endgame content noticeably harder.",
  "Gear priority while leveling: Life and resistances first, damage second. Once your resistances are capped (75%), shift the priority to Life, then damage.",
];

export const TERMINOLOGY: { term: string; meaning: string }[] = [
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
];

export const CAMPAIGN_ACTS: CampaignAct[] = [
  {
    act: 1,
    image: "/images/campaign/a1.webp",
    town: "Lioneye's Watch",
    boss: "Merveil, the Siren",
    summary:
      "You wash up on the Twilight Strand with nothing and fight your way to Lioneye's Watch, the first town. From there the coastline splits into the Coast and Mud Flats — worth a short detour to the Tidal Island for an optional fight against Hailrake, which rewards a Quicksilver Flask, and a hidden Medicine Chest nearby. The path then climbs through the Ledge and Climb into the Prison district, where Brutus guards the way out, before the Ship Graveyard (home to an optional Fairgraves encounter) and finally the Cavern of Anger, where Merveil waits in her lair.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_1" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-1" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-1" },
    ],
  },
  {
    act: 2,
    image: "/images/campaign/a2.webp",
    town: "Forest Encampment",
    boss: "Vaal Oversoul",
    summary:
      "Act 2 opens up considerably — the Southern Forest leads to the Crossroads, a hub connecting the Chamber of Sins, Broken Bridge and Fellshrine Ruins. This act is where the bandit quest lives: you'll cross paths with Kraityn, Alira and Oak, and can choose to kill or spare each of them for a permanent passive bonus or a one-off reward, so it's worth deciding your build's priorities ahead of time. The road continues through the Western Forest and Wetlands into the Vaal Ruins, and the act closes at the Ancient Pyramid, where the Vaal Oversoul waits at the top.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_2" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-2" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-2" },
    ],
  },
  {
    act: 3,
    image: "/images/campaign/a3.webp",
    town: "Sarn Encampment",
    boss: "Dominus",
    summary:
      "The City of Sarn gives way to a proper town, the Sarn Encampment, and from there the act sprawls through the Slums, Crematorium and a set of Sewers that double back on themselves — worth remembering the layout, since you'll pass through more than once. The Marketplace and Battlefront lead up to a pair of mirrored dungeons, the Solaris and Lunaris Temples, both of which reappear later in the campaign. From the Ebony Barracks the route climbs the Imperial Gardens into the Sceptre of God, ending on the Tower Rooftop against Dominus. If your build needs specific gems early, Siosa in the Library (reachable from the Imperial Gardens) sells almost the full gem list for a one-time quest.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_3" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-3" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-3" },
    ],
  },
  {
    act: 4,
    image: "/images/campaign/a4.webp",
    town: "Highgate",
    boss: "Malachai, the Nightmare",
    summary:
      "Highgate is a small town, but Act 4 packs in some of the campaign's most memorable side-fights: the Dried Lake against Voll, and — reached through the Mines and Crystal Veins — two entirely optional boss encounters in Kaom's Dream and Daresso's Dream, both well worth doing for the unique item rewards if you're not in a rush. The main path continues into the Belly of the Beast and down through the Harvest to the Black Core, where three named bosses (Shavronne, Maligaro, Doedre) each drop a piece of Malachai needed to open the final fight in the Black Heart.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_4" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-4" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-4" },
    ],
  },
  {
    act: 5,
    image: "/images/campaign/a5.webp",
    town: "Overseer's Tower",
    boss: "Kitava, the Insatiable",
    summary:
      "Act 5 moves the story to Oriath itself. From the Slave Pens and Control Blocks you reach Oriath Square, the new town, and from there the Templar Courts lead to a fight against High Templar Avarius and Innocence in the Sanctum of Innocence. The Ruined Square area branches out to the Ossuary and Reliquary, both worth visiting for quest items before you press on to the Cathedral Rooftop and Cathedral Apex, where Kitava makes the first of several appearances in the campaign.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_5" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-5" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-5" },
    ],
  },
  {
    act: 6,
    image: "/images/campaign/a6.webp",
    town: "Lioneye's Watch (revisited)",
    boss: "Tsoagoth, the Brine King",
    summary:
      "The campaign loops back to a changed Wraeclast, revisiting Lioneye's Watch, the Coast and Mud Flats from Act 1, but with new areas branching off them — the Karui Fortress hides an optional Tukohama fight, and the Prisoner's Gate leads to a two-part encounter with Abberath. The Wetlands hold their own optional boss (Ryslatha), and the act's main path runs through the Southern Forest and Beacon out to sea, ending at the Brine King's Reef where Tsoagoth awaits.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_6" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-6" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-6" },
    ],
  },
  {
    act: 7,
    image: "/images/campaign/a7.webp",
    town: "The Bridge Encampment",
    boss: "Arakaali, Spinner of Shadows",
    summary:
      "Act 7 revisits Act 2's zones with a darker palette. The Crossroads and Fellshrine Ruins lead into the Crypt, where a map item opens an optional side dungeon, Maligaro's Sanctum. From the Den and Ashen Fields, the Dread Thicket hides another optional fight against Gruthkul, while the Causeway holds a lockbox worth grabbing before you head to Vaal City and down through the two-level Temple of Decay, where Arakaali lurks at the bottom.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_7" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-7" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-7" },
    ],
  },
  {
    act: 8,
    image: "/images/campaign/a8.webp",
    town: "Sarn Encampment (revisited)",
    boss: "Solaris, Eternal Sun & Lunaris, Eternal Moon",
    summary:
      "A flooded, rebuilt Sarn frames Act 8. The Toxic Conduits and Doedre's Cesspool (with an optional Doedre fight) lead to the Grand Promenade and Bath House, from where the path splits toward the Lunaris and Solaris Temples — each holding one of the two Harbinger bosses whose orbs you need. Along the way the Quay and Grain Gate offer a few side objectives worth grabbing, and the act ends at the Harbour Bridge, where activating the Statue of the Sisters triggers a joint fight against both Lunaris and Solaris.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_8" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-8" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-8" },
    ],
  },
  {
    act: 9,
    image: "/images/campaign/a9.webp",
    town: "The Terrasse",
    boss: "Shakari, Queen of the Sands",
    summary:
      "Act 9 trades forests for desert. From Highgate's Descent you drop into the Vastiri Desert, where an optional chest and a bottled-storm side quest are worth picking up before the Oasis, home to Shakari. The Foothills branch off toward the Boiling Lake for an optional Basilisk fight, while the Tunnel and Quarry lead to the Shrine of the Winds and Refinery, each with their own side boss. The act's main line finishes in the Belly of the Beast and Rotting Core, where you'll face Doedre, Maligaro and Shavronne again before the Depraved Trinity itself.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_9" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-9" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-9" },
    ],
  },
  {
    act: 10,
    image: "/images/campaign/a10.webp",
    town: "The Reckoning",
    boss: "Kitava, the Insatiable (final)",
    summary:
      "The final act brings you back to Oriath one last time. From the Cathedral Rooftop and Ravaged Square, a side trip to the Sanctum of Innocence yields a fight against Avarius, Reassembled, while the Control Blocks hold an optional Vilenta encounter. The Canals and Feeding Trough lead to the Altar of Hunger for the last fight against Kitava — be aware it applies a lasting resistance penalty afterward, so many players level up a little first and consider running the Merciless Labyrinth before committing to the kill.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_10" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-10" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-10" },
    ],
  },
];

export const CAMPAIGN_WALKTHROUGH_VIDEO = "https://www.youtube.com/watch?v=zFSthWZFtTc";
