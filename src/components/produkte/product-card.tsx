import Image from "next/image";
import { Package } from "lucide-react";
import type { Produkt } from "@/data/products";
import { formatEuro } from "@/lib/produkte";

export function ProductCard({ produkt }: { produkt: Produkt }) {
  const sofort = produkt.verfuegbarkeit === "sofort";

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-zinc-900 transition-colors hover:border-white/25">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900">
        {produkt.bild ? (
          <Image
            src={produkt.bild}
            alt={produkt.name}
            fill
            sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Package
            className="h-20 w-20 text-zinc-600 transition-transform duration-300 group-hover:scale-105"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        )}
        {/* <span
          className={`absolute right-3 top-3 px-2 py-1 text-xs uppercase tracking-wide ${
            sofort
              ? "bg-zinc-100 text-zinc-950"
              : "border border-zinc-500 text-zinc-300"
          }`}
        >
          {sofort ? "Sofort verfügbar" : "Auf Anfrage"}
        </span> */}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-xl font-semibold uppercase leading-tight text-zinc-100">
          {produkt.name}
        </h3>

        {produkt.beschreibung && (
          <p className="whitespace-pre-line text-sm text-zinc-400">
            {produkt.beschreibung}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-4">
          <dl className="grid grid-cols-2 gap-3">
            <Preis label="Tagesmiete" wert={produkt.tagesmiete} />
            <Preis label="Kaution" wert={produkt.kaution} />
          </dl>
          <dl>
            <Preis label="Wochenmiete" wert={produkt.wochenmiete} dezent />
          </dl>
        </div>
      </div>
    </article>
  );
}

function Preis({
  label,
  wert,
  dezent = false,
}: {
  label: string;
  wert?: number;
  dezent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd
        className={
          dezent ? "text-sm text-zinc-400" : "text-lg font-medium text-zinc-100"
        }
      >
        {wert !== undefined ? formatEuro(wert) : "–"}
      </dd>
    </div>
  );
}
