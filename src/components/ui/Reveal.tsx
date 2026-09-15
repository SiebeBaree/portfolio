"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_QUINT } from "@/lib/timeline";

/*
 * SHARED. The one scroll-reveal treatment the whole site uses: a short
 * blur-travel rise. Keeping it in a single place is what makes the sections
 * feel like siblings, so changing it changes every section at once.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reducedMotion ? false : { opacity: 0, y: 26, filter: "blur(10px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
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
