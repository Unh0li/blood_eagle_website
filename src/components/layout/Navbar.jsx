"use client";

import Link from "next/link";
import { useState } from "react";
import { useAudio } from "@/context/AudioContext";

export default function Navbar() {
  const [logoSrc, setLogoSrc] = useState("/images/logo/chrome_static.png");
  const { playing, toggle, volume, changeVolume } = useAudio();

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-void/80 backdrop-blur-md border-b border-silver/15 text-silver font-mono text-[10px] tracking-[0.3em] uppercase">
      <div className="w-full px-6 py-5 flex items-center justify-between relative">

        {/* leva stran */}
        <Link
          href="/"
          className="flex items-center gap-3 text-bone font-bold tracking-[0.3em] hover:text-blood transition-colors duration-300 group"
          onMouseEnter={() => setLogoSrc("/images/logo/logo_gif.gif")}
          onMouseLeave={() => setLogoSrc("/images/logo/chrome_static.png")}
        >
          <div className="w-13 h-13 relative flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={logoSrc}
              alt="Blood Eagle Logo"
              className="w-full h-full object-contain brightness-110 group-hover:scale-105 transition-all duration-300"
            />
          </div>
          <span className="hidden sm:inline">BLOOD EAGLE // INC</span>
        </Link>

        {/* sredina */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[11px] tracking-[0.2em]">
          <Link href="/about" className="hover:text-bone hover:line-through transition-colors duration-300">About</Link>
          <Link href="/events" className="hover:text-bone hover:line-through transition-colors duration-300">Events</Link>
          <Link href="/" className="text-bone text-[15px] font-bold tracking-[0.25em] border-b border-blood/60 pb-0.5 transition-all duration-300 hover:tracking-[0.4em] hover:text-blood">
            HOME
          </Link>
          <Link href="/gallery" className="hover:text-bone hover:line-through transition-colors duration-300">Gallery</Link>
          <Link href="/contact" className="hover:text-bone hover:line-through transition-colors duration-300">Contact</Link>
        </div>

        {/* desna stran - audio */}
        <div className="flex items-center gap-4">

          {/* volume slider */}
          <div className={`items-center gap-2 transition-all duration-500 ${playing ? "flex" : "hidden"}`}>
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-silver/40 shrink-0">
              <polygon points="1,3 4,3 7,1 7,9 4,7 1,7" fill="currentColor" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-16 h-px cursor-pointer accent-blood opacity-50 hover:opacity-100 transition-opacity duration-300"
            />
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-silver/40 shrink-0">
              <polygon points="1,3 4,3 7,1 7,9 4,7 1,7" fill="currentColor" />
              <path d="M8,3 Q10,5 8,7" stroke="currentColor" strokeWidth="0.8" fill="none" />
            </svg>
          </div>

          {/* play/pause gumb */}
          <button
            onClick={toggle}
            className="group relative flex items-center gap-2 border border-silver/15 hover:border-blood/50 px-3 py-1.5 transition-all duration-300 bg-void/40 backdrop-blur-sm overflow-hidden"
            aria-label={playing ? "Pause" : "Play"}
          >
            <span className="absolute inset-0 bg-blood/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

            {/* EKG / flatline */}
            <svg width="28" height="12" className="relative shrink-0">
              {playing ? (
                <polyline
                  points="0,6 4,6 6,2 8,10 10,2 12,10 14,6 28,6"
                  fill="none"
                  stroke="#c81e1e"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ekg-line-nav"
                />
              ) : (
                <line x1="0" y1="6" x2="28" y2="6" stroke="rgba(138,138,138,0.3)" strokeWidth="1" />
              )}
            </svg>

            <span
              className="relative text-[9px] tracking-[0.25em] transition-colors duration-300"
              style={{ color: playing ? "#c81e1e" : "rgba(138,138,138,0.5)" }}
            >
              {playing ? "LIVE" : "OFF"}
            </span>
          </button>

        </div>

      </div>
    </nav>
  );
}