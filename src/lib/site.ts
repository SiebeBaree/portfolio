import { COINZ_STATS, ENKRYPTIFY_FUNDING } from "@/lib/projects";

/*
 * SHARED. The one place the production origin and site-wide copy live, read
 * by the root layout, the sitemap, robots and the /work metadata. Change the
 * domain here and every canonical, OG tag and sitemap entry follows.
 */

export const SITE_URL = "https://siebebaree.com";

export const SITE_NAME = "Siebe Barée";

export const SITE_DESCRIPTION = `Founder of Enkryptify and Coinz. ${ENKRYPTIFY_FUNDING} in VC funding raised for Enkryptify. Coinz reached ${COINZ_STATS.users} users and ${COINZ_STATS.peakDailyActive} daily active users at its peak. Based in Ghent, Belgium.`;

export const SITE_LINKS = {
  github: "https://github.com/SiebeBaree",
  linkedin: "https://www.linkedin.com/in/siebe-baree",
  x: "https://x.com/BareeSiebe",
} as const;

export const CONTACT_EMAIL = "bareesiebe@gmail.com";
