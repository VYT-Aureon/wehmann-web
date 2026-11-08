import {
  Cylinder,
  Forklift,
  Hammer,
  Package,
  Plug,
  Scissors,
  SprayCan,
  Vibrate,
  type LucideIcon,
} from "lucide-react";

// Platzhalterdaten aus dem Mockup. Später kommen sie aus Supabase
// (Tabelle `products`, View `product_availability`).

export type Verfuegbarkeit = "sofort" | "anfrage";

export type Kategorie = {
  slug: string;
  name: string;
  icon: LucideIcon;
};

export type Produkt = {
  id: string;
  name: string;
  kategorie: string;
  marke: string;
  rang: number;
  verfuegbarkeit: Verfuegbarkeit;
  gewichtKg?: number;
  spezifikation: { label: string; wert: string };
  preis?: { von: number; bis: number };
};

export const kategorien: Kategorie[] = [
  { slug: "ruetteltechnik", name: "Rütteltechnik", icon: Vibrate },
  { slug: "betontechnik", name: "Betontechnik", icon: Cylinder },
  { slug: "verdichtung", name: "Verdichtung", icon: Hammer },
  { slug: "schneiden-trennen", name: "Schneiden & Trennen", icon: Scissors },
  { slug: "heben-foerdern", name: "Heben & Fördern", icon: Forklift },
  { slug: "reinigungstechnik", name: "Reinigungstechnik", icon: SprayCan },
  { slug: "stromerzeuger", name: "Stromerzeuger", icon: Plug },
  { slug: "zubehoer", name: "Zubehör", icon: Package },
];

export const marken = [
  "Wacker Neuson",
  "Bomag",
  "Weber MT",
  "Belle Group",
  "Husqvarna",
  "Weitere",
];

export const produkte: Produkt[] = [
  {
    id: "wacker-neuson-dpu-2550",
    name: "Rüttelplatte Wacker Neuson DPU 2550",
    kategorie: "ruetteltechnik",
    marke: "Wacker Neuson",
    rang: 1,
    verfuegbarkeit: "sofort",
    gewichtKg: 153,
    spezifikation: { label: "Einsatzgewicht", wert: "153 kg" },
    preis: { von: 1200, bis: 1600 },
  },
  {
    id: "bomag-bpr-25-50-d",
    name: "Rüttelplatte Bomag BPR 25/50 D",
    kategorie: "ruetteltechnik",
    marke: "Bomag",
    rang: 2,
    verfuegbarkeit: "sofort",
    gewichtKg: 155,
    spezifikation: { label: "Einsatzgewicht", wert: "155 kg" },
    preis: { von: 1100, bis: 1500 },
  },
  {
    id: "weber-cr-7",
    name: "Vorlaufende Rüttelplatte Weber CR 7",
    kategorie: "ruetteltechnik",
    marke: "Weber MT",
    rang: 3,
    verfuegbarkeit: "sofort",
    gewichtKg: 450,
    spezifikation: { label: "Einsatzgewicht", wert: "450 kg" },
    preis: { von: 2200, bis: 2800 },
  },
  {
    id: "atika-compact-130",
    name: "Betonmischer Atika Compact 130",
    kategorie: "betontechnik",
    marke: "Weitere",
    rang: 4,
    verfuegbarkeit: "sofort",
    spezifikation: { label: "Trommelvolumen", wert: "130 l" },
    preis: { von: 590, bis: 750 },
  },
  {
    id: "liebherr-mix-130",
    name: "Zwangsmischer Liebherr MIX 130",
    kategorie: "betontechnik",
    marke: "Weitere",
    rang: 5,
    verfuegbarkeit: "sofort",
    spezifikation: { label: "Mischleistung", wert: "130 l" },
    preis: { von: 2400, bis: 3200 },
  },
  {
    id: "wacker-neuson-bs-60-4",
    name: "Vibrationsstampfer Wacker Neuson BS 60-4",
    kategorie: "verdichtung",
    marke: "Wacker Neuson",
    rang: 6,
    verfuegbarkeit: "sofort",
    gewichtKg: 69,
    spezifikation: { label: "Einsatzgewicht", wert: "69 kg" },
    preis: { von: 1200, bis: 1600 },
  },
  {
    id: "husqvarna-k-770",
    name: "Trennschleifer Husqvarna K 770",
    kategorie: "schneiden-trennen",
    marke: "Husqvarna",
    rang: 7,
    verfuegbarkeit: "sofort",
    spezifikation: { label: "Scheibendurchmesser", wert: "350 mm" },
    preis: { von: 900, bis: 1200 },
  },
  {
    id: "boecker-ak-32-1500",
    name: "Mini-Kran Böcker AK 32/1500",
    kategorie: "heben-foerdern",
    marke: "Weitere",
    rang: 8,
    verfuegbarkeit: "anfrage",
    spezifikation: { label: "Traglast", wert: "1.500 kg" },
  },
];
