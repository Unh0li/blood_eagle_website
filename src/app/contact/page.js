import SiteBackdrop from "@/components/SiteBackdrop";
import Link from "next/link";

/* nastavi na null, ce predal kdaj ne bi delal, blok se takrat skrije */
const GENERAL_EMAIL = "info@bloodeagle.si";
const BOOKING_EMAIL = "terror.industrial29@gmail.com";

/* dolgi naslovi, zato tekoca velikost, da gredo povsod v eno vrstico */
const EMAIL_CLASS =
  "font-display uppercase text-[clamp(0.6rem,3.2vw,1.625rem)] tracking-[0.06em] text-bone hover:text-blood transition-colors duration-300 whitespace-nowrap";

function ContactRow({ label, email }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="eyebrow text-[10px] tracking-[0.3em] text-silver/60">{label}</p>
      <a href={`mailto:${email}`} className={EMAIL_CLASS}>
        {email}
      </a>
    </div>
  );
}

/* enaka locilna crta med vsemi bloki */
function Rule() {
  return (
    <div
      className="mx-auto h-px w-full max-w-[260px] bg-gradient-to-r from-transparent via-silver/20 to-transparent"
      aria-hidden="true"
    />
  );
}

export default function Contact() {
    return (
        <main className="site-shell selection:bg-blood selection:text-black">
            <SiteBackdrop />

            <section className="relative z-20 pt-32 text-center px-6">
                <h1
                    className="font-display uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
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

                {/* na telefonu manjsi rob, sicer dolg naslov nima kam */}
                <div className="group relative border border-silver/15 bg-panel/40 backdrop-blur-sm p-6 sm:p-10 md:p-14 transition-all duration-500 hover:border-blood/50">
                    <div className="corner-ticks">
                        <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
                        <span style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1 }} />
                        <span style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1 }} />
                        <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
                    </div>

                    {/* enakomeren ritem, vsak blok loci ista crta */}
                    <div className="flex flex-col gap-y-7 sm:gap-y-9">
                        {GENERAL_EMAIL && (
                            <>
                                <ContactRow label="General Questions" email={GENERAL_EMAIL} />
                                <Rule />
                            </>
                        )}

                        <ContactRow label="Booking Agent" email={BOOKING_EMAIL} />

                        <Rule />

                        <div className="flex flex-col items-center gap-2">
                            <p className="eyebrow text-[10px] tracking-[0.3em] text-silver/60">Location</p>
                            <p className="font-mono text-sm text-silver uppercase tracking-[0.2em]">
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