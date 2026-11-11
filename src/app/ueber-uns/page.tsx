import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Über uns | Wehmann – Maschinen & Service",
  description: "Wer wir sind und wofür Wehmann steht.",
};

export default function UeberUns() {
  return (
    <>
      <PageHeader
        titel="Über uns"
        text="Robuste Technik und verlässlicher Service – seit Jahren an der Seite unserer Kunden auf der Baustelle."
      />
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 text-lg leading-relaxed text-zinc-300 md:px-10">
        <p>
          Platzhaltertext: Hier stellen wir das Unternehmen vor, seine
          Geschichte, sein Team und seine Arbeitsweise.
        </p>
        <p>
          Platzhaltertext: Unser Anspruch ist es, Maschinen bereitzustellen,
          die auf der Baustelle zuverlässig funktionieren, und Kunden mit
          Wartung, Reparatur und Beratung zu begleiten.
        </p>
      </section>
      <div className="mx-auto max-w-[1600px] px-4 pb-16 md:px-10">
        <CtaBanner />
      </div>
    </>
  );
}
