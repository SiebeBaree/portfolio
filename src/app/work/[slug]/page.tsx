import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SkyBackground from "@/components/backdrop/SkyBackground";
import ProjectChapter from "@/components/sections/ProjectChapter";
import ProjectComingSoon from "@/components/sections/ProjectComingSoon";
import { getChapter } from "@/lib/chapters";
import { getProject, PROJECTS } from "@/lib/projects";

/*
 * One page per previous project, reached through the cloud transition from
 * the bento grid. Projects with a written chapter (lib/chapters.ts) render
 * the full story; the rest still read "Coming soon" until their assets
 * arrive.
 */

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const chapter = getChapter(slug);
  const description =
    chapter?.description ??
    `${project.title}, a project Siebe Barée started in ${project.year}. Chapter coming soon.`;
  return {
    // the root layout's title template appends "· Siebe Barée"
    title: project.title,
    description,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `/work/${slug}`,
      title: `${project.title} · Siebe Barée`,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · Siebe Barée`,
      description,
      images: ["/og.png"],
    },
  };
}

/** the next older project that already has a written chapter */
function nextChapterAfter(slug: string) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS.slice(index + 1).find((p) => getChapter(p.slug)) ?? null;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const chapter = getChapter(slug);

  return (
    <>
      <SkyBackground />
      {chapter ? (
        <ProjectChapter
          project={project}
          chapter={chapter}
          next={nextChapterAfter(slug)}
        />
      ) : (
        <ProjectComingSoon project={project} />
      )}
    </>
  );
}
