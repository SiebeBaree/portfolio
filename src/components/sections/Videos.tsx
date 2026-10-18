import Reveal from "@/components/ui/Reveal";
import StoryLink from "@/components/ui/StoryLink";
import { VIDEO_BASE } from "@/lib/videos";

/*
 * The motion video offer, kept short so it reads as a side service and not
 * as the point of the page. The videos and the full offer live on /videos.
 */
export default function Videos() {
  return (
    <section
      aria-labelledby="videos-title"
      className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-24"
    >
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-16">
          <h2
            id="videos-title"
            className="max-w-md font-display text-4xl tracking-tight text-balance sm:text-5xl"
          >
            I also make motion videos for software.
          </h2>
          <div>
            <p className="max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
              Short videos that show what a SaaS product does. I make them for
              my own apps and now for other companies too.
            </p>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <p className="flex items-baseline gap-3">
                <span className="text-sm text-ink/70">From</span>
                <span className="font-display text-5xl leading-none tracking-[-0.03em] text-accent">
                  €{VIDEO_BASE.eur}
                </span>
                <span className="text-sm text-ink/70">
                  or ${VIDEO_BASE.usd}, ex VAT
                </span>
              </p>
              <StoryLink
                href="/videos"
                className="focus-ring group inline-flex items-center gap-5 border-b border-ink/40 pb-2 text-sm"
              >
                What you get
                <span
                  aria-hidden="true"
                  className="text-xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  ↗
                </span>
              </StoryLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
