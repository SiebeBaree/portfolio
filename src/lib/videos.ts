/*
 * SHARED by sections/Videos.tsx and /videos. The motion video offer and the
 * videos made so far. To add a video, upload the mp4 to files.baree.be with
 * forever retention, put a poster frame in public/videos/ and append an entry
 * to VIDEOS, newest first.
 */

export type Video = {
  /** Short name, usually the product plus what the video is about. */
  title: string;
  /** One line on what the video shows. */
  description: string;
  /** Public URL of the mp4. */
  src: string;
  /** Poster frame under public/, shown before playback. */
  poster: string;
  /** Length of the video, used for the label on the card. */
  seconds: number;
  /** Pixel size, so the card keeps the video's own aspect ratio. */
  width: number;
  height: number;
};

export const VIDEOS: Video[] = [
  {
    title: "Umber",
    description:
      "A short history of capturing motion, from painted racehorses to AI video in Umber.",
    src: "https://files.baree.be/forever/umber-film-v3-share-bddf4a.mp4",
    poster: "/videos/umber-film.webp",
    seconds: 78,
    width: 1920,
    height: 1080,
  },
  {
    title: "Notchlet secret scanning",
    description:
      "Notchlet finds API keys you pasted into agent chats, fully on your device.",
    src: "https://files.baree.be/forever/notchlet-secrets-8b6323.mp4",
    poster: "/videos/notchlet-secrets.webp",
    seconds: 17,
    width: 1920,
    height: 1080,
  },
  {
    title: "Notchlet launch",
    description:
      "Your Claude Code, Codex and Cursor limits in the notch, before they run out.",
    src: "https://files.baree.be/forever/notchlet-launch-640de8.mp4",
    poster: "/videos/notchlet-launch.webp",
    seconds: 58,
    width: 1080,
    height: 1350,
  },
];

/** The base video and the price of every extra 15 seconds, ex VAT. */
export const VIDEO_BASE = { seconds: 45, eur: 299, usd: 335 };
export const VIDEO_STEP = { seconds: 15, eur: 50, usd: 55 };
export const VIDEO_MAX_SECONDS = 90;

/** Every length on offer with its price ex VAT, shortest first. */
export const VIDEO_PRICES = Array.from(
  { length: (VIDEO_MAX_SECONDS - VIDEO_BASE.seconds) / VIDEO_STEP.seconds + 1 },
  (_, i) => ({
    seconds: VIDEO_BASE.seconds + i * VIDEO_STEP.seconds,
    eur: VIDEO_BASE.eur + i * VIDEO_STEP.eur,
    usd: VIDEO_BASE.usd + i * VIDEO_STEP.usd,
  }),
);

/** 45 → "0:45", 90 → "1:30". */
export function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
