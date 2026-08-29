# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Confirmed guests staying at Casa Maranta, a family-owned holiday house at Via da la Rasiga 12, Li Curt, 7745 Poschiavo, Switzerland. Guests only — the local contact, cleaning team, rental agency and prospective (unbooked) guests are explicitly **not** audiences for this product.

The primary usage scene is **on a phone, inside the house**: a guest standing in the kitchen working out how an appliance runs, or on the sofa choosing tonight's restaurant. Pre-arrival planning is a real but secondary moment; where the two conflict, in-house phone use wins.

Guests are served in German and English. Poschiavo is Italian-speaking, but the app is a two-language product by decision (see Capabilities and Constraints).

## Product Purpose

A private digital guest guide (Gästemappe) that replaces the paper folder in a holiday house. It carries everything a guest needs during a stay — house orientation, arrival and access, appliance and equipment instructions, WiFi, waste separation, the departure checklist, emergency and contact numbers — alongside the owners' own curated recommendations for eating, shopping and exploring the Valposchiavo valley.

Success is a guest who finds the answer themselves, in the moment, without calling anyone.

## Positioning

This is not a generic property-management guest-guide template. The content is first-person and specific: Christine and Markus's family history in the house, their named favourite restaurants and excursions with real coordinates, their own photos, their own tone. A neighbouring rental could not truthfully copy any of it.

The guide is also **local, not regional**: recommendations are real places in and around Poschiavo, Li Curt, Le Prese and Miralago that the owners actually visit, with mapped coordinates — not a tourist-board list.

## Operating Context

- **Access:** the guide sits behind a shared password gate; the URL is distributed to guests (a printed QR code pointing at the GitHub Pages host exists in `Resources/Pics/qrcode_burton58.github.io.png`).
- **Structure:** a phone-shaped app shell with a home/splash screen, an eight-tile overview grid, a Google Maps screen with category filters, a search screen over a hand-maintained index, and one shared detail screen that renders long-form content pages.
- **Print companions:** `print-de.html`, `print-en.html`, `print-it.html` and `print.html` generate A4 print layouts of the same content for the physical folder in the house. `checklist.html` produces the Interhome departure checklist as a printable A4 page.
- **Content authoring:** source text lives as Markdown and images in `Resources/Descriptions/` and `Resources/Pics/`; it is hand-transferred into the `DETAIL_PAGES` object in `app.js`.
- **Deployment:** static files served from GitHub Pages (`burton58.github.io`). Changes ship by editing files and committing.

## Capabilities and Constraints

**Confirmed functionality**

- Two-language content (DE/EN) with the choice persisted in `localStorage`; German is the default. Every page, label, search entry and place card exists in both languages.
- Password gate held in `sessionStorage`.
- Google Maps screen with ~25 real geocoded places across three filterable categories (restaurant, grocery, activity) plus the house itself, each marker linking out to Google Maps navigation.
- Client-side search over a hand-maintained `SEARCH_INDEX`.
- Collapsible sections within long detail pages; WiFi QR code reveal.
- Printable A4 guide in three languages and a printable departure checklist.

**Hard constraints (must be preserved)**

- **Photography stays on the Jimdo CDN.** Images are hot-linked from `image.jimcdn.com`; they are not committed to the repository.
- **The map stays on the Google Maps JavaScript API.** The key lives in `index.html`. Do not swap to OpenStreetMap, Leaflet or another provider.

**Working constraints (not formally locked, but honour them)**

- **Stay static.** Plain HTML, CSS and JavaScript, no build step, no bundler, no framework. Not a formal rule, but the owner wants to keep editing files directly. Do not introduce tooling.
- **Two languages only.** Italian is not a product requirement for the app, despite the Italian print file existing. Do not add it speculatively.

**Explicitly undecided — do not treat as settled either way**

- The shared-password access model. It is what exists today, not a commitment. Per-guest codes or another mechanism could replace it; equally it may stay. Future work must not assume it is permanent, and must not replace it without asking.

## Brand Commitments

- **Name:** Casa Maranta. The house has carried the Maranta family name for generations.
- **Voice:** first person plural, warm, personal, hospitable, addressing guests with the formal *Sie* in German. Signed "Christine & Markus". Never corporate-hospitality register.
- **People, real and named:** Christine and Markus (owners), their daughters Nora and Olivia, Anna (local contact). These are real people; never invent or alter them.
- **Existing palette and type:** amber/orange `#E8980A` on deep navy `#1E2D40`, Inter typeface, light neutral surfaces. Recorded here as the incumbent identity, not as a design decision — visual direction belongs in DESIGN.md.

## Evidence on Hand

Real and usable:

- Owner-written house history and welcome text, in DE and EN, in `app.js` and `Resources/Descriptions/Welcome.md`.
- The owners' own photographs of the house, family, wood stove, satellite TV, and waste separation, in `Resources/Pics/` and on the Jimdo CDN.
- Genuine GPS coordinates for the house and ~25 local places (`MAP_PLACES` in `app.js`).
- Real, working phone numbers and links: Anna, Christine, Markus, Centro Medico Valposchiavo, Apotheke Bernina, Taxi Balzarolo, emergency 112.
- Source Markdown for every content page in `Resources/Descriptions/`.
- The Interhome departure checklist as PDF and scanned pages.
- Reference screenshots of the design that inspired the current build, in `Resources/Example/`.

Must not be fabricated: there are **no** guest reviews, testimonials, ratings, occupancy statistics, awards or press mentions anywhere in this project. Do not invent them. There is no booking, payment or availability capability — bookings happen elsewhere (Interhome), and this product must not imply otherwise.

## Product Principles

1. **Answer in the moment, on the phone.** A guest holding a phone in the kitchen is the design case. Depth of content never justifies making the immediate answer harder to reach.
2. **The owners' voice is the product.** The personal history, the named favourites, the first-person tone — that is what a template cannot copy. Never flatten it into generic hospitality copy.
3. **Every recommendation is real and reachable.** Places carry coordinates, numbers dial, addresses navigate. No decorative filler entries.
4. **Both languages are first-class.** German and English are equal citizens; neither is a translation afterthought. Any new content ships in both or it does not ship.
5. **Nothing is invented.** No fabricated proof, no imagined amenities, no claims the house cannot honour. Absent facts stay absent.

## Accessibility & Inclusion

No formal standard has been established for this project. Two product-specific needs are known and durable:

- **Language, not nationality, gates comprehension.** Guests arrive from German- and English-speaking backgrounds into an Italian-speaking valley; place names, menus and signage they encounter are Italian. Keep original Italian place names intact alongside translated descriptions.
- **Real-world reading conditions.** The guide is read one-handed, on a phone, often in low evening light or outdoors in bright sun. Contrast and touch-target generosity are functional requirements here, not compliance checkboxes.
