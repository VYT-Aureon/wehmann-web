"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Wert = string | string[] | null;

/**
 * Schreibt Filter in die URL. Änderungen an Filtern setzen die Anzahl
 * sichtbarer Produkte zurück. `null` oder leere Liste entfernt den Parameter.
 */
export function useFilterUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (aenderungen: Record<string, Wert>, { zuruecksetzenAnzahl = true } = {}) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, wert] of Object.entries(aenderungen)) {
        params.delete(key);
        const text = Array.isArray(wert) ? wert.join(",") : wert;
        if (text) params.set(key, text);
      }
      if (zuruecksetzenAnzahl) params.delete("anzahl");
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );
}

export function umschalten(liste: string[], wert: string): string[] {
  return liste.includes(wert)
    ? liste.filter((v) => v !== wert)
    : [...liste, wert];
}
