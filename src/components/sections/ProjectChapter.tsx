"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectLogo from "@/components/ui/ProjectLogo";
import Reveal from "@/components/ui/Reveal";
import StoryLink from "@/components/ui/StoryLink";
import type { Chapter, ChapterBlock } from "@/lib/chapters";
import type { Project } from "@/lib/projects";
import { SF_MEETUP_EMAIL_URL } from "@/lib/site";
import { EASE_OUT_QUINT } from "@/lib/timeline";

/** Shared layout for the project stories and their onward links. */
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
            unoptimized
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
}

export default function ProjectChapter({
  project,
  chapter,
  next,
}: {
  project: Project;
  chapter: Chapter;
  /** the next project in the selected story order */
  next: Project | null;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-24 sm:px-10">
      {/* the header, rising in as the transition clouds part */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={
          reducedMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }
        }
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: reducedMotion ? 0 : 0.8,
          ease: EASE_OUT_QUINT,
          delay: reducedMotion ? 0 : 0.35,
        }}
      >
        <ProjectLogo project={project} className="h-14 w-14" size={56} />
        <div className="mt-6">
          <Eyebrow>{`Started in ${project.year}`}</Eyebrow>
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
              className="px-3 py-1 text-[13px] font-medium text-ink/80"
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

      <Reveal className="mt-16 border-t border-ink/15 pt-9">
        <h2 className="font-display text-3xl">In San Francisco in January?</h2>
        <a
          href={SF_MEETUP_EMAIL_URL}
          className="focus-ring mt-4 inline-flex items-center gap-5 border-b border-ink/40 pb-2 text-sm"
        >
          Meet me there <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
      {/* Continue through the selected stories. */}
      <div className="mt-16 flex flex-col items-center gap-6">
        {next && (
          <Reveal className="w-full">
            <StoryLink
              href={`/work/${next.slug}`}
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
            </StoryLink>
          </Reveal>
        )}
        <StoryLink
          href="/"
          className="glass-control focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-ink"
        >
          <span aria-hidden>←</span>
          Back home
        </StoryLink>
      </div>
    </main>
  );
}
