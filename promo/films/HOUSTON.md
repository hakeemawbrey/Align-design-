# Houston series: six vertical Align ads (1080×1920, 30fps; 15/15/15/30/30/45s)

The user asked: "Come up with more that are Houston specific and we need to have come align on the video and a logo animation at the end."

So these ARE Align ads, unlike series 3, which had no ad. Each film:
- has a Houston hook that locals instantly recognise;
- turns that hook into a real Align feature;
- ends on the shared END CARD, promo/films/endcard.js: "come *Align*." followed by the animated Align logo and a fade to black.

Watch the approved style reference promo/out/films/dummies/align-dummies-v2-send.mp4. Its code is in promo/films/dummies/scenes/{a,b,c}, and promo/films/SERIES3.md describes the style. Copy from them freely, but never edit other films.

## Style (same as dummies v2 / series 3)
- **Background:** the nebula sky, `drawSky(ctx, t, SKY_H)` with grain at GRAIN_H (SKY_H and GRAIN_H from promo/films/wheel.js), one crescent moon.
- **Type:**
  - Headlines in Inter 800 (`TYPE.head`, ~108 px, up to 170 px for hooks), bone #efe6d6, with ONE accent word in EB Garamond italic in a colour.
  - Punchlines in Inter 700, ~62 px.
  - Optional Space Mono eyebrow.
  - Side margins of at least 70 px.
- **Motion:** springy word-by-word pop-ins (`easeOutBack`), with bounces, squashes and pixel-star sparkle bursts.
- **Illustrations:** bold, friendly line art with thick glowing strokes and flat fills. No faces; people are pictogram silhouettes.
- **Pacing:** the hook lands in the first second.
  - 15 s films: headlines readable for ≥ 1.4 s, punchlines for ≥ 1.2 s.
  - Longer films: headlines ≥ 1.8 s, punchlines ≥ 1.5 s.
- **Sound:** cues use 'pop' (gain ≤ 0.07), 'pluck', 'tick', 'whoosh', 'bell', 'glitter', 'riser' and a sparing 'boom'. You own your cues.js (108 bpm template; bar = 2.222 s, beats at 0.6 + n·0.5556).

## Houston, done right
- **Use** real, well-known local things:
  - "Space City", Mission Control / "Houston, we have a problem"
  - the humidity
  - the 610 Loop, Beltway 8 and the Grand Parkway
  - the Katy Freeway
  - neighbourhoods: Montrose, the Heights, EaDo, Midtown, Third Ward, Rice Village, the Galleria area
  - Buffalo Bayou, tacos and kolaches, crawfish season
- **Never use team, NASA or brand logos or wordmarks.** No Astros, Rockets or Texans marks, no NASA "meatball", no restaurant brands. A generic skyline silhouette, a generic rocket, a generic freeway shield ("610" in a plain shield shape) are fine.
- **No invented statistics.** Don't state population, area or commute numbers.
- **No hurricane or flood jokes.**

## Align truth (only real features; real assets are in promo/assets/, see MANIFEST.md)
Align is an astrology blind-dating app. Its real features:
- The **chart comes first and the face last**: a blind "mystery card" with an aura veil instead of a photo (card-profile-*.png).
- **Tonight's deck** is dealt every night (screen-deck.png, card-back.png).
- **Talk cards** replace small talk (card-talk-*.png).
- **Dealbreakers** are said up front (screen-onboarding-dealbreakers.png).
- The **Push / Pull / Align** reading shows how two charts fit (screen-alignment.png).

You may show a real asset small and briefly (on a simple dark phone, or a card floating with a glow). The film should still be mostly bold type and illustration. No invented app UI claims.

## END CARD (shared, fixed API; do not edit endcard.js unless you are the endcard agent)
```js
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'   // ENDCARD_LEN = 4.4
// your SCENES end at DURATION - ENDCARD_LEN; then: (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })
// CUES: [...yours, ...endcardCues(DURATION - ENDCARD_LEN)]
```
At `start` (DURATION − 4.4) your film must show ONLY the plain sky: `drawSky(ctx, t, SKY_H)` plus grain at GRAIN_H. The end card draws that same sky and takes over seamlessly.

Your story's last line should **lead into "come Align."**, for example "So stop ___." Let the end card say "come Align."; don't say it twice. Your scaffold already wires in the end card (as a stub at first; the real one lands soon).

## The six
| folder | len | hook | turn (the Align feature) | last line before the end card |
|---|---|---|---|---|
| **htxproblem** | 15 | **"Houston, we have a *problem*."** in Mission-Control style: a blinking console light, a retro "COMMS" eyebrow. | Then a phone of generic profile cards blurring past (swipe, swipe): "Your dating life." Then the Align turn: a mystery card with an aura glow drops in, "The chart comes first. The face comes last." | "Houston, we have a *solution*." |
| **htxhumidity** | 15 | **"Houston humidity: *100%* hair damage."** A pictogram head with frizz exploding, a dripping thermometer, steam. Use "100%" only as the joke; it is not a real humidity reading. | "Good news: on Align, they don't see your face first." A mystery card with an aura veil replaces the photo, and the frizz poofs into sparkles. | "Fall for the chart. *Not the hair.*" |
| **htxtraffic** | 15 | **"An hour on the *Katy Freeway*…"** A wide multi-lane freeway with a pictogram car crawling, a clock spinning and brake lights. | "…for a date who just says 'hey'." A chat bubble "hey" deflates. Then the turn: dealbreakers stamp onto a card ("✕ ONE-WORD TEXTS"), plus a talk card "What's a hill you will die on?" | "Know before you *drive*." |
| **htxspacecity** | 30 | **"They call it *Space City*."** A generic skyline silhouette at night, a generic rocket lifting off, stars. | "So why does dating here feel so… *Earth-bound*?" Swipe fatigue: little cards falling like rain. Then: "Align matches you by your *birth chart*." Two zodiac wheels lock together (Push/Pull/Align lines in #f59cc4, #8fd8f6, #f2c75c), then "Tonight's deck: dealt from the stars." with card backs dealing in. | "Mission: *find your person*." |
| **htxloops** | 30 | **"Inside the *Loop*. Outside the Beltway."** A map-style illustration: three concentric ring roads labelled 610, Beltway 8 and the Grand Parkway, with tiny neighbourhood labels popping (Montrose, the Heights, EaDo, Midtown, Third Ward, Rice Village…). | The rings start to spin and **morph into a zodiac wheel**, with glyphs appearing in the ring segments: "Somewhere in this city, someone's sky lines up with *yours*." Two glowing dots on opposite sides of the map connect with a gold line. "Align reads both charts before you ever meet." | "Whatever side of the Loop you're on…" |
| **htxstars** | 45 | **"In Houston, you can barely see the *stars*."** A city glow washes out the sky, and a pictogram person looks up at a hazy orange sky with one weak star. | "We'll show you *yours*." The haze clears and their birth chart blooms (Sun, Moon, Rising pop with a sign each), "Your chart says more than any selfie." Then the feature tour, quick and bold: the mystery card ("Chart first. Face last."), tonight's deck ("A new deck, every night."), a talk card ("Skip the small talk."), and the Push/Pull/Align reading ("See how you fit."). | "The stars are still up there. *Look up.*" |

## Contract
- One agent owns one folder, promo/films/<name>/. `scenes/index.js` must export `DURATION`, `SCENES` and `CUES`.
- Everything must be a pure function of t. There must be no `document` access at module top level, because the sound build imports scenes in node.
- Render checks: `node promo/scripts/render.mjs --film=<name> --vertical --sheet --rate=4 --dir=/tmp/claude-0/htx-<name>/<fresh>`, or use `--stills=`.
  - Always use a FRESH dir, and delete old dirs. Disk is limited.
  - Do NOT render the full mp4; the lead does that.
- `node promo/scripts/teaser-sound.mjs --film=<name>` must run without error.
- When you're done, `git pull --rebase --autostash`, commit ONLY your folder and push to claude/align-promo-video. Commit messages end with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_011q84hoGAFybJgojtyW8xw2
  ```
- Report back briefly: the timings and anything you weren't sure about.

---
# Houston round 2: five more, plus a NEW end card

The user asked: "More videos pls like 5 more Houston specific and then for all make the end the word come then the logo saying align not align twice on screen. No tag line. Maybe do a logo animation of the flower/seed of life"

## New end card (applies to ALL Houston films automatically through promo/films/endcard.js; the API is unchanged)
- The end card says **"come"**, then the **logo forms and its wordmark "Align" completes the phrase.** "Align" must appear only ONCE on screen.
- **No tagline.**
- The **logo animation features the flower / seed of life:** circles bloom out from the centre petal by petal, the chakra column lights up, then the wordmark settles under the mark.
- Films should therefore NOT say "Align" in the frames just before the end card either.

## Music (new engine)
Each film's cues.js now uses `music: { style, key, seed, sections: { drop, breakdown, lift, outroAt } }`. These five are pre-assigned a style:
- htxtaste: house, G
- htxrodeo: funk, A
- htxbayou: lofi, F
- htxbrunch: pop, C
- htxsprawl: synthwave, Em

Set `sections` to your film's big visual moments. Keep `outroAt: DURATION - 4.4`, which is the end card. Keep the music object's shape, and don't change the style. Pitched SFX are shifted into the film's key automatically.

## The five
| folder | len | hook | turn (the Align feature) | last line before the end card (which then says "come" plus the logo) |
|---|---|---|---|---|
| **htxtaste** | 15 | **"Houston has *taste*."** Tacos, kolaches and a crawfish boil pop in as bold line-art food icons (generic; no restaurant brands). | "Your dating app should too." Two charts snap together with a gold Align line: "Matched by your birth chart, not your best angle." | "Have good taste in *people*." |
| **htxrodeo** | 15 | **"Rodeo season: suddenly *everyone's* a cowboy."** Pictogram people pop on cowboy hats one by one, and boots stomp. Say "rodeo season" only, no event names or logos. | "Want someone real?" The hats fly off and a mystery card with an aura veil drops in: "Chart first. Face last. No costumes." | "Find the *real thing*." |
| **htxbayou** | 15 | **"Perfect date: a sunset walk on *Buffalo Bayou*."** Line-art bayou path, a skyline at sunset, a pictogram walking alone, then a "?" pops beside them. | "Who with?" Tonight's deck deals in from the stars: card backs fan, and one card glows. "A new deck, every night." | "Your walk *partner* is out there." |
| **htxbrunch** | 30 | **"Another Midtown brunch with someone who's '*just seeing where it goes*'."** A brunch table with mimosas and a chat bubble that shrugs. Then a quick montage: "No kids?", "Moving to Austin?", "Not looking for anything serious." Thought bubbles land too late. | "On Align, dealbreakers come *first*." Chips stamp onto a card: "✕ NOT LOOKING FOR SERIOUS", "✕ NO KIDS EVER". Then the Push / Pull / Align reading: "See how you fit before the first mimosa." | "Brunch with *intention*." |
| **htxsprawl** | 30 | **"Houston is *huge*."** A map grows tile by tile into endless sprawl, and a pin-person zooms out tiny. Don't state any area or population number. | "So how do you find *your* person in all this?" The sprawl's lights become stars, and the stars become two charts that light up across the map: "Align reads your sky, and finds who lines up with it." Two dots far apart connect with a glowing gold arc. | "Somewhere out there, *someone's sky* lines up with yours." |

Same style, Houston rules, Align truth, contract and commit rules as above. Your scaffold already includes the shared end card. Don't edit endcard.js; another agent is updating it right now.
