"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { profile } from "@/data/portofolio";

// The album sleeve: tilts toward the cursor and catches a moving highlight.
export default function AlbumCover() {
  const x = useMotionValue(0); // -0.5 … 0.5
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const lightX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
  const lightY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.9), rgba(255,255,255,0) 45%)`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - box.left) / box.width - 0.5);
    y.set((e.clientY - box.top) / box.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className="absolute left-0 top-[30px] z-10 h-[420px] w-[420px] [perspective:1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative h-full w-full overflow-hidden rounded-[4px] shadow-[0_40px_60px_-28px_rgba(35,25,32,0.7)] ring-1 ring-inset ring-white/50"
      >
        {/* spine */}
        <div className="metal absolute inset-y-0 left-0 z-10 w-5 shadow-[inset_-1px_0_0_rgba(35,25,32,0.2)]" />

        {/* artwork: your own image if set, otherwise the built-in design */}
        {profile.coverImage ? (
          <div className="absolute inset-y-0 left-5 right-0 overflow-hidden">
            <Image src={profile.coverImage} alt="Album cover artwork" fill sizes="400px" priority className="object-cover" />
          </div>
        ) : (
          <div className="absolute inset-y-0 left-5 right-0 overflow-hidden bg-[linear-gradient(160deg,#fce7f3_0%,#f9a8d4_55%,#ec4899_100%)]">
            <div className="metal absolute -bottom-[110px] -right-[90px] h-[340px] w-[340px] rounded-full ring-1 ring-inset ring-white/80">
              <div className="grooves absolute inset-0 rounded-full" />
              <div className="absolute left-1/2 top-1/2 h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-pale ring-2 ring-inset ring-white" />
            </div>
            <div className="holo absolute -left-10 top-[200px] h-6 w-[560px] -rotate-[18deg] opacity-85" />

            <div className="absolute inset-x-6 top-[22px] flex justify-between">
              <span className="label text-[10px]">Side A</span>
              <span className="label text-[10px]">Data · AI</span>
            </div>
            <p className="display-italic absolute left-6 top-[50px] text-[72px] font-medium leading-[0.9]">
              {profile.firstName}
            </p>
            <p className="absolute left-[26px] top-[172px] text-[11px] font-semibold tracking-[0.24em]">
              {profile.fullName.toUpperCase()}
            </p>
            <div className="absolute bottom-6 left-6 w-[104px] border-2 border-ink bg-white py-1 text-center">
              <div className="bg-ink py-[3px] text-[8px] font-bold tracking-[0.1em] text-white">DATA ADVISORY</div>
              <div className="label pt-[3px] text-[9px] font-bold">Real metrics</div>
            </div>
          </div>
        )}

        {/* light that follows the cursor + fixed gloss */}
        <motion.div style={{ background: sheen }} className="pointer-events-none absolute inset-0 mix-blend-soft-light" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.45)_0,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.15)_100%)]" />
      </motion.div>
    </div>
  );
}