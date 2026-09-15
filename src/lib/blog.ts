import type { ComponentType } from "react";
import { post as gettingAJob } from "@/content/blog/getting-a-software-engineering-job-in-belgium";

export type BlogPost = {
  slug: string;
  title: string;
  /** Publication date in YYYY-MM-DD format. */
  date: string;
  description: string;
  Content: ComponentType;
};

/** Register posts here. The index and sitemap follow automatically. */
export const BLOG_POSTS: BlogPost[] = [gettingAJob].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
