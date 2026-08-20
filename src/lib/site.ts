/*
 * SHARED. The one place the production origin and site-wide copy live, read
 * by the root layout, the sitemap, robots and the /work metadata. Change the
 * domain here and every canonical, OG tag and sitemap entry follows.
 */

export const SITE_URL = "https://siebebaree.com";

export const SITE_NAME = "Siebe Barée";

export const SITE_DESCRIPTION =
  "Founder and software engineer. Building Umber and other free open source tools that feel as good as they work.";

export const SITE_LINKS = {
  github: "https://github.com/SiebeBaree",
  linkedin: "https://www.linkedin.com/in/siebe-baree",
  x: "https://x.com/BareeSiebe",
} as const;

export const CONTACT_EMAIL = "bareesiebe@gmail.com";
