import type { Project } from "@/data/portofolio";
import { wave } from "@/lib/wave";

type Props = {
  project: Project;
  number: string;
  className?: string;
};

// The printed artwork of a project's CD case. Size comes from the parent.
export default function ProjectCover({ project, number, className = "" }: Props) {
  const { bg, ink } = project.cover;

  return (
    <div
      className={`flex flex-col justify-between p-[7%] ${className}`}
      style={{ background: bg, color: ink }}
    >
      <div className="flex items-start justify-between gap-1.5">
        <span className="label text-[10px]">Project {number}</span>
        <span className="label rounded-full px-2 py-1 text-[9px]" style={{ background: ink, color: bg }}>
          {project.genre}
        </span>
      </div>

      <svg viewBox="0 0 180 70" className="h-auto w-full" aria-hidden="true">
        <polyline
          points={wave(project.cover.wave)}
          fill="none"
          stroke={ink}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex flex-col gap-1.5">
        <span className="display text-[27px] font-semibold leading-[0.98]">{project.title}</span>
        <span className="label text-[10px] opacity-85">
          {project.headline} · {project.date}
        </span>
      </div>
    </div>
  );
}