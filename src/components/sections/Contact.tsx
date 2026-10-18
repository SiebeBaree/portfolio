import Skyline from "@/components/contact/Skyline";
import Reveal from "@/components/ui/Reveal";
import { COFOUNDER_EMAIL_URL, SF_MEETUP_EMAIL_URL } from "@/lib/site";

/*
 * The day ends at night over San Francisco (`data-hour` tells the sky): the
 * co-founder ask and the trip in white under the stars, with the city and
 * the Golden Gate along the bottom. The orange is the bridge's own.
 */

const ORANGE = "#ff6a3d";

export default function Contact() {
  return (
    <section
      id="contact"
      data-hour="night"
      aria-labelledby="contact-title"
      className="relative flex min-h-[max(100svh,820px)] flex-col overflow-hidden text-[#fbf1e6]"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-[14svh] sm:px-10">
        <Reveal>
          <h2
            id="contact-title"
            className="font-display text-[clamp(3.6rem,8.6vw,9.5rem)] leading-[0.94] tracking-[-0.045em] text-white"
          >
            Let&apos;s meet
            <br />
            <span className="italic" style={{ color: ORANGE }}>
              in San Francisco.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 grid gap-8 md:grid-cols-[minmax(0,32rem)_auto] md:items-end md:justify-between">
            <div className="space-y-4 text-base leading-relaxed text-[#fbf1e6]/80 sm:text-lg">
              <p>I&apos;m there from November 3 to December 3.</p>
              <p>
                My strength is product and engineering. If yours is sales,
                marketing or running a business, we could be a good match. We
                can get to know each other first and decide what to build
                together.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <a
                href={SF_MEETUP_EMAIL_URL}
                className="focus-ring group flex items-center gap-6 border-b pb-2 text-base text-white"
                style={{ borderColor: ORANGE }}
              >
                Meet in November
                <span
                  aria-hidden
                  className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: ORANGE }}
                >
                  ↗
                </span>
              </a>
              <a
                href={COFOUNDER_EMAIL_URL}
                className="focus-ring py-1 text-sm text-[#fbf1e6]/70 underline decoration-[#fbf1e6]/30 underline-offset-4 hover:text-white"
              >
                Let&apos;s have a call first
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* on phones the drawing widens so the bridge alone fills the screen */}
      <div className="relative mt-auto max-md:-ml-[13vw] max-md:w-[205vw]">
        <Skyline className="block h-auto w-full" />
      </div>
      {/* more bay under the bridge so the dock floats over water, not the deck */}
      <div aria-hidden className="h-14 bg-[#04060f] md:hidden" />
    </section>
  );
}
