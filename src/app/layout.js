import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { AudioProvider } from "@/context/AudioContext";
import RuneColumns from "@/components/RuneColumns";
import CreatorMark from "@/components/CreatorMark";


const DESCRIPTION =
  "Blood Eagle is an industrial techno collective based in Ljubljana, Slovenia.";

/* predogledi povezav rabijo absoluten naslov
   dokler domena ne dela, nastavi NEXT_PUBLIC_SITE_URL v Vercelu */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bloodeagle.si";

/* icon.png in opengraph-image.png sta poleg te datoteke, Next ju najde sam */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Blood Eagle",
  description: DESCRIPTION,
  openGraph: {
    title: "Blood Eagle",
    description: DESCRIPTION,
    siteName: "Blood Eagle",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Eagle",
    description: DESCRIPTION,
  },
};

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-family",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-family",
});

const horrorFont = localFont({
  src: "./fonts/MidnightLegacy.otf",
  variable: "--font-horror-family",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${jetbrainsMono.variable} ${horrorFont.variable}`}
    >
      <body>
        <Script src="https://w.soundcloud.com/player/api.js" strategy="afterInteractive" />
        <AudioProvider>
          <Navbar />
          <RuneColumns />
          {children}
          <CreatorMark />
        </AudioProvider>
      </body>
    </html>
  );
}