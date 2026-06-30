"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#070707]/80 backdrop-blur-md border-b border-[#8a8a8a]/15 text-[#8a8a8a] font-mono text-[10px] tracking-[0.3em] uppercase">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        
        {/* leva stran tu pride se logo */}
        <Link href="/" className="flex items-center gap-2 text-[#e8e8e8] font-bold tracking-[0.3em] hover:text-[#c81e1e] transition-colors duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c81e1e] animate-pulse" />
          BLOOD EAGLE // INC
        </Link>

        {/* povezave */}
        <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em]">
          <Link href="/about" className="hover:text-[#e8e8e8] hover:line-through transition-colors duration-300">About</Link>
          <Link href="/events" className="hover:text-[#e8e8e8] hover:line-through transition-colors duration-300">Events</Link>
          
          <Link href="/" className="text-[#e8e8e8] text-[13px] font-bold tracking-[0.25em] border-b border-[#c81e1e]/60 pb-0.5 transition-all duration-300 hover:tracking-[0.4em] hover:text-[#c81e1e]">
            HOME
          </Link>
          
          <Link href="/gallery" className="hover:text-[#e8e8e8] hover:line-through transition-colors duration-300">Gallery</Link>
          <Link href="/contact" className="hover:text-[#e8e8e8] hover:line-through transition-colors duration-300">Contact</Link>
        </div>

        {/* desna stran */}
        <span className="text-[9px] opacity-80 sm:block hidden">
          SIGNAL_STRENGTH: NOMINAL
        </span>

      </div>
    </nav>
  );
}