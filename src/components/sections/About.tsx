"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Reveal from "@/components/ui/Reveal";
import { onAmbientTick } from "@/lib/ambient-ticker";

/** Personal illustrations appear only while their word is hovered or focused. */
const INK = "#1c2333";

function BenchPress() {
  const armUp = "M66 54 L68 42 L70 30";
  const armDown = "M66 54 L76 50 L70 44";
  const rep = {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
    times: [0, 0.45, 1],
  };
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 130"
      className="block w-[190px]"
      style={{
        color: INK,
        filter: "drop-shadow(0 10px 22px rgb(28 41 90 / 0.32))",
      }}
    >
      {/* the cloud, opaque like the ones drifting through the hero */}
      <g fill="#fff">
        <circle cx="98" cy="46" r="32" />
        <circle cx="60" cy="62" r="27" />
        <circle cx="140" cy="60" r="29" />
        <circle cx="36" cy="86" r="21" />
        <circle cx="165" cy="87" r="22" />
        <rect x="22" y="72" width="158" height="40" rx="19" />
      </g>
      {/* soft blue underside so it reads as lit from above */}
      <ellipse
        cx="100"
        cy="104"
        rx="64"
        ry="10"
        fill="rgb(178 200 228 / 0.4)"
      />
      {/* the scene, standing on the cloud */}
      <g transform="translate(26 14)">
        {/* bench */}
        <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
          <path d="M44 63 L112 63" />
          <path d="M52 63 L52 82 M102 63 L102 82" />
        </g>
        {/* lifter */}
        <g
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        >
          <circle cx="55" cy="55" r="5.5" />
          <path d="M63 56 L94 57 L106 68 L106 82" strokeLinejoin="round" />
          <motion.path
            d={armUp}
            strokeLinejoin="round"
            animate={{ d: [armUp, armDown, armUp] }}
            transition={rep}
          />
        </g>
        {/* the bar, seen end-on: plates around the grip */}
        <motion.g animate={{ y: [0, 14, 0] }} transition={rep}>
          <circle
            cx="70"
            cy="30"
            r="11"
            fill="#fff"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle
            cx="70"
            cy="30"
            r="6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
          />
          <circle cx="70" cy="30" r="2.2" fill="currentColor" />
        </motion.g>
      </g>
    </svg>
  );
}

/*
 * A top-down kart circuit: bottom straight into a hairpin, a chicane through
 * the middle, a top straight and an S back down to the start line. Karts are
 * placed by hand every animation frame with getPointAtLength, because CSS
 * offset-path resolved against the transformed popover and SMIL timelines
 * start late for freshly mounted SVGs; this way they are on track from the
 * very first paint.
 */
const TRACK =
  "M 36 138 L 150 138 C 196 138 196 102 160 98 C 135 95 130 80 155 72 C 185 64 188 36 152 30 L 70 30 C 38 30 34 52 60 60 C 80 66 78 84 52 88 C 26 92 22 120 36 138 Z";

const KARTS = [
  { color: "#d64541", duration: 6.2, offset: 0, lane: -3.2 },
  { color: "#3164e4", duration: 6.6, offset: 0.38, lane: 3.2 },
  { color: "#1c2333", duration: 7.1, offset: 0.72, lane: 0 },
];

function KartTrack() {
  const pathRef = useRef<SVGPathElement>(null);
  const kartRefs = useRef<(SVGGElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const place = (elapsed: number) => {
      KARTS.forEach((kart, i) => {
        const g = kartRefs.current[i];
        if (!g) return;
        const d = ((elapsed / kart.duration + kart.offset) % 1) * len;
        const p = path.getPointAtLength(d);
        const q = path.getPointAtLength((d + 2) % len);
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const norm = Math.hypot(dx, dy) || 1;
        g.setAttribute(
          "transform",
          `translate(${p.x - (dy / norm) * kart.lane} ${p.y + (dx / norm) * kart.lane}) rotate(${(Math.atan2(dy, dx) * 180) / Math.PI})`,
        );
      });
    };
    place(0);
    if (reducedMotion) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      place((now - t0) / 1000);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <svg
      viewBox="0 0 240 160"
      className="block h-[160px] w-[240px]"
      aria-hidden
      style={{ filter: "drop-shadow(0 10px 20px rgb(28 41 90 / 0.3))" }}
    >
      <defs>
        <pattern
          id="kart-finish"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="6" height="6" fill="#fff" />
          <rect width="3" height="3" fill="#1c2333" />
          <rect x="3" y="3" width="3" height="3" fill="#1c2333" />
        </pattern>
      </defs>
      {/* kerb, asphalt, racing line */}
      <path
        d={TRACK}
        fill="none"
        stroke="#d64541"
        strokeWidth="21"
        strokeDasharray="7 7"
        strokeLinejoin="round"
      />
      <path
        d={TRACK}
        fill="none"
        stroke="#4b5364"
        strokeWidth="18"
        strokeLinejoin="round"
      />
      <path
        d={TRACK}
        fill="none"
        stroke="rgb(255 255 255 / 0.45)"
        strokeWidth="1.5"
        strokeDasharray="7 8"
      />
      {/* the finish line crosses the bottom straight */}
      <rect x="66" y="128" width="7" height="20" fill="url(#kart-finish)" />
      <path ref={pathRef} d={TRACK} fill="none" stroke="none" />
      {KARTS.map((kart, i) => (
        <g
          key={kart.color}
          ref={(el) => {
            kartRefs.current[i] = el;
          }}
        >
          <rect
            x="-7.5"
            y="-6"
            width="4.5"
            height="12"
            rx="1"
            fill="rgb(0 0 0 / 0.5)"
          />
          <rect
            x="3.5"
            y="-5.5"
            width="4"
            height="11"
            rx="1"
            fill="rgb(0 0 0 / 0.5)"
          />
          <rect
            x="-7.5"
            y="-4.5"
            width="15"
            height="9"
            rx="3.5"
            fill={kart.color}
          />
          <circle cx="1.5" cy="0" r="2.6" fill="rgb(255 255 255 / 0.9)" />
        </g>
      ))}
    </svg>
  );
}

/*
 * The flag is drawn rather than typed: the emoji falls back to the letters
 * "BE" on most Windows builds, which looks broken next to the rest.
 */
function BelgianFlag() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 15 10"
      className="ml-[0.3em] inline-block h-[0.62em] w-[0.93em] align-baseline"
      style={{ filter: "drop-shadow(0 1px 1.5px rgb(28 41 90 / 0.3))" }}
    >
      <defs>
        <clipPath id="be-flag">
          <rect width="15" height="10" rx="1.6" />
        </clipPath>
      </defs>
      <g clipPath="url(#be-flag)">
        <rect width="5" height="10" fill="#2d2a26" />
        <rect x="5" width="5" height="10" fill="#f7c53d" />
        <rect x="10" width="5" height="10" fill="#e8383d" />
      </g>
      <rect
        width="15"
        height="10"
        rx="1.6"
        fill="none"
        stroke="rgb(28 41 90 / 0.25)"
        strokeWidth="0.9"
      />
    </svg>
  );
}

/*
 * The best of Belgium, in the only three forms that matter: a striped cone of
 * fries, a Liege waffle under a dusting of sugar and a broken bar of
 * chocolate. Each one springs up on its own beat and then keeps bobbing, so
 * even a quick hover catches them moving.
 */
const TREAT_FLOAT = {
  transformBox: "fill-box",
  transformOrigin: "50% 50%",
} as const;

function BelgianTreats() {
  const spring = { type: "spring", stiffness: 420, damping: 17 } as const;
  const pop = {
    initial: { opacity: 0, y: 20, scale: 0.55 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 168"
      className="block w-[236px]"
      style={{ filter: "drop-shadow(0 12px 24px rgb(28 41 90 / 0.32))" }}
    >
      <defs>
        <clipPath id="be-cone">
          <path d="M-19 -58 L19 -58 L3.6 -3 Q0 2 -3.6 -3 Z" />
        </clipPath>
      </defs>

      {/* the same opaque cloud the bench stands on, so the treats have a stage */}
      <g fill="#fff">
        <circle cx="120" cy="62" r="42" />
        <circle cx="68" cy="80" r="34" />
        <circle cx="172" cy="78" r="36" />
        <circle cx="38" cy="110" r="26" />
        <circle cx="202" cy="110" r="27" />
        <rect x="24" y="92" width="192" height="48" rx="24" />
      </g>
      <ellipse
        cx="120"
        cy="132"
        rx="78"
        ry="11"
        fill="rgb(178 200 228 / 0.4)"
      />

      {/* fries, in the striped paper cone every Belgian street corner sells */}
      <motion.g
        {...pop}
        transition={{ ...spring, delay: 0.02 }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
      >
        <motion.g
          animate={{ y: [0, -5, 0], rotate: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        >
          <g transform="translate(58 126) scale(0.78)">
            {/* the sticks first, so the cone hides where they end */}
            <g
              fill="#f2bd52"
              stroke="#c2831f"
              strokeWidth="2.6"
              strokeLinejoin="round"
            >
              <rect
                x="-3.5"
                y="-23"
                width="7"
                height="46"
                rx="3"
                transform="translate(-13 -70) rotate(-15)"
              />
              <rect
                x="-3.5"
                y="-23"
                width="7"
                height="46"
                rx="3"
                transform="translate(-4 -78) rotate(-5)"
              />
              <rect
                x="-3.5"
                y="-23"
                width="7"
                height="46"
                rx="3"
                transform="translate(6 -75) rotate(7)"
              />
              <rect
                x="-3.5"
                y="-23"
                width="7"
                height="46"
                rx="3"
                transform="translate(15 -66) rotate(20)"
              />
            </g>
            <path
              d="M-19 -58 L19 -58 L3.6 -3 Q0 2 -3.6 -3 Z"
              fill="#fff"
              strokeLinejoin="round"
            />
            {/* stripes that taper with the paper instead of pooling at the tip */}
            <g clipPath="url(#be-cone)" fill="#d64541">
              <path d="M-17.5 -58 L-10.6 -58 L-2 -1 L-3.3 -1 Z" />
              <path d="M-3.4 -58 L3.4 -58 L0.65 -1 L-0.65 -1 Z" />
              <path d="M10.6 -58 L17.5 -58 L3.3 -1 L2 -1 Z" />
            </g>
            <path
              d="M-19 -58 L19 -58 L3.6 -3 Q0 2 -3.6 -3 Z"
              fill="none"
              stroke={INK}
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
            {/* the rolled rim of the cone */}
            <path
              d="M-19 -58 L19 -58"
              stroke={INK}
              strokeWidth="3.6"
              strokeLinecap="round"
            />
          </g>
        </motion.g>
      </motion.g>

      {/* a Liege waffle, pockets and all */}
      <motion.g
        {...pop}
        transition={{ ...spring, delay: 0.1 }}
        style={TREAT_FLOAT}
      >
        <motion.g
          animate={{ y: [0, -6, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
          style={TREAT_FLOAT}
        >
          <g transform="translate(120 96) scale(0.85)">
            <rect
              x="-31"
              y="-26"
              width="62"
              height="52"
              rx="10"
              fill="#e7ab4f"
              stroke="#a4691f"
              strokeWidth="3.4"
            />
            <g fill="#c07f2c">
              {[-20, -6, 8].map((y) =>
                [-23, -7, 9].map((x) => (
                  <rect
                    key={`${x}:${y}`}
                    x={x}
                    y={y}
                    width="14"
                    height="12"
                    rx="2.5"
                  />
                )),
              )}
            </g>
            {/* icing sugar */}
            <g fill="rgb(255 255 255 / 0.75)">
              <circle cx="-18" cy="-21" r="1.4" />
              <circle cx="3" cy="-23" r="1.1" />
              <circle cx="19" cy="-13" r="1.3" />
              <circle cx="-23" cy="4" r="1.2" />
              <circle cx="11" cy="15" r="1.4" />
              <circle cx="-7" cy="21" r="1.1" />
            </g>
          </g>
        </motion.g>
      </motion.g>

      {/* chocolate, one piece already broken off */}
      <motion.g
        {...pop}
        transition={{ ...spring, delay: 0.18 }}
        style={TREAT_FLOAT}
      >
        <motion.g
          animate={{ y: [0, -4.5, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={TREAT_FLOAT}
        >
          <g transform="translate(182 102) scale(0.8)">
            <rect
              x="-22.5"
              y="-27.5"
              width="45"
              height="55"
              rx="5"
              fill="#3f2312"
            />
            {[-24.5, -7.5, 9.5].map((y) =>
              [-19.5, 1.5].map((x) => (
                <g key={`${x}:${y}`}>
                  <rect
                    x={x}
                    y={y}
                    width="18"
                    height="15"
                    rx="2.5"
                    fill="#6f4322"
                  />
                  <rect
                    x={x + 2}
                    y={y + 2}
                    width="14"
                    height="2.5"
                    rx="1.25"
                    fill="rgb(255 255 255 / 0.16)"
                  />
                </g>
              )),
            )}
            {/* the broken piece, hovering just off the bar */}
            <g transform="translate(25 -35)">
              <motion.g
                animate={{ y: [0, -4, 0], rotate: [13, 23, 13] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={TREAT_FLOAT}
              >
                <rect
                  x="-9"
                  y="-7.5"
                  width="18"
                  height="15"
                  rx="2.5"
                  fill="#6f4322"
                  stroke="#3f2312"
                  strokeWidth="3"
                />
                <rect
                  x="-7"
                  y="-5.5"
                  width="14"
                  height="2.5"
                  rx="1.25"
                  fill="rgb(255 255 255 / 0.16)"
                />
              </motion.g>
            </g>
          </g>
        </motion.g>
      </motion.g>
    </svg>
  );
}

/* ---------- the hover wiring ---------- */

const SCENES = {
  limburg: BelgianTreats,
  gym: BenchPress,
  karting: KartTrack,
};

function Peek({
  kind,
  children,
}: {
  kind: keyof typeof SCENES;
  children: ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const reducedMotion = useReducedMotion();
  const Scene = SCENES[kind];
  return (
    <button
      type="button"
      aria-label={`Show ${kind} illustration`}
      className="focus-ring relative inline-block"
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={() => setHover(!hover)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="cursor-default underline decoration-ink/25 decoration-dotted decoration-2 underline-offset-4 transition-colors duration-300 hover:decoration-[#c97e2a]/60">
        {children}
      </span>
      <AnimatePresence>
        {hover && !reducedMotion && (
          <motion.span
            className="pointer-events-none absolute bottom-full left-1/2 z-30 block pb-2"
            initial={{ opacity: 0, y: 10, scale: 0.85, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 6, scale: 0.92, x: "-50%" }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <Scene />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/*
 * A bird is two strokes, nothing more, so it reads as "distant bird" the way
 * the portrait reads as "Siebe". Each one glides on its own slow ellipse with
 * durations chosen to never sync up.
 *
 * The glide is stepped by the shared ambient ticker (lib/ambient-ticker.ts)
 * instead of a motion animation: motion runs its loop at the display's full
 * refresh rate on the main thread, which kept the whole page compositing at
 * 120Hz for four birds. One 50ms step of a 7px, 7-11s ellipse moves a bird
 * a twentieth of a pixel, so the motion reads the same. The cosine phase
 * reproduces the old [0, peak, 0] easeInOut keyframes exactly.
 */
function Bird({
  className,
  style,
  size,
  drift,
  duration,
  delay = 0,
  still,
}: {
  className?: string;
  style?: CSSProperties;
  size: number;
  drift: number;
  duration: number;
  delay?: number;
  still: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (still) {
      el.style.transform = "";
      return;
    }
    const t0 = performance.now() + delay * 1000;
    return onAmbientTick((now) => {
      const t = (now - t0) / 1000;
      if (t < 0) return;
      const k = 0.5 - 0.5 * Math.cos(((t % duration) / duration) * 2 * Math.PI);
      el.style.transform = `translate3d(${drift * k}px, ${-7 * k}px, 0)`;
    });
  }, [still, drift, duration, delay]);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 24 12"
      fill="none"
      className={className}
      style={{ width: size, ...style }}
    >
      <path
        d="M2 9 C5.5 3.5 9.5 3.5 12 7.5 C14.5 3.5 18.5 3.5 22 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function About() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  /*
   * The flock is mounted from page load, so without this gate its tickers
   * would keep stepping transforms even when About is screens away. Stilled
   * offscreen, gliding whenever the section is in the viewport. The margin
   * must be
   * NEGATIVE: sections stack flush, so at rest on the hero the section's top
   * edge already touches the viewport bottom, and any positive margin would
   * keep the flock flying a screen early. At -15% the glide starts once the
   * section owns the bottom sixth of the screen, well before the flock
   * itself (up beside the centered copy) scrolls in.
   */
  const inView = useInView(sectionRef, { margin: "-15% 0px -15% 0px" });
  const still = Boolean(reducedMotion) || !inView;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10"
    >
      <div className="relative">
        {/* the flock, scattered through the whitespace around the copy */}
        <Bird
          className="absolute -top-14 left-[6%] text-ink/45"
          size={26}
          drift={10}
          duration={9}
          still={still}
        />
        <Bird
          className="absolute -top-7 left-[16%] text-ink/30"
          size={16}
          drift={7}
          duration={7}
          delay={1.3}
          still={still}
        />
        <Bird
          className="absolute -top-20 right-[12%] text-ink/40"
          size={20}
          drift={-9}
          duration={11}
          delay={0.6}
          still={still}
        />
        <Bird
          className="absolute -bottom-16 right-[7%] text-ink/35"
          size={22}
          drift={-8}
          duration={8.5}
          delay={2.1}
          still={still}
        />

        <Reveal>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
            A little about me.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-xl space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
            <p>
              I&apos;m Siebe. I live in{" "}
              <Peek kind="limburg">
                Limburg
                <BelgianFlag />
              </Peek>
              , Belgium. Right now I&apos;m building{" "}
              <a
                href="https://notchlet.com"
                target="_blank"
                rel="noreferrer"
                className="focus-ring underline decoration-ink/30 underline-offset-4"
              >
                Notchlet
              </a>
              , a Mac app for keeping track of AI coding usage.
            </p>
            <p>
              Away from my laptop, I spend a lot of time at the{" "}
              <Peek kind="gym">gym</Peek> and love going{" "}
              <Peek kind="karting">karting</Peek>.
            </p>
          </div>
        </Reveal>

        {/* the sign-off writes itself in when it enters the viewport */}
        <motion.p
          className="mt-12 -rotate-3 font-script text-5xl text-ink/90 sm:text-6xl"
          initial={
            still
              ? undefined
              : { clipPath: "inset(-25% 100% -25% -5%)", opacity: 0.4 }
          }
          whileInView={
            still
              ? undefined
              : { clipPath: "inset(-25% -8% -25% -5%)", opacity: 1 }
          }
          viewport={{ once: true, margin: "0px 0px -18% 0px" }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
        >
          Siebe Barée
        </motion.p>
      </div>
    </section>
  );
}
