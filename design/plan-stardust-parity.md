# Plan — closing the gap to Stardust

Written after measuring five Align screens against five Stardust screens and
reading Stardust's whole product surface (85 cached screens) again, plus a
catalogue search for how *other* astrology apps draw the zodiac.

---

## 1. The measurement that reframes everything

| | accent % | light mass % | contrast | hues |
|---|---|---|---|---|
| Stardust, 5 screens | 8.84 | 4.96 | 0.198 | 2.4 |
| Align, 5 screens | 6.15 | 3.49 | 0.176 | 2.6 |

Per screen, the closest pair:

| | accent % | light % | contrast |
|---|---|---|---|
| Stardust `Scorpio Profile` | 18.93 | 5.13 | 0.217 |
| Align `G-23 Your Chart` | 15.37 | 6.26 | 0.233 |

**Same numbers. Not the same screen.** Stardust's has a glowing scorpion on it.
Ours has a glyph inside a blur.

So: colour quantity is solved and has been for a while. Everything that still
separates the two files is **form** — whether there is a drawn subject with a
silhouette and an edge. No amount of further colour tuning will close it. This
is the finding the rest of the plan is built on.

---

## 2. What Stardust actually did, and what it means for a dating app

### Stardust's move

Period tracking is clinical and faintly shameful, and the category (Flo, Clue)
is medical-white with pink accents. Stardust reframed a bodily cycle as a
**celestial** one. That is not a skin — it is a real isomorphism: the moon runs
29.5 days, a cycle averages 28. Everything in the app is that mapping made
literal.

- the moon-phase strip **is** the calendar
- your cycle day **is** a position in an orbit
- cycle phase **is** lunar illumination, and gets its colour that way

Then, sitting on top, a second layer: sun/moon/rising, tarot, zodiac profiles,
"Galaxy Brain" facts. Pure delight, no data obligations, and this is where the
entire illustration budget goes.

### The thing worth stealing is the separation

Stardust runs **two zones and keeps them apart**:

| | The instrument | The oracle |
|---|---|---|
| screens | dial, calendar, charts, logging | horoscope, tarot, zodiac profiles, articles |
| ground | near-black, flat | saturated single-hue field |
| where colour comes from | **the data** — day dots, trend ribbon, donut | **the artwork** |
| illustration | none | one drawn hero, large |
| type | sans, tight, small | serif display, centered, long-form |

And a third, unglamorous zone: settings, legal, account. Those are bare. No
gradient, no art, no starfield. The theme survives there only in the **words** —
their blocked-users section is headed `YOUR ORBIT`.

That is the taste rule, and it is the one the user has been asking for: Stardust
treats the theme as a **content strategy with zones**, not as a skin applied at
uniform strength to every surface.

### Align has the same structure and has not been respecting it

Our isomorphism is already good, and we should name it out loud: **a natal chart
is a fixed identity; a deck deals a scarce number of them per night.** Fifteen
cards, because the sky changes nightly. The card *is* the person.

| | The instrument | The oracle | Utility |
|---|---|---|---|
| Align screens | Deck, swipe, Match, Chat, expiry, Matches list | Your Chart, Alignment, Guidance, Club, Glossary, Sky | Settings, Auth, Legal, Account, Safety |
| what it should look like | flat near-black, colour only from the card art and from state | saturated one-hue field, one drawn hero, serif long-form | bare; theme lives in the words only |

Right now we apply the oracle treatment everywhere. The chat has a vesica behind
it. The deck has a flower of life. Settings has an aura. Stardust would do none
of that, and it is why our screens read as variations on one purple idea instead
of as different places.

### Where a dating app cannot follow Stardust

Four things Stardust has no answer for, because it is single-player:

1. **There are two people.** Two-aura melts, vesica, the alignment read — these
   are genuinely ours. They should be *reserved* for the handful of two-person
   screens, which is what makes them mean something.
2. **We withheld photos.** "No photo until you both align" is the product's
   central bet, and the substitute currently on every card is a fuzzy pink
   cloud. The veil has to be the most beautiful object in the app or the bet
   fails. This alone justifies the illustration investment.
3. **Rejection, expiry, safety, blocking.** No Stardust equivalent; Feeld and
   Hinge are the references. These should be quiet and kind, never themed.
4. **Reciprocity and timing.** The expiry mechanic is ours and it is currently
   a text label. It is the most obvious candidate for a real data graphic.

### The harder lesson

Stardust's theme does **product work**. The moon strip is not decoration, it is
the navigation. In Align the astrology currently only *describes* — it does not
*decide* anything the user can see. If the astrology only decorates, it reads as
a skin, and a skin looks cheap however well it is drawn.

So one strand of this plan is: make the astrology load-bearing in the
instrument. Which fifteen cards tonight, and why. When a card expires, and why.
Shown as a graphic, not asserted in a sentence.

---

## 3. What other astrology apps do (and why this is a moat)

A catalogue search for glowing zodiac illustration turned up Astroscope
(a flat grid of glyph tiles), Astrology Zone (a white article page), Forceteller
and CHANI (text-led). **Nobody else draws the signs.** Stardust's illustration
set is the outlier in the whole category, not the category standard.

That means building ours is not catching up — it is taking the one asset that
separates the best-looking app in the space from everyone else, and we have a
better excuse to use it than Stardust does, because for us it is on every card.

---

## 4. The work

Five workstreams, in dependency order. W1 is the one that matters.

### W1 — The twelve. *(the whole ballgame)*

Twelve zodiac figures, drawn, at Stardust quality. Spec read off the Scorpio
profile at full resolution:

```
form       soft FILLED shapes, not outlines. rounded, chunky, slightly
           claymation. cream-white #F4F0E4 bodies with fine grain inside.
glow       outer white glow r40-60 on the field — the figure is the light
           source, everything else on the screen is lit by it
glyph      the sign's glyph knocked OUT of the body in the field colour,
           thin stroke, sitting on the torso
overlay    the real constellation for that sign: hairline cream lines,
           dots at each vertex, one 4-point sparkle at the brightest star
field      NOT an even wash — a radial spotlight centred on the figure,
           brightest right behind it, falling to near-black at the edges
size       fills 55-70% of the frame width. it is the subject, not a motif.
```

Production: hand-authored SVG path data per sign, injected with
`figma.createVector()` and `vectorPaths`, then dressed by one shared function
that applies fill, grain, glow, glyph knockout and constellation. Build **three
first** — Gemini (us), Libra (Juniper), Virgo (the second card) — because those
three unblock every screen currently in the file. The other nine follow.

### W2 — Rezone the app

Go screen by screen and assign a zone, then strip what does not belong.

- **Instrument** (Deck, Matches, Chat, Match, expiry): delete the ambient
  glow ellipses and the sacred-geometry figures. Ground goes flat near-black.
  The only colour is the card's own art and state colour. This will *lower*
  the accent score on those screens and that is correct.
- **Oracle** (Chart, Alignment, Guidance, Club, Glossary, Sky): keep one
  saturated field, but convert it from a floating blurred blob into a
  **spotlight positioned behind the drawn hero**. One hue. One figure.
- **Utility** (Settings, Auth, Legal, Account, Safety): strip to bare. No
  starfield, no aura, no geometry. Keep the voice in the section headings.

Sacred geometry drops from "a motif on every screen" to roughly four screens
total, where the figure is the actual subject.

### W3 — Make the veil worth the bet

The aura-as-photo is currently a blur. Rebuild it as a **rendered planet**:
a sphere with real terminator shading, a thin ring, a small moon, in the
person's sign colour — Stardust's `Jai` profile screen is the proof this reads
as an avatar rather than a missing asset. The sign's figure from W1 sits behind
it at low opacity. This object appears on every card in the deck, so it is the
highest-leverage single asset after W1.

### W4 — Make the astrology decide something, visibly

Three data graphics, replacing three sentences:

| now | becomes |
|---|---|
| `EXPIRES IN 2 DAYS` as a label | an orbit arc — the card's position in its seven-day transit |
| `A strong pull` in serif italic | the alignment donut, scored across five categories |
| `11 of 15 cards left tonight` | tonight's deck as a ring of 15 dots, coloured by element |

Each one is colour that *means* something, which is where all of Stardust's
best colour comes from.

### W5 — Raise the floor on panels and controls

Small, cheap, and it lifts every screen:

- panels move from the muddy `#1a1030` to Stardust's lighter, bluer
  `#2B1E4C`, which separates cleanly from a near-black ground
- body copy goes from 60-70% opacity to a warm near-white at full strength
- the segmented control becomes a **filled violet pill with a cream thumb**
  instead of a thin outline — chunkier, more confident, Stardust's device

---

## 5. Sequencing, and how the credits get spent

1411 credits, 400/day. Roughly 120 for the whole plan, so budget is not the
constraint — the constraint is not wasting calls on screens we have cached.

| Step | Work | Appllama spend |
|---|---|---|
| 0 | baseline scores recorded (done) | 0 |
| 1 | W1 first three figures | ~15 — walk Stardust's Zodiac Library and Birth Chart flows at full res for the art spec |
| 2 | W3 the veil | ~10 — `Jai` profile, avatar and orb patterns via `list_ui_elements` |
| 3 | W2 rezone, instrument first | ~15 — Feeld and Hinge for the swipe and chat floor |
| 4 | W5 panels and controls | ~8 — `list_ui_elements` on segmented controls and cards |
| 5 | W4 data graphics | ~20 — Stardust dial, trend, donut at full res; The Pattern's Bond dashboard |
| 6 | W1 remaining nine figures | ~15 |
| 7 | remaining flows (Club, Align+, Account, Safety, System, Legal, Notifications) | ~30 |

### Scoring, every time

After each batch, run `score.py` on the changed screens and A/B them against a
named Stardust screen. Six axes, 0-5:

1. **accent %** — in band for its zone (oracle 12-25, instrument 1-6, utility <1)
2. **light mass %** — is there drawn form, target 4+ on oracle screens
3. **contrast** — target 0.20+
4. **hue discipline** — 1-2 hues on a loud screen, never more than 3
5. **subject test** — name the subject in three words from the thumbnail alone,
   without reading any text. This is the axis we have been failing.
6. **zone fidelity** — does it obey its zone, with nothing borrowed from another

Scores land in `design/scores.md` with the date and the Stardust screen they
were judged against, so the trend is visible rather than asserted.

---

## 6. What this plan says no to

- No more tuning accent percentages. That variable is done.
- No aura, geometry or foil on instrument or utility screens.
- No new screens until W1's first three figures exist — every screen built
  before then inherits the blur and will need rebuilding.
- S-02 and S-06, the two Core Flow screens still outstanding, wait for W1.
  They are both art-led and building them now would bank the same debt twice.
