"use client";

import { useState } from "react";
import type { Work } from "@/data/portofolio";
import Photo from "@/components/ui/Photo";

type Props = {
  job: Work;
  number: string;
};

const GALLERY_SLOTS = 4; // 1 main + 3 thumbnails

// What appears inside the popup: a photo gallery and the full description.
export default function WorkDetails({ job, number }: Props) {
  const [current, setCurrent] = useState(0);
  const slots = Array.from({ length: Math.max(GALLERY_SLOTS, job.photos.length) }, (_, i) => job.photos[i]);

  return (
    <>
      <p className="label mb-6 pr-28 text-[11px] text-muted-soft">
        Work experience {number} · {job.kind}
      </p>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        {/* gallery */}
        <div className="flex flex-col gap-2.5">
          <Photo
            src={slots[current]}
            alt={`${job.org} — photo ${current + 1}`}
            label="main photo"
            sizes="400px"
            className="h-64 rounded-xl"
          />
          <div className="grid grid-cols-3 gap-2.5">
            {slots.slice(0, GALLERY_SLOTS).map((src, i) =>
              i === current ? null : (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className="overflow-hidden rounded-lg ring-ink transition hover:ring-2"
                >
                  <Photo src={src} alt="" label={`photo ${i + 1}`} sizes="130px" className="h-[90px]" />
                </button>
              ),
            )}
          </div>
          <p className="label text-[10px] text-muted-soft">
            {job.photoCaption ?? "[photo caption — what is happening in this picture]"}
          </p>
        </div>

        {/* description */}
        <div className="flex min-w-0 flex-col gap-3.5">
          <h3 className="display text-[clamp(32px,3.8vw,46px)] leading-[1.02]">{job.org}</h3>
          <p className="text-[15px] text-muted">{job.place}</p>

          <dl className="grid grid-cols-[90px_minmax(0,1fr)] gap-x-3.5 gap-y-2 border-y border-ink py-3.5">
            <dt className="label text-[10px] text-muted-soft">Role</dt>
            <dd className="font-semibold">{job.role}</dd>
            <dt className="label text-[10px] text-muted-soft">Period</dt>
            <dd>
              {job.period} · {job.duration}
            </dd>
          </dl>

          <p className="label mt-1 text-[10px] text-muted-soft">What I did</p>
          <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed">
            {job.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <p className="label mt-1.5 text-[10px] text-muted-soft">Skills &amp; tools</p>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span key={tag} className="metal label rounded-full px-2.5 py-1.5 text-[11px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}