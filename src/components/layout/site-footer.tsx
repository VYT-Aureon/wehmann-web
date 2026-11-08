import Link from "next/link";
import { Clock, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 md:grid-cols-3 md:px-10">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-zinc-500">
            Baumaschinen zur Miete und Service für Profis.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-zinc-300">
          <h2 className="font-heading text-lg uppercase tracking-wide text-zinc-100">
            Kontakt
          </h2>
          <a href={site.telefonLink} className="flex items-center gap-3 hover:text-white">
            <Phone className="h-4 w-4 text-zinc-500" aria-hidden="true" />
            {site.telefon}
          </a>
          <p className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-zinc-500" aria-hidden="true" />
            {site.oeffnungszeiten}
          </p>
        </div>

        <nav aria-label="Footer-Navigation" className="flex flex-col gap-3">
          <h2 className="font-heading text-lg uppercase tracking-wide text-zinc-100">
            Seiten
          </h2>
          {site.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/5">
        <p className="mx-auto max-w-[1600px] px-4 py-5 text-xs text-zinc-600 md:px-10">
          © {new Date().getFullYear()} {site.name} – {site.claim}
        </p>
      </div>
    </footer>
  );
}
