export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-800">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-16 md:px-10 md:py-24">
        <h1 className="font-heading text-5xl font-bold uppercase leading-none text-zinc-100 md:text-7xl">
          Baumaschinen
          <span className="block text-zinc-500">für Profis</span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-zinc-300">
          Robuste Technik, auf die Sie sich verlassen können. Entdecken Sie
          unsere Auswahl an Baumaschinen und Dienstleistungen.
        </p>
      </div>
    </section>
  );
}
