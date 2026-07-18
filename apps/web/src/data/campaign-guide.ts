// Original short summaries written by us — we do NOT copy guide text from
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

export const CAMPAIGN_ACTS: CampaignAct[] = [
  {
    act: 1,
    image: "/images/campaign/a1.webp",
    town: "Lioneye's Watch",
    boss: "Merveil, the Siren",
    summary:
      "You wash up on the Twilight Strand and fight through the Coast, Mud Flats and the Prison zones before diving into the Caverns to face Merveil.",
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
      "The road runs through the Southern Forest and Chamber of Sins to the Vaal Ruins, ending at the Ancient Pyramid where the Vaal Oversoul waits.",
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
      "Sarn's Sewers, Marketplace and the twin Solaris/Lunaris Temples lead up through the Imperial Gardens to the Sceptre of God and Dominus.",
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
      "From the Dried Lake down through the Mines and Crystal Veins into the Belly of the Beast, where Malachai's nightmare awaits.",
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
      "The Slave Pens and Control Blocks give way to Oriath itself — Templar Courts and the Cathedral Rooftop, where Kitava first strikes.",
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
      "Back on a changed Wraeclast, the Karui Fortress and Riverways lead to the Brine King's Reef and a rematch on the exile's own terms.",
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
      "Fellshrine Ruins and the Vaal City on the way to the Temple of Decay, where Arakaali spins her webs in the dark.",
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
      "A flooded Sarn — Toxic Conduits, the Grand Promenade and Bath House — ends with a double act boss at the rebuilt Solaris/Lunaris Temples.",
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
      "Across the Vastiri Desert and the Foothills down into the Rotting Core, home to Shakari and her venomous brood.",
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
      "The last march through the Ossuary and Reliquary back to Oriath Square and the Cathedral Rooftop for the final reckoning with Kitava.",
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_10" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-10" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-10" },
    ],
  },
];

export const CAMPAIGN_WALKTHROUGH_VIDEO = "https://www.youtube.com/watch?v=zFSthWZFtTc";
