"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";

const AUTO_SPEED = 0.22; // degrees per millisecond (~1.6 s per turn)

// A CD that spins on its own and can be grabbed and turned by hand.
export default function SpinningDisc() {
  const rotate = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const speed = useRef(AUTO_SPEED); // current speed, eases back to AUTO_SPEED
  const drag = useRef<{ cx: number; cy: number; lastAngle: number; lastTime: number } | null>(null);

  useAnimationFrame((_, delta) => {
    if (drag.current) return; // the hand is in control
    const target = reduceMotion ? 0 : AUTO_SPEED;
    speed.current += (target - speed.current) * 0.04; // momentum fades out
    rotate.set(rotate.get() + speed.current * delta);
  });

  const angleOf = (e: React.PointerEvent) =>
    (Math.atan2(e.clientY - drag.current!.cy, e.clientX - drag.current!.cx) * 180) / Math.PI;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { cx: box.left + box.width / 2, cy: box.top + box.height / 2, lastAngle: 0, lastTime: e.timeStamp };
    drag.current.lastAngle = angleOf(e);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const angle = angleOf(e);
    let delta = angle - drag.current.lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const ms = Math.max(1, e.timeStamp - drag.current.lastTime);
    speed.current = Math.max(-2, Math.min(2, delta / ms)); // remembered for the throw
    drag.current.lastAngle = angle;
    drag.current.lastTime = e.timeStamp;
    rotate.set(rotate.get() + delta);
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <motion.div
      role="img"
      aria-label="Spinning CD"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      whileTap={{ scale: 1.03 }}
      style={{ rotate }}
      className="holo absolute left-[190px] top-10 h-[400px] w-[400px] cursor-grab touch-none select-none rounded-full shadow-[0_30px_60px_-24px_rgba(35,25,32,0.55)] active:cursor-grabbing"
    >
      <div className="grooves absolute inset-0 rounded-full" />
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_40deg,rgba(255,255,255,0.45)_52deg,transparent_66deg_220deg,rgba(255,255,255,0.3)_232deg,transparent_246deg)]" />
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/80" />

      <div className="absolute left-1/2 top-1/2 flex h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full bg-pink shadow-[0_0_0_12px_rgba(255,255,255,0.55)]">
        <span className="label text-[8px]">ND · 2026</span>
        <span className="display-italic text-[22px] leading-none">Nadia</span>
        <span className="mt-1 h-[18px] w-[18px] rounded-full bg-white shadow-[inset_0_0_0_2px_#cbd5e1]" />
      </div>
    </motion.div>
  );
}