import type { TabModel } from "@/components/twig-ui/types";

// Invented, neutral, plausible tabs. No real people, no real accounts.
export type DemoPage = { kicker: string; title: string; lede: string; body: string[] };

export type DemoTab = Omit<TabModel, "state"> & { path: string; page: DemoPage };

const M = {
  moss: { bg: "rgba(75,107,58,.16)", fg: "#4b6b3a" },
  ocean: { bg: "rgba(43,110,122,.16)", fg: "#2b6e7a" },
  clay: { bg: "rgba(168,92,50,.16)", fg: "#a85c32" },
  plum: { bg: "rgba(107,74,130,.16)", fg: "#6b4a82" },
  honey: { bg: "rgba(166,124,29,.18)", fg: "#8a6714" },
  slate: { bg: "rgba(82,86,76,.16)", fg: "#52564c" },
};

export const DEMO_TABS: DemoTab[] = [
  {
    id: "t1",
    title: "Tide tables, explained",
    host: "coastalnotes.example",
    path: "/tides/how-to-read",
    mark: M.ocean,
    page: {
      kicker: "Coastal Notes",
      title: "How to read a tide table",
      lede: "Two highs and two lows a day, give or take. The table tells you when, and how far the water will reach.",
      body: ["Spring tides arrive near the new and full moon, when the sun and moon pull together.", "Neap tides fall between them: smaller ranges, gentler currents."],
    },
  },
  {
    id: "t2",
    title: "Sourdough starter, day 4",
    host: "breadcraft.example",
    path: "/starter/day-4",
    mark: M.honey,
    page: {
      kicker: "Breadcraft",
      title: "Day four: the starter wakes up",
      lede: "By now it should double within six hours of a feed. If it doesn't, keep it somewhere warmer.",
      body: ["Feed equal weights of flour and water, and discard half before each feed.", "A ripe starter smells sweet and a little sharp, like yoghurt."],
    },
  },
  {
    id: "t3",
    title: "Kerning, a field guide",
    host: "typeroom.example",
    path: "/guides/kerning",
    mark: M.plum,
    page: {
      kicker: "Type Room",
      title: "Kerning, a field guide",
      lede: "Space the letters until the word looks even, not until the gaps measure the same.",
      body: ["Round letters need to sit closer than straight ones.", "Check pairs like AV, To and ry at the size you'll use them."],
    },
  },
  {
    id: "t4",
    title: "Fixing a slipping chain",
    host: "spokeandgear.example",
    path: "/repairs/chain-slip",
    mark: M.clay,
    page: {
      kicker: "Spoke & Gear",
      title: "Why your chain slips, and how to stop it",
      lede: "Usually it's a worn chain, a stretched cable or a bent hanger. Check them in that order.",
      body: ["A chain checker costs less than a cassette. Replace the chain at 0.5% wear.", "Turn the barrel adjuster a quarter at a time until shifts land cleanly."],
    },
  },
  {
    id: "t5",
    title: "Night train timetable",
    host: "railtrips.example",
    path: "/night/north-line",
    mark: M.slate,
    page: {
      kicker: "Rail Trips",
      title: "The north line, overnight",
      lede: "Departs 21:40, arrives 07:15. Couchettes sell out first on Fridays.",
      body: ["Change at the border station; the connection waits for the sleeper.", "Bring water. The café car closes at midnight."],
    },
  },
  {
    id: "t6",
    title: "Moss gardens of Kyoto",
    host: "slowtravel.example",
    path: "/kyoto/moss",
    mark: M.moss,
    page: {
      kicker: "Slow Travel",
      title: "A morning in the moss gardens",
      lede: "Over a hundred kinds of moss, raked paths and almost no sound. Go early, before the tours.",
      body: ["Visits are by postcard request, a month ahead.", "Wear soft shoes; the paths are swept every dawn."],
    },
  },
  {
    id: "t7",
    title: "Rust ownership, chapter 4",
    host: "learnsystems.example",
    path: "/book/ownership",
    mark: M.clay,
    page: {
      kicker: "Learn Systems",
      title: "Ownership, borrowing and lifetimes",
      lede: "Each value has one owner. When the owner goes out of scope, the value is dropped.",
      body: ["You can have many shared references or one mutable one, never both.", "The borrow checker enforces this at compile time."],
    },
  },
  {
    id: "t8",
    title: "Museum late opening",
    host: "citymuseum.example",
    path: "/visit/late",
    mark: M.plum,
    page: {
      kicker: "City Museum",
      title: "Thursday late opening",
      lede: "Galleries open until 22:00, with talks in the print room at 19:00 and 20:30.",
      body: ["Entry is free after 18:00.", "The café serves a short menu until 21:30."],
    },
  },
  {
    id: "t9",
    title: "Seed-saving basics",
    host: "allotment.example",
    path: "/seeds/saving",
    mark: M.moss,
    page: {
      kicker: "Allotment",
      title: "Saving seed from your own plants",
      lede: "Start with beans, peas and tomatoes: they mostly breed true.",
      body: ["Let the pods dry on the plant, then shell them on a dry day.", "Store in paper envelopes, labelled and dated."],
    },
  },
];
