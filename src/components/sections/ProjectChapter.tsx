"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCloudNavigate } from "@/components/transition/CloudTransition";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectLogo from "@/components/ui/ProjectLogo";
import Reveal from "@/components/ui/Reveal";
import type { Chapter, ChapterBlock } from "@/lib/chapters";
import type { Project } from "@/lib/projects";
import { EASE_OUT_QUINT } from "@/lib/timeline";

/*
 * The /work/<slug> page body for a finished chapter. The header rises in
 * just after the transition clouds part, exactly like the "Coming soon"
 * page did, and the story reveals block by block on scroll. The header is
 * centered like every section opener; the prose itself is left-aligned
 * because some chapters run long.
 *
 * The footer keeps the reader inside the story: one card leads to the next
 * chapter (the next older project that has one) and a small link goes back
 * home, both through the cloud transition.
 */

function StoryBlock({ block }: { block: ChapterBlock }) {
  if (block.kind === "text") {
    return (
      <p className="text-base leading-relaxed text-ink/80 sm:text-lg">
        {block.body}
      </p>
    );
  }

  if (block.kind === "image") {
    return (
      <figure className="py-2">
        <div className="glass-raised overflow-hidden rounded-2xl p-2">
          <Image
            src={block.image}
            alt={block.alt}
            placeholder="blur"
            sizes="(min-width: 768px) 672px, 100vw"
            className="w-full rounded-xl"
          />
        </div>
        <figcaption className="mt-3 text-center text-[13px] text-muted">
          {block.caption}
        </figcaption>
      </figure>
    );
  }

  return <StoryVideo src={block.src} caption={block.caption} />;
}

/** the SiebeGPT walkthrough: plays on its own unless motion is reduced */
function StoryVideo({ src, caption }: { src: string; caption: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <figure className="py-2">
      <div className="glass-raised overflow-hidden rounded-2xl p-2">
        {/* biome-ignore lint/a11y/useMediaCaption: a silent screen recording, described by the figcaption */}
        <video
          src={src}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          controls={Boolean(reducedMotion)}
          className="w-full rounded-xl"
        />
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function ProjectChapter({
  project,
  chapter,
  next,
}: {
  project: Project;
  chapter: Chapter;
  /** the next older project that has a chapter, if any */
  next: Project | null;
}) {
  const navigate = useCloudNavigate();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-24 sm:px-10">
      {/* the header, rising in as the transition clouds part */}
      <motion.div
        className="flex flex-col items-center text-center"
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
          {chapter.tagline}
        </p>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {chapter.facts.map((fact) => (
            <li
              key={fact}
              className="glass rounded-full px-3.5 py-1.5 text-[12px] font-medium text-ink/80"
            >
              {fact}
            </li>
          ))}
        </ul>

        {chapter.links && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {chapter.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="glass-control focus-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-ink"
              >
                {link.label}
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="h-3 w-3"
                  aria-hidden
                >
                  <path
                    d="M3 9 L9 3 M4.5 3 H9 V7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        )}
      </motion.div>

      {/* the story itself */}
      <div className="mt-14 flex flex-col gap-7">
        {chapter.story.map((block, i) => (
          <Reveal
            // biome-ignore lint/suspicious/noArrayIndexKey: the story order is fixed content
            key={i}
            delay={0.05}
          >
            <StoryBlock block={block} />
          </Reveal>
        ))}
      </div>

      {/* onwards: the next chapter, or just home */}
      <div className="mt-16 flex flex-col items-center gap-6">
        {next && (
          <Reveal className="w-full">
            <button
              type="button"
              onClick={() => navigate(`/work/${next.slug}`)}
              className="glass-control focus-ring group flex w-full cursor-pointer items-center gap-4 rounded-2xl p-5 text-left"
            >
              <ProjectLogo project={next} className="h-11 w-11" size={44} />
              <span className="flex min-w-0 flex-1 flex-col">
                <Eyebrow>{`Next chapter · est. ${next.year}`}</Eyebrow>
                <span className="mt-1 truncate font-display text-2xl tracking-tight text-ink">
                  {next.title}
                </span>
              </span>
              <span
                aria-hidden
                className="text-ink/60 transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </Reveal>
        )}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="glass-control focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-ink"
        >
          <span aria-hidden>←</span>
          Back home
        </button>
      </div>
    </main>
  );
}
