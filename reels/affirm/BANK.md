# The content bank: how to write reel bodies

Each file in `bank/` is a JSON array of **bodies**. A body is a whole reel
except its ending; `generate.mjs` adds the Align ending (comment for a DM,
align with the right person, join the beta, or join the beta to vote your city) and a voice.

Check a file with:

```bash
node reels/affirm/generate.mjs --check reels/affirm/bank/<file>.json
```

## A body

```json
{
  "key": "venus-aries",
  "title": "Venus in Aries",
  "cover": "*Venus* in Aries",
  "caption": "venus in aries doesn't want to be convinced. it wants to be chosen, fast",
  "hashtags": ["venusinaries", "aries", "venussign", "astrology", "affirmations"],
  "keyword": "VENUS",
  "scenes": [
    {
      "art": "planet",
      "opts": { "glyph": "♀", "tone": "rose" },
      "header": "VENUS IN ARIES",
      "lines": ["If your Venus is in *Aries,*", "you don't fall slowly.", "You *decide.*"],
      "labels": [{ "on": "planet", "at": 1, "text": "VENUS · PLANET OF LOVE" }]
    },
    {
      "art": "sign",
      "opts": { "sign": "aries" },
      "header": "RULED BY MARS",
      "lines": ["Aries is ruled by *Mars,*", "so your love moves first", "and asks questions later.", "Waiting feels like being *ignored.*"]
    },
    {
      "art": "figures",
      "opts": { "pose": "meet" },
      "header": "SAY IT WITH ME",
      "pause": 0.5,
      "lines": ["Say it with me.", "I want someone who *chooses* me,", "out loud and on purpose.", "I don't have to slow down", "to be *worth* waiting for."]
    }
  ]
}
```

- `key`: unique, lowercase-with-dashes, prefixed with the family (`venus-aries`, `pair-aries-libra`, `love-ghosting`).
- `title`: plain name. `cover`: the grid-cover text, ≤ 32 characters, one `*emphasis*`.
- `caption`: the post caption, lowercase, ≤ 110 characters, offhand and specific.
- `hashtags`: 3–6, no `#`.
- `keyword`: which DM reply this body pairs with if it gets a comment ending:
  `VENUS` `MARS` `MOON` `SEVEN` `MATCH` `PASSING` `MUTUAL` `CHART` (your family brief says which).
- `scenes`: **3 or 4**. Each scene is one drawing held across 2–7 caption lines.

### Lines

- **55–88 words in the body.** The ending adds ~15–20 more, for a ~40 second reel.
- 2–10 words a line, ≤ 50 characters. A line is one caption on screen, spoken in one breath.
- **The first line is the hook.** It is on screen at frame one. Make it stop a thumb:
  a surprising true fact, a direct "you", a reframe. Never "Hey guys" or "Did you know".
- `*word*` marks emphasis (bold, glows while spoken). Use it on 1–2 words in about half the
  lines, never a whole line.
- Most bodies have an affirmation scene that opens with **"Say it with me."** then 2–4
  first-person lines ("I…", "My…"). Give that scene `"pause": 0.5`. About one body in five
  can skip it and land on a single strong line instead.
- Spell numbers as words (seventh, eleven). No ALL-CAPS words, no `!`, no `#`, no emoji.
- **Banned** (the voice mangles them or the brand avoids them): astrologer(s), manifest,
  soulmate, twin flame, toxic, narcissist, trauma, download, app, Align (the ending says it).
- `header`: small mono caps at the top, ≤ 32 characters, words joined with ` · `.
- `labels`: optional technical callouts, `{ "on": <anchor>, "at": <line index>, "text": "CAPS ≤ 28" }`.

### Voice

Second person, calm, warm and honest, like a letter written at 2am by someone who
knows you. Astrology *reads*; it never decides your fate. Be kind to every sign: name a
real trait and turn it into something tender and useful; it can sting a little, never
punch down. No therapy jargon, no promises of "the one". Every astrology fact must be
standard Western tropical astrology:

- Elements: fire = aries leo sagittarius · earth = taurus virgo capricorn · air = gemini libra aquarius · water = cancer scorpio pisces
- Modalities: cardinal = aries cancer libra capricorn · fixed = taurus leo scorpio aquarius · mutable = gemini virgo sagittarius pisces
- Rulers: aries Mars · taurus Venus · gemini Mercury · cancer the Moon · leo the Sun · virgo Mercury · libra Venus · scorpio Mars (modern: Pluto) · sagittarius Jupiter · capricorn Saturn · aquarius Saturn (modern: Uranus) · pisces Jupiter (modern: Neptune)
- Opposites: aries–libra · taurus–scorpio · gemini–sagittarius · cancer–capricorn · leo–aquarius · virgo–pisces. Your 7th house (descendant) is the sign opposite your rising.
- Aspects by distance on the wheel: same sign 0° conjunction · 1 apart 30° semi-sextile · 2 apart 60° sextile · 3 apart 90° square · 4 apart 120° trine · 5 apart 150° quincunx · 6 apart 180° opposition.
- Houses: 1 self · 2 money and values · 3 talk and siblings · 4 home and family · 5 romance, play, creativity · 6 routines and health · 7 partners · 8 intimacy and shared things · 9 travel and belief · 10 career and reputation · 11 friends and hopes · 12 the hidden and rest.

## Drawings (`art`)

Pick the drawing that shows what the lines are saying, and vary them through a body.
The engine tints and animates everything; you only choose.

| art | what it shows | opts | anchors (for labels) |
| --- | --- | --- | --- |
| `planet` | a big halftone planet with its glyph | `glyph`: ♀ ♂ ☽ ☿ ☉ ♃ ♄ · `tone`: rose lilac mint gold · `ring`: true (Saturn-like ring) | planet |
| `sign` | the sign's constellation drawing itself star by star, its glyph in a medallion | `sign`: aries … pisces | sign, stars |
| `wheel` | a birth-chart wheel: 12 houses and signs | `highlight`: house 1–12, `highlightAt` · `axis`: true (rising–descendant line), `axisAt` · `planet`: glyph + `planetSign`: sign name, `planetAt` · `pair`: [signA, signB] draws the aspect between them and labels its angle, `pairAt` · `rising`: a sign name turns the ring so that sign sits on the ascendant | house, asc, dsc, planet, pair |
| `phases` | the eight moon phases on an arc, one lit | `lit`: 0 new · 1 waxing crescent · 2 first quarter · 3 waxing gibbous · 4 full · 5 waning gibbous · 6 last quarter · 7 waning crescent | moon |
| `elements` | the four element triangles | `element`: fire earth air water · `second`: another element (for pairings) | element |
| `figures` | two star-headed people (Align's Stardust) on a reflecting horizon | `pose`: apart (a thread between them) · meet (holding hands) · pass (one walks on, a ghost behind) · orbit (a star circling one of them) | thread, a, b, you, orbit |
| `venus` | the Venus glyph drawn large in rose | `mirror`: true (glass sheen), `mirrorAt` | glass, handle |
| `eclipse` | a total solar eclipse; the moon slides over | — | moon, sun |
| `syzygy` | sun, moon and earth side on | `offline`: true (moon out of line) · `alignAt`: line index where it moves into line | moon, line |
| `loop` | a planet tracing its retrograde loop | — | loop |
| `retro` | the retrograde diagram: two orbits, sight lines | — | planet, earth, path |

`…At` options are a line index (0 = first line of the scene): the part appears when that
line is spoken. Good defaults: `figures` meet for "Say it with me", `sign` for anything
about a sign's nature, `wheel` for houses, rising and pairs, `planet` for a planet's meaning.

## Families

Write the family files you are given, with exactly the items listed. Signs in zodiac order:
aries taurus gemini cancer leo virgo libra scorpio sagittarius capricorn aquarius pisces.

| file | items | what each body is | keyword |
| --- | --- | --- | --- |
| `venus.json` | 12 signs | Venus in {sign}: how you need to be loved | VENUS |
| `mars.json` | 12 signs | Mars in {sign}: how you want, chase, and fight fair | MARS |
| `moon.json` | 12 signs | Moon in {sign}: what makes you feel safe | MOON |
| `mercury.json` | 12 signs | Mercury in {sign}: how you need to be talked to in love | CHART |
| `rising.json` | 12 signs | {sign} rising: your seventh house is the opposite sign, and what that says you're drawn to | SEVEN |
| `ruler.json` | 12 signs | {sign} is ruled by {planet}: what that planet does to how you love | CHART |
| `season.json` | 12 signs | {sign} season in love: what that month asks of everyone | CHART |
| `unsaid.json` | 12 signs | how a {sign} says I love you without saying it | VENUS |
| `dear.json` | 12 signs | "Dear {sign}," a love letter: your gift in love and the pattern to put down | CHART |
| `hear.json` | 12 signs | what a {sign} needs to hear about love | CHART |
| `fear.json` | 12 signs | what a {sign} is quietly afraid of in love, said tenderly | MUTUAL |
| `selflove.json` | 12 signs | self-love for a {sign}: how they come home to themselves | CHART |
| `dealbreaker.json` | 12 signs | a {sign}'s dealbreaker: what they won't settle for (dealbreakers up front) | MATCH |
| `firstdate.json` | 12 signs | what wins a {sign} on a first date | MATCH |
| `partner.json` | 12 signs | {sign} as a partner: what they bring | MATCH |
| `misses.json` | 12 signs | when a {sign} misses you: what it looks like | VENUS |
| `heal.json` | 12 signs | {sign}, after a breakup | PASSING |
| `situationship.json` | 12 signs | a {sign} in a situationship: what they deserve instead | MUTUAL |
| `morning.json` | 12 signs | good morning, {sign}: a morning affirmation for love | CHART |
| `fullmoon.json` | 12 signs | full moon in {sign}: what to release in love | MOON |
| `newmoon.json` | 12 signs | new moon in {sign}: what to invite in | MOON |
| `phases.json` | 8 phases | each moon phase, read for love | MOON |
| `sky.json` | 20 | sky events in love: Mercury retrograde · Venus retrograde · Mars retrograde · Saturn return · Jupiter return · eclipse season · solar eclipse · lunar eclipse · the full moon · the new moon · the void-of-course moon · spring equinox · autumn equinox · summer solstice · winter solstice · Venus as morning star · Venus as evening star · the eight-year Venus cycle · supermoon · the moon changing sign every two and a half days | MOON or PASSING |
| `basics.json` | 12 | chart basics for love: the big three · sun vs moon vs rising · the descendant · synastry (comparing two charts) · composite charts · fifth house vs seventh · why your birth time matters · Venus and Mars together · element balance · what a birth chart is · your chart ruler · the lunar nodes | CHART |
| `pairs-1.json` / `pairs-2.json` | 39 each | sign pairs: for i in 0..11, for j in i..11, (sign i, sign j); `pairs-1` is the first 39 of those 78, `pairs-2` the last 39. Use the true aspect between them (see above). Same-sign pairs count. Use `wheel` with `pair` in one scene. Key: `pair-aries-libra` | MATCH |
| `houses.json` | 12 | each house, read for love | SEVEN for the 7th, CHART for the rest |
| `elements.json` | 14 | the four elements in love, then the ten element pairings (fire+fire, fire+earth, fire+air, fire+water, earth+earth, earth+air, earth+water, air+air, air+water, water+water) | MATCH |
| `modes.json` | 9 | cardinal, fixed, mutable in love, then the six pairings (cardinal+cardinal, cardinal+fixed, cardinal+mutable, fixed+fixed, fixed+mutable, mutable+mutable) | MATCH |
| `planets.json` | 12 | each body in love: Sun · Moon · Mercury · Venus · Mars · Jupiter · Saturn · Uranus · Neptune · Pluto · Chiron · the North Node | VENUS for Venus, MARS for Mars, MOON for the Moon, CHART for the rest |
| `love-1.json` / `love-2.json` | 42 / 41 | relationship affirmations, sky as metaphor; topics in your brief | MUTUAL, PASSING or CHART, whichever fits |
