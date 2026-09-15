# Align — the twelve auras

A 12-sign colour system extracted from foil ramps that already existed in the
Figma file, then extended into tokens, contrast-checked, and given usage rules.

Figma: collection **`Align · Stardust`**, 73 new variables + 12 `foil/*` gradient
styles. Specimen panel: `Kit · The twelve auras` on page `Align — Stardust (2026)`.

## Where this came from

The `Founders Badge concept` page already defined 12 per-sign foil ramps, each a
7-stop linear gradient at `0, .16, .34, .52, .7, .86, 1`, palindromic, sharing one
specular `#fff9f2` at stop `.52`. The file describes them as "the sign's own colour
rolled through white, so it still reads as metal, not as a gradient."

Each ramp also carries a **mint name**, and the aura art uses the same name
(`AURA · ORCHID`). **The foil system and AuraCam are already one system** — this
work deploys it rather than inventing anything.

## The twelve

| Sign | Mint | Element | core | light | deep | tint |
|---|---|---|---|---|---|---|
| Aries | EMBER | Fire | `#ff5a3d` | `#ffb08a` | `#5e1b0c` | `#2c1230` |
| Taurus | HONEY | Earth | `#e8b54d` | `#ffebb8` | `#4e3708` | `#291b31` |
| Gemini | SIGNAL | Air | `#ffd84d` | `#fff6c4` | `#514107` | `#2c1f31` |
| Cancer | TIDE | Water | `#33c8f0` | `#c4eeff` | `#0a3b52` | `#171d41` |
| Leo | GOLDLEAF | Fire | `#ff9a3d` | `#ffd9b0` | `#5e3208` | `#2c1830` |
| Virgo | ROSE QUARTZ | Earth | `#ff3d7a` | `#ffc0d4` | `#570a28` | `#2c0f36` |
| Libra | ORCHID | Air | `#e85ac8` | `#f8c4ee` | `#4a0f3c` | `#29123d` |
| Scorpio | GARNET | Water | `#e8235c` | `#ffb0c6` | `#520a22` | `#290c33` |
| Sagittarius | AMETHYST | Fire | `#a855f7` | `#dcc0ff` | `#330a63` | `#231242` |
| Capricorn | JADE | Earth | `#2bd8a8` | `#b0ffe6` | `#0b4436` | `#161f3a` |
| Aquarius | ION | Air | `#3dc8f0` | `#beefff` | `#0a3e52` | `#181d41` |
| Pisces | DUSK | Water | `#7b7bf5` | `#cfcfff` | `#1e1e63` | `#1e1542` |

`glow` = `core` at 55% alpha. `tint` = `core` at 10% over `surface/canvas`,
shipped pre-composited as opaque hex and never nested. `sign/spec` = `#fff9f2`,
shared by all twelve.

## Contrast

`label/primary #EFE6D6` over any `tint` scores 12.59–14.20. Gemini is the binding
constraint; alpha could reach 0.30 before dropping below AAA, so 10% leaves 3x
headroom.

`core` as text on `surface/raised` fails AA for two signs. Both get an
`accentText` token mixed toward their own `light` stop:

| Sign | core | ratio | accentText | new ratio |
|---|---|---|---|---|
| Scorpio | `#e8235c` | 3.97 | `#ec3e70` | 4.52 |
| Sagittarius | `#a855f7` | 4.37 | `#aa59f7` | 4.51 |

`accentText` ships for all twelve (equal to `core` for the other ten) so
components bind one token unconditionally. Pisces at 4.93 passes with the least
margin — do not darken it further.

`core` is never text below 16px or under 600 weight; saturated chromatic colours
halate on a dark ground.

## Usage rules

**Where sign colour appears:** card foil edge, the bloom behind the card, row
pips, sign chips, and the aura art itself.

**Where it must never appear:** nav active state, the primary CTA, backgrounds,
and every semantic state. Scorpio is a red and Capricorn is a green — letting
signs carry status would make half the zodiac look permanently broken. The
holo button stays sign-neutral on every screen, which is what makes it read
as *the* action.

**Budget:** one sign-coloured region per screen, three elements maximum, and
exactly one glow. The deck is the explicit exception: each card carries its edge
and chip.

**Collision:** Cancer `#33c8f0` and Aquarius `#3dc8f0` are near-identical and can
never be the only thing telling two adjacent items apart.

## AuraCam forward-compat

One recipe, hue-swapped: `deep` vignetted ground, desaturated `core` interior
with grain, saturated `core` rim bloom resolving to `#fff9f2` at the hotspot,
near-white glyph. Only the hue triplet changes between signs.
