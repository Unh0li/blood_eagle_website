import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#050505] text-[#E5E5E5]">

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

        {/* Kasneje sem pride video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505]" />

        {/* Temen overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-6">

          <p className="mb-6 uppercase tracking-[0.5em] text-sm text-red-700">
            Ljubljana · Slovenia
          </p>

          <h1 className="text-6xl md:text-8xl xl:text-8xl font-black tracking-[0.35em]">
            BLOOD EAGLE
          </h1>

          <div className="mx-auto mt-8 h-px w-28 bg-red-700" />

          <p className="mt-8 text-neutral-400 uppercase tracking-[0.25em] leading-8">
            Industrial Techno
            <br />
            Horror Industrial
            <br />
            Heavy Bochka
          </p>

          <Link
            href="/events"
            className="inline-block mt-14 border border-red-700 px-10 py-4 uppercase tracking-[0.3em] transition duration-300 hover:bg-red-700 hover:text-white"
          >
            View Events
          </Link>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section className="max-w-4xl mx-auto px-6 py-32 text-center">

        <p className="uppercase tracking-[0.45em] text-red-700 text-sm">
          WHO WE ARE
        </p>

        <h2 className="mt-6 text-4xl md:text-4xl font-bold uppercase tracking-[0.2em]">
          INDUSTRIAL | RAW | BOCHKA
          <br />
          <br />
          NO BPM LIMIT
        </h2>

        <p className="mt-10 text-neutral-400 leading-9 text-lg">
          Blood Eagle is an underground industrial techno collective based in
          Ljubljana, focused on uncompromising sound, dark atmospheres and
          immersive warehouse experiences.
        </p>

        <Link
          href="/about"
          className="inline-block mt-12 border-b border-red-700 pb-1 uppercase tracking-[0.25em] text-red-700 hover:text-white transition"
        >
          Learn More
        </Link>

      </section>

      {/* ================= NEXT EVENT ================= */}

      <section className="border-y border-neutral-900 py-24">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[0.45em] text-red-700 text-sm">
            NEXT EVENT
          </p>

          <h2 className="mt-6 text-5xl font-black tracking-[0.2em]">
            BERZERK
          </h2>

          <p className="mt-6 text-neutral-400 uppercase tracking-[0.2em]">
            11 JULIJ 2026
            <br />
            PUBLIKA, LJUBLJANA
          </p>

          <Link
            href="https://www.entrio.si/en/event/blood-eagle-berzerk-33006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-12 border border-white px-8 py-4 uppercase tracking-[0.3em] hover:bg-white hover:text-black transition"
          >
            Get Tickets
          </Link>

        </div>

      </section>

      {/* ================= SOCIALS ================= */}

      <section className="py-24 text-center">

        <p className="uppercase tracking-[0.45em] text-red-700 text-sm">
          FOLLOW BLOOD EAGLE
        </p>

        <div className="mt-10 flex justify-center gap-10 uppercase tracking-[0.25em] text-neutral-400">

          <a href="https://www.instagram.com/blood.eagle.inc/" target="_blank" rel="noopener noreferrer">Instagram</a>

          <a href="https://soundcloud.com/blood-eagle24" target="_blank" rel="noopener noreferrer">SoundCloud</a>

          <a href="https://www.tiktok.com/@blood.eagle.inc" target="_blank" rel="noopener noreferrer">TikTok</a>

        </div>

      </section>

    </main>
  );
}