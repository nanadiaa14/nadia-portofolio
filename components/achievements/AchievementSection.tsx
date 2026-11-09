"use client";

import { useState } from "react";
import { achievements } from "@/data/portofolio";
import SectionHeader from "@/components/SectionHeader";
import Sticker from "./Sticker";

const TILTS = [-8, 6, -4, 5, -6]; // a slightly messy, hand-stuck look

export default function AchievementsSection() {
  const [peeled, setPeeled] = useState<boolean[]>(() => achievements.map(() => false));

  const peel = (index: number) => setPeeled((prev) => prev.map((p, i) => (i === index ? !p : p)));

  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader
        title={
          <>
            Achieve<em className="display-italic text-rose">ments</em>
          </>
        }
        kicker={`04 · awards & scholarships · click a sticker`}
      />

      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#2e2129,#1c1418_60%,#2e2129)] px-6 pb-16 pt-20 md:px-10">
        {/* soft light streaks across the board */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0_20%,rgba(255,255,255,0.07)_26%,transparent_34%_58%,rgba(255,255,255,0.05)_64%,transparent_72%)]" />
        <p className="label absolute left-7 top-6 text-[10px] text-silver-deep">Click a sticker to peel it and read the details</p>

        <div className="relative flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {achievements.map((item, i) => (
            <Sticker
              key={item.title}
              item={item}
              tilt={TILTS[i % TILTS.length]}
              peeled={peeled[i]}
              onPeel={() => peel(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}