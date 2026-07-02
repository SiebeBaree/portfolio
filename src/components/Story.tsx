"use client";

import { useRef } from "react";
import { CHAPTERS, COINZ_MOMENT, LINKS } from "@/content/copy";
import { formatNumber } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";

function ChapterBlock({
  year,
  headline,
  paragraphs,
  yearSide,
  children,
}: {
  year: string;
  headline: string;
  paragraphs: string[];
  yearSide: "left" | "right";
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip px-6 py-24 md:px-12 md:py-36">
      <span
        aria-hidden="true"
        data-parallax
        className={`chapter-year absolute top-0 text-[clamp(7rem,22vw,24rem)] leading-none ${
          yearSide === "left"
            ? "left-0 -translate-x-[0.08em]"
            : "right-0 translate-x-[0.08em]"
        }`}
      >
        {year}
      </span>

      <div className="relative mx-auto max-w-270">
        <p data-reveal className="font-sans text-[0.8125rem] text-accent">
          {year}
        </p>
        <h2
          data-reveal
          className="display mt-4 max-w-[16ch] text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] text-ink"
        >
          {headline}
        </h2>
        <div className="prose-story mt-10 max-w-155 md:ml-[22%]">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)} data-reveal>
              {p}
            </p>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}

function CoinzMoment() {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = counterRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // SSR text holds the final value; reset to zero only when
        // the count-up will actually run.
        const proxy = { v: 0 };
        el.textContent = formatNumber(0);
        gsap.to(proxy, {
          v: COINZ_MOMENT.count,
          duration: 3,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = formatNumber(proxy.v);
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mt-20 md:mt-28">
      <p className="display text-[clamp(2.75rem,10.5vw,11rem)] leading-none text-ink">
        <span ref={counterRef} className="tabular-nums">
          {formatNumber(COINZ_MOMENT.count)}
        </span>
      </p>
      <p
        data-reveal
        className="mt-4 font-serif text-[clamp(1.375rem,2.4vw,2rem)] text-ink italic"
      >
        {COINZ_MOMENT.after}
      </p>
      <div className="prose-story mt-10 max-w-155 md:ml-[22%]">
        <p data-reveal>{COINZ_MOMENT.closing}</p>
        <p data-reveal>
          <a
            href={LINKS.coinzRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-1 underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            {COINZ_MOMENT.repoLabel} ↗
          </a>
        </p>
      </div>
    </div>
  );
}

export function Story() {
  return (
    <div id="story">
      {CHAPTERS.map((chapter, i) => (
        <ChapterBlock
          key={chapter.id}
          year={chapter.year}
          headline={chapter.headline}
          paragraphs={chapter.paragraphs}
          yearSide={i % 2 === 0 ? "right" : "left"}
        >
          {chapter.id === "coinz" && <CoinzMoment />}
        </ChapterBlock>
      ))}
    </div>
  );
}
