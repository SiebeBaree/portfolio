/** Public story routes. The homepage selects its featured stories explicitly. */
export const PROJECTS = [
  { slug: "enkryptify", title: "Enkryptify", year: 2024 },
  { slug: "coinz", title: "Coinz", year: 2022 },
  { slug: "eevee-mobility", title: "EEVEE Mobility", year: 2024 },
  { slug: "aquasolutions", title: "AquaSolutions", year: 2021 },
  { slug: "bothosted", title: "BotHosted", year: 2019 },
  { slug: "maxerg", title: "MaxerG", year: 2016 },
  { slug: "bookmarks", title: "Bookmarks", year: 2013 },
] as const;

export type Project = (typeof PROJECTS)[number];

/** Figures confirmed by Siebe. Daily activity is the peak, not a lifetime average. */
export const COINZ_STATS = { users: "1.35M", peakDailyActive: "16K" } as const;
export const ENKRYPTIFY_FUNDING = "€225K";

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
