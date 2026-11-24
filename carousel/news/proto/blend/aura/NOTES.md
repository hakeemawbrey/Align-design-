# AURA PHOTOGRAPH: blend notes

Direction: every slide is an aura reading of the sky. The real NASA body stays a
crisp photograph, and the sign's aura radiates from its limb the way an aura or
Kirlian camera renders a sitter. The type system is unchanged from production
(Anton balanced headline, sign words in sign colours, planets and numbers in
gold, the divider with the chakra seed-of-life mark and the "Align" serif italic).

Render:

    cd carousel && NEWS_TEMPLATE=news/proto/blend/aura/template.mjs node news/src/render.mjs <posts> --out news/proto/blend/aura/out

`covers.jpg`: the top row is aura, the bottom row is production `news/out/<id>/01.jpg`.

## Rounds

1. **Hard Kirlian rings.** I drew four concentric bands (limb, sign colour, outer
   chakra hue, crown) with strong turbulence displacement, a wobbly white rim
   and a field at 70%. It read as aura straight away, but it was loud: the
   wavy displaced edge looked like a cheap Photoshop filter, the field filled
   every corner, and Mars filled the band with no room for a halo. Rejected the
   heavy warp.
2. **Smoother bands, corona filaments, grain.** I cut the displacement to a
   low-frequency drift, made the blurs bigger and lowered the opacities
   (0.78, 0.5, 0.34), shrank the body to 0.88 so the halo has room, and added
   aura-print grain to the field only. I tried 150 short radial "corona
   discharge" filaments off the limb. They read as tick marks on a clock dial,
   not Kirlian, so they were removed. I also found a dark gap between the photo
   and the rim, and fixed it by moving the rim onto the limb.
3. **Floor plate behind every body.** With `lighten` blending, the aura showed
   through the eclipse's moon bite and through the dark side of the crescent.
   Now a floor-coloured disc sits behind every body, so the bite stays black
   and the eclipse turns into a punchy gold sun inside a blue and violet aura.
   For nebula slides (no disc) I added an aura-print colour grade: the sign's
   colours wash in from the sides with `mix-blend-mode: color` and the seed of
   life sits on top.
4. **Experiments.** I tried two experiments here. The flags still work, and
   both are off by default.
   - `AURA_DX`: the sign's aura figure scaled up behind the planet as a double
     exposure, with the planet as its head. At that scale you can't read the
     figure. It only added mottled texture and some odd streaks under the
     planet. **Rejected**, but I kept the texture idea as a soft-light
     `turbulence` "plasma" layer.
   - `AURA_FRAME`: a Polaroid-style aura-print frame (pearl hairline, rounded
     corners, mono "AURA READING · VIRGO" captions). It looked like an app UI
     card, the glow leaked past the frame, and it crowded the divider. It's one
     more element on a design that was already called cluttered. **Rejected.**
5. **The keeper: a planet-headed aura figure.** On slides that show the sign's
   aura figure (rank slides, "the reading" slides, end slides), the sign's
   **ruling planet** is placed crisp, with its own Kirlian rim, exactly where
   the figure's head is. Examples: Pisces with a Neptune head, Cancer with the
   Moon, Sagittarius with Jupiter, Capricorn with Saturn. This gives the
   formerly mushy aura slides a sharp subject. It's the most "Align" image in
   the set: an aura photograph of a person whose head is the planet. I also
   made the figure itself crisper, following AuraFigure.tsx: a sharp screen
   copy (contrast 1.15, brightness .92) over a weaker bloom (0.3).
6. **Clean-up.**
   - Saturn's frame is measured round its rings, so it gets a ball-and-ring
     ellipse floor plate and no circular rim. Without the plate it went ghostly
     over the bright teal figure, and a circular block looked like a black hole.
   - Palette mixes that turned muddy were replaced (orange crown with violet
     made brown corners). Virgo's crown is now pale pink. Taurus is now green
     and yellow and Gemini is yellow and cyan, both taken from their aura art.
   - Outer bands are lifted into a slight arch toward the crown, echoing the
     app's aura arch. The rim stays a true circle.
   - A soft corner vignette keeps some dark sky, so the subject punches.

Also rejected without building it: a **chakra light column** through the
subject. The mark in the divider already carries the chakra column, and a second
column would either hide behind the planet or skewer it.

## Final recipe (per subject, back to front)

1. Production canvas plus the violet splash halo.
2. **Aura-photo colour field.** Three blurred clouds, screen-blended at 0.42:
   the outer band hue at left, the sign colour at right, the crown hue above.
   This gives the asymmetric look of a real aura print.
3. **Seed-of-life linework** from the Align mark, centred on the body. The petal
   radius is 0.74 × the limb radius, drawn in the sign's light colour at 0.2.
4. **Aura grain** (fine overlay at 0.28) and **plasma** (soft-light turbulence at
   0.55) on the field only.
5. **Kirlian bands.** These are drawn from `discs.json`, so they start exactly
   at the limb:
   - a hot pearl rim (r × 1.0, blur 3.5)
   - a sign-light glow (r × 1.04)
   - the sign colour (r × 1.13, 0.78)
   - the outer chakra hue (r × 1.34, 0.5)
   - the crown hue (r × 1.66, 0.34)

   The outer bands are gently warped and lifted into an arch.
6. **Floor plate, then the photo**: `lighten`, contrast 1.05, never blurred.
   Saturn gets a ball-and-ring plate instead of a disc.
7. On aura-figure slides: the figure (sharp copy over a bloom), with the sign's
   ruling planet as its crisp, rimmed head.
8. Nebula slides: the photo, an aura colour grade from the sides, the field and
   the seed of life.

Per-sign aura palette (`AURA` in template.mjs): the sign colour first, then the
neighbouring chakra hues that the app's aura art uses for that sign.

## Known nits

- The eclipse source photo is cropped flat at its top and bottom, so a little
  limb glow shows at the lower left.
- The Gemini aura art is pale, so its figure reads whiter than the others.
- Ophiuchus (a nebula with no disc) has the weakest aura identity of the six. A
  library aura or star asset could lift it.
