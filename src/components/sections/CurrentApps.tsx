"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { Fragment, useEffect, useRef } from "react";
import anyfmtShot from "@/assets/work/anyfmt-convert.webp";
import bmailShot from "@/assets/work/bmail-inbox.webp";
import filesShot from "@/assets/work/files-baree-be-drive.webp";
import imprintShot from "@/assets/work/imprint-biscoff.webp";
import notchletShot from "@/assets/work/notchlet-notch.webp";
import pitchpoppyShot from "@/assets/work/pitchpoppy-home.webp";
import planShot from "@/assets/work/plan-baree-be-mail-plan.webp";
import umberShot from "@/assets/work/umber-koi.webp";
import StoryLink from "@/components/ui/StoryLink";
import { LOGOS } from "@/lib/logos";
import { getProject, type Project, projectsIn } from "@/lib/projects";

/*
 * The apps at golden hour (`data-hour` tells the sky). A pinned filmstrip:
 * the section is as tall as the strip is wide, the stage sticks for that
 * whole distance, and vertical scrolling slides the row of apps sideways.
 * The sun is low on the right, so the light on the screenshots comes from
 * that side and the shadows fall back to the left. The strip leaves while
 * dusk falls, so its text uses the shared `--hour-ink` from globals.css.
 */

type AppSlug = Extract<Project, { group: "app" }>["slug"];

/** Strip order, one line per app and its screenshot. The full story lives on its /work page. */
const APPS: { slug: AppSlug; summary: string; shot: StaticImageData }[] = [
  {
    slug: "umber",
    summary:
      "An open source image and video studio. Your API keys, your models.",
    shot: umberShot,
  },
  {
    slug: "bmail",
    summary:
      "My own mail app. Gmail, Outlook and my own domains in one fast inbox that feels offline.",
    shot: bmailShot,
  },
  {
    slug: "notchlet",
    summary:
      "An open source Mac app that tracks your AI coding usage from the notch.",
    shot: notchletShot,
  },
  {
    slug: "pitchpoppy",
    summary:
      "Enter your website and get a completely new one for free, to use as inspiration.",
    shot: pitchpoppyShot,
  },
  {
    slug: "plan-baree-be",
    summary:
      "Upload HTML plans to the cloud so I can read them on any laptop or my phone and build from anywhere.",
    shot: planShot,
  },
  {
    slug: "files-baree-be",
    summary:
      "File uploads made for AI agents, so they can send files to each other and add them to GitHub.",
    shot: filesShot,
  },
  {
    slug: "imprint",
    summary:
      "A 4-hour build that generates Instagram images for brands with physical products.",
    shot: imprintShot,
  },
  {
    slug: "anyfmt",
    summary: "Convert images in your browser. Your files stay on your device.",
    shot: anyfmtShot,
  },
];

/** vertical scroll spent per pixel of horizontal travel */
const SCROLL_PER_PX = 0.8;

const SHADOW =
  "drop-shadow(-10px 14px 14px rgb(120 56 22 / 0.22)) drop-shadow(-44px 52px 54px rgb(120 56 22 / 0.24))";

function EarlierWork() {
  const earlier = projectsIn("earlier");
  return (
    <p className="text-sm leading-loose text-[var(--hour-muted)]">
      Earlier work:{" "}
      {earlier.map((project, i) => (
        <Fragment key={project.slug}>
          <StoryLink
            href={`/work/${project.slug}`}
            className="focus-ring text-[var(--hour-ink)] underline decoration-[var(--hour-line)] underline-offset-4 transition-colors hover:decoration-[var(--hour-ink)]"
          >
            {project.title}
          </StoryLink>
          {i < earlier.length - 2
            ? ", "
            : i === earlier.length - 2
              ? " and "
              : "."}
        </Fragment>
      ))}
      <StoryLink
        href="/blog"
        className="focus-ring ml-8 inline-flex items-center gap-2 text-[var(--hour-ink)] underline decoration-[var(--hour-line)] underline-offset-4 hover:decoration-[var(--hour-ink)]"
      >
        Blog <span aria-hidden>↗</span>
      </StoryLink>
    </p>
  );
}

export default function CurrentApps() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  // how far the row has to travel, measured from the laid-out strip
  const travel = useMotionValue(0);

  useEffect(() => {
    const row = rowRef.current;
    const section = sectionRef.current;
    if (!row || !section) return;
    const measure = () => {
      const distance = Math.max(0, row.scrollWidth - window.innerWidth);
      travel.set(distance);
      // the strip moves a little faster than the page scrolls
      section.style.height = reducedMotion
        ? ""
        : `calc(100svh + ${Math.round(distance * SCROLL_PER_PX)}px)`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [travel, reducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    [scrollYProgress, travel],
    ([p, d]: number[]) => -p * d,
  );

  return (
    <section
      ref={sectionRef}
      data-hour="golden"
      aria-labelledby="other-work-title"
      className="relative"
    >
      {/* reduced motion swaps the pinned slide for a plain swipeable row, in
          CSS so the server's markup already matches */}
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden motion-reduce:relative">
        <div className="motion-reduce:overflow-x-auto">
          <motion.div
            ref={rowRef}
            style={{ x }}
            className="flex w-max motion-reduce:transform-none! items-start gap-[clamp(2.5rem,5vw,5.5rem)] pr-[8vw] pl-6 sm:pl-[7vw] [--tile-h:clamp(15rem,44svh,27rem)] max-md:[--tile-h:34svh]"
          >
            <h2
              id="other-work-title"
              className="flex h-[var(--tile-h)] w-[min(78vw,26rem)] shrink-0 items-end font-display text-[clamp(3rem,5.4vw,5.6rem)] leading-[0.98] tracking-[-0.035em] text-[var(--hour-ink)]"
            >
              A few other things I&apos;ve built.
            </h2>
            {APPS.map((app) => {
              const logo = LOGOS[app.slug]?.image;
              return (
                <StoryLink
                  key={app.slug}
                  href={`/work/${app.slug}`}
                  className="focus-ring group block shrink-0"
                >
                  <div
                    className="relative h-[var(--tile-h)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
                    style={{
                      aspectRatio: `${app.shot.width} / ${app.shot.height}`,
                      filter: SHADOW,
                    }}
                  >
                    <Image
                      src={app.shot}
                      alt=""
                      sizes="(max-width: 768px) 80vw, 50vw"
                      className="h-full w-full rounded-[14px] object-cover"
                    />
                    {/* low sun from the right: a warm wash, strongest on the lit edge */}
                    <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-[linear-gradient(255deg,rgb(255_196_128/0.34)_0%,rgb(255_190_120/0.1)_38%,rgb(255_190_120/0)_62%)] mix-blend-soft-light" />
                    <div className="pointer-events-none absolute inset-0 rounded-[14px] shadow-[inset_-1px_1px_0_rgb(255_226_190/0.55)]" />
                  </div>
                  <div className="mt-6 flex max-w-[22rem] gap-3.5">
                    {logo && (
                      <Image
                        src={logo}
                        alt=""
                        width={32}
                        height={32}
                        unoptimized
                        className="mt-0.5 h-8 w-8 shrink-0 rounded-[8px] transition-transform duration-200 group-hover:-rotate-6"
                      />
                    )}
                    <div>
                      <h3 className="font-display text-[1.7rem] leading-none tracking-tight text-[var(--hour-ink)]">
                        {getProject(app.slug)?.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--hour-muted)]">
                        {app.summary}
                      </p>
                    </div>
                  </div>
                </StoryLink>
              );
            })}
          </motion.div>
        </div>
        {/* the archive rides along under the strip instead of trailing it */}
        <div className="absolute bottom-[max(6.5rem,11svh)] left-6 max-w-[60rem] pr-6 sm:left-[7vw] max-md:bottom-[7.5rem]">
          <EarlierWork />
        </div>
      </div>
    </section>
  );
}
