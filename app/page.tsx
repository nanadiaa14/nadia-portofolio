"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/data/portofolio";

export default function Home() {
  const [flipped, setFlipped] = useState(false);

  return (
    <main className="mx-auto max-w-5xl px-8 py-24">
      <h1 className="display text-7xl font-semibold leading-none">
        <span className="chrome-text block">{profile.firstName}</span>
        <span className="display-italic chrome-pink-text block">{profile.lastName}</span>
      </h1>

      <hr className="hairline my-12" />

      <div className="flex flex-wrap items-center gap-16">
        {/* Test 1: CSS-only spinning holographic disc */}
        <div className="holo relative h-56 w-56 animate-disc rounded-full shadow-xl">
          <div className="grooves absolute inset-0 rounded-full" />
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink" />
        </div>

        {/* Test 2: Motion 3D flip card */}
        <button onClick={() => setFlipped(!flipped)} className="h-72 w-52 [perspective:1000px]">
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <div className="foil absolute inset-0 flex items-center justify-center rounded-2xl [backface-visibility:hidden]">
              <span className="label text-xs">front · click me</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-ink text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="label text-xs">back</span>
            </div>
          </motion.div>
        </button>
      </div>
    </main>
  );
}