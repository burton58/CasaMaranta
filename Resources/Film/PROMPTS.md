# Login-Trickfilm — wie die Clips entstanden sind

Sieben Clips à ca. 5 Sekunden, die hinter dem Login hintereinander laufen.
Der letzte löst in das Haus auf, danach steht «Casa Maranta».

Erzeugt **lokal in ComfyUI** auf diesem Rechner — nicht mit einem Onlinedienst.

---

## Das Rezept

Zwei Schritte pro Clip, in einem einzigen Workflow verkettet:

1. **Z-Image Turbo** malt das Startbild (Strichzeichnung, 576×1024, 9 Steps)
2. **MiniMax Hailuo 3** animiert dieses Bild zu 124 Frames bei 24 fps (≈ 5,2 s)

Der Umweg über ein selbst erzeugtes Startbild ist Absicht: weil ich den ersten
Frame kontrolliere, bleiben alle sieben Clips im selben Strich. Reines
Text-zu-Video driftet dagegen von Clip zu Clip auseinander.

**Modelle** (alle schon installiert):

| Rolle | Datei |
|---|---|
| Bildmodell | `z_image_turbo_bf16.safetensors` |
| Text-Encoder Bild | `qwen_3_4b.safetensors` (Typ `qwen_image`) |
| VAE Bild | `ae.safetensors` |
| Videomodell | `minimax_h3_fl2va_pruned_int8_convrot.safetensors` |
| Text-Encoder Video | `qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors` (Typ `minimax`) |
| VAE Video | `minimax_h3_video_vae_fp16.safetensors` |

Rechenzeit auf der RTX 5070 Ti: rund 3–5 Minuten pro Clip.

## Drei Clips folgen echten Fotos

Die Clips 01 (Viadukt), 04 (Lago di Saoseo) und 06 (Poschiavo) sind nicht frei
erfunden, sondern aus echten Fotos abgeleitet — sie liegen in `Resources/Pics`
als `rhb.jpg`, `Lago saoseo.jpg` und `poschiavo.jpg`.

Ablauf: Foto -> gezielter Ausschnitt (`ImageCrop`) -> auf 576x1024 skalieren ->
`VAEEncode` -> KSampler mit **denoise 0.85**. Das ist der Kompromiss, der beides
haelt: die Komposition der Vorlage und den Strichstil. Darunter (0.70) bleibt das
Bild farbig und fotografisch, darueber verliert es die Vorlage.

**Der Ausschnitt ist entscheidend.** Ein mittiger Schnitt von `poschiavo.jpg`
schneidet den Zwiebelturm weg — die beiden Tuerme stehen links der Bildmitte.
Deshalb `x: 75, w: 290` statt `crop: center`. Ohne das legt das Modell die
beiden Tuerme zu einer Kirche zusammen, was falsch ist: es sind zwei getrennte
Bauten.

Canny-Kantenerkennung wurde probiert und verworfen — bei so dichten Motiven wird
jedes Blatt und jeder Dachziegel zur Kante, das Motiv ersaeuft im Rauschen.

## Selbst neu würfeln

Die fertigen Workflows liegen in `workflows/01.json` … `07.json`. Einfach in
ComfyUI hineinziehen — sie enthalten Prompt, Seed und alle Einstellungen.

Willst du eine Szene anders: **`seed` in Node 7** (Startbild) oder
**`seed` in Node 16** (Bewegung) ändern und neu laufen lassen. Node 7 ändert
das Bild, Node 16 nur die Bewegung darin.

---

## Eigene Startbilder verwenden

Wenn du ein Startbild selbst zeichnest oder anderswo erzeugst:

| | |
|---|---|
| Aufloesung | **576 x 1024 px** (9:16 hochkant) |
| Farben | **weisse Linien auf reinem Schwarz** |
| Dateityp | **PNG** |

Nur das Schwarz ist wirklich zwingend — siehe naechster Abschnitt. PNG statt
JPEG, weil JPEG genau an harten Hell-Dunkel-Kanten Artefakte erzeugt, also
ueberall dort, wo bei einer Strichzeichnung die Linien sind.

**Die Aufloesung musst du aber nicht treffen.** `workflows/eigenes-bild.json`
skaliert und beschneidet jedes Format automatisch auf 576x1024 (mittiger
Ausschnitt). Getestet mit einem 768x1344-Bild: kommt korrekt als 576x1024
heraus. Bei stark abweichendem Seitenverhaeltnis wird entsprechend
beschnitten — bei Querformat also viel; dann besser vorher selbst hochkant
zuschneiden, damit du bestimmst, was drin bleibt.

So gehst du vor:

1. Bild in ComfyUI hochladen (LoadImage-Node, Knopf "choose file to upload")
2. `workflows/eigenes-bild.json` hineinziehen
3. Im LoadImage-Node dein Bild waehlen
4. Im Prompt von Node 14 beschreiben, **was sich bewegen soll** — nicht, was zu
   sehen ist. Das Bild steht ja schon fest.
5. Ergebnis als `01.mp4` … `07.mp4` in `Resources/Film/` ablegen

Willst du eine andere Aufloesung: `width`/`height` in Node 21 **und** Node 14
gleich setzen, beide Werte durch 32 teilbar.

## Warum weiss auf schwarz

Keine Geschmacksfrage. Der Player blendet das Schwarz mit
`mix-blend-mode: screen` weg, damit die Zeichnung frei auf dem Schiefer liegt —
ohne Videokasten, ohne Rand. Schwarze Linien auf weissem Grund würden ein
weisses Rechteck mitten in den Login setzen.

---

## Die sieben Szenen

Pro Szene ein **Bild-Prompt** (was zu sehen ist) und ein **Bewegungs-Prompt**
(was passiert). Beide hängen denselben Style-Block an — das ist der Grund,
warum die Clips aneinander passen.

**Style-Block Bild:**

```
Style: 2D hand-drawn line animation still, pure white ink lines on a solid pure
black background. One consistent medium line weight throughout. No shading, no
fills, no grey tones, no colour, no gradients. Clean confident strokes, like a
Swiss pictogram or a fine engraving. Vertical composition. No text, no letters,
no numbers, no logos, no watermark, no signature.
```

**Style-Block Bewegung:**

```
2D hand-drawn line animation, pure white ink lines on a solid pure black
background, one consistent line weight, no shading, no colour, no text. Calm
continuous motion.
```

| # | Szene | Bewegung |
|---|---|---|
| 01 | Schmalspurzug auf hohem Steinviadukt über einem Tal | Zug fährt von links nach rechts, Wolken ziehen, Kamera folgt |
| 02 | Wanderer mit Stöcken auf Gratweg zu einem Wegweiser | geht stetig vorwärts, Gras im Wind, feste Kamera |
| 03 | Mountainbiker auf Singletrail, tiefe Kamera | fährt auf den Betrachter zu, Steine spritzen, Lärchen rauschen vorbei |
| 04 | Bergsee mit Lärchen, Murmeltier auf einem Block | Wellen laufen über das Wasser, Murmeltier dreht den Kopf |
| 05 | Vergletscherte Bergflanke, Vogel am Himmel | langsamer Schwenk nach oben, Vogel kreist |
| 06 | Steindorf mit Kirchturm im engen Tal | Rauch aus dem Kamin, Figur quert den Platz, Kamera fährt zurück |
| 07 | Einzelnes Steinhaus mit Balkon und Fensterläden | Kamera fährt heran, Umgebung löst sich auf, bis nur das Haus bleibt — endet im Stillstand |

Szene 07 endet bewusst auf einem ruhigen Standbild: dort landet der Schriftzug.

---

## Ablegen

Als `01.mp4` … `07.mp4` in diesen Ordner. Der Player nimmt automatisch die
vorhandenen Clips — fehlende werden übersprungen, die Reihenfolge steht in
`app.js` unter `LOGIN_FILM`. Weniger Clips gehen auch; drei ergeben schon eine
runde Schleife.

## Wenn ein Clip nicht passt

- **Zu unruhig:** «slow», «calm», «locked-off camera» in den Bewegungs-Prompt
- **Graustufen statt Linien:** «no shading, no grey, line art only» wiederholen
- **Text im Bild:** «no text, no letters, no watermark» ans Ende wiederholen
- **Zu dünne Linien:** «bold confident line weight» ergänzen
