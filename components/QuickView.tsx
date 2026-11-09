"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { about, achievements, committees, organizations, profile, projects, skills, work } from "@/data/portofolio";

type Props = {
  open: boolean;
  onClose: () => void;
};

// A plain, one-page CV summary for visitors in a hurry (recruiters!).
export default function QuickView({ open, onClose }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Quick view — CV summary"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-0 z-[120] overflow-y-auto bg-white text-ink"
        >
          <div className="mx-auto max-w-[820px] px-4 pb-20 pt-6 md:px-8">
            <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-ink bg-white py-3">
              <span className="label text-[11px]">Quick view · CV summary</span>
              <div className="flex gap-2">
                <a
                  href={profile.cvUrl}
                  download
                  className="inline-flex min-h-[42px] items-center rounded-full bg-pink px-[18px] text-sm font-semibold transition-colors hover:bg-pink-soft"
                >
                  download CV
                </a>
                <button
                  ref={closeButton}
                  onClick={onClose}
                  className="inline-flex min-h-[42px] items-center rounded-full bg-ink px-[18px] text-sm font-semibold text-white"
                >
                  back to the site ✕
                </button>
              </div>
            </div>

            <h2 className="display mt-[26px] text-[clamp(34px,6vw,46px)] leading-tight">{profile.fullName}</h2>
            <p className="mt-1 text-muted">{profile.roles}</p>
            <p className="text-muted">
              {about.education[0]} · {profile.location}
            </p>

            <Block title="Work experience">
              {work.map((w) => (
                <li key={w.id}>
                  <b>{w.role}</b>, {w.orgFull} — {w.period}
                </li>
              ))}
            </Block>

            <Block title="Projects">
              {projects.map((p) => (
                <li key={p.id}>
                  <b>{p.title}</b> — {p.course}, {p.date} · {p.headline}: {p.headlineNote}
                </li>
              ))}
            </Block>

            <Block title="Organizational experience">
              {organizations.map((o) => (
                <li key={o.id}>
                  <b>{o.role}</b>, {o.org} — {o.period}
                </li>
              ))}
            </Block>

            <Block title="Committee experience">
              {committees.map((c) => (
                <li key={c.event}>
                  <b>{c.role}</b>, {c.event} — {c.period}
                </li>
              ))}
            </Block>

            <Block title="Achievements">
              {achievements.map((a) => (
                <li key={a.title}>
                  <b>{a.big}</b> — {a.title} · {a.issuer} · {a.date}
                </li>
              ))}
            </Block>

            <h3 className="label mb-2.5 mt-[30px] text-xs text-rose">Skills</h3>
            <p className="leading-[1.7]">{skills.map((s) => s.name).join(" · ")}</p>

            <h3 className="label mb-2.5 mt-[30px] text-xs text-rose">Languages</h3>
            <p className="leading-[1.7]">{about.languages}</p>

            <h3 className="label mb-2.5 mt-[30px] text-xs text-rose">Contact</h3>
            <p className="leading-[1.8]">
              <a href={`mailto:${profile.email}`} className="underline decoration-pink underline-offset-4">
                {profile.email}
              </a>{" "}
              ·{" "}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-pink underline-offset-4">
                LinkedIn
              </a>{" "}
              ·{" "}
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline decoration-pink underline-offset-4">
                GitHub
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// One titled list in the summary.
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h3 className="label mb-2.5 mt-[30px] text-xs text-rose">{title}</h3>
      <ul className="list-disc space-y-1.5 pl-[18px] leading-relaxed marker:text-pink">{children}</ul>
    </>
  );
}