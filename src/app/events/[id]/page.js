"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { events } from "@/data/events";
import Image from "next/image";

export default function EventDetail({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const ev = events.find((e) => e.id === id);

    if (!ev) {
        return (
            <main className="site-shell flex items-center justify-center min-h-screen">
                <p className="font-mono text-silver uppercase tracking-[0.2em]">Event not found</p>
            </main>
        );
    }

    return (
        <main className="site-shell selection:bg-blood selection:text-black">
            <div className="site-shell__ambient">
                <div className="glow-red" />
                <div className="glow-silver" />
            </div>
            <div className="site-shell__grid" />

            <div className="fixed top-24 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 w-full max-w-5xl px-6 pt-35 flex items-center justify-center">
                <div className="opacity-5 mix-blend-screen scale-[1.6] md:scale-[2.2] w-full h-full flex items-center justify-center">
                    <Image
                        src="/images/logo/logo_white.png"
                        alt="Blood Eagle Fixed Background Watermark"
                        width={1000}
                        height={1000}
                        className="object-contain w-full h-auto max-h-[55vh] filter blur-[0.5px]"
                        priority
                    />
                </div>
            </div>

            <section className="relative z-20 pt-32 px-6 max-w-4xl mx-auto pb-32">
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-silver hover:text-blood transition-colors duration-300 mb-12 animate-[fadeUp_0.9s_ease_both]"
                >
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">&lsaquo;</span>
                    Back to events
                </button>

                <div className="text-center mb-16 overflow-hidden">
                    <p className="eyebrow animate-[fadeUp_0.9s_ease_0.1s_both]">{ev.date}</p>
                    <h1
                        className="mt-4 font-[var(--font-display)] uppercase text-[12vw] md:text-[6vw] leading-[0.85] tracking-[-0.01em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]"
                        style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
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

                {ev.lineup?.length > 0 && (
                    <div className="mb-16 animate-[fadeUp_0.9s_ease_0.5s_both]">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="divider-line" />
                            <p className="eyebrow whitespace-nowrap">Lineup</p>
                            <span
                                className="divider-line"
                                style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }}
                            />
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            {ev.lineup.map((name, i) => {
                                const isHeadliner = i === 0;
                                return (
                                    <span
                                        key={name}
                                        className={
                                            isHeadliner
                                                ? "font-[var(--font-display)] uppercase text-3xl md:text-4xl tracking-[0.06em] text-blood"
                                                : "font-[var(--font-display)] uppercase text-lg md:text-xl tracking-[0.06em] text-bone/70"
                                        }
                                    >
                                        {name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}

                {ev.timetable?.length > 0 && (
                    <div className="mb-16 animate-[fadeUp_0.9s_ease_0.6s_both]">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="divider-line" />
                            <p className="eyebrow whitespace-nowrap">Timetable</p>
                            <span
                                className="divider-line"
                                style={{
                                    background:
                                        "linear-gradient(to left, transparent, rgba(138,138,138,0.4))",
                                }}
                            />
                        </div>

                        <div className="max-w-[340px] mx-auto">
                            {ev.timetable.map((slot, i) => {
                                const pulseVariants = [
                                    "0,10 26,10 32,10 36,2 40,18 44,10 70,10",
                                    "0,10 30,10 36,10 40,2 44,18 48,10 70,10",
                                    "0,10 22,10 28,10 32,2 36,18 40,10 70,10",
                                ];
                                const pts = pulseVariants[i % pulseVariants.length];

                                return (
                                    <div
                                        key={i}
                                        className="group flex items-center gap-3 py-4 border-b border-silver/10 last:border-b-0"
                                    >
                                        <span className="w-16 shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-bone group-hover:text-white transition-colors">
                                            {slot.act}
                                        </span>

                                        <div className="flex-1 flex items-center justify-center h-6 overflow-hidden">
                                            <svg
                                                viewBox="0 0 70 20"
                                                preserveAspectRatio="none"
                                                className="w-full h-full ekg-line"
                                                style={{ animationDelay: `${i * 0.4}s` }}
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
                                                    strokeWidth="1.25"
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>

                                        <span className="w-14 shrink-0 text-right font-mono text-xs tracking-[0.15em] text-blood group-hover:text-[#ff5555] transition-colors">
                                            {slot.time}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

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
                            TICKETS UNAVALIABLE
                        </span>
                    )}

                    {ev.photos?.length > 0 ? (
                        <Link
                            href={`/gallery?event=${ev.id}`}
                            className="font-mono text-[11px] uppercase tracking-[0.25em] text-blood/70 hover:text-blood transition-colors duration-300 border-b border-blood/20 hover:border-blood/60 pb-0.5"
                        >
                            View {ev.photos.length} photos
                        </Link>
                    ) : (
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-silver/40">
                            Photos coming soon
                        </span>
                    )}
                </div>
            </section>
        </main>
    );
}