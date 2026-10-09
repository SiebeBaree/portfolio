/**
 * Public story routes, in reading order. `group` decides where the homepage
 * lists a project: the track record, the list of apps or the earlier work.
 */
export const PROJECTS = [
  { slug: "enkryptify", title: "Enkryptify", year: 2024, group: "featured" },
  { slug: "coinz", title: "Coinz", year: 2022, group: "featured" },
  { slug: "notchlet", title: "Notchlet", year: 2026, group: "app" },
  { slug: "bmail", title: "bMail", year: 2026, group: "app" },
  { slug: "pitchpoppy", title: "PitchPoppy", year: 2026, group: "app" },
  { slug: "plan-baree-be", title: "plan.baree.be", year: 2026, group: "app" },
  { slug: "files-baree-be", title: "files.baree.be", year: 2026, group: "app" },
  { slug: "imprint", title: "Imprint", year: 2026, group: "app" },
  { slug: "umber", title: "Umber", year: 2026, group: "app" },
  { slug: "anyfmt", title: "anyfmt", year: 2026, group: "app" },
  {
    slug: "eevee-mobility",
    title: "EEVEE Mobility",
    year: 2024,
    group: "earlier",
  },
  {
    slug: "aquasolutions",
    title: "AquaSolutions",
    year: 2021,
    group: "earlier",
  },
  { slug: "bothosted", title: "BotHosted", year: 2019, group: "earlier" },
  { slug: "maxerg", title: "MaxerG", year: 2016, group: "earlier" },
  { slug: "bookmarks", title: "Bookmarks", year: 2013, group: "earlier" },
] as const;

export type Project = (typeof PROJECTS)[number];

/** Figures confirmed by Siebe. Daily activity is the peak, not a lifetime average. */
export const COINZ_STATS = { users: "1.35M", peakDailyActive: "16K" } as const;
export const ENKRYPTIFY_FUNDING = "$260K";

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function projectsIn<G extends Project["group"]>(group: G) {
  return PROJECTS.filter(
    (project): project is Extract<Project, { group: G }> =>
      project.group === group,
  );
}
