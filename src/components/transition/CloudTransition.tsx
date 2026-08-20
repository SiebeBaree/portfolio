"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EASE_EXPO_OUT } from "@/lib/timeline";

/*
 * The cloud page transition. Any component can call the navigate function
 * from useCloudNavigate(): clouds roll in from both edges and cover the
 * viewport, the route changes behind them, and once the new page is up the
 * same clouds part again. One deck the whole way, both directions, so the
 * sky never visibly "changes decks" mid-transition.
 *
 * Going back home gets two extra touches while the cover is up: the scroll
 * position from before the visit is restored, and a one-shot sessionStorage
 * flag tells the home page's CloudLayer to skip its intro (see
 * SKIP_INTRO_KEY, consumed in backdrop/CloudLayer.tsx), so the reveal shows
 * exactly the spot the reader left.
 *
 * Reduced motion skips the theatre and just navigates.
 */

/** consumed by backdrop/CloudLayer.tsx to skip the home intro once */
export const SKIP_INTRO_KEY = "sb-skip-cloud-intro";
const RETURN_SCROLL_KEY = "sb-return-scroll";

type Phase = "idle" | "cover" | "reveal";

const CloudNavigateContext = createContext<(href: string) => void>(() => {});

export function useCloudNavigate() {
  return useContext(CloudNavigateContext);
}

/*
 * Cloud clusters, mirrored across both edges. Each covers its half of the
 * viewport when parked at x=0 and waits off screen at its edge otherwise.
 * Layout mirrors the hero's CloudLayer language: soft radial puffs, one
 * static blur, transforms only.
 */
type Puff = {
  /** which edge it belongs to */
  side: -1 | 1;
  /** resting position while covering, vw / vh */
  x: number;
  y: number;
  /** cluster size, vw / vh */
  w: number;
  h: number;
  /** seconds of stagger inside the roll */
  delay: number;
};

const PUFFS: Puff[] = [
  { side: -1, x: -6, y: -12, w: 60, h: 44, delay: 0 },
  { side: -1, x: -10, y: 20, w: 64, h: 48, delay: 0.05 },
  { side: -1, x: -8, y: 55, w: 62, h: 46, delay: 0.02 },
  { side: -1, x: -4, y: 82, w: 58, h: 40, delay: 0.07 },
  { side: 1, x: 46, y: -10, w: 62, h: 46, delay: 0.04 },
  { side: 1, x: 50, y: 24, w: 62, h: 46, delay: 0.01 },
  { side: 1, x: 44, y: 58, w: 64, h: 46, delay: 0.06 },
  { side: 1, x: 48, y: 84, w: 58, h: 40, delay: 0.03 },
  // centre fillers so the two fronts meet without a visible seam
  { side: -1, x: 22, y: 8, w: 56, h: 48, delay: 0.09 },
  { side: 1, x: 24, y: 44, w: 56, h: 50, delay: 0.1 },
  { side: -1, x: 20, y: 74, w: 56, h: 46, delay: 0.11 },
];

const COVER_S = 0.8;
const REVEAL_S = 0.9;

function Cloud({ puff, phase }: { puff: Puff; phase: Phase }) {
  const off = `${puff.side * 130}vw`;
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${puff.x}vw`,
        top: `${puff.y}vh`,
        width: `${puff.w}vw`,
        height: `${puff.h}vh`,
        filter: "blur(4px)",
        willChange: "transform",
      }}
      initial={{ x: off }}
      animate={{ x: phase === "cover" ? "0vw" : off }}
      transition={{
        duration: phase === "cover" ? COVER_S : REVEAL_S,
        delay: puff.delay,
        ease: phase === "cover" ? EASE_EXPO_OUT : [0.5, 0, 0.8, 0.4],
      }}
    >
      {[
        [2, 30, 96, 64, 0.99],
        [10, 8, 48, 60, 0.97],
        [40, 0, 50, 66, 0.98],
        [58, 22, 40, 58, 0.96],
        [20, 40, 60, 58, 0.95],
      ].map(([l, t, w, h, o]) => (
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
              "radial-gradient(ellipse at 50% 45%, rgb(255 255 255 / 1) 0%, rgb(255 255 255 / 0.96) 48%, rgb(255 255 255 / 0.6) 62%, rgb(255 255 255 / 0) 72%)",
          }}
        />
      ))}
    </motion.div>
  );
}

export default function CloudTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const targetRef = useRef<string | null>(null);
  const pushedRef = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || targetRef.current) return;
      if (pathname === "/") {
        // remember where the reader left the home page
        sessionStorage.setItem(
          RETURN_SCROLL_KEY,
          String(Math.round(window.scrollY)),
        );
      }
      if (href === "/") {
        sessionStorage.setItem(SKIP_INTRO_KEY, "1");
      }
      if (reducedMotion) {
        router.push(href);
        return;
      }
      targetRef.current = href;
      pushedRef.current = false;
      setPhase("cover");
    },
    [pathname, reducedMotion, router],
  );

  // the sky is fully overcast: swap the page behind it
  useEffect(() => {
    if (phase !== "cover" || pushedRef.current || !targetRef.current) return;
    const timer = setTimeout(
      () => {
        pushedRef.current = true;
        const target = targetRef.current;
        if (target) {
          // going home we restore scroll by hand below, so keep the
          // router from jumping to the top first
          router.push(target, { scroll: target !== "/" });
        }
      },
      (COVER_S + 0.15) * 1000,
    );
    return () => clearTimeout(timer);
  }, [phase, router]);

  // the new route is live behind the cover: settle scroll, then part
  useEffect(() => {
    if (phase !== "cover" || !targetRef.current) return;
    if (pathname !== targetRef.current) return;
    if (pathname === "/") {
      const saved = sessionStorage.getItem(RETURN_SCROLL_KEY);
      if (saved) {
        sessionStorage.removeItem(RETURN_SCROLL_KEY);
        window.scrollTo({ top: Number(saved), behavior: "instant" });
      }
    }
    targetRef.current = null;
    setPhase("reveal");
  }, [pathname, phase]);

  // once parted, retire the overlay entirely
  useEffect(() => {
    if (phase !== "reveal") return;
    const timer = setTimeout(() => setPhase("idle"), (REVEAL_S + 0.25) * 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <CloudNavigateContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="cloud-transition"
            aria-hidden
            className="fixed inset-0 z-[80] overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {PUFFS.map((puff) => (
              <Cloud key={`${puff.x}:${puff.y}`} puff={puff} phase={phase} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </CloudNavigateContext.Provider>
  );
}
