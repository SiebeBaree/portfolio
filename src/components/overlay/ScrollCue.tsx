"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { EASE_OUT_QUINT, SCROLL_UNLOCK_AT } from "@/lib/timeline";

/*
 * A quiet ring with an arrow drifting down through it and a whispered
 * "Scroll" beside it, parked in the bottom-left corner of the first screen.
 * It used to sit bottom centre, but the dock owns that spot now, so the cue
 * moved to the corner the dock and the portrait both leave empty, balancing
 * the scrollbar on the right edge. The label earns the corner: away from
 * the conventional centre position the ring alone could read as decoration.
 *
 * White, so it stays readable once a dark-shirt photo replaces the
 * placeholder portrait; the soft shadow carries it over the light sky until
 * then.
 *
 * It takes its own scroll reading rather than borrowing the clouds', so the
 * two share no state: it fades in once the intro hands scrolling back, then
 * fades out over the first sixth of a viewport of scrolling.
 */

const FADE_OVER = 0.17; // fraction of a viewport height

export default function ScrollCue() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, (v) => {
    // window is missing during SSR and scrollY can be unset before the first
    // measurement; both must resolve to 1 so hydration matches
    if (typeof window === "undefined" || !Number.isFinite(v)) return 1;
    const travelled = v / (window.innerHeight * FADE_OVER);
    return 1 - Math.min(1, Math.max(0, travelled));
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-6 z-40 max-md:hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: EASE_OUT_QUINT,
        delay: reducedMotion ? 0 : SCROLL_UNLOCK_AT + 0.6,
      }}
    >
      <motion.span
        className="flex items-center gap-3 text-white"
        style={{
          opacity,
          filter: "drop-shadow(0 1px 6px rgb(28 41 90 / 0.4))",
        }}
      >
        <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-full">
          <svg aria-hidden className="absolute inset-0" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="18.5"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.7"
              strokeWidth="1.5"
            />
          </svg>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="scroll-arrow size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v14m0 0l-5-5m5 5l5-5" />
          </svg>
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em]">
          Scroll
        </span>
      </motion.span>
    </motion.div>
  );
}
