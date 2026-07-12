// Manually curated list of official Path of Exile / Path of Exile 2 announcements.
// We do NOT scrape or copy full article text/images from pathofexile.com here —
// only title, date and a link back to the original forum post, per project rules
// in CLAUDE.md (no copying of copyrighted content, only metadata + link).
//
// Update this list by hand whenever there's a notable official announcement.
// Source for all entries: https://www.pathofexile.com/news/archive

export interface PoeNewsItem {
  title: string;
  date: string; // ISO date
  url: string;
}

export const POE_NEWS: PoeNewsItem[] = [
  {
    title: "New Transfigured Skills in Path of Exile: Curse of the Allflame",
    date: "2026-07-06",
    url: "https://www.pathofexile.com/forum/view-thread/3982460",
  },
  {
    title: "The Return of the Ancients Launch New Twitch Drops",
    date: "2026-05-25",
    url: "https://www.pathofexile.com/forum/view-thread/3933346",
  },
  {
    title: "Content Update 0.5.0 — Path of Exile 2: Return of the Ancients",
    date: "2026-05-21",
    url: "https://www.pathofexile.com/forum/view-thread/3932540",
  },
  {
    title: "More Exilecon Tickets Are Now Available!",
    date: "2026-05-17",
    url: "https://www.pathofexile.com/forum/view-thread/3932019",
  },
  {
    title: "Path of Exile 2: Return of the Ancients FAQ",
    date: "2026-05-10",
    url: "https://www.pathofexile.com/forum/view-thread/3931070",
  },
];
