import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local"; // 1. Uvozi localFont
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Blood Eagle",
  description: "Blood Eagle is a Industrial techno collective based in Ljubljana, Slovenia.",
};

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// 2. Definiraj svoj preneseni horror font
const horrorFont = localFont({
  src: "fonts/MidnightLegacy.otf", // Prilagodi pot in ime datoteke (npr. v app/fonts/)
  variable: "--font-horror",
});

export default function RootLayout({ children }) {
  return (
    // 3. Dodaj horrorFont.variable med ostale spremenljivke
    <html 
      lang="en" 
      className={`${archivoBlack.variable} ${jetbrainsMono.variable} ${horrorFont.variable}`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}