import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const defaultOgImage = "/images/projects/ledger/mockup_5.png";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Siripat | UX/UI Designer",
  description: "UX/UI Designer crafting intuitive digital experiences. View my portfolio and case studies.",
  keywords: ["UX designer", "UI designer", "portfolio", "product design", "user experience"],
  authors: [{ name: "Siripat" }],
  openGraph: {
    title: "Siripat | UX/UI Designer",
    description: "UX/UI Designer crafting intuitive digital experiences.",
    type: "website",
    locale: "en_US",
    images: [{ url: defaultOgImage, alt: "Siripat portfolio work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siripat | UX/UI Designer",
    description: "UX/UI Designer crafting intuitive digital experiences.",
    images: [defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
