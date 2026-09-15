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
