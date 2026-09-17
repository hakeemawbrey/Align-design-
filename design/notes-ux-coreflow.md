# Core Flow — UX pass

Nineteen screens, Figma page `Align — Stardust (2026)`, section `932:1834`.
Benchmark: Stardust, via the Appllama MCP and the 85-screen local cache.

A previous agent was killed mid-pass and left no notes. Its visual work did
land: all nineteen screens carry an `atmosphere` frame. Only the UX was
missing, so this pass starts from a styled but unexamined section.

---

## 1. The astrology was wrong on a card

S-05b deals a card for `M., 24 — VIRGO · AIR · TAURUS MOON`.

**Virgo is an earth sign.** The card's own ALIGN line says so three rows
lower: *"Earth grounds air — you keep a steady pace."* The chip and the body
copy on the same card contradicted each other.

In a product whose entire premise is that it reads charts properly, this is
the most expensive class of bug in the file — it is the one mistake a user
who cares about astrology will catch instantly, and it costs the app its
authority. Fixed to `EARTH`, and the chip re-dressed to match: pill stroke,
orb gradient and drop-glow all moved from the air blue `#7FD8F5` to the
file's earth cream `#F4EDE2` (`VariableID:5:146`), with a warm tan orb
(`#FFF9ED → #AA8760`) so it still reads as the same glossy component.

Every other `AIR` chip in the section is on the J./Libra card and is correct.

## 2. The alignment panel was repeated above six conversations

Seven chat screens (S-09, S-09b–S-09g) each carried the same 234px block:

> COSMIC ALIGNMENT / Strong / "A spark of creative tension — see their full
> card to understand the pull." / View full card › / 3 STRENGTHS / 3 CHALLENGES

A programmatic count settled it: **S-09 holds 0 conversation nodes; the other
six hold 3 each.** So on six screens a full chart reading sat on top of a real
conversation, and it duplicated S-21 Alignment, the dedicated full-read screen.

S-09 is the locked state — no messages yet, the reading is the content, and it
keeps the full panel. On the six that carry a conversation the panel collapses
to the header row: sign-pair glyphs, the resonance bar, the `Strong` pill.
**234px → 118px, recovering 116px of message space per screen.**

### Where the collapsed form came from

Stardust's `Selected Day Calendar` (`oth_cos62`) is the same problem solved:
a whole day's reading compressed into a card that sits under a calendar.

| Stardust | Align |
|---|---|
| Serif headline `Friday, Jul 24` + one saturated moon glyph | `COSMIC ALIGNMENT` + the sign-pair glyphs |
| Muted dot-separated line `Waxing Gibbous Moon • Cycle Day 3 • Period` | the resonance bar — Align states the reading as a figure, not a sentence |
| A row of small circular icon chips carrying all the colour | the seven-segment chakra bar |
| **Circled `›` at the top-right** | circled `›` at the top-right |
| Outlined `Log` pill for the immediate action | the `Strong` pill |

The borrowed thing is the **principle**: a summary card earns its place by
compressing the reading to one glanceable row and offering one obvious way in.
The chevron is the part Align was missing — collapsing the panel had removed
`View full card ›` along with the paragraph, leaving the route to S-21 with no
affordance at all. It is back as a 28px translucent-white disc with a thin
chevron, which is Stardust's device, not Stardust's drawing.

## 3. Spec language

Five canvas captions named Figma nodes rather than describing the screen:

| was | now |
|---|---|
| `Logged in? · node Auth (decision)` | `Logged in?` |
| `The deck, face down · node Card · 7a` | `The deck, face down` |
| `The veil lifts · node Match · 7d` | `The veil lifts` |
| `Zodiac guidance chat · node Chat · 2e` | `Zodiac guidance chat` |

These sit **above** the phone on the canvas, not inside it — they are design-file
labels, not in-screen leakage, and they stay. Only the node jargon went, to
match the convention the onboarding pass set.

## 4. Typography

`A spark of creative tension - see their full card…` used a hyphen where the
rest of the file uses an em dash. Fixed on all seven chat screens.

---

## 5. Four more defects on the chat and deck screens

| Screen | Was | Now |
|---|---|---|
| S-06 | `IF SHE ALIGNS TOO, THE CARD REVEALS HER — SEE S-08` | `IF SHE ALIGNS TOO, HER CARD TURNS OVER` — the rule, not the frame number |
| S-09 | `Send` drawn at full strength beside an input reading `Align back to write` | label to 32% and the control to 55% — a locked channel should look locked |
| S-05b | `No photo until you both align` at 62% over the brightest part of the aura | 92% plus a 4px dark drop shadow, so it survives the bloom underneath |
| S-09 ×7 | the avatar a blank 44px disc | Juniper's Libra orchid aura |

### The avatar was the one place the instrument was missing

`align-design-language.md` makes the aura Align's colour instrument, and the
product's whole promise is that **there is no photo until you both align**. So
a blank grey circle in the chat header was not a neutral placeholder — it was
the one screen where the veil had nothing behind it, on a screen whose own copy
reads *"Her glow reached for yours."* There was no glow.

The 33px slot inside the avatar ring already existed and already held a radial
gradient; it was simply transparent at every stop. It now carries Libra —
ORCHID `#e85ac8`, light `#f8c4ee`, deep `#4a0f3c` — as a 0.92 → 0.82 → 0.45 → 0
ramp. Her sign is what you see until her face is earned.

**One wrong turn worth recording:** the first attempt selected the disc by
y-band alone and hit the *back button's* 44px hit area on all seven screens,
putting an orchid bloom behind the chevron. Reverted and re-targeted by x —
back button sits at x 24, avatar at x 80. Select header-band furniture by x,
not by size and row alone.

---

## Still open

1. **"Peak" or "Peek".** The frames say `S-05d — Peak · Photo Open`, the deck
   control says `Hold to Peak`, and the inner captions say `Peek`. The mechanic
   is a brief look, which is *peek* — but "Peak" is used across the bespoke
   section too, so this is a vocabulary decision, not a typo to silently fix.
2. **Canvas order does not follow flow order.** Child order ends with S-03
   Dealing and S-04 Your Stack, which are beats two and three. Reading the
   section top to bottom does not walk the product.
3. **S-05c "loading" renders a complete card.** A skeleton that shows every
   field is not a skeleton.
