import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SkyBackground from "@/components/backdrop/SkyBackground";
import AuthorFooter from "@/components/blog/AuthorFooter";
import StoryLink from "@/components/ui/StoryLink";
import {
  BLOG_FEED_PATH,
  BLOG_POSTS,
  type BlogPost,
  blogPostTime,
  formatBlogDate,
  getBlogPost,
} from "@/lib/blog";
import {
  BASE_OPEN_GRAPH,
  BASE_TWITTER,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
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
  // og:image and twitter:image come from ./opengraph-image.tsx
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
      types: { "application/rss+xml": BLOG_FEED_PATH },
    },
    openGraph: {
      ...BASE_OPEN_GRAPH,
      type: "article",
      title: `${post.title} · ${SITE_NAME}`,
      description: post.description,
      url: `/blog/${slug}`,
      publishedTime: blogPostTime(post).toISOString(),
      authors: [SITE_URL],
    },
    twitter: {
      ...BASE_TWITTER,
      title: `${post.title} · ${SITE_NAME}`,
      description: post.description,
    },
  };
}

/** BlogPosting schema so search engines read the post as an article by Siebe. */
function articleJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const published = blogPostTime(post).toISOString();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    datePublished: published,
    dateModified: published,
    inLanguage: "en",
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE_NAME,
      url: SITE_URL,
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
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from the post registry
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleJsonLd(post)),
            }}
          />
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
