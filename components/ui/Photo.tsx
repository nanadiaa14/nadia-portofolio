import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  label?: string;
  sizes: string;
  className?: string;
};

// Shows a real photo when there is one, or a striped pink placeholder when there isn't.
// The parent decides the size; this fills it.
export default function Photo({ src, alt, label = "documentation photo", sizes, className = "" }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={`photo-placeholder flex items-center justify-center ${className}`}>
      <span className="label rounded bg-white px-2 py-1 text-[10px] text-muted">[{label}]</span>
    </div>
  );
}