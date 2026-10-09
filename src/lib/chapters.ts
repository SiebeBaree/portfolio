import type { StaticImageData } from "next/image";
import anyfmtConvert from "@/assets/work/anyfmt-convert.webp";
import aquasolutionsCoinz from "@/assets/work/aquasolutions-coinz.webp";
import aquasolutionsSite from "@/assets/work/aquasolutions-site.webp";
import bmailInbox from "@/assets/work/bmail-inbox.webp";
import bmailPalette from "@/assets/work/bmail-palette.webp";
import bmailTracked from "@/assets/work/bmail-tracked.webp";
import coinzWebsite from "@/assets/work/coinz-website.webp";
import eeveeChargeMap from "@/assets/work/eevee-charge-map.webp";
import eeveePlatform from "@/assets/work/eevee-platform.webp";
import filesDrive from "@/assets/work/files-baree-be-drive.webp";
import filesTerminal from "@/assets/work/files-baree-be-terminal.webp";
import imprintBiscoff from "@/assets/work/imprint-biscoff.webp";
import notchletNotch from "@/assets/work/notchlet-notch.webp";
import notchletShare from "@/assets/work/notchlet-share.webp";
import pitchpoppyHome from "@/assets/work/pitchpoppy-home.webp";
import planMailPlan from "@/assets/work/plan-baree-be-mail-plan.webp";
import umberCreate from "@/assets/work/umber-create.webp";
import umberKoi from "@/assets/work/umber-koi.webp";
import { COINZ_STATS, ENKRYPTIFY_FUNDING, type Project } from "@/lib/projects";
import enkryptifySecrets from "../../public/apps/enkryptify-secrets.webp";

export type ChapterBlock =
  | { kind: "text"; body: string }
  | { kind: "image"; image: StaticImageData; alt: string };

export type Chapter = {
  tagline: string;
  description: string;
  links?: { label: string; href: string }[];
  story: ChapterBlock[];
};

/** Every public project has a complete story. Routes and content stay in sync. */
export const CHAPTERS = {
  enkryptify: {
    tagline: "The secrets management company I founded.",
    description: `Enkryptify was the secrets management company I founded. We raised ${ENKRYPTIFY_FUNDING} in funding and had paying customers. Founded in 2024, now closed.`,

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

  notchlet: {
    tagline: "My AI coding limits, right in the notch.",
    description:
      "An open source Mac app that shows your Claude Code, Codex, Cursor and OpenCode limits in the notch, with a verdict on whether you'll make it to the reset.",
    links: [
      { label: "Visit notchlet.com", href: "https://notchlet.com" },
      {
        label: "View the code",
        href: "https://github.com/SiebeBaree/Notchlet",
      },
    ],
    story: [
      {
        kind: "text",
        body: "I use Claude Code, Codex and Cursor every day and every one of them has limits. A five hour window, a weekly cap, a monthly pool. To check them I had to open a usage page in the browser, and I wanted the number where I already look all day. So I built Notchlet, a Mac app that lives in the notch.",
      },
      {
        kind: "image",
        image: notchletNotch,
        alt: "The Notchlet panel open below the MacBook notch, with rings for Claude, Codex and Cursor and Claude's 5 hour, weekly and Opus limits underneath",
      },
      {
        kind: "text",
        body: "Every limit gets a ring that shows what's left, with a small tick where you'd be if you spread your usage evenly. Next to it is a verdict like Plenty, On pace or Empty 1h early, so you never have to do the math yourself. When a limit gets close the notch opens by itself. And when an agent finishes a thin blue line runs around the notch, or an amber one when it's waiting for your answer.",
      },
      {
        kind: "text",
        body: "There's no dock icon, no menu bar item and no settings window. Everything happens inside the notch, and while it's closed it uses no CPU at all.",
      },
      {
        kind: "text",
        body: "It also shows what your tokens would have cost at API prices, a twelve month activity grid and the models you use most. You can turn all of it into an image to share.",
      },
      {
        kind: "image",
        image: notchletShare,
        alt: "The Notchlet share window showing a card with agent usage at API list prices, an activity grid and the top three models",
      },
      {
        kind: "text",
        body: "Notchlet is free and open source. It even warns you when an API key leaks into one of your agent chats.",
      },
    ],
  },

  bmail: {
    tagline: "Gmail, Outlook and my own domains in one inbox.",
    description:
      "bMail is my open source Mac mail app. Gmail, Outlook and my own domains in one fast inbox that feels like it works offline.",
    links: [
      { label: "View the code", href: "https://github.com/SiebeBaree/bMail" },
    ],
    story: [
      {
        kind: "text",
        body: "When I bought my own domain I didn't want to pay for Google Workspace just to have email on it. On top of that I had the Outlook app open and Gmail in a browser tab. I wanted to see every email from Gmail, Outlook and my own domains in one app. So I built one and called it bMail. The b stands for Baree.",
      },
      {
        kind: "image",
        image: bmailInbox,
        alt: "bMail's dark inbox with five conversations on the left and a Stripe payout email open on the right",
      },
      {
        kind: "text",
        body: "bMail runs my own domains without Google Workspace. I type in a domain, copy the DNS records it gives me and every address on that domain lands in the same inbox as my Gmail and Outlook.",
      },
      {
        kind: "text",
        body: "I also wanted it to feel like it works offline. All your mail is stored on your Mac, so opening a conversation, archiving or searching happens instantly. Syncing happens in the background, and when you're offline your changes simply wait until you're back.",
      },
      {
        kind: "text",
        body: "It's built for the keyboard. J and K move through your mail, E marks it done, C writes a new one and ⌘K opens every action. Every mail waits ten seconds before it sends, so you can still take it back.",
      },
      {
        kind: "image",
        image: bmailPalette,
        alt: "The bMail command palette with rep typed, showing Report spam, Reply and Reply all with their shortcuts",
      },
      {
        kind: "text",
        body: "For mail from your own domains you can switch on open and click tracking per message and see when and where it was read. Apple's privacy protection and link scanners are filtered out, so a fake open never fools you.",
      },
      {
        kind: "image",
        image: bmailTracked,
        alt: "A sent proposal in bMail with its tracking panel showing three opens and two clicks on a timeline with device and city",
      },
      {
        kind: "text",
        body: "bMail is a native Mac app and it's open source, so anyone can install it.",
      },
    ],
  },

  pitchpoppy: {
    tagline: "A new website for your business, grown from your old one.",
    description:
      "Enter your website and PitchPoppy builds you a completely new one for free, to use as inspiration.",
    links: [{ label: "Visit pitchpoppy.lol", href: "https://pitchpoppy.lol" }],
    story: [
      {
        kind: "text",
        body: "A lot of small businesses have a website that hasn't changed in years. PitchPoppy shows them what it could look like. You enter your website and a while later you get an email with a completely new one, built from your own content. It's free and it's meant as inspiration, not as a finished site.",
      },
      {
        kind: "image",
        image: pitchpoppyHome,
        alt: "The PitchPoppy homepage, a hand drawn meadow of red poppies under the line Bring new life into your website and a field asking for your website URL",
      },
      {
        kind: "text",
        body: "First it reads your site and writes a short summary of your company. You can fix that summary and tell it what you want more of: sign-ups, enquiries or sales. Then you sign in with Google, close the tab and wait for the email.",
      },
      {
        kind: "text",
        body: "PitchPoppy takes your logo, colors, fonts and photos and designs a whole new page around one idea that fits your business. I set the bar at Site of the Day on Awwwards, so it stays far away from the usual AI website look: no purple gradients, no glassmorphism, no row of three icon cards and no made up numbers. No two businesses get the same page.",
      },
    ],
  },

  "plan-baree-be": {
    tagline: "My plans, readable anywhere.",
    description:
      "plan.baree.be uploads my HTML plans to the cloud, so I can read them on any laptop and on my phone and build from anywhere.",
    links: [
      {
        label: "View the code",
        href: "https://github.com/SiebeBaree/plan-baree-be",
      },
    ],
    story: [
      {
        kind: "text",
        body: "My agents write their plans as HTML pages, with real headings, tables and mockups. But a file on one laptop is only useful on that laptop. I wanted to read my plans anywhere, on every laptop I work on and on my phone, so I can keep building wherever I am.",
      },
      {
        kind: "text",
        body: "plan.baree.be uploads a plan to the cloud and gives back a link. When a plan gets updated the link stays the same, so I always see the latest version.",
      },
      {
        kind: "image",
        image: planMailPlan,
        alt: "The plan for bMail open on plan.baree.be on a laptop, with the same plan on a phone in front of it",
      },
      {
        kind: "text",
        body: "It's also where I pick designs. Before a bigger UI change my agents publish a few different mocks here and I choose one before they touch the real code.",
      },
      {
        kind: "text",
        body: "plan.baree.be is open source.",
      },
    ],
  },

  "files-baree-be": {
    tagline: "A file host built for AI agents.",
    description:
      "files.baree.be lets my AI agents send files to each other and add them to GitHub.",
    links: [
      {
        label: "View the code",
        href: "https://github.com/SiebeBaree/files-baree-be",
      },
    ],
    story: [
      {
        kind: "text",
        body: "My agents work with a lot of files: screenshots of a UI change, screen recordings, logs. I wanted them to be able to send those files to each other and add them to GitHub, right inside a pull request or an issue. So I built files.baree.be, a file host made for agents from day one.",
      },
      {
        kind: "text",
        body: "An agent uploads a file with two simple requests and gets back a public link it can use anywhere. If something goes wrong the error tells the agent exactly how to fix it, so it never gets stuck.",
      },
      {
        kind: "image",
        image: filesTerminal,
        alt: "The files.baree.be drive with a popover showing the two curl commands for uploading from the terminal",
      },
      {
        kind: "text",
        body: "I get a drive for myself too, in the style of Notion. I can browse everything my agents uploaded, preview images, videos and PDFs, paste a screenshot to upload it and copy a link with one key. It works on my phone as well.",
      },
      {
        kind: "image",
        image: filesDrive,
        alt: "The files.baree.be drive in gallery view with screenshots, a screen recording and a text file, and a monthly usage meter in the sidebar",
      },
      {
        kind: "text",
        body: "files.baree.be is open source.",
      },
    ],
  },

  imprint: {
    tagline: "Instagram campaigns for physical products, built in four hours.",
    description:
      "A four hour build that generates Instagram campaigns for brands with physical products. The images look surprisingly real.",
    links: [
      { label: "View the code", href: "https://github.com/SiebeBaree/imprint" },
    ],
    story: [
      {
        kind: "text",
        body: "There are tools that generate Instagram content for companies that sell physical products, and I wanted to see if I could build a working version myself. Imprint took me about four hours. The UI and UX are not perfect, but it fully works and the images it makes look surprisingly real.",
      },
      {
        kind: "image",
        image: imprintBiscoff,
        alt: "Three images Imprint generated for Lotus Biscoff spread: a story with ice cream and a jar of Crunchy, two jars next to toast and a hand holding a slice of toast with the spread",
      },
      {
        kind: "text",
        body: "You start with your brand. You give it your public Instagram profile, a brand guidelines PDF and photos of your products. Imprint reads all of that and writes a brand profile: who you sell to, how you talk and how your photos look. You check it before anything gets generated.",
      },
      {
        kind: "text",
        body: "Then you describe a campaign and pick a product. Imprint plans six posts, three for the feed and three stories, each with a caption and a suggested time to post. You can change any image with a prompt and download it.",
      },
      {
        kind: "text",
        body: "The images above come from a campaign for Lotus Biscoff. What surprised me most is the packaging. Image models love to invent their own labels, so Imprint checks every image against your real product photos and fixes the logo, the spelling and the shape of the package when they're off.",
      },
    ],
  },

  umber: {
    tagline: "Every AI image and video model in one free app.",
    description:
      "An open source desktop app for AI images and video. Bring your own API keys and pay the labs directly.",
    links: [
      { label: "Visit the website", href: "https://umber.s4.nu" },
      { label: "View the code", href: "https://github.com/SiebeBaree/umber" },
    ],
    story: [
      {
        kind: "text",
        body: "Every AI image and video lab wants its own subscription. Umber is a desktop app that puts all of them in one place. You bring your own API keys, pay the labs what it actually costs and everything you make stays on your computer. There's no account, no server in the middle and no subscription.",
      },
      {
        kind: "image",
        image: umberCreate,
        alt: "Umber's Create screen asking What will you create today, with a prompt box set to Grok Imagine Image 2.0 at a cost of $0.04",
      },
      {
        kind: "text",
        body: "It works with the image and video models from Google, OpenAI, Black Forest Labs, Kling, Runway and more. Before anything runs you see exactly what it will cost, and your keys stay encrypted on your own computer.",
      },
      {
        kind: "image",
        image: umberKoi,
        alt: "An orange koi swimming through a sky full of clouds, made with Umber",
      },
      {
        kind: "text",
        body: "Umber is free and open source and runs on macOS, Windows and Linux.",
      },
    ],
  },

  anyfmt: {
    tagline: "An image converter that never uploads your images.",
    description:
      "Convert HEIC, PNG, JPEG, WebP and more right in your browser. Nothing gets uploaded.",
    links: [
      { label: "Visit anyfmt.xyz", href: "https://anyfmt.xyz" },
      { label: "View the code", href: "https://github.com/SiebeBaree/anyfmt" },
    ],
    story: [
      {
        kind: "text",
        body: "Most image converters online want you to upload your photos to their server. For a format change that's unnecessary, and for photos with your location in them it's a privacy problem. anyfmt does the whole conversion in your browser. Your files never leave your device.",
      },
      {
        kind: "text",
        body: "You drop up to 20 images anywhere on the page or paste them from your clipboard, pick PNG, JPEG or WebP and download them one by one or as a zip. It reads HEIC photos from iPhones, TIFF, AVIF, GIF and all the usual formats. Location data and other metadata are removed by default.",
      },
      {
        kind: "image",
        image: anyfmtConvert,
        alt: "anyfmt converting three HEIC photos to WebP at 80 percent quality, each about 40 percent smaller",
      },
    ],
  },

  "eevee-mobility": {
    tagline: "My one job working for someone else.",
    description:
      "A year as the front-end engineer of EEVEE Mobility's business platform, ending in a three month rewrite from 100,000 lines of Vue to 45,000 lines of Next.js.",
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
      },
      {
        kind: "text",
        body: "The platform was not the only thing I shipped. I also built EEVEE's charging map as a separate website of its own.",
      },
      {
        kind: "image",
        image: eeveeChargeMap,
        alt: "The EEVEE charging map over Antwerp, covered in pink pins marking charge points",
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
