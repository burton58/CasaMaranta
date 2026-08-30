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

## Selbst neu würfeln

Die fertigen Workflows liegen in `workflows/01.json` … `07.json`. Einfach in
ComfyUI hineinziehen — sie enthalten Prompt, Seed und alle Einstellungen.

Willst du eine Szene anders: **`seed` in Node 7** (Startbild) oder
**`seed` in Node 16** (Bewegung) ändern und neu laufen lassen. Node 7 ändert
das Bild, Node 16 nur die Bewegung darin.

---

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
