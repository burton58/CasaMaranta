# Casa Maranta – Gästemappe Web-App

## Dateien

| Datei | Beschreibung |
|---|---|
| `index.html` | Haupt-HTML der App |
| `style.css` | Alle Styles (Orange/Dunkelblau wie Beispiel-Screenshots) |
| `app.js` | Logik: Sprache, Navigation, Inhalte, Karte, Suche |

## Einrichten vor dem Hochladen

### 1. Google Maps API Key

Um die Karte zu aktivieren, benötigen Sie einen kostenlosen Google Maps API Key:

1. Gehen Sie zu [console.cloud.google.com](https://console.cloud.google.com)
2. Neues Projekt erstellen → "APIs & Services" → "Anmeldedaten"
3. "Maps JavaScript API" aktivieren
4. API Key erstellen und ggf. auf Ihre Domain beschränken
5. In `index.html` ganz unten ersetzen Sie:
   ```
   key=YOUR_API_KEY
   ```
   durch Ihren echten Key.

### 2. Hintergrundbild Home-Screen

Legen Sie ein Foto Ihres Hauses als `Resources/home-bg.jpg` ab (Empfehlung: ~1200×800 px). Ohne Bild erscheint ein dunkler Hintergrund.

### 3. Hosting auf Jimdo (oder ähnlich)

- **Jimdo**: Nicht geeignet für eigene HTML/CSS/JS Dateien auf dem Gratisplan.
- **Empfohlene kostenlose Alternativen:**

#### Option A – GitHub Pages (empfohlen, 100% kostenlos)
1. Kostenloses Konto auf [github.com](https://github.com)
2. Neues Repository erstellen (z.B. `casa-maranta-app`)
3. Alle 3 Dateien (`index.html`, `style.css`, `app.js`) + den Ordner `Resources/` hochladen
4. In den Repository-Einstellungen → "Pages" → Branch `main` / `/ (root)` aktivieren
5. Ihre App ist erreichbar unter: `https://IHR-USERNAME.github.io/casa-maranta-app`

#### Option B – Netlify Drop (einfachster Weg)
1. Gehen Sie zu [netlify.com/drop](https://app.netlify.com/drop)
2. Den gesamten Projektordner (`CasaMarantaApp`) per Drag & Drop auf die Seite ziehen
3. Sofort online unter einer automatisch generierten URL (z.B. `brilliant-app-123.netlify.app`)
4. Optional: eigene Domain verknüpfen

#### Option C – Vercel
Ähnlich wie Netlify, ebenfalls kostenlos: [vercel.com](https://vercel.com)

---

## Inhalte anpassen

Alle Texte sind direkt im `app.js` unter `DETAIL_PAGES` in Deutsch und Englisch vorhanden.

- Check-in/Check-out Zeiten: in `index.html` (`.co-time`) und `app.js` (`arrival`-Section)
- Neue Aktivitäten/Restaurants: Funktion `renderPlaceCard()` in `app.js` verwenden
- GPS-Koordinaten der Kartenmarkierungen: `MAP_PLACES` Array am Anfang des Maps-Abschnitts in `app.js`

## Sprachen

Die App startet in der zuletzt gewählten Sprache (gespeichert im Browser). Standard: Deutsch.
Umschalten oben rechts auf dem Startbildschirm (DE / EN).
