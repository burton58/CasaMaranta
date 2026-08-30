# Login-Trickfilm — Prompts für Seedance 2.0

Sieben kurze Clips, die hintereinander hinter dem Login laufen. Der letzte
löst in das Haus auf, danach steht «Casa Maranta».

## Wichtig für alle Clips

**Format:** 9:16 hochkant (der Login ist immer hochkant, auch am Desktop im Telefonrahmen)
**Länge:** ca. 5 Sekunden
**Export:** MP4 (H.264), Zielgrösse **unter 2 MB pro Clip**

**Weisse Linien auf reinem Schwarz** — nicht umgekehrt. Die App blendet das
Schwarz weg (`mix-blend-mode: screen`), sodass die Zeichnung frei auf dem
dunklen Schiefer liegt. Schwarze Linien auf Weiss würden einen weissen Kasten
ergeben.

---

## Style-Block

Diesen Block **wörtlich an jeden Prompt anhängen** — nur so schneiden die
Clips sauber aneinander:

```
Style: 2D hand-drawn line animation, pure white ink lines on a solid pure black
background. One consistent medium line weight throughout. No shading, no fills,
no grey tones, no colour, no gradients. Clean confident strokes, like a Swiss
pictogram or a fine engraving. Calm continuous motion, slow deliberate camera.
Vertical 9:16. No text, no letters, no numbers, no logos, no watermark, no
signature, no UI elements, no human faces in close-up.
```

---

## 1 · Die Rätische Bahn

```
A small narrow-gauge train crosses a tall curved stone viaduct high above a
steep alpine valley, moving slowly from left to right. Spruce forest far below,
layered mountain ridges behind. The train is drawn as a simple chain of
connected carriages. The camera pans gently to follow it; thin clouds drift
across the ridges.
```

## 2 · Wandern

```
A lone hiker with a backpack and trekking poles walks steadily up a narrow
ridge path towards a wooden signpost carrying two pointed arrow plates. Layered
mountain silhouettes recede behind. Grass bends in the wind, clouds move slowly
across the sky. The camera holds still as the hiker walks into frame and past
the signpost.
```

## 3 · Mountainbike

```
A mountain biker races down a winding alpine singletrack towards the viewer,
leaning into a turn, small stones flicking up behind the rear wheel. Larch
trees rush past on both sides. Low camera angle close to the trail, slight
shake, strong sense of speed.
```

## 4 · Bergsee

```
A still alpine lake ringed by larch trees and rocky peaks. Slow ripples spread
across the water surface. A marmot sits upright on a boulder in the foreground
and turns its head. Reflections of the peaks shift gently on the water. The
camera drifts very slowly forward.
```

## 5 · Die Berge

```
A slow upward tilt across a huge glaciated mountain face: rock ribs, snowfields
and a hanging glacier with crevasses. A single bird circles in wide arcs. Thin
cloud passes across the summit. Nothing else moves.
```

## 6 · Das Dorf im Tal

```
A stone alpine village of steep roofs and shuttered facades packed into a
narrow valley, a church tower rising in the middle. Smoke curls from one
chimney. A small figure crosses the square. The camera pulls slowly back to
reveal the mountains enclosing the whole valley.
```

## 7 · Finale — das Haus

Diesen Clip zuletzt generieren und darauf achten, dass er **auf einem ruhigen
Standbild endet** — dort wird der Schriftzug eingeblendet.

```
The camera pushes in slowly on a single alpine stone house with a wooden
balcony and shuttered windows, standing at the edge of a village with mountains
behind. The surrounding drawing gradually thins away line by line until only
the house remains, centred in frame. All motion settles and the image comes to
a complete standstill in the final second.
```

---

## Ablegen

Als `01.mp4` … `07.mp4` in diesen Ordner (`Resources/Film/`). Der Player nimmt
automatisch die Clips, die vorhanden sind — fehlende werden übersprungen. Die
Reihenfolge steht in `app.js` unter `LOGIN_FILM`.

Weniger Clips gehen auch: schon drei ergeben eine runde Schleife.

## Falls ein Clip nicht passt

- **Zu unruhig:** «slow», «calm», «locked-off camera» verstärken
- **Graustufen statt Linien:** «no shading, no grey, line art only» wiederholen
- **Text im Bild:** «no text, no letters, no watermark» ans Ende wiederholen
- **Zu dünne Linien:** «bold confident line weight» ergänzen
