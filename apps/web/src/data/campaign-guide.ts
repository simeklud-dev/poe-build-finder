// Act metadata (image, town/boss names, source links) — not translated, since
// these are proper nouns/URLs. The descriptive text (act summaries, general
// tips, terminology) lives in i18n/translations.ts (campaignGuide.actSummaries
// / .tips / .terminology) so it can be localized like the rest of the site.
// Original writing throughout — we do NOT copy guide text from PoE Wiki /
// Maxroll / Mobalytics / PoE Vault, only link back to them, per the
// no-scraping/no-copying rule in CLAUDE.md.
// Screenshots (act landmark maps) were supplied by the site owner.

export interface CampaignAct {
  act: number;
  image: string;
  town: string;
  boss: string;
  links: { label: string; url: string }[];
}

export const CAMPAIGN_ACTS: CampaignAct[] = [
  {
    act: 1,
    image: "/images/campaign/a1.webp",
    town: "Lioneye's Watch",
    boss: "Merveil, the Siren",
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
    boss: "The Depraved Trinity",
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
    links: [
      { label: "PoE Wiki", url: "https://www.poewiki.net/wiki/Act_10" },
      { label: "Mobalytics", url: "https://mobalytics.gg/poe/guides/campaign-act-10" },
      { label: "PoE Vault", url: "https://www.poe-vault.com/guides/quick-reference-leveling-guide-act-10" },
    ],
  },
];

// Labels are translated per-locale (see i18n/translations.ts, campaignGuide.videos);
// only the key + URL live here.
export const CAMPAIGN_VIDEOS: { key: "secrets" | "walkthroughPart1" | "walkthroughPart2"; url: string }[] = [
  { key: "secrets", url: "https://www.youtube.com/watch?v=zFSthWZFtTc" },
  { key: "walkthroughPart1", url: "https://www.youtube.com/watch?v=kFB6Je37RhE&t=35s" },
  { key: "walkthroughPart2", url: "https://www.youtube.com/watch?v=YY8bp8vJoK8" },
];
