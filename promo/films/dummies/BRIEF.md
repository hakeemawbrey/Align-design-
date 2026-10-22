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

---
# v2: MORE VISUALS, NOT JUST THE CHART WHEEL

User feedback on v1: "Need more visuals to explain besides just using birth chart."

**Keep:** the copy, the Q&A format, the v2 type, the springy motion, the sounds, the 60 s length and the same part timings.

**Change: each question gets its own illustration.** Draw it as a scene on canvas, in the Align palette (bone #efe6d6 line art with glow, sign, element and gold colours, the nebula sky behind). Use the zodiac wheel only where the brief below says so; it should appear in at most ~25% of the film.

Illustration style:
- Bold, simple, friendly line art, like animated explainer icons.
- Thick glowing strokes (5–9 px) with flat colour fills at 20–40%.
- Big shapes that read on a phone.
- No faces on people or objects.
- Little people, if any, are simple silhouettes or pictogram figures.

**New handoff H:** at 19.8–20.2 and 39.8–40.2, show ONLY `drawSky(ctx, t, SKY_H)` + grain at GRAIN_H. There is no wheel at the cuts any more, so each part opens and ends on the plain sky.

| beat | new visual (replace the wheel) |
|---|---|
| title (A) | The title is unchanged. Around it, a few big sign glyphs and a gold "?" bob and spin like they're floating in zero-g. |
| Q1 What's my sign? (A) | **Top-down solar system:** a big glowing Sun in the middle, a small blue Earth on its orbit, and around it all a ring-shaped **zodiac band** split into 12 coloured panels with glyphs (signs, not constellations). A tear-off calendar page "MAY 12" flips in beside Earth. A dashed **line of sight** goes from Earth through the Sun and out to the band, landing in the ♉ Taurus panel, which lights up; "TAURUS ♉" pops. (Correct geometry: from Earth the Sun appears against the opposite side of the band.) Do NOT draw real constellations here; the tropical sign ≠ constellation. |
| Q2 birth time (A) | Two mini-scenes, side by side or in sequence: (1) a **calendar** flipping days (DAY 1, 2, 3) while a Moon orb hops from one sign panel to the next at 2.5 days; (2) a **spinning Earth** (a globe with simple continents, or just a circle with a pin-person standing on top). As Earth spins, the pin-person's **horizon** line sweeps past sign panels in the band; a stopwatch reads "~2 HRS" for each sign change. |
| "So you're not one sign" (A) | Three big **trading cards** deal in and fan out: SUN ♉ TAURUS (gold), MOON ♐ SAGITTARIUS (pale blue-white), RISING ♎ LIBRA (Libra pink). Bold Inter on dark glass, with a thick rim in the sign colour. "You're a whole sky." Then the cards fly off and leave the plain sky (H). |
| Q3 Rising (B) | A **landscape at dawn**: a silhouette of rolling hills or a city skyline along the lower third, with a gold horizon glow. A big ♎ Libra glyph (in a glowing disc) **rises up over the hills like a sunrise**, from the left/east side, with rays. A tiny "you, born here" pin-person stands on a hill with a little ✦ above them. For "Your first impression.", a **HELLO name-tag sticker** slaps on: "HELLO, my Rising is ♎ LIBRA". |
| Q4 Mercury (B) | **The race-track explanation:** a top-down view of the Sun with two orbit lanes, Mercury (small, fast, inner lane) and Earth (outer lane), and the zodiac band (sign panels) around the outside. Mercury laps Earth. A **line of sight** from Earth through Mercury hits the band, and its marker on the band clearly **slides backwards** while Mercury overtakes (on the near side, between Earth and the Sun), then forwards again. Show a "℞" pop and the punchline "Retrograde: it *looks* like it's moving backwards." Then "It isn't. Happens ~3× a year." with three small calendar ticks popping. The geometry must be right: retrograde happens around when Mercury passes between Earth and the Sun. |
| Q5 cusp (B) | A **timeline ruler / date strip**: "APR 19 · APR 20 · APR 21", with a bold line where Aries ♈ (red section) meets Taurus ♉ (gold section). The Sun orb teeters ON the line like a tightrope walker (with a little balance pole), wobbles, then hops into one side. For "Your birth time settles it.", a clock face pops onto the line and the hour hand ticks to decide. Don't show specific ingress times as fact. |
| Q6 get along (C) | Four big **element icons**: a flame (fire), a mountain with a sprout (earth), a wind swirl (air), a water drop (water), each in its element colour. "Same element: easy.": two flames merge into a bigger flame. "Fire + Air fan the flames.": the wind swirl blows on the flame, which roars bigger. "Earth + Water grow things.": a drop falls on the soil and a sprout shoots up and blooms. |
| Q7 is it real? (C) | "People have read the sky for thousands of years.": a quick **timeline** of sky-watchers as simple silhouettes and line art (a clay tablet with star marks, a stone circle, an astrolabe, a phone with a star app), sliding past under the stars. "Try it on. Keep what fits.": a **clothes rack** of shirts, each with a sign glyph on it; one shirt (♉) swings forward with a little ✓ sparkle. |
| end (C) | The end line is unchanged. Add a **graduation cap** that tosses up and spins, plus glyph confetti; fade to black 59.3–60.0. |

Facts still apply.

Render with fresh dirs, commit and push your folder, then report back briefly.
