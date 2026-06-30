import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-widest">BLOOD EAGLE</h1>

        <p className="mt-6 max-w-xl text-gray-400 text-lg">Nek description oz podnaslov</p>

        <Link
          href="/events"
          className="mt-10 border border-white px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition">Events</Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-6">About us</h2>
        <p className="text-gray-400 leading-8 max-w-3xl">
          Blood Eagle is a Industrial techno collective based in Ljubljana, Slovenia.
        </p>
        <Link
          href="/about"
          className="inline-block mt-8 text-white border-b border-white hover:text-gray-300">Learn more</Link>
      </section>
    </main>
  );
}