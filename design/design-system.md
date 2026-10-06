# Align — design system (Stardust)

Repo copy of the Figma page **"Align — design system (Stardust)"** (page
`2211:349`, file `tj4UC3bpikhe8u1TL0kA35`). Source of truth is the
redesigned screens on the v2 page ("✦ STARDUST — redesigned screens").
When this page and a screen disagree, fix the one that is wrong and update
the other. Last updated 6 Oct 2026.

Renders: `design/assets/design-system-00-cover.png` … `-12-tokens.png`.

| # | Section | Figma node |
|---|---|---|
| 00 | Cover & contents | `2211:350` |
| 01 | Principles & non-negotiables | `2211:456` |
| 02 | Colour | `2211:494` |
| 03 | Typography | `2212:351` |
| 04 | Layout, spacing & rhythm | `2212:407` |
| 05 | Components | `2213:353` |
| 06 | The card | `2213:492` |
| 07 | The guide card | `2213:672` |
| 08 | Event cards | `2215:359` |
| 09 | Icons & marks | `2215:582` |
| 10 | Imagery | `2215:665` |
| 11 | Voice & copy | `2215:715` |
| 12 | Tokens & what to fix | `2215:743` |

Components, cards and marks on the page are clones or instances of the
real parts on the v2 page, so they look exactly like what ships.

---

## 01 · Principles

1. **Everyone is a card.** People, reads, events and rules all live on
   cards. A screen without a card should at least use card proportions,
   frames or slots.
2. **The night is the ground.** Every screen sits on night violet with a
   starfield. Light surfaces are only for dealer tickets and the holo
   button.
3. **Serif speaks, sans informs.** EB Garamond italic carries feeling,
   SF Pro carries facts, Space Mono only labels chips and serials.
4. **One clear move.** One holo button per screen; everything else is a
   quiet text link or an outline button.
5. **The sky explains, it never decides.** Reads describe; alignment still
   comes from both people choosing.

**Never**
- Change the main deck screen (S-05). Its states (S-05b–e, S-05x) may
  evolve; S-05 itself is frozen.
- Show a photo before both people align. Peak shows it for six seconds
  only; the veil lifts on mutual align.
- Put two holo buttons on one screen, or a holo button on a light surface.
- Use a sign colour as body text. Sign colours tint frames, glows and
  chips only.

## 02 · Colour

| Role | Hex | Use | Proposed token |
|---|---|---|---|
| Night | `#12052D` | screen ground | `surface/canvas` |
| Card ink | `#150A26` | inside person cards | `surface/card` |
| Card | `#1A0C3A` | mini cards, sheets | `surface/card-alt` |
| Panel | `#1E1240` | rows, tiles, bubbles | `surface/raised` |
| Raised | `#2B1E4C` | chips, sent bubbles, fields | `surface/raised-alt` |
| Cream | `#F5EFE2` | headlines, names | `label/primary` |
| Body | `#EFE6D6` | reads, long copy | `label/body` |
| Lavender grey | `#B3A6C4` | secondary copy | `label/secondary` |
| Dusk | `#7D6F94` | hints | `label/tertiary` |
| Spark | `#7FD8F5` | where it lights | `read/spark` |
| Rub | `#FF9AC4` | where it catches | `read/rub` |
| Align | `#FFE066` | where it holds; stars | `read/align` |
| Gold | `#F0CC8C` | eyebrows, sky, numerals | `accent/gold` |
| Gold deep | `#C48F46` | stamps, sphere rims | `accent/gold-deep` |
| Card pink | `#D66FA8` | person-card frame (Libra deck) | `accent/card-frame` |
| Ember red | `#E0322A` | destructive only | `accent/critical` |
| Holo | `#F5EFE2 → #D695DE → #7FD8F5 → #FFE066` | the one primary button | `accent/holo` |

- **Elements:** fire `#FF914D`, earth `#D6DC7C`, air `#7FD8F5`, water `#2ACCFF`.
- **Chakra ladder:** `#FF1616 #FF914D #FFDE59 #7ED957 #2ACCFF #B06CF0`.
- **Sign cores** (`sign/<sign>/core`, frames/glows/chips only): Aries
  `#FF5A3D`, Taurus `#E8B54D`, Gemini `#FFD84D`, Cancer `#33C8F0`, Leo
  `#FF9A3D`, Virgo `#FF3D7A`, Libra `#E85AC8`, Scorpio `#E8235C`,
  Sagittarius `#A855F7`, Capricorn `#2BD8A8`, Aquarius `#3DC8F0`, Pisces
  `#7B7BF5`.
- **Event families:** sky `#F0CC8C`, moon `#D9D2E9`, retrograde `#FF914D`,
  dealer (pearl ticket), play `#7FD8F5`, milestone `#7ED957`, pair
  `#D695DE`, ward `#6FE3C6`.

## 03 · Typography

| Style | Spec | Use |
|---|---|---|
| Screen title | EB Garamond Italic 30 | hub titles |
| Headline | EB Garamond Italic 26 | one per screen, centred |
| Card name | EB Garamond Italic 21–26 | names, section titles in boards |
| Button label | EB Garamond Medium Italic 19 | holo button only, ends "  ✦" |
| Serif body | EB Garamond Regular 15/21 | onboarding subs, prose |
| Read | EB Garamond Regular 13.5/19 | the three reads; bios in italic |
| Body | SF Pro Regular 15/22 · 13 · 12 | rows, bubbles, settings, meta |
| Eyebrow / caps | SF Pro Semibold 9.5–10, tracking 12–14% | above headlines; separate with "  ·  " |
| Label mono | Space Mono Regular 8–9.5 caps | read labels, chips, serials; never sentences |
| Numeral | EB Garamond Italic 30–34 | countdowns, prices, 11:11 |

## 04 · Layout, spacing & rhythm

Every screen is 390 × 874 on the night ground. Vertical rhythm: status bar
ends 54 · back chevron 68 (x 26) · eyebrow 104 · headline 120 · sub 178 ·
hero 250–600 · chakra ladder 623 · holo button 668 (x 38, 314 × 54) ·
secondary link 742 · tab bar 788 (x 32, 326 × 62) · home indicator 858.
Side gutter 24 (38 for the holo button).

- Spacing scale: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48.
- Radii: chip 11 · row/bubble 12 · card/tile 16 · panel 20 · button 27 ·
  sheet top 28.
- Hairlines: 1px cream at 12–15%, or family colour at 70–90% on cards.
  Depth from coloured glow (25–45%), never grey shadow.

## 05 · Components

Holo button (primary, one per screen) · outline button (secondary) · text
link (tertiary, y 742) · destructive pill (red, alone at the bottom) ·
status bar · tab bar (Deck · Matches · Club · You) · chat header (back,
her mini card, name, Seed of Life, chevron) · input bar ("Say something")
· section header · row (inside a `#1E1240` panel) · skeleton · read chip ·
interest chip · segmented tabs (max four) · bottom sheet (r28 top, grab,
scrim; eyebrow says what it is and how to close).

## 06 · The card

Anatomy: name & age (initial only until aligned) · Moon badge · window
(aura while veiled, photo only after both align or six seconds on a peak)
· sign & chips · the three reads with five-dot meters · dealbreakers ·
footer serial + pull strength. Other sides: card back (chakra Seed of
Life), flipped (after align), mini card 30 × 44. States: veiled, sparked,
aligned, going quiet, released. Full card 322 × 528 (≈5:8), radius 16–20,
1.5px frame in her sign colour. Never crop a card to a circle.

## 07 · The guide card

Eyebrow · hero · intro · four tabs · label & dots · head & body (under 70
words) · try line (starts with a verb) · pager & meta. Used in S-09b,
S-21, G-23–G-26, S-14, S-16.

## 08 · Event cards

People are character cards; everything that happens to the night is an
event card. Same portrait shape (240 × 394), a family frame, a badge, no
aura window. Anatomy: family badge · art · name · TONIGHT effect · lasts ·
suggested play · rarity dots. Rarity: common flat, uncommon hairline, rare
foil edge, mythic holo border. Never an aura window, photo, name and age,
or the three reads.

## 09 · Icons & marks

The mark (chakra ladder inside the Seed of Life) · Seed of Life
(alignment between two people, chat header) · chakra ladder (progress) ·
✦ spark · tab icons. Planet glyphs are EB Garamond text; sign glyphs use
Noto Sans Symbols (with U+FE0E) so they never fall back to emoji, tinted
with the sign core. Line weight 1–1.5px, one gold accent at most.

## 10 · Imagery

Three kinds only: aura photos (people, one per sign), glowing figures
(signs), spheres (planets: radial gradient, highlight upper left, darker
rim, glow in the core colour at 45%). Onboarding uses the Aurora frame
component. Don't: stock photos, emoji, flat illustrations, or a real
photo before both align.

## 11 · Voice & copy

Warm, dry, specific; never mystical for its own sake. Say what happens
next · second person, present tense · one idea per line · buttons are
first person or verbs (never "Submit"/"OK") · specific over cosmic ·
gentle with the hard parts.

- Words we use: deal, card, deck, stack, align, release, peak, flip, veil,
  sleeve, binder, the sky, tonight, 11:11.
- Words we don't: swipe right/left, match score, compatibility %,
  soulmate, destiny, hookup, "premium".

## 12 · Tokens & what to fix

The file has four colour collections (Align, Surfaces, Align · Semantic,
Align · Stardust) that disagree with each other and with the screens.
Until they're cleaned up, the hex values above are the reference.

| Role | On screens | "Align · Stardust" variable | Action |
|---|---|---|---|
| Spark | `#7FD8F5` | `read/spark #7FD8B0` | update |
| Rub | `#FF9AC4` | `read/rub #E8628A` | update |
| Align | `#FFE066` | `read/align #F2C75C` | update |
| Night | `#12052D` | `surface/canvas #140A2E` | update |
| Panel | `#1E1240` | `surface/raised #1E1240` | matches |
| Primary text | `#F5EFE2` | `label/primary #EFE6D6` | split into primary + body |
| Secondary text | `#B3A6C4` | `label/secondary #B3A6C4` | matches |
| Gold | `#F0CC8C` | `accent/gold #F2C75C` | add `accent/gold-soft` |
| Elements | `#FF914D #D6DC7C #7FD8F5 #2ACCFF` | `#F08A5D #8FBF7F #8FC7E8 #B48FE8` | pick one set |
| Collections | 4 | — | keep Align · Stardust, archive the rest |

Also: 200+ auto-imported paint and text styles from an earlier import are
unused by the Stardust screens and can be deleted once the variables are
fixed. None of this has been changed yet.
