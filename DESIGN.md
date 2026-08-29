---
name: Casa Maranta
description: A guest guide built as a Swiss trailhead signpost — every destination named on its own yellow enamel plate.
colors:
  slate: "#14181C"
  slate-deep: "#0C0F12"
  slate-up: "#1D2329"
  slate-line: "#2A3138"
  yellow: "#FFCC00"
  yellow-hi: "#FFD629"
  yellow-deep: "#D9AB00"
  enamel: "#F4F2EC"
  enamel-dim: "rgba(244, 242, 236, 0.64)"
  enamel-faint: "rgba(244, 242, 236, 0.60)"
  blaze: "#E30613"
  blaze-light: "#FF6B5E"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(30px, 8.6vw, 40px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 84"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
    fontSize: "27px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 84"
    fontFeature: "tabular-nums"
  section-heading:
    fontFamily: "Archivo, ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
    fontSize: "12.5px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 82"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
    fontSize: "16.5px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.012em"
    fontVariation: "'wdth' 92"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  action-label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
    fontSize: "11.5px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.12em"
    fontVariation: "'wdth' 82"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
    fontSize: "10.5px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
    fontVariation: "'wdth' 82"
  measure:
    fontFamily: "Archivo, ui-sans-serif, system-ui, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.05em"
    fontVariation: "'wdth' 78"
    fontFeature: "tabular-nums"
rounded:
  hairline: "2px"
  plate: "3px"
  shell: "30px"
spacing:
  plate: "58px"
  gap: "9px"
  pad: "20px"
  void: "42px"
  point: "18px"
  bar: "56px"
  nav: "66px"
components:
  plate:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.slate}"
    typography: "{typography.title}"
    rounded: "{rounded.plate}"
    padding: "0 20px 0 35px"
    height: "{spacing.plate}"
  plate-hover:
    backgroundColor: "{colors.yellow-hi}"
    textColor: "{colors.slate}"
  plate-out:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.slate}"
    typography: "{typography.title}"
    rounded: "3px 0 0 3px"
    padding: "0 38px 0 35px"
    height: "{spacing.plate}"
  plate-blaze:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.slate}"
    typography: "{typography.title}"
    rounded: "3px 0 0 3px"
    padding: "0 50px 0 35px"
    height: "{spacing.plate}"
  plate-action:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.slate}"
    typography: "{typography.title}"
    rounded: "{rounded.plate}"
    padding: "0 20px 0 35px"
    height: "{spacing.plate}"
  place-plate:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.slate}"
    typography: "{typography.title}"
    rounded: "3px 0 0 3px"
    padding: "0 38px 0 35px"
    height: "{spacing.plate}"
  place-plate-hover:
    backgroundColor: "{colors.yellow-hi}"
    textColor: "{colors.slate}"
  search-result-plate:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.slate}"
    typography: "{typography.title}"
    rounded: "{rounded.plate}"
    padding: "11px 20px 11px 35px"
    height: "50px"
  action-button:
    backgroundColor: "transparent"
    textColor: "{colors.yellow}"
    typography: "{typography.action-label}"
    rounded: "{rounded.hairline}"
    padding: "0 17px"
    height: "42px"
  action-button-hover:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.slate}"
  notice:
    backgroundColor: "{colors.slate-up}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.plate}"
    padding: "16px 20px 16px 35px"
  checklist-item:
    backgroundColor: "{colors.slate-up}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.plate}"
    padding: "13px 15px"
  checklist-item-checked:
    backgroundColor: "rgba(255, 204, 0, 0.07)"
    textColor: "{colors.enamel-faint}"
    rounded: "{rounded.plate}"
    padding: "13px 15px"
  nav-item:
    backgroundColor: "{colors.slate-deep}"
    textColor: "{colors.enamel-faint}"
    typography: "{typography.label}"
    height: "{spacing.nav}"
  nav-item-active:
    backgroundColor: "{colors.slate-deep}"
    textColor: "{colors.yellow}"
    typography: "{typography.label}"
    height: "{spacing.nav}"
  text-input:
    backgroundColor: "transparent"
    textColor: "{colors.enamel}"
    rounded: "{rounded.hairline}"
    padding: "0 15px"
    height: "52px"
  text-input-focus:
    backgroundColor: "transparent"
    textColor: "{colors.enamel}"
    rounded: "{rounded.hairline}"
---

# Design System: Casa Maranta

## Overview

**Creative North Star: "Wanderweg"**

The guide is the yellow signpost standing at the trailhead. Everything a guest might want is a named destination on its own enamel plate, bolted to a steel mast in the order you would meet it — and the plates are cut to the length of their names, so the stack ends in a ragged right edge rather than a tidy column. This is the refusal at the centre of the system: no icon-tile grid, no equal-width cards, no dashboard. A guest looking for the WiFi reads a signpost, not a control panel.

The ground is wet slate, the near-black of a rain-soaked path at dusk, and the plates are signal yellow — the same yellow the valley's own signage uses. Four values carry the whole world and nothing gets a fifth: slate, yellow, enamel white, and route-blaze red held in reserve for emergencies. There are no gradients anywhere. Depth is physical rather than atmospheric: a hard 2px lip in a darker yellow under every plate, as if the enamel were standing proud of the metal behind it, plus a soft shadow cast onto the slate.

Type is a single family — Archivo variable — and every difference in voice comes from the width axis rather than from a second typeface. Names on plates run wide and confident (wdth 92); distances and measured facts run narrow and clipped (wdth 78); the house name is routed into the post head at 800 weight. The result reads as one signmaker's hand across the whole guide. Anything that is not a destination — prose, notices, appliance instructions — sits on slate and is grouped by hairlines and spacing, never by drawing a box around it.

**Key Characteristics:**
- Signal-yellow enamel plates on wet-slate ground; four values, no fifth, no gradients.
- Plates cut to their names, bolted to a visible steel mast — ragged right edge, never a grid.
- Every plate is an arrow; a distance stamped in the tail marks the ones pointing out of the house.
- Red route-blaze is emergency-only and never appears as body text.
- One typeface, Archivo, with the width axis (78–96) doing the work a second family would.
- Grouping by rule and spacing, not by boxes.
- The first viewport is the journey itself: a live-drawn Streckenplan of the ride from Zürich over the Bernina into Poschiavo, ending in a 15-minute walking trail at the post.

## Colors

A four-value alpine palette: a near-black wet slate, one signal yellow, one warm enamel white, and a red held back for emergency. Every other value in the stylesheet is a step of one of these, never a new hue.

### Primary
- **Signal Yellow** (`#FFCC00`): The enamel of every plate. It carries destinations, the active nav item, section-heading rules, links inside prose, list markers, icons on slate, checked ticks, and the caret in text fields. It is the one colour that means "this is where you go."
- **Lit Enamel** (`#FFD629`): The hover state of a plate — the same enamel catching a little more light. Never used at rest.
- **Baked Enamel** (`#D9AB00`): The hard 2px lip beneath every plate and the underline under contact links. It is structural, the shadow the enamel casts on its own edge; never a fill and never text.

### Secondary
- **Route Blaze** (`#E30613`): The red of a Bergweg waymark. Reserved absolutely to the emergency plate's red-white-red tip. It appears nowhere else in the app.
- **Blaze Light** (`#FF6B5E`): The text-safe blaze. Used for the emergency number itself in the contacts list and for the login error line — the only places blaze language is allowed to become words.

### Neutral
- **Wet Slate** (`#14181C`): The ground. Every screen background, the top bar (at 86% with a 14px blur), the modal card, and the ink on yellow plates.
- **Slate Deep** (`#0C0F12`): The surround behind the app — the html/body backdrop and the bottom nav bar. It reads as the space the signpost stands in.
- **Slate Raised** (`#1D2329`): The one raised surface: notices, the WiFi QR panel, checklist rows, the map filter panel, and the icon-button hover wash.
- **Slate Line** (`#2A3138`): Every hairline and every mast. Section dividers, the borders of raised surfaces, the top rules that group contact and appliance blocks, the scrollbar thumb, and the 12px steel post the plates bolt to.
- **Enamel White** (`#F4F2EC`): All body text, headings on slate, the white band of the blaze, and the border around the WiFi QR code. Slightly warm, so it reads as painted enamel rather than screen white.
- **Enamel Dim** (64% enamel): Secondary prose, small print inside notices, inactive language buttons, the modal close icon, empty-search copy.
- **Enamel Faint** (60% enamel): The quietest tier — all-caps micro-labels, input placeholders, inactive nav items, and completed checklist text.

### Named Rules
**The Four Values Rule.** Slate, yellow, enamel, blaze. Every other token in the stylesheet is a lightness step of one of those four or an alpha of enamel. A new screen may not introduce a fifth hue — not a success green, not an info blue, not a warning orange. Category, state, and emphasis are carried by shape, position, and width axis instead.

**The Blaze Reservation Rule.** Route-blaze red (`#E30613`) means emergency and nothing else. It exists only as the red-white-red band on the tip of the emergency plate. It is never a background, never a border, never body text. Where emergency information must be *read* rather than *flagged*, use the lighter blaze (`#FF6B5E`), which clears contrast on slate.

**The Yellow Marks the Edge Rule.** Outside of plates, yellow marks an edge and never floods a field. Notices get a 2px yellow top border and a yellow bolt dot; the prose inside them stays enamel on slate, where it reads. No paragraph of running text is ever set on a yellow ground.

## Typography

**Display Font:** Archivo Variable (with `ui-sans-serif`, `system-ui`, Segoe UI, sans-serif)
**Body Font:** Archivo Variable — the same family; there is no second face anywhere in the system.
**Axes in use:** width 62–125 available, roughly 78–96 used; weight 400–800.

**Character:** A grotesque with a signmaker's discipline — squared-off, high x-height, and legible at a glance in bad light. Because the width axis is live, the family behaves like a whole signage kit: narrow for stamped measurements, wide for painted destination names, heavy and slightly condensed for the routed house name. Weight synthesis is switched off (`font-synthesis-weight: none`) so the real axis always wins.

### Hierarchy
- **Display** (800, fluid 30–40px, `wdth 84`, line-height 0.98): The house name, routed into the post head on the home screen and the login screen. Used exactly twice.
- **Headline** (700, 27px, `wdth 84`, tabular numerals): Check-in and check-out times in the post foot. The only place a large numeral appears.
- **Section Heading** (700, 12.5px, `wdth 82`, `0.14em`, uppercase, yellow): Detail-page section titles and modal titles. Sits above a 2px yellow rule — the routed strip at the top of a board.
- **Title** (700, 16.5px, `wdth 92`, `-0.012em`, line-height 1.2): The destination name on a plate, and the label on a disclosure row. The widest setting in the system; these are painted names, and they should feel painted.
- **Body** (400, 16px, line-height 1.7, max 68ch): Detail-page prose. Place descriptions and disclosure bodies run one step tighter (15.5px / 1.68, max 66ch), which is the reading size for content nested inside a destination.
- **Action Label** (700, 11.5px, `wdth 82`, `0.12em`, uppercase): Outline buttons — Route/Directions and the WiFi QR reveal.
- **Label** (700, 10.5px, `wdth 82`, `0.12em`, uppercase, enamel-faint): Micro-labels above a value — check-in/check-out captions, WiFi field names, contact group headings, search result group titles.
- **Measure** (700, 12px, `wdth 78`, `0.05em`, uppercase, tabular numerals, 78% opacity): Distances and walking times on the right end of a pointed plate. The narrowest setting in the system, because a measurement is stamped, not painted.

### Named Rules
**The Width-Axis Rule.** Hierarchy comes from the width axis before it comes from size, and always before it comes from a second family. Wide (`wdth 90–96`) means a name you go to; narrow (`wdth 78–84`) means a measurement, a label, or a caption. Never solve a hierarchy problem by adding a typeface.

**The Stamped Numeral Rule.** Every number a guest reads and compares — clock times, distances, walking times, the WiFi password — is set with `font-variant-numeric: tabular-nums`. Numerals in this system are stamped into metal and therefore have to line up.

## Layout

The whole app is a single fixed-viewport phone shell. Screens are `position: fixed` panes inset to the bottom nav, only one active at a time, each scrolling independently with contained overscroll; the document itself never scrolls.

Spacing derives nominally from one governing constant, `--plate: 58px` — the height of a signpost plate. From it come the rhythm tokens: the gap between stacked plates (`--gap`, ~9px), the standard edge and inner padding (`--pad`, ~20px), the separation between sections (`--void`, ~42px), the depth of a plate's point (`--point`, ~18px), the top bar (`--bar`, ~56px), and the bottom nav (`--nav`, ~66px). Be clear about what this does and does not mean: the constant governs the layout rhythm — plate height, stack gaps, page gutters, section breaks, bar heights — while roughly forty component-level values (icon sizes, checklist paddings, QR dimensions, individual type sizes) are still hard-coded px. Derive new *layout* measurements from `--plate`; do not claim the whole system is a derived scale.

The signpost is the system's one real layout structure. Plates are `width: auto` inside a `flex-start` column, so each is exactly as wide as its name, and a 12px `--slate-line` mast is absolutely positioned behind them at the bolt-hole x-position (`calc(--pad + --pad * 0.62 + 4.5px - 6px)`), reading through the gaps between plates. Plates that point outward are pushed away from the house plates by an extra `calc(--void * 0.6)`, so the stack visibly separates "in here" from "out there". Content pages use a left rail instead: prose and nested plates indent to `calc(--pad * 1.75)`, the same 35px the bolt hole occupies, so the whole page hangs off the same invisible line the mast stands on.

Grouping inside content is done with rules and space, never with containers. Contact blocks, WiFi blocks, and appliance disclosures are `border-top: 1px solid` and nothing else — no background, no border box, no radius. The one deliberate exception is the notice, which is a raised laminated card with a yellow top edge.

Above **620px** the app renders inside a fixed 390 × 844 phone frame, centred on the slate-deep backdrop with a 30px radius and a deep cast shadow. This is a standing product rule, not a missing desktop layout: the guide is read one-handed on a phone in the house, and the desktop view presents it as the phone it is.

### Named Rules
**The Plate Constant Rule.** `--plate: 58px` is the governing measure. Any new layout rhythm — a stack gap, a gutter, a section break, a bar height — is expressed as a multiple of it, not as a fresh px value.

**The Ragged Edge Rule.** Plates in a signpost stack are cut to their names (`width: auto`). Never stretch them to a common width, never right-align them into a column, and never let the mast be hidden behind a full-width block. The uneven right edge is the evidence that these are signs, not buttons.

**The Phone Frame Rule.** At `min-width: 620px` the app is a 390 × 844 device on a dark ground. Do not build a wide desktop layout; build the phone better.

## Elevation & Depth

Depth here is mechanical, not atmospheric. A plate does not float — it is bolted through, standing proud of the mast, and casting a shadow onto the slate behind it. Every raised element combines a **hard offset lip** in baked yellow (`0 2px 0`) with a **soft cast shadow**, and hovering deepens *both*: the lip doubles to 4px as the plate lifts 2px, the cast shadow widens. Pressing collapses the lip to 1px and pushes the plate 1px down. Nothing glows, and nothing uses a blur to imply importance. Backdrop blur appears in exactly three places where a surface genuinely sits over content: the sticky top bar, the search bar, and the modal backdrop.

### Shadow Vocabulary
- **Plate at rest** (`box-shadow: 0 2px 0 var(--yellow-deep), 0 6px 16px rgba(0,0,0,0.4)`): Every interactive plate in a signpost stack or modal list.
- **Plate lifted** (`box-shadow: 0 4px 0 var(--yellow-deep), 0 10px 24px rgba(0,0,0,0.48)`): Hover, paired with `translateY(-2px)`.
- **Plate pressed** (`box-shadow: 0 1px 0 var(--yellow-deep), 0 3px 10px rgba(0,0,0,0.4)`): Active, paired with `translateY(1px)`.
- **Plate bolted flat** (`box-shadow: 0 2px 0 var(--yellow-deep)`): Place plates and search-result plates — the lip only, no cast shadow, for plates fixed to a page rather than hanging from a mast.
- **Bolt head** (`box-shadow: inset 0 1px 1px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.35)`): The 9px slate disc at the left of every plate. Countersunk shadow inside, a hairline highlight below.
- **Steel mast** (`box-shadow: inset 1px 0 0 rgba(244,242,236,0.10), 0 0 0 1px rgba(0,0,0,0.55)`): A lit left edge and a dark contour, so the post reads as a round-ish steel section rather than a grey bar.
- **Sheet lift** (`box-shadow: 0 -12px 44px rgba(0,0,0,0.6)`): The bottom-sheet modal card only.
- **Device** (`box-shadow: 0 0 0 1px var(--slate-line), 0 32px 90px rgba(0,0,0,0.7)`): The desktop phone frame.

### Named Rules
**The Bolted-Not-Floating Rule.** Elevation is expressed as a hard-edged lip plus a cast shadow, together. Never ship a soft-only shadow on a yellow plate, and never express state with a glow, an accent ring, or an opacity change where a lip would do.

## Shapes

The form language is sheet metal: near-square corners, straight cuts, and one signature silhouette. Corners are 3px on plates, cards, notices, and photographs, and 2px on the smaller stamped parts — buttons, ticks, checkboxes, the language toggle. The only large radius in the system is the 30px desktop device frame, which is a phone, not a card.

The signature is the **pointed plate**, and every plate is one. A Wegweiser is an arrow, so the silhouette is the object rather than a variant of it: each plate is cut with a `clip-path` chevron — `polygon(0 0, calc(100% - var(--point)) 0, 100% 50%, calc(100% - var(--point)) 100%, 0 100%)` — with the left corners kept at 3px and the right side surrendered to the point. Where a pointed plate names a real mapped place, it carries a real distance stamped in its tail: `distanceLabel()` computes it at runtime from the place's coordinates in `MAP_PLACES` — haversine distance × 1.25 for a plausible path detour, converted to walking minutes at 4.5 km/h. Above a `VALLEY_FLOOR_KM` gate of 3 km the label switches from a time to a distance in km, because beyond the valley floor the ascent is unknown and a walking time would lie.

The emergency plate extends the point into a **Bergweg blaze**: a horizontal red-white-red band filling `calc(--point * 2.1)` at the tip, with the plate's right padding increased so the name never runs under it.

Two other recurring shapes: the **bolt hole**, a 9px slate disc pinned at `calc(--pad * 0.62)` on every plate, every place header, and every notice (in yellow there); and the **chevron**, drawn as two 2px borders on a rotated 9px square rather than as a glyph, used for both disclosure and place-card toggles.

Because `clip-path` erases an outline entirely and every plate is clipped, all plates take their focus ring *inside* — a 3px inset slate ring plus the retained lip and ambient shadow, so the plate keeps its depth while focused.

### Named Rules
**The Every-Plate-Is-An-Arrow Rule.** A Wegweiser is an arrow. Every plate tapers to a point — signpost stacks, sub-destinations, search results, place headers, the primary action. Never ship a square-ended plate, and never add a drawn arrow glyph inside one: the plate already is the arrow, and a chevron beside the point states it twice. What separates a valley destination from a house topic is the distance stamped in its tail, not its silhouette.

**The No-Box Rule.** Content that is not a destination is grouped with a hairline and space, not with a container. `border-top: 1px solid var(--slate-line)` and nothing else. The notice is the single sanctioned exception, and it earns it by being a physically different object — a laminated card pinned to the board.

## Components

### Buttons
- **Shape:** Slightly softened corners (3px) on plates; near-square (2px) on outline buttons and icon buttons.
- **Primary — the Enamel Plate:** Signal yellow ground, slate ink, minimum 58px tall, left padding of 35px to clear the bolt hole, an optional 21px stroked pictogram, the name at `wdth 92`, and an optional stamped measurement at the tail. Full width in the post; auto width in a signpost stack.
- **Hover / Active:** Hover lightens to lit enamel, lifts 2px and doubles the lip; active drops 1px and collapses it. Transitions run 0.18–0.22s on the standard ease.
- **Focus:** a 3px inset slate ring on every plate, since `clip-path` would clip a real outline away.
- **Secondary — Outline Action:** Transparent with a 1.5px yellow border, yellow uppercase action label, 42px tall. Hover inverts to a solid yellow field with slate text. Used for Route/Directions and the WiFi QR toggle.
- **Icon button:** 40px square, transparent, yellow stroked icon, hover washes to slate-raised.

### Cards / Containers
- **Notice:** The only boxed surface. Slate-raised ground, 1px slate-line border, a 2px yellow top edge, 3px radius, and a yellow bolt dot at the top left. Text indents to 35px to clear the dot. Use for a real warning or a real constraint, not for emphasis.
- **Contact / WiFi / Appliance blocks:** Not cards. Transparent, separated only by a 1px slate-line top rule and generous vertical padding.
- **Photographs:** Full width, 3px radius, cover-fitted; 264px max on hero photos, 190px inside a place body.

### Inputs / Fields
- **Search field:** Borderless and transparent inside a sticky 56px blurred bar, 17px enamel text, faint placeholder, yellow caret, a yellow 20px search glyph on the left and a clear button on the right.
- **Password field:** 52px tall, translucent slate ground, 1.5px slate-line border, 2px radius, yellow caret.
- **Focus:** The border goes yellow. No glow, no ring on the field itself.
- **Error:** A reserved 19px line beneath the field, 13px semibold in blaze-light.

### Checklist
- **Row:** Slate-raised, 1px slate-line border, 3px radius, a 23px square 2px-bordered box on the left, 15.5px text.
- **Checked:** The whole row shifts to a 7% yellow wash with a baked-yellow border, the box fills signal yellow with a slate tick, and the text drops to enamel-faint with a baked-yellow strikethrough. State persists in `localStorage`.
- **Focus:** The hidden checkbox rings its adjacent icon with a 3px yellow outline.

### Navigation
- **Bottom bar:** 66px tall on slate-deep with a slate-line top rule, four equal columns, each a 21px stroked icon over a 9.5px uppercase label at `wdth 78`, respecting `env(safe-area-inset-bottom)`.
- **Active:** Label and icon turn signal yellow and a 30px × 3px yellow blaze grows from the top edge via `scaleX(0 → 1)` over 0.28s — the marker that says where on the route you are.
- **Top bar:** Sticky, 56px, 86% slate with a 14px backdrop blur, a slate-line bottom rule, a yellow icon button on the left and a centred 13px uppercase title at `0.14em`.

### Disclosure (appliance section)
A `<details>` row with no box: a 1px slate-line top rule, a title at `wdth 92`, and a chevron drawn from two 2px yellow borders that rotates 90° on open. Open state turns the summary yellow. Body copy sits at 15.5px / 1.68, capped at 66ch.

### Place Plate (signature)
The pointed plate as a page component: a clip-path chevron header in signal yellow carrying the place name, its runtime-computed distance in stamped narrow caps, and a slate chevron; below it, an expanding body with a photograph, description, and a single outline Route button. The header keeps only the lip shadow, so it reads as bolted flat to the page rather than hanging from a mast. Opening animates `body-in` (0.34s, fade plus a 6px rise).

### Map Marker (signature)
Markers are the same signage as the app, drawn as inline SVG data URIs at 44 × 30: a pointed yellow plate with a slate-deep 1.2px outline, a slate bolt at the left anchor point, and a stroked pictogram for the category. Category is read from the pictogram, never from a colour. Only the house inverts — slate plate, yellow ink.

### Motion
- **Easings:** `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`) for all state transitions, and `--settle` (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances. Both are exponential ease-outs: fast departure, long soft arrival.
- **Two authored moments, both arrival stories:**
  - `plate-settle` (0.42s on `--settle`) — each plate arrives from 14px left with a −1.6° tilt and settles square onto the mast, staggered 30ms per plate via a `--i` index. `replayPlates()` re-triggers it every time the signpost is opened.
  - **The journey** — the home screen's Streckenplan draws itself over ~8s: the route paints in signal yellow behind a travelling train dot that eases out of and into every station (per-segment ease-in-out, duration ∝ length^0.75), stations ignite as bolts with a 1.6× pop, real altitudes fade in at the stations that tell the climb, the Ospizio Bernina summit triangle lights at 2253 m, and arrival dissolves into a dashed walking trail (slow 2.6s dash-march) ending at a house glyph — at which point the LOSLEGEN plate gives a single 0.55s lift. Replayed on every return to the home screen; `prefers-reduced-motion` renders the completed map statically.
- **Everything else stays under 0.36s:** backdrop fade 0.24s, sheet-up 0.36s, chevron rotations 0.24–0.26s, colour and background transitions 0.16–0.22s.
- `prefers-reduced-motion: reduce` collapses every animation and transition to 0.01ms.

### Browser Surfaces
The browser chrome is part of the design. Text selection is slate on signal yellow. The global focus ring is a 3px yellow outline offset 2px. Scrollbars are 6px with a slate-line thumb on a transparent track. Text carets are yellow. The document `theme-color` is wet slate.

### Named Rules
**The Bolt Hole Rule.** Every plate, every place header, and every notice carries a 9px disc at `calc(--pad * 0.62)` from its left edge, and its content starts at `calc(--pad * 1.75)` to clear it. That single indent is what makes plates, prose rails, and notices line up on one invisible mast line down the page.

**The Arrival-Stories Rule.** The system owns exactly two authored animations — the home journey and the plate-settle stagger — and both tell the same story: things arriving at their place. Do not add a third; new surfaces either inherit plate-settle or arrive without ceremony.

## Do's and Don'ts

### Do:
- **Do** derive new layout rhythm from `--plate: 58px` — gaps, gutters, section breaks and bar heights are multiples of the plate, not fresh px values.
- **Do** keep the palette to four values (`#14181C`, `#FFCC00`, `#F4F2EC`, `#E30613`) plus their lightness steps. Category and state are carried by shape and width axis, never by a new hue.
- **Do** cut plates to their names (`width: auto`) inside a signpost stack, and keep the 12px slate-line mast visible through the gaps.
- **Do** taper every plate to a point. `.plate--out` no longer changes the silhouette — it marks the plates that lead out of the house, which is carried by the distance in the tail.
- **Do** stamp a real, computed distance on a place plate — `distanceLabel()` from `MAP_PLACES` coordinates. A place with no coordinates gets no number rather than a guessed one.
- **Do** express elevation as a hard `0 2px 0` baked-yellow lip plus a cast shadow, and deepen both on hover.
- **Do** carry hierarchy on Archivo's width axis (78–96) before reaching for size, and set every compared number with `tabular-nums`.
- **Do** group content with a `border-top: 1px solid var(--slate-line)` and space.
- **Do** ring plates from the inside (`inset 0 0 0 3px var(--slate)`), because `clip-path` clips an outline away entirely.
- **Do** theme the browser's own surfaces — selection, focus ring, scrollbar, caret — to the same four values.

### Don't:
- **Don't** introduce a fifth colour, a gradient, or a glow. The only gradient-shaped value in the system is the flat three-stop blaze band, which is hard stops, not a ramp.
- **Don't** use route-blaze red (`#E30613`) for anything but the emergency plate's tip, and never as text — that is what `#FF6B5E` is for.
- **Don't** set running prose on a yellow field. Yellow marks the edge of a notice; the words stay enamel on slate.
- **Don't** stretch plates to equal widths or lay them out as an icon-tile grid. The ragged right edge and the visible mast are the thesis; a grid retires the system.
- **Don't** add a second typeface. If something needs a different voice, move it along the width axis.
- **Don't** draw a box around a group of content. Hairline and spacing only; the notice is the one sanctioned exception.
- **Don't** build a wide desktop layout. Above 620px the app is a 390 × 844 phone frame by product decision.
- **Don't** add a third signature animation. The home journey and `plate-settle` are the authored moments.

### Standing Exceptions

These are known, deliberate, and recorded so they are not rediscovered later as defects.

- **Emoji inside the owners' prose.** Twelve emoji remain in `app.js` content strings — a warning sign (×6) opening each safety notice, a pin (×2) before the address, and a train and a car (×2 each) heading the arrival sections. The craft floor bans emoji-as-icons and the rest of the system uses stroked SVG, but the binding constraint on this build was to carry the owners' text *exactly*, and the brief outranks the floor. Do not silently convert them to SVG; the text is the owners' and changing it is a content decision, not a design one.
- **Archivo is loaded from Google Fonts and is not self-hosted.** On a poor connection the width axis degrades to a system sans fallback and the whole width-axis hierarchy flattens. Known and unmitigated.
- **Roughly forty component values are hard-coded px** rather than derived from `--plate` — icon sizes, checklist paddings, the QR panel, and most individual type sizes. The constant governs layout rhythm, not the full scale. Do not describe the system as fully derived.
- **Three dead rules remain in `style.css`:** `.section-toggle`, `.detail-hero-img`, and `.mt-16` have no remaining markup. They are inert, not evidence of a pattern; do not build on them.
