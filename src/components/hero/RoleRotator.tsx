"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/*
 * One line, many hats. Cycles with the desktop app's blur-travel hand-off so
 * each role rises in while the previous one lifts away.
 */

const ROLES = [
  "Founder",
  "Software engineer",
  "AI enthusiast",
  "Karting driver",
  "Gym-goer",
  "Cook",
  "Builder",
];

const TRAVEL = 12;

export default function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      2400,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-5 w-full text-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROLES[index]}
          className="block w-full text-[11px] font-semibold tracking-[0.14em] text-muted uppercase"
          initial={{ y: TRAVEL, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -TRAVEL, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
