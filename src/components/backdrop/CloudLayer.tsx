"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { onAmbientTick } from "@/lib/ambient-ticker";
import { EASE_EXPO_OUT, INTRO } from "@/lib/timeline";

/*
 * The cloud choreography, in three acts:
 *
 *  1. On load the viewport is overcast: every cloud sits at its "cover"
 *     position, scaled up and overlapping its neighbours, and scrolling is
 *     locked. There is no veil layer, a flat fading rectangle is exactly what
 *     made the old version look fake.
 *  2. The clouds part. Each glides to a "parked" position where it still
 *     peeks a third of the way into the viewport from its side, the fillers
 *     evaporate, and scrolling unlocks.
 *  3. As the reader scrolls the first viewport height, the parked clouds
 *     slide the rest of the way out through the left and right edges,
 *     smoothed by a spring so the motion never feels tied to wheel steps.
 *
 * Every cloud is a cluster of soft radial-gradient puffs, no images, with a
 * single static blur on the cluster so only transforms animate. Timing comes
 * from the shared timeline because the hero reveal is choreographed against
 * it.
 */

type CloudSpec = {
  /** which edge it retreats to */
  side: -1 | 1;
  /** parked position of the cluster's left edge, vw */
  x: number;
  /** parked position of the cluster's top edge, vh */
  y: number;
  /** cluster size, vw / vh */
  w: number;
  h: number;
  /** where it sits while covering the screen, relative to parked, vw/vh */
  coverDx: number;
  coverDy: number;
  /** how much further it slides out while scrolling, vw */
  exit: number;
  /** seconds; kept unequal between neighbours so bobbing never syncs */
  bob: number;
  /**
   * fillers plug the gaps in the overcast and evaporate while the deck
   * breaks up, so the whole layer thins naturally instead of a veil popping
   */
  filler?: boolean;
};

/*
 * Cover offsets are tuned so the scaled-up clouds tile the whole viewport at
 * t=0 with heavy overlap; the two fillers close the remaining bottom gaps
 * and evaporate as the deck parts.
 */
const CLOUDS: CloudSpec[] = [
  // left flank, top to bottom
  {
    side: -1,
    x: -26,
    y: -8,
    w: 44,
    h: 30,
    coverDx: 30,
    coverDy: 4,
    exit: 34,
    bob: 6.3,
  },
  {
    side: -1,
    x: -30,
    y: 26,
    w: 46,
    h: 32,
    coverDx: 40,
    coverDy: 1,
    exit: 32,
    bob: 7.9,
  },
  {
    side: -1,
    x: -24,
    y: 58,
    w: 40,
    h: 30,
    coverDx: 35,
    coverDy: 2,
    exit: 30,
    bob: 7.1,
  },
  // right flank, top to bottom
  {
    side: 1,
    x: 82,
    y: -6,
    w: 44,
    h: 30,
    coverDx: -34,
    coverDy: 2,
    exit: 34,
    bob: 6.7,
  },
  {
    side: 1,
    x: 86,
    y: 28,
    w: 46,
    h: 34,
    coverDx: -42,
    coverDy: -2,
    exit: 32,
    bob: 8.4,
  },
  {
    side: 1,
    x: 80,
    y: 60,
    w: 42,
    h: 30,
    coverDx: -36,
    coverDy: 0,
    exit: 30,
    bob: 7.4,
  },
  // two strays that thicken the overcast mid-height, then leave fully
  {
    side: -1,
    x: -44,
    y: 12,
    w: 42,
    h: 30,
    coverDx: 41,
    coverDy: 6,
    exit: 26,
    bob: 6.9,
  },
  {
    side: 1,
    x: 102,
    y: 44,
    w: 42,
    h: 30,
    coverDx: -43,
    coverDy: 6,
    exit: 26,
    bob: 7.6,
  },
  // fillers for the bottom of the overcast; they fade out while retreating
  {
    side: -1,
    x: -60,
    y: 76,
    w: 46,
    h: 30,
    coverDx: 67,
    coverDy: 2,
    exit: 10,
    bob: 7.7,
    filler: true,
  },
  {
    side: 1,
    x: 110,
    y: 73,
    w: 46,
    h: 30,
    coverDx: -61,
    coverDy: 2,
    exit: 10,
    bob: 6.6,
    filler: true,
  },
];

/** puff layout inside a cluster: [left%, top%, width%, height%, opacity] */
const PUFFS: [number, number, number, number, number][] = [
  [2, 38, 96, 60, 0.98], // wide base
  [8, 18, 42, 56, 0.92],
  [34, 2, 46, 68, 0.96], // tall crown
  [62, 20, 34, 52, 0.9],
  [20, 30, 55, 60, 0.85],
];

function Cloud({
  spec,
  intro,
  scroll,
  offstage,
  mobile,
}: {
  spec: CloudSpec;
  intro: ReturnType<typeof useMotionValue<number>>;
  scroll: ReturnType<typeof useMotionValue<number>>;
  offstage: boolean;
  mobile: RefObject<boolean>;
}) {
  const reducedMotion = useReducedMotion();
  const bobRef = useRef<HTMLDivElement>(null);
  const x = useTransform([intro, scroll] as const, ([i, s]: number[]) => {
    // On phones a parked cloud covers most of the hero, so the intro
    // carries each one the whole way out instead of a third of the way.
    const out = mobile.current ? Math.max(i, s) : s;
    return `${spec.coverDx * (1 - i) + out * spec.exit * spec.side}vw`;
  });
  const y = useTransform(intro, (i) => `${spec.coverDy * (1 - i)}vh`);
  const scale = useTransform(intro, (i) => 1.4 - 0.4 * i);
  const fillerOpacity = useTransform(intro, [0.25, 0.6], [1, 0]);

  /*
   * The bob is stepped by the shared ambient ticker (lib/ambient-ticker.ts)
   * instead of an infinite CSS animation: ten bobbing blurred clouds kept
   * the compositor re-drawing them on every vsync. One 50ms step of an 8px,
   * 6-8s sway is a fraction of a pixel, so the motion reads the same. The
   * cosine reproduces the old ease-in-out alternate keyframes; offstage the
   * subscription drops entirely.
   */
  useEffect(() => {
    const el = bobRef.current;
    if (!el || reducedMotion || offstage) return;
    const t0 = performance.now();
    return onAmbientTick((now) => {
      const k = 0.5 - 0.5 * Math.cos(((now - t0) / 1000 / spec.bob) * Math.PI);
      el.style.transform = `translateY(${-3 * k}%)`;
    });
  }, [reducedMotion, offstage, spec.bob]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${spec.x}vw`,
        top: `${spec.y}vh`,
        width: `${spec.w}vw`,
        height: `${spec.h}vh`,
        x,
        y,
        scale,
        opacity: spec.filler ? fillerOpacity : 1,
        filter: "blur(4px)",
        willChange: "transform",
      }}
    >
      <div ref={bobRef} className="relative h-full w-full">
        {PUFFS.map(([l, t, w, h, o]) => (
          <div
            key={`${l}:${t}`}
            className="absolute rounded-full"
            style={{
              left: `${l}%`,
              top: `${t}%`,
              width: `${w}%`,
              height: `${h}%`,
              opacity: o,
              background:
                "radial-gradient(ellipse at 50% 42%, rgb(255 255 255 / 0.98) 0%, rgb(255 255 255 / 0.92) 44%, rgb(255 255 255 / 0.55) 58%, rgb(255 255 255 / 0) 70%)",
            }}
          />
        ))}
        {/* soft blue underside so the cloud reads as lit from above */}
        <div
          className="absolute rounded-full"
          style={{
            left: "14%",
            top: "62%",
            width: "72%",
            height: "34%",
            background:
              "radial-gradient(ellipse at 50% 60%, rgb(178 200 228 / 0.5) 0%, rgb(178 200 228 / 0) 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}

/*
 * Once the reader has come back to the home page through the cloud page
 * transition, the intro stays retired for the rest of the SPA session
 * (browser-back included). Module scope on purpose: it must survive React
 * strict-mode's double effect run, which would otherwise consume the
 * sessionStorage flag once and replay the intro on the second run.
 */
let introRetired = false;

export default function CloudLayer() {
  const reducedMotion = useReducedMotion();
  const intro = useMotionValue(0);

  // scroll progress over the first ~85% of a viewport, smoothed by a spring
  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, (v) => {
    // scrollY can be undefined before the first measurement; window is
    // missing during SSR — both must resolve to 0 so hydration matches.
    if (typeof window === "undefined" || !Number.isFinite(v)) return 0;
    return Math.min(1, Math.max(0, v / (window.innerHeight * 0.85)));
  });
  const scroll = useSpring(rawProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.6,
  });

  /*
   * Once the deck has fully slid out (scroll progress settled at 1), hide
   * the layer and drop the bob subscriptions so ten blurred cloud surfaces
   * stop costing compositor time for the whole rest of the page. Hysteresis
   * so the spring jittering around 1 can't flicker the layer.
   */
  const [offstage, setOffstage] = useState(false);
  useMotionValueEvent(scroll, "change", (v) => {
    setOffstage((prev) => (prev ? v > 0.98 : v >= 0.995));
  });

  /*
   * On phones the clouds leave for good: the intro already slid them fully
   * out (see the x transform in Cloud), so once it ends the whole layer
   * retires instead of waiting on scroll. A ref rather than state so the
   * per-cloud transforms can read it without re-rendering ten clouds.
   */
  const mobile = useRef(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    mobile.current = window.matchMedia("(max-width: 767px)").matches;
    const retire = () => {
      if (mobile.current) setGone(true);
    };

    if (reducedMotion) {
      intro.set(1);
      retire();
      return;
    }

    // Arriving through the cloud page transition (transition/
    // CloudTransition.tsx sets this flag): its own deck already covers the
    // viewport and parts by itself, and the reader's scroll position is
    // being restored, so skip the intro and its scroll lock instead of
    // replaying them over the restored position.
    if (sessionStorage.getItem("sb-skip-cloud-intro")) {
      sessionStorage.removeItem("sb-skip-cloud-intro");
      introRetired = true;
    }
    if (introRetired) {
      intro.set(1);
      retire();
      return;
    }

    window.scrollTo(0, 0);
    const html = document.documentElement;
    html.style.overflow = "hidden";

    const controls = animate(intro, 1, {
      duration: INTRO.cloudsDuration,
      delay: INTRO.cloudsStart,
      ease: EASE_EXPO_OUT,
      onComplete: () => {
        html.style.overflow = "";
        retire();
      },
    });

    return () => {
      controls.stop();
      html.style.overflow = "";
    };
  }, [reducedMotion, intro]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-40 overflow-hidden ${
        offstage || gone ? "invisible" : ""
      }`}
    >
      {CLOUDS.map((spec) => (
        <Cloud
          key={`${spec.x}:${spec.y}`}
          spec={spec}
          intro={intro}
          scroll={scroll}
          offstage={offstage || gone}
          mobile={mobile}
        />
      ))}
    </div>
  );
}
