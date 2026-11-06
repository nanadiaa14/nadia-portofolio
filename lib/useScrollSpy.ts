"use client";

import { useEffect, useState } from "react";

// Tells us how far the page is scrolled (0–1) and which section is on screen.
// active = -1 means the visitor is still at the top (hero).
export function useScrollSpy(sectionIds: string[]) {
  const [state, setState] = useState({ progress: 0, active: -1 });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const page = document.documentElement;
      const maxScroll = Math.max(1, page.scrollHeight - window.innerHeight);
      const progress = Math.round((window.scrollY / maxScroll) * 400) / 400;

      let active = -1;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) active = i;
      });

      setState((prev) =>
        prev.progress === progress && prev.active === active ? prev : { progress, active },
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return state;
}