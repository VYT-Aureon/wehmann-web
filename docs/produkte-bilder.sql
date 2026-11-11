-- Bild-URLs den Produkten zuordnen
-- Voraussetzung: Bucket "produkte" in Supabase Storage ist public und die Dateien sind hochgeladen.
-- Im Supabase SQL Editor ausführen.

-- Alle Rüttelplatten
update public.products
set image_url = 'https://mpjzxndyxuvmlmkyhhgu.supabase.co/storage/v1/object/public/produkte/01_ruettelplatte_1.png'
where name ilike 'Rüttelplatte%';

-- Betonmischer
update public.products
set image_url = 'https://mpjzxndyxuvmlmkyhhgu.supabase.co/storage/v1/object/public/produkte/04_betonmischer.png'
where name = 'Betonmischer';

-- Stampfer
update public.products
set image_url = 'https://mpjzxndyxuvmlmkyhhgu.supabase.co/storage/v1/object/public/produkte/06_vibrationsstampfer.png'
where name = 'Stampfer';
