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
