# Align sky news: carousel formats

A news-style Instagram series for Align: what the sky is doing today, this
week and this month, plus call-outs for specific signs. It borrows the
*grammar* of viral news carousels (tag, loud headline, counter, one story per
slide) and renders it in Stardust (`app/src/index.css`), next to the house
carousel spec (`../SPEC.md`). Working series name: **the sky desk**.

Canvas 1080 × 1350 (4:5), JPEG, film grain, like `../SPEC.md`.

Example dates and times below are illustrative. Every real post takes them
from the ephemeris (§5) before it ships.

---

## 1. Reference breakdown

**tastebud: "cocaine found in every single shrimp tested in england's waterways"**
- Hook: absurd noun pair (drug + shrimp) plus a totaliser ("every single"). Shock first, scope second.
- Grammar: condensed heavy caps, 3 lines, bottom third. Pink on the nouns that carry the shock (COCAINE / SHRIMP TESTED / ENGLAND'S), white on the glue words. Alternation is semantic, not every-other-word.
- Tag: tiny white "TRENDING" box above line 1. Handle bottom-left, round logo centred under the text.
- Art: one hyper-real (likely generated) photo that literalises the headline, dark top-to-bottom fade into black under the type.
- Caption: "researchers... found something unexpected", a slow reveal.
- Community note ("true but misleading for views"): the platform fact-check became part of the post. People share it *because* of the note. Lesson: honest correction is itself engagement.

**intels: "NEWS" cover**
- Tag: black-on-white "NEWS" stamp with a red underline, directly above the headline. Reads as a wire-service label.
- Grammar: ultra-condensed white caps, one colour word at the end (DISORDER in blue) as the payoff.
- Hook: definitive future claim ("no more ... will be born"). This is the overclaiming we must not copy; the caption walks it back ("working on... could potentially").
- Art: sculptural grey bust + glowing DNA, symbol + subject, on near-black.

**technology: "what just happened around the world in the last 24 hours?" (1/16, 1/14)**
- Hook: a question that promises completeness and recency. You swipe to be caught up, you save to be the one who knows.
- Eyebrow: "TECHNOLOGY" set on a centred hairline rule above the headline. Sub-line "TRENDING IN TECH & AI", then "SWIPE FOR MORE ▸".
- Grammar: condensed caps, blue/white alternation in 1–3 word runs; blue carries the nouns and numbers (HAPPENED / WORLD / LAST 24 HOURS).
- Counter: "1/16" pill top-right; inner slides repeat the eyebrow top-right above the counter. The series label rides every slide so a screenshot still carries the brand.
- Inner slides (2/16, 3/16, 4/16): picture top 55%, one long headline (2–5 lines) bottom 40%, same alternation. One story per slide, no body text. The headline *is* the article.
- Cover art: collage of the week's faces. Caption: "swipe ⬅ to see what happened across tech and AI in the last 24 hours, from X to Y...".
- Why saved/shared: recurring daily slot (habit), high density, conversational fodder.

**startupbydoc: "Anthropic publish a list of jobs that will be affected by AI in 2027"**
- Grammar: title-case bold sans, centred, one line on a hot-pink highlighter bar. The bar marks the payload ("a list of jobs that will").
- Hook: "a list" + "affected" = am-I-on-it anxiety. Self-check content is high-save.
- Tag: social-icon handle pill top-left; "1/5" top-right; "Swipe to See →" under the headline.
- Art: person holding a literal prop sign ("NO JOBS AVAILABLE") + round logo badge.

**thebusinessmagnets: "apple loses $108 billion in market value after unveiling iphone 17"**
- Grammar: condensed black caps inside lavender highlight boxes for lines 1–2; line 3 white on black. Box = the number, white = the context.
- Divider wordmark: brand wordmark centred on a hairline rule between art and headline.
- Art: cutout person between two ringed circles (chart, product). Circles as "evidence".
- Hook: big number + a cause. Caption gives the one stat (fell 3.48%).

**Femina: "the zodiac signs whose lives will change the most in 2027, ranked" (1/13)**
- Cover: serif italic, title case, white, inside a blurred red heart on white. Wordmark under it. Soft, editorial; contrasts with the tabloid tiles above.
- Hook: "ranked" + "your sign is in here somewhere". Everyone swipes to find their own; people tag friends at their rank.
- Inner slides (#12 Cancer ... #1 Aquarius): big red serif "#12", serif italic sign name, bold italic one-line hook addressed to the sign ("Cancer, your priorities are about to look very different."), then 1–2 italic paragraphs naming real transits (Jupiter into Virgo, Saturn and Neptune in Aries, Pluto in Aquarius, Feb/Aug eclipses).
- Counter does the countdown: 2/13 = #12, 13/13 = #1. Climax at the end keeps swipe-through high.
- Hedged language throughout ("might", "could"). Readable, saveable, astrology as tone not verdict.

**collectiveworld: "leo is entering their most expansive era of luck and opportunity in 12 years"**
- Single-sign callout, one slide. Sign name is the first word: Leos stop scrolling, others send it to their Leo.
- Grammar: clean white caps sans, centred, four lines, generous leading; hairline rule + wordmark beneath.
- Art: one painterly planet (Jupiter-like) on a sparse starfield. The planet stands in for the transit.
- Caption carries the astronomy ("since June 2026, Jupiter, the..."): headline = feeling, caption = fact. "12 years" is a real hook because Jupiter's cycle is ~12 years.

**Patterns that transfer**
1. Tag + headline + art. Three layers, always in that reading order (art top, tag, headline bottom).
2. Colour marks *meaning words*, not decoration. 1–3 colour runs per headline.
3. Counter + repeated eyebrow on every slide = series identity that survives screenshots.
4. Cover asks or promises; inner slides pay off one item each; last slide is the biggest item.
5. Self-locating hooks (your sign, a list, ranked) drive saves and tags.
6. The caption carries the fact the headline compresses.
7. Overclaiming wins reach but earns community notes. Align takes the note's side.

---

## 2. Stardust translation rules (apply to every format)

| Reference device | Align version |
| --- | --- |
| condensed caps headline | EB Garamond italic, lowercase, 96–132px, line-height 0.96, -0.01em, bone `#efe6d6` |
| alternating colour words | 1–3 *meaning runs* coloured; everything else bone. Never every-other-word |
| TRENDING / NEWS stamp | Space Mono uppercase eyebrow, 22–24px, 0.22em, `--label-2`, with a leading ✦ in gold `#f2c75c` |
| eyebrow on a rule | eyebrow centred on 1px hairlines `rgba(179,166,196,0.22)`; the rule spans 64px gutters |
| pink / lavender highlight bar | **veil bar**: `rgba(52,35,95,0.82)` glass block behind one line, radius 10, 1px hairline. Never pink, never gold |
| divider wordmark | `— align ✦ sky desk —` in mono on the rule, 55% opacity |
| 1/16 pill | mono `03/12` top-right, `--label-3`, no pill fill (pills are pearl in the app; keep it quiet here) |
| black background | `--void #0b0620` → `--canvas #140a2e` vertical gradient, never `#000` |
| white text | bone `#efe6d6`; secondary `#b3a6c4` |
| photo literalising the story | sign figure / aura art, or procedural sky objects (below). No real people, no stock |

**Highlight colour key (one system across all formats)**
- **Sign colour** (`SIGN_COLORS[sign].color`, or `.light` if contrast < 4.5:1 on `#140a2e`): the sign's name and its direct consequence ("leo", "your house").
- **Gold `#f2c75c`**: at most **one** word per slide, the sky object or event ("venus", "eclipse", "full moon"). Gold stays an accent.
- **Bone**: everything else. A headline with no sign gets only the gold word.
- **Reading colours** only in the sky-note verdict and who-this-hits weight: spark `#7fd8b0` = true / pull, align `#f2c75c` = true-ish / mixed, rub `#e8628a` = false / push.
- Violet `#9a7be0` only for procedural glows and the veil-bar hairline, never text.

**Art sources** (renderer kinds; extend the `bg` kinds in `../SPEC.md`)
- `figure` sign constellation-creature (e.g. `img/figure/leo.jpg`, lion in molten orange glow). Use for sign callouts and ranked items.
- `aura` sign silhouette with glyph (`img/aura/<sign>.jpg`). Use when the story is about *you* (feelings, dating).
- `sky` procedural starfield, optional `moon` phase 0–1.
- `orb` procedural planet orb: `planet` (mercury, venus, mars, jupiter, saturn...), banded pearl gradient tinted by planet, soft violet rim light. Replaces the painted-planet reference.
- `ring` eclipse ring: black disc + gold corona (solar) or copper-tinted moon (lunar).
- `chart` thin-line zodiac wheel with one planet glyph on a degree, gold tick at the event. For calendar and roundup inner slides.
Art sits in the top 55% with a fade into `--canvas`; type never sits on busy art.

---

## 3. Formats

### 3.1 `sky-roundup` — what just happened in the sky
- **Purpose:** the habit slot. Catch people up on the sky in one swipe; the Align version of the 24-hours roundup.
- **When:** weekly (Sunday evening, "this week") + daily lite version (3–5 slides) on busy days.
- **Slides:** 1 cover · 2..N-1 one sky event each (5–9) · N "the one to watch" + sign-off.
- **Cover:** art top 55% = `chart` wheel with this week's glyphs lit, or `sky`. Eyebrow on rule at ~58%: `✦ SKY DESK · WEEK OF NOV 23`. Headline below: "what just happened in the sky this week?" with *sky* in gold. Sub-line mono `--label-2`: `7 STORIES · SWIPE`. Counter `01/08` top-right.
- **Inner:** art top 55% (`orb` for a planet, `sky` + moon for lunations, `chart` for ingresses). Eyebrow top-left `✦ SKY DESK`, counter top-right. Headline 2–4 lines in the bottom 40%; under it one mono date line (`NOV 24 · 14:53 UTC`) and **one** bone sans sentence (≤ 18 words) saying what it means as a reading.
- **Highlight:** event word gold; sign names in sign colour; rest bone.
- **Caption:** "swipe for the week the sky had. one of these is about your love life." + date range.
- **Example headlines:**
  - cover: "what just happened in the sky this week?"
  - "the sun just walked into sagittarius. the honest era starts now"
  - "full moon in gemini: the conversation you keep drafting wants sending"
  - "venus is direct again and the exes are, statistically, typing"
  - last: "the one to watch: the moon meets saturn on friday. say the boring true thing"

### 3.2 `ranked-twelve` — the signs, ranked
- **Purpose:** the save-and-tag engine. Every reader is in it.
- **When:** monthly (one theme) + big moments (new year, eclipse season, venus retrograde).
- **Slides:** 1 cover · 2–13 = #12 → #1 · 14 optional "how we ranked this" (method, honest) .
- **Cover:** full-bleed `aura` of the #1 sign heavily blurred into a halo (Stardust take on the blurred heart), centred headline in italic serif, eyebrow above `✦ RANKED · DECEMBER`, `align ✦` mono under. Counter `01/14`.
- **Inner:** no art except a 30% sign-coloured wash at the bottom and the sign's glyph faint top-right. Top-left: rank `#12` in EB Garamond italic 160px **in the sign colour**. Then sign name italic 88px bone. Then hook line, sans 600 italic 38px, addressed to the sign. Then body 2–4 sentences, sans 30px `--label-2`, naming the real transit(s).
- **Highlight:** rank number in sign colour; the one transit word in the body gold; nothing else.
- **Caption:** "find your rank. send it to the one who's #1." Hashtags incl. the month.
- **Example:** cover "the signs most likely to get an honest text this month, ranked". #12 "capricorn — you'll get one. you'll reply in four business days." #1 "leo — jupiter is in your sign and your mouth is ahead of your fear. say it first."

### 3.3 `sign-callout` — "leo, ..."
- **Purpose:** one sign, one transit, one line. Built to be sent *to* someone.
- **When:** 2–3× per week; on the day a planet enters a sign or hits a sign's season.
- **Slides:** 1–4. Slide 1 stands alone; 2–3 explain; 4 the Align line.
- **Cover:** `orb` (planet in the story) centred on `sky`, or `figure` of the sign. Headline centred under the art, 3–4 lines, starting with the sign name + comma. Hairline rule + `align ✦ sky desk` under (the divider-wordmark move).
- **Inner:** `figure` at zoom 1.2 → 1.4 across slides, held as one scene. Fragment type per `../SPEC.md` (one sentence running across slides), but in EB Garamond italic.
- **Highlight:** sign name in sign colour; planet in gold.
- **Caption:** the astronomy, in one honest line: "jupiter entered leo in late june 2026 and stays about a year. jupiter takes ~12 years to lap the zodiac."
- **Example:** "leo, jupiter is in your sign for the first time in 12 years. take up the room." / "scorpio, it's your season. stop testing people who already passed." / "pisces, saturn left you. the lesson stayed."

### 3.4 `sky-note` — sky community note (myth-check)
- **Purpose:** correct viral astrology misinformation honestly, in the shape of a community note. Builds trust; it's the account's integrity format.
- **When:** event-driven, within 24h of a viral claim (retrograde panic, "nasa changed your sign", "rare planetary alignment", "the moon will look 3x bigger").
- **Slides:** 1 the claim (quoted) · 2 the verdict · 3 what's actually happening (astronomy) · 4 what astrologers read into it (framed as reading) · 5 the honest take.
- **Cover:** the claim in a **veil bar** quote card, set in serif italic with quote marks, struck through by nothing (no mocking). Above: eyebrow `✦ SKY NOTE · VIRAL CLAIM`. Below: a note panel (radius 16, `--raised`, hairline) with mono `SKY NOTE` + one sans line: "true but missing context" / "not true" / "true".
- **Inner:** text-only, `sky` background. Verdict slide: one word huge in italic serif in the reading colour (spark *true*, align *half true*, rub *not true*), then one sentence. Fact slide: astronomy in plain sans, mono source line (`SOURCE: NASA / JPL HORIZONS`).
- **Highlight:** only the verdict word, in its reading colour. No gold.
- **Caption:** "sky note: [claim]. [verdict]. sources in slide 3." Never dunk on the account that posted it; never name it.
- **Example:** claim "mercury is moving backwards, that's why your ex texted". Verdict *half true*. Fact: "mercury doesn't reverse. earth overtakes it, so from here it *looks* like it slides back for ~3 weeks, about three times a year." Reading: "astrologers read it as a time for re-dos and re-reads." Honest take: "your ex texted because they wanted to. you still get to decide."
- Other: "nasa added a 13th sign" → *not true*: NASA explained precession; the tropical zodiac is tied to seasons, not constellations. "planets will align on [date]" → *half true*: several are visible on the same side of the sun, never in a straight line.

### 3.5 `month-ahead` — what's coming in <month>
- **Purpose:** the calendar people screenshot. Highest-save format.
- **When:** monthly, last 2 days of the prior month.
- **Slides:** 1 cover · 2 the month at a glance (list) · 3..N one key date each (4–6) · N "if you only remember one date".
- **Cover:** `chart` wheel at top with the month's events as gold ticks. Eyebrow on rule `✦ SKY DESK · DECEMBER 2026`. Headline "what's coming in december" with *december* in gold.
- **Glance slide:** a dated list, left-aligned: mono date column (`DEC 01`) + serif italic event + tiny sign glyph; 6–9 rows, 1px hairline row dividers, rows 72px tall.
- **Inner:** like `sky-roundup` inner, plus a large date in mono (`DEC 24`) top-left as the kicker.
- **Highlight:** month name gold on cover; sign names in sign colour; no gold on inner except the event word.
- **Caption:** "save this. december has one date worth planning a conversation around."
- **Example:** "dec 24 · full moon in cancer: say the soft thing out loud" / "mercury in sagittarius: blunt is fine. cruel isn't." Dates come from the ephemeris (see §5).

### 3.6 `moon-alert` — lunation / eclipse alert
- **Purpose:** timely event post the day before / day of a new moon, full moon or eclipse.
- **When:** each new + full moon (~2/month); eclipses get a 3-post arc (7 days out, day before, day of).
- **Slides:** 1 alert cover · 2 when + where it's visible (facts) · 3 the reading · 4 the 3 signs it hits hardest (mini who-this-hits) · 5 one thing to do.
- **Cover:** big procedural moon (`sky` with `moon` phase) or `ring` for eclipses, centred top 60%. Eyebrow stamp `✦ MOON ALERT` (eclipse: `✦ ECLIPSE ALERT`). Headline: "full moon in gemini, tonight" with *full moon* gold, *gemini* sign colour. Mono line: exact time in UTC + local hint ("peaks 14:53 utc · look east after sunset").
- **Inner:** fact slide is astronomy only (time, phase, visibility, eclipse type and path), sans; reading slide in serif.
- **Highlight:** event gold, sign colour on sign.
- **Caption:** time + visibility + one line of reading.
- **Example:** "total solar eclipse in leo: aug 2, 2027. the sky goes dark for over six minutes in parts of north africa" (fact slide) → reading "leo season, lights off. who are you when nobody's watching?"

### 3.7 `who-this-hits` — per-sign hit list
- **Purpose:** one transit, twelve answers. Self-locating like ranked, but grouped by impact, not ranked.
- **When:** weekly or on any major ingress / retrograde station.
- **Slides:** 1 cover · 2 "hits hardest" (3 signs) · 3 "feels it" (3–4) · 4 "background noise" (rest) · 5 the move.
- **Cover:** `orb` of the planet, headline "venus goes retrograde. who this hits" with *venus* gold. Eyebrow `✦ WHO THIS HITS`.
- **Inner:** tier label in mono with a reading-colour dot (rub = hits hardest, align = feels it, spark = barely). Then rows: sign name in serif italic **in sign colour** + one bone sans line each. Max 4 rows per slide.
- **Caption:** "find your sign. tag the one who's in tier one."
- **Example rows:** "scorpio — the ex isn't back, the pattern is." / "taurus — you'll want old comfort. ask if it's mutual first." / "libra — re-read before you re-send."

### 3.8 `venus-report` — love weather (added)
- **Purpose:** the dating-app-specific beat: what Venus (and Mars, the moon in relationship signs) means for dating this week. Core message home: *venus runs your heart*.
- **When:** weekly (Friday, before the weekend) + every Venus ingress.
- **Slides:** 1 cover · 2 where Venus is (fact + sign) · 3 "good week for" · 4 "bad week for" · 5 by element (fire / earth / air / water, one line each) · 6 sign-off line.
- **Cover:** `orb` venus in pearl-rose, `aura` silhouettes faint either side. Headline "love weather: venus in capricorn" with *venus* gold, *capricorn* sign colour.
- **Inner:** two-column good/bad slides with spark/rub dots; element slide: element word bone, preceded by a small dot in the colour of the sign Venus is in.
- **Caption:** "your sun is who you are. your venus is how you love. find yours."
- **Example:** "good week for: saying what you want on the first date. bad week for: pretending you're fine with 'let's see where it goes'."

### 3.9 `season-handover` — new sign season (added)
- **Purpose:** monthly mood switch when the sun changes sign; bridges two sign audiences in one post.
- **When:** monthly, the day of the Sun's ingress (~20th–23rd).
- **Slides:** 1 handover cover · 2 "goodbye <outgoing>" · 3 "hello <incoming>" · 4 what the season is good for · 5 the line.
- **Cover:** split `figure` art: outgoing sign fading left, incoming sign bright right, the seam a gold hairline. Headline "scorpio hands the keys to sagittarius" with both names in their sign colours.
- **Caption:** "sun enters sagittarius nov 22. the honest season." (Date from ephemeris.)

---

## 4. JSON shape

Common envelope (all formats):

```json
{
  "id": "2026-11-23-sky-roundup",
  "format": "sky-roundup",
  "date": "2026-11-23",
  "range": ["2026-11-23", "2026-11-29"],
  "eyebrow": "sky desk · week of nov 23",
  "signs": ["sagittarius", "gemini"],
  "core": ["honest"],
  "slides": [
    {
      "layout": "cover | story | rank | callout | note-claim | note-verdict | fact | list | tier | split | outro",
      "kicker": "nov 24 · 14:53 utc",
      "headline": "full moon in gemini: the conversation you keep drafting wants sending",
      "highlight": [{ "text": "full moon", "tone": "gold" }, { "text": "gemini", "tone": "sign", "sign": "gemini" }],
      "body": "a reading, not a forecast: good night to say the true thing.",
      "sign": "gemini",
      "art": { "kind": "sky | figure | aura | orb | ring | chart", "sign": "gemini", "planet": "venus", "moon": 1.0, "eclipse": "solar | lunar", "zoom": 1.1, "focus": "50% 40%" },
      "facts": [{ "label": "peak", "value": "14:53 utc" }],
      "source": "ephemeris"
    }
  ],
  "caption": "swipe for the week the sky had.",
  "hashtags": ["astrology", "fullmoon", "gemini"]
}
```

`tone` ∈ `sign | gold | spark | align | rub | bone`. Renderer enforces max one `gold` per slide. Lowercase in JSON; renderer applies uppercase only to `eyebrow` and `kicker`.

Format-specific additions (fields only):
- `sky-roundup`: slide `{ eventId, at }`; envelope `watch` (index of the "one to watch" slide).
- `ranked-twelve`: envelope `theme`, `method`; slide `{ rank: 1–12, hook }` (`hook` = bold line under the sign name). Exactly 12 rank slides, each sign once.
- `sign-callout`: envelope `transit: { planet, sign, from, to }`; slides use `text` fragments (house fragment rule) after the cover.
- `sky-note`: envelope `claim: { text, seenOn: "instagram | tiktok | x" }`, `verdict: "true | half-true | not-true"`, `sources: [{ name, url }]`; slide layouts `note-claim`, `note-verdict`, `fact`, `reading`, `outro`.
- `month-ahead`: envelope `month: "2026-12"`, `events: [{ date, label, sign, planet, kind }]`; `list` slide renders `events`.
- `moon-alert`: envelope `event: { kind: "new | full | solar-eclipse | lunar-eclipse", sign, at, visibility, eclipseType }`, `arc: "t-7 | t-1 | t0"`.
- `who-this-hits`: envelope `transit`; slide `{ tier: "hardest | feels | background", rows: [{ sign, line }] }`.
- `venus-report`: envelope `venus: { sign, from, to, retrograde }`; slide `{ good: [], bad: [] }` or `{ elements: { fire, earth, air, water } }`.
- `season-handover`: envelope `from`, `to`, `at`.

Astronomy fields (`at`, `from`, `to`, `visibility`) are filled by script from an ephemeris (e.g. JPL Horizons / Swiss Ephemeris), never typed by hand.

---

## 5. Voice rules for the sky desk

**Case.** Lowercase everywhere in display and body, including sign and planet names; uppercase **only** in Space Mono eyebrows, kickers and dates. The tabloid shout of condensed caps is replaced by *size and contrast*: big EB Garamond italic, one gold word, one sign-coloured word. Calm voice, loud layout. No exclamation marks, no "BREAKING", no 🚨.

**Headline grammar.**
- Lead with the sign or the sky object, then the consequence: "<sign>, <thing>" or "<object> in <sign>: <reading>".
- One clause of news + one clause of advice. ≤ 14 words on covers, ≤ 18 inside.
- Numbers when they're true and interesting ("12 years", "6 minutes", "3 times a year").
- Never use "will" about a person's future. Use "good time to", "asks you to", "astrologers read this as", "could".

**Honesty rules.**
1. Astronomy is fact and must be correct: dates, times (UTC), signs, phases, eclipse type and visibility come from an ephemeris and are checked before posting. If unsure, cut it.
2. Astrology is a reading, always framed as one. Ok: "a good week to", "reads as", "the sky's suggesting". Not ok: "you will meet", "guaranteed", "this will change your life", "your soulmate arrives".
3. Tropical zodiac by default; say so in `sky-note` when it matters.
4. "Rare" only when it's rare (Jupiter return ~12 yrs, Saturn ~29.5 yrs; a full moon is monthly).
5. No fake scientists, no fake quotes, no generated images passed off as photos of real events. Procedural art is obviously illustration.
6. Never punch down at a sign; the target is a behaviour (from `../SPEC.md`).
7. When another account overclaims, we write the note, not the dunk.
8. Health, money and legal outcomes are off-limits as predictions.

**Core messages, sprinkled (max one per carousel, never as an ad).**
- *Read the sky before the face*: on dating-adjacent slides. "read their sky before their selfies."
- *It has to be mutual*: in venus / full-moon readings. "if it's one-sided, it isn't alignment. it's a hobby."
- *Say the honest thing*: Sagittarius / Mercury stories, and the `sky-note` outro by default.
- *Release, don't ghost*: Scorpio / Pluto / eclipse endings. "eclipses close doors. close yours politely."
- *New deal at 11:11*: new-moon and month-ahead outros. "new moon, new deck. there's always an 11:11."
- *Venus runs your heart*: the `venus-report` sign-off, always.
The line sits on the last slide as the "one thing to do", in the same type as everything else. No logo lockup, no "download", no app screenshot. The only branding is `align ✦` mono and the `sky desk` eyebrow.

**Captions.** Lowercase, ≤ 2 short sentences. First sentence repeats the hook or invites a save / tag; second carries the hard fact (date, time, source). 3–6 hashtags, no `#` in JSON.
