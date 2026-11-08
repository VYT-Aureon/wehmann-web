"use client";

import { useId, useState, type ReactNode } from "react";
import { RotateCcw, SlidersHorizontal, X } from "lucide-react";
import {
  kategorien,
  marken,
  produkte,
  type Verfuegbarkeit,
} from "@/data/products";
import { GEWICHT_MAX, PREIS_MAX, type ProduktFilter } from "@/lib/produkte";
import { umschalten, useFilterUrl } from "./use-filter-url";

type Props = {
  filter: ProduktFilter;
  treffer: number;
};

/** Filter-Sidebar auf Desktop, Panel auf Mobil. */
export function ProduktFilterPanel({ filter, treffer }: Props) {
  const [mobilOffen, setMobilOffen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobilOffen(true)}
        className="font-heading flex h-12 w-full items-center justify-center gap-2 border border-white/20 text-base uppercase tracking-wide text-zinc-200 lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Filter
      </button>

      <aside aria-label="Produktfilter" className="sticky top-28 hidden w-72 shrink-0 self-start lg:block">
        <FilterInhalt filter={filter} />
      </aside>

      {mobilOffen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter"
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <button
            type="button"
            aria-label="Filter schließen"
            onClick={() => setMobilOffen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-zinc-950">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
              <span className="font-heading text-xl uppercase tracking-wide text-zinc-100">
                Filter
              </span>
              <button
                type="button"
                onClick={() => setMobilOffen(false)}
                aria-label="Filter schließen"
                className="flex h-11 w-11 items-center justify-center text-zinc-200"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterInhalt filter={filter} />
            </div>
            <div className="shrink-0 border-t border-white/10 p-5">
              <button
                type="button"
                onClick={() => setMobilOffen(false)}
                className="font-heading h-12 w-full bg-zinc-100 text-base uppercase tracking-wide text-zinc-950"
              >
                {treffer} {treffer === 1 ? "Produkt" : "Produkte"} anzeigen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const verfuegbarkeitOptionen: { wert: Verfuegbarkeit; label: string }[] = [
  { wert: "sofort", label: "Sofort verfügbar" },
  { wert: "anfrage", label: "Auf Anfrage" },
];

function FilterInhalt({ filter }: { filter: ProduktFilter }) {
  const url = useFilterUrl();

  const hatFilter =
    filter.kategorien.length > 0 ||
    filter.marken.length > 0 ||
    filter.verfuegbarkeit.length > 0 ||
    filter.gewicht !== undefined ||
    filter.preis !== undefined;

  const anzahlInKategorie = (slug: string) =>
    produkte.filter((p) => p.kategorie === slug).length;

  return (
    <div className="flex flex-col border border-white/10 bg-zinc-900">
      <FilterKarte titel="Kategorien">
        <ul className="flex flex-col gap-1">
          {kategorien.map((k) => {
            const aktiv = filter.kategorien.includes(k.slug);
            const Icon = k.icon;
            return (
              <li key={k.slug}>
                <button
                  type="button"
                  aria-pressed={aktiv}
                  onClick={() =>
                    url({ kategorie: umschalten(filter.kategorien, k.slug) })
                  }
                  className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm transition-colors ${
                    aktiv
                      ? "bg-white/10 text-zinc-100"
                      : "text-zinc-300 hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{k.name}</span>
                  <span className="text-xs text-zinc-500">
                    ({anzahlInKategorie(k.slug)})
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </FilterKarte>

      <FilterKarte titel="Einsatzgewicht">
        <Doppelregler
          key={`gewicht-${filter.gewicht?.join("-")}`}
          min={0}
          max={GEWICHT_MAX}
          schritt={50}
          einheit=" kg"
          werte={filter.gewicht ?? [0, GEWICHT_MAX]}
          onCommit={(von, bis) =>
            url({ gewicht: bereichParam(von, bis, 0, GEWICHT_MAX) })
          }
        />
      </FilterKarte>

      <FilterKarte titel="Preisspanne">
        <div key={`preis-${filter.preis?.join("-")}`} className="flex flex-col gap-4">
          <PreisEingabe
            werte={filter.preis ?? [0, PREIS_MAX]}
            onCommit={(von, bis) =>
              url({ preis: bereichParam(von, bis, 0, PREIS_MAX) })
            }
          />
          <Doppelregler
            min={0}
            max={PREIS_MAX}
            schritt={50}
            einheit=" €"
            werte={filter.preis ?? [0, PREIS_MAX]}
            onCommit={(von, bis) =>
              url({ preis: bereichParam(von, bis, 0, PREIS_MAX) })
            }
          />
        </div>
      </FilterKarte>

      <FilterKarte titel="Marke">
        <div className="flex flex-col gap-3">
          <Checkbox
            label="Alle Marken"
            checked={filter.marken.length === 0}
            onChange={() => url({ marke: null })}
          />
          {marken.map((m) => (
            <Checkbox
              key={m}
              label={m}
              checked={filter.marken.includes(m)}
              onChange={() => url({ marke: umschalten(filter.marken, m) })}
            />
          ))}
        </div>
      </FilterKarte>

      <FilterKarte titel="Verfügbarkeit">
        <div className="flex flex-col gap-3">
          {verfuegbarkeitOptionen.map((o) => (
            <Checkbox
              key={o.wert}
              label={o.label}
              checked={filter.verfuegbarkeit.includes(o.wert)}
              onChange={() =>
                url({
                  verfuegbarkeit: umschalten(filter.verfuegbarkeit, o.wert),
                })
              }
            />
          ))}
        </div>
      </FilterKarte>

      <div className="p-5">
        <button
          type="button"
          disabled={!hatFilter}
          onClick={() =>
            url({
              kategorie: null,
              marke: null,
              verfuegbarkeit: null,
              gewicht: null,
              preis: null,
            })
          }
          className="font-heading flex h-11 w-full items-center justify-center gap-2 border border-white/20 text-base uppercase tracking-wide text-zinc-200 transition-colors enabled:hover:border-white/50 disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Filter zurücksetzen
        </button>
      </div>
    </div>
  );
}

function FilterKarte({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <section className="border-b border-white/10 p-5 last:border-b-0">
      <h2 className="font-heading mb-4 text-base font-semibold uppercase tracking-wide text-zinc-100">
        {titel}
      </h2>
      {children}
    </section>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 cursor-pointer accent-zinc-100"
      />
      {label}
    </label>
  );
}

/** `null`, wenn der Bereich den vollen Wertebereich umfasst (= kein Filter). */
function bereichParam(von: number, bis: number, min: number, max: number) {
  if (von <= min && bis >= max) return null;
  return `${von}-${bis}`;
}

function Doppelregler({
  min,
  max,
  schritt,
  einheit,
  werte,
  onCommit,
}: {
  min: number;
  max: number;
  schritt: number;
  einheit: string;
  werte: [number, number];
  onCommit: (von: number, bis: number) => void;
}) {
  const id = useId();
  const [von, setVon] = useState(werte[0]);
  const [bis, setBis] = useState(werte[1]);

  const prozent = (v: number) => ((v - min) / (max - min)) * 100;
  const format = (v: number) =>
    `${v.toLocaleString("de-DE")}${einheit}${v >= max ? "+" : ""}`;

  const commit = () => {
    if (von !== werte[0] || bis !== werte[1]) onCommit(von, bis);
  };

  const reglerStil =
    "pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent " +
    "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-zinc-100 " +
    "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-zinc-100";

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-zinc-700" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-zinc-300"
          style={{ left: `${prozent(von)}%`, right: `${100 - prozent(bis)}%` }}
        />
        <input
          id={`${id}-von`}
          type="range"
          aria-label="Untergrenze"
          min={min}
          max={max}
          step={schritt}
          value={von}
          onChange={(e) => setVon(Math.min(Number(e.target.value), bis))}
          onPointerUp={commit}
          onKeyUp={commit}
          className={reglerStil}
          style={{ zIndex: von > max - (max - min) / 10 ? 5 : 3 }}
        />
        <input
          id={`${id}-bis`}
          type="range"
          aria-label="Obergrenze"
          min={min}
          max={max}
          step={schritt}
          value={bis}
          onChange={(e) => setBis(Math.max(Number(e.target.value), von))}
          onPointerUp={commit}
          onKeyUp={commit}
          className={reglerStil}
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex justify-between text-xs text-zinc-500">
        <span>{format(von)}</span>
        <span>{format(bis)}</span>
      </div>
    </div>
  );
}

function PreisEingabe({
  werte,
  onCommit,
}: {
  werte: [number, number];
  onCommit: (von: number, bis: number) => void;
}) {
  const [von, setVon] = useState(werte[0] > 0 ? String(werte[0]) : "");
  const [bis, setBis] = useState(
    werte[1] < PREIS_MAX ? String(werte[1]) : "",
  );

  const commit = () => {
    const v = Math.min(Math.max(Number(von) || 0, 0), PREIS_MAX);
    const b = Math.min(Number(bis) || PREIS_MAX, PREIS_MAX);
    if (v !== werte[0] || b !== werte[1]) onCommit(v, Math.max(b, v));
  };

  const feld =
    "h-10 w-full min-w-0 border border-white/15 bg-zinc-950 px-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-white/40 focus:outline-none";

  return (
    <div className="grid grid-cols-2 gap-3">
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={PREIS_MAX}
        placeholder="Min."
        aria-label="Mindestpreis in Euro"
        value={von}
        onChange={(e) => setVon(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className={feld}
      />
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={PREIS_MAX}
        placeholder="Max."
        aria-label="Höchstpreis in Euro"
        value={bis}
        onChange={(e) => setBis(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className={feld}
      />
    </div>
  );
}
