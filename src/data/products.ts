// Produkte kommen aus der Tabelle `products` (siehe lib/produkte-daten.ts).

export type Verfuegbarkeit = "sofort" | "anfrage";

export type Produkt = {
  id: string;
  name: string;
  rang: number;
  verfuegbarkeit: Verfuegbarkeit;
  tagesmiete?: number;
  wochenmiete?: number;
  kaution?: number;
  beschreibung?: string;
  bild?: string;
};
