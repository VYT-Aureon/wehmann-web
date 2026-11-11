"use client";

import { useId } from "react";
import { formatEuro } from "@/lib/produkte";

type Props = {
  max: number;
  von: number;
  bis: number;
  onChange: (von: number, bis: number) => void;
};

const SCHRITT = 5;

/** Zweigriffiger Slider für die Tagesmiete. */
export function PreisSlider({ max, von, bis, onChange }: Props) {
  const id = useId();

  const reglerStil =
    "pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent " +
    "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-zinc-100 " +
    "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-zinc-100";

  const prozent = (v: number) => (max === 0 ? 0 : (v / max) * 100);

  return (
    <div id={id} className="flex flex-col gap-2">
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-zinc-700" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-zinc-300"
          style={{ left: `${prozent(von)}%`, right: `${100 - prozent(bis)}%` }}
        />
        <input
          type="range"
          aria-label="Mindestpreis Tagesmiete"
          min={0}
          max={max}
          step={SCHRITT}
          value={von}
          onChange={(e) => onChange(Math.min(Number(e.target.value), bis), bis)}
          className={reglerStil}
          style={{ zIndex: von > max - max / 10 ? 5 : 3 }}
        />
        <input
          type="range"
          aria-label="Höchstpreis Tagesmiete"
          min={0}
          max={max}
          step={SCHRITT}
          value={bis}
          onChange={(e) => onChange(von, Math.max(Number(e.target.value), von))}
          className={reglerStil}
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex justify-between text-sm text-zinc-300">
        <span>ab {formatEuro(von)}</span>
        <span>bis {formatEuro(bis)}</span>
      </div>
    </div>
  );
}
