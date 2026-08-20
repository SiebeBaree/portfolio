/*
 * SHARED. The one list of previous projects, read by the bento grid on the
 * home page and by the /work/[slug] pages. Add a project here and both get
 * it. Order is newest first; `weight` is Siebe's own significance rating
 * (his "x" count, 0 to 5) and drives how much grid area a card gets.
 */

export type Project = {
  slug: string;
  title: string;
  /** the year the project started */
  year: number;
  /** significance, Siebe's own x-rating, 0 (side experiment) and up */
  weight: number;
};

export const PROJECTS: Project[] = [
  { slug: "jarvis", title: "Jarvis", year: 2026, weight: 1 },
  { slug: "karting", title: "Karting", year: 2026, weight: 0 },
  { slug: "eevee-mobility", title: "EEVEE Mobility", year: 2024, weight: 3 },
  { slug: "habitflow", title: "HabitFlow", year: 2024, weight: 1 },
  { slug: "tickr", title: "Tickr", year: 2023, weight: 0 },
  { slug: "gymlyfe", title: "GymLyfe", year: 2023, weight: 0 },
  { slug: "you-owe-me", title: "You owe me", year: 2023, weight: 0 },
  { slug: "coinz", title: "Coinz", year: 2022, weight: 3 },
  { slug: "siebegpt", title: "SiebeGPT", year: 2022, weight: 1 },
  { slug: "invitemanager", title: "InviteManager", year: 2022, weight: 0 },
  { slug: "bigben", title: "BigBen", year: 2021, weight: 0 },
  { slug: "icount", title: "iCount", year: 2021, weight: 1 },
  { slug: "gameout", title: "GameOut", year: 2021, weight: 0 },
  { slug: "aquasolutions", title: "AquaSolutions", year: 2021, weight: 2 },
  { slug: "bothosted", title: "BotHosted", year: 2019, weight: 2 },
  { slug: "maxerg", title: "MaxerG", year: 2016, weight: 2 },
  { slug: "bookmarks", title: "Bookmarks", year: 2013, weight: 0 },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
