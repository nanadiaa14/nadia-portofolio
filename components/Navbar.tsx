import { sections } from "@/data/portofolio";

type Props = {
  active: number;
  onQuickView: () => void;
};

export default function Navbar({ active, onQuickView }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 md:px-8"
      >
        <a href="#top" className="flex shrink-0 items-baseline gap-2 text-ink">
          <span className="display-italic text-2xl leading-none">nadia.</span>
          <span className="label hidden text-[9px] text-muted-soft sm:inline">Portfolio ’26</span>
        </a>

        <div className="flex min-w-0 flex-1 justify-start gap-1 overflow-x-auto [scrollbar-width:none] md:justify-center">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm transition-colors ${
                active === i ? "bg-ink text-white" : "text-ink hover:bg-pink-pale"
              }`}
            >
              <span className="label text-[10px] opacity-70">{s.no}</span>
              {s.label}
            </a>
          ))}
        </div>

        <button
          onClick={onQuickView}
          className="hidden min-h-11 shrink-0 rounded-full border border-ink px-4 text-sm font-medium transition-colors hover:bg-pink-pale sm:inline-flex sm:items-center"
        >
          quick view
        </button>
      </nav>
    </header>
  );
}