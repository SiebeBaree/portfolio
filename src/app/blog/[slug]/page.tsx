import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SkyBackground from "@/components/backdrop/SkyBackground";
import AuthorFooter from "@/components/blog/AuthorFooter";
import StoryLink from "@/components/ui/StoryLink";
import { BLOG_POSTS, formatBlogDate, getBlogPost } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";
import styles from "../blog.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} · ${SITE_NAME}`,
      description: post.description,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: [SITE_NAME],
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} · ${SITE_NAME}`,
      description: post.description,
      images: ["/og.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const { Content } = post;
  return (
    <>
      <SkyBackground />
      <main className={styles.page}>
        <nav aria-label="Blog navigation" className={styles.nav}>
          <StoryLink href="/" className="focus-ring">
            {SITE_NAME}
          </StoryLink>
          <StoryLink href="/blog" className="focus-ring">
            ← All posts
          </StoryLink>
        </nav>
        <article>
          <header className={styles.articleHeader}>
            <h1>{post.title}</h1>
            <p className={styles.date}>
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time> ·{" "}
              {SITE_NAME}
            </p>
          </header>
          <div className={styles.body}>
            <Content />
          </div>
          <AuthorFooter />
        </article>
        <footer className={styles.footer}>
          <StoryLink href="/blog" className={`${styles.back} focus-ring`}>
            ← All posts
          </StoryLink>
        </footer>
      </main>
    </>
  );
}
