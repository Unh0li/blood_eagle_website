import BloodDrips from "@/components/BloodDrips";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
    return (
        <main className="site-shell selection:bg-blood selection:text-black">
      <div className="site-shell__ambient">
        <div className="glow-red" />
        <div className="glow-silver" />
        <div className="glow-accent" />
      </div>
      <div className="site-shell__grid" />
      <div className="site-shell__slash" />
      <div className="site-shell__vignette" />
      <BloodDrips />


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

            <section className="relative z-20 pt-32 text-center px-6">
                <h1
                    className="font-[var(--font-display)] uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
                    style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
                >
                    CONTACT
                </h1>
                <p className="mt-6 max-w-xl mx-auto text-silver font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
                    Bookings <span className="text-blood">/</span> press <span className="text-blood">/</span> general inquiries
                </p>
            </section>

            <section className="relative z-20 max-w-3xl mx-auto px-6 mt-24 pb-32 text-center">
                <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-12">
                    <span className="divider-line" />
                    <p className="eyebrow">Get in touch</p>
                    <span
                        className="divider-line"
                        style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }}
                    />
                </div>

                <div className="group relative border border-silver/15 bg-panel/40 backdrop-blur-sm p-10 md:p-16 transition-all duration-500 hover:border-blood/50">
    <div className="corner-ticks">
        <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
        <span style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1 }} />
        <span style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1 }} />
        <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
    </div>

    {/* za kontakt */}
    <div className="flex flex-col gap-y-12">
        
        {/* splošni kontakt */}
        <div className="flex flex-col items-center">
            <p className="eyebrow text-[10px] mb-3 tracking-[0.3em] text-silver/50 uppercase">General Questions</p>
            <a
                href="mailto:info@bloodeagle.si"
                className="font-[var(--font-display)] uppercase text-2xl md:text-3xl tracking-[0.06em] text-bone hover:text-blood transition-colors duration-300"
            >
                info@bloodeagle.si
            </a>
        </div>

        {/* line med maili */}
        <div className="mx-auto h-px w-12 bg-blood/30" />

        {/* booking agent */}
        <div className="flex flex-col items-center">
            <p className="eyebrow text-[10px] mb-3 tracking-[0.3em] text-silver/50 uppercase">Booking Agent</p>
            <a
                href="mailto:terror.industrial29@gmail.com"
                className="font-[var(--font-display)] uppercase text-xl sm:text-2xl md:text-3xl lg:text-3xl tracking-[0.06em] text-bone hover:text-blood transition-colors duration-300 break-all"
            >
                terror.industrial29@gmail.com
            </a>
        </div>

        {/* locilna linija*/}
        <div className="mx-auto h-px w-full max-w-[240px] bg-gradient-to-r from-transparent via-silver/20 to-transparent my-2" />

        {/* lokacija */}
        <div className="flex flex-col items-center">
            <p className="eyebrow text-[10px] mb-3 tracking-[0.3em] text-silver/50 uppercase">Location</p>
            <p className="font-mono text-sm text-silver uppercase tracking-[0.2em] leading-7">
                Ljubljana <span className="text-blood mx-1">/</span> Slovenia
            </p>
        </div>
        
    </div>
</div>

                <div className="mt-20 flex items-center justify-center gap-4 max-w-xs mx-auto mb-10">
                    <span className="divider-line" />
                    <p className="eyebrow">Follow</p>
                    <span
                        className="divider-line"
                        style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 uppercase tracking-[0.25em] text-xs font-mono">
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

                <Link
                    href="/"
                    className="inline-block mt-16 border-b border-blood pb-1 font-mono text-xs uppercase tracking-[0.25em] text-blood hover:text-bone transition-colors duration-300 group relative"
                >
                    Back home
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-bone group-hover:w-full transition-all duration-300" />
                </Link>
            </section>
        </main>
    );
}