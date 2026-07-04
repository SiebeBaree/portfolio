import type { Metadata, Viewport } from "next";
import { Mona_Sans, Newsreader } from "next/font/google";
import { SITE_URL } from "@/content/copy";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const DESCRIPTION =
  "I've been building things since I was nine. Most of them failed, one reached 1.4 million people and the newest one is called Enkryptify.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Siebe Barée — Co-founder of Enkryptify",
    template: "%s — Siebe Barée",
  },
  description: DESCRIPTION,
  applicationName: "Siebe Barée",
  authors: [{ name: "Siebe Barée", url: SITE_URL }],
  creator: "Siebe Barée",
  publisher: "Siebe Barée",
  keywords: [
    "Siebe Barée",
    "Enkryptify",
    "secrets management",
    "software engineer",
    "founder",
    "startup",
    "Ghent",
    "Belgium",
    "Coinz",
    "developer portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Siebe",
    lastName: "Barée",
    username: "SiebeBaree",
    url: SITE_URL,
    siteName: "Siebe Barée",
    title: "Siebe Barée — Co-founder of Enkryptify",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siebe Barée — Co-founder of Enkryptify",
    description: DESCRIPTION,
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
  category: "technology",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#12100c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} ${newsreader.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
