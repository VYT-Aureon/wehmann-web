"use client";

import { sortierungen, type Sortierung } from "@/lib/produkte";
import { useFilterUrl } from "./use-filter-url";

export function SortierungAuswahl({ wert }: { wert: Sortierung }) {
  const url = useFilterUrl();

  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="whitespace-nowrap uppercase tracking-wide text-zinc-400">
        Sortieren nach:
      </span>
      <span className="relative">
        <select
          value={wert}
          onChange={(e) =>
            url({ sortierung: e.target.value === "beliebtheit" ? null : e.target.value }, {
              zuruecksetzenAnzahl: false,
            })
          }
          className="h-11 appearance-none border border-white/15 bg-zinc-900 pl-4 pr-10 text-zinc-100 focus:border-white/40 focus:outline-none"
        >
          {(Object.keys(sortierungen) as Sortierung[]).map((key) => (
            <option key={key} value={key}>
              {sortierungen[key]}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-zinc-400"
        >
          <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </span>
    </label>
  );
}
