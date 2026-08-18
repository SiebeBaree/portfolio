import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siebe Barée",
  description: "Coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
