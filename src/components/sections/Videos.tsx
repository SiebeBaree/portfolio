import Reveal from "@/components/ui/Reveal";
import StoryLink from "@/components/ui/StoryLink";
import { VIDEO_BASE } from "@/lib/videos";

/*
 * The motion video offer, between the app strip and About. Kept to a
 * heading, a price and a link so it reads as a side service and not as the
 * point of the page; the videos and the full offer live on /videos.
 *
 * Deliberately no `data-hour`: SkyBackground times each hour from the last
 * section that names it, so marking this golden would push golden hour back
 * past the strip. It sits in the strip's golden light while dusk starts to
 * fall, which is why its text uses the shared `--hour-ink`.
 */
export default function Videos() {
  return (
    <section
      aria-labelledby="videos-title"
      className="flex min-h-[85svh] items-center px-6 py-24 text-[var(--hour-ink)] sm:px-[7vw]"
    >
      <Reveal className="w-full">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-end md:gap-20">
          <h2
            id="videos-title"
            className="max-w-[12ch] font-display text-[clamp(3rem,5.4vw,5.6rem)] leading-[0.98] tracking-[-0.035em]"
          >
            I also make motion videos{" "}
            <span className="whitespace-nowrap italic">for software.</span>
          </h2>
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-[var(--hour-muted)] sm:text-[17px]">
              Short videos that show what a SaaS product does. I make them for
              my own apps and now for other companies too.
            </p>
            <p className="mt-8 flex items-baseline gap-3">
              <span className="text-sm text-[var(--hour-muted)]">From</span>
              <span className="font-display text-6xl leading-none tracking-[-0.035em]">
                €{VIDEO_BASE.eur}
              </span>
              <span className="text-sm text-[var(--hour-muted)]">
                or ${VIDEO_BASE.usd}, ex VAT
              </span>
            </p>
            <StoryLink
              href="/videos"
              className="focus-ring group mt-8 inline-flex items-center gap-6 border-b border-[var(--hour-line)] pb-2 text-base transition-colors hover:border-[var(--hour-ink)]"
            >
              What you get
              <span
                aria-hidden
                className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </StoryLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
