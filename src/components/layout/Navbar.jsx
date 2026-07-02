"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAudio } from "@/context/AudioContext";

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

export default function Navbar() {
  const [logoSrc, setLogoSrc] = useState("/images/logo/chrome_static.png");
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef(null);

 const {
    playing,
    toggle,
    pending,
    volume,
    changeVolume,
    seekTo,
    progress,
    duration,
    tracks,
    trackIndex,
    currentTrack,
    selectTrack,
    ready,
  } = useAudio();

  useEffect(() => {
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPickerOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-void/80 backdrop-blur-md border-b border-silver/15 text-silver font-mono text-[10px] tracking-[0.3em] uppercase">
      <div className="w-full px-6 py-5 flex items-center justify-between relative">

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

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[11px] tracking-[0.2em]">
          <Link href="/about" className="hover:text-bone hover:line-through transition-colors duration-300">About</Link>
          <Link href="/events" className="hover:text-bone hover:line-through transition-colors duration-300">Events</Link>
          <Link href="/" className="text-bone text-[15px] font-bold tracking-[0.25em] border-b border-blood/60 pb-0.5 transition-all duration-300 hover:tracking-[0.4em] hover:text-blood">
            HOME
          </Link>
          <Link href="/gallery" className="hover:text-bone hover:line-through transition-colors duration-300">Gallery</Link>
          <Link href="/contact" className="hover:text-bone hover:line-through transition-colors duration-300">Contact</Link>
        </div>

        <div className="flex items-center gap-3" ref={pickerRef}>

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

          <div className="relative">
            <button
              onClick={() => setPickerOpen((p) => !p)}
              className="group relative flex items-center gap-2 border border-silver/15 hover:border-blood/50 px-3 py-1.5 transition-all duration-300 bg-void/40 backdrop-blur-sm overflow-hidden"
              aria-label="Select track"
            >
              <span className="absolute inset-0 bg-blood/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="relative text-[9px] tracking-[0.2em] text-silver max-w-[100px] truncate">
                {currentTrack.title}
              </span>
              <span className={`relative text-[8px] transition-transform duration-300 ${pickerOpen ? "rotate-180" : ""}`}>
                &#9662;
              </span>
            </button>

            {pickerOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 border border-silver/15 bg-void/95 backdrop-blur-md z-[200] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <div className="corner-ticks">
                  <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
                  <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
                </div>
                <p className="eyebrow text-[9px] px-4 pt-4 pb-2">Tracklist</p>
                <div className="flex flex-col">
                  {tracks.map((t, i) => (
                    <button
                      key={t.url}
                      onClick={() => {
                        selectTrack(i);
                        setPickerOpen(false);
                      }}
                      className={`text-left px-4 py-3 border-t border-silver/10 hover:bg-blood/10 transition-colors duration-200 ${
                        i === trackIndex ? "text-blood" : "text-silver hover:text-bone"
                      }`}
                    >
                      <span className="block text-[10px] tracking-[0.15em] normal-case">{t.title}</span>
                      <span className="block text-[9px] tracking-[0.2em] text-silver/50 mt-1">{t.artist}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

         <button
            onClick={toggle}
            disabled={!ready || pending}
            className="group relative flex items-center gap-2 border border-silver/15 hover:border-blood/50 px-3 py-1.5 transition-all duration-300 bg-void/40 backdrop-blur-sm overflow-hidden disabled:opacity-40 disabled:pointer-events-none"
            aria-label={playing ? "Pause" : "Play"}
          >
            <span className="absolute inset-0 bg-blood/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

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

      <div
        className={`w-full px-6 overflow-hidden transition-all duration-300 ${
          playing && duration > 0 ? "h-8 opacity-100 pb-2" : "h-0 opacity-0 pb-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-silver/40 shrink-0 w-8">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 1}
            step="1000"
            value={progress}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            className="flex-1 h-px cursor-pointer accent-blood opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
          <span className="text-[9px] text-silver/40 shrink-0 w-8 text-right">{formatTime(duration)}</span>
        </div>
      </div>
    </nav>
  );
}