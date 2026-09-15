"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { events, parseEventDate } from "@/data/events";
import SiteBackdrop from "@/components/SiteBackdrop";

const PULSE_VARIANTS = [
    "0,10 26,10 32,10 36,2 40,18 44,10 70,10",
    "0,10 30,10 36,10 40,2 44,18 48,10 70,10",
    "0,10 22,10 28,10 32,2 36,18 40,10 70,10",
];

const COMING_SOON = "font-mono text-[11px] uppercase tracking-[0.25em] text-silver/40";


function heroTitleSize(title) {
    const len = title.length;
    if (len <= 6) return "clamp(2.25rem, 12vw, 8rem)";
    if (len <= 9) return "clamp(2rem, 10vw, 6.5rem)";
    if (len <= 13) return "clamp(1.75rem, 8vw, 5rem)";
    if (len <= 18) return "clamp(1.5rem, 6.5vw, 3.75rem)";
    return "clamp(1.25rem, 5.5vw, 3rem)";
}

function Divider({ label }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <span className="divider-line" />
            <p className="eyebrow whitespace-nowrap">{label}</p>
            <span
                className="divider-line"
                style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }}
            />
        </div>
    );
}

export default function EventDetail({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const ev = events.find((e) => e.id === id);


    const lineup = useMemo(() => (ev?.lineup ?? []).filter(Boolean), [ev]);

    const timetable = useMemo(
        () => (ev?.timetable ?? []).filter((slot) => slot?.act && slot?.time),
        [ev]
    );

    const isPast = useMemo(
        () => (ev ? parseEventDate(ev.date) < new Date() : false),
        [ev]
    );

    if (!ev) {
        return (
            <main className="site-shell flex flex-col items-center justify-center min-h-[100svh] gap-6 px-6 text-center">
                <p className="font-mono text-silver uppercase tracking-[0.2em]">Event not found</p>
                <Link
                    href="/events"
                    className="font-mono text-[11px] uppercase tracking-[0.25em] text-blood hover:text-bone transition-colors duration-300 border-b border-blood/40 pb-0.5"
                >
                    Back to events
                </Link>
            </main>
        );
    }


    const lineupEmptyText = isPast ? "Lineup unavailable" : "Artists to be announced";
    const moreArtistsText = isPast ? "Full lineup unavailable" : "More artists to be announced";
    const timetableEmptyText = isPast ? "Timetable unavailable" : "Timetable coming soon";

    return (
        <main className="site-shell selection:bg-blood selection:text-black">
            <SiteBackdrop />

            <section className="relative z-20 pt-32 px-6 max-w-4xl mx-auto pb-32">
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-silver hover:text-blood transition-colors duration-300 mb-12 animate-[fadeUp_0.9s_ease_both]"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true">
                        &lsaquo;
                    </span>
                    Back to events
                </button>

                <div className="text-center mb-16 overflow-hidden">
                    <p className="eyebrow animate-[fadeUp_0.9s_ease_0.1s_both]">{ev.date}</p>
                    <h1
                        className="mt-4 px-4 font-display uppercase leading-[0.85] tracking-[-0.01em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_0.15s_both] text-balance break-words"
                        style={{
                            WebkitTextStroke: "1px rgba(232,232,232,0.15)",
                            fontSize: heroTitleSize(ev.title),
                        }}
                    >
                        {ev.title}
                    </h1>
                    <p className="mt-4 font-mono text-xs text-silver uppercase tracking-[0.25em] animate-[fadeUp_0.9s_ease_0.3s_both]">
                        {ev.venue}
                    </p>
                    {ev.genre && (
                        <p className="mt-2 font-mono text-xs text-blood uppercase tracking-[0.25em] animate-[fadeUp_0.9s_ease_0.4s_both]">
                            {ev.genre}
                        </p>
                    )}
                </div>


                <div className="mb-16 animate-[fadeUp_0.9s_ease_0.5s_both]">
                    <Divider label="Lineup" />
                    {lineup.length > 0 ? (
                        <div className="flex flex-col items-center gap-5">
                            {lineup.map((name, i) => (
                                <span
                                    key={name}
                                    className={
                                        i === 0
                                            ? "font-display uppercase text-3xl md:text-4xl tracking-[0.06em] text-blood text-center break-words"
                                            : "font-display uppercase text-lg md:text-xl tracking-[0.06em] text-bone/70 text-center break-words"
                                    }
                                >
                                    {name}
                                </span>
                            ))}
                            {lineup.length === 1 && (
                                <p className={`mt-2 ${COMING_SOON}`}>{moreArtistsText}</p>
                            )}
                        </div>
                    ) : (
                        <p className={`text-center ${COMING_SOON}`}>{lineupEmptyText}</p>
                    )}
                </div>

                <div className="mb-20 animate-[fadeUp_0.9s_ease_0.6s_both]">
                    <Divider label="Timetable" />
                    {timetable.length > 0 ? (
                        <div className="relative max-w-2xl mx-auto border border-silver/10 bg-panel/40 backdrop-blur-sm overflow-hidden">
                            <div className="corner-ticks" aria-hidden="true">
                                <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, borderColor: "rgba(138,138,138,0.35)" }} />
                                <span style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1, borderColor: "rgba(138,138,138,0.35)" }} />
                                <span style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1, borderColor: "rgba(138,138,138,0.35)" }} />
                                <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: "rgba(138,138,138,0.35)" }} />
                            </div>

                            {timetable.map((slot, i) => {
                            const pts = PULSE_VARIANTS[i % PULSE_VARIANTS.length];
                            return (
                                <div
                                    key={`${slot.act}-${slot.time}`}
                                    className="group flex items-baseline justify-between gap-4 px-5 py-5 border-b border-silver/10 last:border-b-0 hover:bg-blood/5 transition-all duration-300 md:grid md:grid-cols-[140px_1fr_140px] md:items-center md:gap-8 md:px-8 md:py-6"
                                >
                                    <span className="font-display uppercase tracking-[0.12em] text-sm text-bone group-hover:text-blood transition-colors truncate">
                                        {slot.act}
                                    </span>

                                    <svg
                                        viewBox="0 0 70 20"
                                        preserveAspectRatio="none"
                                        className="hidden w-full h-7 ekg-line md:block"
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <linearGradient id={`ekgFade-${i}`} x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="var(--color-blood)" stopOpacity="0" />
                                                <stop offset="20%" stopColor="var(--color-blood)" stopOpacity="1" />
                                                <stop offset="80%" stopColor="var(--color-blood)" stopOpacity="1" />
                                                <stop offset="100%" stopColor="var(--color-blood)" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <polyline
                                            points={pts}
                                            fill="none"
                                            stroke={`url(#ekgFade-${i})`}
                                            strokeWidth="1.4"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    <span className="shrink-0 text-right font-mono text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.22em] text-blood whitespace-nowrap group-hover:text-[#ff5555] transition-colors">
                                        {slot.time}
                                    </span>
                                </div>
                            );
                        })}
                </div>
                ) : (
                <p className={`text-center ${COMING_SOON}`}>{timetableEmptyText}</p>
                    )}
            </div>

            <div className="flex flex-col items-center gap-6 animate-[fadeUp_0.9s_ease_0.7s_both]">
                {ev.ticketUrl ? (
                    <a
                        href={ev.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-block border border-blood px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone hover:bg-blood hover:text-black transition-all duration-300"
                    >
                        Get Tickets
                    </a>
                ) : (
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-silver/50 border border-silver/20 px-10 py-4">
                        TICKETS UNAVAILABLE
                    </span>
                )}

                {ev.photos?.length > 0 ? (
                    <Link
                        href={`/gallery?event=${ev.id}`}
                        className="font-mono text-[11px] uppercase tracking-[0.25em] text-blood/70 hover:text-blood transition-colors duration-300 border-b border-blood/20 hover:border-blood/60 pb-0.5 pl-[0.25em]"
                    >
                        View {ev.photos.length} photos
                    </Link>
                ) : (
                    isPast && <span className={COMING_SOON}>Photos coming soon</span>
                )}
            </div>
        </section>
        </main >
    );
}