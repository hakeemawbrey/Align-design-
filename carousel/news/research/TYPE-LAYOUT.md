# Type & layout teardown: viral IG news carousels vs Align

Measured, not eyeballed. Scripts and crops live in the scratchpad
(`/tmp/claude-0/-home-user-Align-design-/389b31dd-88d7-51a7-8648-0e1c25792299/scratchpad/teardown-type/`):
`edges*.py` (post bounds), `lines.py` (headline line boxes → `lines.json`), `glyph.py` + `calib.py`
(font ID by stroke/gap fingerprint), `fade2.py` (image→black fade), `divider.py`, `small.py`
(eyebrows, CTAs, logos), `table.py`, `sharp.py` (art edge density), `ours.py` (Align renders).

## 0. Method and caveats

- The screenshots are **1320 × 2868** (not 921 × 2000; that is the downscaled preview). All
  numbers below are from the full-resolution files and expressed as **% of post width (%W)** or
  **% of post height (%H)**, then converted to a **1080 × 1350** canvas.
- Post bounds come from the edge between the post and the pure `#000` IG chrome. 4:5 posts measure
  **1320 × 1650** (top y=426), 3:4 posts **1320 × 1760** (top y=369). Black-on-black posts with
  no visible edge are assigned an aspect from the position of IG's `1/N` pill. One post (jacked)
  measures ~0.84 and is treated as 4:5.
- In the search/explore viewer, IG's like/comment/share column covers **x 87–98 %W, y 69–100 %H**.
  It clips the right end of many headlines. Where a line runs under it, the right edge is taken from
  the visible glyph end or by symmetry.
- **Cap height** is the measured height of an all-caps line box. **Pitch/cap** is the
  baseline-to-baseline distance divided by cap height (the true leading, independent of font metrics).
- **Font ID** compares three measured ratios with the same ratios rendered from candidate fonts
  (`calib.py`): stem/cap (weight), inter-letter gap/cap (tracking) and glyph width/cap
  (condensation). Calibration at tracking 0:
  Anton gap .069, stem .194 · Bebas Neue gap .110, stem .143 · League Gothic gap .102, stem .134 ·
  Oswald 700 gap .128, stem .211 · Barlow Condensed 800 gap .083, stem .231.
- Like counts are copied from the screenshots. They are a rough signal only, because follower
  counts differ widely.

---

## 1. Per-reference table

28 screenshots: 18 single-post covers, 3 Femina interior slides, 2 repeats of the collectiveworld
post, and 5 explore-grid screenshots (each holding 4–6 tiles).

### 1a. Layout

| # | file | account (likes) | aspect | image area / how it ends | eyebrow · divider · logo | headline top %H | lines |
|---|---|---|---|---|---|---|---|
| 1 | c8cf17ab | explore grid "news" (6 tiles) | tiles 3:4 | tastebud, intels, technology, McDonald's: photo top ~60 %, then black | — | 61–72 % of tile | 3–4 |
| 2 | 66709a43 | explore grid "news" | tiles 3:4 | startupbydoc tile, 3 reels, business-magnets tile | — | 64 % (startup) | 4 |
| 3 | 8b08070c | tastebud (415K) | 4:5 | photo 0–66 %; median luminance 50→18 from 54→66 %H (**≈160 px fade @1350**), black from 68 % | "TRENDING" tag: white box, black Anton, 36 px tall (2.7 %W) × 160 px (12 %W), x 4 %W, y 65.5 %H. `@TASTEBUD` handle bottom-left, cap 3.9 %W, at 94 %H. Logo avatar centred at 96 %H | 68.2 | 3 |
| 4 | fb44bb0b | intels (554K) | 4:5 | photo 0–64 %; fade 54→64 %H (**≈135 px**) | "NEWS" tag 99 px tall (7.5 %W) × 181 px (13.7 %W): white box, black compressed caps, 8 px red underline, x 4.3 %W, y 56 %H. "INTELS" wordmark top-left, cap 2.3 %W | 65.1 | 4 |
| 5 | b1d4a91b | technology 1/16 (128K) | 3:4 | photo collage 0–60 %; fade 50→60 %H (**≈135 px**) | Divider at **59.1 %H**: 2 rules × 3 px × 23 %W, gap 23.5 %W holding the "TECHNOLOGY" wordmark (extended sans, cap 1.5 %W). Rules fade at their outer ends | 60.9 | 3 |
| 6 | 13e439ee | technology 2/16 | 3:4 | framed inset photo (2 px white border, r≈8) 2–51 %, on a blurred dark copy, black from 73 % | "TECHNOLOGY" wordmark top-right, cap 1.7 %W, y 1.6 %H | 75.2 | 4 |
| 7 | b3275c59 | technology 3/16 | 3:4 | photo 0–69 %, short fade | top-right wordmark | 69.7 | 5 |
| 8 | 26664231 | technology 4/16 | 3:4 | photo 0–68 %, short fade | top-right wordmark | 68.5 | 5 |
| 9 | a7d7d39f | startupbydoc (8.2K) | 3:4 | cut-out subject on black; fade 40→56 % | handle pill top-left (pink gradient, 48 px tall); "ANTHROPIC" logo roundel 32 %W, right side | 64.1 | 4 |
| 10 | e34f3a75 | technology 1/14 (46.2K) | 3:4 | collage 0–61 %; fast fade 56→61 % (**≈70 px**) | divider at **62.3 %H**, same spec as #5 | 63.9 | 3 |
| 11 | 6bf8cb83 | business magnets (750K) | 4:5 | cut-outs and ring-framed circles on black, ends ~58 %, no fade | Divider at **60.5 %H**: 2 rules × 4 px × 19 %W (gradient), bold-italic logo centred | 64.7 | 3 |
| 12 | 235a6007 | femina cover (20.4K) | 4:5 | white page; blurred red heart 15–80 %H | "FEMINA" Didone caps, cap 3.4 %W, at 90 %H | 34.8 | 5 |
| 13 | 41f86fe9 | femina 2/13 | 4:5 | white, no image | wordmark top-right; "#12" red serif italic (~8 %W) at 13 %H; "Cancer" serif italic at 18 %H | 13 (rank) | 2 + 14 body |
| 14 | 6e6ba7ac | femina 3/13 | 4:5 | same as #13 | same | 13 | 2 + 14 body |
| 15 | 510453e6 | femina 13/13 | 4:5 | same as #13 | same | 9 | 2 + 17 body |
| 16 | 88f2dc4e | collectiveworld (29.2K) | 4:5 | stars on black; planet Ø 58 %W, centre 33 %H, ends 56 % (hard edge) | **Full-bleed rule** at 93.9 %H, 3 px, x 0→82 %W, "Collective World" wordmark to its right | 63.3 | 4 |
| 17 | 7bf2b10c | collectiveworld | — | pixel-identical repeat of #16 | | | |
| 18 | f92b29af | collectiveworld (16.3K) | — | same design as #16 (different like count) | | | |
| 19 | 7bdbf06e | todayyearsold (49.1K) | 4:5 | Mercury on black, Ø 67 %W, centre 28 %H, ends 55 % (hard edge); **headline overlaps the planet's base** | Divider **below** the headline at 94.2 %H: grey gradient rules, ~38 %W each, "TYO @TODAY" logo stack 51 px | 55.0 | 4 |
| 20 | f5dd4fe1 | leo_meanings (16.3K) | 4:5 | red moon on black, Ø 46 %W, centre 29 %H, ends 48 % | none | 54.8 (title) / 67.9 (deck) | 1 + 3 |
| 21 | a5a39a80 | the_whisperwillow (7.1K) | 4:5 | Jupiter on black, Ø 73 %W, centre 36 %H, hard edge ~54–65 % | **Gold lens-flare rule** at 94 %H, ~39 %W (fades to ~67 %W); signature "THE WHISPER WILLOW" in spaced italic caps, 1 %W | 68.0 | 4 |
| 22 | b8c80f08 | jacked (194K) | ~4:5 | full-bleed photo, darkening gradient 40→62 %H (**≈300 px**); photo stays at ~35 % brightness behind the headline | Divider at **54.9 %H**: 2 solid white rules × 4 px × 33.8 %W, hex badge logo 20.8 %W between them | 61.1 | 4 |
| 23 | 6be6c8f7 | pubity (268K) | 3:4 | photo plus ring inset (Ø 38 %W, 4 px white ring); gradient 42→62 % (**≈270 px**); faint logo pattern on the black | "SWIPE" arrow tag top-left (cap 2.8 %W). Divider at **60.6 %H**: grey `#9c9ca0` rules, 2–3 px, ~42 %W each, P logo | 63.9 | 4 |
| 24 | f0de4e41 | athletesandassets (8.1K) | 4:5 | 2 photos side by side, 0–56 %; **hard edge** into a cream panel `#fffcf5` with notched shoulders | round orange logo badge (Ø 8 %W) sits in the notch at 52–58 %H | 67.8 | 3 |
| 25 | 25d0586c | explore grid "sports news" | tiles 3:4 | Jalen Hurts: photo, then black from 62 %; BREAKING: giant background word behind the subject | Jalen Hurts: divider and "b" logo at 62 % | 66 (Jalen Hurts) | 4 |
| 26 | 977c8796 | explore grid "sports news" | tiles 3:4 | ESPN/SI black panel with red border; "FIRED WHILE STILL ON AIR" over the photo | — | 66–69 | 2–4 |
| 27 | e54e19ed | watcher.guru (3.8K) | 4:5 | full-bleed render to ~80 %; gradient 64→78 %H (**≈190 px**) | Divider at **77.0 %H**: green `#35d167` rules × 3 px × 23 %W, round avatar and `@watcher.guru` (cap 3.2 %W) between | 79.8 | 2 |
| 28 | 2f4daa7e | explore grid "sports news" | tiles 3:4 | NFL refs: photo, then black at 55 %; FIVE NEW SPORTS: photo, then a red texture | — | 60–69 | 3 |

### 1b. Headline type

Widths are the widest line, edge to edge. Clipped lines are extended to the visible glyph end.

| # | account | cap %W (cap px @1080) | width %W | letter-gap/cap → tracking | pitch/cap | font (fingerprint) | case |
|---|---|---|---|---|---|---|---|
| 1 | grid tiles | McDonald's 8.4–8.6 · tastebud 9.2–9.3 · technology 10.2–11.2 (% of tile width) | 94–100 | — | ~1.1 | Anton / Bebas | CAPS |
| 2 | startup tile | 6.6–6.9 | 87 | tight | 1.4 | geometric grotesk bold | Title Case |
| 3 | tastebud | **8.64 (93 px)** | 85 (left-aligned, ragged right) | .061 → **Anton, −0.5 %** | **1.10** | Anton (stem .184 vs .194) | CAPS |
| 4 | intels | **9.20 (99 px)** | 83 (left-aligned) | .049 → about half the default gap: **−3 %** | **1.06** | League Gothic / Alternate Gothic Compressed (stem .115, glyph .34) | CAPS |
| 5 | technology 1/16 | **10.38 (112 px)**, range 10.2–11.0 | **97** (each line justified to full width) | .114 → **Bebas Neue at 0** | **1.09** | Bebas Neue (stem .139 vs .143), textured fill | CAPS |
| 6 | tech 2/16 | 5.8–7.5 (63–81 px), **varies by line: each line is scaled to fit the width** | 96 | .118 → Bebas at 0 | 1.09 | Bebas Neue | CAPS |
| 7 | tech 3/16 | 6.1–8.2 (66–88 px) | 96 | .111 | 1.14 | Bebas Neue | CAPS |
| 8 | tech 4/16 | 6.4–7.8 (69–84 px) | 96 | .117 | 1.10 | Bebas Neue | CAPS |
| 9 | startupbydoc | 6.7 (73 px, ascender height) | 86 (bar) | very tight, about −4 % | 1.38 | geometric grotesk bold (SF Pro Display / Inter Tight Bold) | Title Case |
| 10 | technology 1/14 | **10.68 (115 px)** | **98** | .113 → Bebas at 0 | 1.07 | Bebas Neue | CAPS |
| 11 | business magnets | bar 12.1 %W (131 px); text cap ≈8.7 %W (94 px) | 89 | about +3 % | bars 1.09, gap 12 px | Bebas Neue, light weight (stem .106) | CAPS |
| 12 | femina cover | 7.1 (77 px) | 61 | serif | 1.06 | Playfair Display Italic | Title Case |
| 13–15 | femina slides | rank ~8 %W; name ~4.6 %W; body x-height 3.1 %W, pitch 4.2 %W | 77 | — | 1.35 (body) | Playfair Italic + Poppins-like italic body | Title / sentence |
| 16 | collectiveworld | **4.09 (44 px)** | 67 | .167 → 0 | **1.91** (very loose) | geometric sans SemiBold (Montserrat / Plus Jakarta) | CAPS |
| 19 | todayyearsold | **9.92 (107 px)** | 87 | .099, stem .220 → heavy | 1.17 | Anton / Barlow Condensed ExtraBold class, about +1 % | CAPS |
| 20 | leo_meanings | title "Leo" 9.5 (102 px); deck 3.9–4.5 (42–48 px) | 22 / 83 | — | 1.69 (deck) | sans bold italic (Nunito / Poppins Bold Italic) | Title Case |
| 21 | whisperwillow | 5.83 (63 px) | 78 | .182 → +2–3 % | 1.36 | transitional bold serif caps (Playfair Display Bold / Libre Caslon Bold) | CAPS |
| 22 | jacked | **10.61 (115 px)** | 91 | .072 → **Anton at 0** | **1.13** | Anton (stem .186) | CAPS |
| 23 | pubity | **8.41 (91 px)** | 87 | .081 → Anton-class, +0.5 % | **1.13** | Anton / Druk Condensed class (stem .177) | CAPS |
| 24 | athletes | 7.88 (85 px) | 71 | .067 → about −1 % | 1.28 | Barlow Condensed 900 class (stem .233) | CAPS |
| 25 | Jalen Hurts tile | 7.5–7.7 % of tile | 80–97 | tight | ~1.15 | Anton | CAPS |
| 26 | FIRED tile / NFL flag tile | **17.0–17.3** / 10.6 % of tile | 94 / 74–95 | about −5 % / 0 | 1.0 / 1.3 | ultra-compressed heavy (Druk XCond class) / Bebas | CAPS |
| 27 | watcher.guru | 7.35 / 9.85 (79 / 106 px), **fitted per line** | 86 | .062 → Anton, −1 % | 1.00 | Anton-class with a grit texture | CAPS |
| 28 | NFL refs / Valkyries tiles | 15.6–16.1 / 11.5 % of tile | 94–100 / 62–95 | tight / about −4 % | ~1.1 | League Gothic / compressed heavy | CAPS |

### 1c. Colour, emphasis and chrome

| # | account | scheme | which words are coloured, and why | other chrome |
|---|---|---|---|---|
| 3 | tastebud | white `#fdfdfd` + hot pink `#fc65c2` (7.8:1 on black) | COCAINE · SHRIMP TESTED · ENGLAND'S: 4 of 10 words. The **shock nouns**: the substance, the victim, the place | handle, centred avatar |
| 4 | intels | white + electric blue `#017bf8` (5.2:1) | only DISORDER, 1 of 14 words: the **punchline and last word**, on a line of its own | wordmark top-left |
| 5/10 | technology | white + textured sky blue `#3fa6ed` (7.9:1) | about 60–70 % of words, **alternating by phrase**: WHAT / JUST / HAPPENED. Colour is used as rhythm, not as meaning | cover: subhead "TRENDING IN TECH & AI", Bebas cap 4.5 %W (49 px) at 88 %H; "SWIPE FOR MORE ▶" cap 2.3 %W (25 px) at 94 %H |
| 6–8 | technology interior | same | about 50–60 % blue: proper nouns and numbers (APPLE, IPHONE 18 PRO, 2026, SONY) | top-right wordmark, no CTA |
| 9 | startupbydoc | white + pink bar behind line 2 (`#e8248c`→`#5c0b3b`) | "A List of Jobs That Will": the **list promise** | "Swipe to See →", light sans, cap 2.8 %W |
| 11 | business magnets | black `#111` on periwinkle bars `#8f9beb` (7.2:1); last line white | lines 1–2 carry the claim (APPLE LOSES $108 BILLION / IN MARKET VALUE AFTER); line 3 is the context | — |
| 12 | femina | white on red blur `#b42739` | none | wordmark |
| 13–15 | femina slides | black body; red `#a4182a` rank | the **rank number** | — |
| 16/19 | collectiveworld, TYO | white only | — | rules and logos as above |
| 20 | leo_meanings | white + red `#df373c` (4.7:1) | "(This Is What Happens Next)": the **curiosity hook** | — |
| 21 | whisperwillow | white + gold `#d0a05a` (8.9:1) | LUCKIEST SEASON / IN 2027: the **payoff half** of the sentence | gold rule, signature |
| 22/23 | jacked, pubity | white only (21:1) | — | rule and logo |
| 24 | athletes | black on cream (18.4:1) + orange-red `#fc491a` (3.4:1) | COLLEGE FOOTBALL: the **category** | SWIPE → (cap 2.6 %W) |
| 25 | Jalen Hurts tile | white + red | NOT / ALLOWED TO SLEEP: the **outrage clause** | divider and logo |
| 27 | watcher.guru | light grey `#d9dbde` + green `#35d167` (10.5:1) | MOST VALUABLE · TEAMS · WORLD: alternating, about 55 % | green divider, handle |
| 28 | FIVE NEW SPORTS / Valkyries tiles | yellow `#f0e000` first word / whole headline lime `#c6f432` | the **number** / the whole line | 🔥 emoji |

**Page counters:** none of the punchy references draw their own counter. The `1/16` and `1/7` pills
are IG chrome. What they do draw is a **series wordmark** (TECHNOLOGY, INTELS, FEMINA) at
1.5–2.3 %W, or a **SWIPE cue** on the cover only (2.3–2.8 %W).

---

## 2. The six recurring grammars, specified on 1080 × 1350

The conversion is ×0.818 for widths (1320→1080). Heights are taken as %H × 1350. "Cap" means
rendered cap height in px. Font sizes assume Anton cap/em = .86, Bebas .70, League Gothic .735,
Barlow Condensed .70.

### G1. Photo → fade → tag → left-aligned condensed caps with keyword colour (tastebud, intels; 969K likes combined)

- **Image box:** 0–880 px (0–65 %H), full bleed.
- **Fade band:** y 720 → 880 (**160 px**), image → `#000`, eased (luminance falls about 50 → 15 inside the band). Solid black from 880 down.
- **Tag:** x 46, y 885, height **30 px** (small "TRENDING" style) or **80 px** (bold "NEWS" style). White fill, black Anton caps, cap = 0.62 × tag height, optional 6 px red underline.
- **Headline:** left-aligned, x **46** (4.2 %W). Top **y 920–880** (65–68 %H). Max width **900–920 px (83–85 %W)**, ragged right. **3–4 lines**.
  - Anton: font **108 px** (cap 93), line-height **102 px** (pitch/cap 1.10), tracking −0.5 %.
  - League Gothic variant: font **135 px** (cap 99), line-height **105 px** (1.06), tracking −3 %.
- **Colour:** white `#fff` plus **one** hot accent (contrast 5–8:1 on black).
  - Either 30–40 % of words (the shock nouns), or only the final word (the punchline).
- **Handle** bottom-left at y 1270, cap 35 px.

### G2. Divider + wordmark → full-bleed, line-fitted Bebas, two-tone (technology series ×6)

- **Image box:** 0–810 px (0–60 %H); fade y 675→810 (**135 px**); for hard news use 70 px.
- **Divider y = 800–840** (59–62 %H). Two rules, **3 px × 250 px** each (23 %W). They start at x 160 and x 670, with a **255 px** gap for the wordmark (extended sans caps, cap **16 px**). Rules fade to 0 alpha at their outer ends.
- **Headline:** x **12 → 1068** (**97–98 %W**), top y **822–862** (61–64 %H).
  - **Every line is set to exactly the full width**: font size is solved per line. Measured caps vary 5.8–11.2 %W inside a single post.
  - Cover: **3 lines**, cap **112–115 px** (Bebas font about 160–164 px), line-height pitch **1.08–1.09 × cap**.
  - Interior slides: 4–5 lines, cap **63–88 px**, starting at 68–75 %H.
- **Colour:** white plus one accent, **alternating word by word** (about 60 % accent). On interior slides the accent goes on proper nouns and numbers. A subtle texture inside the fill adds richness.
- **Cover-only extras:** subhead Bebas cap **49 px**, centred at 88 %H; CTA "SWIPE FOR MORE ▶" cap **25 px** at 94 %H.

### G3. Darkened full-bleed photo → rule + badge → centred heavy caps, white only (jacked, pubity, BM; 1.2M likes combined)

- **Image box:** full bleed 0–100 %. **Darkening gradient 540 → 840 px (≈300 px)** takes photo brightness to about 35 %, then black. The photo stays faintly visible behind the text.
- **Divider y 740–820** (55–61 %H). Two rules × **3–4 px**, each **33–42 %W (360–455 px)**, solid white or 60 % grey. Badge logo **220 × 80 px** centred between them.
- **Headline:** centred, top **y 825–865** (61–64 %H), **4 lines**, cap **91–115 px** (Anton font **106–134 px**), tracking 0 to +0.5 %, line pitch **1.13 × cap** (≈103–130 px). Widest line **87–91 %W (940–985 px)**. White only.
- **Bar variant (BM):** 2 of 3 lines on solid bars. Bar height **1.4 × cap** (131 px for cap 94), radius 6, **12 px** gap between bars, bar colour soft periwinkle with `#111` text. Last line white with no bar.

### G4. Celestial object on pure black → centred headline → rule + sign-off (TYO, collectiveworld, whisperwillow, leo_meanings: the astrology-native grammar)

- **Background:** pure `#000` (measured luminance 0–2). Stars are allowed: a few 1–3 px points, ≤15 % brightness.
- **Object:** Ø **46–73 %W (500–790 px)**, centre **28–36 %H (380–485 px)**, sharp limb and photographic texture. Art edge density 2–5 (see §3), never a blur.
- **Headline:**
  - Heavy variant (TYO): Anton class, cap **107 px**, 4 lines, top **55 %H (742 px)**. It **overlaps the object's lower limb by 0–30 px**. Pitch 1.17.
  - Serif variant (whisperwillow): bold serif caps, cap **63 px**, top 68 %H, pitch 1.36, tracking +2–3 %.
- **Colour:** white, or white with the **payoff half in gold `#d0a05a`** (whisperwillow), or a **red hook line** (leo).
- **Sign-off:** rule at **94 %H (1270 px)**. Gold lens-flare 39 %W, a full-bleed 3 px white rule, or grey gradient rules either side of a logo. Signature in spaced caps at 1 %W.

### G5. Highlight bars (business magnets 750K, startupbydoc, ESPN/SI tile)

- Same placement as G3. The **emphasis is a filled bar** behind 1–2 lines instead of coloured words.
- Bar padding: ≈0.2 × cap top and bottom, 0.25 × cap left and right.
- Text on the bar is near-black (`#111`). Bar colour is a mid-tint (contrast with the text 7:1 or more).

### G6. Soft editorial / panel (Femina, athletesandassets: lowest engagement in the set, 8–20K)

- **Femina:** white page, blurred colour shape. Title Case serif italic, cap **77 px**, width **61 %W**, centred at 35–65 %H, 5 lines, pitch 1.06. Wordmark at 90 %H. Interior slides are 14–17 lines of italic body copy.
- **athletes:** photo 0–56 %H, hard cut to a cream panel with notched shoulders. Logo in the notch. Black Barlow Condensed 900 caps, cap **85 px**, width 71 %W, middle line orange.
- This is the grammar Align is currently closest to, and it is the one that performs worst here.

---

## 3. What stops the scroll, measured, and what is wrong with ours

Our renders measured: `dec-15-ranked-december/01`, `jan-27-note-eclipse-karmic-debt/01`,
`feb-14-valentines-venus-report/01` (1080 × 1350, all three in the same template).

| metric | references (punchy condensed set: tastebud, intels, technology, jacked, pubity, TYO, BM, watcher) | Align now | gap |
|---|---|---|---|
| Letter size | **cap 91–115 px** (8.4–10.7 %W, median 9.9 %W) | lowercase italic, **x-height 38–42 px** (3.5–3.9 %W); cap ≈ 60 px | our main letter body is **2.4–2.9× smaller** |
| Stroke weight | stems **17–24 px** (stem/cap .18–.22, Anton class) | stems **6–8 px** (EB Garamond italic) | **≈3× thinner** |
| Widest line | **83–98 %W** (900–1060 px) | 70–76 %W widest; average line **58 %W** (49–62 % on most lines) | lines are **~30 % narrower** |
| Headline block area | **22–36 % of the post** (median 25 %) | **13–16 %** | **~half** |
| Ink coverage (text pixels / post) | **8–17 %** (median 11 %) | **2.1–2.2 %** | **≈5× less ink** |
| Case | 15 of 18 covers ALL CAPS | all lowercase | — |
| Line pitch / cap | **1.06–1.17** (dense block) | ≈1.6× cap (lines 96–104 px apart for a 60 px cap); reads as loose lines, not a block | too airy |
| Background behind headline | **pure black**, luminance 0–2 | indigo haze `#1c0e42`, luminance ≈20, with glow halos | the type never sits on a hard dark floor |
| Art sharpness (mean abs gradient, 540 px wide) | **median 5.8** (range 1.2–13.4) | **0.65–1.14** | art is **5–9× softer**: a blurry glow with no edges, no subject, no focal point |
| Art tonal range (p5→p95 luminance) | 6 → 218 | 9 → 140 (dec-15), 28 → 201 (feb-14) | dec-15 is a grey-violet fog; nothing is truly black or truly bright |
| Text contrast | 21:1 white; accents 4.7–10.5:1 | 14.8–15.5:1 bone; accents ≈8.2:1 **with a glow halo** | contrast is fine. **Contrast is not the problem; size, weight and width are** |
| Elements on the cover | **3–5** (art · divider+logo · headline · optional CTA) | **6–7** (wordmark · counter · art · 1–2 spaced-mono kicker labels · headline · deck line) | 2–3 extra small low-value items |
| Headline top | 55–68 %H | 64–72 %H | fine |
| Accent use | one accent on shock nouns, the punchline, or alternating rhythm | one accent word with glow (e.g. "december", "venus", "300-year") | right idea, but at 40 px x-height it reads as a tint, not a hit |

**Blunt version.** Our cover is a mood poster. The references are headlines. Specifically:

1. The letters are a third the size.
2. The strokes are a third the weight.
3. The lines span 58 % of the width instead of 90 %.
4. All of this sits on a soft violet fog whose sharpness is 1/5 to 1/9 of the references'.

On a phone in the explore grid (a 3:4 crop about 440 px wide), our x-height renders at about
**16 px**. A Bebas cap in the references renders at about **45 px**. Our headline is literally
unreadable at thumbnail size; theirs is the largest thing on the screen.

The one serif-italic reference (Femina) is also the one with the least ink, and it has the lowest
engagement of the astrology posts with a heavy-caps peer: 20.4K, against 49.1K for TYO on the
same "astro news" topic.

**Explore-viewer collision zone:** IG's action column covers **x 87–98 %W, y 69–100 %H**. Centred
headlines at ≤ 88 %W, or left-aligned ragged-right headlines, keep the key words clear. Full-bleed
justified lines (G2) lose their last letter under the heart icon in every technology screenshot.

---

## 4. Recommended Align type system ("Sky News" covers), 1080 × 1350

**Keep (brand):**
- indigo void as the floor
- bone `#efe6d6` for primary text
- gold `#f2c75c` as the planet/time accent
- the sign's colour as the keyword accent
- the gold ✦
- one restrained mono line for chrome

**Change (punch):**
- condensed heavy caps for every headline
- hard, dark floor under the type
- photographic or sharp art for the top 60 %
- 3–5 elements per slide

### Fonts

| role | font | source |
|---|---|---|
| Headline (default) | **Anton** 400 | `npm i @fontsource/anton` (verified: installs and renders; cap/em .86) |
| Headline, long copy (5+ lines) / fit-to-width interior lines | **Bebas Neue** | local `reels/signs/assets/fonts/BebasNeue-Regular.ttf` (cap/em .70) |
| Deck / subhead | **Bebas Neue**, tracking +4 % | local |
| Chrome (wordmark, tag, CTA) | Space Mono (the app's `--mono`) for `align ✦`; Anton for tags | existing |
| Serif | **EB Garamond Italic only for the 1-line signature** ("align ✦ sky news"), never the headline | local |

### Colour rules

- **Floor:** `#0b0620` (`--void`). Make it solid under the headline. Measured luminance must be ≤ 4 (the references use 0–2). Bone on void is **16.0:1**.
- **Primary text:** bone `#efe6d6`.
- **Exactly one accent family per slide**, on **25–40 % of words**: the shock noun, the sign, or the payoff phrase. Never on articles or prepositions.
  - Sign stories: use the sign's `color` from `SIGN_COLORS`. On void it measures 4.8:1 (scorpio) to 13:1 (gemini), which passes large-text AA everywhere. Do not switch to `light`: the pastels lose punch.
  - Planet or timing stories: gold `#f2c75c` (12.3:1).
- **No glow or halo on text** (the references have none; a halo softens the edge).
- **Optional texture:** a faint grain or nebula texture inside the accent fill, ≤ 8 % luminance variation. This mirrors the technology "water fill".

### Cover template A: "Sky Headline" (G1 + G3 hybrid, the default)

| element | spec |
|---|---|
| Art box | x 0–1080, y 0–860, full bleed. Sharp subject (planet, moon, eclipse, sign constellation), edge density ≥ 4 at 540 px wide. Subject centred at y 380–460, Ø 520–700 px |
| Fade | y **700 → 880 (180 px)**, art → `#0b0620`, ease-in. Solid void from 880 |
| Divider | y **838**. Two **3 px** rules in the gold-foil gradient (`--gold-foil`), x **96→420** and **660→984**, each fading to 0 alpha at its outer end. `align ✦` centred: Space Mono **22 px**, bone 85 %, tracking .3em, ✦ in gold |
| Eyebrow (optional, replaces divider) | bone box, x 48, y 832, **34 px tall**; Anton **22 px** caps in `#0b0620`, padding 12 px horizontal: "SKY NEWS", "MERCURY Rx", "ECLIPSE" |
| Headline | Anton, UPPERCASE, centred, top **y 880**, max width **940 px** (x 70–1010 = 87 %W, clear of the IG action column) |
| Headline size, 3 lines (≤ 66 chars, ~22 chars/line) | **112 px** (cap 96), line-height **104 px**, tracking −0.5 % (−0.56 px). Block ends ≈ y 1184 |
| Headline size, 4 lines (≤ 88 chars) | **100 px** (cap 86), line-height **93 px**, tracking −0.5 %. Block ends ≈ y 1245 |
| Fit rule | choose the largest size in **92–128 px** such that the widest line is **≥ 85 %W** and the line count is ≤ 4. Never go below 92 px; rewrite the copy instead |
| Accent | 25–40 % of words in the sign colour or gold, as above |
| Deck (only when headline ≤ 3 lines) | Bebas Neue **44 px** (cap 31), tracking +4 %, `--label-2` `#b3a6c4`, centred, y **1222** |
| CTA | "SWIPE →" Bebas **30 px** (cap 21), bone 70 %, y **1290**. Cover only |
| Remove | the top `align ✦` wordmark and the `1/N` counter on the cover (IG draws its own pill). Remove the spaced-mono kicker labels ("VIRAL CLAIM", "VENUS · CAPRICORN"); fold that information into the eyebrow tag |
| Element count | art · divider (or tag) · headline · (deck or CTA) = **4** |

### Cover template B: "Celestial" (G4, for single-planet events)

- Void floor `#0b0620`. Planet Ø **600 px**, centred x 540, y **440**.
- Headline: Anton **116 px** (cap 100), line-height **113 px**, 4 lines max, top **y 742**. It overlaps the planet's limb by 20 px, with a void drop shadow of 0/0/40 px at 60 %.
- Gold lens-flare rule at y **1268**: 3 px, 420 px core fading out to 720 px.
- Signature "align ✦ sky news": EB Garamond Italic **26 px**, bone 70 %, y 1300.

### Interior template C: "Ranked / per-sign" (G2 + Femina's rank device, made punchy)

| element | spec |
|---|---|
| Art | sign art 0–620 px (46 %H), fade 520→640 to void |
| Rank | Anton **72 px** (cap 62) in gold `#f2c75c`: "#12", x 64, y 650 |
| Sign name | Anton **176 px** (cap 151) in the sign's `color`, uppercase, x 60, y 724. "SAGITTARIUS" at 176 px = 600 px wide; fit to ≤ 960 px |
| Verdict line | Bebas Neue, **line-fitted to 952 px width** (G2 trick), bone, 1–2 lines, cap 60–80 px, pitch 1.08 × cap, from y 900 |
| Body | Archivo Narrow **36 px** / 48 px line-height, `--label-2`, max 3 lines, x 64–1016, from y ≈ 1110 |
| Chrome | `align ✦` Space Mono 20 px top-left at y 60; `3/14` Space Mono 20 px top-right (interior slides only) |

### Sizes at a glance (1080 × 1350)

| token | font | size / line-height / tracking | colour |
|---|---|---|---|
| `headline.xl` (3 lines) | Anton | 112 / 104 / −0.5 % | bone + 1 accent |
| `headline.l` (4 lines) | Anton | 100 / 93 / −0.5 % | bone + 1 accent |
| `headline.celestial` | Anton | 116 / 113 / −0.5 % | bone + gold |
| `fit.line` | Bebas Neue | solved per line to 952 px, pitch 1.08 × cap | bone / accent alternating |
| `sign.name` | Anton | 176 / 160 / −1 % | sign `color` |
| `rank` | Anton | 72 / 72 / 0 | gold `#f2c75c` |
| `deck` | Bebas Neue | 44 / 50 / +4 % | `#b3a6c4` |
| `cta` | Bebas Neue | 30 / 30 / +6 % | bone 70 % |
| `tag` | Anton | 22 in a 34 px box | void on bone |
| `wordmark` | Space Mono | 22 / — / .3em | bone 85 %, ✦ gold |
| `signature` | EB Garamond Italic | 26 | bone 70 % |
| `body` | Archivo Narrow | 36 / 48 / 0 | `#b3a6c4` |

### Acceptance checks for the renderer (`check.mjs` candidates)

- Headline cap height ≥ **86 px**.
- Widest headline line ≥ **85 %W** and ≤ **88 %W** if centred.
- Text ink coverage ≥ **8 %** of the canvas.
- Headline background luminance ≤ **4**.
- Art edge density ≥ **3.0** (mean abs gradient at 540 px width).
- No text glow.
- ≤ **5** elements on the cover.
- Accent on 25–40 % of words.
- Nothing important in **x > 940, y > 930** (IG action column).
