import type { Metadata } from "next";
import SkyBackground from "@/components/backdrop/SkyBackground";
import StoryLink from "@/components/ui/StoryLink";
import VideoCard from "@/components/videos/VideoCard";
import {
  BASE_OPEN_GRAPH,
  BASE_TWITTER,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  VIDEO_EMAIL_URL,
} from "@/lib/site";
import {
  formatDuration,
  VIDEO_BASE,
  VIDEO_MAX_SECONDS,
  VIDEO_PRICES,
  VIDEO_STEP,
  VIDEOS,
} from "@/lib/videos";

const DESCRIPTION = `Motion videos for SaaS products by ${SITE_NAME}. One video of up to ${VIDEO_BASE.seconds} seconds and a 30 minute call for €${VIDEO_BASE.eur} or $${VIDEO_BASE.usd}, ex VAT.`;

export const metadata: Metadata = {
  title: "Motion videos",
  description: DESCRIPTION,
  alternates: { canonical: "/videos" },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    type: "website",
    title: `Motion videos · ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/videos",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    ...BASE_TWITTER,
    title: `Motion videos · ${SITE_NAME}`,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

/*
 * The full motion video offer. Past work leads when there is some, so a
 * visitor sees the videos before the price. Prices and videos come from
 * lib/videos.ts.
 */
export default function VideosPage() {
  return (
    <>
      <SkyBackground />
      <main className="mx-auto min-h-dvh w-full max-w-5xl px-6 pt-7 pb-24 sm:px-10 sm:pt-10 sm:pb-32">
        <nav
          aria-label="Videos navigation"
          className="flex justify-between gap-6 text-[13px]"
        >
          <StoryLink
            href="/"
            className="focus-ring hover:underline hover:underline-offset-[5px]"
          >
            {SITE_NAME}
          </StoryLink>
          <StoryLink
            href="/"
            className="focus-ring hover:underline hover:underline-offset-[5px]"
          >
            ← Home
          </StoryLink>
        </nav>

        <header className="mt-20 sm:mt-28">
          <h1 className="font-display text-[clamp(3.4rem,8vw,6.5rem)] leading-[1.02] tracking-[-0.04em]">
            Motion videos
            <br />
            <span className="italic text-accent">for your software.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
            I make short motion videos that show what a SaaS product does. So
            far most of them were for my own apps. Now I want to make them for
            other companies too.
          </p>
        </header>

        {VIDEOS.length > 0 && (
          <section aria-labelledby="past-videos-title" className="mt-24">
            <h2
              id="past-videos-title"
              className="font-display text-4xl tracking-tight sm:text-5xl"
            >
              Videos I&apos;ve made.
            </h2>
            {/* Columns, not a grid, so a vertical video can sit beside two landscape ones. */}
            <div className="mt-10 gap-x-10 *:mb-14 *:break-inside-avoid sm:columns-2">
              {VIDEOS.map((video) => (
                <VideoCard key={video.src} video={video} />
              ))}
            </div>
          </section>
        )}

        <section
          aria-labelledby="offer-title"
          className="mt-24 grid gap-10 sm:mt-32 md:grid-cols-[1fr_1.25fr] md:gap-20"
        >
          <div>
            <h2
              id="offer-title"
              className="font-display text-4xl tracking-tight sm:text-5xl"
            >
              What you get for{" "}
              <span className="whitespace-nowrap text-accent">
                €{VIDEO_BASE.eur}.
              </span>
            </h2>
            <p className="mt-4 text-sm text-ink/70">
              Or ${VIDEO_BASE.usd}. Prices are ex VAT.
            </p>
          </div>
          <div>
            <ol>
              <li className="grid grid-cols-[2.5rem_1fr] border-t border-ink/15 py-6">
                <span className="pt-2 text-sm tabular-nums text-ink/60">
                  01
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl">
                    A 30 minute call
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/80">
                    You show me the product, tell me what kind of video you want
                    and give me access to it.
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-[2.5rem_1fr] border-t border-ink/15 py-6">
                <span className="pt-2 text-sm tabular-nums text-ink/60">
                  02
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl">
                    One video of up to {VIDEO_BASE.seconds} seconds
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/80">
                    Need more time? Every extra {VIDEO_STEP.seconds} seconds is
                    €{VIDEO_STEP.eur} or ${VIDEO_STEP.usd}, up to{" "}
                    {formatDuration(VIDEO_MAX_SECONDS)}.
                  </p>
                </div>
              </li>
            </ol>
            <ul
              aria-label="Price per length"
              className="grid grid-cols-2 border-t border-ink/15 sm:grid-cols-4"
            >
              {VIDEO_PRICES.map((price) => (
                <li key={price.seconds} className="py-6 pr-4">
                  <span className="block font-display text-4xl leading-none tabular-nums">
                    {formatDuration(price.seconds)}
                  </span>
                  <span className="mt-3 block text-sm tabular-nums">
                    €{price.eur}
                    <span className="text-ink/60"> · ${price.usd}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="book-title"
          className="mt-24 flex flex-col gap-8 sm:mt-36 sm:flex-row sm:items-end sm:justify-between sm:gap-12"
        >
          <div>
            <h2
              id="book-title"
              className="font-display text-[clamp(3rem,6vw,5rem)] leading-[1.04] tracking-[-0.035em]"
            >
              Let&apos;s make one
              <br />
              <span className="italic text-accent">for your product.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
              Email me a link to your product and I&apos;ll send you a time for
              the call.
            </p>
          </div>
          <a
            href={VIDEO_EMAIL_URL}
            className="focus-ring group flex w-fit shrink-0 items-center gap-6 border-b border-ink/50 py-3 text-base"
          >
            Email me{" "}
            <span
              aria-hidden="true"
              className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </a>
        </section>
      </main>
    </>
  );
}
