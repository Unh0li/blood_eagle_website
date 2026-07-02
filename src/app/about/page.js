"use client";

import { useState, useEffect } from "react";
import { residents } from "@/data/residents";
import Image from "next/image";
import BloodDrips from "@/components/BloodDrips";

export default function AboutPage() {
  const [index, setIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 220);
  };

  const next = () => { triggerGlitch(); setIndex((p) => (p + 1) % residents.length); };
  const prev = () => { triggerGlitch(); setIndex((p) => (p - 1 + residents.length) % residents.length); };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  const res = residents[index];

  return (
    <main className="site-shell selection:bg-blood selection:text-black">
      <div className="site-shell__ambient">
        <div className="glow-red" />
        <div className="glow-silver" />
        <div className="glow-accent" />
      </div>
      <div className="site-shell__grid" />
      <div className="site-shell__slash" />
      <div className="site-shell__vignette" />
      <BloodDrips />

      {/* logo watermark */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 w-full max-w-5xl px-6 pt-35 flex items-center justify-center">
        <div className="opacity-5 mix-blend-screen scale-[1.6] md:scale-[2.2] w-full h-full flex items-center justify-center">
          <Image
            src="/images/logo/logo_white.png"
            alt="Blood Eagle Background Watermark"
            width={1000}
            height={1000}
            className="object-contain w-full h-auto max-h-[55vh] filter blur-[0.5px]"
            priority
          />
        </div>
      </div>

      {/* header */}
      <section className="relative z-20 pt-32 text-center px-6">
        <h1
          className="font-[var(--font-display)] uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
        >
          ABOUT
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-silver font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Industrial techno collective <span className="text-blood">/</span> based in Ljubljana
        </p>
      </section>

      {/* who we are */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 mt-24 pb-24">
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-12">
          <span className="divider-line" />
          <p className="eyebrow">Who We Are</p>
          <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
        </div>

        <div className="relative border border-silver/15 bg-panel/40 backdrop-blur-sm p-8 md:p-12 overflow-hidden">
          <div className="corner-ticks">
            <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
            <span style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1 }} />
            <span style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1 }} />
            <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
          </div>
          <div className="absolute -right-20 top-0 w-72 h-72 rounded-full bg-blood/5 blur-3xl" />
          <p className="max-w-3xl mx-auto font-mono text-sm md:text-base leading-8 tracking-wide text-silver text-center">
            Blood Eagle is an underground industrial techno collective based in
            Ljubljana, pushing raw, uncompromising sound with no BPM limit.
          </p>
        </div>
      </section>

      {/* residents */}
      <section className="relative z-20 px-6 pb-32">
        <div className="flex items-center justify-center gap-4 max-w-md mx-auto mb-20">
          <span className="divider-line" />
          <p className="eyebrow">Residents</p>
          <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
        </div>

        <div className="max-w-5xl mx-auto">

          {/* prev / next gumba ZGORAJ */}
          <div className="flex items-center justify-between mb-4 px-1">

            <button
              onClick={prev}
              className="group flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-silver hover:text-bone transition-colors duration-300"
            >
              <span className="relative flex items-center justify-center w-9 h-9 border border-silver/20 group-hover:border-blood transition-colors duration-300 overflow-hidden">
                <span className="absolute inset-0 bg-blood scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300" />
                <span className="relative text-lg leading-none group-hover:text-black transition-colors duration-300">‹</span>
              </span>
              <span className="hidden sm:block">Prev</span>
            </button>

            {/* indikator v sredini */}
            <div className="flex items-center gap-3">
              {residents.map((r, i) => (
                <button
                  key={i}
                  onClick={() => { triggerGlitch(); setIndex(i); }}
                  className="group flex flex-col items-center gap-1.5 transition-all duration-300"
                >
                  <span
                    className="block transition-all duration-500"
                    style={{
                      width: i === index ? "28px" : "8px",
                      height: "1.5px",
                      background: i === index ? "#c81e1e" : "rgba(138,138,138,0.25)",
                      boxShadow: i === index ? "0 0 8px rgba(200,30,30,0.5)" : "none",
                    }}
                  />
                  <span
                    className="font-mono transition-all duration-300"
                    style={{
                      fontSize: "8px",
                      letterSpacing: "0.2em",
                      color: i === index ? "#c81e1e" : "rgba(138,138,138,0.3)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="group flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-silver hover:text-bone transition-colors duration-300"
            >
              <span className="hidden sm:block">Next</span>
              <span className="relative flex items-center justify-center w-9 h-9 border border-silver/20 group-hover:border-blood transition-colors duration-300 overflow-hidden">
                <span className="absolute inset-0 bg-blood scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative text-lg leading-none group-hover:text-black transition-colors duration-300">›</span>
              </span>
            </button>

          </div>

          {/* glavna kartica */}
          <div className="grid md:grid-cols-2 border border-blood/25 relative overflow-hidden">

            <div className="corner-ticks">
              <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
              <span style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
              <span style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
              <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
            </div>

            {/* leva - slika */}
            <div className="relative h-[340px] md:h-[480px] overflow-hidden">
              <img
                key={res.id}
                src={res.image}
                alt={res.name}
                className="w-full h-full object-cover contrast-110 brightness-85 transition-all duration-700 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-panel/70 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-panel/90 via-panel/20 to-transparent md:hidden" />

              {/* scan sweep */}
              {!glitch && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-bone/6 to-transparent animate-[scanSweep_4s_linear_infinite]" />
                </div>
              )}

              {/* glitch */}
              {glitch && (
                <>
                  <div className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-60"
                    style={{ backgroundImage: `url(${res.image})`, clipPath: "polygon(0 18%, 100% 18%, 100% 32%, 0 32%)", transform: "translateX(8px)", filter: "hue-rotate(180deg) saturate(4)" }} />
                  <div className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-60"
                    style={{ backgroundImage: `url(${res.image})`, clipPath: "polygon(0 58%, 100% 58%, 100% 70%, 0 70%)", transform: "translateX(-10px)", filter: "hue-rotate(-30deg) saturate(4)" }} />
                </>
              )}

              {/* resident tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-blood uppercase bg-void/60 backdrop-blur-sm px-3 py-1.5 border border-blood/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse" />
                RESIDENT_{String(index + 1).padStart(3, "0")}
              </div>
            </div>

            {/* desna - info */}
            <div key={index} className="relative flex flex-col justify-between p-8 md:p-10 bg-panel/70 backdrop-blur-sm">

              <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-32 h-64 bg-blood/6 blur-3xl pointer-events-none" />

              {/* top metadata */}
              <div className="flex items-center justify-between mb-8">
                <p className="eyebrow text-[10px]">Blood Eagle</p>
                <span className="font-mono text-[9px] tracking-[0.25em] text-silver/40 uppercase">
                  {String(index + 1).padStart(2, "0")} / {String(residents.length).padStart(2, "0")}
                </span>
              </div>

              {/* ime */}
              <div className="animate-[fadeUp_0.35s_ease_both]">
                <h2 className="font-[var(--font-display)] uppercase text-4xl md:text-5xl tracking-[0.06em] text-bone leading-none">
                  {res.name}
                </h2>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-px w-12 bg-blood" />
                  <div className="h-px flex-1 bg-silver/10" />
                </div>
              </div>

              {/* opis */}
              <p className="mt-6 font-mono text-xs md:text-sm leading-7 tracking-wide text-silver animate-[fadeUp_0.35s_ease_0.08s_both]">
                {res.description}
              </p>

              {/* linki */}
              <div className="mt-8 flex gap-6 animate-[fadeUp_0.35s_ease_0.14s_both]">
                <a href={res.soundcloud} target="_blank" rel="noopener noreferrer"
                  className="group relative font-mono text-[10px] uppercase tracking-[0.3em] text-blood hover:text-bone transition-colors duration-300 py-1">
                  SoundCloud
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-bone group-hover:w-full transition-all duration-300" />
                </a>
                <a href={res.instagram} target="_blank" rel="noopener noreferrer"
                  className="group relative font-mono text-[10px] uppercase tracking-[0.3em] text-blood hover:text-bone transition-colors duration-300 py-1">
                  Instagram
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-bone group-hover:w-full transition-all duration-300" />
                </a>
              </div>

              {/* keyboard hint */}
              <div className="mt-8 pt-6 border-t border-silver/8 flex items-center gap-2 animate-[fadeUp_0.35s_ease_0.2s_both]">
                <span className="font-mono text-[8px] tracking-[0.2em] text-silver/25 uppercase">
                  Use arrow keys to navigate
                </span>
              </div>

            </div>
          </div>

          {/* thumbnail strip */}
          <div
            className="mt-3 grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${residents.length}, 1fr)` }}
          >
            {residents.map((r, i) => (
              <button
                key={r.id}
                onClick={() => { triggerGlitch(); setIndex(i); }}
                className="relative aspect-[3/2] overflow-hidden transition-all duration-300"
                style={{ borderBottom: i === index ? "1px solid rgba(200,30,30,0.6)" : "1px solid rgba(138,138,138,0.08)" }}
              >
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{ filter: i === index ? "grayscale(0) brightness(0.85)" : "grayscale(1) brightness(0.3)" }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(2,2,2,0.7) 0%, transparent 60%)", opacity: i === index ? 1 : 0.5 }}
                />
                <span
                  className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[8px] tracking-[0.15em] uppercase truncate px-1"
                  style={{ color: i === index ? "#c81e1e" : "rgba(138,138,138,0.35)" }}
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