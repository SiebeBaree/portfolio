import Reveal from "@/components/ui/Reveal";
import { COFOUNDER_EMAIL_URL, SF_MEETUP_EMAIL_URL } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto flex min-h-[70svh] w-full max-w-5xl flex-col justify-center px-6 pt-16 pb-36 sm:px-10 sm:pt-24 sm:pb-44"
    >
      <Reveal>
        <h2
          id="contact-title"
          className="font-display text-[clamp(3.6rem,8vw,7rem)] leading-[1.02] tracking-[-0.04em]"
        >
          Let&apos;s meet
          <br />
          <span className="italic text-accent">in San Francisco.</span>
        </h2>
        <div className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div className="max-w-lg space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
            <p>
              I&apos;ll be there for three weeks in January to find a
              co-founder. If you&apos;re strong on the business side and looking
              for someone to build with, I&apos;d like to meet you.
            </p>
            <p>
              Tell me what you&apos;ve worked on and what you&apos;d want to
              build. We can start with a call before the trip.
            </p>
            <p className="text-sm leading-relaxed">
              I&apos;ll return to Belgium afterwards. Longer term, I want to
              move to the US and build a company there.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-4">
            <a
              href={SF_MEETUP_EMAIL_URL}
              className="focus-ring group flex w-fit items-center gap-6 border-b border-ink/50 py-3 text-base"
            >
              Meet in January{" "}
              <span
                aria-hidden="true"
                className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
            <a
              href={COFOUNDER_EMAIL_URL}
              className="focus-ring py-2 text-sm text-ink/75 underline underline-offset-4"
            >
              Let&apos;s have a call first
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
