"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile, type Project } from "@/data/portofolio";
import ProjectCover from "./ProjectCover";

type Props = {
  project: Project;
  number: string;
  onPrev: () => void;
  onNext: () => void;
};

const STEP_MS = 1800;

// Inside the popup: the disc slides out of its case and the process steps light up one by one.
export default function ProjectDetails({ project, number, onPrev, onNext }: Props) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const total = project.steps.length;

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setStep((s) => {
        if (s >= total - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [playing, total]);

  const replay = () => {
    setStep(0);
    setPlaying(true);
  };

  const labelIsDark = project.cover.label === "#231920" || project.cover.label === "#BE185D";

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pr-28">
        <span className="label text-[11px] text-muted-soft">
          Project {number} · {project.genre} · {project.course}
        </span>
        <div className="flex gap-2">
          <NavButton onClick={onPrev}>← prev</NavButton>
          <NavButton onClick={onNext}>next →</NavButton>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        {/* case + disc */}
        <div className="relative h-[300px] origin-top-left max-sm:scale-[0.85] sm:h-[380px]">
          <motion.div
            className="absolute left-24 top-8 h-[300px] w-[300px]"
            initial={{ x: "-55%", rotate: -160 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 16 }}
          >
            <div
              className={`holo relative h-full w-full animate-disc rounded-full shadow-[0_20px_40px_-18px_rgba(35,25,32,0.55)] ring-1 ring-inset ring-white/80 ${
                playing ? "" : "[animation-play-state:paused]"
              }`}
            >
              <div className="grooves absolute inset-0 rounded-full" />
              <div
                className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_0_0_9px_rgba(255,255,255,0.6)]"
                style={{ background: project.cover.label, color: labelIsDark ? "#fff" : "#231920" }}
              >
                <span className="label text-[9px]">P{number}</span>
              </div>
            </div>
          </motion.div>
          <ProjectCover
            project={project}
            number={number}
            className="absolute left-0 top-[30px] h-[310px] w-[310px] -rotate-3 rounded-[4px] shadow-[0_30px_50px_-24px_rgba(35,25,32,0.6)]"
          />
        </div>

        {/* booklet */}
        <div className="flex min-w-0 flex-col gap-3.5">
          <p className="label text-[11px] text-rose">{project.date}</p>
          <h3 className="display text-[clamp(30px,3.6vw,44px)] leading-[1.04]">{project.title}</h3>

          <div className="flex flex-wrap items-baseline gap-3 border-y border-ink py-3">
            <span className="display chrome-pink-text text-5xl font-bold leading-none">{project.headline}</span>
            <span className="max-w-[30ch] text-sm text-muted">{project.headlineNote}</span>
          </div>

          <div className="mt-1 flex items-center justify-between gap-3">
            <p className="label text-[10px] text-muted-soft">
              Process · step {step + 1} of {total}
            </p>
            <div className="flex gap-2">
              <RoundButton label="Replay the steps" onClick={replay}>
                <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </RoundButton>
              <RoundButton label={playing ? "Pause" : "Play the steps"} onClick={() => (playing ? setPlaying(false) : step >= total - 1 ? replay() : setPlaying(true))} pink>
                {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M7 4v16l13-8z" />}
              </RoundButton>
            </div>
          </div>

          <ol aria-live="polite">
            {project.steps.map((s, i) => {
              const now = i === step;
              const done = i < step;
              return (
                <li
                  key={s.text}
                  className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-dashed border-ink/20 py-2.5"
                >
                  <span className="label text-[10px] text-muted-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`transition-all duration-500 ${
                      now ? "display-italic text-[21px] text-rose" : `display text-lg ${done ? "text-muted" : "text-[#8a7682]"}`
                    }`}
                  >
                    {s.text}
                  </span>
                  <span className={`label whitespace-nowrap text-[11px] ${now ? "text-rose" : "text-muted-soft"}`}>{s.tag}</span>
                </li>
              );
            })}
          </ol>

          <div className="h-1 rounded-full bg-silver">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#f9a8d4,#ec4899)] transition-[width] duration-500"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>

          <p className="label mt-1 text-[10px] text-muted-soft">Tools</p>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span key={tool} className="metal label rounded-full px-2.5 py-1.5 text-[11px]">
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-1 flex flex-wrap gap-2.5">
            <a
              href={project.codeUrl ?? profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-sm font-medium transition-colors hover:bg-pink-pale"
            >
              code on GitHub
            </a>
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-sm font-medium transition-colors hover:bg-pink-pale"
              >
                read the case study
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function NavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex min-h-11 items-center rounded-full border border-ink px-4 text-sm font-medium transition-colors hover:bg-pink-pale"
    >
      {children}
    </button>
  );
}

function RoundButton({ label, onClick, pink = false, children }: { label: string; onClick: () => void; pink?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
        pink ? "border-pink bg-pink text-ink hover:bg-pink-soft" : "border-silver-deep hover:border-pink"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}