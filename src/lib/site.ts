import { COINZ_STATS, ENKRYPTIFY_FUNDING } from "@/lib/projects";

/*
 * SHARED. The one place the production origin and site-wide copy live, read
 * by the root layout, the sitemap, robots and the /work metadata. Change the
 * domain here and every canonical, OG tag and sitemap entry follows.
 */

export const SITE_URL = "https://siebebaree.com";

export const SITE_NAME = "Siebe Barée";

export const SITE_DESCRIPTION = `Technical founder looking for a co-founder to lead the business. Built Coinz to ${COINZ_STATS.users} users and raised ${ENKRYPTIFY_FUNDING} for Enkryptify. In San Francisco for three weeks in January.`;

export const SITE_LINKS = {
  github: "https://github.com/SiebeBaree",
  linkedin: "https://www.linkedin.com/in/siebe-baree",
  x: "https://x.com/BareeSiebe",
} as const;

export const CONTACT_EMAIL = "bareesiebe@gmail.com";

export const SF_MEETUP_EMAIL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Meet in San Francisco in January")}`;

export const COFOUNDER_EMAIL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's talk about building a company together")}`;
