import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ServiceGrid } from "@/components/sections/service-grid";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Dienstleistungen | Wehmann – Maschinen & Service",
  description:
    "Wartung, Reparatur, Transport und Beratung rund um Ihre Baumaschinen.",
};

export default function Dienstleistungen() {
  return (
    <>
      <PageHeader
        titel="Dienstleistungen"
        text="Ihre Maschinen laufen nur, wenn der Service stimmt. Wir kümmern uns um Wartung, Reparatur, Transport und Planung."
      />
      <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-10">
        <ServiceGrid />
      </section>
      <div className="mx-auto max-w-[1600px] px-4 pb-16 md:px-10">
        <CtaBanner />
      </div>
    </>
  );
}
