import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/*
 * The apps I am building and maintaining right now. Data-driven on purpose:
 * a new app ships roughly every week, so APPS will grow to about six entries.
 * Every app is one full width row: the screenshot on one side, the copy on the
 * other, sides alternating down the page so the stack has a rhythm. On phones
 * the row folds to screenshot on top, copy underneath. Adding an app is adding
 * an object, nothing else.
 *
 * Screenshots live in /public/apps/, pulled from each app's own website. They
 * are browser window mockups on transparency, so they need room around them
 * rather than a frame of their own.
 */

type App = {
  name: string;
  tagline: string;
  description: string;
  href: string;
  linkLabel: string;
  logo: string;
  screenshot: string;
  screenshotAlt: string;
  /* the shots share a width but not an exact height, so each carries its own
     intrinsic size to keep next/image from distorting the ratio */
  screenshotWidth: number;
  screenshotHeight: number;
  meta: string;
};

const APPS: App[] = [
  {
    name: "Enkryptify",
    tagline: "Secrets that defend themselves",
    description:
      "The company. The thing I go to work on every morning and have been building for the past year. Software teams still pass API keys around in Slack messages and .env files that outlive laptops, and one leaked key can sink a company. Enkryptify puts those secrets in one place, syncs them to every environment where code runs, rotates them automatically and locks them down the moment one leaks.",
    href: "https://enkryptify.com",
    linkLabel: "Meet the company at enkryptify.com",
    logo: "/apps/enkryptify-mark.svg",
    screenshot: "/apps/enkryptify-secrets.webp",
    screenshotAlt:
      "The Enkryptify dashboard listing a project's secrets and the environments each one is available in",
    screenshotWidth: 1182,
    screenshotHeight: 887,
    meta: "My company · Secrets for software teams and AI agents",
  },
  {
    name: "VoilaZaak",
    tagline: "A side business that runs itself",
    description:
      "I built VoilaZaak in a couple of days because I wanted to know how far autonomous AI can run a business without me. Every day its agents go looking for frituren in Flanders that have no website and build each one a complete site, menu and opening hours included. Then they email the owner the finished thing with personal reasons to put it live. First they see it, then they decide. It has been running on its own for a few weeks now.",
    href: "https://voilazaak.be",
    linkLabel: "See the pitch at voilazaak.be",
    logo: "/apps/voilazaak-mark.svg",
    screenshot: "/apps/voilazaak-site.webp",
    screenshotAlt:
      "The VoilaZaak homepage offering a frituur a finished website first, surrounded by fries and a pot of mayonnaise",
    screenshotWidth: 1182,
    screenshotHeight: 869,
    meta: "Fully autonomous · Finds, builds and sells daily · In Dutch",
  },
  {
    name: "Umber",
    tagline: "AI image and video studio",
    description:
      "I kept bouncing off the UX of every AI image tool and I refused to pay a subscription for models I touch a few times a week. So I built the studio I wanted: free and open source, bring your own API keys, pay the labs at cost and keep every creation on your device.",
    href: "https://umber.s4.nu",
    linkLabel: "Download free at umber.s4.nu",
    logo: "/apps/umber-mark.svg",
    screenshot: "/apps/umber-create.webp",
    screenshotAlt:
      "The Umber composer showing a prompt, the model picker and the exact price of a generation before it is sent",
    screenshotWidth: 1182,
    screenshotHeight: 862,
    meta: "Open source · MIT · macOS, Windows and Linux",
  },
  {
    name: "anyfmt",
    tagline: "Image converter that never uploads",
    description:
      "Every few weeks I hit the same wall: a HEIC off my phone that nothing will open, a screenshot too heavy to attach, a photo carrying GPS coordinates I would rather not hand out. Every converter I found wanted the upload first. This one runs inside the tab, so the file never leaves the laptop.",
    href: "https://anyfmt.xyz",
    linkLabel: "Convert something at anyfmt.xyz",
    logo: "/apps/anyfmt-mark.svg",
    screenshot: "/apps/anyfmt-drop.webp",
    screenshotAlt:
      "The anyfmt drop zone under the promise that everything runs on your device, above the formats it converts between",
    screenshotWidth: 1182,
    screenshotHeight: 862,
    meta: "Free · Nothing uploaded · 20 images at a time",
  },
  {
    name: "OneTimePic",
    tagline: "A photo that opens once",
    description:
      "I needed to send a few images with confidential things in them, and I did not love that a copy would sit in someone's chat history forever. So the photo is encrypted in the browser, the link opens exactly once and the file is gone after that view. It does not stop a screenshot. It stops the copy that outlives the conversation.",
    href: "https://onetimepic.xyz",
    linkLabel: "Send one at onetimepic.xyz",
    logo: "/apps/onetimepic-mark.svg",
    screenshot: "/apps/onetimepic-send.webp",
    screenshotAlt:
      "The OneTimePic drop zone under the line share a photo that opens once",
    screenshotWidth: 1182,
    screenshotHeight: 862,
    meta: "Free · Encrypted on device · Deleted after one view",
  },
];

function AppRow({ app, mirrored }: { app: App; mirrored: boolean }) {
  return (
    <article
      className={`glass-control group grid overflow-hidden rounded-3xl lg:min-h-[27rem] ${
        mirrored ? "lg:grid-cols-[1.1fr_1fr]" : "lg:grid-cols-[1fr_1.1fr]"
      }`}
    >
      {/* screenshot first in the DOM so a folded row puts it on top. Side by
          side it is anchored absolute to the inner top corner and sized past
          its box, so the window runs off two edges of the card and one corner
          leaves the frame. A folded row keeps it in flow instead: the full
          height shows and only one side edge bleeds off, because a cut that
          is not at the card border reads as a mistake rather than a crop.
          Anchoring flips with the row so the bleed always goes outward. */}
      <div
        className={`relative overflow-hidden ${mirrored ? "" : "lg:order-2"}`}
      >
        <div
          className={`mt-8 w-[110%] max-w-none sm:mt-10 lg:absolute lg:top-10 lg:mt-0 ${
            mirrored
              ? "ml-[calc(-10%-1.5rem)] sm:ml-[calc(-10%-2.5rem)] lg:right-10 lg:ml-0"
              : "ml-6 sm:ml-10 lg:left-10 lg:ml-0"
          }`}
        >
          <Image
            src={app.screenshot}
            alt={app.screenshotAlt}
            width={app.screenshotWidth}
            height={app.screenshotHeight}
            sizes="(min-width: 1024px) 60vw, 130vw"
            className="w-full max-w-none transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
          />
        </div>
        {/* side by side the grid row owns the height and the bottom is the
            second edge that runs off; folded rows need no spacer because the
            shot itself holds the space */}
        <div className="hidden lg:block lg:min-h-full" />
      </div>

      <div
        className={`flex flex-col justify-center p-8 sm:p-10 lg:p-12 ${
          mirrored ? "" : "lg:order-1"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* logo pulled from the app's own site; svg, so skip the optimizer */}
          <Image
            src={app.logo}
            alt=""
            width={36}
            height={36}
            unoptimized
            className="h-9 w-9"
          />
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-ink">
              {app.name}
            </h3>
            <p className="text-[12px] font-medium text-muted">{app.tagline}</p>
          </div>
        </div>
        <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-ink/75">
          {app.description}
        </p>
        <p className="mt-4 text-[12px] font-medium text-muted">{app.meta}</p>
        <a
          href={app.href}
          target="_blank"
          rel="noreferrer"
          className="focus-ring mt-6 inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-accent transition-transform duration-200 group-hover:translate-x-0.5"
        >
          {app.linkLabel}
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

export default function CurrentApps() {
  return (
    <section
      id="apps"
      className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10"
    >
      <Reveal>
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-6xl">
          Currently building.
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-6">
        {APPS.map((app, i) => (
          <Reveal key={app.name} delay={0.08 + i * 0.06}>
            <AppRow app={app} mirrored={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
