import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";
import { SectionHeader } from "@/components/sections/section-header";
import { ServiceGrid } from "@/components/sections/service-grid";
import { ProduktListe } from "@/components/produkte/produkt-liste";
import { ladeProdukte } from "@/lib/produkte-daten";

// Produkte werden alle 60 Sekunden neu geladen, damit Änderungen in Supabase sichtbar werden
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Produkte | Wehmann – Maschinen & Service",
  description:
    "Baumaschinen zur Miete: Rütteltechnik, Betontechnik, Verdichtung und mehr.",
};

export default async function ProduktePage() {
  const produkte = await ladeProdukte();

  return (
    <>
      <Hero />

      <section className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 py-10 md:px-10">
        <ProduktListe produkte={produkte} />
      </section>

      <section className="mx-auto flex max-w-[1600px] flex-col gap-8 border-t border-white/10 px-4 pb-16 pt-12 md:px-10">
        <SectionHeader
          titel="Unsere Dienstleistungen"
          link={{
            href: "/dienstleistungen",
            label: "Alle Dienstleistungen ansehen",
          }}
        />
        <ServiceGrid />
      </section>

      <div className="mx-auto max-w-[1600px] px-4 pb-16 md:px-10">
        <CtaBanner />
      </div>
    </>
  );
}
