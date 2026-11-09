"use client";

import { useState } from "react";
import { projects } from "@/data/portofolio";
import SectionHeader from "@/components/SectionHeader";
import Modal from "@/components/ui/Modal";
import CoverFlow, { numberOf } from "./CoverFlow";
import ProjectDetails from "./ProjectDetails";

type Props = {
  openIndex: number | null;
  onOpen: (index: number) => void;
  onClose: () => void;
};

export default function ProjectsSection({ openIndex, onOpen, onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const shown = projects[current];
  const opened = openIndex === null ? null : projects[openIndex];
  const last = projects.length - 1;

  const openAt = (i: number) => {
    setCurrent(i);
    onOpen(i);
  };

  return (
    <section id="projects" className="bg-night py-24 text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          dark
          title={
            <>
              Pro<em className="display-italic text-pink-soft">jects</em>
            </>
          }
          kicker={`02 · ${projects.length} projects`}
        />
        <p className="label -mt-4 max-w-[70ch] text-[11px] leading-loose text-silver-deep">
          Drag, swipe or use the arrows to browse. Click the cover in front to see the details.
        </p>
      </div>

      <CoverFlow current={current} onSelect={setCurrent} onOpen={openAt} />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 text-center md:px-8">
        <div className="flex flex-col gap-1.5">
          <span className="label text-[11px] text-pink-soft">
            Project {numberOf(current)} · {shown.genre}
          </span>
          <span className="display text-3xl leading-tight">{shown.title}</span>
          <span className="text-sm text-silver-deep">
            {shown.course} · {shown.date}
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <ArrowButton label="Previous project" disabled={current === 0} onClick={() => setCurrent(current - 1)} d="M15 5l-7 7 7 7" />
          <div role="group" aria-label="Choose a project" className="flex">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setCurrent(i)}
                aria-label={`Project ${numberOf(i)}: ${p.title}`}
                aria-pressed={i === current}
                className="inline-flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-7 bg-pink" : "w-2 bg-muted-soft"
                  }`}
                />
              </button>
            ))}
          </div>
          <ArrowButton label="Next project" disabled={current === last} onClick={() => setCurrent(current + 1)} d="M9 5l7 7-7 7" />
        </div>

        <button
          onClick={() => openAt(current)}
          className="inline-flex min-h-[52px] items-center rounded-full bg-pink px-7 font-semibold text-ink transition-colors hover:bg-pink-soft"
        >
          view project details ↗
        </button>
      </div>

      <Modal open={opened !== null} onClose={onClose} label={opened?.title ?? "Project details"}>
        {opened && openIndex !== null && (
          <ProjectDetails
            key={opened.id}
            project={opened}
            number={numberOf(openIndex)}
            onPrev={() => openAt((openIndex + last) % projects.length)}
            onNext={() => openAt((openIndex + 1) % projects.length)}
          />
        )}
      </Modal>
    </section>
  );
}

function ArrowButton({ label, d, disabled, onClick }: { label: string; d: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-muted-soft bg-ink-soft transition-colors hover:border-pink-soft disabled:opacity-35"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
        <path d={d} />
      </svg>
    </button>
  );
}