"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { projects, skills } from "@/data/portofolio";

type Props = {
  onOpenProject: (index: number) => void;
};

// Skill list with dotted leaders. Picking one shows where it was used,
// and project buttons open that project's popup.
export default function TechStack({ onOpenProject }: Props) {
  const [selected, setSelected] = useState(0);
  const skill = skills[selected];

  // turn project ids into { index, title } so the buttons can open the right popup
  const usedIn = skill.projects
    .map((id) => projects.findIndex((p) => p.id === id))
    .filter((index) => index !== -1)
    .map((index) => ({ index, title: projects[index].title }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2.5">
        <h3 className="display text-[30px] lg:text-[34px]">
          Tech <em className="display-italic text-rose">stack</em>
        </h3>
        <span className="label text-[10px] text-muted-soft">Tap a skill to see where I used it</span>
      </div>

      {/* phones and tablets: a cloud of chips · laptops: two columns with dotted leaders */}
      <div className="flex flex-wrap gap-2 lg:grid lg:grid-cols-2 lg:gap-x-[18px] lg:gap-y-0">
        {skills.map((s, i) => {
          const on = i === selected;
          return (
            <button
                key={s.name}
                onClick={() => setSelected(i)}
                aria-pressed={on}
                className={`flex min-h-10 items-baseline gap-2.5 rounded-full border px-3.5 py-2 text-left transition-colors lg:min-h-11 lg:w-full lg:rounded-lg lg:border-0 lg:px-3 ${
                on ? "border-ink bg-ink text-white" : "border-ink/15 hover:bg-blush"
                }`}
            >
                <span className="text-[13px] font-semibold lg:text-sm">{s.name}</span>
                <span className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-current opacity-40 max-lg:hidden" />
                <span className="display-italic max-w-[55%] text-right text-sm max-lg:hidden">{s.use}</span>
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
        className="flex flex-col gap-3 rounded-[18px] bg-ink px-[22px] py-5 text-white"
      >
        <p className="label text-[10px] text-pink-soft">Selected skill</p>
        <p className="display text-[28px] leading-[1.1]">
          {skill.name} <em className="display-italic text-pink-soft">· {skill.use}</em>
        </p>

        {usedIn.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-[10px] text-silver-deep">Used in</span>
            {usedIn.map((p) => (
              <button
                key={p.index}
                onClick={() => onOpenProject(p.index)}
                className="label min-h-10 rounded-full border border-pink-soft px-3.5 text-[11px] transition-colors hover:bg-pink-soft hover:text-ink"
              >
                {p.title} ↗
              </button>
            ))}
          </div>
        )}

        {skill.usedAt && (
          <p className="text-sm leading-relaxed text-silver">
            <span className="label text-[10px] text-silver-deep">Used at </span>
            {skill.usedAt}
          </p>
        )}
      </motion.div>
    </div>
  );
}