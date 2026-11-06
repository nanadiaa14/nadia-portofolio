import { profile } from "@/data/portofolio";
import AlbumCover from "./AlbumCover";
import SpinningDisc from "./SpinningDisc";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-6 px-4 pb-12 pt-14 md:px-8 lg:grid-cols-[1fr_1.1fr]"
    >
      <div className="flex flex-col gap-5">
        <p className="label text-[11px] text-muted-soft">Portfolio · 2026 · {profile.location}</p>

        <h1 className="display text-[clamp(60px,8.4vw,128px)] font-semibold leading-[0.88] tracking-[-0.035em]">
          <span className="chrome-text block">{profile.firstName}</span>
          <span className="display-italic chrome-pink-text block font-medium">{profile.lastName}</span>
        </h1>

        <p className="label text-xs leading-relaxed text-muted">{profile.roles}</p>
        <p className="max-w-[38ch] text-[19px] leading-relaxed text-[#3b2d35]">{profile.intro}</p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex min-h-[52px] items-center rounded-full bg-ink px-7 font-semibold text-white shadow-lg transition-colors hover:bg-rose"
          >
            view projects
          </a>
          <a
            href={profile.cvUrl}
            className="inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-sm font-medium transition-colors hover:bg-pink-pale"
          >
            download CV
          </a>
        </div>
      </div>

      {/* The stage is drawn at a fixed size and scaled down on phones */}
      <div className="relative h-[330px] md:h-[520px]">
        <div className="absolute left-1/2 top-5 h-[480px] w-[600px] -translate-x-1/2 origin-top scale-[0.6] md:scale-100">
          <div className="absolute bottom-0 left-20 right-0 h-20 rounded-full bg-[radial-gradient(closest-side,rgba(236,72,153,0.3),rgba(186,230,253,0.25),transparent)] blur-lg" />
          <SpinningDisc />
          <AlbumCover />
        </div>
      </div>
    </section>
  );
}