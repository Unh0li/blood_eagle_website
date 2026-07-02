import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/home/Countdown";
import BloodDrips from "@/components/BloodDrips";

export default function Home() {
  return (
    <main className="site-shell selection:bg-blood selection:text-black relative">
      <div className="site-shell__ambient">
        <div className="glow-red" />
        <div className="glow-silver" />
        <div className="glow-accent" />
      </div>
      <div className="site-shell__grid" />
      <div className="site-shell__slash" />
      <div className="site-shell__vignette" />
      <BloodDrips />

      {/* logo v ozadju */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 w-full max-w-5xl px-6 pt-35 flex items-center justify-center animate-[fadeUp_0.9s_ease_both]">
        <div className="opacity-5 mix-blend-screen scale-[1.6] md:scale-[2.2] w-full h-full flex items-center justify-center">
          <Image
            src="/images/logo/logo_white.png"
            alt="Blood Eagle Background Watermark"
            width={1000}
            height={1000}
            className="object-contain w-full h-auto max-h-[55vh] filter blur-[0.5px] mx-auto"
            priority
          />
        </div>
      </div>

      {/* hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">

          <div className="w-full flex justify-center mb-16">
            <p className="font-mono text-xs md:text-sm text-silver uppercase animate-[fadeUp_0.9s_ease_both] inline-block">
              <span className="tracking-[0.5em] pr-[0.5em] ">Ljubljana · Slovenia</span> {/* <--- jebem ti milo mater hvala lepa */}
            </p>
          </div>

          <div className="relative flex items-center justify-center w-full min-h-[20vh] text-center">
            <h1 className="title-3d font-horror uppercase text-[10vw] md:text-[7.5vw] leading-[0.9] tracking-[0.08em] relative z-10 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
              BLOOD EAGLE
            </h1>
          </div>

          <div className="mx-auto mt-20 h-px w-28 bg-blood opacity-60" />

          <p className="mt-10 w-full font-mono text-xs md:text-sm text-silver uppercase tracking-[0.3em] leading-8 text-center animate-[fadeUp_0.9s_ease_0.2s_both]">
            WELCOME TO VALHALLA
          </p>

          <div className="mt-14 w-full flex justify-center animate-[fadeUp_0.9s_ease_0.4s_both]">
            <Link
              href="/events"
              className="group relative inline-block border border-blood px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone transition duration-300 hover:bg-blood hover:text-black overflow-hidden"
            >
              <div className="corner-ticks">
                <span className="!border-blood/40" style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, width: 6, height: 6 }} />
                <span className="!border-blood/40" style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, width: 6, height: 6 }} />
              </div>
              <span>View Events</span>
            </Link>
          </div>

        </div>
      </section>

      {/* who we are */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto mb-8">
          <span className="divider-line" />
          <p className="eyebrow">Who We Are</p>
          <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
        </div>

        <h2 className="text-2xl md:text-4xl font-[var(--font-display)] uppercase tracking-[0.1em] text-bone leading-tight text-center">
          INDUSTRIAL <span className="text-blood">/</span> RAW <span className="text-blood">/</span> BOCHKA
          <br />
          <span className="text-sm md:text-xl font-mono tracking-[0.4em] text-silver block mt-4 text-center">NO BPM LIMIT</span>
        </h2>

        <p className="mt-10 max-w-2xl mx-auto text-silver font-mono text-sm md:text-base leading-8 tracking-wide text-center">
          Blood Eagle is an underground industrial techno collective based in
          Ljubljana, focused on bla bla bla placeholder name xdddd.
        </p>

        <Link
          href="/about"
          className="inline-block mt-12 border-b border-blood pb-1 font-mono text-xs uppercase tracking-[0.25em] text-blood hover:text-bone transition-colors duration-300 group relative"
        >
          Learn More
          <span className="absolute bottom-0 left-0 w-0 h-px bg-bone group-hover:w-full transition-all duration-300" />
        </Link>
      </section>

      {/* naslednji event */}
      <section className="relative z-20 border-y border-silver/10 bg-panel/40 backdrop-blur-xs py-28">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center relative">
          <div className="corner-ticks max-w-xl mx-auto h-full inset-x-6 inset-y-0 opacity-40">
            <span style={{ top: -12, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
            <span style={{ bottom: -12, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
          </div>

          <p className="eyebrow text-xs">Next Event</p>

          <h2 className="mt-6 font-[var(--font-display)] text-5xl md:text-7xl uppercase tracking-[0.15em] text-bone text-center">
            BERZERK
          </h2>

          <p className="mt-6 font-mono text-xs md:text-sm text-silver uppercase tracking-[0.25em] leading-7 text-center">
            11 JULIJ 2026
            <br />
            <span className="text-bone/80">PUBLIKA BARKLUB, LJUBLJANA</span>
          </p>

          <div className="w-full flex justify-center">
            <Countdown targetDate="2026-07-11T20:00:00" />
          </div>

          <a
            href="https://www.entrio.si/en/event/blood-eagle-berzerk-33006"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block mt-12 border border-bone/30 px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone hover:bg-bone hover:text-black transition-all duration-300"
          >
            Get Tickets
          </a>
        </div>
      </section>

      {/* socialna omrezja */}
      <section className="relative z-20 py-28 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto mb-10">
          <span className="divider-line" />
          <p className="eyebrow">Follow Blood Eagle</p>
          <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 uppercase tracking-[0.25em] text-xs font-mono">
          {[
            { name: "Instagram", url: "https://www.instagram.com/blood.eagle.inc/" },
            { name: "SoundCloud", url: "https://soundcloud.com/blood-eagle24" },
            { name: "TikTok", url: "https://www.tiktok.com/@blood.eagle.inc" },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-silver hover:text-blood transition-colors duration-300 group py-1"
            >
              {social.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-blood group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}