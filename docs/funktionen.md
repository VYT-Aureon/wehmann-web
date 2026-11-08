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

## 3. Filter-Sidebar: in Arbeit

### Allgemein (gilt für alle Filter-Karten)

- Filterzustand steht in der URL (z. B. `/produkte?kategorie=ruetteltechnik,betontechnik`). Teilbare Links, Zurück-Button funktioniert. Bei zu vielen Parametern später neu überlegen.
- Standard ist "kein Filter": Es werden alle Produkte angezeigt. Gefiltert wird erst nach einem Klick.
- Mobil: Die Sidebar wird durch einen Filter-Icon-Button ersetzt, der die Filter in einem Panel öffnet. (Genaues Panel-Verhalten noch offen.)

### Karte "Kategorien": festgelegt

- Überschrift "KATEGORIEN", Einträge mit Icon. Im Mockup 8 Stück: Rütteltechnik, Betontechnik, Verdichtung, Schneiden & Trennen, Heben & Fördern, Reinigungstechnik, Stromerzeuger, Zubehör.
- Die Liste ist erweiterbar und kürzbar, also datengetrieben und nicht fest im Layout verdrahtet.
- Multiselect: Mehrere Kategorien können gleichzeitig aktiv sein.
- Kein "Alle"-Eintrag. Ohne Auswahl wird alles angezeigt.
- Im Mockup ist "Rütteltechnik" hervorgehoben. Das ist nur der Zustand "ausgewählt" und kein Standard.
- Hinter jeder Kategorie steht die Anzahl der Produkte in dieser Kategorie, z. B. "Rütteltechnik (12)".

---

## Stand und nächster Schritt

- Header, Hero und Kategorien-Karte sind festgelegt.
- Die weiteren Filter-Karten (Einsatzgewicht, Preisspanne, Marke, Verfügbarkeit, Reset) werden später festgelegt.
- Als Nächstes folgt die Produktliste (Element 4).
- Vorgehen bleibt: immer nur ein Element beschreiben und nachfragen, erst nach Bestätigung weiter.
