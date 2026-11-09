"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { organizations } from "@/data/portofolio";
import SectionHeader from "@/components/SectionHeader";
import Photocard from "./Photocard";
import CommitteeList from "./CommitteeList";

const numberOf = (i: number) => String(i + 1).padStart(2, "0");

export default function OrganizationsSection() {
  // one true/false per card: is it showing its back?
  const [flipped, setFlipped] = useState<boolean[]>(() => organizations.map(() => false));
  const opened = flipped.filter(Boolean).length;
  const allOpen = opened === organizations.length;
  const total = String(organizations.length).padStart(2, "0");

  const flipOne = (index: number) => setFlipped((prev) => prev.map((f, i) => (i === index ? !f : f)));
  const flipAll = () => setFlipped(organizations.map(() => !allOpen));

  return (
    <section id="organizations" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader
        title={
          <>
            Organizational <em className="display-italic text-rose">Experience</em>
          </>
        }
        kicker={`03 · ${organizations.length} organizations · click a card to flip it`}
      />

      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            {flipped.map((f, i) => (
              <span
                key={i}
                className={`block h-3 w-3 rounded-[3px] ${f ? "holo ring-1 ring-ink" : "bg-white ring-1 ring-inset ring-steel"}`}
              />
            ))}
          </div>
          <span className="label text-[11px] text-muted">
            {opened} of {organizations.length} cards opened
          </span>
          <AnimatePresence>
            {allOpen && (
              <motion.span
                initial={{ opacity: 0, scale: 1.6, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="label rounded-md border-2 border-rose px-2.5 py-1.5 text-xs font-bold text-rose"
              >
                ✦ Set complete
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={flipAll}
          className="inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-sm font-medium transition-colors hover:bg-pink-pale"
        >
          {allOpen ? "flip all back" : "flip all cards"}
        </button>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-9 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org, i) => (
          <Photocard
            key={org.id}
            org={org}
            number={numberOf(i)}
            total={total}
            flipped={flipped[i]}
            onFlip={() => flipOne(i)}
          />
        ))}
      </div>

      <CommitteeList />
    </section>
  );
}