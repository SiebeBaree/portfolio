import {
  BLOG_DESCRIPTION,
  BLOG_FEED_PATH,
  BLOG_POSTS,
  blogPostTime,
} from "@/lib/blog";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** RSS 2.0 feed of every post, newest first, built at build time. */
export function GET() {
  const items = BLOG_POSTS.map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${blogPostTime(post).toUTCString()}</pubDate>
      <author>${CONTACT_EMAIL} (${escapeXml(SITE_NAME)})</author>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`Blog · ${SITE_NAME}`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}${BLOG_FEED_PATH}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
