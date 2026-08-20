/*
 * One shared ~20Hz heartbeat for every slow ambient drift: the sky blobs,
 * the cloud bob and the birds. Two rules of the page's power budget live
 * here:
 *
 *  1. Ambient loops must not run at the display refresh rate. A 120Hz
 *     animation keeps the compositor redrawing its damage every vsync and
 *     keeps every backdrop-filter surface above it re-blurring, forever.
 *     These drifts are so slow that one 50ms step moves things a fraction
 *     of a pixel, indistinguishable from continuous motion.
 *  2. All ambient updates must share ONE timer. Separate 50ms timers drift
 *     out of phase and land their style writes in different vsync
 *     intervals, so the page quietly paints at 40-80fps again. A single
 *     pump keeps every ambient write inside the same frame, ~20 paints/s
 *     total.
 *
 * Subscribers receive performance.now() and write styles directly. The
 * timer only exists while something is subscribed, and skips work while
 * the tab is hidden.
 */

type Tick = (nowMs: number) => void;

export const AMBIENT_TICK_MS = 50;

const subs = new Set<Tick>();
let timer: ReturnType<typeof setInterval> | undefined;

function pump() {
  if (document.hidden) return;
  const now = performance.now();
  for (const fn of subs) fn(now);
}

/** subscribe to the heartbeat; returns the unsubscribe */
export function onAmbientTick(fn: Tick): () => void {
  subs.add(fn);
  fn(performance.now());
  if (!timer) timer = setInterval(pump, AMBIENT_TICK_MS);
  return () => {
    subs.delete(fn);
    if (subs.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}
