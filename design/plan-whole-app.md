# Plan — the whole app

109 screens in 12 sections. 39 are built in the bespoke `✦ STARDUST` section,
70 are still clones. This assigns every screen a **zone**, a **target accent
band**, and the **one thing that carries its colour**, then sequences the work
in waves with a scoring gate and an Appllama spend for each.

Evidence: `stardust-teardown.md`. Workstreams: `plan-stardust-parity.md`.

---

## 1. The rule that produces Stardust's numbers

Stardust's onboarding runs at a 19.94% median and its product at 2.03%. Reading
the onboarding screens again for *why*, the loudness is not the hero art alone —
even a two-row form (`Cycle Data Import`) measures 27%. It is a **frame**:

```
onboarding frame   top aurora behind the headline
                   + warm bottom aurora behind the CTA
                   + the rainbow CTA itself
                   applied to every onboarding screen; hero art varies
product frame      none of that. flat #12052D. colour only from the object.
```

So the whole-app rule is one sentence: **onboarding gets the aurora frame; the
product does not.** That single split moves both medians to where Stardust's are.
Breathers (splash, plain-text beats, resume) opt out of the frame.

### Zones and bands

| zone | band | ground | colour comes from | Stardust proof |
|---|---|---|---|---|
| **onboarding** | 15-25% | aurora frame | the hero + the frame | onb median 19.94% |
| **oracle** | 12-22% | radial spotlight behind the hero | one drawn figure or planet | Sun Sign 19.5%, Zodiac Library 18.9% |
| **instrument** | 1-4% | flat | the card's planet, state colour, data | Home 1.2%, Calendar 1.9% |
| **utility** | <1% | flat | nothing — the words | Settings 0.34%, Login 0.09% |
| **breather** | <1% | flat | nothing | Splash 0.03% |

Status key: **✓** built bespoke · **◐** built, needs rezoning · **○** clone only.

---

## 2. Every screen

### Onboarding — 19 screens · zone: onboarding

The colour budget lives here. Stardust alternates loud beats with breathers;
so do we. Target median ~18%.

| screen | band | what carries it | ref | status |
|---|---|---|---|---|
| O-01 Splash | breather | wordmark, one glow dot | `spl_v10s2` | ✓ |
| O-02 Arrival | 20% | dark horizon, **discrete bright orbs** in six sign hues, card back rising | `spl_r2qx6` welcome | ◐ orbs are fog |
| O-03 Birth Data | 15% | frame + a **constellation** above the wheel | `onb_l67um` birthday | ◐ |
| O-03b Age Blocked | utility | — | — | ○ |
| O-03c No Birth Time | 12% | frame, wheel picker | `oth_28zbq` | ○ |
| O-03d Waitlist | 8% | one dim lobe, concentric rings | — | ○ |
| O-04 Birth Sky | 20% | **the sky at your birth** — the 12-sign wheel with the moon lit | `oth_jka4o` dial | ○ |
| O-05 Sign Reveal | 20% | **your sign's creature**, gold spotlight (sun) | `oth_vaabh` | ◐ needs the figure |
| O-06 User Manual | breather | plain centred serif | `onb_1x3ow` | ○ |
| O-07 Big Three | 15% | three small planets — sun gold, moon blue, rising violet | `oth_vaabh` / `oth_3nos2` hue pair | ○ |
| O-08 Chart Check | 10% | frame, the chart as a confirm list | — | ○ |
| O-09 Venus | 18% | **Venus as a rendered planet**, rose spotlight | `oth_zr0f1` planet | ○ |
| O-10 Element | 15% | **the element orb** — fire / earth / air / water | `oth_saj9t` Find Your Element | ○ |
| O-11 Flipped Card Rule | 10% | explanatory diagram: card face-down → face-up | `oth_u0w7t` fertile zone diagram | ○ |
| O-12 Dealbreakers | 3% | chip grid, many small hues | `oth_g5cn3` symptom picker | ○ |
| O-13 Photo Upload | 12% | the **planet card** preview — this is where the veil is explained | `onb_ldrms` cupped hands | ◐ |
| O-13b The Field | 15% | the deck as a field of card backs | `oth_2sw6q` fanned deck | ○ |
| O-14 Paywall | 20% | timeline + moon; CTA **desaturated** here only | `pay_se9uj` | ○ (S-11 exists) |
| O-15 Resume | utility | — | — | ○ |

### Core Flow — 20 screens · zone: instrument

Quiet. The card's planet is the only colour on most of these. Target median 2-3%.
Two exceptions are the product's two celebrations.

| screen | band | what carries it | ref | status |
|---|---|---|---|---|
| S-01 Open App | breather | — | — | ○ |
| S-02 Auth Decision | 2% | card back, small, **dimmed** behind the buttons — Stardust dims art under a form | `onb_3ayky` 0.09% | ○ *(earlier concept was too loud)* |
| S-03 Dealing | 5% | the fan; the cards carry it | `oth_2sw6q` | ✓ |
| S-04 Your Stack | 3% | the stack | — | ✓ |
| S-05 The Deck | 3% | **the planet on the card** | Jai card `oth_pc4wa`-adjacent | ◐ aura → planet, geometry off |
| S-05b next card | 3% | same | | ◐ |
| S-05c loading | 2% | same, dimmed | | ◐ |
| S-05d Peek open | 4% | the photo, briefly | | ✓ |
| S-05e Peek sealing | 3% | the planet returning | | ◐ |
| S-06 Expand Card | 4% | card at top, reading card below | `oth_w9fny` Tarot Detail 3.2% | ○ |
| S-07 Match | **15%** | **two planets meeting** — dark body, burning ring, small orbiter | `Invite your partner` eclipse | ◐ |
| S-08 Veil Lifts | **15%** | the planet becoming a face | — | ◐ |
| S-09 Chat | <1% | state colour on the strip only | `oth_eg5bz` journal 0.28% | ◐ vesica off |
| S-09b Chat Open | <1% | same | | ◐ |
| S-09c–g five states | <1% | strip colour only | | ◐ vesica off |
| S-21 Alignment | 3% | **the donut**, scored across five categories | `oth_iqlqb` Cycle Insights 0.27% | ◐ from 7.8% — two-lobe melt off |
| S-10 Deck Spent | utility | concentric, one dim lobe | — | ✓ |

### Guidance — 9 screens · zone: oracle (the loud ones) + instrument (the tools)

| screen | band | what carries it | ref | status |
|---|---|---|---|---|
| S-14 Sky · today | 2% | **the wheel is the colour**; nothing else saturated | `oth_jka4o` 1.2% | ✓ |
| S-15 Cosmic Calendar | 2% | moon strip + a 4-day band | `oth_xomsp` | ✓ |
| S-16 Term Explainer | 5% | one small bright object, dark ground | `oth_u0w7t` 0.14% | ◐ from **30%** |
| S-20 Glossary | 1.5% | five rows, five planet hues | — | ✓ |
| G-23 Your Sign · Gemini | **20%** | **the Gemini twins**, gold spotlight | `oth_vaabh` | ◐ needs the figure |
| G-24 How You Show Up | 18% | same twins, violet spotlight; SUN / MOON / RISING filled segmented | `oth_m9j2z` | ◐ |
| G-25 Your Element · Air | 15% | the air orb | `oth_saj9t` | ◐ |
| G-26 Your Ruler · Mercury | 15% | **Mercury as a planet** | `oth_zr0f1` | ◐ |
| S-05 entry | — | duplicate of Core Flow; drop from this section | | ○ |

### Club — 7 screens · zone: instrument (social)

Stardust's social tab is `Your Orbit`, and it is quiet — the colour is on the
people. Members are the same sun sign, so hue comes from their **moon signs**
via each member's small planet.

| screen | band | what carries it | ref | status |
|---|---|---|---|---|
| S-17 Sign Club | 6% | small Gemini emblem in the header; **members as planets** | `oth_hju99` Your Orbit | ◐ from 13.7% |
| S-17b Post Detail | 1% | avatars' moon hues | | ✓ |
| S-17c Empty Club | utility | concentric | | ○ |
| S-17d Write a Reply | utility | — | `oth_eg5bz` | ○ |
| S-18 Write Post | utility | — | `oth_eg5bz` | ○ |
| S-18b Report Post | utility | — | | ○ |
| S-18c Post Removed | utility | — | | ○ |

### Limits & Align+ — 8 screens

| screen | band | zone | what carries it | ref | status |
|---|---|---|---|---|---|
| S-11 Align+ Paywall | 20% | onboarding | timeline + moon; desaturated CTA | `pay_se9uj` | ◐ |
| S-12 Trial Active | **25%** | onboarding | **the golden door and key** — Stardust's hottest screens are the trial beats | `onb_1uado` 46% | ○ |
| S-13 Wait for Reset | utility | | concentric, a countdown arc | | ○ |
| P-01 Block a Sign | 2% | instrument | twelve glyph chips, each in its sign hue, small | `oth_g5cn3` | ○ |
| P-01b Choose Signs | 2% | instrument | same; blocking extinguishes a chip | | ○ |
| P-02 Priority Queue | 6% | instrument | a queue as an orbit | | ○ |
| P-03 Change City | utility | | search field | `Where were you born?` | ○ |
| S-10 Deck Spent | utility | | (duplicate — lives in Core Flow) | | ✓ |

### Auth — 8 screens · zone: utility

Stardust's login is 0.09%. All bare, one exception.

| screen | band | what carries it | ref | status |
|---|---|---|---|---|
| G-01 Phone / G-01b Email | <1% | — | `onb_3ayky` | ○ |
| G-02 Code | <1% | — | | ○ |
| G-03 Permission Primers | 7% | **mock notification cards** with our actual copy | `onb_r651p` 7.3% | ○ |
| G-03b Denied | <1% | — | | ○ |
| G-04 Sign-in Failure | <1% | — | | ○ |
| G-21 Lost Number · G-22 New Device | <1% | — | | ○ |

### Account — 7 screens · zone: utility, with the profile as the exception

| screen | band | what carries it | ref | status |
|---|---|---|---|---|
| G-05 You | 8% | **your planet card**; no ambient glow | `oth_pc4wa` Jai | ◐ from 17.8% |
| G-05b Your Card · Flipped | 5% | the card | | ○ |
| G-06 Edit Chart | <1% | editable rows with pencil | `oth_pc4wa` Personal Details | ○ |
| G-07 Settings | <1% | caps section headers only — `YOUR ORBIT` for blocked | `oth_zgx1n` | ○ |
| G-08 Pause / Delete | <1% | one **red** destructive pill | `oth_mkh5s` | ○ |
| G-27 / G-28 Edit Card | 3% | the card | | ○ |
| G-29 Help & Support | <1% | external-link rows | `oth_wf6rw` | ○ |

### Matches & Safety — 5 screens · zone: instrument / utility

| screen | band | what carries it | ref | status |
|---|---|---|---|---|
| G-09 Matches List | 3% | each match a **small planet** in their hue | `oth_hju99` | ◐ from 11.8% |
| G-09b No Matches Yet | utility | concentric | | ○ |
| G-10 Chat Empty | utility | — | | ○ |
| G-11 Report / Block | utility | red destructive | | ○ |
| G-12 Match Expired | utility | quiet and kind; no theme | Feeld | ○ |

### Subscription — 4 screens

| screen | band | zone | what carries it | ref | status |
|---|---|---|---|---|---|
| G-13 Manage Align+ | <1% | utility | `Upgrade` pill is the only colour | `oth_qh0ga` | ○ |
| G-14 Trial Ending | **25%** | onboarding | the golden door again, warmer | `onb_w9ebx` 36% | ○ |
| G-15 Payment Failed | <1% | utility | — | | ○ |
| G-16 Restore | <1% | utility | — | | ○ |

### System States — 4 screens · zone: utility

| screen | band | what carries it | ref | status |
|---|---|---|---|---|
| G-17 Loading | <1% | **plain grey skeleton** — Stardust does not theme loading | `onb_bexb6` | ○ |
| G-18 Offline | <1% | concentric, one dim lobe | | ✓ |
| G-19 No Cards | <1% | concentric | | ✓ |
| G-20 Error / Update | <1% | — | | ○ |

### Legal, Safety & About — 13 screens · zone: utility

| screen | band | what carries it | status |
|---|---|---|---|
| L-01 – L-05 Terms, Privacy, Guidelines, Delete Confirm, Data Export | <1% | — | ○ |
| SF-01 Verify Photo · SF-02 Verified · SF-02b Rejected | 2% | the planet card, small | ○ |
| SF-03 Blocked List | <1% | `YOUR ORBIT` header | ○ |
| SF-04 Report Sent | <1% | — | ○ |
| SF-05 Meet Safely | <1% | — | ○ |
| A-01 About Align | 5% | **the mark** — seed of life, the one place geometry is the subject | ○ |
| A-02 Space City | 5% | — | ○ |

### Notifications — 5 screens · zone: utility

| screen | band | what carries it | status |
|---|---|---|---|
| S-19 Notifications | 2% | state colour on the row dot only | ○ |
| S-19b None | <1% | — | ○ |
| Detail · Grouped · Settings | <1% | — | ○ |

---

## 3. What the bands add up to

| zone | screens | now (measured sample) | target |
|---|---|---|---|
| onboarding + paywall beats | 22 | O-02 19.8, O-05 19.9, O-03 ~1 | median ~18% |
| oracle | 6 | G-23 15.4, S-16 30 | 12-22%, each with a drawn subject |
| instrument | 36 | S-05 2.0, S-21 7.8, G-09 11.8, S-17 13.7 | median 2-3% |
| utility + breather | 45 | mostly unbuilt | <1% |

Ten screens currently sit **above their band** and will go *down*: S-16, S-17,
G-09, G-05, S-21, S-14's siblings, and the aura on every card. That is the
subtraction the teardown asked for.

---

## 4. Waves

Each wave ends with `score.py` on every screen it touched, a side-by-side
against the named Stardust screen, and a row in `scores.md`.

### Wave 0 — foundations, no screens *(~25 credits)*

Everything later depends on these five assets.

1. **Gemini, Libra, Virgo** as drawn figures — filled forms, grain, glow, glyph
   knockout, constellation. Gemini's twins lit differently.
2. **The planet** — sphere with terminator shading, elliptical ring, small
   orbiting moon, parameterised by sign colour. Goes on every card.
3. **The onboarding frame** — top aurora + bottom aurora + holo CTA, as one
   reusable group.
4. **Controls** — filled violet segmented pill with cream thumb; panel
   `#2B1E4C`; body copy to near-white; row / chip / badge set.
5. **Element orbs ×4**.

Pulls: `Let's connect you to the stars` cluster at full res, all three zodiac
profiles, `Jai` card, `Find Your Element`, `Invite your partner`, and
`list_ui_elements` for segmented controls and profile cards.

Gate: the three figures pass the subject test at 5 in isolation.

### Wave 1 — quiet the product *(~15 credits)* · 36 screens, mostly subtraction

Core Flow, Matches, Chat, Club. Strip every ambient ellipse and geometry
figure. Flat ground. Plant the planet on every card. Rebuild S-21 around the
donut. Build S-02 and S-06 (they were held for this). Fix the six chat states.

Pulls: Feeld and Hinge for the swipe floor and chat; `Your Orbit`; `Cycle
Insights`; `Tarot Card Detail` at full res.

Gate: instrument median 2-3%; no instrument screen above 5% except S-07 / S-08.

### Wave 2 — the oracle *(~15 credits)* · 8 screens

G-23, G-24, G-25, G-26, O-05, S-07, S-08, S-16. Spotlight fields behind the
figures. Field hue as a semantic axis: gold for sun, violet for the profile,
the pair's blend for Match.

Pulls: `Sun in Scorpio`, `Moon in Capricorn`, `Pisces Profile` (the two-body
composition), `Moon Insight Detail`.

Gate: each 12-22%, one hue, subject test ≥ 4.

### Wave 3 — onboarding *(~20 credits)* · 19 screens + 3 paywall beats

All on the frame; heroes per the table; breathers opted out. O-04 Birth Sky,
O-07 Big Three and O-09 Venus are new art (the wheel, three planets, Venus).
S-11, S-12, G-14 get the golden-door treatment.

Pulls: the full Stardust onboarding walk at full res (the cache is 440px),
`7 free days`, both trial reminders, the paywall.

Gate: onboarding median 15-20%; breathers <1%; loud/breather alternation
visible in the row.

### Wave 4 — utility *(~10 credits)* · 45 screens, fast

Auth, Account, Subscription, System, Legal, Notifications. Bare. Section
headers carry the voice. One red pill for destruction. Grey skeleton for
loading. G-03 gets the mock notification cards.

Pulls: Stardust settings set at full res, `Want us to remind you?`, and two
dating apps' safety flows (Feeld, Hinge) for G-11 / G-12 / SF-05.

Gate: median <1%; no aura, geometry or foil anywhere in the zone.

### Wave 5 — the other nine figures + Club *(~20 credits)*

Aries through Pisces, less the three. Then Club's member planets by moon sign.

### Wave 6 — stateful hue *(~10 credits)*

The ground follows tonight's sky. Built as a variant set on S-05 and S-14:
moon in a fire sign, in a water sign, etc. Last, because it is a multiplier on
everything above and worthless before it.

**Total: ~115 credits** of the 1408 remaining. The rest is headroom for the
per-batch comparison pulls the scoring loop needs.

---

## 5. Order of the waves, and why

Wave 1 before Wave 2 even though Wave 2 is the showpiece: the product is where
users live, subtraction is fast, and the quieter product makes the oracle land
harder when it arrives. Wave 3 (onboarding) after the oracle because it reuses
the oracle's figures and the frame. Wave 4 is filler between art waves. Wave 6
last because it multiplies whatever exists.

Nothing new is built on the old blur. S-02 and S-06 open Wave 1, not before.
