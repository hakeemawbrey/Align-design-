# Card research — how other decks lay out a card

Asked by the founder (2026-09-22): "our card theme is mostly the same; research
other layouts (decks, tarot, One Piece, Pokémon, Magic) and card apps, propose
a couple of examples before app-wide changes. The main deck screen stays."

## 1. The physical decks — anatomy, and what each one is *for*

| deck | ratio | what sits where | what it optimises |
|---|---|---|---|
| **Tarot** (Rider–Waite, 70×120) | 1 : 1.71 | numeral top (Roman), full-bleed illustration, name plaque bottom band, symmetric ornament border; reversed reading when upside down | the picture *is* the meaning; one glance, no stats |
| **Pokémon** | 1 : 1.40 | title bar (name + HP) · art window with a frame · stage / type line · text box with 1–3 attacks (energy cost · name · damage) · footer (weakness / resistance / retreat · set № · rarity · illustrator) | scanning a hand fast: name, number, moves |
| **Magic** | 1 : 1.40 | title + mana cost · art · type line + set symbol · rules text + italic flavour · power/toughness box · collector footer; frame colour = type | rules density; the italic flavour line is the "voice" |
| **One Piece** | 1 : 1.40 | cost circle top-left, power number, attribute badge, near-full-bleed art, colour-coded border, trait line, effect box, counter | big art with the two numbers you need |
| **Playing card** | 1 : 1.40 | corner indices (rank + suit) top-left and mirrored bottom-right · pips or a court figure · rotational symmetry | readable in a fan, either way up |

Common threads: **one art window, one title, one number that matters, a
footer nobody reads but everyone expects (serial, rarity, artist), and a
frame colour that says the family.** Our current card has the art, the
title, the reads and the footer; what it lacks is a *number*, a *frame
colour language*, and any *ornament* that says "this is a card and not a
panel".

## 2. The apps (Appllama, 8 credits)

- **Labyrinthos Tarot** — cards in a horizontal carousel, one raised; card
  detail = art, name, keyword pills (three), "shift your thinking" line;
  reversed cards are literally flipped. Cream ground, hairline frames.
- **MoonX Tarot** — draw = fan of card backs; result = one card raised on
  black, title block, trait pills, advice row. The card back is the brand.
- **Stardust Tarot** — the *Jai* card: name, one word line, planet art, red
  glow, footer "PINK MOON". A card is a single glowing subject with a name.
- **Luna Moon** — daily card on white, serif name, upright/reversed sections.
- **HoloDex / FoilSnap / Acorn** (TCG scanners) — a card detail is: the card
  large and tilted, then a metadata table (rarity, number, artist, set,
  release), variants as chips (Holo, Reverse), grade pill.

What the apps share: **the card is presented as an object** (tilted,
raised, fanned, flipped) and **its metadata is repeated outside it** as
pills and a table. Nobody puts the whole reading inside the card.

## 3. Three directions built for approval (Figma: `✦ Card explorations`)

All three use Juniper's Libra aura, the founder's colours, and the same
326×528 footprint as the current card, so any of them drops into the deck,
Matches, You and the alignment card without layout changes.

**A · Tarot.** Full-bleed aura with a fade, Roman numeral `XXXI` top, thin
ornament frame with four corner dots in the rim colour, name plaque
(*Juniper, 27* / `THE BALANCER · LIBRA SUN · GEMINI MOON`), three keyword
pills (SAYS IT FIRST · STALLS ON PLANS · READS THE ROOM), dealbreaker line,
serial + pull. The reads leave the card and become keywords; the full
Spark/Rub/Align live in the alignment card. *Most different from now; most
"card".*

**B · Trading card.** Title bar with a **Pull 92** score (the one number),
framed art window with an illustrator credit line, type-line chips (LIBRA ·
AIR · GEMINI MOON), a text box with the three reads as *moves* — energy
dots · name · text · score (+3 / −2 / +3) — dealbreakers as flavour,
collector footer (✦ 031/∞ · Strong pull · Illus. the sky). Frame colour =
her sign's rim. *Closest to today's information; adds the number, the
frame colour and the collector footer.*

**C · Playing card.** Corner indices (J · 27 · air suit) mirrored
bottom-right, the aura at the centre in a feathered ellipse, name and line
under it, the three reads as **pips** (3 · 2 · 3), a mirrored ghost name
for the flip, serial. *The lightest; reads in a fan and upside down; best
for the stack, the matches list and thumbnails.*

Recommendation: **B for the deck and match states, C's corner indices and
pips as the small-card language (matches list, You hub, the fan).** A is
the strongest single image but hides the reads, which are the product.
