import { formatDuration, type Video } from "@/lib/videos";

/*
 * One past video: the native player behind its poster frame, then the
 * name and length. Keeps the video's own aspect ratio, so vertical cuts are
 * not cropped. Nothing downloads until the visitor presses play.
 */
export default function VideoCard({ video }: { video: Video }) {
  return (
    <figure>
      {/* biome-ignore lint/a11y/useMediaCaption: motion videos carry music and on-screen text, no dialogue to caption */}
      <video
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        controls
        playsInline
        preload="none"
        className="h-auto w-full rounded-lg bg-ink/10 object-cover shadow-[0_16px_28px_-20px_rgb(24_35_67/0.4)]"
      />
      <figcaption className="mt-5">
        <span className="flex items-baseline justify-between gap-6">
          <span className="font-display text-2xl">{video.title}</span>
          <span className="text-sm tabular-nums text-ink/60">
            {formatDuration(video.seconds)}
          </span>
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-ink/75">
          {video.description}
        </span>
      </figcaption>
    </figure>
  );
}
