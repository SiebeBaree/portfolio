import { ENKRYPTIFY, LINKS } from "@/content/copy";

export function Enkryptify() {
  return (
    <section
      id="work"
      data-night-trigger
      className="relative overflow-x-clip px-6 py-32 md:px-12 md:py-48"
    >
      <span
        aria-hidden="true"
        data-parallax
        className="chapter-year absolute top-0 right-0 translate-x-[0.08em] text-[clamp(7rem,22vw,24rem)] leading-none"
      >
        {ENKRYPTIFY.year}
      </span>

      <div className="relative mx-auto max-w-270">
        <p data-reveal className="font-sans text-[0.8125rem] text-accent">
          {ENKRYPTIFY.year}
        </p>
        <h2
          data-reveal
          className="display mt-4 max-w-[15ch] text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.02] text-ink"
        >
          {ENKRYPTIFY.headline}
        </h2>
        <div className="prose-story mt-10 max-w-155 md:ml-[22%]">
          {ENKRYPTIFY.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} data-reveal>
              {p}
            </p>
          ))}
          <p data-reveal>
            <a
              href={LINKS.enkryptify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-1 underline-offset-4 transition-opacity duration-200 hover:opacity-70"
            >
              {ENKRYPTIFY.linkLabel} ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
