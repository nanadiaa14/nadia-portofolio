import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  kicker: string;
  dark?: boolean;
};

// The thin chrome line + big title + small label used at the top of every section.
export default function SectionHeader({ title, kicker, dark = false }: Props) {
  return (
    <header>
      <hr className="hairline" />
      <div className="mb-10 mt-5 flex flex-wrap items-end justify-between gap-4">
        <h2
          className={`display text-5xl leading-[0.95] tracking-tight md:text-7xl ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        <p className={`label text-[11px] ${dark ? "text-silver-deep" : "text-muted-soft"}`}>
          {kicker}
        </p>
      </div>
    </header>
  );
}