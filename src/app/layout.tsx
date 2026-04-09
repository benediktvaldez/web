import type { Metadata } from "next";
import { nunito, overpass, outfit } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Benedikt D. Valdez",
    template: "%s — Benedikt D. Valdez",
  },
  description: "Full stack digital product developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${overpass.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
