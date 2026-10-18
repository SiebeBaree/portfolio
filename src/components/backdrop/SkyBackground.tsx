"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type RefObject, useEffect, useRef } from "react";
import { onAmbientTick } from "@/lib/ambient-ticker";

/*
 * The atmosphere behind everything, ported from the desktop app's canvas
 * backdrop: a cool blue canvas, heavily blurred white blobs drifting on
 * coprime-duration loops, and film grain over the lot.
 *
 * On the homepage the sky also tells the time. Scrolling is one afternoon
 * passing: every section below the hero marks itself with `data-hour`, the
 * sky measures where those sections sit and fades each hour in over the
 * last as its section arrives, so the light always matches what is on
 * screen. Pages without `data-hour` sections simply stay at midday. Layering
 * is document order: day wash, blobs, afternoon, golden hour, dusk, the sun,
 * night with its stars, then grain on top of everything.
 *
 * Only opacity and transforms change, and only on scroll. The blob drift is
 * stepped by the shared ambient ticker (lib/ambient-ticker.ts) rather than
 * run as infinite CSS animations: a backdrop that changes on every vsync
 * forces every backdrop-filter surface on the page (all the glass) to
 * re-blur at the display's full refresh rate, forever. Over 26-41s loops
 * one 50ms step moves a blob a fraction of a pixel, so the motion reads the
 * same while the glass re-blurs a fifth as often.
 */

export type Hour = "afternoon" | "golden" | "dusk" | "night";

/*
 * Each hour is a graded sky: a vertical gradient plus its own soft glows so
 * the light keeps some air once the white blobs dim. Dusk carries a violet
 * band between the blue and the ember so the blend never turns grey.
 */
const LAYERS: Record<Hour, string> = {
  afternoon: [
    "radial-gradient(80% 60% at 88% 96%, rgb(255 230 196 / 0.7) 0%, rgb(255 230 196 / 0) 70%)",
    "radial-gradient(60% 40% at 20% 10%, rgb(255 255 255 / 0.35) 0%, rgb(255 255 255 / 0) 70%)",
    "linear-gradient(180deg, #92bdec 0%, #a4c7ef 38%, #bcd3f1 62%, #e6dcd9 84%, #f8dcc0 100%)",
  ].join(","),
  golden: [
    "radial-gradient(70% 55% at 84% 72%, rgb(255 210 140 / 0.7) 0%, rgb(255 180 110 / 0) 70%)",
    "radial-gradient(110% 45% at 40% 104%, rgb(255 190 120 / 0.55) 0%, rgb(255 190 120 / 0) 70%)",
    "linear-gradient(180deg, #6c93cf 0%, #94a6d6 24%, #cfa7ab 50%, #efa880 72%, #f8b46e 88%, #fbc77a 100%)",
  ].join(","),
  dusk: [
    "radial-gradient(70% 38% at 80% 104%, rgb(255 138 76 / 0.85) 0%, rgb(255 120 70 / 0) 72%)",
    "linear-gradient(180deg, #0f173a 0%, #222656 28%, #433670 50%, #864a72 70%, #d26a5c 88%, #f08c56 100%)",
  ].join(","),
  night: [
    "radial-gradient(90% 30% at 50% 108%, rgb(70 60 120 / 0.55) 0%, rgb(70 60 120 / 0) 70%)",
    "linear-gradient(180deg, #03050f 0%, #070b20 40%, #0d1333 75%, #1a1a44 100%)",
  ].join(","),
};

/** the deepest night colour, also given to the canvas so overscroll stays dark */
const NIGHT_CANVAS = "#03050f";

// Same technique as the desktop app: an inline SVG turbulence filter whose
// alpha carries the noise over a flat blue-grey, so the grain never tints
// the canvas. Element opacity is the single strength knob.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.35 0 0 0 0 0.38 0 0 0 0 0.48 0 0 0 0.75 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

/*
 * Waypoint drifts with coprime durations so the blobs never resync; the
 * motion gusts instead of running on a conveyor belt. Each track is
 * [progress, x vw, y vh, scale], eased per segment like the CSS keyframes
 * these replaced.
 */
type Track = { duration: number; points: [number, number, number, number][] };

const TRACKS: Record<"a" | "b" | "c", Track> = {
  a: {
    duration: 26,
    points: [
      [0, 0, 0, 1],
      [0.3, 14, -9, 1.16],
      [0.55, -9, 11, 0.88],
      [0.8, 9, 4, 1.08],
      [1, 0, 0, 1],
    ],
  },
  b: {
    duration: 33,
    points: [
      [0, 0, 0, 1],
      [0.3, -13, 8, 0.86],
      [0.55, 11, -10, 1.18],
      [0.8, -6, -5, 1.04],
      [1, 0, 0, 1],
    ],
  },
  c: {
    duration: 41,
    points: [
      [0, 0, 0, 1],
      [0.3, 10, 12, 1.12],
      [0.55, -12, -7, 0.9],
      [0.8, 5, 9, 1.14],
      [1, 0, 0, 1],
    ],
  },
};

const BLOBS: { track: keyof typeof TRACKS; className: string }[] = [
  {
    track: "a",
    className: "-top-[14%] -left-[6%] size-[38rem] bg-white/95 blur-[80px]",
  },
  {
    track: "b",
    className: "top-[2%] -right-[10%] size-[42rem] bg-white/85 blur-[90px]",
  },
  {
    track: "c",
    className: "top-[34%] left-[34%] size-[32rem] bg-white/70 blur-[75px]",
  },
  {
    track: "b",
    className: "-bottom-[18%] -left-[8%] size-[34rem] bg-white/80 blur-[80px]",
  },
  {
    track: "a",
    className: "-right-[6%] -bottom-[12%] size-[30rem] bg-white/80 blur-[75px]",
  },
];

// indistinguishable from CSS ease-in-out on a blob this blurred and slow
const easeInOut = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);

function transformAt(track: Track, elapsedS: number): string {
  const t = (elapsedS / track.duration) % 1;
  const pts = track.points;
  let i = 1;
  while (i < pts.length - 1 && pts[i][0] < t) i++;
  const [t0, x0, y0, s0] = pts[i - 1];
  const [t1, x1, y1, s1] = pts[i];
  const k = easeInOut((t - t0) / (t1 - t0));
  const x = x0 + (x1 - x0) * k;
  const y = y0 + (y1 - y0) * k;
  const s = s0 + (s1 - s0) * k;
  return `translate3d(${x}vw, ${y}vh, 0) scale(${s})`;
}

/** a seeded star field, so server and client draw the same sky */
function stars() {
  let seed = 20031107;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: 180 }, (_, i) => {
    const big = i % 23 === 0;
    // denser overhead, thinning toward the city glow
    const y = rand() ** 1.6 * 72;
    return {
      x: rand() * 100,
      y,
      r: big ? 1.5 + rand() * 0.6 : 0.45 + rand() * 0.75,
      o: big ? 0.95 : 0.25 + rand() * 0.6,
      big,
    };
  });
}
const STARS = stars();

/** scroll ranges (px) over which each hour fades in, measured from the page */
type Ranges = Record<Hour, [number, number]>;
const NEVER: [number, number] = [1e9, 1e9 + 1];
const INITIAL: Ranges = {
  afternoon: NEVER,
  golden: NEVER,
  dusk: NEVER,
  night: NEVER,
};

function fade(y: number, [a, b]: [number, number]) {
  const t = Math.min(1, Math.max(0, (y - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function useHourOpacity(
  scrollY: MotionValue<number>,
  measured: MotionValue<number>,
  ranges: RefObject<Ranges>,
  hour: Hour,
) {
  // `measured` only exists to re-run the transform after a re-measure
  return useTransform([scrollY, measured], ([y]: number[]) =>
    Number.isFinite(y) ? fade(y, ranges.current[hour]) : 0,
  );
}

export default function SkyBackground() {
  const reducedMotion = useReducedMotion();
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollY } = useScroll();
  const ranges = useRef<Ranges>(INITIAL);
  const measured = useMotionValue(0);

  // Where each hour begins: as its section's top rises from the bottom of
  // the viewport to near the top, that hour fades in over the last one.
  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight;
      const next = { ...INITIAL };
      for (const el of document.querySelectorAll<HTMLElement>("[data-hour]")) {
        const hour = el.dataset.hour as Hour;
        const top = el.getBoundingClientRect().top + window.scrollY;
        next[hour] =
          hour === "afternoon"
            ? [top - vh * 0.95, top - vh * 0.15]
            : hour === "dusk"
              ? [top - vh, top - vh * 0.35]
              : [top - vh * 0.85, top - vh * 0.2];
      }
      ranges.current = next;
      measured.set(measured.get() + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [measured]);

  const afternoon = useHourOpacity(scrollY, measured, ranges, "afternoon");
  const golden = useHourOpacity(scrollY, measured, ranges, "golden");
  const dusk = useHourOpacity(scrollY, measured, ranges, "dusk");
  const night = useHourOpacity(scrollY, measured, ranges, "night");

  /*
   * Text that lives through a change of hour (the app strip, the scrollbar)
   * reads `--hour-dark` to fade from ink to cream. Written only while the
   * light is changing, and cleared when the page leaves.
   */
  useMotionValueEvent(dusk, "change", (v) => {
    document.documentElement.style.setProperty("--hour-dark", v.toFixed(3));
  });
  // at night the canvas turns dark too, so rubber-band overscroll past the
  // skyline shows night instead of the daytime canvas colour
  useMotionValueEvent(night, "change", (v) => {
    document.documentElement.style.backgroundColor =
      v > 0.5 ? NIGHT_CANVAS : "";
  });
  useEffect(() => {
    const html = document.documentElement;
    return () => {
      html.style.removeProperty("--hour-dark");
      html.style.backgroundColor = "";
    };
  }, []);

  // the white blobs read as haze by day and thin out as the light warms
  const blobOpacity = useTransform(
    [afternoon, golden],
    ([a, g]: number[]) => 1 - 0.3 * a - 0.45 * g,
  );

  // the grain thins as the sky darkens, so the night stays deep
  const grainOpacity = useTransform(
    [dusk, night],
    ([d, n]: number[]) => 0.9 - 0.3 * d - 0.35 * n,
  );

  /*
   * One sun for the whole afternoon: high on the right while the track
   * record is on screen (which is why every shadow there falls lower left),
   * down to right-centre for golden hour, then sinking below the bottom edge
   * through dusk. Paler while high, full strength once low.
   */
  const sunOpacity = useTransform(
    [afternoon, golden, night],
    ([a, g, n]: number[]) => Math.max(0.5 * a, g) * (1 - n),
  );
  const sunY = useTransform([scrollY, measured], ([y]: number[]) => {
    const r = ranges.current;
    if (!Number.isFinite(y) || r.golden === NEVER) return "-40vh";
    const along = (from: number, to: number) =>
      Math.min(1, Math.max(0, (y - from) / (to - from)));
    if (y < r.golden[0]) {
      return `${-40 + 32 * along(r.afternoon[0], r.golden[0])}vh`;
    }
    return `${-8 + 70 * along(r.golden[0], r.night[1])}vh`;
  });

  useEffect(() => {
    if (reducedMotion) return;
    const t0 = performance.now();
    return onAmbientTick((now) => {
      const elapsed = (now - t0) / 1000;
      blobsRef.current.forEach((el, i) => {
        if (el)
          el.style.transform = transformAt(TRACKS[BLOBS[i].track], elapsed);
      });
    });
  }, [reducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* the sky is brighter overhead, deeper toward the horizon; deep
          enough that the white light actually registers against it */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#aecff2_0%,#93bceb_48%,#83b0e6_100%)]" />

      <motion.div className="absolute inset-0" style={{ opacity: blobOpacity }}>
        {BLOBS.map((blob, i) => (
          <div
            key={blob.className}
            ref={(el) => {
              blobsRef.current[i] = el;
            }}
            className={`absolute rounded-full ${blob.className}`}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ opacity: afternoon, background: LAYERS.afternoon }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ opacity: golden, background: LAYERS.golden }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ opacity: dusk, background: LAYERS.dusk }}
      />

      {/* the low sun, seen through haze: no hard disc, just a hot core and its bloom */}
      <motion.div
        className="absolute top-[calc(58vh-40vmax)] right-[calc(18vw-40vmax)] size-[80vmax] mix-blend-screen"
        style={{ opacity: sunOpacity, y: sunY }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(255_244_214/0.95)_0%,rgb(255_228_176/0.85)_3%,rgb(255_210_140/0.6)_8%,rgb(255_170_100/0.32)_18%,rgb(255_140_90/0.12)_34%,rgb(255_130_80/0)_58%)]" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ opacity: night, background: LAYERS.night }}
      >
        {/* stars are absolutely placed dots, so they stay round at any aspect */}
        {STARS.map((s) => (
          <span
            key={`${s.x.toFixed(3)}:${s.y.toFixed(3)}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 2,
              opacity: s.o,
              boxShadow: s.big
                ? "0 0 6px 1px rgb(255 255 255 / 0.55)"
                : undefined,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: GRAIN, opacity: grainOpacity }}
      />
    </div>
  );
}
