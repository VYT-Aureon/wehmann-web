import type { Produkt } from "@/data/products";
import { supabase } from "@/lib/supabase";

// Zeile aus der Tabelle `products`.
type Zeile = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number | null;
  quantity: number;
  tagesmiete: number | null;
  wochenmiete: number | null;
  kaution: number | null;
};

export async function ladeProdukte(): Promise<Produkt[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, description, image_url, sort_order, quantity, tagesmiete, wochenmiete, kaution",
    )
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Produkte konnten nicht geladen werden: ${error.message}`);
  }

  return (data as Zeile[]).map((z) => ({
    id: z.id,
    name: z.name,
    rang: z.sort_order ?? 0,
    // Vorläufig: quantity > 0 gilt als sofort verfügbar, bis Vermietungen berücksichtigt werden
    verfuegbarkeit: z.quantity > 0 ? "sofort" : "anfrage",
    beschreibung: z.description ?? undefined,
    bild: z.image_url ?? undefined,
    tagesmiete: z.tagesmiete ?? undefined,
    wochenmiete: z.wochenmiete ?? undefined,
    kaution: z.kaution ?? undefined,
  }));
}
