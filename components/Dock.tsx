import { sections } from "@/data/portofolio";

type Props = {
  active: number;
  progress: number;
  onQuickView: () => void;
};

const allIds = ["top", ...sections.map((s) => s.id)];

function scrollToSection(index: number) {
  const id = allIds[Math.max(0, Math.min(allIds.length - 1, index))];
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// The little CD player stuck to the bottom of the screen.
export default function Dock({ active, progress, onQuickView }: Props) {
  const current = active >= 0 ? sections[active] : null;
  const position = active + 1; // 0 = hero, 1 = first section, ...

  return (
    <div
      role="region"
      aria-label="Section player"
      className="fixed bottom-3.5 left-1/2 z-40 flex w-[min(740px,calc(100%-24px))] -translate-x-1/2 items-center gap-3 rounded-full bg-ink/95 py-2 pl-2 pr-2.5 text-white shadow-2xl ring-1 ring-silver-deep/25 backdrop-blur-md"
    >
      <div className="holo relative h-11 w-11 shrink-0 animate-disc rounded-full">
        <div className="grooves absolute inset-0 rounded-full" />
        <span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink ring-[3px] ring-white/60" />
      </div>

      <div className="flex min-w-0 flex-[0_1_240px] flex-col">
        <span className="label truncate text-[9px] text-pink-soft">
          Now viewing · {current ? current.no : "Intro"}
        </span>
        <span className="display truncate text-[17px]">
          {current ? current.title : "Nadia Indriani Sumardi"}
        </span>
      </div>

      <div className="hidden min-w-16 flex-1 items-center gap-2.5 sm:flex">
        <div className="relative h-1 flex-1 rounded-full bg-ink-soft">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-pink"
            style={{ width: `${(progress * 100).toFixed(1)}%` }}
          />
        </div>
        <span className="label text-[9px] text-silver-deep">{Math.round(progress * 100)}%</span>
      </div>

      <div className="ml-auto flex gap-0.5">
        <DockButton label="Previous section" onClick={() => scrollToSection(position - 1)}>
          <path d="M6 6h2v12H6zM20 6v12l-10-6z" />
        </DockButton>
        <DockButton label="Next section" onClick={() => scrollToSection(position + 1)}>
          <path d="M16 6h2v12h-2zM4 6v12l10-6z" />
        </DockButton>
        <DockButton label="Quick view" onClick={onQuickView} className="hidden sm:inline-flex">
          <path d="M5 4h14v16H5zM8 9h8v1.6H8zM8 13h8v1.6H8zM8 17h5v1.6H8z" fillRule="evenodd" />
        </DockButton>
      </div>
    </div>
  );
}

function DockButton({
  label,
  onClick,
  className = "inline-flex",
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`${className} h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-ink-soft`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}