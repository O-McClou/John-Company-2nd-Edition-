# John Company 2E – Spielführer (PWA)

Vollständiger, offline-fähiger Regelbegleiter für **John Company Second Edition** als Progressive Web App.

## 📱 Features

- **Vollständiger Spielführer** – alle 9 Phasen Schritt für Schritt
- **Offline-Betrieb** – nach der ersten Ladung kein Internet mehr nötig (echter PWA-Service-Worker)
- **iOS & Android Homescreen** – als App installierbar
- **Dunkelmodus** 🌙/☀️ – Einstellung wird gespeichert
- **Swipe-Gesten** – links/rechts wischen navigiert zwischen Schritten
- **Indien-Ereignis-Assistent** – interaktiver Schritt-für-Schritt-Guide für Phase VII
- **Setup-Guide** – Szenarien erklärt, Aufbau-Checklisten
- **Schnellreferenz** – Erfolgstest, Verhandlungen, Schlusswertung jederzeit abrufbar
- **Querverweise** – interaktive Akkordeons für verwandte Regeln
- **Errata eingearbeitet** – alle offiziellen Korrekturen mit Badge markiert
- **Session-Wiederherstellung** – beim erneuten Öffnen an der letzten Stelle weiterarbeiten

## 📂 Dateien für GitHub Pages

| Datei | Beschreibung |
|-------|--------------|
| `index.html` | Die komplette App (Single File) |
| `manifest.json` | PWA-Manifest (Icons, Name, Farben) |
| `sw.js` | Service Worker für Offline-Betrieb |
| `icon.png` | App-Icon 180×180 (iOS Touch Icon) |
| `icon-192.png` | App-Icon 192×192 (Android/Chrome) |
| `icon-512.png` | App-Icon 512×512 (Splash Screen) |

## 🚀 Deployment auf GitHub Pages

1. Neues Repository auf GitHub erstellen
2. Alle 6 Dateien in den **root-Ordner** des Repositories hochladen
3. In den Repository-Einstellungen: **Settings → Pages → Source: main branch / root**
4. Nach ca. 1–2 Minuten ist die App unter `https://DEINNAME.github.io/REPONAME/` erreichbar
5. Auf dem iPhone: Safari öffnen → Teilen-Menü → **„Zum Home-Bildschirm"** → App erscheint wie eine native App

## 🔧 Einmalige Erstinstallation (iOS)

1. URL in **Safari** öffnen (kein Chrome/Firefox – nur Safari unterstützt PWA-Installation auf iOS)
2. Teilen-Symbol (□↑) antippen
3. **„Zum Home-Bildschirm hinzufügen"** wählen
4. Die App erscheint mit dem Anker-Icon auf dem Homescreen
5. Beim nächsten Start läuft alles offline

## ✅ Was wurde verbessert (diese Version)

### PWA / Offline
- ✅ `manifest.json` mit korrekten Icons, Name, Farben, Orientation
- ✅ `sw.js` Service Worker mit Cache-First-Strategie + Stale-While-Revalidate
- ✅ `<link rel="manifest">` und `theme-color` Meta-Tag in index.html
- ✅ Update-Banner wenn neuer Service Worker verfügbar
- ✅ Automatischer Reload nach SW-Aktivierung

### Aufzählungen & Struktur (Punkt 5)
- ✅ Ruhestand: Reihenfolgeregeln als strukturierte Liste
- ✅ Prestige-Karten: Kartentypen ausführlicher erklärt mit allen Details
- ✅ Parlament: Abstimmungsregeln als strukturierte Liste statt Fließtext
- ✅ Ergebnis der Abstimmung als Bullet-Liste statt Infoboxen

### Errata (Punkt 6)
- ✅ PM-Abstimmung beim Deregulierungsgesetz: Hinweis mit ERRATA-Badge prominent
- ✅ Regionsverlust: Hinweis zu Auftragsschließung je Ereignistyp (ERRATA-Badge)
- ✅ Alle bereits eingearbeiteten Errata bleiben erhalten

### Querverweise (Punkt 9)
- ✅ Vorsitz: Akkordeon „Schulden & Vermögen" mit Links zu Phase VI
- ✅ Parlament: Akkordeon „Querverweise – verwandte Mechanismen"
- ✅ Regionsverlust: Errata-Hinweis direkt im Regel-Querverweis-Box

## 🎮 Szenarien

| Szenario | Spieler | Toggles |
|----------|---------|---------|
| 1710 (Einsteiger) | 2–6 | alle aus |
| 1758 (Mittel) | 2–6 | je nach Verlauf |
| 1813 (Fortgeschrittene) | 5–6 | Deregulierung AN |
| Lang 1710 | 2–6 | Deregulierung AN |

## 📖 Lizenz

Das Spiel John Company Second Edition ist © Cole Wehrle / Wehrlegig Games.  
Diese App ist ein inoffizieller Regelbegleiter für den privaten Gebrauch.
