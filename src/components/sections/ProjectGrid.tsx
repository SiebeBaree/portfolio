"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useCloudNavigate } from "@/components/transition/CloudTransition";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectLogo from "@/components/ui/ProjectLogo";
import Reveal from "@/components/ui/Reveal";
import { PROJECTS, type Project } from "@/lib/projects";

/*
 * Previous work as a bento grid. (The bookshelf take on this section is
 * archived, still in PreviousWork.tsx, just no longer referenced.)
 *
 * The signature move is the card outline: not a plain rounded rectangle but
 * a shape with a stepped notch carved out of one corner, joined by smooth
 * S-ramps, the way race-driver sites frame their panels. The year label
 * lives inside that notch, outside the glass. Because the outline is a
 * custom path, the glass fill is a clip-path'd div (clip keeps the backdrop
 * blur working) and the border is the same path stroked in an SVG on top.
 *
 * Card area follows Siebe's own significance rating (projects.ts weight):
 * the desktop layout below hand-tiles all seventeen projects onto a 12x10
 * board with no holes, big projects big, experiments small, one shared
 * type size everywhere. On mobile it collapses to a two-column flow where
 * heavyweights span both columns.
 *
 * Every card is a link to /work/<slug>; clicking rolls the clouds in and
 * navigates behind them. Hover lifts the card, brightens the glass and
 * slides in an arrow chip so it always reads as clickable.
 */

/*
 * Which corner the notch is carved from. Only the two right-hand corners:
 * a bottom-LEFT notch would have to push its card's name up out of the way,
 * breaking the shared baseline across a row.
 */
type Corner = "br" | "tr";

/*
 * Desktop placement on a 12-column board, newest first. Reading order (left
 * to right, top to bottom) IS the timeline: every band below is one era, and
 * inside a band the WIDTH carries significance. Every card is the same two
 * rows tall, because a card taller than its content just reads as a big
 * empty pane.
 */
const LAYOUT: Record<string, { area: string; corner: Corner }> = {
  // 2026, closed off by the smaller of the 2024 pair so the band fills
  jarvis: { area: "1 / 1 / 3 / 5", corner: "br" },
  karting: { area: "1 / 5 / 3 / 9", corner: "tr" },
  habitflow: { area: "1 / 9 / 3 / 13", corner: "br" },
  // 2024 into 2023: EEVEE anchors the band at Coinz's width (both rated 3)
  // now that Enkryptify lives up in Currently building instead of here
  "eevee-mobility": { area: "3 / 1 / 5 / 7", corner: "br" },
  tickr: { area: "3 / 7 / 5 / 10", corner: "tr" },
  gymlyfe: { area: "3 / 10 / 5 / 13", corner: "br" },
  // 2023 into 2022
  "you-owe-me": { area: "5 / 1 / 7 / 4", corner: "br" },
  coinz: { area: "5 / 4 / 7 / 10", corner: "tr" },
  siebegpt: { area: "5 / 10 / 7 / 13", corner: "br" },
  // 2022 into 2021
  invitemanager: { area: "7 / 1 / 9 / 4", corner: "br" },
  bigben: { area: "7 / 4 / 9 / 7", corner: "tr" },
  icount: { area: "7 / 7 / 9 / 10", corner: "br" },
  gameout: { area: "7 / 10 / 9 / 13", corner: "tr" },
  // 2021 back to where it started, 2013
  aquasolutions: { area: "9 / 1 / 11 / 4", corner: "br" },
  bothosted: { area: "9 / 4 / 11 / 7", corner: "tr" },
  maxerg: { area: "9 / 7 / 11 / 10", corner: "br" },
  bookmarks: { area: "9 / 10 / 11 / 13", corner: "tr" },
};

/*
 * Mobile spans for the two-column flow. Date order rules, so the grid can
 * not reflow cards to fill gaps: instead, whenever a full-width card would
 * leave a single card stranded beside a hole, that stranded card is widened
 * to close the row. Same for a lone card at the very end.
 */
const MOBILE_SPANS = (() => {
  const spans = PROJECTS.map((p) => (p.weight >= 3 ? 2 : 1));
  let col = 0;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i] === 2 && col === 1) {
      spans[i - 1] = 2;
      col = 0;
    }
    col = spans[i] === 2 ? 0 : (col + 1) % 2;
  }
  if (col === 1) spans[spans.length - 1] = 2;
  return spans;
})();

/** the click affordance: it arrives on hover, in the corner opposite the notch */
function ArrowChip({ corner }: { corner: Corner }) {
  return (
    <span
      aria-hidden
      className={`absolute grid h-8 w-8 translate-y-1 place-items-center rounded-full border border-white/80 bg-white/70 text-ink opacity-0 shadow-[0_8px_16px_-8px_rgb(28_41_90/0.3)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
        corner === "tr" ? "right-5 bottom-5" : "top-5 right-5"
      }`}
    >
      <svg viewBox="0 0 12 12" fill="none" className="h-3.5 w-3.5" aria-hidden>
        <path
          d="M3 9 L9 3 M4.5 3 H9 V7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** notch geometry, in px of the measured card */
const NOTCH_W = 104;
const NOTCH_H = 36;
const RADIUS = 18;
const RAMP = 16;

/*
 * The card outline, clockwise from the top-left. The notch is a rectangle
 * removed from one corner, entered and left through S-curves so the border
 * never has a hard step.
 */
function cardPath(w: number, h: number, corner: Corner): string {
  const r = RADIUS;
  const nw = Math.min(NOTCH_W, w * 0.5);
  const nh = NOTCH_H;
  const s = RAMP;
  if (corner === "br") {
    return [
      `M ${r} 0`,
      `H ${w - r}`,
      `Q ${w} 0 ${w} ${r}`,
      `V ${h - nh - r}`,
      `Q ${w} ${h - nh} ${w - r} ${h - nh}`,
      `H ${w - nw + s}`,
      `C ${w - nw} ${h - nh} ${w - nw} ${h} ${w - nw - s} ${h}`,
      `H ${r}`,
      `Q 0 ${h} 0 ${h - r}`,
      `V ${r}`,
      `Q 0 0 ${r} 0`,
      "Z",
    ].join(" ");
  }
  // tr: the notch sits on the card's right shoulder
  return [
    `M ${r} 0`,
    `H ${w - nw - s}`,
    `C ${w - nw} 0 ${w - nw} ${nh} ${w - nw + s} ${nh}`,
    `H ${w - r}`,
    `Q ${w} ${nh} ${w} ${nh + r}`,
    `V ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `H ${r}`,
    `Q 0 ${h} 0 ${h - r}`,
    `V ${r}`,
    `Q 0 0 ${r} 0`,
    "Z",
  ].join(" ");
}

function ProjectCard({
  project,
  corner,
}: {
  project: Project;
  corner: Corner;
}) {
  const navigate = useCloudNavigate();
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const href = `/work/${project.slug}`;
  const d = size ? cardPath(size.w, size.h, corner) : null;

  /* the year label sits inside the notch, outside the glass */
  const labelPos =
    corner === "br" ? "right-4 bottom-0 h-[36px]" : "right-4 top-0 h-[36px]";

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={`${project.title}, started in ${project.year}. Open the project page.`}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      onMouseEnter={() => router.prefetch(href)}
      className="focus-ring group relative block h-full cursor-pointer"
      whileHover={{ y: -4 }}
      whileTap={{ y: -1, scale: 0.995 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      {d && size && (
        <>
          {/* glass fill, clipped to the notched outline */}
          <span
            aria-hidden
            className="absolute inset-0 block bg-[rgb(255_255_255/0.5)] transition-colors duration-300 group-hover:bg-[rgb(255_255_255/0.85)]"
            style={{
              clipPath: `path("${d}")`,
              backdropFilter: "blur(24px) saturate(170%)",
              filter: "drop-shadow(0 14px 22px rgb(28 41 90 / 0.13))",
            }}
          />
          {/* the border, drawn along the same path */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${size.w} ${size.h}`}
            preserveAspectRatio="none"
          >
            <path
              d={d}
              fill="none"
              stroke="var(--sky-glass-edge)"
              strokeWidth="1.5"
              className="transition-[stroke] duration-300 group-hover:stroke-[rgb(255_255_255/0.95)]"
            />
          </svg>
        </>
      )}

      {/*
       * Card content sits as ONE block in the bottom-left, logo above name.
       * Pinning the logo to the top and the name to the bottom instead left
       * a void down the middle of every big card. The arrow chip floats in
       * the corner opposite the notch, so it can never crowd either.
       *
       * On phones the cards are too narrow to give the name a notch-wide
       * right padding, which was wrapping every word of a short title onto
       * its own line and pushing one-word titles out of the glass. Below md
       * the name clears the notch vertically instead (the extra bottom
       * padding lifts it above the notch band) so it can run nearly the full
       * card width, one size smaller.
       */}
      <span className="relative flex h-full flex-col justify-end p-5 max-md:pb-11">
        <ProjectLogo project={project} className="h-9 w-9" size={36} />
        <span
          className={`mt-3 pr-1 font-display text-lg tracking-tight text-ink sm:text-xl md:text-2xl ${
            corner === "br" ? "md:pr-20" : "md:pr-11"
          }`}
        >
          {project.title}
        </span>
        <ArrowChip corner={corner} />
      </span>

      {/* the year, living in the notch */}
      <span
        className={`absolute ${labelPos} flex items-center gap-1.5 text-[12px] font-medium text-ink/70 transition-colors duration-300 group-hover:text-ink`}
      >
        <span className="text-muted/80">est.</span>
        {project.year}
      </span>
    </motion.a>
  );
}

export default function ProjectGrid() {
  return (
    <section
      id="work"
      className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10"
    >
      <Reveal>
        <Eyebrow>Previous work</Eyebrow>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
          The story so far.
        </h2>
      </Reveal>

      {/*
       * Two columns on mobile, the date-ordered board above md. Every card
       * spans two rows so none of them can end up cramped; the heavyweights
       * take the full width on mobile.
       */}
      <div className="mt-12 grid auto-rows-[5.1rem] grid-cols-2 gap-3 md:grid-cols-12">
        {PROJECTS.map((project, i) => {
          const layout = LAYOUT[project.slug];
          return (
            <div
              key={project.slug}
              className={`row-span-2 ${
                MOBILE_SPANS[i] === 2 ? "col-span-2" : ""
              } md:[grid-area:var(--area)]`}
              style={{ "--area": layout.area } as CSSProperties}
            >
              <Reveal className="h-full" delay={0.05 + (i % 8) * 0.04}>
                <ProjectCard project={project} corner={layout.corner} />
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
