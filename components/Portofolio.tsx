"use client";

import { useState } from "react";
import { sections } from "@/data/portofolio";
import { useScrollSpy } from "@/lib/useScrollSpy";
import Navbar from "./Navbar";
import Dock from "./Dock";
import Hero from "./hero/Hero";
import WorkSection from "./work/WorkSection";
import ProjectsSection from "./projects/ProjectSection";
import OrganizationsSection from "./organizations/OrganizationSection";
import AchievementsSection from "./achievements/AchievementSection";
import AboutSection from "./about/AboutSection";
import ContactFooter from "./contact/ContactFooter";

const sectionIds = sections.map((s) => s.id);

// The whole page. It holds the state that several sections share.
export default function Portfolio() {
  const { progress, active } = useScrollSpy(sectionIds);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [openProject, setOpenProject] = useState<number | null>(null); // which project popup is open

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar active={active} onQuickView={() => setQuickViewOpen(true)} />

      <main>
        <Hero />
        <WorkSection />
        <ProjectsSection
          openIndex={openProject}
          onOpen={setOpenProject}
          onClose={() => setOpenProject(null)}
        />
        <OrganizationsSection />
        <AchievementsSection />
        <AboutSection onOpenProject={setOpenProject} />
      </main>

      <ContactFooter />

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