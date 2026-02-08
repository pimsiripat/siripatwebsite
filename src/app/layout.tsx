import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const googleSans = localFont({
  src: [
    { path: "../../public/fonts/GoogleSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/GoogleSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/GoogleSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/GoogleSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  title: "Siripat | UX/UI Designer",
  description: "UX/UI Designer crafting intuitive digital experiences. View my portfolio and case studies.",
  keywords: ["UX designer", "UI designer", "portfolio", "product design", "user experience"],
  authors: [{ name: "Siripat" }],
  openGraph: {
    title: "Siripat | UX/UI Designer",
    description: "UX/UI Designer crafting intuitive digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siripat | UX/UI Designer",
    description: "UX/UI Designer crafting intuitive digital experiences.",
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
        className={`${inter.variable} ${googleSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
