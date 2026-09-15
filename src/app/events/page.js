import Link from "next/link";
import { connection } from "next/server";
import { events, parseEventDate } from "@/data/events";
import Countdown from "@/components/home/Countdown";
import SiteBackdrop from "@/components/SiteBackdrop";


function cardTitleSize(title) {
  const len = title.length;
  if (len <= 6) return "clamp(1.75rem, 6vw, 3.75rem)";
  if (len <= 9) return "clamp(1.5rem, 5vw, 3rem)";
  if (len <= 13) return "clamp(1.25rem, 4vw, 2.5rem)";
  return "clamp(1.1rem, 3.2vw, 2rem)";
}

// app/events/page.js
function Divider({ label, muted = false }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="divider-line" />
      <p
        className="eyebrow whitespace-nowrap"
        style={muted ? { color: "rgba(138,138,138,0.45)" } : undefined}
      >
        {label}
      </p>
      <span
        className="divider-line"
        style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }}
      />
    </div>
  );
}
export default async function Events() {
  /* brez tega se delitev na prihajajoce in pretekle zamrzne ob buildu,
     connection() prestavi izris na cas zahtevka */
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
            <Divider label="Upcoming" />

            <div className="flex flex-col gap-6">
              {upcoming.map((ev) => {
                const lineup = ev.lineup?.filter(Boolean) ?? [];

                return (
                  <div
                    key={ev.id}
                    className="group relative border border-blood/30 bg-panel/40 backdrop-blur-sm p-8 md:p-12 transition-all duration-500 hover:border-blood/70 hover:bg-panel/60 overflow-hidden"
                  >
                    <div className="corner-ticks" aria-hidden="true">
                      <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
                      <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: "rgba(200,30,30,0.5)" }} />
                    </div>

                    <div className="absolute -right-10 -top-10 w-64 h-64 bg-blood/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

                    <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                      <Link href={`/events/${ev.id}`} className="flex-1 min-w-0">
                        <p className="eyebrow text-[10px] mb-4">{ev.date}</p>


                        <h2
                          className="font-display uppercase tracking-[0.05em] text-bone leading-[0.95] group-hover:text-blood transition-colors duration-500 break-words"
                          style={{ fontSize: cardTitleSize(ev.title) }}
                        >
                          {ev.title}
                        </h2>

                        <div className="mt-4 flex items-center gap-3">
                          <span className="w-6 h-px bg-silver/40" />
                          <p className="font-mono text-[11px] text-silver uppercase tracking-[0.25em]">
                            {ev.venue}
                          </p>
                        </div>

                        {lineup.length > 0 && (
                          <p className="mt-5 font-mono text-[11px] text-blood/80 uppercase tracking-[0.2em] break-words">
                            {lineup.join("  /  ")}
                          </p>
                        )}
                      </Link>

                      {ev.countdownDate && (
                        <div className="shrink-0 lg:pl-10 lg:border-l lg:border-silver/10">
                          <Countdown targetDate={ev.countdownDate} />
                        </div>
                      )}
                    </div>

                    <div className="relative mt-10 pt-8 border-t border-silver/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                          className="relative inline-block text-center border border-blood px-10 py-3.5 font-mono text-[11px] uppercase tracking-[0.3em] text-bone hover:bg-blood hover:text-black transition-all duration-300"
                        >
                          Get Tickets
                        </a>
                      ) : (
                        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-silver/40 border border-silver/15 px-10 py-3.5 text-center">
                          TBA
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {past.length > 0 && <Divider label="Past" muted />}
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
                        className="font-mono text-[10px] uppercase tracking-[0.25em] text-blood/60 hover:text-blood transition-colors duration-300 border-b border-blood/20 hover:border-blood/60 pb-0.5 pl-[0.25em]"
                      >
                        Photos
                      </Link>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver/60">
                        Photos coming soon
                      </span>
                    )}
                  </div>
                </div>

                {idx < past.length - 1 && <div className="h-px bg-silver/8" />}
              </div>
            ))}
          </div>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-silver/40">
              No events on the calendar yet
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-silver/25">
              Follow us for updates
            </p>
          </div>
        )}
      </div>
    </main >
  );
}