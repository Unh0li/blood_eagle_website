"use client";

import { useState, useEffect } from "react";
import { residents } from "@/data/residents";

export default function AboutPage() {
  const [index, setIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 220);
  };

  const next = () => {
    triggerGlitch();
    setIndex((p) => (p + 1) % residents.length);
  };

  const prev = () => {
    triggerGlitch();
    setIndex((p) => (p - 1 + residents.length) % residents.length);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  const r = residents[index];

  return (
    <main className="site-shell selection:bg-[#c81e1e] selection:text-black">
      <div className="site-shell__ambient">
        <div className="glow-red" />
        <div className="glow-silver" />
      </div>
      <div className="site-shell__grid" />

      <section className="relative z-20 pt-32 text-center px-6">
        <div className="overflow-hidden">
          <h1
            className="font-[var(--font-display)] uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-[#e8e8e8] animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
          >
            ABOUT
          </h1>
        </div>
        <p className="mt-6 max-w-xl mx-auto text-[#8a8a8a] font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Industrial techno collective <span className="text-[#c81e1e]">/</span> based in Ljubljana
        </p>
      </section>

      <section className="relative z-20 mt-16 px-6">
        <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
          <span className="divider-line" />
          <h2 className="eyebrow">Meet our residents</h2>
          <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
        </div>
      </section>

      <section className="relative z-30 max-w-5xl mx-auto px-4 mt-12 md:mt-16 flex items-center justify-center min-h-[460px] md:min-h-[520px]">
        <button onClick={prev} aria-label="Previous resident" className="group absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center bg-[#070707]/50 backdrop-blur-sm">
          <span className="absolute inset-0 border border-[#8a8a8a]/20 group-hover:border-[#c81e1e] transition-colors duration-300" />
          <span className="relative text-2xl text-[#8a8a8a] group-hover:text-[#c81e1e] group-hover:-translate-x-1 transition-all duration-300">&lsaquo;</span>
        </button>

        <button onClick={next} aria-label="Next resident" className="group absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center bg-[#070707]/50 backdrop-blur-sm">
          <span className="absolute inset-0 border border-[#8a8a8a]/20 group-hover:border-[#c81e1e] transition-colors duration-300" />
          <span className="relative text-2xl text-[#8a8a8a] group-hover:text-[#c81e1e] group-hover:translate-x-1 transition-all duration-300">&rsaquo;</span>
        </button>

        <div className="relative w-[290px] h-[400px] md:w-[340px] md:h-[470px] [perspective:1400px] z-20">
          <div
            className="relative w-full h-full transition-transform duration-[900ms] [transform-style:preserve-3d]"
            style={{
              transform: `rotateY(${-index * 120}deg)`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {residents.map((res, i) => {
              const isActive = i === index;
              const tag = String(i + 1).padStart(3, "0");

              return (
                <div
                  key={res.id}
                  className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]"
                  style={{ transform: `rotateY(${i * 120}deg) translateZ(340px)` }}
                >
                  <div className={`group relative w-full h-full border transition-all duration-700 overflow-hidden bg-[#0c0c0c] ${
                    isActive ? "border-[#c81e1e] scale-[1.02] shadow-[0_0_60px_-10px_rgba(200,30,30,0.25)]" : "border-[#8a8a8a]/15 scale-[0.88] opacity-25 blur-[2px] pointer-events-none"
                  }`}>
                    <div className="corner-ticks">
                      <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
                      <span style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1 }} />
                      <span style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1 }} />
                      <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
                    </div>

                    <div className="relative z-30 flex items-center justify-between px-3 py-2 border-b border-[#8a8a8a]/15 font-mono text-[9px] tracking-[0.2em] text-[#8a8a8a]">
                      <span>SUBJECT_{tag}</span>
                      <span className={`flex items-center gap-1 ${isActive ? "text-[#c81e1e]" : ""}`}>
                        <span className={`w-1 h-1 rounded-full ${isActive ? "bg-[#c81e1e] animate-pulse" : "bg-[#8a8a8a]/40"}`} />
                        {isActive ? "ACTIVE" : "STANDBY"}
                      </span>
                    </div>

                    <div className="relative w-full h-[240px] md:h-[280px] overflow-hidden">
                      <img
                        src={res.image}
                        alt={res.name}
                        className={`w-full h-full object-cover contrast-125 brightness-90 transition-transform duration-[1.2s] ${isActive ? "scale-100 group-hover:scale-110" : "scale-105"}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#c81e1e]/20 via-transparent to-transparent mix-blend-multiply" />

                      {isActive && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-[#e8e8e8]/10 to-transparent animate-[scanSweep_3.5s_linear_infinite]" />
                        </div>
                      )}

                      {isActive && glitch && (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-70"
                            style={{
                              backgroundImage: `url(${res.image})`,
                              clipPath: "polygon(0 20%, 100% 20%, 100% 35%, 0 35%)",
                              transform: "translateX(6px)",
                              filter: "hue-rotate(180deg) saturate(3)",
                            }}
                          />
                          <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-70"
                            style={{
                              backgroundImage: `url(${res.image})`,
                              clipPath: "polygon(0 60%, 100% 60%, 100% 72%, 0 72%)",
                              transform: "translateX(-8px)",
                              filter: "hue-rotate(-30deg) saturate(3)",
                            }}
                          />
                        </>
                      )}
                    </div>

                    <h3 className={`relative z-30 text-center mt-4 px-2 font-[var(--font-display)] uppercase tracking-[0.12em] text-lg md:text-xl ${isActive ? "text-[#e8e8e8]" : "text-[#8a8a8a]"}`}>
                      {res.name}
                    </h3>

                    {isActive && (
                      <p className="relative z-30 mt-2 px-4 text-center font-mono text-[10px] leading-relaxed text-[#8a8a8a] line-clamp-3">
                        {res.description}
                      </p>
                    )}

                    <div className="relative z-30 mt-4 mx-auto w-8 h-px bg-[#c81e1e]" />
                    {isActive && <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-[#c81e1e]/25 blur-3xl pointer-events-none" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="relative z-40 flex items-center justify-center gap-2 mt-8">
        {residents.map((_, i) => (
          <button
            key={i}
            onClick={() => { triggerGlitch(); setIndex(i); }}
            aria-label={`Go to resident ${i + 1}`}
            className="relative h-1 transition-all duration-500"
            style={{ width: i === index ? "28px" : "8px" }}
          >
            <span className={`absolute inset-0 transition-colors duration-500 ${i === index ? "bg-[#c81e1e]" : "bg-[#8a8a8a]/30"}`} />
          </button>
        ))}
      </div>

      <section className="relative z-40 mt-12 text-center max-w-xl mx-auto px-6 pb-24 min-h-[220px]">
        <div key={index} className="animate-[fadeUp_0.6s_ease_both]">
          <p className="text-[#8a8a8a] leading-7 font-mono text-sm tracking-wide">
            {r.description}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 pointer-events-none">
            <span className="h-px w-10 bg-[#8a8a8a]/20" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a8a8a]/50">LINKS</span>
            <span className="h-px w-10 bg-[#8a8a8a]/20" />
          </div>

          <div className="mt-6 flex justify-center gap-10 uppercase tracking-[0.25em] text-xs font-mono">
            {["SoundCloud", "Instagram"].map((platform) => (
              <a
                key={platform}
                href={platform === "SoundCloud" ? r.soundcloud : r.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-[#c81e1e] hover:text-[#e8e8e8] transition-colors duration-300 group py-1"
              >
                {platform}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#e8e8e8] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}