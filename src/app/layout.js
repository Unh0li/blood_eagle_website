import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata ={
  title: "Blood Eagle",
  description: "Blood Eagle is a Industrial techno collective based in Ljubljana, Slovenia.",
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="bg-black text-white">
        <Navbar />
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
