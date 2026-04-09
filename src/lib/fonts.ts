import { Nunito, Overpass, Outfit } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["200", "400", "700"],
  display: "swap",
  variable: "--font-nunito",
});

export const overpass = Overpass({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-overpass",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
});
