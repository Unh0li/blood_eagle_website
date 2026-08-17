"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { events } from "@/data/events";
import Lightbox from "@/components/gallery/Lightbox";
import Image from "next/image";
import SiteBackdrop from "@/components/SiteBackdrop";

function GalleryInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  /* v pregledu so samo dogodki s fotografijami */
  const visibleEvents = events.filter((ev) => ev.photos.length > 0);

  /* beremo naravnost iz naslova, prek effecta je deep link izrisal pregled */
  const requestedId = searchParams.get("event");
  const activeEvent = events.some((e) => e.id === requestedId) ? requestedId : null;

  const openEvent = (id) => {
    router.push(`/gallery?event=${id}`, { scroll: false });
  };

  const closeEvent = () => {
    router.push(`/gallery`, { scroll: false });
  };

  if (activeEvent) {
    const ev = events.find((e) => e.id === activeEvent);
    if (!ev) return null;

    const openLightbox = (i) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);
    const nextPhoto = () => setLightboxIndex((p) => (p + 1) % ev.photos.length);
    const prevPhoto = () => setLightboxIndex((p) => (p - 1 + ev.photos.length) % ev.photos.length);

    return (
      <main className="site-shell selection:bg-blood selection:text-black">
        <SiteBackdrop />

        <section className="relative z-20 pt-32 px-6 max-w-6xl mx-auto pb-32">
          <button
            onClick={closeEvent}
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-silver hover:text-blood transition-colors duration-300 mb-12 animate-[fadeUp_0.9s_ease_both]"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">&lsaquo;</span>
            Back to gallery
          </button>

          <div className="text-center mb-24 flex flex-col items-center gap-y-12">
            <p className="eyebrow animate-[fadeUp_0.9s_ease_0.1s_both]">
              {ev.date}
            </p>

            <h1
              className="w-full px-6 font-display uppercase text-[clamp(1.75rem,8.5vw,5.5rem)] leading-[0.9] tracking-[-0.01em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_0.15s_both] text-balance break-words"
              style={{ WebkitTextStroke: "1px rgba(232,232,232,0.12)" }}
            >
              {ev.title}
            </h1>

            <p className="font-mono text-xs text-silver uppercase tracking-[0.25em] animate-[fadeUp_0.9s_ease_0.3s_both]">
              {ev.venue} <span className="text-blood mx-2">/</span> {ev.photos.length} photos
            </p>
          </div>

          {ev.photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ev.photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(i)}
                  aria-label={`Open ${ev.title} photo ${i + 1} of ${ev.photos.length}`}
                  className="group relative aspect-square overflow-hidden border border-silver/15 bg-panel cursor-pointer z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blood"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 50vw, 33vw"
                    className="object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[0.2em] text-bone opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {String(i + 1).padStart(3, "0")}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 border border-silver/10 bg-panel/30">
              <p className="font-display uppercase text-3xl md:text-4xl tracking-[0.08em] text-silver/40">
                Coming soon
              </p>
              <p className="mt-4 font-mono text-[11px] text-silver/40 uppercase tracking-[0.2em] text-center max-w-sm">
                Footage from this event hasn&apos;t dropped yet
              </p>
            </div>
          )}
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
    <main className="site-shell selection:bg-blood selection:text-black">
      <SiteBackdrop />

      <section className="relative z-20 pt-32 text-center px-6">
        <h1
          className="font-display uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
        >
          GALLERY
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-silver font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Archived footage <span className="text-blood">/</span> past rituals
        </p>
      </section>

      <section className="relative z-20 max-w-6xl mx-auto px-6 mt-24 pb-32 flex flex-col gap-24">
        {visibleEvents.map((ev, idx) => (
          <div key={ev.id}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

              {/* podatki o dogodku */}
              <div className="flex flex-col gap-y-4">
                <p className="eyebrow text-[10px]">{ev.date}</p>
                <h2 className="font-display uppercase text-3xl md:text-4xl tracking-[0.08em] text-bone leading-none m-0 p-0">
                  {ev.title}
                </h2>
                <p className="font-mono text-[10px] text-silver uppercase tracking-[0.2em] m-0 p-0">
                  {ev.venue} <span className="text-blood mx-1">/</span> {ev.photos.length} photos
                </p>
              </div>

              {ev.photos.length > 0 && (
                <button
                  onClick={() => openEvent(ev.id)}
                  className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood hover:text-bone transition-colors duration-300 border-b border-blood/40 pb-1 relative z-10 cursor-pointer"
                >
                  View all
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-[fadeUp_0.9s_ease_0.4s_both]">
              {ev.photos.slice(0, 5).map((src, i) => {
                const isLast = i === 4 && ev.photos.length > 5;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => openEvent(ev.id)}
                    aria-label={`View all ${ev.photos.length} photos from ${ev.title}`}
                    className="group relative aspect-square overflow-hidden border border-silver/15 bg-panel cursor-pointer z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blood"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 50vw, 33vw"
                      className={`object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-110 pointer-events-none ${isLast ? "brightness-50" : "group-hover:grayscale-0"
                        }`}
                    />
                    {!isLast && (
                      <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    )}
                    {isLast && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="font-mono text-sm md:text-base text-bone tracking-[0.1em]">
                          +{ev.photos.length - 5}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {idx < visibleEvents.length - 1 && (
              <div className="mt-20 flex items-center justify-center gap-4 max-w-md mx-auto">
                <span className="divider-line" />
                <span className="w-1.5 h-1.5 rounded-full bg-silver/40" />
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

export default function Gallery() {
  return (
    <Suspense fallback={null}>
      <GalleryInner />
    </Suspense>
  );
}