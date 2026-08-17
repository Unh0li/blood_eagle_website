import Image from "next/image";
import BloodDrips from "@/components/BloodDrips";

/* okrasne plasti za vsemi stranmi
   mreza in poseva se pod md skrijeta, na telefonu sta drago in komaj vidno */
export default function SiteBackdrop({ watermark = true }) {
  return (
    <>
      <div className="site-shell__ambient pointer-events-none" aria-hidden="true">
        <div className="glow-red" />
        <div className="glow-silver" />
        <div className="glow-accent" />
      </div>
      <div className="site-shell__grid pointer-events-none" aria-hidden="true" />
      <div className="site-shell__slash pointer-events-none" aria-hidden="true" />
      <div className="site-shell__vignette pointer-events-none" aria-hidden="true" />
      <BloodDrips />

      {watermark && (
        <div
          className="fixed top-24 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 w-full max-w-5xl px-6 pt-35 flex items-center justify-center"
          aria-hidden="true"
        >
          {/* 1.1 je najvec kar se se prilega robovom posode, home anima na isti vrednosti */}
          <div className="opacity-5 mix-blend-screen scale-110 md:scale-[2.2] w-full h-full flex items-center justify-center">
            <Image
              src="/images/logo/logo_white.png"
              alt=""
              width={1000}
              height={1000}
              sizes="(max-width: 768px) 100vw, 1000px"
              className="object-contain w-full h-auto max-h-[55vh] blur-[0.5px]"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
