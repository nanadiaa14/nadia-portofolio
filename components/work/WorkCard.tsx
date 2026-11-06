import type { Work } from "@/data/portofolio";
import Photo from "@/components/ui/Photo";

type Props = {
  job: Work;
  number: string;
  onOpen: () => void;
};

export default function WorkCard({ job, number, onOpen }: Props) {
  const extraPhotos = Math.max(0, job.photos.length - 1);

  return (
    <button
      onClick={onOpen}
      aria-label={`Details: ${job.role} at ${job.org}`}
      className="group relative flex w-full flex-col rounded-xl border border-ink/10 bg-white text-left shadow-[0_30px_50px_-40px_rgba(35,25,32,0.5)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_40px_60px_-36px_rgba(35,25,32,0.55)]"
    >
      {/* holographic seal */}
      <span className="foil absolute -top-6 right-5 z-10 flex h-24 w-24 rotate-[10deg] flex-col items-center justify-center rounded-full text-center shadow-[0_12px_24px_-10px_rgba(35,25,32,0.5)] ring-2 ring-inset ring-white/70">
        <span className="label text-[8px] leading-tight">
          Recorded
          <br />
          at
        </span>
        <span className="display text-[22px] font-bold leading-none">{number}</span>
      </span>

      <div className="relative">
        <Photo
          src={job.photos[0]}
          alt={`${job.org} — documentation`}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-52 rounded-t-xl md:h-64"
        />
        {extraPhotos > 0 && (
          <span className="label absolute bottom-3.5 left-3.5 rounded-full bg-ink/85 px-2.5 py-1.5 text-[10px] text-white">
            + {extraPhotos} photos
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5 px-7 pb-7 pt-6">
        <span className="label text-[10px] text-rose">{job.kind}</span>
        <span className="display text-4xl leading-[1.02]">{job.org}</span>
        <span className="text-[15px] text-muted">{job.place}</span>

        <span className="mt-1 flex flex-wrap items-center gap-2.5 border-y border-ink py-3">
          <span className="font-semibold">{job.role}</span>
          <span className="flex-1" />
          <span className="label text-[11px]">{job.period}</span>
          <span className="metal label rounded-full px-2.5 py-1.5 text-[11px]">{job.duration}</span>
        </span>

        <span className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span key={tag} className="label rounded-full border border-pink-pale bg-blush px-2.5 py-1.5 text-[11px]">
              {tag}
            </span>
          ))}
        </span>

        <span className="label mt-1 text-[11px] transition-colors group-hover:text-rose">
          view details &amp; documentation →
        </span>
      </div>
    </button>
  );
}