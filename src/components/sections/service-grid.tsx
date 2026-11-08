import { dienstleistungen } from "@/data/services";

export function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {dienstleistungen.map((d) => {
        const Icon = d.icon;
        return (
          <article
            key={d.id}
            className="flex flex-col gap-4 rounded-sm border border-white/10 bg-zinc-900 p-6 transition-colors hover:border-white/25"
          >
            <Icon className="h-10 w-10 text-zinc-400" aria-hidden="true" />
            <h3 className="font-heading text-2xl font-semibold uppercase leading-tight text-zinc-100">
              {d.titel}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {d.beschreibung}
            </p>
          </article>
        );
      })}
    </div>
  );
}
