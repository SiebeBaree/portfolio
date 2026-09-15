import Reveal from "@/components/ui/Reveal";
import { COFOUNDER_EMAIL_URL } from "@/lib/site";

export default function CoFounder() {
  return (
    <section
      aria-labelledby="cofounder-title"
      className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32"
    >
      <Reveal>
        <div className="grid gap-10 md:grid-cols-[1.05fr_1fr] md:items-start md:gap-20">
          <h2
            id="cofounder-title"
            className="max-w-lg font-display text-[clamp(3rem,5.5vw,5rem)] leading-[1.04] tracking-[-0.035em]"
          >
            Could we be{" "}
            <span className="whitespace-nowrap italic text-accent">
              co-founders?
            </span>
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
            <p>
              My strength is product and engineering. If yours is sales,
              marketing or running a business, we could be a good match.
            </p>
            <p>
              I put a huge amount of time into what I build and enjoy working
              with people who bring that same intensity.
            </p>
            <p>
              We can get to know each other first and decide what to build
              together.
            </p>
            <a
              href={COFOUNDER_EMAIL_URL}
              className="focus-ring group inline-flex items-center gap-6 border-b border-ink/40 pt-3 pb-2 text-base text-ink"
            >
              Let&apos;s talk
              <span
                aria-hidden="true"
                className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
