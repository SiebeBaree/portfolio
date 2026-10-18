"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import coinzShot from "@/assets/work/coinz-website.webp";
import Reveal from "@/components/ui/Reveal";
import StoryLink from "@/components/ui/StoryLink";
import { LOGOS } from "@/lib/logos";
import { COINZ_STATS, ENKRYPTIFY_FUNDING } from "@/lib/projects";
import enkryptifyShot from "../../../public/apps/enkryptify-secrets.webp";

/*
 * The track record in afternoon light (`data-hour` tells the sky). Two
 * full-screen scenes, mirrored: the figure huge on one side, the screenshot
 * bleeding off the other edge. The sun sits low on the right all afternoon,
 * so every shadow falls to the lower left.
 */

type Scene = {
  slug: "coinz" | "enkryptify";
  name: string;
  years: string;
  figure: string;
  figureLabel: string;
  second?: { figure: string; label: string };
  body: string;
  shot: StaticImageData;
  /** crops a shadow border baked into the asset */
  clip?: string;
};

const SCENES: Scene[] = [
  {
    slug: "coinz",
    name: "Coinz",
    years: "2022 to 2025",
    figure: COINZ_STATS.users,
    figureLabel: "users",
    second: {
      figure: COINZ_STATS.peakDailyActive,
      label: "daily active at its peak",
    },
    body: "I built and ran an economy game inside Discord for three years. I wrote the game, kept it running and grew its community.",
    shot: coinzShot,
  },
  {
    slug: "enkryptify",
    name: "Enkryptify",
    years: "Founded 2024",
    figure: ENKRYPTIFY_FUNDING,
    figureLabel: "raised",
    body: "I founded a company that helped software teams manage their API keys and credentials. We raised VC funding and had paying customers.",
    shot: enkryptifyShot,
    clip: "inset(5.186% 3.892% round 12px)",
  },
];

// long, soft and warm: three stacked shadows thrown away from the sun
const SUN_SHADOW =
  "drop-shadow(-12px 16px 16px rgb(96 56 34 / 0.22)) drop-shadow(-50px 62px 60px rgb(96 56 34 / 0.26)) drop-shadow(-120px 140px 120px rgb(96 56 34 / 0.2))";

function ProjectScene({ scene, flip }: { scene: Scene; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // the screenshot travels a little faster than the words beside it
  const shotY = useTransform(scrollYProgress, [0, 1], ["9vh", "-9vh"]);
  const logo = LOGOS[scene.slug]?.image;
  const href = `/work/${scene.slug}`;

  return (
    <section
      ref={ref}
      aria-labelledby={`${scene.slug}-title`}
      className="relative flex min-h-[100svh] items-center py-24 max-md:flex-col max-md:items-stretch max-md:py-16"
    >
      <div
        className={`relative z-10 w-full px-6 sm:px-10 md:w-[44%] ${
          flip ? "md:ml-auto md:pr-[6vw] md:pl-0" : "md:pl-[7vw]"
        }`}
      >
        <Reveal>
          <div className="flex items-center gap-3">
            {logo && (
              <Image
                src={logo}
                alt=""
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8"
              />
            )}
            <div className="leading-tight">
              <h3
                id={`${scene.slug}-title`}
                className="font-display text-2xl tracking-tight"
              >
                {scene.name}
              </h3>
              <p className="text-xs text-ink/65">{scene.years}</p>
            </div>
          </div>
          <p className="mt-8 font-display text-[clamp(6.5rem,18.5vw,19rem)] leading-[0.8] tracking-[-0.055em] text-ink">
            {scene.figure}
          </p>
          <p className="mt-7 text-sm text-ink/70">{scene.figureLabel}</p>
          {scene.second && (
            <p className="mt-7 flex items-baseline gap-3">
              <span className="font-display text-5xl tracking-[-0.03em]">
                {scene.second.figure}
              </span>
              <span className="text-sm text-ink/70">{scene.second.label}</span>
            </p>
          )}
          <p className="mt-8 max-w-md text-base leading-relaxed text-ink/80 sm:text-[17px]">
            {scene.body}
          </p>
          <StoryLink
            href={href}
            className="focus-ring group mt-7 inline-flex items-center gap-5 border-b border-ink/40 pb-2 text-sm"
          >
            More about {scene.name}
            <span
              aria-hidden
              className="text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </StoryLink>
        </Reveal>
      </div>

      <motion.div
        className={`motion-reduce:transform-none! md:absolute md:top-1/2 md:w-[54vw] md:-translate-y-1/2 max-md:mt-12 max-md:w-[118vw] ${
          flip
            ? "md:left-[-6vw] max-md:-ml-[24vw]"
            : "md:right-[-6vw] max-md:ml-6"
        }`}
        style={{ y: shotY, filter: SUN_SHADOW }}
      >
        <StoryLink
          href={href}
          aria-label={`Read the ${scene.name} story`}
          className="focus-ring block"
        >
          <Image
            src={scene.shot}
            alt=""
            sizes="(max-width: 768px) 118vw, 54vw"
            className="block h-auto w-full rounded-[12px]"
            style={scene.clip ? { clipPath: scene.clip } : undefined}
          />
        </StoryLink>
      </motion.div>
    </section>
  );
}

export default function TrackRecord() {
  return (
    <div id="work" data-hour="afternoon" className="scroll-mt-10">
      <h2 className="sr-only">My track record.</h2>
      {SCENES.map((scene, i) => (
        <ProjectScene key={scene.slug} scene={scene} flip={i % 2 === 1} />
      ))}
    </div>
  );
}
