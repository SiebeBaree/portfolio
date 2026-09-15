<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Component map

Every part of the site is one file, so separate sessions can each own one part
without colliding. Listed roughly in the order they paint.

| Part | Files |
| --- | --- |
| Sky backdrop: gradient, drifting white blobs, film grain | `src/components/backdrop/SkyBackground.tsx` |
| Cloud intro and scroll-out | `src/components/backdrop/CloudLayer.tsx` |
| Scroll cue in the bottom-left corner of the first screen | `src/components/overlay/ScrollCue.tsx`, `scroll-cue.css` |
| Liquid Glass dock of contact links, pinned bottom centre | `src/components/overlay/Dock.tsx`, `dock.css` |
| Overlay scrollbar | `src/components/overlay/ScrollbarOverlay.tsx` |
| Hero: co-founder search, name and portrait choreography | `src/components/sections/Hero.tsx` |
| Co-founder fit: business ownership and commitment | `src/components/sections/CoFounder.tsx` |
| ASCII signature logo | `src/components/hero/AsciiSignature.tsx` |
| Portrait cutout | `src/components/hero/Portrait.tsx` |
| About me: hover-word scenes, birds, handwritten sign-off | `src/components/sections/About.tsx` |
| Other apps and optional earlier stories: compact links | `src/components/sections/CurrentApps.tsx` |
| Track record: Enkryptify and Coinz as supporting evidence | `src/components/sections/TrackRecord.tsx`, `track-record.module.css` |
| Invitation to meet potential co-founders in San Francisco | `src/components/sections/Contact.tsx` |
| Cloud page transition and its navigate hook | `src/components/transition/CloudTransition.tsx` |
| Project pages: /work/[slug], one complete story per project | `src/app/work/[slug]/page.tsx`, `src/components/sections/ProjectChapter.tsx` |
| Shared blog author footer | `src/components/blog/AuthorFooter.tsx`, `author-footer.module.css` |
| Blog index, article pages and typography | `src/app/blog/` |
| Hard-coded blog posts and registry | `src/content/blog/`, `src/lib/blog.ts` |
| Chapter stories, one entry per project (images in `src/assets/work/` and `public/apps/`) | `src/lib/chapters.ts` |

## Shared, so coordinate before changing

These are the only things more than one part depends on. Prefer solving a
problem inside your own file first.

- `src/app/globals.css`: colour tokens, glass utilities, focus ring, reduced motion
- `src/lib/timeline.ts`: the load-in timing contract shared by the hero, the clouds and the scroll cue
- `src/lib/ambient-ticker.ts`: the one ~20Hz heartbeat for slow ambient drift (sky blobs, cloud bob, the About birds). Never give ambient motion its own CSS animation, rAF loop or timer: anything running at display refresh rate keeps every backdrop-filter re-blurring and the compositor awake, which is exactly the CPU burn this ticker exists to prevent. Gate offscreen ambience (unsubscribe when the owner is out of view)
- `src/lib/projects.ts`: the public story list and confirmed headline figures, read by the homepage and /work pages
- `src/lib/logos.ts` and `src/components/ui/ProjectLogo.tsx`: the slug-to-logo map and the logo tile with a monogram fallback, used by the /work pages
- `src/components/ui/StoryLink.tsx`: native links with the shared cloud navigation treatment
- `src/components/ui/Reveal.tsx`: the single scroll-reveal treatment
- `src/components/ui/Eyebrow.tsx`: the small uppercase section label
- `src/app/page.tsx`: composition order and nothing else

## House rules

- No em-dashes and no Oxford commas in any copy.
- Sections repeat their own layout classes instead of sharing a wrapper, so restyling one section cannot disturb another.
- Verify visual work in a real browser. The Claude browser pane reports itself as a hidden tab, which suspends requestAnimationFrame and freezes every motion animation, so use the chrome-devtools MCP for anything animated.
