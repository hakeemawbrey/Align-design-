# Card research — how other decks lay out a card

> **Where the mocks live (Sept 22):** Figma page **"Align — card theme ideas
> (proposals · not applied)"**, right after the v2 page. Sections: 00 Start
> here (cover) · 01 Card style (A/B/C) · 02 Onboarding & auth · 03 Matches &
> the stack · 04 Chat & alignment · 05 Sky & guidance · 06 You & the binder ·
> 07 Align+, limits & status · 08 System states, safety & legal · 09 Growth &
> outside the app. Ideas are coded section.index (e.g. 06.1 the binder). The
> per-session boards named in §3–§7 below were merged into that page.


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

## 6. Screen by screen — where the card theme stops short (Figma: `✦ Card theme · screen by screen`)

Audit of all 123 screens, deck excluded. "Card" means the person-card
(front/back), the stack, the sleeve, the binder, the slot or the pips.
Twelve of these are built as today → card-idea pairs on the board
(`1849:2264`); the rest are written. Nothing applied.

### Verdict at a glance

Card-native already: S-02 Auth, S-03/S-04 dealing, S-05x deck states,
S-06 expand, S-09b sheet, S-21 alignment, G-05/G-05a/G-05b You, G-27 edit
(face down), O-11/O-12/O-13/O-13b onboarding, G-23–26 chart, S-14 sky,
S-16 term, S-19 notifications (has a card icon only).
Half-baked (card appears but does not behave like one): S-07, S-08, G-12,
S-10, G-17, G-28, S-19, S-15, S-20, L-05, SF-02.
No card at all: G-09 matches, G-09b, G-10, G-11, G-18–20, S-11–13, P-01–03,
G-01–04, G-21–22, G-06–08, G-13–16, A-01–02, L-01–04, SF-01/03/04/05,
S-17 club (all), S-19b–e, O-01–O-10, O-14, O-15.

### Built pairs (board)

1. **S-07 Match → the meet.** Two auras floating → her card and yours edge
   to edge with one frame drawn around both; that joined frame can badge
   the chat header and the matches row.
2. **S-08 Veil lifts → the turn.** Static portrait → the reveal is a flip:
   back, edge-on pearl sliver, face with the photo open.
3. **G-09 Matches → the binder page.** Avatar list → every row a card
   sliver with a corner index and a state-coloured edge (spark cyan, rub
   pink, align gold); sections as binder tabs; binder line at the foot.
4. **G-12 Match expired → back to the deck.** Lone mini card → her card
   slides into the face-down stack; same motion for unmatch and release.
5. **S-13 Wait for reset → the discard pile.** Countdown ring → the
   fifteen you played in a pile, countdown printed on the sleeve band.
   Same for S-10 Deck spent.
6. **G-19 No cards → the empty slot.** Constellation in a ring → a dashed
   card-sized slot with the constellation inside. Reuse for G-09b, G-10,
   S-17c, S-19b.
7. **G-18 Offline → the tapped card.** Broken ring → the deck turned
   sideways and dimmed (Magic "tapped"); G-20 update = reversed card.
8. **S-12 Trial active → the open sleeve.** Golden door → your card in a
   pearl-foil sleeve, flap open, "OPEN · 7D" tab. G-14 trial ending = flap
   half closed; G-15 payment failed = foil gone matte.
9. **P-02 Priority → top of the stack.** Avatar orbit → tonight's decks
   fanned face down, your card lit on top, "card 1 of 41".
10. **G-08 Pause / Delete → sleeved or torn.** Two text panels → pause
    slides the card into an opaque sleeve; delete tears it.
11. **G-03 Permission primers → three asks, three cards.** Fake banners →
    each permission is a card you turn; G-03b denied = turned back over.
12. **L-01 Terms → the rules card.** Text column → Terms, Privacy,
    Guidelines, Your data as four numbered rules cards you swipe; SF-05
    Meet safely = a hand of five.

### Written, by section

**Onboarding (O-01–O-15, O-14)**
- O-01 Splash: the mark on a card back, not on empty ground; the card
  turns to reveal "Align".
- O-02 Arrival: the planet arc stays; under the CTA a blank card slot
  labelled "yours, in six steps".
- O-03 Birth data: as the picker validates, a serial prints on a small
  card back in the corner ("№ 344 · Tulsa").
- O-03b Age blocked / O-03d Waitlist: the slot stays empty with a date on
  it; waitlist = your blank card "in the pack, not yet dealt".
- O-03c No birth time: the four time-of-day chips are four small cards.
- O-04 Birth sky: the wheel becomes the art on the back of your card; say
  so ("this is your card's back").
- O-05 Sign reveal: the aura figure is already card art — put it in a
  frame with corner indices and the sign name plaque; twelve variants.
- O-06 User manual: the manual is the text printed on the card's reverse.
- O-07 Big three: three small cards (Sun · Moon · Rising) instead of three
  spheres; the set from §5.
- O-08 Chart check: six facts as the stats block of the card, editable in
  place.
- O-09 Venus / O-10 Element: pills become pips along the card edge.
- O-11–O-13b: already cards. O-13 photo: the photo drops into the card's
  window.
- O-15 Resume: the half-cast card with the missing layers dashed.
- O-14 Paywall: the pack (§4 idea 6).

**Core flow (non-deck)**
- S-01 Open app: the mark on a card back, shuffle as the loader.
- S-09 Chat: her aura chip in the header becomes a corner index; the
  thread sits on a "table" with the joined frame from S-07 above it.
- S-09c–g chat states: sent/unread = card face down at the edge; typing =
  card lifting; not sent = card slid back; expiring = card edge burning
  down; closed = card sleeved.
- S-10 Deck spent: the discard pile (pair 5).

**Guidance**
- S-15 Calendar: the month as a binder page of day cards; retrogrades in a
  red sleeve; the week (§5 idea 2).
- S-20 Glossary: locked terms face down (§4 idea 5); "4 of 12 unlocked" as
  a collection line.
- S-16 Term: add the corner index and term number; already a card.

**Club**
- S-17 Room: a table card at the top (the sign's card), posts dealt below
  with an aura corner; flick to dismiss.
- S-17b Post detail: the post as one dealt card, replies fanned beneath.
- S-17c Empty club: the empty slot. S-17d/S-18 write: you write on a card.
- S-18b Report post: the offence as the card's plaque. S-18c Removed: the
  card pulled off the table.

**Limits & Align+**
- P-01/P-01b Block a sign: the cut (§5 idea 6); chips become sign cards.
- P-02 Priority: pair 9. P-03 Change city: your card moves to another
  table; cities as tables.
- S-11 Paywall: the pack. S-12 Trial: pair 8. S-13 Reset: pair 5.

**Auth**
- G-01/G-01b: the card back waiting behind the field, "your card is
  sleeved until we reach you".
- G-02 Code: six digit slots as six small card slots that turn as you
  type.
- G-03/G-03b: pair 11. G-04 Sign-in failure: tapped card with a timer.
- G-21 Lost number: the card in a locked sleeve, two keys. G-22 New
  device: your card dealt to a new table, "was this you?".

**Account**
- G-06 Edit chart: the set (Sun/Moon/Rising/Venus) with an edit pen on
  each card; save = re-cast.
- G-07 Settings: the rows stay, but the card back sits at the top as the
  "sleeve" you are configuring.
- G-08: pair 10. G-28 Edit card flipped: the flipped side as a real card
  face (bio in the reads block); G-29 Help: a rules card.

**Matches & Safety**
- G-09: pair 3. G-09b: the empty slot. G-10 Chat empty: two cards on a
  bare table, "nobody has played". G-11 Report/Block: the offence as a
  plaque; block = card cut from the deck. G-12: pair 4.

**Subscription**
- G-13 Manage: plans as three sleeves (Weekly, Monthly, Yearly, Lifetime
  foil). G-14 Trial ending: flap half closed. G-15 Payment failed: foil
  gone matte. G-16 Restore: leafing through the binder for your card.

**System states**
- G-17 Loading: shuffle of the card back. G-18: pair 7. G-19: pair 6.
  G-20: reversed card.

**Legal, safety & about**
- A-01/A-02 About: the founding card (№ 001) with the story on its back.
- L-01–L-03: rules cards (pair 12). L-04 Delete confirm: the torn card.
  L-05 Data export: every card you saw boxed as a stack.
- SF-01 Verify photo: the pose frame is the card's photo window. SF-02
  Verified: the foil seal stamped on (§5 idea 5). SF-02b Rejected: the
  seal not applied. SF-03 Blocked list: a page of face-down cards.
  SF-04 Report sent: card handed to the dealer. SF-05 Meet safely: a hand
  of five.

**Notifications**
- S-19: the deal (§5 idea 7). S-19b: the empty slot. S-19c Detail: one
  dealt card. S-19d Grouped: a small stack per day. S-19e Settings: which
  cards get dealt to you, as toggles on card thumbnails.

## 7. Beyond the screens — mechanics, plays, widgets, physical (Figma: `✦ Card theme · beyond the screens`)

Ten ideas that are not a screen redesign but a new thing the card can do.
Board `1854:2279`. Nothing applied; deck untouched.

1. **Play a card (chat).** Chat gets a hand: your reads about her, a sky
   card for the day, a date card built from both interest lists. You play
   one into the thread like a sticker with meaning. "Your move" is literal.
2. **The mulligan.** Magic's mulligan as a nightly rule: once, before
   midnight, put three cards back face down and take three new ones. Free
   gets one a week, Align+ one a night. Lives on the Stack screen.
3. **Rarity.** Pokémon rarity earned by the chart: common, uncommon, rare,
   founding. A stellium, a Grand Trine, a Venus–Mars conjunction earns a
   rarer frame. Changes nothing about the deal; it is a frame and a line
   on the back, and a reason to open About your sign.
4. **The joint card.** Aligning mints a third card neither of you owns
   alone: both auras, the Venus line, a serial joining your two numbers,
   stamps for first message, first date, one month. It sits in both
   binders and is the thing people screenshot.
5. **Your year in cards.** A recap dealt as five cards: dealt, aligned,
   the sign you kept choosing, the best night, your rarest match. Works
   monthly as "your Libra season".
6. **The widget.** Lock and home screen widgets in card language: the
   medium one is your deck face down with count and refill time; the small
   ones are today's sky card and the last card that flipped for you.
7. **The physical card.** The founding perk made literal: a printed foil
   card with your aura, serial and an NFC chip. Tap it on a phone and your
   face-down card opens on theirs. 333 exist, Houston only.
8. **The season.** Each zodiac season is a twelve-card set to collect in a
   month: a season sleeve, four sky cards, the ruling planet, six people
   the season favours for you. Sleeves stack in the binder year over year.
9. **The trade.** Share tonight's hand with one friend for 24 hours,
   initials and reads only, photos veiled. They pin the card they would
   play. The group-chat screenshot, designed on purpose.
10. **The reversed card.** Tarot reversals as a sky mechanic: during
    Mercury retrograde every card is dealt upside down and the three reads
    change meaning (Spark reads as caution, Rub doubles, Align holds).

### More, written only

**Mechanics**
- The tap: hold a card to "tap" it for later; tapped cards stay one extra
  night (Align+).
- The peek costs a token: Peaks as a hand of three tokens that refill at
  11:11.
- Combo: two aligned cards from the same element unlock a "grand trine"
  night with a bonus deal.
- The bench: three cards you can keep outside the nightly fifteen, like a
  sideboard.
- Foil odds: a small chance any night's deal contains one foil card (a
  verified founding member) shown with a shimmer.
- Trade-in: release five cards in a row and the sixth is dealt from a
  wider radius.
- The cut-off: at 11:10 the table clears, cards you did not act on are
  swept; a one-minute warning as the dealer's hand.
- The reshuffle animation whenever your chart is edited.

**Plays in chat**
- Ask cards: three ready questions dealt as cards under the composer.
- The truth card: play it and both must answer one question honestly.
- The date card: built from overlap in interests, place and time slots;
  accept = it goes in the joint card's stamps.
- The pass card: a graceful "not tonight" that keeps the thread alive.
- The comet as a card thrown across the table with a spin.

**Binder and collection**
- Binder pages by season, by element, by city.
- Missing-sign hunt: the three signs you have never been dealt, with a
  hint of when the sky favours them.
- The released page as a graveyard with dates, never deleted.
- Foil count on the binder cover.

**Social and growth**
- Card of the night: one anonymised aligned pair shown to the club.
- The dealer's pick: Align posts one editorial card a week in every room.
- A blank card you give a friend; it becomes theirs at signup and you
  both get the season sleeve.
- QR on the physical card that opens your face-down card in a browser.

**System**
- App icon variants as card backs (night, founding, earth, season).
- Haptics: a card being dealt, a card flipping, a card being cut.
- Sound: one soft deal sound at 11:11 push.
- The Apple Watch complication as your card back with the count.

## 8. The game — ten more built, a rulebook, and forty written

Added straight into the organised Figma page by area. Codes below are the
page codes. Nothing applied; deck untouched.

### Built

- **02.3 The practice hand.** Before the real deck, three practice cards:
  the dealer, the rules card, one sample person card with the gestures
  printed under it. Release one, hold one, align one, then the real deal.
- **03.7 Card conditions.** Five states readable from the card itself
  everywhere it appears: veiled is sleeved, sparked has a cyan edge,
  aligned is gold foil, going quiet fades with an orange corner, released
  is face down. One grammar instead of five labels.
- **04.4 The truth card.** One question, two answer slots, answers reveal
  at the same time or not at all. One a day per pair; the joint card keeps
  the ones both answered.
- **05.6 The spread of three.** Behind you, today, ahead: Monday's,
  today's raised, Sunday's sky cards with one reading across them.
- **06.5 The binder cover.** Collector since, foils, sets, rarity, align
  rate, signs, seasons; badges as pips; the pages list.
- **07.8 Peak tokens.** Three tokens a night, spent for six seconds of a
  face, refilled at 11:11; Align+ never empties; a booster token is a
  small purchase for the one card you cannot leave.
- **09.6 The blank card.** An invite is a blank card with your from-line;
  the friend casts their chart into it. They get the founding sleeve, you
  get a season pack. Three per member.
- **10.1 The table card.** The club room as a table: the sign's card on
  top with count and city; posts dealt as cards with an aura corner; chips
  as upvotes; flick to dismiss.
- **10.2 Draft night.** The room drafts tonight's prompt from three cards
  by playing one chip each; the winner becomes the table card at nine.
- **11 The rulebook.** The whole system as twelve rule cards: the deck,
  the card, the align, the hand, the binder, the sleeve, the cut, the
  mulligan, the foil, the season, reversed, the table.

### Written, by feature

**Deck-adjacent (never the deck screen itself)**
- The dealer's warning: at 11:10 a small dealer card slides in, "table
  clears in one minute".
- Card weight: a card you have peeked twice gets heavier (a slower swipe,
  a deeper shadow).
- The ante: on peak nights you may put one of tonight's fifteen back to
  draw from the "wider table" (35 miles).
- Suit runs: three cards of one element in a night light a small run
  marker under the stack.
- The dead card: a profile paused mid-night turns grey in your stack with
  "sleeved" printed across it.

**Matches**
- The kicker: when both align within a minute the joint card gets a
  "snap" stamp.
- Trade-up: unmatch politely by "passing the card back to the dealer".
- Match order as hand order: drag to sort your hand; the app remembers.
- Expiring matches curl at the corner three days out.

**Chat**
- The bluff: send a sealed message that opens only if she replies first.
- The wager: "if you're right, I book dinner" as a two-sided card with an
  outcome.
- The date card deck: six templates from overlap in interests, place and
  hours; play one, she edits, both accept, it stamps.
- The pass: a graceful "not tonight" card that keeps the thread warm for
  48 hours.
- Read receipts as a card turning slightly toward you.

**Sky & guidance**
- The daily cut: the sky "cuts the deck" each night; the cut line shows
  which element is on top.
- Eclipse night: black foil backs for everyone, one night a year.
- New moon: blank card backs; full moon: every back glows.
- The retrograde sleeve: during Mercury retrograde messages sit in a
  "re-read" sleeve for ten seconds before sending.
- The transit card as a push: the notification is the card, tap to flip.

**You & the binder**
- Sleeves you earn: founding, verified, season, one-year, a hundred
  aligned.
- The proof card: verification as a tiny foil seal that others can tap to
  see the date.
- Re-print: edit your reads and the old printing stays in the binder as
  "first printing".
- The trade binder: cards you would recommend to a friend (with consent).
- The lost-and-found page: released cards the sky deals you again.

**Club**
- The house rules card pinned at the top of every room.
- Room chips: a member's chip colour shows their moon sign.
- The pot: a weekly prompt where the best reply's card is featured in the
  room's table card.
- Draft leagues: the four element rooms compete on replies during a
  season.

**Align+, limits & status**
- The pile: Align+ peaks as a visible pile of tokens on the widget.
- The dealer's cut: founding members skip the 11:10 sweep once a week.
- Foil finishes: gold (founding), silver (verified), rainbow (both).
- Sleeve shop: seasonal sleeves as small one-time purchases, never
  affecting the deal.

**System, safety & legal**
- Report as "calling the dealer": the dealer card slides in, takes the
  card off the table, thanks you.
- The safe word card: a card you can play in chat that pauses the thread
  and opens the safety guide for both.
- Loading is a riffle; error is a card dropped on the floor, picked up on
  retry.

**Growth & outside the app**
- Card of the night as a story-size image with the pair anonymised.
- Season sleeves as App Store screenshots.
- The rulebook as the About page and as a printed insert in the physical
  card's envelope.
- Wallet pass: your card back in Apple Wallet with the founding serial.

## 9. Event cards — the second card type (Figma section 12)

TCGs mix character cards with event cards (Trainer cards next to Pokémon,
instants and enchantments next to creatures). Align's people are the
characters; everything that happens to the night is an event. Rule of
shape: **people are portrait, events are landscape**, so the two are never
confused in a stack. Every event carries a family badge, planet art, a
name, a TONIGHT effect, how long it lasts, a suggested play, and rarity
dots. Five families:

| Family | Colour | Dealt by | Examples |
|---|---|---|---|
| Sky | gold | the sky | transits, Moon signs, retrogrades, eclipses, seasons, returns |
| Dealer | pearl | the house | the refill, the sweep, the mulligan, the wider table, the cut |
| Play | cyan | you | truth card, date card, sky read, comet, pass, wager, bluff |
| Milestone | green | the pair's history | first message, first date, seven days, one month |
| Pair | lilac | a person + an event | combos such as "Venus at home" |

Rarity: common (daily Moon), uncommon (transits), rare (retrograde
turns), mythic (eclipses, solar return, Saturn return, Grand Trine).

### Built (12.1–12.8)

- **12.1 The event card.** The anatomy, a person beside an event for the
  shape rule, and the five family badges.
- **12.2 The event on the stack.** One event dealt on top of the fifteen
  each night; favoured signs get a gold edge, reads shift. On Your Stack,
  not the deck.
- **12.3 The sky's hand.** The week as event cards stacked by date with
  rarity; future ones dashed.
- **12.4 The shared event.** At 8:11 the same event lands in the thread
  for both; "Play it" drafts a line in your voice.
- **12.5 The combo.** Person + event: Juniper plus Venus entering Libra
  is "Venus at home", her Spark 4 → 5 until Oct 7.
- **12.6 The solar return.** Your birthday as a mythic: 33 cards, peaks
  free, top of every stack, the sleeve glows. Saturn and Venus returns
  are the other personal mythics.
- **12.7 The dealer's cards.** Every system act as a pearl dealer card
  with its time; never a surprise.
- **12.8 The events page.** The binder keeps the skies you lived through
  and who you were talking to; future mythics dashed.

### Written

**Sky events**
- Moon void-of-course: "nothing lands" — messages sent now are marked
  with a small void stamp, no offence taken.
- New Moon: the deck deals only cards you have never seen.
- Full Moon: every veiled photo opens for one peak, free.
- Mercury retrograde start: the reversed card (11); retrograde end: "all
  threads reopen" — released cards from the last three weeks come back
  for one night.
- Venus retrograde: exes' signs are cut from the deck automatically.
- Mars in your sign: your Rub reads are shown to matches first, as a
  warning label; play "I know" to acknowledge.
- Saturn square: a slow night — the sweep is delayed to 1:11.
- Jupiter in your seventh house: the wider table for a month.
- Eclipse: one veiled card reveals at midnight; the binder keeps the
  eclipse card forever.
- Season change: the season set opens (10 in §7); the season sleeve is
  an event card you keep.
- Ingress cards for every planet, colour-coded by planet sphere.
- Weather cards for Houston (heat advisory, hurricane watch): a real-sky
  event that suggests "stay in, text".

**Dealer events**
- The refill, the sweep, the mulligan, the wider table, the cut (built).
- The reshuffle: chart edited → the dealer reshuffles at the next 11:11.
- The house apology: an outage becomes a dealer card that grants a free
  peak.
- The dealer's warning at 11:10 with a one-minute count.
- The round: your first fifteen nights as a "round" with a summary card.

**Play events**
- Truth, date, sky read, comet, pass, wager, bluff (§8), plus:
- The ask: three ready questions; the raise: escalate a date card from
  drink to dinner; the fold: end a thread kindly with a card that says so;
  the call: "prove it" on a read she disputes; the tell: reveal one hidden
  layer of your card (photo, bio, city) as a play.
- Play limits: one truth, one date and one sky play per pair per day;
  Align+ lifts the sky play limit.

**Milestone events**
- First message, first date, seven days, one month, first photo open,
  first comet, first mutual truth; stamped onto the joint card.
- A milestone card is also a push: the notification is the card.

**Pair events (combos)**
- Venus at home (built), Moon on Moon (both Moons in one sign tonight:
  Rub read softens), Sun trine Sun, Mercury mirror (same Mercury sign:
  truth cards answer faster), Saturn between (a hard aspect: the pair gets
  a "slow" card, no expiry for a week).
- Combo chains: two combos live at once earn a "grand" stamp.

**Where events show**
- The stack (1 + 15), the calendar (the sky's hand), the chat (shared
  event at 8:11), the widget (today's event card), the binder (events
  page), the club (the room's table card is the event of the night), the
  notification centre (dealt cards, §5).

**Rarity and collection**
- Rarity dots on every event; mythics get a foil frame and a serial.
- Events are collectable but not tradeable; the events page is the
  personal record of a year of sky.
- Season sets are built from event cards plus six person cards the
  season favours.

**Rulebook addition**
- Rule card 13, "The event": the sky deals one event a night on top of
  the fifteen; events are landscape; only PLAY cards are yours to play.

## 10. Event card designs — portrait, one layout per family (Figma section 13)

Hakeem's call: events are **portrait like people**, so the frame does
the telling, not the orientation. Section 12's mocks still show the
landscape version and will be converted once a design is picked. Nine
layouts, each borrowed from a real card game:

| # | Family | Layout | Borrowed from |
|---|---|---|---|
| 1 | Sky · transit | The arcana: numeral, illustrated scene (sign figure under the planet), double hairline border, corner stars, name banner | Tarot Major Arcana |
| 2 | Sky · Moon | The phase: one big moon, a dial of eight phases with today marked, one line | Pokémon Energy |
| 3 | Sky · retrograde | The reversed: hazard-dash frame, chevrons, inverted planet, name ribbon printed upside down | Yu-Gi-Oh trap |
| 4 | Sky · mythic | The eclipse: near-black ground, holographic border, the corona is the only art | Black foil / secret rare |
| 5 | Dealer | The ticket: light stock, perforated stub with the time, barcode, "dealt" stamp | Pokémon Item |
| 6 | Play | The instant: cost circle, bold sans name, art window, effect, TRIGGER band | One Piece event |
| 7 | Milestone | The seal: scalloped wax seal with the date, the pair's stamp list | Postage / wax seal |
| 8 | Pair · combo | The fusion: two auras on a seam of light, effect on a dark scrim | Fusion cards |
| 9 | Sky · return / season | The full art: aura fills the card, holo border, thin text scrim | Pokémon full-art |

How to tell an event from a person at a glance: person cards always have
the aura window, name and three reads; they never carry a numeral, a
ticket stub, a cost circle, a seal, or a holo border (except founding
foil). The family badge colour is constant across layouts.

Written extensions:
- Rarity by finish, not by frame: common flat, uncommon hairline, rare
  foil edge, mythic holo border, on any layout.
- Seasonal frames: the arcana border ornament changes with the zodiac
  season (Libra scales in the corners in Libra season).
- Reversed variants for every sky layout during retrograde: the same
  card printed upside down.
- The ticket family extends to receipts (Align+ purchases) and boarding
  passes (change city).
- Play cards get colour by suit: cyan for spark plays, pink for rub
  plays, gold for align plays.
- Milestone seals age: a seal older than a year gets a patina.
- A blank event card for the dealer's apology, hand-written style.
