import Link from "next/link";
import { connection } from "next/server";
import { events, parseEventDate } from "@/data/events";
import Countdown from "@/components/home/Countdown";
import SiteBackdrop from "@/components/SiteBackdrop";

export default async function Events() {
  // Without this the upcoming/past split is evaluated once during the build and
  // then frozen into the prerendered shell, so a finished event never moves to
  // "past". connection() defers this render to request time.
  await connection();
  const now = new Date();

  const upcoming = events.filter((e) => parseEventDate(e.date) >= now);
  const past = events.filter((e) => parseEventDate(e.date) < now);

  return (
    <main className="site-shell selection:bg-blood selection:text-black">
      <SiteBackdrop />

      <section className="relative z-20 pt-32 text-center px-6">
        <h1
          className="font-display uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
        >
          EVENTS
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-silver font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Upcoming <span className="text-blood">/</span> past events
        </p>
      </section>

      <div className="relative z-20 max-w-5xl mx-auto px-6 pb-32 mt-24">

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
                  className="group relative border border-blood/30 bg-panel/40 backdrop-blur-sm p-8 md:p-12 transition-all duration-500 hover:border-blood/70 hover:bg-panel/60 overflow-hidden"
                >
                  <div className="corner-ticks">
                    <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
                    <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
                  </div>

                  <div className="absolute -right-10 -top-10 w-64 h-64 bg-blood/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <Link href={`/events/${ev.id}`} className="flex-1 min-w-0">
                      <p className="eyebrow text-[10px] mb-4">{ev.date}</p>

                      <h2 className="font-display uppercase text-4xl md:text-6xl tracking-[0.05em] text-bone leading-[0.95] group-hover:text-blood transition-colors duration-500">
                        {ev.title}
                      </h2>

                      <div className="mt-4 flex items-center gap-3">
                        <span className="w-6 h-px bg-silver/40" />
                        <p className="font-mono text-[11px] text-silver uppercase tracking-[0.25em]">
                          {ev.venue}
                        </p>
                      </div>

                      {/* length check, not just truthiness — an empty array is
                          truthy and would render a blank spaced-out paragraph. */}
                      {ev.lineup?.length > 0 && (
                        <p className="mt-5 font-mono text-[11px] text-blood/80 uppercase tracking-[0.2em]">
                          {ev.lineup.join("  /  ")}
                        </p>
                      )}
                    </Link>

                    {ev.countdownDate && (
                      <div className="shrink-0 lg:pl-10 lg:border-l lg:border-silver/10">
                        <Countdown targetDate={ev.countdownDate} />
                      </div>
                    )}
                  </div>

                  <div className="relative mt-10 pt-8 border-t border-silver/10 flex items-center justify-between">
                    <Link
                      href={`/events/${ev.id}`}
                      className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver/50 hover:text-blood transition-colors duration-300"
                    >
                      Event details &rsaquo;
                    </Link>

                    {ev.ticketUrl ? (
                      <a
                        href={ev.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-block border border-blood px-10 py-3.5 font-mono text-[11px] uppercase tracking-[0.3em] text-bone hover:bg-blood hover:text-black transition-all duration-300"
                      >
                        Get Tickets
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-silver/40 border border-silver/15 px-10 py-3.5">
                        TBA
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {upcoming.length > 0 && past.length > 0 && (
          <div className="flex items-center gap-4 mb-12">
            <span className="divider-line" />
            <p className="eyebrow whitespace-nowrap">Past</p>
            <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
          </div>
        )}

        {past.length > 0 && (
          <div className="flex flex-col gap-0">
            {past.map((ev, idx) => (
              <div key={ev.id}>
                <div className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-7 transition-all duration-300 hover:px-4">

                  <Link href={`/events/${ev.id}`} className="flex items-center gap-6 md:gap-10">
                    <span className="font-mono text-[11px] text-silver/60 tracking-[0.2em] shrink-0 w-8 text-right">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h2 className="font-display uppercase text-xl md:text-2xl tracking-[0.08em] text-bone/70 group-hover:text-bone transition-colors duration-300">
                        {ev.title}
                      </h2>
                      <p className="mt-1 font-mono text-[10px] text-silver/50 uppercase tracking-[0.2em]">
                        {ev.venue}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-6 ml-14 md:ml-0">
                    <span className="font-mono text-[10px] text-silver/40 uppercase tracking-[0.2em]">
                      {ev.date}
                    </span>

                    {ev.photos?.length > 0 ? (
                      <Link
                        href={`/gallery?event=${ev.id}`}
                        className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood/60 hover:text-blood transition-colors duration-300 border-b border-blood/20 hover:border-blood/60 pb-0.5"
                      >
                        Photos
                      </Link>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver/60">
                        Coming soon
                      </span>
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