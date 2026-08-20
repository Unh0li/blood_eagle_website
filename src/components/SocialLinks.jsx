const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/blood.eagle.inc/" },
  { name: "SoundCloud", url: "https://soundcloud.com/blood-eagle24" },
  { name: "TikTok", url: "https://www.tiktok.com/@blood.eagle.inc" },
];

/* srednji stolpec je auto, zunanja sta enaka 1fr, zato pade SoundCloud tocno
   na sredino strani, sosednji imeni pa sta od njega enako oddaljeni
   pri treh enako sirokih stolpcih so bili razmaki neenaki in na telefonu
   sta se Instagram in SoundCloud dotikala
   velikost je tekoca, da gre vse v eno vrstico tudi na 320px zaslonu
   pl pobere presledek, ki ga tracking doda za zadnjo crko */
export default function SocialLinks() {
  return (
    <div className="grid w-full max-w-xl mx-auto grid-cols-[1fr_auto_1fr] items-center gap-x-3 px-6 font-mono text-[clamp(0.625rem,2.9vw,0.75rem)] uppercase tracking-[0.2em] sm:gap-x-6 sm:tracking-[0.25em]">
      {SOCIAL_LINKS.map(({ name, url }, i) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "group relative py-1 pl-[0.2em] text-silver transition-colors duration-300 hover:text-blood sm:pl-[0.25em]",
            i === 0 ? "justify-self-end" : i === 1 ? "justify-self-center" : "justify-self-start",
          ].join(" ")}
        >
          {name}
          <span className="absolute bottom-0 left-0 h-px w-0 bg-blood transition-all duration-300 group-hover:w-full" />
        </a>
      ))}
    </div>
  );
}
