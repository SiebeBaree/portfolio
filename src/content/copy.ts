// All words, links, and constants for the site live here.
// The site is a story. This file is its manuscript.
// Style rules: no Oxford commas, no em dashes, plain spoken sentences.

export const DOB_ISO = "2003-07-13T00:00:00+02:00";

// The one place the production domain lives. Used for canonical URLs,
// the sitemap, robots and the absolute OG image URL. Change it here if
// the site ever moves.
export const SITE_URL = "https://siebebaree.com";

export const LINKS = {
  email: "siebe@enkryptify.com",
  github: "https://github.com/SiebeBaree",
  coinzRepo: "https://github.com/SiebeBaree/Coinz",
  linkedin: "https://www.linkedin.com/in/siebe-baree",
  enkryptify: "https://enkryptify.com",
};

export const HERO = {
  eyebrow: "Ghent, Belgium",
  statement:
    "I'm Siebe, co-founder of Enkryptify. I've been building things since I was nine.",
  wordmark: "SIEBE BARÉE",
};

export type Chapter = {
  id: string;
  year: string;
  headline: string;
  paragraphs: string[];
};

export const CHAPTERS: Chapter[] = [
  {
    id: "bookmarks",
    year: "2012",
    headline: "It starts with a bookmark.",
    paragraphs: [
      "The first thing I ever sold was a bookmark. I made them myself when I was nine and sold them to the other kids at school. Or that was the idea, because I ended up giving most of them away for free. You could say I learned philanthropy before I learned sales.",
      "But I liked it. Making something and seeing people actually want it, that feeling never really went away.",
    ],
  },
  {
    id: "minecraft",
    year: "2016",
    headline: "A laptop and one game.",
    paragraphs: [
      "I was a typical iPad kid, but when I turned twelve I got my first laptop. A very basic one that could run exactly one game: Minecraft. A year later just playing wasn't enough anymore, so I decided to host my own server.",
      "That's how I learned about server hosting, configuring plugins and a bit of Java and Linux. I ran a couple of servers over the years and a lot of people played on them. I also lost a lot of money on them, because renting servers is not cheap when you're thirteen. It stayed a hobby, but it taught me more than school ever did.",
    ],
  },
  {
    id: "covid",
    year: "2020",
    headline: "Then COVID happened.",
    paragraphs: [
      "When COVID hit I was sixteen and stuck at home, so I finally started learning how to code. I wanted my own Discord bot and Python seemed like the fastest way to get one.",
      "I liked it so much that I was coding eighty hours a week during my exams. Luckily it was COVID, so half of them got cancelled anyway. That's when I really found my passion for coding.",
    ],
  },
  {
    id: "coinz",
    year: "2022",
    headline: "Seven days.",
    paragraphs: [
      "Two years later I wanted to rebuild my bot in JavaScript, a language I didn't know yet. I learned it in a couple of days and seven days later Coinz was live. Fully working and already published. This was before AI existed, so I learned everything straight from the documentation.",
      "Coinz was an economy that lived inside Discord. You could run a business, farm crops, trade stocks and crypto at real market prices or lose everything at the blackjack table. I built and ran all of it myself for three years: 1,269 commits, nine releases and a premium plan.",
    ],
  },
  {
    id: "inbetween",
    year: "13–21",
    headline: "And everything in between.",
    paragraphs: [
      "Coinz was never the only thing I was working on. Between thirteen and twenty-one I started more projects than I can honestly count. More Minecraft servers, some communities, hosting services, a social media app for the gym, a Discord bot agency, a ticketing system that connected support platforms before Intercom was everywhere and an offline key management tool for software licensing.",
      "Almost none of them reached daylight. All of them together made me maybe a thousand euros. I didn't care about business models back then, I just loved building. But every project taught me something I used in the next one.",
    ],
  },
  {
    id: "eevee",
    year: "2024",
    headline: "Then my first real job.",
    paragraphs: [
      "I went to college, but honestly I barely studied. I had been coding for so long that I graduated top of my class without much studying at all. All those side projects turned out to be the best preparation I could have asked for.",
      "After graduating I became the only frontend engineer at EEVEE, an electric mobility company. A great first job, but I kept running into one problem that annoyed me more than it should have.",
    ],
  },
];

export const COINZ_MOMENT = {
  count: 1_400_000,
  after: "people used Coinz.",
  closing:
    "I archived Coinz in April 2025. Not because it failed, but because the next thing needed all of my time.",
  repoLabel: "The code is still public",
};

export const ENKRYPTIFY = {
  year: "2025",
  headline: "Everything before this was practice.",
  paragraphs: [
    "The problem was managing secrets. API keys, tokens, credentials, all the things your software can't run without. At EEVEE I saw how painful it was to handle them properly, and when I asked friends at other companies they all had the same problem.",
    "So I decided to make a startup out of it. Together with my co-founder I started Enkryptify, and we're building the next infrastructure layer for secrets. It manages and automates your secrets, detects leaks and responds automatically before a human even has to look. And now that AI agents are writing and running code everywhere, that matters more than ever. We work from the Wintercircus, an old circus building in the heart of Ghent.",
  ],
  linkLabel: "enkryptify.com",
};

export const KARTING = {
  kicker: "Most weeks",
  headline: "Not everything is code.",
  body: "Almost every week you'll find me on a kart track. I've been karting for a couple of years now, nothing professional, just something I really enjoy. The rest of my free time goes to friends.",
};

export const EPILOGUE = {
  contactHeading: "Building something too? Say hi.",
  copyHint: "click to copy",
  copiedHint: "copied",
  signoff: "Siebe Barée",
};
