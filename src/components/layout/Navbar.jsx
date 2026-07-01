"use client";

import Link from "next/link";
import Image from "next/image"; 

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-void/80 backdrop-blur-md border-b border-silver/15 text-silver font-mono text-[10px] tracking-[0.3em] uppercase">
      <div className="w-full px-6 py-6 flex items-center justify-between relative">
  
 {/* leva stran z logotipom */}
        <Link href="/" className="flex items-center gap-3 text-bone font-bold tracking-[0.3em] hover:text-blood transition-colors duration-300 group">
          
          {/* POPRAVLJEN LOGO */}
          <div className="relative flex items-center justify-center shrink-0">
            <Image 
              src="/images/logo/logo_mix.png"
              alt="Blood Eagle Logo"
              width={60}
              height={60}
              className="object-contain h-auto filter brightness-110 group-hover:scale-105 transition-all duration-200"
              priority
            />
          </div>
          
          <span className="hidden sm:inline">BLOOD EAGLE // INC</span>
        </Link>

  {/* sredina - absolutno centrirana */}
  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[11px] tracking-[0.2em]">
    <Link href="/about" className="hover:text-bone hover:line-through transition-colors duration-300">About</Link>
    <Link href="/events" className="hover:text-bone hover:line-through transition-colors duration-300">Events</Link>
    
    <Link href="/" className="text-bone text-[15px] font-bold tracking-[0.25em] border-b border-blood/60 pb-0.5 transition-all duration-300 hover:tracking-[0.4em] hover:text-blood">
      HOME
    </Link>
    
    <Link href="/gallery" className="hover:text-bone hover:line-through transition-colors duration-300">Gallery</Link>
    <Link href="/contact" className="hover:text-bone hover:line-through transition-colors duration-300">Contact</Link>
  </div>

  {/* desna stran */}
  <span className="text-[9px] opacity-80 sm:block hidden">
    INDUSTRIAL | RAW | BOCHKA
  </span>

</div>
    </nav>
  );
}