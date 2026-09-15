# Siebe Barée

My personal website, built with Next.js, React, TypeScript and Motion.

## Development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server runs on port 3000. To use another port:

```sh
pnpm dev --port 5187
```

No environment variables or external services are needed to run the site.

## Checks

```sh
pnpm lint
pnpm build
```

## Editing the site

- `src/app/page.tsx` composes the homepage. Sections own their layout and styles.
- `src/lib/projects.ts` defines the public story routes and featured project figures.
- `src/lib/chapters.ts` contains a complete story for each project. TypeScript checks that each route has content.
- `src/lib/site.ts` contains site metadata and contact links.
- `public/llms.txt` provides a plain-text summary. Update it when changing the featured projects or their figures.

Motion is shared through `src/lib/timeline.ts` and `src/lib/ambient-ticker.ts`. Ambient movement uses the shared ticker and stops offscreen. New motion should respect reduced-motion preferences.

See [AGENTS.md](AGENTS.md) for the component map and contribution conventions.

## Blog posts

The blog index is at `/blog`. Each post has its own `/blog/[slug]` page. Posts
are hard-coded and pre-rendered at build time. There is no CMS or database.

### Add a post

1. Copy `src/content/blog/getting-a-software-engineering-job-in-belgium.tsx` to a new file in the same folder.
2. Set a unique URL-safe `slug`, a `title`, a `date` in `YYYY-MM-DD` format and a
   short `description`. The filename can match the slug.
3. Write the article inside `Content`. Use ordinary JSX blocks such as `<p>`,
   `<h2>`, `<h3>`, `<ul>`, `<ol>`, `<blockquote>` and `<pre>`. The page supplies the
   title and date, so start the body with a paragraph rather than another `<h1>`.
   For images, use `next/image` with alt text and dimensions. Put local images in
   `public/blog/` and use `/blog/filename.webp` as the source. Wrap an image in
   `<figure>` with a `<figcaption>` when it needs a caption.
4. Import the post in `src/lib/blog.ts` and add it to `BLOG_POSTS`:

   ```tsx
   import { post as myNewPost } from "@/content/blog/my-new-post";

   export const BLOG_POSTS: BlogPost[] = [gettingAJob, myNewPost].sort((a, b) =>
     b.date.localeCompare(a.date),
   );
   ```

5. Preview `/blog` and the article locally. Run `pnpm lint` and `pnpm build`.
6. Commit and push to the deployed branch. A new push for each blog post is the
   intended publishing workflow. The post is available as soon as that deployment
   completes. The index, metadata and sitemap update automatically.

Every registered post is public, including posts with future dates. Keep drafts
out of `BLOG_POSTS` until they are ready.

The blog layout lives in `src/app/blog/` and its styles in
`src/app/blog/blog.module.css`.

Every article automatically includes the shared author footer. Edit the bio in
`src/components/blog/AuthorFooter.tsx` and its appearance in
`src/components/blog/author-footer.module.css`. The portrait is `public/portrait.webp`.
The footer uses the existing name and contact links from `src/lib/site.ts` and
headline figures from `src/lib/projects.ts`. You do not need to add it to each post.
