"use client";

import { useEffect, useRef } from "react";
import { onAmbientTick } from "@/lib/ambient-ticker";

/*
 * The atmosphere behind everything, ported from the desktop app's canvas
 * backdrop: a cool blue canvas, heavily blurred white blobs drifting on
 * coprime-duration loops, and film grain over the lot. Layering is document
 * order (wash → blobs → grain); the whole thing sits behind the content.
 *
 * The drift is stepped by the shared ambient ticker (lib/ambient-ticker.ts)
 * rather than run as infinite CSS animations. A backdrop that changes on
 * every vsync forces every backdrop-filter surface on the page (all the
 * glass) to re-blur at the display's full refresh rate, forever. Over
 * 26-41s loops one 50ms step moves a blob a fraction of a pixel, so the
 * motion reads the same while the glass re-blurs a fifth as often and the
 * compositor can idle between steps.
 */

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

export default function SkyBackground() {
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t0 = performance.now();
    return onAmbientTick((now) => {
      const elapsed = (now - t0) / 1000;
      blobsRef.current.forEach((el, i) => {
        if (el)
          el.style.transform = transformAt(TRACKS[BLOBS[i].track], elapsed);
      });
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* the sky is brighter overhead, deeper toward the horizon; deep
          enough that the white light actually registers against it */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#aecff2_0%,#93bceb_48%,#83b0e6_100%)]" />

      {BLOBS.map((blob, i) => (
        <div
          key={blob.className}
          ref={(el) => {
            blobsRef.current[i] = el;
          }}
          className={`absolute rounded-full ${blob.className}`}
        />
      ))}

      <div
        className="absolute inset-0 opacity-90"
        style={{ backgroundImage: GRAIN }}
      />
    </div>
  );
}
