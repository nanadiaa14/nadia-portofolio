import type { Achievement } from "@/data/portofolio";

type Props = {
  item: Achievement;
  tilt: number;
  peeled: boolean;
  onPeel: () => void;
};

const STAR =
  "polygon(50% 0%,57% 12%,69% 4%,72% 18%,85% 15%,82% 28%,96% 31%,88% 42%,100% 50%,88% 58%,96% 69%,82% 72%,85% 85%,72% 82%,69% 96%,57% 88%,50% 100%,43% 88%,31% 96%,28% 82%,15% 85%,18% 72%,4% 69%,12% 58%,0% 50%,12% 42%,4% 31%,18% 28%,15% 15%,28% 18%,31% 4%,43% 12%)";

// Size and outline of each sticker shape.
const SHAPES = {
  star: { box: "h-[290px] w-[290px]", face: "", clip: STAR, pad: "p-12" },
  circle: { box: "h-[240px] w-[240px]", face: "rounded-full", clip: undefined, pad: "p-8" },
  rect: { box: "h-[150px] w-[250px]", face: "rounded-[18px]", clip: undefined, pad: "p-4" },
};

// The printed surface of each tier.
const FRONTS = {
  PLATINUM: "foil [background-size:300%_100%] transition-[background-position] duration-700 group-hover:[background-position:100%_50%]",
  GOLD: "bg-[linear-gradient(135deg,#fff3c4_0%,#d4a84a_28%,#fcefb4_48%,#a67c1a_70%,#fde68a_100%)]",
  SILVER: "metal",
};

// A sticker on the dark board. Click to peel it over and read the back.
export default function Sticker({ item, tilt, peeled, onPeel }: Props) {
  const shape = SHAPES[item.shape];
  const face = `absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center text-ink [backface-visibility:hidden] ${shape.face} ${shape.pad}`;

  return (
    <button
      onClick={onPeel}
      aria-pressed={peeled}
      aria-label={`${peeled ? "Stick back" : "Peel sticker"}: ${item.big}, ${item.title}`}
      style={{ rotate: `${tilt}deg` }}
      className={`group relative shrink-0 transition-transform duration-300 [perspective:1000px] hover:-translate-y-1.5 ${shape.box}`}
    >
      <span
        className={`relative block h-full w-full transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] ${
          peeled ? "[transform:rotate3d(1,-1,0,180deg)]" : ""
        }`}
      >
        {/* front */}
        <span
          style={{ clipPath: shape.clip }}
          className={`${face} ${FRONTS[item.tier]} shadow-[0_18px_30px_-14px_rgba(0,0,0,0.7),inset_0_0_0_2px_rgba(255,255,255,0.6)]`}
        >
          <span className="label text-[10px] tracking-[0.16em]">{item.tier}</span>
          <span className="display text-[38px] font-bold leading-none">{item.big}</span>
          <span className="max-w-[18ch] text-xs font-semibold leading-snug">{item.title}</span>
        </span>

        {/* back */}
        <span style={{ clipPath: shape.clip }} className={`${face} bg-white [transform:rotate3d(1,-1,0,180deg)]`}>
          <span className="label text-[9px] text-rose">{item.date}</span>
          <span className="display text-[17px] leading-tight">{item.issuer}</span>
          <span className="max-w-[24ch] text-xs leading-relaxed text-[#3b2d35]">{item.detail}</span>
        </span>
      </span>
    </button>
  );
}