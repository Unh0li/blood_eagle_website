"use client";

import { useEffect, useState } from "react";

export default function BloodDrips() {
    const [drips, setDrips] = useState([]);

    useEffect(() => {
        const generated = Array.from({ length: 12 }, (_, i) => {
            const rand = Math.random();

            return {
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -20}%`,
                dur: 3.5 + Math.random() * 3.5,
                delay: Math.random() * 12,
                opacity: 0.04 + Math.random() * 0.06,
                length: 40 + Math.random() * 80,
                width: rand > 0.85 ? "1.3px" : "0.8px",
                rotate: (Math.random() - 0.5) * 2,
            };
        });
        setDrips(generated);
    }, []);

    return (
        <div className="site-shell__drip">
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
                        ["--drip-length"]: `${d.length}px`,
                    }}
                />
            ))}
        </div>
    );
}