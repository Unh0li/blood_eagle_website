"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAudio } from "@/context/AudioContext";

// /events must stay lit on /events/berzerk-2026 too, but "/" would prefix-match
// every route, so the root is the one that has to match exactly.
const isActiveRoute = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "HOME", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const LOGO_STATIC = "/images/logo/chrome_static.webp";
const LOGO_GIF = "/images/logo/logo_hover.webp";

function formatTime(ms) {
  if (!ms || Number.isNaN(ms)) return "0:00";
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const [logoSrc, setLogoSrc] = useState(LOGO_STATIC);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pickerRef = useRef(null);

  const {
    playing, toggle, pending, ready,
    volume, changeVolume,
    seekTo, progress, duration,
    tracks = [], trackIndex, currentTrack, selectTrack,
  } = useAudio();

  /* useCallback — stabilne reference, ne povzročajo re-renderov otrok */
  const closePicker = useCallback(() => setPickerOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* En sam effect za vse globalne listenerje */
  useEffect(() => {
    const onDown = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        closePicker();
    };
    const onKey = (e) => {
      if (e.key === "Escape") { closePicker(); closeMobile(); }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) closeMobile();
    };

    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [closePicker, closeMobile]);

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full font-mono text-[10px] uppercase tracking-[0.28em] text-silver bg-void/80 backdrop-blur-xl border-b border-silver/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">

      {/* ── GLAVNA VRSTICA ── */}
      <div className="relative flex items-center justify-between h-16 sm:h-[72px] px-4 sm:px-6">

        {/* zgornja rdeča linija */}
        <span
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blood/50 to-transparent"
          aria-hidden="true"
        />

        {/* ── LOGO ── */}
        <Link
          href="/"
          onMouseEnter={() => setLogoSrc(LOGO_GIF)}
          onMouseLeave={() => setLogoSrc(LOGO_STATIC)}
          onClick={closeMobile}
          className="group relative z-10 flex items-center gap-3 sm:gap-4 shrink-0"
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 overflow-hidden border border-silver/10 bg-black/20 transition-all duration-500 group-hover:border-blood/40 group-hover:bg-blood/5">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-silver/30 group-hover:border-blood/70 transition-colors" aria-hidden="true" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-silver/30 group-hover:border-blood/70 transition-colors" aria-hidden="true" />
            {/* Deliberate plain <img>: both sources are already hand-encoded to
                144px webp for this 36-44px slot, and the hover variant is an
                animated webp that next/image would flatten to a still frame. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Blood Eagle"
              className="w-full h-full object-contain brightness-110 transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="hidden sm:flex flex-col gap-0.5">
            <span className="text-[9px] font-bold tracking-[0.32em] leading-none text-bone">BLOOD EAGLE</span>
            <span className="text-[7px] tracking-[0.4em] leading-none text-silver/35">INC</span>
          </div>
        </Link>

        {/* ── DESKTOP NAV — 5 enakih stolpcev, HOME vedno centriran ── */}
        <div className="hidden lg:grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid-cols-5 w-[520px] xl:w-[560px] h-10 border border-silver/10 bg-black/20">
          {NAV_ITEMS.map((item, i) => {
            // isHome is purely the centre column's visual weight; isActive is
            // which page you are actually on. These used to be the same flag,
            // so HOME looked selected on every route.
            const isHome = i === 2;
            const isActive = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group relative flex items-center justify-center overflow-hidden transition-all duration-300",
                  i < NAV_ITEMS.length - 1 ? "border-r border-silver/10" : "",
                  isActive ? "bg-blood/[0.06]" : "hover:bg-blood/[0.035]",
                ].join(" ")}
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-blood/10 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  aria-hidden="true"
                />
                <span
                  className={[
                    "relative z-10 transition-all duration-300",
                    isHome
                      ? "text-[12px] font-bold tracking-[0.32em]"
                      : "text-[9px] tracking-[0.26em]",
                    isActive
                      ? "text-blood"
                      : "text-silver/65 group-hover:text-bone group-hover:tracking-[0.32em]",
                  ].join(" ")}
                  // letter-spacing doda trailing space ki vizualno premakne tekst levo.
                  // marginRight: -0.32em "odstrani" to trailing space iz layout-a → videz centriran
                  style={isHome ? { letterSpacing: "0.32em", marginRight: "-0.32em" } : undefined}
                >
                  {item.label}
                </span>
                <span
                  className={[
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-blood transition-all duration-300",
                    isActive
                      ? "w-full shadow-[0_0_10px_rgba(200,30,30,0.6)]"
                      : "w-0 group-hover:w-1/2",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* ── DESNE KONTROLE ── */}
        <div ref={pickerRef} className="relative z-20 flex items-center gap-1.5 sm:gap-2">

          {/* Volume */}
          <div className={`hidden sm:flex items-center gap-2 mr-1 transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <svg width="9" height="9" viewBox="0 0 10 10" className="text-silver/30 shrink-0" aria-hidden="true">
              <polygon points="1,3 4,3 7,1 7,9 4,7 1,7" fill="currentColor" />
            </svg>
            <input
              type="range" min="0" max="1" step="0.01" value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              className="w-12 sm:w-14 h-px cursor-pointer accent-blood opacity-40 hover:opacity-100 transition-opacity"
            />
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-silver/30 shrink-0" aria-hidden="true">
              <polygon points="1,3 4,3 7,1 7,9 4,7 1,7" fill="currentColor" />
              <path d="M8,3 Q10,5 8,7" stroke="currentColor" strokeWidth="0.8" fill="none" />
            </svg>
          </div>

          {/* Track picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setPickerOpen((o) => !o)}
              aria-label="Select track"
              aria-expanded={pickerOpen}
              aria-haspopup="listbox"
              className="group relative flex items-center gap-2 h-9 px-2.5 sm:px-3 max-w-[150px] sm:max-w-none border border-silver/10 bg-black/20 hover:border-blood/35 hover:bg-blood/[0.025] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute bottom-0 left-0 h-px w-0 bg-blood group-hover:w-full transition-all duration-500" aria-hidden="true" />
              <span className="relative max-w-[80px] sm:max-w-[100px] truncate text-[7px] sm:text-[8px] tracking-[0.15em] text-silver/60 group-hover:text-bone transition-colors normal-case">
                {/* Bug fix: currentTrack je null dokler se audio ne naloži */}
                {currentTrack?.title ?? "—"}
              </span>
              <span className={`relative text-[6px] text-silver/30 transition-transform duration-300 ${pickerOpen ? "rotate-180" : ""}`} aria-hidden="true">
                ▼
              </span>
            </button>

            {pickerOpen && (
              <div
                role="listbox"
                aria-label="Tracklist"
                // On phones this is pinned to the viewport, not to the button:
                // the button sits mid-cluster (play and menu are to its right),
                // so right-0 pushed the 288px panel 35px off the left edge.
                className="fixed left-4 right-4 top-[calc(var(--nav-h)+0.5rem)] w-auto max-w-none sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 sm:max-w-72 border border-silver/10 bg-[#050505]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-silver/10">
                  <span className="text-[8px] tracking-[0.35em] text-blood">TRACKLIST</span>
                  <span className="text-[7px] text-silver/25">{tracks.length}</span>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                  {tracks.map((track, i) => {
                    const active = i === trackIndex;
                    return (
                      <button
                        key={track.url}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => { selectTrack(i); closePicker(); }}
                        className={`group relative w-full text-left px-4 py-3 border-b border-silver/5 transition-colors ${active ? "bg-blood/[0.04]" : "hover:bg-blood/[0.035]"}`}
                      >
                        <span className={`absolute left-0 top-0 bottom-0 w-px transition-all ${active ? "bg-blood shadow-[0_0_8px_rgba(200,30,30,0.7)]" : "bg-transparent group-hover:bg-blood/30"}`} aria-hidden="true" />
                        <span className={`block truncate text-[9px] tracking-[0.12em] normal-case ${active ? "text-blood" : "text-silver/70 group-hover:text-bone"}`}>
                          {track.title}
                        </span>
                        {track.artist && (
                          <span className="block truncate mt-1 text-[7px] tracking-[0.18em] text-silver/30">
                            {track.artist}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Play / Pause */}
          <button
            type="button"
            onClick={toggle}
            disabled={!ready || pending}
            aria-label={playing ? "Pause" : "Play"}
            className="group relative flex items-center gap-2 h-9 px-2.5 sm:px-3 border border-silver/10 bg-black/20 hover:border-blood/35 hover:bg-blood/[0.025] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none overflow-hidden"
          >
            <span className="absolute bottom-0 left-0 h-px w-0 bg-blood group-hover:w-full transition-all duration-500" aria-hidden="true" />
            <svg width="26" height="12" viewBox="0 0 28 12" className="relative shrink-0" aria-hidden="true">
              {playing ? (
                <polyline
                  points="0,6 4,6 6,2 8,10 10,2 12,10 14,6 28,6"
                  fill="none" stroke="#c81e1e" strokeWidth="1.2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="ekg-line-nav"
                />
              ) : (
                <line x1="0" y1="6" x2="28" y2="6" stroke="rgba(138,138,138,0.25)" strokeWidth="1" />
              )}
            </svg>
            <span
              className="text-[7px] sm:text-[8px] tracking-[0.2em]"
              style={{ color: playing ? "#c81e1e" : "rgba(138,138,138,0.4)" }}
            >
              {pending ? "···" : playing ? "LIVE" : "OFF"}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="lg:hidden group relative flex items-center justify-center w-9 h-9 border border-silver/10 hover:border-blood/35 hover:bg-blood/[0.025] transition-all duration-300"
          >
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-silver/30 group-hover:border-blood/60 transition-colors" aria-hidden="true" />
            {/* Bug fix: oba spana rabita translate da se pravilno srečata v X */}
            <span className="flex flex-col gap-1.5 w-4" aria-hidden="true">
              <span className={`block h-px bg-silver/60 transition-all duration-300 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-px bg-silver/60 transition-all duration-300 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>

        </div>
      </div>

      {/* ── MOBILNA NAVIGACIJA ── */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden border-t border-silver/5 bg-[#040404]/95 backdrop-blur-xl transition-all duration-500 ${mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-3">
          <div className="grid grid-cols-1 gap-px border border-silver/10 bg-silver/5">
            {NAV_ITEMS.map((item, i) => {
              const isHome = i === 2;
              const isActive = isActiveRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center justify-between min-h-[48px] px-4 transition-all duration-300 hover:bg-blood/[0.04] ${
                    isActive ? "bg-blood/[0.07] text-blood" : "bg-[#050505] text-bone/85"
                  }`}
                >
                  {/* Solid bar on the leading edge — colour alone is easy to miss
                      on a phone in daylight. */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300 ${
                      isActive ? "bg-blood" : "bg-transparent"
                    }`}
                    aria-hidden="true"
                  />
                  <span className={`text-[9px] tracking-[0.3em] transition-all duration-300 group-hover:tracking-[0.38em] ${isHome ? "font-bold text-[11px]" : ""}`}>
                    {item.label}
                  </span>
                  <span className="text-blood/60 text-[8px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-blood group-hover:w-full transition-all duration-500" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div
        className={`overflow-hidden bg-black/30 transition-all duration-500 ${playing && duration > 0 ? "h-7 opacity-100 border-t border-silver/5" : "h-0 opacity-0"}`}
        aria-hidden={!playing}
      >
        <div className="flex items-center gap-2 sm:gap-3 h-full px-4 sm:px-6">
          <span className="w-7 sm:w-8 shrink-0 text-[7px] text-silver/30 tabular-nums">
            {formatTime(progress)}
          </span>
          <input
            type="range" min="0" max={duration || 1} step="1000" value={progress}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            aria-label="Track progress"
            className="flex-1 h-px min-w-0 cursor-pointer accent-blood opacity-40 hover:opacity-100 transition-opacity"
          />
          <span className="w-7 sm:w-8 shrink-0 text-right text-[7px] text-silver/30 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>
      </div>

    </nav>
  );
}