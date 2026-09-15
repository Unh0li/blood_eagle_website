import SiteBackdrop from "@/components/SiteBackdrop";
import SocialLinks from "@/components/SocialLinks";

function CornerTicks({ red = false }) {
  const c = red ? "rgba(200,30,30,0.5)" : "rgba(138,138,138,0.35)";
  return (
    <div className="corner-ticks" aria-hidden="true">
      <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, borderColor: c }} />
      <span style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1, borderColor: c }} />
      <span style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1, borderColor: c }} />
      <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: c }} />
    </div>
  );
}

export default function MerchPage() {
  return (
    <main className="site-shell selection:bg-blood selection:text-black">
      <SiteBackdrop />

      <section className="relative z-20 pt-32 text-center px-6">
        <h1
          className="font-display uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
        >
          MERCH
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-silver font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Apparel <span className="text-blood">/</span> accessories
        </p>
      </section>

      <section className="relative z-20 max-w-3xl mx-auto px-6 mt-24 pb-32">
        <div className="relative flex flex-col items-center justify-center overflow-hidden border border-silver/10 bg-panel/40 backdrop-blur-sm p-10 sm:p-14 md:p-20 text-center animate-[fadeUp_0.9s_ease_0.3s_both]">
          <CornerTicks />
          <div
            className="pointer-events-none absolute -right-20 top-0 w-72 h-72 rounded-full bg-blood/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-blood/10 animate-[gatePulse_5s_ease-in-out_infinite]" aria-hidden="true" />
            <div className="absolute inset-3 rounded-full border border-blood/6 animate-[gatePulse_5s_ease-in-out_1.5s_infinite]" aria-hidden="true" />
            <span className="select-none font-horror text-6xl text-blood/20 animate-[gatePulse_5s_ease-in-out_infinite]" aria-hidden="true">
              ᛞ
            </span>
          </div>

          <h2
            className="relative z-10 font-display text-2xl uppercase tracking-[0.15em] text-bone sm:text-3xl"
            style={{ WebkitTextStroke: "0.5px rgba(232,232,232,0.2)" }}
          >
            COMING SOON
          </h2>

          <p className="relative z-10 mt-8 max-w-md font-mono text-xs leading-7 tracking-wide text-silver sm:text-sm">
            We are working hard to bring you a selection of high-quality Blood Eagle merchandise.
            Stay tuned for updates and be ready to grab your favorite items when they become available.
          </p>

          <div className="relative mt-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-silver/20" aria-hidden="true" />
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-blood sm:text-[10px]">
                Follow us for updates
              </p>
              <span className="h-px w-8 bg-silver/20" aria-hidden="true" />
            </div>
            <SocialLinks />
          </div>
        </div>
      </section>
    </main>
  );
}