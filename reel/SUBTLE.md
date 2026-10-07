# Subtle teasers: brief

Client feedback on the previous teasers: "too many elements and too flashy; needs to be subtle and teasing."
These three are deliberately the opposite. Each is a different DIRECTION for the client to choose between.

## Rules (non-negotiable)
- 12 s, 1080×1920, 30 fps. One idea. Lots of empty, dark space.
- At most TWO elements on screen at any moment (a text line counts as one element).
- No flashes (never set ALIGN.fx.flash), no shake, no hard cuts, no strobing, no beat-cuts, no ring text, no labels/eyebrows/mono captions.
- No halftone: set `ALIGN.fx.halftone = false` every frame. The house film look stays (heavy soft grain, bloom, halation, milky blacks). It IS the texture, so the frame can be nearly empty.
- Motion is slow and continuous: fades ≥ 0.8 s with ease-in-out, drifts measured in px per second, nothing pops.
- Withhold: never explain the app. Raise a question; answer it only with the brand at the end.
- The brand appears ONCE, at the end, quiet: use `ALIGN.wordmark(ctx, x, y, { size, alpha, glow })`, which draws "Align" in EB Garamond italic, title case, normal tracking, exactly like the app splash screen (design-refs/screens/S-01-open-app.png: the Align mark above, "Align" below). Never spaced caps, never lowercase "align", never mono. Optionally pair it with the mark above it (ALIGN.alignMark), as on the splash. Hold the final frame ≥ 2 s.
- Type: EB Garamond (italic for whispered lines), 44–64 px, warm bone #efe6d6 at 80–90 % opacity, generous letter spacing for caps. Never more than one line of copy visible at a time (a two-line sentence is ok).
- Palette: indigo-black, bone, a touch of gold #f2c75c or rub pink #e8628a as the only accent.
- Original copy only. Keep critical content in the central 900×1500.
