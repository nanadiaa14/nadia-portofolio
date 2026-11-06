"use client";

import { useState } from "react";
import { work } from "@/data/portofolio";
import SectionHeader from "@/components/SectionHeader";
import Modal from "@/components/ui/Modal";
import WorkCard from "./WorkCard";
import WorkDetails from "./WorkDetails";

const numberOf = (i: number) => String(i + 1).padStart(2, "0");

export default function WorkSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openJob = openIndex === null ? null : work[openIndex];

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          title={
            <>
              Work <em className="display-italic text-rose">Experience</em>
            </>
          }
          kicker={`01 · ${work.length} roles · click a card for details`}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {work.map((job, i) => (
            <WorkCard key={job.id} job={job} number={numberOf(i)} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>

      <Modal open={openJob !== null} onClose={() => setOpenIndex(null)} label={openJob?.org ?? "Work details"}>
        {openJob && openIndex !== null && (
          <WorkDetails key={openJob.id} job={openJob} number={numberOf(openIndex)} />
        )}
      </Modal>
    </section>
  );
}