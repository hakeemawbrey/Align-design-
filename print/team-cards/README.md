# Align City Cards (team card maker)

A self-serve version of the SF-01 cards for the team, published as a claude.ai Artifact:
https://claude.ai/artifact/VLs6Bg6wtCM5hUzbvEvXxN

Each person types their name, title, email, phone, city and edition code, previews the
back and all 12 fronts, and downloads the same two print PDFs as the SF-01 run:

- **Print sheets:** letter landscape, 6 per sheet, 1/8 in bleed and crop marks, fronts and
  backs alternating, every card numbered.
- **One of each:** the back then the 12 fronts, one card per 3.25 × 4.25 in page with crop marks.

## How it works

- `img/` holds each card design at 600 dpi with no personal text: the 12 fronts without
  their footer, and the back without the name block. They come from `../sf-cards/cards.html`
  with `&nofoot=1` (fronts) and `&notext=1` (back).
- The page draws the personal text on top in a canvas, at the positions measured from the
  original card layout, and builds the PDF in the browser with jsPDF. The serial numbers
  are small transparent overlays, so each card design is stored in the PDF only once.
- Downloads go through the Artifact `downloads` capability; the viewer confirms each save.
- Edits are kept in the viewer's own browser (localStorage).

To change the card art or copy, update `../sf-cards`, re-render the images in `img/`, and
republish `index.html` with its `img/` and `fonts/` files.
