import type { WaveKind } from "@/data/portofolio";

// Builds the decorative line drawn on each project cover (SVG viewBox 0 0 180 70).
export function wave(kind: WaveKind): string {
  const points: string[] = [];

  for (let x = 0; x <= 180; x += 6) {
    let y: number;
    if (kind === "voice") y = 35 + Math.sin(x / 6) * (6 + 22 * Math.abs(Math.sin(x / 40)));
    else if (kind === "eeg") y = 35 + (((x * 37) % 29) - 14) * (x % 42 < 8 ? 1.9 : 0.55);
    else if (kind === "text") y = (Math.floor(x / 12) % 2 ? 18 : 52) + ((x * 13) % 7);
    else if (kind === "dna") y = 35 + Math.sin(x / 7) * 24 * Math.cos(x / 50);
    else if (kind === "sign") y = 35 + (x % 40 < 20 ? (x % 20) * 2 - 20 : 20 - (x % 20) * 2);
    else y = 58 - Math.floor(x / 18) * 4.5 + ((x * 7) % 9);

    points.push(`${x},${Math.max(3, Math.min(67, y)).toFixed(1)}`);
  }

  return points.join(" ");
}