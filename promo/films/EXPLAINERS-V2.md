# Explainers v2: MORE FUN · BIGGER · BOLDER · NO AD AT THE END

User feedback on v1: "Needs to be more fun and no ad at the end and maybe bigger and bolder."
Everything in EXPLAINERS.md still applies (sky, sign colours, charts, facts, contract, handoff idea) EXCEPT what this file changes.

## What changes
1. **No ad at the end.** No Align lockup, no mark/chakras/wordmark, no "BLIND BY DESIGN", no app phone screens anywhere, no "Align turns…" / app pitch lines. The films end on a fun, bold end line + a playful visual flourish, then fade to black 59.3–60.0 (last frame black). They are pure, shareable astrology content.
2. **Bigger and bolder.**
   - Headlines: **Inter 800**, ~108 px (use `TYPE.head` from wheel.js), bone #efe6d6, tight leading 1.02, max 3 lines, centred, top area (first baseline ≈ y 300; block within y 200–560). One **accent word** per headline may be **EB Garamond italic 500, ~118 px**, in a colour (sign/element/reading colour or gold #f2c75c). Side margins ≥ 70 px.
   - Eyebrows: Space Mono 700, 34 px, letter-spacing .25em, at y ≈ 170 (optional).
   - Sub-captions / punchlines: **Inter 700, ~62 px** (`TYPE.sub`), below the wheel, y ≈ 1520–1760. Colour words allowed.
   - Wheel is bigger: new `WHEEL = {cx 540, cy 1010, rOut 460, rIn 368, rGlyph 414}`; `drawWheelH` now draws 4/3 px lines at 92%, bold 58 px glyphs at full opacity and a faint colour wash in each sign band. Everything you draw on the wheel should be scaled up to match: thicker lines (4–8 px with glow), bigger orbs (r 28–40 with big soft halos), saturated colours. Glyph/planet labels ≥ 44 px.
   - Sky is a little darker for contrast: `SKY_H.dim` = 0.56. Same moon.
3. **More fun.** Playful, cheeky copy (below — use it verbatim). Motion is **springy**: things pop in with overshoot (`easeOutBack` in wheel.js), bounce, wobble, squash and settle; headlines pop in **word by word** (each word scales 0.6→1.06→1 and rises ~30 px over ~0.28 s, 0.07 s apart) instead of slow typing. Orbs can have tiny faces? NO — no faces; fun comes from motion, copy, colour and sound. Little sparkle bursts (pixel stars) when something lands. Snappier pacing (music is 108 bpm; bar = 2.222 s — land key hits on beats: t = 0.6 + n·0.5556). Still nothing strobes or flashes hard.
   - Readability: every headline fully readable ≥ 1.8 s; punchlines ≥ 1.5 s.
   - Sounds: new cue kinds available — `['pop', t, freq=880, gain=0.06, pan=0]` (bubbly blip, use for every pop-in; vary freq 600–1400 for melody), `['pluck', t, freq, gain=0.05, decay=0.45, pan]`. Keep `tick`, `whoosh`, `bell`, `glitter`, `riser`, `boom` (boom sparingly). The score (lead-owned) is bright and bouncy with an arpeggio, so keep cue gains modest (pop ≤ 0.07).

## Handoffs H (unchanged idea, new geometry)
At 19.8–20.2 and 39.8–40.2: exactly `drawSky(ctx, t, SKY_H)` + `drawWheelH(ctx)` + grain at GRAIN_H, nothing else. Import from wheel.js; never hard-code the old numbers (rOut 400 etc. are gone).

## astro101 v2: "Astrology in 60 seconds"
| time | owner | headline (bold) · punchline / visual |
|---|---|---|
| 0–3.5 | A | eyebrow "ASTROLOGY 101". Headline **"Astrology in 60 seconds. *Go.*"** (Go. = gold accent, pops last with a bounce). A tiny "you" dot boings in at the wheel centre with label "you" (bold). |
| 3.5–8.5 | A | **"The Sun drives the *same loop* every year."** The Sun (big gold orb, r ~38, speed streak) zooms the loop at r 414 once. Punchline: "That loop has a name: the zodiac." |
| 8.5–13 | A | **"Everybody's on the *road*."** Moon zips round fast, planets join one by one with pops. Punchlines in turn: "Moon: one lap a month." → "Saturn: 29 years. *Take your time, Saturn.*" |
| 13–20.2 | A | **"Slice it into *12*."** The loop becomes the ring; the 12 signs pop in one per beat (0.28 s), each glyph bouncing big then settling, its band flashing its colour softly, name popping above it briefly. Punchline: "30° a slice. Aries goes first." End on H. |
| 20–27 | B | **"Every sign gets an *element*."** The four triangles snap in one per bar, fat glowing lines. Punchlines build one per triangle, each word in its element colour: "Fire: go go go." · "Earth: build it." · "Air: talk it out." · "Water: feel *everything*." (2 lines, keep big) |
| 27–33.5 | B | **"Planets are the *characters*."** Big orb + glyph rows pop in on the beat (can sit inside/over the wheel, big ≥ 54 px text): ☉ Sun: main character · ☽ Moon: your feelings · ☿ Mercury: your texts · ♀ Venus: your crush · ♂ Mars: your temper |
| 33.5–40.2 | B | **"Your chart = the sky the *second* you were born."** Planets spin like a slot machine, a bold pill types "May 12, 1998 · 5:00 PM · Tulsa", then *snap!* everything freezes into place (soft white pulse, not a strobe; camera-shutter tick). Punchline: "Basically a baby photo. *Of space.*" Clear to H by 39.8. |
| 40–53.5 | C | **"Your *Big Three*."** Three big cards pop up one per ~3.2 s over/around the wheel (wheel can shrink/dim), each with its orb, placement and the app's own line (real copy from the Big Three screen): **SUN · TAURUS** "You at brunch. Orders for the table." · **MOON · SAGITTARIUS** "You at 2am. Plans the trip you won't book." · **RISING · LIBRA** "You to strangers. Charming. Suspiciously good lighting." Then all three together, a little wiggle: punchline "That's you. In three planets." (Rising = the sign on the 9 o'clock horizon at birth; it's fine to show the AC marker.) |
| 53.5–60 | C | End line, huge: **"Now you speak *astrology*."** A burst of the 12 glyphs + pixel stars confetti-pops out from the centre and drifts. Hold, fade to black 59.3–60.0. No lockup. |

## alignment v2: "How two charts click"
| time | owner | headline · punchline / visual |
|---|---|---|
| 0–4 | A | eyebrow "COMPATIBILITY 101". **"Two charts walk into a *date*."** Two wheels (≈ r 210 each, stacked top/bottom like v1 but bigger) bounce in from the sides. |
| 4–11 | A | **"Meet the *charts*."** Labels bold: "YOU" + "Taurus Sun · Sagittarius Moon · Libra Rising" and "JUNIPER" + "Libra Sun · Gemini Moon · Aquarius Rising" (≥ 46 px). Orbs pop onto each wheel with pops. |
| 11–20.2 | A | **"Now *stack* them."** Wheels slam together into the big central wheel (squash-and-settle + `boom` small + glitter). Punchline: "You outside. Juniper inside." (names in tints). Placements fade, end on H. Keep exporting PLACEMENTS/helpers (update for new geometry: tracks outside rOut and inside rIn, e.g. you 500, juniper 320). |
| 20–24 | B | **"Then measure the *angles*."** Placements pop back, a big protractor arc sweeps with a counting number (big, ≥ 64 px). |
| 24–29 | B | eyebrow "ALIGN". **"120°: *easy*."** Gold line, your Libra Rising ↔ her Gemini Moon, fat and glowing. Punchlines: "Same element." → "You read rooms the same way." |
| 29–33.5 | B | eyebrow "PULL". **"60°: they *click*."** #8fd8f6 line, her Libra Sun ↔ your Sagittarius Moon. Punchlines: "Different, but they feed each other." → "She answers like you do." |
| 33.5–40.2 | B | eyebrow "PUSH". **"90°: *spicy*."** #f59cc4 line, your Taurus Sun ↔ her Aquarius Rising, with a little jitter/zap. Punchlines: "Friction. Not a dealbreaker." → "You want the last word. She wants silence." Clear to H by 39.8. |
| 40–47 | C | eyebrow "BONUS ROUND". **"One planet rules you *both*."** ♀ Venus pops into the centre, hearts? NO hearts-emoji; use pink pixel-star sparkles, and two fat links shoot to Taurus and Libra. Punchline: "Venus runs Taurus *and* Libra." |
| 47–53.5 | C | **"Push. Pull. *Align.*"** All three lines (gold/blue/pink) light up together on the wheel with Venus, a little celebratory spin of the wheel. Punchline: "Every angle is part of the story." |
| 53.5–60 | C | End line, huge: **"So… what's *your* sign?"** Glyph confetti, hold, fade 59.3–60.0. No lockup. |

## Process
Edit only your own folder. Render fresh dirs with `--vertical` as before; check stills at your edges against H. Commit + push your folder only (`git pull --rebase --autostash` first). Report timings briefly.
