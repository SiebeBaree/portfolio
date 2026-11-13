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
import { type CSSProperties, type RefObject, useEffect, useRef } from "react";
import { onAmbientTick } from "@/lib/ambient-ticker";
import { isLite } from "@/lib/lite";

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
 * same while the glass re-blurs a fifth as often. On slow renderers
 * (lib/lite.ts) the blobs hold still: even stepped, their drift repaints
 * the whole screen 20 times a second.
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
// the canvas. Element opacity is the single strength knob. Slow renderers
// get public/grain.webp instead, the same tile rendered once to pixels:
// Firefox runs SVG filters on the CPU.
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

/*
 * Each blob is a white disc of `size` rem seen through a gaussian blur of
 * `blur` px. The blur is drawn as a radial gradient with the blurred disc's
 * falloff rather than a `filter: blur()`: a blur filter on a moving, scaling
 * element is recomputed every step, which Firefox does slowly, while a
 * gradient costs next to nothing and looks the same.
 */
const BLOBS: {
  track: keyof typeof TRACKS;
  className: string;
  size: number;
  alpha: number;
  blur: number;
}[] = [
  {
    track: "a",
    className: "-top-[14%] -left-[6%]",
    size: 38,
    alpha: 0.95,
    blur: 80,
  },
  {
    track: "b",
    className: "top-[2%] -right-[10%]",
    size: 42,
    alpha: 0.85,
    blur: 90,
  },
  {
    track: "c",
    className: "top-[34%] left-[34%]",
    size: 32,
    alpha: 0.7,
    blur: 75,
  },
  {
    track: "b",
    className: "-bottom-[18%] -left-[8%]",
    size: 34,
    alpha: 0.8,
    blur: 80,
  },
  {
    track: "a",
    className: "-right-[6%] -bottom-[12%]",
    size: 30,
    alpha: 0.8,
    blur: 75,
  },
];

/*
 * The edge of a gaussian-blurred disc: coverage at distance u standard
 * deviations outside the original edge, 0.5 * erfc(u / sqrt 2).
 */
const EDGE: [number, number][] = [
  [-2, 0.977],
  [-1.5, 0.933],
  [-1, 0.841],
  [-0.5, 0.691],
  [0, 0.5],
  [0.5, 0.309],
  [1, 0.159],
  [1.5, 0.067],
  [2, 0.023],
  [3, 0],
];

/** the blurred disc as a plain box: same centre, grown by the blur's reach */
function blobStyle({
  size,
  alpha,
  blur,
}: (typeof BLOBS)[number]): CSSProperties {
  const r = size * 8; // radius in px at the 16px rem the classes assumed
  const reach = 3 * blur;
  const outer = r + reach;
  // a disc's curvature pulls its blurred half-light point slightly inward
  const edge = r - (blur * blur) / (2 * r);
  const stops = EDGE.map(
    ([u, k]) =>
      `rgb(255 255 255 / ${(alpha * k).toFixed(3)}) ${(((edge + u * blur) / outer) * 100).toFixed(2)}%`,
  );
  return {
    width: outer * 2,
    height: outer * 2,
    margin: -reach,
    background: `radial-gradient(closest-side, rgb(255 255 255 / ${alpha}) 0%, ${stops.join(", ")})`,
  };
}

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

/*
 * On slow renderers (lib/lite.ts) the light changes in small steps instead
 * of on every scroll frame. Each change repaints the whole sky, which costs
 * whole frames when Firefox draws on the CPU; stepped, most scroll frames
 * leave the sky untouched, and steps this fine on light this soft read as a
 * continuous fade.
 */
const LITE_STEPS = 24;
const LITE_SUN_STEP_VH = 2;

function useHourOpacity(
  scrollY: MotionValue<number>,
  measured: MotionValue<number>,
  ranges: RefObject<Ranges>,
  lite: RefObject<boolean>,
  hour: Hour,
) {
  // `measured` only exists to re-run the transform after a re-measure
  return useTransform([scrollY, measured], ([y]: number[]) => {
    if (!Number.isFinite(y)) return 0;
    const v = fade(y, ranges.current[hour]);
    return lite.current ? Math.round(v * LITE_STEPS) / LITE_STEPS : v;
  });
}

/** visible only while showing and not buried under a fully opaque hour */
function useShown(
  opacity: MotionValue<number> | null,
  cover: MotionValue<number>,
  depth: number,
) {
  return useTransform(
    opacity ? [opacity, cover] : [cover],
    (values: number[]) => {
      const [o, c] = opacity ? values : [1, values[0]];
      return o > 0 && c <= depth ? "visible" : "hidden";
    },
  );
}

export default function SkyBackground() {
  const reducedMotion = useReducedMotion();
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollY } = useScroll();
  const ranges = useRef<Ranges>(INITIAL);
  const measured = useMotionValue(0);
  // read in an effect, so the server render and hydration always match
  const lite = useRef(false);

  // Where each hour begins: as its section's top rises from the bottom of
  // the viewport to near the top, that hour fades in over the last one.
  useEffect(() => {
    lite.current = isLite();
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

  const afternoon = useHourOpacity(
    scrollY,
    measured,
    ranges,
    lite,
    "afternoon",
  );
  const golden = useHourOpacity(scrollY, measured, ranges, lite, "golden");
  const dusk = useHourOpacity(scrollY, measured, ranges, lite, "dusk");
  const night = useHourOpacity(scrollY, measured, ranges, lite, "night");

  /*
   * Every hour's sky is opaque, so once one has fully faded in, everything
   * beneath it is invisible. Those layers are hidden outright rather than
   * left for the renderer to paint over: four full-screen gradients stacked
   * up was most of the cost of scrolling on a slow machine. `cover` is how
   * many layers deep the topmost opaque hour sits.
   */
  const cover = useTransform(
    [afternoon, golden, dusk, night],
    ([a, g, d, n]: number[]): number =>
      n >= 1 ? 4 : d >= 1 ? 3 : g >= 1 ? 2 : a >= 1 ? 1 : 0,
  );
  const dayShown = useShown(null, cover, 0);
  const afternoonShown = useShown(afternoon, cover, 1);
  const goldenShown = useShown(golden, cover, 2);
  const duskShown = useShown(dusk, cover, 3);
  const nightShown = useShown(night, cover, 4);

  /*
   * Text that lives through a change of hour (the app strip, the scrollbar)
   * reads `--hour-dark` to fade from ink to cream. Written only while the
   * light is changing, and cleared when the page leaves.
   */
  // Every write restyles the whole document (all of it inherits the
  // property), so it is rounded and only written when it actually moves.
  const hourDark = useRef("");
  useMotionValueEvent(dusk, "change", (v) => {
    const next = v.toFixed(2);
    if (next === hourDark.current) return;
    hourDark.current = next;
    document.documentElement.style.setProperty("--hour-dark", next);
  });
  // at night the canvas turns dark too, so rubber-band overscroll past the
  // skyline shows night instead of the daytime canvas colour
  const canvas = useRef("");
  useMotionValueEvent(night, "change", (v) => {
    const next = v > 0.5 ? NIGHT_CANVAS : "";
    if (next === canvas.current) return;
    canvas.current = next;
    document.documentElement.style.backgroundColor = next;
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
    const vh =
      y < r.golden[0]
        ? -40 + 32 * along(r.afternoon[0], r.golden[0])
        : -8 + 70 * along(r.golden[0], r.night[1]);
    return `${lite.current ? Math.round(vh / LITE_SUN_STEP_VH) * LITE_SUN_STEP_VH : vh}vh`;
  });
  const sunShown = useShown(sunOpacity, cover, 3);

  useEffect(() => {
    if (reducedMotion || isLite()) return;
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
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,#aecff2_0%,#93bceb_48%,#83b0e6_100%)]"
        style={{ visibility: dayShown }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ opacity: blobOpacity, visibility: dayShown }}
      >
        {BLOBS.map((blob, i) => (
          <div
            key={blob.className}
            ref={(el) => {
              blobsRef.current[i] = el;
            }}
            className={`absolute ${blob.className}`}
            style={blobStyle(blob)}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: afternoon,
          visibility: afternoonShown,
          background: LAYERS.afternoon,
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: golden,
          visibility: goldenShown,
          background: LAYERS.golden,
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: dusk,
          visibility: duskShown,
          background: LAYERS.dusk,
        }}
      />

      {/* the low sun, seen through haze: no hard disc, just a hot core and
          its bloom. Slow renderers skip the blend mode, which forces a
          read-back of the whole sky behind it */}
      <motion.div
        className="absolute top-[calc(58vh-40vmax)] right-[calc(18vw-40vmax)] size-[80vmax] mix-blend-screen lite:mix-blend-normal"
        style={{ opacity: sunOpacity, y: sunY, visibility: sunShown }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(255_244_214/0.95)_0%,rgb(255_228_176/0.85)_3%,rgb(255_210_140/0.6)_8%,rgb(255_170_100/0.32)_18%,rgb(255_140_90/0.12)_34%,rgb(255_130_80/0)_58%)]" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: night,
          visibility: nightShown,
          background: LAYERS.night,
        }}
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
        className="absolute inset-0 lite:bg-[url(/grain.webp)]!"
        style={{ backgroundImage: GRAIN, opacity: grainOpacity }}
      />
    </div>
  );
}
