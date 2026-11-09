"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { committees } from "@/data/portofolio";

// Small cards for every event committee. Click one to read what the role involved.
export default function CommitteeList() {
  const [selected, setSelected] = useState(0);
  const current = committees[selected];

  return (
    <div className="mt-20">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="display text-[34px]">
          Committee <em className="display-italic text-rose">Experience</em>
        </h3>
        <span className="label text-[10px] text-muted-soft">
          {committees.length} events · click one to read the role
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {committees.map((c, i) => {
          const on = i === selected;
          return (
            <button
              key={c.event}
              onClick={() => setSelected(i)}
              aria-pressed={on}
              className={`relative flex min-h-[104px] flex-col items-start gap-1 overflow-hidden rounded-xl border py-3.5 pl-[22px] pr-4 text-left shadow-[0_12px_22px_-18px_rgba(35,25,32,0.5)] transition duration-200 hover:-translate-y-[3px] ${
                on ? "border-ink bg-ink text-white" : "border-ink/12 bg-white"
              }`}
            >
              <span className="holo absolute inset-y-0 left-0 w-2" />
              <span className="label text-[9px] opacity-80">{c.period}</span>
              <span className="display text-[19px] leading-[1.1]">{c.event}</span>
              <span className="text-[13px] font-semibold">{c.role}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        aria-live="polite"
        className="mt-3.5 grid gap-x-[18px] gap-y-1 rounded-2xl border border-ink/14 bg-white px-[22px] py-[18px] shadow-[0_16px_34px_-26px_rgba(35,25,32,0.5)] sm:grid-cols-[auto_minmax(0,1fr)]"
      >
        <span className="label text-[10px] text-rose">{current.period}</span>
        <span className="font-semibold">
          {current.role} — {current.event}
        </span>
        <span className="hidden sm:block" />
        <span className="text-[15px] leading-relaxed text-[#3b2d35]">{current.detail}</span>
      </motion.div>
    </div>
  );
}