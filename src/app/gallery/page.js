"use client";

import { useState } from "react";
import Link from "next/link";
import { events } from "@/data/events";
import Lightbox from "@/components/gallery/Lightbox";

export default function Gallery() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  if (activeEvent) {
    const ev = events.find((e) => e.id === activeEvent);


    const openLightbox = (i) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);
    const nextPhoto = () => setLightboxIndex((p) => (p + 1) % ev.photos.length);
    const prevPhoto = () => setLightboxIndex((p) => (p - 1 + ev.photos.length) % ev.photos.length);

    return (
      <main className="site-shell selection:bg-[#c81e1e] selection:text-black">
        <div className="site-shell__ambient">
          <div className="glow-red" />
          <div className="glow-silver" />
        </div>
        <div className="site-shell__grid" />

        <section className="relative z-20 pt-32 px-6 max-w-6xl mx-auto pb-32">
          <button
            onClick={() => setActiveEvent(null)}
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#8a8a8a] hover:text-[#c81e1e] transition-colors duration-300 mb-12"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">&lsaquo;</span>
            Back to gallery
          </button>

          <div className="text-center mb-16">
            <p className="eyebrow">{ev.date}</p>
            <h1
              className="mt-4 font-[var(--font-display)] uppercase text-[10vw] md:text-[5vw] leading-[0.9] tracking-[-0.01em] text-[#e8e8e8]"
              style={{ WebkitTextStroke: "1px rgba(232,232,232,0.12)" }}
            >
              {ev.title}
            </h1>
            <p className="mt-4 font-mono text-xs text-[#8a8a8a] uppercase tracking-[0.25em]">
              {ev.venue} <span className="text-[#c81e1e] mx-2">/</span> {ev.photos.length} photos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ev.photos.map((src, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square overflow-hidden border border-[#8a8a8a]/15 bg-[#0c0c0c] cursor-pointer"
              >
                <img
                  src={src}
                  alt={`${ev.title} photo ${i + 1}`}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[0.2em] text-[#e8e8e8] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {String(i + 1).padStart(3, "0")}
                </span>
              </div>
            ))}
          </div>
        </section>
        {lightboxIndex !== null && (
            <Lightbox
                photos={ev.photos}
                index={lightboxIndex}
                onClose={closeLightbox}
                onNext={nextPhoto}
                onPrev={prevPhoto}
            />  
        )}
      </main>
    );
  }

  return (
    <main className="site-shell selection:bg-[#c81e1e] selection:text-black">
      <div className="site-shell__ambient">
        <div className="glow-red" />
        <div className="glow-silver" />
      </div>
      <div className="site-shell__grid" />

      <section className="relative z-20 pt-32 text-center px-6">
        <h1
          className="font-[var(--font-display)] uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-[#e8e8e8] animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
        >
          GALLERY
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-[#8a8a8a] font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Past events <span className="text-[#c81e1e]">/</span> archived footage
        </p>
      </section>

      <section className="relative z-20 max-w-6xl mx-auto px-6 mt-24 pb-32 flex flex-col gap-24">
        {events.map((ev, idx) => (
          <div key={ev.id}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <p className="eyebrow text-[10px]">{ev.date}</p>
                <h2 className="mt-2 font-[var(--font-display)] uppercase text-3xl md:text-4xl tracking-[0.08em] text-[#e8e8e8]">
                  {ev.title}
                </h2>
                <p className="mt-1 font-mono text-[10px] text-[#8a8a8a] uppercase tracking-[0.2em]">
                  {ev.venue} <span className="text-[#c81e1e] mx-1">/</span> {ev.photos.length} photos
                </p>
              </div>

              <button
                onClick={() => setActiveEvent(ev.id)}
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#c81e1e] hover:text-[#e8e8e8] transition-colors duration-300 border-b border-[#c81e1e]/40 pb-1"
              >
                View all {ev.photos.length}
              </button>
            </div>

            <div
              onClick={() => setActiveEvent(ev.id)}
              className="grid grid-cols-2 md:grid-cols-5 gap-3 cursor-pointer"
            >
              {ev.photos.slice(0, 5).map((src, i) => {
                const isLast = i === 4 && ev.photos.length > 5;
                return (
                  <div
                    key={i}
                    className="group relative aspect-square overflow-hidden border border-[#8a8a8a]/15 bg-[#0c0c0c]"
                  >
                    <img
                      src={src}
                      alt={`${ev.title} photo ${i + 1}`}
                      className={`w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-110 ${
                        isLast ? "brightness-50" : "group-hover:grayscale-0"
                      }`}
                    />
                    {!isLast && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                    {isLast && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-sm md:text-base text-[#e8e8e8] tracking-[0.1em]">
                          +{ev.photos.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {idx < events.length - 1 && (
              <div className="mt-20 flex items-center justify-center gap-4 max-w-md mx-auto">
                <span className="divider-line" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8a8a8a]/40" />
                <span
                  className="divider-line"
                  style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }}
                />
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}