import Image from "next/image";
import { LOGOS } from "@/lib/logos";
import type { Project } from "@/lib/projects";

/*
 * SHARED. The one logo tile, used by the bento grid cards and the /work
 * chapter headers. Three states, in order: the real logo where one survives
 * (full-bleed or padded on white, per logos.ts), a monogram tile for dead
 * projects whose logo is lost, and the dashed red X placeholder for chapters
 * whose assets Siebe still has to deliver.
 */

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

export default function ProjectLogo({
  project,
  className,
  /** rendered logo size hint in px, for srcset selection only */
  size = 56,
}: {
  project: Project;
  className?: string;
  size?: number;
}) {
  const logo = LOGOS[project.slug];

  if (!logo) {
    /*
     * No logo survives for this project. Upcoming chapters (weight comes
     * later, assets promised) keep the red X so the slot reads as "to fill";
     * finished chapters get a quiet monogram so nothing reads as missing.
     */
    const pending = ["hermann"];
    if (pending.includes(project.slug)) return <LogoX className={className} />;
    return (
      <span
        className={`grid shrink-0 place-items-center overflow-hidden rounded-lg border border-white/80 bg-white/85 shadow-[0_8px_16px_-10px_rgb(28_41_90/0.35)] ${className ?? ""}`}
      >
        {/* SVG text so the monogram scales with whatever tile size it gets */}
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
          <text
            x="12"
            y="12.5"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="13"
            className="fill-ink font-display tracking-tight"
          >
            {project.title.charAt(0)}
          </text>
        </svg>
      </span>
    );
  }

  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-lg border border-white/80 bg-white shadow-[0_8px_16px_-10px_rgb(28_41_90/0.35)] ${className ?? ""}`}
    >
      <Image
        src={logo.image}
        alt={`${project.title} logo`}
        sizes={`${size}px`}
        className={
          logo.fit === "cover"
            ? "h-full w-full object-cover"
            : "h-[72%] w-[72%] object-contain"
        }
      />
    </span>
  );
}
