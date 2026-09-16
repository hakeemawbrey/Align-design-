# Align's design language

Stardust is the benchmark, not the template. This file separates what we took
from what we refused, and states Align's own rules so the next screen can be
built without re-deriving them.

The test for any borrowed idea: **does it encode Stardust's subject, or does it
encode a general truth about colour and attention?** A period tracker's moon
phases are its subject. A bimodal colour budget is not.

---

## 1. Taken — these are physics, not identity

| Principle | Why it transfers |
|---|---|
| Colour is a system with a meaning, never decoration | True of any interface. Ours means sign, theirs means cycle phase. |
| The budget is bimodal — one hero at 15–28%, or many marks under 2%, never the middle | Measured across 85 screens. The middle band is what reads muddy. |
| Colour never touches typography, tab bars, charts or page dots | Holds on all 50 of their product screens with no counter-example. |
| Exactly one focal object per screen | When a screen needs many objects they shrink to texture. |
| The tab's identity object persists, flattening as you scroll | A navigational truth, not a moon-phase truth. |
| A hero glow needs a large monochrome subject to sit behind | Otherwise it erases the text. We proved this the hard way on Chat. |
| Ordered hue sweeps are reserved for time | A sweep implies sequence; using it for categories is a lie. |

## 2. Refused — these are theirs

| Their form | Why we don't take it |
|---|---|
| The moon-phase dial | Encodes lunar phase. Our sky object is the zodiac ring, which predates both apps. |
| Crescent glyphs, half-crescent/half-orb strips | Pure Stardust iconography. Building this was the clearest rip-off in the file; removed. |
| The red→green cycle ramp | Encodes menstruation and fertility. Meaningless for us. |
| `eyebrow / serif Day N / glass pill` as the dial centre | Their composition, answering "where am I in the cycle". |
| Phase-crimson page grounds | Their subject again. |
| Their CTA sweep pill | We already had the holo button, which is ours and predates this work. |

## 3. Align's own devices

### The spine — the zodiac year as a deck seen edge-on

Where Stardust flattens a dial into a phase strip, **Align flattens a deck into a
row of card edges.** Twelve spines, one per sign, in calendar order:

```
9 x 18px, radius 2.5, evenly spaced across the container
fill: deep · core · deep across the short axis — the sign's aura
      glowing through the card, not a metallic sheen
each spine carries its own core-tinted glow
seasons passed   opacity 0.5
seasons upcoming opacity 0.9
current season   9 x 28px, 1px cream stroke at 0.5, glow radius 14
```

Same principle as their strip — a persistent, ordinal "you are here". Different
object, because our object is a card.

### The centre of the wheel is what you hold, not how long it has been

Stardust's dial centre counts elapsed days because a cycle is a duration. Align's
currency is **cards**, so the wheel centres on the deck:

```
mono eyebrow   LIBRA SEASON · DAY 7        the sky, demoted to context
serif hero     Three cards                 what you actually have
glass label    Sun in Libra                the transit, not an action
```

The season is still there. It is no longer the headline, because the season is
not the thing you spend.

### The aura is the colour instrument

This is the single most important rule in the file. **All colour in Align is an
aura** — a body lit from inside, with a cream core, the sign's hue around it, and
a glow thrown outward. Never a flat swatch, never a metallic foil ramp, never a
coloured panel.

```
radial gradient  0: #fff9f2 · 0.30: sign core · 0.72: sign deep · 1: sign deep
two stacked glows: core at 0.75 alpha, radius 0.7x size
                   core at 0.35 alpha, radius 1.6x size
```

Foil is reserved for the face of an actual card. Everywhere else — orbs, avatars,
spines, planets, chips — the instrument is the aura.

Their glow is weather, an aurora behind the content. **Ours is a person's aura**,
so it attaches to an entity and inherits that entity's sign:

| Surface | Whose aura |
|---|---|
| Sign Reveal | the sign being revealed |
| You, Club | your own sign |
| Match, Veil Lifts | both auras, meeting |
| Chat | theirs — her words carry her sign, yours carry yours |
| Post Detail, Club feed | each member's own |
| Deck | nobody's. The card carries its own foil. |
| Calendar, Glossary | nobody's — held constant, decorative |

This is the rule that foreshadows aura cam: by the time a camera reads a real
aura, the interface has already taught that a glow means a person.

### Colour marks a sign, a status, or a destruction — nothing else

- **Sign** — foil ramps, auras, spines, avatars.
- **Status** — saturated chips for states that matter (`MUTUAL ALIGN`,
  `EXPIRES IN 6 DAYS`, `PEAK · 6 SECONDS LEFT`).
- **Destruction** — the only fully saturated button in the product.

Everything else is cream on near-black violet.

### The holo button is never coloured

Stated before and unchanged. It is iridescent, not chromatic, and it is Align's,
not derived from anything. No sign hue, no rainbow, no twelve-aura sweep.

### Every screen is a sky, so put bodies in it

A starfield alone is not space. Stardust fills its screens with **things** —
planets with rings, crescent moons, suns with orbit rings, constellations drawn
as dots and hairlines, four-point sparkles. Colour arrives attached to those
bodies.

Align's screens were starfields with nothing in them. Each screen now carries:

| Element | Spec |
|---|---|
| Ringed planet | body 24–38px radial aura, ring 1.85x wide and 0.52x tall, 1.6px stroke, rotated 14 degrees |
| Crescent moon | a cream-to-lavender disc with a ground-coloured disc offset over it, clipped |
| Constellation | 5–6 dots at 3.4px with 1px cream hairlines at 0.26, drawn as a real figure |
| Sparkle | 4-point star, inner radius 0.16 so the points stay long and thin, 8–13px |

**Placement is computed, never guessed.** Candidate positions are rejected if
they fall within any text or control bounding box plus 10–14px. Bodies sit in the
sky, not on the copy. The first pass placed a planet under a post card because
the reject list missed the post frames; the reject list must cover every content
container, not just text.

## 4. Where Align deliberately diverges

**We colour sign names as text.** Stardust never colours type. We do, because
sign identity is the entire subject and the labels carry real hue variety across
Club and Post Detail. This is a knowing exception, not an oversight — revisit if
the screens start reading noisy.

**Our outlines are thicker.** Trading cards have heavy borders; a period tracker
does not. Hero cards 3.5, grid tiles 2.5, chips 1.5, everything else 1.75.

**We are gesture-only.** Stardust uses floating Done buttons and full-width CTAs
throughout. Align's affordances are rails and holds, so colour cannot be spent on
button fills the way theirs is.
