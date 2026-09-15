import type { Metadata } from "next";
import SkyBackground from "@/components/backdrop/SkyBackground";
import StoryLink from "@/components/ui/StoryLink";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Siebe Barée.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog · ${SITE_NAME}`,
    description: "Writing by Siebe Barée.",
    url: "/blog",
  },
  twitter: {
    title: `Blog · ${SITE_NAME}`,
    description: "Writing by Siebe Barée.",
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
