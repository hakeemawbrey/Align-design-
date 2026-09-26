# Wave 3 — onboarding on the aurora frame · agent brief

Four agents (E, F, G, H) work the same Figma file in parallel on disjoint
screens. **Never edit a node outside your list.** No git. Notes go to
`design/wave3/agent-<letter>.md` only. Read `design/wave1/BRIEF.md` first for
the file key, tool loading, plugin-API gotchas and the scoring loop — all of it
applies. Also read `design/notes-bespoke-coreflow.md` (pearl holo spec) and
`design/aura-system.md` §1–2, §7.

## Why

Stardust front-loads its colour into onboarding (median 19.9% accent) with a
consistent **frame**: a top aurora behind the headline, a warm bottom aurora
behind the CTA, and the rainbow CTA. Our onboarding must do the same, hero art
varying per screen. Breathers opt out. See `design/stardust-teardown.md` §1.

## The frame — already built, instance it

Component `Aurora frame · onboarding` = node **`1473:856`** (in `Kit · Onboarding
frame`, `1473:855`). Instance with `(await figma.getNodeByIdAsync('1473:856')).createInstance()`,
set x=0 y=0, and insert it **directly above the starfield/atmosphere layer** and
below everything else. It carries `aurora · top (headline)` (violet
`#8B4CB8`) and `aurora · bottom (CTA, warm)` (`#C48F46`). To give a screen its
own hue, override the TOP aurora's fill on the instance (find the child by name;
keep the same radial stops, change the colour). Prototype: O-03 `1019:2354`
measured 18.4% accent against Stardust's birthday screen at 19.7%.

## Shared furniture (clone from these)

- status bar `1379:1915` · home indicator `1384:1928` · starfield `1378:1919`
- pearl holo button `1387:1915` — clone whole; change only the label text
  before the trailing `✦`, keep the `✦` as its own SF Pro Regular 15 range
- screen frame: 390×874, fills copied from S-05 `937:1925` (variable-bound)
- aura tiles: `Kit · Aura photos` `1426:855` — children `Aura photo · <Sign>`,
  read `fills[0].imageHash` · figure tiles: `Kit · Figures` `1426:868`
- card back `1118:1928` · Juniper's card `998:1925` (has the IMAGE aura panel)
- The founder's twelve core colours: Aries `#F5A070` Taurus `#D6DC7C` Gemini
  `#F0CC8C` Cancer `#6AAEE6` Leo `#F8AC55` Virgo `#F58F9C` Libra `#D695DE`
  Scorpio `#EA4680` Sagittarius `#D479DA` Capricorn `#86D4B6` Aquarius `#70C6E4`
  Pisces `#B681E2` (rim: Taurus `#8FC24B`, Libra `#8B4CB8`)

## Type

EB Garamond Italic 30 headline (cream `#F5EFE2`, centred, 1–2 lines) · SF Pro
Regular 13 sub (`#EFE6D6` @0.75, centred) · eyebrow SF Pro Semibold 10 ls 14%
cream @0.5 · body SF Pro Regular 13 `#EFE6D6` · caps labels SF Pro Semibold 9.5
ls 8%. Voice: second person, present tense, specific, faintly savage, ends on a
turn. Zodiac glyphs must be DRAWN (typed `♉` renders as emoji).

## Building a NEW screen

The copy lives on the clone page in section `Onboarding` (`6:4`): read the
source frame's TEXT nodes (`findAllWithCriteria({types:['TEXT']})`) and reuse
the copy, correcting any Gemini/Aries reference to Taurus (the account) or
Libra (Juniper). Then build fresh in section **`937:1924`** at the x/y in your
list, named exactly as listed. Do NOT copy the clone's atmosphere or layout —
build to the frame + furniture above.

## Gate

Onboarding target **15–25% accent**; breathers (O-01, O-06, O-15) **< 1%**;
utility screens in the flow (O-03b, O-03c, O-03d) ≤ 3% (frame off or top
aurora only at low alpha). Score every screen; Read every render; the hero must
be nameable from the thumbnail. Record numbers in your notes.
