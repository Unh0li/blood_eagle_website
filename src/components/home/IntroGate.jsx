"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Expo-out, the same curve the hero title's riseIn uses.
const EASE = [0.16, 1, 0.3, 1];
const DOOR_DURATION = 1.15;

// AnimatePresence only runs exit animations on its *direct* children. The gate
// used to hand it a plain <div>, so React unmounted the whole subtree instantly
// and the doors never animated. The wrapper is now a motion component, and the
// named variants below propagate down to every motion child automatically.
// The opacity keyframes hold at 1 — they animate nothing visually. They exist
// because a variant carrying only a `transition` resolves as instantly complete,
// which fires onExitComplete on frame one and unmounts the gate before the
// doors move. Giving the wrapper a real, full-length property keeps the whole
// subtree present until the doors have finished.
const gateVariants = {
  visible: { opacity: 1 },
  exit: {
    opacity: [1, 1],
    transition: { duration: DOOR_DURATION, staggerChildren: 0.04 },
  },
};

// Doors translate rather than scaleX: sliding keeps the lit inner edge crisp,
// where scaling would squash it into the seam. Pure transform either way.
const doorLeft = {
  visible: { x: "0%" },
  exit: { x: "-101%", transition: { duration: DOOR_DURATION, ease: EASE } },
};

const doorRight = {
  visible: { x: "0%" },
  exit: { x: "101%", transition: { duration: DOOR_DURATION, ease: EASE } },
};

// The seam flares as the doors part, then dies with them.
const seamVariants = {
  visible: { opacity: 0, scaleY: 0.3 },
  exit: {
    opacity: [0, 1, 0.85, 0],
    scaleY: [0.3, 1, 1, 1],
    transition: { duration: DOOR_DURATION, ease: "easeOut", times: [0, 0.18, 0.5, 1] },
  },
};

// Two short glowing segments rather than one continuous line. The clear gap
// spans 32-74%, which brackets the content block (measured at 37-68% of the
// viewport: logo from 37%, button ending at 68%) with margin on both sides.
const EDGE_LINE = {
  background:
    "linear-gradient(to bottom, transparent 0%, rgba(200,30,30,0.45) 14%, transparent 32%, transparent 74%, rgba(200,30,30,0.45) 88%, transparent 100%)",
};

// Content leaves slightly ahead of the doors so it reads as receding behind them.
const contentVariants = {
  visible: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 1.06,
    transition: { duration: 0.55, ease: "easeIn" },
  },
};

export default function IntroGate({ onEnter, onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleEnter = () => {
    if (leaving) return;
    onEnter();
    requestAnimationFrame(() => setLeaving(true));
  };

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div
          key="gate"
          initial="visible"
          animate="visible"
          exit="exit"
          variants={gateVariants}
          className="fixed inset-0 z-[500] pointer-events-none"
        >
          {/* SEAM — sits under the doors, revealed as they part */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              variants={seamVariants}
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(200,30,30,0.65) 35%, rgba(255,190,190,0.9) 50%, rgba(200,30,30,0.65) 65%, transparent)",
                willChange: "transform, opacity",
              }}
              className="h-full w-[3px] origin-center"
              aria-hidden="true"
            />
          </div>

          {/* LEFT DOOR */}
          <motion.div
            variants={doorLeft}
            style={{ willChange: "transform" }}
            className="absolute inset-y-0 left-0 w-1/2 bg-void pointer-events-auto"
            aria-hidden="true"
          >
            {/* Lit inner edge. The glow is deliberately absent through the
                middle third: a full-height line cut straight across the logo
                and the button, which is what made the seam look drawn on
                rather than like light between two doors. */}
            <span className="absolute inset-y-0 right-0 w-px" style={EDGE_LINE} />
            <span className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-blood/[0.05] to-transparent" />
          </motion.div>

          {/* RIGHT DOOR */}
          <motion.div
            variants={doorRight}
            style={{ willChange: "transform" }}
            className="absolute inset-y-0 right-0 w-1/2 bg-void pointer-events-auto"
            aria-hidden="true"
          >
            <span className="absolute inset-y-0 left-0 w-px" style={EDGE_LINE} />
            <span className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-blood/[0.05] to-transparent" />
          </motion.div>

          {/* FRONT UI LAYER — above the doors */}
          <motion.div
            variants={contentVariants}
            style={{ willChange: "transform, opacity" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* NOISE */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* SCANLINES */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #ffffff 3px, transparent 4px)",
              }}
            />

            {/* AMBIENT PULSE */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(200,30,30,0.14)_0%,transparent_65%)] animate-[gatePulse_5s_ease-in-out_infinite]"
            />

            {/* VIGNETTE */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.88)_100%)]"
            />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center px-6 pointer-events-auto">
              {/* Spacer for the logo, which page.js renders above this layer
                  so it can morph into the background watermark on exit. */}
              <div className="h-48 w-48 md:h-56 md:w-56" aria-hidden="true" />

              <button
                type="button"
                onClick={handleEnter}
                disabled={leaving}
                aria-label="Enter Valhalla"
                className="group relative mt-12 overflow-hidden border border-blood px-16 py-5 font-mono text-xs uppercase tracking-[0.4em] text-bone transition-transform duration-200 active:scale-95 disabled:pointer-events-none"
              >
                {/* HOVER FILL — grows out of the button's centre, which is where
                    the door seam crosses it, so the two edges travel apart. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-center scale-x-0 bg-blood transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"
                />

                {/* CORNER TICKS */}
                <span aria-hidden="true" className="corner-ticks">
                  <span
                    className="!border-blood/50"
                    style={{ top: 0, left: 0, width: 8, height: 8, borderTopWidth: 1, borderLeftWidth: 1 }}
                  />
                  <span
                    className="!border-blood/50"
                    style={{ bottom: 0, right: 0, width: 8, height: 8, borderBottomWidth: 1, borderRightWidth: 1 }}
                  />
                </span>

                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Enter Valhalla
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
