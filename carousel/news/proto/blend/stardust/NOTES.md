# STARDUST GRADE: notes

The goal: the NASA photo and the Align brand should read as one image. The photo is graded and composited into Align's indigo world. It is not a picture pasted onto purple. The type system is unchanged: Anton balanced headline, sign and gold colour words, and the divider carrying the chakra mark plus the *Align* wordmark. Only the art band changed (`artBand`, the filters and the CSS in `template.mjs`).

Render:
```
cd carousel && NEWS_TEMPLATE=news/proto/blend/stardust/template.mjs node news/src/render.mjs <posts> --out news/proto/blend/stardust/out
python3 news/proto/blend/stardust/build-covers.py   # covers.jpg: Stardust row over production row
```
`SG_VARIANT=A|B|D` switches the colour stage, so the rejected variants can still be compared. D is the default.

## Final recipe

The whole grade is one SVG filter per photo (`gradeFilter`). It runs in Chromium, so it needs no pre-processing step.

1. **Stardust ramp.** Luminance is gradient-mapped through `#0b0620 → #26145a → #6a4cb8 → #b9a3e3 → #efe6d6 → #ffe7ad`, which runs void → indigo → violet → lilac → bone → gold-cream.
2. **Split tone (variant D).** The map replaces only the shadows and low mids, with weight `1 − a·lum`. The highlights keep the photo's own colour, warmed slightly. Then 30%×(1−keep) of the map is laid over everything. The `keep` value is set per photo: Mars .62, blood moon .66, Sun .6, Venus .5, Moon .3, nebulae .42. Mars stays rust, the Moon stays silver with indigo maria, and the corona stays gold.
3. **Black dissolves.** Alpha comes from luminance (0 at lum .035, full by about .2), so the frame's black becomes transparent and there is no rectangle or edge.
4. **Soft limb.** The mask feathers across the *true* limb (95% to 101.5% of the radius). `LIMB_FIX` corrects `discs.json`, which only measures the lit area. A night layer (void at 90%) sits inside the solid part of the disc only, so the far side stays night-dark and doesn't glow through.
5. **Halation.** The highlights bloom in pale lilac (blur 10, screen, .42). The whole disc blooms in the sign colour (blur 46, .62) underneath.
6. **Aura field behind.** The app's violet splash breath, plus a sign-colour corona that peaks just outside the limb (blur 40) and eases into violet. It is centred on the measured disc, not the frame.
7. **Stardust.** Sparse thresholded-noise specks in the sign colour and bone, screened at .5 inside the corona. This is the stipple the aura art is drawn with.
8. **Starfield.** 70 seeded bone dots (0.8–3px) like `Starfield.tsx`, seeded per slide.
9. **Grain.** The app's `.grain` recipe exactly: white fractal noise, alpha .5×.35, overlay at .5.
10. **Band edge.** The band dissolves through an alpha mask (solid to 50%, .55 at 74%, 0 at 100%) instead of a painted floor gradient. There is no seam against the canvas gradient.
11. **Eclipse occluder.** A feathered void disc where the moon covers the sun (`OCCLUDERS`). Without it, the dissolved black let the aura fill the moon with flat cyan.
12. **Nebulae.** These go full-bleed with the same grade (bloom .55, cut .06) and an elliptical mask on all sides. The helix loses its RGB sensor-noise stars and turns violet and bone.

## Tried and rejected

- **A: linear mix of the map and the photo.** The lilac midtones pushed Mars to dusty pink-beige and the Moon to lavender. It reads as a filter, and Mars stops being warm.
- **B: soft-light map over the photo.** Same problem with more contrast: the Moon went purple and the maria went violet-black.
- **Multiply-tinted stardust.** Multiply over a transparent backdrop paints the whole disc. That caused a teal slab between Venus and Mars and false "glow". Fixed by colouring the specks inside the filter.
- **Night layer over the whole mask, including the feather.** This left a dark moat round the eclipse sun. It now only covers the solid core (alpha table `0 0 0 0 1`).
- **Using `discs.json` as the limb for every photo.** This put Saturn in a black disc (r covers part of the rings), offset the eclipse corona, and let crescents glow through their dark side. Now only full, centred discs use it, plus explicit fixes.
- **Chakra light leak** (corner radial gradient, screen, at .2 then .36). At .2 it was invisible. At .36 it left a brownish smudge in the top corner: muddy, and clutter the founder already flagged ("too cluttered"). Removed.
- **Painted floor fade at the band bottom.** It showed a horizontal seam where it met the lighter canvas radial. Replaced with the alpha mask.

## Checks (from reading every output)

- The photo is part of the brand: the shadows are indigo and violet, the bloom is lilac, and the corona is the sign colour. It matches the twelve-auras ramp.
- No hard edges: frame, limb and band bottom all dissolve. The one deliberate edge is the eclipse moon's silhouette.
- Text contrast is unchanged: the headline and body sit on plain void/canvas below the band.
- Subjects are recognisable: Mars rust, Moon silver, Sun and corona gold, Venus cream, Saturn's rings intact.
- Watch: the Mars/Virgo corona is a strong magenta. It is on-brand aura, but could drop to .7 if the founder finds it loud. The eclipse moon is large on the cover crop (`art.size 1.2`, as in production).
- Aura-only slides (`rank`, `figure`) keep production's aura art with stardust added. They were already Align.
- `assets/library/` was empty while I worked, so only `assets/photo/` is used.
