"use client";

import { profile } from "@/data/portofolio";
import { useCurrentYear } from "@/lib/useCurrentYear";
import BackCover from "./BackCover";

const pill =
  "inline-flex min-h-[52px] items-center rounded-full px-[22px] text-[15px] font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_22px_-12px_rgba(0,0,0,0.7)] transition hover:brightness-105";

export default function ContactFooter() {
  const year = useCurrentYear();

  return (
    <footer id="contact" className="mt-16 bg-night text-white">
      <div className="mx-auto max-w-6xl px-4 pb-32 pt-24 md:px-8">
        <hr className="hairline" />

        <div className="mt-9 grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
          <div className="flex flex-col gap-[22px]">
            <p className="label text-[11px] text-pink-soft">06 · Contact</p>
            <h2 className="display text-[clamp(56px,7.5vw,110px)] leading-[0.9] tracking-[-0.03em]">
              Let’s work <em className="display-italic chrome-pink-text">together.</em>
            </h2>
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-silver">
              Open to data and AI internships, research projects and collaborations.
            </p>

            <div className="flex flex-wrap gap-3">
              <a className={`metal ${pill}`} href={`mailto:${profile.email}`}>
                Email
              </a>
              <a className={`metal ${pill}`} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className={`metal ${pill}`} href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className={`bg-pink ${pill}`} href={profile.cvUrl} download>
                Download CV
              </a>
            </div>

            <p className="label text-[11px] text-silver-deep">{profile.email}</p>
          </div>

          <BackCover />
        </div>

        <div className="mt-[72px] flex flex-wrap justify-between gap-3 border-t border-[#45343f] pt-[18px]">
          <span className="label text-[10px] text-silver-deep">
            © {year} {profile.fullName}
          </span>
          <a href="#top" className="label text-[10px] text-pink-soft hover:underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}