"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/home/Countdown";
import SiteBackdrop from "@/components/SiteBackdrop";
import IntroGate from "@/components/home/IntroGate";
import { events, parseEventDate } from "@/data/events";
import { motion, LayoutGroup } from "framer-motion";

const LOGO_TRANSITION = { duration: 1.25, ease: [0.22, 1, 0.36, 1] };

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/blood.eagle.inc/" },
  { name: "SoundCloud", url: "https://soundcloud.com/blood-eagle24" },
  { name: "TikTok",     url: "https://www.tiktok.com/@blood.eagle.inc"  },
];

// ── SHARED SUB-KOMPONENTE ────────────────────────────────────────

function Divider({ label, muted = false, className = "mb-10" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
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

function CornerTicks({ red = false }) {
  const c = red ? "rgba(200,30,30,0.5)" : "rgba(138,138,138,0.35)";
  return (
    <div className="corner-ticks" aria-hidden="true">
      <span style={{ top:    0, left:  0, borderTopWidth:    1, borderLeftWidth:  1, borderColor: c }} />
      <span style={{ top:    0, right: 0, borderTopWidth:    1, borderRightWidth: 1, borderColor: c }} />
      <span style={{ bottom: 0, left:  0, borderBottomWidth: 1, borderLeftWidth:  1, borderColor: c }} />
      <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: c }} />
    </div>
  );
}

// ── EVENT KARTICE ────────────────────────────────────────────────

function UpcomingCard({ event }) {
  return (
    <div className="group relative overflow-hidden border border-blood/30 bg-panel/40 p-8 transition-all duration-500 hover:border-blood/60 sm:p-10 md:p-14">
      <CornerTicks red />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blood/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center text-center">
        <p className="eyebrow text-[10px]">{event.date}</p>

        <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-[0.08em] text-bone transition-colors duration-500 group-hover:text-blood sm:text-5xl md:text-7xl">
          {event.title}
        </h2>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-5 bg-silver/40" />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-silver">
            {event.venue}
          </p>
          <span className="h-px w-5 bg-silver/40" />
        </div>

        {event.lineup?.length > 0 && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blood/80">
            {event.lineup.join(" / ")}
          </p>
        )}

        {event.countdownDate && (
          <div className="mt-12">
            <Countdown targetDate={event.countdownDate} />
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/events"
            className="border border-silver/20 px-8 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone transition-all duration-300 hover:border-blood hover:bg-blood hover:text-black"
          >
            Event Details
          </Link>
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blood px-8 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone transition-all duration-300 hover:bg-blood hover:text-black"
            >
              Get Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const TBA_SOCIALS = SOCIAL_LINKS.slice(0, 2);

function TBACard() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden border border-silver/10 bg-panel/20 p-14 text-center">
      <CornerTicks />
      <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-blood/10 animate-[gatePulse_5s_ease-in-out_infinite]" aria-hidden="true" />
        <div className="absolute inset-3 rounded-full border border-blood/6 animate-[gatePulse_5s_ease-in-out_1.5s_infinite]" aria-hidden="true" />
        <span className="select-none font-horror text-5xl text-blood/20 animate-[gatePulse_5s_ease-in-out_infinite]" aria-hidden="true">
          ᛟ
        </span>
      </div>

      <h3 className="font-display text-xl uppercase tracking-[0.2em] text-silver/70">
        The Next Ritual
      </h3>

      <div className="mt-4 flex items-center gap-4">
        <span className="h-px w-8 bg-silver/20" />
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-blood">
          Is Being Prepared
        </p>
        <span className="h-px w-8 bg-silver/20" />
      </div>

      <div className="mt-8 flex gap-8">
        {TBA_SOCIALS.map(({ name, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-silver/25 pb-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-silver/70 transition-colors duration-300 hover:border-blood hover:text-blood"
          >
            {name}
          </a>
        ))}
      </div>
    </div>
  );
}

function LatestCard({ event }) {
  return (
    <div className="group relative overflow-hidden border border-silver/10 bg-panel/20 transition-all duration-500 hover:border-silver/20">
      <CornerTicks />

      <div className="flex flex-col md:flex-row">
        {/* Slika */}
        {event.photos?.length > 0 ? (
          <Link href="/gallery" className="relative shrink-0 overflow-hidden md:w-[45%]">
            <div className="relative h-52 overflow-hidden md:h-full md:min-h-[280px]">
              <Image
                src={event.photos[0]}
                alt={event.title}
                fill
                sizes="(max-width: 767px) 100vw, 45vw"
                className="object-cover grayscale contrast-110 brightness-70 transition-all duration-700 group-hover:brightness-85 group-hover:grayscale-[0.4]"
              />
              <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent to-panel/60 md:block" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-panel/80 to-transparent md:hidden" aria-hidden="true" />

              {event.photos.length > 1 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2 border border-silver/15 bg-void/70 px-2.5 py-1 backdrop-blur-sm">
                  <span className="h-1 w-1 rounded-full bg-silver/40" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-silver/80">
                    {event.photos.length} photos
                  </span>
                </div>
              )}

              {/* Thumbnail kolona — samo desktop */}
              {event.photos.length > 1 && (
                <div className="absolute bottom-0 right-0 hidden w-14 flex-col gap-px md:flex">
                  {event.photos.slice(1, 4).map((src, i) => (
                    <div key={src} className="relative h-14 overflow-hidden">
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover grayscale brightness-50 transition-all duration-500 group-hover:brightness-65"
                      />
                      {i === 2 && event.photos.length > 4 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-void/60">
                          <span className="font-mono text-[8px] text-silver/75">
                            +{event.photos.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="flex h-48 shrink-0 flex-col items-center justify-center gap-2 border-b border-silver/8 bg-panel/40 md:h-auto md:w-[45%] md:border-b-0 md:border-r">
            <span className="font-horror text-4xl text-silver/8" aria-hidden="true">ᚠ</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-silver/55">No Photos</span>
          </div>
        )}

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between p-7 md:p-10">
          <div>
            {/* No "Archive" tag here — the section divider above already reads
                "Last Event" and the link below reads "Event Archive". */}
            {/* This card is meant to read as "archived" and sit quieter than the
                upcoming one, but the old 22-45% opacities were unreadable on a
                phone outdoors. Still muted, now above the legibility floor. */}
            <p className="eyebrow mb-2 text-[9px]" style={{ color: "rgba(138,138,138,0.85)" }}>
              {event.date}
            </p>

            <h3 className="font-display text-2xl uppercase leading-none tracking-[0.06em] text-bone/85 transition-colors duration-700 group-hover:text-bone md:text-3xl">
              {event.title}
            </h3>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-silver">
              {event.venue}
            </p>

            {event.lineup?.length > 0 && (
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-blood/90">
                {event.lineup.join(" / ")}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-silver/20 pt-5">
            <Link
              href="/events"
              className="group/link relative py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-silver/80 transition-colors duration-300 hover:text-bone"
            >
              Event Archive
              <span className="absolute bottom-0 left-0 h-px w-0 bg-silver/60 transition-all duration-300 group-hover/link:w-full" />
            </Link>

            {event.photos?.length > 0 && (
              <Link
                href="/gallery"
                className="group/link flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-silver/80 transition-colors duration-300 hover:text-bone"
              >
                <span className="relative py-1">
                  View Gallery
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-silver/60 transition-all duration-300 group-hover/link:w-full" />
                </span>
                <span className="text-silver/60 transition-colors duration-300 group-hover/link:text-bone">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GLAVNA KOMPONENTA ────────────────────────────────────────────

// sessionStorage is browser-only, so the server can't know whether this visitor
// already passed the gate. Reading it in an effect meant the gate rendered open
// and then snapped shut — a full-screen black flash on every return to home.
// useSyncExternalStore lets React settle the difference during hydration instead.
const NO_SUBSCRIBE = () => () => {};
const hasEntered = () => sessionStorage.getItem("be-entered") === "true";
const assumeFirstVisit = () => false;

// The resting watermark has to end up the same size as the one SiteBackdrop
// renders on every other page — but framer needs a number, so the md: breakpoint
// can't come from a class here. Keep these two in step with SiteBackdrop.
const DESKTOP_QUERY = "(min-width: 768px)";
const WATERMARK_SCALE = { mobile: 1.1, desktop: 2.2 };

const subscribeToBreakpoint = (onChange) => {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};
const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;
const assumeDesktop = () => true;

export default function Home() {
  const skipGate = useSyncExternalStore(NO_SUBSCRIBE, hasEntered, assumeFirstVisit);
  const desktop = useSyncExternalStore(subscribeToBreakpoint, isDesktop, assumeDesktop);
  const restScale = desktop ? WATERMARK_SCALE.desktop : WATERMARK_SCALE.mobile;
  const [justEntered, setJustEntered] = useState(false);
  const [gateFinished, setGateFinished] = useState(false);

  const showGate = !skipGate && !gateFinished;
  const entered = skipGate || justEntered;

  const now = new Date();

  const upcomingEvent =
    [...events]
      .filter((e) => parseEventDate(e.date) >= now)
      .sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date))[0] ?? null;

  const latestEvent =
    [...events]
      .filter((e) => parseEventDate(e.date) < now)
      .sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date))[0] ?? null;

  // The flag is written only once the doors have finished. Writing it on click
  // made hasEntered() return true on the very next render, which flipped
  // skipGate, unmounted IntroGate mid-click and killed the door animation.
  const handleGateDone = () => {
    sessionStorage.setItem("be-entered", "true");
    setGateFinished(true);
  };

  return (
    <>
      {showGate && (
        <IntroGate onEnter={() => setJustEntered(true)} onDone={handleGateDone} />
      )}

      <main className="site-shell relative selection:bg-blood selection:text-black">
        {/* No watermark here — the animated logo below plays that role. */}
        <SiteBackdrop watermark={false} />

        {/* Logo morph. The two branches share a layoutId, and framer only links
            them if they sit in the same LayoutGroup — scoped here rather than
            wrapping the whole app in layout.js. The resting state is the same
            logo_white watermark every other page shows via SiteBackdrop. */}
        <LayoutGroup>
          {entered ? (
            <motion.div
              key="logo-bg"
              layoutId="blood-eagle-logo"
              transition={LOGO_TRANSITION}
              className="fixed left-1/2 top-24 z-0 flex w-full max-w-5xl -translate-x-1/2 items-center justify-center px-6 pt-35 pointer-events-none select-none"
              aria-hidden="true"
            >
              <motion.div
                initial={false}
                animate={{ opacity: 0.05, scale: restScale, filter: "blur(0.6px)" }}
                transition={LOGO_TRANSITION}
                className="flex h-full w-full items-center justify-center mix-blend-screen"
              >
                <Image
                  src="/images/logo/logo_white.png"
                  alt=""
                  width={1000}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 1000px"
                  priority
                  className="h-auto max-h-[55vh] w-full object-contain"
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="logo-gate"
              layoutId="blood-eagle-logo"
              transition={LOGO_TRANSITION}
              className="fixed inset-0 z-[510] flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <motion.div
                initial={false}
                animate={{ scale: 0.22, opacity: 0.9, y: 0 }}
                exit={{ scale: 0.15, opacity: 0 }}
                transition={LOGO_TRANSITION}
                className="h-[1000px] w-[1000px]"
              >
                <Image
                  src="/images/logo/logo_mix.png"
                  alt=""
                  width={1000}
                  height={1000}
                  sizes="1000px"
                  priority
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </LayoutGroup>

        {/* ── HERO ── */}
        {/* min-h-[100svh] namesto min-h-screen — na mobilnih browserjih
            100svh upošteva address bar, screen pa ne */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <p className="mb-16 font-mono text-xs uppercase tracking-[0.5em] text-silver animate-[fadeUp_0.9s_ease_both] md:text-sm">
              Ljubljana · Slovenia
            </p>

            <h1 className="title-3d relative z-10 font-horror text-[10vw] uppercase leading-[0.9] tracking-[0.08em] drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] md:text-[7.5vw]">
              BLOOD EAGLE
            </h1>

            <div className="mx-auto mt-16 h-px w-24 bg-blood opacity-60" />

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-silver animate-[fadeUp_0.9s_ease_0.2s_both] md:text-sm">
              WELCOME TO VALHALLA
            </p>

            <div className="mt-12 animate-[fadeUp_0.9s_ease_0.4s_both]">
              <Link
                href="/events"
                className="group relative inline-block overflow-hidden border border-blood px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone transition-colors duration-300 hover:bg-blood hover:text-black"
              >
                <div className="corner-ticks" aria-hidden="true">
                  <span className="!border-blood/40" style={{ top: 0,    left:  0, borderTopWidth:    1, borderLeftWidth:  1, width: 6, height: 6 }} />
                  <span className="!border-blood/40" style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, width: 6, height: 6 }} />
                </div>
                View Events
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          <Divider label="Who We Are" className="mb-8 w-full max-w-xs" />

          <h2 className="font-display text-2xl uppercase leading-tight tracking-[0.1em] text-bone md:text-4xl">
            INDUSTRIAL <span className="text-blood">/</span> RAW <span className="text-blood">/</span> BOCHKA
            <span className="mt-4 block font-mono text-sm tracking-[0.4em] text-silver md:text-xl">
              NO BPM LIMIT
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-2xl font-mono text-sm leading-8 tracking-wide text-silver md:text-base">
            Blood Eagle is an underground industrial techno collective based in
            Ljubljana, pushing raw, uncompromising sound with no BPM limit.
          </p>

          <Link
            href="/about"
            className="group relative mt-12 inline-block border-b border-blood pb-1 font-mono text-xs uppercase tracking-[0.25em] text-blood transition-colors duration-300 hover:text-bone"
          >
            Learn More
            <span className="absolute bottom-0 left-0 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
          </Link>
        </section>

        {/* ── UPCOMING EVENT ── */}
        <section className="relative z-20 mx-auto max-w-5xl px-6 pb-8">
          <Divider label="Next Event" />
          {upcomingEvent ? <UpcomingCard event={upcomingEvent} /> : <TBACard />}
        </section>

        {/* ── LATEST EVENT ── */}
        {latestEvent && (
          <section className="relative z-20 mx-auto mt-6 max-w-5xl px-6 pb-24">
            <Divider label="Last Event" muted />
            <LatestCard event={latestEvent} />
          </section>
        )}

        {/* ── SOCIALS ── */}
        <section className="relative z-20 flex flex-col items-center py-24 text-center">
          <Divider label="Follow Blood Eagle" className="mb-10 w-full max-w-xs" />

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-mono text-xs uppercase tracking-[0.25em]">
            {SOCIAL_LINKS.map(({ name, url }) => (
             <a 
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative py-1 text-silver transition-colors duration-300 hover:text-blood"
              >
                {name}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-blood transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}