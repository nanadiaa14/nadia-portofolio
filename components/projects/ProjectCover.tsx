import Image from "next/image";
import type { Project } from "@/data/portofolio";

type Props = {
  project: Project;
  number: string;
  className?: string; // must include a position (absolute/relative) and a size
};

// The CD case artwork: a preview of the project's own visual, with the title printed on top.
export default function ProjectCover({ project, number, className = "" }: Props) {
  return (
    <div className={`overflow-hidden bg-ink ${className}`}>
      <Image src={project.cover.image} alt="" fill sizes="320px" className="object-cover" />

      {/* darken the bottom so the title stays readable on any image */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,20,24,0.94)_0%,rgba(28,20,24,0.6)_34%,rgba(28,20,24,0)_62%)]" />

      <div className="absolute inset-x-[7%] top-[7%] flex items-start justify-between gap-2">
        <span className="label rounded-full bg-white/90 px-2 py-1 text-[9px] text-ink">Project {number}</span>
        <span className="label rounded-full bg-ink/85 px-2 py-1 text-[9px] text-white">{project.genre}</span>
      </div>

      <p className="display absolute inset-x-[7%] bottom-[7%] text-[24px] font-semibold leading-[1.05] text-white">
        {project.title}
      </p>
    </div>
  );
}