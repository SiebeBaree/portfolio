import type { Metadata } from "next";
import { Mona_Sans, Newsreader } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Siebe Barée",
  description:
    "I've been building things since I was nine. Most of them failed, one reached 1.4 million people and the newest one is called Enkryptify.",
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
