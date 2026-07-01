import Link from "next/link";

export default function Home() {
  return (
    <main className="site-shell selection:bg-[#c81e1e] selection:text-black">
      {/* shit iz global cssa */}
      <div className="site-shell__ambient">
        <div className="glow-red" />
        <div className="glow-silver" />
      </div>
      <div className="site-shell__grid" />

      {/* main shit */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          
          <p className="font-mono text-xs md:text-sm tracking-[0.5em] text-[#c81e1e] uppercase animate-[fadeUp_0.9s_ease_both]">
            Ljubljana · Slovenia
          </p>

          <h1 
            className="mt-6 font-[var(--font-display)] uppercase text-[11vw] md:text-[8vw] leading-[0.85] tracking-[-0.01em] text-[#e8e8e8] animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ WebkitTextStroke: "1px rgba(232,232,232,0.12)" }}
          >
            BLOOD EAGLE
          </h1>

          <div className="mx-auto mt-10 h-px w-28 bg-[#c81e1e] opacity-80" />

          <p className="mt-10 font-mono text-xs md:text-sm text-[#8a8a8a] uppercase tracking-[0.3em] leading-8 animate-[fadeUp_0.9s_ease_0.2s_both]">
            Industrial Techno
            <br />
            Horror Industrial
            <br />
            Heavy Bochka
          </p>

          <div className="mt-14 animate-[fadeUp_0.9s_ease_0.4s_both]">
            <Link
              href="/events"
              className="group relative inline-block border border-[#c81e1e] px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-[#e8e8e8] transition duration-300 hover:bg-[#c81e1e] hover:text-black overflow-hidden"
            >
              {/* cornerji za estetiko */}
              <div className="corner-ticks">
                <span className="!border-[#c81e1e]/40" style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, width: 6, height: 6 }} />
                <span className="!border-[#c81e1e]/40" style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, width: 6, height: 6 }} />
              </div>
              View Events
            </Link>
          </div>

        </div>
      </section>

      {/* about us na kratko */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 py-32 text-center">
        
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-8">
          <span className="divider-line" />
          <p className="eyebrow">Who We Are</p>
          <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
        </div>

        <h2 className="text-2xl md:text-4xl font-[var(--font-display)] uppercase tracking-[0.1em] text-[#e8e8e8] leading-tight">
          INDUSTRIAL <span className="text-[#c81e1e]">/</span> RAW <span className="text-[#c81e1e]">/</span> BOCHKA
          <br />
          <span className="text-sm md:text-xl font-mono tracking-[0.4em] text-[#8a8a8a] block mt-4">NO BPM LIMIT</span>
        </h2>

        <p className="mt-10 max-w-2xl mx-auto text-[#8a8a8a] font-mono text-sm md:text-base leading-8 tracking-wide">
          Blood Eagle is an underground industrial techno collective based in
          Ljubljana, focused on bla bla bla placeholder name xdddd.
        </p>

        <Link
          href="/about"
          className="inline-block mt-12 border-b border-[#c81e1e] pb-1 font-mono text-xs uppercase tracking-[0.25em] text-[#c81e1e] hover:text-[#e8e8e8] transition-colors duration-300 group relative"
        >
          Learn More
          <span className="absolute bottom-0 left-0 w-0 h-px bg-[#e8e8e8] group-hover:w-full transition-all duration-300" />
        </Link>

      </section>

      {/* naslednji dogodek */}
      <section className="relative z-20 border-y border-[#8a8a8a]/10 bg-[#0c0c0c]/40 backdrop-blur-xs py-28">
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          
          {/* industrial type css shit */}
          <div className="corner-ticks max-w-xl mx-auto h-full inset-x-6 inset-y-0 opacity-40">
            <span style={{ top: -12, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
            <span style={{ bottom: -12, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
          </div>

          <p className="eyebrow text-xs">Next Event</p>

          <h2 className="mt-6 font-[var(--font-display)] text-5xl md:text-7xl uppercase tracking-[0.15em] text-[#e8e8e8]">
            BERZERK
          </h2>

          <p className="mt-6 font-mono text-xs md:text-sm text-[#8a8a8a] uppercase tracking-[0.25em] leading-7">
            11 JULIJ 2026
            <br />
            <span className="text-[#e8e8e8]/80">PUBLIKA, LJUBLJANA</span>
          </p>

          <a
            href="https://www.entrio.si/en/event/blood-eagle-berzerk-33006"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block mt-12 border border-[#e8e8e8]/30 px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-[#e8e8e8] hover:bg-[#e8e8e8] hover:text-black transition-all duration-300 shadow-[0_0_30px_-10px_rgba(232,232,232,0.1)]"
          >
            Get Tickets
          </a>

        </div>
      </section>

      {/* socialna omrezja */}
      <section className="relative z-20 py-28 text-center">
        
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-10">
          <span className="divider-line" />
          <p className="eyebrow">Follow Blood Eagle</p>
          <span className="divider-line" style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }} />
        </div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 uppercase tracking-[0.25em] text-xs font-mono">
          {[
            { name: "Instagram", url: "https://www.instagram.com/blood.eagle.inc/" },
            { name: "SoundCloud", url: "https://soundcloud.com/blood-eagle24" },
            { name: "TikTok", url: "https://www.tiktok.com/@blood.eagle.inc" }
          ].map((social) => (
            <a 
              key={social.name}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative text-[#8a8a8a] hover:text-[#c81e1e] transition-colors duration-300 group py-1"
            >
              {social.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c81e1e] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

      </section>
    </main>
  );
}