"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_QUINT } from "@/lib/timeline";

/*
 * SHARED. The one scroll-reveal treatment the whole site uses: a short
 * blur-travel rise. Keeping it in a single place is what makes the sections
 * feel like siblings, so changing it changes every section at once.
 *
 * The blur ends as `filter: none`, since even blur(0px) keeps the block on
 * an offscreen filter surface for the rest of the visit. Slow renderers
 * (lib/lite.ts) rise without the blur: animating it mid-scroll is what made
 * scrolling stutter in Firefox.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  margin = "0px 0px -12% 0px",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** how far into the viewport the content must be before it rises */
  margin?: `${string}px ${string}px ${string}% ${string}px`;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={`lite:filter-none! ${className ?? ""}`}
      initial={
        reducedMotion ? false : { opacity: 0, y: 26, filter: "blur(10px)" }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transitionEnd: { filter: "none" },
      }}
      viewport={{ once: true, margin }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        ease: EASE_OUT_QUINT,
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
