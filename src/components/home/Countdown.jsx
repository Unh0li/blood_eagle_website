"use client";

import {useState, useEffect} from "react";

export default function Countdown({ targetDate}){
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const tick = () => {
            const now = Date.now();
            const diff = target - now;
            if(diff <= 0){
                setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0, expired: true});
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
                expired: false
            });
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    if(!timeLeft) return null;

    if(timeLeft.expired){
        return(
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-blood">
                Tonight
            </p>
        );
    }

    const units = [
        {label: "days", value: timeLeft.days},
        {label: "hours", value: timeLeft.hours},
        {label: "minutes", value: timeLeft.minutes},
        {label: "seconds", value: timeLeft.seconds}
    ];

    return(
        <div className="mt-10 flex items-center justify-center gap-4 md:gap-8">
            {units.map((u,i) => (
                <div key={u.label} className="flex items-center gap-4 md:gap-8">
                    <div className="text-center">
                        <span className="block font-[var(--font-display)] text-3xl md:text-5xl text-bone tabular-nums">
                           {String(u.value).padStart(2, "0")} 
                        </span>
                        <span className="block mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-silver">
                            {u.label}
                        </span>
                    </div>
                    {i < units.length - 1 && (
                        <span className="text-blood text-2xl md:text-3xl pb-4">:</span>
                    )}
                    </div>
            ))}
        </div>
    );
}