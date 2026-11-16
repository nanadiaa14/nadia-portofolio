"use client";

import { useRef, useState, type ReactNode } from "react";

type Props = {
  count: number;
  label: string; // what the items are, for screen readers ("Work experience")
  renderItem: (index: number, active: number) => ReactNode;
  className?: string; // layout from the laptop size up, e.g. "lg:grid lg:grid-cols-2 lg:gap-8"
  itemClassName?: string;
  itemWidth?: string; // slide width on phones; the row padding keeps the first and last slide centred
};

// Phones and tablets: a sideways row you swipe, one item centred, with dots below.
// Laptops: whatever layout `className` gives (usually a normal grid).
export default function SwipeRow({ count, label, renderItem, className = "", itemClassName = "", itemWidth = "84vw" }: Props) {
  const row = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Which item is closest to the middle of the row right now?
  const onScroll = () => {
    const el = row.current;
    if (!el) return;
    const middle = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const distance = Math.abs(c.offsetLeft + c.offsetWidth / 2 - middle);
      if (distance < best) {
        best = distance;
        closest = i;
      }
    });
    if (closest !== active) setActive(closest);
  };

  const goTo = (i: number) => {
    const el = row.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <div>
        <div
            ref={row}
            onScroll={onScroll}
            role="group"
            aria-roledescription="carousel"
            aria-label={label}
            style={{ "--slide": itemWidth } as React.CSSProperties}
            className={`relative max-lg:-mx-4 max-lg:flex max-lg:snap-x max-lg:snap-mandatory max-lg:gap-4 max-lg:overflow-x-auto max-lg:px-[calc((100vw-var(--slide))/2)] max-lg:pb-6 max-lg:pt-8 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden ${className}`}
        >
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className={`max-lg:w-[var(--slide)] max-lg:shrink-0 max-lg:snap-center ${itemClassName}`}
          >
            {renderItem(i, active)}
          </div>
        ))}
      </div>

      {/* dots (phones and tablets only) */}
      <div className="mt-1 flex justify-center lg:hidden">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show ${i + 1} of ${count}`}
            aria-current={i === active}
            className="inline-flex h-11 w-9 items-center justify-center"
          >
            <span className={`block h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-pink" : "w-2 bg-silver-deep"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}