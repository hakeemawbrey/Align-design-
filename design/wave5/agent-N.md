# Wave 5 — agent N · Core Flow (`1554:856`)

Renders in `scratchpad/w5n/now/` (`<screen>.png` = state at the start of this pass,
`*_v2..v5` iterations, `*_final.png`, `final_ba.png` before/after strip of the four
rebuilt screens). Score = `score.py` accent% / haze%. An earlier, rate-limited pass had
already hidden the old washes on every deck/chat screen, put the aurora instance on S-02
and built first versions of the S-07 / S-08 / S-21 tile heroes; this pass re-checked every
screen from fresh screenshots and finished those three plus S-05d.

**Renderer finding worth keeping:** an ELLIPSE node carrying the image fill, placed under a
blurred feather mask, renders with a hard oval edge (the blur on the mask is ignored and
the SCREEN grain shows as a lit disc — very visible on S-21's bright foil). The same tile as
a RECTANGLE image node under the same mask feathers correctly. All tile heroes in this
section now use RECTANGLE image nodes; the old ellipse tiles are hidden, not deleted.

| screen | node | subject test before → after | what changed | accent / haze before → after | Stardust still |
|---|---|---|---|---|---|
| S-01 Open App | `1645:855` | "the mark on black" 4 → same | nothing (splash; mark = hairline seed + 7 sharp chakra dots, no wash, no aurora needed) | 0.34 / 0.2 | welcome-screen_02 |
| S-02 Auth Decision | `1464:952` | "a dimmed card back under aurora" 4 → same | verified: one `Aurora frame · onboarding` instance directly above starfield, no other screen-level glow ellipses | 0.79 / 13.0 (aurora) | onboarding_03 login |
| S-03 Dealing | `1399:1935` | "Juniper's card" 4 → same | verified: all four `glow · *` / `aura bloom` ellipses + flower-of-life hidden; colour is the card's IMAGE aura panel only | 5.80 / 2.7 | other-tabs_36 fanned deck |
| S-04 Your Stack | `1399:2135` | "Juniper's card" 4 → same | same as S-03, nothing to do | 5.80 / 2.7 | other-tabs_36 |
| S-05 The Deck | `937:1925` | "Juniper's card" 4 → same | verified: aura panel is an IMAGE fill (CROP) inside the panel frame, keyline/foil strokes intact, washes hidden | 5.80 / 2.7 | other-tabs_34 tarot result |
| S-05b next card | `1400:1921` | "M.'s Virgo card" 4 → same | nothing | 7.42 / 7.1 (the Virgo tile is warmer, all of it on the card) | other-tabs_34 |
| S-05c Reading | `1399:2335` | "Juniper's card" 4 → same | nothing (legend hidden, fans dimmed by design) | 5.12 / 2.7 | other-tabs_37 card detail |
| S-05d Peak · Photo Open | `1021:1926` | "pink smudge in a frame" 2 → "a glowing figure in the photo panel" 5 | the panel image was a pink-desaturated Libra aura tile (read as a smudge); panel `1021:2100` fill → `Figure · Libra` (FIT, the tile's black ground matches the panel) | 1.11 / 7.8 → 2.88 / 3.1 | other-tabs_37 |
| S-05e Peek · sealing | `1400:2122` | "Juniper's card" 4 → same | nothing | 5.78 / 2.6 | other-tabs_34 |
| S-06 Expand Card | `1465:859` | "small card + reading" 4 → same | nothing; flat ground | 1.40 / 1.2 | other-tabs_37 |
| S-07 Match | `1019:1926` | "two auras meeting" 4 → same, rounder | feather masks on both aura-photo tiles 0.74 → 0.66 blur 34 (tiles were reading square-ish); old foil-card pair + blooms stay hidden; SCREEN on the image nodes inside PASS_THROUGH frames per aura-system §7 | 2.30 / 0.6 → 1.58 / 0.6 | Boo match (Appllama, negative: mascot clip-art) |
| S-08 Veil Lifts | `1019:2033` | "aura with a hard cut + pink blob" 2 → "a glowing figure emerging under the veil" 5 | top aura: ELLIPSE image node → RECTANGLE (hard bottom edge gone), mask 0.72 blur 30; the pink pseudo-photo tile (`photo · Juniper`, itself a recoloured aura) replaced by `Figure · Libra` 284×238 SCREEN under an ellipse feather (0.84×0.92, blur 30) rising from the card's bottom; dissolve fade, vignette and particles kept; old gradient portrait ellipses stay hidden | 2.54 / 2.1 → 5.34 / 0.3 (≤15 celebration) | other-tabs_34 (one card, one figure) |
| S-09 Chat | `1019:2140` | none (flat thread) → same | verified: bubbles #2B1E4C / #34235F, header avatar = Libra IMAGE tile, every glow + vesica hidden | 0.12 / 0.0 | other-tabs_31 journal |
| S-09b Chat · Alignment | `1028:8119` | "chakra column sheet" → same | nothing; the seven coloured centres + vesica are the alignment diagram itself (the sheet's subject), left | 0.35 / 0.4 | other-tabs_31 |
| S-09c sent/unread | `1405:1928` | none → same | nothing | 0.12 / 0.0 | other-tabs_31 |
| S-09d typing | `1405:2087` | none → same | nothing (green state label only) | 0.13 / 0.1 | — |
| S-09e not sent | `1405:2246` | none → same | nothing (red state label only) | 0.20 / 0.1 | — |
| S-09f expiring | `1405:2405` | none → same | nothing (orange rail + eyebrow = state) | 0.35 / 0.4 | — |
| S-09g closed | `1405:2564` | none → same | nothing (thread dimmed, rail hidden) | 0.22 / 0.0 | — |
| S-10 Deck Spent | `1027:1971` | "three ghost cards" 4 → same | verified: hairline ghost cards, seed geometry hidden, glows hidden | 0.03 / 0.6 | other-tabs_02 home |
| S-21 Alignment | `1378:1915` | "two auras inside a lit oval on a foil card" 3 → "two auras melting on a foil card" 4 | the visible oval was the ELLIPSE image tiles under the blurred mask (see finding); both tiles rebuilt as RECTANGLE image nodes (`1725:855`, `1726:855`), masks 0.66 blur 34, the melt kept, well stays hidden (§7: no well on foil) | 9.81 / 0.0 → 9.90 / 0.1 (oracle band) | other-tabs_34 |
| S-05x sky · fire | `1638:855` | "Juniper's card under a dusk sky" 4 → same | left: wash is a linear 0.78→0 by 55% of the frame from the element's deep tone, lobe 520×220 off the top, blur 110 @0.34 — reads as a sky at 2×, readout `TONIGHT · MOON IN LEO · FIRE SKY` legible, card still the subject | 6.02 / 19.5 | other-tabs_36 |
| S-05x sky · earth | `1638:1058` | "card under a green sky" 4 → same | left, same reasoning | 5.77 / 12.4 | — |
| S-05x sky · air | `1638:1261` | "card under a blue-violet sky" 4 → same | left (air is the quietest because its deep tone sits next to the ground hue) | 6.50 / 2.6 | — |
| S-05x sky · water | `1638:1464` | "card under a blue sky" 4 → same | left | 5.96 / 12.3 | — |

## Stardust / Appllama

Cache stills: other-tabs_34 (tarot result: one card, one lit figure, nothing else), _36
(fanned deck), _37 (card detail), _02 (home) for the deck screens and S-10; _31 (journal)
for the seven chat states. 2 Appllama credits spent (one semantic search for match
screens — nothing from Hinge/Tinder is in the library, results were song/celeb apps; one
app search confirming Hinge is absent, Feeld is present but its cached stills are bio /
interests screens). The earlier pass's Boo match still is a mascot-clip-art negative
exemplar. Neither changed a decision; S-07 / S-21 were held to the aura-system §7 recipe
and the S-13 exemplar (`1540:855`).

## Unsure / left alone on purpose

- **Deck accent 5–7%** on S-03/04/05/05b/05c/05e/S-05x is above the 1–4% instrument band, but
  every counted pixel is the card's aura panel, moon badge and chips (agent P found the
  same on G-05 at 6.3%); the ground is flat and all washes are hidden. Not reduced.
- **Skies** kept as designed (fire haze 19.5%, earth 12.4%): the brief asked for the wash
  concept to stay; if the founder still reads fire as heavy, the first thing to try is the
  wash's top stop 0.78 → 0.6.
- **S-08 / S-05d now show the Libra figure** (the scales) where a photo would appear; the
  founder's boards have no photographic portraits and the pink recoloured aura read as a
  smudge. If real portraits arrive they drop into `1711:873` and `1021:2100`.
- **Sign glyphs inside the S-07 / S-21 aura tiles** (♉ ♎ baked into the boards) are left —
  the tiles stand for the two people's signs, not for another object.
- **S-09b** keeps its chakra column + vesica: it is the alignment diagram, not decoration.
- Hidden, not deleted: S-21 `1390:1917` / `1390:1918`, S-08 `1023:8070`, all old glow /
  bloom / geometry ellipses on the deck and chat screens.
