# Wave 5 — agent P · Auth, Account, Matches & Safety

21 screens, every one screenshotted at 874 and Read before and after. Scorer
= `scratchpad/score.py`. Renders in `scratchpad/w5p/` (`g*.png` before,
`*_v2/_v3.png` after, `ba_strip.png` before/after of the three rebuilt screens).

## Auth (`1554:860`) — all utility, all left alone

| node | screen | subject before → after | replaced | accent / haze | Stardust still |
|---|---|---|---|---|---|
| `1534:2050` | G-01 Phone Entry | none → none | — | 0.00 / 0.00 | onboarding_03 login (0.09) — parity; ours has the pearl holo where theirs has the gradient CTA |
| `1534:2140` | G-01b Email Entry | none → none | — | 0.00 / 0.00 | onboarding_03 |
| `1535:8273` | G-02 Code Verification | none → none | — | 0.00 / 0.00 | other-tabs_33 referral code — six boxes, no ornament, parity |
| `1535:8367` | G-03 Permission Primers | none → none | the three 32px notification "app icons" were the Taurus aura tile with the ♉ glyph inside a non-sign object; re-cropped the same image fill (`CROP`, top half) so only the green-gold aura band shows, no glyph | 0.20 / 0.34 → 0.26 / 0.31 | onboarding_16 notification cards with app-icon thumbnails |
| `1538:8237` | G-03b Permissions Denied | none → none | — | 0.00 / 0.00 | other-tabs_21 toggles |
| `1538:8338` | G-04 Sign-in Failure | none → none | — | 0.00 / 0.00 | onboarding_03 |
| `1539:2024` | G-21 Lost Number | none → none | — | 0.00 / 0.00 | other-tabs_12 |
| `1539:2124` | G-22 New Device | none → none | — | 0.00 / 0.00 | other-tabs_12 |

No phones, envelopes, shields, locks or bells anywhere in Auth — the type
already carries all eight. Nothing to remove.

## Account (`1554:861`)

| node | screen | subject before → after | replaced | accent / haze | Stardust still |
|---|---|---|---|---|---|
| `1006:1926` | G-05 You · Taurus | "green-gold aura card" 4 → 4 | — (card + tile is the whole number; no ambient wash, haze 7 is the tile itself) | 6.28 / 6.96 | other-tabs_02 home (1.2) — ours carries the founder's art, theirs a dial |
| `1536:855` | G-05b Your Card · Flipped | "the card, flipped" 4 → 4 | — | 6.11 / 6.95 | — |
| `1546:8746` | G-06 Edit Chart | none → none; Taurus / Sagittarius moon / Libra rising, May 4 1994, 3:52 PM, Tulsa OK — identity correct | — | 0.00 / 0.00 | other-tabs_23 / 24 birth time — parity |
| `1547:8326` | G-07 Settings | none → none | — | 0.01 / 0.00 | other-tabs_12 / 21 — parity |
| `1547:8449` | G-08 Pause / Delete | none → none | — (the 4.6 is the one red destructive pill) | 4.62 / 0.03 | — |
| `1548:8398` | G-27 Edit Card · Face Down | "the card back" 3 → 3 | — see "left alone" | 0.28 / 0.04 | — |
| `1549:855` | G-28 Edit Card · Flipped | "an edit form" 3 → 3 | — (revealed-photo thumb is a 40px aura tile, fine) | 0.13 / 0.19 | other-tabs_12 |
| `1549:8401` | G-29 Help & Support | none → none | — | 0.00 / 0.00 | other-tabs_12 |

## Matches & Safety (`1554:862`)

| node | screen | subject before → after | replaced | accent / haze | Stardust still |
|---|---|---|---|---|---|
| `1005:1926` | G-09 Matches | "six glowing cards" (a wall of six 169×172 foil-edged cards, each a full aura tile + coloured sign name + coloured chip) → "a list of six aura discs" 4 | hid `grid` `1005:2032`; built `list · flat` inside `content` `1005:2025`: three section heads (Space Mono 9.5 + hairline), six 76px rows — 48px feathered aura-tile avatar (SCREEN, blurred ellipse mask, §7 recipe) in each match's own hue, EB Garamond Italic 18 name, SF Pro 12 "Sign · state" line in muted cream, Space Mono recency top-right, `›`, hairline dividers. No coloured text, no chips, no foil strokes, no day rails. Sagittarius text was `#a855f7` (not a founder colour) — gone with the cards | **15.34 / 7.08 → 2.03 / 0.60** | P-02 `1547:855` avatars as the pattern; other-tabs_02 (1.2) for the flat ground |
| `1544:2231` | G-09b No Matches Yet | "three empty rings" 2 → "your aura alone in rings" 4 | added `hero · your aura`: 124px feathered Taurus aura tile (SCREEN) centred in the inner hairline ring; rings kept (hairline geometry is allowed) | 0.00 / 0.00 → 0.19 / 0.28 | other-tabs_10 arc graphic — hairline + one subject |
| `1544:2317` | G-10 Chat Empty State | "Juniper's avatar" 3 → 3 | — (34px Libra aura disc in the header, nothing else) | 0.10 / 0.00 | other-tabs_31 journal (0.28) |
| `1546:8555` | G-11 Report / Block | none → none | — (one red pill) | 4.64 / 0.15 | — |
| `1546:8663` | G-12 Match Expired | "a small grey box" 1 (56×84 flat rect standing in for a card) → "a dim violet card" 4 | hid `card · face down` `1546:8740`; built `card · face down · aura` 100×156 r12 at the same centre: dark ground, Libra aura tile SCREEN @0.55 inside a card-shaped mask, 1px Libra-rim `#8B4CB8` @0.55 stroke; eyebrow/headline/sub nudged 30px down to clear it | 0.00 / 0.00 → 1.95 / 0.00 | Feeld / Hinge close-states have no equivalent in the cache; held to S-12 door (masked tile, hairline rim) |

## Appllama

4 credits: `search_screens` keyword "matches list", "matches" (screen_type
home), "Match", and one semantic query. None returned a dating-app matches
list (Hinge / Bumble are not in the keyword index under those names), so
the G-09 pattern is held to P-02's avatar-tile treatment and the Stardust
flat-ground stills instead. Nothing changed because of the Appllama calls.

## Unsure / left alone on purpose

- **G-27 card back** (`1118:1928` clone): seed-of-life hairlines with the
  seven chakra dots. It is the shared card-back component used by the deck
  screens and wave 1 froze card structure; it reads as "a card back", not
  clip-art, but it is the only vector figure left in my set. Flag for whoever
  owns the component if the founder calls it weird.
- **G-05 / G-05b at 6.1–6.3%**: above the instrument band but inside the
  ≤ 8% the brief allows for the You screen; all of it is the Taurus tile.
- **G-08 / G-11 at 4.6%**: the one red pill each. Two actions on G-08 (Pause
  outline + Delete red) — the screen needs both; kept.
- **"J., 27 · Veil lifting"** on G-09: kept the initial rather than
  "Juniper" — the veil-lifting state is the moment the name arrives; the
  other five (post-veil) carry full names. Change to "Juniper, 27" if the
  product logic says matches are always named.
- G-09's rebuilt list ends ~90px above the tab bar (six rows only); with
  more matches it scrolls under it.
- G-12 has no holo (secondary outline pill only) — deliberate from wave 4,
  kind on a loss screen; left.
