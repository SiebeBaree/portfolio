"use client";

import { useRef } from "react";
import { KARTING } from "@/content/copy";
import { gsap, useGSAP } from "@/lib/gsap";

function KartSilhouette() {
  return (
    <svg
      viewBox="0 0 260 140"
      className="h-14 w-auto text-ink md:h-16"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* ground shadow */}
      <ellipse cx="130" cy="126" rx="106" ry="4" opacity="0.15" />
      {/* exhaust spike out the back */}
      <path d="M20 86 L42 81 L42 94 Z" />
      {/* rear engine mass behind the driver */}
      <rect x="43" y="51" width="42" height="44" rx="10" />
      {/* chassis slab, floating on the wheels */}
      <path d="M34 93 L204 93 L236 101 L210 110 L34 110 Z" />
      {/* driver: leg with a soft knee bend, foot into the fairing */}
      <polyline
        points="114,86 148,72 168,92"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* driver: torso as a smooth capsule */}
      <line
        x1="101"
        y1="50"
        x2="115"
        y2="86"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
      />
      {/* front fairing triangle to the nose tip */}
      <path d="M179 58 L236 101 L168 95 Z" />
      {/* steering column, thin and near vertical */}
      <line
        x1="177"
        y1="44"
        x2="181"
        y2="61"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* steering bar, angled up */}
      <line
        x1="158"
        y1="52"
        x2="184"
        y2="27"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* driver: near-horizontal arm and glove on the bar */}
      <line
        x1="105"
        y1="55"
        x2="151"
        y2="57"
        stroke="currentColor"
        strokeWidth="9.5"
        strokeLinecap="round"
      />
      <rect x="149" y="50" width="14" height="12" rx="4.5" />
      {/* helmet with visor outline */}
      <circle cx="103" cy="34" r="23" fill="var(--accent)" />
      <rect
        x="100"
        y="25"
        width="24"
        height="17"
        rx="8"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="3"
      />
      {/* wheels, bullseye rims, separated from the body */}
      <circle cx="74" cy="102" r="25" stroke="var(--bg)" strokeWidth="3" />
      <circle
        cx="74"
        cy="102"
        r="15"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="3"
      />
      <circle
        cx="74"
        cy="102"
        r="7.5"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="3"
      />
      <circle cx="192" cy="104" r="22" stroke="var(--bg)" strokeWidth="3" />
      <circle
        cx="192"
        cy="104"
        r="13"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="3"
      />
      <circle
        cx="192"
        cy="104"
        r="6.5"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="3"
      />
    </svg>
  );
}

export function Karting() {
  const sectionRef = useRef<HTMLElement>(null);
  const kartRef = useRef<HTMLDivElement>(null);

  // The kart drives across the page while the section scrolls through.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          kartRef.current,
          { x: -220 },
          {
            x: () => window.innerWidth + 220,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip px-6 pt-20 pb-8 md:px-12 md:pt-28"
    >
      <div className="mx-auto max-w-270">
        <div className="max-w-155 md:ml-[22%]">
          <p data-reveal className="font-sans text-[0.8125rem] text-accent">
            {KARTING.kicker}
          </p>
          <h2
            data-reveal
            className="display mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] text-ink"
          >
            {KARTING.headline}
          </h2>
          <p data-reveal className="prose-story mt-8">
            {KARTING.body}
          </p>
        </div>
      </div>

      {/* full-bleed lane for the kart */}
      <div className="relative mt-16 h-14 md:mt-20">
        <div
          ref={kartRef}
          className="absolute bottom-0 left-0 will-change-transform"
          style={{ transform: "translateX(-220px)" }}
        >
          <KartSilhouette />
        </div>
      </div>
    </section>
  );
}
