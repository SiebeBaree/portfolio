"use client";

import { useEffect, useRef } from "react";

/*
 * A living monogram. A bold handwritten "SB" is drawn on a tiny offscreen
 * canvas (one pixel per character cell), sampled, and re-rendered as a grid
 * of minuscule ASCII characters that keep reshuffling so the mark never sits
 * still.
 *
 * Sharpness: cells are NOT drawn with per-cell fillText into CSS pixels.
 * The canvas renders at SUPERSAMPLE times the device resolution and the
 * compositor downscales it; the glyph atlas is pre-rendered once at the
 * EXACT supersampled stamp size, so drawImage copies 1:1 with no rescaling.
 * Both halves matter: an atlas rendered huge and downscaled at stamp time
 * shredded glyphs into pixel clusters, and an atlas rendered straight at
 * the final ~9px stamp was mush because anti-aliasing has too few pixels
 * to shape a character that small. At 2x, glyphs form at ~18px where AA
 * works, and the downscale sharpens instead of smearing.
 *
 * Hover choreography in two locked phases so the S and B never wobble:
 *   phase 1 (p 0 → 0.35): the canvas grows to its final width and the B
 *     glides to the head of the second word; after this NOTHING moves.
 *   phase 2 (p 0.36 → 1): both words write themselves letter by letter in
 *     parallel into the now-static frame.
 * Everything is a pure function of p, so unhovering plays the exact
 * reverse: letters erase first, then the B slides home as the canvas
 * shrinks.
 *
 * Optical centering: the ink centroid of each RESTING state is measured
 * once up front, and the render shift interpolates between those two fixed
 * values during phase 1 only. Live centroid tracking would drag the S and B
 * sideways as letters appear.
 */

const CELL = 3; // css px per character cell, the chars stay truly tiny
const SUPERSAMPLE = 2; // canvas resolution beyond device pixels, see header
const HEIGHT = 57;
const COMPACT_WIDTH = 105;
const FULL_WIDTH = 330;
const TICK_MS = 90; // how often the grid reshuffles at rest
const HOVER_IN_S = 0.85; // seconds to write the full signature
const HOVER_OUT_S = 0.6; // seconds to erase back to the monogram
const SLIDE_END = 0.35; // phase 1 ends here

const WORD_A = "Siebe";
const WORD_B = "Barée";

// glyph ramps from faint to dense; a cell picks from the band its ink demands
const RAMPS = [".", "·:", "+*", "SB&", "@#$"];
const GLYPHS = [...new Set(RAMPS.join(""))];

function pick(band: string) {
  return band[Math.floor(Math.random() * band.length)];
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (v: number) => 1 - (1 - v) ** 3;

// glyphs draw at their final stamped size so drawImage never rescales them
function buildGlyphAtlas(
  gw: number,
  gh: number,
): {
  atlas: HTMLCanvasElement;
  index: Map<string, number>;
} {
  const atlas = document.createElement("canvas");
  atlas.width = gw * GLYPHS.length;
  atlas.height = gh;
  const ctx = atlas.getContext("2d");
  const index = new Map<string, number>();
  if (!ctx) return { atlas, index };

  ctx.font = `700 ${Math.max(4, Math.round(gh * 0.85))}px ui-monospace, Menlo, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgb(28 35 51)";
  GLYPHS.forEach((g, i) => {
    ctx.fillText(g, i * gw + gw / 2, gh * 0.56);
    index.set(g, i);
  });
  return { atlas, index };
}

export default function AsciiSignature() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onEnter = () => {
      hoverRef.current = true;
      wake();
    };
    const onLeave = () => {
      hoverRef.current = false;
      wake();
    };
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    const family =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-logo")
        .trim() || "cursive";

    const sample = document.createElement("canvas");
    const sctx = sample.getContext("2d", { willReadFrequently: true });
    if (!sctx) return;

    // everything sized in supersampled device pixels; rebuilt if the window
    // changes screen
    let dpr = 0;
    let cellDev = 0;
    let gh = 0;
    let gw = 0;
    let atlas: HTMLCanvasElement;
    let index: Map<string, number>;
    const initForDpr = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 3) * SUPERSAMPLE;
      cellDev = CELL * dpr;
      gh = Math.max(3, Math.round(cellDev * 1.5));
      gw = Math.max(2, Math.round((gh * 2) / 3));
      ({ atlas, index } = buildGlyphAtlas(gw, gh));
    };
    initForDpr();

    const rows = Math.floor(HEIGHT / CELL);
    const colsFull = Math.floor(FULL_WIDTH / CELL);
    const colsCompact = Math.floor(COMPACT_WIDTH / CELL);
    let raf = 0;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let inView = true;
    let ready = false; // font loaded and metrics measured
    let lastTick = 0;
    let lastTime: number | null = null;
    let p = 0; // 0 = compact SB, 1 = full signature
    let chars: string[] = [];
    let stopped = false;

    // fixed text metrics, measured once the script font is ready
    let size = 0;
    let bHome = 0;
    let bAway = 0;
    let shiftCompact = 0;
    let shiftFull = 0;

    const setFont = () => {
      sctx.font = `700 ${size}px ${family}`;
    };

    const drawLayout = (cols: number, bX: number, visibleLetters: number) => {
      sample.width = cols;
      sample.height = rows;
      sctx.clearRect(0, 0, cols, rows);
      sctx.textAlign = "left";
      sctx.textBaseline = "middle";
      setFont();
      const put = (text: string, x: number, alpha: number) => {
        sctx.globalAlpha = alpha;
        // double-pass draw fattens strokes so cells cluster two-wide
        sctx.fillText(text, x, rows * 0.54);
        sctx.fillText(text, x + 0.55, rows * 0.54 + 0.4);
      };
      const drawWord = (word: string, x0: number) => {
        let x = x0;
        for (let i = 0; i < word.length; i++) {
          const alpha = i === 0 ? 1 : clamp01(visibleLetters - (i - 1));
          if (alpha > 0.01) put(word[i], x, alpha);
          x += sctx.measureText(word[i]).width;
        }
      };
      drawWord(WORD_A, 2);
      drawWord(WORD_B, 2 + bX);
      return sctx.getImageData(0, 0, cols, rows).data;
    };

    const centroidShift = (data: Uint8ClampedArray, cols: number) => {
      let sum = 0;
      let count = 0;
      for (let i = 0; i < cols * rows; i++) {
        if (data[i * 4 + 3] > 60) {
          sum += i % cols;
          count++;
        }
      }
      return count ? (cols / 2 - 0.5 - sum / count) * CELL : 0;
    };

    const measure = () => {
      size = rows * 0.95;
      setFont();
      const fullContent =
        sctx.measureText(WORD_A).width +
        size * 0.35 +
        sctx.measureText(WORD_B).width;
      if (fullContent > colsFull * 0.92) {
        size *= (colsFull * 0.92) / fullContent;
        setFont();
      }
      bHome = sctx.measureText("S").width + size * 0.1;
      bAway = sctx.measureText(WORD_A).width + size * 0.35;
      // resting-state centroids, measured once so the shift never wanders
      shiftCompact = centroidShift(
        drawLayout(colsCompact, bHome, 0),
        colsCompact,
      );
      shiftFull = centroidShift(drawLayout(colsFull, bAway, 99), colsFull);
    };

    const draw = (now: number) => {
      if (stopped || !inView) return;

      const dt = lastTime === null ? 16 : Math.min(64, now - lastTime);
      lastTime = now;
      const prev = p;
      p = clamp01(
        p +
          (dt / 1000) * (hoverRef.current ? 1 / HOVER_IN_S : -1 / HOVER_OUT_S),
      );
      const moving = p !== prev;

      const tick = now - lastTick > TICK_MS;
      if (!moving && !tick) {
        schedule(true);
        return;
      }
      if (tick) lastTick = now;

      // phase 1: canvas, B and centering all settle before any letter writes
      const slideP = easeOutCubic(clamp01(p / SLIDE_END));
      const width = Math.round(
        COMPACT_WIDTH + (FULL_WIDTH - COMPACT_WIDTH) * slideP,
      );
      const cols = Math.floor(width / CELL);
      const bX = bHome + (bAway - bHome) * slideP;
      const shift = shiftCompact + (shiftFull - shiftCompact) * slideP;
      // phase 2: how many letters (fractional) past the first are visible
      const visibleLetters = clamp01((p - 0.36) / 0.64) * 4.999;

      // dragging the window to a screen with another pixel density would
      // otherwise leave the canvas stamped at the old resolution
      if (Math.min(window.devicePixelRatio || 1, 3) * SUPERSAMPLE !== dpr)
        initForDpr();

      canvas.style.width = `${width}px`;
      if (canvas.width !== Math.round(width * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(HEIGHT * dpr);
      }

      const data = drawLayout(cols, bX, visibleLetters);

      // reshuffle a slice of the character grid so the mark shimmers
      const total = cols * rows;
      if (chars.length !== total) {
        chars = new Array(total).fill(" ");
        for (let i = 0; i < total; i++) chars[i] = pick(RAMPS[4]);
      } else if (tick) {
        const swaps = Math.floor(total * 0.18);
        for (let i = 0; i < swaps; i++) {
          const j = Math.floor(Math.random() * total);
          chars[j] = pick(RAMPS[4]);
        }
      }

      // stamp atlas glyphs 1:1 at integer device pixels; no rescaling means
      // the mark stays crisp on any screen
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const shiftDev = shift * dpr;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const a = data[(r * cols + c) * 4 + 3];
          if (a < 60) continue;
          const idx = r * cols + c;
          const ch =
            a > 150 ? chars[idx] : pick(RAMPS[Math.min(4, (a / 256) * 5) | 0]);
          const slot = index.get(ch);
          if (slot === undefined) continue;
          ctx.drawImage(
            atlas,
            slot * gw,
            0,
            gw,
            gh,
            Math.round(c * cellDev + shiftDev + (cellDev - gw) / 2),
            Math.round(r * cellDev + (cellDev - gh) / 2),
            gw,
            gh,
          );
        }
      }

      schedule(!moving);
    };

    /*
     * Scheduling. A permanent rAF loop kept the CPU awake on every vsync
     * just to bail out between shimmer ticks. Instead the loop runs
     * frame-by-frame only while the hover choreography is moving, sleeps
     * TICK_MS between shimmer redraws at rest, and stops entirely while
     * the hero is scrolled out of view. wake() restarts it on hover flips,
     * on re-entering the viewport and once the font is ready.
     */
    const schedule = (idle: boolean) => {
      if (idle) {
        idleTimer = setTimeout(() => {
          raf = requestAnimationFrame(draw);
        }, TICK_MS);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };

    const wake = () => {
      if (stopped || !ready || !inView) return;
      clearTimeout(idleTimer);
      cancelAnimationFrame(raf);
      lastTime = null;
      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) {
        wake();
      } else {
        clearTimeout(idleTimer);
        cancelAnimationFrame(raf);
      }
    });
    io.observe(wrap);

    // wait for the script font so the metrics aren't from a serif fallback
    document.fonts.load(`700 16px ${family}`).finally(() => {
      if (stopped) return;
      measure();
      ready = true;
      wake();
    });

    return () => {
      stopped = true;
      clearTimeout(idleTimer);
      cancelAnimationFrame(raf);
      io.disconnect();
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={wrapRef}
      aria-label="Siebe Barée"
      role="img"
      className="inline-block cursor-pointer"
    >
      <canvas
        ref={canvasRef}
        style={{ width: COMPACT_WIDTH, height: HEIGHT }}
        aria-hidden
      />
    </span>
  );
}
