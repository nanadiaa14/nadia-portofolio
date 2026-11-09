"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { projects } from "@/data/portofolio";
import ProjectCover from "./ProjectCover";

type Props = {
  current: number;
  onSelect: (index: number) => void;
  onOpen: (index: number) => void;
};

export const numberOf = (i: number) => String(i + 1).padStart(2, "0");

// Where each case sits, based on its distance from the one in front.
function placement(offset: number) {
  const distance = Math.abs(offset);
  const side = Math.sign(offset);
  if (offset === 0) return { x: 0, z: 60, rotateY: 0, opacity: 1, brightness: 1 };
  return {
    x: side * (200 + (distance - 1) * 120),
    z: -140 - (distance - 1) * 40,
    rotateY: -side * 58,
    opacity: distance > 3 ? 0 : 1,
    brightness: 0.72,
  };
}

// 3D row of CD cases: drag/swipe, arrow keys, or click a side case to bring it forward.
export default function CoverFlow({ current, onSelect, onOpen }: Props) {
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const last = projects.length - 1;

  const go = (index: number) => onSelect(Math.max(0, Math.min(last, index)));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(current + 1);
        if (e.key === "ArrowLeft") go(current - 1);
        if (e.key === "Enter") onOpen(current);
      }}
      onPointerDown={(e) => {
        dragStart.current = e.clientX;
        dragged.current = false;
      }}
      onPointerUp={(e) => {
        if (dragStart.current === null) return;
        const dx = e.clientX - dragStart.current;
        dragStart.current = null;
        if (Math.abs(dx) > 40) {
          dragged.current = true;
          const steps = Math.max(1, Math.min(3, Math.round(Math.abs(dx) / 140)));
          go(current + (dx < 0 ? steps : -steps));
        }
      }}
      className="relative h-[330px] touch-pan-y select-none outline-none md:h-[470px]"
    >
      <div className="absolute inset-0 origin-top scale-[0.66] [perspective:1300px] md:scale-100">
        {projects.map((project, i) => {
          const offset = i - current;
          const p = placement(offset);
          return (
            <motion.button
              key={project.id}
              aria-label={offset === 0 ? `Open details for ${project.title}` : `Show ${project.title}`}
              tabIndex={offset === 0 ? 0 : -1}
              onClick={() => {
                if (dragged.current) return;
                if (offset === 0) onOpen(i);
                else go(i);
              }}
              initial={false}
              animate={{ x: p.x, z: p.z, rotateY: p.rotateY, opacity: p.opacity, filter: `brightness(${p.brightness})` }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              style={{ zIndex: 20 - Math.abs(offset), pointerEvents: p.opacity ? "auto" : "none" }}
              className="absolute left-1/2 top-[30px] -ml-[150px] h-[300px] w-[300px] text-left [-webkit-box-reflect:below_10px_linear-gradient(transparent_62%,rgba(255,255,255,0.22))]"
            >
              {/* jewel case */}
              <span className="absolute inset-0 block overflow-hidden rounded-[4px] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/45">
                <span className="absolute inset-y-0 left-0 z-10 w-[18px] border-r border-white/50 bg-[linear-gradient(90deg,rgba(255,255,255,0.4),rgba(255,255,255,0.12))]" />
                <ProjectCover project={project} number={numberOf(i)} className="absolute inset-y-0 left-[18px] right-0" />
                <span className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(125deg,rgba(255,255,255,0.42)_0,rgba(255,255,255,0)_34%,rgba(255,255,255,0)_72%,rgba(255,255,255,0.14)_100%)]" />
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}