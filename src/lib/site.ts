import type { Metadata } from "next";
import { COINZ_STATS, ENKRYPTIFY_FUNDING } from "@/lib/projects";

/*
 * SHARED. The one place the production origin and site-wide copy live, read
 * by the root layout, the sitemap, robots, llms.txt and the /blog and /work
 * metadata. Change the domain here and every canonical, OG tag and sitemap
 * entry follows.
 */

export const SITE_URL = "https://baree.be";

export const SITE_NAME = "Siebe Barée";

/** JSON-LD id of the Person schema in the root layout. */
export const PERSON_ID = `${SITE_URL}/#person`;

export const SITE_DESCRIPTION = `Technical founder looking for someone to start a new company with. Built Coinz to ${COINZ_STATS.users} users and raised ${ENKRYPTIFY_FUNDING} for Enkryptify. In San Francisco from November 3 to December 3.`;

export const SITE_LINKS = {
  github: "https://github.com/SiebeBaree",
  linkedin: "https://www.linkedin.com/in/siebe-baree",
  x: "https://x.com/BareeSiebe",
} as const;

const X_HANDLE = "@BareeSiebe";

/*
 * Next replaces a page's whole openGraph and twitter objects instead of
 * merging them with the layout's, so every page that sets its own spreads
 * these bases to keep the site name, locale and card type.
 */
export const BASE_OPEN_GRAPH = {
  siteName: SITE_NAME,
  locale: "en_US",
} satisfies Metadata["openGraph"];

export const BASE_TWITTER = {
  card: "summary_large_image",
  site: X_HANDLE,
  creator: X_HANDLE,
} satisfies Metadata["twitter"];

export const DEFAULT_OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Siebe Barée, founder and software engineer, in front of a blue sky with clouds",
};

export const CONTACT_EMAIL = "siebe@baree.be";

export const SF_MEETUP_EMAIL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Meet in San Francisco in November")}`;

export const COFOUNDER_EMAIL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's talk about building a company together")}`;

export const VIDEO_EMAIL_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("A motion video for my product")}`;
