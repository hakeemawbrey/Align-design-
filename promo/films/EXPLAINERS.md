# Align explainers: two vertical 60s films (1080×1920, 30fps)

The user sent a reference: an 86-second vertical explainer reel. It's downloaded to /tmp/claude-0/reel/reel.mp4 (contact sheet at /tmp/claude-0/reel/sheet.jpg); watch it. Do NOT copy its look, wording or design. It is someone else's work, and we only take its *approach*:
- a calm, step-by-step diagram that builds one idea at a time;
- one short caption per step, above or below the diagram;
- a single central diagram (the zodiac wheel) that keeps gaining layers;
- no people and no hype, just clear teaching.

We make two of these in **Align's style**:
- **astro101**: an intro to astrology.
- **alignment**: how zodiac compatibility ("alignment") works in Align.

## Align style for diagrams
- **Background:** the grainy nebula (promo/films/sky.js drawSky). Dim it (dim ≈ 0.55–0.7) so the diagram reads. Grain is about 0.4, with grainOpacity compensating for the dim. There is ONE crescent moon at top-right, about (930, 150) r 44.
- **Vertical framing:** sky.js's plate is 2304×1296, so pass `zoom ≥ 1.5` to drawSky or the plate won't cover 1920 px of height. W and H come from common.js and are 1080×1920 when `?v` is set; the render uses `--vertical`.
- **Diagram lines:** thin bone lines (#efe6d6, 1.5–2.5 px, 40–80% opacity).
- **Signs:** each sign uses the app's own sign colours (below). Glyphs are ♈… with names in EB Garamond italic.
- **Planets:** glowing orbs with soft halos. You can draw them with the pixel-star motif (drawPixelStar), or as orbs with a pixel-star glint.
- **Elements:** fire #f0603a, earth #e9b24a, air #7fd0f0, water #3f7cf0.
- **Alignment colours (from the app, app/src/components/chat/readings.ts):**
  - Pull "What draws you in" #8fd8f6
  - Push "Where you push back" #f59cc4
  - Align "Where it holds" #f2c75c
  - Relationship "The long game" #dcaaf2
- **Captions:** EB Garamond italic, bone, 64–80 px, max 2 lines, top area (y ≈ 260–420). Optional eyebrow in Space Mono uppercase, 30–34 px, spaced 0.3em. A small sub-caption can sit under the diagram (y ≈ 1500–1650, 44–52 px). Keep at least 90 px side margins.
- **Pacing:** calm. Each caption is fully readable for ≥ 2.0 s. Diagram builds take 0.5–1.2 s, eased. Nothing flashes.
- **Diagram placement:** the wheel is centred about (540, 960), radius about 380–420.
- **Ending (both films):** the end line, then the Align lockup (mark, chakras, "Align", "BLIND BY DESIGN"), then a fade to black at 59.3–60.0. Copy the end code from promo/films/ghosted/scenes/b/end.js or promo/film3/scenes/g4-end.js and re-lay it out for vertical.
- **Sign colours (app/src/data/signs.ts):**
  - Aries #f0603a fire, Taurus #e9b24a earth, Gemini #f2cf4a air
  - Cancer #3fb6f0 water, Leo #f39a3a fire, Virgo #ef5c94 earth
  - Libra #e163d6 air, Scorpio #e23d66 water, Sagittarius #a35cf0 fire
  - Capricorn #2fc79a earth, Aquarius #38c4ec air, Pisces #7c74f0 water
- **The two charts used in both films** (real app data):
  - **Hakeem ("you"):** Sun Taurus, Moon Sagittarius, Rising Libra. Born May 12 1998 · 5:00 PM · Tulsa.
  - **Juniper:** Sun Libra, Moon Gemini, Rising Aquarius.

Astrology facts must be correct. Rulerships, elements and aspect angles are standard Western tropical astrology.

## Structure and handoffs
- Each film has three parts, each owned by one agent:
  - `scenes/a` covers 0–20.2.
  - `scenes/b` covers 19.8–40.2.
  - `scenes/c` covers 39.8–60.01.
- Each part's `index.js` exports SCENES and CUES. Only edit your own folder. The lead owns cues.js (the score).
- **Handoffs H at 19.8–20.2 and 39.8–40.2 are the same for every part.** Use the exported state below so the diagram continues across the cut:
  - the sky: `drawSky(ctx, t, {zoom: 1.5, dx: 0, dy: 0, dim: 0.62, moon: {x: 930, y: 150, r: 44, phase: .12, alpha: 1}})`, grain 0.4
  - the wheel: an empty bone ring centred (540, 960), outer r 400, inner r 330, at 70% opacity, with the 12 sign divisions (thin lines) and the 12 glyphs at r 365 in their sign colours at 85% opacity. Aries starts at the left (9 o'clock) and signs go counter-clockwise, the standard chart orientation.
  - nothing else on screen. Captions are gone by 19.8 / 39.8.
- A part can hide the wheel within its section if its beat needs that, but it must be back to exactly H at its edges.
- Render: always use a FRESH dir.
  - `node promo/scripts/render.mjs --film=<name> --vertical --sheet --rate=4 --from=X --to=Y --dir=/tmp/claude-0/<name>-<part>/<fresh>`
  - or `--stills=…`

## astro101: "Astrology in one minute"
| time | beat (caption, then diagram) |
|---|---|
| 0–3.5 | eyebrow "ASTROLOGY, IN ONE MINUTE"; caption **"Start with the sky."** Stars, the moon, a tiny glowing dot "you, on Earth" at the centre. |
| 3.5–8.5 | **"The zodiac is the road the Sun walks."** The Sun (gold orb) travels a big circle around "you". |
| 8.5–13 | **"The Moon and every planet walk it too."** The Moon and five planet orbs join the circle at different speeds. |
| 13–20.2 | **"Cut the road into twelve."** The circle becomes the ring; 12 divisions draw in one by one with glyphs and names (sub-caption "30° each, starting at Aries"). End on H. |
| 20–27 | **"Every sign has an element."** The four element triangles draw across the wheel one at a time (fire △ Aries/Leo/Sag, earth Taurus/Virgo/Cap, air Gemini/Libra/Aquarius, water Cancer/Scorpio/Pisces) in element colours. Sub-captions: "Fire acts. Earth builds. Air talks. Water feels." |
| 27–33.5 | **"The planets are the who."** A planet list beside or under the wheel, one by one: ☉ Sun, who you are · ☽ Moon, what you need · ☿ Mercury, how you talk · ♀ Venus, how you love · ♂ Mars, how you chase. |
| 33.5–40.2 | **"Your chart is the sky the moment you were born."** A birth-data pill types "May 12, 1998 · 5:00 PM · Tulsa"; planets freeze into their signs on the wheel (Sun → Taurus, Moon → Sagittarius, and the others plausibly placed). The pill and planets clear back to H. |
| 40–48 | **"Three placements matter most."** Highlight three on the wheel with labels: Sun in Taurus, *who you are* · Moon in Sagittarius, *what you need* · Rising in Libra, *how you come across* (the rising sign marked at the 9 o'clock "horizon" line). |
| 48–53.5 | **"One sky. Three yous."** Show the app's real screen promo/assets/screen-onboarding-big-three.png on a phone, large (≥ 1350 px tall, can crop), then the phone eases away. |
| 53.5–60 | **"The sky already wrote you down."**, then the Align lockup and fade. |

## alignment: "How two charts align"
| time | beat |
|---|---|
| 0–4 | eyebrow "ALIGN, EXPLAINED"; caption **"How do two charts align?"** Two small wheels (yours and hers) glow side by side above and below. |
| 4–11 | **"Here are two charts."** Label each: "YOU: Taurus Sun, Sagittarius Moon, Libra Rising" / "JUNIPER: Libra Sun, Gemini Moon, Aquarius Rising". Their placements are shown as orbs on each wheel. |
| 11–20.2 | **"Lay one over the other."** The two wheels slide together into the single central wheel; your placements on the outer track, hers on the inner track, in two tints. Clear back to H at the end (placements fade). |
| 20–24 | **"Then read the angles between them."** Restore both sets of placements, then draw one line between a pair and measure its arc ("°"). |
| 24–29 | **Align · "Where it holds."** A 120° line in gold #f2c75c: your Libra Rising to her Gemini Moon. Sub-caption "120°: same element. It flows." |
| 29–33.5 | **Pull · "What draws you in."** A 60° line in #8fd8f6: her Libra Sun to your Sagittarius Moon. Sub-caption "60°: elements that feed each other." |
| 33.5–40.2 | **Push · "Where you push back."** A 90° line in #f59cc4: your Taurus Sun to her Aquarius Rising. Sub-caption "90°: friction. Not a dealbreaker, a thing to know." Clear back to H by 39.8. |
| 40–46 | **"And sometimes, one planet rules you both."** ♀ Venus glows and links Taurus and Libra (Venus rules both signs). Caption under: "Venus rules Taurus and Libra." |
| 46–53.5 | **"Align turns every angle into a reading."** The app's real screen promo/assets/screen-alignment.png ("Venus rules you both"), large, then three reading cards rise one by one: Pull "She answers like you do." · Push "You want the last word. She wants silence." · Align "You read rooms the same way." (the real copy from readings.ts, in their colours). |
| 53.5–60 | **"See how you align."**, then the Align lockup and fade. |
