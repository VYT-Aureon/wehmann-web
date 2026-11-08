import { produkte, type Produkt, type Verfuegbarkeit } from "@/data/products";

export const SEITENGROESSE = 8;
export const GEWICHT_MAX = 10000;
export const PREIS_MAX = 10000;

export const sortierungen = {
  beliebtheit: "Beliebtheit",
  "preis-aufsteigend": "Preis: niedrig – hoch",
  "preis-absteigend": "Preis: hoch – niedrig",
  name: "Name A–Z",
} as const;

export type Sortierung = keyof typeof sortierungen;

export type ProduktFilter = {
  kategorien: string[];
  marken: string[];
  verfuegbarkeit: Verfuegbarkeit[];
  gewicht?: [number, number];
  preis?: [number, number];
  sortierung: Sortierung;
  anzahl: number;
};

type SearchParams = Record<string, string | string[] | undefined>;

function wert(params: SearchParams, key: string): string | undefined {
  const v = params[key];
  return Array.isArray(v) ? v[0] : v;
}

function liste(params: SearchParams, key: string): string[] {
  return wert(params, key)?.split(",").filter(Boolean) ?? [];
}

function bereich(params: SearchParams, key: string, max: number) {
  const roh = wert(params, key);
  if (!roh) return undefined;
  const [vonRoh, bisRoh] = roh.split("-").map(Number);
  if (Number.isNaN(vonRoh) || Number.isNaN(bisRoh)) return undefined;
  const von = Math.max(0, vonRoh);
  const bis = Math.min(max, bisRoh);
  // Voller Bereich bedeutet "kein Filter"
  if (von === 0 && bis >= max) return undefined;
  return [von, bis] as [number, number];
}

export function parseFilter(params: SearchParams): ProduktFilter {
  const sortierung = wert(params, "sortierung");
  const anzahl = Number(wert(params, "anzahl"));

  return {
    kategorien: liste(params, "kategorie"),
    marken: liste(params, "marke"),
    verfuegbarkeit: liste(params, "verfuegbarkeit").filter(
      (v): v is Verfuegbarkeit => v === "sofort" || v === "anfrage",
    ),
    gewicht: bereich(params, "gewicht", GEWICHT_MAX),
    preis: bereich(params, "preis", PREIS_MAX),
    sortierung:
      sortierung && sortierung in sortierungen
        ? (sortierung as Sortierung)
        : "beliebtheit",
    anzahl:
      Number.isInteger(anzahl) && anzahl > SEITENGROESSE
        ? anzahl
        : SEITENGROESSE,
  };
}

export function filtereProdukte(filter: ProduktFilter): Produkt[] {
  const ergebnis = produkte.filter((p) => {
    if (filter.kategorien.length && !filter.kategorien.includes(p.kategorie))
      return false;
    if (filter.marken.length && !filter.marken.includes(p.marke)) return false;
    if (
      filter.verfuegbarkeit.length &&
      !filter.verfuegbarkeit.includes(p.verfuegbarkeit)
    )
      return false;
    if (filter.gewicht) {
      const [von, bis] = filter.gewicht;
      if (p.gewichtKg === undefined) return false;
      if (p.gewichtKg < von) return false;
      if (bis < GEWICHT_MAX && p.gewichtKg > bis) return false;
    }
    if (filter.preis) {
      const [von, bis] = filter.preis;
      // Produkte ohne Preis (auf Anfrage) fallen aus der Preisspanne
      if (!p.preis) return false;
      if (p.preis.bis < von) return false;
      if (bis < PREIS_MAX && p.preis.von > bis) return false;
    }
    return true;
  });

  const preisVon = (p: Produkt) => p.preis?.von ?? Infinity;

  return ergebnis.sort((a, b) => {
    switch (filter.sortierung) {
      case "preis-aufsteigend":
        return preisVon(a) - preisVon(b);
      case "preis-absteigend":
        return (b.preis?.von ?? -Infinity) - (a.preis?.von ?? -Infinity);
      case "name":
        return a.name.localeCompare(b.name, "de");
      default:
        return a.rang - b.rang;
    }
  });
}

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatPreis(preis?: Produkt["preis"]): string {
  if (!preis) return "auf Anfrage";
  return `${euro.format(preis.von)} – ${euro.format(preis.bis)}`;
}

/** Baut eine URL mit geänderten Parametern, die übrigen bleiben erhalten. */
export function hrefMit(
  pfad: string,
  params: SearchParams,
  aenderungen: Record<string, string | null>,
): string {
  const neu = new URLSearchParams();
  for (const [key, v] of Object.entries(params)) {
    if (v === undefined) continue;
    neu.set(key, Array.isArray(v) ? v[0] : v);
  }
  for (const [key, v] of Object.entries(aenderungen)) {
    if (v === null) neu.delete(key);
    else neu.set(key, v);
  }
  const qs = neu.toString();
  return qs ? `${pfad}?${qs}` : pfad;
}
