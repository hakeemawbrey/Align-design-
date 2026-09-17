# How Stardust actually carries colour — measured across all 85 screens

Earlier passes worked from a 50-screen sample and concluded Stardust was
bimodal, with about 22% of screens running hot. **Measured across the full
corpus that number is wrong, and the shape is not two modes but three.**

Metric: share of pixels with saturation > 0.50 **and** value > 0.50, plus the
count of 45-degree hue buckets that each hold at least 0.05% of the frame.
Script: `scratchpad/measure/rank.py`.

## The corpus

```
n = 85     mean 11.08%     median 6.10%     mean hue buckets 3.42

under 2%   34 screens   40%
2 - 12%    15 screens   18%
12% +      36 screens   42%
```

**42% of Stardust's screens run at 12% accent or above.** Align's bespoke
section measured 23%. That is the gap, in one number: we run hot about half as
often as the app we are benchmarking against.

The trough in the middle is real — only 18% of screens sit between 2% and 12%.
Stardust does not do "a bit of colour". A screen is either lit or it is dark.

## The three modes

### 1. Saturated field — 12% to 51%, usually 1 to 4 hues

One large glowing **object** throws light across the whole frame. The ground is
not flat; it is lit by the thing on top of it. `onboarding_26` (46.25%) is a
gold key-card whose bloom floods the screen red and amber, with blue and violet
surviving at the top and pink at the corners.

The giveaway is that hue count stays *low* while area goes very high. This mode
is one colour event, big.

### 2. Jewel scatter — around 2%, 6 to 7 hues

A grid of dark circular discs, each holding one small, fully saturated object,
each a different hue. `other-tabs_18` Symptom Picker: 2.12% across seven
buckets — green battery, magenta battery, mint ghost, blue lotus, and so on.

Tiny area, maximum variety. **This is the mode that makes an app feel colourful
without any screen being loud**, and it is the one Align did not have at all.

### 3. Near-dark — under 1%, 0 to 1 hues

Settings, forms, legal, long-form text. `other-tabs_49` Personal Details reads
0.03%. Stardust does not decorate these, and neither should we.

## The construction of a jewel chip

Measured off `other-tabs_18` at full resolution:

```
disc    56-71pt circle, white at 6-7% over the ground, NO stroke
icon    ~45% of the disc, fully saturated, with a same-hue glow behind it
label   sans ~15pt, cream, centred BELOW the disc, outside it
eyebrow mono uppercase letterspaced, muted, above each row
rule    adjacent chips never share a hue bucket
```

## Align's version

Align does not need Stardust's icons — it has twelve auras already, one per
sign, in `zodiac-colour-system.md`. The sign orb *is* Align's jewel, and it
spans the whole wheel: ember, honey, signal, tide, goldleaf, rose quartz,
orchid, garnet, amethyst, jade, ion, dusk. Twelve chips, seven-plus buckets,
from a system that already existed.

The borrowed thing is the **mode**, not the drawing: state a set of typed
things as lit discs on near-black, one hue each, and let variety do the work
that area would otherwise have to do.

### First application — P-01b Choose Signs to Block

The worst-measuring screen in the file, and the most damning: a screen that
lists all twelve signs, each of which has its own colour in Align's own colour
system, rendered as **twelve grey boxes**.

```
before   0.00% accent    0 hue buckets
after    0.99% accent    6 hue buckets
Stardust other-tabs_18   2.12% / 7   (the same screen, their app)
```

**The state logic was also inverted.** Only the *selected* sign carried colour,
so choosing to block a sign was the only way to make it glow. Now every sign
burns in its own aura and the blocked one goes out — `BLOCKED` under a dead
grey orb. Blocking a sign extinguishes it. That is both more colourful and the
correct metaphor.

Cells: 98 wide, 10pt padding, 48pt disc at white 6%, a 30pt orb holding its
core colour out to 74% of the radius before falling to `deep`, a same-hue drop
glow at 68% alpha, then a mono label and the element in the sign's own colour.

### Where this goes next

| Screen | Node | What it holds |
|---|---|---|
| Panel · Signs and planets | `934:1084` | all twelve signs |
| G-09 Matches | `1005:1926` | six signs |
| Kit · The twelve auras | `983:1924` | the specimen itself |

Beyond those, any screen that lists typed things is a candidate: dealbreaker
chips, glossary terms, club topics, interests, notification types.

---

# The atmosphere was invisible on 89 of 93 screens

The pass that "applied the visual language to all 93 cloned screens" did create
the nodes. On **89 of them the nodes never painted.**

The HTML-derived clones nest like this:

```
Screen frame
  atmosphere          <- index 0, the aura and starfield
  div                 <- index 1, 390x874, fill #12052d at 100%
      ...the entire visible screen...
```

The atmosphere is a *sibling behind* an opaque full-bleed div. Everything it
contained was painted over. That is why the Guidance section measured **0.03%
accent across eight screens** while its node tree claimed 28%.

**The paintable ground on a clone is the inner `div`, not the frame.** Anything
added to the frame, or to the outer body, is hidden. Every atmosphere has been
reparented to index 0 *inside* that div, which also now clips so blurs cannot
escape.

## Fixing the z-order was necessary but not sufficient

With the atmosphere finally visible, Guidance moved 0.03% -> 0.81%, and almost
all of that was one field added by hand. The atmosphere content itself is too
weak to register:

```
aura   430x370   LAYER_BLUR 110   peak alpha 0.50   #ffde59
aura   360x310   LAYER_BLUR 110   peak alpha 0.34   #cb6ce6
starfield        ~87 one-pixel dots at #fff9f2
```

Two faults, and the second is the one that has been costing us all along.

**1. Double softening.** A gradient that already ramps to alpha 0, blurred
again at 110px. To clear the measurement threshold a pixel needs composited
value above 0.5; over a near-black ground that needs effective alpha above
roughly 0.58. Peak 0.50 spread across a 110px blur never gets close. The
gradient ramp *is* the softness — blurring it again spends the whole budget.

**2. Two hues, everywhere.** `#ffde59` is 51 degrees and `#cb6ce6` is 289.
Every one of the 89 screens carries the same amber-and-violet pair. This is the
"only two hues present" diagnosis from the earlier audit, and it is structural
rather than per-screen: the generator only ever had two colours.

Align owns twelve. The atmosphere should draw its hue from the screen's own
subject — the sign being read, the element in play, the chakra of the step —
so that moving through the app moves through the wheel.

## The sign-screen template — G-23

Stardust's sun-sign screen (`other-tabs_25`) runs **19.22% accent, amber alone
at 18.69%**: the sign's colour as a field behind its constellation, all text
below on dark ground. Align's equivalent measured **0.20%** — a 108px thumbnail
of the thing the screen is about.

G-23 now carries a Gemini SIGNAL field anchored on the medallion: a 430x360
radial in `mix(core, deep, 0.20)` ramping 0.92 / 0.80 / 0.40 / 0.10 / 0, **no
blur**. Anchoring it on the medallion rather than the screen centre is what
keeps the chips and tiles on dark ground — the first attempt filled the frame
and washed out every control on it.

**The rule: a field lights an object, not a screen.** Put it behind art, a
medallion, an orb, an empty quadrant. Never behind body text or controls.

---

# Giving every screen its own hue

Fixing the z-order made the atmosphere visible; it did not make it *read*.
Two changes did.

**Stop double-softening.** Peak alpha 0.50 under a 110px blur never clears the
threshold. The auras now ramp 0.88 / 0.76 / 0.37 / 0.11 / 0 under a **34px**
blur — enough to stay atmospheric, not enough to erase itself.

**Draw the hue from what the screen is about.** Every screen previously carried
the same amber-and-violet pair. Now:

| Section | Where the hue comes from |
|---|---|
| Onboarding | the chakra ladder, root to crown, one per step — the progress metaphor the flow already used |
| Core Flow | the subject's sign: J. is Libra orchid, M. is Virgo rose quartz, the chat states each take their own |
| Guidance | the reader's chart — Gemini signal, Air in ion blue, Mercury in gold |
| Limits, Subscription | solar gold and leo — the money moments |
| Matches & Safety | the subject's sign; report and expiry in garnet and dusk |

Account, Legal, Notifications, System States and Auth were deliberately left
dark. Stardust keeps 40% of its screens under 2% accent, and settings and legal
are exactly where it spends nothing. Those five sections are 36 of 93 screens,
or 39% — which lands on Stardust's distribution almost precisely.

## Measured

```
                    before          after
Onboarding             --      3.06%  / 7 hues
Core Flow              --      3.76%  / 6 hues
Guidance            0.03% / 0  3.54%  / 5 hues
P-01b (one screen)  0.00% / 0  0.99%  / 6 hues
```

Section figures are aggregates that include the empty canvas between screens,
so per-screen accent runs higher than the number shown.

The onboarding ascent is now visible as colour: red at Birth Data, orange at
Birth Sky, gold at Sign Reveal, green at the card rule, cyan at Dealbreakers,
blue at Photo, violet at The Field. Walking the flow walks the ladder.

## One placement bug worth remembering

Eight Guidance screens had both auras parked at **y = 874** — exactly one
screen height down, entirely outside the frame. The reparent preserved their
visual position faithfully, which meant preserving them off-screen. They are
now placed on a rotating two-slot pattern so adjacent screens do not stack
their glows in the same corner.

Always check that an aura intersects `0..height` before trusting that a screen
has been lit.
