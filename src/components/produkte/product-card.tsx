import { kategorien, type Produkt } from "@/data/products";
import { formatPreis } from "@/lib/produkte";

export function ProductCard({ produkt }: { produkt: Produkt }) {
  const kategorie = kategorien.find((k) => k.slug === produkt.kategorie);
  const Icon = kategorie?.icon;
  const sofort = produkt.verfuegbarkeit === "sofort";

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-zinc-900 transition-colors hover:border-white/25">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900">
        {Icon && (
          <Icon
            className="h-20 w-20 text-zinc-600 transition-transform duration-300 group-hover:scale-105"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        )}
        <span
          className={`absolute right-3 top-3 px-2 py-1 text-xs uppercase tracking-wide ${
            sofort
              ? "bg-zinc-100 text-zinc-950"
              : "border border-zinc-500 text-zinc-300"
          }`}
        >
          {sofort ? "Sofort verfügbar" : "Auf Anfrage"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {kategorie && (
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            {kategorie.name}
          </p>
        )}
        <h3 className="font-heading text-xl font-semibold uppercase leading-tight text-zinc-100">
          {produkt.name}
        </h3>

        <div className="mt-1 flex flex-col gap-1">
          <p className="text-sm text-zinc-500">{produkt.spezifikation.label}</p>
          <p className="text-zinc-200">{produkt.spezifikation.wert}</p>
        </div>

        <div className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-4">
          <p className="text-sm text-zinc-500">Preisspanne</p>
          <p className="text-lg font-medium text-zinc-100">
            {formatPreis(produkt.preis)}
          </p>
        </div>
      </div>
    </article>
  );
}
