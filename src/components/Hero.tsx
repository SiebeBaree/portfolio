"use client";

import { useEffect, useRef } from "react";
import { HERO } from "@/content/copy";
import { gsap, useGSAP } from "@/lib/gsap";

const BASE_WGHT = 800;
const DENT_WGHT = 320;
const RADIUS = 240;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const measured = useRef(false);

  // Entrance: letters rise out of the baseline mask, left to right.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-letter]",
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.035,
            delay: 0.15,
            onComplete: () => {
              measured.current = false; // trigger re-measure in the flex loop
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  // Signature interaction: type flexes under the cursor.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const wordmark = wordmarkRef.current;
    if (!wordmark) return;

    const letters = Array.from(
      wordmark.querySelectorAll<HTMLElement>("[data-letter]"),
    );
    const centers: { x: number; y: number }[] = letters.map(() => ({
      x: 0,
      y: 0,
    }));
    const weights = letters.map(() => BASE_WGHT);
    const mouse = { x: -9999, y: -9999 };

    const measure = () => {
      for (let i = 0; i < letters.length; i++) {
        const r = letters[i].getBoundingClientRect();
        centers[i].x = r.left + r.width / 2 + window.scrollX;
        centers[i].y = r.top + r.height / 2 + window.scrollY;
      }
      measured.current = true;
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    };
    const onResize = () => {
      measured.current = false;
    };

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Skip all work once the hero has scrolled away.
      if (window.scrollY > window.innerHeight * 1.2) return;
      if (!measured.current) measure();
      for (let i = 0; i < letters.length; i++) {
        const d = Math.hypot(mouse.x - centers[i].x, mouse.y - centers[i].y);
        const influence = Math.max(0, 1 - d / RADIUS);
        const target = BASE_WGHT - (BASE_WGHT - DENT_WGHT) * influence ** 1.5;
        const next = weights[i] + (target - weights[i]) * 0.16;
        if (Math.abs(next - weights[i]) > 0.1) {
          weights[i] = next;
          letters[i].style.fontVariationSettings =
            `"wght" ${next.toFixed(1)}, "wdth" 125`;
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const chars = HERO.wordmark.split("");

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col px-6 pt-28 md:px-12"
    >
      <div className="flex-1" />

      {/* Statement */}
      <div className="mb-14 max-w-175 md:mb-20">
        <p
          data-reveal
          className="font-sans text-[0.8125rem] text-muted tracking-wide"
        >
          {HERO.eyebrow}
        </p>
        <p
          data-reveal
          data-delay="0.1"
          className="prose-story mt-5 text-balance !text-[clamp(1.375rem,2.2vw,1.875rem)] !leading-[1.5]"
        >
          {HERO.statement}
        </p>
      </div>

      {/* Wordmark — the one everybody keeps */}
      <h1
        ref={wordmarkRef}
        aria-label="Siebe Barée"
        className="flex select-none items-baseline justify-between overflow-hidden pb-2 font-sans text-[clamp(3rem,12.6vw,14rem)] leading-[0.94]"
      >
        {chars.map((c, i) =>
          c === " " ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: static string
            <span key={i} className="w-[0.12em]" aria-hidden="true" />
          ) : (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static string
              key={i}
              data-letter
              aria-hidden="true"
              className="inline-block will-change-transform"
              style={{ fontVariationSettings: '"wght" 800, "wdth" 125' }}
            >
              {c}
            </span>
          ),
        )}
      </h1>

      <div className="mb-8" />
    </section>
  );
}
