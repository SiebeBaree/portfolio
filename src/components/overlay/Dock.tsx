"use client";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { CONTACT_EMAIL, SITE_LINKS } from "@/lib/site";
import { EASE_OUT_QUINT, SCROLL_UNLOCK_AT } from "@/lib/timeline";

/*
 * The macOS dock, kept: a Liquid Glass shelf pinned to the bottom of the
 * viewport holding the four ways to reach me. Icons swell as the cursor
 * nears, neighbours rising with them on a cosine-ish falloff, and each one
 * names itself in a small bubble above, the way the real dock does.
 *
 * Magnification is driven by one shared cursor-x motion value; every icon
 * measures its own distance from it and springs its size toward the result,
 * so leaving the shelf (cursor-x set to Infinity) relaxes everything at
 * once. Reduced motion pins every icon at rest size and keeps the tooltips.
 *
 * Enters on the scroll cue's beat of the shared timeline, after the clouds
 * hand scrolling back.
 */

const REST = 44; // icon size at rest, px
const PEAK = 68; // icon size directly under the cursor
const REACH = 128; // px of cursor distance over which the swell fades out

type DockLink = {
  label: string;
  href: string;
  external: boolean;
  tile: React.ReactNode;
};

const LINKS: DockLink[] = [
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
    tile: (
      <span
        className="dock-tile"
        style={{
          background: "linear-gradient(180deg, #67aef5 0%, #1f6bf0 100%)",
        }}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          style={{ width: "58%" }}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5.5" width="18" height="13" rx="2.4" />
          <path d="m4.4 7.4 6.7 4.8a1.6 1.6 0 0 0 1.8 0l6.7-4.8" />
        </svg>
      </span>
    ),
  },
  {
    label: "LinkedIn",
    href: SITE_LINKS.linkedin,
    external: true,
    tile: (
      <span className="dock-tile" style={{ background: "#0a66c2" }}>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          style={{ width: "60%" }}
          fill="#ffffff"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
      </span>
    ),
  },
  {
    label: "X",
    href: SITE_LINKS.x,
    external: true,
    tile: (
      <span className="dock-tile" style={{ background: "#000000" }}>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          style={{ width: "52%" }}
          fill="#ffffff"
        >
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </span>
    ),
  },
  {
    label: "GitHub",
    href: SITE_LINKS.github,
    external: true,
    tile: (
      <span
        className="dock-tile"
        style={{
          background: "#ffffff",
          border: "1px solid rgb(28 41 90 / 0.08)",
        }}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          style={{ width: "62%" }}
          fill="#1b1f24"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </span>
    ),
  },
];

function DockIcon({
  link,
  cursorX,
  still,
}: {
  link: DockLink;
  cursorX: MotionValue<number>;
  still: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [named, setNamed] = useState(false);

  const distance = useTransform(cursorX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || !Number.isFinite(x)) return REACH;
    return x - (bounds.x + bounds.width / 2);
  });
  const swell = useTransform(distance, [-REACH, 0, REACH], [REST, PEAK, REST]);
  const size = useSpring(swell, { mass: 0.1, stiffness: 220, damping: 16 });

  return (
    <motion.a
      ref={ref}
      href={link.href}
      aria-label={link.label}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="focus-ring relative block shrink-0"
      style={{ width: still ? REST : size, height: still ? REST : size }}
      onMouseEnter={() => setNamed(true)}
      onMouseLeave={() => setNamed(false)}
      onFocus={() => setNamed(true)}
      onBlur={() => setNamed(false)}
    >
      {link.tile}
      <AnimatePresence>
        {named && (
          <motion.span
            className="dock-tip"
            initial={{ opacity: 0, y: 5, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.16, ease: EASE_OUT_QUINT }}
          >
            {link.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export default function Dock() {
  const reducedMotion = useReducedMotion();
  const cursorX = useMotionValue(Infinity);

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: EASE_OUT_QUINT,
        delay: reducedMotion ? 0 : SCROLL_UNLOCK_AT + 0.6,
      }}
    >
      <nav
        aria-label="Contact links"
        className="dock-glass pointer-events-auto flex h-14 items-end gap-2 rounded-[17px] px-1.5 pb-1.5"
        onMouseMove={(e) => cursorX.set(e.clientX)}
        onMouseLeave={() => cursorX.set(Infinity)}
      >
        {LINKS.map((link) => (
          <DockIcon
            key={link.label}
            link={link}
            cursorX={cursorX}
            still={reducedMotion ?? false}
          />
        ))}
      </nav>
    </motion.div>
  );
}
