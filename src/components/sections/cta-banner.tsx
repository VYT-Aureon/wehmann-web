import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="border border-white/10 bg-zinc-900">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-6">
          <ClipboardList
            className="hidden h-14 w-14 shrink-0 text-zinc-500 sm:block"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl font-semibold uppercase tracking-wide text-zinc-100 md:text-3xl">
              Sie haben Fragen oder benötigen ein Angebot?
            </h2>
            <p className="text-zinc-400">
              Wir beraten Sie gerne persönlich und finden die richtige Lösung
              für Ihr Projekt.
            </p>
          </div>
        </div>
        <Link
          href="/kontakt"
          className="font-heading group flex h-12 shrink-0 items-center gap-3 border border-zinc-300 px-6 text-lg uppercase tracking-wide text-zinc-100 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
        >
          Kontakt aufnehmen
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
