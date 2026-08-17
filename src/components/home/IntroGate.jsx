"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* expo-out, ista krivulja kot riseIn pri naslovu */
const EASE = [0.16, 1, 0.3, 1];
const DOOR_DURATION = 1.15;

/* AnimatePresence anima samo neposredne otroke, zato je ovoj motion
   opacity drzi pri 1, varianta samo s transition bi se koncala takoj */
const gateVariants = {
  visible: { opacity: 1 },
  exit: {
    opacity: [1, 1],
    transition: { duration: DOOR_DURATION, staggerChildren: 0.04 },
  },
};

/* vrata drsijo, scaleX bi zmecal osvetljen rob v siv */
const doorLeft = {
  visible: { x: "0%" },
  exit: { x: "-101%", transition: { duration: DOOR_DURATION, ease: EASE } },
};

const doorRight = {
  visible: { x: "0%" },
  exit: { x: "101%", transition: { duration: DOOR_DURATION, ease: EASE } },
};

/* siv zazari ko se vrata razmaknejo, nato ugasne */
const seamVariants = {
  visible: { opacity: 0, scaleY: 0.3 },
  exit: {
    opacity: [0, 1, 0.85, 0],
    scaleY: [0.3, 1, 1, 1],
    transition: { duration: DOOR_DURATION, ease: "easeOut", times: [0, 0.18, 0.5, 1] },
  },
};

/* dva kratka odseka namesto ene crte, vrzel je tam kjer je vsebina */
const EDGE_LINE = {
  background:
    "linear-gradient(to bottom, transparent 0%, rgba(200,30,30,0.26) 12%, transparent 28%, transparent 76%, rgba(200,30,30,0.26) 90%, transparent 100%)",
};

/* vsebina odide malo pred vrati */
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
          {/* siv, lezi pod vrati */}
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

          {/* leva vrata */}
          <motion.div
            variants={doorLeft}
            style={{ willChange: "transform" }}
            className="absolute inset-y-0 left-0 w-1/2 bg-void pointer-events-auto"
            aria-hidden="true"
          >
            {/* osvetljen notranji rob */}
            <span className="absolute inset-y-0 right-0 w-px" style={EDGE_LINE} />
            <span className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-blood/[0.05] to-transparent" />
          </motion.div>

          {/* desna vrata */}
          <motion.div
            variants={doorRight}
            style={{ willChange: "transform" }}
            className="absolute inset-y-0 right-0 w-1/2 bg-void pointer-events-auto"
            aria-hidden="true"
          >
            <span className="absolute inset-y-0 left-0 w-px" style={EDGE_LINE} />
            <span className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-blood/[0.05] to-transparent" />
          </motion.div>

          {/* sprednja plast, nad vrati */}
          <motion.div
            variants={contentVariants}
            style={{ willChange: "transform, opacity" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* sum */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* skenirne crte */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #ffffff 3px, transparent 4px)",
              }}
            />

            {/* utrip v ozadju */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(200,30,30,0.14)_0%,transparent_65%)] animate-[gatePulse_5s_ease-in-out_infinite]"
            />

            {/* vinjeta */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.88)_100%)]"
            />

            {/* vsebina */}
            <div className="relative z-10 flex flex-col items-center px-6 pointer-events-auto">
              {/* prostor za logotip, ki ga izrise page.js */}
              <div className="h-48 w-48 md:h-56 md:w-56" aria-hidden="true" />

              <button
                type="button"
                onClick={handleEnter}
                disabled={leaving}
                aria-label="Enter Valhalla"
                className="group relative mt-12 overflow-hidden border border-blood px-16 py-5 font-mono text-xs uppercase tracking-[0.4em] text-bone transition-transform duration-200 active:scale-95 disabled:pointer-events-none"
              >
                {/* polnilo ob hoverju, raste iz sredine navzven */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-center scale-x-0 bg-blood transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"
                />

                {/* kotne oznake */}
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
