import type { ComponentType } from "react";
import { post as gettingAJob } from "@/content/blog/getting-a-software-engineering-job-in-belgium";
import { post as claudeAndBack } from "@/content/blog/moving-from-claude-to-chatgpt-and-back";
import { post as whyEnkryptifyFailed } from "@/content/blog/why-enkryptify-failed";

export type BlogPost = {
  slug: string;
  title: string;
  /** Publication date in YYYY-MM-DD format. */
  date: string;
  description: string;
  Content: ComponentType;
};

/**
 * Register posts here. The index, sitemap, RSS feed, OG cards and llms.txt
 * follow automatically.
 */
export const BLOG_POSTS: BlogPost[] = [
  gettingAJob,
  claudeAndBack,
  whyEnkryptifyFailed,
].sort((a, b) => b.date.localeCompare(a.date));

export const BLOG_DESCRIPTION =
  "Siebe Barée on building startups, coding with AI and working as a software engineer in Belgium.";

/** Served by src/app/blog/feed.xml/route.ts and linked from every blog page. */
export const BLOG_FEED_PATH = "/blog/feed.xml";

/** Midnight UTC on the post date, the timestamp used in every feed and tag. */
export function blogPostTime(post: BlogPost) {
  return new Date(`${post.date}T00:00:00Z`);
}

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
