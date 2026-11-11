-- Schema-Update für public.products
-- Im Supabase SQL Editor ausführen.

-- Schritt 1: Preisspalten hinzufügen
alter table public.products
  add column if not exists tagesmiete numeric(10,2),
  add column if not exists wochenmiete numeric(10,2),
  add column if not exists kaution numeric(10,2);

-- Preistexte aus description entfernen (nur die vom früheren Import erzeugten)
update public.products
set description = null
where description like 'Tagesmiete %';

-- Schritt 2: quantity entfernen
-- Nicht ausführen, bevor die View product_availability ohne quantity neu erstellt ist.
-- Die View hängt an dieser Spalte, ein direktes DROP COLUMN schlägt daher fehl.
-- alter table public.products drop column quantity;
