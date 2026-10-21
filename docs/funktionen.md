# Funktionen pro Element

Grundlage: `docs/design/Fullpage mockup.png`
Vorgehen: Element für Element. Erst wird das Element richtig erkannt, dann werden die Funktionen festgelegt.

## Globale Vorgaben

- Zielauflösung Desktop: Standard, 1920x1080.
- Alles muss responsive und mobiltauglich sein, jedes Element.
- Das Mockup zeigt nur Desktop. Mobile Varianten werden von uns abgeleitet.
- Zunächst feste Werte (hard-coded). Dynamisch machen wir sie später.

## Reihenfolge der Elemente (alle als richtig erkannt)

1. Header: **festgelegt**
2. Hero: **festgelegt**
3. Filter-Sidebar (Kategorien, Einsatzgewicht, Preisspanne, Marke, Verfügbarkeit, Reset): offen, in Arbeit
4. Produktliste (Kopfzeile mit Anzahl und Sortierung, Produktkarten, "Mehr Produkte anzeigen"): offen
5. Unsere Dienstleistungen: offen
6. CTA-Banner: offen
7. Footer: im Mockup nicht vorhanden, offen

---

## 1. Header: festgelegt

**Logo**
- Logo "BAUTECH – Maschinen & Service" ist ein Platzhalter und wird später ersetzt.
- Klick führt zur Startseite.

**Navigation**
- Punkte: PRODUKTE, DIENSTLEISTUNGEN, ÜBER UNS, KONTAKT.
- Jeder Punkt ist eine eigene Seite, keine Anker.
- Keine Untermenüs. Die Kategorien werden über die Kategorien-Karte in der Filter-Sidebar gesteuert, nicht über den Header.
- Der Unterstrich markiert automatisch den Punkt der aktuellen Seite.

**Telefon und Öffnungszeiten**
- Nummer "+49 123 4567890" und die Zeiten "Mo – Fr: 7:00 – 17:00 Uhr" sind zunächst hart kodiert.
- Klick auf die Nummer ruft per `tel:`-Link an, vor allem mobil.

**Scrollverhalten**
- Der Header bleibt beim Scrollen oben kleben (sticky).
- Beim Scrollen wird er kleiner, und das Logo entfällt.

**Mobil**
- Navigation klappt über ein Burger-Menü auf.
- Normal: Logo links, Burger-Icon rechts. Daneben ein Telefon-Icon ohne Text, das per Klick anruft. Die Öffnungszeiten stehen im aufgeklappten Menü.
- Beim Scrollen: Der Header wird schmaler und das Logo entfällt. Es bleiben Burger-Icon und Telefon-Icon.

---

## 2. Hero: festgelegt

- Der gesamte Hero-Streifen ist ein einziges Bild, mit Überschrift und Text im Bild. Es gibt keinen echten Text, keinen Button und keinen Link.
- Es wird mit der Next.js-Komponente `<Image>` eingebunden.
- Es gibt genau zwei Bilder: eine breite Desktop-Version und eine hochkante Mobile-Version. Die Mobile-Version liefert der Nutzer selbst.
- Das Bild wird je nach Bildschirmbreite umgeschaltet, zum Beispiel über `<picture>` oder zwei `<Image>` mit Sichtbarkeit per CSS.
- Für Suchmaschinen und Screenreader steht der Inhalt im `alt`-Text, also "Baumaschinen für Profis. Robuste Technik, auf die Sie sich verlassen können. Entdecken Sie unsere Auswahl an Baumaschinen und Dienstleistungen."
- Es soll nur ein Bild geladen werden, nicht beide. Das Bild ist ein Hero-Bild, also mit hoher Ladepriorität (`priority`).

---

## Stand und nächster Schritt

- Header und Hero sind festgelegt.
- Als Nächstes folgt die Filter-Sidebar, Karte für Karte. Zuerst die Kategorien-Karte: 8 Einträge mit Icon, Rütteltechnik ist als ausgewählt hervorgehoben.
- Ich habe der Kategorien-Karte beschrieben, was ich sehe. Die Antwort "richtig erkannt?" steht noch aus.
- Vorgehen bleibt: immer nur ein Element beschreiben und nachfragen, erst nach Bestätigung weiter.
