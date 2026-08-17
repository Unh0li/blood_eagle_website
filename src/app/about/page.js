"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import SiteBackdrop from "@/components/SiteBackdrop";
import { residents } from "@/data/residents";

// Konstanta izven komponente — ne ustvari novega objekta ob vsakem renderu
const COUNT = residents.length;

// ── SUB-KOMPONENTE ───────────────────────────────────────────────

function Divider({ label }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className="divider-line" />
      <p className="eyebrow">{label}</p>
      <span
        className="divider-line"
        style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }}
      />
    </div>
  );
}

function NavButton({ dir, onClick }) {
  const isNext = dir === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next resident" : "Previous resident"}
      className="group flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-silver hover:text-bone transition-colors duration-300"
    >
      {!isNext && <span className="hidden sm:block">Prev</span>}
      <span className="relative flex items-center justify-center w-9 h-9 border border-silver/20 group-hover:border-blood transition-colors duration-300 overflow-hidden">
        <span
          className={`absolute inset-0 bg-blood scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isNext ? "origin-left" : "origin-right"}`}
          aria-hidden="true"
        />
        <span className="relative text-lg leading-none group-hover:text-black transition-colors duration-300" aria-hidden="true">
          {isNext ? "›" : "‹"}
        </span>
      </span>
      {isNext && <span className="hidden sm:block">Next</span>}
    </button>
  );
}

// ── GLAVNA KOMPONENTA ────────────────────────────────────────────

export default function AboutPage() {
  const [index,  setIndex]  = useState(0);
  const [glitch, setGlitch] = useState(false);

  // useRef za timer — preprečuje memory leak ob hitrem klikanju
  const glitchTimer = useRef(null);

  const triggerGlitch = useCallback(() => {
    clearTimeout(glitchTimer.current);
    setGlitch(true);
    glitchTimer.current = setTimeout(() => setGlitch(false), 220);
  }, []);

  // Cleanup ob unmount
  useEffect(() => () => clearTimeout(glitchTimer.current), []);

  // useCallback — stabilne reference, useEffect se ne re-registrira ob vsaki spremembi indexa
  const next = useCallback(() => {
    triggerGlitch();
    setIndex((p) => (p + 1) % COUNT);
  }, [triggerGlitch]);

  const prev = useCallback(() => {
    triggerGlitch();
    setIndex((p) => (p - 1 + COUNT) % COUNT);
  }, [triggerGlitch]);

  const goTo = useCallback((i) => {
    triggerGlitch();
    setIndex(i);
  }, [triggerGlitch]);

  // Bug fix: prej [index] — listener se je re-registriral ob vsaki spremembi indexa
  // Zdaj [next, prev] — stabilne refs, registrira se samo enkrat
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch swipe za mobilne naprave
  const touchStart = useRef(null);
  const handleTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStart.current = null;
  }, [next, prev]);

  const res = residents[index];

  return (
    <main className="site-shell selection:bg-blood selection:text-black">
      <SiteBackdrop />

      {/* ── HEADER ── */}
      <section className="relative z-20 pt-32 text-center px-6">
        <h1
          className="font-display uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
        >
          ABOUT
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-silver font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Industrial techno collective <span className="text-blood">/</span> based in Ljubljana
        </p>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 mt-24 pb-24">
        <Divider label="Who We Are" />
        <div className="relative border border-silver/15 bg-panel/40 backdrop-blur-sm p-8 md:p-12 overflow-hidden">
          <div className="corner-ticks" aria-hidden="true">
            <span style={{ top: 0,    left:  0, borderTopWidth:    1, borderLeftWidth:  1 }} />
            <span style={{ top: 0,    right: 0, borderTopWidth:    1, borderRightWidth: 1 }} />
            <span style={{ bottom: 0, left:  0, borderBottomWidth: 1, borderLeftWidth:  1 }} />
            <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
          </div>
          <div className="absolute -right-20 top-0 w-72 h-72 rounded-full bg-blood/5 blur-3xl pointer-events-none" aria-hidden="true" />
          <p className="max-w-3xl mx-auto font-mono text-sm md:text-base leading-8 tracking-wide text-silver text-center">
            Blood Eagle is an underground industrial techno collective based in
            Ljubljana, pushing raw, uncompromising sound with no BPM limit.
          </p>
        </div>
      </section>

      {/* ── RESIDENTS ── */}
      <section className="relative z-20 px-6 pb-32">
        <div className="max-w-md mx-auto">
          <Divider label="Residents" />
        </div>

        <div className="max-w-5xl mx-auto">

          {/* Navigacija */}
          <div className="flex items-center justify-between mb-4 px-1">
            <NavButton dir="prev" onClick={prev} />

            <div className="flex items-center gap-3" role="tablist" aria-label="Residents">
              {residents.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`View ${r.name}`}
                  onClick={() => goTo(i)}
                  className="flex flex-col items-center gap-1.5 min-w-[28px] min-h-[28px] justify-center transition-all duration-300"
                >
                  <span
                    className="block transition-all duration-500"
                    style={{
                      width: i === index ? "28px" : "8px",
                      height: "1.5px",
                      background: i === index ? "#c81e1e" : "rgba(138,138,138,0.25)",
                      boxShadow: i === index ? "0 0 8px rgba(200,30,30,0.5)" : "none",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-mono transition-all duration-300"
                    style={{
                      fontSize: "8px",
                      letterSpacing: "0.2em",
                      color: i === index ? "#c81e1e" : "rgba(138,138,138,0.3)",
                    }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>

            <NavButton dir="next" onClick={next} />
          </div>

          {/* Glavna kartica + swipe podpora */}
          <div
            className="grid md:grid-cols-2 border border-blood/25 relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="corner-ticks" aria-hidden="true">
              <span style={{ top: 0,    left:  0, borderTopWidth:    1, borderLeftWidth:  1, borderColor: "rgba(200,30,30,0.5)" }} />
              <span style={{ top: 0,    right: 0, borderTopWidth:    1, borderRightWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
              <span style={{ bottom: 0, left:  0, borderBottomWidth: 1, borderLeftWidth:  1, borderColor: "rgba(200,30,30,0.5)" }} />
              <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
            </div>

            {/* Leva - slika. The hover used to sit on the <img> itself, but the
                gradient overlays below cover it and swallowed the pointer, so it
                never fired — hence `group` here and pointer-events-none there. */}
            {/* md:h-auto lets the grid stretch this column to the row height.
                A fixed height left a gap under the photo whenever the text
                column ran taller, which it does for the longer bios. */}
            <div className="group relative h-[300px] sm:h-[380px] md:h-auto md:min-h-[480px] overflow-hidden">
              <Image
                key={res.id}
                src={res.image}
                alt={res.name}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover contrast-110 brightness-85 transition-all duration-700 group-hover:scale-105 group-hover:brightness-100 group-hover:contrast-100"
                priority={index === 0}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-panel/70 hidden md:block" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel/90 via-panel/20 to-transparent md:hidden" aria-hidden="true" />

              {/* Scan sweep */}
              {!glitch && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                  <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-bone/6 to-transparent animate-[scanSweep_4s_linear_infinite]" />
                </div>
              )}

              {/* Glitch overlay */}
              {glitch && (
                <div aria-hidden="true">
                  <div
                    className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-60"
                    style={{
                      backgroundImage: `url(${res.image})`,
                      clipPath: "polygon(0 18%, 100% 18%, 100% 32%, 0 32%)",
                      transform: "translateX(8px)",
                      filter: "hue-rotate(180deg) saturate(4)",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-60"
                    style={{
                      backgroundImage: `url(${res.image})`,
                      clipPath: "polygon(0 58%, 100% 58%, 100% 70%, 0 70%)",
                      transform: "translateX(-10px)",
                      filter: "hue-rotate(-30deg) saturate(4)",
                    }}
                  />
                </div>
              )}

              {/* Resident tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-blood uppercase bg-void/60 backdrop-blur-sm px-3 py-1.5 border border-blood/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse" aria-hidden="true" />
                RESIDENT_{String(index + 1).padStart(3, "0")}
              </div>
            </div>

            {/* Desna - info */}
            {/* key={index} sproži fadeUp animacijo ob vsaki menjavi */}
            <div key={index} className="relative flex flex-col justify-between p-8 md:p-10 bg-panel/70 backdrop-blur-sm">
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-32 h-64 bg-blood/6 blur-3xl pointer-events-none" aria-hidden="true" />

              <div className="flex items-center justify-between mb-8">
                <p className="eyebrow text-[10px]">Blood Eagle</p>
                <span className="font-mono text-[9px] tracking-[0.25em] text-silver/40 uppercase">
                  {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                </span>
              </div>

              <div className="animate-[fadeUp_0.35s_ease_both]">
                <h2 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl tracking-[0.06em] text-bone leading-none">
                  {res.name}
                </h2>
                <div className="mt-4 flex items-center gap-4" aria-hidden="true">
                  <div className="h-px w-12 bg-blood" />
                  <div className="h-px flex-1 bg-silver/10" />
                </div>
              </div>

              <p className="mt-6 font-mono text-xs md:text-sm leading-7 tracking-wide text-silver animate-[fadeUp_0.35s_ease_0.08s_both]">
                {res.description}
              </p>

              <div className="mt-8 flex gap-6 animate-[fadeUp_0.35s_ease_0.14s_both]">
                {res.soundcloud && (
                  <a
                    href={res.soundcloud}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${res.name} on SoundCloud`}
                    className="group relative font-mono text-[10px] uppercase tracking-[0.3em] text-blood hover:text-bone transition-colors duration-300 py-1"
                  >
                    SoundCloud
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-bone group-hover:w-full transition-all duration-300" aria-hidden="true" />
                  </a>
                )}
                {res.instagram && (
                  <a
                    href={res.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${res.name} on Instagram`}
                    className="group relative font-mono text-[10px] uppercase tracking-[0.3em] text-blood hover:text-bone transition-colors duration-300 py-1"
                  >
                    Instagram
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-bone group-hover:w-full transition-all duration-300" aria-hidden="true" />
                  </a>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-silver/8 animate-[fadeUp_0.35s_ease_0.2s_both]">
                <span className="font-mono text-[8px] tracking-[0.2em] text-silver/25 uppercase hidden sm:inline">
                  Use arrow keys to navigate
                </span>
                <span className="font-mono text-[8px] tracking-[0.2em] text-silver/25 uppercase sm:hidden">
                  Swipe to navigate
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div
            className="mt-3 grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${COUNT}, minmax(0, 1fr))` }}
          >
            {residents.map((r, i) => (
              // Everything below is class-driven, not inline style: an inline
              // `filter` beats any hover: rule on specificity, which is why the
              // thumbnails used to have no hover response at all.
              <button
                key={r.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`View ${r.name}`}
                aria-pressed={i === index}
                className={`group relative aspect-[3/2] overflow-hidden border-b transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blood ${
                  i === index
                    ? "border-blood/60"
                    : "border-silver/10 hover:border-blood/35"
                }`}
              >
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  // The strip sits in a max-w-5xl container, so each of the few
                  // columns is ~340px wide regardless of viewport. The old
                  // "10vw" resolved to 192px and Next served a 256px file into
                  // a 337px slot, which is why these looked soft.
                  sizes="(max-width: 767px) 33vw, 360px"
                  className={`object-cover transition-all duration-500 ${
                    i === index
                      ? "grayscale-0 brightness-85"
                      : "grayscale brightness-30 group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-105"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-void/70 to-transparent to-60% transition-opacity duration-300 ${
                    i === index ? "opacity-100" : "opacity-50 group-hover:opacity-75"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`absolute bottom-1.5 left-0 right-0 truncate px-1 text-center font-mono text-[8px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                    i === index ? "text-blood" : "text-silver/35 group-hover:text-bone"
                  }`}
                >
                  {r.name}
                </span>
              </button>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}