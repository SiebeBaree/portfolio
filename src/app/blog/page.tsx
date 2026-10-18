import type { Metadata } from "next";
import SkyBackground from "@/components/backdrop/SkyBackground";
import StoryLink from "@/components/ui/StoryLink";
import {
  BLOG_DESCRIPTION,
  BLOG_FEED_PATH,
  BLOG_POSTS,
  formatBlogDate,
} from "@/lib/blog";
import {
  BASE_OPEN_GRAPH,
  BASE_TWITTER,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
} from "@/lib/site";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": BLOG_FEED_PATH },
  },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    type: "website",
    title: `Blog · ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    url: "/blog",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    ...BASE_TWITTER,
    title: `Blog · ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function BlogPage() {
  return (
    <>
      <SkyBackground />
      <main className={styles.page}>
        <nav aria-label="Blog navigation" className={styles.nav}>
          <StoryLink href="/" className="focus-ring">
            {SITE_NAME}
          </StoryLink>
          <StoryLink href="/" className="focus-ring">
            ← Home
          </StoryLink>
        </nav>
        <h1 className={styles.heading}>Blog.</h1>
        <ul className={styles.posts}>
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <StoryLink
                href={`/blog/${post.slug}`}
                className={`${styles.post} focus-ring`}
              >
                <time dateTime={post.date} className={styles.date}>
                  {formatBlogDate(post.date)}
                </time>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <span className={styles.read}>
                  Read post <span aria-hidden="true">↗</span>
                </span>
              </StoryLink>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
