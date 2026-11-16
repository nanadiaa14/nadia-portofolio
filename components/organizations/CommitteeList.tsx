"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { committees } from "@/data/portofolio";

// Every event committee.
// Laptops: a grid of small cards, the chosen one's details in a panel below.
// Phones and tablets: two small cards per row; the details open right under the tapped card's row.
export default function CommitteeList() {
  const [selected, setSelected] = useState<number | null>(0);
  const panel = committees[selected ?? 0];

  const choose = (i: number) => {
    const isLaptop = window.matchMedia("(min-width: 1024px)").matches;
    // on phones, tapping the open row closes it; on laptops one card always stays chosen
    setSelected(i === selected && !isLaptop ? null : i);
  };

  return (
    <div className="mt-16 lg:mt-20">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="display text-[30px] lg:text-[34px]">
          Committee <em className="display-italic text-rose">Experience</em>
        </h3>
        <span className="label text-[10px] text-muted-soft">
          {committees.length} events · tap one to read the role
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3.5">
        {committees.map((c, i) => {
          const on = i === selected;
          // phones: after every second card (end of a row), open the details of that row
          const rowEnd = i % 2 === 1 || i === committees.length - 1;
          const rowStart = i - (i % 2);
          const openHere = rowEnd && selected !== null && selected >= rowStart && selected <= i;

          return (
            <Fragment key={c.event}>
              <button
                onClick={() => choose(i)}
                aria-expanded={on}
                className={`relative flex min-h-[76px] w-full flex-col items-start gap-1 overflow-hidden rounded-xl border py-2.5 pl-[18px] pr-3 text-left transition duration-200 lg:min-h-[104px] lg:py-3.5 lg:pl-[22px] lg:pr-4 lg:shadow-[0_12px_22px_-18px_rgba(35,25,32,0.5)] lg:hover:-translate-y-[3px] ${
                  on ? "border-ink bg-ink text-white" : "border-ink/12 bg-white"
                }`}
              >
                <span className="holo absolute inset-y-0 left-0 w-1.5 lg:w-2" />
                <span className="label text-[9px] opacity-80 max-lg:hidden">{c.period}</span>
                <span className="display text-[15px] leading-[1.15] lg:text-[19px] lg:leading-[1.1]">{c.event}</span>
                <span className="text-xs font-semibold lg:text-[13px]">{c.role}</span>
              </button>

              {/* phones and tablets: details open as a full-width row right under the tapped card's row */}
              <AnimatePresence initial={false}>
                {openHere && (
                  <motion.div
                    key={selected}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    aria-live="polite"
                    className="col-span-2 overflow-hidden lg:hidden"
                  >
                    <div className="flex flex-col gap-1.5 rounded-xl border border-ink/14 bg-white px-[18px] py-3.5">
                      <span className="label text-[10px] text-rose">{committees[selected].period}</span>
                      <span className="text-sm font-semibold">
                        {committees[selected].role} — {committees[selected].event}
                      </span>
                      <p className="text-[15px] leading-relaxed text-[#3b2d35]">{committees[selected].detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          );
        })}
      </div>

      {/* laptops: one panel under the grid */}
      <motion.div
        key={selected ?? 0}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        aria-live="polite"
        className="mt-3.5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-[18px] gap-y-1 rounded-2xl border border-ink/14 bg-white px-[22px] py-[18px] shadow-[0_16px_34px_-26px_rgba(35,25,32,0.5)] max-lg:hidden"
      >
        <span className="label text-[10px] text-rose">{panel.period}</span>
        <span className="font-semibold">
          {panel.role} — {panel.event}
        </span>
        <span />
        <span className="text-[15px] leading-relaxed text-[#3b2d35]">{panel.detail}</span>
      </motion.div>
    </div>
  );
}