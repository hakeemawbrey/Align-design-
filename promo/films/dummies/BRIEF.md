# "Astrology for dummies": vertical 60s, v2 style (fun · big · bold · no ad)

The user asked: "Can you make a vid called astrology for dummies".

**Style:** exactly the v2 explainer style in promo/films/EXPLAINERS-V2.md. That covers Inter 800 headlines with one coloured EB Garamond italic accent word, Inter 700 punchlines, springy word-by-word pop-ins, 'pop'/'pluck' cues and the 108 bpm score. Use the shared wheel.js (WHEEL, SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH) and the same handoff H at 19.8–20.2 and 39.8–40.2. It also inherits the facts and colours from EXPLAINERS.md.
- **No ad:** no Align lockup, no app screens.
- **Trademark:** do NOT imitate the yellow-and-black "For Dummies" book branding (no yellow/black title block, no cartoon character). The title is just our own bold type.

**Format: a rapid-fire Q&A.**
- Each beat opens with a big **question** headline, with a small Space Mono eyebrow "Q" (or "Q1", "Q2"…, numbered across the film, gold).
- The **answer** is the diagram plus a bold punchline below the wheel, which may carry an eyebrow "A".
- Keep the questions dumb-in-a-charming-way and the answers plain and accurate.
- Readability: headlines are fully readable for ≥ 1.8 s and punchlines for ≥ 1.5 s.
- The chart used is Hakeem's: born May 12 1998 · 5:00 PM · Tulsa; Sun Taurus, Moon Sagittarius, Rising Libra (~12° Libra).

| time | owner | Q headline · answer visual · punchline(s) (verbatim) |
|---|---|---|
| 0–3.6 | A | eyebrow "NO JUDGEMENT". Title **"Astrology for *dummies*."** ("dummies" pink accent, pops last with a wobble). A little glowing "you" dot pops in at the centre wearing a bouncing "?" above it. |
| 3.6–9 | A | Q1 **"What's my *sign*?"** The ring + glyphs pop in; the Sun orb rolls along the ring to Taurus and lands (May 12 ≈ 21° Taurus); "TAURUS ♉" pops big. Punchline: "Where the Sun was on your birthday." |
| 9–14.6 | A | Q2 **"Why do they want my *birth time*?"** A bold clock face spins its hands fast while the wheel rotates; the Moon orb inches through a sign. Punchlines: "The Moon changes sign every ~2.5 days." → "Your Rising changes every ~2 hours." |
| 14.6–20.2 | A | **"So you're not *one* sign."** Sun ♉, Moon ♐, Rising ♎ pop on the wheel with labels. Punchline: "You're a whole sky." Then clear to H by 19.8. |
| 20–26.5 | B | Q3 **"What's a *Rising* sign?"** A horizon line across the wheel at 9 o'clock; Libra rises up over it like a sunrise (warm glow, "AC" marker). Punchlines: "The sign coming up over the horizon when you were born." → "Your first impression." |
| 26.5–33.3 | B | Q4 **"Why's everyone blaming *Mercury*?"** Mercury moves forward, then visibly loops backwards and forwards again (a retrograde loop drawn as a little pretzel trail). Punchlines: "Retrograde: it *looks* like it's moving backwards." → "It isn't. Happens ~3× a year." |
| 33.3–40.2 | B | Q5 **"Am I a *cusp*?"** The Sun teeters on the line between two signs, wobbles, then hops cleanly to one side. Punchlines: "Nope. The Sun is in one sign at a time." → "Your birth time settles it." Clear to H by 39.8. |
| 40–47 | C | Q6 **"Who do I *get along* with?"** The four element triangles snap in, then pairs glow together: fire+air, earth+water. Punchlines: "Same element: easy." → "Fire + Air fan the flames. Earth + Water grow things." |
| 47–53.5 | C | Q7 **"Okay but… is it *real*?"** The wheel slowly turns under a field of stars, warm and calm. Punchlines: "People have read the sky for thousands of years." → "Try it on. Keep what fits." |
| 53.5–60 | C | End line, huge: **"Congrats. You're *not* a dummy anymore."** ("not" gold). A graduation-style confetti burst of glyphs and pixel stars. Hold, then fade to black 59.3–60.0 (the last frame is black). No lockup. |

**Facts to keep right:**
- The Moon spends ~2.5 days per sign.
- The Ascendant moves through all 12 signs in a day, so ~2 hours per sign on average.
- Mercury retrograde happens ~3 times a year, for ~3 weeks each; it is apparent motion only.
- The Sun is in exactly one sign at any moment ("cusp" is informal).
- The traditional compatible elements are fire–air and earth–water.

**Contract:**
- Each part edits only its own folder: `promo/films/dummies/scenes/<part>/` (index.js exports SCENES and CUES).
- The lead owns cues.js.
- Render: `node promo/scripts/render.mjs --film=dummies --vertical --sheet --rate=4 --from=X --to=Y --dir=/tmp/claude-0/dummies-<part>/<fresh>`, or use `--stills=`.
- Commit and push your folder only (`git pull --rebase --autostash` first), then report your timings briefly.
