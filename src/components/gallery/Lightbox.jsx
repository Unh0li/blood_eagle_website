"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Lightbox({ photos, index, onClose, onNext, onPrev }) {
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) (delta > 0 ? onNext : onPrev)();
    touchStart.current = null;
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#070707]/97 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center border border-[#8a8a8a]/20 text-[#8a8a8a] hover:text-[#c81e1e] hover:border-[#c81e1e] transition-colors duration-300 font-mono text-lg"
      >
        &times;
      </button>

      <span className="absolute top-7 left-6 font-mono text-[10px] tracking-[0.3em] text-[#8a8a8a] uppercase">
        {String(index + 1).padStart(3, "0")} / {String(photos.length).padStart(3, "0")}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="group absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center"
      >
        <span className="absolute inset-0 border border-[#8a8a8a]/20 group-hover:border-[#c81e1e] transition-colors duration-300" />
        <span className="relative text-3xl text-[#8a8a8a] group-hover:text-[#c81e1e] group-hover:-translate-x-1 transition-all duration-300">
          &lsaquo;
        </span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="group absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center"
      >
        <span className="absolute inset-0 border border-[#8a8a8a]/20 group-hover:border-[#c81e1e] transition-colors duration-300" />
        <span className="relative text-3xl text-[#8a8a8a] group-hover:text-[#c81e1e] group-hover:translate-x-1 transition-all duration-300">
          &rsaquo;
        </span>
      </button>

      <div
        key={index}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90vw] h-[85vh] animate-[fadeUp_0.3s_ease_both]"
      >
        <Image
          src={photos[index]}
          alt={`Photo ${index + 1}`}
          fill
          sizes="90vw"
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}