"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Organization } from "@/data/portofolio";
import Photo from "@/components/ui/Photo";

type Props = {
  org: Organization;
  number: string;
  total: string;
  flipped: boolean;
  onFlip: () => void;
};

// A collectible photocard: holographic foil frame that shifts as it tilts, flips to show the details.
export default function Photocard({ org, number, total, flipped, onFlip }: Props) {
  // pointer position over the card, from -0.5 to 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });

  const tiltY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const tiltX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const foilX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const foilY = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const foilPosition = useMotionTemplate`${foilX}% ${foilY}%`;

  return (
    <div
      className="h-[420px] w-[270px] [perspective:1100px]"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const box = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - box.left) / box.width - 0.5);
        py.set((e.clientY - box.top) / box.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.button
        onClick={onFlip}
        aria-pressed={flipped}
        aria-label={`${org.role} at ${org.org} — ${flipped ? "flip back" : "flip to read"}`}
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative block h-full w-full text-left [transform-style:preserve-3d]"
      >
        <motion.span
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative block h-full w-full [transform-style:preserve-3d]"
        >
          {/* front: foil frame + photo */}
          <motion.span
            style={{ backgroundPosition: foilPosition }}
            className="foil absolute inset-0 flex flex-col overflow-hidden rounded-2xl shadow-[0_30px_50px_-26px_rgba(35,25,32,0.55)] [backface-visibility:hidden] [background-size:300%_300%]"
          >
            <span className="m-2.5 flex flex-1 flex-col overflow-hidden rounded-[10px] bg-white">
              <span className="relative flex min-h-[220px] flex-1">
                <Photo src={org.photo} alt={`${org.org} — documentation`} sizes="270px" className="flex-1" />
                <span className="label absolute left-2.5 top-2.5 rounded-full bg-ink px-2 py-1 text-[9px] text-white">
                  No. {number} / {total}
                </span>
              </span>
              <span className="flex flex-col gap-1 px-4 pb-4 pt-3.5">
                <span className="label text-[9px] text-rose">{org.period}</span>
                <span className="display text-[21px] leading-[1.08]">{org.org}</span>
                <span className="text-[13px] font-semibold">{org.role}</span>
              </span>
            </span>
          </motion.span>

          {/* back: what I did */}
          <span className="absolute inset-0 flex flex-col gap-3 overflow-hidden rounded-2xl bg-ink px-[22px] py-6 text-white shadow-[0_30px_50px_-26px_rgba(35,25,32,0.55)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="holo block h-1.5 rounded-full" />
            <span className="label text-[9px] text-pink-soft">
              No. {number} · {org.period}
            </span>
            <span className="display text-[22px] leading-[1.1]">{org.role}</span>
            <span className="text-[13px] text-silver-deep">{org.org}</span>
            {org.bullets.map((b) => (
              <span key={b} className="block text-[13px] leading-relaxed text-silver">
                — {b}
              </span>
            ))}
            <span className="label mt-auto text-[9px] text-silver-deep">Click to flip back ↺</span>
          </span>
        </motion.span>
      </motion.button>
    </div>
  );
}