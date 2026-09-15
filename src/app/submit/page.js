"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SiteBackdrop from "@/components/SiteBackdrop";
import { SOCIAL_LINKS } from "@/components/SocialLinks";


const SUBMISSION_EMAIL = "contact@bloodeagle.si";

const GENRE_OPTIONS = [
  "Industrial Techno",
  "Hard Techno",
  "Raw Techno",
  "EBM / Electro-Industrial",
  "Hardgroove",
  "Schranz",
  "Acid Techno",
  "Other",
];

const FIELD_ORDER = ["djName", "instagram", "genre", "otherGenre", "bpm", "link"];

const INPUT_BASE =
  "w-full border bg-black/20 px-4 py-3 font-mono text-sm text-bone placeholder:text-silver/25 outline-none transition-colors duration-300 focus:bg-blood/[0.02]";

function fieldBorder(hasError, touched) {
  if (hasError && touched) return "border-blood/60";
  return "border-silver/15 focus:border-blood/50";
}

function normalizeUrl(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validate(data) {
  const errs = {};
  if (!data.djName.trim()) errs.djName = "Tell us who you are";
  if (!data.instagram.trim()) errs.instagram = "Instagram handle is required";
  if (!data.genre) errs.genre = "Pick a genre";
  if (data.genre === "Other" && !data.otherGenre.trim()) errs.otherGenre = "Tell us what genre";
  if (!data.bpm.trim()) {
    errs.bpm = "BPM is required";
  } else if (!/^\d+$/.test(data.bpm.trim()) || Number(data.bpm) <= 0) {
    errs.bpm = "Enter a valid BPM";
  }
  if (!data.link.trim()) {
    errs.link = "Link to your set is required";
  } else if (!isValidUrl(normalizeUrl(data.link))) {
    errs.link = "Enter a valid link";
  }
  return errs;
}

function buildEmailBody(data) {
  const genre = data.genre === "Other" ? data.otherGenre.trim() : data.genre;
  const igHandle = data.instagram.trim().replace(/^@+/, "");
  const link = data.link.trim() ? normalizeUrl(data.link) : "";
  const lines = [
    `DJ / Artist name: ${data.djName.trim() || "—"}`,
    `Instagram: ${igHandle ? `@${igHandle}` : "—"}`,
    `Genre: ${genre || "—"}`,
    `BPM: ${data.bpm.trim() || "—"}`,
    `Link: ${link || "—"}`,
  ];
  if (data.notes.trim()) lines.push("", `Notes: ${data.notes.trim()}`);
  return lines.join("\n");
}

function buildMailtoHref(data) {
  const subject = `New submission — ${data.djName.trim() || "Unnamed"}`;
  return `mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildEmailBody(data))}`;
}

/* skupne pod komponente, enak vzorec kot na drugih straneh */

function Divider({ label, className = "mb-10" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="divider-line" />
      <p className="eyebrow whitespace-nowrap">{label}</p>
      <span
        className="divider-line"
        style={{ background: "linear-gradient(to left, transparent, rgba(138,138,138,0.4))" }}
      />
    </div>
  );
}

function CornerTicks() {
  const c = "rgba(138,138,138,0.35)";
  return (
    <div className="corner-ticks" aria-hidden="true">
      <span style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1, borderColor: c }} />
      <span style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1, borderColor: c }} />
      <span style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1, borderColor: c }} />
      <span style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1, borderColor: c }} />
    </div>
  );
}

function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-silver/60">
      {children} <span className="text-blood">*</span>
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-blood" role="alert">
      {message}
    </p>
  );
}

const INITIAL_FORM = {
  djName: "",
  instagram: "",
  genre: "",
  otherGenre: "",
  bpm: "",
  link: "",
  notes: "",
};

export default function SubmitPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [genrePickerOpen, setGenrePickerOpen] = useState(false);

  /* refi za avtomatski fokus na prvo napacno polje ob neuspesni validaciji */
  const djNameRef = useRef(null);
  const instagramRef = useRef(null);
  const genreRef = useRef(null);
  const genrePickerRef = useRef(null);
  const otherGenreRef = useRef(null);
  const bpmRef = useRef(null);
  const linkRef = useRef(null);
  const refsByField = {
    djName: djNameRef,
    instagram: instagramRef,
    genre: genreRef,
    otherGenre: otherGenreRef,
    bpm: bpmRef,
    link: linkRef,
  };

  const instagramLink = SOCIAL_LINKS.find((s) => s.name === "Instagram");

  /* zapri genre dropdown ob kliku zunaj, isti vzorec kot track picker v navbaru */
  useEffect(() => {
    const onDown = (e) => {
      if (genrePickerRef.current && !genrePickerRef.current.contains(e.target))
        setGenrePickerOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setGenrePickerOpen(false); };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSubmitted(false);
  };

  const selectGenre = useCallback((g) => {
    setFormData((prev) => ({ ...prev, genre: g }));
    setTouched((prev) => (prev.genre ? prev : { ...prev, genre: true }));
    setErrors((prev) => {
      if (!prev.genre) return prev;
      const next = { ...prev };
      delete next.genre;
      return next;
    });
    setGenrePickerOpen(false);
    setSubmitted(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
      const firstErrorField = FIELD_ORDER.find((f) => newErrors[f]);
      refsByField[firstErrorField]?.current?.focus();
      return;
    }
    setErrors({});
    setSubmitted(true);
    /* mailto ne zapusti strani, samo odpre zunanjo email aplikacijo */
    window.location.href = buildMailtoHref(formData);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildEmailBody(formData));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blokiran (star brskalnik / ne-secure kontekst) —
         gumb za posiljanje je vseeno primarna pot */
    }
  };

  return (
    <main className="site-shell selection:bg-blood selection:text-black">
      <SiteBackdrop />

      <section className="relative z-20 pt-32 text-center px-6">
        <h1
          className="font-display uppercase text-[14vw] md:text-[7.5vw] leading-[0.82] tracking-[-0.02em] text-bone animate-[riseIn_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ WebkitTextStroke: "1px rgba(232,232,232,0.15)" }}
        >
          SUBMIT
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-silver font-mono text-xs md:text-sm tracking-[0.15em] uppercase animate-[fadeUp_0.9s_ease_0.2s_both]">
          Sets <span className="text-blood">/</span> podcasts <span className="text-blood">/</span> demos
        </p>
      </section>

      <section className="relative z-20 max-w-3xl mx-auto px-6 mt-24 pb-16">
        <div className="relative border border-silver/15 bg-panel/40 backdrop-blur-sm p-8 md:p-12 overflow-hidden animate-[fadeUp_0.9s_ease_0.3s_both]">
          <CornerTicks />
          <div
            className="absolute -right-20 top-0 w-72 h-72 rounded-full bg-blood/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <p className="max-w-2xl mx-auto font-mono text-sm md:text-base leading-8 tracking-wide text-silver text-center">
            We want to hear what you have to offer. Send us your track, podcast or set and we will get back to you if we are interested. Please make sure to include your DJ / artist name, Instagram handle, genre, BPM and a link to your submission. We look forward to hearing from you!
          </p>
        </div>
      </section>

      <section className="relative z-20 max-w-3xl mx-auto px-6 pb-32">
        <Divider label="Submission Details" />

        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative border border-silver/15 bg-panel/40 backdrop-blur-sm p-6 sm:p-8 md:p-12 overflow-hidden"
        >
          <CornerTicks />
          <div
            className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-blood/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-7">

            <div>
              <FieldLabel htmlFor="djName">DJ / Artist Name</FieldLabel>
              <input
                id="djName"
                ref={djNameRef}
                type="text"
                value={formData.djName}
                onChange={handleChange("djName")}
                placeholder="Your artist name"
                className={`${INPUT_BASE} ${fieldBorder(errors.djName, touched.djName)}`}
              />
              <FieldError message={errors.djName} />
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="instagram">Instagram Handle</FieldLabel>
                <div
                  className={`flex items-stretch border bg-black/20 transition-colors duration-300 ${
                    errors.instagram && touched.instagram ? "border-blood/60" : "border-silver/15 focus-within:border-blood/50"
                  }`}
                >
                  <span className="flex items-center pl-4 pr-1 font-mono text-sm text-silver/40 select-none" aria-hidden="true">
                    @
                  </span>
                  <input
                    id="instagram"
                    ref={instagramRef}
                    type="text"
                    value={formData.instagram}
                    onChange={handleChange("instagram")}
                    placeholder="blood.eagle.inc"
                    className="w-full bg-transparent py-3 pr-4 font-mono text-sm text-bone placeholder:text-silver/25 outline-none"
                  />
                </div>
                <FieldError message={errors.instagram} />
              </div>

              <div>
                <FieldLabel htmlFor="bpm">BPM</FieldLabel>
                <input
                  id="bpm"
                  ref={bpmRef}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={formData.bpm}
                  onChange={handleChange("bpm")}
                  placeholder="140"
                  className={`${INPUT_BASE} ${fieldBorder(errors.bpm, touched.bpm)}`}
                />
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-silver/30">
                  No BPM limit — tell us what you've got
                </p>
                <FieldError message={errors.bpm} />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="genre">Genre</FieldLabel>

              <div className="relative" ref={genrePickerRef}>
                <button
                  id="genre"
                  ref={genreRef}
                  type="button"
                  onClick={() => setGenrePickerOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={genrePickerOpen}
                  className={`${INPUT_BASE} flex items-center justify-between text-left ${fieldBorder(errors.genre, touched.genre)}`}
                >
                  <span className={formData.genre ? "text-bone" : "text-silver/25"}>
                    {formData.genre || "Select a genre"}
                  </span>
                  <span
                    className={`text-[8px] text-silver/40 transition-transform duration-300 ${genrePickerOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>

                {genrePickerOpen && (
                  <div
                    role="listbox"
                    aria-label="Genre"
                    className="absolute left-0 right-0 top-full mt-2 border border-silver/10 bg-[#050505]/98 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50 max-h-64 overflow-y-auto"
                  >
                    {GENRE_OPTIONS.map((g) => {
                      const active = g === formData.genre;
                      return (
                        <button
                          key={g}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => selectGenre(g)}
                          className={`group relative w-full text-left px-4 py-3 border-b border-silver/5 last:border-b-0 font-mono text-sm transition-colors ${
                            active ? "bg-blood/[0.06] text-blood" : "text-silver/70 hover:bg-blood/[0.035] hover:text-bone"
                          }`}
                        >
                          <span
                            className={`absolute left-0 top-0 bottom-0 w-px transition-colors ${
                              active ? "bg-blood shadow-[0_0_8px_rgba(200,30,30,0.7)]" : "bg-transparent group-hover:bg-blood/30"
                            }`}
                            aria-hidden="true"
                          />
                          {g}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <FieldError message={errors.genre} />

              {formData.genre === "Other" && (
                <div className="mt-3 animate-[fadeUp_0.3s_ease_both]">
                  <input
                    ref={otherGenreRef}
                    type="text"
                    value={formData.otherGenre}
                    onChange={handleChange("otherGenre")}
                    placeholder="What genre?"
                    className={`${INPUT_BASE} ${fieldBorder(errors.otherGenre, touched.otherGenre)}`}
                  />
                  <FieldError message={errors.otherGenre} />
                </div>
              )}
            </div>

            <div>
              <FieldLabel htmlFor="link">Link to Set / Track</FieldLabel>
              <input
                id="link"
                ref={linkRef}
                type="url"
                inputMode="url"
                value={formData.link}
                onChange={handleChange("link")}
                placeholder="soundcloud.com/your-name/your-set"
                className={`${INPUT_BASE} ${fieldBorder(errors.link, touched.link)}`}
              />
              <FieldError message={errors.link} />
            </div>

            <div>
              <label htmlFor="notes" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-silver/60">
                Notes <span className="text-silver/30 normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange("notes")}
                placeholder="Anything else you want us to know?"
                className={`${INPUT_BASE} resize-none border-silver/15 focus:border-blood/50`}
              />
            </div>

          </div>

          <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="submit"
              className="w-full border border-blood px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone transition-all duration-300 hover:bg-blood hover:text-black sm:w-auto"
            >
              Send Submission
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full border border-silver/20 px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-bone transition-all duration-300 hover:border-blood hover:bg-blood/10 sm:w-auto"
            >
              {copied ? "Copied" : "Copy Details"}
            </button>
          </div>

          <p
            className={`relative mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
              submitted ? "text-blood/80" : "text-silver/35"
            }`}
            role="status"
          >
            {submitted
              ? "Your email app should be opening now — hit send from there to finish."
              : "Sending opens your email app with everything filled in — nothing is sent automatically."}
          </p>
        </form>

        {instagramLink && (
          <div className="mt-14 flex flex-col items-center gap-3 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver/40">Prefer Instagram?</p>
            <a
              href={instagramLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-blood hover:text-bone transition-colors duration-300 border-b border-blood/40 pb-0.5"
            >
              DM us on Instagram
            </a>
          </div>
        )}
      </section>
    </main>
  );
}