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

## 4. The card everywhere else — six ideas (Figma: `✦ Card theme · everywhere`)

Built with today's card and card back so the ideas are about *where the
card lives*, not which style wins. The deck screen is untouched.

1. **The daily draw (Sky).** Sky today as a tarot draw: a fan of card backs,
   tap one, it rises and turns into today's sky card (numeral, planet art,
   plaque, keyword pills). One draw a day. *Labyrinthos / MoonX.*
2. **The spread (Alignment).** Her card and yours meet at the top; Spark /
   Rub / Align laid out below as three small cards, each tappable for its
   read; the Venus line under them. *The tarot three-card spread.*
3. **The hand (Matches).** Matches as a fan across the bottom; swipe along
   it and the chosen card rises with name and state. Replaces the list.
   *MoonX draw, playing-card fan.*
4. **The binder (You).** Your card front and back side by side, then every
   card you have drawn: face-up once aligned, face-down while veiled.
   *HoloDex / TCG collection.*
5. **The gallery (Cheat sheet).** Every term is a mini card with its art and
   a name plaque; locked terms are face-down with a ✦. *Labyrinthos card
   gallery.*
6. **The pack (Align+).** A pearl-foil sleeve with the three perks peeking
   out as cards; "Open the pack" is the trial. *TCG pack opening.*

## 5. More ideas — eight built, forty written (Figma: `✦ Card theme · more ideas`)

Same rule as §4: today's card and card back, deck screen untouched, nothing
applied. The binder (§4 idea 4) is the one Hakeem loves, so idea 4 below
takes it further.

1. **The cast (Onboarding).** The blank card fills in front of you, layer
   by layer: aura, sign chips, then the three reads landing one at a time,
   then dealbreakers. The progress *is* the card completing; the ladder can
   go. "Deal my card" ends it. *Pokémon card reveal; HoloDex scan.*
2. **The week (Sky).** The week as seven small sky cards in a row, today
   raised, each with its planet sphere and one word (quiet · say it · listen
   · money · go out · rest · her). Swipe the row; tap to read the day. The
   calendar strip becomes a hand. *Playing-card hand; MoonX day draw.*
3. **The set (Your chart).** Sun, Moon, Rising, Venus as a numbered
   four-card set ("1 of 4 · ALIGN"), each with its own art and frame colour;
   "set complete" when all four are read. *TCG set numbering.*
4. **The binder, deeper (You).** Pages: Drawn · Aligned · Released tabs; a
   completion line ("signs collected 9 / 12 · missing Gemini · Virgo ·
   Cancer"); missing signs as dashed slots with only their glyph colour;
   Align+ sleeves (Night, Founding, Earth) for your card back. *HoloDex
   collection; Pokémon binder pages.*
5. **The foil (Status).** Rarity as status: founding members get a
   pearl-foil frame others can see in the deck; a verified photo earns a
   foil seal on the card; the serial says which series you are (№ 001–333
   founding; later cards start at 334). *Pokémon reverse-holo; Magic foil.*
6. **The cut (Block a sign).** Blocking a sign is cutting it from the deck:
   the Scorpio cards lift out of the stack and fall away, the count drops
   ("15 → 12 cards tonight · 3 Scorpios out"), undo puts them back. A
   setting that feels like a shuffle. *Magic sideboard.*
7. **The deal (Notifications).** Notifications dealt as cards from the top:
   each is a small card with the sender's aura and one line; they stack; you
   flick a card off the table when read; "the rest of the week · 9" waits as
   a face-down pile. *Card table.*
8. **The share (Growth).** Share your card as an image: the card in a pearl
   sleeve with "DEALT ON ALIGN · FOUNDING SERIES № 001/333"; an invite is
   giving someone a card; when the friend casts theirs, a founding pack
   opens for both of you (seven days of Align+). *Trading; pack opening.*

### The long list (not built)

**Onboarding**
- The cast (above): the card fills layer by layer instead of a ladder.
- Choose your sleeve at the end: three card backs, one is yours.
- The first draw: the very first deck is dealt face down and you turn one.
- Your card's "birth": birth data screen renders the card's serial and
  series as it validates.
- Dealbreakers as a discard pile: drag a line off the card to drop it.

**Deck and matches**
- The hand (§4): matches as a fan you swipe along.
- Sort the hand: by element, by state (spark / rub / align), by newest.
- Match state as a card *condition*: veiled = sleeved, sparked = edge glow,
  aligned = foil.
- Peak state as a jackpot spread: all tonight's aligned cards fan out.
- "Return to deck" when a match fades: her card slides back into the stack.
- Face-down stack thickness shows how many are left tonight (no number).

**Chat**
- The spread (§4): Spark · Rub · Align as a three-card row above the guide.
- Each message from her carries a tiny corner index of her sign.
- A comet is a card thrown onto the table (with a spin).
- "Both aligned" moment: the two cards touch edges and the frame joins.
- Rub read pinned as a small card at the top of the thread on hard days.

**Sky and guidance**
- The daily draw (§4): tap a card back to reveal today.
- The week (above): seven small day cards.
- Cosmic calendar month as a binder page of day cards, retrogrades sleeved
  in red.
- Mercury retrograde = a *reversed* card (upside-down art) for the period.
- Horoscope keyword pills become card *pips* along the bottom edge.
- Chart pages as the set (above): Sun · Moon · Rising · Venus.
- Term explainer as a card face with a plaque; glossary as the gallery (§4).
- Chakra ladder as a vertical suit: seven small cards in order.

**You and the binder**
- The binder (§4) and the binder deeper (above).
- Sleeves: seasonal card backs (Libra season, eclipse night) as Align+
  perks.
- Card history: every edit of your reads keeps a "printing" you can view.
- Your card's back shows your serial and series like a tarot back mark.
- Edit your card = "re-cast": the card turns face down and re-fills.
- About your sign = the sign's own card with its element and ruler pips.
- Cheat sheet as a deck of twelve sign cards you flip through.
- Block a sign = the cut (above).

**Club**
- Each room has a *table card*: the sign's card at the top, posts below.
- Posts are dealt cards: an aura corner, one line, flick to dismiss.
- Room leaderboard as a stacked set: the loudest signs on top.
- Weekly club "spread": the three most-read posts fanned.

**Notifications and system states**
- The deal (above).
- Empty states as an empty card slot with a dashed frame and one line.
- Loading = a shuffle animation of the card back.
- Errors = a card turned sideways (a "tapped" card, Magic) with the message
  on it.
- Wait for reset = a face-down stack with a countdown printed on the sleeve.

**Align+ and paywall**
- The pack (§4): perks as cards in a foil sleeve.
- Founding member = the foil frame (above) plus series number.
- Trial active = the sleeve is open; "days left" on the sleeve tab.
- Priority queue = your card sits on top of the stack for the night.
- Reveal-a-veiled-card as a single-purchase "booster".

**Safety**
- Report / block sheet as a card with the offence as its plaque; the user's
  card turns face down when submitted.
- Verified photo = the foil seal (above).
- Safety tips as a small deck of four cards you swipe.

**Share and growth**
- The share (above): sleeve, serial, "dealt on Align".
- Friend referral as gifting a card: they get a *blank* card that becomes
  theirs at signup.
- Story-size export: card on the starfield with the mark, no UI.
- "Card of the night": one anonymised aligned pair shared to the club.
