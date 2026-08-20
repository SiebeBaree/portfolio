import Image from "next/image";

/*
 * The head-and-shoulders cutout. The source frame is square with an empty band
 * above the hair, so the wrapper is sized to the content box and the photo
 * overflows upward into that transparent space. `h-full` therefore still means
 * "visible portrait height", which is the contract the hero's face size and
 * name position are built on.
 *
 * The numbers below are measured off the alpha channel, so re-exporting the
 * photo means re-measuring: CONTENT_TOP is the first row with any pixel in it.
 */
const SRC_W = 2048;
const SRC_H = 1663;
const CONTENT_TOP = 111;

const CONTENT_H = SRC_H - CONTENT_TOP;

export default function Portrait({ className }: { className?: string }) {
  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{ aspectRatio: `${SRC_W} / ${CONTENT_H}` }}
    >
      <Image
        src="/portrait.webp"
        alt="Siebe Barée"
        width={SRC_W}
        height={SRC_H}
        preload
        sizes="(max-width: 768px) 90vw, 70vw"
        className="absolute bottom-0 left-0 w-full max-w-none select-none"
        style={{ height: `${((SRC_H / CONTENT_H) * 100).toFixed(3)}%` }}
        draggable={false}
      />
    </div>
  );
}
