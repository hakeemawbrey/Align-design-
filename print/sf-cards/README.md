# Align SF-01 · trading-card business cards

Poker-size (2.5 × 3.5 in) cards for the San Francisco trip. Put one on top of a
booster pack and hand it over.

- **Front:** one of 12 zodiac cards, styled after the mystery card. There are four colour types, one per element (fire, earth, air, water), and every front has the same holo-foil border. Each has the
  sign's animal and aura, dates, element and mode, a one-line read, and
  Pull / Push / Align for love life.
- **Back (same on every card):** the Align card back (seed of life and the chakra
  column) with Hakeem Awbrey · Co-Founder · hakeem@comealign.com.
- **Serials:** `ALIGN · SF-01 · № 01/25` to `25/25` for each sign, so 300 cards in all.

## Files

| File | Use |
| --- | --- |
| `out/proof.png` | Every design on one page, for review |
| `out/SF-01-letter-sheets.pdf` | All 300 numbered cards on letter paper, 9 per sheet, with crop marks. Front and back pages alternate. |
| `out/print-files/front-<sign>.png`, `back.png` | One file per design for a print shop: 825 × 1125 px (300 dpi, 1/8 in bleed). The serial reads `№ __/25`. |

### Printing the letter sheets (FedEx Office, Staples, or an office printer)

1. Print `SF-01-letter-sheets.pdf` **double-sided, flip on long edge, at 100% / actual size**
   (not "fit to page") on heavy cardstock, 100 lb cover or heavier.
2. Cut on the crop marks. A paper trimmer or guillotine is fastest.
3. Optional: round the corners with a 1/8 in (3 mm) corner punch.

To print one sign only, open `cards.html?view=sheet&sign=leo` in Chrome and print it.

### Print shops

Most card printers (DriveThruCards, MakePlayingCards, PrinterStudio) take
825 × 1125 px images. To make a numbered PNG for every card (12 × 25), run:

```bash
node print/sf-cards/render.mjs --all     # writes out/print-files/numbered/<sign>/<sign>-NN.png
```

## Editing

- Copy, colours and serial run: `signs.js`. The name, title and email on the back are in `CARD_BACK`.
- Layout: `cards.html`. Open it in a browser: `?view=proof&guides=1` shows the trim line (red) and safe area (blue).
  `&art=aura` swaps the animal art for the AuraCam silhouettes.
- Re-export: `node print/sf-cards/render.mjs`. This needs Playwright and Chromium.
  If `playwright` won't resolve, run `npm i playwright` in this folder first.

The art comes from `app/public/img/figure` and `app/public/img/aura`, which match the
Figma kits *Kit · Figures* and *Kit · Aura photos*.
