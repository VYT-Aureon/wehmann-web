import type { Metadata } from "next";
import { Clock, Phone } from "lucide-react";
import { site } from "@/data/site";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Kontakt | BAUTECH – Maschinen & Service",
  description: "So erreichen Sie BAUTECH – Maschinen & Service.",
};

export default function Kontakt() {
  return (
    <>
      <PageHeader
        titel="Kontakt"
        text="Sie haben Fragen oder benötigen ein Angebot? Rufen Sie uns an, wir beraten Sie gerne."
      />
      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-16 md:grid-cols-2 md:px-10">
        <a
          href={site.telefonLink}
          className="flex flex-col gap-4 border border-white/10 bg-zinc-900 p-8 transition-colors hover:border-white/25"
        >
          <Phone className="h-8 w-8 text-zinc-400" aria-hidden="true" />
          <h2 className="font-heading text-2xl uppercase tracking-wide text-zinc-100">
            Telefon
          </h2>
          <span className="text-xl text-zinc-200">{site.telefon}</span>
        </a>
        <div className="flex flex-col gap-4 border border-white/10 bg-zinc-900 p-8">
          <Clock className="h-8 w-8 text-zinc-400" aria-hidden="true" />
          <h2 className="font-heading text-2xl uppercase tracking-wide text-zinc-100">
            Öffnungszeiten
          </h2>
          <span className="text-xl text-zinc-200">{site.oeffnungszeiten}</span>
        </div>
      </section>
    </>
  );
}
