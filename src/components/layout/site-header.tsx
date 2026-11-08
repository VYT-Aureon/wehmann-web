"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Menu, Phone, X } from "lucide-react";
import { site } from "@/data/site";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [gescrollt, setGescrollt] = useState(false);
  const [menuOffen, setMenuOffen] = useState(false);

  useEffect(() => {
    const onScroll = () => setGescrollt(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur transition-[height] duration-300 ${
        gescrollt ? "h-16" : "h-20 md:h-24"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-6 px-4 md:px-10">
        <div className={gescrollt ? "hidden" : "block"}>
          <Logo />
        </div>

        <nav
          aria-label="Hauptnavigation"
          className="hidden h-full lg:flex lg:items-center lg:gap-10"
        >
          {site.navigation.map((item) => {
            const aktiv = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={aktiv ? "page" : undefined}
                className={`font-heading relative flex h-full items-center text-lg uppercase tracking-wide transition-colors ${
                  aktiv ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {item.label}
                {aktiv && (
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-zinc-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.telefonLink}
            className="hidden items-center gap-3 text-zinc-200 lg:flex"
          >
            <Phone className="h-5 w-5 text-zinc-400" aria-hidden="true" />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-medium">{site.telefon}</span>
              <span className="text-sm text-zinc-400">
                {site.oeffnungszeiten}
              </span>
            </span>
          </a>

          <a
            href={site.telefonLink}
            aria-label={`Anrufen: ${site.telefon}`}
            className="flex h-11 w-11 items-center justify-center text-zinc-200 lg:hidden"
          >
            <Phone className="h-6 w-6" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOffen((o) => !o)}
            aria-expanded={menuOffen}
            aria-controls="mobiles-menue"
            aria-label={menuOffen ? "Menü schließen" : "Menü öffnen"}
            className="flex h-11 w-11 items-center justify-center text-zinc-200 lg:hidden"
          >
            {menuOffen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOffen && (
        <div
          id="mobiles-menue"
          className="absolute inset-x-0 top-full border-b border-white/10 bg-zinc-950 px-4 py-6 shadow-2xl lg:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col">
            {site.navigation.map((item) => {
              const aktiv = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOffen(false)}
                  aria-current={aktiv ? "page" : undefined}
                  className={`font-heading border-b border-white/5 py-4 text-xl uppercase tracking-wide ${
                    aktiv ? "text-zinc-100" : "text-zinc-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 flex items-center gap-3 text-zinc-400">
            <Clock className="h-5 w-5" aria-hidden="true" />
            <span>{site.oeffnungszeiten}</span>
          </div>
        </div>
      )}
    </header>
  );
}
