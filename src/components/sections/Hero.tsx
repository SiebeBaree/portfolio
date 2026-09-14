"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { type CSSProperties, useEffect } from "react";
import AsciiSignature from "@/components/hero/AsciiSignature";
import Portrait from "@/components/hero/Portrait";
import { COINZ_STATS, ENKRYPTIFY_FUNDING } from "@/lib/projects";
import { EASE_EXPO_OUT, EASE_OUT_QUINT, INTRO } from "@/lib/timeline";

/*
 * The portrait dominates the hero: shoulders end exactly on the fold, and the
 * name sits at eye level. `FACE_H` is the single size the portrait, the name
 * gap and the name's vertical position are all derived from, so they can
 * never drift apart. (68svh tall unless the viewport is too narrow, then
 * width-constrained.)
 *
 * The three ratios below are measured off the photo's alpha channel and are
 * only true for the current cutout, so a new photo means re-measuring all
 * three. See `Portrait.tsx` for the source geometry.
 *
 * Reveal choreography, timed against the clouds via the shared timeline: the
 * name fades in whole, then the face rises from beneath the fold and pushes
 * the words apart, settling just after the clouds finish parting.
 */
const FACE_H = "var(--portrait-height)";
// eye line, as a share of the portrait height measured up from the fold
const EYE_LINE = 0.633;
// widest point of the head, as a share of the portrait height, plus the
// breathing room the words keep on either side of it
const HEAD_W = 0.483;
const HEAD_PAD = 0.06;
const GAP = HEAD_W + 2 * HEAD_PAD;

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const reveal = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion) {
      reveal.set(1);
      return;
    }
    const controls = animate(reveal, 1, {
      delay: INTRO.faceStart,
      duration: INTRO.faceDuration,
      ease: EASE_EXPO_OUT,
    });
    return () => controls.stop();
  }, [reducedMotion, reveal]);

  const faceY = useTransform(reveal, (v) => `${(1 - v) * 106}%`);
  // the gap starts as a normal word space and grows to clear the head, tracking
  // whichever of FACE_H's two terms is currently winning
  const gap = useTransform(
    reveal,
    (v) =>
      `calc(${(0.24 * (1 - v)).toFixed(4)}em + var(--portrait-height) * ${(GAP * v).toFixed(4)})`,
  );

  return (
    <section className="relative min-h-[max(100svh,740px)] overflow-hidden [--portrait-height:min(62svh,118vw)] md:min-h-[max(100svh,700px)] md:[--portrait-height:min(68svh,82vw)]">
      {/* Identity stays visible while the portrait enters. */}
      <motion.header
        className="absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-2 px-6 pt-6 text-center"
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.9,
          ease: EASE_OUT_QUINT,
          delay: reducedMotion ? 0 : INTRO.topBarStart,
        }}
      >
        <AsciiSignature />
        <p className="mt-3 max-w-2xl font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tight">
          I&apos;m looking for a co-founder.
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/80 sm:text-base">
          I built Coinz to {COINZ_STATS.users} users and raised{" "}
          {ENKRYPTIFY_FUNDING} for Enkryptify. I&apos;d love to meet someone to
          start a new company with.
        </p>
        <a
          href="#contact"
          className="focus-ring mt-2 border-b border-ink/30 pb-1 text-xs text-ink/80 transition-colors hover:text-accent"
        >
          San Francisco · Three weeks in January{" "}
          <span aria-hidden="true">↗</span>
        </a>
      </motion.header>

      {/* the face, rising from beneath the fold */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ height: FACE_H, y: faceY }}
      >
        <Portrait className="h-full w-auto" />
      </motion.div>

      {/* the name: parted by the face on desktop, resting above it on phones,
          where a split name would crowd the narrow head. Both positions live
          in variables so the breakpoint can switch them without duplicating
          the geometry. */}
      <div
        className="absolute inset-x-0 z-10 -translate-y-1/2 top-[var(--name-top-phone)] md:top-[var(--name-top)]"
        style={
          {
            "--name-top": `calc(100% - ${EYE_LINE} * ${FACE_H})`,
            "--name-top-phone": `calc(100% - ${FACE_H} - 2.4rem)`,
          } as CSSProperties
        }
      >
        <motion.h1
          className="flex items-center justify-center font-display leading-none tracking-tight text-ink max-md:gap-x-[0.24em]"
          style={{ fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)" }}
          initial={reducedMotion ? false : { opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: reducedMotion ? 0 : INTRO.nameDuration,
            ease: EASE_OUT_QUINT,
            delay: reducedMotion ? 0 : INTRO.nameStart,
          }}
        >
          <span>Siebe</span>
          {/* the growing gap only exists where the face parts the words */}
          <motion.span
            aria-hidden
            className="inline-block max-md:hidden"
            style={{ width: gap }}
          />
          <span>Barée</span>
        </motion.h1>
      </div>
    </section>
  );
}
