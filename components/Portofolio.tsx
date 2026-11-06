"use client";

import { useState } from "react";
import { sections } from "@/data/portofolio";
import { useScrollSpy } from "@/lib/useScrollSpy";
import Navbar from "./Navbar";
import Dock from "./Dock";
import SectionHeader from "./SectionHeader";
import Hero from "./hero/Hero";

const sectionIds = sections.map((s) => s.id);

// The whole page. It holds the state that several sections share.
export default function Portfolio() {
  const { progress, active } = useScrollSpy(sectionIds);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip pb-24">
      <Navbar active={active} onQuickView={() => setQuickViewOpen(true)} />

      <main>
        <Hero />

        {sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={i === 1 || i === 5 ? "bg-night py-24" : "py-24"}
          >
            <div className="mx-auto max-w-6xl px-4 md:px-8">
              <SectionHeader
                dark={i === 1 || i === 5}
                title={s.title}
                kicker={`${s.no} · coming soon`}
              />
              <div className="h-[50vh] rounded-2xl border border-dashed border-steel/50" />
            </div>
          </section>
        ))}
      </main>

      <Dock active={active} progress={progress} onQuickView={() => setQuickViewOpen(true)} />

      {quickViewOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-white">
          <button
            onClick={() => setQuickViewOpen(false)}
            className="rounded-full bg-ink px-6 py-3 font-semibold text-white"
          >
            Quick view goes here — close ✕
          </button>
        </div>
      )}
    </div>
  );
}