# Projekt

Anzeige-Webseite (Startseite, Produkte, Dienstleistungen) mit Admin zur Pflege des Vermietungsstatus.

## Stack

Next.js (App Router, TypeScript), Tailwind, Supabase (Postgres + Auth). Kein Shop.

## Regeln

- Server Components als Standard, Client Components nur bei Interaktion
- Öffentliche Daten nur über die View `product_availability` und die Tabellen `products`, `services`
- `rentals` nur im Admin, nie öffentlich
- Kein service_role-Key im Client
- Nach Änderungen im Admin: revalidatePath('/produkte') und revalidatePath('/')
- Sprache der UI: Deutsch

## Design

Primärfarbe: ..., Schrift: ..., Stil: ...
