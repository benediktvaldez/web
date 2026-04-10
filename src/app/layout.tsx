import type { Metadata } from "next";
import { nunito, overpass, outfit } from "@/lib/fonts";
import "./globals.css";

const baseUrl = "https://valdez.is";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Benedikt D. Valdez",
    template: "%s | Benedikt D. Valdez",
  },
  description:
    "Developer and creator of digital experiences. 15 years building for the web.",
  openGraph: {
    type: "website",
    siteName: "Benedikt D. Valdez",
    locale: "en",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${overpass.variable} ${outfit.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
