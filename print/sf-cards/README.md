# Align SF-01 · trading-card business cards

Poker-size (2.5 × 3.5 in) cards for the San Francisco trip. Put one on top of a
booster pack and hand it over.

- **Front:** one of 12 zodiac cards, styled after the mystery card. Each card is coloured to match its own illustration (sampled from the art), and every front has a thick Align pearl-foil border that runs to the cut edge. Each has the
  sign's animal (with film grain over the art), dates, element and mode, a one-line read, and
  Pull / Push / Align for love life.
- **Back (same on every card):** the Align card back (seed of life and the chakra
  column) with Hakeem Awbrey · Co-Founder · hakeem@comealign.com · 832-298-6442.
- **Serials:** `ALIGN · SF-01 · № 01/15` to `15/15` for each sign, so 180 cards in all.

## Files

| File | Use |
| --- | --- |
| `out/proof.png` | Every design on one page, for review |
| `out/SF-01-letter-sheets.pdf` | All 180 numbered cards on letter paper (landscape, 11 × 8.5 in), 6 per sheet, each with 1/8 in bleed and crop marks. 60 pages: front and back pages alternate. |
| `out/SF-01-designs-1-each.pdf` | 13 pages, one card per page at actual size (2.5 × 3.5 in) with 1/8 in bleed and crop marks on a 3.25 × 4.25 in page, 600 dpi: the back, then the 12 fronts (serial `№ __/15`). For online card printers. |
| `out/print-files/front-<sign>.png`, `back.png` | One file per design for a print shop: 825 × 1125 px (300 dpi, 1/8 in bleed). The serial reads `№ __/15`. |

### Printing the letter sheets (FedEx Office, Staples, or an office printer)

1. Print `SF-01-letter-sheets.pdf` **double-sided, landscape, at 100% / actual size**
   (not "fit to page") on heavy cardstock, 100 lb cover or heavier.
2. Cut on the crop marks. Each card has its own marks; there is a 1/4 in gutter of bleed
   between cards, so make two cuts between neighbours. A paper trimmer or guillotine is fastest.
3. Optional: round the corners with a 1/8 in (3 mm) corner punch.

Cut cards are 2.5 × 3.5 in, the standard trading-card size: they fit penny sleeves and
standard 3 × 4 in, 35pt top-loaders, sleeved or not.

To print one sign only, open `cards.html?view=sheet&sign=leo` in Chrome and print it.

### Print shops

Most card printers (DriveThruCards, MakePlayingCards, PrinterStudio) take
825 × 1125 px images. To make a numbered PNG for every card (12 × 15), run:

```bash
node print/sf-cards/render.mjs --all     # writes out/print-files/numbered/<sign>/<sign>-NN.png
```

## Editing

- Copy, colours and serial run: `signs.js`. The name, title and email on the back are in `CARD_BACK`.
- Layout: `cards.html`. Open it in a browser: `?view=proof&guides=1` shows the trim line (red) and safe area (blue).
  `&art=aura` swaps the animal art for the AuraCam silhouettes; `&art=cute` and `&art=glow`
  use the two SF art sheets (`art/cute`, `art/glow`). `out/proof-cute.png` and `out/proof-glow.png` show them.
- Re-export: `node print/sf-cards/render.mjs`. This needs Playwright and Chromium.
  If `playwright` won't resolve, run `npm i playwright` in this folder first.

The animal art in `art/` is the full-resolution originals from the Figma kit
*Kit · Figures*, trimmed of the kit's grid gutters. Each card shows the whole image,
never cropped. The `&art=aura` option uses `app/public/img/aura` (*Kit · Aura photos*).
The sheets PDF places each design as a 600 dpi image (`hires/`, rendered once per sign) with the
serial numbers on top as text, so it prints sharp and stays small. `render.mjs` shrinks it with `compact-pdf.py` (needs `pip install pypdf`).
