import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";
import { SectionHeader } from "@/components/sections/section-header";
import { ServiceGrid } from "@/components/sections/service-grid";
import { ProductCard } from "@/components/produkte/product-card";
import { ProduktFilterPanel } from "@/components/produkte/produkt-filter";
import { SortierungAuswahl } from "@/components/produkte/sortierung-auswahl";
import {
  SEITENGROESSE,
  filtereProdukte,
  hrefMit,
  parseFilter,
} from "@/lib/produkte";

export const metadata: Metadata = {
  title: "Produkte | BAUTECH – Maschinen & Service",
  description:
    "Baumaschinen zur Miete: Rütteltechnik, Betontechnik, Verdichtung und mehr.",
};

export default async function ProduktePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filter = parseFilter(params);
  const ergebnis = filtereProdukte(filter);
  const sichtbar = ergebnis.slice(0, filter.anzahl);
  const weitere = ergebnis.length > sichtbar.length;

  return (
    <>
      <Hero />

      <section className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 py-10 md:px-10 lg:flex-row lg:items-start">
        <ProduktFilterPanel filter={filter} treffer={ergebnis.length} />

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-heading text-lg uppercase tracking-wide text-zinc-300">
              {ergebnis.length}{" "}
              {ergebnis.length === 1 ? "Produkt" : "Produkte"} gefunden
            </p>
            <SortierungAuswahl wert={filter.sortierung} />
          </div>

          {sichtbar.length === 0 ? (
            <p className="border border-white/10 bg-zinc-900 p-10 text-center text-zinc-400">
              Für diese Filter gibt es keine Produkte.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {sichtbar.map((produkt) => (
                <ProductCard key={produkt.id} produkt={produkt} />
              ))}
            </div>
          )}

          {weitere && (
            <div className="flex justify-center">
              <Link
                href={hrefMit("/produkte", params, {
                  anzahl: String(filter.anzahl + SEITENGROESSE),
                })}
                scroll={false}
                className="font-heading flex h-12 items-center gap-3 border border-white/20 px-8 text-base uppercase tracking-wide text-zinc-200 transition-colors hover:border-white/50 hover:text-white"
              >
                Mehr Produkte anzeigen
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
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
