import Image from "next/image";
import { LOGOS } from "@/lib/logos";
import type { Project } from "@/lib/projects";

/** A project mark, with an initial for early projects without a logo. */
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
