"use client";

import { useState, useSyncExternalStore } from "react";

const COUNT = 6;

function makeDrips() {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * -20}%`,
    dur: 3.5 + Math.random() * 3.5,
    delay: Math.random() * 12,
    opacity: 0.04 + Math.random() * 0.06,
    length: 40 + Math.random() * 80,
    width: Math.random() > 0.85 ? "1.3px" : "0.8px",
    rotate: (Math.random() - 0.5) * 2,
  }));
}

const NO_SUBSCRIBE = () => () => {};
const onClient = () => true;
const onServer = () => false;

export default function BloodDrips() {
  /* Math.random() da na strezniku druge vrednosti kot na klientu,
     zato na strezniku ne izrisemo nicesar */
  const mounted = useSyncExternalStore(NO_SUBSCRIBE, onClient, onServer);
  const [drips] = useState(makeDrips);

  if (!mounted) return null;

  return (
    <div
      className="site-shell__drip pointer-events-none select-none"
      aria-hidden="true"
    >
      {drips.map((d) => (
        <span
          key={d.id}
          className="drip drip--rain"
          style={{
            left: d.left,
            top: d.top,
            width: d.width,
            opacity: d.opacity,
            transform: `rotate(${d.rotate}deg)`,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
            "--drip-length": `${d.length}px`,
          }}
        />
      ))}
    </div>
  );
}
