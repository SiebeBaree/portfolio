import type { MetadataRoute } from "next";
import { BLOG_POSTS, blogPostTime } from "@/lib/blog";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      // posts are sorted newest first
      lastModified: BLOG_POSTS[0] && blogPostTime(BLOG_POSTS[0]),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/videos`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: blogPostTime(post),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
