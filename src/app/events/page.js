import Link from "next/link";
import { events } from "@/data/events";
import Countdown from "@/components/home/Countdown";
import Image from "next/image";

function parseDate(dateStr) {
  return new Date(dateStr.replace(/(\d+)\s+(\w+)\s+(\d+)/, "$2 $1 $3"));
}

export default function Events() {
  const now = new Date();

  const upcoming = events.filter((e) => parseDate(e.date) >= now);
  const past = events.filter((e) => parseDate(e.date) < now);

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

      {/* header */}
      <section className="relative z-20 pt-32 text-center px-6">
        <h1
          className="font-[var(--font-display)] uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
        >
          EVENTS
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-silver font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Upcoming <span className="text-blood">/</span> past events
        </p>
      </section>

      <div className="relative z-20 max-w-5xl mx-auto px-6 pb-32 mt-24">

        {/* upcoming */}
        {upcoming.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <span className="divider-line" />
              <p className="eyebrow whitespace-nowrap">Upcoming</p>
              <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
            </div>

            <div className="flex flex-col gap-6">
              {upcoming.map((ev) => (
                <div
                  key={ev.id}
                  className="group relative border border-blood/30 bg-panel/40 backdrop-blur-sm p-8 transition-all duration-500 hover:border-blood/70 hover:bg-panel/60"
                >
                  {/* corner ticks */}
                  <div className="corner-ticks">
                    <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
                    <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <p className="eyebrow text-[10px] mb-3">{ev.date}</p>
                      <h2 className="font-[var(--font-display)] uppercase text-3xl md:text-5xl tracking-[0.06em] text-bone leading-none">
                        {ev.title}
                      </h2>
                      <p className="mt-3 font-mono text-[11px] text-silver uppercase tracking-[0.25em]">
                        {ev.venue}
                      </p>
                      <Countdown targetDate="2026-07-11T20:00:00" />

                      {ev.lineup && (
                        <p className="mt-2 font-mono text-[11px] text-blood uppercase tracking-[0.2em]">
                          {ev.lineup.join(" / ")}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                      {ev.ticketUrl ? (
                        <a
                          href={ev.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-block border border-blood px-8 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone hover:bg-blood hover:text-black transition-all duration-300"
                        >
                          Get Tickets
                        </a>
                      ) : (
                        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-silver/50 border border-silver/20 px-8 py-3">
                          TBA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* divider med upcoming in past */}
        {upcoming.length > 0 && past.length > 0 && (
          <div className="flex items-center gap-4 mb-12">
            <span className="divider-line" />
            <p className="eyebrow whitespace-nowrap">Past Events</p>
            <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
          </div>
        )}

        {/* past events */}
        {past.length > 0 && (
          <div className="flex flex-col gap-0">
            {past.map((ev, idx) => (
              <div key={ev.id}>
                <div className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-7 transition-all duration-300 hover:px-4">

                  <div className="flex items-center gap-6 md:gap-10">
                    {/* index */}
                    <span className="font-mono text-[11px] text-silver/30 tracking-[0.2em] shrink-0 w-8 text-right">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h2 className="font-[var(--font-display)] uppercase text-xl md:text-2xl tracking-[0.08em] text-bone/70 group-hover:text-bone transition-colors duration-300">
                        {ev.title}
                      </h2>
                      <p className="mt-1 font-mono text-[10px] text-silver/50 uppercase tracking-[0.2em]">
                        {ev.venue}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 ml-14 md:ml-0">
                    <span className="font-mono text-[10px] text-silver/40 uppercase tracking-[0.2em]">
                      {ev.date}
                    </span>

                    {ev.photos?.length > 0 && (
                      <Link
                        href={`/gallery#${ev.id}`}
                        className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood/60 hover:text-blood transition-colors duration-300 border-b border-blood/20 hover:border-blood/60 pb-0.5"
                      >
                        Photos
                      </Link>
                    )}
                  </div>
                </div>

                {idx < past.length - 1 && (
                  <div className="h-px bg-silver/8" />
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}