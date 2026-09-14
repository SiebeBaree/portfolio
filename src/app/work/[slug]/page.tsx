import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SkyBackground from "@/components/backdrop/SkyBackground";
import ProjectChapter from "@/components/sections/ProjectChapter";
import { getChapter } from "@/lib/chapters";
import { getProject, PROJECTS } from "@/lib/projects";

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
  if (!project) notFound();
  const chapter = getChapter(project.slug);
  const description = chapter.description;
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

/** Follow the curated story order. */
function nextChapterAfter(slug: string) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[index + 1] ?? null;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const chapter = getChapter(project.slug);

  return (
    <>
      <SkyBackground />
      <ProjectChapter
        project={project}
        chapter={chapter}
        next={nextChapterAfter(slug)}
      />
    </>
  );
}
