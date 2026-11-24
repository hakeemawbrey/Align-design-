# ALIGN CARDS: notes

Direction: every news slide is a card pulled from the Align app. The NASA photograph is printed on an Align card. The type system stays the production one: Anton caps balanced to the width, signs in sign colours, planets and numbers in gold, and the divider carrying the chakra mark plus the *Align* wordmark.

- Template: `template.mjs`, a full copy of `news/src/template.mjs` with the same exports.
- Render: `NEWS_TEMPLATE=news/proto/blend/cards/template.mjs node news/src/render.mjs <posts> --out news/proto/blend/cards/out`
- Comparison sheet: `python3 news/proto/blend/cards/build-covers.py` writes `covers.jpg`, with the new covers on top and production underneath.

## Copied from the app

| App source | Used here |
|---|---|
| ProfileCard / CardBack (beta) | Radius 22/330 of the card width. Thick foil edge, 7/330 of the width. Card ratio 1.6. Indigo face. Shadow `0 18px 40px rgba(5,2,15,.6)` plus a sign-colour glow. |
| signs.ts `foil` | Sign foil: the sign colour rolled through white, at 160deg. |
| index.css `--gold-foil` | Gold foil on cover cards. BRAND-QA says gold belongs only on card finishes, so it stays off buttons and pills. |
| holo-frame / LegendaryCard | Conic holo frame (#ff6ad5 #ffd36a #7affc4 #6ad5ff #b18cff) with a sheen, for legendary events: eclipses and full moons. |
| G-05a "Your card" | Full-bleed image. A mono caption on the image (`AURA · HONEY`, `ALIGN SKY · № 010/365`). A raised indigo panel under the image, with the name in serif italic, a sans meta line, and a sign orb on the right. |
| LegendaryCard "✦ RARE" chip | Pearl chrome chip on the card image (`✦ RETROGRADE`, `✦ FULL MOON`). It replaces the production tag pill under the photo, so the cover loses one element. |
| CardBack (beta) | Violet field, seed-of-life and chakra mark, *Align* wordmark. Used for the last slide (the reveal), for the deck stacked behind covers, and as the face-down cards in a hand. |
| S-05 deck screen | Hero card tilted, with two face-down cards fanned behind it. |

## Final recipe

1. **Cover:** one big card, 640 wide, about 60% of the frame. It is tilted in 3D (rotate −4°, rotateY 7°), bleeds off the top edge, and glows in the sign colour. Two dimmed card backs sit behind it as a deck.
2. **Card face:** the NASA photo fills the face, its disc 93% of the card width. Behind it, a sign-tagged nebula from `assets/library/aura` is printed at 42% opacity with a 2.5px blur. The name panel takes the bottom 15%, with a serif name, a meta line and a sign orb. The cover chip carries the news word.
3. **Foil is rarity:** eclipses and full moons get holo, other covers get gold foil, and inner slides get their sign foil.
4. **Lists:** a fanned hand of full-art aura cards, one per sign row, with the right-hand card on top. Rows without signs get two card backs around one face-up planet card, and the planet changes per list slide. A ranked cover is a 5-card hand with #1 on gold in the middle.
5. **Ranks:** one large full-art aura card, offset right and bleeding off the top. **Stories:** a 520-wide sky card or aura card, tilting the opposite way from the slide before. **Pairs:** two cards leaning in. **End:** the Align card back, face down, glowing violet. No divider there, because the card back carries the wordmark.
6. **Layout:** the headline stack is unchanged and owns the bottom 35–40%. After the text is fitted, a script measures the lead card's transformed bounds and seats it 40px above the stack, so the gap never changes.

## What I tried and rejected

- **One card back peeking out behind the cover (v1).** Only half of the seed-of-life showed, and it read as a stray line drawing. Replaced with two dimmed backs fanned like the deck screen, which add depth with no extra element.
- **Tall name panel (20%) with only a name and meta line.** It left a big empty purple slab. Cut it to 15% and added the sign orb (from ElementBadge and LegendaryCard) to fill the right side.
- **Mono serial plus chip plus meta on the cover card.** At feed size these turned into tiny noise. The serial now appears only on inner slides; the cover keeps the chip, name, meta and orb.
- **Small name panels on fan cards.** The names came out at about 18px, which looked cheap and repeated the row labels. Fan cards are full-art aura cards with a mono caption instead.
- **The partial-sun photo for the "ring of fire" eclipse.** It was cropped into an orange wall. Swapped in the total-eclipse corona, gilded with sepia and hue filters, with a true-black moon disc on top so the bloom no longer tints it blue. It now reads as a ring of fire in a holo card.
- **The production `size: 1.2` and `1.45` multipliers.** Inside a card they cropped Saturn's rings and the eclipse. Centred discs are now sized by their measured limb; off-centre frames and Saturn fit the whole frame to the card.
- **The default z-order in the fan (centre card on top).** In a ranked hand, #1 got covered by its neighbours. Hands now use natural overlap; the cover gives #1 the top z and dims the other cards to 0.8.
- **A steep fan arc (pivot 2.1).** The outer cards dropped into the divider and headline. Flattened it (pivot 3.2, spread 9.5°).
- **The same nebula card on three Ophiuchus slides.** Inner nebula slides now cycle through the nebula prints, and a nebula card takes its name from the headline's accent word (*Ophiuchus*).
- **Raw 640px aura JPEGs at 600px card width.** They showed a wormy compression texture. They are now blurred in proportion to the card width (w/200 px), which also suits the "more aura" note.
- **Seating the card with a fixed offset.** Headlines of 2 lines and 3 lines left different gaps. Replaced with measured seating (see recipe step 6).

## Open points

- **Rank slides:** the giant sign word plus the headline plus the body make the text stack heavy. The card is right, but the copy could lose the body.
- **Library:** only `aura/` and part of `sky/` existed during this work, and `sky/` has no library.json yet. Once it does, `sky/` could supply alternate planet prints.
- **Static only:** the holo shimmer is frozen in the screenshot. A reel version could animate the `holo-hue` and foil sweep from index.css.
