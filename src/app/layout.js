import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata ={
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


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-black text-white">
        <Navbar />
        <main className=" ">
          {children}
        </main>
      </body>
    </html>
  );
}
