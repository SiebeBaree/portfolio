import type { Metadata } from "next";
import {
  Caveat,
  Instrument_Serif,
  Inter,
  Mrs_Saint_Delafield,
} from "next/font/google";
import CloudTransition from "@/components/transition/CloudTransition";
import { SITE_DESCRIPTION, SITE_LINKS, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-logo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Siebe Barée, founder and software engineer, in front of a blue sky with clouds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/*
 * Person schema for search engines and AI crawlers, mirrored by the plain
 * text version in public/llms.txt.
 */
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/portrait.webp`,
  jobTitle: "Founder and software engineer",
  homeLocation: {
    "@type": "Place",
    name: "Limburg, Belgium",
  },
  sameAs: [SITE_LINKS.github, SITE_LINKS.linkedin, SITE_LINKS.x],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${mrsSaintDelafield.variable} ${caveat.variable} antialiased`}
    >
      <body className="font-body">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from constants
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <CloudTransition>{children}</CloudTransition>
      </body>
    </html>
  );
}
