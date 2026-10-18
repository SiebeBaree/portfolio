import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BLOG_POSTS, formatBlogDate, getBlogPost } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";

/*
 * The share card for each post: the title in the display serif on the site's
 * sky, with the portrait cutout on the right. Built once per post at build
 * time. The sky plate is a pre-rendered still of SkyBackground without the
 * grain, which would double the PNG to over 1 MB.
 */

export const alt = `Blog post by ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

const asset = (file: string) =>
  readFile(join(process.cwd(), "src/assets/og", file));

const dataUrl = async (file: string, mime: string) =>
  `data:${mime};base64,${(await asset(file)).toString("base64")}`;

const [serif, inter, sky, portrait] = await Promise.all([
  asset("instrument-serif-400.woff"),
  asset("inter-500.woff"),
  dataUrl("sky.jpg", "image/jpeg"),
  dataUrl("portrait.png", "image/png"),
]);

const INK = "#1c2333";
const MUTED = "#3a4560";

// Steps down so the longest titles still fit in three lines beside the portrait.
const titleSize = (title: string) =>
  title.length <= 24 ? 104 : title.length <= 40 ? 84 : 72;

function Bird({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <svg
      width={22 * scale}
      height={9 * scale}
      viewBox="0 0 22 9"
      aria-hidden="true"
      style={{ position: "absolute", left: x, top: y }}
    >
      <path
        d="M1 7.5C4 2.5 8 2 11 6C14 2 18 2.5 21 7.5"
        fill="none"
        stroke="#5f6b83"
        strokeWidth={1.6 / scale + 0.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) throw new Error(`No blog post for slug "${slug}"`);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        fontFamily: "Inter",
        color: INK,
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse only renders plain img */}
      <img
        src={sky}
        alt=""
        width={1200}
        height={630}
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      <Bird x={640} y={96} scale={1.3} />
      <Bird x={690} y={126} scale={0.9} />
      {/* biome-ignore lint/performance/noImgElement: ImageResponse only renders plain img */}
      <img
        src={portrait}
        alt=""
        width={700}
        height={568}
        style={{ position: "absolute", right: -150, bottom: -6 }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 72,
          bottom: 72,
          width: 600,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 5, color: MUTED }}>BLOG</div>
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: titleSize(post.title),
            lineHeight: 1.04,
            letterSpacing: -1.5,
          }}
        >
          {post.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: "Instrument Serif", fontSize: 34 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 18, color: MUTED }}>
            {formatBlogDate(post.date)}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
