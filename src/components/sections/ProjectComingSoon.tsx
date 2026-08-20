"use client";

import { motion } from "motion/react";
import { useCloudNavigate } from "@/components/transition/CloudTransition";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectLogo from "@/components/ui/ProjectLogo";
import type { Project } from "@/lib/projects";
import { EASE_OUT_QUINT } from "@/lib/timeline";

/*
 * The /work/<slug> page body for chapters that are not written yet (their
 * assets are still on their way). Content rises in just after the
 * transition clouds part, and the back link rolls the clouds in again
 * before returning home (the home page's own intro takes the handoff from
 * there).
 */

export default function ProjectComingSoon({ project }: { project: Project }) {
  const navigate = useCloudNavigate();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: EASE_OUT_QUINT, delay: 0.35 }}
      >
        <ProjectLogo project={project} className="h-14 w-14" size={56} />
        <div className="mt-6">
          <Eyebrow>{`Previous work · est. ${project.year}`}</Eyebrow>
        </div>
        <h1 className="mt-3 font-display text-5xl tracking-tight text-ink sm:text-7xl">
          {project.title}
        </h1>
        <p className="mt-6 font-display text-2xl text-ink/85 italic sm:text-3xl">
          Coming soon
        </p>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
          This chapter is still being written.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="glass-control focus-ring mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-ink"
        >
          <span aria-hidden>←</span>
          Back home
        </button>
      </motion.div>
    </main>
  );
}
