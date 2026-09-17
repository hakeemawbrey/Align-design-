# Stardust — full teardown

All 88 screens (85 stills, 3 video-only), read one by one, plus measurement
across the whole set. This supersedes the partial readings in
`stardust-colour-modes.md`.

---

## 1. The headline number

Accent % = pixels with saturation > 0.50 and value > 0.50, on a 300px thumbnail.

| section | n | loud ≥12% | mid 3-12% | quiet 1-3% | dark <1% | **median** |
|---|---|---|---|---|---|---|
| onboarding | 32 | 23 | 3 | 3 | 3 | **19.94%** |
| paywall | 1 | 1 | 0 | 0 | 0 | 20.07% |
| welcome | 2 | 1 | 0 | 0 | 1 | 7.94% |
| **other-tabs (the product)** | **50** | 12 | 8 | 17 | 13 | **2.03%** |

**Stardust front-loads its entire colour budget into onboarding, then the app
you actually live in runs at about a tenth of that.** Onboarding median 19.94%,
product median 2.03%. Thirty of the fifty product screens are quiet or dark.

The twelve loud screens inside the product are almost all the oracle: sun sign,
moon sign, zodiac profiles, tarot, the Pink Moon article.

### What that means for Align

Our five measured product screens run a median of 5.27% — **two and a half times
hotter than Stardust's product surface** — and we have no loud onboarding to
contrast against. So the fix is not "add colour". It is:

- **product screens get quieter** (target median 2-3%)
- **onboarding gets much louder** (target median 18-20%)
- the contrast between the two is the thing that makes Stardust feel rich

We have been running everything at a flat medium, which is exactly the "themes
on every screen" problem, now with a number attached.

---

## 2. The isomorphism, and why the theme does not read as a skin

Period tracking is clinical and slightly shameful; the category is medical-white
with pink accents. Stardust reframed a bodily cycle as a celestial one — and it
is a real mapping, not a costume. The moon runs 29.5 days; a cycle averages 28.

The app is that mapping made structural:

- the moon-phase strip **is** the calendar — every date cell carries a phase glyph
- your cycle day **is** a position on an orbital dial
- cycle phase **is** lunar illumination, and takes its colour from that
- **the background hue is driven by your current phase** — the home screen and
  the symptom sheet go crimson during menstruation, violet during follicular

That last one is the most important single technique in the app. The colour is
**stateful**. It is never arbitrary, so it never feels applied.

Align's isomorphism is already good and should be named as strictly: **a natal
chart is a fixed identity; the sky changes nightly, so the deck deals a scarce
number of identities per night.** The card *is* the person.

The strand we are missing is the stateful one. Nothing in Align's colour is
driven by data. Candidate: the ground hue follows **tonight's sky** — the moon's
current sign, or the dominant element in tonight's deck. That one change would
convert our colour from decoration into instrumentation.

---

## 3. The three zones

Stardust runs three and never mixes them.

| | **Instrument** | **Oracle** | **Utility** |
|---|---|---|---|
| screens | home dial, calendar, logging, charts, journal | sun/moon sign, zodiac profiles, tarot, articles, quizzes | settings, forms, integrations, legal, account |
| accent | 1-3% | 12-28% | <1% |
| ground | flat near-black `#12052D` | saturated single-hue radial | flat near-black |
| colour source | **the data** — day dots, ribbons, donuts | **the artwork** | none |
| illustration | none | one drawn hero, 55-70% of frame | none |
| type | sans, small, tight | serif display, centered, long-form | sans rows |

Utility is genuinely bare — no starfield, no gradient, no art. The theme
survives there **only in the words**: their blocked-users section is headed
`YOUR ORBIT`, their partner list `MY PARTNERS`. Section headers are tiny caps:
`SUBSCRIPTION`, `YOUR INFO`, `YOUR DATA`, `GET IN TOUCH`, `APP INFO`.

Destructive actions get a real red pill (`Delete Your Account`). Loading is a
plain grey skeleton — even that is not themed.

---

## 4. The colour technique we have been getting wrong

On the welcome screen, and everywhere Stardust uses coloured light, the blobs
are **discrete, small, high-chroma spheres with bright defined cores**. Red,
orange, green, teal, blue, magenta, sitting separately along a dark planet
horizon. They read as *objects* — lights, planets — not as atmosphere.

Align's aura ellipses are large, overlapping, low-opacity washes. They read as
fog, which is why our screens all look like the same purple haze and why the
veiled photo looks like a missing asset rather than a deliberate blur.

The fix is specific and applies file-wide:

```
was     large ellipse, opacity 0.22-0.32, LAYER_BLUR 120-150, overlapping
now     smaller lobe, bright saturated core, tighter falloff, clearly separated,
        positioned as a light source that the rest of the screen reacts to
```

Two further rules read off the set:

- **The field is a spotlight behind the subject, not an even wash.** Its
  brightest point sits directly behind the drawn hero.
- **Field hue is a semantic axis.** Sun sign = gold. Moon sign = blue. Period =
  crimson. Fertile = green. The hue tells you *which thing you are looking at*.

---

## 5. The illustration system

Three distinct styles, used for three distinct jobs.

### a. Zodiac creatures — the oracle heroes

Read off `Sun in Scorpio`, `Scorpio/Capricorn/Pisces Profile` and
`Let's connect you to the stars` at full resolution:

```
form        soft FILLED shapes, never outlines. rounded, chunky, sculptural —
            closer to clay than to line art
palette     cream-white highlight #F5EFE2 for the lit mass
            a mid lavender/olive plane for the shadowed mass
            small warm cream accents (horns, claws, bands)
            the face/underside is knocked out in a tint of the FIELD colour
texture     fine grain inside the shapes, strongest in the shadowed mass
glow        wide soft cream halo, r40-60, low opacity, no hard edge —
            the figure is the light source for the whole screen
glyph       the sign's glyph sits on the body, thin stroke, knocked out
constellation  the real star pattern for that sign: hairline cream lines,
            a dot at each vertex, one 4-point sparkle at the brightest star
scale       55-70% of frame width. the subject, not a motif.
```

**Gemini is the instructive one.** The twins are two heads in profile — and they
are lit differently: one luminous cream, one in olive shadow. The duality is
carried by *lighting*, not by duplication. Pisces does the same trick with two
fish curved head-to-tail into a ring.

That is a gift for a dating app: two people, one lit, one not yet — which is
exactly the veil.

### b. Rendered objects — the instrument's vocabulary

Dozens of small 3D-ish objects with gradient shading and a soft glow: droplets,
pills, IUDs, a gua sha stone, chocolate, fries, a cactus, watches, a key in a
doorway, element orbs. Each sits on a lighter-violet rounded card or inside a
tinted circle, with a tiny sans label beneath.

This library is most of what makes the app feel expensive. Align has no
equivalent — our elements are text pills with a small square. Candidates:
the four elements, the planets, the houses, dealbreakers, interests.

### c. Dioramas — content and quizzes

Small scenes (a staircase into violet mountains under a crescent) for archetype
and quiz entry points. A third register, used sparingly.

---

## 6. Component vocabulary

| component | spec |
|---|---|
| **primary CTA** | full-width rounded pill, soft rainbow gradient (pink → cream → lavender), dark text. The single most repeated colour object in the app. Ours (pearl holo) already matches. |
| **secondary CTA** | translucent pill, thin stroke, cream label |
| **segmented control** | filled royal-violet pill, **cream thumb**, caps labels ~13px. Chunky and confident. Ours is a thin outline and looks timid by comparison. |
| **content card** | lighter violet `#2B1E4C`, radius ~20, small rendered object + caps label |
| **chip** | pill, lighter violet, small coloured icon on the left |
| **list row** | flat, lighter violet, chevron or pencil or external-link arrow at right |
| **state badge** | small caps pill in the state's colour, at the top of a card |
| **tab bar** | 5 items, outline cream glyphs, **large cream filled circle in the middle** for the primary action. It expands into a radial arc of 4 sub-actions. |
| **destructive** | full-width red pill |
| **locked content** | rendered then blurred — legible enough to want |

Typography: a soft rounded serif display for headlines (~26-30px, centered,
1-2 lines, often a question), sans for everything else (13px body, centered on
oracle screens, left-aligned in lists), tiny letterspaced caps for eyebrows.

---

## 7. Rhythm and voice

Stardust **alternates loud art screens with pure-text breathers**. Onboarding
goes: art, art, plain-text beat, art, form, art. Align has no breathers — every
screen runs at the same medium volume, which flattens the whole sequence.

The copy is funny, and that is a real part of the polish:

> "Greetings earthling!" · "PMS starts today. Cue howling sirens."
> "Today is the full moon. It's cosmic playtime." · "Recline and conquer"
> "Send in the gua sha" · "Your cycle deserves a fan club"

Content formats are **branded**: `GALAXY BRAIN` for a cited fact, `DAILY DECODE`
for a themed tip. Sources are cited in a `References` accordion. Align names
"the reading" and nothing else.

**One paywall screen in the entire app.** They do not hammer it.

---

## 8. The single best reference for Align: the `Jai` profile card

A person rendered as a planet, inside a card:

```
┌ thin violet stroke, radius ~20 ────────────┐
│ ✧ constellation, top-left      moon phase ●│
│              ┌ PERIOD ┐  <- state badge     │
│                                             │
│         ●  glowing sphere + elliptical      │
│            ring + small orbiting moon,      │
│            in the STATE's colour            │
│                                             │
│                  Jai        <- large serif  │
│        SuperTired Insanely Calm  <- status  │
│                                             │
│ ?            PINK MOON              ?       │
└─────────────────────────────────────────────┘
```

This is the answer to "no photo until you both align". Align's card already has
the name, the sign badge, the serial and the keyline. What it lacks is **the
planet**. Replace the fuzzy aura with a rendered sphere + ring + moon in the
person's sign colour and our card becomes this — and the veil stops looking like
a missing asset and starts looking like the point.

`Invite your partner` does the two-body version: a dark planet with a burning
orange ring, orbited by a small blue one. That is our alignment graphic.

---

## 9. What Align takes, in priority order

1. **Quiet the product, loud the onboarding.** Product median to 2-3%, onboarding
   to 18-20%. This is a subtraction job on most of the file.
2. **The twelve creatures.** Filled, lit, grained, glowing, constellation-marked.
   Gemini's lit/shadowed twin pair is the model for the veil.
3. **The planet card.** Person as sphere + ring + moon, in their sign's colour.
4. **Discrete bright lobes, not fog.** Shrink every aura, raise its core,
   separate them, and put the brightest point behind the subject.
5. **Stateful hue.** Ground colour follows tonight's sky.
6. **A rendered-object library.** Elements first, then planets.
7. **Chunkier controls.** Filled segmented pill with a cream thumb; panels to
   `#2B1E4C`; body copy to near-white at full strength.
8. **Breathers.** Plain-text screens between art screens.
9. **Glyphs become texture, not subject** — large, ~8% opacity, behind the art.
10. **Name the content formats**, and let the copy be funny.
