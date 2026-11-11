import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";
import { SectionHeader } from "@/components/sections/section-header";
import { ServiceGrid } from "@/components/sections/service-grid";
import { ProductCard } from "@/components/produkte/product-card";
import { ladeProdukte } from "@/lib/produkte-daten";

// Startseite wird alle 60 Sekunden neu erzeugt, damit Änderungen in Supabase sichtbar werden
export const revalidate = 60;

export default async function Startseite() {
  const produkte = await ladeProdukte();
  const empfohlen = produkte.slice(0, 4);

  return (
    <>
      <Hero />

      <section className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 py-16 md:px-10">
        <SectionHeader
          titel="Aktuelle Maschinen"
          link={{ href: "/produkte", label: "Alle Produkte ansehen" }}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {empfohlen.map((produkt) => (
            <ProductCard key={produkt.id} produkt={produkt} />
          ))}
        </div>
        <Link
          href="/produkte"
          className="font-heading group flex items-center gap-3 self-start text-lg uppercase tracking-wide text-zinc-300 hover:text-white"
        >
          Zur Produktübersicht
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
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
