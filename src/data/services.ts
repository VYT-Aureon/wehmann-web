import { Cog, HardHat, Truck, Wrench, type LucideIcon } from "lucide-react";

export type Dienstleistung = {
  id: string;
  titel: string;
  beschreibung: string;
  icon: LucideIcon;
};

export const dienstleistungen: Dienstleistung[] = [
  {
    id: "wartung",
    titel: "Wartung & Inspektion",
    beschreibung:
      "Regelmäßige Wartung für maximale Leistung und verlässliche Einsatzbereitschaft.",
    icon: Wrench,
  },
  {
    id: "reparatur",
    titel: "Reparatur & Instandsetzung",
    beschreibung:
      "Schnelle und fachgerechte Reparaturen – in unserer Werkstatt oder direkt bei Ihnen vor Ort.",
    icon: Cog,
  },
  {
    id: "transport",
    titel: "Transport & Lieferung",
    beschreibung:
      "Zuverlässiger Transport Ihrer Maschinen – termingerecht und sicher an jeden Einsatzort.",
    icon: Truck,
  },
  {
    id: "beratung",
    titel: "Beratung & Einsatzplanung",
    beschreibung:
      "Individuelle Beratung und die passende Maschinenlösung für Ihr Projekt.",
    icon: HardHat,
  },
];
