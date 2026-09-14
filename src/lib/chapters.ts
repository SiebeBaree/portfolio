import type { StaticImageData } from "next/image";
import aquasolutionsCoinz from "@/assets/work/aquasolutions-coinz.webp";
import aquasolutionsSite from "@/assets/work/aquasolutions-site.webp";
import coinzWebsite from "@/assets/work/coinz-website.webp";
import eeveeChargeMap from "@/assets/work/eevee-charge-map.webp";
import eeveePlatform from "@/assets/work/eevee-platform.webp";
import { COINZ_STATS, ENKRYPTIFY_FUNDING, type Project } from "@/lib/projects";
import enkryptifySecrets from "../../public/apps/enkryptify-secrets.webp";

export type ChapterBlock =
  | { kind: "text"; body: string }
  | { kind: "image"; image: StaticImageData; alt: string; caption: string };

export type Chapter = {
  tagline: string;
  description: string;
  facts: string[];
  links?: { label: string; href: string }[];
  story: ChapterBlock[];
};

/** Every public project has a complete story. Routes and content stay in sync. */
export const CHAPTERS = {
  enkryptify: {
    tagline: "The secrets management company I founded.",
    description: `Enkryptify was the secrets management company I founded. We raised ${ENKRYPTIFY_FUNDING} in VC funding and had paying customers. Founded in 2024, now closed.`,
    facts: [
      `${ENKRYPTIFY_FUNDING} VC funding`,
      "Paying customers",
      "Secrets management",
      "Closed",
    ],

    story: [
      {
        kind: "text",
        body: "Software teams need API keys and credentials everywhere their code runs. Too often, those secrets end up in Slack messages, shared documents or .env files on somebody's laptop. I founded Enkryptify to give teams one place to manage them.",
      },
      {
        kind: "text",
        body: `We raised ${ENKRYPTIFY_FUNDING} from VCs and had paying customers.`,
      },
      {
        kind: "image",
        image: enkryptifySecrets,
        alt: "The Enkryptify dashboard showing secrets across production, development, CI and local environments",
        caption: "The Enkryptify secrets dashboard.",
      },
      {
        kind: "text",
        body: "We built the product to keep secrets in one place and sync them to the environments where code ran. Teams could rotate credentials automatically and lock them down when one leaked.",
      },
      {
        kind: "text",
        body: "I left my engineering role at EEVEE Mobility to focus on Enkryptify. Having built products on my own and worked inside another team, I wanted to put that experience into a company of my own.",
      },
    ],
  },

  coinz: {
    tagline: "An entire economy inside Discord.",
    description: `I built Coinz into a Discord economy game with ${COINZ_STATS.users} users and ${COINZ_STATS.peakDailyActive} daily active users at its peak.`,
    facts: [
      `${COINZ_STATS.users} users`,
      `${COINZ_STATS.peakDailyActive} peak daily active`,
      "2022 to 2025",
    ],
    links: [
      { label: "View the code", href: "https://github.com/SiebeBaree/Coinz" },
    ],
    story: [
      {
        kind: "text",
        body: "Coinz started with an announcement on the AquaSolutions website in December 2021. I promised an economy bot with 15 minigames and a stock market. Over the next three years, I built it into a game with 1.35 million users and 16,000 daily active users at its peak.",
      },
      {
        kind: "image",
        image: aquasolutionsCoinz,
        alt: "The AquaSolutions website announcing Coinz in December 2021",
        caption: "The Coinz announcement on AquaSolutions, December 2021.",
      },
      {
        kind: "text",
        body: "Players could run businesses, hire other players, farm, trade stocks and cryptocurrencies or play games together. There were more than 15 minigames, including blackjack and poker. All of it lived inside the Discord servers where people already spent their time.",
      },
      {
        kind: "text",
        body: "I built the first version in Python, moved to JavaScript and eventually rewrote it in TypeScript. As the game grew, I split the workload across servers and kept improving the infrastructure. I handled the game, the systems behind it and the work of getting it in front of more people.",
      },
      {
        kind: "image",
        image: coinzWebsite,
        alt: "An earlier Coinz website showing 850K users",
        caption:
          "The website at 850K users. Coinz eventually reached 1.35 million.",
      },
      {
        kind: "text",
        body: "At its peak, 16,000 people were active in a single day. Even after I stepped back from development, Coinz kept running and grew from 700,000 to 1.35 million users over the following year.",
      },
      {
        kind: "text",
        body: "In early 2025, I closed Coinz to focus on Enkryptify. I'm still proud of what I built and the number of people who spent time playing it. Three years is a long time to work on one game, and I loved seeing how far I could take it.",
      },
    ],
  },

  "eevee-mobility": {
    tagline: "My one job working for someone else.",
    description:
      "A year as the front-end engineer of EEVEE Mobility's business platform, ending in a three month rewrite from 100,000 lines of Vue to 45,000 lines of Next.js.",
    facts: ["First job", "Front-end", "Vue to Next.js"],
    story: [
      {
        kind: "text",
        body: "EEVEE Mobility is the only chapter where I worked for someone else. I joined straight after graduating, and my job was the front-end of their business platform. EEVEE lets companies manage their electric fleets: assign charge passes to drivers, connect the cars and see exactly what was charged and where. It handles home charging reimbursement, charging abroad and the charging policies a company sets for its drivers, and there is a mobile app where drivers see their own charging. The business platform was mine.",
      },
      {
        kind: "text",
        body: "The platform was built in Vue with TypeScript and a little JavaScript still in the mix, and a lot of developers had passed through it over the years. When I joined there was nobody left who could teach me how the codebase worked, so I figured it out on my own. I spent my first months improving code quality wherever I touched it, and that taught me something uncomfortable: when that many people have worked on a codebase for that many years, the small issues run so deep that polishing them away one by one barely moves the needle.",
      },
      {
        kind: "text",
        body: "So I made the case for a rewrite, and I got the green light with one condition: three months to rewrite 100,000 lines of code while everything kept working. I rewrote it in Next.js, the framework I knew best, and finished in a little under three months. The platform came out at 45,000 lines and did everything the old 100,000 did.",
      },
      {
        kind: "image",
        image: eeveePlatform,
        alt: "A laptop showing the EEVEE business platform with a table of driver charging costs and a cost overview panel, next to a phone showing the driver app with a Tesla at 90 percent",
        caption: "The business platform, with the driver app beside it.",
      },
      {
        kind: "text",
        body: "The platform was not the only thing I shipped. I also built EEVEE's charging map as a separate website of its own.",
      },
      {
        kind: "image",
        image: eeveeChargeMap,
        alt: "The EEVEE charging map over Antwerp, covered in pink pins marking charge points",
        caption:
          "The charging map, a separate site I built alongside the platform.",
      },
      {
        kind: "text",
        body: "After a year I left, not because anything was wrong but because Enkryptify needed all of me. EEVEE is where I learned how to work in a team and what project management looks like in practice, and I am genuinely grateful for the opportunity they gave me and the fun we had along the way.",
      },
    ],
  },

  aquasolutions: {
    tagline: "A discord bot company.",
    description:
      "My teenage bot company: Discord bots built and hosted for a fee, a team of five and one big plan called Coinz.",
    facts: ["Bot company", "Team of five"],
    links: [
      {
        label: "See it archived",
        href: "https://web.archive.org/web/20211205095838/https://aqua-solutions.xyz/",
      },
    ],
    story: [
      {
        kind: "text",
        body: "Aqua Solutions was my bot company. People could rent hosting for a bot they already had, or pay me to build them one and keep it running. It was the first time my programming made real money, and at that age every payout felt enormous.",
      },
      {
        kind: "text",
        body: "It did not stay a one-man thing either. By late 2021 the site listed a team of five, with me as C.E.O., and promised 99.9% uptime across all shards. We took ourselves completely seriously, which is exactly how it should be.",
      },
      {
        kind: "image",
        image: aquasolutionsSite,
        alt: "The Aqua Solutions homepage in late 2021, a blue gradient with the company name",
        caption: "The site in late 2021, straight from the Wayback Machine.",
      },
      {
        kind: "text",
        body: "By then the page had narrowed to one focus. It said we make one bot so we can give it 100% of our time, and that bot was called Coinz, marked coming soon. Aqua Solutions is the chapter where the hosting kid started announcing products.",
      },
    ],
  },

  bothosted: {
    tagline: "My first servers, everyone else's bots.",
    description:
      "A small hosting service: one VPS, resold as homes for other people's Discord bots and Minecraft servers.",
    facts: ["Hosting", "25 customers"],
    story: [
      {
        kind: "text",
        body: "Before I could really code I was already running servers. BotHosted was simple arbitrage: I bought a VPS from a very cheap provider, split it up and rented the slices out as homes for other people's Discord bots and Minecraft servers.",
      },
      {
        kind: "text",
        body: "Around 25 customers trusted their projects to a teenager's server, it made me a little money and it handed me an education in Linux, uptime and what happens at 11pm when someone's bot goes down. Years later, when Coinz needed real infrastructure, I had already been the infrastructure guy.",
      },
    ],
  },

  maxerg: {
    tagline: "Where all of it started.",
    description:
      "The Minecraft server and community I owned at twelve: 200 members, my first servers and the reason I code.",
    facts: ["Minecraft server", "200+ members"],
    story: [
      {
        kind: "text",
        body: "MaxerG was the first thing I ever led. I was twelve, maybe thirteen, the owner of a Minecraft server and the community around it. I had never seen a line of code, never touched Linux, and suddenly I was the person responsible for keeping a world online for other people.",
      },
      {
        kind: "text",
        body: "It grew past 200 members, with 15 to 20 people playing at the same time on a busy day. I learned how servers work and how communities hold together. And when I finally learned to code in 2020, bored at home, the first things I built were for this community: a simple Discord bot, plus one attempt at a Minecraft plugin that mostly taught me how much I hated Java.",
      },
      {
        kind: "text",
        body: "The server made some money. Far more importantly it made friends I still have today. MaxerG will always have a special place in my heart, because every other chapter on this page exists thanks to it.",
      },
    ],
  },

  bookmarks: {
    tagline: "My first product had a unit cost of two hours.",
    description:
      "Handmade paper bookmarks, sold at school for whatever people would give. My first product, at nine years old.",
    facts: ["Handmade", "Sold for €0.20"],
    story: [
      {
        kind: "text",
        body: "I was nine, bored at home, and started making bookmarks for myself: layers of paper glued together so they were sturdy, with a design on the front so they were not boring white. I took one to school, people liked it, and suddenly I had demand.",
      },
      {
        kind: "text",
        body: "So I made more. Each one took about two hours of work, and I sold them for whatever people offered. Twenty cents, fifty, on a great day a full euro. Most of the time I was too generous and gave them away for free. The margins were catastrophic and the customers were delighted.",
      },
      {
        kind: "text",
        body: "I did not have the word for it back then, but that was my first product: make something, watch someone want it, hand it over. Everything since has been the same loop with better margins.",
      },
    ],
  },
} satisfies Record<Project["slug"], Chapter>;

export function getChapter(slug: Project["slug"]): Chapter {
  return CHAPTERS[slug];
}
