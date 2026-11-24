# Imagery: what the references do, and how Align treats real photos

Our planets, moons and eclipses were procedural SVG, and next to the
references they read as clip art. Every astro reference that works is built
on a **real photograph** (or a photoreal render indistinguishable from one) of
**one** subject on **near-true black**. This file covers what the references
do, what we now have (`assets/photo/`, 25 NASA public-domain assets, see
`credits.json` and `photo-contact.jpg`), and the rules for using them on the
1080 × 1350 aura canvas.

---

## Part 1: reference study

Measurements are against the post area (the 4:5 or 9:16 image inside the
Instagram UI), not the whole phone screenshot.

### Astro / news

| Post | Subject | Photo or render | Subject size | Background | Light and grade | Image to text | Grain / sharpness | Why it reads premium / clickable |
|---|---|---|---|---|---|---|---|---|
| **collectiveworld**, "Leo is entering their most expansive era…" (`7bf2b10c`, duplicate `88f2dc4e`) | Banded gas giant in pastel teal / lilac / mint | Render (AI or 3D), not a real planet | Disc ≈ 58% of width, ≈ 40% of post height; centred, upper half | Black with a sparse, fine starfield (tiny points, a few 4-point glints) | Soft, flat, low-contrast pastel; terminator falls off to black on the lower right; no rim glow | No fade needed: the disc sits on black and the type starts ≈ 8% of height below the disc | Soft, painterly; the bands are smeared like brush strokes; no grain | The pastel palette is unusual and "aura"-like, and the composition is calm. But it is the weakest of the set: the planet is visibly fake, and the medium-weight sans plus the white rule look template-made. |
| **todayyearsold**, "The internet celebrates the end of Mercury retrograde" (`7bdbf06e`) | Mercury, MESSENGER-style full disc | Real photograph (MESSENGER flyby frame, warm-toned) | Disc ≈ 68% of width; top ≈ 15% from top; the headline overlaps the bottom ≈ 5% of the disc | Pure black | Single hard sun from the right; terminator crosses the left third; warm sepia / bronze grade (not the grey of the raw data) | The disc's dark lower edge melts into black and the first line of type sits on it; effectively zero fade, because the shadow side *is* the fade | Very sharp crater detail, slight halo on the lit limb, no added grain | Real NASA texture equals authority. The warm grade makes a grey rock feel luxurious. Huge ultra-condensed white caps and a big subject: a "news photo" with the volume turned up. |
| **leo_meanings**, "Leo: your 300-year karmic debt…" (blood moon, `f5dd4fe1`) | Total lunar eclipse (blood moon), tree branches silhouetted at lower right | Real photograph, heavily pushed red | Disc ≈ 46% of width; centre at ≈ 32% of height | Black, slightly lifted, with faint red bloom around the disc | Saturated crimson, almost monochrome red; dark maria still visible | Disc ends ≈ 8% above the sign name; no fade, black gap | Soft, slight blur and noise from a long lens; the foliage proves it is real | The colour alone stops the scroll: red equals omen. A real eclipse plus a "this is real, outside, tonight" texture (branches). |
| **the_whisperwillow**, "Sagittarius is stepping into its luckiest season in 2027" (`a5a39a80`) | Jupiter with the Great Red Spot (Hubble, 2019 OPAL style) | Real photograph | Disc ≈ 73% of width; top ≈ 20% from top; bottom of disc ≈ 3% above line 1 | Pure black | Bright, warm, saturation pushed (oranges and reds hotter than Hubble's release); full-phase lighting, no terminator | Disc sits on black just above the type; no fade | Very crisp; mild over-sharpening; no grain | It is the most iconic image of the most "lucky" planet. Gold serif caps (two lines white, two gold) and a gold hairline with a glowing centre make it feel like a luxury invitation. **Closest match to Align's tone.** |
| **feminaindia**, "The zodiac signs whose lives will change the most in 2027, ranked" (`235a6007`) | Blurred red heart-shaped glow | Pure gradient (no photo) | Glow ≈ 85% of width | White | Deep crimson core feathering to white over ≈ 15% of width | The type sits *inside* the glow, white serif italic on red | Very soft, no grain | Pure "aura": one colour, one shape, editorial serif. It works because it commits to a single colour and a huge feather. It shows that a soft colour field can carry a cover by itself. |
| **tastebud**, "Cocaine found in every single shrimp…" (`8b08070c`) | Shrimp on a rock with white powder, Westminster behind | Photoreal render (generated), presented as a photo | Shrimp spans ≈ 95% of width; scene fills the top 65% | Overcast London scene | Desaturated, moody grey-green, local contrast up | A long top-to-bottom fade from ≈ 55% to ≈ 72% of height into black; type starts at ≈ 70% | Very sharp macro on the subject, shallow depth of field | A literal picture of an absurd headline. The fade turns any photo into a type-ready black plate. |
| **intels**, "No more Down syndrome kids…" (`fb44bb0b`) | Grey sculptural bust plus a glowing cyan DNA helix | Render | Bust ≈ 60% of width, top 58% of post | Very dark teal-black with a soft vignette | Cool, low-saturation grey with one saturated emissive accent (cyan) | Bust fades into black over ≈ 10% of height; "NEWS" tag at ≈ 63% | Smooth render, no grain | A symbol plus a subject, and one glowing accent colour on near-black, is exactly the "aura" recipe in a news register. |
| **thebusinessmagnets**, "Apple loses $108 billion…" (`6bf8cb83`) | Tim Cook cut-out between a red stock-arrow circle and an orange iPhone circle | Photo cut-outs plus renders | Figure ≈ 45% of width, full top half | Black with subtle grain and a faint blue haze on the right | Neutral person, saturated props | The figure's legs fade to black at ≈ 48%; a hairline plus logo sit at ≈ 50% | Visible film grain over the black (this is what makes the black feel rich, not flat) | Real person plus emotion (head bowed), with symbolic props in circles. The grain on the black field is worth copying. |

### Sports / news composition (for structure, not subject)

| Post | Subject | Photo or render | Subject size | Background | Light and grade | Image to text | Grain / sharpness | Why it works |
|---|---|---|---|---|---|---|---|---|
| **jacked**, Bills INT (`b8c80f08`) | Josh Allen, waist-up | Real sports photo | Helmet plus torso ≈ 55% of width; top 60% | Red stadium bokeh | Warm, punchy; subject separated by long-lens blur | A dark gradient from ≈ 45% to ≈ 60% of height; logo badge on a hairline at the fade line | Tack-sharp face, creamy bokeh | One face, one emotion, a huge condensed headline. The fade is about 15% of the post height. |
| **pubity**, "This is how much countries pay athletes per medal" (`6be6c8f7`) | Athlete biting a gold medal, plus a circular inset of another athlete | Real photos | Main subject ≈ 70% of width | Snowy, high-key | Bright, natural | A long fade starting at ≈ 40% reaching black at ≈ 58%; a faint dotted texture in the black | Sharp | A gesture (the bite) plus a scale cue (the inset). Black text plate under a bright photo. |
| **athletesandassets**, "Highest paid college football athletes of 2026" (`f0de4e41`) | Two players, split screen | Real photos | Each ≈ 50% of width, top 55% | Stadium | Natural | Hard torn-paper edge onto an off-white plate; orange logo bridges the seam | Sharp, halftone dots as decoration | Hard edges instead of a fade: a different, poster-like grammar. |
| **sports news grid 1** (`25d0586c`) | Mixed: athletes, LeBron "BREAKING", stadium | Real photos and composites | Subject 50–80% | Varies | Hot, saturated | Every tile uses either a black plate under the photo or type over the darkest third | Sharp | At grid scale, what wins is **one face and 3–4 lines of huge type**. Busy collages read as noise. |
| **sports news grid 2** (`977c8796`) | ESPN, Sports Illustrated, flag football | Real photos | Faces ≈ 40–60% | Varies | Varies | Black text plates or type over the darkest area | Sharp | The serif-headline tile ("She's adding some personality…") stands out in a sea of condensed sans. |
| **watcher.guru**, "Most valuable sports teams" (`e54e19ed`) | Five stars in front of logo skyscrapers | AI-made composite | Fills the frame | Dramatic sky | HDR, oversaturated | Fade to black over ≈ 12%; green/white two-tone headline | Over-sharpened | Maximalism for a "world ranking" story; shows the ceiling of the busy style. |
| **sports news grid 3** (`2f4daa7e`) | Referee, Olympics, Ronaldo, Valkyries | Real photos | Faces ≈ 50% | Varies | Varies | Type plate or bottom-third fade | Sharp | Same rule: real face, emotion, one-line context. |

### What the winning astro posts have in common

1. **One real subject, photographed, on true black.** Mercury (TYO) and
   Jupiter (whisperwillow) are actual NASA / Hubble frames. The fake planet
   (collectiveworld) is the weakest post. Our SVS-render moons are photoreal
   because they use LRO image data.
2. **Big.** The planet is 60–75% of the post width, sitting in the upper
   half, its lower edge 0–5% above (or slightly under) the first headline line.
3. **No fade needed on black.** The subject's own shadow side or the black
   around it is the fade. Photos with scenery (shrimp, athletes) need a 12–18%
   top-to-bottom fade into a black plate.
4. **A grade with a point of view.** Warm Mercury, hot Jupiter, crimson moon.
   It is a single grade direction per image, never "HDR everything".
5. **Grain lives in the black, not on the subject.** The best plates
   (businessmagnets, tastebud) have fine noise in the black so it reads as print
   / film, not as an empty RGB(0,0,0).
6. **Premium equals serif plus restraint plus a gold hairline** (whisperwillow,
   Femina). **Clickable equals huge type plus a promise** (TYO, jacked).
   Align's aura look sits on the premium side.

---

## Part 2: the Align photo library

`carousel/news/assets/photo/` holds 25 files. Each is 1600 × 1600, true black
around the subject, under 600 KB, with one shared subtle grade (black point
2%, gentle S-curve, saturation +4%, highlight warmth about 1%). Body assets
are centred with the subject's largest dimension at 74–80% of the side, so any
two of them swap in a template without re-layout.

| File | Source | Use for |
|---|---|---|
| `sun.jpg` | SDO 304 Å, orange disc with prominence | Sun ingress / season handover, "Leo season", solar-return posts |
| `mercury.jpg` | MESSENGER flyby 1, grey, terminator left | Mercury retrograde / station / direct (the TYO look: grade warm at render) |
| `mercury-color.jpg` | MESSENGER enhanced colour | Mercury "deep dive", ranked-twelve inner slides |
| `venus.jpg` | Mariner 10, reprocessed | `venus-report`, Venus ingress / retrograde, love posts |
| `moon-full.jpg` | SVS / LRO render | Full moon alerts |
| `moon-half.jpg` | SVS / LRO render, first quarter | Quarter moons |
| `moon-crescent.jpg` | SVS / LRO render, waxing crescent | New moon / crescent "intentions" posts (mirror horizontally for waning) |
| `blood-moon.jpg` | 2026 total lunar eclipse, New Orleans | Total lunar eclipse, any "karmic" / Scorpio / intensity hook |
| `moon-earth-shadow.jpg` | 2003 lunar eclipse, umbra edge on the disc | Partial / penumbral lunar eclipse (2027-02-20 Virgo) |
| `eclipse-partial-sun.jpg` | SDO 171 Å lunar transit (Moon biting the Sun) | **Solar eclipse in Aquarius, 2027-02-06 (annular)**: the honest choice (see gaps) |
| `eclipse-total-solar.jpg` | 2017 total eclipse, full corona | Generic "eclipse season" covers. Not for a post that says "annular" |
| `eclipse-diamond-ring.jpg` | 2017 diamond ring | "The moment it all changes" slide; final slide of an eclipse carousel |
| `mars.jpg` | Hubble 2016 opposition | Mars ingress / retrograde, Aries / Scorpio callouts |
| `jupiter.jpg` | Hubble 2017 | Jupiter ingress, "luckiest season" (the whisperwillow look) |
| `saturn.jpg` | Hubble Heritage 1999, full rings | Saturn ingress / return / station |
| `uranus.jpg` | Voyager 2 | Uranus station, "sudden change" posts |
| `neptune.jpg` | Voyager 2 | Neptune / Pisces / dream posts |
| `pluto.jpg` | New Horizons enhanced colour | Pluto in Aquarius, transformation posts |
| `nebula-violet.jpg` | Helix, Spitzer + GALEX | Aura fields: Pisces, Aquarius, Neptune |
| `nebula-gold.jpg` | Helix, Hubble | Aura fields: Leo, Sun, Jupiter, "luck". Can also be a hero ("the eye of god") |
| `nebula-blue.jpg` | Mystic Mountain, Hubble | Aura fields: Gemini, Libra, Aquarius, Mercury |
| `nebula-cosmic-cliffs.jpg` | Carina, Webb | Aura fields: Capricorn, Taurus, earth signs, "month ahead" covers |
| `aurora-green.jpg` | ISS, Nov 2024 | Aura fields: Taurus, Virgo, Venus-in-earth, "growth" |
| `aurora-pink.jpg` | ISS, Sept 2025, magenta airglow band | Aura fields: Venus, Libra, Cancer, love posts |
| `aurora-red.jpg` | STS-39, red auroral crown | Aura fields: Aries, Mars, Scorpio, eclipse hype |

The 18 `planet`/`moon`/`eclipse` art kinds in `posts/` map 1:1 to these files.
`aura` slides use the nebula / aurora set as colour light (rules below).
`figure`, `pair`, `wheel` and `stars` stay as they are.

---

## Part 3: treatment rules

### 1. Subject size and placement (1080 × 1350)

- **One subject per slide.** Never two photographed bodies unless the slide
  is about the pair (`pair` layout). In that case, use two discs of the same
  scale, the slower planet larger, overlapping by 0–8%.
- **Cover:** the disc is **62–72% of canvas width (670–780 px)**. Place its
  centre at **x = 540, y ≈ 470–520**, so the top of the disc is about 140 px
  from the top and the bottom is 0–40 px above the first headline line. Let the
  headline overlap the dark limb by up to 5% when the terminator is on that side
  (TYO).
- **Inner slides:** the disc is **38–50% of width**, upper third, with
  headline and body below. Keep the same centre x on every slide of a carousel
  so swiping feels like one camera.
- **Saturn:** size by ring span, **80–88% of width**. The globe ends up about
  35% of width, which reads correctly.
- **Crop for drama only on purpose:** a cover can bleed the disc off one edge
  (≥ 110% of width, centre outside the canvas) for a "too big to fit" Jupiter
  or Sun. Never crop by accident; never crop the Moon's limb (it reads as an
  error).
- Assets are 1600 px with the subject at 74–80%, so **a 780 px disc means
  rendering the asset at ~1000 px**: always downscale, never upscale past 1.0
  in the renderer.

### 2. Fades into the text area

- Planet assets sit on true black, so **no fade is needed**. Render them on
  the canvas's base colour with `mix-blend-mode: screen` (or lighten), so the
  black disappears into the indigo and only the lit body remains. No rectangle
  edge can ever show.
- If a slide puts the photo on a colour field rather than black, add a
  **bottom-to-top darkening gradient over the lowest 30% of the canvas**: from
  the base colour at 100% opacity at y = 1350 to 0% at y ≈ 945 (a 405 px fade).
  The headline sits entirely inside that zone.
- Aura fields (nebula / aurora) used full-bleed need a **fade of at least 18%
  of height** (≥ 240 px) into the base colour under the type. Their detail must
  be blurred out (rule 4), so the fade is soft light into soft light, never a
  visible line.
- Never use a visible rule, box or vignette edge to separate image and text.
  The only line allowed is the gold hairline under the headline (if the
  template has one).

### 3. Grain and sharpness

- **Subject stays sharp.** No blur, no glow over the surface detail. Craters,
  bands and storms are what sell "real".
- **Grain goes on the whole canvas, once, at the end:** monochrome, about 3–4%
  opacity, 1 px, the same seed on every slide. It mostly shows in the dark
  field, which is the point (businessmagnets): black becomes "print" and the
  photo and our type sit in the same material.
- Never sharpen in the renderer. The assets are already lightly
  unsharp-masked where they were upscaled (blood-moon, mercury, jupiter, venus,
  cosmic-cliffs).

### 4. Making photos feel "aura" without looking fake

Aura means coloured light *around* the real thing, not repainting the thing.

- **Halo, not haze.** Behind the disc, place a radial glow in the sign or
  planet colour (`PLANET_COLORS`): diameter about 1.6× the disc, centre opacity
  35–45%, a Gaussian falloff to 0, `screen` blend. The disc stays opaque and
  unaltered on top. This is the Femina heart, wrapped round a real planet.
- **Rim light:** a 2–4 px blurred inner glow on the lit limb only, in the
  accent colour at ≤ 30%. It suggests atmosphere. Skip it for the Moon and
  Mercury (no atmosphere, so it looks wrong to anyone who knows).
- **Colour fields come from real nebulae / aurora, blurred hard:** Gaussian
  blur at **6–10% of the canvas width (65–110 px)**, then 40–70% opacity over
  the indigo base. At that blur nobody sees "a nebula", only real-feeling,
  uneven, organic colour light, which a CSS gradient cannot fake. Pick by mood:
  violet (Pisces / Aquarius / Neptune), pink (Venus / Libra / Cancer), blue
  (air), green (earth / growth), gold (Leo / Sun / Jupiter), red (Aries / Mars
  / eclipses).
- **Allowed tints on the subject:** a single-direction grade at ≤ 15%
  strength. Examples: warm the grey Mercury toward bronze (TYO), push the
  blood moon a little more crimson. **Not allowed:** recolouring a planet to a
  sign colour, adding fake stars on top of the disc, glow over the surface,
  lens flares, AI "enhance". If the planet stops looking like itself, it looks
  fake.
- **Stars:** sparse and small only (1–2 px, ≤ 40 points per slide, ≤ 3 with
  a soft 4-point glint). Keep them out of the headline zone. Prefer none: the
  assets are deliberately star-free so stars are a choice, not an accident.

### 5. Which asset for which post type

| Post format | Hero asset | Aura field |
|---|---|---|
| `sky-roundup` (cover) | The week's biggest event's body (e.g. `jupiter.jpg` for a Jupiter station) | `nebula-cosmic-cliffs`, blurred |
| `ranked-twelve` | Cover: the driving planet. Inner slides: no photo; aura field in each sign's colour | per-sign colour field |
| `sign-callout` | The sign's ruler (Leo → `sun`, Scorpio → `mars` / `pluto`, Sagittarius → `jupiter`, Capricorn → `saturn` …) | sign colour |
| `sky-note` (fact check) | Plain body photo with no halo: neutral, documentary | none |
| `month-ahead` | `moon-full` or the month's eclipse | `nebula-violet` / `nebula-gold` |
| `moon-alert` | `moon-full`, `moon-half` or `moon-crescent` matching the real phase; `blood-moon` for a total lunar eclipse; `moon-earth-shadow` for partial / penumbral | sign colour |
| `who-this-hits` | The planet involved, smaller (inner-slide size) | sign colour |
| `venus-report` | `venus.jpg` | `aurora-pink` |
| `season-handover` | `sun.jpg` | outgoing sign colour → incoming sign colour (two blurred fields) |
| Solar eclipse (2027-02-06 annular, Aquarius) | `eclipse-partial-sun.jpg` (true photo of the Moon crossing the Sun). The caption says annular; the image does not pretend to be a ring | `aurora-red` or `nebula-gold` |
| Retrograde posts | The planet, with no halo on the cover (a "quiet" look), halo returns on the "direct" post | none / sign colour |

### 6. Checklist before a slide ships

- [ ] It is a real NASA image from `assets/photo/` (or a newly sourced one
      added to `credits.json`), and the credit is in the caption footer or
      alt text.
- [ ] One subject, 62–72% of width on covers, never upscaled.
- [ ] The black around the subject is screened away, with no rectangle edge.
- [ ] The halo / rim colour comes from `PLANET_COLORS` / sign colours, and the
      subject itself is not recoloured.
- [ ] Grain is applied once, globally.
- [ ] The photo matches the claim (phase, eclipse type). No ring of fire on a
      partial-eclipse post, no full moon on a new-moon post.

---

## Gaps and honest notes

- **Annular "ring of fire": not available.** The NASA library has no
  public-domain photo of an annular eclipse ring (search covered "annular",
  "ring of fire", the 2012 / 2021 / 2023 events and Hinode). The 2021 NASA
  photos show a partial sunrise crescent over DC. For the 2027-02-06 post, use
  `eclipse-partial-sun` and tell it in words. To get a real ring, license a
  photo (most are by independent photographers, so check the terms on each).
  **Don't** composite a black
  disc onto the Sun and present it as a photo.
- **Penumbral lunar eclipse:** a true penumbral eclipse is a barely visible
  shading. `moon-earth-shadow` (umbral edge) is more dramatic than the real
  2027-02-20 event; captions must not overclaim ("the Moon dims slightly", not
  "turns red").
- **Moon phases are SVS renders** from real LRO imagery and elevation, not
  single exposures. They are photoreal and NASA-made; they are noted in
  `credits.json`.
- **Hubble / Webb items** carry NASA, ESA (and CSA) co-credits. They are
  official NASA releases and are used with the credit lines given. Items
  credited to non-NASA processors or photographers were rejected (see
  `credits.json → rejected`).
- `eclipse-diamond-ring` is a 2017 HQ frame at 3239 px but is intrinsically
  dark and small. Use it for small or inner-slide placement, not as a
  full-width cover.
- Reproduce or extend: `research/photo-process.py` (pipeline) and
  `research/photo-contact.py` (contact sheet).
