"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { EASE_EXPO_OUT, EASE_OUT_QUINT } from "@/lib/timeline";

/*
 * Previous work as a bookshelf, and the last thing on the page.
 *
 * The section is a tall scroll runway with a sticky full-height stage. On
 * arrival only the first two spines peek in from the right; continuing to
 * scroll slides the shelf horizontally until every book is on screen. Books
 * are ordered newest to oldest, so reading the shelf is scrolling back
 * through time.
 *
 * Every book is a real 3D box: spine, both cover boards, and a top edge of
 * cream page-lines framed by the cover, standing packed together on a wooden
 * board with visible depth. Hovering tips a book out of the row around its
 * bottom edge, the way you pull a book by the top of its spine. Clicking
 * takes it out for real: the same box flies from its shelf slot to the
 * centre, turns from spine to cover mid-flight, grows to most of the screen
 * and only then swings its cover open (every chapter still reads "Coming
 * soon").
 *
 * Easter egg: scroll hard enough while the shelf is on screen and the thin
 * book at the end topples over. Spine titles read bottom to top, European
 * style, so it lands with its title the right way up. It hovers by sliding
 * toward you instead of tipping, and has to turn upright mid-flight before
 * it can open.
 *
 * Logos marked with a dashed red X are placeholders waiting for real assets.
 */

type Book = {
  title: string;
  /** rgb triplet for the cover colour */
  hue: string;
  /** spine width and height in design px, scaled by --bk */
  w: number;
  h: number;
};

/** newest first: the shelf reads back through time; hues are leather tones */
const BOOKS: Book[] = [
  { title: "Enkryptify", hue: "48 56 108", w: 176, h: 436 },
  { title: "EEVEE Mobility", hue: "32 88 80", w: 148, h: 404 },
  { title: "Coinz", hue: "150 98 42", w: 198, h: 448 },
  { title: "Discord Bots", hue: "86 92 168", w: 152, h: 398 },
  { title: "MaxerG", hue: "70 102 58", w: 160, h: 418 },
  { title: "Bookmarks", hue: "122 48 42", w: 94, h: 352 },
];

/** how deep a book goes into the shelf */
const DEPTH = 150;
/** the shelf board: deeper than the books, with a front edge below them */
const SHELF_DEPTH = 175;
/** books stand this close to the board's front edge, visibly ON it */
const ROW_SETBACK = 4;
/** thickness of the big opened book in the reader overlay */
const COVER_T = 44;
/** the index of the book the hard-scroll easter egg knocks over */
const TOPPLE_INDEX = BOOKS.length - 1;
/** page px/s of scroll velocity that counts as "scrolling very hard" */
const TOPPLE_VELOCITY = 4200;

/** dashed red X: a logo slot Siebe still has to fill with the real asset */
function LogoX({ className }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-lg border border-dashed border-red-500/70 bg-white/85 text-red-500 ${className ?? ""}`}
    >
      <svg viewBox="0 0 12 12" fill="none" className="h-1/2 w-1/2" aria-hidden>
        <path
          d="M2.5 2.5 L9.5 9.5 M9.5 2.5 L2.5 9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** the cream page-block texture: thin sheet lines running along the depth */
const PAGES =
  "repeating-linear-gradient(90deg, #e8ddc4 0px, #e8ddc4 1px, #f6efdd 1px, #f6efdd 3px)";
const PAGES_HORIZONTAL =
  "repeating-linear-gradient(0deg, #e8ddc4 0px, #e8ddc4 1px, #f6efdd 1px, #f6efdd 3px)";

/** faint dark speckle that makes flat colour read as grained leather or wood */
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.02 0 0 0 0 0.01 0 0 0 0 0 0 0 0 0.28 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/** gold foil, the colour every title is stamped in */
const FOIL = "#dfc993";

/*
 * The cloth skin of one book, shared by spine, boards and big cover. Every
 * stop is fully opaque (light and shade come from color-mix, never from
 * alpha), because a cover you can faintly see through reads as fake at once.
 */
const cover = (hue: string, angle = 180) =>
  `${GRAIN}, linear-gradient(${angle}deg, color-mix(in srgb, rgb(${hue}), white 9%) 0%, rgb(${hue}) 50%, color-mix(in srgb, rgb(${hue}), black 13%) 100%)`;

type OpenState = {
  index: number;
  /** offset from the spine's shelf position to the viewport centre */
  dx: number;
  dy: number;
  /** how small the flying book starts, relative to its opened size */
  scaleFrom: number;
  /** the fallen book has to turn upright before it opens */
  turned: boolean;
};

export default function PreviousWork() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const [measured, setMeasured] = useState(false);
  const [open, setOpen] = useState<OpenState | null>(null);
  const [toppled, setToppled] = useState(false);

  /* ---------- horizontal travel bound to vertical scroll ---------- */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // start: row pushed right so exactly two spines peek in; end: shelf at rest
  const startX = useMotionValue(4000);
  const endX = useMotionValue(0);
  const x = useTransform(
    [scrollYProgress, startX, endX] as const,
    ([p, s, e]: number[]) => {
      const t = Math.min(1, Math.max(0, (p - 0.04) / 0.86));
      return s + (e - s) * t;
    },
  );
  const xSmooth = useSpring(x, { stiffness: 110, damping: 26, mass: 0.5 });

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const row = rowRef.current;
    if (!stage || !row) return;
    const vw = stage.clientWidth;
    const first = row.children[0] as HTMLElement | undefined;
    const second = row.children[1] as HTMLElement | undefined;
    if (!first || !second) return;
    const gap = second.offsetLeft - (first.offsetLeft + first.offsetWidth);
    const peek = first.offsetWidth + gap + second.offsetWidth + vw * 0.05;
    const rw = row.scrollWidth;
    startX.set(Math.max(0, vw - peek));
    // small shelves settle centred, long ones stop with the end in view
    endX.set(
      rw + vw * 0.12 <= vw ? (vw - rw) / 2 : Math.min(0, vw - rw - vw * 0.04),
    );
    setMeasured(true);
  }, [startX, endX]);

  useEffect(() => {
    measure();
    const row = rowRef.current;
    const ro = row ? new ResizeObserver(measure) : null;
    if (row && ro) ro.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ---------- the hard-scroll topple ---------- */

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const toppledRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;
    return velocity.on("change", (v) => {
      if (toppledRef.current || Math.abs(v) < TOPPLE_VELOCITY) return;
      const p = scrollYProgress.get();
      if (p > 0.1 && p < 0.99) {
        toppledRef.current = true;
        setToppled(true);
      }
    });
  }, [velocity, scrollYProgress, reducedMotion]);

  /* ---------- opening and closing books ---------- */

  const openBook = useCallback(
    (index: number, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const openH = Math.min(
        window.innerHeight * 0.78,
        window.innerWidth * 0.6,
      );
      setOpen({
        index,
        dx: r.left + r.width / 2 - window.innerWidth / 2,
        dy: r.top + r.height / 2 - window.innerHeight / 2,
        scaleFrom: Math.max(0.2, Math.min(1, r.height / openH)),
        turned: toppled && index === TOPPLE_INDEX,
      });
    },
    [toppled],
  );

  const close = useCallback(() => setOpen(null), []);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const openedBook = open ? BOOKS[open.index] : null;
  const openDelay = open?.turned ? 0.95 : 0.7;

  return (
    <section ref={sectionRef} id="work" className="relative h-[300vh]">
      <div
        ref={stageRef}
        className="sticky top-0 flex h-dvh flex-col overflow-hidden [--bk:0.62px] sm:[--bk:0.8px] xl:[--bk:1px]"
      >
        <Reveal className="px-6 pt-24 text-center sm:px-10">
          <Eyebrow>Previous work</Eyebrow>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
            The story so far.
          </h2>
        </Reveal>

        {/* the shelf: a sliding row of packed books on a wooden board */}
        <div
          className="relative mt-auto pb-[9vh]"
          style={{ perspective: 1500, perspectiveOrigin: "50% 26%" }}
        >
          {/* the surface the books stand on. It sits FIRST in the DOM:
              Chrome does not split intersecting 3D planes, it sorts whole
              elements, and with the surface later in paint order it won wood
              over the spine bottoms and hid the author names */}
          <div
            aria-hidden
            className="absolute inset-x-[2vw]"
            style={{
              top: "calc(100% - 9vh - 26px)",
              height: SHELF_DEPTH,
              transform: "rotateX(-90deg)",
              transformOrigin: "50% 0%",
              background: `${GRAIN}, repeating-linear-gradient(90deg, rgb(62 40 18 / 0.16) 0 2px, rgb(255 255 255 / 0.06) 2px 4px, rgb(0 0 0 / 0) 4px 128px), repeating-linear-gradient(0deg, rgb(80 52 22 / 0.05) 0 2px, rgb(0 0 0 / 0) 2px 11px), linear-gradient(180deg, #d9b184 0%, #c69c6c 40%, #8f6a3d 100%)`,
            }}
          />
          <motion.div
            ref={rowRef}
            className={`flex w-max items-end pl-[4vw] transition-opacity duration-300 ${
              measured ? "opacity-100" : "opacity-0"
            }`}
            style={{
              x: xSmooth,
              z: -ROW_SETBACK,
              gap: "calc(1 * var(--bk))",
              transformStyle: "preserve-3d",
            }}
          >
            {BOOKS.map((book, i) => {
              const fallen = toppled && i === TOPPLE_INDEX;
              const isOpen = open?.index === i;
              return (
                <motion.div
                  key={book.title}
                  className="relative"
                  style={{
                    transformOrigin: "100% 100%",
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotate: fallen ? [0, 90, 86.5, 90] : 0,
                    opacity: isOpen ? 0 : 1,
                  }}
                  transition={{
                    rotate: {
                      duration: 0.85,
                      times: [0, 0.52, 0.76, 1],
                      ease: ["easeIn", "easeOut", "easeInOut"],
                    },
                    opacity: { duration: isOpen ? 0.1 : 0.3 },
                  }}
                >
                  <motion.button
                    type="button"
                    aria-label={`${book.title}, by Siebe Barée. Open the book.`}
                    onClick={(e) => openBook(i, e.currentTarget)}
                    className="focus-ring relative block cursor-pointer"
                    style={{
                      width: `calc(${book.w} * var(--bk))`,
                      height: `calc(${book.h} * var(--bk))`,
                      transformOrigin: "50% 100%",
                      transformStyle: "preserve-3d",
                      // backstop the exact book colour behind every face
                      // joint, so no seam can ever show the sky through
                      background: `rgb(${book.hue})`,
                    }}
                    whileHover={
                      fallen ? { z: 30, scale: 1.02 } : { rotateX: -15, z: 12 }
                    }
                    whileTap={fallen ? { z: 36 } : { rotateX: -21, z: 16 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    {/* top edge: leather rim around the cream page block */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 block"
                      style={{
                        height: `calc(${DEPTH} * var(--bk))`,
                        transform: "rotateX(-90deg)",
                        transformOrigin: "50% 0%",
                        background: cover(book.hue, 90),
                      }}
                    >
                      <span
                        className="absolute block"
                        style={{
                          inset: "3px 4px 0 4px",
                          background: `radial-gradient(120% 60% at 50% 0%, rgb(255 255 255 / 0.35) 0%, rgb(255 255 255 / 0) 55%), ${PAGES}`,
                          boxShadow:
                            "inset 0 2px 3px rgb(0 0 0 / 0.28), inset 2px 0 2px rgb(0 0 0 / 0.14), inset -2px 0 2px rgb(0 0 0 / 0.14)",
                        }}
                      />
                    </span>
                    {/* bottom edge, so the toppled book is solid from below */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-full block"
                      style={{
                        height: `calc(${DEPTH} * var(--bk))`,
                        transform: "rotateX(-90deg)",
                        transformOrigin: "50% 0%",
                        background: cover(book.hue, 90),
                      }}
                    >
                      <span
                        className="absolute block"
                        style={{
                          inset: "0 4px 3px 4px",
                          background: PAGES,
                          boxShadow: "inset 0 -2px 3px rgb(0 0 0 / 0.28)",
                        }}
                      />
                    </span>
                    {/* cover boards: left and right side faces */}
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 block h-full"
                      style={{
                        width: `calc(${DEPTH} * var(--bk))`,
                        transform: "rotateY(90deg)",
                        transformOrigin: "0% 50%",
                        background: `linear-gradient(90deg, rgb(0 0 0 / 0.14), rgb(0 0 0 / 0.3)), ${cover(book.hue)}`,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute top-0 left-full block h-full"
                      style={{
                        width: `calc(${DEPTH} * var(--bk))`,
                        transform: "rotateY(90deg)",
                        transformOrigin: "0% 50%",
                        background: `linear-gradient(90deg, rgb(0 0 0 / 0.22), rgb(0 0 0 / 0.4)), ${cover(book.hue)}`,
                      }}
                    />
                    {/* spine face: square edges so every face meets flush,
                        the rounding suggested by shading alone */}
                    <span
                      className="flex h-full w-full flex-col items-center justify-between px-1 pt-3 pb-4"
                      style={{
                        gap: "calc(10 * var(--bk))",
                        background: `linear-gradient(0deg, rgb(0 0 0 / 0.32) 0%, rgb(0 0 0 / 0) 6%), linear-gradient(90deg, rgb(0 0 0 / 0.4) 0%, rgb(255 255 255 / 0.09) 8%, rgb(255 255 255 / 0.02) 18%, rgb(0 0 0 / 0) 45%, rgb(0 0 0 / 0.1) 80%, rgb(0 0 0 / 0.28) 95%, rgb(0 0 0 / 0.48) 100%), ${cover(book.hue)}`,
                        boxShadow:
                          "inset 0 1px 0 rgb(255 255 255 / 0.14), inset 7px 0 6px -5px rgb(0 0 0 / 0.5), inset -7px 0 6px -5px rgb(0 0 0 / 0.5), 0 5px 8px -3px rgb(43 30 15 / 0.45), 0 24px 30px -18px rgb(28 41 90 / 0.5)",
                      }}
                    >
                      <LogoX className="h-[calc(34*var(--bk))] w-[calc(34*var(--bk))]" />
                      <span
                        aria-hidden
                        className="h-px w-2/3"
                        style={{ background: `rgb(223 201 147 / 0.55)` }}
                      />
                      {/* European spine: reads bottom to top, so the toppled
                          book lands with its title the right way up; the
                          shadow pair makes the foil read as stamped in */}
                      <span
                        className="min-h-0 flex-1 pb-1 font-display tracking-tight"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          fontSize: `calc(${book.w < 120 ? 22 : 27} * var(--bk))`,
                          color: FOIL,
                          textShadow:
                            "0 1px 1px rgb(0 0 0 / 0.55), 0 0 6px rgb(0 0 0 / 0.2)",
                        }}
                      >
                        {book.title}
                      </span>
                      <span
                        aria-hidden
                        className="h-px w-2/3"
                        style={{ background: `rgb(223 201 147 / 0.55)` }}
                      />
                      <span
                        className="font-medium whitespace-nowrap uppercase"
                        style={{
                          fontSize: `calc(${book.w < 120 ? 7 : 8.5} * var(--bk))`,
                          letterSpacing: "0.08em",
                          color: `rgb(223 201 147 / 0.85)`,
                          textShadow: "0 1px 1px rgb(0 0 0 / 0.5)",
                        }}
                      >
                        Siebe Barée
                      </span>
                    </span>
                  </motion.button>
                </motion.div>
              );
            })}
            {/* spare shelf: where the thin book lands when it topples */}
            <span
              aria-hidden
              style={{ width: "calc(300 * var(--bk))", height: 1 }}
            />
          </motion.div>

          {/* front edge: a routed board with a lit top and a dark underside */}
          <div
            aria-hidden
            className="relative mx-[2vw] h-[26px] rounded-[3px]"
            style={{
              background: `${GRAIN}, repeating-linear-gradient(90deg, rgb(62 40 18 / 0.1) 0 2px, rgb(0 0 0 / 0) 2px 128px), linear-gradient(180deg, #cfa676 0%, #bb9058 22%, #a67c48 58%, #6f4e26 100%)`,
              boxShadow:
                "inset 0 2px 0 rgb(255 255 255 / 0.35), inset 0 -4px 5px rgb(0 0 0 / 0.35), 0 26px 38px -14px rgb(50 35 15 / 0.55)",
            }}
          />
        </div>
      </div>

      {/* the book, taken out for real: it flies from its slot, turns from
          spine to cover, then swings open at most of the screen */}
      <AnimatePresence>
        {open && openedBook && (
          <motion.div key="reader" className="fixed inset-0 z-[60]">
            <motion.div
              className="absolute inset-0 bg-[rgb(20_30_55/0.3)] backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
            />
            <div
              className="pointer-events-none absolute inset-0 grid place-items-center"
              style={{ perspective: 2600 }}
            >
              <motion.div
                className="pointer-events-auto relative"
                style={{
                  height: "min(78vh, 60vw)",
                  aspectRatio: "0.72",
                  transformStyle: "preserve-3d",
                }}
                initial={{
                  x: open.dx,
                  y: open.dy,
                  scale: open.scaleFrom,
                  rotateY: 90,
                  rotate: open.turned ? 90 : 0,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateY: 0,
                  rotate: 0,
                  transition: {
                    duration: open.turned ? 0.9 : 0.7,
                    ease: EASE_EXPO_OUT,
                  },
                }}
                exit={{
                  x: open.dx,
                  y: open.dy,
                  scale: open.scaleFrom,
                  rotateY: 90,
                  rotate: open.turned ? 90 : 0,
                  opacity: 0,
                  transition: { duration: 0.45, ease: "easeIn" },
                }}
              >
                {/* once the cover starts opening, the whole spread slides
                    right so the open book stays centred */}
                <motion.div
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ x: 0 }}
                  animate={{
                    x: "26%",
                    transition: {
                      delay: openDelay,
                      duration: 0.9,
                      ease: EASE_OUT_QUINT,
                    },
                  }}
                  exit={{ x: 0, transition: { duration: 0.3, ease: "easeIn" } }}
                >
                  {/* back cover board */}
                  <div
                    className="absolute inset-0 rounded-r-lg rounded-l-sm"
                    style={{
                      background: cover(openedBook.hue, 160),
                      boxShadow: "0 40px 90px -35px rgb(15 25 50 / 0.7)",
                    }}
                  />
                  {/* page block edges: top, bottom and fore edge */}
                  <div
                    className="absolute inset-x-[2px] top-0"
                    style={{
                      height: COVER_T,
                      transform: "rotateX(90deg)",
                      transformOrigin: "50% 0%",
                      background: PAGES_HORIZONTAL,
                    }}
                  />
                  <div
                    className="absolute inset-x-[2px] top-full"
                    style={{
                      height: COVER_T,
                      transform: "rotateX(90deg)",
                      transformOrigin: "50% 0%",
                      background: PAGES_HORIZONTAL,
                    }}
                  />
                  <div
                    className="absolute top-[2px] bottom-[2px] left-full"
                    style={{
                      width: COVER_T,
                      transform: "rotateY(-90deg)",
                      transformOrigin: "0% 50%",
                      background: PAGES,
                    }}
                  />
                  {/* spine, facing the reader while the book flies out */}
                  <div
                    className="absolute top-0 bottom-0 left-0 flex flex-col items-center justify-between rounded-[4px] py-6"
                    style={{
                      width: COVER_T,
                      transform: "rotateY(-90deg)",
                      transformOrigin: "0% 50%",
                      background: `linear-gradient(90deg, rgb(0 0 0 / 0.3) 0%, rgb(255 255 255 / 0.14) 12%, rgb(0 0 0 / 0.06) 60%, rgb(0 0 0 / 0.35) 100%), ${cover(openedBook.hue)}`,
                    }}
                  >
                    <LogoX className="h-7 w-7" />
                    <span
                      className="min-h-0 flex-1 py-3 text-center font-display text-xl tracking-tight"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        color: FOIL,
                        textShadow: "0 1px 1px rgb(0 0 0 / 0.55)",
                      }}
                    >
                      {openedBook.title}
                    </span>
                    <span
                      className="text-[8px] font-medium tracking-[0.08em] uppercase"
                      style={{ color: `rgb(223 201 147 / 0.85)` }}
                    >
                      S.B.
                    </span>
                  </div>
                  {/* right page: the content the cover reveals */}
                  <div
                    className="absolute flex flex-col rounded-r-md px-[6%] py-[5%]"
                    style={{
                      inset: "1.5% 2% 1.5% 1%",
                      transform: `translateZ(${COVER_T - 3}px)`,
                      background:
                        "linear-gradient(90deg, rgb(233 238 247) 0%, rgb(250 251 253) 6%, rgb(255 255 255) 100%)",
                      boxShadow: "inset 1px 0 0 rgb(28 41 90 / 0.08)",
                    }}
                  >
                    <p className="text-[12px] font-semibold tracking-wide text-muted uppercase">
                      {openedBook.title}
                    </p>
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                      <p className="font-display text-5xl text-ink italic sm:text-7xl">
                        Coming soon
                      </p>
                      <p className="mt-4 max-w-[24rem] text-[15px] leading-relaxed text-muted">
                        This chapter is still being written.
                      </p>
                    </div>
                    <p className="text-center text-[11px] tracking-[0.14em] text-muted/70 uppercase">
                      Siebe Barée
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      ref={closeButtonRef}
                      aria-label="Put the book back"
                      className="focus-ring tint-control absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full text-ink/60"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        className="h-3.5 w-3.5"
                        aria-hidden
                      >
                        <path
                          d="M2 2 L10 10 M10 2 L2 10"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* front cover, hinged on the spine */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      z: COVER_T,
                      transformOrigin: "0% 50%",
                      transformStyle: "preserve-3d",
                    }}
                    initial={{ rotateY: 0 }}
                    animate={{
                      rotateY: -172,
                      transition: {
                        delay: openDelay,
                        duration: 0.9,
                        ease: EASE_OUT_QUINT,
                      },
                    }}
                    exit={{
                      rotateY: 0,
                      transition: { duration: 0.25, ease: "easeIn" },
                    }}
                  >
                    {/* cover front */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-between rounded-r-lg rounded-l-sm px-8 py-[9%] [backface-visibility:hidden]"
                      style={{
                        background: `linear-gradient(135deg, rgb(255 255 255 / 0.14) 0%, rgb(255 255 255 / 0) 45%), ${cover(openedBook.hue, 160)}`,
                        boxShadow:
                          "inset 0 1px 0 rgb(255 255 255 / 0.2), inset 6px 0 10px -6px rgb(0 0 0 / 0.5), inset -2px 0 4px -2px rgb(0 0 0 / 0.3), 0 40px 90px -35px rgb(15 25 50 / 0.7)",
                      }}
                    >
                      <LogoX className="h-20 w-20" />
                      <span
                        className="px-2 text-center font-display text-5xl tracking-tight sm:text-6xl"
                        style={{
                          color: FOIL,
                          textShadow:
                            "0 1px 1px rgb(0 0 0 / 0.55), 0 0 10px rgb(0 0 0 / 0.2)",
                        }}
                      >
                        {openedBook.title}
                      </span>
                      <span
                        className="text-[13px] font-medium tracking-[0.16em] uppercase"
                        style={{
                          color: `rgb(223 201 147 / 0.85)`,
                          textShadow: "0 1px 1px rgb(0 0 0 / 0.5)",
                        }}
                      >
                        Siebe Barée
                      </span>
                    </div>
                    {/* cover back: the blank left page you see once it opens */}
                    <div
                      className="absolute inset-0 rounded-l-lg rounded-r-sm [backface-visibility:hidden]"
                      style={{
                        transform: "rotateY(180deg)",
                        background:
                          "linear-gradient(270deg, rgb(233 238 247) 0%, rgb(250 251 253) 6%, rgb(255 255 255) 100%)",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
