"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { achievements, committees, organizations, profile, projects, sections, skills, work } from "@/data/portofolio";

// Little counts printed next to each section, like track lengths on the back of a CD.
const counts: Record<string, string> = {
  work: `${work.length} roles`,
  projects: `${projects.length} projects`,
  organizations: `${organizations.length} + ${committees.length} events`,
  achievements: `${achievements.length} awards`,
  about: `${skills.length} skills`,
  contact: "you are here",
};

// Bar widths for the decorative barcode (dark, gap, dark, gap, ...).
const BARS = [3, 1, 2, 1, 1, 3, 2, 1, 4, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 4, 1, 2, 1, 3, 1];

type ScanState = "idle" | "scanning" | "done";

// The metal back of the album: section list, credits and a barcode with a hidden note.
export default function BackCover() {
  const [scan, setScan] = useState<ScanState>("idle");

  return (
    <div className="metal relative rounded-lg p-6 text-ink shadow-[0_40px_70px_-30px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.6)] md:p-[30px]">
      <div className="mb-3.5 flex justify-between gap-3">
        <span className="label text-[10px]">Back cover</span>
        <span className="label text-[10px]">{profile.location}</span>
      </div>

      <p className="display-italic mb-3 text-[30px] leading-tight">{profile.fullName}</p>

      <ol className="mb-[18px] flex flex-col gap-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="flex gap-2.5 rounded text-sm hover:text-rose">
              <span className="label w-[22px] pt-0.5 text-[10px]">{s.no}</span>
              <span>{s.title}</span>
              <span className="label ml-auto pt-0.5 text-[10px]">{counts[s.id]}</span>
            </a>
          </li>
        ))}
      </ol>

      <div className="flex items-end gap-4">
        <button
          onClick={() => setScan("scanning")}
          aria-label="Scan the barcode"
          className="relative flex h-[70px] items-stretch rounded bg-white px-2.5 py-2"
        >
          {BARS.map((w, i) => (
            <span
              key={i}
              className={`block ${i % 2 ? "bg-transparent" : "bg-ink"}`}
              style={{ width: w, marginRight: i % 3 === 0 ? 2 : 1 }}
            />
          ))}
          {scan === "scanning" && (
            <motion.span
              initial={{ left: "0%", opacity: 0 }}
              animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              onAnimationComplete={() => setScan("done")}
              className="absolute -inset-y-1.5 w-[3px] bg-pink shadow-[0_0_14px_4px_rgba(236,72,153,0.7)]"
            />
          )}
        </button>
        <div className="label text-[9px] leading-relaxed">
          N. I. Sumardi
          <br />
          Makassar
          <br />
          Indonesia
        </div>
      </div>

      <p className="label mt-2 text-[9px]">{scan === "done" ? "Scanned" : "Psst — click the barcode"}</p>

      <AnimatePresence>
        {scan === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            aria-live="polite"
            className="mt-3.5 rounded-[10px] bg-ink px-[18px] py-4 text-white"
          >
            <p className="label mb-1.5 text-[10px] text-pink-soft">A note for you</p>
            <p className="display-italic text-xl leading-snug">
              “Thanks for scrolling all the way down. I’d love to hear what you’re building.”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}