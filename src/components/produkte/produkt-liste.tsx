"use client";

import { useMemo, useState } from "react";
import type { Produkt } from "@/data/products";
import { PreisSlider } from "@/components/produkte/preis-slider";
import { ProductCard } from "@/components/produkte/product-card";

type Props = { produkte: Produkt[] };

export function ProduktListe({ produkte }: Props) {
  // Obergrenze des Sliders: höchste Tagesmiete, auf 10 € aufgerundet
  const preisMax = useMemo(() => {
    const hoechste = Math.max(0, ...produkte.map((p) => p.tagesmiete ?? 0));
    return Math.max(10, Math.ceil(hoechste / 10) * 10);
  }, [produkte]);

  const [suche, setSuche] = useState("");
  const [preis, setPreis] = useState<[number, number]>([0, preisMax]);
  const preisAktiv = preis[0] > 0 || preis[1] < preisMax;

  const begriff = suche.trim().toLocaleLowerCase("de");
  const sichtbar = produkte.filter((p) => {
    if (begriff && !p.name.toLocaleLowerCase("de").includes(begriff))
      return false;
    if (preisAktiv) {
      // Produkte ohne Tagesmiete fallen aus der Preisspanne
      if (p.tagesmiete === undefined) return false;
      if (p.tagesmiete < preis[0] || p.tagesmiete > preis[1]) return false;
    }
    return true;
  });

  const feld =
    "h-11 w-full border border-white/15 bg-zinc-950 px-3 text-zinc-100 placeholder:text-zinc-600 focus:border-white/40 focus:outline-none";

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-zinc-400">Name</span>
          <input
            type="search"
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            placeholder="Produkt suchen"
            className={feld}
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-zinc-400">Preisspanne (Tagesmiete)</span>
          <PreisSlider
            max={preisMax}
            von={preis[0]}
            bis={preis[1]}
            onChange={(von, bis) => setPreis([von, bis])}
          />
        </div>
      </div>

      <p className="font-heading text-lg uppercase tracking-wide text-zinc-300">
        {sichtbar.length} {sichtbar.length === 1 ? "Produkt" : "Produkte"}
      </p>

      {produkte.length === 0 ? (
        <p className="border border-white/10 bg-zinc-900 p-10 text-center text-zinc-400">
          Noch keine Produkte vorhanden.
        </p>
      ) : sichtbar.length === 0 ? (
        <p className="border border-white/10 bg-zinc-900 p-10 text-center text-zinc-400">
          Keine Produkte gefunden.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {sichtbar.map((produkt) => (
            <ProductCard key={produkt.id} produkt={produkt} />
          ))}
        </div>
      )}
    </div>
  );
}
