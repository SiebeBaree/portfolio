/*
 * The written chapters behind /work/<slug>. One entry per finished project;
 * a project missing here still renders its "Coming soon" page, though every
 * project currently has one.
 *
 * Voice rules for every story: first person, specific, no em-dashes and no
 * Oxford commas. Numbers are real. Length follows the story, so Coinz reads
 * long and BigBen reads short.
 */

import type { StaticImageData } from "next/image";
import aquasolutionsCoinz from "@/assets/work/aquasolutions-coinz.webp";
import aquasolutionsSite from "@/assets/work/aquasolutions-site.webp";
import coinzWebsite from "@/assets/work/coinz-website.webp";
import eeveeChargeMap from "@/assets/work/eevee-charge-map.webp";
import eeveePlatform from "@/assets/work/eevee-platform.webp";
import gymlyfeWebsite from "@/assets/work/gymlyfe-website.webp";
import habitflowSite from "@/assets/work/habitflow-site.webp";
import jarvisOverview from "@/assets/work/jarvis-overview.webp";
import jarvisProgress from "@/assets/work/jarvis-progress.webp";
import kartingChase from "@/assets/work/karting-chase.webp";
import kartingTracks from "@/assets/work/karting-tracks.webp";
import siebegptDashboard from "@/assets/work/siebegpt-dashboard.webp";

export type ChapterBlock =
  | { kind: "text"; body: string }
  | { kind: "image"; image: StaticImageData; alt: string; caption: string }
  | { kind: "video"; src: string; caption: string };

export type Chapter = {
  /** the italic line under the title, where "Coming soon" used to sit */
  tagline: string;
  /** meta description for the page */
  description: string;
  /** short pills under the tagline */
  facts: string[];
  /** external links, rendered as glass buttons in the header */
  links?: { label: string; href: string }[];
  story: ChapterBlock[];
};

export const CHAPTERS: Record<string, Chapter> = {
  jarvis: {
    tagline: "Everyone wants a Jarvis. I built mine.",
    description:
      "A personal assistant with exactly one user: a native desktop and mobile app that scores my days and tracks my tasks, habits and health.",
    facts: ["Desktop and mobile app", "Built for one user"],
    story: [
      {
        kind: "text",
        body: "Every other project on this page was built for other people to use. Jarvis is the opposite: a native desktop app and a mobile app with a user base of exactly one, me. It is my personal assistant, and it runs my day.",
      },
      {
        kind: "text",
        body: "The heart of it is my daily score. Every day Jarvis measures three things and gives each one a weight. How many of the tasks I laid out for the day I completed, worth 40 points. How many of the habits due that day I did, worth another 40. And how I feel, worth the last 20. Together that is one number out of 100 for the day.",
      },
      {
        kind: "image",
        image: jarvisOverview,
        alt: "The Jarvis overview showing a 96 percent ring for Monday, with bars for tasks 40 of 40, habits 40 of 40 and feel 16 of 20, above that day's task and habit lists",
        caption:
          "A 96 on a Monday: every task done, every habit done and a 16 out of 20 on how I felt.",
      },
      {
        kind: "text",
        body: "One day on its own means very little. The reason I score them at all is the progress screen, where the days line up beside each other and the shape of a month appears: which week beat the one before it, which part of the score is carrying me and which part is quietly slipping.",
      },
      {
        kind: "image",
        image: jarvisProgress,
        alt: "The Jarvis progress screen with a bar chart of daily scores, a weekly average of 84 that is down 15 from the week before and a breakdown showing tasks at 100 percent, habits at 93 and feel at 75",
        caption:
          "An 84 week, down 15 on the one before it, and the breakdown that explains why.",
      },
      {
        kind: "text",
        body: "Around that score sits everything I used to spread across other apps. A to-do list with deadlines and priorities. A habit system for the things I want to do every day or a few times a week. And one feature that is very personal: progress photos, so I can watch how my body changes over months of showing up at the gym.",
      },
      {
        kind: "text",
        body: "Then there is the health section, which does three things. I create my own workout plans, no AI involved, and track every workout against them, so I can see how closely I follow the plan and where I can push progressive overload. There is a shopping list I fill the moment I know what I need, ready for when I am standing in the store. And because I meal prep a lot, I save every meal prep with exactly what I need to make it again, pictures included.",
      },
      {
        kind: "text",
        body: "Jarvis will never be launched, priced or marketed, and that is the point. When the only user is you, every feature can be exactly right. It is the most honest software I have ever written.",
      },
    ],
  },

  karting: {
    tagline: "Where I stand on every track I've ever raced.",
    description:
      "A web app that pulls Apex Timing data to show where I rank on every karting track I've raced, and who I still have to catch.",
    facts: ["Web app", "Apex Timing data"],
    links: [{ label: "Visit the app", href: "https://karting.baree.be" }],
    story: [
      {
        kind: "text",
        body: "Once a week I trade the gym for a kart and chase lap times. Every track keeps its own all-time leaderboard, and I kept asking the same two questions: where do I stand and how much time do I need to find to move up. Checking that meant digging through a different timing page for every track, so I built the answer instead.",
      },
      {
        kind: "text",
        body: "Karting pulls my results straight from the Apex Timing systems that most tracks run on, so any track I have ever driven fits on one dashboard. One card per track: my position, my best lap and the exact gap to the next name above me.",
      },
      {
        kind: "image",
        image: kartingTracks,
        alt: "The Karting dashboard listing four Belgian tracks, each with a position, a best lap and the gap to the next place",
        caption: "One card per track, one number that matters.",
      },
      {
        kind: "text",
        body: "My favourite part is the chase view. Pick a track and it lays out everyone ahead of me, with a slider that answers the what-if: find two tenths and watch exactly whose names you pass. And when someone knocks me down a place I get an email about it. One per day at most, because some weekends would hurt otherwise.",
      },
      {
        kind: "image",
        image: kartingChase,
        alt: "The chase view for E-Kart Gent showing position 8 of 97,412 and the list of drivers still ahead",
        caption:
          "P8 of 97,412 at E-Kart Gent, with seven names still to catch.",
      },
      {
        kind: "text",
        body: "It was a quick build, but it changed how I drive. I stopped racing the clock and started racing names.",
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

  habitflow: {
    tagline: "Atomic Habits, but on my laptop.",
    description:
      "A habit tracker web app born from Atomic Habits, built in about a week during my internship and sold as a one-time purchase.",
    facts: ["Web app", "Next.js and Postgres", "One-time payments"],
    links: [
      {
        label: "View the code",
        href: "https://github.com/SiebeBaree/HabitFlow",
      },
      {
        label: "See it archived",
        href: "https://web.archive.org/web/20240503171319/https://habitflow.pro/",
      },
    ],
    story: [
      {
        kind: "text",
        body: "During my internship I read Atomic Habits, and the habit tracker in that book stuck with me: a simple grid where every day you show up earns a check. I wanted exactly that on my laptop and could not find an app that did it without turning it into a chore, so I built it myself in about a week.",
      },
      {
        kind: "text",
        body: "HabitFlow was small but it was a real product. Accounts, unlimited habits, monthly goals, history, the whole grid. I priced it the way I wish more tools were priced: pay once, use forever. Nobody needs a subscription for a habit grid. The landing page opened with the pitch I built it on: stop procrastinating, start improving.",
      },
      {
        kind: "image",
        image: habitflowSite,
        alt: "The HabitFlow landing page with the headline Stop procrastinating, start improving, next to the habit grid",
        caption:
          "The landing page in 2024. The grid is the book's tracker, digitalized.",
      },
      {
        kind: "text",
        body: "I built every piece myself that week: auth, payments, the database, the emails. And then I used it daily for months, which is the only metric I really cared about. The site is offline now, but the code is public.",
      },
    ],
  },

  tickr: {
    tagline: "One ticket system for every place a community lives.",
    description:
      "An exploration of a ticketing platform that could follow one community across its website, its Discord and its Minecraft server.",
    facts: ["Product exploration", "Discord, web and Minecraft"],
    story: [
      {
        kind: "text",
        body: "Every gaming community I had run lived in more than one place at once: a Discord server, a website, often a Minecraft server too. When someone needed help, each of those places had its own broken way of asking for it. Tickr was my answer: one ticketing system, something like Intercom but for communities of teenagers who game, where the same ticket could follow you across all of it.",
      },
      {
        kind: "text",
        body: "I designed it around the communities I knew first, with the plan that other communities could plug it in afterwards. Tickr became a lesson in scope: connecting three platforms means three times the surface area, and I learned to weigh that cost before writing code instead of after. The logo still holds up though.",
      },
    ],
  },

  gymlyfe: {
    tagline: "My first mobile app, built to fill the gym with friends.",
    description:
      "A Flutter social app for gym people: local groups, local gyms and friends pushing each other to show up.",
    facts: ["Mobile app", "Flutter"],
    story: [
      {
        kind: "text",
        body: "Four years of showing up at the gym taught me that the hardest part is not the training, it is showing up alone. GymLyfe was my answer and my first mobile app: a social platform where your friends push you further, built around local groups and local gyms. Join your gym, see who trains there, go together.",
      },
      {
        kind: "image",
        image: gymlyfeWebsite,
        alt: "The GymLyfe landing page with the headline Connect with friends and fuel your fitness goals",
        caption: "The landing page, waiting list and all.",
      },
      {
        kind: "text",
        body: "I learned Flutter from zero to build it, then carried it into a school project where we developed it further as a team until it worked end to end. And then we did the hard, boring, correct thing: we looked at whether the market was actually asking for it, and it was not. We let it rest. I kept Flutter, the mobile instincts and a cheap early lesson in testing demand before polishing pixels.",
      },
    ],
  },

  "you-owe-me": {
    tagline: "The trip was great. Settling up was not.",
    description:
      "A mobile app for splitting group expenses, born on a New York trip and ended early by a co-founder split.",
    facts: ["Mobile app"],
    story: [
      {
        kind: "text",
        body: "A trip to New York with friends: everyone pays for everyone, and by the last day nobody knows who owes who what. The apps we found either cost money or buried the free tier under ads and waiting. That annoyed me enough to want to build it properly: a free, clean way to settle up with friends.",
      },
      {
        kind: "text",
        body: "I started it with a co-founder, and before the app really existed we found out we worked badly together. So I made the call early and quit while quitting was still cheap. It is the fastest lesson I have ever collected: who you build with decides more than what you build. I would much rather have learned that on a settle-up app than on something that matters.",
      },
    ],
  },

  coinz: {
    tagline: "The bot that taught me how to code.",
    description:
      "A Discord economy bot that grew to 1.35 million users across three years, six rebuilds and around 100,000 lines of TypeScript.",
    facts: ["Discord bot", "2022 to 2025", "1.35M users", "TypeScript"],
    links: [
      { label: "View the code", href: "https://github.com/SiebeBaree/Coinz" },
      { label: "Visit the site", href: "https://coinzbot.vercel.app" },
    ],
    story: [
      {
        kind: "text",
        body: "Coinz was announced before it existed. In December 2021 my little bot company Aqua Solutions had exactly one focus on its site: an economy bot called Coinz, marked coming soon, promising 15 minigames at release and one day a stock market. I had no idea I was describing the next three years of my life.",
      },
      {
        kind: "image",
        image: aquasolutionsCoinz,
        alt: "The Aqua Solutions website in December 2021 announcing Coinz as coming soon",
        caption:
          "December 2021: Coinz promised before a line of the final bot existed.",
      },
      {
        kind: "text",
        body: "The first version was Python. Then I rebuilt it in JavaScript, because I wanted the language websites are built with, then again and again until it was fully TypeScript. Six rebuilds in total, and every one of them was me pouring everything I had just learned back into the same idea.",
      },
      {
        kind: "text",
        body: "What it became was a full economy simulation inside Discord: over 15 minigames from blackjack to poker to crash, 30 stocks and 40 cryptocurrencies with regularly updated prices, businesses that could employ other players, farming plots, a premium tier. Around 100,000 lines of TypeScript, sharded across servers and running with almost zero errors. I am still proud of how stable that codebase was.",
      },
      {
        kind: "image",
        image: coinzWebsite,
        alt: "The Coinz website calling it the ultimate economy Discord bot, with 850K+ users on the counter",
        caption: "The Coinz site mid-flight, 850K users and climbing.",
      },
      {
        kind: "text",
        body: "Coinz is where I learned everything at once. How to code, first of all. Then how to scale, how infrastructure behaves under real load and my first marketing and sales lessons, because a bot does not reach 700,000 users on its own. At its peak around 10,000 people used it every single day, month after month.",
      },
      {
        kind: "text",
        body: "It also taught me a business lesson the honest way: almost nobody pays for a Discord bot, and a subscription makes them angrier still. Coinz was never going to fund itself, and accepting that early freed me to treat it as what it really was, the best education I could have gotten at that age.",
      },
      {
        kind: "text",
        body: "Eventually I stepped away to focus on new things and let it run. For a full year Coinz took care of itself and grew from 700,000 users to 1.35 million without a single update, which told me more about the engineering than any code review could. But the support requests never stopped, and by early 2025 the choice was between a project that had stopped teaching me and Enkryptify, which had just started to. I shut Coinz down at 1.35 million users.",
      },
      {
        kind: "text",
        body: "Turning it off was hard. It is still the project I am most sentimental about, and everything I have built since stands on top of it.",
      },
    ],
  },

  siebegpt: {
    tagline: "My own ChatGPT, built by hand.",
    description:
      "A ChatGPT-style AI workspace with chat, image, video, music and code generation, built when ChatGPT was brand new.",
    facts: ["Web app", "OpenAI API", "Next.js"],
    links: [
      {
        label: "View the code",
        href: "https://github.com/SiebeBaree/SiebeGPT",
      },
    ],
    story: [
      {
        kind: "text",
        body: "When ChatGPT arrived I did not just want to use it, I wanted to know what building on top of these models felt like. So I built my own: SiebeGPT. And not just chat. Conversation, image generation, video, music and code generation, each in its own room of one dashboard.",
      },
      {
        kind: "image",
        image: siebegptDashboard,
        alt: "The SiebeGPT dashboard offering conversation, image, video, music and code generation",
        caption: "Five kinds of generation behind one login.",
      },
      {
        kind: "text",
        body: "The stack was Next.js, Postgres and the OpenAI API, with real auth in front so my credits would survive my friends. And here is the detail I enjoy most in hindsight: I built almost all of it without any AI helping me. That dates the project better than any timestamp could.",
      },
      {
        kind: "video",
        src: "/work/siebegpt-walkthrough.mp4",
        caption: "Sending a message, back when this still felt like magic.",
      },
      {
        kind: "text",
        body: "I never planned to release it. ChatGPT was free and I would have been paying for everyone's tokens, which is a short story with a sad ending. The point was to learn how AI fits inside a product. It was my first time putting AI in an application. It would not be the last.",
      },
    ],
  },

  invitemanager: {
    tagline: "Who invited who, answered properly.",
    description:
      "A Discord bot that tracked server invites, shipped fast into a gap when the market leader went paid.",
    facts: ["Discord bot", "About 100 servers"],
    story: [
      {
        kind: "text",
        body: "Server owners live on one question: who is actually bringing people in. Invite tracking bots existed, but right then the big one everybody used was going paid, and I watched a gap open up in real time. I built InviteManager to fill it.",
      },
      {
        kind: "text",
        body: "Around a hundred servers picked it up, including a couple of big ones that ran their whole invite game on it. The traction stayed modest, but the lesson did not: when a gap opens you ship into it fast, because gaps do not wait. I have reused that reflex far more often than the code.",
      },
    ],
  },

  bigben: {
    tagline: "Bong. Every hour, on the dot.",
    description:
      "A Discord bot that joins your voice channel every hour on the hour and chimes like Big Ben. Built in a day, for fun.",
    facts: ["Discord bot", "Built in a day", "Python"],
    links: [
      { label: "View the code", href: "https://github.com/SiebeBaree/Big-Ben" },
    ],
    story: [
      {
        kind: "text",
        body: "One random idea while gaming with friends: what if the voice channel had a grandfather clock. Big Ben was born in about a day. Every hour on the dot it joined the call, did its bong for ten seconds like the real tower and left without saying a word.",
      },
      {
        kind: "text",
        body: "Later it got a $sound command so anyone could upload their own mp3 to replace the chime, which is when things went properly off the rails. We laughed for weeks, then it got annoying, exactly on schedule, and I shut it down. Not everything needs a business model. Some projects just need to be funny.",
      },
    ],
  },

  icount: {
    tagline: "One channel. One rule. Count.",
    description:
      "My first public Discord bot: a counting game that kept around 75 servers busy during their quiet hours.",
    facts: ["Discord bot", "75 servers", "Python"],
    links: [
      { label: "View the code", href: "https://github.com/SiebeBaree/iCount" },
    ],
    story: [
      {
        kind: "text",
        body: "iCount was the first bot I built for strangers. Everything before it ran in my own servers, for people I knew. This one was public: any server could invite it, connect a channel and start counting. Read the previous number, type it plus one, and if anyone slips the whole channel resets to 1.",
      },
      {
        kind: "text",
        body: "That is the entire bot, and that is exactly why it worked. About 75 servers and a couple thousand people counted together to keep their communities alive through the quiet hours. For me it was the first time my code ran somewhere I could not see it. That changes how you write it.",
      },
    ],
  },

  gameout: {
    tagline: "Fifty people and no shortage of opinions.",
    description:
      "A Discord community I founded and led: fifty members, endless discussions and my first taste of running one.",
    facts: ["Community", "50 members"],
    story: [
      {
        kind: "text",
        body: "GameOut is the one chapter with no code in it. It was a community I founded: about fifty of us hanging out, gaming and above all discussing. Apple versus Android could fill an entire evening, argued with the energy of a parliament and none of the consequences.",
      },
      {
        kind: "text",
        body: "It ran for about a year and then wound down, which is the natural lifespan of most communities. But founding and leading it taught me how groups of people actually behave online, and that knowledge got heavy use later when Coinz needed a support community that did not run on chaos.",
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
};

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS[slug];
}
